/**
 * Antibiotic Dosing & PK/PD Clinical Calculator
 * Công cụ Tối ưu hóa Liều Kháng sinh (Vancomycin AUC24, Aminoglycosides & Chỉnh liều theo Clcr)
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { SoapPatientRecord } from '../../types';

export const antibioticDosingCalculator: BaseCalculator = {
  id: 'antibiotic-dosing',
  name: 'Tối Ưu Hóa Liều Kháng Sinh & PK/PD',
  shortName: 'Chỉnh Liều Kháng Sinh',
  specialty: 'emergency',
  specialtyLabel: 'Dược Lâm sàng - Truyền nhiễm',
  description: 'Tính liều Vancomycin (AUC24/MIC), Aminoglycosides (Gentamicin/Amikacin theo IBW) và chế độ chỉnh liều Cephalosporin/Carbapenem theo chức năng thận.',
  icon: 'fa-solid fa-capsules',
  evidenceReference: 'Rybak MJ, et al. Therapeutic monitoring of vancomycin for serious MRSA infections: AJHP 2020; Sanford Guide 2024.',
  fields: [
    {
      id: 'drugCategory',
      label: 'Nhóm kháng sinh',
      type: 'select',
      defaultValue: 'vancomycin',
      options: [
        { value: 'vancomycin', label: '1. Vancomycin (AUC24 400-600 & Nạp liều)' },
        { value: 'aminoglycoside', label: '2. Aminoglycoside (Gentamicin / Tobramycin / Amikacin)' },
        { value: 'betalactam', label: '3. Beta-lactam & Carbapenem (Chỉnh theo eGFR/Clcr)' }
      ]
    },
    {
      id: 'indication',
      label: 'Mức độ nhiễm trùng & Mục tiêu',
      type: 'select',
      defaultValue: 'severe_mrsa',
      options: [
        { value: 'severe_mrsa', label: 'Nhiễm trùng nặng / Nghi ngờ MRSA (Viêm phổi, Nhiễm khuẩn huyết, Viêm nội tâm mạc)' },
        { value: 'moderate_infection', label: 'Nhiễm trùng da mô mềm / Tiết niệu mức độ vừa' },
        { value: 'cns_infection', label: 'Nhiễm trùng thần kinh trung ương (Màng não)' }
      ]
    },
    {
      id: 'weight',
      label: 'Cân nặng thực tế (Actual Weight)',
      type: 'number',
      unit: 'kg',
      min: 20,
      max: 250,
      step: 0.5,
      placeholder: 'VD: 65'
    },
    {
      id: 'height',
      label: 'Chiều cao',
      type: 'number',
      unit: 'cm',
      min: 100,
      max: 220,
      step: 1,
      placeholder: 'VD: 168'
    },
    {
      id: 'gender',
      label: 'Giới tính',
      type: 'select',
      defaultValue: 'male',
      options: [
        { value: 'male', label: 'Nam' },
        { value: 'female', label: 'Nữ' }
      ]
    },
    {
      id: 'crcl',
      label: 'Độ thanh thải Creatinine ước tính (Clcr)',
      type: 'number',
      unit: 'mL/phút',
      min: 5,
      max: 200,
      step: 1,
      placeholder: 'VD: 55 mL/phút'
    },
    {
      id: 'dialysisStatus',
      label: 'Tình trạng lọc máu',
      type: 'select',
      defaultValue: 'none',
      options: [
        { value: 'none', label: 'Không lọc máu' },
        { value: 'hd', label: 'Thận nhân tạo định kỳ (IHD)' },
        { value: 'crrt', label: 'Lọc máu liên tục (CRRT / CVVHDF)' }
      ]
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord): Partial<Record<string, any>> {
    const autofill: Record<string, any> = {};
    if (patient.weight) autofill.weight = patient.weight;
    if (patient.height) autofill.height = patient.height;
    if (patient.gender) {
      autofill.gender = (patient.gender as string) === 'nu' || (patient.gender as string) === 'female' ? 'female' : 'male';
    }
    return autofill;
  },

  calculate(inputs: Record<string, any>): CalculatorResult {
    const drugCategory = inputs.drugCategory || 'vancomycin';
    const weight = parseFloat(inputs.weight) || 60;
    const height = parseFloat(inputs.height) || 165;
    const isFemale = inputs.gender === 'female';
    const crcl = parseFloat(inputs.crcl) || 60;
    const dialysis = inputs.dialysisStatus || 'none';

    // 1. Tính Cân nặng lý tưởng (IBW - Devine Formula)
    // Nam: IBW = 50 + 0.9 * (height - 152.4)
    // Nữ: IBW = 45.5 + 0.9 * (height - 152.4)
    const heightInchesOver60 = (height - 152.4) / 2.54;
    const ibw = isFemale 
      ? 45.5 + (2.3 * Math.max(0, heightInchesOver60))
      : 50.0 + (2.3 * Math.max(0, heightInchesOver60));

    // Cân nặng hiệu chỉnh nếu Béo phì (Actual Weight > 120% IBW)
    const isObese = weight > ibw * 1.2;
    const adjBW = isObese ? ibw + 0.4 * (weight - ibw) : weight;

    const details: string[] = [];
    details.push(`Cân nặng thực: ${weight} kg | IBW: ${ibw.toFixed(1)} kg ${isObese ? `➔ AdjBW (Béo phì): ${adjBW.toFixed(1)} kg` : ''}`);
    details.push(`Clcr ước tính: ${crcl} mL/phút | Tình trạng: ${dialysis === 'none' ? 'Không lọc máu' : dialysis.toUpperCase()}`);

    // --- CASE 1: VANCOMYCIN ---
    if (drugCategory === 'vancomycin') {
      // Liều nạp (Loading dose): 20 - 35 mg/kg (max 3000 mg) dựa trên cân nặng thực tế
      const loadingDoseMg = Math.min(3000, Math.round((weight * 25) / 250) * 250);
      
      // Liều duy trì: dựa trên Clcr và cân nặng thực tế
      let maintenanceRegimen = '';
      let targetTrough = 'Mục tiêu AUC24: 400 - 600 mg·h/L (hoặc nồng độ đáy Cmin: 15 - 20 mcg/mL cho ca nặng)';

      if (dialysis === 'hd') {
        maintenanceRegimen = `Nạp ${loadingDoseMg} mg IV, sau đó 500 - 1000 mg sau mỗi lần chạy thận (theo nồng độ đáy trước lọc).`;
      } else if (dialysis === 'crrt') {
        maintenanceRegimen = `Nạp ${loadingDoseMg} mg IV, sau đó 15 - 20 mg/kg mỗi 12 - 24 giờ. Theo dõi TDM sau 24h.`;
      } else if (crcl >= 90) {
        const mgPerDose = Math.round((weight * 15) / 250) * 250;
        maintenanceRegimen = `${mgPerDose} mg IV mỗi 8 - 12 giờ (truyền tĩnh mạch chậm ≥ 60 phút mỗi 1g).`;
      } else if (crcl >= 50) {
        const mgPerDose = Math.round((weight * 15) / 250) * 250;
        maintenanceRegimen = `${mgPerDose} mg IV mỗi 12 giờ.`;
      } else if (crcl >= 30) {
        const mgPerDose = Math.round((weight * 15) / 250) * 250;
        maintenanceRegimen = `${mgPerDose} mg IV mỗi 24 giờ.`;
      } else if (crcl >= 15) {
        const mgPerDose = Math.round((weight * 15) / 250) * 250;
        maintenanceRegimen = `${mgPerDose} mg IV mỗi 24 - 48 giờ.`;
      } else {
        maintenanceRegimen = `Nạp ${loadingDoseMg} mg, sau đó chỉ dùng liều tiếp theo khi nồng độ Vancomycin máu < 15-20 mcg/mL.`;
      }

      details.push(`Liều Nạp (Loading Dose): ${loadingDoseMg} mg IV (25-30 mg/kg cân nặng thực)`);
      details.push(`Chế độ Duy Trì (Maintenance): ${maintenanceRegimen}`);
      details.push(targetTrough);

      return {
        label: `Vancomycin: Nạp ${loadingDoseMg}mg IV ➔ Duy trì: ${maintenanceRegimen}`,
        severity: crcl < 30 ? 'critical' : 'moderate',
        recommendation: `BẮT BUỘC ĐO NỒNG ĐỘ VANCOMYCIN ĐÁY (Trough Level) trước liều thứ 4. Nếu truyền nhanh có nguy cơ Hội chứng Red Man Syndrome (cần pha loãng ≤ 5mg/mL và truyền tốc độ ≤ 10mg/phút).`,
        details,
        textForInsert: `[Kháng sinh - Vancomycin]: Liều nạp ${loadingDoseMg} mg IV x 1 lần. Duy trì: ${maintenanceRegimen}. Mục tiêu AUC 400-600. Định lượng đáy trước cữ thứ 4.`
      };
    }

    // --- CASE 2: AMINOGLYCOSIDE ---
    if (drugCategory === 'aminoglycoside') {
      // Extended-interval dosing (Một liều hàng ngày):
      // Gentamicin/Tobramycin: 5 - 7 mg/kg (dùng AdjBW nếu béo phì, IBW nếu thừa cân)
      // Amikacin: 15 - 20 mg/kg
      const dosingWeight = isObese ? adjBW : weight;
      const gentaDose = Math.round(dosingWeight * 5);
      const amikacinDose = Math.round(dosingWeight * 15);

      let interval = 'mỗi 24 giờ';
      if (crcl < 30) interval = 'chống chỉ định chế độ liều cao 1 lần/ngày (dùng chế độ chia liều truyền thống hoặc tránh dùng)';
      else if (crcl < 50) interval = 'mỗi 36 - 48 giờ (dựa theo biểu đồ Hartford Nomogram)';

      details.push(`Cân nặng tính liều: ${dosingWeight.toFixed(1)} kg (${isObese ? 'Dùng AdjBW vì béo phì' : 'Cân nặng thực'})`);
      details.push(`Gentamicin/Tobramycin liều duy nhất: ${gentaDose} mg IV ${interval}`);
      details.push(`Amikacin liều duy nhất: ${amikacinDose} mg IV ${interval}`);

      return {
        label: `Gentamicin: ${gentaDose}mg / Amikacin: ${amikacinDose}mg (${interval})`,
        severity: crcl < 40 ? 'critical' : 'moderate',
        recommendation: `Đo nồng độ đỉnh Cmax (sau truyền 30p: Gentamicin 16-24 mcg/mL, Amikacin 56-64 mcg/mL) và nồng độ đáy Cmin (< 1 mcg/mL với Genta, < 4-5 mcg/mL với Amikacin để tránh độc thận & ốc tai).`,
        details,
        textForInsert: `[Kháng sinh - Aminoglycoside]: Gentamicin ${gentaDose} mg IV ${interval} (hoặc Amikacin ${amikacinDose} mg IV). Theo dõi chức năng thận và TDM.`
      };
    }

    // --- CASE 3: BETA-LACTAM & CARBAPENEM ---
    let betaAdvice = '';
    if (crcl >= 50) {
      betaAdvice = 'Meropenem: 1g IV mỗi 8h (truyền kéo dài 3h) | Ceftriaxone: 1-2g IV mỗi 24h (không cần chỉnh thận) | Piperacillin/Tazobactam: 4.5g IV mỗi 6-8h.';
    } else if (crcl >= 30) {
      betaAdvice = 'Meropenem: 1g IV mỗi 12h | Piperacillin/Tazobactam: 3.375g IV mỗi 6h | Ceftazidime: 1g IV mỗi 12h.';
    } else if (crcl >= 10) {
      betaAdvice = 'Meropenem: 500mg IV mỗi 12h | Piperacillin/Tazobactam: 2.25g IV mỗi 6h hoặc 3.375g mỗi 8h | Cefepime: 1g IV mỗi 24h.';
    } else {
      betaAdvice = 'Meropenem: 500mg IV mỗi 24h | Piperacillin/Tazobactam: 2.25g IV mỗi 8h | Ceftriaxone: 1-2g mỗi 24h (không quá liều).';
    }

    details.push(`Chế độ liều theo Clcr ${crcl} mL/phút:`);
    details.push(betaAdvice);

    return {
      label: `Hiệu chỉnh Beta-Lactam cho Clcr = ${crcl} mL/phút`,
      severity: crcl < 30 ? 'high' : 'low',
      recommendation: `Ưu tiên chiến lược truyền kéo dài (Extended Infusion 3-4h) đối với Meropenem và Pip/Tazo ở bệnh nhân sốc nhiễm khuẩn để tối ưu hóa %T > MIC.`,
      details,
      textForInsert: `[Chỉnh liều Beta-lactam (Clcr ${crcl} mL/phút)]: ${betaAdvice}`
    };
  }
};
