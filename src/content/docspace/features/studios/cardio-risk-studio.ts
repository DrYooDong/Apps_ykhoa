/**
 * DocSpace — Cardiovascular Risk, GDMT & Lipidology Research Studio Pro ($10,000 Level)
 * Comprehensive ESC SCORE2 / SCORE2-OP, AHA/ACC ASCVD, Stepwise Lipid Cascade, GDMT 4-Pillars & 20 Presets
 */

export interface CardioRiskPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  category: 'secondary_ascvd' | 'diabetes_ckd' | 'primary_fh' | 'heart_failure_gdmt' | 'elderly_sams';
  description: string;
  values: CardioRiskInputs;
}

export interface CardioRiskInputs {
  age: number;
  gender: 'male' | 'female';
  weightKg?: number;
  
  // Risk Factors & Vitals
  isSmoker: boolean;
  systolicBp: number;       // mmHg
  diastolicBp?: number;     // mmHg
  isTreatedHypertension?: boolean;
  
  // Lipid Profile
  totalCholesterolMmol: number; // mmol/L (mg/dL / 38.67)
  hdlCholesterolMmol: number;   // mmol/L
  ldlCholesterolMmol: number;   // mmol/L
  triglyceridesMmol?: number;   // mmol/L
  apolipoproteinBMgDl?: number; // mg/dL
  lipoproteinAMgDl?: number;    // mg/dL (Lp(a) > 50 mg/dL is risk enhancer)
  
  // Medical History & Comorbidities
  hasCvdHistory: boolean;       // Documented ASCVD (Post-MI, PCI, CABG, Stroke, TIA, PAD)
  hasRecurrentAscvdWithin2Yrs?: boolean; // Extreme risk: 2nd event in 2 years
  hasDiabetes: boolean;
  diabetesDurationYears?: number;
  hasTargetOrganDamage?: boolean; // Microalbuminuria, retinopathy, neuropathy
  hasCkd: boolean;
  egfrMlMin?: number;           // eGFR
  isFamilialHypercholesterolemia?: boolean;
  
  // Heart Failure Profile (GDMT)
  isHeartFailureEvaluated?: boolean;
  lvefPercent?: number;         // LVEF % (<=40 HFrEF, 41-49 HFmrEF, >=50 HFpEF)
  nyhaClass?: 'I' | 'II' | 'III' | 'IV';
  currentArniDose?: 'none' | 'low' | 'medium' | 'target'; // Sacubitril/Valsartan
  currentBetaBlockerDose?: 'none' | 'low' | 'medium' | 'target';
  currentMraDose?: 'none' | 'low' | 'target'; // Spironolactone / Eplerenone
  currentSglt2iDose?: 'none' | 'target'; // Dapagliflozin / Empagliflozin 10mg
  
  // Statin Tolerance
  isStatinIntolerant?: boolean; // SAMS (Statin-Associated Muscle Symptoms)
}

export interface CardioRiskResult {
  // 1. 10-Year CVD Risk Estimation
  score2Percentage: number;
  score2ModelUsed: 'SCORE2 (40-69)' | 'SCORE2-OP (70-89)' | 'ASCVD Secondary (100%)';
  ascvd10YearPercentage: number;
  riskCategory: 'low' | 'moderate' | 'high' | 'very_high' | 'extreme';
  riskCategoryLabel: string;
  riskColor: string;
  
  // 2. Lipid Targets & Cascades
  targetLdlMmol: number;
  targetLdlMgDl: number;
  targetNonHdlMmol: number;
  targetApoBMgDl: number;
  currentNonHdlMmol: number;
  currentLdlGapMmol: number;
  currentLdlGapPercent: number;
  
  // 3. Stepwise Statin & Non-Statin Projections
  predictedLdlHighStatinMmol: number;
  predictedLdlStatinEzetimibeMmol: number;
  predictedLdlTriplePcsk9iMmol: number;
  stepwiseRegimenRecommendation: string;
  
  // 4. Heart Failure GDMT Status
  gdmtPillarsCount: number; // 0 - 4
  gdmtOptimizationScore: number; // 0 - 100%
  gdmtRecommendations: string[];
  
  // 5. Treatment Steps, Flags & Clinical Summary
  emergencyFlags: string[];
  treatmentSteps: string[];
  recommendations: string[];
  clinicalSummary: string;
}

