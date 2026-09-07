/**
 * DocSpace — Renal & Nephro-Pharmacology Research Studio Pro ($10,000 Level)
 * Comprehensive Nephrology, Kinetic GFR, AKI KDIGO, FENa/FEUrea, CIN Mehran 2.0, Vancomycin PK/PD AUC & 30+ Drug ICU Dosing Matrix
 */

export interface RenalPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  category: 'aki' | 'ckd' | 'arc' | 'cardiorenal_hrs' | 'toxic_cin';
  description: string;
  values: RenalInputs;
}

export interface RenalInputs {
  age: number;
  gender: 'male' | 'female';
  weightKg: number;
  heightCm?: number;
  
  // Serum Biomarkers
  serumCreatinineUmol: number; // umol/L
  serumCystatinCMgL?: number;  // mg/L (0.6 - 1.0)
  baselineCreatinineUmol?: number; // umol/L (prior steady-state baseline)
  serumBUNMmol?: number;       // mmol/L (or mg/dL)
  serumNaMmol?: number;        // mmol/L
  
  // Kinetic GFR inputs
  isKineticGfrEnabled?: boolean;
  deltaHours?: number;         // Time between 2 creatinine tests (hours)
  deltaCreatinineUmol?: number;// Creatinine change
  
  // Urine Biomarkers & Urine Output
  urineVolume24hMl?: number;   // mL/24h
  urineOutputHours?: number;   // Observation hours (6, 12, 24h)
  urineVolumePeriodMl?: number;// Urine in period
  urineNaMmol?: number;        // mmol/L (for FENa)
  urineCreatinineUmol?: number;// umol/L or mmol/L
  urineUreaMmol?: number;      // mmol/L (for FEUrea)
  urineOsmolality?: number;    // mOsm/kg
  urineAlbuminToCreatinineMgG?: number; // UACR (mg/g) for KDIGO Heatmap (A1 <30, A2 30-300, A3 >300)
  isTakingDiuretic?: boolean;  // Furosemide on board
  furosemideStressTest2hMl?: number; // Urine output in 2h post FST
  
  // Mehran 2.0 CIN / CA-AKI Predictors
  isMehranEnabled?: boolean;
  hasHypotensionOrInotropes?: boolean; // SBP < 100 or requiring inotropes
  hasIabp?: boolean;                  // Intra-aortic balloon pump
  hasHeartFailureNyha?: boolean;      // NYHA III/IV or LVEF < 40%
  hasDiabetes?: boolean;
  contrastVolumeMl?: number;          // mL of iodinated contrast
  hematocritPercent?: number;         // % (anemia: <39% male, <36% female)
  
  // Vancomycin Precision PK/PD Simulator Inputs
  isVancoPkEnabled?: boolean;
  vancoDoseMg?: number;               // Current or planned dose (mg)
  vancoIntervalHours?: number;        // Interval: 8, 12, 24, 48h
  vancoInfusionHours?: number;        // Infusion duration: 1h, 2h
  targetMicMgL?: number;              // Assumed MIC: 1.0 mg/L
}

export interface DrugDosingRecommendation {
  drugName: string;
  category: string;
  standardDose: string;
  adjustedDose: string;
  hemodialysisDose: string;
  crrtDose: string;
  monitoringWarning: string;
  isContraindicated?: boolean;
}

export interface RenalAnalysisResult {
  // 1. Static Clearance Formulas
  ckdEpi2021Cr: number;
  ckdEpi2021CysC: number | null;
  ckdEpi2021Combined: number | null;
  cockcroftGaultAbw: number;
  cockcroftGaultIbw: number;
  cockcroftGaultAdjBw: number | null;
  ibwKg: number;
  isObese: boolean;
  recommendedCrCl: number; // The most medically appropriate CrCl for dosing
  
  // 2. Kinetic GFR & ARC
  kineticGfr: number | null;
  isAugmentedRenalClearance: boolean;
  arcScore: number;
  arcExplanation: string | null;
  
  // 3. KDIGO Staging & Heatmap
  kdigoGStage: 'G1' | 'G2' | 'G3a' | 'G3b' | 'G4' | 'G5';
  kdigoAStage: 'A1' | 'A2' | 'A3';
  kdigoRiskTier: 'low' | 'moderate' | 'high' | 'very_high';
  kdigoStageColor: string;
  kdigoDescription: string;
  
  // 4. AKI Staging & Differential
  akiStage: 'No AKI' | 'Stage 1' | 'Stage 2' | 'Stage 3';
  akiStageColor: string;
  akiReasoning: string[];
  feNa: number | null;
  feNaInterpretation: string | null;
  feUrea: number | null;
  feUreaInterpretation: string | null;
  bunCrRatio: number | null;
  prerenalVsAtnSummary: string;
  fstInterpretation: string | null;
  
  // 5. CIN Mehran 2.0 Score
  mehranScore: number | null;
  mehranCinRiskPercent: number | null;
  mehranDialysisRiskPercent: number | null;
  mehranRiskCategory: string | null;
  mehranHydrationProtocol: string | null;
  
  // 6. Vancomycin Precision PK/PD Profile
  vancoPk: {
    ke: number;
    vdLiters: number;
    halfLifeHours: number;
    vancoClearanceLPerHour: number;
    auc24: number;
    aucTargetStatus: 'subtherapeutic' | 'optimal' | 'toxic';
    predictedPeak: number;
    predictedTrough: number;
    loadingDoseMg: number;
    recommendedMaintenance: string;
  } | null;
  
  // 7. Aminoglycoside Hartford Guidance
  aminoglycosideRegimen: string;
  
  // 8. Drug Matrix & Emergency Flags
  emergencyFlags: string[];
  drugAdjustments: DrugDosingRecommendation[];
  clinicalSummary: string;
  recommendations: string[];
}

