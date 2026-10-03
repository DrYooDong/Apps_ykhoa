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
  DENGUE_REFRACTORY_SCENARIOS
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
  actualWeightKg: number,
  heightCm?: number
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
      // Người lớn béo phì: Tính theo Cân nặng hiệu chỉnh AdjBW = IBW + 0.4 * (TBW - IBW) theo Phụ lục 9 QĐ 2760/BYT
      let ibw = stdWeight;
      if (heightCm && heightCm > 100) {
        ibw = gender === 'male' ? 50 + 0.91 * (heightCm - 152.4) : 45.5 + 0.91 * (heightCm - 152.4);
        ibw = Math.max(35, Math.round(ibw * 10) / 10);
      }
      const adjBw = Math.round((ibw + 0.4 * (actualWeightKg - ibw)) * 10) / 10;
      adjustedWeightKg = Math.max(ibw, Math.min(actualWeightKg, adjBw));
      formulaNote = `Người lớn béo phì: Cân nặng tính dịch hiệu chỉnh AdjBW = ${adjustedWeightKg} kg (IBW: ${ibw} kg, TBW: ${actualWeightKg} kg)`;
      warningText = `Người lớn thể trọng lớn (${actualWeightKg} kg): Dùng cân nặng hiệu chỉnh AdjBW ${adjustedWeightKg} kg để tính dịch. Cần giám sát chặt chẽ CVP, SpO2 và ran đáy phổi khi bù dịch.`;
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
 * Tính liều Vận Mạch Dopamin, Noradrenalin, Dobutamin & Adrenalin Bơm Tiêm Điện 50ml
 * Chuẩn hóa 100% theo Phụ lục 15 & Phụ lục 18 - QĐ 2760/QĐ-BYT
 */
