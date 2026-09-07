/**
 * DocSpace — ABG & Acid-Base Research Studio Pro ($10,000 Level Clinical Lab Suite)
 * 8-Step Systematic Boston Approach + Stewart Physicochemical Method (SID, SIG),
 * Davenport 6-Zone SVG Nomogram, Siggaard-Andersen Alignment Nomogram,
 * Osmolal Gap (Toxic Alcohols), Urinary Anion Gap (RTA vs GI),
 * Pulmonary Gas Exchange Lab (A-a Gradient, Horovitz P/F, Berlin ARDS, Shunt Qs/Qt),
 * Interactive Mechanical Ventilator Simulator (Vt, RR -> Predicted PaCO2 & pH)
 * & 20+ Master Clinical Research Presets.
 * 100% Pure TypeScript & Pure SVG — Zero External Dependencies.
 */

export interface AbgPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  category: 'metabolic_acidosis' | 'metabolic_alkalosis' | 'respiratory' | 'mixed_triple' | 'toxic_osmolal' | 'oxygenation_ards';
  description: string;
  values: AbgInputs;
}

export interface AbgInputs {
  // Bộ 3 cơ bản
  ph: number;
  paco2: number; // mmHg
  hco3: number;  // mmol/L
  
  // Oxy hóa & Thông khí
  pao2?: number; // mmHg
  fio2?: number; // % (21 - 100)
  patm?: number; // mmHg (mặc định 760)
  patientAge?: number; // Tuổi (để tính A-a gradient kỳ vọng)
  peep?: number; // cmH2O
  meanAirwayPressure?: number; // cmH2O (cho Oxygenation Index)
  
  // Điện giải đồ & Hóa sinh (Anion Gap)
  na?: number;       // mmol/L
  k?: number;        // mmol/L
  cl?: number;       // mmol/L
  albumin?: number;  // g/dL (chuẩn 4.0)
  phosphate?: number;// mg/dL (chuẩn 3.5)
  lactate?: number;  // mmol/L
  
  // Thẩm thấu máu & Độc chất (Osmolal Gap)
  measuredOsmolality?: number; // mOsm/kg
  glucose?: number;            // mmol/L hoặc mg/dL
  bun?: number;                // mg/dL hoặc mmol/L
  ethanolMgDl?: number;        // mg/dL
  isGlucoseMmol?: boolean;     // true nếu đơn vị glucose là mmol/L
  
  // Nước tiểu (Urinary Anion Gap - UAG cho toan chuyển hóa tăng Clo)
  urineNa?: number; // mmol/L
  urineK?: number;  // mmol/L
  urineCl?: number; // mmol/L
  urinePh?: number;
  
  // Độc chất huyết sắc tố
  cohbPercent?: number; // % Carboxyhemoglobin
  methbPercent?: number;// % Methemoglobin
  
  // Bệnh nhân & Cân nặng (Bù Bicarbonate & ARDSNet)
  patientWeightKg?: number; // kg
  patientGender?: 'male' | 'female';
  patientHeightCm?: number;
  
  // Thông số máy thở can thiệp (Ventilator Simulator)
  ventCurrentVt?: number; // mL
  ventCurrentRr?: number; // lần/phút
  ventTargetVt?: number;  // mL
  ventTargetRr?: number;  // lần/phút
}

export interface AbgAnalysisResult {
  // Tính nhất quán nội tại
  isConsistent: boolean;
  calculatedHPlus: number;
  expectedPhFromHPlus: number;
  consistencyWarning: string | null;
  
  // Rối loạn nguyên phát & Bù trừ
  primaryDisorder: string;
  compensationStatus: string;
  expectedCompValue: string;
  isTripleDisorder: boolean;
  
  // Anion Gap & Delta Ratios
  anionGap: number | null;
  anionGapCorrected: number | null;
  deltaAg: number | null;
  deltaHco3: number | null;
  deltaRatio: number | null;
  deltaRatioInterpretation: string | null;
  
  // Osmolal Gap (Chất độc)
  calculatedOsmolality: number | null;
  osmolalGap: number | null;
  osmolalGapInterpretation: string | null;
  
  // Khoảng trống Anion Niệu (UAG & RTA)
  urinaryAnionGap: number | null;
  uagInterpretation: string | null;
  
  // Phương pháp Stewart
  stewartSidApparent: number | null; // SIDa = Na + K - Cl
  stewartSigEstimate: number | null; // Strong Ion Gap estimate
  stewartInterpretation: string | null;
  
  // Trao đổi khí & Oxy hóa màng phế nang
  paO2Alveolar: number | null;
  aaGradient: number | null;
  aaGradientExpectedForAge: number | null;
  isAaGradientElevated: boolean;
  pfRatio: number | null;
  oxygenationIndex: number | null;
  shuntFractionEstimate: number | null;
  berlinArdsCategory: string | null;
  toxicHbWarnings: string[];
  
  // Mô phỏng máy thở
  predictedPaco2WithTargetVent: number | null;
  predictedPhWithTargetVent: number | null;
  
  // Bù Bicarbonate & Cấp cứu
  bicarbDeficitMeq: number | null;
  bicarbIndicationStatus: string;
  emergencyFlags: string[];
  clinicalSummary: string;
  recommendations: string[];
  davenportCoords: { x: number; y: number };
}

