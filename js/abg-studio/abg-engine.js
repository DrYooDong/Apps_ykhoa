/**
 * abg-engine.js — Blood Gas Pro Studio
 * Động cơ phân tích khí máu 7 bước tự động.
 */

const CAUSES_DB = {
  highAG: [
    { name: "Nhiễm toan Ceton (DKA/Starvation/Alcoholic)", clues: ["Glucose cao", "Ketone dương tính"], check: (v) => (v.glucose > 200 || v.ketone === 'positive') },
    { name: "Nhiễm toan Lactic (Sốc, Sepsis, Thiếu máu mô)", clues: ["Lactate > 2.0 mmol/L"], check: (v) => v.lactate > 2.0 },
    { name: "Suy thận / Uremia", clues: ["Ure > 10 mmol/L"], check: (v) => v.ure > 10.0 },
    { name: "Ngộ độc Alcohols (Methanol / Ethylene Glycol)", clues: ["Osmolal gap > 10 mOsm/kg"], check: (v) => v.osmGap > 10 },
    { name: "Ngộ độc Salicylate (Aspirin)", clues: ["Kiềm hô hấp + Toan CH tăng AG"], check: (v) => v.salicylate === 'positive' }
  ],
  normalAG: [
    { name: "Tiêu chảy cấp mất Bicarbonate", clues: ["Cl- máu tăng > 108 mEq/L"], check: (v) => v.cl > 108 },
    { name: "Toan ống thận (RTA Type 1, 2, 4)", clues: ["Hạ Kali hoặc Tăng Kali máu, pH niệu > 5.5"], check: (v) => v.cl > 105 },
    { name: "Dùng thuốc Acetazolamide", clues: ["Ức chế Carbonic Anhydrase"], check: (v) => false },
    { name: "Truyền Saline 0.9% khối lượng lớn", clues: ["Toan CH do tăng Clorua máu"], check: (v) => v.cl > 110 }
  ],
  metabolicAlkalosis: [
    { name: "Nôn ói / Hút dịch dạ dày kéo dài", clues: ["Clorua niệu < 10 mEq/L (Đáp ứng Chloride)"], check: (v) => v.urineCl < 20 || v.cl < 95 },
    { name: "Dùng thuốc lợi tiểu Quai / Thiazide", clues: ["Hạ Kali máu"], check: (v) => v.cl < 98 },
    { name: "Cường Aldosterone nguyên phát / Thứ phát", clues: ["Tăng HA, Hạ K+ máu"], check: (v) => v.cl < 98 }
  ],
  respiratoryAcidosis: [
    { name: "Đợt cấp COPD / Hen phế quản nặng", clues: ["Ứ CO2, Khó thở thở co kéo"], check: (v) => true },
    { name: "Ức chế trung tâm hô hấp (Opioid / Sedative)", clues: ["Nhịp thở chậm < 10/phút"], check: (v) => true },
    { name: "Bệnh lý thần kinh cơ (Guillain-Barré, Myasthenia)", clues: ["Yếu cơ hô hấp"], check: (v) => true }
  ],
  respiratoryAlkalosis: [
    { name: "Cơn lo âu / Tăng thông khí tâm lý", clues: ["Thở nhanh 30-40/phút, Tê ngón tay"], check: (v) => true },
    { name: "Nhiễm trùng huyết sớm (Sepsis)", clues: ["Sốt, BC tăng, Tăng thông khí kích thích"], check: (v) => true },
    { name: "Thuyên tắc phổi cấp (PE)", clues: ["Khó thở đột ngột, Đau ngực, PaO2 giảm"], check: (v) => true }
  ]
};

