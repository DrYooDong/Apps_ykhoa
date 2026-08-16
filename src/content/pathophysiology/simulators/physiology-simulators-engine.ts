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
  pc: number;     // Capillary hydrostatic pressure (mmHg)
  pif: number;    // Interstitial hydrostatic pressure (mmHg)
  piC: number;    // Capillary oncotic pressure (mmHg, related to Albumin)
  piIf: number;   // Interstitial oncotic pressure (mmHg)
  kf: number;     // Filtration coefficient (mL/min/mmHg)
  sigma: number;  // Reflection coefficient (0 to 1)
  lymphFlow: number; // Lymphatic drainage capacity (mL/min)
}

export interface FrankStarlingParams {
  edv: number;        // End-Diastolic Volume (mL) [Preload]
  inotropy: number;   // Contractility index (0.5 to 2.0, baseline 1.0)
  map: number;        // Mean Arterial Pressure (mmHg) [Afterload indicator]
  hr: number;         // Heart Rate (bpm)
}

export interface AcidBaseParams {
  hco3: number;   // Bicarbonate (mEq/L)
  pco2: number;   // Arterial pCO2 (mmHg)
  na: number;     // Sodium (mEq/L)
  cl: number;     // Chloride (mEq/L)
  albumin: number;// Albumin (g/dL, baseline 4.0)
}

export class PhysiologySimEngine {
  /**
   * 1. NERNST & GOLDMAN-HODGKIN-KATZ (GHK) POTENTIAL
   */
  public static calculateNernstGHK(p: NernstParams) {
    const tempK = p.tempC + 273.15;
    const factor = (2.303 * 8.314 * tempK) / 96485 * 1000; // ~61.5 mV at 37°C

    // Nernst individual equilibrium potentials: E = (factor / z) * log10(Out / In)
    const eK = factor * Math.log10(Math.max(0.1, p.kOut) / Math.max(1, p.kIn));
    const eNa = factor * Math.log10(Math.max(1, p.naOut) / Math.max(0.1, p.naIn));
    const eCl = -factor * Math.log10(Math.max(1, p.clOut) / Math.max(0.1, p.clIn));
    const eCa = (factor / 2) * Math.log10(Math.max(0.01, p.caOut) / Math.max(0.00001, p.caIn));

    // GHK Resting Membrane Potential (Vm)
    const numerator = (p.pK * p.kOut) + (p.pNa * p.naOut) + (p.pCl * p.clIn);
    const denominator = (p.pK * p.kIn) + (p.pNa * p.naIn) + (p.pCl * p.clOut);
    const vm = factor * Math.log10(Math.max(0.001, numerator) / Math.max(0.001, denominator));

    // Clinical risk analysis
    let risk = 'Bình thường (Nghỉ ~ -70mV đến -90mV)';
    let alertType: 'info' | 'warning' | 'danger' = 'info';

    if (p.kOut > 5.5) {
      risk = `Tăng Kali máu (${p.kOut.toFixed(1)} mmol/L) ➔ Khử cực màng một phần ($V_m$ bớt âm hơn), ức chế kênh $Na_V$, nguy cơ chậm dẫn truyền, sóng T nhọn, rung thất / vô tâm thu.`;
      alertType = 'danger';
    } else if (p.kOut < 3.5) {
      risk = `Hạ Kali máu (${p.kOut.toFixed(1)} mmol/L) ➔ Ưu phân cực màng ($V_m$ âm sâu hơn), kéo dài tái cực, sóng U, xoắn đỉnh / loạn nhịp thất.`;
      alertType = 'warning';
    } else if (p.naOut < 135) {
      risk = `Hạ Natri máu (${p.naOut.toFixed(0)} mmol/L) ➔ Giảm chênh lệch nồng độ $Na^+$, giảm biên độ điện thế hoạt động, nguy cơ phù não.`;
      alertType = 'warning';
    }

    return {
      eK: parseFloat(eK.toFixed(1)),
      eNa: parseFloat(eNa.toFixed(1)),
      eCl: parseFloat(eCl.toFixed(1)),
      eCa: parseFloat(eCa.toFixed(1)),
      vm: parseFloat(vm.toFixed(1)),
      risk,
      alertType
    };
  }

