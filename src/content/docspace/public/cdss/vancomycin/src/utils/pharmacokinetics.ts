import { PatientProfile, RenalCalculations, InitialDosingResult, TdmInput, TdmEvaluationResult, InfusionMethod } from '../types';

/**
 * Calculates Ideal Body Weight (IBW) and Adjusted Body Weight (ABW)
 */
export function calculateBodyMetrics(heightCm: number, weightKg: number, gender: 'male' | 'female') {
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? Number((weightKg / (heightM * heightM)).toFixed(1)) : 0;
  
  // Devine formula for IBW
  let ibw = 0;
  if (gender === 'male') {
    ibw = 50 + 0.91 * (heightCm - 152.4);
  } else {
    ibw = 45.5 + 0.91 * (heightCm - 152.4);
  }
  ibw = Math.max(10, Number(ibw.toFixed(1)));
  
  // Adjusted Body Weight for obese patients (TBW > 1.2 * IBW)
  let abw = weightKg;
  if (weightKg > 1.2 * ibw) {
    abw = Number((ibw + 0.4 * (weightKg - ibw)).toFixed(1));
  } else {
    abw = weightKg;
  }
  
  let bmiClassification = 'Bình thường';
  if (bmi < 18.5) bmiClassification = 'Thiếu cân (< 18.5)';
  else if (bmi < 25) bmiClassification = 'Bình thường (18.5 - 24.9)';
  else if (bmi < 30) bmiClassification = 'Thừa cân (25.0 - 29.9)';
  else if (bmi < 35) bmiClassification = 'Béo phì độ I (30.0 - 34.9)';
  else if (bmi < 40) bmiClassification = 'Béo phì độ II (35.0 - 39.9)';
  else bmiClassification = 'Béo phì độ III (≥ 40.0)';
  
  return { bmi, bmiClassification, ibw, abw };
}

/**
 * Cockcroft-Gault Creatinine Clearance & CKD-EPI 2021
 */
export function calculateRenalFunction(
  age: number,
  ageUnit: 'years' | 'months' | 'weeks',
  gender: 'male' | 'female',
  weightKg: number,
  heightCm: number,
  scrValue: number,
  scrUnit: 'umol_L' | 'mg_dL'
): RenalCalculations {
  const { bmi, bmiClassification, ibw, abw } = calculateBodyMetrics(heightCm, weightKg, gender);
  
  // Normalize SCr to mg/dL and umol/L
  let scrMgDl = 0;
  let scrUmolL = 0;
  if (scrUnit === 'umol_L') {
    scrUmolL = scrValue;
    scrMgDl = Number((scrValue / 88.4).toFixed(2));
  } else {
    scrMgDl = scrValue;
    scrUmolL = Number((scrValue * 88.4).toFixed(1));
  }
  
  if (scrMgDl <= 0) scrMgDl = 0.8;
  if (scrUmolL <= 0) scrUmolL = 70;
  
  // Weight used for Cockcroft-Gault:
  // If TBW < IBW: use TBW
  // If BMI >= 30 or TBW > 1.2 * IBW: use ABW (as standard in clinical pharmacokinetics)
  // Else: use IBW or TBW (use TBW if close to IBW)
  let crclWeight = weightKg;
  let crclUsedWeight: 'TBW' | 'IBW' | 'ABW' = 'TBW';
  if (weightKg < ibw) {
    crclWeight = weightKg;
    crclUsedWeight = 'TBW';
  } else if (weightKg > 1.2 * ibw) {
    crclWeight = abw;
    crclUsedWeight = 'ABW';
  } else {
    crclWeight = weightKg;
    crclUsedWeight = 'TBW';
  }
  
  // Cockcroft-Gault formula (Adults)
  let ageYears = age;
  if (ageUnit === 'months') ageYears = age / 12;
  if (ageUnit === 'weeks') ageYears = age / 52;
  
  let crcl = 0;
  if (ageYears >= 18) {
    crcl = ((140 - ageYears) * crclWeight) / (72 * scrMgDl);
    if (gender === 'female') {
      crcl *= 0.85;
    }
  } else {
    // Schwartz bedside formula for pediatric: eGFR = 0.413 * height(cm) / SCr(mg/dL)
    crcl = (0.413 * heightCm) / scrMgDl;
  }
  crcl = Math.max(1, Number(crcl.toFixed(1)));
  
  // CKD-EPI 2021 (Refit without race)
  let egfrCkdEpi = 0;
  if (ageYears >= 18) {
    const kappa = gender === 'female' ? 0.7 : 0.9;
    const alpha = gender === 'female' ? -0.241 : -0.302;
    const genderMult = gender === 'female' ? 1.012 : 1.0;
    const scrOverKappa = scrMgDl / kappa;
    const minPart = Math.min(scrOverKappa, 1) ** alpha;
    const maxPart = Math.max(scrOverKappa, 1) ** -1.2;
    const agePart = 0.9938 ** ageYears;
    egfrCkdEpi = Number((142 * minPart * maxPart * agePart * genderMult).toFixed(1));
  } else {
    egfrCkdEpi = crcl;
  }
  
  return {
    bmi,
    bmiClassification,
    ibw,
    abw,
    crcl,
    crclUsedWeight,
    egfrCkdEpi,
    scrMgDl,
    scrUmolL
  };
}

/**
 * Tra cứu liều theo Bảng 2: BVĐK Cà Mau & Dược Thư Quốc Gia 2015
 * CrCl (ml/phút) -> Liều Vancomycin (mg/24h)
 */
export const CA_MAU_TABLE_2: { crcl: number; dailyDoseMg: number }[] = [
  { crcl: 100, dailyDoseMg: 1545 },
  { crcl: 90, dailyDoseMg: 1390 },
  { crcl: 80, dailyDoseMg: 1235 },
  { crcl: 70, dailyDoseMg: 1080 },
  { crcl: 60, dailyDoseMg: 925 },
  { crcl: 50, dailyDoseMg: 770 },
  { crcl: 40, dailyDoseMg: 620 },
  { crcl: 30, dailyDoseMg: 465 },
  { crcl: 20, dailyDoseMg: 310 },
  { crcl: 10, dailyDoseMg: 155 }
];

export function getCaMauTableDose(crcl: number): number {
  if (crcl >= 100) return 1545;
  if (crcl <= 10) return 155;
  // Linear interpolation between brackets
  for (let i = 0; i < CA_MAU_TABLE_2.length - 1; i++) {
    const higher = CA_MAU_TABLE_2[i];
    const lower = CA_MAU_TABLE_2[i + 1];
    if (crcl <= higher.crcl && crcl >= lower.crcl) {
      const frac = (crcl - lower.crcl) / (higher.crcl - lower.crcl);
      return Math.round(lower.dailyDoseMg + frac * (higher.dailyDoseMg - lower.dailyDoseMg));
    }
  }
  return 1000;
}

