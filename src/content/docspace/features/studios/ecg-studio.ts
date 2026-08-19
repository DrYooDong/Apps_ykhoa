/**
 * DocSpace — ECG Research Studio Pro ($10,000 Level Clinical Lab Suite)
 * 12-Lead Synchronized Waveform Simulator, Precision Digital Calipers,
 * Hexaxial Cabrera Vector Compass, Coronary Artery OMI Mapper,
 * Arrhythmia/WCT Decision Tree, WPW Arruda Localization,
 * LVH Multi-Score Matrix (Peguero-Lo Presti, Cornell, Sokolow-Lyon) & EBM Report Engine.
 * 100% Pure TypeScript & Pure SVG — Zero External Dependencies.
 */

export interface EcgPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  category: 'ischemia' | 'arrhythmia' | 'conduction' | 'electrolyte' | 'hypertrophy' | 'channelopathy';
  description: string;
  values: EcgInputs;
}

export interface EcgInputs {
  heartRate: number; // bpm
  rhythmType: 'sinus' | 'afib' | 'aflutter' | 'svt' | 'vt' | 'pacing' | 'junctional' | 'idioventricular';
  
  // Trục điện tim (Biên độ net R - S)
  lead1Net: number; // mm
  avfNet: number;   // mm
  
  // Khoảng thời gian cơ bản (ms)
  prInterval?: number; // ms (chuẩn 120-200)
  qrsDuration?: number; // ms (chuẩn <120)
  qtInterval?: number; // ms
  
  // Dày thất & buồng tim
  sv1?: number; // mm
  rv5?: number; // mm
  rv6?: number; // mm
  raVL?: number; // mm
  sv3?: number; // mm
  sv4?: number; // mm
  deepestS?: number; // mm (cho Peguero-Lo Presti)
  pWaveDuration?: number; // ms
  pWaveAmpLead2?: number; // mm
  pWaveTerminalV1?: number; // mm (Morris index)
  gender?: 'male' | 'female';
  
  // Nhồi máu cơ tim & ST-T theo chuyển đạo (mm)
  stI?: number;
  stII?: number;
  stIII?: number;
  staVR?: number;
  staVL?: number;
  staVF?: number;
  stV1?: number;
  stV2?: number;
  stV3?: number;
  stV4?: number;
  stV5?: number;
  stV6?: number;
  stV4R?: number;
  stV7V9?: number;
  
  // Đặc điểm ST-T & Sóng đặc biệt
  tWaveType?: 'normal' | 'peaked' | 'hyperacute' | 'inverted' | 'biphasic_wellens' | 'de_winter' | 'flattened';
  hasPathologicalQ?: boolean;
  hasDeltaWave?: boolean; // WPW
  wpwDeltaI?: 'pos' | 'neg';
  wpwDeltaAvf?: 'pos' | 'neg';
  wpwDeltaV1?: 'pos' | 'neg';
  hasOsbornWave?: boolean; // Hạ thân nhiệt
  hasBrugadaPattern?: 'none' | 'type1' | 'type2'; // Coved vs Saddleback
  hasDigoxinSagging?: boolean; // Salvador Dali mustache
  hasUWave?: boolean; // Hạ Kali
  hyperkalemiaStage?: 0 | 1 | 2 | 3 | 4; // 1: Peaked T, 2: PR/P loss, 3: QRS sine, 4: VF
  
  // Sgarbossa cải tiến (Modified Smith-Sgarbossa)
  hasLbbb?: boolean;
  hasPacedRhythm?: boolean;
  sgarbossaConcordantStElevation?: boolean; // STE >= 1mm cùng hướng (5 pts)
  sgarbossaConcordantStDepressionV1V3?: boolean; // STD >= 1mm V1-V3 (3 pts)
  sgarbossaDiscordantSte?: number; // mm ST chênh lên ngược hướng
  sgarbossaPrecedingS?: number; // mm biên độ sóng S trước đó (tính tỷ lệ ST/S)
  
  // Wide Complex Tachycardia (WCT) Engine
  wctRsAbsentAllPrecordial?: boolean; // Brugada Step 1
  wctRsLongestOver100ms?: boolean;    // Brugada Step 2
  wctAvDissociation?: boolean;         // Brugada Step 3 (Fusion / Capture beats)
  wctMorphologyCriteriaMet?: boolean;  // Brugada Step 4
  wctVereckeiInitialR?: boolean;       // Vereckei aVR Step 1
  wctVereckeiViVtLe1?: boolean;        // Vereckei aVR Step 4 (Vi/Vt <= 1)
}

export interface EcgAnalysisResult {
  heartRateCategory: string;
  axisAngleDegree: number;
  axisClassification: string;
  axisColor: string;
  axisEtiologies: string[];
  
  // 4 công thức QTc
  qtcBazett: number | null;
  qtcFridericia: number | null;
  qtcFramingham: number | null;
  qtcHodges: number | null;
  qtcInterpretation: string | null;
  qtcSeverity: 'normal' | 'borderline' | 'prolonged' | 'critical' | 'short';
  
  // Dày buồng tim Multi-Criteria
  lvhStatus: string | null;
  lvhDetails: {
    pegueroLoPresti: { val: number; positive: boolean; threshold: number };
    sokolowLyon: { val: number; positive: boolean; threshold: number };
    cornellVoltage: { val: number; positive: boolean; threshold: number };
    romhiltEstes: { score: number; positive: boolean };
  };
  rvhStatus: string | null;
  atrialEnlargementStatus: string | null;
  
  // Thiếu máu & Nhồi máu cơ tim OMI
  stemiTerritory: string | null;
  culpritArtery: 'LAD' | 'LCx' | 'RCA' | 'LMCA' | 'NONE' | 'MULTI';
  culpritDescription: string;
  stemiEquivalents: string[];
  sgarbossaResult: {
    score: number;
    stOverSRatio: number | null;
    isModifiedPositive: boolean;
    interpretation: string;
  } | null;
  
  // Loạn nhịp & Dẫn truyền
  wctResult: {
    isVtProbable: boolean;
    brugadaStep: string;
    vereckeiStep: string;
    certainty: string;
  } | null;
  wpwLocalization: {
    pathwayLocation: string;
    ablationApproach: string;
  } | null;
  
  // Rối loạn điện giải & ngộ độc
  metabolicFindings: string[];
  
  // Đánh giá khẩn cấp & Tóm tắt lâm sàng
  emergencyFlags: string[];
  clinicalSummary: string;
  recommendations: string[];
}

