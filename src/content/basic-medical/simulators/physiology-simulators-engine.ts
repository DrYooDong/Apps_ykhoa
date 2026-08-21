/**
 * CliniPortal 2.0 — Quantitative Physiology Mathematical Simulation Engine
 * Path: src/content/pathophysiology/simulators/physiology-simulators-engine.ts
 */

export interface NernstParams {
  tempC: number;
  kOut: number;
  kIn: number;
  naOut: number;
  naIn: number;
  clOut: number;
  clIn: number;
  caOut: number;
  caIn: number;
  pK: number;
  pNa: number;
  pCl: number;
}

export interface StarlingParams {
  pcArt: number;      // Arterial end capillary hydrostatic pressure (mmHg)
  pcVen: number;      // Venous end capillary hydrostatic pressure (mmHg)
  pcAvg: number;      // Mean capillary hydrostatic pressure (mmHg)
  pif: number;        // Interstitial hydrostatic pressure (mmHg)
  albumin: number;    // Serum Albumin (g/dL)
  piC: number;        // Capillary oncotic pressure (mmHg)
  piIf: number;       // Interstitial oncotic pressure (mmHg)
  kf: number;         // Filtration coefficient (mL/min/mmHg)
  sigma: number;      // Reflection coefficient (0 to 1)
  lymphFlow: number;  // Lymphatic drainage capacity (mL/min)
}

export interface FrankStarlingParams {
  edv: number;        // End-Diastolic Volume (mL) [Preload]
  inotropy: number;   // Contractility index (0.5 to 2.0, baseline 1.0)
  map: number;        // Mean Arterial Pressure (mmHg) [Afterload indicator]
  hr: number;         // Heart Rate (bpm)
  compliance: number; // Ventricular compliance factor (0.5 to 1.5)
}

export interface AcidBaseParams {
  hco3: number;       // Bicarbonate (mEq/L)
  pco2: number;       // Arterial pCO2 (mmHg)
  na: number;         // Sodium (mEq/L)
  cl: number;         // Chloride (mEq/L)
  albumin: number;    // Albumin (g/dL, baseline 4.0)
}

export interface O2HbParams {
  po2: number;        // Arterial PaO2 (mmHg)
  ph: number;         // Blood pH (baseline 7.40)
  pco2: number;       // PaCO2 (mmHg, baseline 40)
  tempC: number;      // Body temperature (°C, baseline 37)
  dpgFactor: number;  // 2,3-DPG factor (0.5 to 2.0, baseline 1.0)
  coHbPercent: number;// Carboxyhemoglobin % (baseline 0)
}

export interface CardiacAPParams {
  phase: number;          // Phase 0, 1, 2, 3, 4
  drugClass: 'none' | 'ia' | 'ib' | 'ic' | 'ii' | 'iii' | 'iv';
  heartRate: number;      // bpm
  extracellularK: number; // mmol/L
}