/**
 * Zhang et al (2024) Population PK CL equation:
 * CL(L/h) = 3.36 * (CKDEPI / 75)^0.658 * [1 + 0.0106 * (TBW - 90)] * FICU
 * FICU = 0.845 for ICU, 1.0 for non-ICU
 */
export function calculateZhangClearance(tbw: number, ckdEpi: number, isIcu: boolean): number {
  const fIcu = isIcu ? 0.845 : 1.0;
  const ratio = Math.max(0.1, ckdEpi / 75);
  const cl = 3.36 * Math.pow(ratio, 0.658) * (1 + 0.0106 * (tbw - 90)) * fIcu;
  return Math.max(0.2, Number(cl.toFixed(2)));
}

/**
 * Recommends Infusion Duration to prevent Red Man Syndrome & hypotension
 * Rule: >= 60 minutes per 1000 mg (rate <= 10-15 mg/min; <= 10 mg/min preferred)
 */
export function calculateSafeInfusionMinutes(doseMg: number): number {
  // Infusion rate <= 10 mg/min -> 1000 mg needs 100 min, min 60 min.
  // Standard guideline: min 60 min for <= 1000 mg, 90-120 min for 1250-1500 mg, 150-180 min for >= 2000 mg.
  if (doseMg <= 1000) return 60;
  if (doseMg <= 1500) return 90;
  if (doseMg <= 2000) return 120;
  if (doseMg <= 2500) return 150;
  return 180;
}

/**
 * Main Initial Dosing Calculator based on ASHP/IDSA 2020, Zhang 2024, and BVĐK Cà Mau guidelines
 */