export const CARDIO_PRESETS: CardioRiskPreset[] = [
  // 1. Secondary Prevention / ASCVD & Post-ACS
  {
    id: 'post_stemi_extreme_risk',
    name: '1. Sau Can Thiệp Mạch Vành Cấp (STEMI PCI | Nguy Cơ Cực Kỳ Cao)',
    badge: '🚨 Đích LDL-C < 1.4 mmol/L (<55 mg/dL)',
    badgeColor: '#dc2626',
    category: 'secondary_ascvd',
    description: 'Nam 58 tuổi vừa đặt Stent DES LAD sau STEMI, LDL-C 4.2 mmol/L. Cần Statin cường độ cao (Rosuva 40mg) phối hợp sớm Ezetimibe 10mg để đạt đích < 1.4.',
    values: {
      age: 58, gender: 'male', isSmoker: true, systolicBp: 135, diastolicBp: 82,
      totalCholesterolMmol: 6.2, hdlCholesterolMmol: 0.95, ldlCholesterolMmol: 4.2, triglyceridesMmol: 2.3,
      hasCvdHistory: true, hasRecurrentAscvdWithin2Yrs: false, hasDiabetes: false, hasCkd: false,
      isHeartFailureEvaluated: true, lvefPercent: 42, nyhaClass: 'II',
      currentArniDose: 'low', currentBetaBlockerDose: 'medium', currentMraDose: 'none', currentSglt2iDose: 'target'
    }
  },
  {
    id: 'recurrent_acs_extreme_target_1_0',
    name: '2. Biến Cố Mạch Vành Tái Phát Trong 2 Năm (Đích LDL < 1.0 mmol/L)',
    badge: '🚨 Nguy Cơ Cực Đoan: Đích LDL < 1.0 (<40 mg/dL)',
    badgeColor: '#dc2626',
    category: 'secondary_ascvd',
    description: 'Nữ 64 tuổi tái phát NMCT lần 2 dù đang uống Atorvastatin 40mg, LDL-C 2.2 mmol/L. Đạt tiêu chuẩn đích LDL < 1.0 mmol/L theo ESC 2021, chỉ định thêm PCSK9i.',
    values: {
      age: 64, gender: 'female', isSmoker: false, systolicBp: 130, diastolicBp: 78,
      totalCholesterolMmol: 4.8, hdlCholesterolMmol: 1.1, ldlCholesterolMmol: 2.2,
      hasCvdHistory: true, hasRecurrentAscvdWithin2Yrs: true, hasDiabetes: true, hasCkd: false
    }
  },
  {
    id: 'peripheral_artery_disease_pad',
    name: '3. Bệnh Động Mạch Ngoại Biên Nặng Kèm Đột Quỵ Thiếu Máu Não Cũ',
    badge: 'Đa Ổ Xơ Vữa ASCVD Polyvascular',
    badgeColor: '#ef4444',
    category: 'secondary_ascvd',
    description: 'Nam 68 tuổi đau cách hồi chi dưới ABI 0.55 + tiền sử đột quỵ nhồi máu não 1 năm trước, LDL-C 3.5 mmol/L. Nguy cơ tim mạch xơ vữa đa ổ (Polyvascular).',
    values: {
      age: 68, gender: 'male', isSmoker: true, systolicBp: 145, diastolicBp: 85,
      totalCholesterolMmol: 5.6, hdlCholesterolMmol: 0.9, ldlCholesterolMmol: 3.5,
      hasCvdHistory: true, hasDiabetes: false, hasCkd: false
    }
  },

  // 2. Diabetes & CKD High Risk
  {
    id: 'diabetes_ckd_target_organ',
    name: '4. ĐTĐ Type 2 Lâu Năm Có Tổn Thương Thận & Đạm Niệu (CKD G3b)',
    badge: 'Nguy Cơ Rất Cao | Đích LDL < 1.4',
    badgeColor: '#ef4444',
    category: 'diabetes_ckd',
    description: 'Nữ 66 tuổi ĐTĐ 15 năm, eGFR 38 mL/p, UACR 450 mg/g, LDL-C 3.8 mmol/L. Chỉ định Statin cường độ cao + SGLT2i bảo vệ thận và tim mạch.',
    values: {
      age: 66, gender: 'female', isSmoker: false, systolicBp: 142, diastolicBp: 84,
      totalCholesterolMmol: 5.8, hdlCholesterolMmol: 1.05, ldlCholesterolMmol: 3.8,
      hasCvdHistory: false, hasDiabetes: true, diabetesDurationYears: 15, hasTargetOrganDamage: true,
      hasCkd: true, egfrMlMin: 38
    }
  },
  {
    id: 'young_diabetic_moderate_risk',
    name: '5. Người Trẻ Mắc ĐTĐ Type 2 Mới Khởi Phát (Nguy Cơ Trung Bình)',
    badge: 'Đích LDL < 2.6 mmol/L (<100 mg/dL)',
    badgeColor: '#0284c7',
    category: 'diabetes_ckd',
    description: 'Nam 38 tuổi ĐTĐ 3 năm không có tổn thương cơ quan đích, HA 125/75, LDL-C 3.2 mmol/L. Đích LDL-C < 2.6 mmol/L với Statin cường độ trung bình.',
    values: {
      age: 38, gender: 'male', isSmoker: false, systolicBp: 125, diastolicBp: 75,
      totalCholesterolMmol: 5.1, hdlCholesterolMmol: 1.2, ldlCholesterolMmol: 3.2,
      hasCvdHistory: false, hasDiabetes: true, diabetesDurationYears: 3, hasTargetOrganDamage: false, hasCkd: false
    }
  },

  // 3. Primary Prevention & Familial Hypercholesterolemia (FH)
  {
    id: 'familial_hypercholesterolemia_dlcn',
    name: '6. Tăng Cholesterol Máu Gia Đình Dị Hợp Tử (HeFH | LDL = 6.8 mmol/L)',
    badge: 'HeFH: Đích LDL < 1.4 mmol/L | Statin + Ezetimibe + PCSK9i',
    badgeColor: '#dc2626',
    category: 'primary_fh',
    description: 'Nam 42 tuổi gân gót Achilles dày, u vàng mí mắt xanthelasma, LDL-C 6.8 mmol/L (263 mg/dL), bố mất sớm vì NMCT tuổi 45. Bắt buộc phối hợp 3 thuốc hạ lipid.',
    values: {
      age: 42, gender: 'male', isSmoker: false, systolicBp: 130, diastolicBp: 80,
      totalCholesterolMmol: 9.2, hdlCholesterolMmol: 1.1, ldlCholesterolMmol: 6.8,
      hasCvdHistory: false, hasDiabetes: false, hasCkd: false, isFamilialHypercholesterolemia: true
    }
  },
  {
    id: 'smoker_htn_high_score2',
    name: '7. Tăng Huyết Áp Kèm Nghiện Thuốc Lá Nặng (SCORE2 = 11% | Nguy Cơ Cao)',
    badge: 'SCORE2 = 11% | Đích LDL < 1.8 mmol/L',
    badgeColor: '#f59e0b',
    category: 'primary_fh',
    description: 'Nam 55 tuổi hút thuốc lá 30 bao-năm, HATT 160 mmHg, LDL-C 4.0 mmol/L, SCORE2 11%. Khuyến cáo cai thuốc lá, kiểm soát HA < 130/80 và Statin cường độ cao.',
    values: {
      age: 55, gender: 'male', isSmoker: true, systolicBp: 160, diastolicBp: 95,
      totalCholesterolMmol: 6.4, hdlCholesterolMmol: 0.9, ldlCholesterolMmol: 4.0,
      hasCvdHistory: false, hasDiabetes: false, hasCkd: false
    }
  },

  // 4. Heart Failure GDMT Optimization
  {
    id: 'hfref_gdmt_4_pillars',
    name: '8. Suy Tim Phân Suất Tống Máu Giảm (HFrEF EF 28% | Tối Ưu 4 Trụ Cột GDMT)',
    badge: 'Tối Ưu GDMT 4 Trụ Cột: ARNI + BB + MRA + SGLT2i',
    badgeColor: '#7c3aed',
    category: 'heart_failure_gdmt',
    description: 'Nam 62 tuổi suy tim sau NMCT EF 28% NYHA III. Cần khởi động và chỉnh liều 4 trụ cột cứu sống: Sacubitril/Valsartan + Bisoprolol + Spironolactone + Dapagliflozin.',
    values: {
      age: 62, gender: 'male', isSmoker: false, systolicBp: 115, diastolicBp: 70,
      totalCholesterolMmol: 4.2, hdlCholesterolMmol: 1.0, ldlCholesterolMmol: 1.9,
      hasCvdHistory: true, hasDiabetes: false, hasCkd: false,
      isHeartFailureEvaluated: true, lvefPercent: 28, nyhaClass: 'III',
      currentArniDose: 'low', currentBetaBlockerDose: 'low', currentMraDose: 'target', currentSglt2iDose: 'target'
    }
  },
  {
    id: 'hfpef_sglt2i_class1',
    name: '9. Suy Tim Phân Suất Tống Máu Bảo Tồn (HFpEF EF 55% | Chỉ Định SGLT2i)',
    badge: 'HFpEF: SGLT2i Class 1 (EMPEROR-Preserved)',
    badgeColor: '#0284c7',
    category: 'heart_failure_gdmt',
    description: 'Nữ 70 tuổi THA béo phì, EF 55%, E/e\' 16, NT-proBNP 1400 pg/mL. Khuyến cáo dùng Dapagliflozin/Empagliflozin 10mg để giảm nhập viện suy tim.',
    values: {
      age: 70, gender: 'female', isSmoker: false, systolicBp: 138, diastolicBp: 80,
      totalCholesterolMmol: 5.0, hdlCholesterolMmol: 1.2, ldlCholesterolMmol: 2.9,
      hasCvdHistory: false, hasDiabetes: true, hasCkd: false,
      isHeartFailureEvaluated: true, lvefPercent: 55, nyhaClass: 'II',
      currentArniDose: 'none', currentBetaBlockerDose: 'none', currentMraDose: 'low', currentSglt2iDose: 'target'
    }
  },

  // 5. Elderly & Statin Intolerance
  {
    id: 'elderly_score2_op_78yo',
    name: '10. Đánh Giá Nguy Cơ Người Cao Tuổi (SCORE2-OP Tuổi 78)',
    badge: 'SCORE2-OP = 14% | Cá Thể Hóa Theo Thể Trạng',
    badgeColor: '#f59e0b',
    category: 'elderly_sams',
    description: 'Cụ bà 78 tuổi không ĐTĐ, HA 140 mmHg, LDL-C 3.6 mmol/L, SCORE2-OP 14%. Xem xét dùng Statin cường độ trung bình dựa theo tuổi thọ kỳ vọng và thể trạng.',
    values: {
      age: 78, gender: 'female', isSmoker: false, systolicBp: 140, diastolicBp: 75,
      totalCholesterolMmol: 5.8, hdlCholesterolMmol: 1.3, ldlCholesterolMmol: 3.6,
      hasCvdHistory: false, hasDiabetes: false, hasCkd: false
    }
  },
  {
    id: 'statin_intolerance_bempedoic',
    name: '11. Không Dung Nạp Statin Do Đau Cơ (SAMS | Bempedoic Acid + Ezetimibe)',
    badge: 'SAMS Không Dung Nạp Statin: Bempedoic + Ezetimibe',
    badgeColor: '#ea580c',
    category: 'elderly_sams',
    description: 'Nam 56 tuổi tiền sử can thiệp mạch vành bị đau cơ tăng CK khi dùng Atorvastatin và Rosuvastatin. Thay thế bằng Bempedoic Acid 180mg + Ezetimibe 10mg ± PCSK9i.',
    values: {
      age: 56, gender: 'male', isSmoker: false, systolicBp: 130, diastolicBp: 80,
      totalCholesterolMmol: 6.0, hdlCholesterolMmol: 1.1, ldlCholesterolMmol: 4.1,
      hasCvdHistory: true, hasDiabetes: false, hasCkd: false, isStatinIntolerant: true
    }
  },
  {
    id: 'elevated_lpa_risk_enhancer',
    name: '12. Tăng Lipoprotein(a) Độc Lập Gây Xơ Vữa Sớm (Lp(a) = 145 mg/dL)',
    badge: 'Lp(a) Cao: Yếu Tố Khuếch Đại Nguy Cơ Tim Mạch',
    badgeColor: '#dc2626',
    category: 'primary_fh',
    description: 'Nữ 46 tuổi LDL-C 3.0 mmol/L nhưng xét nghiệm Lp(a) 145 mg/dL (> 50 mg/dL). Nâng bậc điều trị tích cực hơn do nguy cơ xơ vữa di truyền cao.',
    values: {
      age: 46, gender: 'female', isSmoker: false, systolicBp: 125, diastolicBp: 75,
      totalCholesterolMmol: 5.2, hdlCholesterolMmol: 1.4, ldlCholesterolMmol: 3.0, lipoproteinAMgDl: 145,
      hasCvdHistory: false, hasDiabetes: false, hasCkd: false
    }
  },
  {
    id: 'young_healthy_screening',
    name: '13. Khám Sức Khỏe Định Kỳ Người Trẻ (SCORE2 < 1% | Nguy Cơ Thấp)',
    badge: 'SCORE2 = 0.8% | Duy Trì Lối Sống Lành Mạnh',
    badgeColor: '#10b981',
    category: 'primary_fh',
    description: 'Nữ 32 tuổi không hút thuốc, HA 110/70, LDL-C 2.6 mmol/L. Nguy cơ biến cố 10 năm cực thấp (< 1%), tiếp tục chế độ ăn Địa Trung Hải.',
    values: {
      age: 32, gender: 'female', isSmoker: false, systolicBp: 110, diastolicBp: 70,
      totalCholesterolMmol: 4.4, hdlCholesterolMmol: 1.5, ldlCholesterolMmol: 2.6,
      hasCvdHistory: false, hasDiabetes: false, hasCkd: false
    }
  },
  {
    id: 'post_cabg_multivessel',
    name: '14. Sau Phẫu Thuật Bắc Cầu Mạch Vành (CABG 3 Cầu | LDL = 3.6 mmol/L)',
    badge: 'Bảo Vệ Cầu Nối Mạch Vành: Đích LDL < 1.4',
    badgeColor: '#dc2626',
    category: 'secondary_ascvd',
    description: 'Nam 65 tuổi sau mổ bắc cầu mạch vành 3 thân, LDL 3.6 mmol/L. Cần duy trì thông thoáng cầu nối tĩnh mạch hiển bằng Statin liều cao và DAPT.',
    values: {
      age: 65, gender: 'male', isSmoker: false, systolicBp: 128, diastolicBp: 76,
      totalCholesterolMmol: 5.5, hdlCholesterolMmol: 1.0, ldlCholesterolMmol: 3.6,
      hasCvdHistory: true, hasDiabetes: true, hasCkd: false
    }
  },
  {
    id: 'severe_hypertension_tod_risk',
    name: '15. Tăng Huyết Áp Độ 3 Kèm Dày Thất Trái (LVH | Nguy Cơ Tim Mạch Cao)',
    badge: 'HA ≥ 180/110: Nguy Cơ Tim Mạch Cao Tự Nhiên',
    badgeColor: '#ef4444',
    category: 'primary_fh',
    description: 'Nam 50 tuổi HA 185/115 mmHg chưa điều trị kèm phì đại thất trái trên ECG. Xếp ngay vào nhóm Nguy cơ Cao bất kể điểm SCORE2.',
    values: {
      age: 50, gender: 'male', isSmoker: true, systolicBp: 185, diastolicBp: 115,
      totalCholesterolMmol: 5.6, hdlCholesterolMmol: 1.0, ldlCholesterolMmol: 3.4,
      hasCvdHistory: false, hasDiabetes: false, hasCkd: false
    }
  },
  {
    id: 'triple_therapy_pcsk9i_success',
    name: '16. Đạt Đích LDL < 1.0 mmol/L Nhờ Phối Hợp 3 Thuốc Hạ Lipid (Triple Therapy)',
    badge: '✅ Thành Công: LDL 4.8 ➔ 0.8 mmol/L (-83%)',
    badgeColor: '#10b981',
    category: 'secondary_ascvd',
    description: 'Nam 54 tuổi sau đặt Stent mạch vành dùng Rosuvastatin 20mg + Ezetimibe 10mg + Evolocumab 140mg đạt LDL-C 0.8 mmol/L (31 mg/dL) an toàn.',
    values: {
      age: 54, gender: 'male', isSmoker: false, systolicBp: 120, diastolicBp: 75,
      totalCholesterolMmol: 2.8, hdlCholesterolMmol: 1.2, ldlCholesterolMmol: 0.8,
      hasCvdHistory: true, hasDiabetes: false, hasCkd: false
    }
  },
  {
    id: 'hfref_hyperkalemia_mra_barrier',
    name: '17. Rào Cản Tăng Kali Máu Khi Chuẩn Độ Thuốc Kháng MRA Trong Suy Tim',
    badge: 'Kali 5.4 mmol/L: Cân Nhắc Patiromer / Lokelma',
    badgeColor: '#ea580c',
    category: 'heart_failure_gdmt',
    description: 'Nam 68 tuổi HFrEF EF 30% dùng Spironolactone 25mg bị Kali máu tăng 5.4 mmol/L. Sử dụng thuốc gắn Kali đường tiêu hóa để tiếp tục duy trì MRA.',
    values: {
      age: 68, gender: 'male', isSmoker: false, systolicBp: 118, diastolicBp: 72,
      totalCholesterolMmol: 4.5, hdlCholesterolMmol: 1.1, ldlCholesterolMmol: 2.1,
      hasCvdHistory: true, hasDiabetes: true, hasCkd: true, egfrMlMin: 45,
      isHeartFailureEvaluated: true, lvefPercent: 30, nyhaClass: 'II',
      currentArniDose: 'medium', currentBetaBlockerDose: 'target', currentMraDose: 'low', currentSglt2iDose: 'target'
    }
  },
  {
    id: 'severe_mixed_dyslipidemia',
    name: '18. Rối Loạn Lipid Máu Hỗn Hợp Nặng (Triglyceride = 8.5 mmol/L | Nguy Cơ Viêm Tụy)',
    badge: '🚨 TG > 5.6 mmol/L: Nguy Cơ Viêm Tụy Cấp',
    badgeColor: '#dc2626',
    category: 'primary_fh',
    description: 'Nam 44 tuổi ĐTĐ Type 2 kiểm soát kém, Triglyceride 8.5 mmol/L (750 mg/dL). Ưu tiên dùng Fenofibrate 145mg/ngày để hạ TG ngừa viêm tụy trước khi tối ưu LDL.',
    values: {
      age: 44, gender: 'male', isSmoker: true, systolicBp: 135, diastolicBp: 85,
      totalCholesterolMmol: 9.8, hdlCholesterolMmol: 0.75, ldlCholesterolMmol: 4.8, triglyceridesMmol: 8.5,
      hasCvdHistory: false, hasDiabetes: true, hasCkd: false
    }
  },
  {
    id: 'stroke_tia_carotid_stenosis',
    name: '19. Cơn Thiếu Máu Não Thoáng Qua (TIA) Do Hẹp Động Mạch Cảnh 70%',
    badge: 'Xơ Vữa Động Mạch Cảnh: Đích LDL < 1.4',
    badgeColor: '#ef4444',
    category: 'secondary_ascvd',
    description: 'Nữ 67 tuổi méo miệng thoáng qua 30 phút, siêu âm hẹp ĐM cảnh trong 70%, LDL-C 3.9 mmol/L. Điều trị Statin cường độ cao + Kháng kết tập tiểu cầu kép DAPT.',
    values: {
      age: 67, gender: 'female', isSmoker: false, systolicBp: 148, diastolicBp: 88,
      totalCholesterolMmol: 6.0, hdlCholesterolMmol: 1.15, ldlCholesterolMmol: 3.9,
      hasCvdHistory: true, hasDiabetes: false, hasCkd: false
    }
  },
  {
    id: 'post_myocarditis_hfrec_recovery',
    name: '20. Hồi Phục Phân Suất Tống Máu Sau Viêm Cơ Tim (HFrecEF 25% ➔ 52%)',
    badge: 'HFrecEF Hồi Phục: Tiếp Tục Duy Trì GDMT',
    badgeColor: '#10b981',
    category: 'heart_failure_gdmt',
    description: 'Nam 35 tuổi sau viêm cơ tim cấp EF từ 25% đã hồi phục lên 52%. Khuyến cáo BẮT BUỘC tiếp tục duy trì GDMT theo thử nghiệm TRED-HF để tránh suy tim tái phát.',
    values: {
      age: 35, gender: 'male', isSmoker: false, systolicBp: 118, diastolicBp: 74,
      totalCholesterolMmol: 4.0, hdlCholesterolMmol: 1.3, ldlCholesterolMmol: 2.1,
      hasCvdHistory: false, hasDiabetes: false, hasCkd: false,
      isHeartFailureEvaluated: true, lvefPercent: 52, nyhaClass: 'I',
      currentArniDose: 'target', currentBetaBlockerDose: 'target', currentMraDose: 'target', currentSglt2iDose: 'target'
    }
  }
];

