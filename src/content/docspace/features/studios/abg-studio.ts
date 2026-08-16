/**
 * DocSpace — ABG Pro Studio (TypeScript)
 * Khí Máu Động Mạch & Phân Tích Rối Loạn Toan Kiềm Toàn Diện (6 Bước & 6 Vùng Màu Davenport)
 */

export interface AbgPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  values: AbgInputs;
}

export interface AbgInputs {
  ph: number;
  paco2: number;
  hco3: number;
  pao2?: number;
  fio2?: number; // % (21 - 100)
  na?: number;
  cl?: number;
  albumin?: number; // g/dL (chuẩn 4.0)
  lactate?: number;
}

export interface AbgAnalysisResult {
  primaryDisorder: string;
  compensationStatus: string;
  anionGap: number | null;
  anionGapCorrected: number | null;
  deltaRatio: number | null;
  deltaRatioInterpretation: string | null;
  pfRatio: number | null;
  oxygenationStatus: string | null;
  clinicalSummary: string;
  recommendations: string[];
  davenportCoords: { x: number; y: number };
}

export const ABG_PRESETS: AbgPreset[] = [
  {
    id: 'dka',
    name: 'Toan Ceton ĐTĐ (DKA)',
    badge: 'Toan Chuyển Hóa Tăng AG',
    badgeColor: '#ef4444',
    description: 'Bệnh nhân ĐTĐ Type 1 bỏ thuốc, thở nhanh sâu Kussmaul, hơi thở mùi táo chín.',
    values: { ph: 7.15, paco2: 22, hco3: 8, pao2: 95, fio2: 21, na: 135, cl: 98, albumin: 4.0, lactate: 1.5 },
  },
  {
    id: 'copd_acute',
    name: 'Đợt Cấp COPD Mất Bù',
    badge: 'Toan Hô Hấp Cấp/Mạn',
    badgeColor: '#dc2626',
    description: 'Bệnh nhân COPD sốt đờm đục, ứ trệ CO2 máu nặng kèm toan hô hấp cấp trên nền mạn.',
    values: { ph: 7.24, paco2: 75, hco3: 32, pao2: 52, fio2: 24, na: 140, cl: 95, albumin: 3.8, lactate: 2.1 },
  },
  {
    id: 'salicylate',
    name: 'Ngộ Độc Aspirin (Salicylate)',
    badge: 'Toan AG + Kiềm Hô Hấp',
    badgeColor: '#8b5cf6',
    description: 'Kích thích trung tâm hô hấp gây thở nhanh (Kiềm HH) kèm acid hữu cơ gây Toan chuyển hóa.',
    values: { ph: 7.46, paco2: 20, hco3: 14, pao2: 98, fio2: 21, na: 142, cl: 102, albumin: 4.0, lactate: 2.8 },
  },
  {
    id: 'severe_vomiting',
    name: 'Hẹp Môn Vị / Nôn Ói Nặng',
    badge: 'Kiềm Chuyển Hóa',
    badgeColor: '#0284c7',
    description: 'Mất dịch dạ dày chứa HCl và Kali gây kiềm chuyển hóa giảm clo, giảm kali.',
    values: { ph: 7.55, paco2: 48, hco3: 40, pao2: 85, fio2: 21, na: 138, cl: 86, albumin: 4.2, lactate: 1.2 },
  },
  {
    id: 'ards_severe',
    name: 'ARDS Nặng / Viêm Phổi Sốc',
    badge: 'Toan Máu & Giảm Oxy Nặng',
    badgeColor: '#dc2626',
    description: 'Tổn thương màng phế nang mao mạch lan tỏa, P/F ratio tụt thấp nghiêm trọng.',
    values: { ph: 7.28, paco2: 48, hco3: 22, pao2: 60, fio2: 80, na: 138, cl: 101, albumin: 2.8, lactate: 4.2 },
  },
];

