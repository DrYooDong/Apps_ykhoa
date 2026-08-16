/**
 * Electrolytes & Acid-Base Balance Calculator
 * Rối loạn Điện giải & Toan Kiềm Chuyên sâu
 * Bao gồm: Natri hiệu chỉnh do tăng glucose, Thiếu hụt Na/Nước tự do, Anion Gap, Calci hiệu chỉnh albumin
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { SoapPatientRecord } from '../../types';

export const electrolytesCalculator: BaseCalculator = {
  id: 'electrolytes',
  name: 'Rối Loạn Điện Giải & Thăng Bằng Toan Kiềm',
  shortName: 'Điện giải & Anion Gap',
  specialty: 'nephrology',
  specialtyLabel: 'Thận - Điện giải',
  description: 'Tính toán Natri hiệu chỉnh khi tăng Glucose máu, Thiếu hụt Natri/Nước tự do, Khoảng trống Anion Gap và Calci hiệu chỉnh Albumin.',
  icon: 'fa-solid fa-flask-vial',
  evidenceReference: 'Katz MA. Hyperglycemia-induced hypo-osmolality. N Engl J Med. 1973; Hillier TA. Am J Med. 1999.',
  fields: [
    {
      id: 'subTool',
      label: 'Mục tiêu tính toán',
      type: 'select',
      defaultValue: 'na_corrected',
      options: [
        { value: 'na_corrected', label: '1. Natri hiệu chỉnh (khi tăng Glucose máu)' },
        { value: 'water_deficit', label: '2. Thiếu hụt Nước tự do (Free Water Deficit trong Tăng Natri)' },
        { value: 'na_deficit', label: '3. Thiếu hụt Natri (Sodium Deficit trong Hạ Natri)' },
        { value: 'anion_gap', label: '4. Anion Gap & Delta Ratio' },
        { value: 'ca_corrected', label: '5. Calci hiệu chỉnh theo Albumin' }
      ]
    },
    {
      id: 'na',
      label: 'Natri máu (Na⁺)',
      type: 'number',
      unit: 'mmol/L',
      min: 80,
      max: 200,
      step: 0.1,
      placeholder: 'VD: 128'
    },
    {
      id: 'k',
      label: 'Kali máu (K⁺)',
      type: 'number',
      unit: 'mmol/L',
      min: 1.0,
      max: 10.0,
      step: 0.1,
      placeholder: 'VD: 4.0',
      helpText: 'Dùng cho tính Anion Gap'
    },
    {
      id: 'cl',
      label: 'Clo máu (Cl⁻)',
      type: 'number',
      unit: 'mmol/L',
      min: 50,
      max: 150,
      step: 0.1,
      placeholder: 'VD: 98',
      helpText: 'Dùng cho tính Anion Gap'
    },
    {
      id: 'hco3',
      label: 'Bicarbonate (HCO₃⁻)',
      type: 'number',
      unit: 'mmol/L',
      min: 1,
      max: 60,
      step: 0.1,
      placeholder: 'VD: 24',
      helpText: 'Dùng cho tính Anion Gap'
    },
    {
      id: 'glucose',
      label: 'Glucose máu',
      type: 'number',
      unit: 'mg/dL (hoặc mmol/L)',
      min: 10,
      max: 2000,
      step: 0.1,
      placeholder: 'VD: 350 mg/dL hoặc 19.4 mmol/L'
    },
    {
      id: 'glucoseUnit',
      label: 'Đơn vị Glucose',
      type: 'select',
      defaultValue: 'mgdl',
      options: [
        { value: 'mgdl', label: 'mg/dL' },
        { value: 'mmol', label: 'mmol/L' }
      ]
    },
    {
      id: 'weight',
      label: 'Cân nặng',
      type: 'number',
      unit: 'kg',
      min: 10,
      max: 250,
      step: 0.5,
      placeholder: 'VD: 60'
    },
    {
      id: 'gender',
      label: 'Giới tính & Thể trạng',
      type: 'select',
      defaultValue: 'male_adult',
      options: [
        { value: 'male_adult', label: 'Nam giới trưởng thành (TBW = 0.6)' },
        { value: 'female_adult', label: 'Nữ giới trưởng thành (TBW = 0.5)' },
        { value: 'male_elderly', label: 'Nam cao tuổi/gầy (TBW = 0.5)' },
        { value: 'female_elderly', label: 'Nữ cao tuổi/gầy (TBW = 0.45)' }
      ]
    },
    {
      id: 'targetNa',
      label: 'Natri mục tiêu',
      type: 'number',
      unit: 'mmol/L',
      defaultValue: 140,
      min: 120,
      max: 150,
      step: 1
    },
    {
      id: 'totalCa',
      label: 'Calci toàn phần',
      type: 'number',
      unit: 'mg/dL (hoặc mmol/L)',
      min: 1,
      max: 25,
      step: 0.05,
      placeholder: 'VD: 7.8'
    },
    {
      id: 'caUnit',
      label: 'Đơn vị Calci',
      type: 'select',
      defaultValue: 'mgdl',
      options: [
        { value: 'mgdl', label: 'mg/dL' },
        { value: 'mmol', label: 'mmol/L' }
      ]
    },
    {
      id: 'albumin',
      label: 'Albumin huyết thanh',
      type: 'number',
      unit: 'g/dL (hoặc g/L)',
      min: 5,
      max: 60,
      step: 0.1,
      placeholder: 'VD: 2.8 g/dL (hoặc 28 g/L)'
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord): Partial<Record<string, any>> {
    const autofill: Record<string, any> = {};
    if (patient.weight) autofill.weight = patient.weight;
    if (patient.gender) {
      const isFemale = (patient.gender as string) === 'nu' || (patient.gender as string) === 'female';
      const isElderly = (patient.age || 0) >= 65;
      if (isFemale) {
        autofill.gender = isElderly ? 'female_elderly' : 'female_adult';
      } else {
        autofill.gender = isElderly ? 'male_elderly' : 'male_adult';
      }
    }
    return autofill;
  },

  calculate(inputs: Record<string, any>): CalculatorResult {
    const subTool = inputs.subTool || 'na_corrected';
    const details: string[] = [];

    // Helper TBW multiplier
    const tbwMap: Record<string, number> = {
      male_adult: 0.6,
      female_adult: 0.5,
      male_elderly: 0.5,
      female_elderly: 0.45
    };
    const tbwFactor = tbwMap[inputs.gender] || 0.6;
    const weight = parseFloat(inputs.weight) || 60;
    const tbw = weight * tbwFactor;

    // 1. Natri hiệu chỉnh
    if (subTool === 'na_corrected') {
      const measuredNa = parseFloat(inputs.na);
      let glucose = parseFloat(inputs.glucose);
      const gUnit = inputs.glucoseUnit || 'mgdl';

      if (isNaN(measuredNa)) {
        return {
          label: 'Vui lòng nhập giá trị Natri máu',
          severity: 'info',
          recommendation: 'Cần có Na⁺ và Glucose máu để tính toán.',
          details: [],
          textForInsert: '[Điện giải]: Chưa đủ thông số'
        };
      }

      if (isNaN(glucose)) glucose = 100;
      if (gUnit === 'mmol') glucose = glucose * 18; // convert to mg/dL

      // Hillier formula: Corrected Na = Measured Na + 0.024 * (Glucose - 100)
      // Katz formula: Corrected Na = Measured Na + 0.016 * (Glucose - 100)
      const excessGlucose = Math.max(0, glucose - 100);
      const correctedNaKatz = measuredNa + 0.016 * excessGlucose;
      const correctedNaHillier = measuredNa + 0.024 * excessGlucose;

      const avgCorrected = (correctedNaKatz + correctedNaHillier) / 2;
      details.push(`Na⁺ đo được: ${measuredNa.toFixed(1)} mmol/L`);
      details.push(`Glucose máu: ${glucose.toFixed(0)} mg/dL (${(glucose / 18).toFixed(1)} mmol/L)`);
      details.push(`Công thức Hillier (2.4 factor): ${correctedNaHillier.toFixed(1)} mmol/L`);
      details.push(`Công thức Katz (1.6 factor): ${correctedNaKatz.toFixed(1)} mmol/L`);

      const severity = avgCorrected < 130 ? 'high' : avgCorrected > 150 ? 'critical' : 'low';
      const label = `Na⁺ hiệu chỉnh = ${avgCorrected.toFixed(1)} mmol/L (Hillier: ${correctedNaHillier.toFixed(1)})`;
      const recommendation = avgCorrected < 135
        ? 'Hạ Natri máu thực sự sau khi bù trừ tăng áp lực thẩm thấu do Glucose. Theo dõi tốc độ bù Na (≤ 8-10 mmol/L trong 24h để tránh tiêu hủy myelin cầu não ODS).'
        : avgCorrected > 145
        ? 'Tăng Natri máu kèm tăng áp lực thẩm thấu: Cần bù dịch nhược trương (NaCl 0.45% hoặc Dextrose 5%) sau khi ổn định huyết động.'
        : 'Natri hiệu chỉnh trong giới hạn bình thường (Hạ Natri giả tạo do tăng Glucose máu).';

      return {
        label,
        severity,
        recommendation,
        details,
        textForInsert: `[Na⁺ Hiệu chỉnh]: Đo được ${measuredNa} mmol/L, Glucose ${(glucose/18).toFixed(1)} mmol/L ➔ Na⁺ hiệu chỉnh: ${avgCorrected.toFixed(1)} mmol/L (${recommendation})`
      };
    }

    // 2. Free Water Deficit
    if (subTool === 'water_deficit') {
      const measuredNa = parseFloat(inputs.na);
      const targetNa = parseFloat(inputs.targetNa) || 140;

      if (isNaN(measuredNa) || isNaN(weight)) {
        return {
          label: 'Thiếu thông số Natri hoặc Cân nặng',
          severity: 'info',
          recommendation: 'Nhập Na⁺ máu và cân nặng bệnh nhân.',
          details: [],
          textForInsert: '[Free Water Deficit]: Chưa đủ thông số'
        };
      }

      // FWD = TBW * ((Na / Target Na) - 1)
      const fwd = tbw * ((measuredNa / targetNa) - 1);
      details.push(`Tổng lượng nước cơ thể (TBW): ${tbw.toFixed(1)} L (${weight}kg x ${tbwFactor})`);
      details.push(`Na⁺ hiện tại: ${measuredNa} mmol/L | Na⁺ mục tiêu: ${targetNa} mmol/L`);
      details.push(`Lượng nước tự do thiếu hụt: ${fwd.toFixed(2)} L`);

      const severity = fwd > 4 ? 'critical' : fwd > 2 ? 'high' : 'moderate';
      return {
        label: `Thiếu hụt Nước tự do: ${fwd > 0 ? fwd.toFixed(2) + ' L' : '0 L (Không thiếu nước)'}`,
        severity,
        recommendation: fwd > 0
          ? `Bù ${fwd.toFixed(1)}L nước tự do (uống nước lọc qua sonde dạ dày, hoặc Dextrose 5% IV) chia đều trong 24-48 giờ. Giảm Na máu tối đa 8-10 mmol/L/24h để tránh phù não.`
          : 'Natri không cao hơn mục tiêu, không có thiếu hụt nước tự do.',
        details,
        textForInsert: `[Free Water Deficit]: Thiếu hụt ${fwd.toFixed(2)} L nước tự do (TBW = ${tbw.toFixed(1)}L, Na = ${measuredNa} mmol/L). Kế hoạch bù trong 24-48h.`
      };
    }

    // 3. Sodium Deficit
    if (subTool === 'na_deficit') {
      const measuredNa = parseFloat(inputs.na);
      const targetNa = parseFloat(inputs.targetNa) || 130;

      if (isNaN(measuredNa)) {
        return {
          label: 'Nhập Na⁺ máu',
          severity: 'info',
          recommendation: 'Vui lòng nhập Na⁺ hiện tại.',
          details: [],
          textForInsert: '[Na Deficit]: Chưa đủ thông số'
        };
      }

      // Na Deficit = TBW * (Target Na - Measured Na)
      const naDeficit = tbw * Math.max(0, targetNa - measuredNa);
      const nacl3PercentMl = (naDeficit / 0.513); // 1 ml NaCl 3% = 0.513 mmol Na+

      details.push(`TBW: ${tbw.toFixed(1)} L | Na⁺ đo được: ${measuredNa} mmol/L ➔ Mục tiêu: ${targetNa} mmol/L`);
      details.push(`Lượng Na⁺ thiếu hụt ước tính: ${naDeficit.toFixed(1)} mmol`);
      details.push(`Tương đương dịch NaCl 3%: ~${nacl3PercentMl.toFixed(0)} mL (513 mmol/L)`);

      const severity = measuredNa < 120 ? 'critical' : measuredNa < 130 ? 'high' : 'low';
      return {
        label: `Thiếu hụt Natri: ${naDeficit.toFixed(1)} mmol (~${nacl3PercentMl.toFixed(0)} mL NaCl 3%)`,
        severity,
        recommendation: measuredNa < 125
          ? 'CẢNH BÁO HẠ NATRI MÁU NẶNG: Nếu có triệu chứng thần kinh cấp (co giật, hôn mê), truyền Bolus 100-150mL NaCl 3% trong 20 phút, lặp lại đến khi tăng 5 mmol/L. Giới hạn tăng ≤ 8 mmol/L/24h.'
          : 'Hạ Natri mức độ nhẹ - trung bình: Tìm nguyên nhân (SIADH, mất qua thận/tiêu hóa, suy tim, xơ gan) và bù chậm.',
        details,
        textForInsert: `[Thiếu hụt Natri]: Na⁺ ${measuredNa} mmol/L ➔ Thiếu ${naDeficit.toFixed(1)} mmol Na⁺ (tương đương ~${nacl3PercentMl.toFixed(0)} mL NaCl 3%). Tốc độ tăng giới hạn ≤ 8 mmol/L/24h.`
      };
    }

    // 4. Anion Gap
    if (subTool === 'anion_gap') {
      const na = parseFloat(inputs.na);
      const k = parseFloat(inputs.k) || 0;
      const cl = parseFloat(inputs.cl);
      const hco3 = parseFloat(inputs.hco3);

      if (isNaN(na) || isNaN(cl) || isNaN(hco3)) {
        return {
          label: 'Thiếu thông số Na, Cl hoặc HCO3',
          severity: 'info',
          recommendation: 'Nhập Na⁺, Cl⁻ và HCO₃⁻ để tính Anion Gap.',
          details: [],
          textForInsert: '[Anion Gap]: Chưa đủ thông số'
        };
      }

      const ag = na - (cl + hco3);
      const agWithK = (na + k) - (cl + hco3);
      const deltaAG = ag - 12;
      const deltaHCO3 = 24 - hco3;
      const deltaRatio = deltaHCO3 !== 0 ? (deltaAG / deltaHCO3) : 1;

      details.push(`Anion Gap (Na - [Cl + HCO3]): ${ag.toFixed(1)} mmol/L (Bình thường: 8-12)`);
      if (k > 0) details.push(`Anion Gap có Kali (Na+K - [Cl+HCO3]): ${agWithK.toFixed(1)} mmol/L`);
      if (ag > 12) {
        details.push(`Delta AG (AG - 12): ${deltaAG.toFixed(1)}`);
        details.push(`Delta HCO3 (24 - HCO3): ${deltaHCO3.toFixed(1)}`);
        details.push(`Delta Ratio (ΔAG / ΔHCO3): ${deltaRatio.toFixed(2)}`);
      }

      let interpretation = '';
      let severity: any = 'low';

      if (ag > 16) {
        severity = 'critical';
        if (deltaRatio < 0.4) {
          interpretation = 'Toan chuyển hóa tăng AG kết hợp Toan chuyển hóa không tăng AG (Hyperchloremic).';
        } else if (deltaRatio >= 0.4 && deltaRatio <= 0.8) {
          interpretation = 'Toan chuyển hóa tăng AG kèm Toan chuyển hóa bình thường AG (VD: DKA + Ỉa chảy).';
        } else if (deltaRatio > 0.8 && deltaRatio <= 2.0) {
          interpretation = 'Toan chuyển hóa tăng AG đơn thuần (GOLDMARK: Glycols, Oxoproline, L-lactate, D-lactate, Methanol, Aspirin, Renal failure, Ketoacidosis).';
        } else {
          interpretation = 'Toan chuyển hóa tăng AG kết hợp Kiềm chuyển hóa hoặc Toan hô hấp mạn (Delta Ratio > 2.0).';
        }
      } else if (ag < 6) {
        severity = 'info';
        interpretation = 'Anion Gap thấp: Xem xét Giảm albumin máu, Đa u tủy (Multiple Myeloma - paraprotein cation), Tăng lithi máu, Tăng calci/magie máu.';
      } else {
        interpretation = 'Anion Gap bình thường (8 - 12 mmol/L).';
      }

      return {
        label: `Anion Gap = ${ag.toFixed(1)} mmol/L (${ag > 12 ? 'TĂNG' : ag < 6 ? 'THẤP' : 'Bình thường'})`,
        severity,
        recommendation: interpretation,
        details,
        textForInsert: `[Anion Gap]: ${ag.toFixed(1)} mmol/L (Na:${na}, Cl:${cl}, HCO3:${hco3}) | Delta Ratio: ${deltaRatio.toFixed(2)} ➔ ${interpretation}`
      };
    }

    // 5. Calci hiệu chỉnh
    const ca = parseFloat(inputs.totalCa);
    const alb = parseFloat(inputs.albumin);
    const caUnit = inputs.caUnit || 'mgdl';

    if (isNaN(ca) || isNaN(alb)) {
      return {
        label: 'Thiếu Calci hoặc Albumin',
        severity: 'info',
        recommendation: 'Nhập Calci toàn phần và Albumin huyết thanh.',
        details: [],
        textForInsert: '[Calci Hiệu chỉnh]: Chưa đủ thông số'
      };
    }

    // Convert Albumin to g/dL if in g/L
    const albInGdl = alb > 15 ? alb / 10 : alb;
    // Payne formula: Corrected Ca (mg/dL) = Total Ca (mg/dL) + 0.8 * (4.0 - Albumin g/dL)
    let caInMgdl = ca;
    if (caUnit === 'mmol') caInMgdl = ca * 4; // 1 mmol/L = 4 mg/dL

    const correctedCa = caInMgdl + 0.8 * (4.0 - albInGdl);
    const correctedCaMmol = correctedCa / 4;

    details.push(`Calci đo được: ${caInMgdl.toFixed(2)} mg/dL (${(caInMgdl / 4).toFixed(2)} mmol/L)`);
    details.push(`Albumin máu: ${albInGdl.toFixed(1)} g/dL (${(albInGdl * 10).toFixed(0)} g/L)`);
    details.push(`Calci hiệu chỉnh (Payne): ${correctedCa.toFixed(2)} mg/dL (${correctedCaMmol.toFixed(2)} mmol/L)`);

    const severity = (correctedCa < 8.5 || correctedCa > 10.5) ? (correctedCa > 12 || correctedCa < 7.0 ? 'critical' : 'high') : 'low';
    const label = `Calci hiệu chỉnh = ${correctedCa.toFixed(2)} mg/dL (${correctedCaMmol.toFixed(2)} mmol/L)`;
    const recommendation = correctedCa < 8.5
      ? 'Hạ Calci máu thực sự: Kiểm tra Magie máu, PTH, Vitamin D. Nếu có co giật / dấu Trousseau-Chvostek, tiêm Calci Clorid hoặc Calci Gluconate IV.'
      : correctedCa > 10.5
      ? 'Tăng Calci máu thực sự: Bù dịch NaCl 0.9% tích cực, xem xét Bisphosphonate / Calcitonin nếu > 12 mg/dL hoặc có triệu chứng.'
      : 'Calci hiệu chỉnh trong giới hạn bình thường (8.5 - 10.5 mg/dL).';

    return {
      label,
      severity,
      recommendation,
      details,
      textForInsert: `[Calci Hiệu Chỉnh]: Đo được ${ca} ${caUnit}, Albumin ${albInGdl} g/dL ➔ Calci hiệu chỉnh: ${correctedCa.toFixed(2)} mg/dL (${correctedCaMmol.toFixed(2)} mmol/L) [${recommendation}]`
    };
  }
};