export const RENAL_PRESETS: RenalPreset[] = [
  // 1. AKI & ICU Sepsis
  {
    id: 'prerenal_dehydration',
    name: '1. Suy Thận Trước Thận Do Mất Nước (Prerenal FENa < 1%)',
    badge: 'Đáp Ứng Bù Dịch | FENa 0.4%',
    badgeColor: '#0284c7',
    category: 'aki',
    description: 'Nam 68 tuổi sốt tiêu chảy 3 ngày, Creatinine tăng vọt từ 80 lên 210 umol/L, FENa 0.4%, FEUrea 28%, tỷ số BUN/Cr 28:1. Phục hồi nhanh sau bù NaCl 0.9%.',
    values: {
      age: 68, gender: 'male', weightKg: 62, heightCm: 168,
      serumCreatinineUmol: 210, baselineCreatinineUmol: 80, serumBUNMmol: 18.5, serumNaMmol: 142,
      urineVolumePeriodMl: 350, urineOutputHours: 12,
      urineNaMmol: 14, urineCreatinineUmol: 12500, urineUreaMmol: 320, urineOsmolality: 650,
      isTakingDiuretic: false, isKineticGfrEnabled: true, deltaHours: 24, deltaCreatinineUmol: 130
    }
  },
  {
    id: 'sepsis_atn_stage3',
    name: '2. Hoại Tử Ống Thận Cấp Do Sốc Nhiễm Khuẩn (ATN Stage 3)',
    badge: 'KDIGO AKI Stage 3 | FENa 3.2%',
    badgeColor: '#dc2626',
    category: 'aki',
    description: 'Nữ 65 tuổi sốc nhiễm khuẩn đường mật, Creatinine tăng từ 70 lên 380 umol/L, vô niệu 14h, FENa 3.2%, FEUrea 58%, FST thất bại (<100mL/2h). Chỉ định CRRT.',
    values: {
      age: 65, gender: 'female', weightKg: 58, heightCm: 156,
      serumCreatinineUmol: 380, baselineCreatinineUmol: 70, serumBUNMmol: 28.0, serumNaMmol: 131,
      urineVolumePeriodMl: 80, urineOutputHours: 14,
      urineNaMmol: 68, urineCreatinineUmol: 4200, urineUreaMmol: 110, urineOsmolality: 310,
      isTakingDiuretic: true, furosemideStressTest2hMl: 60,
      isKineticGfrEnabled: true, deltaHours: 24, deltaCreatinineUmol: 240
    }
  },
  {
    id: 'rhabdomyolysis_aki',
    name: '3. Tiêu Cơ Vân Cấp Sau Chấn Thương (Rhabdomyolysis AKI)',
    badge: 'Tắc Ống Thận Myoglobin',
    badgeColor: '#ef4444',
    category: 'aki',
    description: 'Nam 32 tuổi vùi lấp chấn thương đụng dập, Creatinine 340 umol/L, CK 45,000 U/L, toan chuyển hóa. Cần kiềm hóa nước tiểu và truyền dịch thể tích lớn.',
    values: {
      age: 32, gender: 'male', weightKg: 75, heightCm: 175,
      serumCreatinineUmol: 340, baselineCreatinineUmol: 85, serumBUNMmol: 22.0, serumNaMmol: 136,
      urineVolumePeriodMl: 400, urineOutputHours: 12,
      urineNaMmol: 45, urineCreatinineUmol: 7800, urineOsmolality: 380,
      isKineticGfrEnabled: true, deltaHours: 18, deltaCreatinineUmol: 180
    }
  },

  // 2. CKD & Diabetic Nephropathy
  {
    id: 'early_diabetic_ckd_g1_a3',
    name: '4. ĐTĐ Type 2 Tăng Lọc Cầu Thận Kèm Đạm Niệu Nặng (G1-A3)',
    badge: 'KDIGO G1-A3 | Nguy Cơ Tim Thận Cao',
    badgeColor: '#f59e0b',
    category: 'ckd',
    description: 'Nam 52 tuổi ĐTĐ 8 năm, Creatinine 72 umol/L (eGFR 104), UACR 420 mg/g (A3 đạm niệu đại thể). Chỉ định SGLT2i + ACEi/ARB để bảo tồn thận.',
    values: {
      age: 52, gender: 'male', weightKg: 78, heightCm: 170,
      serumCreatinineUmol: 72, serumCystatinCMgL: 0.85,
      urineAlbuminToCreatinineMgG: 420, serumNaMmol: 139, serumBUNMmol: 6.2
    }
  },
  {
    id: 'diabetic_ckd_g3b_a3',
    name: '5. Bệnh Thận Đái Tháo Đường Tiến Triển (CKD G3b-A3)',
    badge: 'KDIGO G3b-A3 | Chỉnh Liều Thuốc ĐTĐ',
    badgeColor: '#f59e0b',
    category: 'ckd',
    description: 'Nữ 68 tuổi ĐTĐ 15 năm, Creatinine 165 umol/L (eGFR 31), UACR 850 mg/g. Cần giảm liều Metformin tối đa 500mg, chỉnh liều Meropenem và SGLT2i.',
    values: {
      age: 68, gender: 'female', weightKg: 64, heightCm: 155,
      serumCreatinineUmol: 165, serumCystatinCMgL: 1.82,
      urineAlbuminToCreatinineMgG: 850, serumNaMmol: 137, serumBUNMmol: 14.5
    }
  },
  {
    id: 'severe_ckd_g4',
    name: '6. Suy Thận Mạn Nặng Giai Đoạn 4 (CKD G4-A3)',
    badge: 'KDIGO G4 | Chống Chỉ Định Metformin/Enoxaparin',
    badgeColor: '#ef4444',
    category: 'ckd',
    description: 'Nam 74 tuổi THA lâu năm, Creatinine 280 umol/L (eGFR 20), UACR 650 mg/g. Chống chỉ định Enoxaparin liều điều trị và Metformin.',
    values: {
      age: 74, gender: 'male', weightKg: 60, heightCm: 165,
      serumCreatinineUmol: 280, serumCystatinCMgL: 2.45,
      urineAlbuminToCreatinineMgG: 650, serumNaMmol: 138, serumBUNMmol: 24.0
    }
  },
  {
    id: 'esrd_hemodialysis_g5',
    name: '7. Bệnh Thận Giai Đoạn Cuối Lọc Máu Chu Kỳ (ESRD G5D)',
    badge: 'KDIGO G5D | Bổ Sung Liều Sau Lọc Máu',
    badgeColor: '#dc2626',
    category: 'ckd',
    description: 'Nữ 58 tuổi chạy thận nhân tạo HD 3 lần/tuần, Creatinine 720 umol/L. Cần bổ sung Meropenem 500mg và Vancomycin sau mỗi buổi lọc máu.',
    values: {
      age: 58, gender: 'female', weightKg: 52, heightCm: 152,
      serumCreatinineUmol: 720, serumCystatinCMgL: 4.80,
      urineAlbuminToCreatinineMgG: 1200, serumNaMmol: 135, serumBUNMmol: 32.0,
      urineVolume24hMl: 100
    }
  },

  // 3. Augmented Renal Clearance (ARC)
  {
    id: 'young_trauma_arc',
    name: '8. Tăng Thanh Thải Thận Ở Bệnh Nhân Trẻ Đa Chấn Thương (ARC)',
    badge: '⚡ ARC GFR 182 mL/p | Nguy Cơ Thất Bại Kháng Sinh',
    badgeColor: '#7c3aed',
    category: 'arc',
    description: 'Nam 24 tuổi đa chấn thương gãy xương đùi dập phổi, Creatinine 45 umol/L, CrCl đo thực tế 185 mL/p. Nguy cơ thiếu liều Vancomycin/Meropenem nghiêm trọng!',
    values: {
      age: 24, gender: 'male', weightKg: 72, heightCm: 178,
      serumCreatinineUmol: 45, serumCystatinCMgL: 0.55,
      urineVolume24hMl: 3800, serumNaMmol: 140, serumBUNMmol: 3.8,
      isVancoPkEnabled: true, vancoDoseMg: 1000, vancoIntervalHours: 12
    }
  },
  {
    id: 'burn_sepsis_arc',
    name: '9. Bỏng Nặng Nhiễm Khuẩn Tăng Đào Thải Thận (ARC Burn)',
    badge: '⚡ Hyperfiltration | Cần Tăng Liều Kháng Sinh',
    badgeColor: '#7c3aed',
    category: 'arc',
    description: 'Nam 29 tuổi bỏng 35% diện tích da, Creatinine 40 umol/L. Yêu cầu tăng liều Meropenem 2g q8h truyền kéo dài 3h và Vancomycin liều cao.',
    values: {
      age: 29, gender: 'male', weightKg: 68, heightCm: 172,
      serumCreatinineUmol: 40, serumCystatinCMgL: 0.52,
      urineVolume24hMl: 4200, serumNaMmol: 138, serumBUNMmol: 4.2
    }
  },

  // 4. Cardiorenal & Hepatorenal Syndromes
  {
    id: 'cardiorenal_type1',
    name: '10. Hội Chứng Tim Thận Type 1 (Suy Tim Cấp Mất Bù ADHF)',
    badge: 'Tắc Nghẽn Tĩnh Mạch Thận & Tụt Áp Lực Lọc',
    badgeColor: '#0284c7',
    category: 'cardiorenal_hrs',
    description: 'Nam 70 tuổi suy tim cấp EF 25%, phù toàn thân, Creatinine tăng từ 110 lên 195 umol/L do tăng áp lực tĩnh mạch trung tâm. Phối hợp Furosemide truyền liên tục.',
    values: {
      age: 70, gender: 'male', weightKg: 76, heightCm: 168,
      serumCreatinineUmol: 195, baselineCreatinineUmol: 110, serumBUNMmol: 19.0, serumNaMmol: 132,
      urineVolumePeriodMl: 480, urineOutputHours: 12,
      urineNaMmol: 22, urineCreatinineUmol: 8500, isTakingDiuretic: true
    }
  },
  {
    id: 'hepatorenal_hrs_aki',
    name: '11. Hội Chứng Gan Thận Type 1 (HRS-AKI Xơ Gan Mất Bù)',
    badge: '🚨 Cấp Cứu: Terlipressin + Albumin 20%',
    badgeColor: '#dc2626',
    category: 'cardiorenal_hrs',
    description: 'Nam 56 tuổi xơ gan Child C báng bụng to, Creatinine tăng từ 85 lên 245 umol/L dù đã ngưng lợi tiểu và bù Albumin 1g/kg/ngày trong 48h. FENa 0.2%.',
    values: {
      age: 56, gender: 'male', weightKg: 65, heightCm: 165,
      serumCreatinineUmol: 245, baselineCreatinineUmol: 85, serumBUNMmol: 21.0, serumNaMmol: 126,
      urineVolumePeriodMl: 280, urineOutputHours: 12,
      urineNaMmol: 8, urineCreatinineUmol: 11200, urineOsmolality: 580,
      isTakingDiuretic: false, isKineticGfrEnabled: true, deltaHours: 48, deltaCreatinineUmol: 160
    }
  },

  // 5. Toxic & Contrast-Induced Nephropathy (CIN)
  {
    id: 'cin_high_risk_pci',
    name: '12. Chụp Mạch Vành Ở Bệnh Nhân Nguy Cơ CIN Rất Cao (Mehran 2.0)',
    badge: '🚨 Mehran 18 điểm | Nguy Cơ CIN 57%',
    badgeColor: '#dc2626',
    category: 'toxic_cin',
    description: 'Nữ 78 tuổi ĐTĐ, suy tim EF 35%, Creatinine nền 175 umol/L, chụp PCI dùng 220 mL cản quang. Cần phác đồ truyền dịch dự phòng tích cực.',
    values: {
      age: 78, gender: 'female', weightKg: 54, heightCm: 150,
      serumCreatinineUmol: 175, baselineCreatinineUmol: 175, serumNaMmol: 137, serumBUNMmol: 16.0,
      isMehranEnabled: true, hasHypotensionOrInotropes: true, hasIabp: false, hasHeartFailureNyha: true,
      hasDiabetes: true, contrastVolumeMl: 220, hematocritPercent: 32
    }
  },
  {
    id: 'vancomycin_overdose_pk',
    name: '13. Quá Liều Vancomycin Kèm Độc Tính Thận (AUC24 = 820 mg·h/L)',
    badge: '⚠️ Ngộ Độc Thận: Trough 28 mcg/mL',
    badgeColor: '#ef4444',
    category: 'toxic_cin',
    description: 'Nam 62 tuổi dùng Vancomycin 1.5g q12h khi CrCl 35 mL/p. Nồng độ đáy Trough đo được 28 mcg/mL, AUC 820 mg·h/L. Ngừng liều, chờ Trough < 15.',
    values: {
      age: 62, gender: 'male', weightKg: 70, heightCm: 168,
      serumCreatinineUmol: 190, baselineCreatinineUmol: 95, serumNaMmol: 138,
      isVancoPkEnabled: true, vancoDoseMg: 1500, vancoIntervalHours: 12, vancoInfusionHours: 2
    }
  },
  {
    id: 'acyclovir_crystal_nephropathy',
    name: '14. Lắng Đọng Tinh Thể Acyclovir Sau Tiêm Liều Cao (Crystal AKI)',
    badge: 'Tắc Ống Thận Tinh Thể Acyclovir',
    badgeColor: '#ea580c',
    category: 'toxic_cin',
    description: 'Nữ 42 tuổi viêm não Herpes tiêm Acyclovir 10mg/kg q8h mà không bù đủ nước. Creatinine tăng từ 65 lên 210 umol/L sau 48h. Cần truyền dịch thể tích lớn.',
    values: {
      age: 42, gender: 'female', weightKg: 52, heightCm: 158,
      serumCreatinineUmol: 210, baselineCreatinineUmol: 65, serumNaMmol: 140,
      isKineticGfrEnabled: true, deltaHours: 48, deltaCreatinineUmol: 145
    }
  },
  {
    id: 'colistin_loading_icu',
    name: '15. Phác Đồ Nạp & Duy Trì Colistin (CMS) Ở Bệnh Nhân Suy Thận',
    badge: 'Acinetobacter XDR | Hiệu Chỉnh CMS',
    badgeColor: '#7c3aed',
    category: 'toxic_cin',
    description: 'Nam 66 tuổi viêm phổi thở máy Acinetobacter baumannii kháng Carbapenem, CrCl 28 mL/p. Nạp 9 triệu UI CMS, duy trì 4.5 triệu UI/ngày chia 2 lần.',
    values: {
      age: 66, gender: 'male', weightKg: 65, heightCm: 166,
      serumCreatinineUmol: 220, baselineCreatinineUmol: 110, serumNaMmol: 139
    }
  },
  {
    id: 'aminoglycoside_hartford_q36h',
    name: '16. Liều Mở Rộng Aminoglycoside (Hartford Nomogram Q36H)',
    badge: 'Gentamicin 7mg/kg | CrCl 45 mL/p',
    badgeColor: '#0284c7',
    category: 'aki',
    description: 'Nữ 55 tuổi nhiễm khuẩn huyết Gram âm, CrCl 45 mL/p. Áp dụng liều mở rộng Gentamicin 7mg/kg (385mg) với khoảng cách giãn ra mỗi 36 giờ.',
    values: {
      age: 55, gender: 'female', weightKg: 55, heightCm: 154,
      serumCreatinineUmol: 130, serumNaMmol: 138
    }
  },
  {
    id: 'sarcopenia_elderly_overestimation',
    name: '17. Đánh Giá Sai eGFR Ở Cụ Bà Teo Cơ Suy Dinh Dưỡng',
    badge: 'Creatinine Giả Thấp | Cần Cystatin C',
    badgeColor: '#ca8a04',
    category: 'ckd',
    description: 'Nữ 84 tuổi teo cơ nặng, 38kg, Creatinine máu 48 umol/L (eGFR Creatinine giả tạo 95). Đo Cystatin C 1.95 mg/L cho thấy eGFR thật sự chỉ 24 mL/p!',
    values: {
      age: 84, gender: 'female', weightKg: 38, heightCm: 148,
      serumCreatinineUmol: 48, serumCystatinCMgL: 1.95,
      serumNaMmol: 135, serumBUNMmol: 11.2
    }
  },
  {
    id: 'obese_bmi42_crcl_adjbw',
    name: '18. Bệnh Nhân Béo Phì Nặng Cần Hiệu Chỉnh Cân Nặng AdjBW (BMI 42)',
    badge: 'Hiệu Chỉnh Trọng Lượng Dược Lý AdjBW',
    badgeColor: '#0284c7',
    category: 'ckd',
    description: 'Nam 48 tuổi 125kg cao 172cm (BMI 42), Creatinine 135 umol/L. Tránh quá liều kháng sinh bằng cách dùng Cân nặng hiệu chỉnh AdjBW 89kg.',
    values: {
      age: 48, gender: 'male', weightKg: 125, heightCm: 172,
      serumCreatinineUmol: 135, serumNaMmol: 140
    }
  },
  {
    id: 'fst_fail_crrt_trigger',
    name: '19. Nghiệm Pháp Furosemide Stress Test Thất Bại (FST < 200mL/2h)',
    badge: '🚨 FST Thất Bại: Dự Báo Cần Lọc Máu 87%',
    badgeColor: '#dc2626',
    category: 'aki',
    description: 'Nam 72 tuổi AKI Stage 2, tiêm Furosemide 100mg IV, sau 2h nước tiểu chỉ đạt 65 mL (< 200mL). Dự báo tiến triển AKI Stage 3, chuẩn bị Catheter lọc máu.',
    values: {
      age: 72, gender: 'male', weightKg: 70, heightCm: 167,
      serumCreatinineUmol: 290, baselineCreatinineUmol: 100,
      urineVolumePeriodMl: 65, urineOutputHours: 2, isTakingDiuretic: true, furosemideStressTest2hMl: 65
    }
  },
  {
    id: 'post_crrt_rebound',
    name: '20. Hồi Phục Thận Sau Lọc Máu Liên Tục CRRT (Weaning CRRT)',
    badge: 'Cai Lọc Máu CRRT Thành Công',
    badgeColor: '#10b981',
    category: 'aki',
    description: 'Nữ 50 tuổi sau sốc nhiễm khuẩn ngưng CRRT, nước tiểu tự nhiên đạt 2200 mL/24h, Creatinine ổn định 145 umol/L. Chuyển lại liều kháng sinh thông thường.',
    values: {
      age: 50, gender: 'female', weightKg: 56, heightCm: 158,
      serumCreatinineUmol: 145, baselineCreatinineUmol: 75,
      urineVolume24hMl: 2200, serumNaMmol: 138
    }
  }
];

