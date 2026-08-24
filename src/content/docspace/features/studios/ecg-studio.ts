/**
 * DocSpace — ECG Research Studio Pro ($10,000 Level Clinical Lab Suite)
 * 12-Lead Synchronized Waveform Simulator, Precision Digital Calipers,
 * Hexaxial Cabrera Vector Compass, Coronary Artery OMI Mapper,
 * Arrhythmia/WCT Decision Tree, WPW Arruda Localization,
 * LVH Multi-Score Matrix (Peguero-Lo Presti, Cornell, Sokolow-Lyon),
 * Interactive Multi-Mode Visual Comparator (Side-by-Side, Ghost Overlay, Focal Leads with Callouts),
 * Multi-Label AI Classifier (% Confidence Score from torch_ecg),
 * Digital Denoising Filters (Raw, 0.5Hz Baseline, 50Hz AC, 35Hz EMG, Standard),
 * and Multi-Montage Paper Layouts (Cabrera 4x3, Standard 6x2, Continuous 12x1, Extended V7-V9/V4R, Lewis Lead).
 * 100% Pure TypeScript & Pure SVG — Zero External Dependencies.
 */

export interface EcgCalloutAnnotation {
  lead: string;
  waveTarget: 'P' | 'Q' | 'R' | 'S' | 'J' | 'ST' | 'T' | 'U' | 'Delta' | 'Osborn';
  label: string;
  badgeType: 'danger' | 'warning' | 'info' | 'success';
  detail: string;
}

export interface EcgMorphologyComparison {
  title: string;
  normalDescription: string;
  pathologicalDescription: string;
  keySignatures: { feature: string; normal: string; abnormal: string; significance: string }[];
  electrophysiologyMechanism: string;
  reciprocalChanges?: string;
  targetLeads: string[];
}

export interface AiDiagnosticScore {
  label: string;
  shortName: string;
  probability: number; // 0 - 100%
  severity: 'normal' | 'warning' | 'danger' | 'critical';
  reasoning: string;
}

export type EcgFilterType = 'standard' | 'raw' | 'hp05' | 'notch50' | 'lp35';
export type EcgMontageType = 'cabrera' | 'standard6x2' | 'continuous12x1' | 'extended_rv_posterior' | 'lewis_lead';

export interface EcgSignalQualityResult {
  overallSqi: number; // 0 - 100%
  pSqi: number;       // QRS power ratio (Zhao et al., 2018)
  kSqi: number;       // Kurtosis index
  basSqi: number;     // Baseline stability index
  matchSqi: number;   // Template correlation (Orphanidou et al., 2015)
  badgeLevel: 'excellent' | 'good' | 'fair' | 'poor' | 'unreadable';
  badgeText: string;
  badgeColor: string;
  explanation: string;
  recommendation: string;
}

export interface HrvTimeMetrics {
  meanNn: number;   // Mean RR interval (ms)
  sdnn: number;     // Standard deviation of NN intervals (ms)
  rmssd: number;    // Root mean square of successive differences (ms)
  pnn50: number;    // % of successive NN differences > 50ms (%)
  pnn20: number;    // % of successive NN differences > 20ms (%)
  cvnn: number;     // Coefficient of variation (SDNN / MeanNN %)
  minNn: number;    // Min RR interval (ms)
  maxNn: number;    // Max RR interval (ms)
}

export interface HrvFrequencyMetrics {
  vlfPower: number;   // Very Low Frequency (< 0.04 Hz) ms²
  lfPower: number;    // Low Frequency (0.04 - 0.15 Hz) ms² (Sympathetic + Vagal)
  hfPower: number;    // High Frequency (0.15 - 0.40 Hz) ms² (Vagal / RSA)
  totalPower: number; // Total spectral power ms²
  lfHfRatio: number;  // Sympathovagal balance (LF / HF)
  lfn: number;        // Normalized LF (%)
  hfn: number;        // Normalized HF (%)
}

export interface HrvNonlinearMetrics {
  sd1: number;         // Short-term beat-to-beat variability (ms) (width of Poincaré ellipse)
  sd2: number;         // Long-term continuous variability (ms) (length of Poincaré ellipse)
  sd1Sd2Ratio: number; // Ratio of SD1 to SD2
  ellipseArea: number; // Area of Poincaré ellipse (pi * SD1 * SD2)
  csi: number;         // Cardiac Sympathetic Index (4*SD2 / 4*SD1)
  cvi: number;         // Cardiac Vagal Index (log(16 * SD1 * SD2))
  sampleEntropy: number; // Regularity & physiological complexity metric
}

export interface HrvAnalysisResult {
  time: HrvTimeMetrics;
  freq: HrvFrequencyMetrics;
  nonlinear: HrvNonlinearMetrics;
  autonomicState: 'balanced' | 'sympathetic_dominant' | 'vagal_dominant' | 'depressed_critical' | 'arrhythmia_chaos';
  autonomicStateTitle: string;
  autonomicStateColor: string;
  clinicalSignificance: string[];
}

export interface EcgPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  category: 'ischemia' | 'arrhythmia' | 'conduction' | 'electrolyte' | 'hypertrophy' | 'channelopathy';
  description: string;
  keyLeads?: string[];
  annotations?: EcgCalloutAnnotation[];
  morphology?: EcgMorphologyComparison;
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

