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

/**
 * Bộ Tổng Hợp Đồ Thị Sóng ECG 12 Chuyển Đạo Chuẩn Milimet SVG (Waveform Synthesizer)
 */
export function render12LeadGridSvg(inputs: EcgInputs, activeLead: string = 'II', theme: 'paper' | 'neon' | 'dark' = 'paper'): string {
  const width = 860;
  const height = 360;

  // Cấu hình Theme Màu Sắc
  let bgFill = '#fff5f5';
  let gridSmallStroke = '#fca5a5';
  let gridLargeStroke = '#ef4444';
  let traceStroke = '#0f172a';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridSmallStroke = 'rgba(16, 185, 129, 0.15)';
    gridLargeStroke = 'rgba(16, 185, 129, 0.4)';
    traceStroke = '#10b981';
  } else if (theme === 'dark') {
    bgFill = 'var(--color-surface)';
    gridSmallStroke = 'rgba(255, 255, 255, 0.05)';
    gridLargeStroke = 'rgba(255, 255, 255, 0.12)';
    traceStroke = '#38bdf8';
  }

  // Tạo polyline giả lập cho chuyển đạo đang chọn dựa trên thông số inputs
  const hr = inputs.heartRate || 75;
  const rrPixels = Math.max(140, Math.min(300, (60 / hr) * 200)); // 25mm/s tương đương pixels
  const numBeats = Math.ceil(width / rrPixels) + 1;

  const stDeviation = (inputs as any)[`st${activeLead}`] || (activeLead === 'II' ? (inputs.stII || 0) : 0);
  const isWellens = inputs.tWaveType === 'biphasic_wellens' && (activeLead === 'V2' || activeLead === 'V3');
  const isDeWinter = inputs.tWaveType === 'de_winter';
  const isPeakedT = inputs.tWaveType === 'peaked' || inputs.hyperkalemiaStage! >= 1;
  const isOsborn = inputs.hasOsbornWave;
  const isDelta = inputs.hasDeltaWave;
  const hasU = inputs.hasUWave;

  // Tính tọa độ Y của các thành phần sóng
  const baseY = 180;
  const qrsHeight = inputs.qrsDuration && inputs.qrsDuration >= 120 ? 80 : 95;
  const rAmp = (inputs.rv5 || 15) * 3;
  const sAmp = (inputs.sv1 || 8) * 3;

  let pathData = `M 0,${baseY} `;

  for (let b = 0; b < numBeats; b++) {
    const startX = b * rrPixels;
    
    // Baseline trước P
    pathData += `L ${startX + 20},${baseY} `;

    // Sóng P
    if (inputs.rhythmType !== 'afib' && inputs.hyperkalemiaStage! < 3) {
      pathData += `C ${startX + 25},${baseY - 8} ${startX + 35},${baseY - 8} ${startX + 40},${baseY} `;
    } else if (inputs.rhythmType === 'afib') {
      // Sóng lăn tăn rung nhĩ
      pathData += `Q ${startX + 25},${baseY - 3} ${startX + 30},${baseY + 3} Q ${startX + 35},${baseY - 3} ${startX + 40},${baseY} `;
    }

    // Đoạn PR
    const prEnd = isDelta ? startX + 50 : startX + 60;
    pathData += `L ${prEnd},${baseY} `;

    // Sóng Delta (WPW)
    if (isDelta) {
      pathData += `L ${startX + 62},${baseY - 20} `;
    }

    // Sóng Q
    if (inputs.hasPathologicalQ) {
      pathData += `L ${startX + 65},${baseY + 25} `;
    } else {
      pathData += `L ${startX + 65},${baseY + 6} `;
    }

    // Đỉnh sóng R
    pathData += `L ${startX + 75},${baseY - rAmp} `;

    // Đáy sóng S
    pathData += `L ${startX + 85},${baseY + sAmp} `;

    // Sóng Osborn (Hạ thân nhiệt)
    if (isOsborn) {
      pathData += `Q ${startX + 90},${baseY - 18} ${startX + 96},${baseY - stDeviation * 4} `;
    }

    // Điểm J & Đoạn ST
    const jY = baseY - stDeviation * 4;
    pathData += `L ${startX + 98},${jY} `;
    pathData += `L ${startX + 125},${jY} `;

    // Sóng T
    if (isDeWinter) {
      pathData += `C ${startX + 130},${jY + 12} ${startX + 145},${baseY - 60} ${startX + 160},${baseY} `;
    } else if (isWellens) {
      // Hai pha (+/-)
      pathData += `C ${startX + 130},${baseY - 20} ${startX + 140},${baseY - 20} ${startX + 145},${baseY} C ${startX + 150},${baseY + 20} ${startX + 160},${baseY + 20} ${startX + 165},${baseY} `;
    } else if (isPeakedT) {
      // T nhọn hẹp đối xứng
      pathData += `C ${startX + 135},${baseY - 55} ${startX + 145},${baseY - 55} ${startX + 155},${baseY} `;
    } else if (inputs.tWaveType === 'inverted') {
      // T âm sâu
      pathData += `C ${startX + 135},${baseY + 30} ${startX + 150},${baseY + 30} ${startX + 160},${baseY} `;
    } else {
      // T bình thường
      pathData += `C ${startX + 135},${baseY - 22} ${startX + 150},${baseY - 22} ${startX + 160},${baseY} `;
    }

    // Sóng U (Hạ Kali)
    if (hasU) {
      pathData += `C ${startX + 165},${baseY - 10} ${startX + 175},${baseY - 10} ${startX + 185},${baseY} `;
    }

    pathData += `L ${startX + rrPixels},${baseY} `;
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="auto" class="dsp-ecg-canvas-svg" style="border-radius:10px; box-shadow:inset 0 0 10px rgba(0,0,0,0.1);">
      <defs>
        <pattern id="ecgSmallGrid_${theme}" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="${gridSmallStroke}" stroke-width="0.5" />
        </pattern>
        <pattern id="ecgLargeGrid_${theme}" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="url(#ecgSmallGrid_${theme})" />
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="${gridLargeStroke}" stroke-width="1.2" />
        </pattern>
      </defs>

      <!-- Background Grid Paper -->
      <rect width="${width}" height="${height}" fill="${bgFill}" />
      <rect width="${width}" height="${height}" fill="url(#ecgLargeGrid_${theme})" />

      <!-- Pulse Calibration Mark (10mm = 1mV) -->
      <path d="M 20,${baseY} L 30,${baseY} L 30,${baseY - 50} L 40,${baseY - 50} L 40,${baseY} L 50,${baseY}" fill="none" stroke="${traceStroke}" stroke-width="2" />
      <text x="25" y="${baseY - 56}" fill="${traceStroke}" font-size="8.5" font-weight="700">1 mV</text>

      <!-- ECG Waveform Trace -->
      <path d="${pathData}" fill="none" stroke="${traceStroke}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Active Lead Label -->
      <rect x="${width - 130}" y="15" width="115" height="28" rx="6" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="1" />
      <text x="${width - 72}" y="33" fill="var(--color-text)" font-size="11" font-weight="800" text-anchor="middle">Lead ${activeLead} (25 mm/s)</text>
    </svg>
  `;
}
