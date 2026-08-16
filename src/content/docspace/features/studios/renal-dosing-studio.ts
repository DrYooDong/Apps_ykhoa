/**
 * DocSpace — Renal Function & Drug Dosing Studio (TypeScript)
 * CKD-EPI 2021, Cockcroft-Gault, Đồng Hồ Bán Nguyệt KDIGO Gauge SVG & Bảng Hiệu Chỉnh Liều Kháng Sinh
 */

export interface RenalPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  values: RenalInputs;
}

export interface RenalInputs {
  age: number;
  gender: 'male' | 'female';
  weightKg: number;
  heightCm?: number;
  serumCreatinineUmol: number;
}

export interface DrugDosingRecommendation {
  drugName: string;
  category: string;
  standardDose: string;
  adjustedDose: string;
  monitoringWarning: string;
  isContraindicated?: boolean;
}

export interface RenalAnalysisResult {
  ckdEpi2021: number;
  cockcroftGault: number;
  kdigoStage: string;
  kdigoStageColor: string;
  kdigoDescription: string;
  drugAdjustments: DrugDosingRecommendation[];
  clinicalSummary: string;
}

export const RENAL_PRESETS: RenalPreset[] = [
  {
    id: 'young_normal',
    name: 'Người Trẻ Chức Năng Thận Bình Thường',
    badge: 'KDIGO G1 (eGFR ≥ 90)',
    badgeColor: '#10b981',
    description: 'Nam 28 tuổi, 65kg, Creatinine 75 umol/L. Dùng đủ liều kháng sinh tiêu chuẩn.',
    values: { age: 28, gender: 'male', weightKg: 65, serumCreatinineUmol: 75 },
  },
  {
    id: 'elderly_ckd3b',
    name: 'Bệnh Nhân ĐTĐ Lớn Tuổi (CKD G3b)',
    badge: 'KDIGO G3b (eGFR 30-44)',
    badgeColor: '#f59e0b',
    description: 'Nữ 68 tuổi, 52kg, Creatinine 150 umol/L. Cần giảm liều Metformin và chỉnh khoảng cách Meropenem.',
    values: { age: 68, gender: 'female', weightKg: 52, serumCreatinineUmol: 150 },
  },
  {
    id: 'severe_ckd4',
    name: 'Suy Thận Nặng (CKD G4)',
    badge: 'KDIGO G4 (eGFR 15-29)',
    badgeColor: '#ef4444',
    description: 'Nam 72 tuổi, 58kg, Creatinine 260 umol/L. Giảm 50% liều Enoxaparin, chống chỉ định Metformin.',
    values: { age: 72, gender: 'male', weightKg: 58, serumCreatinineUmol: 260 },
  },
  {
    id: 'esrd_dialysis',
    name: 'Suy Thận Giai Đoạn Cuối (ESRD G5)',
    badge: 'KDIGO G5 (eGFR < 15)',
    badgeColor: '#dc2626',
    description: 'Bệnh nhân lọc máu chu kỳ, Creatinine 650 umol/L. Chống chỉ định Enoxaparin/Metformin, bổ sung liều sau lọc máu.',
    values: { age: 60, gender: 'male', weightKg: 60, serumCreatinineUmol: 650 },
  },
];