export function calculateVasopressorDoses(effectiveWeightKg: number): {
  dopamin: VasopressorDoseInfo;
  noradrenalin: VasopressorDoseInfo;
  dobutamin: VasopressorDoseInfo;
  adrenalin: VasopressorDoseInfo;
} {
  // 1. Dopamin: Tổng liều (mg) = 3 * Cân nặng (kg) pha đủ 50ml Glucose 5%
  // 1 ml/h = 1 µg/kg/phút
  const dopaminTotalMg = Math.round(3 * effectiveWeightKg * 10) / 10;
  const dopamin: VasopressorDoseInfo = {
    drugName: 'Dopamin',
    patientWeightKg: effectiveWeightKg,
    calculationFormula: 'Tổng liều Dopamin (mg) = 3 × Cân nặng (kg) pha đủ 50ml G5%',
    totalMg: dopaminTotalMg,
    diluentSolution: 'Glucose 5% hoặc NaCl 0.9%',
    syringeVolumeMl: 50,
    infusionEquivalent: 'Tốc độ 1 ml/giờ = Liều 1 µg/kg/phút',
    standardDoseRange: '5 - 10 µg/kg/phút (tối đa 20 µg/kg/phút)',
    recommendedPumpRateMlH: '5 - 10 ml/giờ trên bơm tiêm điện 50ml',
    clinicalIndications: 'Thuốc vận mạch chọn lựa đầu tiên khi sốc kéo dài, sốc trơ dịch kèm CVP > 10 cmH2O hoặc %PPV/SVV < 15%.',
    precautions: 'Không pha chung với dung dịch kiềm (Natri Bicarbonat). Theo dõi liên tục nhịp tim trên monitor, giảm liều khi loạn nhịp nhanh.'
  };

  // 2. Noradrenalin: Tổng liều (mg) = 0.3 * Cân nặng (kg) pha đủ 50ml Glucose 5%
  // 1 ml/h = 0.1 µg/kg/phút
  const noradrenalinTotalMg = Math.round(0.3 * effectiveWeightKg * 100) / 100;
  const noradrenalin: VasopressorDoseInfo = {
    drugName: 'Noradrenalin',
    patientWeightKg: effectiveWeightKg,
    calculationFormula: 'Tổng liều Noradrenalin (mg) = 0.3 × Cân nặng (kg) pha đủ 50ml G5%',
    totalMg: noradrenalinTotalMg,
    diluentSolution: 'Glucose 5% vừa đủ 50ml',
    syringeVolumeMl: 50,
    infusionEquivalent: 'Tốc độ 1 ml/giờ = Liều 0.1 µg/kg/phút',
    standardDoseRange: '0.05 - 1.0 µg/kg/phút (trẻ em: 0.05 - 0.3 µg/kg/phút)',
    recommendedPumpRateMlH: '0.5 - 5 ml/giờ trên bơm tiêm điện 50ml (chỉnh theo MAP đích)',
    clinicalIndications: 'Chỉ định khi sốc SXHD có giảm kháng lực mạch hệ thống (HA tâm trương tụt, sốc ấm) hoặc thất bại với Dopamin.',
    precautions: 'Bắt buộc truyền qua tĩnh mạch lớn hoặc catheter tĩnh mạch trung tâm. Nguy cơ hoại tử mô nếu thoát mạch.'
  };

  // 3. Dobutamin: Tổng liều (mg) = 3 * Cân nặng (kg) pha đủ 50ml Glucose 5%
  // 1 ml/h = 1 µg/kg/phút
  const dobutaminTotalMg = Math.round(3 * effectiveWeightKg * 10) / 10;
  const dobutamin: VasopressorDoseInfo = {
    drugName: 'Dobutamin',
    patientWeightKg: effectiveWeightKg,
    calculationFormula: 'Tổng liều Dobutamin (mg) = 3 × Cân nặng (kg) pha đủ 50ml G5%',
    totalMg: dobutaminTotalMg,
    diluentSolution: 'Glucose 5% hoặc NaCl 0.9%',
    syringeVolumeMl: 50,
    infusionEquivalent: 'Tốc độ 1 ml/giờ = Liều 1 µg/kg/phút',
    standardDoseRange: '3 - 10 µg/kg/phút (tối đa 15 µg/kg/phút)',
    recommendedPumpRateMlH: '3 - 10 ml/giờ trên bơm tiêm điện 50ml',
    clinicalIndications: 'Chỉ định khi suy tim cấp do quá tải dịch, phù phổi cấp hoặc sốc tim trơ Dopamin kèm CVP > 15 cmH2O.',
    precautions: 'Có thể gây tụt huyết áp nếu chưa bù đủ thể tích tuần hoàn. Theo dõi SpO2 và nghe tim phổi.'
  };

  // 4. Adrenalin: Tổng liều (mg) = 0.3 * Cân nặng (kg) pha đủ 50ml Glucose 5%
  // 1 ml/h = 0.1 µg/kg/phút
  const adrenalinTotalMg = Math.round(0.3 * effectiveWeightKg * 100) / 100;
  const adrenalin: VasopressorDoseInfo = {
    drugName: 'Adrenalin',
    patientWeightKg: effectiveWeightKg,
    calculationFormula: 'Tổng liều Adrenalin (mg) = 0.3 × Cân nặng (kg) pha đủ 50ml G5%',
    totalMg: adrenalinTotalMg,
    diluentSolution: 'Glucose 5% vừa đủ 50ml',
    syringeVolumeMl: 50,
    infusionEquivalent: 'Tốc độ 1 ml/giờ = Liều 0.1 µg/kg/phút',
    standardDoseRange: '0.05 - 0.3 µg/kg/phút',
    recommendedPumpRateMlH: '0.5 - 3 ml/giờ trên bơm tiêm điện 50ml',
    clinicalIndications: 'Chỉ định khi sốc SXHD trơ Dopamin và Dobutamin kèm giảm sức co bóp cơ tim, nhịp chậm hoặc ngừng tuần hoàn.',
    precautions: 'Theo dõi monitor liên tục; nguy cơ tăng đường huyết, toan lactic và loạn nhịp nhanh thất.'
  };

  return { dopamin, noradrenalin, dobutamin, adrenalin };
}

/**
 * Tính toán chế phẩm máu & thuốc cầm máu (Phụ lục 17 - QĐ 2760/BYT)
 */
