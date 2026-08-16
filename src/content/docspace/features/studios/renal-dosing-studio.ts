/**
 * DocSpace — Renal Function & Drug Dosing Studio (TypeScript)
 * Đa Công Thức CKD-EPI 2021 / Cockcroft-Gault & Bảng Hiệu Chỉnh Liều Thuốc Tự Động
 */

export interface RenalInputs {
  age: number;
  gender: 'male' | 'female';
  weightKg: number;
  heightCm?: number;
  serumCreatinineUmol: number; // umol/L (chuẩn 60 - 110)
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

  // 4. Bảng Hiệu Chỉnh Liều Thuốc Dựa trên eGFR / CrCl
  const drugAdjustments: DrugDosingRecommendation[] = [];

  // Meropenem
  if (crCl >= 50) {
    drugAdjustments.push({
      drugName: 'Meropenem',
      category: 'Kháng sinh Carbapenem',
      standardDose: '1g IV mỗi 8h (hoặc 2g IV mỗi 8h trong Viêm màng não)',
      adjustedDose: 'Không cần chỉnh liều (1g IV mỗi 8h)',
      monitoringWarning: 'Truyền kéo dài 3 giờ để tối ưu PK/PD Time > MIC.',
    });
  } else if (crCl >= 26) {
    drugAdjustments.push({
      drugName: 'Meropenem',
      category: 'Kháng sinh Carbapenem',
      standardDose: '1g IV mỗi 8h',
      adjustedDose: '1g IV mỗi 12 giờ',
      monitoringWarning: 'Giảm tần suất dùng thuốc theo CrCl 26 - 50 mL/p.',
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
      adjustedDose: 'Liều chuẩn không cần giảm',
      monitoringWarning: 'Theo dõi dấu hiệu xuất huyết.',
    });
  } else if (crCl >= 15) {
    drugAdjustments.push({
      drugName: 'Enoxaparin (Lovenox)',
      category: 'Thuốc chống đông LMWH',
      standardDose: '1 mg/kg SC mỗi 12h',
      adjustedDose: 'Giảm liều còn 1 mg/kg SC MỖI 24 GIỜ (1 lần/ngày)',
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
      adjustedDose: 'Dùng liều tối đa thông thường (tối đa 2000-2550 mg/ngày)',
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
  if (crCl >= 50) {
    drugAdjustments.push({
      drugName: 'Vancomycin',
      category: 'Kháng sinh Glycopeptide',
      standardDose: '15 - 20 mg/kg IV mỗi 8 - 12h',
      adjustedDose: '15 - 20 mg/kg IV mỗi 12 giờ',
      monitoringWarning: 'Đo nồng độ đáy Trough trước liều thứ 4 (đích 15 - 20 mcg/mL hoặc AUC/MIC 400 - 600).',
    });
  } else if (crCl >= 20) {
    drugAdjustments.push({
      drugName: 'Vancomycin',
      category: 'Kháng sinh Glycopeptide',
      standardDose: '15 - 20 mg/kg IV mỗi 12h',
      adjustedDose: '15 mg/kg IV mỗi 24 - 48 giờ',
      monitoringWarning: 'Bắt buộc theo dõi nồng độ thuốc TDM trước mỗi liều.',
    });
  } else {
    drugAdjustments.push({
      drugName: 'Vancomycin',
      category: 'Kháng sinh Glycopeptide',
      standardDose: '15 - 20 mg/kg IV mỗi 12h',
      adjustedDose: 'Liều nạp 15 - 25 mg/kg, sau đó chỉ dùng liều tiếp theo khi nồng độ đáy < 15 mcg/mL',
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
      monitoringWarning: 'Hiệu quả hạ đường huyết giảm khi eGFR < 45, nhưng LỢI ÍCH BẢO VỆ TIM & THẬN VẪN DUY TRÌ đến eGFR ≥ 20.',
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