export function analyzeRenalFunction(inputs: RenalInputs): RenalAnalysisResult {
  const { age, gender, weightKg, serumCreatinineUmol } = inputs;

  const scrMgDl = serumCreatinineUmol / 88.4;
  const isFemale = gender === 'female';

  // 1. CKD-EPI 2021 (Race-Free Refit)
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const minRatio = Math.min(scrMgDl / kappa, 1);
  const maxRatio = Math.max(scrMgDl / kappa, 1);
  const femaleFactor = isFemale ? 1.012 : 1.0;

  const ckdEpi = Math.round(
    142 *
    Math.pow(minRatio, alpha) *
    Math.pow(maxRatio, -1.200) *
    Math.pow(0.9938, age) *
    femaleFactor
  );

  // 2. Cockcroft-Gault CrCl (mL/min)
  let crCl = Math.round((((140 - age) * weightKg) / (72 * scrMgDl)) * (isFemale ? 0.85 : 1.0));
  if (crCl < 0) crCl = 0;

  // 3. Phân độ KDIGO CKD Stage
  let kdigoStage = 'G1';
  let kdigoStageColor = '#10b981';
  let kdigoDescription = 'Chức năng thận bình thường hoặc tăng (eGFR ≥ 90)';

  if (ckdEpi >= 90) {
    kdigoStage = 'G1';
    kdigoStageColor = '#10b981';
    kdigoDescription = 'Bình thường hoặc cao (eGFR ≥ 90 mL/p/1.73m²)';
  } else if (ckdEpi >= 60) {
    kdigoStage = 'G2';
    kdigoStageColor = '#10b981';
    kdigoDescription = 'Giảm nhẹ (eGFR 60 - 89 mL/p/1.73m²)';
  } else if (ckdEpi >= 45) {
    kdigoStage = 'G3a';
    kdigoStageColor = '#f59e0b';
    kdigoDescription = 'Giảm nhẹ đến trung bình (eGFR 45 - 59 mL/p/1.73m²)';
  } else if (ckdEpi >= 30) {
    kdigoStage = 'G3b';
    kdigoStageColor = '#f59e0b';
    kdigoDescription = 'Giảm trung bình đến nặng (eGFR 30 - 44 mL/p/1.73m²)';
  } else if (ckdEpi >= 15) {
    kdigoStage = 'G4';
    kdigoStageColor = '#ef4444';
    kdigoDescription = 'Giảm nặng (eGFR 15 - 29 mL/p/1.73m²)';
  } else {
    kdigoStage = 'G5';
    kdigoStageColor = '#dc2626';
    kdigoDescription = 'Suy thận giai đoạn cuối / Cần lọc máu (eGFR < 15 mL/p/1.73m²)';
  }

  // 4. Bảng Hiệu Chỉnh Liều Thuốc
  const drugAdjustments: DrugDosingRecommendation[] = [];

  // Meropenem
  if (crCl >= 50) {
    drugAdjustments.push({
      drugName: 'Meropenem',
      category: 'Kháng sinh Carbapenem',
      standardDose: '1g IV mỗi 8h (hoặc 2g IV mỗi 8h trong Viêm màng não)',
      adjustedDose: 'Không cần chỉnh liều: 1g IV mỗi 8h',
      monitoringWarning: 'Truyền kéo dài 3 giờ để tối ưu PK/PD Time > MIC.',
    });
  } else if (crCl >= 26) {
    drugAdjustments.push({
      drugName: 'Meropenem',
      category: 'Kháng sinh Carbapenem',
      standardDose: '1g IV mỗi 8h',
      adjustedDose: '1g IV mỗi 12 giờ',
      monitoringWarning: 'Kéo dài khoảng cách dùng thuốc theo CrCl 26 - 50 mL/p.',
    });
  } else if (crCl >= 10) {
    drugAdjustments.push({
      drugName: 'Meropenem',
      category: 'Kháng sinh Carbapenem',
      standardDose: '1g IV mỗi 8h',
      adjustedDose: '500mg IV mỗi 12 giờ',
      monitoringWarning: 'Giảm cả liều và tần suất dùng thuốc.',
    });
  } else {
    drugAdjustments.push({
      drugName: 'Meropenem',
      category: 'Kháng sinh Carbapenem',
      standardDose: '1g IV mỗi 8h',
      adjustedDose: '500mg IV mỗi 24 giờ (bổ sung sau lọc máu)',
      monitoringWarning: 'Nguy cơ tích lũy thuốc gây co giật thần kinh.',
    });
  }

  // Enoxaparin
  if (crCl >= 30) {
    drugAdjustments.push({
      drugName: 'Enoxaparin (Lovenox)',
      category: 'Thuốc chống đông LMWH',
      standardDose: '1 mg/kg SC mỗi 12h (hoặc 1.5 mg/kg mỗi 24h)',
      adjustedDose: `Liều chuẩn: ${(weightKg * 1).toFixed(0)} mg SC mỗi 12h`,
      monitoringWarning: 'Theo dõi dấu hiệu xuất huyết.',
    });
  } else if (crCl >= 15) {
    drugAdjustments.push({
      drugName: 'Enoxaparin (Lovenox)',
      category: 'Thuốc chống đông LMWH',
      standardDose: '1 mg/kg SC mỗi 12h',
      adjustedDose: `Giảm liều còn ${(weightKg * 1).toFixed(0)} mg SC MỖI 24 GIỜ (1 lần/ngày)`,
      monitoringWarning: 'Chỉnh liều bắt buộc do thuốc thải trừ qua thận; cân nhắc đổi sang Heparin không phân đoạn UFH.',
    });
  } else {
    drugAdjustments.push({
      drugName: 'Enoxaparin (Lovenox)',
      category: 'Thuốc chống đông LMWH',
      standardDose: '1 mg/kg SC mỗi 12h',
      adjustedDose: 'CHỐNG CHỈ ĐỊNH (CrCl < 15) — Đổi sang Heparin tiêu chuẩn (UFH)',
      monitoringWarning: 'Nguy cơ tích lũy thuốc gây xuất huyết đe dọa tính mạng.',
      isContraindicated: true,
    });
  }

  // Metformin
  if (ckdEpi >= 60) {
    drugAdjustments.push({
      drugName: 'Metformin',
      category: 'Thuốc hạ đường huyết Biguanide',
      standardDose: '1000 - 2000 mg/ngày chia 2 lần',
      adjustedDose: 'Dùng liều thông thường (tối đa 2000-2550 mg/ngày)',
      monitoringWarning: 'Theo dõi chức năng thận định kỳ hàng năm.',
    });
  } else if (ckdEpi >= 45) {
    drugAdjustments.push({
      drugName: 'Metformin',
      category: 'Thuốc hạ đường huyết Biguanide',
      standardDose: '2000 mg/ngày',
      adjustedDose: 'Giới hạn liều tối đa 1500 mg/ngày (chia 2 lần)',
      monitoringWarning: 'Đánh giá lại eGFR mỗi 3 - 6 tháng.',
    });
  } else if (ckdEpi >= 30) {
    drugAdjustments.push({
      drugName: 'Metformin',
      category: 'Thuốc hạ đường huyết Biguanide',
      standardDose: '2000 mg/ngày',
      adjustedDose: 'Giới hạn liều tối đa 500 - 1000 mg/ngày. KHÔNG KHỞI ĐẦU MỚI.',
      monitoringWarning: 'Nguy cơ toan chuyển hóa Acid Lactic (Lactic Acidosis).',
    });
  } else {
    drugAdjustments.push({
      drugName: 'Metformin',
      category: 'Thuốc hạ đường huyết Biguanide',
      standardDose: '2000 mg/ngày',
      adjustedDose: 'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI (eGFR < 30 mL/p)',
      monitoringWarning: 'Ngừng ngay Metformin, chuyển sang Insulin tiêm.',
      isContraindicated: true,
    });
  }

  // Vancomycin
  const vancoDoseMg = Math.round(weightKg * 17.5);
  if (crCl >= 50) {
    drugAdjustments.push({
      drugName: 'Vancomycin',
      category: 'Kháng sinh Glycopeptide',
      standardDose: '15 - 20 mg/kg IV mỗi 8 - 12h',
      adjustedDose: `${vancoDoseMg} mg (${Math.round(weightKg * 15)} - ${Math.round(weightKg * 20)}mg) IV mỗi 12 giờ`,
      monitoringWarning: 'Đo nồng độ đáy Trough trước liều thứ 4 (đích 15 - 20 mcg/mL hoặc AUC/MIC 400 - 600).',
    });
  } else if (crCl >= 20) {
    drugAdjustments.push({
      drugName: 'Vancomycin',
      category: 'Kháng sinh Glycopeptide',
      standardDose: '15 - 20 mg/kg IV mỗi 12h',
      adjustedDose: `${vancoDoseMg} mg IV mỗi 24 - 48 giờ`,
      monitoringWarning: 'Bắt buộc theo dõi nồng độ thuốc TDM trước mỗi liều.',
    });
  } else {
    drugAdjustments.push({
      drugName: 'Vancomycin',
      category: 'Kháng sinh Glycopeptide',
      standardDose: '15 - 20 mg/kg IV mỗi 12h',
      adjustedDose: `Liều nạp ${Math.round(weightKg * 20)}mg, sau đó chỉ dùng liều tiếp khi nồng độ đáy < 15 mcg/mL`,
      monitoringWarning: 'Độc tính cao trên thận và tai.',
    });
  }

  // SGLT2i
  if (ckdEpi >= 20) {
    drugAdjustments.push({
      drugName: 'Dapagliflozin / Empagliflozin',
      category: 'Thuốc ức chế SGLT2 (Bảo vệ thận & tim)',
      standardDose: '10 mg uống mỗi ngày 1 lần',
      adjustedDose: '10 mg uống mỗi ngày 1 lần (Không cần chỉnh liều)',
      monitoringWarning: 'LỢI ÍCH BẢO VỆ TIM & THẬN VẪN DUY TRÌ đến eGFR ≥ 20 mL/p.',
    });
  } else {
    drugAdjustments.push({
      drugName: 'Dapagliflozin / Empagliflozin',
      category: 'Thuốc ức chế SGLT2',
      standardDose: '10 mg uống mỗi ngày 1 lần',
      adjustedDose: 'Không khuyến cáo khởi trị khi eGFR < 20 mL/p',
      monitoringWarning: 'Thiếu dữ liệu an toàn ở bệnh nhân lọc máu.',
    });
  }

  // Clinical Summary
  let summary = `[Renal & Dosing Report]\n• Bệnh nhân: ${age}t (${gender === 'male' ? 'Nam' : 'Nữ'}), ${weightKg}kg | Creatinine: ${serumCreatinineUmol} umol/L (${scrMgDl.toFixed(2)} mg/dL)`;
  summary += `\n• CKD-EPI 2021: ${ckdEpi} mL/p/1.73m² ➔ Giai đoạn ${kdigoStage} (${kdigoDescription})`;
  summary += `\n• Cockcroft-Gault: CrCl = ${crCl} mL/phút`;
  summary += `\n• Gợi ý chỉnh liều: ${drugAdjustments.map(d => `${d.drugName}: ${d.adjustedDose}`).join(' | ')}`;

  return {
    ckdEpi2021: ckdEpi,
    cockcroftGault: crCl,
    kdigoStage,
    kdigoStageColor,
    kdigoDescription,
    drugAdjustments,
    clinicalSummary: summary,
  };
}

