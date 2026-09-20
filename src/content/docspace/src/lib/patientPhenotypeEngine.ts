/**
 * PATIENT PHENOTYPE ENGINE (PCSE)
 * Động cơ phân tích kiểu hình lâm sàng & tính toán cá thể hoá theo thời gian thực
 * Chuẩn CKD-EPI 2021 (Kidney Disease: Improving Global Outcomes - KDIGO)
 */

import { ClinicalFormState, Gender, LabsState, PatientPhenotype, VitalsState, CkdStage, AgeCategory } from '../types.ts';

/**
 * Tính eGFR theo công thức CKD-EPI 2021 (Ref: Inker LA, et al. NEJM 2021)
 * @param creUmolL Nồng độ Creatinine huyết thanh (µmol/L)
 * @param age Tuổi bệnh nhân
 * @param gender Giới tính ('nam' | 'nu')
 */
export function calculateEgfrCkdEpi(
  creUmolL: number,
  age: number,
  gender: Gender
): { egfr: number; stage: CkdStage; label: string; actionNotice: string } {
  if (!creUmolL || creUmolL <= 0 || !age || age <= 0) {
    return { egfr: 90, stage: 'Normal', label: 'Bình thường (Ước tính)', actionNotice: '' };
  }

  // Chuyển µmol/L sang mg/dL (1 mg/dL = 88.4 µmol/L)
  const scr = creUmolL / 88.4;
  const isFemale = gender === 'nu';

  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const femaleFactor = isFemale ? 1.012 : 1.0;

  const minScr = Math.min(scr / kappa, 1);
  const maxScr = Math.max(scr / kappa, 1);

  const egfrValue = Math.round(
    142 *
      Math.pow(minScr, alpha) *
      Math.pow(maxScr, -1.2) *
      Math.pow(0.9938, age) *
      femaleFactor
  );

  let stage: CkdStage = 'Normal';
  let label = 'Bình thường';
  let actionNotice = 'Chức năng lọc thận bình thường, áp dụng liều chuẩn.';

  if (egfrValue >= 90) {
    stage = 'G1';
    label = 'G1: eGFR ≥ 90 mL/ph (Bình thường)';
    actionNotice = 'Duy trì liều chuẩn, theo dõi bilan dịch vào-ra.';
  } else if (egfrValue >= 60) {
    stage = 'G2';
    label = 'G2: eGFR 60–89 mL/ph (Giảm nhẹ)';
    actionNotice = 'Thận trọng với thuốc độc thận kéo dài, kiểm tra lại Creatinine sau 48h.';
  } else if (egfrValue >= 45) {
    stage = 'G3a';
    label = 'G3a: eGFR 45–59 mL/ph (Giảm nhẹ - vừa)';
    actionNotice = 'Cần rà soát và hiệu chỉnh liều một số kháng sinh (Vancomycin, Aminoglycoside, Quinolone).';
  } else if (egfrValue >= 30) {
    stage = 'G3b';
    label = 'G3b: eGFR 30–44 mL/ph (Giảm vừa - nặng)';
    actionNotice = 'Bắt buộc giảm liều 25–50% hoặc giãn khoảng cách liều. Chống chỉ định NSAIDs.';
  } else if (egfrValue >= 15) {
    stage = 'G4';
    label = 'G4: eGFR 15–29 mL/ph (Suy thận nặng)';
    actionNotice = 'Báo động đỏ: Giảm liều tối đa, chống chỉ định thuốc cản quang, hội chẩn chuyên khoa Thận.';
  } else {
    stage = 'G5';
    label = 'G5: eGFR < 15 mL/ph (Suy thận giai đoạn cuối)';
    actionNotice = 'Nguy kịch: Chỉ định lọc máu cấp cứu nếu có toan chuyển hóa/tăng kali/quá tải dịch.';
  }

  return { egfr: egfrValue, stage, label, actionNotice };
}

/**
 * Tổng hợp toàn bộ hồ sơ Kiểu hình Cá thể hóa (Patient Phenotype) từ dữ liệu lâm sàng
 */