/**
 * 1. Master Calculation & Reasoning Engine for Cardio Studio Pro
 */
export function analyzeCardioStudio(inputs: CardioRiskInputs): CardioRiskResult {
  const {
    age, gender,
    isSmoker, systolicBp, diastolicBp, isTreatedHypertension,
    totalCholesterolMmol, hdlCholesterolMmol, ldlCholesterolMmol,
    hasCvdHistory, hasRecurrentAscvdWithin2Yrs, hasDiabetes, diabetesDurationYears = 5,
    hasTargetOrganDamage, hasCkd, egfrMlMin, isFamilialHypercholesterolemia,
    isHeartFailureEvaluated, lvefPercent, nyhaClass,
    currentArniDose = 'none', currentBetaBlockerDose = 'none',
    currentMraDose = 'none', currentSglt2iDose = 'none',
    isStatinIntolerant
  } = inputs;

  const isMale = gender === 'male';
  const emergencyFlags: string[] = [];
  const treatmentSteps: string[] = [];
  const recommendations: string[] = [];

  // Non-HDL Calculation (Total - HDL)
  const currentNonHdlMmol = parseFloat((Math.max(0, totalCholesterolMmol - hdlCholesterolMmol)).toFixed(2));

  // A. Risk Stratification (ESC 2021 / 2026 Guidelines)
  let riskCategory: 'low' | 'moderate' | 'high' | 'very_high' | 'extreme' = 'low';
  let riskCategoryLabel = 'Nguy cơ Thấp (Low Risk)';
  let riskColor = '#10b981';
  let score2Est = 2;
  let score2Model: CardioRiskResult['score2ModelUsed'] = age >= 70 ? 'SCORE2-OP (70-89)' : 'SCORE2 (40-69)';

  if (hasRecurrentAscvdWithin2Yrs) {
    riskCategory = 'extreme';
    riskCategoryLabel = 'Nguy cơ CỰC ĐOAN (Extreme Risk — Biến cố xơ vữa tái phát trong 2 năm)';
    riskColor = '#dc2626';
    score2Est = 35;
    score2Model = 'ASCVD Secondary (100%)';
  } else if (hasCvdHistory) {
    riskCategory = 'very_high';
    riskCategoryLabel = 'Nguy cơ RẤT CAO (Very High Risk — Tiền sử Bệnh tim mạch xơ vữa ASCVD)';
    riskColor = '#dc2626';
    score2Est = 28;
    score2Model = 'ASCVD Secondary (100%)';
  } else if (isFamilialHypercholesterolemia && (hasCvdHistory || isSmoker || systolicBp >= 140)) {
    riskCategory = 'very_high';
    riskCategoryLabel = 'Nguy cơ RẤT CAO (Tăng Cholesterol máu gia đình FH có kèm yếu tố nguy cơ)';
    riskColor = '#dc2626';
    score2Est = 24;
  } else if (hasCkd && (egfrMlMin !== undefined && egfrMlMin < 30)) {
    riskCategory = 'very_high';
    riskCategoryLabel = 'Nguy cơ RẤT CAO (Suy thận mạn nặng eGFR < 30 mL/p)';
    riskColor = '#dc2626';
    score2Est = 22;
  } else if (hasDiabetes && (hasTargetOrganDamage || diabetesDurationYears >= 20)) {
    riskCategory = 'very_high';
    riskCategoryLabel = 'Nguy cơ RẤT CAO (Đái tháo đường có tổn thương cơ quan đích hoặc kéo dài ≥ 20 năm)';
    riskColor = '#dc2626';
    score2Est = 20;
  } else if (totalCholesterolMmol >= 8.0 || systolicBp >= 180 || (isFamilialHypercholesterolemia)) {
    riskCategory = 'high';
    riskCategoryLabel = 'Nguy cơ CAO (Yếu tố nguy cơ đơn lẻ tăng rất cao hoặc FH)';
    riskColor = '#f59e0b';
    score2Est = 14;
  } else if (hasDiabetes && diabetesDurationYears >= 10) {
    riskCategory = 'high';
    riskCategoryLabel = 'Nguy cơ CAO (Đái tháo đường kéo dài ≥ 10 năm chưa có biến chứng)';
    riskColor = '#f59e0b';
    score2Est = 12;
  } else if (hasCkd) {
    riskCategory = 'high';
    riskCategoryLabel = 'Nguy cơ CAO (Bệnh thận mạn mức độ trung bình eGFR 30 - 59 mL/p)';
    riskColor = '#f59e0b';
    score2Est = 11;
  } else {
    // Primary Prevention SCORE2 / SCORE2-OP estimation
    let baseScore = isMale ? 3 : 1.5;
    if (age >= 75) baseScore += 10;
    else if (age >= 70) baseScore += 8;
    else if (age >= 65) baseScore += 6;
    else if (age >= 60) baseScore += 4;
    else if (age >= 50) baseScore += 2.5;

    if (isSmoker) baseScore += isMale ? 4.5 : 3.5;
    if (systolicBp >= 160) baseScore += 4;
    else if (systolicBp >= 140) baseScore += 2;
    if (currentNonHdlMmol >= 5.5) baseScore += 3.5;
    else if (currentNonHdlMmol >= 4.5) baseScore += 2;

    score2Est = Math.min(38, Math.max(0.5, parseFloat(baseScore.toFixed(1))));

    if (age >= 70) {
      score2Model = 'SCORE2-OP (70-89)';
      if (score2Est >= 15) { riskCategory = 'very_high'; riskCategoryLabel = 'Nguy cơ RẤT CAO (SCORE2-OP ≥ 15%)'; riskColor = '#dc2626'; }
      else if (score2Est >= 7.5) { riskCategory = 'high'; riskCategoryLabel = 'Nguy cơ CAO (SCORE2-OP 7.5 - 14%)'; riskColor = '#f59e0b'; }
      else { riskCategory = 'moderate'; riskCategoryLabel = 'Nguy cơ TRUNG BÌNH (SCORE2-OP < 7.5%)'; riskColor = '#0284c7'; }
    } else if (age >= 50) {
      if (score2Est >= 10) { riskCategory = 'very_high'; riskCategoryLabel = 'Nguy cơ RẤT CAO (SCORE2 ≥ 10%)'; riskColor = '#dc2626'; }
      else if (score2Est >= 5) { riskCategory = 'high'; riskCategoryLabel = 'Nguy cơ CAO (SCORE2 5 - 9%)'; riskColor = '#f59e0b'; }
      else if (score2Est >= 2) { riskCategory = 'moderate'; riskCategoryLabel = 'Nguy cơ TRUNG BÌNH (SCORE2 2 - 4%)'; riskColor = '#0284c7'; }
      else { riskCategory = 'low'; riskCategoryLabel = 'Nguy cơ THẤP (SCORE2 < 2%)'; riskColor = '#10b981'; }
    } else {
      if (score2Est >= 7.5) { riskCategory = 'very_high'; riskCategoryLabel = 'Nguy cơ RẤT CAO (SCORE2 ≥ 7.5% ở người trẻ)'; riskColor = '#dc2626'; }
      else if (score2Est >= 2.5) { riskCategory = 'high'; riskCategoryLabel = 'Nguy cơ CAO (SCORE2 2.5 - 7.4%)'; riskColor = '#f59e0b'; }
      else { riskCategory = 'low'; riskCategoryLabel = 'Nguy cơ THẤP (SCORE2 < 2.5%)'; riskColor = '#10b981'; }
    }
  }

  // AHA/ACC ASCVD 10-Year Approximation
  let ascvd10YearPercentage = score2Est * 1.15;
  if (hasDiabetes) ascvd10YearPercentage += 4.5;
  if (isTreatedHypertension) ascvd10YearPercentage += 2.0;
  ascvd10YearPercentage = parseFloat(Math.min(50, Math.max(1, ascvd10YearPercentage)).toFixed(1));

  // B. Precision Lipid Targets
  let targetLdlMmol = 3.0;
  let targetLdlMgDl = 116;
  let targetNonHdlMmol = 3.4;
  let targetApoBMgDl = 100;

  if (riskCategory === 'extreme') {
    targetLdlMmol = 1.0; targetLdlMgDl = 40; targetNonHdlMmol = 1.8; targetApoBMgDl = 55;
  } else if (riskCategory === 'very_high') {
    targetLdlMmol = 1.4; targetLdlMgDl = 55; targetNonHdlMmol = 2.2; targetApoBMgDl = 65;
  } else if (riskCategory === 'high') {
    targetLdlMmol = 1.8; targetLdlMgDl = 70; targetNonHdlMmol = 2.6; targetApoBMgDl = 80;
  } else if (riskCategory === 'moderate') {
    targetLdlMmol = 2.6; targetLdlMgDl = 100; targetNonHdlMmol = 3.4; targetApoBMgDl = 100;
  } else {
    targetLdlMmol = 3.0; targetLdlMgDl = 116; targetNonHdlMmol = 3.8; targetApoBMgDl = 110;
  }

  const currentLdlGapMmol = parseFloat((Math.max(0, ldlCholesterolMmol - targetLdlMmol)).toFixed(2));
  const currentLdlGapPercent = parseFloat(((currentLdlGapMmol / Math.max(0.1, ldlCholesterolMmol)) * 100).toFixed(1));

  // C. Stepwise Lipid Projections
  const predictedLdlHighStatinMmol = parseFloat((ldlCholesterolMmol * 0.50).toFixed(2)); // ~50% drop
  const predictedLdlStatinEzetimibeMmol = parseFloat((ldlCholesterolMmol * 0.35).toFixed(2)); // ~65% drop
  const predictedLdlTriplePcsk9iMmol = parseFloat((ldlCholesterolMmol * 0.15).toFixed(2)); // ~85% drop

  let stepwiseRegimen = '';
  if (isStatinIntolerant) {
    stepwiseRegimen = 'Bệnh nhân không dung nạp Statin (SAMS): Bempedoic Acid 180mg/ngày + Ezetimibe 10mg/ngày ± Thuốc ức chế PCSK9 (Evolocumab/Alirocumab).';
    treatmentSteps.push('Bước 1: Khởi đầu Bempedoic Acid 180mg + Ezetimibe 10mg (kết hợp cố định).');
    treatmentSteps.push('Bước 2: Nếu chưa đạt đích LDL-C, phối hợp thêm Thuốc ức chế PCSK9 tiêm dưới da mỗi 2 tuần.');
  } else if (riskCategory === 'extreme' || riskCategory === 'very_high') {
    if (ldlCholesterolMmol >= 3.5) {
      stepwiseRegimen = 'Phối hợp ĐÔI NGAY TỪ ĐẦU: Statin Cường Độ Cao (Rosuvastatin 20-40mg hoặc Atorvastatin 40-80mg) + Ezetimibe 10mg. Cân nhắc thêm PCSK9i nếu sau 4-6 tuần chưa đạt < 1.4 mmol/L.';
      treatmentSteps.push('Bước 1: Statin cường độ cao (Rosuvastatin 20-40mg hoặc Atorvastatin 40-80mg) + Ezetimibe 10mg uống cùng lúc.');
      treatmentSteps.push('Bước 2: Đo lại lipid sau 4-6 tuần. Nếu LDL-C ≥ 1.4 mmol/L ➔ Bổ sung Thuốc ức chế PCSK9 (Evolocumab 140mg Q2W hoặc Inclisiran 284mg).');
    } else {
      stepwiseRegimen = 'Statin Cường Độ Cao: Atorvastatin 40 - 80mg hoặc Rosuvastatin 20 - 40mg. Thêm Ezetimibe 10mg nếu sau 4-6 tuần chưa đạt đích.';
      treatmentSteps.push('Bước 1: Statin cường độ cao (Atorvastatin 40-80mg hoặc Rosuvastatin 20-40mg).');
      treatmentSteps.push('Bước 2: Thêm Ezetimibe 10mg sau 4-6 tuần nếu LDL-C chưa đạt < 1.4 mmol/L.');
    }
  } else if (riskCategory === 'high') {
    stepwiseRegimen = 'Statin Cường Độ Cao hoặc Trung Bình: Atorvastatin 20 - 40mg hoặc Rosuvastatin 10 - 20mg. Đích giảm ≥ 50% và < 1.8 mmol/L.';
    treatmentSteps.push('Bước 1: Atorvastatin 20-40mg hoặc Rosuvastatin 10-20mg.');
    treatmentSteps.push('Bước 2: Bổ sung Ezetimibe 10mg nếu chưa đạt đích.');
  } else if (riskCategory === 'moderate') {
    stepwiseRegimen = 'Statin Cường Độ Trung Bình: Atorvastatin 10 - 20mg hoặc Rosuvastatin 5 - 10mg.';
    treatmentSteps.push('Thay đổi lối sống lành mạnh + Statin liều trung bình.');
  } else {
    stepwiseRegimen = 'Ưu tiên thay đổi lối sống: Chế độ ăn Địa Trung Hải, tập thể dục ≥ 150 phút/tuần, cai thuốc lá.';
    treatmentSteps.push('Duy trì lối sống lành mạnh, tái khám kiểm tra lipid mỗi 3 - 5 năm.');
  }

  // D. Heart Failure GDMT Evaluation
  let gdmtPillarsCount = 0;
  const gdmtRecs: string[] = [];

  if (isHeartFailureEvaluated && lvefPercent !== undefined) {
    if (currentArniDose !== 'none') gdmtPillarsCount++;
    if (currentBetaBlockerDose !== 'none') gdmtPillarsCount++;
    if (currentMraDose !== 'none') gdmtPillarsCount++;
    if (currentSglt2iDose !== 'none') gdmtPillarsCount++;

    if (lvefPercent <= 40) {
      // HFrEF GDMT 4 Pillars
      if (currentArniDose === 'none') gdmtRecs.push('Khởi đầu ARNI (Sacubitril/Valsartan 24/26mg BID) thay thế cho ACEi/ARB.');
      else if (currentArniDose !== 'target') gdmtRecs.push('Tăng liều ARNI từng bước mỗi 2-4 tuần lên liều đích 97/103mg BID.');

      if (currentBetaBlockerDose === 'none') gdmtRecs.push('Khởi đầu Chẹn Beta giao cảm (Bisoprolol/Carvedilol/Metoprolol succinate).');
      else if (currentBetaBlockerDose !== 'target') gdmtRecs.push('Chuẩn độ Chẹn Beta lên liều đích (Bisoprolol 10mg, Carvedilol 25mg BID).');

      if (currentMraDose === 'none') gdmtRecs.push('Bổ sung Kháng thụ thể Mineralocorticoid (Spironolactone 25mg QD) nếu K+ < 5.0 và eGFR > 30.');
      if (currentSglt2iDose === 'none') gdmtRecs.push('Bổ sung SGLT2i (Dapagliflozin 10mg hoặc Empagliflozin 10mg) — Khuyến cáo Class 1 cứu sống.');
    } else {
      // HFmrEF / HFpEF
      if (currentSglt2iDose === 'none') gdmtRecs.push('Bổ sung SGLT2i (Dapagliflozin 10mg hoặc Empagliflozin 10mg) — Chỉ định Class 1 cho HFpEF/HFmrEF.');
      if (currentMraDose === 'none') gdmtRecs.push('Cân nhắc Spironolactone 25mg QD giúp giảm nhập viện suy tim.');
    }
  }
  const gdmtOptimizationScore = Math.round((gdmtPillarsCount / 4) * 100);

  // E. Emergency Flags & Summary
  if (hasRecurrentAscvdWithin2Yrs) emergencyFlags.push('🚨 NGUY CƠ TIM MẠCH CỰC ĐOAN (Extreme Risk) — Biến cố xơ vữa tái phát trong 2 năm, đích LDL-C < 1.0 mmol/L!');
  if (riskCategory === 'very_high' && ldlCholesterolMmol >= 3.5) emergencyFlags.push('⚠️ LDL-C HIỆN TẠI RẤT CAO SO VỚI ĐÍCH — Cần phối hợp ĐÔI Statin + Ezetimibe ngay từ đầu!');
  if (isFamilialHypercholesterolemia) emergencyFlags.push('🧬 TĂNG CHOLESTEROL MÁU GIA ĐÌNH (FH) — Nguy cơ xơ vữa sớm, cần sàng lọc người thân thế hệ thứ nhất.');
  if (isHeartFailureEvaluated && lvefPercent !== undefined && lvefPercent <= 40 && gdmtPillarsCount < 4) {
    emergencyFlags.push(`⚠️ SUY TIM HFrEF (EF ${lvefPercent}%): Chưa tối ưu đủ 4 trụ cột GDMT (Hiện có ${gdmtPillarsCount}/4 nhóm thuốc).`);
  }

  const clinicalSummary = `
BÁO CÁO NGUY CƠ TIM MẠCH, LIPID & SUY TIM GDMT (DOCSPACE CARDIO PRO):
- Phân tầng nguy cơ 10 năm: ${riskCategoryLabel} (${score2Model}: ~${score2Est}% | ASCVD 10 năm: ~${ascvd10YearPercentage}%)
- Mục tiêu LDL-C: < ${targetLdlMmol} mmol/L (< ${targetLdlMgDl} mg/dL) & Non-HDL < ${targetNonHdlMmol} mmol/L
- Hiện trạng LDL-C: ${ldlCholesterolMmol} mmol/L (Khoảng cách cần hạ: ${currentLdlGapMmol > 0 ? `-${currentLdlGapMmol} mmol/L (-${currentLdlGapPercent}%)` : 'ĐÃ ĐẠT ĐÍCH'})
- Phác đồ hạ Lipid khuyến nghị: ${stepwiseRegimen}
${isHeartFailureEvaluated && lvefPercent !== undefined ? `- Đánh giá Suy Tim (EF ${lvefPercent}%): Đạt ${gdmtPillarsCount}/4 Trụ cột GDMT (${gdmtOptimizationScore}%)` : ''}
- Khuyến cáo: ${recommendations.concat(treatmentSteps).slice(0, 3).join(' | ')}
  `.trim();

  return {
    score2Percentage: score2Est,
    score2ModelUsed: score2Model,
    ascvd10YearPercentage,
    riskCategory,
    riskCategoryLabel,
    riskColor,
    targetLdlMmol,
    targetLdlMgDl,
    targetNonHdlMmol,
    targetApoBMgDl,
    currentNonHdlMmol,
    currentLdlGapMmol,
    currentLdlGapPercent,
    predictedLdlHighStatinMmol,
    predictedLdlStatinEzetimibeMmol,
    predictedLdlTriplePcsk9iMmol,
    stepwiseRegimenRecommendation: stepwiseRegimen,
    gdmtPillarsCount,
    gdmtOptimizationScore,
    gdmtRecommendations: gdmtRecs,
    emergencyFlags,
    treatmentSteps,
    recommendations,
    clinicalSummary
  };
}