// Master 30+ Drug ICU & Ward Dosing Matrix Database
export const MASTER_DRUG_DATABASE: DrugDosingRecommendation[] = [
  // 1. Carbapenems & Beta-Lactams
  {
    drugName: 'Meropenem',
    category: 'Kháng sinh Carbapenem',
    standardDose: '1g IV q8h (2g q8h trong Viêm màng não)',
    adjustedDose: 'CrCl 26-50: 1g q12h | CrCl 10-25: 500mg q12h | CrCl <10: 500mg q24h',
    hemodialysisDose: '500mg sau mỗi buổi lọc máu (IHD thải trừ ~50% thuốc)',
    crrtDose: 'CVVH/CVVHD: 1g IV q8h - q12h (truyền kéo dài 3h)',
    monitoringWarning: 'Ưu tiên truyền kéo dài 3h để tối ưu Time > MIC ở bệnh nhân nặng.'
  },
  {
    drugName: 'Imipenem / Cilastatin',
    category: 'Kháng sinh Carbapenem',
    standardDose: '500mg IV q6h hoặc 1g IV q8h',
    adjustedDose: 'CrCl 41-70: 500mg q8h | CrCl 21-40: 500mg q12h | CrCl 6-20: 250mg q12h',
    hemodialysisDose: '250mg q12h, bổ sung sau lọc máu',
    crrtDose: '500mg q8h - q12h',
    monitoringWarning: 'Nguy cơ co giật thần kinh cao nếu không giảm liều ở bệnh nhân suy thận.'
  },
  {
    drugName: 'Cefepime (Maxipime)',
    category: 'Kháng sinh Cephalosporin Thế hệ 4',
    standardDose: '2g IV q8h',
    adjustedDose: 'CrCl 30-50: 2g q12h | CrCl 11-29: 1g-2g q24h | CrCl <11: 500mg-1g q24h',
    hemodialysisDose: '1g ngày 1, sau đó 500mg q24h (cho sau lọc máu)',
    crrtDose: 'CVVH: 1g-2g q12h',
    monitoringWarning: '🚨 CẢNH BÁO: Độc thần kinh Cefepime Neurotoxicity (lơ mơ, co giật, hôn mê) nếu không chỉnh liều.'
  },
  {
    drugName: 'Piperacillin / Tazobactam (Zosyn)',
    category: 'Kháng sinh Penicillin phổ rộng',
    standardDose: '4.5g IV q6h (hoặc truyền liên tục/kéo dài 3.375g q8h)',
    adjustedDose: 'CrCl 20-40: 3.375g q6h | CrCl <20: 2.25g q6h',
    hemodialysisDose: '2.25g q8h + bổ sung 0.75g sau lọc máu',
    crrtDose: 'CVVH: 3.375g - 4.5g q8h (truyền kéo dài)',
    monitoringWarning: 'Phối hợp với Vancomycin làm tăng nguy cơ AKI gấp 3 lần so với Cefepime + Vanco.'
  },
  {
    drugName: 'Ceftriaxone',
    category: 'Kháng sinh Cephalosporin Thế hệ 3',
    standardDose: '1 - 2g IV q24h',
    adjustedDose: 'KHÔNG CẦN CHỈNH LIỀU trong suy thận (thải trừ kép qua gan & thận)',
    hemodialysisDose: 'Không cần bổ sung sau lọc máu',
    crrtDose: '1 - 2g IV q24h thông thường',
    monitoringWarning: 'An toàn ở mọi mức lọc cầu thận; chỉ giảm liều nếu kèm suy gan nặng.'
  },
  {
    drugName: 'Ceftazidime',
    category: 'Kháng sinh Cephalosporin Kháng Trực Khuẩn Mủ Xanh',
    standardDose: '2g IV q8h',
    adjustedDose: 'CrCl 31-50: 1g q12h | CrCl 16-30: 1g q24h | CrCl 6-15: 500mg q24h | CrCl <6: 500mg q48h',
    hemodialysisDose: '1g liều nạp, sau đó 1g sau mỗi buổi lọc máu',
    crrtDose: '1g - 2g q12h',
    monitoringWarning: 'Thải trừ hầu như hoàn toàn qua lọc cầu thận.'
  },

  // 2. Glycopeptides, Lipopeptides & Polymyxins
  {
    drugName: 'Vancomycin',
    category: 'Kháng sinh Glycopeptide (MRSA)',
    standardDose: 'Liều nạp 25-30 mg/kg, duy trì 15-20 mg/kg q8-12h',
    adjustedDose: 'CrCl 30-49: 15mg/kg q24h | CrCl 20-29: 15mg/kg q48h | CrCl <20: Theo dõi nồng độ ngẫu nhiên',
    hemodialysisDose: 'Nạp 20-25 mg/kg, sau đó 500-1000mg sau mỗi buổi lọc HD dựa theo Trough trước lọc',
    crrtDose: 'Nạp 20-25 mg/kg, sau đó 7.5-10 mg/kg q12h hoặc truyền liên tục',
    monitoringWarning: 'Đích AUC24/MIC 400 - 600 mg·h/L (Trough 15-20 mcg/mL). Nguy cơ độc thận khi Trough > 20.'
  },
  {
    drugName: 'Daptomycin',
    category: 'Kháng sinh Lipopeptide',
    standardDose: '6 - 10 mg/kg IV q24h',
    adjustedDose: 'CrCl <30: 6 - 10 mg/kg MỖI 48 GIỜ (giãn khoảng cách)',
    hemodialysisDose: '6 - 10 mg/kg mỗi 48h, cho sau buổi lọc máu',
    crrtDose: '6 - 8 mg/kg q24h - q48h',
    monitoringWarning: 'Theo dõi men cơ CPK hàng tuần (nguy cơ viêm cơ / tiêu cơ vân).'
  },
  {
    drugName: 'Colistin (Colistimethate Sodium CMS)',
    category: 'Kháng sinh Polymyxin (XDR Gram Âm)',
    standardDose: 'Nạp 9 triệu UI (300mg CBA), duy trì 9 triệu UI/ngày chia 2-3 lần',
    adjustedDose: 'CrCl 30-50: 5.5-7.5 triệu UI/ngày | CrCl 10-29: 4.5 triệu UI/ngày | CrCl <10: 3 triệu UI/ngày',
    hemodialysisDose: 'Ngày không lọc: 2 triệu UI/ngày; Ngày lọc HD: Bổ sung 1-1.5 triệu UI sau lọc',
    crrtDose: 'Nạp 9 triệu UI, duy trì 6.5 - 9 triệu UI/ngày (CVVH thanh thải CMS rất cao)',
    monitoringWarning: 'Độc tính thận phụ thuộc liều cao. Bắt buộc dùng đủ liều nạp 9 triệu UI bất kể chức năng thận.'
  },

  // 3. Anticoagulants & DOACs
  {
    drugName: 'Enoxaparin (Lovenox)',
    category: 'Thuốc chống đông LMWH',
    standardDose: '1 mg/kg SC q12h (hoặc dự phòng 40mg SC q24h)',
    adjustedDose: 'CrCl 15-29: 1 mg/kg MỖI 24 GIỜ (giảm 50% liều điều trị) | Dự phòng: 20mg q24h',
    hemodialysisDose: 'CHỐNG CHỈ ĐỊNH liều điều trị (CrCl <15). Chuyển sang Heparin tiêu chuẩn UFH.',
    crrtDose: 'Cân nhắc chuyển sang UFH hoặc theo dõi chặt chẽ Anti-Xa',
    monitoringWarning: 'Nguy cơ tích lũy thuốc gây xuất huyết tử vong nếu dùng q12h khi CrCl < 30.',
    isContraindicated: false
  },
  {
    drugName: 'Fondaparinux (Arixtra)',
    category: 'Thuốc ức chế chọn lọc Factor Xa',
    standardDose: '7.5 mg SC q24h (50-100kg)',
    adjustedDose: 'CrCl 20-50: Giảm liều còn 5mg (hoặc 1.5mg trong dự phòng)',
    hemodialysisDose: 'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI khi CrCl < 20 mL/phút',
    crrtDose: 'Không khuyến cáo',
    monitoringWarning: 'Thời gian bán thải kéo dài 17-21h và thải trừ 100% qua thận.',
    isContraindicated: false
  },
  {
    drugName: 'Rivaroxaban (Xarelto)',
    category: 'Thuốc chống đông đường uống DOAC',
    standardDose: '20 mg uống q24h (Rung nhĩ)',
    adjustedDose: 'CrCl 15-49: Giảm liều 15 mg uống q24h',
    hemodialysisDose: 'CHỐNG CHỈ ĐỊNH khi CrCl < 15 mL/phút',
    crrtDose: 'Tránh sử dụng',
    monitoringWarning: 'Uống cùng với thức ăn để tối ưu sinh khả dụng.'
  },
  {
    drugName: 'Apixaban (Eliquis)',
    category: 'Thuốc chống đông đường uống DOAC',
    standardDose: '5 mg uống q12h',
    adjustedDose: 'Giảm còn 2.5 mg q12h nếu có ít nhất 2 trong 3 tiêu chuẩn: Tuổi ≥80, Cân nặng ≤60kg, Scr ≥133 umol/L',
    hemodialysisDose: 'Thận trọng: Có thể dùng 2.5mg-5mg q12h theo FDA (chỉ 27% thải trừ qua thận)',
    crrtDose: '2.5 mg q12h',
    monitoringWarning: 'DOAC an toàn nhất trên bệnh nhân suy thận nhẹ-trung bình.'
  },
  {
    drugName: 'Dabigatran (Pradaxa)',
    category: 'Thuốc ức chế trực tiếp Thrombin đường uống',
    standardDose: '150 mg uống q12h',
    adjustedDose: 'CrCl 30-50: 110 mg q12h (hoặc 75mg q12h theo tiêu chí nguy cơ)',
    hemodialysisDose: 'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI khi CrCl < 30 mL/phút (80% thải trừ qua thận)',
    crrtDose: 'Chống chỉ định',
    monitoringWarning: 'Thuốc giải độc đặc hiệu: Idarucizumab (Praxbind).'
  },

  // 4. Antivirals & Antifungals
  {
    drugName: 'Acyclovir IV',
    category: 'Kháng virus Herpes / Varicella',
    standardDose: '10 mg/kg IV q8h (Viêm não Herpes)',
    adjustedDose: 'CrCl 25-50: 10mg/kg q12h | CrCl 10-25: 10mg/kg q24h | CrCl <10: 5mg/kg q24h',
    hemodialysisDose: '5mg/kg sau mỗi buổi lọc máu',
    crrtDose: '5 - 10 mg/kg q12h',
    monitoringWarning: 'Truyền chậm > 1h và bù đủ dịch để ngăn ngừa lắng đọng tinh thể gây AKI.'
  },
  {
    drugName: 'Remdesivir (Veklury)',
    category: 'Kháng virus RNA',
    standardDose: '200mg N1, sau đó 100mg q24h',
    adjustedDose: 'Theo khuyến cáo mới 2023: Có thể dùng ở eGFR < 30 mL/p nếu lợi ích vượt trội nguy cơ tá dược SBECD',
    hemodialysisDose: '100mg q24h, cho sau lọc máu',
    crrtDose: '100mg q24h',
    monitoringWarning: 'Theo dõi men gan và chức năng thận định kỳ.'
  },
  {
    drugName: 'Fluconazole',
    category: 'Kháng nấm Triazole',
    standardDose: '400 - 800 mg IV/PO q24h',
    adjustedDose: 'CrCl ≤50: Dùng liều nạp chuẩn, sau đó GIẢM 50% LIỀU DUY TRÌ',
    hemodialysisDose: 'Cho 100% liều sau mỗi buổi lọc máu (lọc loại bỏ 50% thuốc)',
    crrtDose: 'CVVH/CVVHD: 400 - 800 mg q24h (thanh thải qua màng lọc rất tốt)',
    monitoringWarning: 'Thải trừ 80% dưới dạng không đổi qua nước tiểu.'
  },

  // 5. Antidiabetic & Cardiovascular
  {
    drugName: 'Metformin',
    category: 'Thuốc hạ đường huyết Biguanide',
    standardDose: '1000 - 2000 mg/ngày',
    adjustedDose: 'eGFR 45-59: Tối đa 1500mg/ngày | eGFR 30-44: Tối đa 500-1000mg/ngày (KHÔNG khởi đầu mới)',
    hemodialysisDose: 'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI (eGFR < 30 mL/phút)',
    crrtDose: 'Chống chỉ định',
    monitoringWarning: '🚨 Nguy cơ Toan Chuyển Hóa Tăng Acid Lactic (Lactic Acidosis) gây tử vong cao.'
  },
  {
    drugName: 'Dapagliflozin / Empagliflozin (SGLT2i)',
    category: 'Thuốc ức chế SGLT2 (Bảo vệ Tim Thận)',
    standardDose: '10 mg uống 1 lần/ngày',
    adjustedDose: 'Khởi đầu bảo vệ thận/tim: eGFR ≥20 (Dapa) hoặc ≥20 (Empa). Duy trì đến khi lọc máu.',
    hemodialysisDose: 'Không khuyến cáo khi đang lọc máu chu kỳ',
    crrtDose: 'Tạm ngưng trong giai đoạn sốc / hồi sức',
    monitoringWarning: 'Có thể làm giảm nhẹ eGFR thoáng qua lúc đầu (3-5 mL/p) rồi ổn định lâu dài.'
  },
  {
    drugName: 'Digoxin',
    category: 'Thuốc trợ tim Glycoside',
    standardDose: '0.125 - 0.25 mg/ngày',
    adjustedDose: 'CrCl 30-50: 0.125 mg q24-48h | CrCl <30: 0.0625 mg q48h hoặc đo nồng độ',
    hemodialysisDose: '0.0625 mg q48-72h (không bị lọc máu loại bỏ)',
    crrtDose: '0.125 mg q48h',
    monitoringWarning: 'Nồng độ đích hẹp: 0.5 - 0.9 ng/mL. Nguy cơ loạn nhịp tử vong khi hạ Kali máu đi kèm.'
  },
  {
    drugName: 'Allopurinol',
    category: 'Thuốc hạ Acid Uric (Ức chế Xanthine Oxidase)',
    standardDose: '100 - 300 mg/ngày',
    adjustedDose: 'CrCl 10-20: 100 mg/ngày | CrCl <10: 100 mg cách ngày (hoặc 50mg/ngày)',
    hemodialysisDose: '50 - 100mg sau mỗi buổi lọc máu',
    crrtDose: '100mg/ngày',
    monitoringWarning: 'Nguy cơ Hội chứng quá mẫn nghiêm trọng Allopurinol Hypersensitivity Syndrome (DRESS/SJS).'
  }
];