export function resolvePatientPhenotype(
  form?: ClinicalFormState,
  vitals?: VitalsState,
  labs?: LabsState,
  selectedGradeIdx: number = 0,
  activeGradeTitle?: string,
  activeComplicationsCount: number = 0
): PatientPhenotype {
  const ageNum = form?.tuoi ? parseInt(form.tuoi, 10) : undefined;
  const gender = form?.gioiTinh || 'nam';

  // Nhận diện nhóm tuổi
  let ageCategory: AgeCategory = 'adult';
  let ageLabel = 'Người trưởng thành';
  if (ageNum !== undefined) {
    if (ageNum < 1) {
      ageCategory = 'infant';
      ageLabel = 'Nhũ nhi (< 1 tuổi)';
    } else if (ageNum < 12) {
      ageCategory = 'pediatric';
      ageLabel = `Nhi khoa (${ageNum} tuổi)`;
    } else if (ageNum < 18) {
      ageCategory = 'adolescent';
      ageLabel = `Vị thành niên (${ageNum} tuổi)`;
    } else if (ageNum >= 65) {
      ageCategory = 'elderly';
      ageLabel = `Người cao tuổi (${ageNum} tuổi)`;
    } else {
      ageCategory = 'adult';
      ageLabel = `Người lớn (${ageNum} tuổi)`;
    }
  }

  // Nhận diện thai kỳ từ bối cảnh/lý do hoặc text
  const rawContext = `${form?.lyDo || ''} ${form?.text?.cn || ''} ${form?.text?.tc || ''}`.toLowerCase();
  const isPregnant =
    gender === 'nu' &&
    (rawContext.includes('thai') ||
      rawContext.includes('mang thai') ||
      rawContext.includes('có bầu') ||
      rawContext.includes('tuần thai') ||
      rawContext.includes('tam cá nguyệt'));

  // Tính eGFR nếu có Creatinine
  const creVal = labs?.lCre ? parseFloat(labs.lCre) : undefined;
  let eGfr: number | undefined;
  let ckdStage: CkdStage | undefined;
  let hasRenalRisk = false;

  if (creVal && creVal > 0 && ageNum) {
    const renalRes = calculateEgfrCkdEpi(creVal, ageNum, gender);
    eGfr = renalRes.egfr;
    ckdStage = renalRes.stage;
    hasRenalRisk = eGfr < 60;
  } else if (creVal && creVal > 115) {
    hasRenalRisk = true;
  }

  // Nhận diện nguy cơ tổn thương gan (Men gan AST/ALT)
  const astVal = labs?.lAST ? parseFloat(labs.lAST) : undefined;
  const altVal = labs?.lALT ? parseFloat(labs.lALT) : undefined;
  const hasHepaticRisk = (astVal !== undefined && astVal > 200) || (altVal !== undefined && altVal > 200);

  // Tính BMI nếu có
  const bmiVal = vitals?.vBMI ? parseFloat(vitals.vBMI) : undefined;
  let bmiCategory: 'Underweight' | 'Normal' | 'Overweight' | 'Obese' | undefined;
  if (bmiVal) {
    if (bmiVal < 18.5) bmiCategory = 'Underweight';
    else if (bmiVal < 23) bmiCategory = 'Normal';
    else if (bmiVal < 25) bmiCategory = 'Overweight';
    else bmiCategory = 'Obese';
  }

  // Danh mục Cảnh báo quan trọng (Key Alerts)
  const keyAlerts: string[] = [];
  if (ageCategory === 'elderly') {
    keyAlerts.push('Nguy cơ quá tải tuần hoàn khi bù dịch nhanh, theo dõi tĩnh mạch cổ nổi & SpO2.');
  }
  if (ageCategory === 'pediatric') {
    keyAlerts.push('Bắt buộc tính liều thuốc và tốc độ dịch truyền chính xác theo Cân nặng (mL/kg/h).');
  }
  if (isPregnant) {
    keyAlerts.push('Báo động thai kỳ: Chống chỉ định các thuốc Phân loại FDA C/D/X, theo dõi tim thai q6h.');
  }
  if (hasRenalRisk && eGfr !== undefined) {
    keyAlerts.push(`Suy giảm chức năng thận (eGFR ${eGfr} mL/ph): Bắt buộc hiệu chỉnh liều & chống chỉ định NSAIDs.`);
  }
  if (hasHepaticRisk) {
    keyAlerts.push('Tổn thương gan cấp (AST/ALT tăng vọt): Hạn chế Paracetamol ≤ 2g/24h, tránh thuốc chuyển hóa gan.');
  }
  if (activeComplicationsCount > 0) {
    keyAlerts.push(`Có ${activeComplicationsCount} biến chứng cấp tính đang kích hoạt phác đồ xử trí khẩn cấp.`);
  }

  return {
    age: ageNum,
    ageCategory,
    ageLabel,
    gender,
    isPregnant,
    bmi: bmiVal,
    bmiCategory,
    eGfr,
    ckdStage,
    hasRenalRisk,
    hasHepaticRisk,
    activeGradeIdx: selectedGradeIdx,
    activeGradeTitle,
    activeComplicationsCount,
    keyAlerts,
  };
}
