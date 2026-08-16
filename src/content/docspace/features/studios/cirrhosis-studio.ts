/**
 * DocSpace — Cirrhosis & Liver Studio (TypeScript)
 * Đánh Giá Xơ Gan & Suy Gan Toàn Diện: Child-Pugh, MELD-Na 2016, FIB-4, ALBI & Phác Đồ Xuất Huyết TMTQ / SBP
 */

export interface CirrhosisPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  values: CirrhosisInputs;
}

export interface CirrhosisInputs {
  age: number;
  bilirubinUmol: number;  // umol/L
  albuminGPerL: number;   // g/L (chuẩn 35 - 50)
  inr: number;
  serumCreatinineUmol: number; // umol/L
  serumNaMmol: number;    // mmol/L
  astUPerL: number;       // U/L
  altUPerL: number;       // U/L
  plateletsK: number;     // G/L
  ascites: 'none' | 'mild' | 'moderate_severe';
  encephalopathy: 'none' | 'grade_1_2' | 'grade_3_4';
  isDialysisTwiceLastWeek: boolean;
}

export interface CirrhosisAnalysisResult {
  childPughScore: number;
  childPughClass: 'A' | 'B' | 'C';
  childPughClassLabel: string;
  childPughColor: string;
  meldScore: number;
  meldNaScore: number;
  meldMortality3Month: string;
  fib4Score: number;
  fib4Interpretation: string;
  albiScore: number;
  albiGrade: string;
  varicealBleedingProtocol: string;
  sbpProtocol: string;
  clinicalSummary: string;
  recommendations: string[];
}

export const CIRRHOSIS_PRESETS: CirrhosisPreset[] = [
  {
    id: 'decompensated_child_c',
    name: 'Xơ Gan Mất Bù Nặng (Child-Pugh C | MELD-Na 28)',
    badge: 'Nguy Cơ Tử Vong 3 Tháng > 50%',
    badgeColor: '#dc2626',
    description: 'Bệnh nhân vàng da đậm, báng bụng to căng, lơ mơ chậm chạp, INR 2.1, Natri 124 mmol/L.',
    values: { age: 56, bilirubinUmol: 85, albuminGPerL: 24, inr: 2.1, serumCreatinineUmol: 180, serumNaMmol: 124, astUPerL: 95, altUPerL: 60, plateletsK: 65, ascites: 'moderate_severe', encephalopathy: 'grade_1_2', isDialysisTwiceLastWeek: false },
  },
  {
    id: 'variceal_bleeding_emergency',
    name: 'Xuất Huyết Tiêu Hóa Do Vỡ Giãn TMTQ Cấp',
    badge: 'Cấp Cứu Xuất Huyết Baveno VII',
    badgeColor: '#ef4444',
    description: 'Nôn ra máu đỏ tươi ồ ạt, cần dùng thuốc co mạch tạng (Terlipressin/Octreotide), Ceftriaxone và thắt vòng cao su EVL.',
    values: { age: 52, bilirubinUmol: 42, albuminGPerL: 28, inr: 1.6, serumCreatinineUmol: 110, serumNaMmol: 135, astUPerL: 80, altUPerL: 55, plateletsK: 75, ascites: 'mild', encephalopathy: 'none', isDialysisTwiceLastWeek: false },
  },
  {
    id: 'sbp_peritonitis',
    name: 'Viêm Phúc Mạc Nhiễm Khuẩn Nguyên Phát (SBP)',
    badge: 'Báng Bụng Nhiễm Trùng',
    badgeColor: '#f59e0b',
    description: 'Bệnh nhân xơ gan sốt nhẹ đau bụng âm ỉ, dịch báng Neutrophil > 250/mm3. Cần Cefotaxime + Truyền Albumin.',
    values: { age: 60, bilirubinUmol: 50, albuminGPerL: 26, inr: 1.7, serumCreatinineUmol: 140, serumNaMmol: 130, astUPerL: 65, altUPerL: 45, plateletsK: 80, ascites: 'moderate_severe', encephalopathy: 'none', isDialysisTwiceLastWeek: false },
  },
  {
    id: 'nafld_fibrosis_screening',
    name: 'Sàng Lọc Xơ Hóa Gan Không Rõ Triệu Chứng (FIB-4)',
    badge: 'FIB-4 Sàng Lọc Ngoại Trú',
    badgeColor: '#10b981',
    description: 'Nam 45 tuổi Gan nhiễm mỡ MAFLD, men gan tăng nhẹ, tiểu cầu bình thường. FIB-4 < 1.3 loại trừ xơ hóa tiến triển.',
    values: { age: 45, bilirubinUmol: 18, albuminGPerL: 42, inr: 1.0, serumCreatinineUmol: 80, serumNaMmol: 140, astUPerL: 45, altUPerL: 65, plateletsK: 210, ascites: 'none', encephalopathy: 'none', isDialysisTwiceLastWeek: false },
  },
];