/**
 * 2. Render Half-Circle SCORE2 / ASCVD Risk Gauge SVG (0 - 40%)
 */
export function renderScore2GaugeSvg(score2Percent: number): string {
  const w = 340;
  const h = 190;
  const cx = w / 2;
  const cy = 155;
  const r = 115;

  const clampedScore = Math.max(0, Math.min(40, score2Percent));
  const angleDeg = 180 - (clampedScore / 40) * 180;
  const rad = (angleDeg * Math.PI) / 180;

  const needleX = cx + (r - 20) * Math.cos(rad);
  const needleY = cy - (r - 20) * Math.sin(rad);

  const getPt = (val: number, radius: number) => {
    const a = (180 - (Math.max(0, Math.min(40, val)) / 40) * 180) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(a), y: cy - radius * Math.sin(a) };
  };

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-surface); border-radius:8px;">
      <!-- Risk Arcs -->
      <!-- Green (0 - 2%) Low Risk -->
      <path d="M ${getPt(0, r).x} ${getPt(0, r).y} A ${r} ${r} 0 0 1 ${getPt(2, r).x} ${getPt(2, r).y} L ${getPt(2, r - 20).x} ${getPt(2, r - 20).y} A ${r - 20} ${r - 20} 0 0 0 ${getPt(0, r - 20).x} ${getPt(0, r - 20).y} Z" fill="#10b981" opacity="0.9" />

      <!-- Cyan (2 - 5%) Moderate Risk -->
      <path d="M ${getPt(2, r).x} ${getPt(2, r).y} A ${r} ${r} 0 0 1 ${getPt(5, r).x} ${getPt(5, r).y} L ${getPt(5, r - 20).x} ${getPt(5, r - 20).y} A ${r - 20} ${r - 20} 0 0 0 ${getPt(2, r - 20).x} ${getPt(2, r - 20).y} Z" fill="#0284c7" opacity="0.9" />

      <!-- Yellow (5 - 10%) High Risk -->
      <path d="M ${getPt(5, r).x} ${getPt(5, r).y} A ${r} ${r} 0 0 1 ${getPt(10, r).x} ${getPt(10, r).y} L ${getPt(10, r - 20).x} ${getPt(10, r - 20).y} A ${r - 20} ${r - 20} 0 0 0 ${getPt(5, r - 20).x} ${getPt(5, r - 20).y} Z" fill="#f59e0b" opacity="0.9" />

      <!-- Red (10 - 40%) Very High Risk -->
      <path d="M ${getPt(10, r).x} ${getPt(10, r).y} A ${r} ${r} 0 0 1 ${getPt(40, r).x} ${getPt(40, r).y} L ${getPt(40, r - 20).x} ${getPt(40, r - 20).y} A ${r - 20} ${r - 20} 0 0 0 ${getPt(10, r - 20).x} ${getPt(10, r - 20).y} Z" fill="#dc2626" opacity="0.95" />

      <!-- Labels -->
      <text x="${getPt(1, r - 28).x}" y="${getPt(1, r - 28).y}" fill="#10b981" font-size="8" font-weight="800" text-anchor="middle">&lt;2%</text>
      <text x="${getPt(3.5, r - 28).x}" y="${getPt(3.5, r - 28).y}" fill="#0284c7" font-size="8" font-weight="800" text-anchor="middle">2-5%</text>
      <text x="${getPt(7.5, r - 28).x}" y="${getPt(7.5, r - 28).y}" fill="#f59e0b" font-size="8" font-weight="800" text-anchor="middle">5-10%</text>
      <text x="${getPt(25, r - 28).x}" y="${getPt(25, r - 28).y}" fill="#dc2626" font-size="8.5" font-weight="800" text-anchor="middle">&gt;10%</text>

      <!-- Gauge Needle -->
      <line x1="${cx}" y1="${cy}" x2="${needleX}" y2="${needleY}" stroke="var(--color-text)" stroke-width="3" stroke-linecap="round" />
      <circle cx="${cx}" cy="${cy}" r="6" fill="#ca8a04" stroke="#ffffff" stroke-width="2" />

      <!-- Display Value in Center -->
      <text x="${cx}" y="${cy + 22}" fill="var(--color-text)" font-size="14" font-weight="900" text-anchor="middle">
        SCORE2: ${score2Percent}% <tspan font-size="9" fill="var(--color-text-muted)">10 năm</tspan>
      </text>
    </svg>
  `;
}

/**
 * 3. Render Stepwise LDL-C Waterfall Cascade Reduction SVG
 */
export function renderLdlWaterfallSvg(baselineLdl: number, targetLdl: number): string {
  const w = 340;
  const h = 180;
  const padL = 40;
  const padR = 20;
  const padT = 25;
  const padB = 30;

  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  const maxVal = Math.max(6.0, baselineLdl * 1.1);

  const getY = (val: number) => padT + chartH - (Math.min(maxVal, val) / maxVal) * chartH;

  const bars = [
    { label: 'Nền', val: baselineLdl, color: '#dc2626' },
    { label: 'Statin Cao', val: baselineLdl * 0.50, color: '#ea580c' },
    { label: '+ Ezetimibe', val: baselineLdl * 0.35, color: '#f59e0b' },
    { label: '+ PCSK9i', val: baselineLdl * 0.15, color: '#10b981' }
  ];

  const colW = chartW / 4 - 8;
  const targetY = getY(targetLdl);

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-surface); border-radius:8px;">
      <!-- Title -->
      <text x="${padL}" y="16" fill="var(--color-text)" font-size="10.5" font-weight="800">
        Mô Phỏng Thác Đổ Hạ LDL-C Theo Bậc Điều Trị
      </text>

      <!-- Target Threshold Line -->
      <line x1="${padL}" y1="${targetY}" x2="${padL + chartW}" y2="${targetY}" stroke="#10b981" stroke-width="1.8" stroke-dasharray="4,3" />
      <text x="${padL + chartW}" y="${targetY - 4}" fill="#10b981" font-size="8.5" font-weight="800" text-anchor="end">Đích &lt; ${targetLdl} mmol/L</text>

      <!-- Y Axis -->
      <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="var(--color-border)" stroke-width="1.2" />

      <!-- Bars -->
      ${bars.map((b, idx) => {
        const x = padL + idx * (colW + 10) + 5;
        const y = getY(b.val);
        const barH = padT + chartH - y;
        return `
          <g>
            <rect x="${x}" y="${y}" width="${colW}" height="${barH}" rx="3" fill="${b.color}" opacity="0.85" />
            <text x="${x + colW / 2}" y="${y - 4}" fill="${b.color}" font-size="9" font-weight="900" text-anchor="middle">${b.val.toFixed(1)}</text>
            <text x="${x + colW / 2}" y="${padT + chartH + 14}" fill="var(--color-text-muted)" font-size="8.5" font-weight="700" text-anchor="middle">${b.label}</text>
          </g>
        `;
      }).join('')}
    </svg>
  `;
}