export const ECG_PRESETS: EcgPreset[] = [
  {
    id: 'stemi_anterior_proximal_lad',
    name: '1. STEMI Thành Trước Rộng (Tắc Đoạn Gần LAD)',
    badge: '🚨 Cấp Cứu Mạch Vành Cực Nguy',
    badgeColor: '#dc2626',
    category: 'ischemia',
    description: 'ST chênh vòm V1-V6, DI, aVL (2-6mm) kèm ST chênh xuống soi gương DII, DIII, aVF. Tắc thân LAD trước nhánh D1/S1.',
    values: {
      heartRate: 110, rhythmType: 'sinus', lead1Net: 10, avfNet: -8, prInterval: 145, qrsDuration: 95, qtInterval: 390,
      stI: 2.5, stII: -2.0, stIII: -3.0, staVR: 1.0, staVL: 3.0, staVF: -2.5,
      stV1: 3.0, stV2: 5.5, stV3: 6.0, stV4: 4.5, stV5: 3.0, stV6: 2.0,
      tWaveType: 'hyperacute', sv1: 6, rv5: 14, raVL: 12, sv3: 8, gender: 'male'
    }
  },
  {
    id: 'stemi_inferior_rv_rca',
    name: '2. STEMI Thành Dưới + Thất Phải (Tắc RCA)',
    badge: '⚠️ ST Chênh DIII > DII, ST↑ V4R',
    badgeColor: '#ea580c',
    category: 'ischemia',
    description: 'ST chênh lên DIII > DII, aVF kèm ST chênh lên ở V4R (1.5mm). ST chênh xuống soi gương DI, aVL. Chống chỉ định Nitrate.',
    values: {
      heartRate: 54, rhythmType: 'sinus', lead1Net: -5, avfNet: 14, prInterval: 220, qrsDuration: 90, qtInterval: 430,
      stI: -2.0, stII: 2.5, stIII: 4.5, staVR: -1.0, staVL: -3.0, staVF: 3.5,
      stV1: 1.0, stV2: -1.5, stV3: -1.0, stV4: 0.5, stV5: 0, stV6: 0, stV4R: 2.0,
      tWaveType: 'normal', sv1: 5, rv5: 12, raVL: -4, sv3: 6, gender: 'male'
    }
  },
  {
    id: 'wellens_type_a',
    name: '3. Hội Chứng Wellens Type A (Hẹp Nặng Thân LAD)',
    badge: '🚨 Hội Chứng Tiền Nhồi Máu Cấp',
    badgeColor: '#dc2626',
    category: 'ischemia',
    description: 'Sóng T hai pha (+/-) rõ rệt ở V2, V3 trong giai đoạn hết đau ngực. 75% nhồi máu cơ tim trước rộng trong vòng vài ngày nếu không can thiệp.',
    values: {
      heartRate: 72, rhythmType: 'sinus', lead1Net: 8, avfNet: 6, prInterval: 160, qrsDuration: 85, qtInterval: 420,
      stI: 0, stII: 0, stIII: 0, staVR: 0, staVL: 0.5, staVF: 0,
      stV1: 0.5, stV2: 0.5, stV3: 0.5, stV4: 0, stV5: 0, stV6: 0,
      tWaveType: 'biphasic_wellens', sv1: 8, rv5: 16, raVL: 7, sv3: 10, gender: 'male'
    }
  },
  {
    id: 'wellens_type_b',
    name: '4. Hội Chứng Wellens Type B (T Đảo Ngược Sâu Đối Xứng)',
    badge: '🚨 Hẹp > 90% LAD Đoạn Gần',
    badgeColor: '#dc2626',
    category: 'ischemia',
    description: 'Sóng T âm sâu (> 5mm), đối xứng ở V2, V3, V4, V5 mà không có sóng Q hoại tử. Báo hiệu cơ tim đang hồi phục sau thiếu máu cục bộ nặng.',
    values: {
      heartRate: 68, rhythmType: 'sinus', lead1Net: 9, avfNet: 5, prInterval: 155, qrsDuration: 88, qtInterval: 450,
      stI: 0, stII: 0, stIII: 0, staVR: 0, staVL: 0.5, staVF: 0,
      stV1: 0, stV2: -0.5, stV3: -0.5, stV4: -0.5, stV5: 0, stV6: 0,
      tWaveType: 'inverted', sv1: 9, rv5: 15, raVL: 8, sv3: 11, gender: 'female'
    }
  },
  {
    id: 'de_winter_t_wave',
    name: '5. Dấu Hiệu De Winter (Tắc Cấp Hoàn Toàn LAD)',
    badge: '🚨 STEMI Tương Đương (OMI Cấp)',
    badgeColor: '#991b1b',
    category: 'ischemia',
    description: 'ST chênh xuống 1-3mm dốc lên tại điểm J tiếp nối sóng T cao nhọn đối xứng khổng lồ từ V1-V4. Chỉ định Cathlab khẩn cấp.',
    values: {
      heartRate: 98, rhythmType: 'sinus', lead1Net: 7, avfNet: 4, prInterval: 150, qrsDuration: 90, qtInterval: 400,
      stI: 0.5, stII: 0, stIII: 0, staVR: 1.5, staVL: 1.0, staVF: 0,
      stV1: -1.5, stV2: -2.5, stV3: -2.5, stV4: -1.5, stV5: 0, stV6: 0,
      tWaveType: 'de_winter', sv1: 7, rv5: 15, raVL: 6, sv3: 9, gender: 'male'
    }
  },
  {
    id: 'aslanger_pattern',
    name: '6. Kiểu Hình Aslanger (Nhồi Máu Thành Dưới Đa Nhánh)',
    badge: '⚡ OMI Ẩn Giấu Trên Nền Bệnh Nhiều Nhánh',
    badgeColor: '#b45309',
    category: 'ischemia',
    description: 'ST chênh lên đơn độc ở DIII (kèm ST chênh xuống ở V4-V6) và ST chênh lên ở V1. Dấu hiệu nhồi máu cơ tim dưới cấp kèm thiếu máu diện rộng.',
    values: {
      heartRate: 84, rhythmType: 'sinus', lead1Net: -2, avfNet: 10, prInterval: 175, qrsDuration: 95, qtInterval: 410,
      stI: -1.0, stII: 0.5, stIII: 2.5, staVR: 0.5, staVL: -1.5, staVF: 1.0,
      stV1: 1.0, stV2: 0, stV3: -0.5, stV4: -1.5, stV5: -2.0, stV6: -1.5,
      tWaveType: 'normal', sv1: 8, rv5: 14, raVL: -2, sv3: 9, gender: 'male'
    }
  },
  {
    id: 'posterior_stemi',
    name: '7. Nhồi Máu Cơ Tim Thành Sau Thực Thụ (Posterior MI)',
    badge: '🚨 ST Chênh Xuống Ngang V1-V3, R Cao',
    badgeColor: '#dc2626',
    category: 'ischemia',
    description: 'ST chênh xuống nằm ngang ở V1-V3, sóng R cao (R/S > 1 ở V2), T thẳng đứng. Hình ảnh soi gương của ST chênh lên thành sau (V7-V9).',
    values: {
      heartRate: 88, rhythmType: 'sinus', lead1Net: 6, avfNet: 8, prInterval: 165, qrsDuration: 90, qtInterval: 405,
      stI: 0, stII: 1.0, stIII: 1.5, staVR: 0, staVL: 0, staVF: 1.0,
      stV1: -2.5, stV2: -3.5, stV3: -3.0, stV4: -1.0, stV5: 0, stV6: 0, stV7V9: 1.5,
      tWaveType: 'normal', sv1: 4, rv5: 18, raVL: 6, sv3: 5, gender: 'male'
    }
  },
  {
    id: 'lbbb_modified_sgarbossa',
    name: '8. LBBB Kèm Modified Smith-Sgarbossa (+)',
    badge: '🚨 NMCT Cấp Tắc Mạch Trên Nền LBBB',
    badgeColor: '#dc2626',
    category: 'ischemia',
    description: 'LBBB hoàn toàn (QRS 150ms). Tỷ lệ ST chênh lên ngược hướng / S sâu = 6mm / 20mm = 0.30 ≥ 0.25 (Modified Sgarbossa dương tính 91% Sp).',
    values: {
      heartRate: 92, rhythmType: 'sinus', lead1Net: 14, avfNet: -6, prInterval: 180, qrsDuration: 150, qtInterval: 470,
      hasLbbb: true, sgarbossaDiscordantSte: 6.0, sgarbossaPrecedingS: 20.0,
      stI: 1.5, stII: 0, stIII: 0, staVR: -1.0, staVL: 1.5, staVF: 0,
      stV1: 6.0, stV2: 5.5, stV3: 4.0, stV4: 0, stV5: -2.0, stV6: -2.0,
      sv1: 20, rv5: 22, raVL: 14, sv3: 18, gender: 'male'
    }
  },
  {
    id: 'wpw_type_a_left_free_wall',
    name: '9. Hội Chứng WPW Type A (Đường Phụ Thành Tự Do Trái)',
    badge: '⚡ Sóng Delta (+) V1, PR Ngắn',
    badgeColor: '#7c3aed',
    category: 'conduction',
    description: 'PR ngắn 95ms (< 120ms), sóng Delta dương ở tất cả các chuyển đạo trước tim V1-V6 (R cao ở V1). Vị trí đường phụ nằm ở thành tự do thất trái.',
    values: {
      heartRate: 78, rhythmType: 'sinus', lead1Net: 12, avfNet: 8, prInterval: 95, qrsDuration: 130, qtInterval: 410,
      hasDeltaWave: true, wpwDeltaI: 'pos', wpwDeltaAvf: 'pos', wpwDeltaV1: 'pos',
      sv1: 2, rv5: 24, raVL: 11, sv3: 4, gender: 'male'
    }
  },
  {
    id: 'wpw_type_b_right_sided',
    name: '10. Hội Chứng WPW Type B (Đường Phụ Thành Phải / Vách)',
    badge: '⚡ Sóng Delta (-) V1, QS Pattern',
    badgeColor: '#7c3aed',
    category: 'conduction',
    description: 'PR 100ms, sóng Delta âm ở V1, V2 tạo dạng QS giống LBBB. Vị trí cầu Kent nằm ở thành tự do thất phải hoặc vách trước.',
    values: {
      heartRate: 82, rhythmType: 'sinus', lead1Net: 10, avfNet: -4, prInterval: 100, qrsDuration: 135, qtInterval: 415,
      hasDeltaWave: true, wpwDeltaI: 'pos', wpwDeltaAvf: 'neg', wpwDeltaV1: 'neg',
      sv1: 18, rv5: 16, raVL: 10, sv3: 14, gender: 'female'
    }
  },
  {
    id: 'vt_monomorphic_av_dissoc',
    name: '11. Nhịp Nhanh Thất (VT) Kèm Phân Ly Nhĩ Thất',
    badge: '🚨 Cấp Cứu Loạn Nhịp QRS Rộng',
    badgeColor: '#b91c1c',
    category: 'arrhythmia',
    description: 'QRS 165ms, tần số 175 l/p, trục cực phải (-140°), có nhát bóp hỗn hợp (Fusion beat) và phân ly nhĩ thất rõ rệt (Brugada Step 3 +).',
    values: {
      heartRate: 175, rhythmType: 'vt', lead1Net: -10, avfNet: -12, prInterval: 0, qrsDuration: 165, qtInterval: 320,
      wctAvDissociation: true, wctVereckeiInitialR: true, wctVereckeiViVtLe1: true,
      sv1: 12, rv5: 10, raVL: -8, sv3: 10, gender: 'male'
    }
  },
  {
    id: 'afib_rvr',
    name: '12. Rung Nhĩ Đáp Ứng Thất Rất Nhanh (AFib with RVR)',
    badge: '⚡ Tần Số Thất > 150 l/p',
    badgeColor: '#f59e0b',
    category: 'arrhythmia',
    description: 'Mất sóng P hoàn toàn, thay bằng sóng lăn tăn f tần số 400-600 l/p, khoảng cách RR hoàn toàn không đều (Irregularly irregular).',
    values: {
      heartRate: 155, rhythmType: 'afib', lead1Net: 8, avfNet: 6, prInterval: 0, qrsDuration: 85, qtInterval: 310,
      sv1: 5, rv5: 14, raVL: 6, sv3: 6, gender: 'female'
    }
  },
  {
    id: 'complete_av_block_3rd',
    name: '13. Block Nhĩ Thất Độ III Hoàn Toàn (Third-Degree AVB)',
    badge: '🚨 Nhịp Thoát Bộ Nối Chậm 38 l/p',
    badgeColor: '#dc2626',
    category: 'conduction',
    description: 'Sóng P độc lập tần số 85 l/p, QRS độc lập tần số 38 l/p. Nhĩ và thất đập hoàn toàn không liên hệ nhau. Chỉ định đặt máy tạo nhịp.',
    values: {
      heartRate: 38, rhythmType: 'junctional', lead1Net: 6, avfNet: 7, prInterval: 0, qrsDuration: 95, qtInterval: 520,
      sv1: 6, rv5: 13, raVL: 5, sv3: 7, gender: 'male'
    }
  },
  {
    id: 'hyperkalemia_stage3_sine_wave',
    name: '14. Tăng Kali Máu Nặng Nguy Kịch (K+ = 8.4 mmol/L)',
    badge: '🚨 Đe Dọa Sóng Dạng Sin (Sine Wave)',
    badgeColor: '#7f1d1d',
    category: 'electrolyte',
    description: 'Mất hẳn sóng P, QRS giãn rộng 180ms hòa lẫn với sóng T nhọn khổng lồ tạo sóng hình Sin liên tục. Tiêm ngay Calcium Gluconate IV!',
    values: {
      heartRate: 60, rhythmType: 'sinus', lead1Net: 6, avfNet: 4, prInterval: 280, qrsDuration: 180, qtInterval: 480,
      tWaveType: 'peaked', hyperkalemiaStage: 3, sv1: 10, rv5: 12, raVL: 6, sv3: 9, gender: 'male'
    }
  },
  {
    id: 'hypokalemia_severe_u_wave',
    name: '15. Hạ Kali Máu Nặng (K+ = 2.0 mmol/L) Kèm Sóng U',
    badge: '⚠️ ST Chênh Xuống + Sóng U Khổng Lồ',
    badgeColor: '#ca8a04',
    category: 'electrolyte',
    description: 'Sóng T dẹt/âm, ST chênh xuống lan tỏa, xuất hiện sóng U nổi bật > 2mm ở V2-V4 kéo dài khoảng QU tạo cảm giác QTc kéo dài giả tạo.',
    values: {
      heartRate: 94, rhythmType: 'sinus', lead1Net: 7, avfNet: 5, prInterval: 180, qrsDuration: 90, qtInterval: 560,
      stI: -1.0, stII: -1.5, stIII: -1.0, staVR: 0.5, staVL: -0.5, staVF: -1.0,
      stV2: -1.5, stV3: -2.0, stV4: -1.5, stV5: -1.0, stV6: -0.5,
      hasUWave: true, tWaveType: 'flattened', sv1: 6, rv5: 14, raVL: 6, sv3: 8, gender: 'female'
    }
  },
  {
    id: 'brugada_syndrome_type1',
    name: '16. Hội Chứng Brugada Type 1 (Dạng Vòm Coved-Type)',
    badge: '🚨 Nguy Cơ Đột Tử Do Tim (SCD)',
    badgeColor: '#dc2626',
    category: 'channelopathy',
    description: 'ST chênh lên dạng vòm (Coved) ≥ 2.5mm ở V1, V2 tiếp nối sóng T âm đối xứng. Bệnh lý kênh Natri Nav1.5 (gen SCN5A).',
    values: {
      heartRate: 74, rhythmType: 'sinus', lead1Net: 8, avfNet: 4, prInterval: 170, qrsDuration: 105, qtInterval: 410,
      hasBrugadaPattern: 'type1', stV1: 3.5, stV2: 3.0, stV3: 1.0,
      sv1: 7, rv5: 16, raVL: 7, sv3: 8, gender: 'male'
    }
  },
  {
    id: 'lqts_congenital_type2',
    name: '17. Hội Chứng QT Dài Bẩm Sinh (LQT2 - Sóng T Chẻ Đôi)',
    badge: '🚨 QTc = 570 ms — Nguy Cơ Xoắn Đỉnh',
    badgeColor: '#7c3aed',
    category: 'channelopathy',
    description: 'Khoảng QTc kéo dài 570ms, sóng T biên độ thấp có khuyết chẻ đôi (Bifid/Notched T-wave) ở DII, V4-V6. Đột biến kênh K+ KCNH2.',
    values: {
      heartRate: 62, rhythmType: 'sinus', lead1Net: 7, avfNet: 5, prInterval: 165, qrsDuration: 95, qtInterval: 560,
      tWaveType: 'biphasic_wellens', sv1: 6, rv5: 15, raVL: 6, sv3: 8, gender: 'female'
    }
  },
  {
    id: 'lvh_peguero_strain',
    name: '18. Dày Thất Trái Tăng Gánh (Peguero-Lo Presti +)',
    badge: '🫀 Tăng Huyết Áp Mạn Tính Nặng',
    badgeColor: '#0284c7',
    category: 'hypertrophy',
    description: 'Tiêu chuẩn Peguero-Lo Presti (Deepest S = 22mm + SV4 = 18mm) = 40mm ≥ 28mm ở nam. Sóng RaVL = 15mm > 11mm. ST-T biến đổi tăng gánh.',
    values: {
      heartRate: 76, rhythmType: 'sinus', lead1Net: 15, avfNet: -5, prInterval: 180, qrsDuration: 110, qtInterval: 430,
      sv1: 22, rv5: 26, rv6: 22, raVL: 15, sv3: 20, sv4: 18, deepestS: 22,
      stV5: -1.5, stV6: -1.5, staVL: -1.0, tWaveType: 'inverted', gender: 'male'
    }
  },
  {
    id: 'pulmonary_embolism_s1q3t3',
    name: '19. Thuyên Tắc Phổi Cấp (McGinn-White S1Q3T3 + RV Strain)',
    badge: '🫁 Tăng Gánh Thất Phải Cấp Tính',
    badgeColor: '#e11d48',
    category: 'arrhythmia',
    description: 'Nhịp nhanh xoang 118 l/p, sóng S sâu ở DI, sóng Q bệnh lý ở DIII, T âm ở DIII (S1Q3T3), T âm đối xứng từ V1-V4 (RV strain).',
    values: {
      heartRate: 118, rhythmType: 'sinus', lead1Net: -4, avfNet: 12, prInterval: 140, qrsDuration: 95, qtInterval: 340,
      stIII: 1.0, stV1: 0.5, stV2: -1.0, stV3: -1.5, stV4: -1.0,
      tWaveType: 'inverted', sv1: 5, rv5: 11, raVL: -3, sv3: 6, gender: 'female'
    }
  },
  {
    id: 'digoxin_toxicity_salvador_dali',
    name: '20. Ngộ Độc Digoxin (ST Hình Đáy Chén Salvador Dalí)',
    badge: '💊 Hiệu Ứng Digoxin + Ngoại Tâm Thu Đôi',
    badgeColor: '#ca8a04',
    category: 'electrolyte',
    description: 'ST chênh xuống uốn cong mềm mại hình ria mép danh họa Salvador Dalí ở V4-V6, DI, aVL, PR kéo dài 230ms, khoảng QT ngắn lại.',
    values: {
      heartRate: 58, rhythmType: 'sinus', lead1Net: 8, avfNet: 5, prInterval: 230, qrsDuration: 88, qtInterval: 330,
      hasDigoxinSagging: true, stI: -1.5, stII: -1.5, staVL: -1.0, stV4: -2.0, stV5: -2.5, stV6: -2.0,
      sv1: 6, rv5: 15, raVL: 7, sv3: 8, gender: 'male'
    }
  },
  {
    id: 'hypothermia_osborn_j_wave',
    name: '21. Hạ Thân Nhiệt Nặng (Nhiệt Độ < 30°C — Sóng Osborn)',
    badge: '❄️ Sóng J / Osborn Khổng Lồ',
    badgeColor: '#0ea5e9',
    category: 'channelopathy',
    description: 'Nhịp chậm xoang 42 l/p, xuất hiện sóng vồng nhô lên tại chỗ nối QRS-ST (Sóng Osborn / J-wave) rõ nhất ở V3-V6 và DII, kèm nhiễu cơ do run.',
    values: {
      heartRate: 42, rhythmType: 'sinus', lead1Net: 6, avfNet: 6, prInterval: 210, qrsDuration: 125, qtInterval: 510,
      hasOsbornWave: true, stII: 2.0, stV3: 3.0, stV4: 3.5, stV5: 2.5, stV6: 2.0,
      sv1: 5, rv5: 14, raVL: 6, sv3: 7, gender: 'male'
    }
  },
  {
    id: 'rbbb_lafb_bifascicular',
    name: '22. Block Hai Phân Nhánh (RBBB + LAFB)',
    badge: '⚡ Nguy Cơ Tiến Triển Block AV Hoàn Toàn',
    badgeColor: '#f59e0b',
    category: 'conduction',
    description: 'Block nhánh phải hoàn toàn (dạng rsR\' ở V1, QRS 140ms) kết hợp Block phân nhánh trái trước (Trục lệch trái nặng -60°, dạng qR ở DI, aVL).',
    values: {
      heartRate: 75, rhythmType: 'sinus', lead1Net: 14, avfNet: -10, prInterval: 175, qrsDuration: 140, qtInterval: 430,
      sv1: 4, rv5: 12, raVL: 13, sv3: 8, gender: 'male'
    }
  }
];

