/**
 * CliniPortal CDSS — Dengue Fluid & Shock Calculation Engine (Bộ Y Tế 2023)
 * Path: src/content/knowledge-vault/cdss/dengue/dengue-engine.ts
 */

import {
  DenguePatientInput,
  DengueAgeGroup,
  WeightCalculationResult,
  FluidScheduleRow,
  VasopressorDoseInfo,
  CDSSAlertItem,
  DengueCDSSPlan,
  Gender
} from '../cdss-types';

import {
  getCDCStandardWeight,
  DENGUE_FLUID_TEMPLATES,
  DENGUE_NURSING_CHECKLIST
} from './dengue-data';

/**
 * Phân tầng lứa tuổi theo sinh lý SXHD
 */
export function classifyAgeGroup(ageYears: number): DengueAgeGroup {
  if (ageYears >= 16) return 'adult';
  if (ageYears >= 13) return 'adolescent';
  return 'child';
}

/**
 * Tính toán Cân Nặng Hiệu Chỉnh theo chuẩn CDC 2014 & Phụ lục 9 BYT
 */
export function calculateWeightAdjustment(
  ageYears: number,
  gender: Gender,
  actualWeightKg: number
): WeightCalculationResult {
  const stdWeight = getCDCStandardWeight(ageYears, gender);
  const ratio = actualWeightKg / stdWeight;
  const isObese = ratio > 1.20; // Vượt quá 120% cân nặng chuẩn theo tuổi

  let adjustedWeightKg = actualWeightKg;
  let formulaNote = 'Cân nặng thực tế (Không quá ngưỡng thừa cân 120%)';
  let warningText: string | undefined = undefined;

  if (isObese) {
    if (ageYears < 16) {
      // Theo QĐ 2760/QĐ-BYT: Trẻ béo phì dùng Cân nặng chuẩn theo tuổi (CDC 2014) để tính dịch
      adjustedWeightKg = stdWeight;
      formulaNote = `Áp dụng Cân nặng chuẩn CDC 2014 (${stdWeight} kg) thay cho cân nặng thực (${actualWeightKg} kg) do vượt ngưỡng 120% (${Math.round(ratio * 100)}% chuẩn tuổi).`;
      warningText = `Cảnh báo: Trẻ thừa cân / béo phì (${Math.round(ratio * 100)}% so với chuẩn tuổi). Bắt buộc dùng cân nặng chuẩn ${stdWeight} kg để tính dịch nhằm tránh phù phổi cấp và quá tải tuần hoàn.`;
    } else {
      // Người lớn: giới hạn cân nặng tính dịch tối đa tránh quá tải
      adjustedWeightKg = Math.min(actualWeightKg, 65);
      formulaNote = `Người lớn béo phì: Cân nặng tính dịch hiệu chỉnh tối đa ${adjustedWeightKg} kg`;
      warningText = `Người lớn thể trọng lớn (${actualWeightKg} kg): Cần giám sát chặt chẽ áp lực tĩnh mạch và ran đáy phổi khi bù dịch.`;
    }
  }

  return {
    actualWeightKg,
    standardWeightKg: stdWeight,
    isObese,
    ratioToStandard: ratio,
    adjustedWeightKg,
    formulaNote,
    warningText
  };
}

/**
 * Cộng thêm số giờ vào chuỗi HH:mm
 */
function addHoursToTime(startTimeStr: string, hoursToAdd: number): string {
  const [hStr, mStr] = startTimeStr.split(':');
  let totalMinutes = (parseInt(hStr || '8', 10) * 60) + parseInt(mStr || '0', 10) + Math.round(hoursToAdd * 60);
  // Normalize 24h
  totalMinutes = (totalMinutes % (24 * 60) + (24 * 60)) % (24 * 60);
  const newH = Math.floor(totalMinutes / 60);
  const newM = totalMinutes % 60;
  return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
}

/**
 * Tính toán Bảng Kế Hoạch Cọc Dịch 4 Cột
 */