export const ABG_PRESETS: AbgPreset[] = [
  {
    id: 'dka_severe',
    name: '1. Toan Ceton ĐTĐ Nặng (DKA: pH 7.08, AG 32)',
    badge: '🚨 Toan Chuyển Hóa Tăng AG Nặng',
    badgeColor: '#dc2626',
    category: 'metabolic_acidosis',
    description: 'ĐTĐ type 1 ngưng Insulin, thở sâu Kussmaul, hơi thở táo chín. Tăng beta-hydroxybutyrate, mất dịch nặng.',
    values: {
      ph: 7.08, paco2: 18, hco3: 5.5, pao2: 98, fio2: 21,
      na: 132, k: 5.8, cl: 94, albumin: 3.8, phosphate: 2.8, lactate: 2.2,
      measuredOsmolality: 325, glucose: 38.5, isGlucoseMmol: true, bun: 28,
      patientWeightKg: 60, patientAge: 24, patientGender: 'female'
    }
  },
  {
    id: 'copd_acute_on_chronic',
    name: '2. Đợt Cấp COPD (Toan Hô Hấp Cấp Trên Mạn)',
    badge: '⚠️ Ứ CO2 Máu Nặng (PaCO2 78)',
    badgeColor: '#ea580c',
    category: 'respiratory',
    description: 'COPD Gold 4 sốt đờm đục, ngủ gà, pH 7.22, PaCO2 78 mmHg, HCO3 31 mmol/L. Nguy cơ đặt nội khí quản.',
    values: {
      ph: 7.22, paco2: 78, hco3: 31.5, pao2: 48, fio2: 28,
      na: 138, k: 4.2, cl: 96, albumin: 3.6, lactate: 1.8,
      patientWeightKg: 55, patientAge: 68, patientGender: 'male',
      ventCurrentVt: 380, ventCurrentRr: 14, ventTargetVt: 440, ventTargetRr: 20
    }
  },
  {
    id: 'salicylate_aspirin_poisoning',
    name: '3. Ngộ Độc Aspirin (Salicylate: HAGMA + Kiềm Hô Hấp)',
    badge: '⚡ Toan AG Tăng + Kiềm Hô Hấp',
    badgeColor: '#8b5cf6',
    category: 'mixed_triple',
    description: 'Uống 30 viên Aspirin. Salicylate kích thích trung tâm hô hấp gây thở nhanh (Kiềm HH) kèm toan chuyển hóa do acid hữu cơ.',
    values: {
      ph: 7.46, paco2: 18, hco3: 12.5, pao2: 102, fio2: 21,
      na: 142, k: 3.8, cl: 101, albumin: 4.0, lactate: 3.2,
      measuredOsmolality: 305, glucose: 6.2, isGlucoseMmol: true, bun: 16,
      patientWeightKg: 50, patientAge: 28, patientGender: 'female'
    }
  },
  {
    id: 'triple_disorder_dka_vomit_copd',
    name: '4. Toan Kiềm Hỗn Hợp 3 Tầng (Triple Mixed Disorder)',
    badge: '🚨 Rối Loạn 3 Tầng Phức Tạp',
    badgeColor: '#991b1b',
    category: 'mixed_triple',
    description: 'DKA (Toan AG tăng) + Nôn mửa liên tục (Kiềm chuyển hóa mất Cl-) + Ứ khí COPD (Toan hô hấp). pH có vẻ bình thường (7.38)!',
    values: {
      ph: 7.38, paco2: 52, hco3: 30.5, pao2: 65, fio2: 24,
      na: 140, k: 3.2, cl: 86, albumin: 3.5, lactate: 2.1,
      measuredOsmolality: 318, glucose: 24.0, isGlucoseMmol: true, bun: 22,
      patientWeightKg: 65, patientAge: 62, patientGender: 'male'
    }
  },
  {
    id: 'toxic_methanol_poisoning',
    name: '5. Ngộ Độc Rượu Cồn Công Nghiệp Methanol',
    badge: '🚨 Khoảng Trống Osmolal = 48 mOsm/kg',
    badgeColor: '#b91c1c',
    category: 'toxic_osmolal',
    description: 'Uống rượu giả chứa cồn công nghiệp. Nhìn mờ như bão tuyết, toan chuyển hóa tăng AG nặng do Acid Formic, Osmolal Gap tăng vọt.',
    values: {
      ph: 7.05, paco2: 16, hco3: 4.5, pao2: 95, fio2: 21,
      na: 136, k: 5.1, cl: 98, albumin: 4.0, lactate: 2.0,
      measuredOsmolality: 350, glucose: 5.8, isGlucoseMmol: true, bun: 14,
      patientWeightKg: 62, patientAge: 45, patientGender: 'male'
    }
  },
  {
    id: 'septic_shock_lactic_acidosis',
    name: '6. Sốc Nhiễm Khuẩn / Toan Lactic Type A (Lactate 9.5)',
    badge: '🚨 Thiếu Máu Mô / Giảm Tưới Máu Nặng',
    badgeColor: '#dc2626',
    category: 'metabolic_acidosis',
    description: 'Viêm phúc mạc hoại tử, tụt huyết áp 70/40, toan chuyển hóa tăng Anion Gap do Lactate máu tăng vọt 9.5 mmol/L.',
    values: {
      ph: 7.18, paco2: 24, hco3: 9.0, pao2: 72, fio2: 40,
      na: 135, k: 4.8, cl: 100, albumin: 2.4, phosphate: 4.2, lactate: 9.5,
      measuredOsmolality: 300, glucose: 8.5, isGlucoseMmol: true, bun: 32,
      patientWeightKg: 68, patientAge: 58, patientGender: 'male'
    }
  },
  {
    id: 'distal_rta_type1',
    name: '7. Toan Hóa Ống Thận Xa Type 1 (Distal RTA: UAG > 0)',
    badge: '⚠️ Toan Tăng Clo Máu + UAG Dương',
    badgeColor: '#ca8a04',
    category: 'metabolic_acidosis',
    description: 'Toan chuyển hóa Anion Gap bình thường (Tăng Clo), hạ Kali máu (K+ 2.3), sỏi thận tái phát, pH nước tiểu kẹt ở 6.8 (UAG = +28).',
    values: {
      ph: 7.26, paco2: 26, hco3: 11.5, pao2: 98, fio2: 21,
      na: 140, k: 2.3, cl: 118, albumin: 4.2, lactate: 1.1,
      urineNa: 45, urineK: 25, urineCl: 42, urinePh: 6.8,
      patientWeightKg: 52, patientAge: 34, patientGender: 'female'
    }
  },
  {
    id: 'severe_diarrhea_hyperchloremic',
    name: '8. Tiêu Chảy Mất Nước Nặng (Toan Mất Qua Phân: UAG < 0)',
    badge: '💧 Toan Chuyển Hóa Tăng Clo (UAG Âm)',
    badgeColor: '#0284c7',
    category: 'metabolic_acidosis',
    description: 'Tiêu chảy xối xả do Tả (Cholera). Mất Bicarbonate qua đường tiêu hóa, thận tăng bài tiết NH4Cl bù trừ làm UAG âm sâu (-25).',
    values: {
      ph: 7.24, paco2: 25, hco3: 10.5, pao2: 95, fio2: 21,
      na: 138, k: 2.8, cl: 116, albumin: 4.5, lactate: 1.6,
      urineNa: 20, urineK: 15, urineCl: 60, urinePh: 5.2,
      patientWeightKg: 58, patientAge: 40, patientGender: 'male'
    }
  },
  {
    id: 'severe_vomiting_pyloric_stenosis',
    name: '9. Hẹp Môn Vị / Nôn Ói Mất HCl (Kiềm Chuyển Hóa)',
    badge: '🧪 Kiềm Chuyển Hóa Giảm Clo, Giảm K+',
    badgeColor: '#0ea5e9',
    category: 'metabolic_alkalosis',
    description: 'Nôn ói dịch dạ dày liên tục 5 ngày. Mất H+ và Cl-, pH 7.58, HCO3- 44 mmol/L, PaCO2 bù trừ tăng lên 52 mmHg.',
    values: {
      ph: 7.58, paco2: 52, hco3: 44.0, pao2: 82, fio2: 21,
      na: 137, k: 2.4, cl: 78, albumin: 4.2, lactate: 1.2,
      urineNa: 15, urineK: 30, urineCl: 8, urinePh: 7.5,
      patientWeightKg: 60, patientAge: 52, patientGender: 'male'
    }
  },
  {
    id: 'ards_severe_berlin',
    name: '10. ARDS Nặng Do Viêm Phổi Hoại Tử (P/F = 65 mmHg)',
    badge: '🫁 Suy Hô Hấp Cấp Nguy Kịch / ARDS Nặng',
    badgeColor: '#7f1d1d',
    category: 'oxygenation_ards',
    description: 'Tổn thương phế nang lan tỏa 2 phổi, PaO2 65 mmHg với FiO2 100% (P/F = 65 < 100). Shunt phổi ước tính > 35%.',
    values: {
      ph: 7.27, paco2: 50, hco3: 22.5, pao2: 65, fio2: 100, peep: 14, meanAirwayPressure: 22,
      na: 138, k: 4.3, cl: 102, albumin: 2.6, lactate: 3.4,
      patientWeightKg: 70, patientAge: 55, patientGender: 'male',
      ventCurrentVt: 420, ventCurrentRr: 24, ventTargetVt: 360, ventTargetRr: 28
    }
  },
  {
    id: 'carbon_monoxide_co_poisoning',
    name: '11. Ngộ Độc Khí Than CO (Carboxyhemoglobin 38%)',
    badge: '🚨 Ngạt Khí Kín / COHb = 38%',
    badgeColor: '#b91c1c',
    category: 'toxic_osmolal',
    description: 'Đốt than sưởi ấm trong phòng kín. PaO2 đo được có vẻ bình thường (98 mmHg) nhưng SpO2 giả và oxy mô bị phong bế do COHb = 38%.',
    values: {
      ph: 7.32, paco2: 32, hco3: 16.5, pao2: 98, fio2: 21, cohbPercent: 38,
      na: 140, k: 4.1, cl: 104, albumin: 4.0, lactate: 4.8,
      patientWeightKg: 65, patientAge: 32, patientGender: 'male'
    }
  },
  {
    id: 'methemoglobinemia_toxic',
    name: '12. Methemoglobinemia Do Dapsone / Nitrit (MetHb 30%)',
    badge: '🩸 Da Xanh Tím Sô-Cô-La / MetHb 30%',
    badgeColor: '#6d28d9',
    category: 'toxic_osmolal',
    description: 'Máu có màu nâu sô-cô-la, SpO2 kẹt ở 85% không tăng khi thở oxy 100%. MetHb = 30%. Chỉ định Xanh Methylen 1-2 mg/kg.',
    values: {
      ph: 7.36, paco2: 35, hco3: 19.5, pao2: 140, fio2: 100, methbPercent: 30,
      na: 139, k: 4.0, cl: 105, albumin: 4.1, lactate: 2.6,
      patientWeightKg: 58, patientAge: 29, patientGender: 'female'
    }
  },
  {
    id: 'hyperventilation_panic_attack',
    name: '13. Cơn Hoảng Sợ Tăng Thông Khí (Kiềm Hô Hấp Cấp)',
    badge: '⚡ Thở Nhanh Do Lo Âu (PaCO2 18)',
    badgeColor: '#8b5cf6',
    category: 'respiratory',
    description: 'Sinh viên thi cử lo âu thở nhanh 35 l/p, tê bì quanh miệng, co rút bàn tay (dấu hiệu Trousseau do hạ Canxi ion hóa máu).',
    values: {
      ph: 7.62, paco2: 18, hco3: 18.0, pao2: 110, fio2: 21,
      na: 140, k: 3.5, cl: 104, albumin: 4.0, lactate: 1.5,
      patientWeightKg: 48, patientAge: 20, patientGender: 'female'
    }
  },
  {
    id: 'opiate_overdose_hypoventilation',
    name: '14. Quá Liều Opiate Ngừng Thở (Toan Hô Hấp Tối Khẩn)',
    badge: '🚨 Ứ CO2 Cấp Tối Khẩn (PaCO2 92)',
    badgeColor: '#dc2626',
    category: 'respiratory',
    description: 'Dùng quá liều Morphin, đồng tử co nhỏ như đầu đinh ghim, thở chậm 4 l/p, hôn mê. PaCO2 tăng vọt 92 mmHg gây toan máu nặng.',
    values: {
      ph: 7.06, paco2: 92, hco3: 25.5, pao2: 38, fio2: 21,
      na: 138, k: 4.5, cl: 98, albumin: 4.0, lactate: 2.1,
      patientWeightKg: 72, patientAge: 35, patientGender: 'male'
    }
  },
  {
    id: 'renal_failure_uremic_acidosis',
    name: '15. Suy Thận Cấp Toan Hóa Máu (Uremic HAGMA)',
    badge: '🫘 Toan Máu Tăng Sulfat & Phosphat',
    badgeColor: '#7c3aed',
    category: 'metabolic_acidosis',
    description: 'Viêm cầu thận tiến triển nhanh, vô niệu, BUN 45 mmol/L, Creatinine 650 umol/L, ứ đọng các anion vô cơ gây toan chuyển hóa tăng AG.',
    values: {
      ph: 7.16, paco2: 22, hco3: 7.8, pao2: 90, fio2: 21,
      na: 134, k: 6.2, cl: 96, albumin: 3.2, phosphate: 6.8, lactate: 1.4,
      measuredOsmolality: 320, glucose: 5.5, isGlucoseMmol: true, bun: 45,
      patientWeightKg: 62, patientAge: 56, patientGender: 'female'
    }
  },
  {
    id: 'metformin_lactic_acidosis_mala',
    name: '16. Toan Lactic Do Metformin (MALA: Lactate 14.5)',
    badge: '🚨 Ngộ Độc Thuốc / Toan Lactic Type B',
    badgeColor: '#991b1b',
    category: 'metabolic_acidosis',
    description: 'Bệnh nhân đái tháo đường uống Metformin bị mất nước suy thận cấp, tích lũy Metformin ức chế chuỗi hô hấp tế bào gây toan lactic cực nặng.',
    values: {
      ph: 6.95, paco2: 15, hco3: 3.2, pao2: 98, fio2: 21,
      na: 137, k: 6.4, cl: 95, albumin: 3.0, lactate: 14.5,
      patientWeightKg: 65, patientAge: 69, patientGender: 'female'
    }
  },
  {
    id: 'diuretic_contraction_alkalosis',
    name: '17. Kiềm Chuyển Hóa Do Lợi Tiểu Quai (Contraction Alkalosis)',
    badge: '💊 Quá Liều Furosemide Mất Clo',
    badgeColor: '#0284c7',
    category: 'metabolic_alkalosis',
    description: 'Suy tim dùng Furosemide liều cao gây mất dịch chứa Clo và Kali, tái hấp thu Bicarbonate tại ống thận làm pH tăng lên 7.54.',
    values: {
      ph: 7.54, paco2: 48, hco3: 41.0, pao2: 78, fio2: 21,
      na: 135, k: 2.9, cl: 82, albumin: 4.0, lactate: 1.0,
      patientWeightKg: 64, patientAge: 72, patientGender: 'male'
    }
  },
  {
    id: 'normal_saline_hyperchloremic',
    name: '18. Toan Sau Truyền NaCl 0.9% Lượng Lớn (NAGMA Dilutional)',
    badge: '💧 Toan Chuyển Hóa Tăng Clo Do Dịch Truyền',
    badgeColor: '#0ea5e9',
    category: 'metabolic_acidosis',
    description: 'Truyền 5 lít Natri Clorid 0.9% (Clo 154 mEq/L) trong hồi sức chấn thương, làm giảm SID và tăng Clo máu gây toan chuyển hóa.',
    values: {
      ph: 7.28, paco2: 32, hco3: 15.0, pao2: 95, fio2: 21,
      na: 142, k: 4.1, cl: 118, albumin: 2.8, lactate: 1.3,
      patientWeightKg: 75, patientAge: 30, patientGender: 'male'
    }
  },
  {
    id: 'post_cardiac_arrest_mixed_shock',
    name: '19. Sốc Toan Hỗn Hợp Sau Ngưng Tuần Hoàn (pH 6.88)',
    badge: '🚨 Toan Hỗn Hợp Cực Nặng Sau CPR',
    badgeColor: '#450a0a',
    category: 'mixed_triple',
    description: 'Hồi sức tim phổi sau 15 phút ngưng tuần hoàn. Vừa ứ trệ CO2 (Toan hô hấp) vừa toan Lactic máu nặng (Toan chuyển hóa).',
    values: {
      ph: 6.88, paco2: 68, hco3: 12.5, pao2: 55, fio2: 100,
      na: 134, k: 6.5, cl: 98, albumin: 3.2, lactate: 11.0,
      patientWeightKg: 70, patientAge: 60, patientGender: 'male'
    }
  },
  {
    id: 'severe_altitude_hypoxemia',
    name: '20. Kiềm Hô Hấp Do Lên Núi Cao (Hypobaric Hypoxia)',
    badge: '🏔️ Áp Suất Khí Quyển Thấp (Patm = 500)',
    badgeColor: '#0284c7',
    category: 'respiratory',
    description: 'Leo núi ở độ cao 3500m (Patm 500 mmHg). Thiếu oxy kích thích tăng thông khí gây kiềm hô hấp cấp bù trừ một phần qua thận.',
    values: {
      ph: 7.48, paco2: 24, hco3: 17.5, pao2: 45, fio2: 21, patm: 500,
      na: 140, k: 3.9, cl: 108, albumin: 4.2, lactate: 1.8,
      patientWeightKg: 65, patientAge: 26, patientGender: 'male'
    }
  }
];

