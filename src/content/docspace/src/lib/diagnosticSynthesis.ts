/**
 * MedLens DocSpace — Comprehensive Diagnostic & Treatment Protocol Synthesis Engine
 * Phân tích liên hoàn Lâm sàng & Cận lâm sàng để đưa ra Bộ Chẩn đoán Đầy đủ (5 Thành tố)
 * và Phác đồ Điều trị Tương ứng Cá thể hóa theo chuẩn Bộ Y Tế & Quốc Tế.
 */

import {
  AnalysisResult,
  ClinicalFormState,
  EpidemiologyContext,
  LabsState,
  ProblemStatementEntry,
  TrieuChung,
  VitalsState,
} from '../types.ts';
import { normalizeText } from './normalizeUtils.ts';

export interface FluidRateStep {
  label: string;
  rateMlKgH: number;
  durationHours: string;
  rateMlPerHour: number;
  dropsPerMin: number; // Chuẩn 1 ml = 20 giọt (dây truyền tiêu chuẩn)
  solutionType: string;
  note: string;
}

export interface PersonalizedFluidPlan {
  actualWeightKg: number;
  heightCm: number;
  bmi: number;
  bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese';
  idealBodyWeightKg: number; // IBW (Devine)
  adjustedBodyWeightKg: number; // AdjBW = IBW + 0.4 * (TBW - IBW)
  prescribedWeightKg: number; // Cân nặng dùng để tính dịch
  weightBasis: 'actual' | 'adjusted' | 'ideal';
  weightRationale: string;
  recommendedSolution: string;
  steps: FluidRateStep[];
  totalEstimated24hVolumeMl: number;
  safetyCautions: string[];
  cessationCriteria: string[]; // Tiêu chuẩn ngưng dịch (tránh phù phổi cấp)
}

export interface ComprehensiveDiagnosisResult {
  // 1. Chẩn đoán xác định / Bệnh chính
  definitive: {
    diseaseName: string;
    diseaseIcd: string;
    diseaseDay: number | null; // Ngày thứ N của bệnh
    diseaseDayText: string;
    pathogen: string;
    confidencePct: number;
  };

  // 2. Phân độ & Giai đoạn bệnh sinh
  severityAndPhase: {
    gradeIndex: number;
    gradeName: string;
    severityLevel: 'mild' | 'moderate' | 'severe' | 'critical';
    phaseName: 'Giai đoạn Sốt' | 'Giai đoạn Nguy hiểm (Thoát huyết tương)' | 'Giai đoạn Hồi phục (Tái hấp thu)' | 'Giai đoạn Toàn phát';
    phaseDayRange: string;
    phaseKeyCharacteristics: string;
    warningSignsPresent: string[];
    shockSignsPresent: string[];
    organFailureSigns: string[];
  };

  // 3. Biến chứng hiện tại & Nguy cơ
  complications: {
    identified: string[];
    riskForecast: string[];
    summaryText: string;
  };

  // 4. Cơ địa & Bệnh đồng mắc (Phenotype)
  comorbidities: {
    bmi: number | null;
    bmiCategoryText: string;
    specialPopulations: string[]; // Thai kỳ, trẻ nhỏ, người cao tuổi...
    comorbidDiseases: string[]; // THA, ĐTĐ, CKD, Bệnh gan mạn...
    phenotypeNotes: string[];
  };

  // 5. Chẩn đoán Phân biệt
  differentials: Array<{
    diseaseName: string;
    diseaseIcd?: string;
    matchPct: number;
    pointsInFavor: string[];
    pointsAgainst: string[];
    confirmatoryExclusionTest: string;
    urgencyBadge: 'Khẩn cấp' | 'Ưu tiên' | 'Thường quy';
  }>;

  // Chuỗi chẩn đoán hoàn chỉnh 1 dòng chuẩn EMR / HIS
  fullDiagnosisString: string;
  emrStructuredText: string;

  // Phác đồ điều trị tương ứng tự động
  correspondingProtocol: {
    triageTarget: string;
    triageLevel: 'outpatient' | 'inpatient' | 'icu';
    targetBranchIndex: number;
    targetBranchName: string;
    fluidPlan: PersonalizedFluidPlan | null;
    initialMedicationOrders: Array<{
      category: 'Hạ sốt & Giảm đau' | 'Dịch bù đường uống' | 'Dịch truyền tĩnh mạch' | 'Bảo vệ niêm mạc' | 'Kháng sinh' | 'Chế phẩm máu';
      name: string;
      dosage: string;
      route: string;
      frequency: string;
      clinicalInstruction: string;
      isContraindicationAlert?: boolean;
    }>;
    contraindications: string[];
    dynamicMonitoring: Array<{
      parameter: string;
      frequency: string;
      targetGoal: string;
      alertThreshold: string;
    }>;
    safeDischargeCriteria: string[];
  };
}

/**
 * Tính Cân nặng Lý tưởng (IBW - Ideal Body Weight) theo công thức Devine
 */
export function calculateIBW(heightCm: number, gender: 'nam' | 'nu' | 'khac'): number {
  if (heightCm <= 0 || isNaN(heightCm)) return 55;
  const inchesOver5Feet = Math.max(0, (heightCm - 152.4) / 2.54);
  if (gender === 'nam') {
    return Math.round((50 + 2.3 * inchesOver5Feet) * 10) / 10;
  } else {
    return Math.round((45.5 + 2.3 * inchesOver5Feet) * 10) / 10;
  }
}

/**
 * Tính Cân nặng Hiệu chỉnh (AdjBW - Adjusted Body Weight)
 * AdjBW = IBW + 0.4 * (TBW - IBW)
 */
export function calculateAdjBW(actualWeightKg: number, ibwKg: number): number {
  if (actualWeightKg <= ibwKg) return actualWeightKg;
  return Math.round((ibwKg + 0.4 * (actualWeightKg - ibwKg)) * 10) / 10;
}

/**
 * Trích xuất ngày bệnh từ lời kể, lý do vào viện hoặc form
 */