export function calculateBloodProducts(
  patient: DenguePatientInput,
  effectiveWeightKg: number
): BloodProductItem[] {
  const isAdult = patient.ageYears >= 16;
  const hclMinMl = Math.round(5 * effectiveWeightKg);
  const hclMaxMl = Math.round(10 * effectiveWeightKg);
  const wbMinMl = Math.round(10 * effectiveWeightKg);
  const wbMaxMl = Math.round(20 * effectiveWeightKg);
  const ffpMinMl = Math.round(10 * effectiveWeightKg);
  const ffpMaxMl = Math.round(20 * effectiveWeightKg);
  const cryoBags = Math.max(1, Math.ceil(effectiveWeightKg / 6));
  const pltPacks = Math.max(1, Math.ceil(effectiveWeightKg / 5));
  const pltApheresis = Math.max(1, Math.ceil(effectiveWeightKg / 10));

  const items: BloodProductItem[] = [
    {
      id: 'hcl',
      productName: 'Khối Hồng Cầu Lắng (HCL)',
      indication: 'Sốc không cải thiện sau bù dịch 40-60 ml/kg kèm Hct < 35% hoặc Hct giảm nhanh > 20% so với ban đầu, hoặc xuất huyết tiêu hóa / phủ tạng ồ ạt.',
      doseFormula: '5 - 10 ml/kg truyền tĩnh mạch trong 1 - 2 giờ',
      calculatedDose: `${hclMinMl} - ${hclMaxMl} ml (tương đương 1 - 2 đơn vị HCL)`,
      thresholdMet: !!(patient.currentHctPercent && patient.currentHctPercent <= 35) || !!patient.massiveBleeding,
      targetClinical: 'Duy trì Hct mục tiêu từ 35% đến 40%, cải thiện huyết động, chi ấm, mạch chậm lại.',
      precautions: 'Song song truyền Cao phân tử 10 ml/kg/h để nâng huyết áp trong lúc chờ máu. Làm phản ứng chéo tại giường.'
    },
    {
      id: 'whole_blood',
      productName: 'Máu Toàn Phần (Lấy < 7 ngày)',
      indication: 'Chỉ định khi mất máu cấp khối lượng lớn hoặc khi không có sẵn hồng cầu lắng.',
      doseFormula: '10 - 20 ml/kg truyền tĩnh mạch trong 1 - 2 giờ',
      calculatedDose: `${wbMinMl} - ${wbMaxMl} ml`,
      thresholdMet: !!patient.massiveBleeding,
      targetClinical: 'Bù thể tích tuần hoàn và phục hồi khả năng mang oxy.',
      precautions: 'Ưu tiên dùng hồng cầu lắng kết hợp dịch tinh thể/cao phân tử để tránh quá tải tuần hoàn.'
    },
    {
      id: 'ffp',
      productName: 'Huyết Tương Tươi Đông Lạnh (FFP)',
      indication: 'Rối loạn đông máu nặng (PT hay aPTT > 1.5 lần chứng hoặc INR > 1.5) kèm xuất huyết nặng, hoặc chuẩn bị thủ thuật xâm lấn, hoặc truyền máu khối lượng lớn.',
      doseFormula: '10 - 20 ml/kg truyền tĩnh mạch trong 2 - 4 giờ',
      calculatedDose: `${ffpMinMl} - ${ffpMaxMl} ml (khoảng ${Math.ceil(ffpMinMl / 200)} - ${Math.ceil(ffpMaxMl / 200)} túi 200ml)`,
      thresholdMet: !!(patient.inrValue && patient.inrValue > 1.5),
      targetClinical: 'Mục tiêu đạt PT/PTc < 1.5, phục hồi các yếu tố đông máu huyết tương.',
      precautions: 'Rã đông đúng kỹ thuật ở 37°C và dùng ngay trong vòng 4 giờ.'
    },
    {
      id: 'cryo',
      productName: 'Kết Tủa Lạnh (Cryoprecipitate)',
      indication: 'Xuất huyết nặng kèm Fibrinogen máu < 1.0 g/L.',
      doseFormula: '1 túi / 6 kg cân nặng (mỗi túi chứa ~150 mg Fibrinogen)',
      calculatedDose: `${cryoBags} túi kết tủa lạnh`,
      thresholdMet: !!(patient.fibrinogenGL && patient.fibrinogenGL < 1.0),
      targetClinical: 'Mục tiêu đạt Fibrinogen > 1.0 g/L.',
      precautions: 'Truyền nhanh ngay sau khi rã đông.'
    },
    {
      id: 'platelets',
      productName: 'Khối Tiểu Cầu (Tiểu cầu đậm đặc / Gạn tách)',
      indication: 'Tiểu cầu < 50.000/mm³ kèm xuất huyết nặng hoặc chuẩn bị chọc màng phổi/bụng; hoặc Tiểu cầu < 5.000/mm³ dù chưa chảy máu.',
      doseFormula: '1 đơn vị đậm đặc / 5 kg hoặc 1 đơn vị gạn tách (chiết tách) / 10 kg',
      calculatedDose: `${pltPacks} đơn vị đậm đặc (hoặc ${pltApheresis} khối tiểu cầu chiết tách)`,
      thresholdMet: !!(patient.plateletsCount && (patient.plateletsCount < 5000 || (patient.massiveBleeding && patient.plateletsCount < 50000))),
      targetClinical: 'Mục tiêu TC > 50.000/mm³ khi đang xuất huyết nặng; TC > 30.000/mm³ khi làm thủ thuật.',
      precautions: 'Không truyền tiểu cầu dự phòng khi chưa có xuất huyết nặng (trừ khi TC < 5.000/mm³). Không dùng màng lọc bạch cầu chuẩn cho tiểu cầu.'
    },
    {
      id: 'ppi_omeprazole',
      productName: 'Thuốc Ức Chế Bơm Proton (Omeprazole / Pantoprazole)',
      indication: 'Nghi ngờ hoặc có xuất huyết tiêu hóa trên, loét dạ dày - tá tràng hoặc sốc SXHD kéo dài.',
      doseFormula: isAdult ? 'Bolus 80 mg TM, sau đó 40 mg mỗi 12 giờ x 3 ngày' : '1 mg/kg/ngày tiêm tĩnh mạch chậm',
      calculatedDose: isAdult ? '80 mg TM bolus, sau đó 40 mg q12h' : `${Math.round(1 * effectiveWeightKg)} mg tiêm tĩnh mạch chậm`,
      thresholdMet: true,
      targetClinical: 'Nâng pH dạ dày > 6.0 giúp ổn định cục máu đông.',
      precautions: 'Không đặt sonde dạ dày qua đường mũi; nếu cần chỉ đặt qua đường MIỆNG.'
    },
    {
      id: 'vitamin_k1',
      productName: 'Vitamin K1 (Phytomenadione)',
      indication: 'Sốt xuất huyết Dengue có tổn thương gan nặng, suy gan cấp hoặc kéo dài thời gian đông máu.',
      doseFormula: '1 mg/kg tiêm tĩnh mạch chậm, tối đa 20 mg/ngày',
      calculatedDose: `${Math.min(20, Math.round(1 * effectiveWeightKg))} mg tĩnh mạch chậm`,
      thresholdMet: !!(patient.liverEnzymesAST_ALT && patient.liverEnzymesAST_ALT >= 400),
      targetClinical: 'Hỗ trợ tổng hợp các yếu tố đông máu phụ thuộc vitamin K tại gan (II, VII, IX, X).',
      precautions: 'Tiêm tĩnh mạch thật chậm; tránh tiêm bắp do nguy cơ tụ máu lớn.'
    }
  ];

  return items;
}