export function calculateInitialDosing(
  patient: PatientProfile,
  renal: RenalCalculations,
  methodPreference: InfusionMethod = 'intermittent'
): InitialDosingResult {
  const { weight: tbw, patientType, clinicalSetting, renalStatus } = patient;
  const isIcu = clinicalSetting === 'icu';
  const crcl = renal.crcl;
  const isObese = renal.bmi >= 30;
  const isOverweight = renal.bmi >= 25;
  const cautions: string[] = [];

  // Check nephrotoxic risk
  if (patient.concomitantNephrotoxins && patient.concomitantNephrotoxins.length > 0) {
    cautions.push(`Đang phối hợp với thuốc gây độc thận: ${patient.concomitantNephrotoxins.join(', ')}. Cần theo dõi SCr sát (mỗi 24-48h).`);
  }
  if (patient.concomitantNephrotoxins.includes('Piperacillin/Tazobactam')) {
    cautions.push('Cảnh báo nguy cơ tổn thương thận cấp (AKI) tăng khi phối hợp Vancomycin + Pip/Tazo (ASHP 2020).');
  }

  // 1. NEONATAL & PEDIATRIC
  if (patientType === 'neonatal') {
    // Neonates (< 3 months)
    const mgPerKg = 15;
    const intervalHours = crcl < 30 ? 24 : crcl < 50 ? 12 : 8;
    const singleDose = Math.round(tbw * mgPerKg);
    return {
      loadingDoseMg: 0,
      loadingDoseMgPerKg: 0,
      loadingInfusionMinutes: 60,
      loadingNote: 'Không khuyến cáo liều nạp thường quy ở trẻ sơ sinh (ASHP/Stanford 2020/2022).',
      maintenanceMethod: 'intermittent',
      maintenanceDoseMg: singleDose,
      maintenanceIntervalHours: intervalHours,
      dailyMaintenanceMg: singleDose * (24 / intervalHours),
      maintenanceInfusionMinutes: 60,
      recommendationSource: 'Stanford Children’s & ASHP 2020 Neonatal Guide',
      dosingRationale: `10 - 20 mg/kg mỗi 8 - 24 giờ tùy theo tuổi sau kinh nguyệt & SCr. Mục tiêu AUC24 = 400 - 600 mg·h/L.`,
      safetyCautions: cautions
    };
  }

  if (patientType === 'pediatric') {
    // Pediatric: 3 months to 17 years
    // Age >= 12: 60-70 mg/kg/day q6-8h; Age < 12: 60-80 mg/kg/day q6h. Max 3600 mg/day (usually 3000 mg)
    const isOver12 = patient.age >= 12;
    const targetMgKgDay = isOver12 ? 60 : 70;
    let totalDaily = Math.min(3000, Math.round(tbw * targetMgKgDay));
    const interval = isOver12 ? 8 : 6;
    let singleDose = Math.round((totalDaily / (24 / interval)) / 50) * 50;

    // Renal adjustment for pediatrics
    if (crcl < 30) {
      singleDose = Math.round(singleDose * 0.5);
    }

    const ldMg = isObese ? Math.round(tbw * 20) : 0; // ASHP 2020: 20 mg/kg for obese children

    return {
      loadingDoseMg: ldMg,
      loadingDoseMgPerKg: isObese ? 20 : 0,
      loadingInfusionMinutes: calculateSafeInfusionMinutes(ldMg),
      loadingNote: isObese ? 'Trẻ béo phì: Liều nạp 20 mg/kg TBW (ASHP 2020 Rec 24).' : 'Trẻ không béo phì: Chưa đủ dữ liệu khuyến cáo liều nạp thường quy.',
      maintenanceMethod: 'intermittent',
      maintenanceDoseMg: singleDose,
      maintenanceIntervalHours: interval,
      dailyMaintenanceMg: singleDose * (24 / interval),
      maintenanceInfusionMinutes: calculateSafeInfusionMinutes(singleDose),
      recommendationSource: 'ASHP / PIDS 2020 & Stanford Guidelines',
      dosingRationale: `Trẻ em: ${targetMgKgDay} mg/kg/ngày chia đều mỗi ${interval} giờ. Giới hạn tối đa 3000 - 3600 mg/ngày.`,
      safetyCautions: cautions
    };
  }

  // 2. ADULT RENAL REPLACEMENT THERAPY (IHD, CRRT, SLED)
  if (renalStatus === 'intermittent_hd') {
    // Intermittent Hemodialysis (ASHP 2020 Rec 13 & 14)
    const isHighFlux = patient.hdDialyzerPermeability !== 'low';
    const isIntradialytic = patient.hdTiming === 'intradialytic';
    
    // Loading dose: 25 mg/kg (post-HD) or 35 mg/kg (intradialytic high-flux)
    const ldRate = isIntradialytic ? (isHighFlux ? 35 : 30) : 25;
    const ldDose = Math.min(3000, Math.round((tbw * ldRate) / 250) * 250);
    
    // Maintenance dose per HD session:
    // Post-HD: 10 mg/kg (high-flux) or 7.5 mg/kg (low-flux)
    // Intradialytic: 10-15 mg/kg (high-flux)
    const maintRate = isIntradialytic ? (isHighFlux ? 12.5 : 8.5) : (isHighFlux ? 10 : 7.5);
    const maintDose = Math.round((tbw * maintRate) / 250) * 250;

    cautions.push('Mục tiêu nồng độ trước lọc (predialysis trough): 15 - 20 mg/L (tương đương AUC 400 - 600 mg·h/L).');
    cautions.push('Khoảng cách 3 ngày (thứ 6 đến thứ 2): tăng thêm 25% liều duy trì.');
    cautions.push('Lấy máu thử TDM: TRƯỚC buổi lọc máu. Không lấy máu trong vòng 2 giờ sau lọc máu (tránh sai số do tái phân bố).');

    return {
      loadingDoseMg: ldDose,
      loadingDoseMgPerKg: ldRate,
      loadingInfusionMinutes: calculateSafeInfusionMinutes(ldDose),
      loadingNote: `Lọc máu chu kỳ (IHD): Liều nạp ${ldRate} mg/kg TBW (tối đa 3000 mg).`,
      maintenanceMethod: 'intermittent',
      maintenanceDoseMg: maintDose,
      maintenanceIntervalHours: 48, // Thrice-weekly
      dailyMaintenanceMg: Math.round(maintDose * 0.5),
      maintenanceInfusionMinutes: calculateSafeInfusionMinutes(maintDose),
      recommendationSource: 'ASHP / IDSA 2020 Consensus - Bảng Thẩm phân máu IHD',
      dosingRationale: `Liều duy trì ${maintRate} mg/kg vào MỖI buổi lọc máu (${isIntradialytic ? 'trong 60-90 phút cuối lọc' : 'ngay sau kết thúc lọc'}).`,
      safetyCautions: cautions
    };
  }

  if (renalStatus === 'crrt') {
    // CRRT (ASHP 2020 Rec 16)
    const ldDose = Math.min(3000, Math.round((tbw * 25) / 250) * 250);
    const maintDose = Math.round((tbw * 8.5) / 250) * 250; // 7.5 - 10 mg/kg q12h
    cautions.push('Tốc độ dịch thay thế/thẩm tách chuẩn KDIGO: 20 - 25 mL/kg/h.');
    cautions.push('Nên làm TDM sớm trong 24 giờ đầu để chỉnh liều kịp thời.');

    if (methodPreference === 'continuous') {
      // Continuous infusion in CRRT: 15-20 mg/kg LD, then ~20-30 mg/kg/day
      const civLd = Math.round(tbw * 20);
      const civRate = Math.round((tbw * 25) / 24);
      return {
        loadingDoseMg: civLd,
        loadingDoseMgPerKg: 20,
        loadingInfusionMinutes: 120,
        loadingNote: 'Liều nạp truyền tĩnh mạch 2 giờ trước khi bắt đầu duy trì liên tục.',
        maintenanceMethod: 'continuous',
        maintenanceDoseMg: civRate * 24,
        maintenanceIntervalHours: 24,
        dailyMaintenanceMg: civRate * 24,
        maintenanceInfusionMinutes: 1440,
        continuousRateMgPerHour: civRate,
        recommendationSource: 'ASHP / IDSA 2020 - CRRT Continuous Infusion',
        dosingRationale: `Truyền liên tục: Liều nạp 20 mg/kg, duy trì tốc độ ~${civRate} mg/h để đạt nồng độ mục tiêu Css 20 - 25 mg/L.`,
        safetyCautions: cautions
      };
    }

    return {
      loadingDoseMg: ldDose,
      loadingDoseMgPerKg: 25,
      loadingInfusionMinutes: calculateSafeInfusionMinutes(ldDose),
      loadingNote: 'Liều nạp CRRT: 20 - 25 mg/kg TBW.',
      maintenanceMethod: 'intermittent',
      maintenanceDoseMg: maintDose,
      maintenanceIntervalHours: 12,
      dailyMaintenanceMg: maintDose * 2,
      maintenanceInfusionMinutes: calculateSafeInfusionMinutes(maintDose),
      recommendationSource: 'ASHP / IDSA 2020 - CRRT Dosing Guidelines',
      dosingRationale: `Liều duy trì: 7.5 - 10 mg/kg mỗi 12 giờ (dựa trên cân nặng thực tế).`,
      safetyCautions: cautions
    };
  }

  if (renalStatus === 'sled') {
    // SLED / PIRRT (ASHP 2020 Rec 15)
    const ldDose = Math.min(3000, Math.round((tbw * 25) / 250) * 250);
    const maintDose = Math.round((tbw * 15) / 250) * 250;
    cautions.push('SLED loại bỏ vancomycin rất hiệu quả. Cho liều duy trì 15 mg/kg ngay sau kết thúc SLED hoặc trong 60-90 phút cuối.');
    return {
      loadingDoseMg: ldDose,
      loadingDoseMgPerKg: 25,
      loadingInfusionMinutes: calculateSafeInfusionMinutes(ldDose),
      loadingNote: 'Liều nạp: 20 - 25 mg/kg TBW (tối đa 3000 mg).',
      maintenanceMethod: 'intermittent',
      maintenanceDoseMg: maintDose,
      maintenanceIntervalHours: 24,
      dailyMaintenanceMg: maintDose,
      maintenanceInfusionMinutes: calculateSafeInfusionMinutes(maintDose),
      recommendationSource: 'ASHP / IDSA 2020 - Hybrid Dialysis (SLED/PIRRT)',
      dosingRationale: 'Liều duy trì 15 mg/kg sau mỗi buổi lọc SLED.',
      safetyCautions: cautions
    };
  }

  // 3. ADULTS (WARD OR ICU) - OVERWEIGHT/OBESE OR NORMAL WEIGHT
  // A. Loading Dose Calculation (ASHP 2020 Rec 10, 12, 13)
  let ldMgPerKg = 25;
  let maxLd = 3000;
  if (isObese) {
    ldMgPerKg = 25; // 20-25 mg/kg for obese, max 3000 mg
  } else if (patient.indication === 'severe_mrsa' || isIcu) {
    ldMgPerKg = 25; // 20-35 mg/kg
  } else {
    ldMgPerKg = 20;
  }
  let loadingDoseMg = Math.min(maxLd, Math.round((tbw * ldMgPerKg) / 250) * 250);

  // B. Maintenance Dosing
  if (methodPreference === 'continuous') {
    // Continuous Infusion (ASHP 2020 Rec 7, 10 & Zhang 2024 Figs 2 & 4)
    // Zhang 2024 obese matrix check if BMI >= 25 & TBW >= 70:
    let civ24hDose = 0;
    let rationale = '';

    if (isOverweight && tbw >= 70) {
      // Zhang 2024 Continuous Infusion Matrix
      // Ward vs ICU:
      // Rows: TBW 70-100, 100-140, 140-180, >180
      // Cols CKD-EPI: 10-30, 30-50, 50-70, 70-90, >90
      civ24hDose = getZhangCivDose(tbw, renal.egfrCkdEpi, isIcu);
      rationale = `Theo mô hình PK Zhang et al. (2024) cho bệnh nhân thừa cân/béo phì (${isIcu ? 'ICU' : 'Khoa thường'}, TBW: ${tbw}kg, CKD-EPI: ${renal.egfrCkdEpi} mL/phút/1.73m²).`;
      cautions.push('Zhang et al 2024 khuyến cáo 2 liều nạp: Ngày 1 LD 1500mg/2h, Ngày 2 bổ sung LD 750mg/2h trước khi tiếp tục truyền duy trì.');
    } else {
      // Standard ASHP 2020: 30 - 40 mg/kg/day (up to 60 mg/kg)
      let ratePerKg = isIcu ? 30 : 35;
      if (crcl < 50) ratePerKg = Math.round(ratePerKg * (crcl / 80));
      civ24hDose = Math.round((tbw * ratePerKg) / 250) * 250;
      rationale = `Theo ASHP 2020: Liều nạp 15-20 mg/kg, sau đó truyền duy trì 30-40 mg/kg/24h hiệu chỉnh theo CrCl.`;
    }

    const rateMgPerHour = Math.round(civ24hDose / 24);
    cautions.push('Mục tiêu nồng độ trạng thái ổn định (Css): 20 - 25 mg/L (tương đương AUC24 = 480 - 600 mg·h/L).');
    cautions.push('Lưu ý không truyền chung đường truyền (Y-site) với Piperacillin/Tazo, Ceftriaxone, Cefepime, Furosemide, Propofol (ASHP 2020 Rec 7).');

    return {
      loadingDoseMg: isOverweight ? 1500 : loadingDoseMg,
      loadingDoseMgPerKg: isOverweight ? Number((1500 / tbw).toFixed(1)) : ldMgPerKg,
      loadingInfusionMinutes: 120,
      loadingNote: isOverweight ? 'Liều nạp Ngày 1: 1500 mg truyền trong 2h (Zhang et al. 2024).' : `Liều nạp: ${ldMgPerKg} mg/kg TBW truyền trong 2h.`,
      maintenanceMethod: 'continuous',
      maintenanceDoseMg: civ24hDose,
      maintenanceIntervalHours: 24,
      dailyMaintenanceMg: civ24hDose,
      maintenanceInfusionMinutes: 1440,
      continuousRateMgPerHour: rateMgPerHour,
      recommendationSource: isOverweight ? 'Zhang et al. (Clin Pharmacokinet 2024) & ASHP 2020' : 'ASHP / IDSA 2020 Guidelines',
      dosingRationale: rationale,
      safetyCautions: cautions
    };
  } else {
    // Intermittent Infusion (IIV)
    let singleDoseMg = 1000;
    let intervalHours = 12;
    let rationale = '';
    let recSource = '';

    // Check if Overweight/Obese and Zhang 2024 matrix applies
    if (isOverweight && tbw >= 70 && renal.egfrCkdEpi >= 10) {
      const zhangIiv = getZhangIivDose(tbw, renal.egfrCkdEpi, isIcu);
      singleDoseMg = zhangIiv.doseMg;
      intervalHours = zhangIiv.intervalHours;
      recSource = 'Zhang et al. (Clin Pharmacokinet 2024)';
      rationale = `Theo bảng tối ưu hóa liều ngắt quãng Zhang 2024 cho bệnh nhân cân nặng ${tbw}kg (${isIcu ? 'ICU' : 'Khoa thường'}, CKD-EPI: ${renal.egfrCkdEpi} mL/phút/1.73m²).`;
      cautions.push('Zhang 2024 khuyến cáo Ngày 1 dùng 2 liều nạp cách nhau 12h, từ Ngày 2 chuyển sang liều duy trì.');
    } else {
      // Normal weight or adapted to BVĐK Cà Mau / ASHP 2020
      if (crcl >= 90) {
        // Normal renal function: 15-20 mg/kg q8-12h
        singleDoseMg = Math.min(2000, Math.round((tbw * 17.5) / 250) * 250);
        intervalHours = isIcu || crcl > 120 ? 8 : 12; // Hyperfiltration or ICU often needs q8h
        recSource = 'ASHP / IDSA / SIDP 2020 Consensus';
        rationale = `Chức năng thận bình thường (CrCl ${crcl} mL/phút): 15 - 20 mg/kg mỗi ${intervalHours} giờ.`;
      } else {
        // Renal impairment -> Bảng 2 BVĐK Cà Mau & Dược Thư QG 2015
        const caMauDose24h = getCaMauTableDose(crcl);
        recSource = 'Bảng 2 Hướng dẫn BVĐK Cà Mau & Dược Thư Quốc Gia';
        
        if (crcl >= 60) {
          intervalHours = 12;
          singleDoseMg = Math.round((caMauDose24h / 2) / 100) * 100;
          rationale = `CrCl ${crcl} mL/phút: Tổng liều ${caMauDose24h} mg/24h, chia đều mỗi 12 giờ.`;
        } else if (crcl >= 40) {
          intervalHours = 24;
          singleDoseMg = Math.round(caMauDose24h / 100) * 100;
          rationale = `CrCl ${crcl} mL/phút: Tổng liều ${caMauDose24h} mg/24h, dùng 1 lần mỗi 24 giờ.`;
        } else if (crcl >= 20) {
          intervalHours = 36;
          singleDoseMg = Math.max(500, Math.round(caMauDose24h * 1.5 / 100) * 100);
          rationale = `CrCl ${crcl} mL/phút (suy thận trung bình): Liều ${singleDoseMg} mg mỗi 36 - 48 giờ hoặc dùng theo nồng độ đáy.`;
        } else {
          intervalHours = 48;
          singleDoseMg = 500;
          rationale = `CrCl ${crcl} mL/phút (suy thận nặng): Liều nạp 20 mg/kg, sau đó dùng 500 mg mỗi 48 - 72 giờ và định lượng TDM trước liều kế tiếp.`;
        }
      }
    }

    const dailyMaintenanceMg = Math.round(singleDoseMg * (24 / intervalHours));
    cautions.push('Mục tiêu AUC24 / MIC = 400 - 600 mg·h/L (giả định MIC = 1 mg/L).');
    cautions.push('ASHP 2020: KHÔNG còn khuyến cáo duy trì nồng độ đáy 15 - 20 mg/L do nguy cơ tổn thương thận cấp cao.');
    cautions.push('Thời điểm lấy mẫu TDM 2 điểm: C_peak (1-2h sau khi truyền xong) và C_trough (trong vòng 30 phút trước liều kế tiếp).');

    return {
      loadingDoseMg,
      loadingDoseMgPerKg: ldMgPerKg,
      loadingInfusionMinutes: calculateSafeInfusionMinutes(loadingDoseMg),
      loadingNote: `Liều nạp: ${ldMgPerKg} mg/kg TBW (tối đa 3000 mg) để nhanh chóng đạt nồng độ trị liệu trong 24-48h đầu.`,
      maintenanceMethod: 'intermittent',
      maintenanceDoseMg: singleDoseMg,
      maintenanceIntervalHours: intervalHours,
      dailyMaintenanceMg,
      maintenanceInfusionMinutes: calculateSafeInfusionMinutes(singleDoseMg),
      recommendationSource: recSource,
      dosingRationale: rationale,
      safetyCautions: cautions
    };
  }
}

