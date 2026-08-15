/**
 * Công cụ phân tích Khí Máu Động Mạch (ABG Pro Studio)
 * Phân tích Toan - Kiềm, Bù trừ sinh lý, Khoảng trống Anion (Anion Gap) & Delta Gap
 */

import { BaseCalculator, CalculatorResult } from '../types';

export const abgCalculator: BaseCalculator = {
  id: 'abg-analyzer',
  name: 'Phân Tích Khí Máu Động Mạch (ABG Acid-Base & Anion Gap)',
  shortName: 'Khí Máu Động Mạch (ABG)',
  specialty: 'emergency',
  specialtyLabel: 'Cấp cứu - Hồi sức',
  description: 'Phân tích rối loạn thăng bằng toan kiềm nguyên phát, đánh giá mức độ bù trừ hô hấp/chuyển hóa, tính Anion Gap và Delta Ratio.',
  icon: 'fa-solid fa-lungs',
  evidenceReference: 'Boston & Copenhagen Acid-Base Rules / The ICU Book (Paul Marino)',
  fields: [
    {
      id: 'ph',
      label: 'pH máu động mạch',
      type: 'number',
      min: 6.5,
      max: 8.0,
      step: 0.01,
      placeholder: 'VD: 7.28',
      defaultValue: 7.40,
      helpText: 'Khoảng bình thường: 7.35 - 7.45'
    },
    {
      id: 'paco2',
      label: 'PaCO2 (Áp suất riêng phần CO2)',
      type: 'number',
      unit: 'mmHg',
      min: 10,
      max: 130,
      step: 1,
      placeholder: 'VD: 28',
      defaultValue: 40,
      helpText: 'Khoảng bình thường: 35 - 45 mmHg'
    },
    {
      id: 'hco3',
      label: 'HCO3- (Bicarbonate huyết tương)',
      type: 'number',
      unit: 'mEq/L hoặc mmol/L',
      min: 2,
      max: 60,
      step: 0.5,
      placeholder: 'VD: 14',
      defaultValue: 24,
      helpText: 'Khoảng bình thường: 22 - 26 mEq/L'
    },
    {
      id: 'na',
      label: 'Natri huyết thanh (Na+) — Tùy chọn để tính Anion Gap',
      type: 'number',
      unit: 'mmol/L',
      min: 100,
      max: 180,
      step: 1,
      placeholder: 'VD: 138'
    },
    {
      id: 'cl',
      label: 'Clo huyết thanh (Cl-) — Tùy chọn để tính Anion Gap',
      type: 'number',
      unit: 'mmol/L',
      min: 60,
      max: 140,
      step: 1,
      placeholder: 'VD: 102'
    },
    {
      id: 'albumin',
      label: 'Albumin huyết thanh (g/dL) — Hiệu chỉnh Anion Gap',
      type: 'number',
      unit: 'g/dL',
      min: 1.0,
      max: 6.0,
      step: 0.1,
      defaultValue: 4.0,
      helpText: 'Bình thường 4.0 g/dL'
    }
  ],

  calculate(inputs: Record<string, any>): CalculatorResult {
    const ph = parseFloat(inputs.ph);
    const paco2 = parseFloat(inputs.paco2);
    const hco3 = parseFloat(inputs.hco3);
    const na = parseFloat(inputs.na);
    const cl = parseFloat(inputs.cl);
    const alb = parseFloat(inputs.albumin) || 4.0;

    if (isNaN(ph) || isNaN(paco2) || isNaN(hco3)) {
      return {
        label: 'Chưa đủ thông số ABG',
        severity: 'info',
        recommendation: 'Vui lòng nhập tối thiểu pH, PaCO2 và HCO3- để tiến hành phân tích.',
        details: [],
        textForInsert: '[ABG]: Chưa đủ thông số'
      };
    }

    const isAcidemia = ph < 7.35;
    const isAlkalemia = ph > 7.45;
    const isNormalPh = !isAcidemia && !isAlkalemia;

    let primaryDisorder = '';
    let compensationAnalysis = '';
    let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';

    // 1. Xác định rối loạn nguyên phát
    if (isAcidemia) {
      severity = ph < 7.20 ? 'critical' : 'high';
      if (paco2 > 45 && hco3 < 22) {
        primaryDisorder = 'Toan Hỗn Hợp (Toan Hô Hấp + Toan Chuyển Hóa)';
        compensationAnalysis = 'Cả hai cơ chế hô hấp và chuyển hóa đều làm giảm pH máu.';
      } else if (paco2 > 45) {
        primaryDisorder = 'Toan Hô Hấp (Respiratory Acidosis)';
        const expectedHco3Acute = 24 + ((paco2 - 40) / 10) * 1;
        const expectedHco3Chronic = 24 + ((paco2 - 40) / 10) * 3.5;
        compensationAnalysis = `Bù trừ: Nếu cấp tính, HCO3- dự kiến ~${expectedHco3Acute.toFixed(1)} mEq/L. Nếu mạn tính, HCO3- dự kiến ~${expectedHco3Chronic.toFixed(1)} mEq/L. (Thực tế: ${hco3} mEq/L)`;
      } else if (hco3 < 22) {
        primaryDisorder = 'Toan Chuyển Hóa (Metabolic Acidosis)';
        // Công thức Winter: PaCO2 = 1.5 * HCO3 + 8 (+- 2)
        const expectedPaco2 = 1.5 * hco3 + 8;
        const minPaco2 = expectedPaco2 - 2;
        const maxPaco2 = expectedPaco2 + 2;

        if (paco2 >= minPaco2 && paco2 <= maxPaco2) {
          compensationAnalysis = `Bù trừ hô hấp thích hợp theo công thức Winter (PaCO2 dự kiến: ${minPaco2.toFixed(0)} - ${maxPaco2.toFixed(0)} mmHg).`;
        } else if (paco2 > maxPaco2) {
          compensationAnalysis = `Kèm Toan Hô Hấp thứ phát (PaCO2 thực tế ${paco2} mmHg > dự kiến ${maxPaco2.toFixed(0)} mmHg - suy giảm thông khí).`;
        } else {
          compensationAnalysis = `Kèm Kiềm Hô Hấp thứ phát (PaCO2 thực tế ${paco2} mmHg < dự kiến ${minPaco2.toFixed(0)} mmHg - tăng thông khí quá mức).`;
        }
      } else {
        primaryDisorder = 'Toan máu chưa phân loại rõ (Nhiễm toan nhẹ)';
      }
    } else if (isAlkalemia) {
      severity = ph > 7.55 ? 'critical' : 'high';
      if (paco2 < 35 && hco3 > 26) {
        primaryDisorder = 'Kiềm Hỗn Hợp (Kiềm Hô Hấp + Kiềm Chuyển Hóa)';
        compensationAnalysis = 'Cả hai cơ chế hô hấp và chuyển hóa đều làm tăng pH máu.';
      } else if (paco2 < 35) {
        primaryDisorder = 'Kiềm Hô Hấp (Respiratory Alkalosis)';
        const expectedHco3Acute = 24 - ((40 - paco2) / 10) * 2;
        const expectedHco3Chronic = 24 - ((40 - paco2) / 10) * 5;
        compensationAnalysis = `Bù trừ: Nếu cấp tính, HCO3- dự kiến ~${expectedHco3Acute.toFixed(1)} mEq/L. Nếu mạn tính, HCO3- dự kiến ~${expectedHco3Chronic.toFixed(1)} mEq/L. (Thực tế: ${hco3} mEq/L)`;
      } else if (hco3 > 26) {
        primaryDisorder = 'Kiềm Chuyển Hóa (Metabolic Alkalosis)';
        const expectedPaco2 = 40 + 0.7 * (hco3 - 24);
        compensationAnalysis = `Bù trừ hô hấp: PaCO2 dự kiến ~${expectedPaco2.toFixed(0)} ± 2 mmHg. (Thực tế: ${paco2} mmHg)`;
      } else {
        primaryDisorder = 'Kiềm máu nhẹ';
      }
    } else {
      if (paco2 !== 40 || hco3 !== 24) {
        primaryDisorder = 'Rối Loạn Thăng Bằng Toan Kiềm Hỗn Hợp / Đã Bù Hoàn Toàn (pH trong giới hạn bình thường)';
        severity = 'moderate';
      } else {
        primaryDisorder = 'Khí Máu Động Mạch Bình Thường';
        severity = 'low';
        compensationAnalysis = 'Không có rối loạn toan kiềm nguyên phát.';
      }
    }

    // 2. Tính Anion Gap nếu có Na+ và Cl-
    let agText = '';
    let deltaText = '';
    const detailsList: string[] = [
      `pH: ${ph.toFixed(2)} | PaCO2: ${paco2} mmHg | HCO3-: ${hco3} mEq/L`
    ];

    if (!isNaN(na) && !isNaN(cl)) {
      const uncorrectedAg = na - (cl + hco3);
      const correctedAg = uncorrectedAg + 2.5 * (4.0 - alb);
      const roundedAg = Math.round(correctedAg * 10) / 10;

      if (roundedAg > 12) {
        agText = `Anion Gap tăng (${roundedAg} mEq/L > 12)`;
        const deltaAg = roundedAg - 12;
        const deltaHco3 = 24 - hco3;
        if (deltaHco3 !== 0) {
          const deltaRatio = deltaAg / deltaHco3;
          if (deltaRatio < 0.8) {
            deltaText = `Delta Ratio = ${deltaRatio.toFixed(2)} (< 0.8): Kèm Toan chuyển hóa không tăng AG (Hyperchloremic acidosis).`;
          } else if (deltaRatio > 2.0) {
            deltaText = `Delta Ratio = ${deltaRatio.toFixed(2)} (> 2.0): Kèm Kiềm chuyển hóa tiềm ẩn (Pre-existing Metabolic Alkalosis).`;
          } else {
            deltaText = `Delta Ratio = ${deltaRatio.toFixed(2)} (0.8 - 2.0): Toan chuyển hóa tăng AG đơn thuần (Lactic acidosis, DKA, Uremia...).`;
          }
        }
      } else {
        agText = `Anion Gap bình thường (${roundedAg} mEq/L)`;
      }

      detailsList.push(`Anion Gap: ${roundedAg} mEq/L (Na: ${na}, Cl: ${cl}, Albumin: ${alb} g/dL)`);
      if (deltaText) detailsList.push(deltaText);
    }

    detailsList.push(compensationAnalysis);

    const recommendation = `Đánh giá nguyên nhân bệnh học gây ${primaryDisorder}. ${agText ? agText + '. ' : ''}${deltaText ? deltaText + ' ' : ''}Theo dõi sát sinh hiệu, điện giải đồ serial và xử trí căn nguyên nền.`;

    const textForInsert = `[Phân Tích Khí Máu Động Mạch ABG]:\n• Kết luận: ${primaryDisorder}\n• Thông số: pH ${ph.toFixed(2)}, PaCO2 ${paco2} mmHg, HCO3- ${hco3} mEq/L${agText ? ', ' + agText : ''}\n• Nhận định bù trừ: ${compensationAnalysis}\n• Hướng xử trí: ${recommendation}`;

    return {
      label: `${primaryDisorder}`,
      severity,
      recommendation,
      details: detailsList,
      textForInsert
    };
  }
};