/**
 * Thuật toán Phân tích Toàn diện Điện Tâm Đồ 12 Chuyển Đạo
 */
export function analyzeEcg(inputs: EcgInputs): EcgAnalysisResult {
  const {
    heartRate,
    rhythmType,
    lead1Net,
    avfNet,
    prInterval,
    qrsDuration = 90,
    qtInterval,
    sv1 = 0,
    rv5 = 0,
    rv6 = 0,
    raVL = 0,
    sv3 = 0,
    sv4 = 0,
    deepestS = 0,
    gender = 'male',
    stI = 0,
    stII = 0,
    stIII = 0,
    staVR = 0,
    staVL = 0,
    staVF = 0,
    stV1 = 0,
    stV2 = 0,
    stV3 = 0,
    stV4 = 0,
    stV5 = 0,
    stV6 = 0,
    stV4R = 0,
    stV7V9 = 0,
    tWaveType = 'normal',
    hasDeltaWave,
    wpwDeltaI,
    wpwDeltaAvf,
    wpwDeltaV1,
    hasOsbornWave,
    hasBrugadaPattern,
    hasDigoxinSagging,
    hasUWave,
    hyperkalemiaStage = 0,
    hasLbbb,
    hasPacedRhythm,
    sgarbossaConcordantStElevation,
    sgarbossaConcordantStDepressionV1V3,
    sgarbossaDiscordantSte = 0,
    sgarbossaPrecedingS = 0,
    wctRsAbsentAllPrecordial,
    wctRsLongestOver100ms,
    wctAvDissociation,
    wctMorphologyCriteriaMet,
    wctVereckeiInitialR,
    wctVereckeiViVtLe1,
  } = inputs;

  const recommendations: string[] = [];
  const emergencyFlags: string[] = [];
  const metabolicFindings: string[] = [];
  const stemiEquivalents: string[] = [];

  // 1. Tần Số & Phân Loại Nhịp
  let heartRateCategory = '';
  if (heartRate < 50) {
    heartRateCategory = 'Nhịp chậm nặng (< 50 l/p)';
    if (heartRate < 40) emergencyFlags.push('🚨 Nhịp chậm nguy hiểm: Chuẩn bị máy tạo nhịp qua da (Transcutaneous pacing) / Atropine.');
  } else if (heartRate < 60) {
    heartRateCategory = 'Nhịp chậm xoang (50 - 59 l/p)';
  } else if (heartRate <= 100) {
    heartRateCategory = 'Tần số tim bình thường (60 - 100 l/p)';
  } else if (heartRate <= 150) {
    heartRateCategory = 'Nhịp nhanh (101 - 150 l/p)';
  } else {
    heartRateCategory = 'Nhịp nhanh kịch phát (> 150 l/p)';
    emergencyFlags.push('⚠️ Tần số thất rất nhanh (> 150 l/p): Đánh giá huyết động học ngay (Huyết áp, tri giác, đau ngực, suy tim cấp).');
  }

  // 2. Trục Điện Tim Cabrera (Hexaxial Coordinate)
  const rad = Math.atan2(avfNet, lead1Net);
  let deg = Math.round(rad * (180 / Math.PI));
  let axisClassification = '';
  let axisColor = '#10b981';
  const axisEtiologies: string[] = [];

  if (deg >= -30 && deg <= 90) {
    axisClassification = 'Trục Trung Tính (Normal Axis)';
    axisColor = '#10b981';
    axisEtiologies.push('Sinh lý bình thường ở người trưởng thành');
  } else if (deg < -30 && deg >= -90) {
    axisClassification = 'Trục Lệch Trái (Left Axis Deviation - LAD)';
    axisColor = '#f59e0b';
    axisEtiologies.push('Block phân nhánh trái trước (LAFB)', 'Dày thất trái (LVH)', 'Nhồi máu cơ tim cũ thành dưới', 'Hội chứng WPW');
    recommendations.push('Trục lệch trái: Kiểm tra tiêu chuẩn LAFB (dạng qR ở DI, aVL và rS ở DII, DIII, aVF) và Dày thất trái.');
  } else if (deg > 90 && deg <= 180) {
    axisClassification = 'Trục Lệch Phải (Right Axis Deviation - RAD)';
    axisColor = '#ef4444';
    axisEtiologies.push('Dày thất phải (RVH)', 'Thuyên tắc phổi cấp (PE)', 'Bệnh phổi tắc nghẽn mạn (COPD/Tâm phế mạn)', 'Block phân nhánh trái sau (LPFB)');
    recommendations.push('Trục lệch phải: Tìm dấu hiệu quá tải áp lực thất phải hoặc bệnh lý phế quản phổi.');
  } else {
    axisClassification = 'Trục Vô Định / Cực Phải (Extreme / Northwest Axis)';
    axisColor = '#8b5cf6';
    axisEtiologies.push('Nhịp nhanh thất (VT)', 'Khí phế thũng nặng', 'Tăng Kali máu nặng', 'Đặt nhầm đảo ngược điện cực chi');
    recommendations.push('Trục vô định (-90° đến ±180°): Nghĩ nhiều đến nguồn gốc từ thất (VT) hoặc đặt sai điện cực.');
  }

  // 3. Đo Đạc QTc Qua 4 Công Thức Quốc Tế
  let qtcBazett: number | null = null;
  let qtcFridericia: number | null = null;
  let qtcFramingham: number | null = null;
  let qtcHodges: number | null = null;
  let qtcInterpretation: string | null = null;
  let qtcSeverity: 'normal' | 'borderline' | 'prolonged' | 'critical' | 'short' = 'normal';

  if (qtInterval && heartRate > 0) {
    const rrSec = 60 / heartRate;
    qtcBazett = Math.round(qtInterval / Math.sqrt(rrSec));
    qtcFridericia = Math.round(qtInterval / Math.cbrt(rrSec));
    qtcFramingham = Math.round(qtInterval + 0.154 * (1 - rrSec) * 1000);
    qtcHodges = Math.round(qtInterval + 1.75 * (heartRate - 60));

    const cutoffProlonged = gender === 'male' ? 450 : 460;
    const cutoffCritical = 500;

    if (qtcBazett >= cutoffCritical) {
      qtcSeverity = 'critical';
      qtcInterpretation = `🚨 BÁO ĐỘNG ĐỎ: QTc KÉO DÀI NGUY KỊCH (${qtcBazett} ms Bazett / ${qtcFridericia} ms Fridericia) ➔ Nguy cơ rất cao xảy ra Loạn nhịp Xoắn đỉnh (Torsades de Pointes) và Rung thất!`;
      emergencyFlags.push('🚨 QTc > 500ms: Rà soát & ngừng ngay toàn bộ thuốc kéo dài QT (Kháng sinh Macrolide, Quinolone, Chống nôn, Thuốc chống loạn nhịp nhóm IA/III).');
      recommendations.push('Đo khẩn điện giải: Kali (mục tiêu > 4.5 mmol/L), Magie (mục tiêu > 2.0 mg/dL). Chuẩn bị sẵn Magie Sulfat 2g IV.');
    } else if (qtcBazett >= cutoffProlonged) {
      qtcSeverity = 'prolonged';
      qtcInterpretation = `QTc Kéo dài (${qtcBazett} ms Bazett / ${qtcFridericia} ms Fridericia > ${cutoffProlonged} ms)`;
      recommendations.push('Theo dõi sát khoảng QT nối tiếp và kiểm tra nồng độ điện giải đồ.');
    } else if (qtcBazett < 340) {
      qtcSeverity = 'short';
      qtcInterpretation = `Hội chứng QT Ngắn (${qtcBazett} ms < 340 ms) — Nguy cơ rung nhĩ và rung thất kịch phát.`;
    } else {
      qtcSeverity = 'normal';
      qtcInterpretation = `Khoảng QTc trong giới hạn bình thường (${qtcBazett} ms Bazett | ${qtcFridericia} ms Fridericia).`;
    }
  }

  // 4. Ma Trận Đánh Giá Dày Buồng Tim Toàn Diện (LVH, RVH, Atrial)
  const pegueroVal = deepestS + sv4;
  const pegueroCutoff = gender === 'male' ? 28 : 23;
  const pegueroPositive = pegueroVal >= pegueroCutoff;

  const sokolowVal = sv1 + Math.max(rv5, rv6);
  const sokolowPositive = sokolowVal >= 35;

  const cornellVal = raVL + sv3;
  const cornellCutoff = gender === 'male' ? 28 : 20;
  const cornellPositive = cornellVal >= cornellCutoff;

  let romhiltScore = 0;
  if (raVL >= 11 || sokolowPositive || cornellPositive) romhiltScore += 3;
  if (inputs.stV5 && inputs.stV5 < -0.5) romhiltScore += 3; // Strain pattern
  if (deg < -30) romhiltScore += 2; // LAD
  if (qrsDuration >= 90) romhiltScore += 1;
  const romhiltPositive = romhiltScore >= 5;

  let lvhStatus: string | null = null;
  if (pegueroPositive || sokolowPositive || cornellPositive || romhiltPositive) {
    const matchedCriteria: string[] = [];
    if (pegueroPositive) matchedCriteria.push(`Peguero-Lo Presti (${pegueroVal}mm ≥ ${pegueroCutoff}mm)`);
    if (sokolowPositive) matchedCriteria.push(`Sokolow-Lyon (${sokolowVal}mm ≥ 35mm)`);
    if (cornellPositive) matchedCriteria.push(`Cornell (${cornellVal}mm ≥ ${cornellCutoff}mm)`);
    if (raVL > 11) matchedCriteria.push(`RaVL (${raVL}mm > 11mm)`);
    lvhStatus = `Dày Thất Trái (LVH) xác định bởi: ${matchedCriteria.join('; ')}`;
  } else {
    lvhStatus = 'Chưa đủ tiêu chuẩn điện thế dày thất trái';
  }

  let rvhStatus: string | null = null;
  if ((sv1 <= 2 && rv5 <= 10 && deg > 90) || (inputs.stV1 && inputs.stV1 > 1 && deg > 90)) {
    rvhStatus = 'Nghi ngờ Dày Thất Phải (RVH) / Quá tải thất phải (Trục lệch phải + Dạng sóng trước tim phải)';
  }

  let atrialEnlargementStatus: string | null = null;
  if (inputs.pWaveDuration && inputs.pWaveDuration >= 120) {
    atrialEnlargementStatus = 'Dày Nhĩ Trái (P mitrale: Độ rộng sóng P ≥ 120ms)';
  } else if (inputs.pWaveAmpLead2 && inputs.pWaveAmpLead2 >= 2.5) {
    atrialEnlargementStatus = 'Dày Nhĩ Phải (P pulmonale: Biên độ sóng P ở DII ≥ 2.5mm)';
  }

  // 5. Chẩn Đoán Nhồi Máu Cơ Tim Cấp (STEMI & OMI Equivalents)
  let stemiTerritory: string | null = null;
  let culpritArtery: 'LAD' | 'LCx' | 'RCA' | 'LMCA' | 'NONE' | 'MULTI' = 'NONE';
  let culpritDescription = 'Không có dấu hiệu tắc nghẽn động mạch vành cấp tính rõ rệt.';

  const hasAnteriorSte = (stV1 >= 1.5 || stV2 >= 2.0 || stV3 >= 2.0 || stV4 >= 1.0);
  const hasLateralSte = (stI >= 1.0 || staVL >= 1.0 || stV5 >= 1.0 || stV6 >= 1.0);
  const hasInferiorSte = (stII >= 1.0 || stIII >= 1.0 || staVF >= 1.0);

  if (hasAnteriorSte && hasLateralSte) {
    stemiTerritory = 'STEMI Thành Trước Rộng (Extensive Anterior STEMI: V1-V6, DI, aVL)';
    culpritArtery = 'LAD';
    culpritDescription = 'Tắc thân chung nhánh Liên Thất Trước (Proximal LAD trước D1/S1) ➔ Nguy cơ sốc tim và rối loạn dẫn truyền cao.';
    emergencyFlags.push('🚨 KÍCH HOẠT CATHLAB KHẨN: STEMI Trước Rộng ➔ Mục tiêu Door-to-Balloon < 90 phút.');
  } else if (hasAnteriorSte) {
    stemiTerritory = 'STEMI Thành Trước Vách (Anteroseptal STEMI: V1-V4)';
    culpritArtery = 'LAD';
    culpritDescription = 'Tắc nhánh Động mạch Liên Thất Trước (LAD đoạn giữa).';
    emergencyFlags.push('🚨 KÍCH HOẠT CATHLAB: STEMI Trước Vách.');
  } else if (hasInferiorSte) {
    const isRca = stIII > stII;
    culpritArtery = isRca ? 'RCA' : 'LCx';
    if (stV4R >= 1.0) {
      stemiTerritory = 'STEMI Thành Dưới Kèm Nhồi Máu Thất Phải (Inferior-RV STEMI)';
      culpritDescription = 'Tắc Động mạch Vành Phải (RCA đoạn gần) gây nhồi máu cơ tim thất phải kèm theo.';
      emergencyFlags.push('⚠️ CHỐNG CHỈ ĐỊNH DÙNG NITRATE & MORPHINE: Nguy cơ tụt huyết áp trụy mạch dữ dội do giảm tiền tải thất phải. Bù dịch NaCl 0.9% nâng huyết áp.');
    } else {
      stemiTerritory = 'STEMI Thành Dưới (Inferior STEMI: DII, DIII, aVF)';
      culpritDescription = isRca ? 'Tắc Động Mạch Vành Phải (RCA - 85% trường hợp).' : 'Tắc Nhánh Mũ Động Mạch Vành Trái (LCx).';
      emergencyFlags.push('🚨 KÍCH HOẠT CATHLAB: STEMI Thành Dưới.');
    }
  } else if (hasLateralSte) {
    stemiTerritory = 'STEMI Thành Bên Cao (High Lateral STEMI: DI, aVL)';
    culpritArtery = 'LCx';
    culpritDescription = 'Tắc Nhánh Mũ (LCx) hoặc Nhánh Chéo (Diagonal LAD branch).';
  }

  // Phân tích các dạng STEMI tương đương (OMI Equivalents)
  if (tWaveType === 'biphasic_wellens') {
    stemiEquivalents.push('🚨 Hội chứng Wellens Type A: Sóng T hai pha ở V2-V3 ➔ Cảnh báo hẹp rất nặng (>90%) đoạn gần LAD. Tuyệt đối KHÔNG làm nghiệm pháp gắng sức!');
    culpritArtery = 'LAD';
  } else if (tWaveType === 'inverted' && stV2 <= -0.5 && stV3 <= -0.5 && stemiTerritory === null) {
    stemiEquivalents.push('🚨 Hội chứng Wellens Type B: Sóng T âm sâu đối xứng ở V2-V4 ➔ Hẹp nặng LAD cần chụp mạch vành can thiệp sớm.');
    culpritArtery = 'LAD';
  }

  if (tWaveType === 'de_winter') {
    stemiEquivalents.push('🚨 Dấu hiệu De Winter: ST chênh xuống tại điểm J nối tiếp sóng T cao nhọn đối xứng V1-V4 ➔ Tắc cấp tính hoàn toàn thân LAD (Chỉ định can thiệp như STEMI).');
    culpritArtery = 'LAD';
    emergencyFlags.push('🚨 DE WINTER PATTERN: Kích hoạt Cathlab khẩn cấp như STEMI.');
  }

  if (staVR >= 1.0 && staVR > stV1 && (stV4 <= -1.0 || stV5 <= -1.0 || stI <= -1.0)) {
    stemiEquivalents.push('🚨 ST chênh lên ở aVR ≥ 1mm vượt trội V1 kèm ST chênh xuống lan tỏa ➔ Thiếu máu cơ tim do Hẹp Thân Chung (LMCA) hoặc Bệnh Ba Thân Mạch Vành (3-Vessel CAD).');
    culpritArtery = 'LMCA';
    emergencyFlags.push('🚨 TẮC THÂN CHUNG (LMCA): Huyết động không ổn định, hội chẩn phẫu thuật CABG / can thiệp khẩn.');
  }

  if (stV1 <= -2.0 && stV2 <= -2.5 && stV3 <= -2.0 && (stV7V9 >= 0.5 || inputs.rv5 > 15)) {
    stemiEquivalents.push('🚨 Nhồi máu cơ tim Thành Sau thực thụ (Posterior MI): ST chênh xuống nằm ngang ở V1-V3, sóng R ưu thế ➔ Đo ngay các chuyển đạo sau lưng V7-V9.');
    if (culpritArtery === 'NONE') culpritArtery = 'LCx';
  }

  // 6. Tiêu Chuẩn Sgarbossa & Modified Smith-Sgarbossa (LBBB / Pacing)
  let sgarbossaResult: EcgAnalysisResult['sgarbossaResult'] = null;
  if (hasLbbb || hasPacedRhythm || rhythmType === 'pacing') {
    let score = 0;
    if (sgarbossaConcordantStElevation) score += 5;
    if (sgarbossaConcordantStDepressionV1V3) score += 3;

    let stRatio: number | null = null;
    let isModPositive = false;
    if (sgarbossaDiscordantSte > 0 && sgarbossaPrecedingS > 0) {
      stRatio = parseFloat((sgarbossaDiscordantSte / sgarbossaPrecedingS).toFixed(2));
      if (stRatio >= 0.25) {
        isModPositive = true;
      }
    }

    let interpretation = '';
    if (score >= 3 || isModPositive) {
      interpretation = `🚨 SGARBOSSA / MODIFIED SGARBOSSA (+): Score = ${score}đ ${isModPositive ? `| ST/S ratio = ${stRatio} ≥ 0.25 (Modified +)` : ''} ➔ Độ đặc hiệu > 90% Nhồi máu cơ tim cấp có tắc mạch trên nền LBBB/Máy tạo nhịp!`;
      emergencyFlags.push('🚨 SGARBOSSA (+): Kích hoạt quy trình can thiệp mạch vành khẩn cấp (STEMI tương đương trên nền LBBB).');
    } else {
      interpretation = `Sgarbossa âm tính (Score = ${score}đ ${stRatio ? `| ST/S ratio = ${stRatio} < 0.25` : ''}) — Chưa đủ bằng chứng nhồi máu cơ tim cấp tắc mạch.`;
    }

    sgarbossaResult = {
      score,
      stOverSRatio: stRatio,
      isModifiedPositive: isModPositive,
      interpretation,
    };
  }

  // 7. Nhịp Nhanh QRS Rộng (WCT Differential Engine - Brugada & Vereckei)
  let wctResult: EcgAnalysisResult['wctResult'] = null;
  if (qrsDuration >= 120 && heartRate > 100) {
    let isVt = false;
    let brugadaStep = 'Không xác định';
    let vereckeiStep = 'Không xác định';

    if (wctRsAbsentAllPrecordial) {
      isVt = true;
      brugadaStep = 'Bước 1: Vắng mặt hoàn toàn phức bộ RS ở tất cả các chuyển đạo trước tim V1-V6 ➔ Chẩn đoán VT (Độ đặc hiệu 100%).';
    } else if (wctRsLongestOver100ms) {
      isVt = true;
      brugadaStep = 'Bước 2: Khoảng RS dài nhất > 100ms ở một chuyển đạo trước tim ➔ Chẩn đoán VT.';
    } else if (wctAvDissociation) {
      isVt = true;
      brugadaStep = 'Bước 3: Hiện diện Phân Ly Nhĩ Thất (AV Dissociation / Nhát bóp hỗn hợp Fusion/Capture) ➔ Khẳng định chắc chắn Nhịp Nhanh Thất (VT).';
    } else if (wctMorphologyCriteriaMet) {
      isVt = true;
      brugadaStep = 'Bước 4: Thỏa mãn tiêu chuẩn hình thái dạng LBBB hoặc RBBB của VT.';
    }

    if (wctVereckeiInitialR) {
      isVt = true;
      vereckeiStep = 'Bước 1: Có sóng R ban đầu đơn độc ở chuyển đạo aVR ➔ Khẳng định VT.';
    } else if (wctVereckeiViVtLe1) {
      isVt = true;
      vereckeiStep = 'Bước 4: Tỷ lệ vận tốc dẫn truyền đầu/cuối sóng QRS ở aVR (Vi/Vt) ≤ 1 ➔ Chẩn đoán VT.';
    }

    wctResult = {
      isVtProbable: isVt,
      brugadaStep,
      vereckeiStep,
      certainty: isVt ? 'Xác suất Nhịp Nhanh Thất (VT) > 95%' : 'Nghiêng về SVT Dẫn Truyền Lệch Hướng (Aberrancy)',
    };

    if (isVt) {
      emergencyFlags.push('🚨 WCT LÀ VT CHO ĐẾN KHI CÓ BẰNG CHỨNG NGƯỢC LẠI: Chuẩn bị sốc điện đồng bộ nếu huyết động không ổn định hoặc Amiodarone 150mg IV.');
    }
  }

  // 8. Định Vị Đường Phụ Hội Chứng WPW (Arruda Algorithm)
  let wpwLocalization: EcgAnalysisResult['wpwLocalization'] = null;
  if (hasDeltaWave) {
    let loc = '';
    let approach = '';
    if (wpwDeltaV1 === 'pos') {
      if (wpwDeltaAvf === 'pos') {
        loc = 'Đường phụ Thành Tự Do Trái Trước (Left Anterior Free Wall)';
        approach = 'Tiếp cận qua động mạch chủ hoặc xuyên vách liên nhĩ vào thất trái.';
      } else {
        loc = 'Đường phụ Thành Tự Do Trái Sau (Left Posterior Free Wall)';
        approach = 'Triệt đốt qua đường ống thông buồng tim trái.';
      }
    } else {
      if (wpwDeltaAvf === 'neg') {
        loc = 'Đường phụ Vách Sau (Posteroseptal Pathway)';
        approach = 'Tiếp cận xoang vành hoặc đáy vách liên thất.';
      } else {
        loc = 'Đường phụ Thành Tự Do Phải (Right Free Wall)';
        approach = 'Triệt đốt buồng tim phải qua tĩnh mạch đùi.';
      }
    }
    wpwLocalization = { pathwayLocation: loc, ablationApproach: approach };
  }

  // 9. Rối Loạn Điện Giải & Độc Chất
  if (hyperkalemiaStage > 0) {
    const stageMap: Record<number, string> = {
      1: 'Tăng Kali Giai Đoạn 1 (K+ ~ 5.5 - 6.5 mmol/L): Sóng T cao nhọn đối xứng, đáy hẹp.',
      2: 'Tăng Kali Giai Đoạn 2 (K+ ~ 6.5 - 7.5 mmol/L): Khoảng PR kéo dài, sóng P dẹt dần.',
      3: 'Tăng Kali Giai Đoạn 3 (K+ ~ 7.5 - 8.5 mmol/L): QRS giãn rộng hòa lẫn sóng T tạo sóng Dạng Sin (Sine Wave).',
      4: 'Tăng Kali Giai Đoạn 4 (K+ > 8.5 mmol/L): Nguy cơ Rung thất / Vô tâm thu tức thì.',
    };
    metabolicFindings.push(`🚨 ${stageMap[hyperkalemiaStage]}`);
    if (hyperkalemiaStage >= 2) {
      emergencyFlags.push('🚨 CẤP CỨU TĂNG KALI MÁU: Tiêm tĩnh mạch ngay Calcium Gluconate 10% (10-20ml trong 5-10 phút) để ổn định màng tế bào cơ tim.');
      recommendations.push('Phác đồ hạ Kali khẩn cấp: Insulin nhanh 10 UI + Glucose 20% 100ml truyền TM, Khí dung Salbutamol 10-20mg, Lọc máu cấp cứu nếu toan máu nặng.');
    }
  }

  if (hasUWave) {
    metabolicFindings.push('⚠️ Hạ Kali Máu (Hypokalemia): Xuất hiện sóng U > 1mm nổi bật ở chuyển đạo trước tim, ST chênh xuống nhẹ.');
    recommendations.push('Bù Kali tĩnh mạch qua đường truyền trung tâm (tối đa 20-40 mEq/giờ có monitoring tim liên tục).');
  }

  if (hasDigoxinSagging) {
    metabolicFindings.push('💊 Dấu Hiệu Ngấm Digoxin: Đoạn ST chênh xuống cong lõm hình đáy chén (Salvador Dalí mustache sign).');
  }

  if (hasOsbornWave) {
    metabolicFindings.push('❄️ Hạ Thân Nhiệt (Hypothermia): Sóng Osborn (J-wave) vồng lên tại điểm nối QRS-ST.');
    recommendations.push('Ủ ấm tích cực cho bệnh nhân, kiểm tra khí máu động mạch hiệu chỉnh theo nhiệt độ.');
  }

  if (hasBrugadaPattern && hasBrugadaPattern !== 'none') {
    metabolicFindings.push(`🚨 Hội Chứng Brugada ${hasBrugadaPattern === 'type1' ? 'Type 1 (Dạng Vòm Coved-type ≥ 2mm)' : 'Type 2 (Dạng Yên Ngựa Saddleback)'} ở V1-V2.`);
    recommendations.push('Tránh các thuốc chống chỉ định trong Brugada (Flecainide, Procainamide, Thuốc mê nhóm Propofol), hạ sốt tích cực, hội chẩn cấy máy khử rung tự động (ICD).');
  }

  // 10. Tổng Hợp Báo Cáo EBM & Kết Luận
  let summary = `[BÁO CÁO ĐIỆN TÂM ĐỒ 12 CHUYỂN ĐẠO CHUYÊN SÂU — DOCSPACE ECG STUDIO PRO]\n`;
  summary += `1. TẦN SỐ & NHỊP: ${rhythmType.toUpperCase()} | Tần số thất: ${heartRate} l/p (${heartRateCategory})\n`;
  summary += `2. TRỤC ĐIỆN TIM: Góc α = ${deg > 0 ? `+${deg}` : deg}° (${axisClassification})\n`;
  if (prInterval) summary += `3. KHOẢNG PR: ${prInterval} ms ${prInterval > 200 ? '(Block AV độ I)' : prInterval < 120 ? '(PR ngắn - WPW/Tiền kích thích)' : ''}\n`;
  summary += `4. ĐỘ RỘNG QRS: ${qrsDuration} ms ${qrsDuration >= 120 ? '(QRS Giãn rộng)' : '(Bình thường)'}\n`;
  if (qtcBazett) summary += `5. KHOẢNG QTc: Bazett: ${qtcBazett} ms | Fridericia: ${qtcFridericia} ms | Framingham: ${qtcFramingham} ms | Hodges: ${qtcHodges} ms ➔ ${qtcInterpretation}\n`;
  if (lvhStatus) summary += `6. DÀY BUỒNG TIM: ${lvhStatus}\n`;
  if (stemiTerritory) summary += `7. THIẾU MÁU/NHỒI MÁU: ${stemiTerritory} (Mạch máu thủ phạm: ${culpritArtery} — ${culpritDescription})\n`;
  if (stemiEquivalents.length > 0) summary += `8. DẤU HIỆU OMI/STEMI TƯƠNG ĐƯƠNG:\n  • ${stemiEquivalents.join('\n  • ')}\n`;
  if (sgarbossaResult) summary += `9. SGARBOSSA / LBBB: ${sgarbossaResult.interpretation}\n`;
  if (wctResult) summary += `10. PHÂN BIỆT NHỊP NHANH QRS RỘNG: ${wctResult.certainty} (Brugada: ${wctResult.brugadaStep})\n`;
  if (wpwLocalization) summary += `11. ĐỊNH VỊ WPW: ${wpwLocalization.pathwayLocation} (${wpwLocalization.ablationApproach})\n`;
  if (metabolicFindings.length > 0) summary += `12. ĐIỆN GIẢI & ĐỘC CHẤT:\n  • ${metabolicFindings.join('\n  • ')}\n`;

  return {
    heartRateCategory,
    axisAngleDegree: deg,
    axisClassification,
    axisColor,
    axisEtiologies,
    qtcBazett,
    qtcFridericia,
    qtcFramingham,
    qtcHodges,
    qtcInterpretation,
    qtcSeverity,
    lvhStatus,
    lvhDetails: {
      pegueroLoPresti: { val: pegueroVal, positive: pegueroPositive, threshold: pegueroCutoff },
      sokolowLyon: { val: sokolowVal, positive: sokolowPositive, threshold: 35 },
      cornellVoltage: { val: cornellVal, positive: cornellPositive, threshold: cornellCutoff },
      romhiltEstes: { score: romhiltScore, positive: romhiltPositive },
    },
    rvhStatus,
    atrialEnlargementStatus,
    stemiTerritory,
    culpritArtery,
    culpritDescription,
    stemiEquivalents,
    sgarbossaResult,
    wctResult,
    wpwLocalization,
    metabolicFindings,
    emergencyFlags,
    clinicalSummary: summary,
    recommendations,
  };
}

