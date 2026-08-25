/**
 * DocSpace — ECG Studio Types & Interfaces
 * Path: src/content/docspace/features/studios/ecg-types.ts
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
  comparison?: EcgMorphologyComparison;
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