/**
 * Tính liều bù Albumin theo công thức Bộ Y Tế (Trang 20 - QĐ 2760)
 */
export function calculateAlbuminDose(
  effectiveWeightKg: number,
  currentAlbuminGDl: number = 2.0,
  targetAlbuminGDl: number = 3.5
): {
  albuminGrams: number;
  vials20Percent50ml: number;
  preparation5Percent: string;
  preparation10Percent: string;
  infusionRateMlH: string;
  indicationNotes: string;
} {
  const diff = Math.max(0, targetAlbuminGDl - currentAlbuminGDl);
  // Liều Albumin (g) = [nồng độ cần đạt (g/dl) - nồng độ hiện tại (g/dl)] x (0.8 x Cân nặng kg)
  const albuminGrams = diff > 0 ? Math.round(diff * 0.8 * effectiveWeightKg * 10) / 10 : 0;
  // Mỗi lọ Albumin 20% 50ml chứa 10g Albumin
  const vials20Percent50ml = diff > 0 ? Math.max(1, Math.ceil(albuminGrams / 10)) : 0;

  const minRateMlH = Math.round(5 * effectiveWeightKg);
  const maxRateMlH = Math.round(20 * effectiveWeightKg);

  return {
    albuminGrams,
    vials20Percent50ml,
    preparation5Percent: `Pha Albumin 5%: 1 lọ Albumin 20% 50ml + 150ml NaCl 0.9% = 200ml Albumin 5% (Cần ${vials20Percent50ml} lọ)`,
    preparation10Percent: `Pha Albumin 10%: 1 lọ Albumin 20% 50ml + 50ml NaCl 0.9% = 100ml Albumin 10% (Cần ${vials20Percent50ml} lọ)`,
    infusionRateMlH: `${minRateMlH} - ${maxRateMlH} ml/giờ (Tổng tốc độ dịch gồm CPT và Albumin ≤ 20 ml/kg/h)`,
    indicationNotes: 'Chỉ định khi tổng CPT ≥ 60 ml/kg và đang chống sốc CPT ≥ 5-10 ml/kg/h kèm Albumin < 2.5 g/dL hoặc bệnh nhân suy gan, suy thận, ARDS.'
  };
}

/**
 * Tính phác đồ N-Acetylcysteine (NAC) 4 pha theo Phụ lục 26 - QĐ 2760/BYT
 */