export function calculateFluidSchedule(
  patient: DenguePatientInput,
  effectiveWeightKg: number,
  customDurations?: Record<number, number>
): { rows: FluidScheduleRow[]; totalVolumeMl: number; totalDurationHours: number } {
  const ageGroup = classifyAgeGroup(patient.ageYears);
  const templates = DENGUE_FLUID_TEMPLATES[patient.severity][ageGroup];

  let currentClock = patient.startTime || '08:00';
  let carryingFluidMl = 0;
  let totalVolumeMl = 0;
  let totalDurationHours = 0;

  const rows: FluidScheduleRow[] = [];

  templates.forEach((tpl, idx) => {
    const duration = customDurations?.[idx] !== undefined ? customDurations[idx] : tpl.defaultDurationHours;
    const rate = tpl.defaultRateMlKgH;
    
    // Thể tích cần truyền trong cữ này (ml)
    const neededMl = Math.round(rate * effectiveWeightKg * duration);
    totalVolumeMl += neededMl;
    totalDurationHours += duration;

    // Số giọt mỗi phút: (Tốc độ ml/h * 20 giọt/ml) / 60 phút = Tốc độ / 3
    const dropsPerMin = Math.round((rate * effectiveWeightKg) / 3);

    // Tính mốc thời gian
    const endClock = addHoursToTime(currentClock, duration);
    const timeWindow = `${currentClock} - ${endClock} (${duration}h)`;

    // Tính điều phối chai dịch tại cọc (loại 500ml)
    const existingFluidMl = carryingFluidMl;
    const deficitMl = Math.max(0, neededMl - existingFluidMl);
    const bottlesToHang = Math.ceil(deficitMl / 500);
    const addedFluidMl = bottlesToHang * 500;
    const totalAtPoleMl = existingFluidMl + addedFluidMl;
    
    // Dịch còn dư sau khi kết thúc cữ truyền chuyển sang cữ tiếp theo
    carryingFluidMl = Math.max(0, totalAtPoleMl - neededMl);

    rows.push({
      stepIndex: idx + 1,
      stageName: tpl.stageName,
      durationHours: duration,
      rateMlKgH: rate,
      dropsPerMin,
      totalMl: neededMl,
      timeWindow,
      existingFluidMl,
      bottlesToHang,
      bottleType: '500ml',
      totalAtPoleMl,
      monitoringNotes: tpl.notes,
      hctCheckRequired: tpl.hctCheckRequired
    });

    currentClock = endClock;
  });

  return { rows, totalVolumeMl, totalDurationHours };
}

/**
 * Tính liều Vận Mạch Dopamin & Noradrenalin Bơm Tiêm Điện 50ml
 */
