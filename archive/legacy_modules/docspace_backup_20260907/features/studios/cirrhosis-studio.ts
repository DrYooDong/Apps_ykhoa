/**
 * DocSpace — Cirrhosis, Portal Hypertension & Advanced Hepatology Research Studio Pro ($10,000 Level)
 * Comprehensive Child-Pugh, MELD-Na 2016, MELD 3.0, FIB-4, ALBI, Maddrey DF / Lille Model, Baveno VII & 20 Presets
 */

export interface CirrhosisPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  category: 'decompensated_aclf' | 'variceal_bleeding' | 'ascites_sbp_hrs' | 'encephalopathy_metabolic' | 'fibrosis_screening';
  description: string;
  values: CirrhosisInputs;
}

export interface CirrhosisInputs {
  age: number;
  gender: 'male' | 'female';
  weightKg: number;
  
  // Serum Liver Biomarkers
  bilirubinUmol: number;      // umol/L (or mg/dL * 17.1)
  albuminGPerL: number;       // g/L (or g/dL * 10)
  inr: number;                // International Normalized Ratio
  ptPatientSec?: number;      // Prothrombin Time Patient (sec)
  ptControlSec?: number;      // Prothrombin Time Control (sec, usually 12-13s)
  serumCreatinineUmol: number;// umol/L (or mg/dL * 88.4)
  serumNaMmol: number;        // mmol/L
  astUPerL: number;           // U/L
  altUPerL: number;           // U/L
  plateletsK: number;         // G/L or x10^3/uL
  isDialysisTwiceLastWeek: boolean; // Hemodialysis >= 2x in past 7 days
  
  // Clinical Cirrhosis Staging Variables
  ascites: 'none' | 'mild' | 'moderate_severe';
  encephalopathy: 'none' | 'grade_1_2' | 'grade_3_4';
  
  // Large Volume Paracentesis (LVP) Simulator
  paracentesisLiters?: number; // Liters of ascites removed
  
  // SBP & Ascitic Fluid Analysis
  isAsciticFluidPmnOver250?: boolean; // Ascitic fluid PMN >= 250 / mm3
  asciticFluidTotalProteinGPerL?: number; // g/L (<15 is high risk SBP)
  
  // Variceal Bleeding & Baveno VII
  hasActiveVaricealBleed?: boolean;
  hasActiveBleedingAtEndoscopy?: boolean;
  
  // Alcoholic Hepatitis (Maddrey DF & Lille)
  isAlcoholicHepatitis?: boolean;
  day7BilirubinUmol?: number; // Day 7 Bilirubin for Lille model
}

export interface CirrhosisAnalysisResult {
  // 1. Child-Turcotte-Pugh
  childPughScore: number;
  childPughClass: 'A' | 'B' | 'C';
  childPughClassLabel: string;
  childPughColor: string;
  childPugh1YearSurvival: string;
  childPugh2YearSurvival: string;
  
  // 2. MELD & MELD-Na 2016
  meldScore: number;
  meldNaScore: number;
  meldMortality3Month: string;
  
  // 3. MELD 3.0 (2022 UNOS Update)
  meld30Score: number;
  meld30Description: string;
  
  // 4. Objective Reserve: ALBI Grade
  albiScore: number;
  albiGrade: 'Grade 1' | 'Grade 2' | 'Grade 3';
  albiColor: string;
  albiMedianSurvival: string;
  
  // 5. Fibrosis Non-Invasive Scores: FIB-4 & APRI
  fib4Score: number;
  fib4Interpretation: string;
  apriScore: number;
  apriInterpretation: string;
  
  // 6. Alcoholic Hepatitis: Maddrey DF & Lille Model
  maddreyDfScore: number | null;
  isSevereAlcoholicHepatitis: boolean | null;
  lilleScore: number | null;
  lilleInterpretation: string | null;
  
  // 7. Paracentesis Albumin Calculation
  lvpAlbuminRequiredGrams: number | null;
  lvpAlbumin20PercentBottles: number | null;
  
  // 8. Clinical Recommendations & Emergency Flags
  isPreemptiveTipsIndicated: boolean;
  varicealBleedingProtocol: string;
  sbpProtocol: string;
  hrsProtocol: string;
  emergencyFlags: string[];
  recommendations: string[];
  clinicalSummary: string;
}