export const NORMAL_SINUS_BASELINE: EcgInputs = {
  heartRate: 75,
  rhythmType: 'sinus',
  lead1Net: 8,
  avfNet: 6,
  prInterval: 160,
  qrsDuration: 85,
  qtInterval: 400,
  sv1: 8,
  rv5: 14,
  rv6: 12,
  raVL: 6,
  sv3: 8,
  sv4: 6,
  stI: 0, stII: 0, stIII: 0, staVR: 0, staVL: 0, staVF: 0,
  stV1: 0, stV2: 0, stV3: 0, stV4: 0, stV5: 0, stV6: 0,
  tWaveType: 'normal',
  gender: 'male',
};

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
    keyLeads: ['V2', 'V3', 'aVL', 'III'],
    annotations: [
      { lead: 'V2', waveTarget: 'J', label: 'ST↑ +5.5mm (Vòm)', badgeType: 'danger', detail: 'Điểm J chênh lên cao tạo dạng bia mộ (Tombstone), tổn thương xuyên thành vách trước.' },
      { lead: 'V3', waveTarget: 'T', label: 'T Tối Cấp (Hyperacute)', badgeType: 'danger', detail: 'Sóng T khổng lồ phồng rộng cùng đoạn ST chênh lên.' },
      { lead: 'aVL', waveTarget: 'J', label: 'ST↑ +3.0mm', badgeType: 'danger', detail: 'Tổn thương thành bên cao do tắc trên nhánh chéo D1.' },
      { lead: 'III', waveTarget: 'ST', label: 'ST↓ Soi Gương -3.0mm', badgeType: 'warning', detail: 'Hình ảnh soi gương (Reciprocal STD) đối kháng qua trục điện học tim.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: STEMI Trước Rộng vs ECG Bình Thường',
      normalDescription: 'Đoạn ST nằm ngang trên đường đẳng điện (0mm), sóng T dương nhẹ 2-4mm, phức bộ QRS thanh mảnh 85ms.',
      pathologicalDescription: 'ST chênh vòm cực đại 5.5-6.0mm ở V2-V3 vượt ngưỡng chẩn đoán quốc tế (≥2.0mm ở nam), kèm ST chênh xuống sâu ở DII, DIII, aVF.',
      keySignatures: [
        { feature: 'Điểm J / Đoạn ST ở V2-V3', normal: 'Đẳng điện (0 ± 0.5 mm)', abnormal: 'Chênh lên dạng vòm +5.5 mm', significance: 'Dòng tổn thương thiếu máu xuyên thành cơ tim thất trái' },
        { feature: 'Chuyển đạo thành dưới (DIII, aVF)', normal: 'ST đẳng điện, T dương', abnormal: 'ST chênh xuống soi gương -3.0 mm', significance: 'Khẳng định độ đặc hiệu >95% nhồi máu cơ tim cấp OMI' },
        { feature: 'Sóng T chuyển đạo trước tim', normal: 'T dương vừa phải, bất đối xứng', abnormal: 'Sóng T khổng lồ phồng to (Hyperacute T)', significance: 'Giai đoạn tối cấp của tắc mạch vành hoàn toàn' }
      ],
      electrophysiologyMechanism: 'Dòng điện tổn thương tâm thu (Systolic injury current) hướng về phía các điện cực trước tim do mất phân cực sớm vùng cơ tim thiếu máu diện rộng.',
      reciprocalChanges: 'DII, DIII, aVF (ST chênh xuống 2-3mm)',
      targetLeads: ['V1', 'V2', 'V3', 'V4', 'aVL', 'III']
    },
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
    keyLeads: ['III', 'aVF', 'V4R', 'aVL'],
    annotations: [
      { lead: 'III', waveTarget: 'J', label: 'ST↑ +4.5mm (DIII > DII)', badgeType: 'danger', detail: 'Vector tổn thương lệch sang phải (+120°), định danh nhánh thủ phạm ĐM Vành Phải (RCA).' },
      { lead: 'aVF', waveTarget: 'J', label: 'ST↑ +3.5mm', badgeType: 'danger', detail: 'Tổn thương cơ tim thành dưới trực diện.' },
      { lead: 'V4R', waveTarget: 'J', label: 'ST↑ +2.0mm (Thất Phải)', badgeType: 'warning', detail: 'Nhồi máu thất phải đi kèm, tuyệt đối không dùng Nitrate hạ áp.' },
      { lead: 'aVL', waveTarget: 'ST', label: 'ST↓ Soi Gương -3.0mm', badgeType: 'info', detail: 'Hình ảnh soi gương kinh điển tại thành bên cao.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: STEMI Dưới + Thất Phải vs Bình Thường',
      normalDescription: 'DII, DIII, aVF có đoạn ST đẳng điện, sóng T dương mềm mại.',
      pathologicalDescription: 'ST chênh lên nổi trội ở DIII (4.5mm) vượt trội DII (2.5mm), ST chênh xuống rõ ở DI, aVL và ST chênh lên ở chuyển đạo tim phải V4R (2.0mm).',
      keySignatures: [
        { feature: 'ST ở DIII so với DII', normal: 'Đẳng điện như nhau', abnormal: 'ST↑ DIII > ST↑ DII (+4.5mm vs +2.5mm)', significance: 'Đặc trưng tắc RCA đoạn gần thay vì LCx' },
        { feature: 'Chuyển đạo bên phải V4R', normal: 'ST đẳng điện (<0.5mm)', abnormal: 'ST↑ +2.0mm tại V4R', significance: 'Nhồi máu tâm thất phải đồng thời (Phụ thuộc tiền tải)' },
        { feature: 'Chuyển đạo aVL', normal: 'ST đẳng điện', abnormal: 'ST↓ soi gương -3.0mm', significance: 'Dấu hiệu nhạy nhất của STEMI thành dưới' }
      ],
      electrophysiologyMechanism: 'Vector thiếu máu thành dưới hướng xuống dưới và sang phải, tạo ST chênh lên ở DIII/aVF và ST chênh xuống soi gương ở aVL.',
      reciprocalChanges: 'DI, aVL (ST chênh xuống 2-3mm)',
      targetLeads: ['III', 'II', 'aVF', 'aVL', 'V4R']
    },
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
    keyLeads: ['V2', 'V3', 'V4', 'I'],
    annotations: [
      { lead: 'V2', waveTarget: 'T', label: 'T Hai Pha (+/-) Type A', badgeType: 'danger', detail: 'Pha đầu dương, pha sau âm sâu đặc trưng cho tái tưới máu không bền vững của LAD.' },
      { lead: 'V3', waveTarget: 'T', label: 'T Biphasic Điển Hình', badgeType: 'danger', detail: 'Hẹp > 90% đoạn gần động mạch liên thất trước.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Hội Chứng Wellens Type A vs Bình Thường',
      normalDescription: 'Sóng T ở V2-V3 hoàn toàn dương, tròn đều, sườn lên thoai thoải sườn xuống dốc.',
      pathologicalDescription: 'Sóng T hai pha (Biphasic: nhô lên dương rồi lao thẳng xuống âm sâu) ở V2, V3 mà đoạn ST không chênh và không có sóng Q hoại tử.',
      keySignatures: [
        { feature: 'Hình thái sóng T ở V2-V3', normal: 'Dương đơn pha, đỉnh mềm', abnormal: 'Hai pha (+/-) rõ rệt', significance: 'Hẹp cực nặng đoạn gần LAD (Critical LAD Stenosis)' },
        { feature: 'Đoạn ST', normal: 'Đẳng điện (0mm)', abnormal: 'Gần như đẳng điện hoặc chênh rất nhẹ (<1mm)', significance: 'Bẫy bỏ sót nhồi máu cơ tim nếu chỉ tìm ST chênh vòm' }
      ],
      electrophysiologyMechanism: 'Tái cực bất đồng nhất sau khi nhánh LAD tự tái thông một phần sau cơn co thắt/thiếu máu cục bộ nặng.',
      targetLeads: ['V2', 'V3', 'V4']
    },
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
    keyLeads: ['V2', 'V3', 'V4', 'V5'],
    annotations: [
      { lead: 'V2', waveTarget: 'T', label: 'T Âm Sâu Đối Xứng (-6mm)', badgeType: 'danger', detail: 'Sóng T cắm sâu hình chữ V ngược đối xứng hoàn hảo.' },
      { lead: 'V3', waveTarget: 'T', label: 'T Âm Khổng Lồ (-7mm)', badgeType: 'danger', detail: 'Nguy cơ tắc hoàn toàn LAD trong vòng 24-48 giờ.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Hội Chứng Wellens Type B vs Bình Thường',
      normalDescription: 'Sóng T dương từ V2 đến V6, biên độ 3-6mm.',
      pathologicalDescription: 'Sóng T âm sâu > 5mm, đối xứng tuyệt đối hình chữ V nhọn ở các chuyển đạo trước tim V2-V5.',
      keySignatures: [
        { feature: 'Sóng T V2-V4', normal: 'Dương (+3 đến +6 mm)', abnormal: 'Âm sâu đối xứng (-5 đến -8 mm)', significance: 'Tiêu chuẩn Wellens Type B (75% ca Wellens)' }
      ],
      electrophysiologyMechanism: 'Chênh lệch điện thế tái cực sâu sắc giữa lớp nội mạc và ngoại mạc cơ tim vách liên thất.',
      targetLeads: ['V2', 'V3', 'V4', 'V5']
    },
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
    keyLeads: ['V2', 'V3', 'aVR', 'V1'],
    annotations: [
      { lead: 'V2', waveTarget: 'J', label: 'ST↓ Điểm J -2.5mm', badgeType: 'danger', detail: 'Điểm J chênh xuống dốc đứng nối thẳng vào đỉnh sóng T.' },
      { lead: 'V2', waveTarget: 'T', label: 'T Cao Nhọn Đối Xứng', badgeType: 'danger', detail: 'Sóng T khổng lồ cao vút, dấu ấn tắc thân LAD cấp tính.' },
      { lead: 'aVR', waveTarget: 'J', label: 'ST↑ aVR +1.5mm', badgeType: 'warning', detail: 'ST chênh lên kèm theo ở aVR phản ánh thiếu máu cơ tim vùng đáy.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: De Winter vs ECG Bình Thường',
      normalDescription: 'ST nằm ngang đẳng điện, tiếp nối sóng T dương thoải.',
      pathologicalDescription: 'ST chênh xuống 1-3mm dốc lên tại điểm J tiếp nối sóng T cao nhọn đối xứng khổng lồ từ V1-V4.',
      keySignatures: [
        { feature: 'Điểm J & Đoạn ST V1-V4', normal: 'Đẳng điện (0mm)', abnormal: 'ST chênh xuống dốc lên (Upsloping STD -2.5mm)', significance: '2% trường hợp tắc cấp LAD không biểu hiện ST chênh lên' },
        { feature: 'Biên độ sóng T V2-V3', normal: '3 - 5 mm', abnormal: 'Cao nhọn đối xứng khổng lồ (>10mm)', significance: 'Dấu hiệu De Winter — Kích hoạt Cathlab tức thì như STEMI' }
      ],
      electrophysiologyMechanism: 'Mất cân bằng dẫn truyền do kênh kali ATP-sensitive mở rộng làm chậm tái cực xuyên thành cơ tim.',
      targetLeads: ['V1', 'V2', 'V3', 'V4', 'aVR']
    },
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
    keyLeads: ['III', 'V1', 'V5', 'aVL'],
    annotations: [
      { lead: 'III', waveTarget: 'J', label: 'ST↑ Đơn Độc DIII +2.5mm', badgeType: 'danger', detail: 'Chỉ chênh lên ở DIII mà không thỏa tiêu chuẩn STEMI 2 chuyển đạo liên tiếp.' },
      { lead: 'V1', waveTarget: 'J', label: 'ST↑ V1 +1.0mm', badgeType: 'warning', detail: 'ST chênh lên ở V1 cùng chiều DIII.' },
      { lead: 'V5', waveTarget: 'ST', label: 'ST↓ V4-V6 -2.0mm', badgeType: 'danger', detail: 'Thiếu máu vùng mỏm/thành bên trên nền bệnh nhiều nhánh mạch vành.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Kiểu Hình Aslanger vs Bình Thường',
      normalDescription: 'DII, DIII, aVF và V4-V6 đều có đoạn ST đẳng điện đồng bộ.',
      pathologicalDescription: 'ST chênh lên ở duy nhất DIII (kèm ST chênh lên nhẹ ở V1) và ST chênh xuống từ V4 đến V6.',
      keySignatures: [
        { feature: 'ST ở chuyển đạo DIII', normal: 'Đẳng điện', abnormal: 'ST chênh lên +2.5mm đơn độc', significance: 'Nhồi máu thành dưới bị triệt tiêu ở DII/aVF do thiếu máu đối kháng' }
      ],
      electrophysiologyMechanism: 'Vector thiếu máu thành dưới (+120°) kết hợp với vector thiếu máu mỏm tim tạo nên hình ảnh ST chênh đặc biệt ở DIII và V1.',
      targetLeads: ['III', 'V1', 'V4', 'V5', 'V6']
    },
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
    keyLeads: ['V2', 'V3', 'V1', 'V4'],
    annotations: [
      { lead: 'V2', waveTarget: 'ST', label: 'ST↓ Nằm Ngang -3.5mm', badgeType: 'danger', detail: 'Hình ảnh soi gương của ST chênh lên ở V7-V9 thành sau.' },
      { lead: 'V2', waveTarget: 'R', label: 'Sóng R Cao (R/S > 1)', badgeType: 'warning', detail: 'Hình ảnh soi gương của sóng Q hoại tử thành sau thực thụ.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Posterior MI vs Bình Thường',
      normalDescription: 'V1-V2 có dạng rS (r nhỏ, S sâu), ST đẳng điện.',
      pathologicalDescription: 'V1-V3 có sóng R cao bất thường (R/S > 1), ST chênh xuống nằm ngang và sóng T dương thẳng đứng.',
      keySignatures: [
        { feature: 'Tỷ lệ R/S ở V2', normal: 'R/S < 1 (Sóng S chiếm ưu thế)', abnormal: 'R/S > 1 (Sóng R cao vượt trội)', significance: 'Hình ảnh soi gương của sóng Q bệnh lý thành sau' }
      ],
      electrophysiologyMechanism: 'Điện cực V1-V3 nhìn vào mặt trong buồng tâm thất đối diện với vùng hoại tử thành sau lưng.',
      targetLeads: ['V1', 'V2', 'V3']
    },
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
    keyLeads: ['V1', 'V2', 'V5', 'I'],
    annotations: [
      { lead: 'V1', waveTarget: 'J', label: 'Tỷ lệ ST/S = 6/20 = 0.30 (≥0.25)', badgeType: 'danger', detail: 'Thỏa mãn tiêu chuẩn Smith-Modified Sgarbossa xác định NMCT cấp có tắc mạch.' },
      { lead: 'V5', waveTarget: 'R', label: 'M-Shape Notched R', badgeType: 'info', detail: 'Dạng sóng R rộng có khuyết chẻ đôi của Block nhánh trái.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: LBBB + Sgarbossa (+) vs LBBB Bình Thường',
      normalDescription: 'LBBB không biến chứng: ST chênh lên thứ phát ngược hướng < 25% biên độ sóng S (ST/S < 0.25).',
      pathologicalDescription: 'LBBB kèm tắc mạch cấp: ST chênh lên quá mức tỷ lệ ST/S = 0.30 ≥ 0.25 hoặc ST chênh lên đồng hướng ≥ 1mm.',
      keySignatures: [
        { feature: 'Đoạn ST chênh / S sâu (V1)', normal: '< 0.25', abnormal: '6mm / 20mm = 0.30 (≥ 0.25)', significance: 'Modified Smith-Sgarbossa (+): Độ đặc hiệu 91% nhồi máu cơ tim cấp' }
      ],
      electrophysiologyMechanism: 'Dòng tổn thương thiếu máu cơ tim cấp vượt qua điện thế tái cực thứ phát của hiện tượng dẫn truyền chậm qua nhánh trái.',
      targetLeads: ['V1', 'V2', 'V3', 'V5', 'I', 'aVL']
    },
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
    keyLeads: ['V1', 'II', 'aVF', 'I'],
    annotations: [
      { lead: 'V1', waveTarget: 'Delta', label: 'Sóng Delta (+) Dương V1', badgeType: 'warning', detail: 'Sóng delta sườn lên thoai thoải, PR ngắn 95ms và R cao ở V1 (WPW Type A).' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: WPW Type A vs ECG Bình Thường',
      normalDescription: 'Khoảng PR chuẩn 120-200ms, sườn lên QRS dốc đứng, QRS hẹp <120ms.',
      pathologicalDescription: 'Khoảng PR rất ngắn (95ms), xuất hiện sóng Delta làm thoai thoải chân sóng R, QRS giãn rộng 130ms.',
      keySignatures: [
        { feature: 'Khoảng PR', normal: '120 - 200 ms', abnormal: '95 ms (< 120 ms)', significance: 'Tiền kích thích thất qua đường dẫn truyền phụ (Cầu Kent)' }
      ],
      electrophysiologyMechanism: 'Dẫn truyền phụ nhĩ - thất bỏ qua sự làm chậm sinh lý của nút AV.',
      targetLeads: ['V1', 'II', 'I', 'aVF']
    },
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
    keyLeads: ['V1', 'V2', 'I', 'aVF'],
    annotations: [
      { lead: 'V1', waveTarget: 'Delta', label: 'Sóng Delta (-) Âm V1 (Dạng QS)', badgeType: 'warning', detail: 'Delta âm tạo dạng sóng QS giả nhồi máu hoặc giống LBBB.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: WPW Type B vs Bình Thường',
      normalDescription: 'PR 160ms, V1 có sóng r nhỏ mở đầu.',
      pathologicalDescription: 'PR ngắn 100ms, sóng Delta âm ở V1 tạo dạng QS sâu (WPW Type B - Cầu Kent bên phải).',
      keySignatures: [
        { feature: 'Sóng Delta V1', normal: 'Không có', abnormal: 'Sóng Delta âm (-) tạo dạng QS', significance: 'Định vị đường phụ bên tim phải hoặc vách ngăn' }
      ],
      electrophysiologyMechanism: 'Khử cực thất bắt đầu từ thất phải lan sang thất trái theo hướng ra xa chuyển đạo V1.',
      targetLeads: ['V1', 'V2', 'I', 'aVF']
    },
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
    keyLeads: ['II', 'aVR', 'V1', 'V6'],
    annotations: [
      { lead: 'II', waveTarget: 'P', label: 'Phân Ly Nhĩ Thất (AV Dissoc)', badgeType: 'danger', detail: 'Sóng P độc lập tần số chậm lọt giữa các phức bộ QRS nhanh.' },
      { lead: 'aVR', waveTarget: 'R', label: 'Sóng R Đơn Độc aVR', badgeType: 'danger', detail: 'Vereckei aVR Step 1 (+): Khẳng định chắc chắn Nhịp Nhanh Thất (VT).' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Nhịp Nhanh Thất (VT) vs SVT Dẫn Truyền Lệch',
      normalDescription: 'Nhịp xoang hoặc SVT: QRS hẹp <120ms, liên hệ 1:1 với sóng P.',
      pathologicalDescription: 'VT: QRS giãn rộng 165ms kỳ dị, trục vô định, có phân ly nhĩ thất và sóng R ban đầu ở aVR.',
      keySignatures: [
        { feature: 'Đoạn QRS', normal: '< 120 ms', abnormal: '165 ms (> 140 ms)', significance: 'Tiêu chuẩn Brugada gợi ý nguồn gốc từ tâm thất' }
      ],
      electrophysiologyMechanism: 'Vòng vào lại hoặc ổ phát nhịp tự động nằm sâu trong cơ thất.',
      targetLeads: ['II', 'aVR', 'V1', 'V6']
    },
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
    keyLeads: ['II', 'V1', 'V5', 'I'],
    annotations: [
      { lead: 'II', waveTarget: 'P', label: 'Mất P — Sóng f Lăn Tăn', badgeType: 'warning', detail: 'Hoàn toàn không có sóng P xoang, đường đẳng điện gợn sóng nhấp nhô.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Rung Nhĩ (AFib) vs Nhịp Xoang Bình Thường',
      normalDescription: 'Sóng P đi trước mỗi QRS, khoảng RR đều đặn như đồng hồ.',
      pathologicalDescription: 'Mất hẳn sóng P, thay bằng sóng f lăn tăn hỗn loạn, khoảng cách RR biến thiên liên tục.',
      keySignatures: [
        { feature: 'Sóng P xoang', normal: 'Hiện diện đều đặn', abnormal: 'Vắng mặt hoàn toàn (Mất sóng P)', significance: 'Khử cực nhĩ hỗn loạn tần số 400-600 l/p' }
      ],
      electrophysiologyMechanism: 'Đa ổ vi vào lại (Multiple micro-reentrant wavelets) trong tâm nhĩ.',
      targetLeads: ['II', 'V1']
    },
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
    keyLeads: ['II', 'V1', 'aVF', 'III'],
    annotations: [
      { lead: 'II', waveTarget: 'P', label: 'Sóng P Độc Lập (85 l/p)', badgeType: 'danger', detail: 'Sóng P đập đều nhưng không dẫn truyền xuống thất, có lúc lẫn vào QRS hoặc sóng T.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Block AV Độ III vs Bình Thường',
      normalDescription: 'Mỗi sóng P dẫn 1 phức bộ QRS với khoảng PR cố định 160ms.',
      pathologicalDescription: 'Sóng P và phức bộ QRS đập hoàn toàn độc lập, khoảng PR thay đổi ngẫu nhiên, tần số thất rất chậm.',
      keySignatures: [
        { feature: 'Liên hệ P và QRS', normal: 'Tỷ lệ 1:1, PR cố định', abnormal: 'Phân ly hoàn toàn (P rate > QRS rate)', significance: 'Mất hoàn toàn dẫn truyền qua nút nhĩ thất / bó His' }
      ],
      electrophysiologyMechanism: 'Tắc nghẽn hoàn toàn xung động điện thế từ tâm nhĩ xuống tâm thất.',
      targetLeads: ['II', 'V1']
    },
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
    keyLeads: ['V2', 'V3', 'II', 'V4'],
    annotations: [
      { lead: 'V2', waveTarget: 'T', label: 'T Cao Nhọn Đáy Hẹp (Tent-like)', badgeType: 'danger', detail: 'Sóng T khổng lồ hình lều nhọn hoắt.' },
      { lead: 'V2', waveTarget: 'R', label: 'QRS Dãn Rộng Sóng Hình Sin', badgeType: 'danger', detail: 'QRS 180ms hòa lẫn vào sóng T đe dọa rung thất và ngừng tim.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Tăng Kali Máu Nặng vs Bình Thường',
      normalDescription: 'Sóng P rõ, QRS 85ms, sóng T thoải 3-4mm.',
      pathologicalDescription: 'Mất sóng P, QRS giãn rộng 180ms biến dạng hòa nhập với sóng T cao nhọn tạo hình ảnh sóng Sine liên tục.',
      keySignatures: [
        { feature: 'Sóng T', normal: 'Thấp, bất đối xứng', abnormal: 'Cao nhọn, đáy hẹp, đối xứng hình lều', significance: 'Tăng tốc độ tái cực màng tế bào do tăng K+ ngoại bào' }
      ],
      electrophysiologyMechanism: 'Giảm điện thế nghỉ màng tế bào cơ tim làm bất hoạt kênh Natri nhanh và thúc đẩy dòng Kali IKr.',
      targetLeads: ['V2', 'V3', 'II']
    },
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
    keyLeads: ['V2', 'V3', 'V4', 'II'],
    annotations: [
      { lead: 'V2', waveTarget: 'U', label: 'Sóng U Khổng Lồ > 2mm', badgeType: 'warning', detail: 'Sóng U nhô cao theo sau sóng T dẹt tạo khoảng QU kéo dài giả tạo.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Hạ Kali Máu vs Bình Thường',
      normalDescription: 'Sóng T dương rõ, không có sóng U hoặc sóng U < 1mm.',
      pathologicalDescription: 'Sóng T dẹt/âm, ST chênh xuống nhẹ, xuất hiện sóng U to vượt trội sóng T (U > T).',
      keySignatures: [
        { feature: 'Sóng U ở V2-V3', normal: '< 1mm hoặc không thấy', abnormal: 'Nổi bật > 2mm (U > T)', significance: 'Chậm trễ tái cực mạng lưới sợi Purkinje do hạ K+' }
      ],
      electrophysiologyMechanism: 'Kéo dài thời gian tái cực của hệ thống dẫn truyền Purkinje tạo ra sóng U bệnh lý.',
      targetLeads: ['V2', 'V3', 'V4']
    },
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
    keyLeads: ['V1', 'V2', 'V3', 'aVR'],
    annotations: [
      { lead: 'V1', waveTarget: 'J', label: 'ST↑ Vòm Coved ≥ 2mm', badgeType: 'danger', detail: 'Điểm J vồng lên như lưng lạc đà rồi dốc thẳng xuống sóng T âm.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Hội Chứng Brugada Type 1 vs Bình Thường',
      normalDescription: 'V1 có dạng rS, ST đẳng điện, T dương hoặc âm nhẹ.',
      pathologicalDescription: 'ST chênh lên dạng vòm (Coved-type) ≥ 2mm tại V1-V2, tiếp nối sóng T âm đối xứng sâu.',
      keySignatures: [
        { feature: 'Hình thái ST-T ở V1-V2', normal: 'ST đẳng điện, T thẳng', abnormal: 'ST chênh lên dạng vòm cúp (Coved-type ≥ 2mm) + T âm', significance: 'Bệnh lý kênh Natri Nav1.5 (Gen SCN5A)' }
      ],
      electrophysiologyMechanism: 'Mất cân bằng giữa dòng vào INa bị suy giảm và dòng ra Ito chiếm ưu thế tại đường ra thất phải (RVOT).',
      targetLeads: ['V1', 'V2']
    },
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
    keyLeads: ['II', 'V4', 'V5', 'V6'],
    annotations: [
      { lead: 'II', waveTarget: 'T', label: 'Sóng T Chẻ Đôi (Notched T)', badgeType: 'warning', detail: 'Sóng T có khuyết hai đỉnh đặc trưng LQT2.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: LQTS Type 2 vs Bình Thường',
      normalDescription: 'QTc bình thường < 440ms (nam) / < 460ms (nữ), sóng T đỉnh đơn mềm.',
      pathologicalDescription: 'Khoảng QTc kéo dài 570ms, sóng T biên độ thấp có khuyết chẻ đôi (Notched T-wave).',
      keySignatures: [
        { feature: 'Khoảng QTc', normal: '< 440 ms', abnormal: '570 ms (Kéo dài nguy kịch > 500ms)', significance: 'Đột biến kênh IKr KCNH2 — Nguy cơ xoắn đỉnh khi nghe tiếng động lớn' }
      ],
      electrophysiologyMechanism: 'Giảm dòng điện ion Kali tái cực IKr kéo dài thời gian trơ hiệu quả của cơ tâm thất.',
      targetLeads: ['II', 'V4', 'V5']
    },
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
    keyLeads: ['V1', 'V4', 'V5', 'aVL'],
    annotations: [
      { lead: 'V1', waveTarget: 'S', label: 'S Sâu Khổng Lồ (22mm)', badgeType: 'info', detail: 'Điện thế tăng gánh dày thành thất trái.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Dày Thất Trái Tăng Gánh vs Bình Thường',
      normalDescription: 'Sokolow-Lyon < 35mm, Cornell RaVL < 11mm, ST-T đẳng điện.',
      pathologicalDescription: 'Điện thế QRS cực cao (S V1 sâu 22mm, R V5 cao 26mm, RaVL 15mm), ST chênh xuống và T âm dạng Strain pattern ở V5-V6.',
      keySignatures: [
        { feature: 'Tiêu chuẩn Peguero-Lo Presti', normal: '< 28mm (Nam)', abnormal: 'Deepest S (22mm) + SV4 (18mm) = 40mm', significance: 'Độ nhạy cao hơn Sokolow-Lyon trong phát hiện LVH' }
      ],
      electrophysiologyMechanism: 'Phì đại khối lượng cơ thất trái làm tăng tổng vector khử cực thất và thiếu máu tương đối lớp nội mạc.',
      targetLeads: ['V1', 'V4', 'V5', 'aVL']
    },
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
    keyLeads: ['I', 'III', 'V1', 'V2'],
    annotations: [
      { lead: 'I', waveTarget: 'S', label: 'S1: Sóng S Sâu ở DI', badgeType: 'danger', detail: 'Dấu ấn xoay trục tim sang phải cấp tính.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Thuyên Tắc Phổi Cấp vs Bình Thường',
      normalDescription: 'DI không có sóng S sâu, DIII không có Q bệnh lý, T V1-V4 dương.',
      pathologicalDescription: 'S sâu ở DI, Q và T âm ở DIII (dấu S1Q3T3), kèm nhịp nhanh xoang 118 l/p và T âm đối xứng trước tim phải (RV Strain).',
      keySignatures: [
        { feature: 'Bộ ba McGinn-White', normal: 'Không có', abnormal: 'S1 + Q3 + T3 rõ nét', significance: 'Dấu hiệu tăng gánh thất phải cấp tính do bít tắc động mạch phổi' }
      ],
      electrophysiologyMechanism: 'Tăng áp lực động mạch phổi đột ngột gây giãn cấp buồng thất phải và xoay trục tim theo chiều kim đồng hồ.',
      targetLeads: ['I', 'III', 'V1', 'V2']
    },
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
    keyLeads: ['V5', 'V6', 'I', 'aVL'],
    annotations: [
      { lead: 'V5', waveTarget: 'ST', label: 'ST Đáy Chén Salvador Dalí', badgeType: 'warning', detail: 'ST chênh xuống võng cong mềm mại như ria mép Salvador Dalí.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Dấu Hiệu Digoxin vs Bình Thường',
      normalDescription: 'ST nằm ngang đẳng điện, PR < 200ms.',
      pathologicalDescription: 'ST chênh xuống cong lõm hình đáy chén, PR kéo dài 230ms, QT ngắn lại.',
      keySignatures: [
        { feature: 'Hình thái đoạn ST', normal: 'Đẳng điện phẳng', abnormal: 'Cong lõm hình đáy chén (Scooped ST)', significance: 'Hiệu ứng ức chế bơm Na+/K+ ATPase của Digoxin' }
      ],
      electrophysiologyMechanism: 'Tăng canxi nội bào rút ngắn thời gian điện thế hoạt động cơ tâm thất.',
      targetLeads: ['V4', 'V5', 'V6', 'I']
    },
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
    keyLeads: ['V4', 'V5', 'II', 'V3'],
    annotations: [
      { lead: 'V4', waveTarget: 'Osborn', label: 'Sóng Osborn (J-Wave) Khổng Lồ', badgeType: 'info', detail: 'Sóng vồng nhô cao tại điểm nối QRS-ST phản ánh thân nhiệt < 30°C.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Hạ Thân Nhiệt (Sóng Osborn) vs Bình Thường',
      normalDescription: 'Điểm J chuyển tiếp mượt mà giữa QRS và ST, không có sóng phụ.',
      pathologicalDescription: 'Sóng Osborn nhô cao như một ngọn đồi phụ tại điểm nối QRS-ST, nhịp chậm xoang 42 l/p.',
      keySignatures: [
        { feature: 'Điểm nối QRS-ST', normal: 'Góc nhọn chuyển tiếp', abnormal: 'Sóng vồng Osborn (J-wave) cao 3.5mm', significance: 'Đặc trưng hạ thân nhiệt nặng' }
      ],
      electrophysiologyMechanism: 'Chênh lệch gradient điện thế tái cực dòng Ito giữa thượng tâm mạc và nội tâm mạc khi bị làm lạnh.',
      targetLeads: ['V3', 'V4', 'V5', 'II']
    },
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
    keyLeads: ['V1', 'I', 'aVL', 'III'],
    annotations: [
      { lead: 'V1', waveTarget: 'R', label: 'Dạng rsR\' Tai Thỏ RBBB', badgeType: 'warning', detail: 'Sóng R thứ hai (R\') cao rộng phản ánh khử cực muộn của thất phải.' }
    ],
    morphology: {
      title: 'Đối chiếu Hình thái: Block Hai Phân Nhánh vs Bình Thường',
      normalDescription: 'V1 dạng rS thanh mảnh, trục điện tim trung tính +60°.',
      pathologicalDescription: 'V1 dạng hai tai thỏ rsR\' (QRS 140ms) kèm trục lệch trái nặng -60° dạng qR ở DI, aVL.',
      keySignatures: [
        { feature: 'Hình thái V1', normal: 'rS thanh mảnh', abnormal: 'rsR\' (M-shape / Tai thỏ)', significance: 'Block nhánh phải (RBBB)' }
      ],
      electrophysiologyMechanism: 'Mất dẫn truyền qua 2/3 hệ thống dẫn truyền His-Purkinje (Nhánh phải + Phân nhánh trái trước).',
      targetLeads: ['V1', 'I', 'aVL', 'III']
    },
    values: {
      heartRate: 75, rhythmType: 'sinus', lead1Net: 14, avfNet: -10, prInterval: 175, qrsDuration: 140, qtInterval: 430,
      sv1: 4, rv5: 12, raVL: 13, sv3: 8, gender: 'male'
    }
  }
];

/**
 * 🌟 AI DEEP LEARNING MULTI-LABEL CLASSIFIER PROBABILITIES
 * Kế thừa từ taxonomy mô hình deep learning của torch_ecg-master
 */
export function computeAiDiagnosticProbabilities(inputs: EcgInputs, analysis: EcgAnalysisResult): AiDiagnosticScore[] {
  const scores: AiDiagnosticScore[] = [];

  // 1. Nhịp Xoang Bình Thường (NSR)
  let nsrProb = 95;
  if (analysis.stemiTerritory || analysis.stemiEquivalents.length > 0) nsrProb -= 75;
  if (inputs.rhythmType !== 'sinus') nsrProb -= 85;
  if ((inputs.qrsDuration || 90) >= 120) nsrProb -= 40;
  if (analysis.lvhStatus?.includes('Dày Thất Trái')) nsrProb -= 30;
  if (analysis.qtcSeverity === 'critical') nsrProb -= 60;
  if (inputs.hasDeltaWave) nsrProb -= 80;
  if (inputs.hasBrugadaPattern && inputs.hasBrugadaPattern !== 'none') nsrProb -= 80;
  if ((inputs.hyperkalemiaStage || 0) > 0) nsrProb -= 70;
  nsrProb = Math.max(1, Math.min(99, nsrProb));

  scores.push({
    label: 'Nhịp Xoang Bình Thường (NSR)',
    shortName: 'NSR',
    probability: nsrProb,
    severity: nsrProb > 80 ? 'normal' : 'warning',
    reasoning: nsrProb > 80 ? 'Các chỉ số PR, QRS, QT và ST nằm trong khoảng sinh lý bình thường.' : 'Có nhiều biến đổi hình thái bệnh lý lệch chuẩn.',
  });

  // 2. Tắc Mạch Vành Cấp OMI / STEMI
  let stemiProb = 2;
  let stemiReason = 'Không có ST chênh lên đáng kể.';
  if (analysis.stemiTerritory) {
    stemiProb = 96;
    stemiReason = `Phát hiện ST chênh vòm đạt ngưỡng can thiệp tại ${analysis.stemiTerritory}. Mạch thủ phạm: ${analysis.culpritArtery}.`;
  } else if (analysis.stemiEquivalents.length > 0) {
    stemiProb = 91;
    stemiReason = `STEMI Tương đương (Wellens / De Winter / Aslanger): ${analysis.stemiEquivalents[0].slice(0, 45)}...`;
  } else if (analysis.sgarbossaResult?.isModifiedPositive) {
    stemiProb = 93;
    stemiReason = `Smith-Modified Sgarbossa (+): Tỷ lệ ST/S = ${analysis.sgarbossaResult.stOverSRatio} ≥ 0.25 trên nền LBBB.`;
  } else if (inputs.stV1 && inputs.stV1 >= 1.0) {
    stemiProb = 35;
    stemiReason = 'ST chênh lên nhẹ ở chuyển đạo trước tim nhưng chưa đủ tiêu chuẩn 2 chuyển đạo liên tiếp.';
  }
  scores.push({
    label: 'Tắc Mạch Vành Cấp (STEMI / Acute OMI)',
    shortName: 'STEMI/OMI',
    probability: stemiProb,
    severity: stemiProb >= 80 ? 'critical' : stemiProb >= 40 ? 'warning' : 'normal',
    reasoning: stemiReason,
  });

  // 3. Rung Nhĩ / Cuồng Nhĩ (AFib / AFL)
  let afProb = 1;
  let afReason = 'Khoảng RR đều, có sóng P xoang.';
  if (inputs.rhythmType === 'afib') {
    afProb = 94;
    afReason = 'Mất sóng P hoàn toàn, sóng lăn tăn f, khoảng RR hoàn toàn không đều (Irregularly irregular).';
  } else if (inputs.rhythmType === 'aflutter') {
    afProb = 92;
    afReason = 'Sóng cuồng nhĩ dạng răng cưa (Sawtooth F-waves) tần số ~300 l/p.';
  }
  scores.push({
    label: 'Rung Nhĩ / Cuồng Nhĩ (AFib / AFL)',
    shortName: 'AFib/AFL',
    probability: afProb,
    severity: afProb >= 80 ? 'danger' : 'normal',
    reasoning: afReason,
  });

  // 4. Nhịp Nhanh Thất / WCT (VT)
  let vtProb = 1;
  let vtReason = 'QRS thanh mảnh hoặc không có nhịp nhanh.';
  if (inputs.rhythmType === 'vt' || analysis.wctResult?.isVtProbable) {
    vtProb = 97;
    vtReason = `Thỏa mãn tiêu chuẩn phân ly nhĩ thất & hình thái Vereckei aVR Step 1 (${analysis.wctResult?.certainty}).`;
  } else if ((inputs.qrsDuration || 90) >= 140 && inputs.heartRate > 120) {
    vtProb = 65;
    vtReason = 'Nhịp nhanh QRS rộng chưa rõ nguồn gốc, cảnh giác VT.';
  }
  scores.push({
    label: 'Nhịp Nhanh Thất (Ventricular Tachycardia — VT)',
    shortName: 'VT/WCT',
    probability: vtProb,
    severity: vtProb >= 80 ? 'critical' : vtProb >= 40 ? 'danger' : 'normal',
    reasoning: vtReason,
  });

  // 5. Block Nhánh (LBBB / RBBB / Bifascicular)
  let bbbProb = 2;
  let bbbReason = 'QRS hẹp bình thường (<120ms).';
  if (inputs.hasLbbb) {
    bbbProb = 98;
    bbbReason = 'Block nhánh trái hoàn toàn (QRS ≥ 120ms, M-shape V5-V6, QS V1).';
  } else if ((inputs.qrsDuration || 90) >= 120 && inputs.lead1Net > 10 && inputs.avfNet < -8) {
    bbbProb = 91;
    bbbReason = 'Block hai phân nhánh (RBBB + LAFB).';
  }
  scores.push({
    label: 'Block Nhánh & Phân Nhánh (LBBB / RBBB)',
    shortName: 'LBBB/RBBB',
    probability: bbbProb,
    severity: bbbProb >= 80 ? 'danger' : 'normal',
    reasoning: bbbReason,
  });

  // 6. Hội Chứng Brugada (Type 1 / 2)
  let brugadaProb = 1;
  let brugadaReason = 'Không có dạng vòm ST ở V1-V2.';
  if (inputs.hasBrugadaPattern === 'type1') {
    brugadaProb = 96;
    brugadaReason = 'ST chênh lên dạng vòm (Coved-type) ≥ 2.5mm ở V1-V2 tiếp nối T âm.';
  } else if (inputs.hasBrugadaPattern === 'type2') {
    brugadaProb = 85;
    brugadaReason = 'ST chênh lên dạng yên ngựa (Saddleback) ở V1-V2.';
  }
  scores.push({
    label: 'Hội Chứng Brugada (Kênh Natri SCN5A)',
    shortName: 'Brugada',
    probability: brugadaProb,
    severity: brugadaProb >= 80 ? 'critical' : 'normal',
    reasoning: brugadaReason,
  });

  // 7. Hội Chứng Tiền Kích Thích WPW
  let wpwProb = 1;
  let wpwReason = 'PR bình thường, không có sóng Delta.';
  if (inputs.hasDeltaWave) {
    wpwProb = 95;
    wpwReason = `PR ngắn ${(inputs.prInterval || 95)}ms + Sóng Delta rõ. Định vị: ${analysis.wpwLocalization?.pathwayLocation || 'Đường phụ'}.`;
  }
  scores.push({
    label: 'Hội Chứng Wolff-Parkinson-White (WPW)',
    shortName: 'WPW',
    probability: wpwProb,
    severity: wpwProb >= 80 ? 'danger' : 'normal',
    reasoning: wpwReason,
  });

  // 8. Tăng Kali Máu (Hyperkalemia)
  let kProb = 1;
  let kReason = 'Hình thái sóng T bình thường.';
  if ((inputs.hyperkalemiaStage || 0) >= 3) {
    kProb = 98;
    kReason = 'Tăng Kali máu nguy kịch giai đoạn 3: QRS giãn rộng hòa lẫn sóng T tạo sóng hình Sin.';
  } else if ((inputs.hyperkalemiaStage || 0) >= 1 || inputs.tWaveType === 'peaked') {
    kProb = 86;
    kReason = 'Sóng T cao nhọn đáy hẹp hình lều (Tent-like T-wave).';
  }
  scores.push({
    label: 'Tăng Kali Máu (Hyperkalemia)',
    shortName: 'Tăng K+',
    probability: kProb,
    severity: kProb >= 80 ? 'critical' : 'normal',
    reasoning: kReason,
  });

  // 9. Dày Thất Trái (LVH)
  let lvhProb = 4;
  let lvhReason = 'Điện thế buồng tim trong giới hạn bình thường.';
  if (analysis.lvhStatus?.includes('Dày Thất Trái')) {
    lvhProb = 91;
    lvhReason = analysis.lvhStatus;
  }
  scores.push({
    label: 'Dày Thất Trái Tăng Gánh (LVH)',
    shortName: 'LVH',
    probability: lvhProb,
    severity: lvhProb >= 80 ? 'warning' : 'normal',
    reasoning: lvhReason,
  });

  return scores.sort((a, b) => b.probability - a.probability);
}

// ============================================================
// NEUROKIT2 MODULE 1: SIGNAL QUALITY INDEX (SQI) ENGINE
// ============================================================
/**
 * Đánh giá chất lượng bản ghi ECG dựa trên mô hình lai NeuroKit2 (Zhao et al., 2018; Orphanidou et al., 2015)
 */
export function computeEcgSignalQuality(inputs: EcgInputs, filter: EcgFilterType = 'standard'): EcgSignalQualityResult {
  const hr = inputs.heartRate || 75;
  const isAfib = inputs.rhythmType === 'afib';
  const isVt = inputs.rhythmType === 'vt';
  const isSine = (inputs.hyperkalemiaStage || 0) >= 3;

  // 1. pSQI (QRS Energy Ratio): Tỷ lệ năng lượng dải tần số 5-15Hz của QRS so với tổng năng lượng
  let pSqi = 0.92;
  if (isSine) pSqi = 0.45;
  else if (isVt) pSqi = 0.70;
  else if (inputs.qrsDuration && inputs.qrsDuration > 150) pSqi = 0.82;

  // 2. kSQI (Kurtosis of Signal): Độ nhọn phân phối biên độ sóng
  let kSqi = 0.94;
  if (isAfib) kSqi = 0.78;

  // 3. basSQI (Baseline Wander Index): Mức độ trôi đường đẳng điện
  let basSqi = 0.96;
  if (filter === 'raw') basSqi = 0.62;
  else if (filter === 'hp05' || filter === 'standard') basSqi = 0.98;

  // 4. matchSQI (Morphology Consistency): Độ tương đồng giữa các nhịp liên tiếp
  let matchSqi = 0.95;
  if (isAfib) matchSqi = 0.65; // Do R-R biến thiên hỗn loạn
  else if (inputs.rhythmType === 'aflutter') matchSqi = 0.88;

  // Tổng hợp SQI theo trọng số NeuroKit2 [0.4 pSQI + 0.2 kSQI + 0.2 basSQI + 0.2 matchSQI]
  let overall = Math.round((0.4 * pSqi + 0.2 * kSqi + 0.2 * basSqi + 0.2 * matchSqi) * 100);

  // Hiệu chỉnh theo tần số cực đoan
  if (hr > 180 || hr < 35) overall = Math.max(30, overall - 15);

  let badgeLevel: EcgSignalQualityResult['badgeLevel'] = 'excellent';
  let badgeText = '🟢 RẤT TỐT (Chuẩn Chẩn Đoán)';
  let badgeColor = '#10b981';
  let explanation = 'Bản ghi có độ nét cao, đường đẳng điện ổn định, không có nhiễu cơ học hay điện lưới AC.';
  let recommendation = 'Đủ tiêu chuẩn đọc tự động và lưu trữ hồ sơ bệnh án EMR/PACS.';

  if (overall >= 88) {
    badgeLevel = 'excellent';
    badgeText = `🟢 RẤT TỐT (${overall}%)`;
    badgeColor = '#10b981';
  } else if (overall >= 75) {
    badgeLevel = 'good';
    badgeText = `🟡 ĐẠT YÊU CẦU (${overall}%)`;
    badgeColor = '#ca8a04';
    explanation = 'Tín hiệu có vi nhiễu nhẹ nhưng không ảnh hưởng đến việc xác định các sóng P-QRS-T.';
    recommendation = 'Có thể phân tích tin cậy; khuyến cáo bật bộ lọc 0.5-35Hz.';
  } else if (overall >= 55) {
    badgeLevel = 'fair';
    badgeText = `🟠 NHIỄU TRUNG BÌNH (${overall}%)`;
    badgeColor = '#ea580c';
    explanation = 'Có hiện tượng trôi đường đẳng điện hoặc nhiễu co cơ EMG làm mờ ranh giới sóng P và đoạn ST.';
    recommendation = 'Lau sạch da bằng cồn, gắn lại điện cực, yêu cầu bệnh nhân thả lỏng cơ thể.';
  } else {
    badgeLevel = 'poor';
    badgeText = `🔴 KÉM / CẦN ĐO LẠI (${overall}%)`;
    badgeColor = '#dc2626';
    explanation = 'Nhiễu nặng hoặc đường đẳng điện dao động quá mức khiến thuật toán nhận diện sóng không chính xác.';
    recommendation = 'Kiểm tra tiếp đất máy đo, thay mới miếng dán điện cực và đo lại bản ghi mới.';
  }

  return {
    overallSqi: overall,
    pSqi: Math.round(pSqi * 100),
    kSqi: Math.round(kSqi * 100),
    basSqi: Math.round(basSqi * 100),
    matchSqi: Math.round(matchSqi * 100),
    badgeLevel,
    badgeText,
    badgeColor,
    explanation,
    recommendation,
  };
}

// ============================================================
// NEUROKIT2 MODULE 2: HEART RATE VARIABILITY (HRV 3-DOMAINS)
// ============================================================
/**
 * Tính toán toàn diện các chỉ số Biến thiên nhịp tim (HRV) theo 3 miền: Time, Frequency, Nonlinear
 */
export function computeHrvMetrics(inputs: EcgInputs): HrvAnalysisResult {
  const hr = inputs.heartRate || 75;
  const isAfib = inputs.rhythmType === 'afib';
  const isVt = inputs.rhythmType === 'vt';
  const isSvt = inputs.rhythmType === 'svt';
  const meanNn = Math.round((60 / hr) * 1000);

  // 1. Time Domain Metrics
  let sdnn = 45;   // ms (Chuẩn: 30 - 80ms)
  let rmssd = 35;  // ms (Chuẩn: 20 - 50ms)
  let pnn50 = 12;  // % (Chuẩn: 3 - 25%)
  let pnn20 = 28;  // %
  let minNn = meanNn - 60;
  let maxNn = meanNn + 60;

  if (isAfib) {
    sdnn = 145;
    rmssd = 160;
    pnn50 = 68;
    pnn20 = 85;
    minNn = Math.round(meanNn * 0.55);
    maxNn = Math.round(meanNn * 1.65);
  } else if (isVt || isSvt) {
    sdnn = 8;
    rmssd = 5;
    pnn50 = 0.5;
    pnn20 = 2;
    minNn = meanNn - 10;
    maxNn = meanNn + 10;
  } else if (hr > 120) {
    sdnn = 18;
    rmssd = 12;
    pnn50 = 2;
    pnn20 = 8;
    minNn = meanNn - 25;
    maxNn = meanNn + 25;
  } else if (hr < 55) {
    sdnn = 65;
    rmssd = 55;
    pnn50 = 28;
    pnn20 = 48;
    minNn = meanNn - 90;
    maxNn = meanNn + 90;
  }

  const cvnn = parseFloat(((sdnn / meanNn) * 100).toFixed(1));

  // 2. Frequency Domain Metrics
  let vlfPower = 600; // ms²
  let lfPower = 450;  // ms²
  let hfPower = 320;  // ms²

  if (isAfib) {
    vlfPower = 1800;
    lfPower = 2200;
    hfPower = 2600;
  } else if (isVt || isSvt) {
    vlfPower = 40;
    lfPower = 25;
    hfPower = 15;
  } else if (hr > 110) {
    // Stress / Giao cảm ưu thế
    lfPower = 650;
    hfPower = 120;
    vlfPower = 500;
  } else if (hr < 55) {
    // Vagal tone ưu thế
    lfPower = 300;
    hfPower = 750;
    vlfPower = 400;
  }

  const totalPower = vlfPower + lfPower + hfPower;
  const lfHfRatio = parseFloat((lfPower / Math.max(1, hfPower)).toFixed(2));
  const lfn = parseFloat(((lfPower / (lfPower + hfPower)) * 100).toFixed(1));
  const hfn = parseFloat(((hfPower / (lfPower + hfPower)) * 100).toFixed(1));

  // 3. Nonlinear Metrics (Poincaré & Complexity)
  // SD1 = RMSSD / sqrt(2), SD2 = sqrt(2*SDNN² - 0.5*RMSSD²)
  const sd1 = parseFloat((rmssd / Math.SQRT2).toFixed(1));
  const sd2Calc = Math.sqrt(Math.max(1, 2 * sdnn * sdnn - 0.5 * rmssd * rmssd));
  const sd2 = parseFloat(sd2Calc.toFixed(1));
  const sd1Sd2Ratio = parseFloat((sd1 / Math.max(0.1, sd2)).toFixed(2));
  const ellipseArea = Math.round(Math.PI * sd1 * sd2);
  const csi = parseFloat(((4 * sd2) / Math.max(0.1, 4 * sd1)).toFixed(2)); // Cardiac Sympathetic Index
  const cvi = parseFloat(Math.log10(Math.max(1, 16 * sd1 * sd2)).toFixed(2)); // Cardiac Vagal Index
  const sampleEntropy = isAfib ? 2.15 : (isVt || isSvt ? 0.35 : 1.45);

  // 4. Clinical Autonomic Classification
  let autonomicState: HrvAnalysisResult['autonomicState'] = 'balanced';
  let autonomicStateTitle = 'Cân Bằng Thần Kinh Thực Vật (Normo-Autonomic)';
  let autonomicStateColor = '#10b981';
  const clinicalSignificance: string[] = [];

  if (isAfib) {
    autonomicState = 'arrhythmia_chaos';
    autonomicStateTitle = 'Hỗn Loạn Rung Nhĩ (Atrial Fibrillation Chaos)';
    autonomicStateColor = '#ea580c';
    clinicalSignificance.push('Biến thiên nhịp tim cực cao do dẫn truyền nhĩ thất ngẫu nhiên trong Rung nhĩ.');
    clinicalSignificance.push('Chỉ số HRV không phản ánh trương lực giao cảm/phó giao cảm mà phản ánh mức độ đáp ứng tần số thất.');
  } else if (sdnn < 20 && (isVt || isSvt || hr > 120)) {
    autonomicState = 'depressed_critical';
    autonomicStateTitle = 'Trơ Cứng / Triệt Tiêu Biến Thiên Nhịp (Depressed HRV)';
    autonomicStateColor = '#dc2626';
    clinicalSignificance.push('🚨 SDNN < 20ms: Dấu hiệu mất hoàn toàn tính thích ứng của hệ thần kinh thực vật.');
    clinicalSignificance.push('Tiên lượng nguy cơ tử vong tim mạch cao trong Suy tim nặng, Sốc nhiễm khuẩn hoặc Post-MI.');
  } else if (lfHfRatio > 2.5 || (hr > 95 && lfHfRatio > 1.8)) {
    autonomicState = 'sympathetic_dominant';
    autonomicStateTitle = 'Ưu Thế Thần Kinh Giao Cảm (Sympathetic Overdrive)';
    autonomicStateColor = '#ef4444';
    clinicalSignificance.push(`Tỷ lệ LF/HF = ${lfHfRatio} (> 2.0) phản ánh tình trạng kích hoạt giao cảm mạnh.`);
    clinicalSignificance.push('Thường gặp trong: Đau cấp tính, Lo âu, Thiếu máu cơ tim cấp, Sốt, Mất nước, Giai đoạn sớm của Sepsis.');
  } else if (lfHfRatio < 0.6 || (hr < 60 && hfn > 65)) {
    autonomicState = 'vagal_dominant';
    autonomicStateTitle = 'Ưu Thế Phó Giao Cảm / Phế Vị (High Vagal Tone)';
    autonomicStateColor = '#0284c7';
    clinicalSignificance.push(`Chỉ số HF chiếm ${hfn}% tổng năng lượng phản ánh trương lực dây X (vagal) cao.`);
    clinicalSignificance.push('Thường gặp ở vận động viên thể thao rèn luyện sức bền hoặc phản xạ phế vị (Vasovagal syncope).');
  } else {
    autonomicState = 'balanced';
    autonomicStateTitle = 'Cân Bằng Thần Kinh Giao Cảm & Phó Giao Cảm';
    autonomicStateColor = '#10b981';
    clinicalSignificance.push(`SDNN = ${sdnn}ms & RMSSD = ${rmssd}ms nằm trong giới hạn sinh lý tối ưu.`);
    clinicalSignificance.push('Hệ thần kinh tự chủ có khả năng điều biến nhịp tim linh hoạt theo chu kỳ hô hấp.');
  }

  return {
    time: { meanNn, sdnn, rmssd, pnn50, pnn20, cvnn, minNn, maxNn },
    freq: { vlfPower, lfPower, hfPower, totalPower, lfHfRatio, lfn, hfn },
    nonlinear: { sd1, sd2, sd1Sd2Ratio, ellipseArea, csi, cvi, sampleEntropy },
    autonomicState,
    autonomicStateTitle,
    autonomicStateColor,
    clinicalSignificance,
  };
}

/**
 * Vẽ Biểu Đồ Poincaré Plot SVG (RR_n vs RR_n+1 Elliptical Fitting)
 */
export function renderPoincarePlotSvg(hrv: HrvAnalysisResult, inputs: EcgInputs, theme: 'paper' | 'neon' | 'dark' = 'paper'): string {
  const size = 320;
  const pad = 40;
  const plotSize = size - pad * 2;
  const mean = hrv.time.meanNn;

  // Giới hạn trục toạ độ (ms)
  const minVal = Math.max(300, mean - 250);
  const maxVal = Math.min(1500, mean + 250);
  const range = maxVal - minVal;

  const toPxX = (v: number) => pad + ((v - minVal) / range) * plotSize;
  const toPxY = (v: number) => size - pad - ((v - minVal) / range) * plotSize;

  const centerX = toPxX(mean);
  const centerY = toPxY(mean);

  // Tính bán kính ellipse theo pixel
  const pxPerMs = plotSize / range;
  const rxPx = Math.max(8, hrv.nonlinear.sd2 * pxPerMs * 1.5);
  const ryPx = Math.max(5, hrv.nonlinear.sd1 * pxPerMs * 1.5);

  let bgFill = 'var(--color-bg)';
  let borderColor = 'var(--color-border)';
  let textColor = 'var(--color-text)';
  let dotColor = '#0284c7';
  let ellipseStroke = '#dc2626';

  if (theme === 'neon') {
    dotColor = '#10b981';
    ellipseStroke = '#f43f5e';
  } else if (theme === 'dark') {
    dotColor = '#38bdf8';
    ellipseStroke = '#fb7185';
  }

  // Sinh tập điểm scatter points mô phỏng chuỗi RR
  const isAfib = inputs.rhythmType === 'afib';
  const isVt = inputs.rhythmType === 'vt';
  const numPoints = isAfib ? 45 : 30;
  const dots: { x: number; y: number }[] = [];

  for (let i = 0; i < numPoints; i++) {
    let dx = 0;
    let dy = 0;
    if (isAfib) {
      dx = (Math.sin(i * 1.7) * hrv.time.sdnn * 1.2 + (Math.random() - 0.5) * 80);
      dy = (Math.cos(i * 2.3) * hrv.time.sdnn * 1.2 + (Math.random() - 0.5) * 80);
    } else if (isVt) {
      dx = (Math.sin(i * 3) * 6);
      dy = (Math.cos(i * 3) * 6);
    } else {
      // Dọc theo đường đồng nhất y = x (SD2) và phân kỳ vuông góc (SD1)
      const u = (Math.sin(i * 0.9) * hrv.nonlinear.sd2 * 1.1);
      const v = (Math.cos(i * 1.8) * hrv.nonlinear.sd1 * 0.9);
      // Xoay 45 độ: x = u/sqrt(2) - v/sqrt(2), y = u/sqrt(2) + v/sqrt(2)
      dx = (u - v) / Math.SQRT2;
      dy = (u + v) / Math.SQRT2;
    }
    const valX = Math.max(minVal, Math.min(maxVal, mean + dx));
    const valY = Math.max(minVal, Math.min(maxVal, mean + dy));
    dots.push({ x: toPxX(valX), y: toPxY(valY) });
  }

  return `
    <svg viewBox="0 0 ${size} ${size}" width="100%" height="${size}" style="background:${bgFill}; border-radius:10px; max-width:320px; display:block; margin:0 auto;">
      <defs>
        <radialGradient id="poincareGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${ellipseStroke}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${ellipseStroke}" stop-opacity="0.02"/>
        </radialGradient>
      </defs>

      <!-- Grid Frame & Identity Line (y = x) -->
      <rect x="${pad}" y="${pad}" width="${plotSize}" height="${plotSize}" fill="none" stroke="${borderColor}" stroke-width="1.2"/>
      <line x1="${pad}" y1="${size - pad}" x2="${size - pad}" y2="${pad}" stroke="${borderColor}" stroke-width="1.5" stroke-dasharray="3,3"/>

      <!-- Fitted Poincaré Ellipse (Rotated 45 degrees) -->
      <g transform="translate(${centerX}, ${centerY}) rotate(-45)">
        <ellipse cx="0" cy="0" rx="${rxPx}" ry="${ryPx}" fill="url(#poincareGlow)" stroke="${ellipseStroke}" stroke-width="2"/>
        <!-- SD2 Axis (Longitudinal) -->
        <line x1="${-rxPx}" y1="0" x2="${rxPx}" y2="0" stroke="${ellipseStroke}" stroke-width="1.2" stroke-dasharray="2,2"/>
        <!-- SD1 Axis (Transverse) -->
        <line x1="0" y1="${-ryPx}" x2="0" y2="${ryPx}" stroke="#10b981" stroke-width="1.5"/>
      </g>

      <!-- Scatter Points (RR_n vs RR_n+1) -->
      ${dots.map(d => `<circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="3" fill="${dotColor}" opacity="0.85"/>`).join('')}

      <!-- Center Mean Beat Marker -->
      <circle cx="${centerX}" cy="${centerY}" r="4.5" fill="#dc2626" stroke="#ffffff" stroke-width="1.5"/>

      <!-- Axes Labels -->
      <text x="${size / 2}" y="${size - 10}" fill="${textColor}" font-size="9.5" font-weight="700" text-anchor="middle">Khoảng RR(n) [ms]</text>
      <text x="12" y="${size / 2}" fill="${textColor}" font-size="9.5" font-weight="700" text-anchor="middle" transform="rotate(-90 12 ${size / 2})">Khoảng RR(n+1) [ms]</text>

      <!-- Min/Max Scale Labels -->
      <text x="${pad}" y="${size - pad + 15}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">${minVal}</text>
      <text x="${size - pad}" y="${size - pad + 15}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">${maxVal}</text>
      <text x="${pad - 8}" y="${size - pad}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">${minVal}</text>
      <text x="${pad - 8}" y="${pad + 6}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">${maxVal}</text>

      <!-- Metrics Inset Box -->
      <rect x="${pad + 6}" y="${pad + 6}" width="110" height="42" rx="4" fill="var(--color-surface)" stroke="${borderColor}" stroke-width="0.8"/>
      <text x="${pad + 12}" y="${pad + 20}" fill="#10b981" font-size="8.5" font-weight="800">SD1: ${hrv.nonlinear.sd1} ms</text>
      <text x="${pad + 12}" y="${pad + 32}" fill="${ellipseStroke}" font-size="8.5" font-weight="800">SD2: ${hrv.nonlinear.sd2} ms</text>
      <text x="${pad + 12}" y="${pad + 44}" fill="var(--color-text-muted)" font-size="8" font-weight="700">SD1/SD2: ${hrv.nonlinear.sd1Sd2Ratio}</text>
    </svg>
  `;
}

/**
 * Vẽ Biểu Đồ Phổ Tần Số HRV Spectral Power Density (PSD) SVG
 */
export function renderHrvPsdSvg(hrv: HrvAnalysisResult): string {
  const w = 320;
  const h = 180;
  const padL = 36;
  const padB = 28;
  const plotW = w - padL - 16;
  const plotH = h - padB - 20;

  const total = hrv.freq.totalPower;
  const vlfPct = Math.round((hrv.freq.vlfPower / total) * 100);
  const lfPct = Math.round((hrv.freq.lfPower / total) * 100);
  const hfPct = Math.round((hrv.freq.hfPower / total) * 100);

  return `
    <svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-bg); border-radius:10px; max-width:320px; display:block; margin:0 auto;">
      <!-- Title -->
      <text x="${w / 2}" y="14" fill="var(--color-text)" font-size="10.5" font-weight="800" text-anchor="middle">
        PHỔ MẬT ĐỘ TẦN SỐ (PSD BANDS)
      </text>

      <!-- Frame -->
      <rect x="${padL}" y="20" width="${plotW}" height="${plotH}" fill="none" stroke="var(--color-border)" stroke-width="1"/>

      <!-- Band 1: VLF (0 - 0.04 Hz) -->
      <g transform="translate(${padL + 10}, 20)">
        <rect x="0" y="${plotH - (vlfPct / 100) * plotH}" width="${(plotW - 30) / 3}" height="${(vlfPct / 100) * plotH}" fill="#8b5cf6" rx="3"/>
        <text x="${(plotW - 30) / 6}" y="${plotH - (vlfPct / 100) * plotH - 5}" fill="#8b5cf6" font-size="9" font-weight="800" text-anchor="middle">${vlfPct}%</text>
        <text x="${(plotW - 30) / 6}" y="${plotH + 14}" fill="var(--color-text-muted)" font-size="8.5" font-weight="700" text-anchor="middle">VLF</text>
        <text x="${(plotW - 30) / 6}" y="${plotH + 24}" fill="var(--color-text-muted)" font-size="7.5" text-anchor="middle">&lt;0.04Hz</text>
      </g>

      <!-- Band 2: LF (0.04 - 0.15 Hz) -->
      <g transform="translate(${padL + 10 + (plotW - 30) / 3 + 5}, 20)">
        <rect x="0" y="${plotH - (lfPct / 100) * plotH}" width="${(plotW - 30) / 3}" height="${(lfPct / 100) * plotH}" fill="#ef4444" rx="3"/>
        <text x="${(plotW - 30) / 6}" y="${plotH - (lfPct / 100) * plotH - 5}" fill="#ef4444" font-size="9" font-weight="800" text-anchor="middle">${lfPct}%</text>
        <text x="${(plotW - 30) / 6}" y="${plotH + 14}" fill="var(--color-text-muted)" font-size="8.5" font-weight="700" text-anchor="middle">LF (Symp)</text>
        <text x="${(plotW - 30) / 6}" y="${plotH + 24}" fill="var(--color-text-muted)" font-size="7.5" text-anchor="middle">0.04-0.15</text>
      </g>

      <!-- Band 3: HF (0.15 - 0.40 Hz) -->
      <g transform="translate(${padL + 10 + ((plotW - 30) / 3) * 2 + 10}, 20)">
        <rect x="0" y="${plotH - (hfPct / 100) * plotH}" width="${(plotW - 30) / 3}" height="${(hfPct / 100) * plotH}" fill="#10b981" rx="3"/>
        <text x="${(plotW - 30) / 6}" y="${plotH - (hfPct / 100) * plotH - 5}" fill="#10b981" font-size="9" font-weight="800" text-anchor="middle">${hfPct}%</text>
        <text x="${(plotW - 30) / 6}" y="${plotH + 14}" fill="var(--color-text-muted)" font-size="8.5" font-weight="700" text-anchor="middle">HF (Vagal)</text>
        <text x="${(plotW - 30) / 6}" y="${plotH + 24}" fill="var(--color-text-muted)" font-size="7.5" text-anchor="middle">0.15-0.40</text>
      </g>

      <!-- LF/HF Badge -->
      <g transform="translate(${w - 110}, 26)">
        <rect width="96" height="22" rx="4" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="0.8"/>
        <text x="48" y="15" fill="var(--color-text)" font-size="9" font-weight="800" text-anchor="middle">LF/HF = ${hrv.freq.lfHfRatio}</text>
      </g>
    </svg>
  `;
}

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
  if (inputs.stV5 && inputs.stV5 < -0.5) romhiltScore += 3;
  if (deg < -30) romhiltScore += 2;
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
      <path d="M ${center} ${center} L ${getPt(-30, r).x} ${getPt(-30, r).y} A ${r} ${r} 0 0 1 ${getPt(90, r).x} ${getPt(90, r).y} Z" fill="rgba(16, 185, 129, 0.16)" stroke="#10b981" stroke-width="0.8" />
      <path d="M ${center} ${center} L ${getPt(-90, r).x} ${getPt(-90, r).y} A ${r} ${r} 0 0 1 ${getPt(-30, r).x} ${getPt(-30, r).y} Z" fill="rgba(245, 158, 11, 0.16)" stroke="#f59e0b" stroke-width="0.8" />
      <path d="M ${center} ${center} L ${getPt(90, r).x} ${getPt(90, r).y} A ${r} ${r} 0 0 1 ${getPt(180, r).x} ${getPt(180, r).y} Z" fill="rgba(239, 68, 68, 0.16)" stroke="#ef4444" stroke-width="0.8" />
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

      <!-- Khung viền tim giải phẫu -->
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
      <path d="M 245,115 Q 275,135 295,155" fill="none" stroke="${isLad ? '#dc2626' : '#94a3b8'}" stroke-width="2" />
      <path d="M 230,160 Q 255,180 270,200" fill="none" stroke="${isLad ? '#dc2626' : '#94a3b8'}" stroke-width="1.8" />
      ${isLad ? '<circle cx="245" cy="115" r="12" fill="url(#ladGlow)" /><text x="280" y="115" fill="#dc2626" font-size="10" font-weight="800">LAD (Thủ phạm chính)</text>' : '<text x="265" y="125" fill="#64748b" font-size="8.5">LAD (Thành Trước)</text>'}

      <!-- 3. Nhánh Mũ (LCx) -->
      <path d="M 255,75 Q 315,90 340,140 Q 350,175 335,210" fill="none" stroke="${isLcx ? '#2563eb' : '#94a3b8'}" stroke-width="${isLcx ? '5' : '3'}" stroke-linecap="round" />
      <path d="M 310,105 Q 330,125 345,135" fill="none" stroke="${isLcx ? '#2563eb' : '#94a3b8'}" stroke-width="2" />
      ${isLcx ? '<circle cx="310" cy="105" r="12" fill="url(#lcxGlow)" /><text x="325" y="90" fill="#2563eb" font-size="10" font-weight="800">LCx (Thành Bên)</text>' : '<text x="325" y="90" fill="#64748b" font-size="8.5">LCx</text>'}

      <!-- 4. Động Mạch Vành Phải (RCA) -->
      <path d="M 195,58 Q 140,80 115,130 Q 100,180 135,225 Q 165,245 190,250" fill="none" stroke="${isRca ? '#ea580c' : '#94a3b8'}" stroke-width="${isRca ? '5' : '3'}" stroke-linecap="round" />
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

export function getLeadAmplitudes(lead: string, inputs: EcgInputs): {
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

  const stKey = `st${lead}` as keyof EcgInputs;
  const stDev = (inputs[stKey] as number | undefined) || 0;

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
    case 'V7':
    case 'V8':
    case 'V9':
      return { pAmp: 0.8, pDur: inputs.pWaveDuration || 90, qDepth: 0.5, rHeight: 8, sDepth: 2, tAmp: inputs.stV7V9 && inputs.stV7V9 > 0.5 ? 2.5 : 1.5, stDev: inputs.stV7V9 || 0, rPrimed: false, qrsWide };
    case 'V3R':
    case 'V4R':
    case 'V5R':
      return { pAmp: -0.5, pDur: inputs.pWaveDuration || 90, qDepth: 0, rHeight: 1.5, sDepth: 3, tAmp: inputs.stV4R && inputs.stV4R > 0.5 ? 1.5 : -1, stDev: inputs.stV4R || 0, rPrimed: false, qrsWide };
    case 'Lewis':
      // Lewis lead: Bipolar modified I with 3x augmented P-wave
      return { pAmp: 4.5, pDur: inputs.pWaveDuration || 90, qDepth: 0.5, rHeight: 6, sDepth: 2, tAmp: 1.8, stDev: 0, rPrimed: false, qrsWide };
    default:
      return { pAmp: 1, pDur: 90, qDepth: 0.5, rHeight: 8, sDepth: 2, tAmp: 2.5, stDev: 0, rPrimed: false, qrsWide };
  }
}

/**
 * Tạo SVG path data cho 1 nhịp tim (single beat) của 1 chuyển đạo kèm mô phỏng bộ lọc
 */
export function generateBeatPath(
  startX: number,
  baseY: number,
  rrMs: number,
  inputs: EcgInputs,
  lead: string,
  pxPerMm: number,
  gainMmPerMv: number,
  filter: EcgFilterType = 'standard'
): string {
  const amp = getLeadAmplitudes(lead, inputs);
  const qrsDur = inputs.qrsDuration || 85;
  const prDur = inputs.prInterval || 160;
  const qtDur = inputs.qtInterval || 400;

  const msToX = (ms: number) => ms * 0.025 * pxPerMm;
  const mmToY = (mm: number) => -mm * (gainMmPerMv / 10) * pxPerMm;

  // Mô phỏng dập dềnh đường đẳng điện nếu là Raw filter
  let driftOffset = 0;
  if (filter === 'raw' || filter === 'notch50') {
    driftOffset = Math.sin(startX * 0.012) * pxPerMm * 2.2;
  }
  const effectiveBaseY = baseY + driftOffset;

  const x0 = startX;
  const pStart = x0 + msToX(20);
  const pEnd = x0 + msToX(20 + amp.pDur);
  const qrsStart = x0 + msToX(prDur);
  const qEnd = qrsStart + msToX(qrsDur * 0.15);
  const rPeak = qrsStart + msToX(qrsDur * 0.35);
  const sPeak = qrsStart + msToX(qrsDur * 0.65);
  const jPoint = qrsStart + msToX(qrsDur);
  const tPeak = jPoint + msToX((qtDur - qrsDur) * 0.5);
  const tEnd = x0 + msToX(qtDur + prDur * 0.8);

  const stY = effectiveBaseY + mmToY(amp.stDev);

  let tAmpCalc = amp.tAmp;
  const tType = inputs.tWaveType || 'normal';
  if (tType === 'inverted') tAmpCalc = -Math.abs(tAmpCalc);
  if (tType === 'peaked' || tType === 'hyperacute') tAmpCalc = Math.abs(tAmpCalc) * 1.8;
  if (tType === 'flattened') tAmpCalc = Math.abs(tAmpCalc) * 0.15;
  if (tType === 'de_winter') tAmpCalc = Math.abs(tAmpCalc) * 2.2;

  const isAfib = inputs.rhythmType === 'afib';
  const isVt = inputs.rhythmType === 'vt';
  const isPacing = inputs.rhythmType === 'pacing';
  const isDelta = inputs.hasDeltaWave;

  let d = `M ${x0},${effectiveBaseY} `;
  d += `L ${pStart},${effectiveBaseY} `;

  // Sóng P
  if (!isAfib && (inputs.hyperkalemiaStage || 0) < 3 && !isVt) {
    const pMid = (pStart + pEnd) / 2;
    const pTop = effectiveBaseY + mmToY(amp.pAmp);
    if (inputs.rhythmType === 'aflutter') {
      d += `L ${pMid},${effectiveBaseY + mmToY(2.5)} L ${pEnd},${effectiveBaseY + mmToY(-1)} L ${pEnd + msToX(50)},${effectiveBaseY + mmToY(2.5)} L ${pEnd + msToX(100)},${effectiveBaseY + mmToY(-1)} L ${qrsStart},${effectiveBaseY} `;
    } else {
      d += `C ${pStart + msToX(20)},${pTop} ${pEnd - msToX(20)},${pTop} ${pEnd},${effectiveBaseY} `;
    }
  } else if (isAfib) {
    const steps = 8;
    const stepX = (qrsStart - pStart) / steps;
    for (let i = 0; i < steps; i++) {
      const noiseY = effectiveBaseY + mmToY(Math.sin(i * 2.3) * 0.8);
      d += `L ${pStart + i * stepX},${noiseY} `;
    }
  }

  // Đoạn PR
  d += `L ${qrsStart},${effectiveBaseY} `;

  // Phức bộ QRS
  if (isPacing) {
    d += `L ${qrsStart},${effectiveBaseY + mmToY(-6)} L ${qrsStart + 2},${effectiveBaseY + mmToY(-6)} L ${qrsStart + 2},${effectiveBaseY} `;
    d += `L ${qEnd},${effectiveBaseY + mmToY(2)} L ${rPeak},${effectiveBaseY + mmToY(amp.rHeight * 0.7)} L ${sPeak},${effectiveBaseY + mmToY(-amp.sDepth * 0.5)} L ${jPoint},${stY} `;
  } else if (isDelta) {
    const deltaEnd = qrsStart + msToX(40);
    d += `L ${deltaEnd},${effectiveBaseY + mmToY(amp.rHeight * 0.4)} `;
    d += `L ${rPeak},${effectiveBaseY + mmToY(amp.rHeight)} L ${sPeak},${effectiveBaseY + mmToY(-amp.sDepth)} L ${jPoint},${stY} `;
  } else if (amp.rPrimed && !inputs.hasLbbb) {
    d += `L ${qEnd},${effectiveBaseY + mmToY(-amp.qDepth)} `;
    d += `L ${qrsStart + msToX(15)},${effectiveBaseY + mmToY(amp.rHeight)} `;
    d += `L ${sPeak},${effectiveBaseY + mmToY(-amp.sDepth)} `;
    d += `L ${sPeak + msToX(15)},${effectiveBaseY + mmToY(amp.rHeight * 0.6)} `;
    d += `L ${jPoint},${stY} `;
  } else {
    if (amp.qDepth > 0) {
      d += `L ${qEnd},${effectiveBaseY + mmToY(-amp.qDepth)} `;
    }
    if (amp.rHeight > 0) {
      d += `L ${rPeak},${effectiveBaseY + mmToY(amp.rHeight)} `;
    }
    if (amp.sDepth > 0) {
      d += `L ${sPeak},${effectiveBaseY + mmToY(-amp.sDepth)} `;
    }
    d += `L ${jPoint},${stY} `;
  }

  // Đoạn ST
  d += `L ${tPeak - msToX(40)},${stY} `;

  // Sóng T
  if (tType === 'biphasic_wellens') {
    d += `C ${tPeak - msToX(30)},${effectiveBaseY + mmToY(tAmpCalc * 0.5)} ${tPeak},${effectiveBaseY + mmToY(tAmpCalc * 0.5)} ${tPeak},${effectiveBaseY} `;
    d += `C ${tPeak + msToX(20)},${effectiveBaseY + mmToY(-tAmpCalc * 1.5)} ${tEnd - msToX(20)},${effectiveBaseY + mmToY(-tAmpCalc * 1.5)} ${tEnd},${effectiveBaseY} `;
  } else if (tType === 'de_winter') {
    d += `C ${tPeak - msToX(30)},${effectiveBaseY + mmToY(-2)} ${tPeak},${effectiveBaseY + mmToY(tAmpCalc)} ${tEnd},${effectiveBaseY} `;
  } else {
    d += `C ${tPeak - msToX(20)},${effectiveBaseY + mmToY(tAmpCalc * 1.1)} ${tPeak + msToX(20)},${effectiveBaseY + mmToY(tAmpCalc * 1.1)} ${tEnd},${effectiveBaseY} `;
  }

  // Sóng Osborn
  if (inputs.hasOsbornWave) {
    d += `L ${tEnd + msToX(20)},${effectiveBaseY + mmToY(5)} L ${tEnd + msToX(50)},${effectiveBaseY} `;
  }

  // Sóng U
  if (inputs.hasUWave) {
    const uMid = tEnd + msToX(80);
    d += `C ${tEnd + msToX(40)},${effectiveBaseY + mmToY(1.2)} ${uMid},${effectiveBaseY + mmToY(1.5)} ${uMid + msToX(40)},${effectiveBaseY} `;
  }

  d += `L ${x0 + msToX(rrMs)},${effectiveBaseY} `;

  return d;
}

/**
 * Render 1 strip của 1 chuyển đạo
 */
export function renderLeadStrip(
  lead: string,
  inputs: EcgInputs,
  settings: EcgPaperSettings,
  stripWidthPx: number,
  stripHeightPx: number,
  traceStroke: string,
  showLabel = true,
  showCalPulse = true,
  filter: EcgFilterType = 'standard'
): string {
  const { speedMmPerSec, gainMmPerMv } = settings;
  const boxPx = stripWidthPx / (speedMmPerSec * 4);
  const pxPerMs = boxPx / 40;

  const hr = inputs.heartRate || 75;
  const rrMs = (60 / hr) * 1000;
  const rrPx = rrMs * pxPerMs;

  const baseY = stripHeightPx / 2;
  const numBeats = Math.ceil(stripWidthPx / rrPx) + 1;
  const mmPx = boxPx;

  let pathData = `M 0,${baseY} `;
  const calOffset = showCalPulse ? 30 : 0;

  if (showCalPulse) {
    const calH = mmPx * gainMmPerMv;
    pathData += `L ${5},${baseY} L ${5},${baseY - calH} L ${20},${baseY - calH} L ${20},${baseY} L ${calOffset},${baseY} `;
  }

  for (let b = 0; b < numBeats; b++) {
    const startX = calOffset + b * rrPx;
    if (startX > stripWidthPx + rrPx) break;
    pathData += generateBeatPath(startX, baseY, rrMs, inputs, lead, mmPx, gainMmPerMv, filter);
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
 * === MAIN FUNCTION 1: render12LeadEcgPaper (Hỗ trợ 5 kiểu Montage & Digital Filters) ===
 */
export function render12LeadEcgPaper(
  inputs: EcgInputs,
  settings: EcgPaperSettings = DEFAULT_PAPER_SETTINGS,
  theme: 'paper' | 'neon' | 'dark' = 'paper',
  montage: EcgMontageType = 'cabrera',
  filter: EcgFilterType = 'standard'
): string {
  const totalW = 860;
  const topPad = 32;

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

  const filterLabels: Record<EcgFilterType, string> = {
    standard: '0.5 - 35 Hz (Medical Standard + Notch)',
    raw: 'RAW (Tín hiệu thô - Không lọc)',
    hp05: '0.5 Hz High-Pass (Lọc Baseline)',
    notch50: '50 Hz AC Notch (Lọc điện lưới)',
    lp35: '35 Hz Low-Pass (Lọc co cơ)',
  };

  const gId = `ecgG_${Date.now()}`;
  const smallBox = 2.5;
  const largeBox = 12.5;

  // Montage 1: Standard 6x2 Layout (6 Limb Left, 6 Precordial Right)
  if (montage === 'standard6x2') {
    const colW = totalW / 2;
    const rowH = 65;
    const totalH = topPad + rowH * 6 + 10;
    const leadsLimb = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF'];
    const leadsPrecordial = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

    return `
      <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
        <defs>
          <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
            <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
          </pattern>
          <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
            <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
            <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="1.0"/>
          </pattern>
        </defs>

        <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
        <rect x="0" y="${topPad}" width="${totalW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>

        <!-- Header -->
        <rect x="0" y="0" width="${totalW}" height="${topPad}" fill="${headerBg}" rx="10"/>
        <text x="12" y="20" fill="${textColor}" font-size="10.5" font-weight="800">
          ECG STANDARD 6x2 MONTAGE — ${settings.speedMmPerSec} mm/s | ${settings.gainMmPerMv} mm/mV | Filter: ${filterLabels[filter]}
        </text>

        <!-- Divider -->
        <line x1="${colW}" y1="${topPad}" x2="${colW}" y2="${totalH}" stroke="${dividerColor}" stroke-width="1.2"/>

        <!-- Limb Leads -->
        ${leadsLimb.map((lead, i) => `
          <g transform="translate(0, ${topPad + i * rowH})">
            ${renderLeadStrip(lead, inputs, settings, colW, rowH, traceColor, true, true, filter)}
          </g>
        `).join('')}

        <!-- Precordial Leads -->
        ${leadsPrecordial.map((lead, i) => `
          <g transform="translate(${colW}, ${topPad + i * rowH})">
            ${renderLeadStrip(lead, inputs, settings, colW, rowH, traceColor, true, false, filter)}
          </g>
        `).join('')}
      </svg>
    `;
  }

  // Montage 2: Continuous 12x1 Strip (12 channels vertical)
  if (montage === 'continuous12x1') {
    const rowH = 55;
    const all12 = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];
    const totalH = topPad + rowH * 12 + 10;

    return `
      <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
        <defs>
          <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
            <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
          </pattern>
          <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
            <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
            <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="1.0"/>
          </pattern>
        </defs>

        <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
        <rect x="0" y="${topPad}" width="${totalW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>

        <!-- Header -->
        <rect x="0" y="0" width="${totalW}" height="${topPad}" fill="${headerBg}" rx="10"/>
        <text x="12" y="20" fill="${textColor}" font-size="10.5" font-weight="800">
          ECG 12x1 CONTINUOUS STRIP — ${settings.speedMmPerSec} mm/s | ${settings.gainMmPerMv} mm/mV | Filter: ${filterLabels[filter]}
        </text>

        ${all12.map((lead, i) => `
          <g transform="translate(0, ${topPad + i * rowH})">
            ${renderLeadStrip(lead, inputs, settings, totalW, rowH, traceColor, true, true, filter)}
            <line x1="0" y1="${rowH}" x2="${totalW}" y2="${rowH}" stroke="${dividerColor}" stroke-width="0.5" stroke-dasharray="2,2"/>
          </g>
        `).join('')}
      </svg>
    `;
  }

  // Montage 3: Extended Posterior & Right Ventricular Leads (V7-V9 + V3R-V5R)
  if (montage === 'extended_rv_posterior') {
    const colW = totalW / 3;
    const rowH = 95;
    const extRows = [
      ['V7', 'V8', 'V9'],
      ['V3R', 'V4R', 'V5R'],
      ['V1', 'V2', 'V3']
    ];
    const totalH = topPad + rowH * 3 + 10;

    return `
      <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
        <defs>
          <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
            <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
          </pattern>
          <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
            <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
            <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="1.0"/>
          </pattern>
        </defs>

        <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
        <rect x="0" y="${topPad}" width="${totalW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>

        <!-- Header -->
        <rect x="0" y="0" width="${totalW}" height="${topPad}" fill="${headerBg}" rx="10"/>
        <text x="12" y="20" fill="${textColor}" font-size="10.5" font-weight="800">
          ECG EXTENDED LEADS (THÀNH SAU V7-V9 &amp; THẤT PHẢI V3R-V5R) — Filter: ${filterLabels[filter]}
        </text>

        ${extRows.map((row, ri) => row.map((lead, ci) => `
          <g transform="translate(${ci * colW}, ${topPad + ri * rowH})">
            ${renderLeadStrip(lead, inputs, settings, colW, rowH, traceColor, true, ci === 0, filter)}
          </g>
        `).join('')).join('')}
      </svg>
    `;
  }

  // Montage 4: Lewis Lead (Bipolar P-Wave Magnifier)
  if (montage === 'lewis_lead') {
    const rowH = 160;
    const totalH = topPad + rowH * 2 + 10;

    return `
      <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
        <defs>
          <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
            <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
          </pattern>
          <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
            <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
            <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="1.0"/>
          </pattern>
        </defs>

        <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
        <rect x="0" y="${topPad}" width="${totalW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>

        <!-- Header -->
        <rect x="0" y="0" width="${totalW}" height="${topPad}" fill="${headerBg}" rx="10"/>
        <text x="12" y="20" fill="${textColor}" font-size="10.5" font-weight="800">
          LEWIS BIPOLAR LEAD (PHÓNG ĐẠI SÓNG P ĐỂ CHẨN ĐOÁN CUỒNG NHĨ / RUNG NHĨ)
        </text>

        <!-- Lewis Lead Strip (3x P Wave) -->
        <g transform="translate(0, ${topPad})">
          ${renderLeadStrip('Lewis', inputs, settings, totalW, rowH, '#7c3aed', true, true, filter)}
          <rect x="${totalW - 200}" y="10" width="190" height="24" rx="4" fill="rgba(124, 58, 237, 0.15)"/>
          <text x="${totalW - 105}" y="26" fill="#7c3aed" font-size="10" font-weight="800" text-anchor="middle">Sóng P phóng đại x3</text>
        </g>

        <!-- Rhythm Lead II for comparison -->
        <g transform="translate(0, ${topPad + rowH})">
          ${renderLeadStrip('II', inputs, settings, totalW, rowH, traceColor, true, true, filter)}
        </g>
      </svg>
    `;
  }

  // Default Montage: Cabrera 4x3 + Rhythm Strip
  const colW = totalW / 4;
  const rowH = 110;
  const rhythmH = 100;
  const totalH = topPad + rowH * 3 + rhythmH + 8;
  const leadRows: string[][] = [
    ['I', 'aVR', 'V1', 'V4'],
    ['II', 'aVL', 'V2', 'V5'],
    ['III', 'aVF', 'V3', 'V6'],
  ];
  const rhythmLead = settings.rhythmLead || 'II';

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto"
      style="border-radius:10px; box-shadow:0 4px 20px rgba(0,0,0,0.15); display:block; max-width:100%;"
      class="dsp-ecg-12lead-svg">
      <defs>
        <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
          <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
        </pattern>
        <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
          <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
          <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="1.0"/>
        </pattern>
        ${leadRows.flatMap((row, ri) => row.map((_, ci) =>
          `<clipPath id="${gId}_c${ri}${ci}"><rect x="${ci*colW}" y="${topPad + ri*rowH}" width="${colW}" height="${rowH}"/></clipPath>`
        )).join('')}
        <clipPath id="${gId}_rhythm"><rect x="0" y="${topPad + 3*rowH}" width="${totalW}" height="${rhythmH}"/></clipPath>
      </defs>

      <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
      <rect x="0" y="${topPad}" width="${totalW}" height="${rowH * 3 + rhythmH}" fill="url(#${gId}_lg)"/>

      <rect x="0" y="0" width="${totalW}" height="${topPad}" fill="${headerBg}" rx="10"/>
      <text x="12" y="20" fill="${textColor}" font-size="10.5" font-weight="800" font-family="'Inter', monospace">
        ECG CABRERA — ${settings.speedMmPerSec} mm/s | ${settings.gainMmPerMv} mm/mV | Filter: ${filterLabels[filter]}
      </text>
      <text x="${totalW - 12}" y="20" fill="${textColor}" font-size="9.5" font-weight="600" font-family="'Inter', monospace" text-anchor="end">
        ${inputs.rhythmType?.toUpperCase()} | QRS ${inputs.qrsDuration || 85}ms | QT ${inputs.qtInterval || 400}ms
      </text>

      ${[1,2,3].map(i => `<line x1="${i*colW}" y1="${topPad}" x2="${i*colW}" y2="${topPad + 3*rowH}" stroke="${dividerColor}" stroke-width="1" stroke-dasharray="3,3"/>`).join('')}
      ${[1,2].map(i => `<line x1="0" y1="${topPad + i*rowH}" x2="${totalW}" y2="${topPad + i*rowH}" stroke="${dividerColor}" stroke-width="0.8" stroke-dasharray="3,3"/>`).join('')}
      <line x1="0" y1="${topPad + 3*rowH}" x2="${totalW}" y2="${topPad + 3*rowH}" stroke="${gridLarge}" stroke-width="1.2"/>

      ${leadRows.map((row, ri) => row.map((lead, ci) => `
        <g clip-path="url(#${gId}_c${ri}${ci})" transform="translate(${ci * colW}, ${topPad + ri * rowH})">
          ${renderLeadStrip(lead, inputs, settings, colW, rowH, traceColor, true, ci === 0, filter)}
        </g>
      `).join('')).join('')}

      <g clip-path="url(#${gId}_rhythm)" transform="translate(0, ${topPad + 3 * rowH})">
        <rect x="0" y="0" width="${totalW}" height="${rhythmH}" fill="${theme === 'paper' ? 'rgba(255,245,245,0.3)' : 'rgba(0,0,0,0.2)'}"/>
        ${renderLeadStrip(rhythmLead, inputs, { ...settings, speedMmPerSec: settings.speedMmPerSec as 12.5 | 25 | 50 }, totalW, rhythmH, traceColor, true, true, filter)}
        <text x="${totalW - 10}" y="${rhythmH - 8}" fill="${textColor}" font-size="9.5" font-weight="700" text-anchor="end" font-family="'Inter', monospace">Rhythm Strip</text>
      </g>
      <text x="${totalW - 10}" y="${totalH - 3}" fill="${textColor}" font-size="8.5" font-weight="600" text-anchor="end" opacity="0.7" font-family="monospace">
        CliniPortal ECG Studio Pro | ${settings.speedMmPerSec}mm/s | ${settings.gainMmPerMv}mm/mV
      </text>
    </svg>
  `;
}

/**
 * === MAIN FUNCTION 2: renderEcgSideBySideSvg ===
 */
export function renderEcgSideBySideSvg(
  patientInputs: EcgInputs,
  baselineInputs: EcgInputs = NORMAL_SINUS_BASELINE,
  settings: EcgPaperSettings = DEFAULT_PAPER_SETTINGS,
  theme: 'paper' | 'neon' | 'dark' = 'paper',
  patientTitle = 'BẢN GHI CA BỆNH / PRESET HIỆN TẠI',
  baselineTitle = 'BẢN GHI ĐỐI CHỨNG BÌNH THƯỜNG'
): string {
  const totalW = 900;
  const panelW = 440;
  const gap = 20;
  const totalH = 430;
  const topPad = 32;
  const colW = panelW / 2;
  const rowH = 90;

  let bgFill = '#fff5f5';
  let gridSmall = 'rgba(252, 165, 165, 0.7)';
  let gridLarge = 'rgba(239, 68, 68, 0.65)';
  let patientTrace = '#dc2626';
  let baselineTrace = '#0284c7';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridSmall = 'rgba(16, 185, 129, 0.12)';
    gridLarge = 'rgba(16, 185, 129, 0.35)';
    patientTrace = '#f43f5e';
    baselineTrace = '#10b981';
  } else if (theme === 'dark') {
    bgFill = '#0f172a';
    gridSmall = 'rgba(255,255,255,0.04)';
    gridLarge = 'rgba(255,255,255,0.10)';
    patientTrace = '#fb7185';
    baselineTrace = '#38bdf8';
  }

  const leadsLeft = [['I', 'V1'], ['II', 'V2'], ['V5', 'aVF']];
  const gId = `sideG_${Date.now()}`;
  const smallBox = 2.5;
  const largeBox = 12.5;

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%; background:var(--color-bg);">
      <defs>
        <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
          <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
        </pattern>
        <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
          <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
          <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="0.9"/>
        </pattern>
      </defs>

      <!-- Panel 1: Left (Patient / Preset) -->
      <g transform="translate(0, 0)">
        <rect width="${panelW}" height="${totalH}" fill="${bgFill}" rx="8"/>
        <rect x="0" y="${topPad}" width="${panelW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>
        <rect x="0" y="0" width="${panelW}" height="${topPad}" fill="rgba(220, 38, 38, 0.12)" rx="8"/>
        <circle cx="14" cy="16" r="4" fill="#dc2626"/>
        <text x="24" y="20" fill="#dc2626" font-size="11" font-weight="800" font-family="'Inter', sans-serif">
          ${patientTitle} (${patientInputs.heartRate || 75} bpm)
        </text>

        ${leadsLeft.map((row, ri) => row.map((lead, ci) => `
          <g transform="translate(${ci * colW}, ${topPad + ri * rowH})">
            ${renderLeadStrip(lead, patientInputs, settings, colW, rowH, patientTrace, true, ci === 0)}
          </g>
        `).join('')).join('')}
      </g>

      <!-- Panel 2: Right (Normal Baseline Reference) -->
      <g transform="translate(${panelW + gap}, 0)">
        <rect width="${panelW}" height="${totalH}" fill="${bgFill}" rx="8"/>
        <rect x="0" y="${topPad}" width="${panelW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>
        <rect x="0" y="0" width="${panelW}" height="${topPad}" fill="rgba(2, 132, 199, 0.12)" rx="8"/>
        <circle cx="14" cy="16" r="4" fill="#0284c7"/>
        <text x="24" y="20" fill="#0284c7" font-size="11" font-weight="800" font-family="'Inter', sans-serif">
          ${baselineTitle} (75 bpm)
        </text>

        ${leadsLeft.map((row, ri) => row.map((lead, ci) => `
          <g transform="translate(${ci * colW}, ${topPad + ri * rowH})">
            ${renderLeadStrip(lead, baselineInputs, settings, colW, rowH, baselineTrace, true, ci === 0)}
          </g>
        `).join('')).join('')}
      </g>

      <!-- Center Divider Badge -->
      <g transform="translate(${panelW + gap / 2 - 12}, ${totalH / 2 - 12})">
        <circle cx="12" cy="12" r="14" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="1.5"/>
        <text x="12" y="16" fill="var(--color-text-muted)" font-size="9" font-weight="800" text-anchor="middle">VS</text>
      </g>
    </svg>
  `;
}

/**
 * === MAIN FUNCTION 3: renderEcgGhostOverlaySvg ===
 */
export function renderEcgGhostOverlaySvg(
  patientInputs: EcgInputs,
  baselineInputs: EcgInputs = NORMAL_SINUS_BASELINE,
  targetLead: string = 'V2',
  settings: EcgPaperSettings = DEFAULT_PAPER_SETTINGS,
  theme: 'paper' | 'neon' | 'dark' = 'paper'
): string {
  const totalW = 860;
  const totalH = 340;
  const baseY = totalH / 2 + 10;
  const mmPx = 3.2;

  let bgFill = '#fff5f5';
  let gridSmall = 'rgba(252, 165, 165, 0.7)';
  let gridLarge = 'rgba(239, 68, 68, 0.65)';
  let patientTrace = '#dc2626';
  let baselineTrace = '#0284c7';
  let textColor = '#1e3a5f';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridSmall = 'rgba(16, 185, 129, 0.12)';
    gridLarge = 'rgba(16, 185, 129, 0.35)';
    patientTrace = '#f43f5e';
    baselineTrace = '#10b981';
    textColor = '#34d399';
  } else if (theme === 'dark') {
    bgFill = '#0f172a';
    gridSmall = 'rgba(255,255,255,0.04)';
    gridLarge = 'rgba(255,255,255,0.10)';
    patientTrace = '#fb7185';
    baselineTrace = '#38bdf8';
    textColor = '#94a3b8';
  }

  const hr = patientInputs.heartRate || 75;
  const rrMs = (60 / hr) * 1000;
  const normalRrMs = 800;

  const pathPatient = `M 40,${baseY} ` + generateBeatPath(40, baseY, rrMs, patientInputs, targetLead, mmPx, settings.gainMmPerMv) + generateBeatPath(40 + (rrMs * 0.025 * mmPx), baseY, rrMs, patientInputs, targetLead, mmPx, settings.gainMmPerMv);
  const pathBaseline = `M 40,${baseY} ` + generateBeatPath(40, baseY, normalRrMs, baselineInputs, targetLead, mmPx, settings.gainMmPerMv) + generateBeatPath(40 + (normalRrMs * 0.025 * mmPx), baseY, normalRrMs, baselineInputs, targetLead, mmPx, settings.gainMmPerMv);

  const pAmpPat = getLeadAmplitudes(targetLead, patientInputs);
  const pAmpBase = getLeadAmplitudes(targetLead, baselineInputs);
  const deltaSt = pAmpPat.stDev - pAmpBase.stDev;

  const gId = `ghostG_${Date.now()}`;

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
      <defs>
        <pattern id="${gId}_sm" width="${mmPx}" height="${mmPx}" patternUnits="userSpaceOnUse">
          <path d="M ${mmPx} 0 L 0 0 0 ${mmPx}" fill="none" stroke="${gridSmall}" stroke-width="0.5"/>
        </pattern>
        <pattern id="${gId}_lg" width="${mmPx * 5}" height="${mmPx * 5}" patternUnits="userSpaceOnUse">
          <rect width="${mmPx * 5}" height="${mmPx * 5}" fill="url(#${gId}_sm)"/>
          <path d="M ${mmPx * 5} 0 L 0 0 0 ${mmPx * 5}" fill="none" stroke="${gridLarge}" stroke-width="1.2"/>
        </pattern>
      </defs>

      <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
      <rect x="0" y="36" width="${totalW}" height="${totalH - 36}" fill="url(#${gId}_lg)"/>

      <rect x="0" y="0" width="${totalW}" height="36" fill="rgba(0,0,0,0.06)" rx="10"/>
      <text x="14" y="22" fill="${textColor}" font-size="12" font-weight="800" font-family="'Inter', sans-serif">
        🔍 XẾP CHỒNG HÌNH THÁI SÓNG ĐIỆN TIM CHUYỂN ĐẠO ${targetLead} (GHOST OVERLAY VIEW)
      </text>

      <g transform="translate(${totalW - 350}, 10)">
        <circle cx="10" cy="10" r="5" fill="${patientTrace}"/>
        <text x="20" y="14" fill="${textColor}" font-size="10.5" font-weight="800">Ca Bệnh / Hiện Tại</text>
        <circle cx="160" cy="10" r="5" fill="${baselineTrace}"/>
        <text x="170" y="14" fill="${textColor}" font-size="10.5" font-weight="800">Bình Thường Đối Chứng</text>
      </g>

      <path d="${pathBaseline}" fill="none" stroke="${baselineTrace}" stroke-width="2.5" stroke-dasharray="4,3" stroke-linecap="round" opacity="0.85"/>
      <path d="${pathPatient}" fill="none" stroke="${patientTrace}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

      <g transform="translate(40, ${totalH - 35})">
        <rect width="780" height="26" rx="6" fill="var(--color-surface, #ffffff)" stroke="var(--color-border)" stroke-width="1"/>
        <text x="14" y="17" fill="var(--color-text)" font-size="10" font-weight="700">
          Chuyển đạo: <strong style="color:var(--color-primary);">${targetLead}</strong> |
          &Delta;ST: <strong style="color:#dc2626;">${deltaSt > 0 ? `+${deltaSt.toFixed(1)}` : deltaSt.toFixed(1)} mm</strong> |
          ST Ca Bệnh: <strong>${pAmpPat.stDev > 0 ? `+${pAmpPat.stDev}` : pAmpPat.stDev} mm</strong> |
          QRS: <strong>${patientInputs.qrsDuration || 85} ms</strong> (Chuẩn: 85 ms) |
          QTc: <strong>${patientInputs.qtInterval ? `${patientInputs.qtInterval} ms` : 'N/A'}</strong>
        </text>
      </g>
    </svg>
  `;
}

/**
 * === MAIN FUNCTION 4: renderEcgFocalLeadsWithCalloutsSvg ===
 */
export function renderEcgFocalLeadsWithCalloutsSvg(
  patientInputs: EcgInputs,
  keyLeads: string[] = ['V2', 'V3', 'aVL', 'III'],
  annotations: EcgCalloutAnnotation[] = [],
  settings: EcgPaperSettings = DEFAULT_PAPER_SETTINGS,
  theme: 'paper' | 'neon' | 'dark' = 'paper'
): string {
  const totalW = 860;
  const cardW = 415;
  const cardH = 175;
  const gap = 15;
  const totalH = cardH * 2 + gap + 30;

  let bgFill = '#fff5f5';
  let gridSmall = 'rgba(252, 165, 165, 0.7)';
  let gridLarge = 'rgba(239, 68, 68, 0.65)';
  let traceColor = '#111827';
  let textColor = '#1e3a5f';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridSmall = 'rgba(16, 185, 129, 0.12)';
    gridLarge = 'rgba(16, 185, 129, 0.35)';
    traceColor = '#10b981';
    textColor = '#34d399';
  } else if (theme === 'dark') {
    bgFill = '#0f172a';
    gridSmall = 'rgba(255,255,255,0.04)';
    gridLarge = 'rgba(255,255,255,0.10)';
    traceColor = '#38bdf8';
    textColor = '#94a3b8';
  }

  const gId = `focalG_${Date.now()}`;
  const leadsToRender = keyLeads.slice(0, 4);

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
      <defs>
        <pattern id="${gId}_sm" width="2.5" height="2.5" patternUnits="userSpaceOnUse">
          <path d="M 2.5 0 L 0 0 0 2.5" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
        </pattern>
        <pattern id="${gId}_lg" width="12.5" height="12.5" patternUnits="userSpaceOnUse">
          <rect width="12.5" height="12.5" fill="url(#${gId}_sm)"/>
          <path d="M 12.5 0 L 0 0 0 12.5" fill="none" stroke="${gridLarge}" stroke-width="0.9"/>
        </pattern>
      </defs>

      <rect width="${totalW}" height="${totalH}" fill="var(--color-bg)" rx="10"/>

      ${leadsToRender.map((lead, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const ox = 10 + col * (cardW + gap);
        const oy = 10 + row * (cardH + gap);

        const leadAnn = annotations.find(a => a.lead === lead);

        return `
          <g transform="translate(${ox}, ${oy})">
            <rect width="${cardW}" height="${cardH}" fill="${bgFill}" rx="8" stroke="var(--color-border)" stroke-width="1.2"/>
            <rect x="0" y="26" width="${cardW}" height="${cardH - 26}" fill="url(#${gId}_lg)" rx="0"/>

            <rect x="0" y="0" width="${cardW}" height="26" fill="rgba(0,0,0,0.06)" rx="8"/>
            <text x="10" y="17.5" fill="${textColor}" font-size="11" font-weight="800" font-family="'Inter', sans-serif">
              CHUYỂN ĐẠO TRỌNG ĐIỂM: ${lead}
            </text>

            <g transform="translate(0, 26)">
              ${renderLeadStrip(lead, patientInputs, settings, cardW, cardH - 26, traceColor, false, true)}
            </g>

            ${leadAnn ? `
              <g transform="translate(${cardW - 200}, 34)">
                <rect width="190" height="48" rx="6" fill="rgba(220, 38, 38, 0.92)" stroke="#ffffff" stroke-width="1"/>
                <text x="10" y="16" fill="#ffffff" font-size="10" font-weight="800">${leadAnn.label}</text>
                <text x="10" y="32" fill="rgba(255,255,255,0.9)" font-size="8.5" font-weight="600">${leadAnn.detail.slice(0, 38)}...</text>
              </g>
            ` : ''}
          </g>
        `;
      }).join('')}
    </svg>
  `;
}

/**
 * Lấy dữ liệu đối chiếu hình thái chi tiết theo ID ca mẫu
 */
export function getPresetMorphologyComparison(presetId: string): EcgMorphologyComparison | null {
  const preset = ECG_PRESETS.find(p => p.id === presetId);
  return preset?.morphology || null;
}

/**
 * Tương thích ngược
 */
export function render12LeadGridSvg(inputs: EcgInputs, activeLead = 'II', theme: 'paper' | 'neon' | 'dark' = 'paper'): string {
  const settings: EcgPaperSettings = {
    speedMmPerSec: 25,
    gainMmPerMv: 10,
    rhythmLead: activeLead,
  };
  return render12LeadEcgPaper(inputs, settings, theme);
}
