/**
 * DocSpace — Sepsis & Pneumonia Studio (TypeScript)
 * Đánh Giá Sốc Nhiễm Khuẩn (qSOFA, SOFA) & Viêm Phổi Nặng (CURB-65, SMART-COP) & Phác Đồ Kháng Sinh Kinh Nghiệm
 */

export interface SepsisPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  values: SepsisInputs;
}

export interface SepsisInputs {
  age: number;
  respiratoryRate: number; // l/p
  systolicBp: number;      // mmHg
  diastolicBp: number;     // mmHg
  gcs: number;             // 3 - 15
  pao2Fio2Ratio: number;   // mmHg
  plateletsK: number;      // G/L (k/uL)
  bilirubinUmol: number;   // umol/L
  serumCreatinineUmol: number; // umol/L
  serumLactateMmol: number;    // mmol/L
  vasopressorNeed: boolean;    // Cần Noradrenaline
  isPseudomonasRisk: boolean;  // Đã nằm viện > 5 ngày, dùng kháng sinh gần đây, giãn phế quản
  isMrsaRisk: boolean;         // Có tiền sử MRSA, đặt catheter tĩnh mạch trung tâm, lọc máu
}

export interface SepsisAnalysisResult {
  qsofaScore: number;
  sofaScore: number;
  curb65Score: number;
  smartCopScore: number;
  sepsisClassification: string;
  sepsisColor: string;
  icuCareRecommendation: string;
  antibioticRegimen: string;
  clinicalSummary: string;
  treatmentChecklist: string[];
}

export const SEPSIS_PRESETS: SepsisPreset[] = [
  {
    id: 'septic_shock_icu',
    name: 'Sốc Nhiễm Khuẩn Bụng Cấp (Hour-1 Bundle)',
    badge: 'Tối Khẩn: MAP < 65 & Lactate > 4',
    badgeColor: '#dc2626',
    description: 'Bệnh nhân thủng tạng rỗng, HA tụt 80/45 mmHg, Lactate 4.8 mmol/L, cần Noradrenaline và Meropenem.',
    values: { age: 62, respiratoryRate: 28, systolicBp: 82, diastolicBp: 45, gcs: 13, pao2Fio2Ratio: 220, plateletsK: 85, bilirubinUmol: 38, serumCreatinineUmol: 240, serumLactateMmol: 4.8, vasopressorNeed: true, isPseudomonasRisk: true, isMrsaRisk: false },
  },
  {
    id: 'severe_cap_icu',
    name: 'Viêm Phổi Cộng Đồng Nặng Nhập ICU',
    badge: 'CURB-65 = 4 | SMART-COP = 6',
    badgeColor: '#ef4444',
    description: 'Cụ ông 74 tuổi thở co kéo 34 l/p, P/F 160 mmHg, lơ mơ. Cần thở máy xâm lấn và kháng sinh phối hợp.',
    values: { age: 74, respiratoryRate: 34, systolicBp: 88, diastolicBp: 50, gcs: 12, pao2Fio2Ratio: 160, plateletsK: 140, bilirubinUmol: 18, serumCreatinineUmol: 180, serumLactateMmol: 2.8, vasopressorNeed: false, isPseudomonasRisk: false, isMrsaRisk: false },
  },
  {
    id: 'pseudomonas_mrsa_vap',
    name: 'Viêm Phổi Thở Máy / Nguy Cơ Pseudomonas & MRSA',
    badge: 'Đa Đề Kháng HAP/VAP',
    badgeColor: '#8b5cf6',
    description: 'Nằm ICU ngày thứ 8 sốt cao đờm mủ, cần bao phủ đồng thời MRSA (Vancomycin) và Trực khuẩn mủ xanh.',
    values: { age: 55, respiratoryRate: 26, systolicBp: 95, diastolicBp: 60, gcs: 14, pao2Fio2Ratio: 190, plateletsK: 110, bilirubinUmol: 25, serumCreatinineUmol: 160, serumLactateMmol: 2.2, vasopressorNeed: false, isPseudomonasRisk: true, isMrsaRisk: true },
  },
  {
    id: 'urosepsis_ward',
    name: 'Nhiễm Khuẩn Huyết Đường Tiết Niệu (Urosepsis)',
    badge: 'qSOFA = 2 | Theo Dõi Sát',
    badgeColor: '#f59e0b',
    description: 'Nữ 68 tuổi sốt rét run, tiểu buốt, HA 95/60 mmHg, thở 24 l/p. Cần cấy máu và Ceftriaxone/Ciprofloxacin sớm.',
    values: { age: 68, respiratoryRate: 24, systolicBp: 95, diastolicBp: 60, gcs: 15, pao2Fio2Ratio: 350, plateletsK: 180, bilirubinUmol: 14, serumCreatinineUmol: 120, serumLactateMmol: 2.1, vasopressorNeed: false, isPseudomonasRisk: false, isMrsaRisk: false },
  },
];

