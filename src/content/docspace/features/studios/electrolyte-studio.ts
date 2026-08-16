/**
 * DocSpace — Electrolyte & Fluid Studio (TypeScript)
 * Tính Toán Bù Natri, Nước Tự Do (FWD), Kali & Đồ Thị Dòng Thời Gian Bù Dịch An Toàn SVG
 */

export interface ElectrolytePreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  values: ElectrolyteInputs;
}

export interface ElectrolyteInputs {
  mode: 'hyponatremia' | 'hypernatremia' | 'hypokalemia';
  weightKg: number;
  gender: 'male' | 'female';
  isElderly?: boolean;
  serumNa: number;
  serumK?: number;
  glucoseMmol?: number;
  targetNa?: number;
  targetK?: number;
  selectedInfusate?: 'nacl_3' | 'nacl_09' | 'ringer' | 'd5w';
  hasSevereSymptoms?: boolean;
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

export const ELYTE_PRESETS: ElectrolytePreset[] = [
  {
    id: 'siadh_severe',
    name: 'Hạ Natri Máu Nặng Kèm Co Giật (SIADH)',
    badge: 'Cấp Cứu Thần Kinh Na < 120',
    badgeColor: '#dc2626',
    description: 'Bệnh nhân hôn mê co giật, Na 112 mmol/L. Cần bolus cấp cứu NaCl 3% nâng 4-6 mmol/L trong 6h.',
    values: { mode: 'hyponatremia', weightKg: 60, gender: 'male', isElderly: false, serumNa: 112, glucoseMmol: 5.6, targetNa: 125, selectedInfusate: 'nacl_3', hasSevereSymptoms: true },
  },
  {
    id: 'hypovolemic_hyponatremia',
    name: 'Hạ Natri Giảm Thể Tích (Mất Qua Tiêu Hóa)',
    badge: 'Mất Nước & Muối',
    badgeColor: '#f59e0b',
    description: 'Bệnh nhân tiêu chảy nhiều ngày, da khô tụt huyết áp tư thế, Na 122 mmol/L.',
    values: { mode: 'hyponatremia', weightKg: 55, gender: 'female', isElderly: false, serumNa: 122, glucoseMmol: 6.0, targetNa: 130, selectedInfusate: 'nacl_09', hasSevereSymptoms: false },
  },
  {
    id: 'hypernatremia_elderly',
    name: 'Tăng Natri Máu Người Già (Mất Nước Tự Do)',
    badge: 'Tăng Thẩm Thấu FWD',
    badgeColor: '#ef4444',
    description: 'Cụ bà 78 tuổi sốt bỏ ăn uống, Na 158 mmol/L. Cần bù nước tự do chậm rãi trong 48 - 72h.',
    values: { mode: 'hypernatremia', weightKg: 48, gender: 'female', isElderly: true, serumNa: 158, glucoseMmol: 5.8, targetNa: 140, selectedInfusate: 'd5w', hasSevereSymptoms: false },
  },
  {
    id: 'severe_hypokalemia',
    name: 'Hạ Kali Máu Nặng Do Dùng Lợi Tiểu',
    badge: 'Báo Động K < 2.5',
    badgeColor: '#8b5cf6',
    description: 'Bệnh nhân suy tim dùng Furosemide liều cao, K 2.4 mmol/L kèm yếu cơ và sóng U trên ECG.',
    values: { mode: 'hypokalemia', weightKg: 65, gender: 'male', isElderly: false, serumNa: 136, serumK: 2.4, targetK: 4.0 },
  },
];

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

  // 1. Thể tích nước cơ thể (TBW)
  let tbwFraction = gender === 'male' ? 0.6 : 0.5;
  if (isElderly) tbwFraction -= 0.05;
  const tbwLiters = Math.round(weightKg * tbwFraction * 10) / 10;

  // 2. Natri hiệu chỉnh đường huyết (Katz)
  let correctedNa: number | null = null;
  if (glucoseMmol > 5.6) {
    correctedNa = Math.round((serumNa + 1.6 * ((glucoseMmol - 5.6) / 5.6)) * 10) / 10;
  }

  // 3. Tính toán theo từng Mode
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
    const infusateNa = INFUSATE_NA[selectedInfusate] || 513;
    const effectiveSerumNa = correctedNa !== null ? correctedNa : serumNa;
    adrogueDeltaNaPerLiter = (infusateNa - effectiveSerumNa) / (tbwLiters + 1);

    const deltaTarget = Math.max(0, targetNa - effectiveSerumNa);
    sodiumDeficitMeq = Math.round(tbwLiters * deltaTarget);

    const targetDelta24h = 6;
    if (adrogueDeltaNaPerLiter > 0) {
      const totalLiters24h = targetDelta24h / adrogueDeltaNaPerLiter;
      infusionRateMlPerHour = Math.round((totalLiters24h * 1000) / 24);
    }

    if (hasSevereSymptoms) {
      safetyAlerts.push('🚨 TRIỆU CHỨNG THẦN KINH CẤP (Co giật/Hôn mê): Tiêm truyền Bolus 100 - 150 mL NaCl 3% trong 10-20 phút, lặp lại đến 3 lần nếu cần để nâng nhanh Na lên 4-6 mmol/L cắt cơn co giật.');
    }