export class PhysiologySimEngine {
  /**
   * 1. NERNST & GOLDMAN-HODGKIN-KATZ (GHK) POTENTIAL
   */
  public static calculateNernstGHK(p: NernstParams) {
    const tempK = p.tempC + 273.15;
    const factor = ((2.303 * 8.314 * tempK) / 96485) * 1000; // ~61.5 mV at 37°C

    // Nernst individual equilibrium potentials: E = (factor / z) * log10(Out / In)
    const eK = factor * Math.log10(Math.max(0.1, p.kOut) / Math.max(1, p.kIn));
    const eNa = factor * Math.log10(Math.max(1, p.naOut) / Math.max(0.1, p.naIn));
    const eCl = -factor * Math.log10(Math.max(1, p.clOut) / Math.max(0.1, p.clIn));
    const eCa = (factor / 2) * Math.log10(Math.max(0.01, p.caOut) / Math.max(0.00001, p.caIn));

    // GHK Resting Membrane Potential (Vm)
    const numerator = (p.pK * p.kOut) + (p.pNa * p.naOut) + (p.pCl * p.clIn);
    const denominator = (p.pK * p.kIn) + (p.pNa * p.naIn) + (p.pCl * p.clOut);
    const vm = factor * Math.log10(Math.max(0.001, numerator) / Math.max(0.001, denominator));

    // Threshold and action potential excitability
    const threshold = -55; // mV
    const excitabilityGap = vm - threshold; // closer to 0 = more excitable (initially)

    // Clinical risk analysis
    let risk = 'Điện thế nghỉ trong giới hạn sinh lý bình thường (-70mV đến -90mV). Bơm Na+/K+-ATPase duy trì gradient nồng độ ion ổn định.';
    let alertType: 'info' | 'warning' | 'danger' = 'info';

    if (p.kOut > 6.0) {
      risk = `Tăng Kali máu nặng (${p.kOut.toFixed(1)} mmol/L) ➔ Khử cực màng mạn tính ($V_m = ${vm.toFixed(1)}$ mV), bất hoạt các kênh $Na_V$ nhanh. Nguy cơ: Kéo dài PR, QRS giãn rộng, sóng T nhọn đối xứng, rung thất hoặc vô tâm thu cấp cứu.`;
      alertType = 'danger';
    } else if (p.kOut > 5.2) {
      risk = `Tăng Kali máu nhẹ/vừa (${p.kOut.toFixed(1)} mmol/L) ➔ $V_m$ bớt âm hơn, ngưỡng kích thích ban đầu dễ đạt hơn nhưng dẫn truyền cơ tim chậm lại.`;
      alertType = 'warning';
    } else if (p.kOut < 3.0) {
      risk = `Hạ Kali máu nặng (${p.kOut.toFixed(1)} mmol/L) ➔ Ưu phân cực màng ($V_m = ${vm.toFixed(1)}$ mV), làm chậm tái cực thất. Nguy cơ: Sóng U, đoạn ST chênh xuống, xoắn đỉnh (Torsades de Pointes) và loạn nhịp ác tính.`;
      alertType = 'danger';
    } else if (p.kOut < 3.5) {
      risk = `Hạ Kali máu nhẹ (${p.kOut.toFixed(1)} mmol/L) ➔ Ưu phân cực màng, tăng tính kích thích tự động của tế bào cơ tim.`;
      alertType = 'warning';
    } else if (p.naOut < 125) {
      risk = `Hạ Natri máu nặng (${p.naOut.toFixed(0)} mmol/L) ➔ Giảm gradient nồng độ $Na^+$ qua màng, giảm $E_{Na}$, làm giảm biên độ điện thế hoạt động và gây phù tế bào thần kinh trung ương (phù não).`;
      alertType = 'danger';
    } else if (p.pNa > 0.15) {
      risk = `Tăng tính thấm Natri ($P_{Na}/P_K = ${p.pNa.toFixed(2)}$) ➔ Dòng Natri ồ ạt đi vào trong tế bào, màng chuyển dịch từ điện thế nghỉ sang pha Khử cực (Depolarization).`;
      alertType = 'info';
    }

    return {
      eK: parseFloat(eK.toFixed(1)),
      eNa: parseFloat(eNa.toFixed(1)),
      eCl: parseFloat(eCl.toFixed(1)),
      eCa: parseFloat(eCa.toFixed(1)),
      vm: parseFloat(vm.toFixed(1)),
      threshold,
      excitabilityGap: parseFloat(excitabilityGap.toFixed(1)),
      risk,
      alertType
    };
  }