export function extractDiseaseDay(form: ClinicalFormState): number | null {
  if (form.ngayBenh) {
    const d = parseInt(form.ngayBenh, 10);
    if (!isNaN(d) && d > 0 && d <= 30) return d;
  }

  const textToScan = normalizeText(
    `${form.lyDo} ${form.text.cn} ${form.text.tt} ${form.text.tc}`
  );

  const dayMatch = textToScan.match(/(?:ngay|n)(?:\s*(?:thu|t)?\s*)(\d+)/i);
  if (dayMatch && dayMatch[1]) {
    const d = parseInt(dayMatch[1], 10);
    if (!isNaN(d) && d >= 1 && d <= 21) return d;
  }

  const sotMatch = textToScan.match(/sot\s*(?:duoc|khoang|tam)?\s*(\d+)\s*(?:ngay|d)/i);
  if (sotMatch && sotMatch[1]) {
    const d = parseInt(sotMatch[1], 10);
    if (!isNaN(d) && d >= 1 && d <= 21) return d;
  }

  return null;
}

/**
 * Trích xuất cân nặng và chiều cao
 */
export function extractAnthropometry(
  form: ClinicalFormState,
  vitals: VitalsState
): { weightKg: number; heightCm: number; bmi: number } {
  let weight = 0;
  let height = 0;

  if (form.canNang) weight = parseFloat(form.canNang);
  if (form.chieuCao) height = parseFloat(form.chieuCao);

  // Quét từ văn bản nếu chưa có
  if (!weight || isNaN(weight)) {
    const allText = `${form.lyDo} ${form.text.cn} ${form.text.tt} ${form.text.tc}`;
    const weightMatch = allText.match(/(\d+(?:\.\d+)?)\s*(?:kg|kilogram)/i);
    if (weightMatch) weight = parseFloat(weightMatch[1]);
  }

  if (!height || isNaN(height)) {
    const allText = `${form.lyDo} ${form.text.cn} ${form.text.tt} ${form.text.tc}`;
    const heightMatch = allText.match(/(\d{2,3})\s*(?:cm|centimet)/i);
    if (heightMatch) height = parseFloat(heightMatch[1]);
  }

  // Giá trị mặc định lâm sàng nếu chưa nhập
  if (!weight || isNaN(weight) || weight <= 0) {
    weight = form.gioiTinh === 'nam' ? 62 : 52;
  }
  if (!height || isNaN(height) || height <= 0) {
    height = form.gioiTinh === 'nam' ? 166 : 156;
  }

  let bmi = 0;
  if (vitals.vBMI) {
    bmi = parseFloat(vitals.vBMI);
  }
  if (!bmi || isNaN(bmi) || bmi <= 0) {
    const heightM = height / 100;
    bmi = Math.round((weight / (heightM * heightM)) * 10) / 10;
  }

  return { weightKg: weight, heightCm: height, bmi };
}

/**
 * ENGINE CHÍNH: Tổng hợp Lâm sàng & Cận lâm sàng thành Bộ Chẩn đoán Đầy đủ và Phác đồ Tương ứng
 */