    safetyAlerts.push('⚠️ CẢNH BÁO AN TOÀN TỐI QUAN TRỌNG: Tốc độ nâng Natri TUYỆT ĐỐI KHÔNG QUÁ 8 - 10 mmol/L trong 24 giờ đầu để phòng tránh Hội chứng Hủy Myelin Cầu Não (Osmotic Demyelination Syndrome / CPM).');
    safeSpeedLimitSummary = 'Giới hạn an toàn: Tăng tối đa 6 - 8 mmol/L/24h (ở bệnh nhân xơ gan, suy dinh dưỡng: tối đa 4 - 6 mmol/L/24h).';

  } else if (mode === 'hypernatremia') {
    if (serumNa > 140) {
      freeWaterDeficitLiters = Math.round(tbwLiters * ((serumNa / 140) - 1) * 10) / 10;
      const mlPerHour = Math.round((freeWaterDeficitLiters * 1000) / 48);
      infusionRateMlPerHour = mlPerHour;
    }

    safetyAlerts.push('⚠️ CẢNH BÁO AN TOÀN: Tốc độ hạ Natri không quá 0.5 mmol/L/giờ (tối đa 10 - 12 mmol/L/24h) để tránh Phù não cấp (Cerebral Edema).');
    safeSpeedLimitSummary = 'Bù nước tự do (Dextrose 5% hoặc nước uống qua sonde) chia đều trong 48 - 72 giờ.';

  } else if (mode === 'hypokalemia') {
    if (serumK < 4.0) {
      const drop = 4.0 - serumK;
      potassiumDeficitMeq = Math.round(drop * 150);
    }

    safetyAlerts.push('⚠️ CẢNH BÁO TRUYỀN KALI TĨNH MẠCH: Nồng độ ngoại vi tối đa 40 mEq/L; Tốc độ truyền tối đa 10 - 20 mEq/giờ; Luôn gắn Monitor theo dõi ECG.');
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
    if (adrogueDeltaNaPerLiter) summary += `\n• 1 Lít ${selectedInfusate.toUpperCase()} làm tăng Natri: +${adrogueDeltaNaPerLiter.toFixed(2)} mmol/L`;
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

/**
 * Render Đồ Thị Dòng Thời Gian Bù Dịch An Toàn (Fluid Timeline SVG) 0h - 6h - 24h - 48h
 */
export function renderFluidTimelineSvg(currentNa: number, targetNa: number, rateMlH: number): string {
  const w = 480;
  const h = 130;
  const padL = 35;
  const padR = 35;

  const getX = (hourRatio: number) => padL + hourRatio * (w - padL - padR);

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}">
      <!-- Timeline Base Bar -->
      <line x1="${padL}" y1="50" x2="${w - padR}" y2="50" stroke="var(--color-border)" stroke-width="6" stroke-linecap="round" />
      <line x1="${padL}" y1="50" x2="${getX(0.5)}" y2="50" stroke="var(--color-primary)" stroke-width="6" stroke-linecap="round" />

      <!-- Checkpoints 0h, 6h, 24h, 48h -->
      <!-- 0h (Ban đầu) -->
      <circle cx="${getX(0)}" cy="50" r="8" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
      <text x="${getX(0)}" y="30" fill="var(--color-text)" font-size="9" font-weight="800" text-anchor="middle">0h (Hiện tại)</text>
      <text x="${getX(0)}" y="74" fill="#ef4444" font-size="9.5" font-weight="800" text-anchor="middle">${currentNa} mmol/L</text>

      <!-- 6h (Mốc đánh giá thần kinh) -->
      <circle cx="${getX(0.2)}" cy="50" r="6" fill="var(--color-warning)" stroke="#ffffff" stroke-width="2" />
      <text x="${getX(0.2)}" y="30" fill="var(--color-text-muted)" font-size="8.5" font-weight="700" text-anchor="middle">6h (Thử lại Na)</text>
      <text x="${getX(0.2)}" y="74" fill="var(--color-warning)" font-size="8.5" font-weight="700" text-anchor="middle">+2~3 mmol/L</text>

      <!-- 24h (Mốc giới hạn an toàn 6-8) -->
      <circle cx="${getX(0.5)}" cy="50" r="7" fill="var(--color-primary)" stroke="#ffffff" stroke-width="2" />
      <text x="${getX(0.5)}" y="30" fill="var(--color-primary)" font-size="8.5" font-weight="800" text-anchor="middle">24h (Giới hạn)</text>
      <text x="${getX(0.5)}" y="74" fill="var(--color-primary)" font-size="9" font-weight="800" text-anchor="middle">+6~8 mmol/L</text>

      <!-- 48h (Mục tiêu cuối) -->
      <circle cx="${getX(1.0)}" cy="50" r="8" fill="#10b981" stroke="#ffffff" stroke-width="2" />
      <text x="${getX(1.0)}" y="30" fill="var(--color-text)" font-size="9" font-weight="800" text-anchor="middle">48h (Đích)</text>
      <text x="${getX(1.0)}" y="74" fill="#10b981" font-size="9.5" font-weight="800" text-anchor="middle">${targetNa} mmol/L</text>

      <!-- Sub text -->
      <text x="${w / 2}" y="115" fill="var(--color-text-muted)" font-size="9" text-anchor="middle">
        Tốc độ truyền duy trì: <tspan fill="var(--color-primary)" font-weight="800">${rateMlH} mL/giờ</tspan> · Xét nghiệm lại điện giải đồ mỗi 4 - 6 giờ
      </text>
    </svg>
  `;
}