  /**
   * 2. MICROVASCULAR STARLING FORCES & EDEMA KINETICS
   */
  public static calculateStarling(p: StarlingParams) {
    // Colloid Oncotic Pressure from Albumin formula: πc ≈ 2.8*Alb + 0.18*Alb^2
    const calculatedPiC = p.albumin > 0 
      ? (2.8 * p.albumin + 0.18 * Math.pow(p.albumin, 2))
      : p.piC;
    const effectivePiC = p.piC > 0 ? p.piC : calculatedPiC;

    // Pressure at Arterial End
    const deltaPArt = p.pcArt - p.pif;
    const deltaPi = effectivePiC - p.piIf;
    const nfpArt = deltaPArt - (p.sigma * deltaPi);

    // Pressure at Venous End
    const deltaPVen = p.pcVen - p.pif;
    const nfpVen = deltaPVen - (p.sigma * deltaPi);

    // Mean Net Filtration Pressure (NFP)
    const deltaPAvg = p.pcAvg - p.pif;
    const nfpAvg = deltaPAvg - (p.sigma * deltaPi);

    // Net Fluid Filtration Rate Jv = Kf * NFP (mL/min)
    const jv = p.kf * nfpAvg;
    // Interstitial Fluid Accumulation Rate = Jv - LymphFlow
    const accumulation = Math.max(0, jv - p.lymphFlow);

    let edemaGrade = 'Độ 0 — Không phù (Bạch huyết dẫn lưu tốt)';
    let edemaState = 'Cân bằng dịch mô kẽ bình thường. Lưu lượng lọc mao mạch nằm trong khả năng bù trừ của hệ bạch huyết.';
    let alertType: 'info' | 'warning' | 'danger' = 'info';

    if (accumulation > 5.0) {
      edemaGrade = 'Độ 4 — Phù toàn thân / Phù phổi cấp';
      edemaState = `Tích tụ dịch mô kẽ ồ ạt ($J_v = +${jv.toFixed(1)}$ mL/min >> Bạch huyết ${p.lymphFlow} mL/min). Nguy cơ tràn dịch đa màng, suy hô hấp cấp do phù phổi kẽ và phế nang.`;
      alertType = 'danger';
    } else if (accumulation > 2.0) {
      edemaGrade = 'Độ 3 — Phù trung bình đến nặng';
      edemaState = `Ứ dịch khoang kẽ rõ rệt ($J_v = +${jv.toFixed(1)}$ mL/min). Phù ấn lõm sâu (4-6mm), tái hồi chậm, thấy rõ ở chi dưới hoặc vùng thấp.`;
      alertType = 'danger';
    } else if (accumulation > 0.5) {
      edemaGrade = 'Độ 1-2 — Phù nhẹ đến vừa';
      edemaState = `Lưu lượng lọc vượt nhẹ khả năng dẫn lưu bạch huyết. Phù ấn lõm nhẹ (2mm), tái hồi nhanh.`;
      alertType = 'warning';
    } else if (jv < -0.5) {
      edemaGrade = 'Hút dịch vào lòng mạch (Autotransfusion)';
      edemaState = `Áp lực keo vượt áp lực thủy tĩnh ($J_v = ${jv.toFixed(1)}$ mL/min) ➔ Cơ thể tự động hút dịch từ mô kẽ bù vào lòng mạch (Gặp trong mất máu cấp, sốc giảm thể tích).`;
      alertType = 'info';
    }

    return {
      effectivePiC: parseFloat(effectivePiC.toFixed(1)),
      nfpArt: parseFloat(nfpArt.toFixed(2)),
      nfpVen: parseFloat(nfpVen.toFixed(2)),
      nfpAvg: parseFloat(nfpAvg.toFixed(2)),
      jv: parseFloat(jv.toFixed(2)),
      accumulation: parseFloat(accumulation.toFixed(2)),
      edemaGrade,
      edemaState,
      alertType
    };
  }