// ============================================================
// NEUROKIT2 MODULE 3: PHOTOPLETHYSMOGRAM (PPG) STUDIO ENGINE
// ============================================================

export interface PpgSimulationInputs {
  heartRate: number;            // bpm
  perfusionIndex: number;       // PI % (0.2 - 10.0%)
  dicroticNotchHeight: number;  // 0.0 (mất khuyết) - 0.6 (khuyết sâu)
  arterialStiffness: number;    // SI (m/s) 4.0 - 15.0 m/s
  noiseArtifact: 'clean' | 'baseline_drift' | 'motion_artifact';
  rhythmType: 'regular' | 'irregular_afib';
}

export interface PpgAnalysisResult {
  systolicPeakTimeMs: number;
  dicroticNotchTimeMs: number;
  diastolicPeakTimeMs: number;
  perfusionIndex: number;
  perfusionStatus: 'critical_low' | 'normal' | 'hyperdynamic';
  perfusionBadgeColor: string;
  perfusionInterpretation: string;
  augmentationIndexPercent: number; // AIx %
  stiffnessIndex: number;          // SI (m/s)
  vascularAgeEstimated: string;
  pulsePressureVariationEstimate: number; // ΔPP %
  clinicalInsights: string[];
}

export interface PpgPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  values: PpgSimulationInputs;
}

