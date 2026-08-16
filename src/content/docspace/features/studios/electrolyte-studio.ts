/**
 * DocSpace — Electrolyte & Fluid Studio (TypeScript)
 * Tính Toán Bù Natri, Nước Tự Do (FWD), Kali & Cảnh Báo An Toàn Thần Kinh (CPM)
 */

export interface ElectrolyteInputs {
  mode: 'hyponatremia' | 'hypernatremia' | 'hypokalemia';
  weightKg: number;
  gender: 'male' | 'female';
  isElderly?: boolean;
  serumNa: number;       // mmol/L
  serumK?: number;        // mmol/L
  glucoseMmol?: number;  // mmol/L (chuẩn 5.6)
  targetNa?: number;     // mmol/L
  targetK?: number;      // mmol/L
  selectedInfusate?: 'nacl_3' | 'nacl_09' | 'ringer' | 'd5w';
  hasSevereSymptoms?: boolean; // Co giật, hôn mê, lơ mơ
}

export interface ElectrolyteResult {
  tbwLiters: number;
  correctedNa: number | null;
  sodiumDeficitMeq: number | null;
  freeWaterDeficitLiters: number | null;
  adrogueDeltaNaPerLiter: number | null;
  infusionRateMlPerHour: number | null;
  potassiumDeficitMeq: number | null;
  safeSpeedLimitSummary: string;
  clinicalSummary: string;
  safetyAlerts: string[];
}