  /**
   * 3. FRANK-STARLING & LEFT VENTRICULAR PV LOOP
   */
  public static calculateFrankStarling(p: FrankStarlingParams) {
    const maxSv = 140; // Max achievable SV in normal heart (mL)
    const edv50 = 80;  // EDV at half-maximal SV
    const afterloadFactor = Math.max(0.4, 1 - ((p.map - 80) * 0.0038)); // High afterload reduces SV

    let sv = p.inotropy * (maxSv * p.edv / (edv50 + p.edv)) * afterloadFactor * p.compliance;
    sv = Math.min(p.edv * 0.88, Math.max(8, sv)); // Physical bounds

    const esv = Math.max(5, p.edv - sv);
    const ef = (sv / p.edv) * 100;
    const co = (sv * p.hr) / 1000; // L/min
    const ci = co / 1.73; // Cardiac index (BSA 1.73 m2)

    // Pressure-Volume Loop Characteristics
    // ESPVR slope (End-Systolic Elastance Ees ~ Inotropy)
    const ees = 2.2 * p.inotropy; // mmHg/mL
    // Peak Systolic LV Pressure ~ MAP + 25
    const peakLvPress = p.map + 22;
    // End-Diastolic Pressure (EDP) from exponential filling
    const edp = Math.min(45, Math.max(3, 4 * Math.exp(0.015 * p.edv) / p.compliance));
    // Stroke Work SW = SV * (MAP - LAP) [converting to gram-meters or mmHg*mL]
    const strokeWork = (sv * (p.map - edp)) / 100; // cJ (centijoules approx)

    let clinicalInsight = 'Huyết động ổn định, cung lượng tim và phân suất tống máu trong giới hạn bình thường.';
    let alertType: 'info' | 'warning' | 'danger' = 'info';

    if (ef < 30 || ci < 1.8) {
      clinicalInsight = `Sốc Tim / Suy Tim Tâm Thu Rất Nặng ($EF = ${ef.toFixed(0)}\\%$, $CI = ${ci.toFixed(1)}$ L/min/m²). Áp lực đổ đầy thất trái tăng cao ($EDP \\approx ${edp.toFixed(0)}$ mmHg), nguy cơ ứ huyết phổi. Chỉ định thuốc tăng co bóp inotrope (Dobutamine, Milrinone) hoặc hỗ trợ tuần hoàn cơ học (IABP, ECMO).`;
      alertType = 'danger';
    } else if (ef < 45 || ci < 2.2) {
      clinicalInsight = `Suy Tim Phân Suất Tống Máu Giảm ($EF = ${ef.toFixed(0)}\\%$, $CI = ${ci.toFixed(1)}$ L/min/m²). Tim hoạt động dưới mức tối ưu, giảm dự trữ co bóp.`;
      alertType = 'warning';
    } else if (p.edv > 185 && p.inotropy < 0.9) {
      clinicalInsight = `Quá tải thể tích buồng tim (Giãn thất trái mạn tính). Điểm làm việc nằm ở đoạn bão hòa/sụt giảm của đường cong Frank-Starling. Cần dùng lợi tiểu giảm tiền tải.`;
      alertType = 'warning';
    } else if (p.edv < 70) {
      clinicalInsight = `Thiếu hụt tiền tải nghiêm trọng ($EDV = ${p.edv}$ mL). Thể tích nhát bóp giảm do không đủ máu đổ về tâm thất (Sốc giảm thể tích, mất máu, mất nước). Cần bù dịch hồi sức.`;
      alertType = 'warning';
    }

    return {
      sv: parseFloat(sv.toFixed(1)),
      esv: parseFloat(esv.toFixed(1)),
      ef: parseFloat(ef.toFixed(1)),
      co: parseFloat(co.toFixed(2)),
      ci: parseFloat(ci.toFixed(2)),
      ees: parseFloat(ees.toFixed(2)),
      peakLvPress: parseFloat(peakLvPress.toFixed(1)),
      edp: parseFloat(edp.toFixed(1)),
      strokeWork: parseFloat(strokeWork.toFixed(1)),
      clinicalInsight,
      alertType
    };
  }

