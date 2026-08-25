/**
 * Polytrauma & Massive Transfusion Protocol (MTP) Pro Studio Engine
 * Pure Vanilla JavaScript (ES6+)
 */

const PolytraumaEngine = {
  // 1. Calculate TASH Score & Probability
  calculateTASH(params) {
    let score = 0;
    const { sbp, hr, hb, be, sex, pelvicFx, femurFx, fastPos } = params;

    // Hb (g/dL)
    if (hb < 7) score += 8;
    else if (hb < 9) score += 6;
    else if (hb < 10) score += 4;
    else if (hb < 11) score += 3;
    else if (hb < 12) score += 2;

    // Base Excess (mmol/L)
    if (be < -12) score += 4;
    else if (be <= -10) score += 3;
    else if (be <= -6) score += 2;
    else if (be <= -2) score += 1;

    // Systolic BP (mmHg)
    if (sbp < 100) score += 4;
    else if (sbp <= 120) score += 1;

    // Heart Rate (bpm)
    if (hr > 120) score += 2;

    // Sex
    if (sex === 'male') score += 1;

    // Anatomical/US criteria
    if (pelvicFx) score += 6;
    if (femurFx) score += 3;
    if (fastPos) score += 3;

    // TASH Probability Logistic Regression Equation
    // Logit y = 0.49 * TASH - 4.1
    const logit = 0.49 * score - 4.1;
    const prob = (1 / (1 + Math.exp(-logit))) * 100;

    return {
      score,
      probability: Math.min(Math.max(prob, 0), 99.9)
    };
  },

  // 2. Calculate ABC Score
  calculateABC(params) {
    const { isPenetrating, sbp, hr, fastPos } = params;
    let score = 0;
    if (isPenetrating) score += 1;
    if (sbp <= 90) score += 1;
    if (hr >= 120) score += 1;
    if (fastPos) score += 1;

    return {
      score,
      isMTPIndicated: score >= 2
    };
  },

  // 3. Calculate Shock Index (SI)
  calculateShockIndex(hr, sbp) {
    if (!sbp || sbp <= 0) return { si: 0, severity: 'Bình thường', color: 'var(--color-success)' };
    const si = (hr / sbp).toFixed(2);
    let severity = 'Bình thường';
    let color = 'var(--color-success)';

    if (si >= 1.4) {
      severity = 'Sốc mất máu NẶNG (Nguy cơ MTP rất cao)';
      color = 'var(--color-danger)';
    } else if (si >= 1.0) {
      severity = 'Sốc mất máu VỪA (Cần chuẩn bị máu)';
      color = 'var(--vm-amber, #d97706)';
    } else if (si >= 0.7) {
      severity = 'Sốc nhẹ / Theo dõi sát';
      color = 'var(--color-warning)';
    }

    return { si: parseFloat(si), severity, color };
  },

  // 4. Calculate MTP Pack (1:1:1 Ratio)
  calculateMTPPack(eblmL, customPRBC = 0) {
    let prbcUnits = customPRBC > 0 ? customPRBC : Math.max(Math.round(eblmL / 350), 4);
    let ffpUnits = prbcUnits; // 1:1 ratio
    let plateletPools = Math.max(Math.round(prbcUnits / 6), 1); // 1 pool (6 units) per 6 PRBC
    let cryoUnits = prbcUnits >= 6 ? 10 : 0; // 10 units Cryo if severe MTP

    return {
      prbcUnits,
      ffpUnits,
      plateletPools,
      cryoUnits,
      totalVolume: (prbcUnits * 250) + (ffpUnits * 200) + (plateletPools * 250) + (cryoUnits * 50)
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PolytraumaEngine;
}