export const CIRRHOSIS_PRESETS: CirrhosisPreset[] = [
  // 1. Decompensated Cirrhosis & Liver Failure
  {
    id: 'decompensated_child_c_meld28',
    name: '1. Xơ Gan Mất Bù Giai Đoạn Nặng (Child-Pugh C | MELD-Na 28)',
    badge: '🚨 Nguy Cơ Tử Vong 3 Tháng 50-70%',
    badgeColor: '#dc2626',
    category: 'decompensated_aclf',
    description: 'Nam 56 tuổi xơ gan do rượu vàng da đậm, báng bụng to căng, lơ mơ chậm chạp GCS 13, Bilirubin 85 umol/L, INR 2.1, Natri 124 mmol/L, Creatinine 180 umol/L. Chỉ định đánh giá Ghép Gan.',
    values: {
      age: 56, gender: 'male', weightKg: 65,
      bilirubinUmol: 85, albuminGPerL: 24, inr: 2.1, serumCreatinineUmol: 180, serumNaMmol: 124,
      astUPerL: 95, altUPerL: 60, plateletsK: 65,
      ascites: 'moderate_severe', encephalopathy: 'grade_1_2', isDialysisTwiceLastWeek: false
    }
  },
  {
    id: 'severe_alcoholic_hepatitis_mdf',
    name: '2. Viêm Gan Do Rượu Nặng Cấp Tính (Maddrey DF = 48 | Chỉ Định Steroid)',
    badge: '🚨 Maddrey DF 48: Chỉ Định Prednisolone 40mg',
    badgeColor: '#dc2626',
    category: 'decompensated_aclf',
    description: 'Nam 48 tuổi uống rượu nhiều năm nhập viện vàng da cấp, Bilirubin 195 umol/L (11.4 mg/dL), PT 24s (Chứng 12s), Maddrey DF 48 điểm. Chỉ định Prednisolone 40mg/ngày x 28 ngày.',
    values: {
      age: 48, gender: 'male', weightKg: 68,
      bilirubinUmol: 195, albuminGPerL: 28, inr: 2.3, ptPatientSec: 24, ptControlSec: 12,
      serumCreatinineUmol: 110, serumNaMmol: 132, astUPerL: 220, altUPerL: 95, plateletsK: 110,
      ascites: 'mild', encephalopathy: 'grade_1_2', isDialysisTwiceLastWeek: false,
      isAlcoholicHepatitis: true, day7BilirubinUmol: 130
    }
  },
  {
    id: 'aclf_grade_2_multiorgan',
    name: '3. Suy Gan Cấp Trên Nền Mạn (ACLF Grade 2: Suy Thận + Đông Máu)',
    badge: 'ACLF Grade 2 | Hội Chẩn ICU Hồi Sức',
    badgeColor: '#dc2626',
    category: 'decompensated_aclf',
    description: 'Nữ 54 tuổi xơ gan HBV bùng phát nhiễm trùng, suy gan + suy thận Creatinine 260 umol/L, INR 2.6, Bilirubin 160 umol/L, báng bụng nhiễm trùng. Tỷ lệ tử vong 28 ngày > 50%.',
    values: {
      age: 54, gender: 'female', weightKg: 52,
      bilirubinUmol: 160, albuminGPerL: 22, inr: 2.6, serumCreatinineUmol: 260, serumNaMmol: 127,
      astUPerL: 340, altUPerL: 210, plateletsK: 45,
      ascites: 'moderate_severe', encephalopathy: 'grade_1_2', isDialysisTwiceLastWeek: false,
      isAsciticFluidPmnOver250: true
    }
  },

  // 2. Portal Hypertension & Variceal Bleeding
  {
    id: 'active_variceal_bleed_baveno7',
    name: '4. Xuất Huyết Tiêu Hóa Vỡ Giãn TMTQ Cấp (Baveno VII Protocol)',
    badge: 'Cấp Cứu: Terlipressin + Ceftriaxone + EVL',
    badgeColor: '#ef4444',
    category: 'variceal_bleeding',
    description: 'Nam 52 tuổi nôn ra máu đỏ tươi ồ ạt, HA 85/50 mmHg, Bilirubin 42 umol/L, INR 1.6. Khởi động ngay Terlipressin 2mg q4h, Ceftriaxone 1g/ngày, truyền máu đích Hb 7-8 và nội soi thắt EVL < 12h.',
    values: {
      age: 52, gender: 'male', weightKg: 62,
      bilirubinUmol: 42, albuminGPerL: 28, inr: 1.6, serumCreatinineUmol: 115, serumNaMmol: 135,
      astUPerL: 80, altUPerL: 55, plateletsK: 75,
      ascites: 'mild', encephalopathy: 'none', isDialysisTwiceLastWeek: false,
      hasActiveVaricealBleed: true, hasActiveBleedingAtEndoscopy: true
    }
  },
  {
    id: 'preemptive_tips_candidate',
    name: '5. Xuất Huyết TMTQ Nguy Cơ Tái Phát Cao (Chỉ Định Preemptive TIPS)',
    badge: '⚡ Đạt Tiêu Chuẩn TIPS Dự Phòng Sớm (<72h)',
    badgeColor: '#7c3aed',
    category: 'variceal_bleeding',
    description: 'Nam 60 tuổi xơ gan Child C (11 điểm) xuất huyết vỡ giãn TMTQ. Đạt tiêu chuẩn vàng làm TIPS dự phòng sớm (Preemptive TIPS trong 72h đầu) giảm 50% tử vong theo Baveno VII.',
    values: {
      age: 60, gender: 'male', weightKg: 64,
      bilirubinUmol: 65, albuminGPerL: 25, inr: 2.0, serumCreatinineUmol: 135, serumNaMmol: 130,
      astUPerL: 90, altUPerL: 60, plateletsK: 55,
      ascites: 'moderate_severe', encephalopathy: 'grade_1_2', isDialysisTwiceLastWeek: false,
      hasActiveVaricealBleed: true, hasActiveBleedingAtEndoscopy: true
    }
  },

  // 3. Ascites, SBP & Hepatorenal Syndrome
  {
    id: 'sbp_spontaneous_peritonitis',
    name: '6. Viêm Phúc Mạc Nhiễm Khuẩn Nguyên Phát (SBP PMN > 250/mm3)',
    badge: 'Cefotaxime 2g + Albumin 1.5g/kg N1 & 1g/kg N3',
    badgeColor: '#ea580c',
    category: 'ascites_sbp_hrs',
    description: 'Nam 62 tuổi sốt nhẹ đau bụng âm ỉ báng bụng căng, dịch báng PMN 650/mm3. Kháng sinh Cefotaxime 2g q8h + Truyền Albumin 20% liều 1.5g/kg N1 và 1g/kg N3 để ngừa HRS.',
    values: {
      age: 62, gender: 'male', weightKg: 66,
      bilirubinUmol: 54, albuminGPerL: 26, inr: 1.75, serumCreatinineUmol: 145, serumNaMmol: 129,
      astUPerL: 70, altUPerL: 48, plateletsK: 82,
      ascites: 'moderate_severe', encephalopathy: 'none', isDialysisTwiceLastWeek: false,
      isAsciticFluidPmnOver250: true, asciticFluidTotalProteinGPerL: 11
    }
  },
  {
    id: 'hepatorenal_syndrome_hrs_aki',
    name: '7. Hội Chứng Gan Thận (HRS-AKI Theo Tiêu Chuẩn ICA 2023)',
    badge: '🚨 Cấp Cứu: Terlipressin + Albumin 20-40g/ngày',
    badgeColor: '#dc2626',
    category: 'ascites_sbp_hrs',
    description: 'Nữ 58 tuổi xơ gan mất bù báng bụng to, Creatinine tăng vọt từ 80 lên 235 umol/L sau khi dùng lợi tiểu, không đáp ứng sau 48h bù Albumin 1g/kg. Bắt đầu ngay Terlipressin truyền liên tục.',
    values: {
      age: 58, gender: 'female', weightKg: 54,
      bilirubinUmol: 72, albuminGPerL: 24, inr: 1.9, serumCreatinineUmol: 235, serumNaMmol: 126,
      astUPerL: 65, altUPerL: 42, plateletsK: 60,
      ascites: 'moderate_severe', encephalopathy: 'grade_1_2', isDialysisTwiceLastWeek: false
    }
  },
  {
    id: 'large_volume_paracentesis_8l',
    name: '8. Chọc Tháo Báng Lượng Lớn (LVP 8 Lít) & Bù Albumin 20% Chống PPCD',
    badge: 'Rút 8 Lít Báng ➔ Bù 64g Albumin (320 mL 20%)',
    badgeColor: '#0284c7',
    category: 'ascites_sbp_hrs',
    description: 'Nam 65 tuổi báng bụng kháng trị căng tức khó thở, chọc tháo 8 Lít dịch báng. Yêu cầu truyền 64g Albumin (tương đương 320 mL Albumin 20%) phòng ngừa suy tuần hoàn sau chọc (PPCD).',
    values: {
      age: 65, gender: 'male', weightKg: 72,
      bilirubinUmol: 38, albuminGPerL: 27, inr: 1.45, serumCreatinineUmol: 120, serumNaMmol: 134,
      astUPerL: 55, altUPerL: 40, plateletsK: 95,
      ascites: 'moderate_severe', encephalopathy: 'none', isDialysisTwiceLastWeek: false,
      paracentesisLiters: 8
    }
  },

  // 4. Hepatic Encephalopathy & Metabolic
  {
    id: 'hepatic_encephalopathy_grade3',
    name: '9. Hôn Mê Gan Cấp Tính (West Haven Grade 3: Ngủ Gà Lú Lẫn Nặng)',
    badge: 'Lactulose Thụt + Rifaximin 550mg BID',
    badgeColor: '#dc2626',
    category: 'encephalopathy_metabolic',
    description: 'Nam 55 tuổi xơ gan uống thuốc ngủ bị hôn mê gan độ 3, nói nhảm, ngủ gà, kích động. Thụt tháo Lactulose 300mL + nước 700mL, uống Rifaximin 550mg x 2 lần/ngày.',
    values: {
      age: 55, gender: 'male', weightKg: 60,
      bilirubinUmol: 62, albuminGPerL: 26, inr: 1.85, serumCreatinineUmol: 130, serumNaMmol: 131,
      astUPerL: 75, altUPerL: 45, plateletsK: 70,
      ascites: 'mild', encephalopathy: 'grade_3_4', isDialysisTwiceLastWeek: false
    }
  },
  {
    id: 'constipation_induced_he_grade2',
    name: '10. Bệnh Não Gan Do Táo Bón Kéo Dài (West Haven Grade 2)',
    badge: 'Flapping Tremor (+) | Chỉnh Liều Lactulose',
    badgeColor: '#f59e0b',
    category: 'encephalopathy_metabolic',
    description: 'Nữ 66 tuổi xơ gan 3 ngày không đi cầu xuất hiện run vỗ cánh (Asterixis/Flapping tremor), lú lẫn nhẹ. Điều chỉnh liều Lactulose đường uống đạt 2-3 lần phân mềm/ngày.',
    values: {
      age: 66, gender: 'female', weightKg: 50,
      bilirubinUmol: 35, albuminGPerL: 30, inr: 1.5, serumCreatinineUmol: 95, serumNaMmol: 136,
      astUPerL: 48, altUPerL: 35, plateletsK: 110,
      ascites: 'mild', encephalopathy: 'grade_1_2', isDialysisTwiceLastWeek: false
    }
  },

  // 5. Fibrosis Screening & Early Liver Disease
  {
    id: 'nafld_nash_fib4_high_risk',
    name: '11. Sàng Lọc Bệnh Gan Nhiễm Mỡ MAFLD/MASH Nguy Cơ Xơ Hóa Cao (FIB-4 = 3.4)',
    badge: 'FIB-4 = 3.42 (> 2.67) ➔ Xơ Hóa F3-F4',
    badgeColor: '#dc2626',
    category: 'fibrosis_screening',
    description: 'Nam 58 tuổi ĐTĐ Type 2 béo phì, ALT 85, AST 110, Tiểu cầu 130 G/L. FIB-4 = 3.42 cảnh báo xơ hóa gan tiến triển F3-F4, cần đo FibroScan và tầm soát giãn TMTQ.',
    values: {
      age: 58, gender: 'male', weightKg: 88,
      bilirubinUmol: 22, albuminGPerL: 38, inr: 1.15, serumCreatinineUmol: 85, serumNaMmol: 139,
      astUPerL: 110, altUPerL: 85, plateletsK: 130,
      ascites: 'none', encephalopathy: 'none', isDialysisTwiceLastWeek: false
    }
  },
  {
    id: 'chronic_hbv_compensated_child_a',
    name: '12. Viêm Gan B Mạn Xơ Gan Còn Bù (Child-Pugh A | MELD-Na 8)',
    badge: 'Child-Pugh A | Kháng Virus TAF/ETV Lâu Dài',
    badgeColor: '#10b981',
    category: 'fibrosis_screening',
    description: 'Nam 46 tuổi Viêm gan B mạn phát hiện nốt xơ hóa trên siêu âm, chức năng gan còn bù tốt, Bilirubin 18 umol/L, Albumin 41 g/L, INR 1.1. Duy trì Tenofovir Alafenamide (TAF).',
    values: {
      age: 46, gender: 'male', weightKg: 64,
      bilirubinUmol: 18, albuminGPerL: 41, inr: 1.1, serumCreatinineUmol: 78, serumNaMmol: 140,
      astUPerL: 38, altUPerL: 42, plateletsK: 185,
      ascites: 'none', encephalopathy: 'none', isDialysisTwiceLastWeek: false
    }
  },
  {
    id: 'albi_grade_1_hcc_candidate',
    name: '13. Đánh Giá Chức Năng Gan Bảo Tồn ALBI Grade 1 Cho Phẫu Thuật Cắt Gan HCC',
    badge: 'ALBI Grade 1 (-2.85) | Đủ Điều Kiện Cắt Gan',
    badgeColor: '#10b981',
    category: 'fibrosis_screening',
    description: 'Nam 50 tuổi có khối u gan HCC đơn độc 3.5cm, Bilirubin 14 umol/L, Albumin 44 g/L (ALBI = -2.85 Grade 1). Tiên lượng chức năng gan dự trữ rất tốt để phẫu thuật cắt gan an toàn.',
    values: {
      age: 50, gender: 'male', weightKg: 66,
      bilirubinUmol: 14, albuminGPerL: 44, inr: 1.05, serumCreatinineUmol: 80, serumNaMmol: 141,
      astUPerL: 32, altUPerL: 36, plateletsK: 215,
      ascites: 'none', encephalopathy: 'none', isDialysisTwiceLastWeek: false
    }
  },
  {
    id: 'refractory_ascites_diuretic_intractable',
    name: '14. Cổ Trướng Kháng Trị Do Không Dung Nạp Lợi Tiểu (Tăng Kali / Tụt Na)',
    badge: 'Cổ Trướng Kháng Trị: Ngừng Lợi Tiểu + LVP',
    badgeColor: '#ea580c',
    category: 'ascites_sbp_hrs',
    description: 'Nữ 64 tuổi xơ gan dùng Spironolactone 100mg + Furosemide 40mg bị Kali máu tăng vọt 5.8 mmol/L và Natri tụt 122 mmol/L. Ngừng ngay lợi tiểu, chuyển sang chọc tháo báng định kỳ.',
    values: {
      age: 64, gender: 'female', weightKg: 52,
      bilirubinUmol: 45, albuminGPerL: 25, inr: 1.65, serumCreatinineUmol: 155, serumNaMmol: 122,
      astUPerL: 52, altUPerL: 38, plateletsK: 78,
      ascites: 'moderate_severe', encephalopathy: 'none', isDialysisTwiceLastWeek: false,
      paracentesisLiters: 6
    }
  },
  {
    id: 'meld_3_0_female_disparity_fix',
    name: '15. Hiệu Chỉnh MELD 3.0 Cho Bệnh Nhân Nữ Giới (Khắc Phục Thiệt Thòi Ghép Gan)',
    badge: 'MELD 3.0 = 24 (+3 Điểm So Với MELD Cũ)',
    badgeColor: '#7c3aed',
    category: 'decompensated_aclf',
    description: 'Nữ 52 tuổi xơ gan ứ mật nguyên phát (PBC), do khối cơ nhỏ nên Creatinine thấp làm MELD cũ chỉ 21 điểm. MELD 3.0 tăng lên 24 điểm giúp ưu tiên đúng mức trong danh sách ghép gan.',
    values: {
      age: 52, gender: 'female', weightKg: 48,
      bilirubinUmol: 78, albuminGPerL: 26, inr: 1.8, serumCreatinineUmol: 105, serumNaMmol: 130,
      astUPerL: 85, altUPerL: 65, plateletsK: 90,
      ascites: 'mild', encephalopathy: 'none', isDialysisTwiceLastWeek: false
    }
  },
  {
    id: 'lille_non_responder_day7',
    name: '16. Đánh Giá Điểm Lille Ngày Thứ 7 Thất Bại Với Corticosteroid (Lille = 0.62)',
    badge: '🚨 Lille 0.62 (≥0.45): Ngừng Ngay Prednisolone',
    badgeColor: '#dc2626',
    category: 'decompensated_aclf',
    description: 'Nam 50 tuổi viêm gan rượu nặng sau 7 ngày uống Prednisolone 40mg, Bilirubin không giảm mà tăng từ 210 lên 260 umol/L (Lille = 0.62). Ngừng ngay corticoid để tránh nhiễm trùng cơ hội.',
    values: {
      age: 50, gender: 'male', weightKg: 70,
      bilirubinUmol: 210, albuminGPerL: 27, inr: 2.2, ptPatientSec: 23, ptControlSec: 12,
      serumCreatinineUmol: 125, serumNaMmol: 133, astUPerL: 195, altUPerL: 80, plateletsK: 105,
      ascites: 'mild', encephalopathy: 'grade_1_2', isDialysisTwiceLastWeek: false,
      isAlcoholicHepatitis: true, day7BilirubinUmol: 260
    }
  },
  {
    id: 'secondary_sbp_perforation_rule_out',
    name: '17. Phân Biệt Viêm Phúc Mạc Thứ Phát Do Thủng Tạng Rỗng Ở Bệnh Nhân Xơ Gan',
    badge: 'Tiêu Chuẩn Runyon: Nghi Ngờ Thủng Tạng',
    badgeColor: '#dc2626',
    category: 'ascites_sbp_hrs',
    description: 'Nam 60 tuổi xơ gan đau bụng cấp, dịch báng Đạm > 10 g/L, Glucose < 2.8 mmol/L, LDH > 225 U/L (Đạt 2/3 tiêu chuẩn Runyon). Chụp CT khẩn loại trừ thủng tạng rỗng.',
    values: {
      age: 60, gender: 'male', weightKg: 65,
      bilirubinUmol: 48, albuminGPerL: 26, inr: 1.7, serumCreatinineUmol: 160, serumNaMmol: 131,
      astUPerL: 75, altUPerL: 50, plateletsK: 70,
      ascites: 'moderate_severe', encephalopathy: 'none', isDialysisTwiceLastWeek: false,
      isAsciticFluidPmnOver250: true, asciticFluidTotalProteinGPerL: 22
    }
  },
  {
    id: 'hyponatremia_cirrhosis_dilutional',
    name: '18. Hạ Natri Máu Pha Loãng Do Tăng Tiết ADH Không Thích Hợp Ở Xơ Gan',
    badge: 'Natri 119 mmol/L: Hạn Chế Nước < 1000mL/ngày',
    badgeColor: '#ea580c',
    category: 'ascites_sbp_hrs',
    description: 'Nữ 62 tuổi xơ gan báng to, Natri máu tụt sâu 119 mmol/L do giữ nước quá mức. Xử trí bằng cách hạn chế nước tự do nghiêm ngặt < 1000 mL/ngày, tạm ngưng lợi tiểu.',
    values: {
      age: 62, gender: 'female', weightKg: 55,
      bilirubinUmol: 52, albuminGPerL: 25, inr: 1.7, serumCreatinineUmol: 140, serumNaMmol: 119,
      astUPerL: 60, altUPerL: 40, plateletsK: 85,
      ascites: 'moderate_severe', encephalopathy: 'grade_1_2', isDialysisTwiceLastWeek: false
    }
  },
  {
    id: 'post_evl_ulcer_bleeding',
    name: '19. Xuất Huyết Tái Phát Do Loét Sau Thắt Vòng Cao Su TMTQ (Post-EVL Ulcer)',
    badge: 'Loét Sau Thắt Vòng: PPI Liều Cao + Terlipressin',
    badgeColor: '#ef4444',
    category: 'variceal_bleeding',
    description: 'Nam 54 tuổi nôn máu ngày thứ 8 sau thắt EVL do bung vòng tạo vết loét sâu. Truyền liên tục Esomeprazole 8mg/h kết hợp Terlipressin và nội soi can thiệp cầm máu.',
    values: {
      age: 54, gender: 'male', weightKg: 60,
      bilirubinUmol: 36, albuminGPerL: 30, inr: 1.4, serumCreatinineUmol: 95, serumNaMmol: 137,
      astUPerL: 65, altUPerL: 45, plateletsK: 88,
      ascites: 'none', encephalopathy: 'none', isDialysisTwiceLastWeek: false,
      hasActiveVaricealBleed: true, hasActiveBleedingAtEndoscopy: false
    }
  },
  {
    id: 'hcc_child_b_locoregional_tace',
    name: '20. Đánh Giá Khả Năng Can Thiệp Nút Mạch TACE Ở Bệnh Nhân Xơ Gan Child B7',
    badge: 'Child-Pugh B7 | Cân Nhắc Kỹ Nguy Cơ Suy Gan',
    badgeColor: '#f59e0b',
    category: 'decompensated_aclf',
    description: 'Nam 68 tuổi xơ gan Child B (7 điểm) có khối u HCC 4.2cm. Đánh giá cẩn trọng nguy cơ suy gan bùng phát sau TACE, ưu tiên bảo tồn nhánh mạch máu gan.',
    values: {
      age: 68, gender: 'male', weightKg: 62,
      bilirubinUmol: 32, albuminGPerL: 32, inr: 1.35, serumCreatinineUmol: 90, serumNaMmol: 138,
      astUPerL: 58, altUPerL: 45, plateletsK: 115,
      ascites: 'mild', encephalopathy: 'none', isDialysisTwiceLastWeek: false
    }
  }
];