  /**
   * 4. HENDERSON-HASSELBALCH & DAVENPORT / BOSTON NOMOGRAM
   */
  public static calculateAcidBase(p: AcidBaseParams) {
    // Henderson-Hasselbalch equation: pH = 6.1 + log10( [HCO3-] / (0.03 * pCO2) )
    const ph = 6.1 + Math.log10(Math.max(1, p.hco3) / Math.max(1, 0.03 * p.pco2));
    
    // Anion Gap (AG) = Na - (Cl + HCO3)
    const rawAg = p.na - (p.cl + p.hco3);
    // Albumin-corrected Anion Gap: AG_corr = AG + 2.5 * (4.0 - Albumin)
    const correctedAg = rawAg + 2.5 * (4.0 - Math.max(0.5, p.albumin));
    
    // Delta Ratio = (AG_corr - 12) / (24 - HCO3) (Used when High AG Metabolic Acidosis)
    let deltaRatio: number | null = null;
    let deltaInterpretation = '';
    if (correctedAg > 12 && p.hco3 < 24) {
      deltaRatio = (correctedAg - 12) / Math.max(1, 24 - p.hco3);
      if (deltaRatio < 0.4) deltaInterpretation = 'Toan chuyển hóa tăng AG kết hợp Toan chuyển hóa bình thường AG (NAGMA).';
      else if (deltaRatio < 0.8) deltaInterpretation = 'HAGMA kèm NAGMA đồng thời (ví dụ DKA kèm tiêu chảy).';
      else if (deltaRatio <= 2.0) deltaInterpretation = 'Toan chuyển hóa tăng AG đơn thuần (HAGMA điển hình: DKA, Lactic, Suy thận).';
      else deltaInterpretation = 'HAGMA kèm Kiềm chuyển hóa đồng thời hoặc Toan hô hấp mạn tính có tăng HCO3- nền.';
    }

    // Expected pCO2 by Winter's Formula in Metabolic Acidosis: pCO2 = 1.5 * HCO3 + 8 (+/- 2)
    const expectedWinterPco2 = 1.5 * p.hco3 + 8;
    // Expected pCO2 in Metabolic Alkalosis: pCO2 = 0.7 * (HCO3 - 24) + 40 (+/- 5)
    const expectedAlkalosisPco2 = 0.7 * (p.hco3 - 24) + 40;

    // Diagnosis classifier
    let primaryDisorder = '';
    let compensation = '';
    let alertType: 'info' | 'warning' | 'danger' = 'info';

    if (ph < 7.35) {
      alertType = 'danger';
      if (p.hco3 < 22 && p.pco2 <= 45) {
        primaryDisorder = 'Toan Chuyển Hóa (Metabolic Acidosis)';
        if (correctedAg > 14) primaryDisorder += ' — Tăng Anion Gap (HAGMA: Ceton, Lactate, Nhiễm độc, Suy thận)';
        else primaryDisorder += ' — Anion Gap Bình Thường (NAGMA: Mất qua tiêu hóa, Toan ống thận)';

        if (Math.abs(p.pco2 - expectedWinterPco2) <= 2) {
          compensation = `Bù trừ hô hấp đầy đủ qua tăng thông khí (pCO2 đo được ${p.pco2} ≈ Winter ${expectedWinterPco2.toFixed(0)} ± 2).`;
        } else if (p.pco2 > expectedWinterPco2 + 2) {
          compensation = `Toan hô hấp phối hợp (pCO2 ${p.pco2} cao hơn mức bù Winter ${expectedWinterPco2.toFixed(0)} ➔ Giảm thông khí phối hợp).`;
        } else {
          compensation = `Kiềm hô hấp phối hợp (pCO2 ${p.pco2} thấp hơn mức bù Winter ${expectedWinterPco2.toFixed(0)} ➔ Tăng thông khí quá mức).`;
        }
      } else if (p.pco2 > 45) {
        primaryDisorder = 'Toan Hô Hấp (Respiratory Acidosis — Ứ khí CO2, Giảm thông khí, COPD, Suy hô hấp)';
        compensation = p.hco3 > 27 
          ? `Có đáp ứng bù trừ của thận (HCO3- = ${p.hco3} mEq/L ➔ Hướng đến Toan hô hấp mạn tính).` 
          : `Toan hô hấp cấp tính (Thận chưa kịp tăng tái hấp thu Bicarbonate).`;
      } else {
        primaryDisorder = 'Toan máu hỗn hợp (Mixed Acidosis: Toan chuyển hóa + Toan hô hấp)';
      }
    } else if (ph > 7.45) {
      alertType = 'warning';
      if (p.hco3 > 26) {
        primaryDisorder = 'Kiềm Chuyển Hóa (Metabolic Alkalosis — Nôn ói mất toan, Dùng lợi tiểu quai, Cường Aldosterone)';
        compensation = p.pco2 > 42 
          ? `Bù trừ hô hấp thích hợp qua giảm thông khí nhẹ (pCO2 = ${p.pco2} mmHg).` 
          : `Chưa có đáp ứng bù trừ giảm thông khí rõ.`;
      } else if (p.pco2 < 35) {
        primaryDisorder = 'Kiềm Hô Hấp (Respiratory Alkalosis — Tăng thông khí phế nang, Lo âu, Đau, Thuyên tắc phổi, Thiếu oxy cấp)';
        compensation = p.hco3 < 22 
          ? `Có bù trừ chuyển hóa qua thận (giảm tái hấp thu HCO3-).` 
          : `Kiềm hô hấp cấp tính.`;
      }
    } else {
      primaryDisorder = 'pH trong giới hạn bình thường (7.35 - 7.45)';
      if (correctedAg > 14 && p.hco3 >= 22) {
        primaryDisorder += ' ➔ Phát hiện Toan chuyển hóa tăng AG tiềm ẩn đi kèm Kiềm chuyển hóa đồng thời!';
        alertType = 'warning';
      } else if (p.pco2 > 45 && p.hco3 > 28) {
        primaryDisorder += ' ➔ Rối loạn hỗn hợp: Toan hô hấp mạn bù trừ hoàn toàn hoặc kết hợp Kiềm chuyển hóa.';
        alertType = 'info';
      }
    }

    return {
      ph: parseFloat(ph.toFixed(2)),
      anionGap: parseFloat(rawAg.toFixed(1)),
      correctedAg: parseFloat(correctedAg.toFixed(1)),
      deltaRatio: deltaRatio !== null ? parseFloat(deltaRatio.toFixed(2)) : null,
      deltaInterpretation,
      expectedWinterPco2: parseFloat(expectedWinterPco2.toFixed(1)),
      expectedAlkalosisPco2: parseFloat(expectedAlkalosisPco2.toFixed(1)),
      primaryDisorder,
      compensation,
      alertType
    };
  }