class ABGEngine {
  static analyze(data) {
    const ph = parseFloat(data.ph);
    const pco2 = parseFloat(data.pco2);
    const hco3 = parseFloat(data.hco3);
    const pao2 = parseFloat(data.pao2) || 95;
    const fio2 = parseFloat(data.fio2) || 21;
    const na = parseFloat(data.na) || 140;
    const cl = parseFloat(data.cl) || 100;
    const k = parseFloat(data.k) || 4.0;
    const alb = parseFloat(data.alb) || 4.0;
    const lactate = parseFloat(data.lactate) || 1.0;
    const glucose = parseFloat(data.glucose) || 95;
    const ure = parseFloat(data.ure) || 5.0;
    const ketone = data.ketone || 'negative';
    const duration = data.duration || 'acute';
    const urineCl = data.urineCl !== undefined && data.urineCl !== null && data.urineCl !== '' ? parseFloat(data.urineCl) : null;
    const osmMeasured = data.osm ? parseFloat(data.osm) : null;
    const patWeight = parseFloat(data.weight) || 60;

    // Calc Osmolal Gap
    const osmCalc = 2 * na + glucose / 18 + ure / 6;
    const osmGap = osmMeasured ? osmMeasured - osmCalc : 0;

    const result = {
      isValid: false,
      validationText: "",
      oxygenation: {},
      aaGradient: null,
      primaryDisorder: "",
      disordersList: [],
      compensationText: "",
      anionGap: 0,
      agCorr: 0,
      hasHighAG: false,
      deltaRatio: 0,
      deltaText: "",
      causesList: [],
      warnings: [],
      bicarbDeficit: 0,
      conclusions: []
    };

    if (!ph || !pco2 || !hco3) return result;

    // STEP 1: HENDERSON-HASSELBALCH VALIDATION
    const hCalc = 24 * (pco2 / hco3);
    const hActual = Math.pow(10, 9 - ph);
    const errorMargin = Math.abs(hCalc - hActual) / hActual;

    if (errorMargin > 0.15) {
      result.isValid = false;
      result.validationText = `[H⁺] tính toán (${hCalc.toFixed(1)}) ≠ [H⁺] thực tế (${hActual.toFixed(1)} nEq/L). Mẫu máu không hợp lệ hoặc có sai số phòng xét nghiệm.`;
      result.conclusions.push("Mẫu khí máu không hợp lệ (Không khớp phương trình Henderson-Hasselbalch).");
      return result;
    } else {
      result.isValid = true;
      result.validationText = `Mẫu hợp lệ. [H⁺] dự kiến khớp hoàn hảo với pH đo được (~${hCalc.toFixed(1)} nEq/L).`;
    }

    // STEP 2: OXYGENATION & GAS EXCHANGE
    result.oxygenation = ABG_CRITERIA.getOxygenationStatus(pao2, fio2);
    result.aaGradient = ABG_CRITERIA.calculateAaDO2(pao2, pco2, fio2);

    // STEP 3: PRIMARY DISORDER
    const isAcidemia = ph < 7.35;
    const isAlkalemia = ph > 7.45;

    if (isAcidemia) {
      if (hco3 < 22 && pco2 <= 45) {
        result.primaryDisorder = "Toan chuyển hóa";
        result.disordersList.push("metabolicAcidosis");
      } else if (pco2 > 45 && hco3 >= 22) {
        result.primaryDisorder = "Toan hô hấp";
        result.disordersList.push("respiratoryAcidosis");
      } else {
        result.primaryDisorder = "Toan hỗn hợp (Hô hấp & Chuyển hóa)";
        result.disordersList.push("metabolicAcidosis", "respiratoryAcidosis");
      }
    } else if (isAlkalemia) {
      if (hco3 > 26 && pco2 >= 35) {
        result.primaryDisorder = "Kiềm chuyển hóa";
        result.disordersList.push("metabolicAlkalosis");
      } else if (pco2 < 35 && hco3 <= 26) {
        result.primaryDisorder = "Kiềm hô hấp";
        result.disordersList.push("respiratoryAlkalosis");
      } else {
        result.primaryDisorder = "Kiềm hỗn hợp (Hô hấp & Chuyển hóa)";
        result.disordersList.push("metabolicAlkalosis", "respiratoryAlkalosis");
      }
    } else {
      if (pco2 > 45 && hco3 > 26) {
        result.primaryDisorder = "Toan hô hấp & Kiềm chuyển hóa bù trừ";
        result.disordersList.push("respiratoryAcidosis", "metabolicAlkalosis");
      } else if (pco2 < 35 && hco3 < 22) {
        result.primaryDisorder = "Kiềm hô hấp & Toan chuyển hóa bù trừ";
        result.disordersList.push("respiratoryAlkalosis", "metabolicAcidosis");
      } else {
        result.primaryDisorder = "Khí máu hoàn toàn bình thường";
      }
    }
    result.conclusions.push(result.primaryDisorder);

    // STEP 4: PHYSIOLOGICAL COMPENSATION
    let expectedPco2 = 0;
    let expectedHco3 = 0;

    if (result.primaryDisorder === "Toan chuyển hóa" || result.disordersList.includes("metabolicAcidosis")) {
      expectedPco2 = (1.5 * hco3) + 8;
      let compMsg = `pCO₂ kỳ vọng (Winter's formula): ${expectedPco2.toFixed(1)} ± 2 mmHg.<br>`;
      if (pco2 > expectedPco2 + 2) {
        compMsg += "➔ <strong>Kèm Toan hô hấp phối hợp.</strong>";
        result.conclusions.push("Toan hô hấp phối hợp");
        if (!result.disordersList.includes("respiratoryAcidosis")) result.disordersList.push("respiratoryAcidosis");
      } else if (pco2 < expectedPco2 - 2) {
        compMsg += "➔ <strong>Kèm Kiềm hô hấp phối hợp.</strong>";
        result.conclusions.push("Kiềm hô hấp phối hợp");
        if (!result.disordersList.includes("respiratoryAlkalosis")) result.disordersList.push("respiratoryAlkalosis");
      } else {
        compMsg += "➔ Đáp ứng bù trừ hô hấp phù hợp.";
      }
      result.compensationText = compMsg;
    } else if (result.primaryDisorder === "Kiềm chuyển hóa" || result.disordersList.includes("metabolicAlkalosis")) {
      expectedPco2 = (0.7 * (hco3 - 24)) + 40;
      let compMsg = `pCO₂ kỳ vọng: ${expectedPco2.toFixed(1)} ± 1.5 mmHg.<br>`;
      if (pco2 > expectedPco2 + 1.5) {
        compMsg += "➔ <strong>Kèm Toan hô hấp phối hợp.</strong>";
        result.conclusions.push("Toan hô hấp phối hợp");
        if (!result.disordersList.includes("respiratoryAcidosis")) result.disordersList.push("respiratoryAcidosis");
      } else if (pco2 < expectedPco2 - 1.5) {
        compMsg += "➔ <strong>Kèm Kiềm hô hấp phối hợp.</strong>";
        result.conclusions.push("Kiềm hô hấp phối hợp");
        if (!result.disordersList.includes("respiratoryAlkalosis")) result.disordersList.push("respiratoryAlkalosis");
      } else {
        compMsg += "➔ Đáp ứng bù trừ hô hấp phù hợp.";
      }
      result.compensationText = compMsg;
    } else if (result.disordersList.includes("respiratoryAcidosis")) {
      const deltaPco2 = pco2 - 40;
      if (deltaPco2 > 0) {
        if (duration === 'acute') {
          expectedHco3 = 24 + 1 * (deltaPco2 / 10);
          let compMsg = `HCO₃⁻ kỳ vọng (Toan hô hấp cấp): <strong>${expectedHco3.toFixed(1)}</strong> ± 3 mEq/L.<br>`;
          if (hco3 > expectedHco3 + 3) {
            compMsg += "➔ <strong>Kèm Kiềm chuyển hóa phối hợp.</strong>";
            result.conclusions.push("Kiềm chuyển hóa phối hợp");
            if (!result.disordersList.includes("metabolicAlkalosis")) result.disordersList.push("metabolicAlkalosis");
          } else if (hco3 < expectedHco3 - 3) {
            compMsg += "➔ <strong>Kèm Toan chuyển hóa phối hợp.</strong>";
            result.conclusions.push("Toan chuyển hóa phối hợp");
            if (!result.disordersList.includes("metabolicAcidosis")) result.disordersList.push("metabolicAcidosis");
          } else {
            compMsg += "➔ Bù trừ thận phù hợp cấp.";
          }
          result.compensationText = compMsg;
        } else {
          expectedHco3 = 24 + 3.5 * (deltaPco2 / 10);
          let compMsg = `HCO₃⁻ kỳ vọng (Toan hô hấp mạn): <strong>${expectedHco3.toFixed(1)}</strong> ± 3 mEq/L.<br>`;
          if (hco3 > expectedHco3 + 3) {
            compMsg += "➔ <strong>Kèm Kiềm chuyển hóa phối hợp.</strong>";
            result.conclusions.push("Kiềm chuyển hóa phối hợp");
            if (!result.disordersList.includes("metabolicAlkalosis")) result.disordersList.push("metabolicAlkalosis");
          } else if (hco3 < expectedHco3 - 3) {
            compMsg += "➔ <strong>Kèm Toan chuyển hóa phối hợp.</strong>";
            result.conclusions.push("Toan chuyển hóa phối hợp");
            if (!result.disordersList.includes("metabolicAcidosis")) result.disordersList.push("metabolicAcidosis");
          } else {
            compMsg += "➔ Bù trừ thận phù hợp mạn.";
          }
          result.compensationText = compMsg;
        }
      }
    } else if (result.disordersList.includes("respiratoryAlkalosis")) {
      const deltaPco2 = 40 - pco2;
      if (deltaPco2 > 0) {
        if (duration === 'acute') {
          expectedHco3 = 24 - 2 * (deltaPco2 / 10);
          let compMsg = `HCO₃⁻ kỳ vọng (Kiềm hô hấp cấp): <strong>${expectedHco3.toFixed(1)}</strong> ± 2 mEq/L.<br>`;
          if (hco3 > expectedHco3 + 2) {
            compMsg += "➔ <strong>Kèm Kiềm chuyển hóa phối hợp.</strong>";
            result.conclusions.push("Kiềm chuyển hóa phối hợp");
          } else if (hco3 < expectedHco3 - 2) {
            compMsg += "➔ <strong>Kèm Toan chuyển hóa phối hợp.</strong>";
            result.conclusions.push("Toan chuyển hóa phối hợp");
          } else {
            compMsg += "➔ Bù trừ thận phù hợp cấp.";
          }
          result.compensationText = compMsg;
        } else {
          expectedHco3 = 24 - 5 * (deltaPco2 / 10);
          if (expectedHco3 < 12) expectedHco3 = 12;
          let compMsg = `HCO₃⁻ kỳ vọng (Kiềm hô hấp mạn): <strong>${expectedHco3.toFixed(1)}</strong> ± 2 mEq/L.<br>`;
          if (hco3 > expectedHco3 + 2) {
            compMsg += "➔ <strong>Kèm Kiềm chuyển hóa phối hợp.</strong>";
            result.conclusions.push("Kiềm chuyển hóa phối hợp");
          } else if (hco3 < expectedHco3 - 2) {
            compMsg += "➔ <strong>Kèm Toan chuyển hóa phối hợp.</strong>";
            result.conclusions.push("Toan chuyển hóa phối hợp");
          } else {
            compMsg += "➔ Bù trừ thận phù hợp mạn.";
          }
          result.compensationText = compMsg;
        }
      }
    }

    // STEP 5: ANION GAP & ALBUMIN CORRECTION
    result.anionGap = na - cl - hco3;
    result.agCorr = result.anionGap + 2.5 * (4.0 - alb);
    result.hasHighAG = result.agCorr > 14;

    if (result.hasHighAG && !result.conclusions.includes("Toan chuyển hóa tăng AG")) {
      result.conclusions.push("Toan chuyển hóa tăng AG");
    }

    // STEP 6: DELTA RATIO & TRIPLE DISORDERS
    if (result.hasHighAG) {
      const deltaGap = result.agCorr - 12;
      const deltaHco3 = 24 - hco3;
      result.deltaRatio = deltaHco3 !== 0 ? deltaGap / deltaHco3 : 1;

      let dText = `ΔGap (${deltaGap.toFixed(1)}) / ΔHCO₃⁻ (${deltaHco3.toFixed(1)}) = <strong>${result.deltaRatio.toFixed(2)}</strong><br>`;
      if (result.deltaRatio < 0.4) {
        dText += "➔ Toan CH tăng AG + Toan CH AG bình thường đi kèm.";
        result.conclusions.push("Toan CH AG bình thường đi kèm");
      } else if (result.deltaRatio >= 0.4 && result.deltaRatio <= 0.8) {
        dText += "➔ Hỗn hợp Toan tăng AG & Toan AG bình thường.";
      } else if (result.deltaRatio > 0.8 && result.deltaRatio <= 2.0) {
        dText += "➔ Toan chuyển hóa tăng AG đơn thuần.";
      } else {
        dText += "➔ Toan chuyển hóa tăng AG + Kiềm chuyển hóa đi kèm (Rối loạn 3 thành phần).";
        if (!result.conclusions.includes("Kiềm chuyển hóa đi kèm")) result.conclusions.push("Kiềm chuyển hóa đi kèm");
      }
      result.deltaText = dText;
    }

    // Bicarb Deficit
    if (hco3 < 24) {
      result.bicarbDeficit = 0.4 * patWeight * (24 - hco3);
    }

    // STEP 7: ETIOLOGY & SAFETY WARNINGS
    const clinicalInput = { lactate, glucose, ure, ketone, osmGap, cl, urineCl, salicylate: data.salicylate || 'negative', agCorr: result.agCorr };
    result.causesList = [];

    if (result.hasHighAG) {
      CAUSES_DB.highAG.forEach(c => {
        if (c.check(clinicalInput)) result.causesList.push({ type: "highAG", ...c });
      });
    }
    if (result.disordersList.includes("metabolicAcidosis") && !result.hasHighAG) {
      CAUSES_DB.normalAG.forEach(c => {
        if (c.check(clinicalInput)) result.causesList.push({ type: "normalAG", ...c });
      });
    }
    if (result.disordersList.includes("metabolicAlkalosis")) {
      CAUSES_DB.metabolicAlkalosis.forEach(c => {
        if (c.check(clinicalInput)) result.causesList.push({ type: "metabolicAlkalosis", ...c });
      });
    }

    result.warnings = ABG_CRITERIA.getSafetyWarnings(result.disordersList, clinicalInput);

    // Deduplicate conclusions
    result.conclusions = [...new Set(result.conclusions)];

    return result;
  }
}