/**
 * 1. Master Calculation & Reasoning Engine for Cirrhosis Studio Pro
 */
export function analyzeCirrhosisStudio(inputs: CirrhosisInputs): CirrhosisAnalysisResult {
  const {
    age, gender, weightKg,
    bilirubinUmol, albuminGPerL, inr, ptPatientSec, ptControlSec,
    serumCreatinineUmol, serumNaMmol, astUPerL, altUPerL, plateletsK,
    isDialysisTwiceLastWeek, ascites, encephalopathy,
    paracentesisLiters, isAsciticFluidPmnOver250, asciticFluidTotalProteinGPerL,
    hasActiveVaricealBleed, hasActiveBleedingAtEndoscopy,
    isAlcoholicHepatitis, day7BilirubinUmol
  } = inputs;

  const emergencyFlags: string[] = [];
  const recommendations: string[] = [];

  const isFemale = gender === 'female';
  const biliMgDl = bilirubinUmol / 17.1;
  const albGPerDl = albuminGPerL / 10;
  const scrMgDl = serumCreatinineUmol / 88.4;

  // A. Child-Turcotte-Pugh (CTP 5 - 15)
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

  // Ascites
  if (ascites === 'none') cpScore += 1;
  else if (ascites === 'mild') cpScore += 2;
  else cpScore += 3;

  // Hepatic Encephalopathy
  if (encephalopathy === 'none') cpScore += 1;
  else if (encephalopathy === 'grade_1_2') cpScore += 2;
  else cpScore += 3;

  let cpClass: 'A' | 'B' | 'C' = 'A';
  let cpClassLabel = 'Child-Pugh A (Xơ gan CÒN BÙ — 5-6 điểm)';
  let cpColor = '#10b981';
  let cp1Yr = '100%';
  let cp2Yr = '85%';

  if (cpScore >= 10) {
    cpClass = 'C';
    cpClassLabel = `Child-Pugh C (Xơ gan MẤT BÙ NẶNG — ${cpScore} điểm)`;
    cpColor = '#dc2626';
    cp1Yr = '45%';
    cp2Yr = '35%';
    recommendations.push('Xơ gan Child-Pugh C: Tiên lượng sống còn 1 năm chỉ đạt ~45%. Cần đánh giá đưa vào danh sách chờ Ghép Gan (Liver Transplantation).');
  } else if (cpScore >= 7) {
    cpClass = 'B';
    cpClassLabel = `Child-Pugh B (Xơ gan MẤT BÙ TRUNG BÌNH — ${cpScore} điểm)`;
    cpColor = '#f59e0b';
    cp1Yr = '80%';
    cp2Yr = '60%';
    recommendations.push('Xơ gan Child-Pugh B: Tầm soát định kỳ HCC (Siêu âm Doppler gan + AFP mỗi 6 tháng) và nội soi tầm soát giãn TMTQ.');
  } else {
    cpClass = 'A';
    cpClassLabel = `Child-Pugh A (Xơ gan CÒN BÙ — ${cpScore} điểm)`;
    cpColor = '#10b981';
    cp1Yr = '100%';
    cp2Yr = '85%';
    recommendations.push('Xơ gan Child-Pugh A: Chức năng gan bảo tồn tốt. Tiếp tục điều trị nguyên nhân nền (Thuốc kháng virus HBV/HCV, cai rượu tuyệt đối).');
  }

  // B. MELD & MELD-Na (2016 UNOS / OPTN Policy)
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

  let meldMortality = '< 2% tử vong trong 3 tháng';
  if (meldNa >= 30) meldMortality = '> 50 - 70% tử vong trong 3 tháng';
  else if (meldNa >= 20) meldMortality = '20 - 40% tử vong trong 3 tháng';
  else if (meldNa >= 15) meldMortality = '6 - 15% tử vong trong 3 tháng';
  else if (meldNa >= 10) meldMortality = '2 - 6% tử vong trong 3 tháng';

  // C. MELD 3.0 (2022 Kim et al. / UNOS Update)
  // MELD 3.0 = 1.33*(Female) + 4.56*ln(Bili) + 0.82*(137-Na) - 0.24*(137-Na)*ln(Bili) + 9.09*ln(INR) + 11.14*ln(Scr) + 1.85*(3.5-Alb) - 1.83*(3.5-Alb)*ln(Scr) + 6.43
  const clampedNa30 = Math.max(125, Math.min(137, serumNaMmol));
  const clampedAlb30 = Math.max(1.5, Math.min(3.5, albGPerDl));
  const femaleTerm = isFemale ? 1.33 : 0;
  const lnBili = Math.log(effectiveBili);
  const lnScr = Math.log(effectiveScr);
  const lnInr = Math.log(effectiveInr);
  const naDiff = 137 - clampedNa30;
  const albDiff = 3.5 - clampedAlb30;

  const meld30Raw = femaleTerm + (4.56 * lnBili) + (0.82 * naDiff) - (0.24 * naDiff * lnBili) + (9.09 * lnInr) + (11.14 * lnScr) + (1.85 * albDiff) - (1.83 * albDiff * lnScr) + 6.43;
  const meld30 = Math.round(Math.max(6, Math.min(40, meld30Raw)));
  const meld30Description = `MELD 3.0 thế hệ mới: ${meld30} điểm (${isFemale ? 'Đã cộng +1.33đ hiệu chỉnh giới tính nữ & Albumin' : 'Đã hiệu chỉnh Albumin'})`;

  // D. ALBI Grade (Albumin-Bilirubin Objective Score)
  const albiRaw = Math.log10(Math.max(1, bilirubinUmol)) * 0.66 + (albuminGPerL * -0.085);
  const albiScore = parseFloat(albiRaw.toFixed(2));
  let albiGrade: 'Grade 1' | 'Grade 2' | 'Grade 3' = 'Grade 1';
  let albiColor = '#10b981';
  let albiMedianSurvival = '> 5 năm (Chức năng gan bảo tồn tốt)';

  if (albiScore <= -2.60) {
    albiGrade = 'Grade 1'; albiColor = '#10b981'; albiMedianSurvival = '> 5 năm (Chức năng gan bảo tồn rất tốt)';
  } else if (albiScore <= -1.39) {
    albiGrade = 'Grade 2'; albiColor = '#f59e0b'; albiMedianSurvival = '~ 2 - 3 năm (Suy giảm chức năng gan trung bình)';
  } else {
    albiGrade = 'Grade 3'; albiColor = '#dc2626'; albiMedianSurvival = '< 6 - 12 tháng (Suy giảm chức năng gan nặng)';
  }

  // E. FIB-4 & APRI
  let fib4Score = 0;
  let fib4Interpretation = 'Chưa đủ dữ liệu men gan/tiểu cầu.';
  if (plateletsK > 0 && altUPerL > 0) {
    fib4Score = parseFloat(((age * astUPerL) / (plateletsK * Math.sqrt(altUPerL))).toFixed(2));
    if (fib4Score < 1.30) {
      fib4Interpretation = `FIB-4 = ${fib4Score} (< 1.30) ➔ Nguy cơ thấp, loại trừ xơ hóa gan tiến triển F3-F4 (Độ đặc hiệu > 90%)`;
    } else if (fib4Score > 2.67) {
      fib4Interpretation = `FIB-4 = ${fib4Score} (> 2.67) ➔ Nguy cơ CAO xơ hóa gan tiến triển / Xơ gan (F3-F4)! Cần đo độ đàn hồi FibroScan.`;
    } else {
      fib4Interpretation = `FIB-4 = ${fib4Score} (1.30 - 2.67) ➔ Vùng xám trung gian (Indeterminate). Cần phối hợp thêm xét nghiệm thứ hai.`;
    }
  }

  const astUln = 40; // Standard AST upper limit of normal
  const apriScore = parseFloat((((astUPerL / astUln) / plateletsK) * 100).toFixed(2));
  let apriInterpretation = `APRI = ${apriScore}`;
  if (apriScore < 0.5) apriInterpretation += ' (< 0.5) ➔ Loại trừ xơ gan';
  else if (apriScore > 1.5) apriInterpretation += ' (> 1.5) ➔ Gợi ý xơ gan tiến triển';
  else apriInterpretation += ' (0.5 - 1.5) ➔ Vùng trung gian';

  // F. Alcoholic Hepatitis (Maddrey DF & Lille Model)
  let maddreyDfScore: number | null = null;
  let isSevereAlcoholicHepatitis: boolean | null = null;
  let lilleScore: number | null = null;
  let lilleInterpretation: string | null = null;

  if (isAlcoholicHepatitis) {
    const ptPat = ptPatientSec || 20;
    const ptCtrl = ptControlSec || 12;
    maddreyDfScore = Math.round(4.6 * (ptPat - ptCtrl) + biliMgDl);
    isSevereAlcoholicHepatitis = maddreyDfScore >= 32;

    if (isSevereAlcoholicHepatitis) {
      recommendations.push(`Maddrey DF = ${maddreyDfScore} (≥ 32 điểm): Viêm gan do rượu NẶNG có nguy cơ tử vong 1 tháng 30-50%. Chỉ định dùng Prednisolone 40 mg/ngày trong 28 ngày.`);
    }

    if (day7BilirubinUmol !== undefined) {
      // Lille Score approximation at Day 7
      const day7BiliMgDl = day7BilirubinUmol / 17.1;
      const rVal = 3.19 - (0.101 * age) + (0.147 * albGPerDl) + (0.0165 * (biliMgDl - day7BiliMgDl)) - (0.206 * (effectiveScr > 1.3 ? 1 : 0)) - (0.0065 * biliMgDl) - (0.0096 * (ptPat - ptCtrl));
      const calcLille = parseFloat((Math.exp(-rVal) / (1 + Math.exp(-rVal))).toFixed(2));
      lilleScore = calcLille;

      if (calcLille < 0.45) {
        lilleInterpretation = `Lille = ${calcLille} (< 0.45) ➔ ĐÁP ỨNG TỐT VỚI STEROID. Tiếp tục dùng đủ liệu trình Prednisolone 28 ngày rồi giảm liều dần.`;
      } else {
        lilleInterpretation = `🚨 Lille = ${calcLille} (≥ 0.45) ➔ KHÔNG ĐÁP ỨNG VỚI STEROID. Ngừng ngay Prednisolone để tránh nhiễm trùng cơ hội, cân nhắc ghép gan sớm!`;
      }
    }
  }

  // G. Paracentesis Albumin Replacement (8g Albumin / Liter for LVP > 5L)
  let lvpAlbuminRequiredGrams: number | null = null;
  let lvpAlbumin20PercentBottles: number | null = null;

  if (paracentesisLiters && paracentesisLiters > 0) {
    if (paracentesisLiters >= 5) {
      lvpAlbuminRequiredGrams = Math.round(paracentesisLiters * 8);
      // 1 bottle Albumin 20% 50mL = 10g Albumin
      lvpAlbumin20PercentBottles = Math.ceil(lvpAlbuminRequiredGrams / 10);
      recommendations.push(`Chọc tháo báng thể tích lớn (${paracentesisLiters} Lít): Bắt buộc truyền ${lvpAlbuminRequiredGrams}g Albumin (tương đương ${lvpAlbumin20PercentBottles} chai Albumin 20% 50mL) phòng ngừa suy tuần hoàn sau chọc (PPCD).`);
    } else {
      recommendations.push(`Chọc tháo báng < 5 Lít (${paracentesisLiters}L): Không bắt buộc truyền Albumin phòng ngừa PPCD.`);
    }
  }

  // H. Variceal Bleeding & Preemptive TIPS Criteria (Baveno VII)
  const isPreemptiveTipsIndicated = Boolean(hasActiveVaricealBleed && (
    cpClass === 'C' || (cpClass === 'B' && !!hasActiveBleedingAtEndoscopy)
  ));

  const varicealBleedingProtocol = `
PHÁC ĐỒ XUẤT HUYẾT VỠ GIÃN TMTQ (BAVENO VII 2022):
1. Thuốc co mạch tạng: Khởi động NGAY LẬP TỨC trước khi nội soi — Terlipressin 2mg IV mỗi 4 giờ (hoặc Octreotide 50mcg bolus rồi truyền 50mcg/giờ) duy trì 3 - 5 ngày.
2. Kháng sinh dự phòng: Ceftriaxone 1g IV mỗi 24 giờ trong 7 ngày (giảm tỷ lệ tái xuất huyết và tử vong).
3. Nội soi can thiệp: Thắt vòng cao su (EVL) trong vòng 12 giờ đầu sau khi ổn định huyết động.
4. Đích truyền máu hạn chế: Duy trì Hb 7 - 8 g/dL (Tránh truyền thừa làm tăng áp lực tĩnh mạch cửa gây vỡ tái phát).
${isPreemptiveTipsIndicated ? '5. 🚨 CHỈ ĐỊNH TIPS DỰ PHÒNG SỚM (Preemptive TIPS trong vòng 72 giờ đầu): Giảm 50% nguy cơ tử vong ở bệnh nhân Child C hoặc Child B có máu đang chảy qua nội soi!' : ''}
  `.trim();

  // I. SBP & HRS Protocols
  const sbpProtocol = `
PHÁC ĐỒ VIÊM PHÚC MẠC NHIỄM KHUẨN NGUYÊN PHÁT (SBP):
1. Chẩn đoán xác định: Khi Bạch cầu đa nhân dịch báng (PMN) ≥ 250 tế bào/mm³.
2. Kháng sinh: Cefotaxime 2g IV mỗi 8 giờ (hoặc Ceftriaxone 2g/ngày) trong 5 - 7 ngày.
3. Phác đồ truyền Albumin phòng ngừa Hội chứng Gan-Thận (HRS):
   - Ngày 1 (trong vòng 6h đầu): Truyền Albumin 20% liều 1.5 g/kg (${Math.round(weightKg * 1.5)}g Albumin = ${Math.round((weightKg * 1.5) / 10)} chai 50mL).
   - Ngày 3: Truyền Albumin 20% liều 1.0 g/kg (${Math.round(weightKg * 1.0)}g Albumin = ${Math.round((weightKg * 1.0) / 10)} chai 50mL).
   ➔ Giảm tỷ lệ suy thận HRS từ 33% xuống 10% và giảm tử vong từ 29% xuống 10%!
4. Dự phòng thứ phát lâu dài: Ciprofloxacin 500mg/ngày hoặc Bactrim 1 viên/ngày.
  `.trim();

  const hrsProtocol = `
PHÁC ĐỒ HỘI CHỨNG GAN THẬN (HRS-AKI TIÊU CHUẨN ICA 2023):
1. Chẩn đoán: AKI ở bệnh nhân xơ gan không đáp ứng sau 48h ngừng lợi tiểu + Bù Albumin 1 g/kg/ngày, không có sốc và không dùng thuốc độc thận.
2. Thuốc điều trị đầu tay: Terlipressin truyền tĩnh mạch liên tục khởi đầu 2 mg/ngày (tăng dần mỗi 48h lên 4 - 12 mg/ngày nếu Creatinine không giảm >25%) + Albumin 20 - 40 g/ngày.
3. Đích điều trị: Đưa Creatinine về < 133 umol/L (1.5 mg/dL) hoặc về mức nền ổn định trước đó.
  `.trim();

  // J. Emergency Flags
  if (hasActiveVaricealBleed) emergencyFlags.push('🚨 XUẤT HUYẾT TIÊU HÓA DO VỠ GIÃN TMTQ — Kích hoạt Terlipressin/Octreotide + Ceftriaxone + Nội soi thắt EVL khẩn!');
  if (isPreemptiveTipsIndicated) emergencyFlags.push('⚡ ĐẠT TIÊU CHUẨN TIPS DỰ PHÒNG SỚM (Preemptive TIPS < 72h theo Baveno VII)');
  if (isAsciticFluidPmnOver250) emergencyFlags.push('🚨 VIÊM PHÚC MẠC NHIỄM KHUẨN NGUYÊN PHÁT (SBP: PMN ≥ 250/mm³) — Bắt buộc truyền Albumin 1.5g/kg N1 & 1.0g/kg N3!');
  if (cpClass === 'C' || meldNa >= 20) emergencyFlags.push(`🚨 XƠ GAN MẤT BÙ NẶNG: MELD-Na = ${meldNa} điểm (Tử vong 3 tháng ${meldMortality})`);
  if (encephalopathy === 'grade_3_4') emergencyFlags.push('🚨 HÔN MÊ GAN ĐỘ 3 - 4: Nguy cơ tụt lưỡi hít sặc, cân nhắc đặt nội khí quản bảo vệ đường thở!');

  const clinicalSummary = `
BÁO CÁO GAN MẬT & XƠ GAN CHUYÊN SÂU (DOCSPACE CIRRHOSIS PRO):
- Phân loại Child-Pugh: ${cpClassLabel} (Tử vong 1 năm: ~${100 - parseInt(cp1Yr)}% | 2 năm: ~${100 - parseInt(cp2Yr)}%)
- Điểm MELD-Na 2016: ${meldNa} điểm (MELD gốc: ${meld} | Tử vong 3 tháng: ${meldMortality})
- Điểm MELD 3.0 (2022): ${meld30} điểm (${meld30Description})
- Đánh giá ALBI Grade: ${albiGrade} (${albiScore}) ➔ Tiên lượng: ${albiMedianSurvival}
- Sàng lọc xơ hóa FIB-4: ${fib4Interpretation} | APRI: ${apriInterpretation}
${maddreyDfScore !== null ? `- Viêm gan do rượu (Maddrey DF): ${maddreyDfScore} điểm ${isSevereAlcoholicHepatitis ? '(NẶNG: Có chỉ định Prednisolone)' : '(Nhẹ)'}` : ''}
${lilleScore !== null ? `- Điểm Lille Ngày 7: ${lilleScore} (${lilleInterpretation})` : ''}
- Khuyến cáo chính: ${recommendations.join(' | ')}
  `.trim();

  return {
    childPughScore: cpScore,
    childPughClass: cpClass,
    childPughClassLabel: cpClassLabel,
    childPughColor: cpColor,
    childPugh1YearSurvival: cp1Yr,
    childPugh2YearSurvival: cp2Yr,
    meldScore: meld,
    meldNaScore: meldNa,
    meldMortality3Month: meldMortality,
    meld30Score: meld30,
    meld30Description,
    albiScore,
    albiGrade,
    albiColor,
    albiMedianSurvival,
    fib4Score,
    fib4Interpretation,
    apriScore,
    apriInterpretation,
    maddreyDfScore,
    isSevereAlcoholicHepatitis,
    lilleScore,
    lilleInterpretation,
    lvpAlbuminRequiredGrams,
    lvpAlbumin20PercentBottles,
    isPreemptiveTipsIndicated,
    varicealBleedingProtocol,
    sbpProtocol,
    hrsProtocol,
    emergencyFlags,
    recommendations,
    clinicalSummary
  };
}