export function analyzeElectrolyte(inputs: ElectrolyteInputs): ElectrolyteResult {
  const {
    mode,
    weightKg,
    gender,
    isElderly = false,
    serumNa,
    serumK = 4.0,
    glucoseMmol = 5.6,
    targetNa = 130,
    targetK = 4.0,
    selectedInfusate = 'nacl_3',
    hasSevereSymptoms = false,
  } = inputs;

  const safetyAlerts: string[] = [];

  // 1. Tính Thể tích nước cơ thể (Total Body Water - TBW)
  let tbwFraction = gender === 'male' ? 0.6 : 0.5;
  if (isElderly) tbwFraction -= 0.05;
  const tbwLiters = Math.round(weightKg * tbwFraction * 10) / 10;

  // 2. Tính Natri hiệu chỉnh đường huyết (Katz / Hillier)
  let correctedNa: number | null = null;
  if (glucoseMmol > 5.6) {
    correctedNa = Math.round((serumNa + 1.6 * ((glucoseMmol - 5.6) / 5.6)) * 10) / 10;
  }

  // 3. Xử lý theo từng Mode
  let sodiumDeficitMeq: number | null = null;
  let freeWaterDeficitLiters: number | null = null;
  let adrogueDeltaNaPerLiter: number | null = null;
  let infusionRateMlPerHour: number | null = null;
  let potassiumDeficitMeq: number | null = null;
  let safeSpeedLimitSummary = '';

  const INFUSATE_NA: Record<string, number> = {
    nacl_3: 513,
    nacl_09: 154,
    ringer: 130,
    d5w: 0,
  };

  if (mode === 'hyponatremia') {
    // Adrogué-Madias Formula: Delta Na = (Na_infusate - Na_serum) / (TBW + 1)
    const infusateNa = INFUSATE_NA[selectedInfusate] || 513;
    const effectiveSerumNa = correctedNa !== null ? correctedNa : serumNa;
    adrogueDeltaNaPerLiter = (infusateNa - effectiveSerumNa) / (tbwLiters + 1);

    // Lượng Natri thiếu hụt để đạt Target Na
    const deltaTarget = Math.max(0, targetNa - effectiveSerumNa);
    sodiumDeficitMeq = Math.round(tbwLiters * deltaTarget);

    // Tính tốc độ truyền để nâng mục tiêu không quá 6-8 mmol/L trong 24 giờ
    const targetDelta24h = hasSevereSymptoms ? 6 : 6;
    if (adrogueDeltaNaPerLiter > 0) {
      const totalLiters24h = targetDelta24h / adrogueDeltaNaPerLiter;
      infusionRateMlPerHour = Math.round((totalLiters24h * 1000) / 24);
    }

    if (hasSevereSymptoms) {
      safetyAlerts.push('🚨 CÓ TRIỆU CHỨNG THẦN KINH NẶNG (Co giật/Hôn mê): Bolus 100 - 150 mL NaCl 3% tiêm truyền trong 10-20 phút, lặp lại đến khi cải thiện triệu chứng (tăng Na ~ 4-6 mmol/L).');
    }

    safetyAlerts.push('⚠️ CẢNH BÁO AN TOÀN TỐI QUAN TRỌNG: Tốc độ nâng Natri TUYỆT ĐỐI KHÔNG QUÁ 8 - 10 mmol/L trong 24 giờ đầu (và < 18 mmol/L trong 48 giờ) để phòng tránh Hội chứng Hủy Myelin Cầu Não (Osmotic Demyelination Syndrome / CPM).');
    safeSpeedLimitSummary = 'Giới hạn an toàn: Tăng tối đa 6 - 8 mmol/L/24h (Bệnh nhân nguy cơ cao xơ gan, suy dinh dưỡng: tối đa 4 - 6 mmol/L/24h).';

  } else if (mode === 'hypernatremia') {
    // Free Water Deficit (FWD) = TBW * ((serumNa / 140) - 1)
    if (serumNa > 140) {
      freeWaterDeficitLiters = Math.round(tbwLiters * ((serumNa / 140) - 1) * 10) / 10;
      // Bù trong 48 - 72 giờ
      const mlPerHour = Math.round((freeWaterDeficitLiters * 1000) / 48);
      infusionRateMlPerHour = mlPerHour;
    }

    safetyAlerts.push('⚠️ CẢNH BÁO AN TOÀN: Tốc độ hạ Natri không quá 0.5 mmol/L/giờ (tối đa 10 - 12 mmol/L trong 24 giờ) để tránh Phù não cấp (Cerebral Edema).');
    safeSpeedLimitSummary = 'Bù nước tự do (Dextrose 5% hoặc nước uống qua sonde dạ dày) chia đều trong 48 - 72 giờ.';

  } else if (mode === 'hypokalemia') {
    if (serumK < 4.0) {
      const drop = 4.0 - serumK;
      potassiumDeficitMeq = Math.round(drop * 150); // Ước tính 1 mmol/L tụt tương đương thiếu 100-200 mEq K+
    }

    safetyAlerts.push('⚠️ CẢNH BÁO TRUYỀN KALI TĨNH MẠCH: Nồng độ qua tĩnh mạch ngoại vi tối đa 40 mEq/L; Tốc độ truyền tối đa 10 - 20 mEq/giờ; Luôn gắn Monitor theo dõi ECG.');
    safetyAlerts.push('Bắt buộc kiểm tra và bù Magnesium máu ($Mg^{2+} > 0.8\text{ mmol/L}$), vì hạ Magie gây kháng trị với bù Kali.');
    safeSpeedLimitSummary = 'Ưu tiên đường uống (KCl 0.5 - 1g x 2-3 lần/ngày). Đường tĩnh mạch chỉ dùng khi hạ Kali nặng < 2.5 mmol/L hoặc có loạn nhịp tim.';
  }

  // Clinical Summary
  let summary = `[Electrolyte & Fluid Report]\n• Bệnh nhân: ${weightKg}kg (${gender === 'male' ? 'Nam' : 'Nữ'}${isElderly ? ', cao tuổi' : ''}) | TBW: ${tbwLiters} L`;
  if (correctedNa !== null) {
    summary += `\n• Natri hiệu chỉnh đường huyết (${glucoseMmol} mmol/L): ${correctedNa} mmol/L`;
  }
  if (mode === 'hyponatremia') {
    summary += `\n• Hạ Natri máu (${serumNa} mmol/L) ➔ Đích: ${targetNa} mmol/L`;
    if (adrogueDeltaNaPerLiter) summary += `\n• 1 Lít ${selectedInfusate.toUpperCase()} làm tăng Natri dự kiến: +${adrogueDeltaNaPerLiter.toFixed(2)} mmol/L`;
    if (infusionRateMlPerHour) summary += `\n• Tốc độ truyền khuyến nghị (${selectedInfusate.toUpperCase()}): ${infusionRateMlPerHour} mL/giờ (duy trì tăng ≤ 6-8 mmol/L/24h)`;
  } else if (mode === 'hypernatremia') {
    summary += `\n• Tăng Natri máu (${serumNa} mmol/L) | Nước tự do thiếu hụt (FWD): ${freeWaterDeficitLiters} Lít`;
    summary += `\n• Tốc độ bù nước tự do (D5W / Uống): ${infusionRateMlPerHour} mL/giờ trong 48 giờ`;
  } else if (mode === 'hypokalemia') {
    summary += `\n• Hạ Kali máu (${serumK} mmol/L) | Ước tính thiếu hụt K+: ~${potassiumDeficitMeq} mEq`;
  }

  return {
    tbwLiters,
    correctedNa,
    sodiumDeficitMeq,
    freeWaterDeficitLiters,
    adrogueDeltaNaPerLiter,
    infusionRateMlPerHour,
    potassiumDeficitMeq,
    safeSpeedLimitSummary,
    clinicalSummary: summary,
    safetyAlerts,
  };
}