export function calculateVasopressorDoses(effectiveWeightKg: number): {
  dopamin: VasopressorDoseInfo;
  noradrenalin: VasopressorDoseInfo;
} {
  // 1. Dopamin: Tổng liều (mg) = 3 * Cân nặng (kg) pha đủ 50ml Glucose 5%
  // 1 ml/h = 1 µg/kg/phút
  const dopaminTotalMg = Math.round(3 * effectiveWeightKg * 10) / 10;
  const dopamin: VasopressorDoseInfo = {
    drugName: 'Dopamin',
    patientWeightKg: effectiveWeightKg,
    calculationFormula: 'Tổng liều Dopamin (mg) = 3 × Cân nặng (kg)',
    totalMg: dopaminTotalMg,
    diluentSolution: 'Glucose 5% hoặc NaCl 0.9%',
    syringeVolumeMl: 50,
    infusionEquivalent: 'Tốc độ 1 ml/giờ = Liều 1 µg/kg/phút',
    standardDoseRange: '5 - 10 µg/kg/phút (duy trì tối đa 20 µg/kg/phút)',
    recommendedPumpRateMlH: '5 - 10 ml/giờ trên bơm tiêm điện 50ml',
    clinicalIndications: 'Chỉ định hàng đầu khi sốc SXHD tái sốc hoặc sốc trơ dịch kèm CVP > 10 cmH2O hoặc suy giảm sức co bóp cơ tim.',
    precautions: 'Không pha chung với dung dịch kiềm (Natri Bicarbonat). Theo dõi liên tục nhịp tim trên monitor, giảm liều khi có loạn nhịp nhanh.'
  };

  // 2. Noradrenalin: Tổng liều (mg) = 0.3 * Cân nặng (kg) pha đủ 50ml Glucose 5%
  // 1 ml/h = 0.1 µg/kg/phút
  const noradrenalinTotalMg = Math.round(0.3 * effectiveWeightKg * 100) / 100;
  const noradrenalin: VasopressorDoseInfo = {
    drugName: 'Noradrenalin',
    patientWeightKg: effectiveWeightKg,
    calculationFormula: 'Tổng liều Noradrenalin (mg) = 0.3 × Cân nặng (kg)',
    totalMg: noradrenalinTotalMg,
    diluentSolution: 'Glucose 5% vừa đủ 50ml',
    syringeVolumeMl: 50,
    infusionEquivalent: 'Tốc độ 1 ml/giờ = Liều 0.1 µg/kg/phút',
    standardDoseRange: '0.05 - 0.5 µg/kg/phút (chỉnh liều theo Huyết áp mục tiêu)',
    recommendedPumpRateMlH: '0.5 - 5 ml/giờ trên bơm tiêm điện 50ml',
    clinicalIndications: 'Chỉ định khi sốc SXHD có tụt huyết áp tâm trương nặng, áp lực mạch giãn rộng (sốc giãn mạch) hoặc thất bại với Dopamin.',
    precautions: 'Bắt buộc truyền qua tĩnh mạch lớn hoặc catheter tĩnh mạch trung tâm. Nguy cơ hoại tử mô nếu thoát mạch.'
  };

  return { dopamin, noradrenalin };
}

/**
 * Tổng hợp toàn bộ Kế Hoạch Điều Trị CDSS SXHD Dengue
 */