export function analyzeAbg(inputs: AbgInputs): AbgAnalysisResult {
  const { ph, paco2, hco3, pao2, fio2 = 21, na, cl, albumin = 4.0, lactate } = inputs;

  let primaryDisorder = '';
  let compensationStatus = '';
  const recommendations: string[] = [];

  const isAcidemia = ph < 7.35;
  const isAlkalemia = ph > 7.45;

  if (isAcidemia) {
    if (paco2 > 45 && hco3 < 22) {
      primaryDisorder = 'Toan Hỗn Hợp (Toan Hô Hấp + Toan Chuyển Hóa)';
      compensationStatus = 'Cả hai hệ đệm hô hấp và chuyển hóa đều suy giảm nặng';
      recommendations.push('Tối khẩn: Cần hỗ trợ thông khí nhân tạo bảo vệ phổi và hồi sức thể tích/chuyển hóa đồng thời.');
    } else if (paco2 > 45) {
      primaryDisorder = 'Toan Hô Hấp (Respiratory Acidosis)';
      const deltaPaco2 = paco2 - 40;
      const expectedAcuteHco3 = 24 + 0.1 * deltaPaco2;
      const expectedChronicHco3 = 24 + 0.35 * deltaPaco2;
      if (Math.abs(hco3 - expectedAcuteHco3) < 2.5) {
        compensationStatus = `Toan hô hấp CẤP (HCO3- kỳ vọng: ${expectedAcuteHco3.toFixed(1)} mmol/L)`;
      } else if (Math.abs(hco3 - expectedChronicHco3) < 3.5) {
        compensationStatus = `Toan hô hấp MẠN (HCO3- kỳ vọng: ${expectedChronicHco3.toFixed(1)} mmol/L)`;
      } else if (hco3 > expectedChronicHco3) {
        compensationStatus = 'Toan hô hấp kèm Kiềm chuyển hóa đồng thời';
      } else {
        compensationStatus = 'Toan hô hấp kèm Toan chuyển hóa đồng thời';
      }
    } else if (hco3 < 22) {
      primaryDisorder = 'Toan Chuyển Hóa (Metabolic Acidosis)';
      const expectedPaco2 = 1.5 * hco3 + 8;
      const paco2Min = expectedPaco2 - 2;
      const paco2Max = expectedPaco2 + 2;
      if (paco2 >= paco2Min && paco2 <= paco2Max) {
        compensationStatus = `Toan chuyển hóa bù trừ hô hấp phù hợp (PaCO2 kỳ vọng: ${expectedPaco2.toFixed(1)} ± 2 mmHg)`;
      } else if (paco2 > paco2Max) {
        compensationStatus = `Toan chuyển hóa kèm Toan hô hấp đồng thời (Ứ CO2, PaCO2 thực tế ${paco2} > kỳ vọng ${expectedPaco2.toFixed(1)})`;
      } else {
        compensationStatus = `Toan chuyển hóa kèm Kiềm hô hấp đồng thời (Tăng thông khí quá mức, PaCO2 ${paco2} < kỳ vọng ${expectedPaco2.toFixed(1)})`;
      }
    } else {
      primaryDisorder = 'Toan máu chưa rõ căn nguyên';
    }
  } else if (isAlkalemia) {
    if (paco2 < 35 && hco3 > 26) {
      primaryDisorder = 'Kiềm Hỗn Hợp (Kiềm Hô Hấp + Kiềm Chuyển Hóa)';
    } else if (paco2 < 35) {
      primaryDisorder = 'Kiềm Hô Hấp (Respiratory Alkalosis)';
      const deltaPaco2 = 40 - paco2;
      const expectedAcuteHco3 = 24 - 0.2 * deltaPaco2;
      const expectedChronicHco3 = 24 - 0.5 * deltaPaco2;
      if (Math.abs(hco3 - expectedAcuteHco3) < 2) {
        compensationStatus = `Kiềm hô hấp CẤP (HCO3- kỳ vọng: ${expectedAcuteHco3.toFixed(1)} mmol/L)`;
      } else if (Math.abs(hco3 - expectedChronicHco3) < 3) {
        compensationStatus = `Kiềm hô hấp MẠN (HCO3- kỳ vọng: ${expectedChronicHco3.toFixed(1)} mmol/L)`;
      } else {
        compensationStatus = 'Kiềm hô hấp bù trừ không hoàn toàn';
      }
    } else if (hco3 > 26) {
      primaryDisorder = 'Kiềm Chuyển Hóa (Metabolic Alkalosis)';
      const expectedPaco2 = 40 + 0.7 * (hco3 - 24);
      if (Math.abs(paco2 - expectedPaco2) <= 2.5) {
        compensationStatus = `Kiềm chuyển hóa bù trừ hô hấp phù hợp (PaCO2 kỳ vọng: ${expectedPaco2.toFixed(1)} mmHg)`;
      } else if (paco2 > expectedPaco2 + 2) {
        compensationStatus = 'Kiềm chuyển hóa kèm Toan hô hấp';
      } else {
        compensationStatus = 'Kiềm chuyển hóa kèm Kiềm hô hấp';
      }
    }
  } else {
    if (paco2 !== 40 || hco3 !== 24) {
      primaryDisorder = 'Rối loạn toan kiềm hỗn hợp bù trừ hoàn toàn / Trạng thái bình thường';
      compensationStatus = `pH trong giới hạn bình thường (${ph}), nhưng PaCO2 (${paco2}) hoặc HCO3- (${hco3}) có biến đổi`;
    } else {
      primaryDisorder = 'Khí máu động mạch Bình thường';
      compensationStatus = 'Cân bằng toan kiềm ổn định';
    }
  }

  // 2. Anion Gap & Delta Ratio
  let anionGap: number | null = null;
  let anionGapCorrected: number | null = null;
  let deltaRatio: number | null = null;
  let deltaRatioInterpretation: string | null = null;

  if (typeof na === 'number' && typeof cl === 'number') {
    anionGap = na - (cl + hco3);
    if (albumin && albumin !== 4.0) {
      anionGapCorrected = anionGap + 2.5 * (4.0 - albumin);
    } else {
      anionGapCorrected = anionGap;
    }

    const effectiveAg = anionGapCorrected !== null ? anionGapCorrected : anionGap;
    if (effectiveAg > 12) {
      recommendations.push(`Có TĂNG ANION GAP (${effectiveAg.toFixed(1)} mmol/L) ➔ Tìm nguyên nhân GOLD MARK: Glycols, Oxoproline, L-Lactate, D-Lactate, Methanol, Aspirin, Renal failure (Ure), Ketoacidosis.`);
      if (hco3 < 24) {
        const deltaAg = effectiveAg - 12;
        const deltaHco3 = 24 - hco3;
        if (deltaHco3 > 0) {
          deltaRatio = deltaAg / deltaHco3;
          if (deltaRatio < 0.4) {
            deltaRatioInterpretation = 'Toan chuyển hóa Anion Gap bình thường (Tăng Clo) chiếm ưu thế (Delta Ratio < 0.4)';
          } else if (deltaRatio >= 0.4 && deltaRatio < 0.8) {
            deltaRatioInterpretation = 'Toan chuyển hóa Hỗn hợp (Tăng AG + Tăng Clo) (Delta Ratio 0.4 - 0.8)';
          } else if (deltaRatio >= 0.8 && deltaRatio <= 2.0) {
            deltaRatioInterpretation = 'Toan chuyển hóa Tăng Anion Gap đơn thuần điển hình (Delta Ratio 0.8 - 2.0)';
          } else {
            deltaRatioInterpretation = 'Toan chuyển hóa Tăng AG kèm Kiềm chuyển hóa hoặc Toan hô hấp mạn trước đó (Delta Ratio > 2.0)';
          }
        }
      }
    }
  }

  // 3. Oxy Hóa Máu (Horovitz Index PaO2/FiO2)
  let pfRatio: number | null = null;
  let oxygenationStatus: string | null = null;

  if (typeof pao2 === 'number') {
    const decimalFio2 = fio2 > 1 ? fio2 / 100 : fio2;
    pfRatio = Math.round(pao2 / decimalFio2);

    if (pfRatio >= 300) {
      oxygenationStatus = `Oxy hóa máu bình thường (P/F = ${pfRatio} mmHg)`;
    } else if (pfRatio >= 200 && pfRatio < 300) {
      oxygenationStatus = `Giảm oxy hóa máu nhẹ / ARDS Nhẹ (P/F = ${pfRatio} mmHg)`;
      recommendations.push('Theo dõi sát hô hấp, đánh giá nhu cầu thở oxy hỗ trợ hoặc HFNC.');
    } else if (pfRatio >= 100 && pfRatio < 200) {
      oxygenationStatus = `Giảm oxy hóa máu trung bình / ARDS Trung bình (P/F = ${pfRatio} mmHg)`;
      recommendations.push('Cân nhắc thông khí không xâm lấn (NIV) hoặc đặt nội khí quản thở máy PEEP cao.');
    } else {
      oxygenationStatus = `Giảm oxy hóa máu NẶNG / ARDS Nặng (P/F = ${pfRatio} mmHg)`;
      recommendations.push('Tối khẩn: Đặt nội khí quản thở máy bảo vệ phổi (6 mL/kg PBW, PEEP cao, tư thế nằm sấp Prone Position).');
    }
  }

  // 4. Clinical Summary
  let summary = `[ABG Pro Studio Report]\n• Kết luận: ${primaryDisorder}\n• Bù trừ: ${compensationStatus}`;
  if (anionGapCorrected !== null) {
    summary += `\n• Anion Gap (hiệu chỉnh Albumin): ${anionGapCorrected.toFixed(1)} mmol/L (Bình thường: 8 - 12)`;
  }
  if (deltaRatioInterpretation) {
    summary += `\n• Delta Ratio (${deltaRatio?.toFixed(2)}): ${deltaRatioInterpretation}`;
  }
  if (oxygenationStatus) {
    summary += `\n• Oxy hóa: ${oxygenationStatus}`;
  }
  if (typeof lactate === 'number') {
    summary += `\n• Lactate: ${lactate} mmol/L ${lactate > 2 ? '(⚠️ TĂNG LACTATE MÁU)' : '(Bình thường)'}`;
  }

  return {
    primaryDisorder,
    compensationStatus,
    anionGap,
    anionGapCorrected,
    deltaRatio,
    deltaRatioInterpretation,
    pfRatio,
    oxygenationStatus,
    clinicalSummary: summary,
    recommendations,
    davenportCoords: { x: ph, y: hco3 },
  };
}