/**
 * Render Vòng Tròn Trục Điện Tim Vector Cabrera 360° SVG
 */
export function renderEcgAxisSvg(deg: number): string {
  const size = 320;
  const center = size / 2;
  const r = 115;

  const rad = (deg * Math.PI) / 180;
  const arrowX = center + r * Math.cos(rad);
  const arrowY = center + r * Math.sin(rad);

  const getPt = (angleDeg: number, radius: number) => {
    const a = (angleDeg * Math.PI) / 180;
    return { x: center + radius * Math.cos(a), y: center + radius * Math.sin(a) };
  };

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${size} ${size}" width="100%" height="${size}" style="max-width:320px;">
      <defs>
        <marker id="axisArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
        </marker>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#ef4444" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Vùng màu Trục (Sectors) -->
      <!-- Normal Axis (-30 đến 90) -->
      <path d="M ${center} ${center} L ${getPt(-30, r).x} ${getPt(-30, r).y} A ${r} ${r} 0 0 1 ${getPt(90, r).x} ${getPt(90, r).y} Z" fill="rgba(16, 185, 129, 0.16)" stroke="#10b981" stroke-width="0.8" />

      <!-- Left Axis (-30 đến -90) -->
      <path d="M ${center} ${center} L ${getPt(-90, r).x} ${getPt(-90, r).y} A ${r} ${r} 0 0 1 ${getPt(-30, r).x} ${getPt(-30, r).y} Z" fill="rgba(245, 158, 11, 0.16)" stroke="#f59e0b" stroke-width="0.8" />

      <!-- Right Axis (90 đến 180) -->
      <path d="M ${center} ${center} L ${getPt(90, r).x} ${getPt(90, r).y} A ${r} ${r} 0 0 1 ${getPt(180, r).x} ${getPt(180, r).y} Z" fill="rgba(239, 68, 68, 0.16)" stroke="#ef4444" stroke-width="0.8" />

      <!-- Northwest Axis (-90 đến -180) -->
      <path d="M ${center} ${center} L ${getPt(180, r).x} ${getPt(180, r).y} A ${r} ${r} 0 0 1 ${getPt(-90, r).x} ${getPt(-90, r).y} Z" fill="rgba(139, 92, 246, 0.14)" stroke="#8b5cf6" stroke-width="0.8" />

      <!-- Vòng tròn ngoài & Trục tọa độ -->
      <circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="var(--color-border)" stroke-width="1.5" />
      <line x1="${center - r - 15}" y1="${center}" x2="${center + r + 15}" y2="${center}" stroke="var(--color-border)" stroke-width="1" />
      <line x1="${center}" y1="${center - r - 15}" x2="${center}" y2="${center + r + 15}" stroke="var(--color-border)" stroke-width="1" />

      <!-- Lead Labels Cabrera / Standard -->
      <text x="${center + r + 18}" y="${center + 4}" fill="var(--color-text)" font-size="9.5" font-weight="800">DI (0°)</text>
      <text x="${center - r - 22}" y="${center + 4}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">±180°</text>
      <text x="${center}" y="${center + r + 18}" fill="var(--color-text)" font-size="9.5" font-weight="800" text-anchor="middle">aVF (+90°)</text>
      <text x="${center}" y="${center - r - 8}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">-90° (aVR)</text>

      <!-- Oblique Lead Lines -->
      <line x1="${center}" y1="${center}" x2="${getPt(60, r).x}" y2="${getPt(60, r).y}" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="2,2" />
      <text x="${getPt(60, r + 12).x}" y="${getPt(60, r + 12).y}" fill="var(--color-text-muted)" font-size="8.5">DII (+60°)</text>

      <line x1="${center}" y1="${center}" x2="${getPt(-30, r).x}" y2="${getPt(-30, r).y}" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="2,2" />
      <text x="${getPt(-30, r + 14).x}" y="${getPt(-30, r + 14).y}" fill="var(--color-text-muted)" font-size="8.5">aVL (-30°)</text>

      <line x1="${center}" y1="${center}" x2="${getPt(120, r).x}" y2="${getPt(120, r).y}" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="2,2" />
      <text x="${getPt(120, r + 14).x}" y="${getPt(120, r + 14).y}" fill="var(--color-text-muted)" font-size="8.5">DIII (+120°)</text>

      <!-- Vector Mũi Tên Bệnh Nhân -->
      <line x1="${center}" y1="${center}" x2="${arrowX}" y2="${arrowY}" stroke="#ef4444" stroke-width="3.5" marker-end="url(#axisArrow)" />
      <circle cx="${center}" cy="${center}" r="12" fill="url(#centerGlow)" />
      <circle cx="${center}" cy="${center}" r="4.5" fill="#ef4444" stroke="#ffffff" stroke-width="1.5" />

      <!-- Góc hiển thị trung tâm -->
      <rect x="${center - 36}" y="${center - 40}" width="72" height="22" rx="5" fill="var(--color-surface)" stroke="#ef4444" stroke-width="1.5" />
      <text x="${center}" y="${center - 25}" fill="#ef4444" font-size="11.5" font-weight="800" text-anchor="middle">${deg > 0 ? `+${deg}` : deg}°</text>
    </svg>
  `;
}

/**
 * Render Sơ Đồ Cây Động Mạch Vành Giải Phẫu & Vùng Tổn Thương SVG (Coronary Tree Mapper)
 */
export function renderCoronaryArterySvg(culprit: 'LAD' | 'LCx' | 'RCA' | 'LMCA' | 'NONE' | 'MULTI'): string {
  const isLad = culprit === 'LAD' || culprit === 'LMCA' || culprit === 'MULTI';
  const isLcx = culprit === 'LCx' || culprit === 'LMCA' || culprit === 'MULTI';
  const isRca = culprit === 'RCA' || culprit === 'MULTI';
  const isLmca = culprit === 'LMCA';

  return `
    <svg viewBox="0 0 420 280" width="100%" height="240" style="background:var(--color-surface); border-radius:12px;">
      <defs>
        <radialGradient id="ladGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#ef4444" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="rcaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="lcxGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Khung viền tim giải phẫu đơn giản hóa -->
      <path d="M 210,50 C 270,10 370,60 370,140 C 370,200 280,240 210,265 C 140,240 50,200 50,140 C 50,60 150,10 210,50 Z" 
            fill="var(--color-bg)" stroke="var(--color-border)" stroke-width="2" />

      <!-- Gốc Động Mạch Chủ (Aortic Root) -->
      <ellipse cx="210" cy="55" rx="24" ry="12" fill="var(--color-surface)" stroke="var(--color-text-muted)" stroke-width="2" />
      <text x="210" y="40" fill="var(--color-text-muted)" font-size="9" font-weight="700" text-anchor="middle">Gốc ĐM Chủ (Aorta)</text>

      <!-- 1. Thân Chung ĐM Vành Trái (LMCA) -->
      <path d="M 225,58 Q 240,65 255,75" fill="none" stroke="${isLmca ? '#ef4444' : 'var(--color-text-muted)'}" stroke-width="${isLmca ? '6' : '3.5'}" stroke-linecap="round" />
      ${isLmca ? '<circle cx="240" cy="66" r="10" fill="url(#ladGlow)" /><text x="260" y="60" fill="#ef4444" font-size="10" font-weight="800">💥 LMCA TẮC CẤP</text>' : '<text x="250" y="65" fill="var(--color-text-muted)" font-size="8.5">LMCA</text>'}

      <!-- 2. Nhánh Liên Thất Trước (LAD) -->
      <path d="M 255,75 Q 245,130 215,190 Q 210,225 210,250" fill="none" stroke="${isLad ? '#dc2626' : '#94a3b8'}" stroke-width="${isLad ? '5' : '3'}" stroke-linecap="round" />
      <!-- Các nhánh chéo Diagonal (D1, D2) -->
      <path d="M 245,115 Q 275,135 295,155" fill="none" stroke="${isLad ? '#dc2626' : '#94a3b8'}" stroke-width="2" />
      <path d="M 230,160 Q 255,180 270,200" fill="none" stroke="${isLad ? '#dc2626' : '#94a3b8'}" stroke-width="1.8" />
      ${isLad ? '<circle cx="245" cy="115" r="12" fill="url(#ladGlow)" /><text x="280" y="115" fill="#dc2626" font-size="10" font-weight="800">LAD (Thủ phạm chính)</text>' : '<text x="265" y="125" fill="#64748b" font-size="8.5">LAD (Thành Trước)</text>'}

      <!-- 3. Nhánh Mũ (LCx) -->
      <path d="M 255,75 Q 315,90 340,140 Q 350,175 335,210" fill="none" stroke="${isLcx ? '#2563eb' : '#94a3b8'}" stroke-width="${isLcx ? '5' : '3'}" stroke-linecap="round" />
      <!-- Nhánh Bờ Marginal (OM1, OM2) -->
      <path d="M 310,105 Q 330,125 345,135" fill="none" stroke="${isLcx ? '#2563eb' : '#94a3b8'}" stroke-width="2" />
      ${isLcx ? '<circle cx="310" cy="105" r="12" fill="url(#lcxGlow)" /><text x="325" y="90" fill="#2563eb" font-size="10" font-weight="800">LCx (Thành Bên)</text>' : '<text x="325" y="90" fill="#64748b" font-size="8.5">LCx</text>'}

      <!-- 4. Động Mạch Vành Phải (RCA) -->
      <path d="M 195,58 Q 140,80 115,130 Q 100,180 135,225 Q 165,245 190,250" fill="none" stroke="${isRca ? '#ea580c' : '#94a3b8'}" stroke-width="${isRca ? '5' : '3'}" stroke-linecap="round" />
      <!-- Nhánh Thất Phải (RV Branch) & Nhánh Bờ Cấp (AM) -->
      <path d="M 125,110 Q 155,130 170,145" fill="none" stroke="${isRca ? '#ea580c' : '#94a3b8'}" stroke-width="2" />
      <path d="M 110,160 Q 140,175 160,185" fill="none" stroke="${isRca ? '#ea580c' : '#94a3b8'}" stroke-width="1.8" />
      ${isRca ? '<circle cx="125" cy="110" r="12" fill="url(#rcaGlow)" /><text x="55" y="115" fill="#ea580c" font-size="10" font-weight="800">RCA (Thành Dưới/RV)</text>' : '<text x="75" y="125" fill="#64748b" font-size="8.5">RCA</text>'}

      <!-- Chú thích Vùng Mạch Máu -->
      <g transform="translate(15, 240)">
        <rect width="180" height="32" rx="6" fill="var(--color-surface-offset, #f8fafc)" stroke="var(--color-border)" stroke-width="0.8" />
        <circle cx="12" cy="16" r="4" fill="${culprit === 'LAD' || culprit === 'LMCA' ? '#dc2626' : culprit === 'RCA' ? '#ea580c' : culprit === 'LCx' ? '#2563eb' : '#10b981'}" />
        <text x="24" y="19" fill="var(--color-text)" font-size="9" font-weight="700">Mạch Thủ Phạm: ${culprit === 'NONE' ? 'Chưa thấy tắc cấp' : culprit}</text>
      </g>
    </svg>
  `;
}

// ============================================================
// PAPER SETTINGS INTERFACE
// ============================================================
export interface EcgPaperSettings {
  speedMmPerSec: 12.5 | 25 | 50;   // Tốc độ giấy (mm/s)
  gainMmPerMv: 5 | 10 | 20;         // Độ khuếch đại (mm/mV)
  rhythmLead: string;                 // Lead rhythm strip (mặc định II)
}

export const DEFAULT_PAPER_SETTINGS: EcgPaperSettings = {
  speedMmPerSec: 25,
  gainMmPerMv: 10,
  rhythmLead: 'II',
};

// ============================================================
// PER-LEAD WAVEFORM GENERATOR (Vector Cardiography Model)
// ============================================================

/**
 * Tính biên độ (mm) của từng sóng theo từng chuyển đạo
 * dựa vào vector tim học (lead1Net / avfNet) và các thông số amplitude đặc biệt.
 */
function getLeadAmplitudes(lead: string, inputs: EcgInputs): {
  pAmp: number;       // Biên độ P (mm), âm = đảo
  pDur: number;       // Thời gian P (ms)
  qDepth: number;     // Độ sâu Q (mm)
  rHeight: number;    // Chiều cao R (mm)
  sDepth: number;     // Độ sâu S (mm)
  tAmp: number;       // Biên độ T (mm)
  stDev: number;      // ST chênh (mm)
  rPrimed: boolean;   // R' (thỏ hai bướu: RBBB, V1)
  qrsWide: boolean;   // QRS ≥ 120ms
} {
  const { lead1Net = 6, avfNet = 4, rv5 = 14, rv6 = 12, sv1 = 10, sv3 = 8 } = inputs;
  const qrsWide = (inputs.qrsDuration || 85) >= 120;
  const hasDelta = inputs.hasDeltaWave;
  const hasLbbb = inputs.hasLbbb;

  // ST chênh theo từng lead
  const stKey = `st${lead}` as keyof EcgInputs;
  const stDev = (inputs[stKey] as number | undefined) || 0;

  // Helper: tính biên độ từ vector DI/aVF
  const diAmp = lead1Net;
  const avfAmp = avfNet;
  const diiAmp = 0.5 * diAmp + 0.866 * avfAmp;
  const diiiAmp = -0.5 * diAmp + 0.866 * avfAmp;
  const avrAmp = -(diAmp + avfAmp) / 2;
  const avlAmp = (diAmp - avfAmp) / 2;
  const avfCalc = avfAmp;

  switch (lead) {
    case 'I':
      return { pAmp: diAmp > 0 ? 1.8 : -0.8, pDur: inputs.pWaveDuration || 90, qDepth: diAmp > 0 ? 1 : 0, rHeight: Math.max(0, diAmp * 1.2), sDepth: Math.max(0, diAmp < 0 ? Math.abs(diAmp) * 1.5 : 2), tAmp: diAmp > 0 ? 2.5 : -1.5, stDev, rPrimed: false, qrsWide };
    case 'II':
      return { pAmp: diiAmp > 0 ? 2.2 : -0.8, pDur: inputs.pWaveDuration || 90, qDepth: 0.5, rHeight: Math.max(2, diiAmp * 1.3), sDepth: 1.5, tAmp: diiAmp > 0 ? 3.5 : -1.5, stDev, rPrimed: false, qrsWide };
    case 'III':
      return { pAmp: diiiAmp > 0 ? 1.0 : -1.2, pDur: inputs.pWaveDuration || 90, qDepth: diiiAmp < 0 ? 2.5 : 0.5, rHeight: Math.max(0, diiiAmp * 1.1), sDepth: Math.max(0, diiiAmp < 0 ? Math.abs(diiiAmp) * 1.2 : 3), tAmp: diiiAmp > 0 ? 1.5 : -1.5, stDev, rPrimed: false, qrsWide };
    case 'aVR':
      return { pAmp: avrAmp < 0 ? -1.5 : 0.5, pDur: inputs.pWaveDuration || 90, qDepth: Math.max(0, -avrAmp * 0.8), rHeight: Math.max(0, avrAmp > 0 ? avrAmp * 1.0 : 0), sDepth: Math.max(0, -avrAmp * 1.2), tAmp: avrAmp < 0 ? -2.0 : 1.5, stDev: -(stDev) * 0.5, rPrimed: false, qrsWide };
    case 'aVL':
      return { pAmp: avlAmp > 0 ? 1.2 : -0.6, pDur: inputs.pWaveDuration || 90, qDepth: avlAmp < 0 ? 1.5 : 0.5, rHeight: Math.max(0, avlAmp * 1.4), sDepth: avlAmp < 0 ? 3 : 2, tAmp: avlAmp > 0 ? 2.0 : -1.5, stDev, rPrimed: false, qrsWide };
    case 'aVF':
      return { pAmp: avfCalc > 0 ? 1.8 : -0.8, pDur: inputs.pWaveDuration || 90, qDepth: 0.5, rHeight: Math.max(0, avfCalc * 1.3), sDepth: 2, tAmp: avfCalc > 0 ? 2.5 : -1.5, stDev, rPrimed: false, qrsWide };
    case 'V1': {
      // V1: rS pattern (r nhỏ, S sâu) — RBBB: rSR'
      const rH = hasLbbb ? 0.5 : 2;
      const sD = sv1 || 10;
      return { pAmp: -0.5, pDur: inputs.pWaveDuration || 90, qDepth: 0, rHeight: rH, sDepth: sD, tAmp: hasLbbb ? 2.5 : -1.5, stDev, rPrimed: !hasLbbb, qrsWide };
    }
    case 'V2': {
      const rH = hasLbbb ? 0.5 : 3;
      const sD = Math.max(sv1 || 10, (sv3 || 8));
      return { pAmp: 0.5, pDur: inputs.pWaveDuration || 90, qDepth: 0, rHeight: rH, sDepth: sD, tAmp: hasLbbb ? 3 : (inputs.tWaveType === 'biphasic_wellens' ? 0 : -1), stDev, rPrimed: !hasLbbb, qrsWide };
    }
    case 'V3': {
      const rH = ((sv3 || 8) + (rv5 || 14)) / 3.5;
      const sD = (sv3 || 8) * 0.7;
      return { pAmp: 1.0, pDur: inputs.pWaveDuration || 90, qDepth: 0, rHeight: rH, sDepth: sD, tAmp: 1.5, stDev, rPrimed: false, qrsWide };
    }
    case 'V4': {
      const rH = (rv5 || 14) * 0.85;
      const sD = (sv3 || 8) * 0.4;
      return { pAmp: 1.2, pDur: inputs.pWaveDuration || 90, qDepth: hasDelta ? 0 : 0.5, rHeight: rH, sDepth: sD, tAmp: 2.5, stDev, rPrimed: false, qrsWide };
    }
    case 'V5': {
      const rH = rv5 || 14;
      const sD = hasLbbb ? 2 : 1.5;
      return { pAmp: 1.2, pDur: inputs.pWaveDuration || 90, qDepth: hasDelta ? 0 : 1, rHeight: rH, sDepth: sD, tAmp: 3, stDev, rPrimed: false, qrsWide };
    }
    case 'V6': {
      const rH = (inputs.rv6 || 12);
      return { pAmp: 1.2, pDur: inputs.pWaveDuration || 90, qDepth: hasDelta ? 0 : 1.2, rHeight: rH, sDepth: 0.5, tAmp: 2.5, stDev, rPrimed: false, qrsWide };
    }
    case 'V4R':
      return { pAmp: -0.5, pDur: inputs.pWaveDuration || 90, qDepth: 0, rHeight: 1.5, sDepth: 3, tAmp: inputs.stV4R && inputs.stV4R > 0.5 ? 1.5 : -1, stDev: inputs.stV4R || 0, rPrimed: false, qrsWide };
    default:
      return { pAmp: 1, pDur: 90, qDepth: 0.5, rHeight: 8, sDepth: 2, tAmp: 2.5, stDev: 0, rPrimed: false, qrsWide };
  }
}

/**
 * Tạo SVG path data cho 1 nhịp tim (single beat) của 1 chuyển đạo.
 * Tọa độ tính trong không gian mm, rồi nhân với pxPerMm để ra pixels.
 */
function generateBeatPath(
  startX: number,
  baseY: number,
  rrMs: number,
  inputs: EcgInputs,
  lead: string,
  pxPerMm: number,
  gainMmPerMv: number
): string {
  const amp = getLeadAmplitudes(lead, inputs);
  const qrsDur = inputs.qrsDuration || 85;
  const prDur = inputs.prInterval || 160;
  const qtDur = inputs.qtInterval || 400;

  // px per ms: tại 25mm/s, 1ms = 0.625px/mm
  const msToX = (ms: number) => ms * 0.025 * pxPerMm * (25 / 25); // normalized to 25mm/s
  const mmToY = (mm: number) => -mm * gainMmPerMv / 10 * pxPerMm;  // 1mV = gainMmPerMv mm

  const x0 = startX;
  const pStart = x0 + msToX(20);
  const pEnd = x0 + msToX(20 + (amp.pDur));
  const qrsStart = x0 + msToX(prDur);
  const qEnd = qrsStart + msToX(qrsDur * 0.15);
  const rPeak = qrsStart + msToX(qrsDur * 0.35);
  const sPeak = qrsStart + msToX(qrsDur * 0.65);
  const jPoint = qrsStart + msToX(qrsDur);
  const tPeak = jPoint + msToX((qtDur - qrsDur) * 0.5);
  const tEnd = x0 + msToX(qtDur + prDur * 0.8);

  // ST amplitude at J-point
  const stY = baseY + mmToY(amp.stDev);

  // T-wave amplitude
  let tAmpCalc = amp.tAmp;
  const tType = inputs.tWaveType || 'normal';
  if (tType === 'inverted') tAmpCalc = -Math.abs(tAmpCalc);
  if (tType === 'peaked' || tType === 'hyperacute') tAmpCalc = Math.abs(tAmpCalc) * 1.8;
  if (tType === 'flattened') tAmpCalc = Math.abs(tAmpCalc) * 0.15;
  if (tType === 'de_winter') tAmpCalc = Math.abs(tAmpCalc) * 2.2;

  // Rhythm modifiers
  const isAfib = inputs.rhythmType === 'afib';
  const isVt = inputs.rhythmType === 'vt';
  const isPacing = inputs.rhythmType === 'pacing';
  const isDelta = inputs.hasDeltaWave;

  let d = `M ${x0},${baseY} `;

  // === Baseline before P ===
  d += `L ${pStart},${baseY} `;

  // === P wave ===
  if (!isAfib && (inputs.hyperkalemiaStage || 0) < 3 && !isVt) {
    const pMid = (pStart + pEnd) / 2;
    const pTop = baseY + mmToY(amp.pAmp);
    if (inputs.rhythmType === 'aflutter') {
      // Sawtooth flutter waves
      d += `L ${pMid},${baseY + mmToY(2.5)} L ${pEnd},${baseY + mmToY(-1)} L ${pEnd + msToX(50)},${baseY + mmToY(2.5)} L ${pEnd + msToX(100)},${baseY + mmToY(-1)} L ${qrsStart},${baseY} `;
    } else {
      d += `C ${pStart + msToX(20)},${pTop} ${pEnd - msToX(20)},${pTop} ${pEnd},${baseY} `;
    }
  } else if (isAfib) {
    // Irregular fine fibrillation baseline
    const steps = 8;
    const stepX = (qrsStart - pStart) / steps;
    for (let i = 0; i < steps; i++) {
      const noiseY = baseY + mmToY((Math.sin(i * 2.3) * 0.8));
      d += `L ${pStart + i * stepX},${noiseY} `;
    }
  }

  // === PR segment ===
  d += `L ${qrsStart},${baseY} `;

  // === QRS complex ===
  if (isPacing) {
    // Pacing spike + wide QRS
    d += `L ${qrsStart},${baseY + mmToY(-6)} L ${qrsStart + 2},${baseY + mmToY(-6)} L ${qrsStart + 2},${baseY} `;
    d += `L ${qEnd},${baseY + mmToY(2)} L ${rPeak},${baseY + mmToY(amp.rHeight * 0.7)} L ${sPeak},${baseY + mmToY(-amp.sDepth * 0.5)} L ${jPoint},${stY} `;
  } else if (isDelta) {
    // WPW delta wave — slurred upstroke
    const deltaEnd = qrsStart + msToX(40);
    d += `L ${deltaEnd},${baseY + mmToY(amp.rHeight * 0.4)} `;
    d += `L ${rPeak},${baseY + mmToY(amp.rHeight)} L ${sPeak},${baseY + mmToY(-amp.sDepth)} L ${jPoint},${stY} `;
  } else if (amp.rPrimed && !inputs.hasLbbb) {
    // RBBB-like: rSR' in V1 — r small, deep S, R' notch
    d += `L ${qEnd},${baseY + mmToY(-amp.qDepth)} `;
    d += `L ${qrsStart + msToX(15)},${baseY + mmToY(amp.rHeight)} `;
    d += `L ${sPeak},${baseY + mmToY(-amp.sDepth)} `;
    d += `L ${sPeak + msToX(15)},${baseY + mmToY(amp.rHeight * 0.6)} `;  // R'
    d += `L ${jPoint},${stY} `;
  } else {
    // Normal QRS / LBBB
    if (amp.qDepth > 0) {
      d += `L ${qEnd},${baseY + mmToY(-amp.qDepth)} `;
    }
    if (amp.rHeight > 0) {
      d += `L ${rPeak},${baseY + mmToY(amp.rHeight)} `;
    }
    if (amp.sDepth > 0) {
      d += `L ${sPeak},${baseY + mmToY(-amp.sDepth)} `;
    }
    d += `L ${jPoint},${stY} `;
  }

  // === ST segment ===
  d += `L ${tPeak - msToX(40)},${stY} `;

  // === T wave ===
  if (tType === 'biphasic_wellens') {
    // Wellens: short positive hump then deep negative
    d += `C ${tPeak - msToX(30)},${baseY + mmToY(tAmpCalc * 0.5)} ${tPeak},${baseY + mmToY(tAmpCalc * 0.5)} ${tPeak},${baseY} `;
    d += `C ${tPeak + msToX(20)},${baseY + mmToY(-tAmpCalc * 1.5)} ${tEnd - msToX(20)},${baseY + mmToY(-tAmpCalc * 1.5)} ${tEnd},${baseY} `;
  } else if (tType === 'de_winter') {
    // De Winter: upsloping ST depression into tall peaked T
    d += `C ${tPeak - msToX(30)},${baseY + mmToY(-2)} ${tPeak},${baseY + mmToY(tAmpCalc)} ${tEnd},${baseY} `;
  } else {
    // Normal / inverted / peaked / flat
    d += `C ${tPeak - msToX(20)},${baseY + mmToY(tAmpCalc * 1.1)} ${tPeak + msToX(20)},${baseY + mmToY(tAmpCalc * 1.1)} ${tEnd},${baseY} `;
  }

  // === Osborn wave (hypothermia) ===
  if (inputs.hasOsbornWave) {
    d += `L ${tEnd + msToX(20)},${baseY + mmToY(5)} L ${tEnd + msToX(50)},${baseY} `;
  }

  // === U wave (hypokalemia) ===
  if (inputs.hasUWave) {
    const uMid = tEnd + msToX(80);
    d += `C ${tEnd + msToX(40)},${baseY + mmToY(1.2)} ${uMid},${baseY + mmToY(1.5)} ${uMid + msToX(40)},${baseY} `;
  }

  // Baseline to next beat
  d += `L ${x0 + msToX(rrMs)},${baseY} `;

  return d;
}

/**
 * Render 1 strip của 1 chuyển đạo (nhiều nhịp) trong khung SVG con.
 * px / ms được tính từ paper settings.
 */
function renderLeadStrip(
  lead: string,
  inputs: EcgInputs,
  settings: EcgPaperSettings,
  stripWidthPx: number,
  stripHeightPx: number,
  traceStroke: string,
  showLabel = true,
  showCalPulse = true
): string {
  const { speedMmPerSec, gainMmPerMv } = settings;
  // At 25mm/s: 1mm = 1px in our coordinate system baseline
  // We normalize to 1px = 1mm of paper
  const pxPerMm = stripWidthPx / (speedMmPerSec * (stripWidthPx / 250)); // stretch proportionally
  // Actually: strip shows N seconds of ECG
  // At 25mm/s, stripWidth covers stripWidth/25 seconds
  const secsVisible = stripWidthPx / (speedMmPerSec * (pxPerMm > 0 ? pxPerMm : 1));

  // Simpler: use fixed px-per-mm derived from width
  // pxPerMm = stripWidthPx / (speedMmPerSec * visibleSecs)
  // For 25mm/s, 250px wide → visibleSecs = 250/(25*px/mm) → assume 1px=1mm → 10s strip
  // Use scale: 1 small box (1mm) = 2.5px at standard (250px / 100 boxes per 10s at 25mm/s)
  const boxPx = stripWidthPx / (speedMmPerSec * 4); // 4 seconds per strip in standard 3-column layout
  const pxPerMs = boxPx / 40; // 1 small box = 40ms at 25mm/s; scale with speed

  const hr = inputs.heartRate || 75;
  const rrMs = (60 / hr) * 1000;
  const rrPx = rrMs * pxPerMs;

  const baseY = stripHeightPx / 2;
  const numBeats = Math.ceil(stripWidthPx / rrPx) + 1;

  // Scale gain: standard = 10mm/mV → gainMmPerMv/10 * pxPerMm
  const mmPx = boxPx; // 1 small box = boxPx pixels = 1mm

  let pathData = `M 0,${baseY} `;
  let calOffset = showCalPulse ? 30 : 0;

  if (showCalPulse) {
    // 1mV calibration pulse (10mm tall at current gain)
    const calH = mmPx * gainMmPerMv;
    pathData += `L ${5},${baseY} L ${5},${baseY - calH} L ${20},${baseY - calH} L ${20},${baseY} L ${calOffset},${baseY} `;
  }

  for (let b = 0; b < numBeats; b++) {
    const startX = calOffset + b * rrPx;
    if (startX > stripWidthPx + rrPx) break;
    pathData += generateBeatPath(startX, baseY, rrMs, inputs, lead, mmPx, gainMmPerMv);
  }

  const labelText = lead.replace('aV', 'a') === 'aVR' ? 'aVR' : lead;

  return `
    <path d="${pathData}" fill="none" stroke="${traceStroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
    ${showLabel ? `
    <rect x="4" y="4" width="${labelText.length * 7 + 6}" height="16" rx="3" fill="rgba(0,0,0,0.55)" />
    <text x="7" y="15.5" fill="#ffffff" font-size="10" font-weight="800" font-family="'Inter', monospace">${labelText}</text>
    ` : ''}
  `;
}

/**
 * === MAIN FUNCTION: render12LeadEcgPaper ===
 * 
 * Renders a full 12-lead ECG in standard Cabrera layout:
 *   Row 1: I   | aVR | V1 | V4
 *   Row 2: II  | aVL | V2 | V5
 *   Row 3: III | aVF | V3 | V6
 *   Row 4: Rhythm strip (full width, selected lead)
 * 
 * With real ECG paper grid (1mm small, 5mm large boxes).
 */
export function render12LeadEcgPaper(
  inputs: EcgInputs,
  settings: EcgPaperSettings = DEFAULT_PAPER_SETTINGS,
  theme: 'paper' | 'neon' | 'dark' = 'paper'
): string {
  // === RESPONSIVE DIMENSIONS ===
  // Total canvas: 860px wide (standard) × 520px tall
  // 4 columns of leads (each 215px wide), 3 rows + 1 rhythm strip
  const totalW = 860;
  const colW = totalW / 4;       // 215px per lead column
  const rowH = 110;               // Height of each lead row (3 lead rows)
  const rhythmH = 100;            // Rhythm strip height
  const topPad = 28;             // Header row height
  const totalH = topPad + rowH * 3 + rhythmH + 8;

  // === THEME COLORS ===
  let bgFill = '#fff5f5';
  let gridSmall = 'rgba(252, 165, 165, 0.7)';
  let gridLarge = 'rgba(239, 68, 68, 0.65)';
  let traceColor = '#111827';
  let textColor = '#1e3a5f';
  let headerBg = 'rgba(239, 68, 68, 0.06)';
  let dividerColor = 'rgba(239, 68, 68, 0.25)';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridSmall = 'rgba(16, 185, 129, 0.12)';
    gridLarge = 'rgba(16, 185, 129, 0.35)';
    traceColor = '#10b981';
    textColor = '#34d399';
    headerBg = 'rgba(16, 185, 129, 0.08)';
    dividerColor = 'rgba(16, 185, 129, 0.2)';
  } else if (theme === 'dark') {
    bgFill = '#0f172a';
    gridSmall = 'rgba(255,255,255,0.04)';
    gridLarge = 'rgba(255,255,255,0.10)';
    traceColor = '#38bdf8';
    textColor = '#94a3b8';
    headerBg = 'rgba(56, 189, 248, 0.06)';
    dividerColor = 'rgba(255,255,255,0.08)';
  }

  // === LEAD LAYOUT (Cabrera Standard) ===
  // Row 0: I, aVR, V1, V4
  // Row 1: II, aVL, V2, V5
  // Row 2: III, aVF, V3, V6
  // Row 3: Rhythm strip
  const leadRows: string[][] = [
    ['I', 'aVR', 'V1', 'V4'],
    ['II', 'aVL', 'V2', 'V5'],
    ['III', 'aVF', 'V3', 'V6'],
  ];
  const rhythmLead = settings.rhythmLead || 'II';

  // === GRID PATTERN (1mm = boxPx pixels) ===
  // At 25mm/s: standard 1 small box = 1mm paper. We use boxPx to scale.
  const boxPx = colW / (settings.speedMmPerSec * 4 / 5); // 4s strip / 5 boxes-per-second = boxes per strip
  // For 25mm/s: 4s × 5boxes/s = 20 large boxes = 100 small boxes per strip
  // boxPx = colW / 100 = ~2.15px per small box
  // Standard: boxPx ≈ 2.5px at 25mm/s for 215px strip (= 86 small boxes = 3.44s)
  const smallBox = colW / Math.round(colW / 2.5);  // ≈ 2.5px per 1mm box
  const largeBox = smallBox * 5;

  // === SVG CONSTRUCTION ===
  const gId = `ecgG_${Date.now()}`;

  let svgContent = `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto"
      style="border-radius:10px; box-shadow:0 4px 20px rgba(0,0,0,0.15); display:block; max-width:100%;"
      class="dsp-ecg-12lead-svg">
      <defs>
        <!-- Small grid (1mm) -->
        <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
          <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
        </pattern>
        <!-- Large grid (5mm) -->
        <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
          <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
          <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="1.0"/>
        </pattern>
        <!-- Clip for each lead strip -->
        ${leadRows.flatMap((row, ri) => row.map((_, ci) =>
          `<clipPath id="${gId}_c${ri}${ci}"><rect x="${ci*colW}" y="${topPad + ri*rowH}" width="${colW}" height="${rowH}"/></clipPath>`
        )).join('')}
        <clipPath id="${gId}_rhythm"><rect x="0" y="${topPad + 3*rowH}" width="${totalW}" height="${rhythmH}"/></clipPath>
      </defs>

      <!-- Background -->
      <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
      <!-- Grid -->
      <rect x="0" y="${topPad}" width="${totalW}" height="${rowH * 3 + rhythmH}" fill="url(#${gId}_lg)"/>

      <!-- Header Bar -->
      <rect x="0" y="0" width="${totalW}" height="${topPad}" fill="${headerBg}" rx="10"/>
      <rect x="0" y="16" width="${totalW}" height="${topPad - 16}" fill="${headerBg}"/>
      <text x="12" y="17" fill="${textColor}" font-size="10.5" font-weight="800" font-family="'Inter', monospace">
        ECG 12 CHUYỂN ĐẠO CHUẨN — ${settings.speedMmPerSec} mm/s | ${settings.gainMmPerMv} mm/mV | HR ${inputs.heartRate || 75} bpm
      </text>
      <text x="${totalW - 12}" y="17" fill="${textColor}" font-size="9.5" font-weight="600" font-family="'Inter', monospace" text-anchor="end">
        ${inputs.rhythmType?.toUpperCase()} | QRS ${inputs.qrsDuration || 85}ms | QT ${inputs.qtInterval || 400}ms
      </text>
  `;

  // === LEAD DIVIDERS (vertical column separators) ===
  svgContent += `
      <!-- Column dividers -->
      ${[1,2,3].map(i => `<line x1="${i*colW}" y1="${topPad}" x2="${i*colW}" y2="${topPad + 3*rowH}" stroke="${dividerColor}" stroke-width="1" stroke-dasharray="3,3"/>`).join('')}
      <!-- Row dividers -->
      ${[1,2].map(i => `<line x1="0" y1="${topPad + i*rowH}" x2="${totalW}" y2="${topPad + i*rowH}" stroke="${dividerColor}" stroke-width="0.8" stroke-dasharray="3,3"/>`).join('')}
      <!-- Rhythm strip separator -->
      <line x1="0" y1="${topPad + 3*rowH}" x2="${totalW}" y2="${topPad + 3*rowH}" stroke="${gridLarge}" stroke-width="1.2"/>
  `;

  // === RENDER EACH LEAD STRIP ===
  leadRows.forEach((row, ri) => {
    row.forEach((lead, ci) => {
      const ox = ci * colW;
      const oy = topPad + ri * rowH;
      svgContent += `
        <g clip-path="url(#${gId}_c${ri}${ci})" transform="translate(${ox}, ${oy})">
          ${renderLeadStrip(lead, inputs, settings, colW, rowH, traceColor, true, ci === 0)}
        </g>
      `;
    });
  });

  // === RHYTHM STRIP (full width) ===
  const rhythmY = topPad + 3 * rowH;
  const rhythmSettings = { ...settings, speedMmPerSec: settings.speedMmPerSec as 12.5 | 25 | 50 };
  svgContent += `
    <g clip-path="url(#${gId}_rhythm)" transform="translate(0, ${rhythmY})">
      <!-- Rhythm label background -->
      <rect x="0" y="0" width="${totalW}" height="${rhythmH}" fill="${theme === 'paper' ? 'rgba(255,245,245,0.3)' : 'rgba(0,0,0,0.2)'}"/>
      ${renderLeadStrip(rhythmLead, inputs, rhythmSettings, totalW, rhythmH, traceColor, true, true)}
      <!-- "Rhythm" label suffix -->
      <text x="${totalW - 10}" y="${rhythmH - 8}" fill="${textColor}" font-size="9.5" font-weight="700" text-anchor="end" font-family="'Inter', monospace">Rhythm Strip</text>
    </g>
  `;

  // === SPEED/GAIN WATERMARK AT BOTTOM RIGHT ===
  svgContent += `
      <text x="${totalW - 10}" y="${totalH - 3}" fill="${textColor}" font-size="8.5" font-weight="600" text-anchor="end" opacity="0.7" font-family="monospace">
        CliniPortal ECG Studio Pro | ${settings.speedMmPerSec}mm/s | ${settings.gainMmPerMv}mm/mV
      </text>
    </svg>
  `;

  return svgContent;
}

/**
 * Bộ Tổng Hợp Đồ Thị Sóng ECG 12 Chuyển Đạo Chuẩn Milimet SVG (Waveform Synthesizer)
 * @deprecated Dùng render12LeadEcgPaper() thay thế cho hiển thị 12-lead đầy đủ.
 * Giữ lại để tương thích ngược với code cũ.
 */
export function render12LeadGridSvg(inputs: EcgInputs, activeLead: string = 'II', theme: 'paper' | 'neon' | 'dark' = 'paper'): string {
  // Forward to new 12-lead renderer with defaults
  const settings: EcgPaperSettings = {
    speedMmPerSec: 25,
    gainMmPerMv: 10,
    rhythmLead: activeLead,
  };
  return render12LeadEcgPaper(inputs, settings, theme);
}