export function calculateNACProtocol(
  patient: DenguePatientInput,
  effectiveWeightKg: number
): NACProtocolResult {
  const astAlt = patient.liverEnzymesAST_ALT || 0;
  const isSevere = astAlt >= 1000;
  const isModerate = astAlt >= 400 && astAlt < 1000;

  const p1Mg = Math.round(150 * effectiveWeightKg);
  const p2Mg = Math.round(50 * effectiveWeightKg);
  const p3Mg = Math.round(100 * effectiveWeightKg);
  const p4MgH = Math.round(6.25 * effectiveWeightKg * 10) / 10;

  const phases: NACDosingPhase[] = [
    {
      phase: 1,
      phaseName: 'Pha 1: Liều Tấn Công (Giờ 1)',
      doseMgKg: 150,
      infusionTimeHours: 1,
      diluent: 'Glucose 5% hoặc NaCl 0.9% 200ml',
      totalMg: p1Mg,
      pumpRateMlH: '200 ml/h trong 1 giờ'
    },
    {
      phase: 2,
      phaseName: 'Pha 2: Duy trì bước 1 (4 giờ tiếp theo)',
      doseMgKg: 50,
      infusionTimeHours: 4,
      diluent: 'Glucose 5% hoặc NaCl 0.9% 500ml',
      totalMg: p2Mg,
      pumpRateMlH: '125 ml/h trong 4 giờ'
    },
    {
      phase: 3,
      phaseName: 'Pha 3: Duy trì bước 2 (16 giờ tiếp theo)',
      doseMgKg: 100,
      infusionTimeHours: 16,
      diluent: 'Glucose 5% hoặc NaCl 0.9% 1000ml',
      totalMg: p3Mg,
      pumpRateMlH: '62.5 ml/h trong 16 giờ'
    },
    {
      phase: 4,
      phaseName: 'Pha 4: Duy trì liên tục (48 - 72 giờ)',
      doseMgKg: 6.25, // mg/kg/h
      infusionTimeHours: 48,
      diluent: 'Bơm tiêm điện hoặc chai truyền liên tục',
      totalMg: Math.round(p4MgH * 48),
      pumpRateMlH: `${p4MgH} mg/giờ (chỉnh theo nồng độ pha)`
    }
  ];

  return {
    indicated: isSevere || isModerate,
    severityLevel: isSevere ? 'acute_liver_failure' : isModerate ? 'severe_hepatitis' : 'normal',
    astAltVal: astAlt,
    summary: isSevere
      ? `AST/ALT ${astAlt} U/L: Tổn thương gan cấp mức độ Nặng / Suy gan cấp. Bắt buộc kích hoạt phác đồ N-Acetylcysteine tĩnh mạch 4 pha và TUYỆT ĐỐI TRÁNH Ringer Lactate & Paracetamol.`
      : isModerate
      ? `AST/ALT ${astAlt} U/L: Tổn thương gan trung bình. Dùng NaCl 0.9% hoặc Ringer Acetate, tránh thuốc độc gan.`
      : 'Men gan trong giới hạn theo dõi.',
    phases,
    precautions: [
      'Chống chỉ định tuyệt đối Ringer Lactate: Gan suy không chuyển hóa được lactate dẫn đến toan lactic mất bù.',
      'Cấm dùng Paracetamol; hạ nhiệt bằng lau mát nước ấm.',
      'Cảnh báo phản ứng phản vệ với N-Acetylcysteine; chống chỉ định ở bệnh nhân thiếu men G6PD.',
      'Xem xét Lọc máu liên tục (CVVHDF) và Thay huyết tương (TPE) nếu không cải thiện sau 24 - 48 giờ.'
    ]
  };
}

/**
 * Tính toán Gói Kiểm Soát Toàn Diện ABCS (Phụ lục 16.2 & 18)
 */