export function analyzeSepsis(inputs: SepsisInputs): SepsisAnalysisResult {
  const {
    age,
    respiratoryRate,
    systolicBp,
    diastolicBp,
    gcs,
    pao2Fio2Ratio,
    plateletsK,
    bilirubinUmol,
    serumCreatinineUmol,
    serumLactateMmol,
    vasopressorNeed,
    isPseudomonasRisk,
    isMrsaRisk,
  } = inputs;

  const treatmentChecklist: string[] = [];

  // 1. Tính qSOFA (0 - 3)
  let qsofa = 0;
  if (respiratoryRate >= 22) qsofa++;
  if (systolicBp <= 100) qsofa++;
  if (gcs < 15) qsofa++;

  // 2. Tính SOFA Score (0 - 24)
  let sofa = 0;
  // Hô hấp
  if (pao2Fio2Ratio < 100) sofa += 4;
  else if (pao2Fio2Ratio < 200) sofa += 3;
  else if (pao2Fio2Ratio < 300) sofa += 2;
  else if (pao2Fio2Ratio < 400) sofa += 1;

  // Tiểu cầu
  if (plateletsK < 20) sofa += 4;
  else if (plateletsK < 50) sofa += 3;
  else if (plateletsK < 100) sofa += 2;
  else if (plateletsK < 150) sofa += 1;

  // Bilirubin
  if (bilirubinUmol >= 204) sofa += 4;
  else if (bilirubinUmol >= 102) sofa += 3;
  else if (bilirubinUmol >= 33) sofa += 2;
  else if (bilirubinUmol >= 20) sofa += 1;

  // Tim mạch
  if (vasopressorNeed) sofa += 3;
  else {
    const map = (systolicBp + 2 * diastolicBp) / 3;
    if (map < 70) sofa += 1;
  }

  // Thần kinh
  if (gcs < 6) sofa += 4;
  else if (gcs <= 9) sofa += 3;
  else if (gcs <= 12) sofa += 2;
  else if (gcs <= 14) sofa += 1;

  // Thận
  if (serumCreatinineUmol >= 440) sofa += 4;
  else if (serumCreatinineUmol >= 300) sofa += 3;
  else if (serumCreatinineUmol >= 170) sofa += 2;
  else if (serumCreatinineUmol >= 110) sofa += 1;

  // 3. Tính CURB-65 (0 - 5)
  let curb = 0;
  if (gcs < 15) curb++;
  if (serumCreatinineUmol > 150) curb++; // Thay thế Bun > 7 mmol/L
  if (respiratoryRate >= 30) curb++;
  if (systolicBp < 90 || diastolicBp <= 60) curb++;
  if (age >= 65) curb++;

  // 4. Tính SMART-COP (0 - 8)
  let smart = 0;
  if (systolicBp < 90) smart += 2;
  if (pao2Fio2Ratio < 250) smart += 2; // hoặc < 333 nếu age > 50
  if (respiratoryRate >= 30) smart += 1;
  if (gcs < 15) smart += 1;
  if (plateletsK < 100) smart += 1;
  if (age >= 65) smart += 1;

  // Phân tầng nguy cơ
  let sepsisClassification = 'Nhiễm trùng chưa có dấu hiệu suy đa cơ quan';
  let sepsisColor = '#10b981';
  let icuCare = 'Điều trị tại Khoa Nội / Ngoại thông thường.';

  if (vasopressorNeed || (systolicBp < 90 && serumLactateMmol >= 2.0)) {
    sepsisClassification = '🚨 SỐC NHIỄM KHUẨN (Septic Shock — Tụt huyết áp cần vận mạch & Lactate > 2)';
    sepsisColor = '#dc2626';
    icuCare = 'CHỈ ĐỊNH NHẬP ICU KHẨN CẤP — Kích hoạt Gói Sống Còn Giờ Đầu (Hour-1 Bundle).';
    treatmentChecklist.push('1. Đo Lactate máu ngay (lặp lại sau 2-4h nếu ban đầu > 2 mmol/L).');
    treatmentChecklist.push('2. Cấy 2 bộ máu trước khi truyền kháng sinh.');
    treatmentChecklist.push('3. Kháng sinh phổ rộng đường tĩnh mạch TRONG VÒNG 1 GIỜ ĐẦU.');
    treatmentChecklist.push('4. Bù dịch tinh thể 30 mL/kg trong 3 giờ đầu nếu có tụt HA hoặc Lactate ≥ 4.');
    treatmentChecklist.push('5. Khởi động Noradrenaline sớm nếu MAP < 65 mmHg sau bù dịch.');
  } else if (sofa >= 2 || qsofa >= 2) {
    sepsisClassification = '⚠️ NHIỄM KHUẨN HUYẾT (Sepsis — Rối loạn chức năng cơ quan đe dọa tính mạng)';
    sepsisColor = '#ef4444';
    icuCare = 'Cần theo dõi sát tại đơn vị Hồi sức Cấp cứu (ICU/HDU).';
    treatmentChecklist.push('Kháng sinh tĩnh mạch sớm trong 1 giờ đầu, theo dõi sát sinh hiệu mỗi 1-2h.');
  } else if (curb >= 3 || smart >= 5) {
    sepsisClassification = 'VIÊM PHỔI NẶNG (High Risk CAP — CURB-65 ≥ 3 hoặc SMART-COP ≥ 5)';
    sepsisColor = '#f59e0b';
    icuCare = 'Chỉ định nhập viện theo dõi tại ICU / Phòng Hồi sức Cấp cứu.';
  }

  // Gợi ý kháng sinh kinh nghiệm
  let antibioticRegimen = '';
  if (isPseudomonasRisk && isMrsaRisk) {
    antibioticRegimen = 'Phối hợp 3 thuốc (MRSA + 2 Kháng Pseudomonas): Vancomycin 15-20mg/kg q12h + Meropenem 1g q8h + Ciprofloxacin 400mg q8h (hoặc Amikacin 15-20mg/kg/ngày).';
  } else if (isPseudomonasRisk) {
    antibioticRegimen = 'Kháng sinh chống Trực khuẩn mủ xanh: Piperacillin/Tazobactam 4.5g q6h (truyền 3-4h) HOẶC Meropenem 1g q8h + Levofloxacin 750mg q24h.';
  } else if (isMrsaRisk) {
    antibioticRegimen = 'Bổ sung kháng MRSA: Vancomycin 15-20mg/kg q12h (hoặc Linezolid 600mg q12h) + Ceftriaxone 2g/ngày.';
  } else if (curb >= 2 || sofa >= 2) {
    antibioticRegimen = 'Phác đồ Viêm phổi nặng / Sepsis cộng đồng chuẩn: Ceftriaxone 2g IV q24h (hoặc Cefotaxime 2g q8h) + Azithromycin 500mg IV/PO q24h (hoặc Levofloxacin 750mg).';
  } else {
    antibioticRegimen = 'Nhiễm khuẩn cộng đồng thông thường: Augmentin 1g PO q12h HOẶC Cefuroxime 500mg PO q12h ± Macrolide.';
  }

  // Clinical Summary
  let summary = `[Sepsis & Pneumonia Studio Report]\n• Phân tầng: ${sepsisClassification}`;
  summary += `\n• Điểm số: SOFA = ${sofa}đ | qSOFA = ${qsofa}đ | CURB-65 = ${curb}đ | SMART-COP = ${smart}đ`;
  summary += `\n• Xử trí: ${icuCare}`;
  summary += `\n• Kháng sinh kinh nghiệm gợi ý: ${antibioticRegimen}`;

  return {
    qsofaScore: qsofa,
    sofaScore: sofa,
    curb65Score: curb,
    smartCopScore: smart,
    sepsisClassification,
    sepsisColor,
    icuCareRecommendation: icuCare,
    antibioticRegimen,
    clinicalSummary: summary,
    treatmentChecklist,
  };
}