/**
 * Render đồ thị Davenport toan kiềm SVG thuần 6 Vùng Màu Đồ Họa Xuất Bản
 */
export function renderDavenportSvg(ph: number, hco3: number): string {
  const w = 520;
  const h = 320;
  const padL = 45;
  const padR = 30;
  const padT = 25;
  const padB = 40;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const minPh = 7.0;
  const maxPh = 7.8;
  const minHco3 = 5;
  const maxHco3 = 50;

  const getX = (valPh: number) => padL + ((valPh - minPh) / (maxPh - minPh)) * innerW;
  const getY = (valHco3: number) => padT + innerH - ((valHco3 - minHco3) / (maxHco3 - minHco3)) * innerH;

  const ptPh = Math.max(minPh, Math.min(maxPh, ph));
  const ptHco3 = Math.max(minHco3, Math.min(maxHco3, hco3));
  const ptX = getX(ptPh);
  const ptY = getY(ptHco3);

  // Helper vẽ Isobar PaCO2
  const drawIsobar = (pco2Val: number, strokeColor: string) => {
    const pts: string[] = [];
    for (let p = 7.0; p <= 7.8; p += 0.04) {
      const calcHco3 = 0.03 * pco2Val * Math.pow(10, p - 6.1);
      if (calcHco3 >= minHco3 && calcHco3 <= maxHco3) {
        pts.push(`${getX(p)},${getY(calcHco3)}`);
      }
    }
    return pts.length > 1 ? `<polyline fill="none" stroke="${strokeColor}" stroke-width="1.2" stroke-dasharray="3,3" points="${pts.join(' ')}" />` : '';
  };

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}">
      <defs>
        <radialGradient id="patientGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#ef4444" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- 6 VÙNG TOAN KIỀM LÂM SÀNG (6 CLINICAL ZONES) -->
      <!-- 1. Vùng Toan Chuyển Hóa (Metabolic Acidosis: pH < 7.35, HCO3 < 22) -->
      <polygon points="${getX(7.0)},${getY(5)} ${getX(7.35)},${getY(5)} ${getX(7.35)},${getY(22)} ${getX(7.0)},${getY(15)}" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" stroke-width="0.5" stroke-dasharray="2,2" />
      <text x="${getX(7.15)}" y="${getY(11)}" fill="#f59e0b" font-size="9" font-weight="700" text-anchor="middle">Toan Chuyển Hóa</text>

      <!-- 2. Vùng Kiềm Chuyển Hóa (Metabolic Alkalosis: pH > 7.45, HCO3 > 26) -->
      <polygon points="${getX(7.45)},${getY(26)} ${getX(7.8)},${getY(35)} ${getX(7.8)},${getY(50)} ${getX(7.45)},${getY(50)}" fill="rgba(2, 132, 199, 0.12)" stroke="#0284c7" stroke-width="0.5" stroke-dasharray="2,2" />
      <text x="${getX(7.62)}" y="${getY(42)}" fill="#0284c7" font-size="9" font-weight="700" text-anchor="middle">Kiềm Chuyển Hóa</text>

      <!-- 3. Vùng Toan Hô Hấp Cấp (Acute Resp Acidosis: pH < 7.35, HCO3 24-30) -->
      <polygon points="${getX(7.05)},${getY(24)} ${getX(7.35)},${getY(24)} ${getX(7.35)},${getY(30)} ${getX(7.05)},${getY(34)}" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="0.5" stroke-dasharray="2,2" />
      <text x="${getX(7.16)}" y="${getY(28)}" fill="#ef4444" font-size="8.5" font-weight="700" text-anchor="middle">Toan HH Cấp</text>

      <!-- 4. Vùng Toan Hô Hấp Mạn (Chronic Resp Acidosis: pH 7.30 - 7.38, HCO3 30 - 45) -->
      <polygon points="${getX(7.28)},${getY(30)} ${getX(7.38)},${getY(30)} ${getX(7.38)},${getY(45)} ${getX(7.28)},${getY(45)}" fill="rgba(220, 38, 38, 0.2)" stroke="#dc2626" stroke-width="0.5" stroke-dasharray="2,2" />
      <text x="${getX(7.33)}" y="${getY(38)}" fill="#dc2626" font-size="8.5" font-weight="700" text-anchor="middle">Toan HH Mạn</text>

      <!-- 5. Vùng Kiềm Hô Hấp (Resp Alkalosis: pH > 7.45, HCO3 15 - 24) -->
      <polygon points="${getX(7.45)},${getY(15)} ${getX(7.8)},${getY(15)} ${getX(7.8)},${getY(24)} ${getX(7.45)},${getY(24)}" fill="rgba(139, 92, 246, 0.12)" stroke="#8b5cf6" stroke-width="0.5" stroke-dasharray="2,2" />
      <text x="${getX(7.62)}" y="${getY(19)}" fill="#8b5cf6" font-size="9" font-weight="700" text-anchor="middle">Kiềm Hô Hấp</text>

      <!-- 6. Vùng Bình Thường (Normal Zone: pH 7.35 - 7.45, HCO3 22 - 26) -->
      <rect x="${getX(7.35)}" y="${getY(26)}" width="${getX(7.45) - getX(7.35)}" height="${getY(22) - getY(26)}" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="1.5" rx="3" />
      <text x="${(getX(7.35) + getX(7.45)) / 2}" y="${(getY(26) + getY(22)) / 2 + 3}" fill="#10b981" font-size="8.5" font-weight="800" text-anchor="middle">CHUẨN</text>

      <!-- Isobars PaCO2 (20, 40, 80 mmHg) -->
      ${drawIsobar(20, '#0284c7')}
      ${drawIsobar(40, '#10b981')}
      ${drawIsobar(80, '#ef4444')}
      <text x="${getX(7.68)}" y="${getY(16)}" fill="#0284c7" font-size="8" font-weight="700">PaCO2 20</text>
      <text x="${getX(7.55)}" y="${getY(28)}" fill="#10b981" font-size="8" font-weight="700">PaCO2 40</text>
      <text x="${getX(7.28)}" y="${getY(48)}" fill="#ef4444" font-size="8" font-weight="700">PaCO2 80</text>

      <!-- Axes -->
      <line x1="${padL}" y1="${padT + innerH}" x2="${w - padR}" y2="${padT + innerH}" stroke="var(--color-border)" stroke-width="1.5" />
      <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + innerH}" stroke="var(--color-border)" stroke-width="1.5" />

      <!-- X Ticks (pH) -->
      ${[7.0, 7.1, 7.2, 7.35, 7.4, 7.45, 7.6, 7.7, 7.8].map(p => `
        <text x="${getX(p)}" y="${h - 14}" fill="var(--color-text-muted)" font-size="8" text-anchor="middle">${p}</text>
      `).join('')}
      <text x="${w / 2}" y="${h - 2}" fill="var(--color-text)" font-size="10" font-weight="700" text-anchor="middle">pH Máu Động Mạch</text>

      <!-- Y Ticks (HCO3) -->
      ${[10, 20, 24, 30, 40, 50].map(v => `
        <text x="${padL - 6}" y="${getY(v) + 3}" fill="var(--color-text-muted)" font-size="8" text-anchor="end">${v}</text>
      `).join('')}
      <text x="14" y="${padT + innerH / 2}" fill="var(--color-text)" font-size="10" font-weight="700" text-anchor="middle" transform="rotate(-90 14 ${padT + innerH / 2})">HCO3- (mmol/L)</text>

      <!-- Patient Coordinate Point -->
      <circle cx="${ptX}" cy="${ptY}" r="16" fill="url(#patientGlow)" />
      <circle cx="${ptX}" cy="${ptY}" r="6.5" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
      <rect x="${ptX - 40}" y="${ptY - 26}" width="80" height="18" rx="4" fill="rgba(15, 23, 42, 0.85)" stroke="#ef4444" stroke-width="1" />
      <text x="${ptX}" y="${ptY - 14}" fill="#ffffff" font-size="9" font-weight="800" text-anchor="middle">BN (${ph} / ${hco3})</text>
    </svg>
  `;
}