/**
 * 1. Master Calculation & Analysis Engine
 */
export function analyzeRenalStudio(inputs: RenalInputs): RenalAnalysisResult {
  const {
    age, gender, weightKg, heightCm,
    serumCreatinineUmol, serumCystatinCMgL, baselineCreatinineUmol,
    serumBUNMmol, serumNaMmol,
    isKineticGfrEnabled, deltaHours, deltaCreatinineUmol,
    urineVolume24hMl, urineOutputHours, urineVolumePeriodMl,
    urineNaMmol, urineCreatinineUmol, urineUreaMmol,
    urineAlbuminToCreatinineMgG, isTakingDiuretic, furosemideStressTest2hMl,
    isMehranEnabled, hasHypotensionOrInotropes, hasIabp, hasHeartFailureNyha,
    hasDiabetes, contrastVolumeMl, hematocritPercent,
    isVancoPkEnabled, vancoDoseMg, vancoIntervalHours, vancoInfusionHours, targetMicMgL
  } = inputs;

  const isFemale = gender === 'female';
  const scrMgDl = serumCreatinineUmol / 88.4;
  const height = heightCm || 165;

  // A. Ideal Body Weight & Adjusted Body Weight
  const ibwKg = isFemale
    ? Math.max(30, 45.5 + 0.9 * (height - 152))
    : Math.max(35, 50.0 + 0.9 * (height - 152));
  
  const isObese = weightKg > 1.2 * ibwKg;
  const adjBwKg = isObese ? ibwKg + 0.4 * (weightKg - ibwKg) : null;

  // B. Cockcroft-Gault Multi-Weight
  const calcCg = (wt: number) => {
    let res = (((140 - age) * wt) / (72 * scrMgDl)) * (isFemale ? 0.85 : 1.0);
    return Math.max(0, Math.round(res));
  };

  const cgAbw = calcCg(weightKg);
  const cgIbw = calcCg(ibwKg);
  const cgAdj = adjBwKg ? calcCg(adjBwKg) : null;
  const recommendedCrCl = isObese && cgAdj ? cgAdj : (weightKg < ibwKg ? cgAbw : cgIbw);

  // C. CKD-EPI 2021 Race-Free Creatinine
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const minCr = Math.min(scrMgDl / kappa, 1);
  const maxCr = Math.max(scrMgDl / kappa, 1);
  const femaleFactorCr = isFemale ? 1.012 : 1.0;

  const ckdEpiCr = Math.round(
    142 *
    Math.pow(minCr, alpha) *
    Math.pow(maxCr, -1.200) *
    Math.pow(0.9938, age) *
    femaleFactorCr
  );

  // D. CKD-EPI 2021 Cystatin C & Combined
  let ckdEpiCysC: number | null = null;
  let ckdEpiCombined: number | null = null;

  if (serumCystatinCMgL && serumCystatinCMgL > 0) {
    const cys = serumCystatinCMgL;
    const minCys = Math.min(cys / 0.8, 1);
    const maxCys = Math.max(cys / 0.8, 1);
    const femaleFactorCys = isFemale ? 0.932 : 1.0;

    ckdEpiCysC = Math.round(
      133 *
      Math.pow(minCys, -0.499) *
      Math.pow(maxCys, -1.328) *
      Math.pow(0.996, age) *
      femaleFactorCys
    );

    const alphaComb = isFemale ? -0.219 : -0.144;
    const femaleFactorComb = isFemale ? 0.963 : 1.0;

    ckdEpiCombined = Math.round(
      135 *
      Math.pow(minCr, alphaComb) *
      Math.pow(maxCr, -0.544) *
      Math.pow(minCys, -0.323) *
      Math.pow(maxCys, -0.778) *
      Math.pow(0.9961, age) *
      femaleFactorComb
    );
  }

  // E. Kinetic GFR (Chen 2013)
  let kineticGfr: number | null = null;
  if (isKineticGfrEnabled && deltaHours && deltaHours > 0 && deltaCreatinineUmol !== undefined) {
    const tbwLiters = weightKg * (isFemale ? 0.5 : 0.6);
    const prevCrMgDl = Math.max(0.1, (serumCreatinineUmol - deltaCreatinineUmol) / 88.4);
    const meanCrMgDl = Math.max(0.1, (prevCrMgDl + scrMgDl) / 2);
    const baselineCrCl = baselineCreatinineUmol ? calcCg(weightKg) : ckdEpiCr;
    
    // Chen formula: kGFR (mL/min) = (baselineCrCl * prevCr / meanCr) - (TBW * deltaCrMgDl * 1000) / (deltaHours * 60 * meanCr)
    const deltaCrMgDl = deltaCreatinineUmol / 88.4;
    const kgfrCalc = (baselineCrCl * prevCrMgDl) / meanCrMgDl - (tbwLiters * deltaCrMgDl * 1000) / (deltaHours * 60 * meanCrMgDl);
    kineticGfr = Math.max(0, Math.round(kgfrCalc));
  }

  // F. Augmented Renal Clearance (ARC)
  const isAugmentedRenalClearance = recommendedCrCl > (isFemale ? 130 : 140) || ckdEpiCr > (isFemale ? 130 : 140);
  let arcScore = 0;
  if (age < 50) arcScore += 6;
  if (age >= 50 && age <= 65) arcScore += 3;
  let arcExplanation: string | null = null;
  if (isAugmentedRenalClearance) {
    arcExplanation = `Bệnh nhân có hiện tượng TĂNG THANH THẢI THẬN (ARC: CrCl ${recommendedCrCl} mL/phút). Nguy cơ cao THẤT BẠI ĐIỀU TRỊ KHÁNG SINH do nồng độ thuốc trong máu bị đào thải quá nhanh! Cần tăng liều hoặc truyền kéo dài.`;
  }

  // G. KDIGO G & A Staging & Risk Tier
  let kdigoGStage: 'G1' | 'G2' | 'G3a' | 'G3b' | 'G4' | 'G5' = 'G1';
  let kdigoStageColor = '#10b981';
  let kdigoDescription = 'Chức năng thận bình thường (eGFR ≥ 90)';

  const primaryEgfr = ckdEpiCombined || ckdEpiCr;

  if (primaryEgfr >= 90) {
    kdigoGStage = 'G1'; kdigoStageColor = '#10b981';
    kdigoDescription = 'KDIGO G1: Bình thường hoặc tăng lọc (eGFR ≥ 90 mL/p/1.73m²)';
  } else if (primaryEgfr >= 60) {
    kdigoGStage = 'G2'; kdigoStageColor = '#10b981';
    kdigoDescription = 'KDIGO G2: Giảm nhẹ chức năng thận (eGFR 60 - 89 mL/p/1.73m²)';
  } else if (primaryEgfr >= 45) {
    kdigoGStage = 'G3a'; kdigoStageColor = '#f59e0b';
    kdigoDescription = 'KDIGO G3a: Giảm nhẹ đến trung bình (eGFR 45 - 59 mL/p/1.73m²)';
  } else if (primaryEgfr >= 30) {
    kdigoGStage = 'G3b'; kdigoStageColor = '#f59e0b';
    kdigoDescription = 'KDIGO G3b: Giảm trung bình đến nặng (eGFR 30 - 44 mL/p/1.73m²)';
  } else if (primaryEgfr >= 15) {
    kdigoGStage = 'G4'; kdigoStageColor = '#ef4444';
    kdigoDescription = 'KDIGO G4: Giảm nặng chức năng thận (eGFR 15 - 29 mL/p/1.73m²)';
  } else {
    kdigoGStage = 'G5'; kdigoStageColor = '#dc2626';
    kdigoDescription = 'KDIGO G5: Suy thận giai đoạn cuối (ESKD eGFR < 15 mL/p/1.73m²)';
  }

  let kdigoAStage: 'A1' | 'A2' | 'A3' = 'A1';
  const uacr = urineAlbuminToCreatinineMgG || 10;
  if (uacr >= 300) kdigoAStage = 'A3';
  else if (uacr >= 30) kdigoAStage = 'A2';
  else kdigoAStage = 'A1';

  // KDIGO 2D Risk Matrix Tier
  let kdigoRiskTier: 'low' | 'moderate' | 'high' | 'very_high' = 'low';
  if (kdigoGStage === 'G5' || kdigoGStage === 'G4' || (kdigoGStage === 'G3b' && kdigoAStage !== 'A1') || (kdigoGStage === 'G3a' && kdigoAStage === 'A3')) {
    kdigoRiskTier = 'very_high';
  } else if ((kdigoGStage === 'G3b' && kdigoAStage === 'A1') || (kdigoGStage === 'G3a' && kdigoAStage === 'A2') || (kdigoGStage === 'G2' && kdigoAStage === 'A3') || (kdigoGStage === 'G1' && kdigoAStage === 'A3')) {
    kdigoRiskTier = 'high';
  } else if ((kdigoGStage === 'G3a' && kdigoAStage === 'A1') || (kdigoGStage === 'G2' && kdigoAStage === 'A2') || (kdigoGStage === 'G1' && kdigoAStage === 'A2')) {
    kdigoRiskTier = 'moderate';
  } else {
    kdigoRiskTier = 'low';
  }

  // H. AKI Staging (KDIGO 2012)
  let akiStage: 'No AKI' | 'Stage 1' | 'Stage 2' | 'Stage 3' = 'No AKI';
  let akiStageColor = '#10b981';
  const akiReasoning: string[] = [];

  const baseCr = baselineCreatinineUmol || serumCreatinineUmol;
  const deltaFromBase = serumCreatinineUmol - baseCr;
  const ratioFromBase = baseCr > 0 ? serumCreatinineUmol / baseCr : 1.0;

  // Urine Output rate (mL/kg/h)
  let uoRate: number | null = null;
  if (urineVolumePeriodMl !== undefined && urineOutputHours && urineOutputHours > 0) {
    uoRate = parseFloat((urineVolumePeriodMl / (weightKg * urineOutputHours)).toFixed(2));
  }

  if (ratioFromBase >= 3.0 || serumCreatinineUmol >= 353.6 || (uoRate !== null && uoRate < 0.3 && urineOutputHours! >= 24) || (urineVolumePeriodMl === 0 && urineOutputHours! >= 12)) {
    akiStage = 'Stage 3'; akiStageColor = '#dc2626';
    if (ratioFromBase >= 3.0) akiReasoning.push(`Creatinine tăng gấp ≥ 3.0 lần so với nền (${ratioFromBase.toFixed(1)}x)`);
    if (serumCreatinineUmol >= 353.6) akiReasoning.push(`Creatinine tuyệt đối ≥ 353.6 umol/L (${serumCreatinineUmol} umol/L)`);
    if (uoRate !== null && uoRate < 0.3) akiReasoning.push(`Thiểu niệu nặng < 0.3 mL/kg/h kéo dài ${urineOutputHours} giờ (${uoRate} mL/kg/h)`);
  } else if (ratioFromBase >= 2.0 || (uoRate !== null && uoRate < 0.5 && urineOutputHours! >= 12)) {
    akiStage = 'Stage 2'; akiStageColor = '#ef4444';
    if (ratioFromBase >= 2.0) akiReasoning.push(`Creatinine tăng gấp 2.0 - 2.9 lần so với nền (${ratioFromBase.toFixed(1)}x)`);
    if (uoRate !== null && uoRate < 0.5) akiReasoning.push(`Nước tiểu < 0.5 mL/kg/h kéo dài ≥ 12 giờ (${uoRate} mL/kg/h)`);
  } else if (deltaFromBase >= 26.5 || ratioFromBase >= 1.5 || (uoRate !== null && uoRate < 0.5 && urineOutputHours! >= 6)) {
    akiStage = 'Stage 1'; akiStageColor = '#f59e0b';
    if (deltaFromBase >= 26.5) akiReasoning.push(`Creatinine tăng cấp tính ≥ 26.5 umol/L (+${deltaFromBase.toFixed(1)} umol/L)`);
    if (ratioFromBase >= 1.5) akiReasoning.push(`Creatinine tăng 1.5 - 1.9 lần so với nền (${ratioFromBase.toFixed(1)}x)`);
    if (uoRate !== null && uoRate < 0.5) akiReasoning.push(`Nước tiểu < 0.5 mL/kg/h trong 6-12 giờ (${uoRate} mL/kg/h)`);
  }

  // I. FENa & FEUrea Diagnostics
  let feNa: number | null = null;
  let feNaInterpretation: string | null = null;
  let feUrea: number | null = null;
  let feUreaInterpretation: string | null = null;

  if (urineNaMmol !== undefined && urineCreatinineUmol !== undefined && serumNaMmol) {
    // FENa = (U_Na * S_Cr) / (S_Na * U_Cr) * 100
    feNa = parseFloat((((urineNaMmol * serumCreatinineUmol) / (serumNaMmol * urineCreatinineUmol)) * 100).toFixed(2));
    if (feNa < 1.0) {
      feNaInterpretation = `FENa = ${feNa}% (< 1%) ➔ Phù hợp Suy Thận Trước Thận (Tái hấp thu Natri tối đa)`;
    } else if (feNa > 2.0) {
      feNaInterpretation = `FENa = ${feNa}% (> 2%) ➔ Phù hợp Hoại Tử Ống Thận Cấp Tại Thận (ATN)`;
    } else {
      feNaInterpretation = `FENa = ${feNa}% (1 - 2%) ➔ Vùng không xác định / Trung gian`;
    }
  }

  if (urineUreaMmol !== undefined && urineCreatinineUmol !== undefined && serumBUNMmol) {
    // FEUrea = (U_Urea * S_Cr) / (S_Urea * U_Cr) * 100
    feUrea = parseFloat((((urineUreaMmol * serumCreatinineUmol) / (serumBUNMmol * urineCreatinineUmol)) * 100).toFixed(1));
    if (feUrea < 35.0) {
      feUreaInterpretation = `FEUrea = ${feUrea}% (< 35%) ➔ Gợi ý Trước Thận (Có giá trị ngay cả khi đang dùng lợi tiểu Furosemide!)`;
    } else if (feUrea > 50.0) {
      feUreaInterpretation = `FEUrea = ${feUrea}% (> 50%) ➔ Gợi ý Tổn thương tại thận (ATN)`;
    } else {
      feUreaInterpretation = `FEUrea = ${feUrea}% (35 - 50%) ➔ Trung gian`;
    }
  }

  // BUN / Creatinine Ratio
  let bunCrRatio: number | null = null;
  if (serumBUNMmol && serumCreatinineUmol) {
    const bunMgDl = serumBUNMmol * 2.8; // mmol/L to mg/dL
    bunCrRatio = parseFloat((bunMgDl / scrMgDl).toFixed(1));
  }

  let prerenalVsAtnSummary = 'Chưa đủ dữ liệu điện giải niệu.';
  if (feNa !== null || feUrea !== null) {
    if (isTakingDiuretic && feUrea !== null) {
      prerenalVsAtnSummary = feUrea < 35 ? 'Ưu thế Trước Thận (Dựa trên FEUrea vì có Lợi tiểu)' : 'Ưu thế Tại Thận / ATN (Dựa trên FEUrea)';
    } else if (feNa !== null) {
      prerenalVsAtnSummary = feNa < 1.0 ? 'Ưu thế Trước Thận (FENa < 1%)' : (feNa > 2.0 ? 'Ưu thế Hoại Tử Ống Thận Cấp ATN (FENa > 2%)' : 'Chưa phân định rõ Trước hay Tại Thận');
    }
  }

  // Furosemide Stress Test
  let fstInterpretation: string | null = null;
  if (furosemideStressTest2hMl !== undefined) {
    if (furosemideStressTest2hMl < 200) {
      fstInterpretation = `🚨 FST THẤT BẠI (${furosemideStressTest2hMl} mL < 200 mL trong 2h): Độ nhạy 87% dự báo tiến triển AKI Stage 3 hoặc cần Lọc Máu Cấp Cứu RRT!`;
    } else {
      fstInterpretation = `✅ FST ĐẠT (${furosemideStressTest2hMl} mL ≥ 200 mL trong 2h): Tiên lượng đáp ứng lợi tiểu tốt, ít nguy cơ cần can thiệp RRT khẩn.`;
    }
  }

  // J. Contrast-Induced Nephropathy (Mehran Score 2.0)
  let mehranScore: number | null = null;
  let mehranCinRiskPercent: number | null = null;
  let mehranDialysisRiskPercent: number | null = null;
  let mehranRiskCategory: string | null = null;
  let mehranHydrationProtocol: string | null = null;

  if (isMehranEnabled) {
    let score = 0;
    if (hasHypotensionOrInotropes) score += 5;
    if (hasIabp) score += 5;
    if (hasHeartFailureNyha) score += 5;
    if (age > 75) score += 4;
    if (hasDiabetes) score += 3;
    if (hematocritPercent && ((isFemale && hematocritPercent < 36) || (!isFemale && hematocritPercent < 39))) score += 3;
    if (contrastVolumeMl) score += Math.floor(contrastVolumeMl / 100);

    if (ckdEpiCr < 20) score += 6;
    else if (ckdEpiCr < 40) score += 4;
    else if (ckdEpiCr < 60) score += 2;

    mehranScore = score;
    if (score <= 5) {
      mehranRiskCategory = 'Nguy cơ Thấp (Low Risk)';
      mehranCinRiskPercent = 7.5;
      mehranDialysisRiskPercent = 0.04;
    } else if (score <= 10) {
      mehranRiskCategory = 'Nguy cơ Trung Bình (Moderate Risk)';
      mehranCinRiskPercent = 14.0;
      mehranDialysisRiskPercent = 0.12;
    } else if (score <= 15) {
      mehranRiskCategory = 'Nguy cơ Cao (High Risk)';
      mehranCinRiskPercent = 26.1;
      mehranDialysisRiskPercent = 1.09;
    } else {
      mehranRiskCategory = 'Nguy cơ Rất Cao (Very High Risk)';
      mehranCinRiskPercent = 57.3;
      mehranDialysisRiskPercent = 12.6;
    }

    mehranHydrationProtocol = `Phác đồ bù dịch phòng ngừa: NaCl 0.9% 1 mL/kg/giờ (hoặc 0.5 mL/kg/giờ nếu có suy tim EF < 40%) trong 12 giờ trước và 12 giờ sau chụp. Hoặc phác đồ nhanh: 3 mL/kg trong 1 giờ trước + 1-1.5 mL/kg/giờ trong 4-6 giờ sau thủ thuật.`;
  }

  // K. Vancomycin Precision PK/PD Simulator (Sawchuk-Zaske 1-Compartment)
  let vancoPk: RenalAnalysisResult['vancoPk'] = null;
  if (isVancoPkEnabled) {
    const dose = vancoDoseMg || 1000;
    const interval = vancoIntervalHours || 12;
    const tInf = vancoInfusionHours || 1.5;
    const mic = targetMicMgL || 1.0;

    // Vd = 0.7 L/kg
    const vdLiters = parseFloat((0.7 * weightKg).toFixed(1));
    // ke = 0.00083 * CrCl + 0.0044
    const crclForVanco = Math.max(10, Math.min(150, recommendedCrCl));
    const ke = parseFloat((0.00083 * crclForVanco + 0.0044).toFixed(4));
    const halfLife = parseFloat((0.693 / ke).toFixed(1));
    const vancoCl = parseFloat((ke * vdLiters).toFixed(2)); // L/h

    // 24h Dose
    const dose24 = dose * (24 / interval);
    const auc24 = Math.round(dose24 / vancoCl);

    let aucTargetStatus: 'subtherapeutic' | 'optimal' | 'toxic' = 'optimal';
    if (auc24 < 400) aucTargetStatus = 'subtherapeutic';
    else if (auc24 > 600) aucTargetStatus = 'toxic';

    // Peak & Trough estimation
    const peak = parseFloat(((dose / (vdLiters * (1 - Math.exp(-ke * interval)))) * Math.exp(-ke * tInf)).toFixed(1));
    const trough = parseFloat((peak * Math.exp(-ke * (interval - tInf))).toFixed(1));

    const loadingDoseMg = Math.round(Math.min(3000, Math.max(1000, weightKg * 25)));
    const recommendedMaintenance = crclForVanco >= 90
      ? `${Math.round(weightKg * 15)} - ${Math.round(weightKg * 20)} mg IV mỗi 8 - 12 giờ`
      : (crclForVanco >= 50
        ? `${Math.round(weightKg * 15)} mg IV mỗi 12 giờ`
        : (crclForVanco >= 30
          ? `${Math.round(weightKg * 15)} mg IV mỗi 24 giờ`
          : `${Math.round(weightKg * 15)} mg IV mỗi 48 giờ hoặc theo dõi nồng độ đáy ngẫu nhiên`));

    vancoPk = {
      ke,
      vdLiters,
      halfLifeHours: halfLife,
      vancoClearanceLPerHour: vancoCl,
      auc24,
      aucTargetStatus,
      predictedPeak: peak,
      predictedTrough: trough,
      loadingDoseMg,
      recommendedMaintenance
    };
  }

  // L. Aminoglycoside Hartford Nomogram
  let aminoglycosideRegimen = '';
  if (recommendedCrCl >= 60) {
    aminoglycosideRegimen = `Hartford Extended-Interval: 7 mg/kg IV MỖI 24 GIỜ (${Math.round(weightKg * 7)} mg). Đo nồng độ sau tiêm 6-14h để định vị trên Nomogram.`;
  } else if (recommendedCrCl >= 40) {
    aminoglycosideRegimen = `Hartford Extended-Interval: 7 mg/kg IV MỖI 36 GIỜ (${Math.round(weightKg * 7)} mg). Giãn khoảng cách để bảo vệ thận.`;
  } else if (recommendedCrCl >= 20) {
    aminoglycosideRegimen = `Hartford Extended-Interval: 7 mg/kg IV MỖI 48 GIỜ (${Math.round(weightKg * 7)} mg).`;
  } else {
    aminoglycosideRegimen = `Chống chỉ định liều mở rộng khi CrCl < 20 mL/p. Chuyển sang liều quy ước truyền thống 1 - 1.5 mg/kg và theo dõi nồng độ đỉnh/đáy.`;
  }

  // M. Filter & Adapt Drug Adjustments from Master Database
  const drugAdjustments = MASTER_DRUG_DATABASE.map(d => {
    let contra = false;
    let note = d.adjustedDose;

    if (d.drugName === 'Metformin' && primaryEgfr < 30) {
      contra = true;
      note = 'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI (eGFR < 30 mL/phút)';
    } else if (d.drugName.includes('Enoxaparin') && recommendedCrCl < 15) {
      contra = true;
      note = 'CHỐNG CHỈ ĐỊNH (CrCl < 15 mL/phút) — Đổi sang Heparin tiêu chuẩn (UFH)';
    } else if (d.drugName.includes('Dabigatran') && recommendedCrCl < 30) {
      contra = true;
      note = 'CHỐNG CHỈ ĐỊNH (CrCl < 30 mL/phút)';
    } else if (d.drugName.includes('Fondaparinux') && recommendedCrCl < 20) {
      contra = true;
      note = 'CHỐNG CHỈ ĐỊNH (CrCl < 20 mL/phút)';
    }

    return {
      ...d,
      isContraindicated: contra,
      adjustedDose: note
    };
  });

  // N. Emergency Flags & Summary
  const emergencyFlags: string[] = [];
  if (akiStage === 'Stage 3') emergencyFlags.push('🚨 TỔN THƯƠNG THẬN CẤP KDIGO STAGE 3 — Nguy cơ cao cần lọc máu cấp cứu RRT!');
  if (isAugmentedRenalClearance) emergencyFlags.push('⚡ TĂNG THANH THẢI THẬN (ARC) — Nguy cơ thất bại kháng sinh do bị đào thải nhanh!');
  if (vancoPk && vancoPk.aucTargetStatus === 'toxic') emergencyFlags.push(`⚠️ VANCOMYCIN AUC24 = ${vancoPk.auc24} (Vượt ngưỡng 600) — Nguy cơ ngộ độc thận cấp!`);
  if (mehranScore && mehranScore >= 16) emergencyFlags.push(`🚨 NGUY CƠ TỔN THƯƠNG THẬN DO CẢN QUANG RẤT CAO (${mehranCinRiskPercent}% CIN, ${mehranDialysisRiskPercent}% Lọc Máu)`);
  if (primaryEgfr < 30 && hasDiabetes) emergencyFlags.push('⚠️ Ngừng ngay Metformin do nguy cơ toan acid lactic.');

  const recommendations: string[] = [];
  if (akiStage !== 'No AKI') {
    recommendations.push(`Theo dõi nước tiểu mỗi giờ (đích ≥ 0.5 mL/kg/h) và cân bằng xuất nhập dịch nghiêm ngặt.`);
    recommendations.push(`Rà soát và tạm ngừng ngay các thuốc độc thận: NSAIDs, Aminoglycoside, thuốc cản quang, ức chế men chuyển ACEi/ARB nếu đang sốc.`);
  }
  if (isObese) {
    recommendations.push(`Bệnh nhân béo phì (BMI > 30): Khuyến cáo dùng CrCl theo Cân nặng hiệu chỉnh AdjBW (${cgAdj} mL/phút) để tránh quá liều thuốc.`);
  }
  if (ckdEpiCysC && Math.abs(ckdEpiCr - ckdEpiCysC) > 20) {
    recommendations.push(`Có sự chênh lệch lớn giữa eGFR Creatinine (${ckdEpiCr}) và eGFR Cystatin C (${ckdEpiCysC}). Sử dụng eGFR phối hợp (${ckdEpiCombined} mL/p) làm giá trị chuẩn.`);
  }

  const clinicalSummary = `
BÁO CÁO THẬN HỌC & DƯỢC ĐỘNG HỌC LÂM SÀNG (DOCSPACE RENAL PRO):
- eGFR CKD-EPI 2021: ${primaryEgfr} mL/p/1.73m² (Phân độ KDIGO: ${kdigoGStage}-${kdigoAStage}, Nguy cơ: ${kdigoRiskTier.toUpperCase()})
- Cockcroft-Gault CrCl: ${recommendedCrCl} mL/phút (ABW: ${cgAbw}, IBW: ${cgIbw}${cgAdj ? `, AdjBW: ${cgAdj}` : ''})
${kineticGfr !== null ? `- Kinetic GFR (Chen 2013): ${kineticGfr} mL/phút` : ''}
- Tình trạng AKI: ${akiStage} ${akiReasoning.length > 0 ? `(${akiReasoning.join('; ')})` : ''}
${feNa !== null ? `- Phân suất thải Natri FENa: ${feNa}% | FEUrea: ${feUrea ?? 'N/A'}% (${prerenalVsAtnSummary})` : ''}
${vancoPk ? `- Dược động học Vancomycin: AUC24 = ${vancoPk.auc24} mg·h/L (Đích 400-600), Dự kiến Đỉnh ${vancoPk.predictedPeak} / Đáy ${vancoPk.predictedTrough} mcg/mL` : ''}
${mehranScore ? `- Nguy cơ Thuốc cản quang Mehran 2.0: ${mehranScore} điểm (${mehranRiskCategory})` : ''}
- Khuyến cáo: ${recommendations.join(' | ')}
  `.trim();

  return {
    ckdEpi2021Cr: ckdEpiCr,
    ckdEpi2021CysC: ckdEpiCysC,
    ckdEpi2021Combined: ckdEpiCombined,
    cockcroftGaultAbw: cgAbw,
    cockcroftGaultIbw: cgIbw,
    cockcroftGaultAdjBw: cgAdj,
    ibwKg: Math.round(ibwKg),
    isObese,
    recommendedCrCl,
    kineticGfr,
    isAugmentedRenalClearance,
    arcScore,
    arcExplanation,
    kdigoGStage,
    kdigoAStage,
    kdigoRiskTier,
    kdigoStageColor,
    kdigoDescription,
    akiStage,
    akiStageColor,
    akiReasoning,
    feNa,
    feNaInterpretation,
    feUrea,
    feUreaInterpretation,
    bunCrRatio,
    prerenalVsAtnSummary,
    fstInterpretation,
    mehranScore,
    mehranCinRiskPercent,
    mehranDialysisRiskPercent,
    mehranRiskCategory,
    mehranHydrationProtocol,
    vancoPk,
    aminoglycosideRegimen,
    emergencyFlags,
    drugAdjustments,
    clinicalSummary,
    recommendations
  };
}