export function calculateABCSChecklist(
  patient: DenguePatientInput,
  effectiveWeightKg: number
): ABCSChecklist {
  const bicarbMl = Math.round(2 * effectiveWeightKg);
  const hclDose = `${Math.round(5 * effectiveWeightKg)} - ${Math.round(10 * effectiveWeightKg)} ml`;
  const calciumMl = Math.min(10, Math.max(0.5, Math.round(0.15 * effectiveWeightKg * 10) / 10));
  const dextroseMl = Math.round(1.5 * effectiveWeightKg);

  return {
    acidosis: {
      title: 'A — Acidosis (Toan Hóa Máu Chuyển Hóa)',
      criteria: 'pH < 7.35 và/hoặc HCO3⁻ < 17 mEq/L (hoặc BE < -5)',
      action: `Natri Bicarbonate 4.2% liều 2 ml/kg tĩnh mạch chậm: Tiêm ${bicarbMl} ml TM chậm trong 10-15 phút. Không tiêm cùng đường truyền với Calci hay Dopamin.`
    },
    bleeding: {
      title: 'B — Bleeding (Xuất Huyết Nặng & Ẩn)',
      criteria: 'Hct < 35% hoặc giảm nhanh > 20% kèm sốc, hoặc xuất huyết tiêu hóa / phủ tạng',
      action: `Truyền Hồng cầu lắng 5 - 10 ml/kg (${hclDose}) trong 1-2 giờ. Song song truyền CPT 10 ml/kg/h. Bù HTĐL nếu INR > 1.5, Kết tủa lạnh nếu Fibrinogen < 1 g/L.`
    },
    calcium: {
      title: 'C — Calcium (Hạ Canxi Máu)',
      criteria: 'Canxi ion hóa (Ca++) < 1.0 mmol/L',
      action: `Calci Clorua 10% 0.1 - 0.2 ml/kg: Lấy ${calciumMl} ml Calci Clorua 10% pha loãng trong 15 ml Glucose 5% tiêm tĩnh mạch chậm trong 5 - 10 phút trên monitor.`
    },
    sugar: {
      title: 'S — Sugar (Hạ Đường Huyết)',
      criteria: 'Glucose máu < 40 mg/dL (hoặc < 2.2 mmol/L)',
      action: patient.ageYears < 1
        ? `Dextrose 10% liều 2 ml/kg: Tiêm ${Math.round(2 * effectiveWeightKg)} ml Dextrose 10% TM chậm.`
        : `Dextrose 30% liều 1 - 2 ml/kg: Tiêm ${dextroseMl} ml Dextrose 30% TM chậm, sau đó duy trì truyền Glucose 5-10%.`
    }
  };
}

/**
 * Phân tích và quyết định nhánh xử trí lâm sàng khi không đáp ứng
 */
export function calculateBranchDecision(
  patient: DenguePatientInput,
  effectiveWeightKg: number
): BranchDecisionResult {
  const isAdult = patient.ageYears >= 16;
  const currentHct = patient.currentHctPercent;
  const baselineHct = patient.baselineHctPercent || (isAdult ? (patient.gender === 'male' ? 43 : 38) : 38);
  const response = patient.clinicalResponse || 'good';

  // 1. Nhánh Xuất Huyết Mất Máu Cấp
  const isBleedingSuspicion =
    patient.massiveBleeding ||
    (currentHct !== undefined && (currentHct <= 35 || (baselineHct - currentHct) / baselineHct > 0.2));

  if (isBleedingSuspicion && (patient.severity === 'shock' || patient.severity === 'severe_shock' || response === 'refractory' || response === 'worsened')) {
    return {
      branchType: 'blood',
      title: 'NHÁNH XỬ TRÍ XUẤT HUYẾT NẶNG & MẤT MÁU CẤP (Phụ Lục 17)',
      recommendedFluid: 'Hồng Cầu Lắng (5 - 10 ml/kg) + Song song Cao Phân Tử 10 ml/kg/h',
      rateMlKgH: 10,
      durationHours: 2,
      reasoning: `Bệnh nhân sốc không cải thiện với Hct tụt (${currentHct || '< 35'}%), nghi ngờ xuất huyết tiêu hóa hoặc xuất huyết phủ tạng ẩn. Không thể bù bằng dịch tinh thể đơn thuần.`,
      warnings: [
        'Bắt buộc thăm dò trực tràng, kiểm tra dịch hút dạ dày qua đường MIỆNG.',
        'Truyền HCL 5-10 ml/kg kết hợp CPT 10 ml/kg/h trong lúc chờ máu.',
        'Bổ sung Omeprazole 1 mg/kg TM và Vitamin K1 nếu có bệnh gan.'
      ]
    };
  }

  // 2. Nhánh Thất Thoát Huyết Tương Nặng - Đổi Cao Phân Tử
  const isHctHigh = currentHct !== undefined && currentHct >= 40;
  if ((isHctHigh || response === 'refractory') && patient.severity !== 'warning_signs') {
    const cptRate = isAdult ? 15 : 20;
    return {
      branchType: 'cpt',
      title: 'NHÁNH CAO PHÂN TỬ NẤC THANG (CPT ESCALATION - Phụ Lục 8 & 16)',
      recommendedFluid: 'Cao Phân Tử: Dextran 40 hoặc 6% HES 200 (10 - 20 ml/kg/h)',
      rateMlKgH: cptRate,
      durationHours: 1,
      reasoning: `Dịch tinh thể không giữ được thể tích do thất thoát huyết tương liên tục (Hct ${currentHct || '≥ 40'}%). Cần áp lực keo mạnh để kéo dịch vào lòng mạch.`,
      warnings: [
        'Đo lại Hct tại giường sau 1 giờ truyền CPT.',
        'Giám sát tổng liều CPT: Tối đa 60 ml/kg (tránh tổn thương thận cấp).',
        'Nếu sau 2 đợt CPT vẫn không ra sốc -> Chuyển sang Lưu đồ Sốc Thất Bại Bù Dịch (Phụ lục 18).'
      ]
    };
  }

  // 3. Nhánh Sốc Thất Bại Bù Dịch / Tái Sốc Kéo Dài
  if (response === 'refractory' || response === 'worsened') {
    return {
      branchType: 'refractory_shock',
      title: 'LƯU ĐỒ SỐC SXHD KHÔNG ĐÁP ỨNG DỊCH TRUYỀN (Phụ Lục 18)',
      recommendedFluid: 'Đo CVP & HAĐMXL + Test CPT 5 ml/kg/30ph + Bù Albumin & Vận Mạch',
      rateMlKgH: 5,
      durationHours: 0.5,
      reasoning: 'Sốc trơ với bù dịch thông thường. Cần phối hợp đo CVP để phân định thiếu thể tích (CVP ≤ 15) hay suy cơ tim/quá tải (CVP > 15) và bù dịch Albumin / vận mạch tương ứng.',
      warnings: [
        'Hội chẩn khẩn cấp chuyên gia SXHD.',
        'Kiểm tra đầy đủ gói ABCS: Khí máu, điện giải, Calci ion, đường huyết.',
        'Đo CVP qua tĩnh mạch nền khuỷu tay Seldinger cải tiến (cấm chọc TM cảnh/dưới đòn).'
      ]
    };
  }

  // Mặc định: Phác đồ chuẩn
  return {
    branchType: 'standard',
    title: 'PHÁC ĐỒ BÙ DỊCH CHUẨN THEO PHÂN ĐỘ BỘ Y TẾ 2023',
    recommendedFluid: 'Ringer Lactate hoặc NaCl 0.9%',
    rateMlKgH: patient.severity === 'warning_signs' ? 6 : 15,
    durationHours: 2,
    reasoning: 'Bù dịch tinh thể theo tiến trình nấc thang giảm dần tốc độ kết hợp theo dõi sát sinh hiệu và Hct.',
    warnings: [
      'Đo lại Hct và sinh hiệu trước mỗi lần giảm tốc độ.',
      'Duy trì nước tiểu ≥ 0.5 - 1 ml/kg/h.'
    ]
  };
}