export function generateDengueCDSSPlan(
  patient: DenguePatientInput,
  customDurations?: Record<number, number>
): DengueCDSSPlan {
  const ageGroup = classifyAgeGroup(patient.ageYears);
  const weightResult = calculateWeightAdjustment(patient.ageYears, patient.gender, patient.actualWeightKg);
  const effectiveWeight = weightResult.adjustedWeightKg;

  const { rows, totalVolumeMl, totalDurationHours } = calculateFluidSchedule(
    patient,
    effectiveWeight,
    customDurations
  );

  const { dopamin, noradrenalin } = calculateVasopressorDoses(effectiveWeight);

  // Sinh danh sách Cảnh Báo An Toàn
  const alerts: CDSSAlertItem[] = [];

  if (weightResult.isObese) {
    alerts.push({
      id: 'alert_obese',
      level: 'danger',
      title: 'CẢNH BÁO QUÁ TẢI DỊCH Ở TRẺ THỪA CÂN / BÉO PHÌ',
      message: weightResult.warningText || 'Bệnh nhân thừa cân. Bắt buộc dùng cân nặng hiệu chỉnh CDC 2014.',
      ruleCode: 'CDC_2014_OBESE_RULE'
    });
  }

  if (patient.severity === 'severe_shock') {
    alerts.push({
      id: 'alert_severe_shock',
      level: 'danger',
      title: 'SỐC SXHD NGUY KỊCH (MẠCH = 0, HUYẾT ÁP = 0)',
      message: 'Bơm trực tiếp tĩnh mạch 15-20 ml/kg trong 15 phút. Lập ngay 2 đường truyền kim lớn. Chuẩn bị sẵn Dịch Cao Phân Tử (Dextran 40 / HES 200) và thuốc vận mạch.',
      ruleCode: 'SEVERE_SHOCK_EMERGENCY'
    });
  } else if (patient.severity === 'shock') {
    alerts.push({
      id: 'alert_shock',
      level: 'warning',
      title: 'SỐC SXHD (CÒN BÙ) — CẦN ĐO LẠI HCT SAU 1 GIỜ',
      message: 'Tải nhanh 15-20 ml/kg/h trong giờ đầu. Bắt buộc đo lại Hct tại giường trước khi chuyển cữ truyền.',
      ruleCode: 'SHOCK_RESUS_1H'
    });
  }

  if (totalDurationHours > 24) {
    alerts.push({
      id: 'alert_prolonged_fluid',
      level: 'warning',
      title: 'TỔNG THỜI GIAN TRUYỀN DỊCH > 24 GIỜ',
      message: 'Nguy cơ tái hấp thu dịch lòng mạch gây phù phổi cấp hoặc suy hô hấp do tràn dịch màng phổi/màng bụng. Rà soát giảm tốc độ và cai dịch sớm.',
      ruleCode: 'FLUID_OVERLOAD_RISK'
    });
  }

  // Tạo nội dung Export cho Bệnh Án / DocSpace (SOAP Plan)
  const dateStr = new Date().toLocaleDateString('vi-VN');
  const soapLines = [
    `--- KẾ HOẠCH BÙ DỊCH SXHD DENGUE (CDSS BYT 2023) [${dateStr}] ---`,
    `Bệnh nhân: ${patient.ageYears} tuổi, Giới tính: ${patient.gender === 'male' ? 'Nam' : 'Nữ'}`,
    `Phân độ: ${patient.severity === 'warning_signs' ? 'SXHD có Dấu hiệu cảnh báo' : patient.severity === 'shock' ? 'Sốc SXHD' : 'Sốc SXHD nặng nguy kịch'}`,
    `Cân nặng thực: ${patient.actualWeightKg} kg | Cân nặng chuẩn: ${weightResult.standardWeightKg} kg | Cân nặng tính dịch: ${effectiveWeight} kg`,
    ...(weightResult.isObese ? [`[LƯU Ý]: Đã hiệu chỉnh theo chuẩn CDC 2014 để tránh quá tải tuần hoàn.`] : []),
    `Tổng thể tích dự kiến: ${totalVolumeMl} ml (${Math.round(totalVolumeMl / effectiveWeight)} ml/kg) trong ${totalDurationHours} giờ.`,
    `\nBẢNG CỌC DỊCH ĐIỀU TRỊ:`,
    ...rows.map(r => `  • Cữ ${r.stepIndex}: ${r.timeWindow} | Tốc độ ${r.rateMlKgH} ml/kg/h (${r.dropsPerMin} giọt/phút) | Cần ${r.totalMl} ml (Treo thêm ${r.bottlesToHang} chai 500ml) | Tại cọc: ${r.totalAtPoleMl} ml`),
    `\nLIỀU VẬN MẠCH (KHI SỐC TRƠ / CVP > 10 cmH2O):`,
    `  • Dopamin: Pha ${dopamin.totalMg} mg trong 50ml Glucose 5%. Tốc độ 1 ml/h = 1 µg/kg/phút (Khởi đầu 5-10 ml/h).`,
    `  • Noradrenalin: Pha ${noradrenalin.totalMg} mg trong 50ml Glucose 5%. Tốc độ 1 ml/h = 0.1 µg/kg/phút (Khởi đầu 0.5-2 ml/h).`,
    `\nĐIỀU DƯỠNG AN TOÀN: Đo Hct trước mỗi lần giảm tốc độ; Duy trì nước tiểu ≥ 0.5 - 1.0 ml/kg/h; Báo BS ngay nếu nước tiểu < 0.5 ml/kg/h hoặc ran ẩm phổi.`
  ];

  return {
    patient,
    ageGroup,
    weightResult,
    fluidRows: rows,
    totalVolumeMl,
    totalDurationHours,
    vasopressorDopamin: dopamin,
    vasopressorNoradrenalin: noradrenalin,
    alerts,
    nursingInstructions: DENGUE_NURSING_CHECKLIST,
    soapExportText: soapLines.join('\n'),
    createdAt: new Date().toISOString()
  };
}