/**
 * 2. Render Half-Circle MELD-Na 2016 Gauge SVG (6 - 40 points)
 */
export function renderMeldGaugeSvg(meldNa: number): string {
  const w = 340;
  const h = 190;
  const cx = w / 2;
  const cy = 155;
  const r = 115;

  const clampedMeld = Math.max(6, Math.min(40, meldNa));
  // Angle: 6 corresponds to 180 deg (left), 40 corresponds to 0 deg (right)
  const angleDeg = 180 - ((clampedMeld - 6) / 34) * 180;
  const rad = (angleDeg * Math.PI) / 180;

  const needleX = cx + (r - 20) * Math.cos(rad);
  const needleY = cy - (r - 20) * Math.sin(rad);

  const getPt = (val: number, radius: number) => {
    const a = (180 - ((Math.max(6, Math.min(40, val)) - 6) / 34) * 180) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(a), y: cy - radius * Math.sin(a) };
  };

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-surface); border-radius:8px;">
      <!-- MELD Arcs -->
      <!-- Green (6 - 15) Low Risk -->
      <path d="M ${getPt(6, r).x} ${getPt(6, r).y} A ${r} ${r} 0 0 1 ${getPt(15, r).x} ${getPt(15, r).y} L ${getPt(15, r - 20).x} ${getPt(15, r - 20).y} A ${r - 20} ${r - 20} 0 0 0 ${getPt(6, r - 20).x} ${getPt(6, r - 20).y} Z" fill="#10b981" opacity="0.9" />

      <!-- Yellow (15 - 20) Moderate Risk -->
      <path d="M ${getPt(15, r).x} ${getPt(15, r).y} A ${r} ${r} 0 0 1 ${getPt(20, r).x} ${getPt(20, r).y} L ${getPt(20, r - 20).x} ${getPt(20, r - 20).y} A ${r - 20} ${r - 20} 0 0 0 ${getPt(15, r - 20).x} ${getPt(15, r - 20).y} Z" fill="#f59e0b" opacity="0.9" />

      <!-- Orange (20 - 30) High Risk -->
      <path d="M ${getPt(20, r).x} ${getPt(20, r).y} A ${r} ${r} 0 0 1 ${getPt(30, r).x} ${getPt(30, r).y} L ${getPt(30, r - 20).x} ${getPt(30, r - 20).y} A ${r - 20} ${r - 20} 0 0 0 ${getPt(20, r - 20).x} ${getPt(20, r - 20).y} Z" fill="#ea580c" opacity="0.9" />

      <!-- Red (30 - 40) Critical Risk -->
      <path d="M ${getPt(30, r).x} ${getPt(30, r).y} A ${r} ${r} 0 0 1 ${getPt(40, r).x} ${getPt(40, r).y} L ${getPt(40, r - 20).x} ${getPt(40, r - 20).y} A ${r - 20} ${r - 20} 0 0 0 ${getPt(30, r - 20).x} ${getPt(30, r - 20).y} Z" fill="#dc2626" opacity="0.95" />

      <!-- Labels -->
      <text x="${getPt(10, r - 30).x}" y="${getPt(10, r - 30).y}" fill="#10b981" font-size="8.5" font-weight="800" text-anchor="middle">&lt;15</text>
      <text x="${getPt(17.5, r - 30).x}" y="${getPt(17.5, r - 30).y}" fill="#f59e0b" font-size="8.5" font-weight="800" text-anchor="middle">15-20</text>
      <text x="${getPt(25, r - 30).x}" y="${getPt(25, r - 30).y}" fill="#ea580c" font-size="8.5" font-weight="800" text-anchor="middle">20-30</text>
      <text x="${getPt(35, r - 30).x}" y="${getPt(35, r - 30).y}" fill="#dc2626" font-size="8.5" font-weight="800" text-anchor="middle">&gt;30</text>

      <!-- Gauge Needle -->
      <line x1="${cx}" y1="${cy}" x2="${needleX}" y2="${needleY}" stroke="var(--color-text)" stroke-width="3" stroke-linecap="round" />
      <circle cx="${cx}" cy="${cy}" r="6" fill="#b45309" stroke="#ffffff" stroke-width="2" />

      <!-- Display Value in Center -->
      <text x="${cx}" y="${cy + 22}" fill="var(--color-text)" font-size="14" font-weight="900" text-anchor="middle">
        MELD-Na: ${meldNa} <tspan font-size="9" fill="var(--color-text-muted)">điểm</tspan>
      </text>
    </svg>
  `;
}

/**
 * 3. Render ALBI vs Child-Pugh 2D Functional Matrix SVG
 */
export function renderAlbiMatrixSvg(albiGrade: string, cpClass: string): string {
  const w = 340;
  const h = 180;

  const cpCols = [
    { id: 'A', label: 'Child A', x: 80, w: 75 },
    { id: 'B', label: 'Child B', x: 165, w: 75 },
    { id: 'C', label: 'Child C', x: 250, w: 75 }
  ];

  const albiRows = [
    { id: 'Grade 1', label: 'ALBI G1', y: 35, color: '#10b981' },
    { id: 'Grade 2', label: 'ALBI G2', y: 75, color: '#f59e0b' },
    { id: 'Grade 3', label: 'ALBI G3', y: 115, color: '#dc2626' }
  ];

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-surface); border-radius:8px;">
      <!-- Title -->
      <text x="15" y="20" fill="var(--color-text-muted)" font-size="9.5" font-weight="800">ĐỐI SÁNH ALBI vs CHILD-PUGH</text>
      ${cpCols.map(c => `<text x="${c.x + c.w / 2}" y="20" fill="var(--color-text)" font-size="10" font-weight="800" text-anchor="middle">${c.label}</text>`).join('')}

      <!-- Grid Rows -->
      ${albiRows.map(r => `
        <text x="70" y="${r.y + 20}" fill="${r.color}" font-size="9.5" font-weight="800" text-anchor="end">${r.label}</text>
        ${cpCols.map(c => {
          const isSelected = r.id === albiGrade && c.id === cpClass;
          return `
            <g>
              <rect x="${c.x}" y="${r.y}" width="${c.w}" height="30" rx="4" fill="${r.color}" opacity="${isSelected ? '1.0' : '0.25'}" stroke="${isSelected ? '#ffffff' : 'none'}" stroke-width="${isSelected ? '2' : '0'}" />
              ${isSelected ? `
                <circle cx="${c.x + c.w / 2}" cy="${r.y + 15}" r="5" fill="#ffffff" />
              ` : ''}
            </g>
          `;
        }).join('')}
      `).join('')}

      <!-- Footer Note -->
      <text x="${w / 2}" y="165" fill="var(--color-text-muted)" font-size="9" text-anchor="middle">
        ALBI đánh giá khách quan dự trữ chức năng gan trước phẫu thuật HCC / TACE
      </text>
    </svg>
  `;
}