  /**
   * 2. MICROVASCULAR STARLING FORCES & EDEMA
   */
  public static calculateStarling(p: StarlingParams) {
    // Net Hydrostatic Pressure: ΔP = Pc - Pif
    const deltaP = p.pc - p.pif;
    // Net Oncotic Pressure: Δπ = πc - πif
    const deltaPi = p.piC - p.piIf;
    // Net Filtration Pressure (NFP) = ΔP - σ*Δπ
    const nfp = deltaP - (p.sigma * deltaPi);
    // Net Fluid Filtration Rate Jv = Kf * NFP (mL/min)
    const jv = p.kf * nfp;
    // Net Accumulation = Jv - LymphFlow
    const accumulation = Math.max(0, jv - p.lymphFlow);

    let edemaState = 'Cân bằng dịch mô kẽ bình thường (Bạch huyết dẫn lưu tốt)';
    let alertType: 'info' | 'warning' | 'danger' = 'info';

    if (accumulation > 4.0) {
      edemaState = `Phù mô kẽ nghiêm trọng / Nguy cơ Phù phổi cấp ($J_v = +${jv.toFixed(1)}$ mL/min vượt quá khả năng bạch huyết).`;
      alertType = 'danger';
    } else if (accumulation > 0.8) {
      edemaState = `Bắt đầu ứ dịch mô kẽ ($J_v = +${jv.toFixed(1)}$ mL/min). Phù có thể phát hiện trên lâm sàng.`;
      alertType = 'warning';
    } else if (jv < -0.5) {
      edemaState = `Hút dịch ngược vào lòng mạch ($J_v = ${jv.toFixed(1)}$ mL/min) ➔ Gặp trong mất máu cấp, sốc co mạch mạnh.`;
      alertType = 'info';
    }

    return {
      deltaP: parseFloat(deltaP.toFixed(1)),
      deltaPi: parseFloat(deltaPi.toFixed(1)),
      nfp: parseFloat(nfp.toFixed(2)),
      jv: parseFloat(jv.toFixed(2)),
      accumulation: parseFloat(accumulation.toFixed(2)),
      edemaState,
      alertType
    };
  }

  /**
   * 3. FRANK-STARLING & HEMODYNAMICS
   */
  public static calculateFrankStarling(p: FrankStarlingParams) {
    // Non-linear ventricular function curve:
    // SV = Inotropy * (SV_max * EDV / (EDV_50 + EDV)) * Afterload_attenuation
    const maxSv = 140; // Max achievable SV in healthy heart (mL)
    const edv50 = 80;  // EDV at half-maximal SV
    const afterloadFactor = Math.max(0.5, 1 - ((p.map - 80) * 0.0035)); // High afterload reduces SV

    let sv = p.inotropy * (maxSv * p.edv / (edv50 + p.edv)) * afterloadFactor;
    sv = Math.min(p.edv * 0.85, Math.max(10, sv)); // Physical bounds

    const esv = Math.max(5, p.edv - sv);
    const ef = (sv / p.edv) * 100;
    const co = (sv * p.hr) / 1000; // L/min
    const ci = co / 1.73; // Cardiac index (assuming BSA 1.73 m2)

    let clinicalInsight = 'Huyết động ổn định';
    let alertType: 'info' | 'warning' | 'danger' = 'info';

    if (ef < 35 || ci < 2.0) {
      clinicalInsight = `Hội chứng Suy tim nặng / Sốc tim ($EF = ${ef.toFixed(0)}\\%$, $CI = ${ci.toFixed(1)}$ L/min/m²). Cần cân nhắc inotrope (Dobutamine, Milrinone) hoặc hỗ trợ tuần hoàn.`;
      alertType = 'danger';
    } else if (ef < 50) {
      clinicalInsight = `Phân suất tống máu giảm nhẹ/trung bình ($EF = ${ef.toFixed(0)}\\%$). Tim hoạt động dưới mức tối ưu.`;
      alertType = 'warning';
    } else if (p.edv > 180 && p.inotropy < 0.9) {
      clinicalInsight = `Quá tải thể tích buồng tim (Giãn thất trái). Điểm làm việc rơi vào đoạn bão hòa/sụt giảm của đường cong Starling.`;
      alertType = 'warning';
    }

    return {
      sv: parseFloat(sv.toFixed(1)),
      esv: parseFloat(esv.toFixed(1)),
      ef: parseFloat(ef.toFixed(1)),
      co: parseFloat(co.toFixed(2)),
      ci: parseFloat(ci.toFixed(2)),
      clinicalInsight,
      alertType
    };
  }