/**
 * Zhang 2024 Continuous Infusion Matrix (Figs 2 & 4)
 */
function getZhangCivDose(tbw: number, ckdEpi: number, isIcu: boolean): number {
  // Fig 2 (Ward / Non-ICU)
  const nonIcuTable = [
    { minW: 70, maxW: 100, doses: [750, 1250, 1500, 1750, 2000] },
    { minW: 100, maxW: 140, doses: [1000, 1500, 2000, 2500, 2750] },
    { minW: 140, maxW: 180, doses: [1250, 2000, 2750, 3250, 3750] },
    { minW: 180, maxW: 999, doses: [1750, 2500, 3250, 4000, 4500] }
  ];
  // Fig 4 (ICU)
  const icuTable = [
    { minW: 70, maxW: 100, doses: [750, 1000, 1250, 1500, 1750] },
    { minW: 100, maxW: 140, doses: [1000, 1250, 1750, 2000, 2250] },
    { minW: 140, maxW: 180, doses: [1250, 1750, 2250, 2750, 3000] },
    { minW: 180, maxW: 999, doses: [1500, 2000, 2750, 3500, 3750] }
  ];

  const table = isIcu ? icuTable : nonIcuTable;
  const row = table.find(r => tbw >= r.minW && tbw < r.maxW) || table[table.length - 1];
  
  // Col index by CKD-EPI: 10-30(0), 30-50(1), 50-70(2), 70-90(3), >90(4)
  let colIdx = 0;
  if (ckdEpi >= 90) colIdx = 4;
  else if (ckdEpi >= 70) colIdx = 3;
  else if (ckdEpi >= 50) colIdx = 2;
  else if (ckdEpi >= 30) colIdx = 1;
  else colIdx = 0;

  return row.doses[colIdx];
}

