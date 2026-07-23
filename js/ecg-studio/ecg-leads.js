/**
 * ECG Pro Studio — 12-Lead Synthesizer
 * Uses Einthoven's triangle and cardiac vector projection to calculate 12-lead waveforms from central cardiac parameters.
 */

(function () {
  'use strict';

  class ECGLeadSynthesizer {
    /**
     * Projects a 2D cardiac vector (magnitude, angle in degrees) onto standard 12 leads.
     * Einthoven angles:
     * I: 0°, II: +60°, III: +120°
     * aVR: -150°, aVL: -30°, aVF: +90°
     * Precordials V1..V6 horizontal plane vector projection
     */
    static getLeadFactors(lead, axisDeg = 60) {
      const axisRad = (axisDeg * Math.PI) / 180;

      // Limb lead angles
      const leadAngles = {
        I: 0,
        II: 60,
        III: 120,
        aVR: -150,
        aVL: -30,
        aVF: 90
      };

      if (leadAngles[lead] !== undefined) {
        const leadRad = (leadAngles[lead] * Math.PI) / 180;
        // Projection factor = cos(axis - leadAngle)
        let factor = Math.cos(axisRad - leadRad);
        if (lead === 'aVR') factor = -Math.abs(factor); // aVR is predominantly negative
        return { ampFactor: factor, stFactor: factor, polarity: factor >= 0 ? 1 : -1 };
      }

      // Precordial leads (V1-V6 horizontal progression)
      // V1: Right anterior (rS), V2: Septal (rS), V3: Transition (RS), V4: Anterior (Rs), V5: Lateral (R), V6: Far lateral (R)
      const precordialMap = {
        V1: { ampFactor: -0.6, stFactor: 0.8, polarity: -1 },
        V2: { ampFactor: -0.4, stFactor: 1.0, polarity: -1 },
        V3: { ampFactor: 0.5, stFactor: 1.0, polarity: 1 },
        V4: { ampFactor: 1.1, stFactor: 0.9, polarity: 1 },
        V5: { ampFactor: 1.3, stFactor: 0.7, polarity: 1 },
        V6: { ampFactor: 1.0, stFactor: 0.5, polarity: 1 }
      };

      return precordialMap[lead] || { ampFactor: 1.0, stFactor: 1.0, polarity: 1 };
    }

    /**
     * Adjusts specific waveform elements (P, QRS, ST, T, U) for a specific lead
     * based on combined modifiers and anatomical lead position.
     */
    static getLeadSpecificParams(lead, combinedParams) {
      const factors = this.getLeadFactors(lead, combinedParams.axis);
      const leadParams = Object.assign({}, combinedParams);

      // Baseline amplitudes
      let pAmp = 0.25 * factors.ampFactor;
      let qrsR = 1.2 * Math.abs(factors.ampFactor);
      let qrsS = factors.polarity < 0 ? 1.4 * Math.abs(factors.ampFactor) : 0.2;
      let qrsQ = 0.1;
      let tAmp = 0.35 * factors.ampFactor;
      let stShift = 0; // in mm (1mm = 0.1mV)

      // Apply lead specific ST elevations/depressions
      if (combinedParams.diffuseStElevations) {
        if (lead !== 'aVR') stShift += 2.0;
        else stShift -= 1.5;
      }

      if (combinedParams.prDepression) {
        if (lead !== 'aVR') leadParams.prShift = -0.8;
        else leadParams.prShift = 0.8;
      }

      if (combinedParams.leadStElevations && combinedParams.leadStElevations[lead]) {
        stShift += combinedParams.leadStElevations[lead];
      }

      if (combinedParams.leadStDepressions && combinedParams.leadStDepressions[lead]) {
        stShift += combinedParams.leadStDepressions[lead];
      }

      // Q waves
      if (combinedParams.qWaves && combinedParams.qWaves.includes(lead)) {
        qrsQ = 0.6; // Pathological Q wave > 25% R
      }

      // T wave inversions
      if (combinedParams.tInversions && combinedParams.tInversions.includes(lead)) {
        tAmp = -Math.abs(tAmp) - 0.3;
      }

      // Tall T waves (Hyperkalemia / hyperacute)
      if (combinedParams.tallT && combinedParams.tallT.includes(lead)) {
        tAmp = 1.2;
      }

      // Amplifiers (LVH / RVH)
      if (combinedParams.amplifiers) {
        if (lead === 'V1' && combinedParams.amplifiers.V1_S) qrsS *= combinedParams.amplifiers.V1_S;
        if (lead === 'V1' && combinedParams.amplifiers.V1_R) qrsR *= combinedParams.amplifiers.V1_R;
        if (lead === 'V5' && combinedParams.amplifiers.V5_R) qrsR *= combinedParams.amplifiers.V5_R;
        if (lead === 'V6' && combinedParams.amplifiers.V6_R) qrsR *= combinedParams.amplifiers.V6_R;
        if (lead === 'DII' && combinedParams.amplifiers.P_DII) pAmp *= combinedParams.amplifiers.P_DII;
      }

      // S1-Q3-T3 (PE)
      if (combinedParams.s1q3t3) {
        if (lead === 'DI') qrsS = 1.2;
        if (lead === 'DIII') {
          qrsQ = 0.5;
          tAmp = -0.4;
        }
      }

      // Low voltage (COPD / Effusion)
      if (combinedParams.lowVoltage) {
        qrsR *= 0.4;
        qrsS *= 0.4;
        pAmp *= 0.4;
        tAmp *= 0.4;
      }

      // Inverted P in Junctional or aVR
      if (combinedParams.invertedP || lead === 'aVR') {
        pAmp = -Math.abs(pAmp);
      }

      return {
        pAmp,
        qrsR,
        qrsS,
        qrsQ,
        tAmp,
        stShift,
        polarity: factors.polarity,
        leadParams
      };
    }
  }

  window.ECGLeadSynthesizer = ECGLeadSynthesizer;
})();