/**
 * Thuật toán Phân Tích Khí Máu Động Mạch 8 Bước & Hóa Lý Stewart Toàn Năng
 */
export function analyzeAbg(inputs: AbgInputs): AbgAnalysisResult {
  const {
    ph,
    paco2,
    hco3,
    pao2,
    fio2 = 21,
    patm = 760,
    patientAge = 40,
    peep = 5,
    meanAirwayPressure,
    na,
    k = 4.0,
    cl,
    albumin = 4.0,
    phosphate = 3.5,
    lactate,
    measuredOsmolality,
    glucose,
    bun,
    isGlucoseMmol = true,
    urineNa,
    urineK,
    urineCl,
    cohbPercent = 0,
    methbPercent = 0,
    patientWeightKg = 60,
    ventCurrentVt = 400,
    ventCurrentRr = 14,
    ventTargetVt = 400,
    ventTargetRr = 14,
  } = inputs;

  const recommendations: string[] = [];
  const emergencyFlags: string[] = [];
  const toxicHbWarnings: string[] = [];

  // 1. KIỂM TRA TÍNH NHẤT QUÁN NỘI TẠI (Henderson-Hasselbalch Equation)
  // [H+] = 24 * (PaCO2 / [HCO3-])
  // pH ước tính = -log10([H+] * 10^-9)
  const calcHPlus = Math.round(24 * (paco2 / Math.max(1, hco3)));
  const expectedPhFromH = parseFloat((9 - Math.log10(calcHPlus)).toFixed(2));
  const phDiff = Math.abs(ph - expectedPhFromH);
  const isConsistent = phDiff <= 0.04;
  let consistencyWarning: string | null = null;
  if (!isConsistent) {
    consistencyWarning = `⚠️ Dữ liệu Khí Máu không hoàn toàn nhất quán nội tại (pH đo = ${ph}, pH tính từ PaCO2/HCO3- = ${expectedPhFromH}, chênh lệch ${phDiff.toFixed(2)} > 0.04). Kiểm tra lại máy đo khí máu hoặc bọt khí mẫu.`;
    recommendations.push('Kiểm tra lại chất lượng mẫu máu (bọt khí, đọng heparin, thời gian vận chuyển đến phòng lab > 15 phút không ướp đá).');
  }

  // 2. RỐI LOẠN NGUYÊN PHÁT & BÙ TRỪ KINH ĐIỂN
  let primaryDisorder = '';
  let compensationStatus = '';
  let expectedCompValue = '';
  let isTripleDisorder = false;

  const isAcidemia = ph < 7.35;
  const isAlkalemia = ph > 7.45;

  if (isAcidemia) {
    if (paco2 > 45 && hco3 < 22) {
      primaryDisorder = 'Toan Hỗn Hợp Nặng (Toan Hô Hấp + Toan Chuyển Hóa)';
      compensationStatus = 'Cả hệ hô hấp và thận đều suy giảm, không có khả năng bù trừ';
      expectedCompValue = 'Cả PaCO2 tăng và HCO3- giảm';
      emergencyFlags.push('🚨 TOAN HỖN HỢP NẶNG: Nguy cơ suy sụp tuần hoàn và ngừng tim. Cần thông khí cơ học và hồi sức chuyển hóa đồng thời.');
    } else if (paco2 > 45) {
      primaryDisorder = 'Toan Hô Hấp (Respiratory Acidosis)';
      const deltaPaco2 = paco2 - 40;
      const expAcuteHco3 = 24 + 0.1 * deltaPaco2;
      const expChronicHco3 = 24 + 0.35 * deltaPaco2;
      expectedCompValue = `HCO3- kỳ vọng: Cấp = ${expAcuteHco3.toFixed(1)} mmol/L | Mạn = ${expChronicHco3.toFixed(1)} mmol/L`;

      if (Math.abs(hco3 - expAcuteHco3) <= 2.0) {
        compensationStatus = `Toan hô hấp CẤP TÍNH (Bù trừ thận chưa kịp đáp ứng)`;
      } else if (Math.abs(hco3 - expChronicHco3) <= 3.0) {
        compensationStatus = `Toan hô hấp MẠN TÍNH (Thận đã bù trừ giữ Bicarbonate đầy đủ)`;
      } else if (hco3 > expChronicHco3 + 3.0) {
        compensationStatus = 'Toan hô hấp kèm KIỀM CHUYỂN HÓA ĐỒNG THỜI';
      } else {
        compensationStatus = 'Toan hô hấp kèm TOAN CHUYỂN HÓA ĐỒNG THỜI (Toan hô hấp cấp trên mạn / toan phối hợp)';
      }
    } else if (hco3 < 22) {
      primaryDisorder = 'Toan Chuyển Hóa (Metabolic Acidosis)';
      // Công thức Winter: PaCO2 = 1.5 * HCO3- + 8 +/- 2
      const expWinterPaco2 = 1.5 * hco3 + 8;
      const paco2Min = expWinterPaco2 - 2;
      const paco2Max = expWinterPaco2 + 2;
      expectedCompValue = `PaCO2 kỳ vọng (Winter): ${expWinterPaco2.toFixed(1)} ± 2 mmHg (${paco2Min.toFixed(1)} - ${paco2Max.toFixed(1)})`;

      if (paco2 >= paco2Min && paco2 <= paco2Max) {
        compensationStatus = `Toan chuyển hóa có BÙ TRỪ HÔ HẤP THÍCH HỢP (Phù hợp công thức Winter)`;
      } else if (paco2 > paco2Max) {
        compensationStatus = `Toan chuyển hóa kèm TOAN HÔ HẤP ĐỒNG THỜI (Ứ CO2, PaCO2 thực tế ${paco2} > kỳ vọng ${expWinterPaco2.toFixed(1)})`;
        emergencyFlags.push('⚠️ Toan chuyển hóa kèm suy hô hấp ứ CO2: Bệnh nhân mệt cơ hô hấp, xem xét hỗ trợ thông khí sớm.');
      } else {
        compensationStatus = `Toan chuyển hóa kèm KIỀM HÔ HẤP ĐỒNG THỜI (Tăng thông khí quá mức, PaCO2 ${paco2} < kỳ vọng ${expWinterPaco2.toFixed(1)})`;
      }
    } else {
      primaryDisorder = 'Toan máu nhẹ chưa rõ căn nguyên';
      compensationStatus = 'Cần theo dõi sát khí máu nối tiếp';
    }
  } else if (isAlkalemia) {
    if (paco2 < 35 && hco3 > 26) {
      primaryDisorder = 'Kiềm Hỗn Hợp (Kiềm Hô Hấp + Kiềm Chuyển Hóa)';
      compensationStatus = 'Cả hai hệ đều kích thích làm tăng vọt pH máu';
      emergencyFlags.push('⚠️ KIỀM MÁU NẶNG: Nguy cơ loạn nhịp thất, co thắt mạch máu não và co rút cơ bắp (Tetany).');
    } else if (paco2 < 35) {
      primaryDisorder = 'Kiềm Hô Hấp (Respiratory Alkalosis)';
      const deltaPaco2 = 40 - paco2;
      const expAcuteHco3 = 24 - 0.2 * deltaPaco2;
      const expChronicHco3 = 24 - 0.5 * deltaPaco2;
      expectedCompValue = `HCO3- kỳ vọng: Cấp = ${expAcuteHco3.toFixed(1)} mmol/L | Mạn = ${expChronicHco3.toFixed(1)} mmol/L`;

      if (Math.abs(hco3 - expAcuteHco3) <= 2.0) {
        compensationStatus = 'Kiềm hô hấp CẤP TÍNH (Tăng thông khí cấp)';
      } else if (Math.abs(hco3 - expChronicHco3) <= 2.5) {
        compensationStatus = 'Kiềm hô hấp MẠN TÍNH (Thận đã thải trừ Bicarbonate)';
      } else {
        compensationStatus = 'Kiềm hô hấp bù trừ không hoàn toàn';
      }
    } else if (hco3 > 26) {
      primaryDisorder = 'Kiềm Chuyển Hóa (Metabolic Alkalosis)';
      // PaCO2 = 40 + 0.7 * (HCO3- - 24) +/- 2.5
      const expPaco2 = 40 + 0.7 * (hco3 - 24);
      expectedCompValue = `PaCO2 kỳ vọng: ${expPaco2.toFixed(1)} ± 2.5 mmHg`;

      if (Math.abs(paco2 - expPaco2) <= 2.5) {
        compensationStatus = 'Kiềm chuyển hóa có bù trừ hô hấp thích hợp';
      } else if (paco2 > expPaco2 + 2.5) {
        compensationStatus = 'Kiềm chuyển hóa kèm TOAN HÔ HẤP ĐỒNG THỜI';
      } else {
        compensationStatus = 'Kiềm chuyển hóa kèm KIỀM HÔ HẤP ĐỒNG THỜI';
      }
    }
  } else {
    // pH 7.35 - 7.45
    if (paco2 !== 40 || hco3 !== 24) {
      primaryDisorder = 'Rối Loạn Toan Kiềm Hỗn Hợp Bù Trừ Hoàn Toàn / Ẩn Giấu';
      compensationStatus = `pH máu bình thường (${ph}) nhưng PaCO2 (${paco2}) và HCO3- (${hco3}) bất thường ➔ Có ít nhất 2 rối loạn toan kiềm đối nghịch cùng tồn tại!`;
      isTripleDisorder = true;
    } else {
      primaryDisorder = 'Khí Máu Động Mạch Bình Thường';
      compensationStatus = 'Thăng bằng toan kiềm sinh lý ổn định';
    }
  }

  // 3. ANION GAP HIỆU CHỈNH & DELTA RATIO
  let anionGap: number | null = null;
  let anionGapCorrected: number | null = null;
  let deltaAg: number | null = null;
  let deltaHco3: number | null = null;
  let deltaRatio: number | null = null;
  let deltaRatioInterpretation: string | null = null;

  if (typeof na === 'number' && typeof cl === 'number') {
    anionGap = na - (cl + hco3);
    // Figge-Jabor-Fencl: AG_corr = AG + 2.5 * (4.0 - Albumin) + 0.5 * (1.5 - Phosphate_mmol)
    let agCorr = anionGap;
    if (albumin) agCorr += 2.5 * (4.0 - albumin);
    anionGapCorrected = parseFloat(agCorr.toFixed(1));

    if (anionGapCorrected > 12) {
      deltaAg = parseFloat((anionGapCorrected - 12).toFixed(1));
      deltaHco3 = parseFloat((24 - hco3).toFixed(1));

      if (deltaHco3 > 0) {
        deltaRatio = parseFloat((deltaAg / deltaHco3).toFixed(2));
        if (deltaRatio < 0.4) {
          deltaRatioInterpretation = 'Toan chuyển hóa Anion Gap bình thường (Tăng Clo máu) chiếm ưu thế (Delta Ratio < 0.4)';
        } else if (deltaRatio < 0.8) {
          deltaRatioInterpretation = 'Toan chuyển hóa HỖN HỢP: Tăng AG + Tăng Clo máu (Delta Ratio 0.4 - 0.8)';
          isTripleDisorder = true;
        } else if (deltaRatio <= 2.0) {
          deltaRatioInterpretation = 'Toan chuyển hóa TĂNG ANION GAP ĐƠN THUẦN Điển Hình (Delta Ratio 0.8 - 2.0: DKA, Lactic, Suy thận)';
        } else {
          deltaRatioInterpretation = 'Toan chuyển hóa Tăng AG kèm KIỀM CHUYỂN HÓA hoặc TOAN HÔ HẤP MẠN trước đó (Delta Ratio > 2.0)';
          isTripleDisorder = true;
        }
      }
    }
  }

  // 4. KHOẢNG TRỐNG ÁP SUẤT THẨM THẤU (OSMOLAL GAP)
  let calculatedOsmolality: number | null = null;
  let osmolalGap: number | null = null;
  let osmolalGapInterpretation: string | null = null;

  if (typeof na === 'number' && typeof glucose === 'number' && typeof bun === 'number') {
    const glucMmol = isGlucoseMmol ? glucose : glucose / 18;
    const bunMmol = bun > 15 ? bun / 2.8 : bun;
    calculatedOsmolality = Math.round(2 * na + glucMmol + bunMmol);

    if (typeof measuredOsmolality === 'number') {
      osmolalGap = Math.round(measuredOsmolality - calculatedOsmolality);
      if (osmolalGap > 10) {
        osmolalGapInterpretation = `🚨 TĂNG KHOẢNG TRỐNG ÁP SUẤT THẨM THẤU (${osmolalGap} mOsm/kg > 10) ➔ Nghi ngờ ngộ độc CỒN ĐỘC CHẤT: Methanol (Rượu cồn công nghiệp), Ethylene Glycol (Nước làm mát xe), Isopropanol, Propylene Glycol!`;
        emergencyFlags.push(`🚨 TĂNG OSMOLAL GAP (${osmolalGap} mOsm/kg): Khẩn cấp xét nghiệm nồng độ cồn độc chất, dùng Fomepizole / Ethanol và chuẩn bị Lọc Máu Cấp Cứu.`);
      } else {
        osmolalGapInterpretation = `Khoảng trống áp suất thẩm thấu bình thường (${osmolalGap} mOsm/kg ≤ 10)`;
      }
    }
  }

  // 5. KHOẢNG TRỐNG ANION NIỆU (URINARY ANION GAP — UAG)
  let urinaryAnionGap: number | null = null;
  let uagInterpretation: string | null = null;

  if (typeof urineNa === 'number' && typeof urineK === 'number' && typeof urineCl === 'number') {
    urinaryAnionGap = urineNa + urineK - urineCl;
    if (urinaryAnionGap > 0) {
      uagInterpretation = `UAG Dương Tính (+${urinaryAnionGap} mEq/L) ➔ Giảm bài tiết NH4+ qua thận: Chẩn đoán TOAN HÓA ỐNG THẬN (RTA Type 1 hoặc Type 4).`;
      recommendations.push('Đo pH nước tiểu: Nếu pH nước tiểu > 5.5 kèm hạ Kali máu ➔ Toan hóa ống thận xa Type 1 (Distal RTA).');
    } else {
      uagInterpretation = `UAG Âm Tính (${urinaryAnionGap} mEq/L) ➔ Thận tăng bài tiết NH4Cl thích hợp: Toan mất Bicarbonate QUA ĐƯỜNG TIÊU HÓA (Tiêu chảy nặng, rò ruột non, dẫn lưu mật tụy).`;
    }
  }

  // 6. PHƯƠNG PHÁP HÓA LÝ STEWART (MODERN STEWART APPROACH)
  let stewartSidApparent: number | null = null;
  let stewartSigEstimate: number | null = null;
  let stewartInterpretation: string | null = null;

  if (typeof na === 'number' && typeof cl === 'number') {
    const kVal = typeof k === 'number' ? k : 4.0;
    stewartSidApparent = parseFloat((na + kVal - cl).toFixed(1)); // SIDa bình thường ~ 40-42 mEq/L
    if (albumin && anionGapCorrected !== null) {
      // Strong Ion Gap SIG ~ AG_corr - Lactate
      const lacVal = typeof lactate === 'number' ? lactate : 1.0;
      stewartSigEstimate = parseFloat((anionGapCorrected - 12 - lacVal).toFixed(1));
      if (stewartSigEstimate > 2.0) {
        stewartInterpretation = `Tăng Strong Ion Gap (SIG = ${stewartSigEstimate} mEq/L) ➔ Hiện diện Anion lạ không định lượng được (Ketoacid, Sulfat, Anion độc chất vô cơ).`;
      } else if (stewartSidApparent < 38) {
        stewartInterpretation = `Giảm SID (${stewartSidApparent} mEq/L < 40) ➔ Toan chuyển hóa do Tăng Clo máu (Hyperchloremic acidosis do NaCl 0.9%).`;
      } else {
        stewartInterpretation = `Các chỉ số hóa lý Stewart trong giới hạn cân bằng (SID = ${stewartSidApparent} mEq/L).`;
      }
    }
  }

  // 7. TRAO ĐỔI KHÍ & OXY HÓA MÀNG PHẾ NANG (A-a GRADIENT & BERLIN ARDS)
  let paO2Alveolar: number | null = null;
  let aaGradient: number | null = null;
  let aaGradientExpectedForAge: number | null = null;
  let isAaGradientElevated = false;
  let pfRatio: number | null = null;
  let oxygenationIndex: number | null = null;
  let shuntFractionEstimate: number | null = null;
  let berlinArdsCategory: string | null = null;

  if (typeof pao2 === 'number') {
    const decFio2 = fio2 > 1 ? fio2 / 100 : fio2;
    pfRatio = Math.round(pao2 / decFio2);

    // PAO2 = (Patm - 47) * FiO2 - PaCO2 / 0.8
    const waterVaporPressure = 47;
    const rQuotient = 0.8;
    paO2Alveolar = Math.round((patm - waterVaporPressure) * decFio2 - paco2 / rQuotient);
    aaGradient = Math.max(0, Math.round(paO2Alveolar - pao2));

    // A-a Gradient kỳ vọng theo tuổi: Age / 4 + 4
    aaGradientExpectedForAge = Math.round(patientAge / 4 + 4);
    isAaGradientElevated = aaGradient > aaGradientExpectedForAge + 5;

    if (isAaGradientElevated) {
      recommendations.push(`A-a Gradient TĂNG CAO (${aaGradient} mmHg > kỳ vọng ${aaGradientExpectedForAge} mmHg) ➔ Bệnh lý tại nhu mô phổi: Bất tương xứng V/Q, Shunt nội phổi (Xẹp phổi, ARDS, Viêm phổi) hoặc Rối loạn khuếch tán.`);
    } else if (pao2 < 80) {
      recommendations.push(`A-a Gradient BÌNH THƯỜNG (${aaGradient} mmHg) nhưng có giảm oxy máu ➔ Giảm oxy do GIẢM THÔNG KHÍ PHẾ NANG ĐƠN THUẦN (Ứ CO2 do quá liều thuốc mê, liệt cơ hô hấp, COPD) hoặc Giảm FiO2 khí thở.`);
    }

    // Phân tầng ARDS theo tiêu chuẩn Berlin
    if (peep >= 5) {
      if (pfRatio < 100) {
        berlinArdsCategory = `ARDS NẶNG (Severe ARDS: P/F = ${pfRatio} mmHg < 100)`;
        emergencyFlags.push('🚨 ARDS NẶNG: Cần thông khí bảo vệ phổi (Vt 6ml/kg PBW, PEEP cao), phong bế thần kinh cơ sớm và cho bệnh nhân nằm sấp (Prone Positioning ≥ 16h/ngày).');
      } else if (pfRatio < 200) {
        berlinArdsCategory = `ARDS TRUNG BÌNH (Moderate ARDS: P/F = ${pfRatio} mmHg)`;
      } else if (pfRatio <= 300) {
        berlinArdsCategory = `ARDS NHẸ (Mild ARDS: P/F = ${pfRatio} mmHg)`;
      } else {
        berlinArdsCategory = 'Oxy hóa màng phế nang bình thường (P/F > 300 mmHg)';
      }
    }

    // Oxygenation Index (OI) = (MAP * FiO2 * 100) / PaO2
    if (meanAirwayPressure && meanAirwayPressure > 0) {
      oxygenationIndex = parseFloat(((meanAirwayPressure * decFio2 * 100) / pao2).toFixed(1));
    }

    // Shunt Fraction Qs/Qt ước tính = (CcO2 - CaO2) / (CcO2 - CvO2) ~ (PAO2 - PaO2)*0.0031 / ((PAO2 - PaO2)*0.0031 + 5)
    const dissolvedDiff = aaGradient * 0.0031;
    shuntFractionEstimate = Math.round((dissolvedDiff / (dissolvedDiff + 5)) * 100);
  }

  // Độc chất Huyết sắc tố (CO & Methemoglobin)
  if (cohbPercent > 5) {
    toxicHbWarnings.push(`🚨 NGỘ ĐỘC KHÍ CO: Carboxyhemoglobin = ${cohbPercent}% (Bình thường < 2% ở người không hút thuốc, < 5% ở người hút thuốc). Thở ngay Oxy 100% qua mặt nạ có túi dự trữ hoặc Oxy Cao Áp (HBO).`);
    emergencyFlags.push(`🚨 NGỘ ĐỘC CO (${cohbPercent}%): Thở Oxy 100% liên tục để giảm thời gian bán thải COHb từ 320 phút xuống 80 phút.`);
  }

  if (methbPercent > 5) {
    toxicHbWarnings.push(`🚨 METHEMOGLOBINEMIA: MetHb = ${methbPercent}% > 5%. Nếu MetHb > 20% hoặc có triệu chứng thiếu oxy mô: Tiêm tĩnh mạch Xanh Methylen (Methylene Blue 1% liều 1-2 mg/kg trong 5 phút).`);
    emergencyFlags.push(`🚨 METHEMOGLOBINEMIA (${methbPercent}%): Chuẩn bị tiêm Xanh Methylen.`);
  }

  // 8. MÔ PHỎNG ĐIỀU CHỈNH MÁY THỞ (VENTILATOR SIMULATION)
  let predictedPaco2WithTargetVent: number | null = null;
  let predictedPhWithTargetVent: number | null = null;

  if (ventCurrentVt && ventCurrentRr && ventTargetVt && ventTargetRr && paco2 > 0) {
    const currentVe = (ventCurrentVt * ventCurrentRr) / 1000;
    const targetVe = (ventTargetVt * ventTargetRr) / 1000;
    if (targetVe > 0) {
      predictedPaco2WithTargetVent = Math.round(paco2 * (currentVe / targetVe));
      const deltaPaco2Sim = predictedPaco2WithTargetVent - paco2;
      // Dự báo pH: 10 mmHg PaCO2 làm thay đổi pH khoảng 0.08 cấp tính
      predictedPhWithTargetVent = parseFloat((ph - (deltaPaco2Sim / 10) * 0.08).toFixed(2));
    }
  }

  // 9. TÍNH TOÁN LIỀU BÙ NATRI BICARBONATE THEO GUIDELINE
  let bicarbDeficitMeq: number | null = null;
  let bicarbIndicationStatus = 'Không có chỉ định bù Bicarbonate';

  if (hco3 < 20) {
    // Deficit = 0.5 * Weight * (24 - HCO3-)
    bicarbDeficitMeq = Math.round(0.5 * patientWeightKg * (24 - hco3));

    if (ph < 7.15 && (anionGapCorrected! <= 12 || hco3 < 8)) {
      bicarbIndicationStatus = `🚨 CÓ CHỈ ĐỊNH BÙ BICARBONATE KHẨN: pH = ${ph} < 7.15 hoặc HCO3- < 8 mmol/L (Theo Surviving Sepsis Campaign 2021 & KDIGO). Tổng lượng thiếu hụt: ${bicarbDeficitMeq} mEq. Bù trước 1/2 liều (${Math.round(bicarbDeficitMeq / 2)} mEq NaHCO3 8.4%) trong 2-4 giờ.`;
      recommendations.push(`Phác đồ bù Bicarbonate: Pha 100-150 mL NaHCO3 8.4% vào Glucose 5% truyền tĩnh mạch, kiểm tra lại khí máu sau 2 giờ. Mục tiêu pH ≥ 7.20.`);
    } else if (ph < 7.20 && anionGapCorrected! > 12) {
      bicarbIndicationStatus = `Cân nhắc bù thận trọng nếu suy thận cấp AKI giai đoạn 2-3 hoặc sốc toan máu nặng không đáp ứng dịch truyền.`;
    }
  }

  // 10. TỔNG HỢP BÁO CÁO EBM TOÀN DIỆN
  let summary = `[BÁO CÁO KHÍ MÁU ĐỘNG MẠCH CHUYÊN SÂU — DOCSPACE ABG PRO STUDIO]\n`;
  summary += `1. TÍNH NHẤT QUÁN NỘI TẠI: ${isConsistent ? 'Đạt chuẩn (pH đo khớp lý thuyết)' : consistencyWarning}\n`;
  summary += `2. KẾT LUẬN TOAN KIỀM: ${primaryDisorder}\n`;
  summary += `3. TRẠNG THÁI BÙ TRỪ: ${compensationStatus} (${expectedCompValue})\n`;
  if (anionGapCorrected !== null) {
    summary += `4. ANION GAP: ${anionGapCorrected} mmol/L (Hiệu chỉnh Albumin: ${albumin} g/dL) ${deltaRatioInterpretation ? `➔ Delta Ratio: ${deltaRatio} (${deltaRatioInterpretation})` : ''}\n`;
  }
  if (osmolalGapInterpretation) {
    summary += `5. OSMOLAL GAP: ${osmolalGapInterpretation}\n`;
  }
  if (uagInterpretation) {
    summary += `6. ANION GAP NIỆU (UAG): ${uagInterpretation}\n`;
  }
  if (stewartInterpretation) {
    summary += `7. HÓA LÝ STEWART: ${stewartInterpretation}\n`;
  }
  if (pao2) {
    summary += `8. OXY HÓA MÀNG PHẾ NANG: PaO2/FiO2 = ${pfRatio} mmHg | A-a Gradient = ${aaGradient} mmHg (Kỳ vọng: ${aaGradientExpectedForAge} mmHg) ${berlinArdsCategory ? `➔ ${berlinArdsCategory}` : ''}\n`;
  }
  if (toxicHbWarnings.length > 0) {
    summary += `9. ĐỘC CHẤT HUYẾT SẮC TỐ:\n  • ${toxicHbWarnings.join('\n  • ')}\n`;
  }
  if (bicarbDeficitMeq) {
    summary += `10. BÙ BICARBONATE: ${bicarbIndicationStatus} (Lượng thiếu hụt: ${bicarbDeficitMeq} mEq)\n`;
  }

  return {
    isConsistent,
    calculatedHPlus: calcHPlus,
    expectedPhFromHPlus: expectedPhFromH,
    consistencyWarning,
    primaryDisorder,
    compensationStatus,
    expectedCompValue,
    isTripleDisorder,
    anionGap,
    anionGapCorrected,
    deltaAg,
    deltaHco3,
    deltaRatio,
    deltaRatioInterpretation,
    calculatedOsmolality,
    osmolalGap,
    osmolalGapInterpretation,
    urinaryAnionGap,
    uagInterpretation,
    stewartSidApparent,
    stewartSigEstimate,
    stewartInterpretation,
    paO2Alveolar,
    aaGradient,
    aaGradientExpectedForAge,
    isAaGradientElevated,
    pfRatio,
    oxygenationIndex,
    shuntFractionEstimate,
    berlinArdsCategory,
    toxicHbWarnings,
    predictedPaco2WithTargetVent,
    predictedPhWithTargetVent,
    bicarbDeficitMeq,
    bicarbIndicationStatus,
    emergencyFlags,
    clinicalSummary: summary,
    recommendations,
    davenportCoords: { x: ph, y: hco3 },
  };
}