/**
 * Zhang 2024 Intermittent Infusion Maintenance Matrix (Figs 3 & 5)
 */
function getZhangIivDose(tbw: number, ckdEpi: number, isIcu: boolean): { doseMg: number; intervalHours: number } {
  // Fig 3: Non-ICU
  // 70-100: 10-30: 750 q24h; 30-50: 1000 q24h; 50-70: 1500 q24h; 70-90: 1000 q12h; >90: 1000 q12h
  // 100-140: 10-30: 1000 q24h; 30-50: 1500 q24h; 50-70: 2000 q24h; 70-90: 1250 q12h; >90: 1500 q12h
  // 140-180: 10-30: 1250 q24h; 30-50: 1000 q12h; 50-70: 1250 q12h; 70-90: 1500 q12h; >90: 1750 q12h
  // >180: 10-30: 1750 q24h; 30-50: 1250 q12h; 50-70: 1750 q12h; 70-90: 2000 q12h; >90: 2250 q12h
  if (!isIcu) {
    if (tbw < 100) {
      if (ckdEpi >= 70) return { doseMg: 1000, intervalHours: 12 };
      if (ckdEpi >= 50) return { doseMg: 1500, intervalHours: 24 };
      if (ckdEpi >= 30) return { doseMg: 1000, intervalHours: 24 };
      return { doseMg: 750, intervalHours: 24 };
    } else if (tbw < 140) {
      if (ckdEpi >= 90) return { doseMg: 1500, intervalHours: 12 };
      if (ckdEpi >= 70) return { doseMg: 1250, intervalHours: 12 };
      if (ckdEpi >= 50) return { doseMg: 2000, intervalHours: 24 };
      if (ckdEpi >= 30) return { doseMg: 1500, intervalHours: 24 };
      return { doseMg: 1000, intervalHours: 24 };
    } else if (tbw < 180) {
      if (ckdEpi >= 90) return { doseMg: 1750, intervalHours: 12 };
      if (ckdEpi >= 70) return { doseMg: 1500, intervalHours: 12 };
      if (ckdEpi >= 50) return { doseMg: 1250, intervalHours: 12 };
      if (ckdEpi >= 30) return { doseMg: 1000, intervalHours: 12 };
      return { doseMg: 1250, intervalHours: 24 };
    } else {
      if (ckdEpi >= 90) return { doseMg: 2250, intervalHours: 12 };
      if (ckdEpi >= 70) return { doseMg: 2000, intervalHours: 12 };
      if (ckdEpi >= 50) return { doseMg: 1750, intervalHours: 12 };
      if (ckdEpi >= 30) return { doseMg: 1250, intervalHours: 12 };
      return { doseMg: 1750, intervalHours: 24 };
    }
  } else {
    // Fig 5: ICU
    // 70-100: 10-30: 750 q24h; 30-50: 1000 q24h; 50-70: 1250 q24h; 70-90: 750 q12h; >90: 750 q12h
    // 100-140: 10-30: 1000 q24h; 30-50: 1250 q24h; 50-70: 1750 q24h; 70-90: 1000 q12h; >90: 1000 q12h
    // 140-180: 10-30: 1000 q24h; 30-50: 1000 q12h; 50-70: 1250 q12h; 70-90: 1250 q12h; >90: 1500 q12h
    // >180: 10-30: 1250 q24h; 30-50: 1000 q12h; 50-70: 1500 q12h; 70-90: 1750 q12h; >90: 2000 q12h
    if (tbw < 100) {
      if (ckdEpi >= 70) return { doseMg: 750, intervalHours: 12 };
      if (ckdEpi >= 50) return { doseMg: 1250, intervalHours: 24 };
      if (ckdEpi >= 30) return { doseMg: 1000, intervalHours: 24 };
      return { doseMg: 750, intervalHours: 24 };
    } else if (tbw < 140) {
      if (ckdEpi >= 70) return { doseMg: 1000, intervalHours: 12 };
      if (ckdEpi >= 50) return { doseMg: 1750, intervalHours: 24 };
      if (ckdEpi >= 30) return { doseMg: 1250, intervalHours: 24 };
      return { doseMg: 1000, intervalHours: 24 };
    } else if (tbw < 180) {
      if (ckdEpi >= 90) return { doseMg: 1500, intervalHours: 12 };
      if (ckdEpi >= 50) return { doseMg: 1250, intervalHours: 12 };
      if (ckdEpi >= 30) return { doseMg: 1000, intervalHours: 12 };
      return { doseMg: 1000, intervalHours: 24 };
    } else {
      if (ckdEpi >= 90) return { doseMg: 2000, intervalHours: 12 };
      if (ckdEpi >= 70) return { doseMg: 1750, intervalHours: 12 };
      if (ckdEpi >= 50) return { doseMg: 1500, intervalHours: 12 };
      if (ckdEpi >= 30) return { doseMg: 1000, intervalHours: 12 };
      return { doseMg: 1250, intervalHours: 24 };
    }
  }
}