  /**
   * 5. OXYGEN-HEMOGLOBIN DISSOCIATION CURVE & BOHR EFFECT
   */
  public static calculateO2HbCurve(p: O2HbParams) {
    // Calculate P50 effective shift based on Hill's Equation modified for Bohr Effect:
    // P50_eff = 26.8 * 10^[ 0.40*(7.40 - pH) + 0.06*log10(pCO2/40) + 0.024*(Temp - 37) + 0.05*(DPG - 1.0) ]
    const p50Baseline = 26.8; // mmHg at standard conditions (pH 7.40, pCO2 40, T 37, DPG 1.0)
    const phDelta = 7.40 - p.ph;
    const pco2Ratio = Math.max(0.2, p.pco2 / 40);
    const tempDelta = p.tempC - 37;
    const dpgDelta = p.dpgFactor - 1.0;

    const shiftExponent = (0.40 * phDelta) + (0.06 * Math.log10(pco2Ratio)) + (0.024 * tempDelta) + (0.05 * dpgDelta);
    const effectiveP50 = p50Baseline * Math.pow(10, shiftExponent);

    // Hill Equation for Saturation: SaO2 = (PO2^n) / (P50^n + PO2^n) where Hill coefficient n ~ 2.7
    const hillN = 2.7;
    const po2Hill = Math.pow(Math.max(0.1, p.po2), hillN);
    const p50Hill = Math.pow(effectiveP50, hillN);
    let saO2 = (po2Hill / (p50Hill + po2Hill)) * 100;

    // Carboxyhemoglobin (CO-Hb) effect: reduces available Hb sites and shifts curve strongly to the LEFT (Haldane effect)
    if (p.coHbPercent > 0) {
      saO2 = saO2 * (1 - (p.coHbPercent / 100));
    }
    saO2 = Math.min(100, Math.max(0, saO2));

    // Shift Direction
    let shiftDirection: 'left' | 'normal' | 'right' = 'normal';
    let shiftReason = 'Ái lực Oxy-Hemoglobin bình thường ($P_{50} = 26.8$ mmHg).';
    let alertType: 'info' | 'warning' | 'danger' = 'info';

    if (effectiveP50 > 30) {
      shiftDirection = 'right';
      shiftReason = `Đường cong lệch PHẢI ($P_{50} = ${effectiveP50.toFixed(1)}$ mmHg > 26.8) ➔ Giảm ái lực của Hb với Oxy, GIÚP TĂNG CƯỜNG NHẢ OXY CHO MÔ! (Nguyên nhân: Toan máu pH ↓, pCO2 ↑, Sốt/Nhiệt độ ↑, 2,3-DPG ↑ lúc gắng sức).`;
      alertType = 'info';
    } else if (effectiveP50 < 23 || p.coHbPercent > 10) {
      shiftDirection = 'left';
      shiftReason = `Đường cong lệch TRÁI ($P_{50} = ${effectiveP50.toFixed(1)}$ mmHg < 26.8) ➔ Tăng ái lực của Hb với Oxy, GIỮ CHẶT OXY VÀ KHÓ NHẢ OXY CHO MÔ ➔ Nguy cơ thiếu oxy tế bào! (Nguyên nhân: Kiềm máu pH ↑, pCO2 ↓, Hạ thân nhiệt, Giảm 2,3-DPG khi truyền máu lưu trữ lâu, hoặc Ngộ độc Carbon Monoxide CO).`;
      alertType = 'warning';
    }

    if (p.po2 < 60) {
      alertType = 'danger';
    }

    return {
      saO2: parseFloat(saO2.toFixed(1)),
      effectiveP50: parseFloat(effectiveP50.toFixed(1)),
      shiftDirection,
      shiftReason,
      isHypoxemic: p.po2 < 60,
      alertType
    };
  }