/**
 * Render Đồ Thị Davenport Toan Kiềm 6 Vùng Màu & Đường Đẳng Áp PaCO2 Động SVG
 */
export function renderDavenportSvg(ph: number, hco3: number, paco2: number = 40): string {
  const w = 580;
  const h = 360;
  const padL = 50;
  const padR = 30;
  const padT = 30;
  const padB = 45;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const minPh = 6.9;
  const maxPh = 7.8;
  const minHco3 = 2;
  const maxHco3 = 50;

  const getX = (valPh: number) => padL + ((valPh - minPh) / (maxPh - minPh)) * innerW;
  const getY = (valHco3: number) => padT + innerH - ((valHco3 - minHco3) / (maxHco3 - minHco3)) * innerH;

  const ptPh = Math.max(minPh, Math.min(maxPh, ph));
  const ptHco3 = Math.max(minHco3, Math.min(maxHco3, hco3));
  const ptX = getX(ptPh);
  const ptY = getY(ptHco3);

  // Helper vẽ Isobar PaCO2
  const drawIsobar = (pco2Val: number, strokeColor: string, strokeWidth: number = 1.2, isDashed: boolean = true) => {
    const pts: string[] = [];
    for (let p = 6.9; p <= 7.8; p += 0.03) {
      const calcHco3 = 0.03 * pco2Val * Math.pow(10, p - 6.1);
      if (calcHco3 >= minHco3 && calcHco3 <= maxHco3) {
        pts.push(`${getX(p)},${getY(calcHco3)}`);
      }
    }
    return pts.length > 1
      ? `<polyline fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" ${isDashed ? 'stroke-dasharray="3,3"' : ''} points="${pts.join(' ')}" />`
      : '';
  };

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-surface); border-radius:12px;">
      <defs>
        <radialGradient id="abgPatientGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#ef4444" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- 6 VÙNG TOAN KIỀM LÂM SÀNG (6 CLINICAL ZONES) -->
      <!-- 1. Vùng Toan Chuyển Hóa (Metabolic Acidosis: pH < 7.35, HCO3 < 22) -->
      <polygon points="${getX(6.9)},${getY(2)} ${getX(7.35)},${getY(2)} ${getX(7.35)},${getY(22)} ${getX(6.9)},${getY(12)}" fill="rgba(245, 158, 11, 0.14)" stroke="#f59e0b" stroke-width="0.6" stroke-dasharray="2,2" />
      <text x="${getX(7.12)}" y="${getY(8)}" fill="#f59e0b" font-size="9.5" font-weight="800" text-anchor="middle">Toan Chuyển Hóa</text>

      <!-- 2. Vùng Kiềm Chuyển Hóa (Metabolic Alkalosis: pH > 7.45, HCO3 > 26) -->
      <polygon points="${getX(7.45)},${getY(26)} ${getX(7.8)},${getY(32)} ${getX(7.8)},${getY(50)} ${getX(7.45)},${getY(50)}" fill="rgba(2, 132, 199, 0.14)" stroke="#0284c7" stroke-width="0.6" stroke-dasharray="2,2" />
      <text x="${getX(7.64)}" y="${getY(42)}" fill="#0284c7" font-size="9.5" font-weight="800" text-anchor="middle">Kiềm Chuyển Hóa</text>

      <!-- 3. Vùng Toan Hô Hấp Cấp (Acute Resp Acidosis: pH < 7.35, HCO3 24-30) -->
      <polygon points="${getX(7.0)},${getY(24)} ${getX(7.35)},${getY(24)} ${getX(7.35)},${getY(30)} ${getX(7.0)},${getY(32)}" fill="rgba(239, 68, 68, 0.16)" stroke="#ef4444" stroke-width="0.6" stroke-dasharray="2,2" />
      <text x="${getX(7.15)}" y="${getY(28)}" fill="#ef4444" font-size="9" font-weight="800" text-anchor="middle">Toan HH Cấp</text>

      <!-- 4. Vùng Toan Hô Hấp Mạn (Chronic Resp Acidosis: pH 7.30 - 7.38, HCO3 30 - 45) -->
      <polygon points="${getX(7.28)},${getY(30)} ${getX(7.38)},${getY(30)} ${getX(7.38)},${getY(46)} ${getX(7.28)},${getY(46)}" fill="rgba(220, 38, 38, 0.22)" stroke="#dc2626" stroke-width="0.6" stroke-dasharray="2,2" />
      <text x="${getX(7.33)}" y="${getY(38)}" fill="#dc2626" font-size="9" font-weight="800" text-anchor="middle">Toan HH Mạn</text>

      <!-- 5. Vùng Kiềm Hô Hấp (Resp Alkalosis: pH > 7.45, HCO3 15 - 24) -->
      <polygon points="${getX(7.45)},${getY(15)} ${getX(7.8)},${getY(15)} ${getX(7.8)},${getY(24)} ${getX(7.45)},${getY(24)}" fill="rgba(139, 92, 246, 0.14)" stroke="#8b5cf6" stroke-width="0.6" stroke-dasharray="2,2" />
      <text x="${getX(7.64)}" y="${getY(19)}" fill="#8b5cf6" font-size="9.5" font-weight="800" text-anchor="middle">Kiềm Hô Hấp</text>

      <!-- 6. Vùng Bình Thường (Normal Zone: pH 7.35 - 7.45, HCO3 22 - 26) -->
      <rect x="${getX(7.35)}" y="${getY(26)}" width="${getX(7.45) - getX(7.35)}" height="${getY(22) - getY(26)}" fill="rgba(16, 185, 129, 0.28)" stroke="#10b981" stroke-width="1.8" rx="3" />
      <text x="${(getX(7.35) + getX(7.45)) / 2}" y="${(getY(26) + getY(22)) / 2 + 3}" fill="#10b981" font-size="9" font-weight="900" text-anchor="middle">CHUẨN</text>

      <!-- Isobars PaCO2 Chuẩn (20, 40, 60, 80 mmHg) -->
      ${drawIsobar(20, '#0284c7')}
      ${drawIsobar(40, '#10b981')}
      ${drawIsobar(60, '#f59e0b')}
      ${drawIsobar(80, '#ef4444')}
      
      <!-- Isobar Động của bệnh nhân -->
      ${drawIsobar(paco2, '#ef4444', 2.0, false)}

      <text x="${getX(7.70)}" y="${getY(16)}" fill="#0284c7" font-size="8.5" font-weight="700">PaCO2 20</text>
      <text x="${getX(7.56)}" y="${getY(29)}" fill="#10b981" font-size="8.5" font-weight="700">PaCO2 40 (Chuẩn)</text>
      <text x="${getX(7.40)}" y="${getY(44)}" fill="#f59e0b" font-size="8.5" font-weight="700">PaCO2 60</text>
      <text x="${getX(7.26)}" y="${getY(48)}" fill="#ef4444" font-size="8.5" font-weight="700">PaCO2 80</text>

      <!-- Trục Tọa Độ -->
      <line x1="${padL}" y1="${padT + innerH}" x2="${w - padR}" y2="${padT + innerH}" stroke="var(--color-border)" stroke-width="1.5" />
      <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + innerH}" stroke="var(--color-border)" stroke-width="1.5" />

      <!-- X Ticks (pH) -->
      ${[6.9, 7.0, 7.1, 7.2, 7.35, 7.4, 7.45, 7.6, 7.7, 7.8].map(p => `
        <text x="${getX(p)}" y="${h - 18}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">${p}</text>
      `).join('')}
      <text x="${w / 2}" y="${h - 4}" fill="var(--color-text)" font-size="10.5" font-weight="800" text-anchor="middle">pH Máu Động Mạch</text>

      <!-- Y Ticks (HCO3) -->
      ${[10, 20, 24, 30, 40, 50].map(v => `
        <text x="${padL - 8}" y="${getY(v) + 3}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">${v}</text>
      `).join('')}
      <text x="16" y="${padT + innerH / 2}" fill="var(--color-text)" font-size="10.5" font-weight="800" text-anchor="middle" transform="rotate(-90 16 ${padT + innerH / 2})">HCO3- (mmol/L)</text>

      <!-- Patient Coordinate Point -->
      <circle cx="${ptX}" cy="${ptY}" r="18" fill="url(#abgPatientGlow)" />
      <circle cx="${ptX}" cy="${ptY}" r="7" fill="#ef4444" stroke="#ffffff" stroke-width="2.5" />
      <rect x="${ptX - 45}" y="${ptY - 28}" width="90" height="20" rx="5" fill="rgba(15, 23, 42, 0.9)" stroke="#ef4444" stroke-width="1.2" />
      <text x="${ptX}" y="${ptY - 14}" fill="#ffffff" font-size="9.5" font-weight="800" text-anchor="middle">BN (${ph} / ${hco3})</text>
    </svg>
  `;
}

/**
 * Render Đồng Hồ Đo Chỉ Số Horovitz PaO2/FiO2 & Phân Tầng ARDS SVG
 */
export function renderOxygenationGaugeSvg(pfRatio: number | null, aaGradient: number | null): string {
  const w = 420;
  const h = 200;
  const val = pfRatio || 350;
  const angle = Math.max(0, Math.min(180, (val / 500) * 180)); // 0 đến 500 mmHg
  const rad = ((180 - angle) * Math.PI) / 180;

  const cx = w / 2;
  const cy = 150;
  const r = 110;
  const needleX = cx + r * Math.cos(rad);
  const needleY = cy - r * Math.sin(rad);

  return `
    <svg viewBox="0 0 ${w} ${h}" width="100%" height="160" style="background:var(--color-surface); border-radius:12px;">
      <!-- Vùng Nặng (< 100) -->
      <path d="M ${cx - r},${cy} A ${r} ${r} 0 0 1 ${cx - r * Math.cos((36 * Math.PI) / 180)},${cy - r * Math.sin((36 * Math.PI) / 180)}" fill="none" stroke="#dc2626" stroke-width="16" />
      <!-- Vùng Trung Bình (100 - 200) -->
      <path d="M ${cx - r * Math.cos((36 * Math.PI) / 180)},${cy - r * Math.sin((36 * Math.PI) / 180)} A ${r} ${r} 0 0 1 ${cx - r * Math.cos((72 * Math.PI) / 180)},${cy - r * Math.sin((72 * Math.PI) / 180)}" fill="none" stroke="#ea580c" stroke-width="16" />
      <!-- Vùng Nhẹ (200 - 300) -->
      <path d="M ${cx - r * Math.cos((72 * Math.PI) / 180)},${cy - r * Math.sin((72 * Math.PI) / 180)} A ${r} ${r} 0 0 1 ${cx - r * Math.cos((108 * Math.PI) / 180)},${cy - r * Math.sin((108 * Math.PI) / 180)}" fill="none" stroke="#f59e0b" stroke-width="16" />
      <!-- Vùng Bình Thường (> 300) -->
      <path d="M ${cx - r * Math.cos((108 * Math.PI) / 180)},${cy - r * Math.sin((108 * Math.PI) / 180)} A ${r} ${r} 0 0 1 ${cx + r},${cy}" fill="none" stroke="#10b981" stroke-width="16" />

      <!-- Kim chỉ thị -->
      <line x1="${cx}" y1="${cy}" x2="${needleX}" y2="${needleY}" stroke="var(--color-text)" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="${cx}" cy="${cy}" r="7" fill="var(--color-primary)" stroke="#ffffff" stroke-width="2" />

      <!-- Chỉ số trung tâm -->
      <text x="${cx}" y="${cy - 20}" fill="var(--color-text)" font-size="16" font-weight="800" text-anchor="middle">
        P/F = ${val} mmHg
      </text>
      <text x="${cx}" y="${cy + 25}" fill="var(--color-text-muted)" font-size="10.5" font-weight="700" text-anchor="middle">
        ${val < 100 ? '🚨 ARDS Nặng' : val < 200 ? '⚠️ ARDS Trung Bình' : val <= 300 ? '⚠️ ARDS Nhẹ' : '✅ Oxy Hóa Máu Tốt'}
        ${aaGradient ? ` | A-a Grad: ${aaGradient} mmHg` : ''}
      </text>
    </svg>
  `;
}

// ============================================================
// NEUROKIT2 MODULE 4: RESPIRATORY SIGNAL & PATTERN SIMULATOR (RSP)
// ============================================================

export type RspPatternType = 'normal' | 'kussmaul' | 'cheyne_stokes' | 'biot' | 'obstructive_asthma' | 'restrictive_ards';

export interface RspWaveformInputs {
  pattern: RspPatternType;
  respiratoryRate: number;      // breaths/min
  tidalVolumeMl: number;        // mL (300 - 1000 mL)
  ieRatio: '1:2' | '1:3' | '1:4' | '1:1' | '2:1';
}

export interface RspPatternAnalysis {
  patternName: string;
  badgeColor: string;
  inspiratoryTimeSec: number;
  expiratoryTimeSec: number;
  minuteVentilationLMin: number;
  pathophysiology: string;
  abgCorrelation: string;
  clinicalRecommendation: string;
}

export function computeRspAnalysis(inputs: RspWaveformInputs, abgInputs?: AbgInputs): RspPatternAnalysis {
  const rr = inputs.respiratoryRate;
  const vt = inputs.tidalVolumeMl;
  const cycleTimeSec = 60 / rr;

  let ieRatioNum = 0.5; // 1:2 -> Ti / Te = 1 / 2 -> Ti = 1/3 cycle, Te = 2/3 cycle
  if (inputs.ieRatio === '1:3') ieRatioNum = 0.333;
  else if (inputs.ieRatio === '1:4') ieRatioNum = 0.25;
  else if (inputs.ieRatio === '1:1') ieRatioNum = 1.0;
  else if (inputs.ieRatio === '2:1') ieRatioNum = 2.0;

  const tinsp = parseFloat((cycleTimeSec / (1 + (1 / ieRatioNum))).toFixed(2));
  const texp = parseFloat((cycleTimeSec - tinsp).toFixed(2));
  const mv = parseFloat(((rr * vt) / 1000).toFixed(1));

  let patternName = '1. Thở Sinh Lý Bình Thường (Eupnea)';
  let badgeColor = '#10b981';
  let pathophysiology = 'Thông khí phế nang cân bằng với sản xuất CO2 chuyển hóa, tỷ lệ I:E sinh lý 1:2.';
  let abgCorrelation = 'PaCO2 duy trì trong dải chuẩn 35 - 45 mmHg, pH máu bình thường 7.35 - 7.45.';
  let clinicalRecommendation = 'Duy trì chế độ thở tự nhiên hoặc thông khí bảo vệ phổi theo dõi định kỳ.';

  switch (inputs.pattern) {
    case 'kussmaul':
      patternName = '2. Kiểu Thở Kussmaul (Toan Chuyển Hóa Nặng / DKA / Ure Huyết)';
      badgeColor = '#dc2626';
      pathophysiology = 'Thở rất sâu và nhanh liên tục không nghỉ nhằm đào thải tối đa CO2 qua phổi để bù trừ toan máu chuyển hóa.';
      abgCorrelation = `Bù trừ hô hấp tối đa: Giảm PaCO2 (Winter's formula PaCO2 = 1.5×HCO3 + 8). ${abgInputs && abgInputs.ph < 7.20 ? `pH hiện tại = ${abgInputs.ph} (Toan máu nặng).` : ''}`;
      clinicalRecommendation = '🚨 CẤP CỨU NGUYÊN NHÂN TOAN: Bù dịch tinh thể, truyền Insulin liên tục trong DKA, lọc máu cấp cứu nếu toan máu kháng trị (pH < 7.15).';
      break;

    case 'cheyne_stokes':
      patternName = '3. Kiểu Thở Cheyne-Stokes (Crescendo-Decrescendo + Ngưng Thở)';
      badgeColor = '#ea580c';
      pathophysiology = 'Tăng thông khí dạng hình thoi xen kẽ các cơn ngưng thở (Apnea) do chậm dẫn truyền feedback hóa cảm thụ quan ở bệnh nhân suy tim nặng hoặc tổn thương bán cầu não.';
      abgCorrelation = 'Dao động chu kỳ: Kiềm hô hấp trong pha thở sâu và toan hô hấp nhẹ trong pha ngưng thở.';
      clinicalRecommendation = 'Tối ưu điều trị suy tim nền (GDMT 4 trụ cột), thở oxy ban đêm hoặc máy thở không xâm lấn ASV (Adaptive Servo-Ventilation).';
      break;

    case 'biot':
      patternName = '4. Kiểu Thở Biot / Thở Thất Điều (Tăng Áp Nội Sọ / Tổn Thương Cầu Não)';
      badgeColor = '#7c3aed';
      pathophysiology = 'Các chu kỳ thở sâu bất thường ngắt quãng bằng các cơn ngưng thở đột ngột hoàn toàn không theo chu kỳ.';
      abgCorrelation = 'Suy giảm thông khí phế nang tiến triển, nguy cơ ứ đọng CO2 cấp và toan hô hấp đe dọa ngừng thở.';
      clinicalRecommendation = '🚨 CẤP CỨU THẦN KINH: Chống phù não cấp tính (Mannitol 20% / NaCl 3%), chụp CT sọ não khẩn, chuẩn bị đặt nội khí quản thở máy bảo vệ đường thở.';
      break;

    case 'obstructive_asthma':
      patternName = '5. Kiểu Thở Tắc Nghẽn Phế Quản (Hen Phế Quản Cấp / Đợt Cấp COPD)';
      badgeColor = '#ca8a04';
      pathophysiology = 'Tắc nghẽn đường thở nhỏ do co thắt và phù nề niêm mạc làm thì thở ra kéo dài đáng kể (I:E = 1:3 đến 1:4), có bẫy khí Auto-PEEP.';
      abgCorrelation = 'Giai đoạn sớm: Tăng thông khí gây kiềm hô hấp (PaCO2 thấp). Giai đoạn muộn kiệt cơ: PaCO2 tăng cao là dấu hiệu đe dọa suy hô hấp tối cấp!';
      clinicalRecommendation = 'Khí dung Salbutamol + Ipratropium liều cao liên tục, Corticoid toàn thân tĩnh mạch, thở máy không xâm lấn BiPAP cài I:E kéo dài.';
      break;

    case 'restrictive_ards':
      patternName = '6. Kiểu Thở Hạn Chế Phổi (Hội Chứng ARDS / Xơ Phổi)';
      badgeColor = '#0284c7';
      pathophysiology = 'Độ giãn nở phổi (Compliance) giảm trầm trọng làm bệnh nhân phải thở nhanh nông để giảm công hô hấp (I:E = 1:1).';
      abgCorrelation = 'Giảm oxy máu nặng trơ với FiO2 (Shunt phổi > 20%), tỷ số PaO2/FiO2 giảm < 200 - 300 mmHg.';
      clinicalRecommendation = 'Chiến lược thông khí bảo vệ phổi (Lung-protective ventilation: Vt thấp 4 - 6 mL/kg PBW, PEEP cao, hạn chế Pplat < 30 cmH2O).';
      break;
  }

  return {
    patternName,
    badgeColor,
    inspiratoryTimeSec: tinsp,
    expiratoryTimeSec: texp,
    minuteVentilationLMin: mv,
    pathophysiology,
    abgCorrelation,
    clinicalRecommendation,
  };
}