/**
 * Bayesian MAP (Maximum A Posteriori) Estimation for Vancomycin using a Single Concentration Sample
 * (ASHP/IDSA 2020 Guidelines & Thomson / Colin / Goti Population PK Models)
 * Allows estimation in the first 24-48 hours (dose 1, 2, 3, or pre-dose trough) or at steady state.
 */
export function estimateBayesianSingleSample(
  tdm: TdmInput,
  patient?: PatientProfile,
  renal?: RenalCalculations
): TdmEvaluationResult {
  const targetMin = 400;
  const targetMax = 600;

  const dose = tdm.currentDoseMg || 1000;
  const tau = tdm.currentIntervalHours || 12;
  const tInf = tdm.infusionDurationHours || (dose > 1000 ? 2.0 : 1.0);
  const doseNumber = Math.max(1, tdm.singleDoseNumber || (tau === 12 ? 3 : 2));

  // Patient covariates
  const weight = patient?.weight || 65;
  const height = patient?.height || 165;
  const gender = patient?.gender || 'male';
  const age = patient?.age || 55;
  const isIcu = patient?.clinicalSetting === 'icu';
  
  // CrCl calculation / fallback
  let crcl = renal?.crcl;
  if (!crcl || crcl <= 0) {
    const scr = patient?.scrValue || 1.0;
    const scrMgDl = patient?.scrUnit === 'umol_L' ? scr / 88.4 : scr;
    const ibw = gender === 'male' ? 50 + 0.91 * (height - 152.4) : 45.5 + 0.91 * (height - 152.4);
    const useWt = weight > 1.2 * ibw ? ibw + 0.4 * (weight - ibw) : weight;
    crcl = ((140 - age) * useWt) / (72 * Math.max(0.4, scrMgDl));
    if (gender === 'female') crcl *= 0.85;
  }
  crcl = Math.max(10, Math.min(180, crcl));

  // Population PK Priors (Thomson et al., Colin et al., Goti et al.)
  // CL_pop = 0.0411 * CrCl + 0.35 L/h (min 0.4, max 9.0 L/h)
  const popCl = Number(Math.max(0.4, Math.min(9.0, 0.0411 * crcl + 0.35)).toFixed(2));
  // Vd_pop = 0.72 L/kg for non-ICU, 0.85 L/kg for ICU expanded volume
  const vdFactor = isIcu ? 0.85 : 0.72;
  const popVd = Number(Math.max(20, Math.min(120, weight * vdFactor)).toFixed(1));

  // Variances (log-normal scale): omega_CL^2 = 0.16 (CV ~40%), omega_Vd^2 = 0.09 (CV ~30%), sigma^2 = 0.04 (CV ~20%)
  const omegaSqCl = 0.16;
  const omegaSqVd = 0.09;
  const sigmaSq = 0.04;

  // Measured concentration
  const cMeas = tdm.singleConcentration ?? tdm.troughConcentration ?? 0;
  if (cMeas <= 0) {
    return {
      auc24: 0,
      auc24TargetMin: targetMin,
      auc24TargetMax: targetMax,
      targetAttainment: 'subtherapeutic',
      popCl,
      popVd,
      estimationMethod: 'bayesian_single',
      adjustedDoseRecommendation: 'Vui lòng nhập nồng độ đo được (C_meas) để phần mềm Bayes ước tính AUC24 và hiệu chỉnh liều.',
      clinicalNote: 'Phương pháp Bayes (ASHP 2020) cho phép lấy 1 mẫu nồng độ (đáy hoặc bất kỳ) trong 24–48 giờ đầu.'
    };
  }

  // Sample timing:
  // If trough: sample is taken ~0.5h before next dose, so time from start of dose = tau - 0.5
  // If random: singleSampleHoursAfterDose
  let tMeas = tdm.singleSampleHoursAfterDose;
  if (!tMeas || tMeas <= 0) {
    tMeas = Math.max(tInf + 0.5, tau - (tdm.troughTimeBeforeNextHours || 0.5));
  }
  tMeas = Math.max(tInf, Math.min(tau + 6, tMeas));

  // Pharmacokinetic concentration function C_pred(CL, Vd)
  const calcCPred = (clVal: number, vdVal: number): number => {
    const k = clVal / vdVal;
    // End of infusion peak for dose N
    const accumulation = (1 - Math.exp(-doseNumber * k * tau)) / (1 - Math.exp(-k * tau));
    const cPeakN = (dose / (tInf * clVal)) * (1 - Math.exp(-k * tInf)) * accumulation;
    
    // Post-infusion decay
    const tPostInf = Math.max(0, tMeas - tInf);
    return cPeakN * Math.exp(-k * tPostInf);
  };

  // Bayesian MAP Optimization:
  // Find eta_CL and eta_Vd that minimize:
  // OBJ = (eta_CL^2 / omegaSqCl) + (eta_Vd^2 / omegaSqVd) + ((ln(cMeas) - ln(cPred))^2 / sigmaSq)
  let bestObj = Infinity;
  let bestEtaCl = 0;
  let bestEtaVd = 0;

  // Step 1: Coarse 2D Grid Search
  for (let etaCl = -1.6; etaCl <= 1.6; etaCl += 0.08) {
    const clCandidate = popCl * Math.exp(etaCl);
    for (let etaVd = -0.8; etaVd <= 0.8; etaVd += 0.08) {
      const vdCandidate = popVd * Math.exp(etaVd);
      const cPred = calcCPred(clCandidate, vdCandidate);
      if (cPred <= 0.001) continue;

      const obj = (etaCl * etaCl) / omegaSqCl +
                  (etaVd * etaVd) / omegaSqVd +
                  Math.pow(Math.log(cMeas) - Math.log(cPred), 2) / sigmaSq;

      if (obj < bestObj) {
        bestObj = obj;
        bestEtaCl = etaCl;
        bestEtaVd = etaVd;
      }
    }
  }

  // Step 2: Fine 2D Refinement around best solution
  const fineRangeCl = 0.12;
  const fineRangeVd = 0.12;
  const initialBestCl = bestEtaCl;
  const initialBestVd = bestEtaVd;

  for (let etaCl = initialBestCl - fineRangeCl; etaCl <= initialBestCl + fineRangeCl; etaCl += 0.01) {
    const clCandidate = popCl * Math.exp(etaCl);
    for (let etaVd = initialBestVd - fineRangeVd; etaVd <= initialBestVd + fineRangeVd; etaVd += 0.01) {
      const vdCandidate = popVd * Math.exp(etaVd);
      const cPred = calcCPred(clCandidate, vdCandidate);
      if (cPred <= 0.001) continue;

      const obj = (etaCl * etaCl) / omegaSqCl +
                  (etaVd * etaVd) / omegaSqVd +
                  Math.pow(Math.log(cMeas) - Math.log(cPred), 2) / sigmaSq;

      if (obj < bestObj) {
        bestObj = obj;
        bestEtaCl = etaCl;
        bestEtaVd = etaVd;
      }
    }
  }

  // Final Individual Pharmacokinetic Parameters (Bayesian Posteriors)
  const indCl = Number((popCl * Math.exp(bestEtaCl)).toFixed(2));
  const indVd = Number((popVd * Math.exp(bestEtaVd)).toFixed(1));
  const kel = Number((indCl / indVd).toFixed(4));
  const halfLife = Number((Math.log(2) / kel).toFixed(1));

  // Steady-state Cmax and Cmin with estimated parameters
  const cMaxSs = Number(((dose / (tInf * indCl)) * ((1 - Math.exp(-kel * tInf)) / (1 - Math.exp(-kel * tau)))).toFixed(1));
  const cMinSs = Number((cMaxSs * Math.exp(-kel * (tau - tInf))).toFixed(1));

  // Daily dose and Steady-State AUC24:
  // By fundamental linear PK law: AUC24 = (Daily Dose) / CL
  const dailyDose = dose * (24 / tau);
  const auc24 = Number((dailyDose / indCl).toFixed(1));

  let attainment: 'subtherapeutic' | 'target' | 'supratherapeutic' = 'target';
  if (auc24 < targetMin) attainment = 'subtherapeutic';
  else if (auc24 > targetMax) attainment = 'supratherapeutic';

  // Target-oriented Dose Optimization: Target AUC24 midpoint = 500 mg*h/L
  const targetDailyDose = 500 * indCl;
  let suggestedTau = tau;

  // If patient has renal impairment and interval is too short:
  if (indCl < 1.8 && tau < 24) {
    suggestedTau = 24;
  } else if (indCl < 0.9 && tau < 48) {
    suggestedTau = 48;
  }

  const rawSuggestedDose = targetDailyDose / (24 / suggestedTau);
  const roundedSuggestedDose = Math.max(250, Math.round(rawSuggestedDose / 250) * 250);
  const predictedDailyDose = roundedSuggestedDose * (24 / suggestedTau);
  const predictedAuc24 = Number((predictedDailyDose / indCl).toFixed(1));

  let rec = '';
  if (attainment === 'target') {
    rec = `Duy trì chế độ liều hiện tại: ${dose} mg mỗi ${tau} giờ. AUC24 ước tính (${auc24} mg·h/L) đạt chuẩn trong khoảng đích 400 - 600 mg·h/L (ASHP 2020).`;
  } else if (attainment === 'subtherapeutic') {
    rec = `AUC24 hiện tại (${auc24} mg·h/L) DƯỚI ĐÍCH ĐIỀU TRỊ (< 400). Đề xuất TĂNG liều lên ${roundedSuggestedDose} mg mỗi ${suggestedTau} giờ để đạt AUC24 mục tiêu ~${predictedAuc24} mg·h/L.`;
  } else {
    const holdRecommendation = cMeas >= 25 
      ? `Tạm hoãn liều kế tiếp cho đến khi nồng độ giảm xuống < 15 mg/L, sau đó ` 
      : '';
    rec = `AUC24 hiện tại (${auc24} mg·h/L) VƯỢT NGƯỠNG AN TOÀN (> 600). Nguy cơ độc tính thận (AKI)! ${holdRecommendation}Đề xuất GIẢM liều xuống ${roundedSuggestedDose} mg mỗi ${suggestedTau} giờ (Dự đoán AUC24 ~${predictedAuc24} mg·h/L).`;
  }

  const sampleDesc = tdm.singleSampleType === 'random' 
    ? `mẫu bất kỳ (lấy ở giờ thứ ${tMeas} sau bắt đầu liều)` 
    : `mẫu đáy (C_trough = ${cMeas} mg/L)`;

  const clinicalNote = `Ước tính Bayes (MAP Bayesian - ASHP 2020) từ 1 ${sampleDesc}: CL_Bayes = ${indCl} L/h (quần thể CL_pop = ${popCl} L/h), Vd_Bayes = ${indVd} L (quần thể = ${popVd} L), t½ = ${halfLife} giờ, k_el = ${kel} h⁻¹. C_max dự tính: ${cMaxSs} mg/L, C_min dự tính: ${cMinSs} mg/L.`;

  return {
    auc24,
    auc24TargetMin: targetMin,
    auc24TargetMax: targetMax,
    targetAttainment: attainment,
    kel,
    halfLifeHours: halfLife,
    cMaxEstimated: cMaxSs,
    cMinEstimated: cMinSs,
    clEstimated: indCl,
    vdEstimated: indVd,
    popCl,
    popVd,
    estimationMethod: 'bayesian_single',
    adjustedDoseRecommendation: rec,
    suggestedDoseMg: roundedSuggestedDose,
    suggestedIntervalHours: suggestedTau,
    predictedAuc24,
    clinicalNote
  };
}