export const PPG_PRESETS: PpgPreset[] = [
  {
    id: 'ppg_normal',
    name: '1. Sóng Mạch Quang Học Chuẩn (Normal Adult PPG)',
    badge: '🟢 PI 2.4% • Notch Rõ Nét',
    badgeColor: '#10b981',
    description: 'Sóng mạch người trưởng thành khỏe mạnh: Đỉnh tâm thu nhọn, khuyết Dicrotic notch rõ ràng, sóng dội ngược tâm trương đầy đủ.',
    values: {
      heartRate: 72,
      perfusionIndex: 2.4,
      dicroticNotchHeight: 0.35,
      arterialStiffness: 6.8,
      noiseArtifact: 'clean',
      rhythmType: 'regular',
    },
  },
  {
    id: 'ppg_distributive_sepsis',
    name: '2. Sốc Nhiễm Khuẩn Giãn Mạch (Distributive Sepsis / Warm Shock)',
    badge: '🔴 PI 7.8% (Tăng Động) • Giãn Mạch',
    badgeColor: '#dc2626',
    description: 'Tưới máu ngoại vi tăng động (Hyperdynamic): Sóng nảy nhanh chìm sâu (Pulsus celer), dicrotic notch tụt thấp do kháng lực mạch hệ thống giảm nặng.',
    values: {
      heartRate: 112,
      perfusionIndex: 7.8,
      dicroticNotchHeight: 0.15,
      arterialStiffness: 4.8,
      noiseArtifact: 'clean',
      rhythmType: 'regular',
    },
  },
  {
    id: 'ppg_hypovolemic_shock',
    name: '3. Sốc Giảm Thể Tích / Co Mạch Nặng (Hypovolemic Shock / Vasoconstriction)',
    badge: '🚨 PI 0.35% (Nguy Kịch) • Co Mạch',
    badgeColor: '#ef4444',
    description: 'Co thắt mạch ngoại vi tối đa: Biên độ sóng mạch cực thấp, khuyết dicrotic notch biến mất, tưới máu mô đầu chi suy kiệt.',
    values: {
      heartRate: 128,
      perfusionIndex: 0.35,
      dicroticNotchHeight: 0.05,
      arterialStiffness: 11.2,
      noiseArtifact: 'baseline_drift',
      rhythmType: 'regular',
    },
  },
  {
    id: 'ppg_aortic_stenosis',
    name: '4. Hẹp Van Động Mạch Chủ Nặng (Pulsus Parvus et Tardus)',
    badge: '🟡 Nảy Chậm Đỉnh Muộn • AIx 48%',
    badgeColor: '#ca8a04',
    description: 'Tống máu qua lỗ van hẹp: Sườn lên tâm thu thoai thoải kéo dài, đỉnh tâm thu đến muộn (Tardus), biên độ sóng nhỏ (Parvus).',
    values: {
      heartRate: 68,
      perfusionIndex: 1.2,
      dicroticNotchHeight: 0.20,
      arterialStiffness: 12.5,
      noiseArtifact: 'clean',
      rhythmType: 'regular',
    },
  },
  {
    id: 'ppg_afib',
    name: '5. Rung Nhĩ Kèm Hụt Mạch (Atrial Fibrillation Pulse Deficit)',
    badge: '🟠 Loạn Nhịp Hoàn Toàn • Biến Thiên Biên Độ',
    badgeColor: '#ea580c',
    description: 'Khoảng cách giữa các nhịp và biên độ sóng mạch thay đổi thất thường theo thời gian đổ đầy tâm thất.',
    values: {
      heartRate: 105,
      perfusionIndex: 2.1,
      dicroticNotchHeight: 0.28,
      arterialStiffness: 8.0,
      noiseArtifact: 'clean',
      rhythmType: 'irregular_afib',
    },
  },
];