  /**
   * 6. CARDIAC ACTION POTENTIAL & ION CHANNEL PHARMACOLOGY
   */
  public static calculateCardiacAP(p: CardiacAPParams) {
    // Action potential duration (APD) baseline ~ 300 ms at HR 75 bpm
    let apd = 300 * Math.sqrt(75 / Math.max(40, p.heartRate));
    let phase0Slope = 1.0; // max dV/dt (V/s relative)
    let phase2Height = 1.0; // Ca2+ plateau duration
    let erp = apd * 0.85; // Effective refractory period

    let drugEffectSummary = 'Điện thế hoạt động cơ tim thất bình thường.';
    let ekgFinding = 'Khoảng PR và QTc trong giới hạn bình thường.';
    let alertType: 'info' | 'warning' | 'danger' = 'info';

    switch (p.drugClass) {
      case 'ia': // Quinidine, Procainamide, Disopyramide
        phase0Slope = 0.65;
        apd *= 1.25;
        erp = apd * 0.92;
        drugEffectSummary = 'Thuốc Nhóm IA (Quinidine, Procainamide): Ức chế vừa phải kênh $Na^+$ (giảm dV/dt pha 0) + Ức chế kênh $K^+$ (kéo dài pha 3 tái cực).';
        ekgFinding = 'Kéo dài khoảng QRS và QTc ➔ Nguy cơ xoắn đỉnh (Torsades de Pointes).';
        alertType = 'warning';
        break;
      case 'ib': // Lidocaine, Mexiletine
        phase0Slope = 0.90;
        apd *= 0.82;
        erp = apd * 0.88;
        drugEffectSummary = 'Thuốc Nhóm IB (Lidocaine, Mexiletine): Ức chế nhẹ kênh $Na^+$ ở mô cơ tim thiếu máu/khử cực, rút ngắn thời gian điện thế hoạt động (APD).';
        ekgFinding = 'Rút ngắn nhẹ QTc, hiệu quả cao trong loạn nhịp thất sau nhồi máu cơ tim.';
        alertType = 'info';
        break;
      case 'ic': // Flecainide, Propafenone
        phase0Slope = 0.35;
        apd *= 1.02;
        erp = apd * 0.85;
        drugEffectSummary = 'Thuốc Nhóm IC (Flecainide, Propafenone): Ức chế rất mạnh kênh $Na^+$ (giảm mạnh dV/dt pha 0), phân ly cực kỳ chậm.';
        ekgFinding = 'QRS giãn rất rộng trên ECG, chống chỉ định ở bệnh nhân có bệnh tim thực tổn / sau NMCT (Thử nghiệm CAST).';
        alertType = 'danger';
        break;
      case 'ii': // Beta-blockers (Metoprolol, Atenolol)
        phase2Height = 0.85;
        drugEffectSummary = 'Thuốc Nhóm II (Chẹn thụ thể Beta giao cảm): Giảm dòng $I_{Ca,L}$ qua trung gian cAMP, giảm tính tự động nút xoang và làm chậm dẫn truyền nút nhĩ thất (AV).';
        ekgFinding = 'Kéo dài khoảng PR, giảm nhịp tim, ngăn ngừa rung thất.';
        alertType = 'info';
        break;
      case 'iii': // Amiodarone, Sotalol
        apd *= 1.40;
        erp = apd * 0.95;
        drugEffectSummary = 'Thuốc Nhóm III (Amiodarone, Sotalol): Ức chế kênh Kali $I_{Kr}/I_{Ks}$, kéo dài rõ rệt pha 2 & pha 3 tái cực và thời kỳ trơ hữu hiệu (ERP).';
        ekgFinding = 'Kéo dài đáng kể khoảng QTc, hiệu quả phổ rộng trên cả loạn nhịp nhĩ và thất.';
        alertType = 'warning';
        break;
      case 'iv': // Verapamil, Diltiazem
        phase2Height = 0.70;
        drugEffectSummary = 'Thuốc Nhóm IV (Chẹn kênh Canxi nhóm Non-DHP): Ức chế kênh $Ca^{2+}$ L-type pha 2, làm chậm dẫn truyền qua nút nhĩ thất (AV node).';
        ekgFinding = 'Kéo dài khoảng PR, hạ nhịp tim, điều trị nhịp nhanh kịch phát trên thất (PSVT).';
        alertType = 'info';
        break;
    }

    return {
      apd: parseFloat(apd.toFixed(0)),
      erp: parseFloat(erp.toFixed(0)),
      phase0Slope: parseFloat(phase0Slope.toFixed(2)),
      phase2Height: parseFloat(phase2Height.toFixed(2)),
      drugEffectSummary,
      ekgFinding,
      alertType
    };
  }
}
