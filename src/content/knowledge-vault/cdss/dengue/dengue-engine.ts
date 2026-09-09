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
  BloodProductItem,
  NACDosingPhase,
  NACProtocolResult,
  BranchDecisionResult,
  ABCSChecklist,
  CDSSAlertItem,
  DengueCDSSPlan,
  Gender
} from '../cdss-types';

import {
  getCDCStandardWeight,
  DENGUE_FLUID_TEMPLATES,
  DENGUE_NURSING_CHECKLIST,
  DENGUE_BRANCH_RULES,
  BLOOD_PRODUCT_PROTOCOLS,
  SPECIAL_PATIENT_RULES,
  LIVER_INJURY_PROTOCOL,
  DENGUE_VASOPRESSOR_PROTOCOLS,
  ABCS_CHECKLIST_RULES
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
 * Tính toán Cân Nặng Hiệu Chỉnh theo chuẩn CDC 2014 & Phụ lục 9 BYT (bao gồm PNCT)
 */
export function calculateWeightAdjustment(
  ageYears: number,
  gender: Gender,
  actualWeightKg: number,
  isPregnant?: boolean,
  pregnancyTrimester?: 1 | 2 | 3
): WeightCalculationResult {
  const stdWeight = getCDCStandardWeight(ageYears, gender);
  const ratio = actualWeightKg / stdWeight;
  const isObese = ratio > 1.20; // Vượt quá 120% cân nặng chuẩn theo tuổi

  let adjustedWeightKg = actualWeightKg;
  let formulaNote = 'Cân nặng thực tế (Không quá ngưỡng thừa cân 120%)';
  let warningText: string | undefined = undefined;

  // 1. Phụ nữ mang thai: hiệu chỉnh cân nặng tránh phù phổi cấp
  if (isPregnant && gender === 'female') {
    if (pregnancyTrimester === 3) {
      // 3 tháng cuối: Trừ bớt 6kg thai + ối + dịch mô kẽ
      adjustedWeightKg = Math.max(38, actualWeightKg - 6);
      formulaNote = `PNCT tam cá nguyệt 3: Trừ 6kg trọng lượng thai & dịch ối (${actualWeightKg}kg → ${adjustedWeightKg}kg) để tính liều dịch bù tuần hoàn mẹ, phòng ngừa phù phổi cấp.`;
      warningText = `Sản phụ mang thai 3 tháng cuối: Cơ thể có hiện tượng giữ nước sinh lý. Bắt buộc dùng cân nặng hiệu chỉnh ${adjustedWeightKg} kg để bù dịch; nằm nghiêng trái 15-30 độ.`;
    } else if (pregnancyTrimester === 2) {
      adjustedWeightKg = Math.max(38, actualWeightKg - 3);
      formulaNote = `PNCT tam cá nguyệt 2: Trừ 3kg trọng lượng thai & tử cung (${actualWeightKg}kg → ${adjustedWeightKg}kg).`;
    }
    return {
      actualWeightKg,
      standardWeightKg: stdWeight,
      isObese: false,
      ratioToStandard: ratio,
      adjustedWeightKg,
      formulaNote,
      warningText,
      isPregnantAdjusted: true,
      pregnancyTrimester
    };
  }

  // 2. Trẻ em & Người lớn thừa cân / béo phì
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
    warningText,
    isPregnantAdjusted: false
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
 * Đánh giá Nhánh Quyết Định Rẽ Nhánh Điều Trị SXHD (Phụ lục 10 BYT)
 */
export function evaluateHctBranch(
  patient: DenguePatientInput,
  effectiveWeightKg: number
): BranchDecisionResult {
  const curHct = patient.currentHctPercent ?? patient.initialHctPercent ?? 40;
  const baseHct = patient.baselineHctPercent ?? (patient.gender === 'male' ? 42 : 38);
  const hctDiffPercent = ((curHct - baseHct) / baseHct) * 100;
  const isRefractory = patient.clinicalResponse === 'refractory';
  const isWorsened = patient.clinicalResponse === 'worsened';

  // 1. Nhánh Xuất Huyết Ẩn / Hồng Cầu Lắng
  if (
    patient.massiveBleeding ||
    (isRefractory && curHct <= 35) ||
    (hctDiffPercent < -20 && (patient.severity === 'shock' || patient.severity === 'severe_shock'))
  ) {
    return {
      branchType: 'blood',
      title: 'Nhánh Cảnh Báo: Sốc Không Hồi Phục Kèm Giảm Hct / Xuất Huyết Ẩn',
      recommendedFluid: 'Khối Hồng Cầu (HCL)',
      rateMlKgH: 5,
      durationHours: 2,
      reasoning: `Bệnh nhân sốc kèm Hct giảm thấp (${curHct}%) hoặc xuất huyết đe dọa tính mạng. Thể hiện chảy máu nội tạng hoặc tiêu hóa tiềm ẩn. Bắt buộc hội chẩn truyền Khối Hồng Cầu 5-10 ml/kg (${Math.round(effectiveWeightKg * 5)} - ${Math.round(effectiveWeightKg * 10)} ml), ngừng tăng tiếp tốc độ dịch tinh thể/CPT.`,
      warnings: [
        'Không tăng tốc độ dịch tinh thể đơn thuần khi Hct tụt vì sẽ gây pha loãng máu và nặng thêm rối loạn đông máu.',
        'Đặt ống thông dạ dày kiểm tra dịch xuất huyết tiêu hóa.',
        'Duy trì đích Hct đạt 35% - 40%.'
      ]
    };
  }

  // 2. Nhánh Cao Phân Tử (CPT) khi thất bại tinh thể + Hct cao
  if (
    (isRefractory || isWorsened || patient.severity === 'severe_shock') &&
    (curHct >= 40 || (patient.hasThalassemia && hctDiffPercent >= 20))
  ) {
    return {
      branchType: 'cpt',
      title: 'Nhánh Chuyển Đổi: Cao Phân Tử (Dextran 40 10% / HES 200 6%)',
      recommendedFluid: 'Dextran 40 10% hoặc Hydroxyethyl Starch (HES 200 6%)',
      rateMlKgH: 15,
      durationHours: 1,
      reasoning: `Sốc không đáp ứng với tinh thể sau 1-2 giờ kèm cô đặc máu nặng (Hct = ${curHct}%). Hiện tượng thoát huyết tương ồ ạt tiếp diễn làm sụp đổ thể tích tuần hoàn hiệu dụng. Chỉ định dùng Dịch Cao Phân Tử liều 10 - 15 - 20 ml/kg/giờ.`,
      warnings: [
        'Tổng liều Dextran 40 không quá 30 ml/kg/24h, HES 200 không quá 30-50 ml/kg/24h để tránh suy thận cấp và rối loạn đông máu.',
        'Khi huyết động cải thiện (mạch rõ, HA ổn định, nước tiểu ≥ 0.5-1 ml/kg/h): Giảm CPT 10 → 7.5 → 5 ml/kg/h rồi chuyển về Dịch tinh thể 5 hoặc 3 ml/kg/h.'
      ]
    };
  }

  // 3. Nhánh Chi Lạnh Ẩm / Tái Sốc
  if (patient.clinicalResponse === 'worsened' && patient.severity === 'warning_signs') {
    return {
      branchType: 'standard',
      title: 'Nhánh Chi Lạnh Ẩm / Nguy Cơ Vào Sốc',
      recommendedFluid: 'Ringer Lactate hoặc NaCl 0.9%',
      rateMlKgH: 10,
      durationHours: 1,
      reasoning: 'Vã mồ hôi, chi lạnh ẩm, mạch nhanh nhỏ nhưng HA chưa kẹp. Bù dịch tinh thể đẳng trương 10 ml/kg/giờ trong 1 giờ và đánh giá lại ngay.',
      warnings: ['Đo lại Hct và sinh hiệu sau 1 giờ truyền.']
    };
  }

  // 4. Nhánh Đáp Ứng Tốt / Hạ bậc an toàn
  return {
    branchType: 'standard',
    title: 'Phác Đồ Bù Dịch Chuẩn Hóa Theo Bậc Bộ Y Tế',
    recommendedFluid: (patient.liverEnzymesAST_ALT && patient.liverEnzymesAST_ALT >= 400) ? 'NaCl 0.9% (Không dùng Ringer Lactate)' : 'Ringer Lactate / NaCl 0.9%',
    rateMlKgH: templatesRate(patient),
    durationHours: 2,
    reasoning: 'Huyết động theo dõi theo bậc chuẩn hóa. Điều dưỡng tuân thủ kiểm tra sinh hiệu và Hct trước mỗi lần giảm tốc độ dịch.',
    warnings: ['Giám sát lượng nước tiểu mỗi giờ (đích ≥ 0.5 - 1.0 ml/kg/h).']
  };
}

function templatesRate(patient: DenguePatientInput): number {
  const ageGroup = classifyAgeGroup(patient.ageYears);
  return DENGUE_FLUID_TEMPLATES[patient.severity][ageGroup][0]?.defaultRateMlKgH || 6;
}

/**
 * Tính Liều 4 Nhóm Chế Phẩm Máu Chuẩn Bộ Y Tế 2023
 */
export function calculateBloodProducts(
  effectiveWeightKg: number,
  patient: DenguePatientInput
): BloodProductItem[] {
  const curHct = patient.currentHctPercent ?? patient.initialHctPercent ?? 40;
  const inr = patient.inrValue ?? 1.0;
  const fbg = patient.fibrinogenGL ?? 2.5;
  const plt = patient.plateletsCount ?? 150000;
  const massiveBleed = !!patient.massiveBleeding;

  const hclDoseMl = `${Math.round(effectiveWeightKg * 5)} - ${Math.round(effectiveWeightKg * 10)} ml`;
  const ffpDoseMl = `${Math.round(effectiveWeightKg * 10)} - ${Math.round(effectiveWeightKg * 20)} ml`;
  const cryoBags = Math.max(1, Math.round(effectiveWeightKg / 6));
  const pltUnits = Math.max(1, Math.round(effectiveWeightKg / 6));

  return [
    {
      id: 'hcl',
      productName: 'Khối Hồng Cầu (HCL)',
      indication: 'Sốc không hồi phục sau bù dịch kèm Hct ≤ 35% HOẶC giảm > 20% so với nền, hoặc xuất huyết ồ ạt.',
      doseFormula: '5 - 10 ml/kg (hoặc 1 - 2 đơn vị)',
      calculatedDose: hclDoseMl,
      thresholdMet: massiveBleed || curHct <= 35,
      targetClinical: 'Đưa Hct về mức đích an toàn 35% - 40%',
      precautions: 'Bù dịch trong khi chờ máu; theo dõi nguy cơ phù phổi cấp khi truyền dịch/máu nhanh.'
    },
    {
      id: 'ffp',
      productName: 'Huyết Tương Tươi Đông Lạnh (FFP)',
      indication: 'Rối loạn đông máu nặng (INR > 1.5 hoặc aPTT > 1.5 lần chứng) kèm xuất huyết nặng hoặc cần phẫu thuật/thủ thuật xâm lấn.',
      doseFormula: '10 - 20 ml/kg',
      calculatedDose: ffpDoseMl,
      thresholdMet: inr > 1.5 || (massiveBleed && inr > 1.3),
      targetClinical: 'Đưa INR về < 1.5, phục hồi các yếu tố đông máu huyết tương',
      precautions: 'Không dùng FFP để bù thể tích đơn thuần nếu không có rối loạn đông máu.'
    },
    {
      id: 'cryo',
      productName: 'Tủa Lạnh (Cryoprecipitate)',
      indication: 'Fibrinogen máu < 1.0 g/L kèm xuất huyết nặng hoặc đang tiến hành phẫu thuật khẩn cấp.',
      doseFormula: '1 túi / 6 kg cân nặng (tương đương 0.15 túi/kg)',
      calculatedDose: `${cryoBags} túi`,
      thresholdMet: fbg < 1.0,
      targetClinical: 'Nâng nồng độ Fibrinogen máu lên ≥ 1.0 - 1.5 g/L',
      precautions: 'Truyền nhanh ngay sau khi rã đông; theo dõi phản ứng dị ứng.'
    },
    {
      id: 'platelets',
      productName: 'Khối Tiểu Cầu Đậm Đặc',
      indication: 'Tiểu cầu < 50.000/mm³ kèm xuất huyết đe dọa tính mạng (não, tiêu hóa ồ ạt); HOẶC Tiểu cầu < 5.000/mm³ dù chưa xuất huyết lâm sàng.',
      doseFormula: '1 đơn vị đậm đặc / 5 - 7 kg (người lớn: 1 pool 4-6 đv hoặc 1 khối gạn Apheresis)',
      calculatedDose: `${pltUnits} đơn vị đậm đặc`,
      thresholdMet: plt < 5000 || (plt < 50000 && massiveBleed),
      targetClinical: 'Cầm máu lâm sàng đe dọa tính mạng',
      precautions: 'KHÔNG truyền tiểu cầu dự phòng khi tiểu cầu > 5.000/mm³ mà không có xuất huyết nặng (tránh nguy cơ quá tải dịch và phản ứng miễn dịch).'
    }
  ];
}

/**
 * Đánh giá Tổn Thương Gan Cấp & Phác Đồ N-Acetylcysteine (NAC)
 */
export function calculateNACProtocol(
  effectiveWeightKg: number,
  astAltVal?: number
): NACProtocolResult {
  const val = astAltVal ?? 40;

  if (val >= 1000) {
    // Suy gan cấp / tổn thương tối cấp
    const p1Mg = Math.round(150 * effectiveWeightKg);
    const p2Mg = Math.round(50 * effectiveWeightKg);
    const p3Mg = Math.round(100 * effectiveWeightKg);
    const p4Mg = Math.round(100 * effectiveWeightKg);

    const phases: NACDosingPhase[] = [
      {
        phase: 1,
        phaseName: 'Pha 1: Tải nhanh',
        doseMgKg: 150,
        infusionTimeHours: 1,
        diluent: 'Glucose 5% 200ml (hoặc 100ml ở trẻ nhỏ)',
        totalMg: p1Mg,
        pumpRateMlH: '200 ml/giờ'
      },
      {
        phase: 2,
        phaseName: 'Pha 2: Duy trì 1',
        doseMgKg: 50,
        infusionTimeHours: 4,
        diluent: 'Glucose 5% 500ml (hoặc 250ml ở trẻ nhỏ)',
        totalMg: p2Mg,
        pumpRateMlH: '125 ml/giờ (trẻ: 62.5 ml/h)'
      },
      {
        phase: 3,
        phaseName: 'Pha 3: Duy trì 2',
        doseMgKg: 100,
        infusionTimeHours: 16,
        diluent: 'Glucose 5% 1000ml (hoặc 500ml ở trẻ nhỏ)',
        totalMg: p3Mg,
        pumpRateMlH: '62.5 ml/giờ (trẻ: 31.2 ml/h)'
      },
      {
        phase: 4,
        phaseName: 'Pha 4: Duy trì tiếp theo',
        doseMgKg: 100,
        infusionTimeHours: 24,
        diluent: 'Glucose 5% 1000ml truyền liên tục cho đến khi men gan giảm và INR < 1.5',
        totalMg: p4Mg,
        pumpRateMlH: '41.6 ml/giờ'
      }
    ];

    return {
      indicated: true,
      severityLevel: 'acute_liver_failure',
      astAltVal: val,
      summary: `TỔN THƯƠNG GAN TỐI CẤP / SUY GAN (AST/ALT ${val} U/L): Chỉ định phác đồ N-Acetylcysteine (NAC) truyền tĩnh mạch 4 pha. TUYỆT ĐỐI NGỪNG Ringer Lactate & Paracetamol.`,
      phases,
      precautions: [
        'Tuyệt đối không dùng Ringer Lactate (chuyển sang NaCl 0.9% hoặc Acetate Ringer/Plasma-Lyte).',
        'Ngừng ngay lập tức Paracetamol.',
        'Theo dõi phản ứng dạng phản vệ với NAC (mẩn ngứa, đỏ da, co thắt phế quản).'
      ]
    };
  }

  if (val >= 400) {
    return {
      indicated: false,
      severityLevel: 'severe_hepatitis',
      astAltVal: val,
      summary: `VIÊM GAN CẤP NẶNG (AST/ALT ${val} U/L): Cấm dùng Ringer Lactate (gan suy giảm chuyển hóa Lactate gây toan máu lactic). Đổi sang NaCl 0.9%. Ngừng ngay Paracetamol.`,
      phases: [],
      precautions: [
        'Không dùng Ringer Lactate. Bắt buộc dùng NaCl 0.9%.',
        'Cấm dùng Paracetamol. Hạ sốt bằng lau mát nách bẹn.',
        'Theo dõi INR và đường huyết mao mạch mỗi 6-12 giờ.'
      ]
    };
  }

  if (val >= 120) {
    return {
      indicated: false,
      severityLevel: 'mild_moderate',
      astAltVal: val,
      summary: `Tổn thương gan mức độ nhẹ - vừa (AST/ALT ${val} U/L). Tiếp tục theo dõi chức năng gan và hạn chế tối đa thuốc độc gan.`,
      phases: [],
      precautions: ['Hạn chế liều Paracetamol không quá 40-50 mg/kg/ngày ở trẻ em hoặc không quá 2g/ngày ở người lớn.']
    };
  }

  return {
    indicated: false,
    severityLevel: 'normal',
    astAltVal: val,
    summary: 'Chức năng men gan trong giới hạn theo dõi bình thường.',
    phases: [],
    precautions: []
  };
}

/**
 * Tính liều 4 Vận Mạch Bơm Tiêm Điện 50ml (Dopamin, Noradrenalin, Dobutamin, Adrenalin)
 */
export function calculateVasopressorDoses(effectiveWeightKg: number): {
  dopamin: VasopressorDoseInfo;
  noradrenalin: VasopressorDoseInfo;
  dobutamin: VasopressorDoseInfo;
  adrenalin: VasopressorDoseInfo;
} {
  // 1. Dopamin: 3 * P mg trong 50ml G5% -> 1 ml/h = 1 µg/kg/phút
  const dopaminTotalMg = Math.round(3 * effectiveWeightKg * 10) / 10;
  const dopamin: VasopressorDoseInfo = {
    drugName: 'Dopamin',
    patientWeightKg: effectiveWeightKg,
    calculationFormula: 'Tổng liều Dopamin (mg) = 3 × Cân nặng (kg)',
    totalMg: dopaminTotalMg,
    diluentSolution: 'Glucose 5% hoặc NaCl 0.9% vừa đủ 50ml',
    syringeVolumeMl: 50,
    infusionEquivalent: 'Tốc độ 1 ml/giờ = Liều 1 µg/kg/phút',
    standardDoseRange: '5 - 10 µg/kg/phút (duy trì tối đa 20 µg/kg/phút)',
    recommendedPumpRateMlH: '5 - 10 ml/giờ trên bơm tiêm điện 50ml',
    clinicalIndications: 'Lựa chọn đầu tay ở trẻ em khi sốc SXHD tái sốc hoặc sốc trơ dịch kèm CVP > 10 cmH2O.',
    precautions: 'Không pha chung với dung dịch kiềm (Natri Bicarbonat). Theo dõi liên tục nhịp tim trên monitor, giảm liều khi có loạn nhịp nhanh.'
  };

  // 2. Noradrenalin: 0.3 * P mg trong 50ml G5% -> 1 ml/h = 0.1 µg/kg/phút
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
    clinicalIndications: 'Sốc giãn mạch (HA tâm trương tụt sâu, chi ấm, hiệu áp rộng) hoặc người lớn sốc trơ dịch truyền.',
    precautions: 'Bắt buộc truyền qua tĩnh mạch lớn hoặc catheter tĩnh mạch trung tâm. Nguy cơ hoại tử mô nặng nếu chệch tĩnh mạch.'
  };

  // 3. Dobutamin: 3 * P mg trong 50ml G5% -> 1 ml/h = 1 µg/kg/phút
  const dobutaminTotalMg = Math.round(3 * effectiveWeightKg * 10) / 10;
  const dobutamin: VasopressorDoseInfo = {
    drugName: 'Dobutamin',
    patientWeightKg: effectiveWeightKg,
    calculationFormula: 'Tổng liều Dobutamin (mg) = 3 × Cân nặng (kg)',
    totalMg: dobutaminTotalMg,
    diluentSolution: 'Glucose 5% vừa đủ 50ml',
    syringeVolumeMl: 50,
    infusionEquivalent: 'Tốc độ 1 ml/giờ = Liều 1 µg/kg/phút',
    standardDoseRange: '3 - 10 µg/kg/phút (tối đa 15 µg/kg/phút)',
    recommendedPumpRateMlH: '3 - 10 ml/giờ trên bơm tiêm điện 50ml',
    clinicalIndications: 'Chỉ định khi suy giảm sức co bóp cơ tim, CVP cao (> 10-12 cmH2O) mà huyết áp vẫn kẹp/tụt hoặc cung lượng tim thấp.',
    precautions: 'Có thể gây tụt huyết áp do giãn mạch nếu chưa bù đủ thể tích nội mạch; phối hợp Noradrenalin khi có kèm tụt HA tâm trương.'
  };

  // 4. Adrenalin: 0.3 * P mg trong 50ml G5% -> 1 ml/h = 0.1 µg/kg/phút
  const adrenalinTotalMg = Math.round(0.3 * effectiveWeightKg * 100) / 100;
  const adrenalin: VasopressorDoseInfo = {
    drugName: 'Adrenalin',
    patientWeightKg: effectiveWeightKg,
    calculationFormula: 'Tổng liều Adrenalin (mg) = 0.3 × Cân nặng (kg)',
    totalMg: adrenalinTotalMg,
    diluentSolution: 'Glucose 5% vừa đủ 50ml',
    syringeVolumeMl: 50,
    infusionEquivalent: 'Tốc độ 1 ml/giờ = Liều 0.1 µg/kg/phút',
    standardDoseRange: '0.05 - 0.3 µg/kg/phút',
    recommendedPumpRateMlH: '0.5 - 3 ml/giờ trên bơm tiêm điện 50ml',
    clinicalIndications: 'Sốc nguy kịch, sốc trơ với Dopamin và Noradrenalin, hoặc có kèm nhịp tim chậm nặng.',
    precautions: 'Nguy cơ loạn nhịp tim cao và co mạch ngoại vi mạnh gây thiếu máu đầu chi.'
  };

  return { dopamin, noradrenalin, dobutamin, adrenalin };
}

/**
 * Tạo Bảng Kiểm ABCS Cấp Cứu Sốc SXHD
 */
export function generateABCSChecklist(
  patient: DenguePatientInput,
  effectiveWeightKg: number
): ABCSChecklist {
  const nahco3Dose = `${Math.round(effectiveWeightKg * 1.5)} - ${Math.round(effectiveWeightKg * 2)} ml (1-2 ml/kg)`;
  const caDose = `${Math.round(effectiveWeightKg * 0.2 * 10) / 10} ml Canxi Clorid 10% (hoặc ${Math.round(effectiveWeightKg * 0.5)} ml Canxi Gluconate 10%)`;
  const gluDose = `${Math.round(effectiveWeightKg * 2)} ml Glucose 10%`;

  return {
    acidosis: {
      title: ABCS_CHECKLIST_RULES.acidosis.title,
      criteria: ABCS_CHECKLIST_RULES.acidosis.criteria,
      action: `${ABCS_CHECKLIST_RULES.acidosis.action}. Liều ước tính: ${nahco3Dose} NaHCO₃ 4.2% truyền tĩnh mạch chậm trong 30-60 phút.`
    },
    bleeding: {
      title: ABCS_CHECKLIST_RULES.bleeding.title,
      criteria: ABCS_CHECKLIST_RULES.bleeding.criteria,
      action: ABCS_CHECKLIST_RULES.bleeding.action
    },
    calcium: {
      title: ABCS_CHECKLIST_RULES.calcium.title,
      criteria: ABCS_CHECKLIST_RULES.calcium.criteria,
      action: `${ABCS_CHECKLIST_RULES.calcium.action}. Liều ước tính: ${caDose} pha loãng với Glucose 5% tiêm TMC 10-15 phút.`
    },
    sugar: {
      title: ABCS_CHECKLIST_RULES.sugar.title,
      criteria: ABCS_CHECKLIST_RULES.sugar.criteria,
      action: `${ABCS_CHECKLIST_RULES.sugar.action}. Liều ước tính: ${gluDose} tiêm tĩnh mạch chậm trong 3-5 phút.`
    }
  };
}

/**
 * Đánh giá Đối Tượng Đặc Biệt
 */
export function assessSpecialPatient(
  patient: DenguePatientInput
): string[] {
  const notes: string[] = [];

  if (patient.isPregnant) {
    notes.push('Sản phụ mang thai: Hct nền pha loãng sinh lý (28-40%), Hct > 36-38% đã là cô đặc máu bệnh lý.');
    notes.push('Tư thế: Nằm nghiêng trái 15-30 độ để giải áp tĩnh mạch chủ dưới, cải thiện tưới máu rau thai.');
    notes.push('CHỐNG CHỈ ĐỊNH can thiệp mổ lấy thai hoặc khởi phát chuyển dạ chủ động trong ngày 3-6 của bệnh (nguy cơ sốc và chảy máu tử vong).');
  }

  if (patient.hasThalassemia) {
    notes.push('Bệnh nhân Thalassemia: Hct nền thấp mạn tính (20-28%). Định nghĩa cô đặc máu khi Hct tăng > 20% so với Hct nền (không chờ Hct đạt 40%).');
    notes.push('Thận trọng phù phổi cấp do cơ tim đã giãn phì đại; ưu tiên NaCl 0.9%, hạn chế Ringer Lactate nếu có ứ sắt gan.');
  }

  if (patient.ageYears < 1 || (patient.ageMonths !== undefined && patient.ageMonths < 12)) {
    notes.push('Trẻ nhũ nhi (< 12 tháng): Dễ co giật sốt cao, dễ hạ đường huyết & hạ natri máu. Giám sát đường huyết mao mạch mỗi 4-6h.');
  }

  return notes;
}

/**
 * Tổng hợp toàn bộ Kế Hoạch Điều Trị CDSS SXHD Dengue (Chuẩn BYT 2023)
 */
export function generateDengueCDSSPlan(
  patient: DenguePatientInput,
  customDurations?: Record<number, number>
): DengueCDSSPlan {
  const ageGroup = classifyAgeGroup(patient.ageYears);
  const weightResult = calculateWeightAdjustment(
    patient.ageYears,
    patient.gender,
    patient.actualWeightKg,
    patient.isPregnant,
    patient.pregnancyTrimester
  );
  const effectiveWeight = weightResult.adjustedWeightKg;

  const { rows, totalVolumeMl, totalDurationHours } = calculateFluidSchedule(
    patient,
    effectiveWeight,
    customDurations
  );

  const { dopamin, noradrenalin, dobutamin, adrenalin } = calculateVasopressorDoses(effectiveWeight);
  const bloodProducts = calculateBloodProducts(effectiveWeight, patient);
  const nacProtocol = calculateNACProtocol(effectiveWeight, patient.liverEnzymesAST_ALT);
  const branchDecision = evaluateHctBranch(patient, effectiveWeight);
  const abcsChecklist = generateABCSChecklist(patient, effectiveWeight);
  const specialPatientNotes = assessSpecialPatient(patient);

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

  if (weightResult.isPregnantAdjusted) {
    alerts.push({
      id: 'alert_pregnancy_weight',
      level: 'warning',
      title: 'HIỆU CHỈNH CÂN NẶNG Ở PHỤ NỮ MANG THAI',
      message: weightResult.formulaNote,
      ruleCode: 'PREGNANCY_WEIGHT_ADJUST'
    });
  }

  if (patient.isPregnant) {
    alerts.push({
      id: 'alert_pregnancy_obstetric',
      level: 'danger',
      title: 'CẢNH BÁO SẢN KHOA: CẤM MỔ LẤY THAI CHỦ ĐỘNG NGÀY 3-6',
      message: 'Tuyệt đối không can thiệp mổ lấy thai hoặc kích thích chuyển dạ trong giai đoạn thoát huyết tương cấp (ngày 3-6) trừ trường hợp sinh tử mẹ, vì nguy cơ xuất huyết và sốc tử vong cực cao.',
      ruleCode: 'PREGNANCY_OBSTETRIC_CONTRAINDICATION'
    });
  }

  if (patient.hasThalassemia) {
    alerts.push({
      id: 'alert_thalassemia',
      level: 'warning',
      title: 'LƯU Ý BỆNH NHÂN THALASSEMIA / THIẾU MÁU MÃN',
      message: 'Ngưỡng cô đặc máu tính khi Hct tăng > 20% so với Hct nền của chính bệnh nhân. Cẩn trọng phù phổi cấp do giảm phân suất tống máu.',
      ruleCode: 'THALASSEMIA_ALERT'
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

  if (nacProtocol.indicated) {
    alerts.push({
      id: 'alert_liver_failure',
      level: 'danger',
      title: 'TỔN THƯƠNG GAN NẶNG / SUY GAN CẤP (AST/ALT ≥ 1000 U/L)',
      message: 'Khởi động ngay phác đồ N-Acetylcysteine (NAC) đường tĩnh mạch. CẤM dùng Ringer Lactate & Paracetamol. Đổi sang NaCl 0.9%.',
      ruleCode: 'ACUTE_LIVER_FAILURE_NAC'
    });
  } else if (nacProtocol.severityLevel === 'severe_hepatitis') {
    alerts.push({
      id: 'alert_severe_hepatitis',
      level: 'warning',
      title: 'CẢNH BÁO VIÊM GAN CẤP NẶNG (AST/ALT ≥ 400 U/L)',
      message: 'Ngừng dùng Ringer Lactate; chuyển sang dung dịch NaCl 0.9%. Ngừng ngay Paracetamol.',
      ruleCode: 'HEPATITIS_AVOID_RL'
    });
  }

  if (branchDecision.branchType === 'blood') {
    alerts.push({
      id: 'alert_suspect_bleeding',
      level: 'danger',
      title: 'NGHI NGỜ XUẤT HUYẾT NỘI ẨN / TRUYỀN HỒNG CẦU LẮNG',
      message: 'Bệnh nhân sốc không đáp ứng dịch kèm Hct tụt hoặc xuất huyết nặng. Bắt buộc truyền Khối Hồng Cầu 5-10 ml/kg. Không tăng tiếp tốc độ dịch tinh thể.',
      ruleCode: 'BLEEDING_TRANSFUSION_BRANCH'
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
    `--- KẾ HOẠCH BÙ DỊCH SXHD DENGUE (CDSS BYT 2023 - QĐ 2760/QĐ-BYT) [${dateStr}] ---`,
    `Bệnh nhân: ${patient.ageYears} tuổi, Giới tính: ${patient.gender === 'male' ? 'Nam' : 'Nữ'}`,
    `Phân độ: ${patient.severity === 'warning_signs' ? 'SXHD có Dấu hiệu cảnh báo' : patient.severity === 'shock' ? 'Sốc SXHD' : 'Sốc SXHD nặng nguy kịch'}`,
    `Cân nặng thực: ${patient.actualWeightKg} kg | Cân nặng chuẩn: ${weightResult.standardWeightKg} kg | Cân nặng tính dịch: ${effectiveWeight} kg`,
    ...(weightResult.isObese ? [`[LƯU Ý]: Đã hiệu chỉnh theo chuẩn CDC 2014 để tránh quá tải tuần hoàn.`] : []),
    ...(weightResult.isPregnantAdjusted ? [`[PNCT]: Đã trừ cân nặng thai/ối (${weightResult.formulaNote}).`] : []),
    `Tổng thể tích dự kiến: ${totalVolumeMl} ml (${Math.round(totalVolumeMl / effectiveWeight)} ml/kg) trong ${totalDurationHours} giờ.`,
    `\nBẢNG CỌC DỊCH ĐIỀU TRỊ:`,
    ...rows.map(r => `  • Cữ ${r.stepIndex}: ${r.timeWindow} | Tốc độ ${r.rateMlKgH} ml/kg/h (${r.dropsPerMin} giọt/phút) | Cần ${r.totalMl} ml (Treo thêm ${r.bottlesToHang} chai 500ml) | Tại cọc: ${r.totalAtPoleMl} ml`),
    `\nNHÁNH ĐIỀU TRỊ HIỆN TẠI: ${branchDecision.title}`,
    `  • Khuyến cáo: ${branchDecision.recommendedFluid} (${branchDecision.rateMlKgH} ml/kg/h trong ${branchDecision.durationHours}h)`,
    `  • Lý do: ${branchDecision.reasoning}`,
    `\nLIỀU 4 THUỐC VẬN MẠCH BƠM TIÊM ĐIỆN 50ML:`,
    `  • Dopamin: Pha ${dopamin.totalMg} mg trong 50ml Glucose 5%. Tốc độ 1 ml/h = 1 µg/kg/phút (Khởi đầu 5-10 ml/h).`,
    `  • Noradrenalin: Pha ${noradrenalin.totalMg} mg trong 50ml Glucose 5%. Tốc độ 1 ml/h = 0.1 µg/kg/phút (Khởi đầu 0.5-2 ml/h).`,
    `  • Dobutamin: Pha ${dobutamin.totalMg} mg trong 50ml Glucose 5%. Tốc độ 1 ml/h = 1 µg/kg/phút (Khởi đầu 3-10 ml/h).`,
    `  • Adrenalin: Pha ${adrenalin.totalMg} mg trong 50ml Glucose 5%. Tốc độ 1 ml/h = 0.1 µg/kg/phút (Khởi đầu 0.5-3 ml/h).`,
    ...(nacProtocol.indicated ? [
      `\nPHÁC ĐỒ NAC ĐIỀU TRỊ SUY GAN:`,
      ...nacProtocol.phases.map(p => `  • ${p.phaseName}: ${p.doseMgKg} mg/kg (${p.totalMg} mg) trong ${p.diluent} truyền ${p.infusionTimeHours}h (Tốc độ: ${p.pumpRateMlH})`)
    ] : []),
    `\nBẢNG KIỂM ABCS SỐC KÉO DÀI / TÁI SỐC:`,
    `  • A (Acidosis): ${abcsChecklist.acidosis.action}`,
    `  • B (Bleeding): ${abcsChecklist.bleeding.action}`,
    `  • C (Calcium): ${abcsChecklist.calcium.action}`,
    `  • S (Sugar): ${abcsChecklist.sugar.action}`,
    `\nĐIỀU DƯỠNG AN TOÀN: Đo Hct trước mỗi lần giảm tốc độ; Duy trì nước tiểu ≥ 0.5 - 1.0 ml/kg/h; Báo BS ngay nếu nước tiểu < 0.5 ml/kg/h hoặc có ran ẩm ở phổi.`
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
    vasopressorDobutamin: dobutamin,
    vasopressorAdrenalin: adrenalin,
    bloodProducts,
    nacProtocol,
    branchDecision,
    abcsChecklist,
    specialPatientNotes,
    alerts,
    nursingInstructions: DENGUE_NURSING_CHECKLIST,
    soapExportText: soapLines.join('\n'),
    createdAt: new Date().toISOString()
  };
}
