import { PatientState, CalculatedRenalMetrics, RenalCategory } from '../types';

export const UMOL_TO_MGDL = 88.4;

export function convertScrToUmol(val: number, unit: 'umol' | 'mgdl'): number {
  if (unit === 'mgdl') {
    return Math.round(val * UMOL_TO_MGDL * 10) / 10;
  }
  return val;
}

export function convertScrToMgdl(val: number, unit: 'umol' | 'mgdl'): number {
  if (unit === 'umol') {
    return Math.round((val / UMOL_TO_MGDL) * 100) / 100;
  }
  return val;
}

export function calculateRenalMetrics(
  patient: PatientState,
  drugWeightRule?: { crcl?: string; dose?: string }
): CalculatedRenalMetrics {
  const scrUmol = convertScrToUmol(patient.scr, patient.scrUnit) || 90;
  const scrMgdl = convertScrToMgdl(patient.scr, patient.scrUnit) || 1.0;
  const age = patient.age || 60;
  const gender = patient.gender || 'm';
  const tbw = patient.weight || 60;
  const height = patient.height;

  let ibw: number | null = null;
  let adjBw: number | null = null;
  let bmi: number | null = null;

  if (height && height > 0) {
    const baseIbw = gender === 'm' ? 50 : 45.5;
    ibw = Math.round((baseIbw + 0.9 * (height - 152)) * 10) / 10;
    if (ibw < 10) ibw = 10;
    adjBw = Math.round((ibw + 0.4 * (tbw - ibw)) * 10) / 10;
    bmi = Math.round((tbw / Math.pow(height / 100, 2)) * 10) / 10;
  }

  // Determine which weight to use for Cockcroft-Gault CrCl
  let usedWeight = tbw;
  let usedWeightType = 'TBW (Cân nặng thực)';

  if (ibw !== null && bmi !== null && adjBw !== null) {
    if (tbw < ibw) {
      usedWeight = tbw;
      usedWeightType = 'TBW (Thiếu cân < IBW)';
    } else if (bmi >= 30 || tbw > 1.2 * ibw) {
      usedWeight = adjBw;
      usedWeightType = 'AdjBW (Hiệu chỉnh béo phì)';
    } else {
      usedWeight = drugWeightRule?.crcl === 'IBW' ? ibw : tbw;
      usedWeightType = drugWeightRule?.crcl === 'IBW' ? 'IBW (Cân nặng lý tưởng)' : 'TBW (Cân nặng thực)';
    }
  }

  // Cockcroft-Gault formula
  // CrCl (mL/min) = [ (140 - age) * Weight ] / [ 0.814 * Scr (umol/L) ] * (0.85 if female)
  // Trong thực hành dược lâm sàng: Với người cao tuổi (> 65 tuổi) suy kiệt teo cơ có SCr quá thấp (< 60 µmol/L hoặc < 0.7 mg/dL),
  // nếu dùng SCr thực sẽ ước tính CrCl cao giả tạo dẫn đến ngộ độc kháng sinh (Cefepime, Colistin, Aminoglycoside).
  // Khuyến cáo Sanford / KDIGO: Làm tròn SCr tối thiểu 60-70 µmol/L (0.7-0.8 mg/dL) để bảo vệ thận.
  let effectiveScrUmol = scrUmol;
  if (age >= 65 && scrUmol < 60) {
    effectiveScrUmol = 60;
  }
  let crcl = ((140 - age) * usedWeight) / (0.814 * effectiveScrUmol);
  if (gender === 'f') {
    crcl *= 0.85;
  }
  crcl = Math.max(1, Math.round(crcl * 10) / 10);

  // CKD-EPI 2021 formula (Refit without race)
  const kappa = gender === 'f' ? 0.7 : 0.9;
  const alpha = gender === 'f' ? -0.241 : -0.302;
  const genderMult = gender === 'f' ? 1.012 : 1.0;
  const scrOverKappa = scrMgdl / kappa;
  const minPart = Math.min(scrOverKappa, 1) ** alpha;
  const maxPart = Math.max(scrOverKappa, 1) ** -1.2;
  const agePart = 0.9938 ** age;
  const egfrCkdEpi = Math.max(1, Math.round(142 * minPart * maxPart * agePart * genderMult * 10) / 10);

  const isArc = crcl > 130;

  let renalCategory: RenalCategory = 'normal';
  let categoryLabelVi = 'Bình thường (CrCl ≥ 90 mL/phút)';
  let categoryLabelEn = 'Normal (CrCl ≥ 90 mL/min)';

  if (isArc) {
    renalCategory = 'arc';
    categoryLabelVi = 'Tăng thanh thải thận ARC (CrCl > 130 mL/phút)';
    categoryLabelEn = 'Augmented Renal Clearance ARC (> 130 mL/min)';
  } else if (crcl >= 90) {
    renalCategory = 'normal';
    categoryLabelVi = 'Chức năng thận bình thường (CrCl ≥ 90 mL/phút)';
    categoryLabelEn = 'Normal Renal Function (CrCl ≥ 90 mL/min)';
  } else if (crcl >= 60) {
    renalCategory = 'mild';
    categoryLabelVi = 'Suy thận mức độ nhẹ (CrCl 60-89 mL/phút)';
    categoryLabelEn = 'Mild Renal Impairment (CrCl 60-89 mL/min)';
  } else if (crcl >= 30) {
    renalCategory = 'moderate';
    categoryLabelVi = 'Suy thận mức độ trung bình (CrCl 30-59 mL/phút)';
    categoryLabelEn = 'Moderate Renal Impairment (CrCl 30-59 mL/min)';
  } else if (crcl >= 15) {
    renalCategory = 'severe';
    categoryLabelVi = 'Suy thận mức độ nặng (CrCl 15-29 mL/phút)';
    categoryLabelEn = 'Severe Renal Impairment (CrCl 15-29 mL/min)';
  } else {
    renalCategory = 'esrd';
    categoryLabelVi = 'Suy thận giai đoạn cuối / Lọc máu (CrCl < 15 mL/phút)';
    categoryLabelEn = 'End-Stage Renal Disease (CrCl < 15 mL/min)';
  }

  return {
    scrUmol,
    scrMgdl,
    crcl,
    egfrCkdEpi,
    ibw,
    adjBw,
    bmi,
    usedWeight,
    usedWeightType,
    renalCategory,
    categoryLabelVi,
    categoryLabelEn,
    isArc
  };
}

export function formatNumber(val: number, decimals = 1): string {
  return (Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals)).toString().replace('.', ',');
}

export function formatMg(val: number): string {
  if (val >= 1000) {
    return (val / 1000).toString().replace('.', ',') + ' g';
  }
  return val.toString() + ' mg';
}