/**
 * Phân tích các chỉ số Huyết động không xâm lấn từ PPG theo NeuroKit2
 */
export function computePpgAnalysis(inputs: PpgSimulationInputs): PpgAnalysisResult {
  const hr = inputs.heartRate;
  const pi = inputs.perfusionIndex;
  const rrMs = (60 / hr) * 1000;

  // Tính toán thời gian các landmarks theo tỷ lệ sinh học
  const systolicPeakTimeMs = Math.round(rrMs * 0.22);
  const dicroticNotchTimeMs = Math.round(rrMs * 0.42);
  const diastolicPeakTimeMs = Math.round(rrMs * 0.58);

  // Perfusion Index evaluation
  let perfusionStatus: PpgAnalysisResult['perfusionStatus'] = 'normal';
  let perfusionBadgeColor = '#10b981';
  let perfusionInterpretation = 'Tưới máu vi mạch ngoại vi bình thường (PI: 1.0 - 5.0%).';

  if (pi < 0.5) {
    perfusionStatus = 'critical_low';
    perfusionBadgeColor = '#dc2626';
    perfusionInterpretation = '🚨 PI < 0.5%: Co mạch ngoại vi nặng / Sốc giảm thể tích / Sốc tim / Hạ thân nhiệt sâu.';
  } else if (pi > 6.0) {
    perfusionStatus = 'hyperdynamic';
    perfusionBadgeColor = '#ea580c';
    perfusionInterpretation = '⚠️ PI > 6.0%: Trạng thái tăng động / Giãn mạch ngoại biên (Sốc nhiễm khuẩn giai đoạn ấm / Sốt cao).';
  }

  // Augmentation Index & Arterial Stiffness (NeuroKit2 Elgendi model)
  const aix = parseFloat(((inputs.arterialStiffness * 3.2) - (inputs.dicroticNotchHeight * 40)).toFixed(1));
  const augmentationIndexPercent = Math.max(2, Math.min(65, aix));
  const stiffnessIndex = inputs.arterialStiffness;

  let vascularAgeEstimated = 'Tương đương 30 - 45 tuổi (Độ đàn hồi thành mạch tốt)';
  if (stiffnessIndex > 10.0) {
    vascularAgeEstimated = 'Tương đương > 65 tuổi (Xơ cứng động mạch đáng kể)';
  } else if (stiffnessIndex > 8.0) {
    vascularAgeEstimated = 'Tương đương 50 - 64 tuổi (Độ cứng thành mạch trung bình)';
  }

  // Ước tính biến thiên áp lực mạch ΔPP
  const dpp = inputs.noiseArtifact === 'baseline_drift' ? 15.5 : 8.2;

  const clinicalInsights: string[] = [];
  if (pi < 0.5) {
    clinicalInsights.push('Cảnh báo sốc: Chỉ số tưới máu PI tụt thấp là dấu hiệu sớm báo trước hạ huyết áp trước khi huyết áp tụt trên lâm sàng.');
    clinicalInsights.push('Khuyến cáo: Đánh giá ngay thời gian đổ đầy mao mạch (CRT > 3s), nồng độ Lactate máu và cân nhắc test bù dịch.');
  } else if (inputs.rhythmType === 'irregular_afib') {
    clinicalInsights.push('Hụt mạch (Pulse Deficit): Những nhịp có khoảng RR ngắn không đủ thời gian đổ đầy tâm trương tạo ra sóng mạch biên độ rất thấp.');
  } else if (stiffnessIndex > 10.0) {
    clinicalInsights.push('Độ cứng thành mạch cao (SI > 10 m/s): Tăng áp lực mạch tâm thu, tăng hậu tải thất trái và tăng nguy cơ phì đại cơ tim.');
  } else {
    clinicalInsights.push('Sóng mạch có hình thái sinh lý điển hình với khuyết đóng van ĐMC (Dicrotic notch) rõ nét, phản ánh cung lượng tim và trương lực mạch ổn định.');
  }

  return {
    systolicPeakTimeMs,
    dicroticNotchTimeMs,
    diastolicPeakTimeMs,
    perfusionIndex: pi,
    perfusionStatus,
    perfusionBadgeColor,
    perfusionInterpretation,
    augmentationIndexPercent,
    stiffnessIndex,
    vascularAgeEstimated,
    pulsePressureVariationEstimate: dpp,
    clinicalInsights,
  };
}