/**
 * 2. Render KDIGO 2D Heatmap Matrix SVG (G1-G5 x A1-A3)
 */
export function renderKdigoHeatmapSvg(currentG: string, currentA: string): string {
  const gStages = [
    { id: 'G1', label: 'G1 (≥90)', y: 35 },
    { id: 'G2', label: 'G2 (60-89)', y: 70 },
    { id: 'G3a', label: 'G3a (45-59)', y: 105 },
    { id: 'G3b', label: 'G3b (30-44)', y: 140 },
    { id: 'G4', label: 'G4 (15-29)', y: 175 },
    { id: 'G5', label: 'G5 (<15)', y: 210 }
  ];

  const aStages = [
    { id: 'A1', label: 'A1 (<30 mg/g)', x: 110, w: 90 },
    { id: 'A2', label: 'A2 (30-300)', x: 205, w: 90 },
    { id: 'A3', label: 'A3 (>300 mg/g)', x: 300, w: 90 }
  ];

  // Matrix color mapping
  const colorMatrix: Record<string, Record<string, string>> = {
    G1: { A1: '#10b981', A2: '#f59e0b', A3: '#ea580c' },
    G2: { A1: '#10b981', A2: '#f59e0b', A3: '#ea580c' },
    G3a: { A1: '#f59e0b', A2: '#ea580c', A3: '#dc2626' },
    G3b: { A1: '#ea580c', A2: '#dc2626', A3: '#b91c1c' },
    G4: { A1: '#dc2626', A2: '#b91c1c', A3: '#7f1d1d' },
    G5: { A1: '#b91c1c', A2: '#7f1d1d', A3: '#450a0a' }
  };

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 410 260" width="100%" height="240" style="background:var(--color-surface); border-radius:8px;">
      <defs>
        <filter id="patientGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Title / Header Labels -->
      <text x="50" y="20" fill="var(--color-text-muted)" font-size="10" font-weight="800">GFR / ALBUMINURIA</text>
      ${aStages.map(a => `<text x="${a.x + a.w / 2}" y="20" fill="var(--color-text)" font-size="10" font-weight="800" text-anchor="middle">${a.label}</text>`).join('')}

      <!-- Grid Cells -->
      ${gStages.map(g => `
        <text x="100" y="${g.y + 20}" fill="var(--color-text)" font-size="10" font-weight="800" text-anchor="end">${g.label}</text>
        ${aStages.map(a => {
          const isSelected = g.id === currentG && a.id === currentA;
          const bg = colorMatrix[g.id][a.id];
          return `
            <g>
              <rect x="${a.x}" y="${g.y}" width="${a.w}" height="30" rx="4" fill="${bg}" opacity="${isSelected ? '1.0' : '0.45'}" stroke="${isSelected ? '#ffffff' : 'none'}" stroke-width="${isSelected ? '2.5' : '0'}" />
              ${isSelected ? `
                <circle cx="${a.x + a.w / 2}" cy="${g.y + 15}" r="8" fill="#ffffff" filter="url(#patientGlow)" />
                <circle cx="${a.x + a.w / 2}" cy="${g.y + 15}" r="4" fill="${bg}" />
              ` : ''}
            </g>
          `;
        }).join('')}
      `).join('')}

      <!-- Legend Footer -->
      <g transform="translate(10, 245)">
        <rect x="0" y="0" width="10" height="10" fill="#10b981" rx="2" />
        <text x="14" y="9" fill="var(--color-text-muted)" font-size="9.5">Thấp</text>
        
        <rect x="65" y="0" width="10" height="10" fill="#f59e0b" rx="2" />
        <text x="79" y="9" fill="var(--color-text-muted)" font-size="9.5">TB</text>

        <rect x="120" y="0" width="10" height="10" fill="#ea580c" rx="2" />
        <text x="134" y="9" fill="var(--color-text-muted)" font-size="9.5">Cao</text>

        <rect x="180" y="0" width="10" height="10" fill="#dc2626" rx="2" />
        <text x="194" y="9" fill="var(--color-text-muted)" font-size="9.5">Rất Cao</text>
      </g>
    </svg>
  `;
}

/**
 * 3. Render Half-Circle KDIGO & ARC Gauge SVG
 */
export function renderKdigoGaugeSvg(egfr: number): string {
  const w = 360;
  const h = 200;
  const cx = w / 2;
  const cy = 160;
  const r = 120;

  // Clamp 0 to 180 (allowing ARC visualization up to 180)
  const clampedEgfr = Math.max(0, Math.min(180, egfr));
  const angleDeg = 180 - (clampedEgfr / 180) * 180;
  const rad = (angleDeg * Math.PI) / 180;

  const needleX = cx + (r - 20) * Math.cos(rad);
  const needleY = cy - (r - 20) * Math.sin(rad);

  const getPt = (val: number, radius: number) => {
    const a = (180 - (Math.max(0, Math.min(180, val)) / 180) * 180) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(a), y: cy - radius * Math.sin(a) };
  };

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}">
      <defs>
        <radialGradient id="kdigoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- KDIGO Arcs -->
      <!-- G5 (0-15) Red -->
      <path d="M ${getPt(0, r).x} ${getPt(0, r).y} A ${r} ${r} 0 0 1 ${getPt(15, r).x} ${getPt(15, r).y} L ${getPt(15, r - 22).x} ${getPt(15, r - 22).y} A ${r - 22} ${r - 22} 0 0 0 ${getPt(0, r - 22).x} ${getPt(0, r - 22).y} Z" fill="#dc2626" opacity="0.9" />
      
      <!-- G4 (15-30) Orange-Red -->
      <path d="M ${getPt(15, r).x} ${getPt(15, r).y} A ${r} ${r} 0 0 1 ${getPt(30, r).x} ${getPt(30, r).y} L ${getPt(30, r - 22).x} ${getPt(30, r - 22).y} A ${r - 22} ${r - 22} 0 0 0 ${getPt(15, r - 22).x} ${getPt(15, r - 22).y} Z" fill="#ef4444" opacity="0.9" />

      <!-- G3b/G3a (30-60) Yellow -->
      <path d="M ${getPt(30, r).x} ${getPt(30, r).y} A ${r} ${r} 0 0 1 ${getPt(60, r).x} ${getPt(60, r).y} L ${getPt(60, r - 22).x} ${getPt(60, r - 22).y} A ${r - 22} ${r - 22} 0 0 0 ${getPt(30, r - 22).x} ${getPt(30, r - 22).y} Z" fill="#f59e0b" opacity="0.9" />

      <!-- G2/G1 (60-130) Green -->
      <path d="M ${getPt(60, r).x} ${getPt(60, r).y} A ${r} ${r} 0 0 1 ${getPt(130, r).x} ${getPt(130, r).y} L ${getPt(130, r - 22).x} ${getPt(130, r - 22).y} A ${r - 22} ${r - 22} 0 0 0 ${getPt(60, r - 22).x} ${getPt(60, r - 22).y} Z" fill="#10b981" opacity="0.9" />

      <!-- ARC (>130) Purple -->
      <path d="M ${getPt(130, r).x} ${getPt(130, r).y} A ${r} ${r} 0 0 1 ${getPt(180, r).x} ${getPt(180, r).y} L ${getPt(180, r - 22).x} ${getPt(180, r - 22).y} A ${r - 22} ${r - 22} 0 0 0 ${getPt(130, r - 22).x} ${getPt(130, r - 22).y} Z" fill="#7c3aed" opacity="0.95" />

      <!-- Stage Labels -->
      <text x="${getPt(7.5, r - 32).x}" y="${getPt(7.5, r - 32).y}" fill="#dc2626" font-size="8" font-weight="800" text-anchor="middle">G5</text>
      <text x="${getPt(22.5, r - 32).x}" y="${getPt(22.5, r - 32).y}" fill="#ef4444" font-size="8" font-weight="800" text-anchor="middle">G4</text>
      <text x="${getPt(45, r - 32).x}" y="${getPt(45, r - 32).y}" fill="#f59e0b" font-size="8" font-weight="800" text-anchor="middle">G3</text>
      <text x="${getPt(95, r - 32).x}" y="${getPt(95, r - 32).y}" fill="#10b981" font-size="8" font-weight="800" text-anchor="middle">G1-G2</text>
      <text x="${getPt(155, r - 32).x}" y="${getPt(155, r - 32).y}" fill="#7c3aed" font-size="8" font-weight="900" text-anchor="middle">ARC⚡</text>

      <!-- Gauge Needle -->
      <line x1="${cx}" y1="${cy}" x2="${needleX}" y2="${needleY}" stroke="var(--color-text)" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="${cx}" cy="${cy}" r="12" fill="url(#kdigoGlow)" />
      <circle cx="${cx}" cy="${cy}" r="6" fill="var(--color-primary)" stroke="#ffffff" stroke-width="2" />

      <!-- Display Value in Center -->
      <text x="${cx}" y="${cy + 25}" fill="var(--color-text)" font-size="14" font-weight="900" text-anchor="middle">${egfr} <tspan font-size="9" fill="var(--color-text-muted)">mL/p/1.73m²</tspan></text>
    </svg>
  `;
}