/**
 * Render Dải Sóng Hô Hấp RSP SVG Tương Tác Chuẩn NeuroKit2 (Breathmetrics Engine)
 */
export function renderRspWaveformSvg(inputs: RspWaveformInputs, theme: 'paper' | 'neon' | 'dark' = 'paper'): string {
  const totalW = 860;
  const totalH = 220;
  const padL = 50;
  const padR = 20;
  const padT = 36;
  const padB = 30;
  const plotW = totalW - padL - padR;
  const plotH = totalH - padT - padB;
  const midY = padT + plotH / 2;

  let bgFill = 'var(--color-bg)';
  let gridLine = 'var(--color-border)';
  let traceColor = '#0284c7';
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

  const numCycles = 8;
  const cycleWPx = plotW / numCycles;

  let pathD = `M ${padL},${midY} `;

  for (let c = 0; c < numCycles; c++) {
    const startX = padL + c * cycleWPx;
    if (startX > totalW - padR) break;

    let ampPx = plotH * 0.40 * (inputs.tidalVolumeMl / 500);

    // Xử lý các kiểu thở đặc biệt
    if (inputs.pattern === 'cheyne_stokes') {
      // Crescendo - Decrescendo cycle
      const phase = (c % 8) / 8;
      const mod = Math.sin(phase * Math.PI * 2);
      if (c >= 5) {
        // Apnea phase
        ampPx = 0;
      } else {
        ampPx *= Math.abs(Math.sin((c / 5) * Math.PI)) * 1.5;
      }
    } else if (inputs.pattern === 'biot') {
      if (c === 2 || c === 3 || c === 6) {
        ampPx = 0; // Apnea đột ngột
      } else {
        ampPx *= 1.3;
      }
    } else if (inputs.pattern === 'kussmaul') {
      ampPx = plotH * 0.48; // Thở cực sâu
    }

    // Tỷ lệ thì hít vào vs thở ra
    let tinspRatio = 0.33;
    if (inputs.ieRatio === '1:3') tinspRatio = 0.25;
    else if (inputs.ieRatio === '1:4') tinspRatio = 0.20;
    else if (inputs.ieRatio === '1:1') tinspRatio = 0.50;

    const xInhPeak = startX + cycleWPx * tinspRatio;
    const yInhPeak = midY - ampPx;
    const xEnd = startX + cycleWPx;

    if (ampPx === 0) {
      // Apnea flat line
      pathD += `L ${xEnd},${midY} `;
    } else {
      // Sóng hô hấp bất đối xứng sinh học (Noto et al. Breathmetrics model)
      pathD += `C ${startX + cycleWPx * tinspRatio * 0.4},${midY} ${xInhPeak - cycleWPx * 0.05},${yInhPeak} ${xInhPeak},${yInhPeak} `;
      pathD += `C ${xInhPeak + (xEnd - xInhPeak) * 0.3},${yInhPeak} ${xEnd - (xEnd - xInhPeak) * 0.4},${midY + ampPx * 0.15} ${xEnd},${midY} `;
    }
  }

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="${totalH}" style="background:${bgFill}; border-radius:10px; display:block; max-width:100%; box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <!-- Header -->
      <rect x="0" y="0" width="${totalW}" height="${padT}" fill="rgba(0,0,0,0.04)" rx="10"/>
      <text x="14" y="22" fill="${textColor}" font-size="11.5" font-weight="800" font-family="'Inter', sans-serif">
        🌬️ ĐỒ THỊ CHU KỲ HÔ HẤP THỜI GIAN THỰC (RSP WAVEFORM) — RR: ${inputs.respiratoryRate} l/p | I:E = ${inputs.ieRatio} | Vt: ${inputs.tidalVolumeMl} mL
      </text>
      <text x="${totalW - 14}" y="22" fill="var(--color-text-muted)" font-size="10" font-weight="700" text-anchor="end">
        NeuroKit2 Breathmetrics Engine
      </text>

      <!-- Baseline Zero-Flow Line -->
      <line x1="${padL}" y1="${midY}" x2="${totalW - padR}" y2="${midY}" stroke="${gridLine}" stroke-width="1.2" stroke-dasharray="3,3"/>
      <text x="${padL - 6}" y="${midY - 15}" fill="#10b981" font-size="8.5" font-weight="800" text-anchor="end">HÍT VÀO</text>
      <text x="${padL - 6}" y="${midY + 20}" fill="#0284c7" font-size="8.5" font-weight="800" text-anchor="end">THỞ RA</text>

      <!-- RSP Flow Trace -->
      <path d="${pathD}" fill="none" stroke="${traceColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Footer Bar -->
      <g transform="translate(${padL}, ${totalH - 10})">
        <text x="0" y="0" fill="var(--color-text-muted)" font-size="9" font-weight="600">
          Thể tích phút (Minute Vent): <strong>${((inputs.respiratoryRate * inputs.tidalVolumeMl) / 1000).toFixed(1)} L/phút</strong> |
          Thời gian chu kỳ: <strong>${(60 / inputs.respiratoryRate).toFixed(1)}s</strong> |
          Kiểu thở: <strong style="color:${inputs.pattern === 'normal' ? '#10b981' : '#dc2626'};">${inputs.pattern.toUpperCase()}</strong>
        </text>
      </g>
    </svg>
  `;
}