export function synthesizeComprehensiveDiagnosis(
  topResult: AnalysisResult | null,
  allResults: AnalysisResult[],
  form: ClinicalFormState,
  vitals: VitalsState,
  labs: LabsState,
  selectedSymptoms: TrieuChung[],
  negatedSymptoms: TrieuChung[],
  problems: ProblemStatementEntry[] = [],
  epiContext?: EpidemiologyContext
): ComprehensiveDiagnosisResult {
  const lead = topResult ? topResult.b : null;
  const leadName = lead ? lead.ten : 'Chưa xác định';
  const leadIcd = lead ? lead.icd : 'R50.9';
  const leadMatchPct = topResult ? topResult.pct : 0;
  const isDengue =
    leadName.toLowerCase().includes('dengue') ||
    leadName.toLowerCase().includes('sốt xuất huyết') ||
    lead?.id === 'sot_xuat_huyet' ||
    lead?.id === 'sot_xuat_huyet_dengue';

  // 1. Phân tích nhân trắc học & Cân nặng tính liều
  const { weightKg, heightCm, bmi } = extractAnthropometry(form, vitals);
  const ibw = calculateIBW(heightCm, form.gioiTinh);
  const adjBw = calculateAdjBW(weightKg, ibw);

  let bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese' = 'normal';
  let bmiCategoryText = 'Bình thường';
  if (bmi < 18.5) {
    bmiCategory = 'underweight';
    bmiCategoryText = 'Thể trạng gầy (BMI < 18.5)';
  } else if (bmi >= 25) {
    bmiCategory = 'obese';
    bmiCategoryText = `Béo phì độ ${bmi >= 30 ? 'II' : 'I'} (BMI ${bmi} kg/m² - Chuẩn Châu Á)`;
  } else if (bmi >= 23) {
    bmiCategory = 'overweight';
    bmiCategoryText = `Thừa cân (BMI ${bmi} kg/m² - Chuẩn IDI & WPRO)`;
  } else {
    bmiCategory = 'normal';
    bmiCategoryText = `Thể trạng cân đối (BMI ${bmi} kg/m²)`;
  }

  // Quyết định cân nặng dùng tính dịch
  let prescribedWeight = weightKg;
  let weightBasis: 'actual' | 'adjusted' | 'ideal' = 'actual';
  let weightRationale = 'Dùng cân nặng thực tế do thể trạng cân đối.';

  if (bmi >= 25) {
    prescribedWeight = adjBw;
    weightBasis = 'adjusted';
    weightRationale = `Bệnh nhân béo phì (BMI ${bmi} kg/m²). BẮT BUỘC dùng Cân nặng hiệu chỉnh AdjBW (${adjBw} kg) thay vì Cân nặng thực (${weightKg} kg) để tránh quá tải dịch và phù phổi cấp.`;
  } else if (bmi >= 23) {
    prescribedWeight = adjBw;
    weightBasis = 'adjusted';
    weightRationale = `Bệnh nhân thừa cân (BMI ${bmi} kg/m²). Khuyến cáo dùng AdjBW (${adjBw} kg) để tối ưu hóa thể tích dịch truyền.`;
  }

  // 2. Phân tích Ngày bệnh & Giai đoạn bệnh sinh
  const diseaseDay = extractDiseaseDay(form);
  let diseaseDayText = diseaseDay ? `Ngày ${diseaseDay}` : 'Chưa rõ ngày bệnh';
  let phaseName: 'Giai đoạn Sốt' | 'Giai đoạn Nguy hiểm (Thoát huyết tương)' | 'Giai đoạn Hồi phục (Tái hấp thu)' | 'Giai đoạn Toàn phát' = 'Giai đoạn Sốt';
  let phaseDayRange = 'Ngày 1 - Ngày 3';
  let phaseKeyCharacteristics = 'Sốt cao đột ngột, đau cơ khớp, nhức đầu. Chưa có thoát huyết tương đáng kể.';

  if (diseaseDay) {
    if (diseaseDay <= 3) {
      phaseName = 'Giai đoạn Sốt';
      phaseDayRange = 'Ngày 1 - Ngày 3';
      phaseKeyCharacteristics = 'Virus máu cao, sốt cao liên tục, mất nước do sốt. Nguy cơ co giật ở trẻ em.';
    } else if (diseaseDay >= 4 && diseaseDay <= 6) {
      phaseName = 'Giai đoạn Nguy hiểm (Thoát huyết tương)';
      phaseDayRange = 'Ngày 4 - Ngày 6';
      phaseKeyCharacteristics = 'Thoát huyết tương đỉnh điểm, giảm tiểu cầu nhanh, Hct tăng cao. Thời điểm vàng dễ xảy ra SỐC DENGUE và xuất huyết nặng.';
    } else if (diseaseDay >= 7) {
      phaseName = 'Giai đoạn Hồi phục (Tái hấp thu)';
      phaseDayRange = 'Ngày 7 - Ngày 10';
      phaseKeyCharacteristics = 'Tái hấp thu dịch từ khoang gian bào vào lòng mạch, tiểu nhiều, ăn ngon miệng. CẢNH BÁO QUÁ TẢI DỊCH NẾU TIẾP TỤC TRUYỀN DỊCH.';
    }
  } else {
    phaseName = 'Giai đoạn Toàn phát';
    phaseDayRange = 'Đang diễn tiến';
    phaseKeyCharacteristics = 'Bệnh cảnh cấp tính cần theo dõi sát sinh hiệu và cận lâm sàng.';
  }

  // 3. Phân tích Dấu hiệu Cảnh báo (Warning Signs) & Sốc
  const sbp = parseFloat(vitals.vHATT);
  const dbp = parseFloat(vitals.vHATTr);
  const pulse = parseFloat(vitals.vMach);
  const spo2 = parseFloat(vitals.vSpo2);
  const hct = parseFloat(labs.lHct);
  const plt = parseFloat(labs.lTC);
  const wbc = parseFloat(labs.lBC);
  const ast = parseFloat(labs.lAST || '');
  const alt = parseFloat(labs.lALT || '');
  const lactate = parseFloat(labs.lLactate || '');

  const warningSignsPresent: string[] = [];
  const shockSignsPresent: string[] = [];
  const organFailureSigns: string[] = [];

  const sympNames = selectedSymptoms.map((s) => s.ten.toLowerCase());
  const selectedIds = new Set(selectedSymptoms.map((s) => s.id));

  // Kiểm tra dấu hiệu cảnh báo lâm sàng
  if (
    selectedIds.has('tc_dau_hieu_canh_bao_dau_bung_gan_non_oi') ||
    sympNames.some((n) => n.includes('đau bụng') || n.includes('vùng gan') || n.includes('hạ sườn phải'))
  ) {
    warningSignsPresent.push('Đau bụng nhiều và liên tục / đau tăng vùng gan');
  }

  if (sympNames.some((n) => n.includes('nôn') || n.includes('buồn nôn') || n.includes('nôn ói'))) {
    warningSignsPresent.push('Nôn ói nhiều (≥ 3 lần/1h hoặc ≥ 4 lần/6h)');
  }

  if (
    sympNames.some((n) => n.includes('chảy máu') || n.includes('chân răng') || n.includes('chảy máu cam') || n.includes('rong kinh'))
  ) {
    warningSignsPresent.push('Xuất huyết niêm mạc (chảy máu mũi, chân răng, rong kinh)');
  }

  if (
    sympNames.some((n) => n.includes('li bì') || n.includes('vật vã') || n.includes('bứt rứt') || n.includes('mệt lả'))
  ) {
    warningSignsPresent.push('Vật vã, lừ đừ, li bì, mệt lả');
  }

  if (sympNames.some((n) => n.includes('tiểu ít') || n.includes('thiểu niệu'))) {
    warningSignsPresent.push('Tiểu ít (< 0.5 ml/kg/h)');
  }

  if (
    labs.lSieuAm?.toLowerCase().includes('dịch') ||
    labs.lSieuAm?.toLowerCase().includes('màng bụng') ||
    labs.lSieuAm?.toLowerCase().includes('túi mật') ||
    labs.lXQuang?.toLowerCase().includes('tràn dịch')
  ) {
    warningSignsPresent.push('Ứ dịch trên hình ảnh học (tràn dịch màng bụng / màng phổi / phù nề dày thành túi mật)');
  }

  // Dấu hiệu cảnh báo cận lâm sàng: Hct tăng cao kèm tiểu cầu giảm nhanh
  if (!isNaN(hct) && hct >= 44) {
    if (!isNaN(plt) && plt <= 100) {
      warningSignsPresent.push(`Cận lâm sàng cảnh báo: Hct tăng cao (${hct}%) kèm Tiểu cầu giảm nhanh (${plt} G/L)`);
    } else {
      warningSignsPresent.push(`Hematocrit tăng cao (${hct}%) - biểu hiện cô đặc máu thoát dịch`);
    }
  } else if (!isNaN(plt) && plt <= 100) {
    warningSignsPresent.push(`Tiểu cầu giảm nhanh (< 100 G/L, hiện tại: ${plt} G/L)`);
  }

  // Kiểm tra dấu hiệu SỐC & TỔN THƯƠNG TẠNG
  const hasNarrowPressure = !isNaN(sbp) && !isNaN(dbp) && sbp - dbp <= 20;
  const hasHypotension = !isNaN(sbp) && sbp <= 90 && sbp > 0;
  const hasTachycardia = !isNaN(pulse) && pulse >= 115;
  const hasShockSymp =
    selectedIds.has('tc_soc_mach_nhanh_ha_kep_hoac_tut') ||
    sympNames.some((n) => n.includes('sốc') || n.includes('trụy mạch') || n.includes('lạnh chi'));

  if (hasNarrowPressure) {
    shockSignsPresent.push(`Huyết áp kẹp nguy hiểm (HA ${sbp}/${dbp} mmHg, hiệu áp = ${sbp - dbp} ≤ 20 mmHg)`);
  }
  if (hasHypotension) {
    shockSignsPresent.push(`Tụt huyết áp (HA tâm thu ${sbp} ≤ 90 mmHg)`);
  }
  if (hasShockSymp || (hasTachycardia && (hasNarrowPressure || hasHypotension))) {
    shockSignsPresent.push('Mạch nhanh nhỏ, chi lạnh ẩm, thời gian đổ đầy mao mạch CRT > 2s');
  }

  // Suy tạng
  if ((!isNaN(ast) && ast >= 1000) || (!isNaN(alt) && alt >= 1000)) {
    organFailureSigns.push(`Tổn thương gan cấp nghiêm trọng (AST/ALT ${Math.max(ast || 0, alt || 0)} ≥ 1000 U/L)`);
  }
  if (!isNaN(spo2) && spo2 < 92) {
    organFailureSigns.push(`Suy hô hấp cấp giảm oxy máu (SpO2 ${spo2}% < 92%)`);
  }
  if (sympNames.some((n) => n.includes('nôn máu') || n.includes('phân đen'))) {
    organFailureSigns.push('Xuất huyết tiêu hóa nặng đe dọa huyết động');
  }

  // 4. Phân độ lâm sàng (Grade)
  let gradeIndex = 0;
  let gradeName = 'Mức độ 1: Sốt xuất huyết Dengue (Không có dấu hiệu cảnh báo)';
  let severityLevel: 'mild' | 'moderate' | 'severe' | 'critical' = 'mild';
  let triageTarget = 'Điều trị Ngoại trú có theo dõi hàng ngày / Trạm Y tế';
  let triageLevel: 'outpatient' | 'inpatient' | 'icu' = 'outpatient';

  if (shockSignsPresent.length > 0 || organFailureSigns.length > 0) {
    gradeIndex = 2;
    gradeName = 'Mức độ 3: Sốt xuất huyết Dengue NẶNG (Sốc Dengue / Xuất huyết nặng / Tổn thương tạng)';
    severityLevel = 'critical';
    triageTarget = 'Khoa Hồi sức Cấp cứu (ICU / HDU) Bệnh viện tuyến Tỉnh / Trung ương';
    triageLevel = 'icu';
  } else if (warningSignsPresent.length > 0) {
    gradeIndex = 1;
    gradeName = 'Mức độ 2: Sốt xuất huyết Dengue CÓ DẤU HIỆU CẢNH BÁO (Warning Signs)';
    severityLevel = 'severe';
    triageTarget = 'Khoa Nội / Truyền nhiễm Bệnh viện đa khoa (Điều trị Nội trú 100%)';
    triageLevel = 'inpatient';
  } else {
    gradeIndex = 0;
    gradeName = 'Mức độ 1: Sốt xuất huyết Dengue (Chưa có dấu hiệu cảnh báo)';
    severityLevel = 'moderate';
    triageTarget = 'Quản lý Ngoại trú tại nhà, hẹn tái khám và xét nghiệm mỗi 24 giờ';
    triageLevel = 'outpatient';
  }

  // 5. Biến chứng
  const identifiedComplications: string[] = [];
  const riskForecast: string[] = [];

  if (shockSignsPresent.length > 0) {
    identifiedComplications.push('Sốc giảm thể tích do thất thoát huyết tương ồ ạt (Dengue Shock Syndrome)');
  } else if (warningSignsPresent.length > 0 && phaseName.includes('Nguy hiểm')) {
    riskForecast.push('Nguy cơ cao tiến triển thành Sốc Dengue trong vòng 12-24 giờ tới');
  }

  if (!isNaN(hct) && hct >= 44) {
    identifiedComplications.push(`Cô đặc máu rõ rệt (Hct ${hct}%) do rò rỉ dịch qua nội mạc mạch máu`);
  }

  if (!isNaN(plt) && plt < 50) {
    identifiedComplications.push(`Giảm tiểu cầu nặng (${plt} G/L), nguy cơ xuất huyết niêm mạc và nội tạng`);
  } else if (!isNaN(plt) && plt < 100) {
    riskForecast.push(`Tiểu cầu đang giảm dốc (${plt} G/L), cần theo dõi sát nguy cơ xuất huyết`);
  }

  if (organFailureSigns.length > 0) {
    identifiedComplications.push(...organFailureSigns);
  }

  if (phaseName.includes('Hồi phục')) {
    riskForecast.push('Nguy cơ quá tải dịch và phù phổi cấp nếu truyền dịch quá mức trong pha tái hấp thu');
  }

  const complicationSummary =
    identifiedComplications.length > 0
      ? identifiedComplications.join('; ')
      : 'Chưa ghi nhận biến chứng đe dọa sinh mạng tại thời điểm đánh giá.';

  // 6. Cơ địa & Bệnh đồng mắc
  const specialPopulations: string[] = [];
  const comorbidDiseases: string[] = [];
  const phenotypeNotes: string[] = [];

  const ageNum = parseInt(form.tuoi, 10);
  if (!isNaN(ageNum)) {
    if (ageNum >= 65) {
      specialPopulations.push(`Người cao tuổi (${ageNum} tuổi) - dự trữ tim mạch giảm`);
      phenotypeNotes.push('Thận trọng nguy cơ quá tải dịch và rối loạn điện giải ở người cao tuổi.');
    } else if (ageNum <= 12) {
      specialPopulations.push(`Trẻ em (${ageNum} tuổi)`);
      phenotypeNotes.push('Theo dõi sát mạch, huyết áp kẹp và tình trạng tiểu tiện.');
    }
  }

  const medHistory = normalizeText(form.text.tc || '');
  if (medHistory.includes('tang huyet ap') || medHistory.includes('tha')) {
    comorbidDiseases.push('Tăng huyết áp');
    phenotypeNotes.push('Huyết áp tụt có thể che lấp bởi trị số bình thường ở người có tiền căn tăng huyết áp.');
  }
  if (medHistory.includes('dai thao duong') || medHistory.includes('dtd') || medHistory.includes('tieu duong')) {
    comorbidDiseases.push('Đái tháo đường');
    phenotypeNotes.push('Kiểm soát chặt chẽ đường huyết và nguy cơ nhiễm trùng phối hợp.');
  }
  if (medHistory.includes('than') || medHistory.includes('ckd') || medHistory.includes('suy than')) {
    comorbidDiseases.push('Bệnh thận mạn');
    phenotypeNotes.push('Cân chỉnh thể tích dịch truyền cực kỳ chặt chẽ, theo dõi nước tiểu mỗi giờ.');
  }
  if (medHistory.includes('loet') || medHistory.includes('da day') || medHistory.includes('xuat huyet')) {
    comorbidDiseases.push('Tiền sử loét dạ dày - tá tràng');
    phenotypeNotes.push('Nguy cơ cao xuất huyết tiêu hóa, chỉ định PPI bảo vệ niêm mạc dạ dày.');
  }
  if (medHistory.includes('thai') || form.lyDo.toLowerCase().includes('thai')) {
    specialPopulations.push('Phụ nữ mang thai');
    phenotypeNotes.push('Nguy cơ sảy thai, sinh non, băng huyết sau sinh. Phối hợp Sản khoa theo dõi tim thai.');
  }

  // 7. Chẩn đoán Phân biệt (Differentials)
  const differentials = allResults.slice(1, 4).map((r) => {
    const diffDisease = r.b;
    const diffName = diffDisease.ten;
    const diffLower = diffName.toLowerCase();

    let confirmatoryTest = 'Cấy máu, Procalcitonin và công thức máu kiểm tra';
    let urgencyBadge: 'Khẩn cấp' | 'Ưu tiên' | 'Thường quy' = 'Ưu tiên';

    if (diffLower.includes('nhiễm trùng huyết') || diffLower.includes('nhiễm khuẩn huyết') || diffLower.includes('sốc')) {
      confirmatoryTest = 'Định lượng Procalcitonin máu & Cấy máu 2 vị trí trước khi dùng kháng sinh';
      urgencyBadge = 'Khẩn cấp';
    } else if (diffLower.includes('sốt phát ban') || diffLower.includes('sởi') || diffLower.includes('rubella')) {
      confirmatoryTest = 'Huyết thanh học IgM/IgG vi rút phát ban, theo dõi tính chất nổi ban từ mặt xuống thân';
      urgencyBadge = 'Thường quy';
    } else if (diffLower.includes('viêm gan')) {
      confirmatoryTest = 'Bộ dấu ấn HBsAg, Anti-HCV, IgM Anti-HAV & Siêu âm Doppler gan mật';
      urgencyBadge = 'Ưu tiên';
    } else if (diffLower.includes('sốt rét')) {
      confirmatoryTest = 'Kéo lam máu giọt dày/giọt mỏng tìm ký sinh trùng sốt rét Plasmodium & Test nhanh Ag';
      urgencyBadge = 'Khẩn cấp';
    } else if (diffLower.includes('viêm ruột thừa')) {
      confirmatoryTest = 'Siêu âm ổ bụng đầu dò nông góc hồi manh tràng & Chụp CT Scanner bụng có cản quang';
      urgencyBadge = 'Khẩn cấp';
    }

    const pointsInFavor = r.matched.slice(0, 3).map((m) => m.tc.ten);
    const pointsAgainst = r.missing.slice(0, 2).map((m) => m.tc.ten);

    return {
      diseaseName: diffName,
      diseaseIcd: diffDisease.icd,
      matchPct: r.pct,
      pointsInFavor,
      pointsAgainst,
      confirmatoryExclusionTest: confirmatoryTest,
      urgencyBadge,
    };
  });

  // 8. XÂY DỰNG PHÁC ĐỒ DỊCH TRUYỀN CÁ THỂ HÓA (Personalized Fluid Plan)
  let fluidPlan: PersonalizedFluidPlan | null = null;

  if (isDengue && (severityLevel === 'severe' || severityLevel === 'critical')) {
    const isShock = severityLevel === 'critical';
    const rateSteps: FluidRateStep[] = [];

    if (isShock) {
      // Phác đồ Sốc SXH Dengue: 15-20 ml/kg/h -> 10 ml/kg/h -> 7.5 ml/kg/h -> 5 ml/kg/h -> 3 ml/kg/h -> 1.5 ml/kg/h
      const step1Ml = Math.round(prescribedWeight * 15);
      const step1Drops = Math.round((step1Ml * 20) / 60);
      rateSteps.push({
        label: 'Giờ thứ 1 (Chống sốc ban đầu)',
        rateMlKgH: 15,
        durationHours: '1 giờ',
        rateMlPerHour: step1Ml,
        dropsPerMin: step1Drops,
        solutionType: 'Ringer Lactate hoặc NaCl 0.9%',
        note: 'Đo lại Mạch, HA, SpO2, Hct sau 1 giờ. Nếu không đáp ứng chuyển dung dịch Cao phân tử.',
      });

      const step2Ml = Math.round(prescribedWeight * 10);
      const step2Drops = Math.round((step2Ml * 20) / 60);
      rateSteps.push({
        label: 'Giờ thứ 2 - 3 (Ổn định huyết động)',
        rateMlKgH: 10,
        durationHours: '2 giờ',
        rateMlPerHour: step2Ml,
        dropsPerMin: step2Drops,
        solutionType: 'Ringer Lactate',
        note: 'Nếu Hct giảm và sinh hiệu cải thiện, giảm tốc độ dịch truyền.',
      });

      const step3Ml = Math.round(prescribedWeight * 5);
      const step3Drops = Math.round((step3Ml * 20) / 60);
      rateSteps.push({
        label: 'Giờ thứ 4 - 7 (Duy trì thể tích lòng mạch)',
        rateMlKgH: 5,
        durationHours: '4 giờ',
        rateMlPerHour: step3Ml,
        dropsPerMin: step3Drops,
        solutionType: 'Ringer Lactate hoặc NaCl 0.9%',
        note: 'Đánh giá lượng nước tiểu (mục tiêu ≥ 0.5 - 1 ml/kg/h).',
      });

      const step4Ml = Math.round(prescribedWeight * 3);
      const step4Drops = Math.round((step4Ml * 20) / 60);
      rateSteps.push({
        label: 'Giờ thứ 8 - 18 (Giảm dần tốc độ)',
        rateMlKgH: 3,
        durationHours: '10 giờ',
        rateMlPerHour: step4Ml,
        dropsPerMin: step4Drops,
        solutionType: 'Ringer Lactate',
        note: 'Chuẩn bị ngưng dịch trong vòng 24 - 48 giờ sau sốc.',
      });
    } else {
      // Phác đồ SXH Có dấu hiệu cảnh báo: 6 ml/kg/h -> 5 ml/kg/h -> 3 ml/kg/h -> 1.5 ml/kg/h
      const step1Ml = Math.round(prescribedWeight * 6);
      const step1Drops = Math.round((step1Ml * 20) / 60);
      rateSteps.push({
        label: 'Bậc 1 (2 giờ đầu)',
        rateMlKgH: 6,
        durationHours: '1 - 2 giờ',
        rateMlPerHour: step1Ml,
        dropsPerMin: step1Drops,
        solutionType: 'Ringer Lactate hoặc NaCl 0.9%',
        note: `Liều 6 ml/kg/h tính theo ${prescribedWeight} kg. Kiểm tra lại Hct sau 2 giờ.`,
      });

      const step2Ml = Math.round(prescribedWeight * 5);
      const step2Drops = Math.round((step2Ml * 20) / 60);
      rateSteps.push({
        label: 'Bậc 2 (2 - 4 giờ tiếp theo)',
        rateMlKgH: 5,
        durationHours: '2 - 4 giờ',
        rateMlPerHour: step2Ml,
        dropsPerMin: step2Drops,
        solutionType: 'Ringer Lactate',
        note: 'Nếu lâm sàng cải thiện và Hct giảm, hạ tiếp xuống bậc 3 ml/kg/h.',
      });

      const step3Ml = Math.round(prescribedWeight * 3);
      const step3Drops = Math.round((step3Ml * 20) / 60);
      rateSteps.push({
        label: 'Bậc 3 (4 - 6 giờ tiếp theo)',
        rateMlKgH: 3,
        durationHours: '4 - 6 giờ',
        rateMlPerHour: step3Ml,
        dropsPerMin: step3Drops,
        solutionType: 'Ringer Lactate',
        note: 'Theo dõi thể tích nước tiểu và dấu hiệu phục hồi tưới máu mô.',
      });

      const step4Ml = Math.round(prescribedWeight * 1.5);
      const step4Drops = Math.round((step4Ml * 20) / 60);
      rateSteps.push({
        label: 'Bậc 4 (Duy trì & Cai dịch)',
        rateMlKgH: 1.5,
        durationHours: '6 - 12 giờ',
        rateMlPerHour: step4Ml,
        dropsPerMin: step4Drops,
        solutionType: 'Ringer Lactate hoặc Oresol đường uống',
        note: 'Ngừng truyền dịch khi qua 48 giờ tính từ lúc bắt đầu truyền hoặc khi có dấu hiệu tái hấp thu.',
      });
    }

    const totalEst24h = rateSteps.reduce((acc, step) => {
      const hours = parseFloat(step.durationHours) || 2;
      return acc + step.rateMlPerHour * hours;
    }, 0);

    fluidPlan = {
      actualWeightKg: weightKg,
      heightCm,
      bmi,
      bmiCategory,
      idealBodyWeightKg: ibw,
      adjustedBodyWeightKg: adjBw,
      prescribedWeightKg: prescribedWeight,
      weightBasis,
      weightRationale,
      recommendedSolution: 'Ringer Lactate (Ưu tiên số 1) hoặc Natri Clorid 0.9%',
      steps: rateSteps,
      totalEstimated24hVolumeMl: Math.round(totalEst24h),
      safetyCautions: [
        'QUY TẮC VÀNG: Không truyền dịch duy trì kéo dài quá 48 giờ ở bệnh nhân Dengue.',
        'Thường xuyên đánh giá gan to, ran ẩm ở đáy phổi và chỉ số SpO2 để phát hiện sớm quá tải tuần hoàn.',
        'Nếu Hct giảm nhanh nhưng huyết áp kẹp hoặc mạch nhanh -> Nghi ngờ XUẤT HUYẾT NỘI TẠNG ẨN, chỉ định truyền máu khẩn.',
      ],
      cessationCriteria: [
        'Hết sốt trên 48 giờ và tổng trạng tỉnh táo, ăn ngon miệng.',
        'Huyết động ổn định (Huyết áp bình thường, mạch đều, CRT < 2s).',
        'Lượng nước tiểu đạt > 0.5 - 1 ml/kg/h.',
        'Hct giảm về mức nền và Tiểu cầu bắt đầu tăng trở lại (> 50 G/L).',
        'Có biểu hiện tái hấp thu dịch (nước tiểu nhiều, nhịp tim chậm sinh lý).',
      ],
    };
  }

  // 9. Y Lệnh Thuốc & Chăm sóc Tương ứng
  const initialMedicationOrders: ComprehensiveDiagnosisResult['correspondingProtocol']['initialMedicationOrders'] = [];

  // Hạ sốt an toàn
  const pcmDose = Math.round(weightKg * 12.5); // 10-15 mg/kg
  initialMedicationOrders.push({
    category: 'Hạ sốt & Giảm đau',
    name: 'Paracetamol (Acetaminophen)',
    dosage: `${pcmDose} mg (Uống hoặc đặt hậu môn nếu nôn ói)`,
    route: 'Đường uống / Trực tràng',
    frequency: 'Mỗi 4 - 6 giờ khi sốt ≥ 38.5°C (Tối đa 4 lần / 24h, không quá 60 mg/kg/ngày)',
    clinicalInstruction: 'Chỉ dùng khi sốt cao khó chịu. Tuyệt đối không dùng quá liều gây suy gan cấp.',
  });

  // Cảnh báo chống chỉ định NSAIDs
  initialMedicationOrders.push({
    category: 'Hạ sốt & Giảm đau',
    name: 'Aspirin, Ibuprofen, Naproxen, Diclofenac (Nhóm NSAIDs)',
    dosage: 'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI (Black Box Warning)',
    route: 'Tất cả các đường dùng',
    frequency: 'CẤM SỬ DỤNG',
    clinicalInstruction: 'Gây ức chế kết tập tiểu cầu không hồi phục và kích ứng niêm mạc dạ dày, dẫn đến XUẤT HUYẾT TIÊU HÓA TỐI CẤP VÀ TỬ VONG.',
    isContraindicationAlert: true,
  });

  // Bù dịch đường uống
  initialMedicationOrders.push({
    category: 'Dịch bù đường uống',
    name: 'Oresol (Dung dịch bù nước và điện giải áp lực thẩm thấu thấp)',
    dosage: '1000 - 2000 ml / 24 giờ (Pha đúng 1 gói với thể tích nước ghi trên nhãn)',
    route: 'Uống từng ngụm nhỏ liên tục',
    frequency: 'Uống rải rác trong ngày thay nước lọc',
    clinicalInstruction: 'Khuyến khích uống thêm nước dừa xiêm, nước cam, nước chanh hoặc nước cháo loãng với muối.',
  });

  // Dịch truyền tĩnh mạch nếu có chỉ định
  if (fluidPlan && fluidPlan.steps.length > 0) {
    const firstStep = fluidPlan.steps[0];
    initialMedicationOrders.push({
      category: 'Dịch truyền tĩnh mạch',
      name: `${firstStep.solutionType} chai 500ml`,
      dosage: `${firstStep.rateMlPerHour} ml/giờ (${firstStep.dropsPerMin} giọt/phút)`,
      route: 'Truyền tĩnh mạch ngoại biên / Kim luồn 18G - 20G',
      frequency: `Duy trì trong ${firstStep.durationHours}`,
      clinicalInstruction: `Lưu lượng ${firstStep.rateMlKgH} ml/kg/h tính theo cân nặng hiệu chỉnh ${prescribedWeight} kg. Đo lại Hct và sinh hiệu sau 2 giờ.`,
    });
  }

  // Bảo vệ niêm mạc dạ dày nếu có nguy cơ
  if (warningSignsPresent.length > 0 || comorbidDiseases.includes('Tiền sử loét dạ dày - tá tràng')) {
    initialMedicationOrders.push({
      category: 'Bảo vệ niêm mạc',
      name: 'Pantoprazole 40mg hoặc Omeprazole 40mg',
      dosage: '40 mg',
      route: 'Tiêm tĩnh mạch chậm hoặc uống trước ăn sáng',
      frequency: '1 lần / ngày',
      clinicalInstruction: 'Phòng ngừa loét dạ dày tá tràng do stress và giảm nguy cơ xuất huyết tiêu hóa trong giai đoạn rò mao mạch.',
    });
  }

  // 10. Kế hoạch theo dõi Cận lâm sàng & Lâm sàng Động học
  const dynamicMonitoring: ComprehensiveDiagnosisResult['correspondingProtocol']['dynamicMonitoring'] = [
    {
      parameter: 'Mạch, Huyết áp tâm thu/tâm trương, Hiệu áp',
      frequency: severityLevel === 'critical' ? 'Mỗi 15 - 30 phút (khi sốc)' : severityLevel === 'severe' ? 'Mỗi 1 - 2 giờ' : 'Mỗi 4 - 6 giờ',
      targetGoal: 'Huyết áp bình thường theo tuổi, hiệu áp > 20 mmHg, mạch 60 - 90 bpm',
      alertThreshold: 'Hiệu áp ≤ 20 mmHg (HA kẹp) hoặc HA tụt ≤ 90 mmHg -> BÁO ĐỘNG SỐC',
    },
    {
      parameter: 'Hematocrit (Hct) và Công thức máu (CBC)',
      frequency: severityLevel === 'critical' ? 'Mỗi 2 giờ trong pha cấp' : severityLevel === 'severe' ? 'Mỗi 4 - 6 giờ' : 'Mỗi 24 giờ',
      targetGoal: 'Hct duy trì ở mức nền (Nam 40-42%, Nữ 36-38%)',
      alertThreshold: 'Hct tăng vọt > 20% so với nền (rò huyết tương) hoặc Hct tụt nhanh (nghi xuất huyết ẩn)',
    },
    {
      parameter: 'Số lượng Tiểu cầu (Platelets)',
      frequency: 'Mỗi 12 - 24 giờ (hoặc mỗi 6h nếu < 50 G/L)',
      targetGoal: 'Duy trì > 50 G/L và có xu hướng tăng',
      alertThreshold: 'Tiểu cầu < 20 G/L hoặc giảm kèm xuất huyết niêm mạc ồ ạt',
    },
    {
      parameter: 'Thể tích nước tiểu (Urine output)',
      frequency: 'Đo và ghi nhận mỗi 4 - 6 giờ',
      targetGoal: '≥ 0.5 - 1 ml/kg/giờ',
      alertThreshold: '< 0.5 ml/kg/h trong 4 giờ liên tiếp (thiểu niệu / giảm tưới máu thận)',
    },
  ];

  // 11. Xây dựng Chuỗi Chẩn đoán Hoàn chỉnh 1 Dòng Chuẩn EMR
  const parts: string[] = [];
  parts.push(leadName.toUpperCase());
  if (diseaseDay) parts.push(`ngày ${diseaseDay}`);
  parts.push(`- ${gradeName.split(':')[1]?.trim() || gradeName}`);
  parts.push(`- ${phaseName}`);
  if (identifiedComplications.length > 0) {
    parts.push(`Biến chứng: ${identifiedComplications.slice(0, 2).join(', ')}`);
  }
  if (bmi >= 25 || comorbidDiseases.length > 0 || specialPopulations.length > 0) {
    const comorbList = [...specialPopulations, bmiCategoryText, ...comorbidDiseases].filter(Boolean);
    parts.push(`Cơ địa/Bệnh kèm: ${comorbList.join(', ')}`);
  }

  const fullDiagnosisString = parts.join(' · ');

  // 12. Văn bản Biện luận Chẩn đoán EMR Cấu trúc Chi tiết
  const emrStructuredText = [
    `=== BỘ CHẨN ĐOÁN TOÀN DIỆN & PHÁC ĐỒ ĐIỀU TRỊ TƯƠNG ỨNG ===`,
    `Họ và tên bệnh nhân: [${form.gioiTinh === 'nam' ? 'Nam' : 'Nữ'}, ${form.tuoi || '--'} tuổi] · Cân nặng: ${weightKg} kg · Chiều cao: ${heightCm} cm · BMI: ${bmi} kg/m² (${bmiCategoryText})`,
    `Lý do nhập viện: ${form.lyDo || 'Sốt cao cấp tính'}`,
    ``,
    `1. CHẨN ĐOÁN XÁC ĐỊNH (ICD-10: ${leadIcd}):`,
    `   + Bệnh chính: ${leadName.toUpperCase()} (${diseaseDayText})`,
    `   + Căn nguyên: Nhiễm vi rút Dengue (DENV-1,2,3,4) truyền qua véc tơ muỗi Aedes aegypti`,
    `   + Mức độ trùng khớp lâm sàng: ${leadMatchPct}%`,
    ``,
    `2. PHÂN LOẠI MỨC ĐỘ & GIAI ĐOẠN BỆNH SINH:`,
    `   + Phân độ lâm sàng: ${gradeName}`,
    `   + Giai đoạn bệnh sinh: ${phaseName} (${phaseDayRange})`,
    `   + Đặc trưng sinh lý bệnh: ${phaseKeyCharacteristics}`,
    warningSignsPresent.length > 0
      ? `   + Dấu hiệu cảnh báo hiện diện: ${warningSignsPresent.join('; ')}`
      : `   + Dấu hiệu cảnh báo: Chưa ghi nhận dấu hiệu cảnh báo nguy hiểm`,
    shockSignsPresent.length > 0
      ? `   + DẤU HIỆU SỐC NGUY KỊCH: ${shockSignsPresent.join('; ')}`
      : `   + Tình trạng huyết động: Chưa có biểu hiện sốc tụt huyết áp`,
    ``,
    `3. BIẾN CHỨNG HIỆN TẠI & DỰ BÁO NGUY CƠ:`,
    `   + Biến chứng hiện hữu: ${complicationSummary}`,
    riskForecast.length > 0
      ? `   + Cảnh báo nguy cơ: ${riskForecast.join('; ')}`
      : `   + Dự báo: Diễn tiến thuận lợi nếu tuân thủ chế độ theo dõi`,
    ``,
    `4. CƠ ĐỊA & ĐẶC TÍNH BỆNH NHÂN (PHENOTYPE):`,
    `   + Thể trạng: ${bmiCategoryText} (Cân nặng thực tế: ${weightKg} kg, Cân nặng hiệu chỉnh AdjBW: ${adjBw} kg)`,
    `   + Nguyên tắc tính liều: ${weightRationale}`,
    comorbidDiseases.length > 0
      ? `   + Bệnh nền đồng mắc: ${comorbidDiseases.join('; ')}`
      : `   + Tiền căn: Chưa ghi nhận bệnh nền mạn tính nghiêm trọng`,
    ``,
    `5. CHẨN ĐOÁN PHÂN BIỆT (CẦN LOẠI TRỪ):`,
    ...differentials.map(
      (d, i) =>
        `   ${i + 1}. ${d.diseaseName} (${d.matchPct}%): Đề nghị [${d.confirmatoryExclusionTest}] (${d.urgencyBadge})`
    ),
    ``,
    `6. PHÁC ĐỒ ĐIỀU TRỊ TƯƠNG ỨNG CÁ THỂ HÓA:`,
    `   + Phân tầng tiếp nhận: [${triageTarget}]`,
    fluidPlan
      ? `   + Phác đồ truyền dịch: Dung dịch ${fluidPlan.recommendedSolution} theo cân nặng ${prescribedWeight} kg (${fluidPlan.weightBasis.toUpperCase()} WEIGHT)`
      : `   + Bù dịch: Ưu tiên bù dịch đường uống (Oresol), chưa có chỉ định truyền dịch tĩnh mạch`,
    `   + Hạ sốt: Paracetamol ${pcmDose} mg khi T ≥ 38.5°C (Chống chỉ định tuyệt đối Aspirin/Ibuprofen)`,
    `   + Lịch theo dõi: ${dynamicMonitoring.map((m) => `${m.parameter} (${m.frequency})`).join('; ')}`,
  ].join('\n');

  return {
    definitive: {
      diseaseName: leadName,
      diseaseIcd: leadIcd,
      diseaseDay,
      diseaseDayText,
      pathogen: 'Vi rút Dengue (DENV)',
      confidencePct: leadMatchPct,
    },
    severityAndPhase: {
      gradeIndex,
      gradeName,
      severityLevel,
      phaseName,
      phaseDayRange,
      phaseKeyCharacteristics,
      warningSignsPresent,
      shockSignsPresent,
      organFailureSigns,
    },
    complications: {
      identified: identifiedComplications,
      riskForecast,
      summaryText: complicationSummary,
    },
    comorbidities: {
      bmi,
      bmiCategoryText,
      specialPopulations,
      comorbidDiseases,
      phenotypeNotes,
    },
    differentials,
    fullDiagnosisString,
    emrStructuredText,
    correspondingProtocol: {
      triageTarget,
      triageLevel,
      targetBranchIndex: gradeIndex,
      targetBranchName: gradeName,
      fluidPlan,
      initialMedicationOrders,
      contraindications: [
        'Aspirin và các thuốc kháng viêm không steroid (NSAIDs) như Ibuprofen, Diclofenac, Meloxicam, Naproxen...',
        'Kháng sinh dùng thường quy khi chưa có bằng chứng nhiễm khuẩn bội nhiễm rõ ràng',
        'Corticoid toàn thân (không có chỉ định trong SXH Dengue và có thể tăng nguy cơ xuất huyết tiêu hóa)',
        'Truyền dịch tĩnh mạch bừa bãi khi chưa có dấu hiệu cảnh báo hoặc bệnh nhân còn uống được',
        'Tiếp tục truyền dịch khi đã bước sang giai đoạn tái hấp thu (Ngày thứ 7 trở đi) gây phù phổi cấp',
      ],
      dynamicMonitoring,
      safeDischargeCriteria: [
        'Hết sốt ít nhất 48 giờ liên tục mà không cần dùng thuốc hạ sốt.',
        'Bệnh nhân tỉnh táo, ăn ngon miệng trở lại, tổng trạng phục hồi rõ rệt.',
        'Huyết động ổn định: Mạch đều, huyết áp bình thường, hiệu áp > 20 mmHg.',
        'Lượng nước tiểu đạt > 0.5 - 1 ml/kg/giờ, tiểu nhiều.',
        'Không khó thở, không có biểu hiện quá tải dịch hoặc suy hô hấp.',
        'Cận lâm sàng: Hematocrit ổn định ở mức nền, Tiểu cầu > 50.000/µL và đang có xu hướng tăng liên tục.',
      ],
    },
  };
}