/**
 * Render Đồng Hồ Bán Nguyệt KDIGO Gauge SVG
 */
export function renderKdigoGaugeSvg(egfr: number): string {
  const w = 360;
  const h = 200;
  const cx = w / 2;
  const cy = 160;
  const r = 120;

  // Tính góc kim từ eGFR (0 -> 120) tương ứng 180° đến 0°
  const clampedEgfr = Math.max(0, Math.min(120, egfr));
  const angleDeg = 180 - (clampedEgfr / 120) * 180;
  const rad = (angleDeg * Math.PI) / 180;

  const needleX = cx + (r - 20) * Math.cos(rad);
  const needleY = cy - (r - 20) * Math.sin(rad);

  const getPt = (val: number, radius: number) => {
    const a = (180 - (Math.max(0, Math.min(120, val)) / 120) * 180) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(a), y: cy - radius * Math.sin(a) };
  };

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}">
      <defs>
        <radialGradient id="kdigoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- KDIGO Arcs -->
      <!-- G5 (0-15) Red -->
      <path d="M ${getPt(0, r).x} ${getPt(0, r).y} A ${r} ${r} 0 0 1 ${getPt(15, r).x} ${getPt(15, r).y} L ${getPt(15, r - 25).x} ${getPt(15, r - 25).y} A ${r - 25} ${r - 25} 0 0 0 ${getPt(0, r - 25).x} ${getPt(0, r - 25).y} Z" fill="#dc2626" opacity="0.85" />
      
      <!-- G4 (15-30) Orange-Red -->
      <path d="M ${getPt(15, r).x} ${getPt(15, r).y} A ${r} ${r} 0 0 1 ${getPt(30, r).x} ${getPt(30, r).y} L ${getPt(30, r - 25).x} ${getPt(30, r - 25).y} A ${r - 25} ${r - 25} 0 0 0 ${getPt(15, r - 25).x} ${getPt(15, r - 25).y} Z" fill="#ef4444" opacity="0.85" />

      <!-- G3b/G3a (30-60) Yellow -->
      <path d="M ${getPt(30, r).x} ${getPt(30, r).y} A ${r} ${r} 0 0 1 ${getPt(60, r).x} ${getPt(60, r).y} L ${getPt(60, r - 25).x} ${getPt(60, r - 25).y} A ${r - 25} ${r - 25} 0 0 0 ${getPt(30, r - 25).x} ${getPt(30, r - 25).y} Z" fill="#f59e0b" opacity="0.85" />

      <!-- G2/G1 (60-120) Green -->
      <path d="M ${getPt(60, r).x} ${getPt(60, r).y} A ${r} ${r} 0 0 1 ${getPt(120, r).x} ${getPt(120, r).y} L ${getPt(120, r - 25).x} ${getPt(120, r - 25).y} A ${r - 25} ${r - 25} 0 0 0 ${getPt(60, r - 25).x} ${getPt(60, r - 25).y} Z" fill="#10b981" opacity="0.85" />

      <!-- Stage Labels -->
      <text x="${getPt(7.5, r - 35).x}" y="${getPt(7.5, r - 35).y}" fill="#dc2626" font-size="8.5" font-weight="800" text-anchor="middle">G5</text>
      <text x="${getPt(22.5, r - 35).x}" y="${getPt(22.5, r - 35).y}" fill="#ef4444" font-size="8.5" font-weight="800" text-anchor="middle">G4</text>
      <text x="${getPt(45, r - 35).x}" y="${getPt(45, r - 35).y}" fill="#f59e0b" font-size="8.5" font-weight="800" text-anchor="middle">G3</text>
      <text x="${getPt(90, r - 35).x}" y="${getPt(90, r - 35).y}" fill="#10b981" font-size="8.5" font-weight="800" text-anchor="middle">G1-G2</text>

      <!-- Gauge Needle -->
      <line x1="${cx}" y1="${cy}" x2="${needleX}" y2="${needleY}" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="${cx}" cy="${cy}" r="12" fill="url(#kdigoGlow)" />
      <circle cx="${cx}" cy="${cy}" r="6" fill="#0f172a" stroke="#ffffff" stroke-width="2" />

      <!-- Display Value in Center -->
      <text x="${cx}" y="${cy + 25}" fill="var(--color-text)" font-size="14" font-weight="900" text-anchor="middle">${egfr} <tspan font-size="9" fill="var(--color-text-muted)">mL/p</tspan></text>
    </svg>
  `;
}