/**
 * TDM AUC24 Calculator supporting:
 * 1. Bayesian MAP Single-Sample (ASHP 2020 preferred - 1 sample in first 24-48h or trough)
 * 2. First-Order PK Analytic Equations (2-point Peak - Trough, Pai & Rodvold 2014)
 * 3. Continuous Infusion Css * 24
 */
export function evaluateTdm(
  tdm: TdmInput,
  patient?: PatientProfile,
  renal?: RenalCalculations
): TdmEvaluationResult {
  const targetMin = 400;
  const targetMax = 600;

  // Case A: Continuous Infusion
  if (tdm.regimenType === 'continuous') {
    const css = tdm.steadyStateConcentration || 0;
    const auc24 = Number((css * 24).toFixed(1));
    let attainment: 'subtherapeutic' | 'target' | 'supratherapeutic' = 'target';
    if (auc24 < targetMin) attainment = 'subtherapeutic';
    else if (auc24 > targetMax) attainment = 'supratherapeutic';

    // Target Css is 20 - 25 mg/L (midpoint 22.5 mg/L)
    const currentRate = tdm.currentDoseMg; // mg/day or mg/h
    const currentRateMgH = currentRate > 200 ? currentRate / 24 : currentRate;
    let suggestedRateMgH = currentRateMgH;
    let predictedAuc = auc24;

    if (css > 0) {
      suggestedRateMgH = Math.round((currentRateMgH * (22.5 / css)));
      predictedAuc = Number((22.5 * 24).toFixed(1));
    }

    let rec = '';
    if (attainment === 'target') {
      rec = `Duy trì tốc độ truyền hiện tại (${Math.round(currentRateMgH)} mg/h). AUC24 đạt trong mục tiêu 400 - 600 mg·h/L.`;
    } else if (attainment === 'subtherapeutic') {
      rec = `Tăng tốc độ truyền lên ${suggestedRateMgH} mg/h (tổng ${suggestedRateMgH * 24} mg/24h) để đưa AUC24 về khoảng ~540 mg·h/L (Css ~22.5 mg/L).`;
    } else {
      rec = `Giảm tốc độ truyền xuống ${suggestedRateMgH} mg/h (tổng ${suggestedRateMgH * 24} mg/24h) hoặc tạm ngưng truyền 2-4h nếu Css > 30 mg/L để tránh độc tính thận AKI.`;
    }

    return {
      auc24,
      auc24TargetMin: targetMin,
      auc24TargetMax: targetMax,
      targetAttainment: attainment,
      cMaxEstimated: css,
      cMinEstimated: css,
      estimationMethod: 'continuous_css',
      adjustedDoseRecommendation: rec,
      suggestedContinuousRateMgH: suggestedRateMgH,
      predictedAuc24: predictedAuc,
      clinicalNote: `Truyền tĩnh mạch liên tục: AUC24 được tính chính xác bằng công thức AUC24 = Css × 24. Mục tiêu Css lý tưởng: 20 – 25 mg/L.`
    };
  }

  // Case B: Intermittent Infusion
  // Check if Bayesian 1-sample or 2-point PK
  const isBayesian = tdm.intermittentMethod === 'bayesian_single' || 
    (!tdm.intermittentMethod && (!tdm.peakConcentration || tdm.peakConcentration <= 0));

  if (isBayesian) {
    return estimateBayesianSingleSample(tdm, patient, renal);
  }

  // Case C: Intermittent Infusion (2-point PK Analytic)
  const cPeak = tdm.peakConcentration || 0;
  const cTrough = tdm.troughConcentration || 0;
  const tInf = tdm.infusionDurationHours || 1.5;
  const tau = tdm.currentIntervalHours || 12;
  const dose = tdm.currentDoseMg || 1000;
  const tPeakAfterEnd = tdm.peakTimeAfterEndHours || 1.0; // typically 1-2 hours after infusion end
  const tTroughBeforeNext = tdm.troughTimeBeforeNextHours || 0.5; // typically 0.5 hour before next dose

  if (cPeak <= 0 || cTrough <= 0 || cPeak <= cTrough) {
    // If only trough is provided in 2-point mode, route to Bayesian!
    if (cTrough > 0) {
      return estimateBayesianSingleSample(tdm, patient, renal);
    }

    return {
      auc24: 0,
      auc24TargetMin: targetMin,
      auc24TargetMax: targetMax,
      targetAttainment: 'subtherapeutic',
      estimationMethod: 'two_point',
      adjustedDoseRecommendation: 'Vui lòng nhập nồng độ Đỉnh (C_peak) và Đáy (C_trough) để tính toán.',
      clinicalNote: 'Cần ít nhất 2 nồng độ huyết thanh để tính toán dược động học 2 điểm.'
    };
  }

  // Exact time between the two samples:
  const tPeakFromStart = tInf + tPeakAfterEnd;
  const tTroughFromStart = tau - tTroughBeforeNext;
  const deltaT = Math.max(0.5, tTroughFromStart - tPeakFromStart);

  // Elimination rate constant k_el
  const kel = Math.max(0.005, Number(((Math.log(cPeak) - Math.log(cTrough)) / deltaT).toFixed(4)));
  const halfLife = Number((Math.log(2) / kel).toFixed(1));

  // Back-extrapolate to true Cmax (at end of infusion, t = tInf)
  const cMaxTrue = Number((cPeak * Math.exp(kel * tPeakAfterEnd)).toFixed(1));
  // Forward-extrapolate to true Cmin (at end of dosing interval, t = tau)
  const cMinTrue = Number((cTrough * Math.exp(-kel * tTroughBeforeNext)).toFixed(1));

  // AUC over 1 dosing interval (tau) using Pai & Rodvold / Begg trapezoidal-exponential model:
  const aucInfusion = (tInf * (cMinTrue + cMaxTrue)) / 2;
  const aucElim = (cMaxTrue - cMinTrue) / kel;
  const aucInterval = aucInfusion + aucElim;
  const auc24 = Number((aucInterval * (24 / tau)).toFixed(1));

  let attainment: 'subtherapeutic' | 'target' | 'supratherapeutic' = 'target';
  if (auc24 < targetMin) attainment = 'subtherapeutic';
  else if (auc24 > targetMax) attainment = 'supratherapeutic';

  // Dose proportional adjustment: New Dose = Old Dose * (Target AUC / Current AUC)
  const targetMidpoint = 500;
  const rawSuggestedDose = (dose * targetMidpoint) / Math.max(100, auc24);
  const roundedSuggestedDose = Math.round(rawSuggestedDose / 250) * 250;
  const predictedAuc24 = Number((auc24 * (roundedSuggestedDose / dose)).toFixed(1));

  let rec = '';
  if (attainment === 'target') {
    rec = `Duy trì chế độ liều hiện tại: ${dose} mg mỗi ${tau} giờ. AUC24 (${auc24} mg·h/L) nằm lý tưởng trong khoảng đích 400 - 600 mg·h/L.`;
  } else if (attainment === 'subtherapeutic') {
    rec = `AUC24 hiện tại (${auc24} mg·h/L) dưới đích điều trị (< 400). Đề xuất TĂNG liều lên ${roundedSuggestedDose} mg mỗi ${tau} giờ (Dự đoán AUC24 ~${predictedAuc24} mg·h/L).`;
  } else {
    rec = `AUC24 hiện tại (${auc24} mg·h/L) vượt ngưỡng an toàn (> 600). Nguy cơ tổn thương thận cấp AKI! Đề xuất GIẢM liều xuống ${roundedSuggestedDose} mg mỗi ${tau} giờ (Dự đoán AUC24 ~${predictedAuc24} mg·h/L) hoặc kéo dài khoảng cách liều.`;
  }

  // Estimated clearance: CL = Dose_tau / AUC_tau
  const estimatedCl = Number(((dose / Math.max(1, aucInterval)) * (24 / tau)).toFixed(2));
  const estimatedVd = Number((estimatedCl / kel).toFixed(1));

  return {
    auc24,
    auc24TargetMin: targetMin,
    auc24TargetMax: targetMax,
    targetAttainment: attainment,
    kel,
    halfLifeHours: halfLife,
    cMaxEstimated: cMaxTrue,
    cMinEstimated: cMinTrue,
    clEstimated: estimatedCl,
    vdEstimated: estimatedVd,
    estimationMethod: 'two_point',
    adjustedDoseRecommendation: rec,
    suggestedDoseMg: roundedSuggestedDose,
    suggestedIntervalHours: tau,
    predictedAuc24,
    clinicalNote: `Dược động học 2 điểm (Pai & Rodvold 2014): k_el = ${kel} h⁻¹, t½ = ${halfLife} giờ, CL ước tính = ${estimatedCl} L/h. C_max dự tính: ${cMaxTrue} mg/L, C_min dự tính: ${cMinTrue} mg/L.`
  };
}