/**
 * Vẽ Dải Sóng Mạch Quang Học PPG SVG Tương Tác Chuẩn NeuroKit2 (4 Landmarks + Calipers)
 */
export function renderPpgWaveformSvg(
  inputs: PpgSimulationInputs,
  theme: 'paper' | 'neon' | 'dark' = 'paper'
): string {
  const totalW = 860;
  const totalH = 240;
  const padL = 50;
  const padR = 20;
  const padT = 36;
  const padB = 30;
  const plotW = totalW - padL - padR;
  const plotH = totalH - padT - padB;
  const baseY = padT + plotH * 0.85;

  const hr = inputs.heartRate || 75;
  const rrMs = (60 / hr) * 1000;
  const isAfib = inputs.rhythmType === 'irregular_afib';
  const hasDrift = inputs.noiseArtifact === 'baseline_drift';
  const hasMotion = inputs.noiseArtifact === 'motion_artifact';

  let bgFill = 'var(--color-bg)';
  let gridLine = 'var(--color-border)';
  let traceColor = '#dc2626';
  let textColor = 'var(--color-text)';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridLine = 'rgba(16, 185, 129, 0.15)';
    traceColor = '#10b981';
    textColor = '#34d399';
  } else if (theme === 'dark') {
    bgFill = '#0f172a';
    gridLine = 'rgba(255, 255, 255, 0.08)';
    traceColor = '#38bdf8';
    textColor = '#94a3b8';
  }

  // Tốc độ vẽ: hiển thị khoảng 4-6 chu kỳ sóng
  const numBeats = 6;
  const beatWidthPx = plotW / numBeats;

  let pathD = `M ${padL},${baseY} `;
  const landmarks: { x: number; y: number; label: string; color: string }[] = [];

  for (let b = 0; b < numBeats; b++) {
    // Biến thiên nhịp nếu là Afib
    let curBeatW = beatWidthPx;
    if (isAfib) {
      const variance = Math.sin(b * 2.1) * 0.3;
      curBeatW = beatWidthPx * (1 + variance);
    }

    const startX = padL + b * beatWidthPx;
    if (startX > totalW - padR) break;

    // Biên độ theo Perfusion Index
    let ampScale = Math.min(1.4, Math.max(0.2, (inputs.perfusionIndex / 3.0)));
    if (isAfib) ampScale *= (0.7 + Math.cos(b * 1.8) * 0.4);

    const maxAmpPx = plotH * 0.75 * ampScale;
    const notchRatio = inputs.dicroticNotchHeight;

    // Baseline drift do thở
    let driftY = 0;
    if (hasDrift) driftY = Math.sin(b * 0.9) * 12;
    if (hasMotion && b === 3) driftY = (Math.random() - 0.5) * 35;

    const bBaseY = baseY + driftY;

    // 4 Landmarks cho 1 nhịp PPG (NeuroKit2 phenomenological model)
    const xOnset = startX;
    const yOnset = bBaseY;

    const xSys = startX + curBeatW * 0.22;
    const ySys = bBaseY - maxAmpPx;

    const xNotch = startX + curBeatW * 0.44;
    const yNotch = bBaseY - maxAmpPx * notchRatio;

    const xDia = startX + curBeatW * 0.60;
    const yDia = bBaseY - maxAmpPx * (notchRatio + 0.18);

    const xEnd = startX + curBeatW;
    const yEnd = bBaseY;

    // Đường cong Bezier mượt mà qua các landmarks
    pathD += `L ${xOnset},${yOnset} `;
    pathD += `C ${xOnset + curBeatW * 0.08},${yOnset} ${xSys - curBeatW * 0.06},${ySys} ${xSys},${ySys} `;
    pathD += `C ${xSys + curBeatW * 0.08},${ySys} ${xNotch - curBeatW * 0.05},${yNotch} ${xNotch},${yNotch} `;
    pathD += `C ${xNotch + curBeatW * 0.05},${yNotch} ${xDia - curBeatW * 0.05},${yDia} ${xDia},${yDia} `;
    pathD += `C ${xDia + curBeatW * 0.12},${yDia} ${xEnd - curBeatW * 0.10},${yEnd} ${xEnd},${yEnd} `;

    // Gắn chú thích landmarks ở nhịp thứ 2
    if (b === 1) {
      landmarks.push(
        { x: xSys, y: ySys, label: 'Ps (Systolic Peak)', color: '#dc2626' },
        { x: xNotch, y: yNotch, label: 'Dicrotic Notch (Đóng van ĐMC)', color: '#ca8a04' },
        { x: xDia, y: yDia, label: 'Pr (Diastolic Peak)', color: '#0284c7' }
      );
    }
  }

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="${totalH}" style="background:${bgFill}; border-radius:10px; display:block; max-width:100%; box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <!-- Header Bar -->
      <rect x="0" y="0" width="${totalW}" height="${padT}" fill="rgba(0,0,0,0.04)" rx="10"/>
      <text x="14" y="22" fill="${textColor}" font-size="11.5" font-weight="800" font-family="'Inter', sans-serif">
        📊 DẢI SÓNG MẠCH QUANG HỌC PHOTOPLETHYSMOGRAM (PPG) — TẦN SỐ: ${inputs.heartRate} bpm | PI: ${inputs.perfusionIndex}%
      </text>
      <text x="${totalW - 14}" y="22" fill="var(--color-text-muted)" font-size="10" font-weight="700" text-anchor="end">
        Mô hình NeuroKit2 Pulse Wave Dynamics
      </text>

      <!-- Background Grid -->
      ${[1, 2, 3, 4].map(i => `<line x1="${padL}" y1="${padT + (plotH / 4) * i}" x2="${totalW - padR}" y2="${padT + (plotH / 4) * i}" stroke="${gridLine}" stroke-width="0.8" stroke-dasharray="2,2"/>`).join('')}

      <!-- PPG Trace Path -->
      <path d="${pathD}" fill="none" stroke="${traceColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Landmarks Callout Pins -->
      ${landmarks.map(lm => `
        <g transform="translate(${lm.x.toFixed(1)}, ${lm.y.toFixed(1)})">
          <circle cx="0" cy="0" r="4" fill="${lm.color}" stroke="#ffffff" stroke-width="1.5"/>
          <line x1="0" y1="0" x2="0" y2="-18" stroke="${lm.color}" stroke-width="1.2"/>
          <rect x="-40" y="-34" width="80" height="16" rx="3" fill="${lm.color}" opacity="0.95"/>
          <text x="0" y="-23" fill="#ffffff" font-size="7.5" font-weight="800" text-anchor="middle">${lm.label.split(' ')[0]}</text>
        </g>
      `).join('')}

      <!-- Bottom Status Bar -->
      <g transform="translate(${padL}, ${totalH - 10})">
        <text x="0" y="0" fill="var(--color-text-muted)" font-size="9" font-weight="600">
          Chỉ số tưới máu (PI): <strong style="color:${inputs.perfusionIndex < 0.5 ? '#dc2626' : '#10b981'};">${inputs.perfusionIndex}%</strong> |
          Độ cứng thành mạch (SI): <strong>${inputs.arterialStiffness} m/s</strong> |
          Khuyết Dicrotic: <strong>${(inputs.dicroticNotchHeight * 100).toFixed(0)}%</strong>
        </text>
      </g>
    </svg>
  `;
}