/**
 * 4. Render Vancomycin 24h PK/PD Concentration-Time Profile SVG
 */
export function renderVancoAucSvg(auc24: number, peak: number, trough: number, interval: number): string {
  const w = 380;
  const h = 180;
  const padL = 45;
  const padR = 20;
  const padT = 25;
  const padB = 30;

  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  // Scale: Max C = 60 mcg/mL, Max Time = interval (12 or 24h)
  const maxC = 50;
  const maxT = interval || 12;

  const getX = (t: number) => padL + (t / maxT) * chartW;
  const getY = (c: number) => padT + chartH - (Math.min(maxC, c) / maxC) * chartH;

  // Curve points: 0 -> peak (infusion 1.5h) -> trough (at interval)
  const p0 = { x: getX(0), y: getY(trough * 0.9) };
  const pPeak = { x: getX(1.5), y: getY(peak) };
  const pMid = { x: getX(maxT * 0.5), y: getY(trough + (peak - trough) * 0.35) };
  const pEnd = { x: getX(maxT), y: getY(trough) };

  const curveD = `M ${p0.x} ${p0.y} L ${pPeak.x} ${pPeak.y} Q ${pMid.x} ${pMid.y} ${pEnd.x} ${pEnd.y}`;
  const fillD = `${curveD} L ${pEnd.x} ${getY(0)} L ${p0.x} ${getY(0)} Z`;

  const isOptimal = auc24 >= 400 && auc24 <= 600;
  const color = isOptimal ? '#10b981' : (auc24 > 600 ? '#dc2626' : '#f59e0b');

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-surface); border-radius:8px;">
      <!-- Title -->
      <text x="${padL}" y="16" fill="var(--color-text)" font-size="11" font-weight="800">
        Mô Phỏng Dược Động Học Vancomycin 24h (AUC24 = ${auc24} mg·h/L)
      </text>

      <!-- Target Trough Zone (15 - 20 mcg/mL) -->
      <rect x="${padL}" y="${getY(20)}" width="${chartW}" height="${getY(15) - getY(20)}" fill="#10b981" opacity="0.12" />
      <text x="${w - padR}" y="${getY(17.5)}" fill="#10b981" font-size="8.5" font-weight="700" text-anchor="end">Đích Trough 15-20</text>

      <!-- Axes -->
      <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="var(--color-border)" stroke-width="1.5" />
      <line x1="${padL}" y1="${padT + chartH}" x2="${padL + chartW}" y2="${padT + chartH}" stroke="var(--color-border)" stroke-width="1.5" />

      <!-- Y Ticks -->
      <text x="${padL - 6}" y="${getY(40)}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">40</text>
      <text x="${padL - 6}" y="${getY(20)}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">20</text>
      <text x="${padL - 6}" y="${getY(0)}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">0</text>

      <!-- X Ticks -->
      <text x="${getX(0)}" y="${h - 10}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">0h</text>
      <text x="${getX(1.5)}" y="${h - 10}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">1.5h</text>
      <text x="${getX(maxT)}" y="${h - 10}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">${maxT}h</text>

      <!-- AUC Area Fill & Line -->
      <path d="${fillD}" fill="${color}" opacity="0.2" />
      <path d="${curveD}" fill="none" stroke="${color}" stroke-width="2.5" />

      <!-- Peak Point -->
      <circle cx="${pPeak.x}" cy="${pPeak.y}" r="4" fill="${color}" stroke="#ffffff" stroke-width="1.5" />
      <text x="${pPeak.x + 6}" y="${pPeak.y - 4}" fill="${color}" font-size="9" font-weight="800">Peak ${peak}</text>

      <!-- Trough Point -->
      <circle cx="${pEnd.x}" cy="${pEnd.y}" r="4" fill="${color}" stroke="#ffffff" stroke-width="1.5" />
      <text x="${pEnd.x - 6}" y="${pEnd.y - 6}" fill="${color}" font-size="9" font-weight="800" text-anchor="end">Trough ${trough}</text>
    </svg>
  `;
}