export function analyzeCirrhosis(inputs: CirrhosisInputs): CirrhosisAnalysisResult {
  const {
    age,
    bilirubinUmol,
    albuminGPerL,
    inr,
    serumCreatinineUmol,
    serumNaMmol,
    astUPerL,
    altUPerL,
    plateletsK,
    ascites,
    encephalopathy,
    isDialysisTwiceLastWeek,
  } = inputs;

  const recommendations: string[] = [];

  const biliMgDl = bilirubinUmol / 17.1;
  const albGPerDl = albuminGPerL / 10;
  const scrMgDl = serumCreatinineUmol / 88.4;

  // 1. Tính Child-Pugh Score (5 - 15)
  let cpScore = 0;
  // Bilirubin
  if (biliMgDl < 2.0) cpScore += 1;
  else if (biliMgDl <= 3.0) cpScore += 2;
  else cpScore += 3;

  // Albumin
  if (albGPerDl > 3.5) cpScore += 1;
  else if (albGPerDl >= 2.8) cpScore += 2;
  else cpScore += 3;

  // INR
  if (inr < 1.7) cpScore += 1;
  else if (inr <= 2.2) cpScore += 2;
  else cpScore += 3;

  // Cổ trướng
  if (ascites === 'none') cpScore += 1;
  else if (ascites === 'mild') cpScore += 2;
  else cpScore += 3;

  // Hôn mê gan
  if (encephalopathy === 'none') cpScore += 1;
  else if (encephalopathy === 'grade_1_2') cpScore += 2;
  else cpScore += 3;

  let cpClass: 'A' | 'B' | 'C' = 'A';
  let cpClassLabel = 'Child-Pugh A (Xơ gan còn bù — 5-6 điểm)';
  let cpColor = '#10b981';

  if (cpScore >= 10) {
    cpClass = 'C';
    cpClassLabel = `Child-Pugh C (Xơ gan mất bù NẶNG — ${cpScore} điểm)`;
    cpColor = '#dc2626';
    recommendations.push('Xơ gan Child-Pugh C: Tiên lượng sống 1 năm ~ 45%. Cần hội chẩn đánh giá chỉ định Ghép Gan (Liver Transplantation).');
  } else if (cpScore >= 7) {
    cpClass = 'B';
    cpClassLabel = `Child-Pugh B (Xơ gan mất bù TRUNG BÌNH — ${cpScore} điểm)`;
    cpColor = '#f59e0b';
    recommendations.push('Xơ gan Child-Pugh B: Tiên lượng sống 1 năm ~ 80%. Tầm soát định kỳ HCC (Siêu âm + AFP mỗi 6 tháng) và nội soi TMTQ.');
  } else {
    cpClass = 'A';
    cpClassLabel = `Child-Pugh A (Xơ gan CÒN BÙ — ${cpScore} điểm)`;
    cpColor = '#10b981';
    recommendations.push('Xơ gan Child-Pugh A: Tiên lượng sống 1 năm ~ 100%. Duy trì điều trị nguyên nhân (Kháng virus HBV/HCV, cai rượu).');
  }

  // 2. Tính MELD & MELD-Na 2016
  const effectiveScr = isDialysisTwiceLastWeek ? 4.0 : Math.max(1.0, Math.min(4.0, scrMgDl));
  const effectiveBili = Math.max(1.0, biliMgDl);
  const effectiveInr = Math.max(1.0, inr);

  const meldRaw = 9.57 * Math.log(effectiveScr) + 3.78 * Math.log(effectiveBili) + 11.2 * Math.log(effectiveInr) + 6.43;
  const meld = Math.round(Math.max(6, Math.min(40, meldRaw)));

  let meldNa = meld;
  if (meld > 11) {
    const clampedNa = Math.max(125, Math.min(137, serumNaMmol));
    const calcMeldNa = meld + 1.32 * (137 - clampedNa) - (0.033 * meld * (137 - clampedNa));
    meldNa = Math.round(Math.max(6, Math.min(40, calcMeldNa)));
  }

  let meldMortality = '';
  if (meldNa >= 30) meldMortality = '> 50 - 70% tử vong trong 3 tháng nếu không ghép gan';
  else if (meldNa >= 20) meldMortality = '~ 20 - 40% tử vong trong 3 tháng';
  else if (meldNa >= 15) meldMortality = '~ 6 - 15% tử vong trong 3 tháng';
  else meldMortality = '< 2 - 5% tử vong trong 3 tháng';

  // 3. Tính FIB-4
  let fib4 = 0;
  let fib4Interp = '';
  if (plateletsK > 0 && altUPerL > 0) {
    fib4 = Math.round(((age * astUPerL) / (plateletsK * Math.sqrt(altUPerL))) * 100) / 100;
    if (fib4 < 1.30) {
      fib4Interp = `FIB-4 = ${fib4} (< 1.30) ➔ Nguy cơ thấp, loại trừ xơ hóa gan tiến triển F3-F4 (NPV > 90%)`;
    } else if (fib4 > 2.67) {
      fib4Interp = `FIB-4 = ${fib4} (> 2.67) ➔ Nguy cơ CAO xơ hóa tiến triển/Xơ gan F3-F4! Cần đo độ đàn hồi mô gan (FibroScan).`;
    } else {
      fib4Interp = `FIB-4 = ${fib4} (1.30 - 2.67) ➔ Vùng xám trung gian (Indeterminate). Cần phối hợp thêm xét nghiệm thứ hai.`;
    }
  }

  // 4. Tính ALBI Score
  const albiScore = Math.round((Math.log10(bilirubinUmol) * 0.66 + (albuminGPerL * -0.085)) * 100) / 100;
  let albiGrade = '';
  if (albiScore <= -2.60) albiGrade = `ALBI Grade 1 (${albiScore}) — Chức năng gan bảo tồn tốt`;
  else if (albiScore <= -1.39) albiGrade = `ALBI Grade 2 (${albiScore}) — Chức năng gan giảm trung bình`;
  else albiGrade = `ALBI Grade 3 (${albiScore}) — Suy giảm chức năng gan nặng`;

  // 5. Phác đồ Vỡ Giãn TMTQ & SBP
  const varicealBleedingProtocol = '1. Thuốc co mạch tạng: Terlipressin 2mg IV q4h HOẶC Octreotide 50mcg bolus rồi duy trì 50mcg/giờ x 3-5 ngày.\n2. Kháng sinh dự phòng: Ceftriaxone 1g IV mỗi 24h x 7 ngày.\n3. Nội soi can thiệp: Thắt vòng cao su (EVL) trong vòng 12 giờ đầu.\n4. Đích truyền máu: Duy trì Hb 7 - 8 g/dL (Tránh truyền thừa làm tăng áp lực tĩnh mạch cửa tái xuất huyết).';
  const sbpProtocol = '1. Chẩn đoán: Chọc dịch báng khi có sốt, đau bụng hoặc suy thận; Neutrophil dịch báng ≥ 250 tế bào/mm³.\n2. Kháng sinh: Cefotaxime 2g IV mỗi 8h (hoặc Ceftriaxone 2g/ngày) trong 5 - 7 ngày.\n3. Truyền Albumin chống Hội chứng Gan-Thận (HRS): 1.5 g/kg trong 6 giờ đầu ngày 1, và 1.0 g/kg vào ngày thứ 3.';

  // Clinical Summary
  let summary = `[Cirrhosis & Liver Studio Report]\n• Phân loại: ${cpClassLabel}`;
  summary += `\n• Điểm MELD-Na 2016: ${meldNa} điểm ➔ Tiên lượng 3 tháng: ${meldMortality}`;
  summary += `\n• FIB-4: ${fib4Interp}`;
  summary += `\n• ALBI: ${albiGrade}`;
  summary += `\n• Khuyến cáo: ${recommendations.join(' | ')}`;

  return {
    childPughScore: cpScore,
    childPughClass: cpClass,
    childPughClassLabel: cpClassLabel,
    childPughColor: cpColor,
    meldScore: meld,
    meldNaScore: meldNa,
    meldMortality3Month: meldMortality,
    fib4Score: fib4,
    fib4Interpretation: fib4Interp,
    albiScore,
    albiGrade,
    varicealBleedingProtocol,
    sbpProtocol,
    clinicalSummary: summary,
    recommendations,
  };
}