/**
 * Tổng hợp toàn bộ Kế Hoạch Điều Trị CDSS SXHD Dengue Toàn Diện
 */
export function generateDengueCDSSPlan(
  patient: DenguePatientInput,
  customDurations?: Record<number, number>
): DengueCDSSPlan {
  const ageGroup = classifyAgeGroup(patient.ageYears);
  const weightResult = calculateWeightAdjustment(patient.ageYears, patient.gender, patient.actualWeightKg, patient.heightCm);
  const effectiveWeight = weightResult.adjustedWeightKg;

  const { rows, totalVolumeMl, totalDurationHours } = calculateFluidSchedule(
    patient,
    effectiveWeight,
    customDurations
  );

  const { dopamin, noradrenalin, dobutamin, adrenalin } = calculateVasopressorDoses(effectiveWeight);
  const bloodProducts = calculateBloodProducts(patient, effectiveWeight);
  const nacProtocol = calculateNACProtocol(patient, effectiveWeight);
  const abcsChecklist = calculateABCSChecklist(patient, effectiveWeight);
  const branchDecision = calculateBranchDecision(patient, effectiveWeight);

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

  // Cảnh báo không đáp ứng / xuất huyết
  if (branchDecision.branchType === 'blood') {
    alerts.push({
      id: 'alert_bleeding',
      level: 'danger',
      title: 'BÁO ĐỘNG ĐỎ: XUẤT HUYẾT NỘI ẨN / MẤT MÁU CẤP',
      message: 'Hct giảm thấp hoặc giảm nhanh kết hợp sốc không cải thiện. Chỉ định truyền Hồng Cầu Lắng khẩn cấp và CPT song song!',
      ruleCode: 'OCCULT_BLEEDING_ALERT'
    });
  } else if (branchDecision.branchType === 'cpt') {
    alerts.push({
      id: 'alert_cpt_escalation',
      level: 'danger',
      title: 'BÁO ĐỘNG: THẤT THOÁT HUYẾT TƯƠNG TRƠ DỊCH TINH THỂ',
      message: 'Hct còn cao ≥ 40%. Chuyển ngay sang Cao Phân Tử (Dextran 40 / 6% HES 200) 10-20 ml/kg/h trong 1 giờ!',
      ruleCode: 'CPT_ESCALATION_ALERT'
    });
  }

  if (nacProtocol.indicated && nacProtocol.severityLevel === 'acute_liver_failure') {
    alerts.push({
      id: 'alert_liver_failure',
      level: 'danger',
      title: 'CẢNH BÁO SUY GAN CẤP: TUYỆT ĐỐI TRÁNH RINGER LACTATE & PARACETAMOL',
      message: 'Men gan AST/ALT ≥ 1000 U/L. Khởi động phác đồ N-Acetylcysteine (NAC) 4 pha, dùng NaCl 0.9% hoặc Ringer Acetate.',
      ruleCode: 'ACUTE_LIVER_FAILURE_ALERT'
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
    `--- KẾ HOẠCH ĐIỀU TRỊ & CHỐNG SỐC SXHD DENGUE (CDSS BYT 2023) [${dateStr}] ---`,
    `Bệnh nhân: ${patient.ageYears} tuổi, Giới tính: ${patient.gender === 'male' ? 'Nam' : 'Nữ'}`,
    `Phân độ: ${patient.severity === 'warning_signs' ? 'SXHD có Dấu hiệu cảnh báo' : patient.severity === 'shock' ? 'Sốc SXHD' : 'Sốc SXHD nặng nguy kịch'}`,
    `Cân nặng thực: ${patient.actualWeightKg} kg | Cân nặng chuẩn: ${weightResult.standardWeightKg} kg | Cân nặng tính dịch: ${effectiveWeight} kg`,
    ...(weightResult.isObese ? [`[LƯU Ý]: Đã hiệu chỉnh theo chuẩn CDC 2014 để tránh quá tải tuần hoàn.`] : []),
    ...(patient.currentHctPercent ? [`Hct hiện tại: ${patient.currentHctPercent}% | Đánh giá đáp ứng: ${patient.clinicalResponse || 'Theo dõi'}`] : []),
    `\n1. NHÁNH XỬ TRÍ LÂM SÀNG: ${branchDecision.title}`,
    `  • Hướng xử trí: ${branchDecision.recommendedFluid}`,
    `  • Lý luận lâm sàng: ${branchDecision.reasoning}`,
    `\n2. BẢNG CỌC DỊCH ĐIỀU TRỊ BAN ĐẦU:`,
    ...rows.map(r => `  • Cữ ${r.stepIndex}: ${r.timeWindow} | Tốc độ ${r.rateMlKgH} ml/kg/h (${r.dropsPerMin} giọt/phút) | Cần ${r.totalMl} ml (Treo thêm ${r.bottlesToHang} chai 500ml) | Tại cọc: ${r.totalAtPoleMl} ml`),
    `\n3. PHÁC ĐỒ KHI KHÔNG ĐÁP ỨNG / SỐC TRƠ / TÁI SỐC (PHỤ LỤC 18):`,
    `  • Dopamin: Pha ${dopamin.totalMg} mg trong 50ml Glucose 5%. Tốc độ 1 ml/h = 1 µg/kg/phút (Khởi đầu 5-10 ml/h).`,
    `  • Noradrenalin: Pha ${noradrenalin.totalMg} mg trong 50ml Glucose 5%. Tốc độ 1 ml/h = 0.1 µg/kg/phút (Khởi đầu 0.5-2 ml/h).`,
    `  • Dobutamin: Pha ${dobutamin.totalMg} mg trong 50ml Glucose 5%. Tốc độ 1 ml/h = 1 µg/kg/phút (Khởi đầu 3-10 ml/h khi CVP > 15 cmH2O hoặc suy tim).`,
    `  • HCL (khi Hct < 35%): Truyền ${Math.round(5 * effectiveWeight)} - ${Math.round(10 * effectiveWeight)} ml trong 1-2h song song CPT 10 ml/kg/h.`,
    `  • Gói ABCS: Acidosis (Bicarbonate 4.2% ${Math.round(2 * effectiveWeight)} ml); Calcium (Calci clorua 10% 2-5ml); Sugar (Dextrose 30% ${Math.round(1.5 * effectiveWeight)} ml).`,
    ...(nacProtocol.indicated ? [`  • Phác đồ NAC Suy gan: Tấn công 150mg/kg (1h) -> 50mg/kg (4h) -> 100mg/kg (16h) -> Duy trì 6.25mg/kg/h. Tuyệt đối TRÁNH Ringer Lactate & Paracetamol.`] : []),
    `\n4. ĐIỀU DƯỠNG AN TOÀN: Đo Hct trước mỗi lần giảm tốc độ; Duy trì nước tiểu ≥ 0.5 - 1.0 ml/kg/h; Báo BS ngay nếu nước tiểu < 0.5 ml/kg/h hoặc ran ẩm phổi.`
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
    alerts,
    nursingInstructions: DENGUE_NURSING_CHECKLIST,
    soapExportText: soapLines.join('\n'),
    createdAt: new Date().toISOString()
  };
}