  /**
   * 4. HENDERSON-HASSELBALCH & ACID-BASE NOMOGRAM
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
    if (correctedAg > 12 && p.hco3 < 24) {
      deltaRatio = (correctedAg - 12) / Math.max(1, 24 - p.hco3);
    }

    // Expected pCO2 by Winter's Formula in Metabolic Acidosis: pCO2 = 1.5 * HCO3 + 8 (+/- 2)
    const expectedWinterPco2 = 1.5 * p.hco3 + 8;

    // Diagnosis classifier
    let primaryDisorder = '';
    let compensation = '';
    let alertType: 'info' | 'warning' | 'danger' = 'info';

    if (ph < 7.35) {
      alertType = 'danger';
      if (p.hco3 < 22 && p.pco2 <= 45) {
        primaryDisorder = 'Toan chuyển hóa (Metabolic Acidosis)';
        if (correctedAg > 14) primaryDisorder += ' — Tăng Anion Gap (HAGMA: Ceton, Lactate, Suy thận, Nhiễm độc)';
        else primaryDisorder += ' — Anion Gap Bình thường (NAGMA: Mất qua phân, Toan ống thận)';

        if (Math.abs(p.pco2 - expectedWinterPco2) <= 2) {
          compensation = `Bù trừ hô hấp đầy đủ (pCO2 đo được ${p.pco2} ≈ Winter ${expectedWinterPco2.toFixed(0)} ± 2).`;
        } else if (p.pco2 > expectedWinterPco2 + 2) {
          compensation = `Toan hô hấp phối hợp (pCO2 ${p.pco2} cao hơn mức bù Winter ${expectedWinterPco2.toFixed(0)}).`;
        } else {
          compensation = `Kiềm hô hấp phối hợp (pCO2 ${p.pco2} thấp hơn mức bù Winter ${expectedWinterPco2.toFixed(0)}).`;
        }
      } else if (p.pco2 > 45) {
        primaryDisorder = 'Toan hô hấp (Respiratory Acidosis — Giảm thông khí, COPD, Ức chế thần kinh)';
        compensation = p.hco3 > 26 ? 'Có đáp ứng bù trừ của thận (tăng tái hấp thu HCO3-).' : 'Cấp tính (chưa có bù trừ thận đầy đủ).';
      }
    } else if (ph > 7.45) {
      alertType = 'warning';
      if (p.hco3 > 26) {
        primaryDisorder = 'Kiềm chuyển hóa (Metabolic Alkalosis — Nôn ói, Dùng lợi tiểu quai, Cường Aldosterone)';
        compensation = p.pco2 > 40 ? 'Bù trừ giảm thông khí nhẹ.' : 'Chưa có bù trừ hô hấp.';
      } else if (p.pco2 < 35) {
        primaryDisorder = 'Kiềm hô hấp (Respiratory Alkalosis — Tăng thông khí, Lo âu, Đau, Thiếu oxy máu cấp)';
        compensation = p.hco3 < 22 ? 'Có bù trừ chuyển hóa qua thận.' : 'Cấp tính.';
      }
    } else {
      primaryDisorder = 'pH trong giới hạn bình thường (7.35 - 7.45)';
      if (correctedAg > 14 && p.hco3 >= 22) {
        primaryDisorder += ' ➔ Phát hiện Toan chuyển hóa tăng AG tiềm ẩn có kèm Kiềm chuyển hóa đồng thời!';
        alertType = 'warning';
      }
    }

    return {
      ph: parseFloat(ph.toFixed(2)),
      anionGap: parseFloat(rawAg.toFixed(1)),
      correctedAg: parseFloat(correctedAg.toFixed(1)),
      deltaRatio: deltaRatio !== null ? parseFloat(deltaRatio.toFixed(2)) : null,
      expectedWinterPco2: parseFloat(expectedWinterPco2.toFixed(1)),
      primaryDisorder,
      compensation,
      alertType
    };
  }
}
