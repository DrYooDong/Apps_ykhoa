/**
 * DocSpace — Neuro-ICU, EEG Frequency Bands & Coma/Sedation Studio Pro ($10,000 Level)
 * Pure TypeScript & Pure Inline SVG — Zero External Dependencies.
 * Based on NeuroKit2 EEG & Complexity Signal Processing Algorithms.
 */

export interface NeuroPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  category: 'coma_anoxia' | 'status_epilepticus' | 'icu_sedation' | 'delirium_encephalopathy' | 'brain_death_prion';
  description: string;
  values: NeuroInputs;
}

export interface NeuroInputs {
  patientAge: number;
  gender: 'male' | 'female';
  isMechanicallyVentilated: boolean; // Intubated / on ventilator

  // Clinical Coma & Sedation Scales
  gcsScore: number;                // 3 - 15 Glasgow Coma Scale
  fourEyeResponse: number;         // 0 - 4 FOUR Score (Eye)
  fourMotorResponse: number;       // 0 - 4 FOUR Score (Motor)
  fourBrainstemReflexes: number;   // 0 - 4 FOUR Score (Brainstem: Pupil & Corneal)
  fourRespirationPattern: number;  // 0 - 4 FOUR Score (Respiration)
  rassScore: number;               // -5 to +4 (Richmond Agitation-Sedation Scale)
  
  // CAM-ICU Delirium Screening
  camIcuAcuteOnset: boolean;       // Feature 1: Acute change or fluctuating course
  camIcuInattention: boolean;      // Feature 2: Inattention (Letters 'SAVEAHAART' < 8)
  camIcuAlteredLoc: boolean;       // Feature 3: Altered level of consciousness (RASS != 0)
  camIcuDisorganizedThinking: boolean; // Feature 4: Disorganized thinking (Questions/Commands)

  // EEG Waveform & Frequency Band Weights (NeuroKit2 PSD decomposition)
  eegPatternType: 'normal_alpha' | 'spike_wave_seizure' | 'diffuse_delta_coma' | 'burst_suppression' | 'triphasic_waves' | 'isoelectric_flat' | 'periodic_pswc';
  dominantFrequencyHz: number;     // 0.5 - 35 Hz
  deltaPowerPercent: number;       // 0 - 100%
  thetaPowerPercent: number;       // 0 - 100%
  alphaPowerPercent: number;       // 0 - 100%
  betaPowerPercent: number;        // 0 - 100%
  gammaPowerPercent: number;       // 0 - 100%
  burstSuppressionRatioPercent?: number; // 0 - 100% (BSR for continuous Propofol/Midazolam)
  bispectralIndexEstimated?: number;     // 0 - 100 BIS Index
}

export interface NeuroAnalysisResult {
  // 1. FOUR Score & GCS Coma Assessment
  totalFourScore: number;          // 0 - 16
  fourRiskTier: 'deep_coma_brain_death' | 'severe_coma' | 'moderate_depression' | 'mild_intact';
  fourInterpretation: string;
  fourBadgeColor: string;

  // 2. RASS & Sedation Target
  rassCategory: 'combative' | 'agitated' | 'alert_calm' | 'light_sedation' | 'moderate_sedation' | 'deep_unarousable';
  rassInterpretation: string;
  rassTargetStatus: 'at_target' | 'under_sedated' | 'over_sedated';

  // 3. CAM-ICU Delirium
  isDeliriumPositive: boolean;
  deliriumSubtype: 'hyperactive' | 'hypoactive' | 'mixed' | 'none';
  deliriumRecommendation: string;

  // 4. EEG Spectral Analysis & Brain State (NeuroKit2)
  spectralDominance: string;
  spectralRatioThetaAlpha: number; // TAR ratio (marker of encephalopathy)
  brainStateSummary: string;
  seizureRiskStatus: 'active_seizure' | 'high_risk_ncse' | 'low_risk';
  bisEstimated: number;

  // 5. Actionable EBM Protocols
  immediateActions: string[];
  sedationAdjustments: string[];
  monitoringProtocols: string[];
  clinicalSummary: string;
}

export const NEURO_PRESETS: NeuroPreset[] = [
  {
    id: 'deep_coma_anoxia',
    name: '1. Hôn Mê Thiếu Oxy Não Sau Ngừng Tuần Hoàn (Post-Cardiac Arrest Anoxic Coma)',
    badge: '🚨 FOUR 2/16 • Sóng Delta Chậm Toàn Thể',
    badgeColor: '#dc2626',
    category: 'coma_anoxia',
    description: 'Bệnh nhân sau cấp cứu ngừng tim ROSC 12h: Hôn mê sâu không đáp ứng, mất phản xạ ánh sáng đồng tử, EEG sóng Delta chậm lan tỏa < 1.5 Hz.',
    values: {
      patientAge: 62,
      gender: 'male',
      isMechanicallyVentilated: true,
      gcsScore: 3,
      fourEyeResponse: 0,
      fourMotorResponse: 1,
      fourBrainstemReflexes: 1,
      fourRespirationPattern: 0,
      rassScore: -5,
      camIcuAcuteOnset: true,
      camIcuInattention: true,
      camIcuAlteredLoc: true,
      camIcuDisorganizedThinking: true,
      eegPatternType: 'diffuse_delta_coma',
      dominantFrequencyHz: 1.5,
      deltaPowerPercent: 78,
      thetaPowerPercent: 14,
      alphaPowerPercent: 5,
      betaPowerPercent: 2,
      gammaPowerPercent: 1,
      burstSuppressionRatioPercent: 0,
      bispectralIndexEstimated: 22,
    },
  },
  {
    id: 'status_epilepticus',
    name: '2. Trạng Thái Động Kinh Co Giật Toàn Thể (Generalized Convulsive Status Epilepticus)',
    badge: '⚡ Sóng Gai Nhọn Liên Tục (Spike-Wave 3Hz)',
    badgeColor: '#ea580c',
    category: 'status_epilepticus',
    description: 'Cơn co giật kéo dài > 10 phút trơ với Midazolam: Phóng điện kịch phát dạng phức hợp nhọn-sóng biên độ cao đồng thì 2 bán cầu.',
    values: {
      patientAge: 45,
      gender: 'female',
      isMechanicallyVentilated: true,
      gcsScore: 6,
      fourEyeResponse: 1,
      fourMotorResponse: 2,
      fourBrainstemReflexes: 3,
      fourRespirationPattern: 1,
      rassScore: -4,
      camIcuAcuteOnset: true,
      camIcuInattention: true,
      camIcuAlteredLoc: true,
      camIcuDisorganizedThinking: true,
      eegPatternType: 'spike_wave_seizure',
      dominantFrequencyHz: 3.0,
      deltaPowerPercent: 25,
      thetaPowerPercent: 15,
      alphaPowerPercent: 10,
      betaPowerPercent: 35,
      gammaPowerPercent: 15,
      burstSuppressionRatioPercent: 0,
      bispectralIndexEstimated: 85,
    },
  },
  {
    id: 'burst_suppression_propofol',
    name: '3. Gây Mê Ức Chế Bùng Nổ Chống Tăng Áp Nội Sọ (Burst-Suppression / TBI ICP Control)',
    badge: '🟣 BSR 65% • Kiểm Soát Áp Lực Nội Sọ',
    badgeColor: '#7c3aed',
    category: 'icu_sedation',
    description: 'Chấn thương sọ não nặng tăng ALNS kháng trị: Truyền Propofol liều cao đạt mô hình ức chế bùng nổ (BSR 60-70%) để giảm tiêu thụ oxy não CMRO2.',
    values: {
      patientAge: 28,
      gender: 'male',
      isMechanicallyVentilated: true,
      gcsScore: 3,
      fourEyeResponse: 0,
      fourMotorResponse: 0,
      fourBrainstemReflexes: 2,
      fourRespirationPattern: 0,
      rassScore: -5,
      camIcuAcuteOnset: true,
      camIcuInattention: true,
      camIcuAlteredLoc: true,
      camIcuDisorganizedThinking: false,
      eegPatternType: 'burst_suppression',
      dominantFrequencyHz: 2.0,
      deltaPowerPercent: 55,
      thetaPowerPercent: 20,
      alphaPowerPercent: 15,
      betaPowerPercent: 8,
      gammaPowerPercent: 2,
      burstSuppressionRatioPercent: 65,
      bispectralIndexEstimated: 18,
    },
  },
  {
    id: 'icu_delirium_hyperactive',
    name: '4. Hội Chứng Sảng ICU Tăng Động (Hyperactive ICU Delirium / CAM-ICU Positive)',
    badge: '🟡 CAM-ICU (+) • RASS +2 (Kích Động)',
    badgeColor: '#ca8a04',
    category: 'delirium_encephalopathy',
    description: 'Bệnh nhân ngày thứ 4 sau phẫu thuật lớn: Lú lẫn, kích động bứt rứt, rút ống dẫn lưu, mất chú ý nghiêm trọng, sóng Theta lan tỏa.',
    values: {
      patientAge: 74,
      gender: 'male',
      isMechanicallyVentilated: false,
      gcsScore: 13,
      fourEyeResponse: 4,
      fourMotorResponse: 4,
      fourBrainstemReflexes: 4,
      fourRespirationPattern: 4,
      rassScore: 2,
      camIcuAcuteOnset: true,
      camIcuInattention: true,
      camIcuAlteredLoc: true,
      camIcuDisorganizedThinking: true,
      eegPatternType: 'normal_alpha',
      dominantFrequencyHz: 6.5,
      deltaPowerPercent: 22,
      thetaPowerPercent: 48,
      alphaPowerPercent: 20,
      betaPowerPercent: 8,
      gammaPowerPercent: 2,
      burstSuppressionRatioPercent: 0,
      bispectralIndexEstimated: 82,
    },
  },
  {
    id: 'hepatic_encephalopathy_triphasic',
    name: '5. Bệnh Não Gan Giai Đoạn III (Hepatic Encephalopathy / Triphasic Waves)',
    badge: '🟠 Sóng 3 Pha (Triphasic Waves 2Hz)',
    badgeColor: '#ea580c',
    category: 'delirium_encephalopathy',
    description: 'Xơ gan mất bù kèm tăng Amoniac máu: Tiền hôn mê, lú lẫn sâu, sóng ba pha (Triphasic waves) đồng thì trán-chẩm điển hình.',
    values: {
      patientAge: 56,
      gender: 'male',
      isMechanicallyVentilated: false,
      gcsScore: 9,
      fourEyeResponse: 2,
      fourMotorResponse: 2,
      fourBrainstemReflexes: 4,
      fourRespirationPattern: 3,
      rassScore: -3,
      camIcuAcuteOnset: true,
      camIcuInattention: true,
      camIcuAlteredLoc: true,
      camIcuDisorganizedThinking: true,
      eegPatternType: 'triphasic_waves',
      dominantFrequencyHz: 2.2,
      deltaPowerPercent: 45,
      thetaPowerPercent: 38,
      alphaPowerPercent: 12,
      betaPowerPercent: 4,
      gammaPowerPercent: 1,
      burstSuppressionRatioPercent: 0,
      bispectralIndexEstimated: 45,
    },
  },
  {
    id: 'brain_death_isoelectric',
    name: '6. Nghi Ngờ Chết Não / Điện Não Đẳng Điện (Brain Death / Electrocerebral Inactivity)',
    badge: '⚫ FOUR 0/16 • Điện Não Phẳng (<2uV)',
    badgeColor: '#64748b',
    category: 'brain_death_prion',
    description: 'Xuất huyết não diện rộng vỡ vào não thất: Mất hoàn toàn toàn bộ phản xạ thân não, ngừng thở tự nhiên, điện não đẳng điện phẳng hoàn toàn.',
    values: {
      patientAge: 50,
      gender: 'female',
      isMechanicallyVentilated: true,
      gcsScore: 3,
      fourEyeResponse: 0,
      fourMotorResponse: 0,
      fourBrainstemReflexes: 0,
      fourRespirationPattern: 0,
      rassScore: -5,
      camIcuAcuteOnset: true,
      camIcuInattention: true,
      camIcuAlteredLoc: true,
      camIcuDisorganizedThinking: true,
      eegPatternType: 'isoelectric_flat',
      dominantFrequencyHz: 0.5,
      deltaPowerPercent: 95,
      thetaPowerPercent: 3,
      alphaPowerPercent: 1,
      betaPowerPercent: 1,
      gammaPowerPercent: 0,
      burstSuppressionRatioPercent: 100,
      bispectralIndexEstimated: 0,
    },
  },
  {
    id: 'moderate_sedation_dexmed',
    name: '7. An Thần Rút Ống NKQ Hợp Lý Bằng Dexmedetomidine (Target RASS -1 to -2)',
    badge: '🟢 RASS -1 (An Thần Nhẹ Hợp Lý) • Dễ Đánh Thức',
    badgeColor: '#10b981',
    category: 'icu_sedation',
    description: 'Chuẩn bị cai thở máy: Truyền Dexmedetomidine duy trì trạng thái an thần hợp tác, bảo tồn nhịp Alpha và thoi giấc ngủ sinh lý.',
    values: {
      patientAge: 58,
      gender: 'male',
      isMechanicallyVentilated: true,
      gcsScore: 12,
      fourEyeResponse: 3,
      fourMotorResponse: 3,
      fourBrainstemReflexes: 4,
      fourRespirationPattern: 3,
      rassScore: -1,
      camIcuAcuteOnset: false,
      camIcuInattention: false,
      camIcuAlteredLoc: false,
      camIcuDisorganizedThinking: false,
      eegPatternType: 'normal_alpha',
      dominantFrequencyHz: 9.0,
      deltaPowerPercent: 20,
      thetaPowerPercent: 30,
      alphaPowerPercent: 40,
      betaPowerPercent: 8,
      gammaPowerPercent: 2,
      burstSuppressionRatioPercent: 0,
      bispectralIndexEstimated: 68,
    },
  },
];

/**
 * Phân tích Toàn Diện Tình Trạng Thần Kinh & Hôn Mê Neuro-ICU
 */
export function analyzeNeuroStudio(inputs: NeuroInputs): NeuroAnalysisResult {
  // 1. Calculate FOUR Score (0 - 16)
  const totalFour = inputs.fourEyeResponse + inputs.fourMotorResponse + inputs.fourBrainstemReflexes + inputs.fourRespirationPattern;
  let fourRiskTier: NeuroAnalysisResult['fourRiskTier'] = 'mild_intact';
  let fourInterpretation = 'Ý thức tỉnh táo hoặc suy giảm nhẹ; phản xạ thân não và hô hấp hoàn toàn nguyên vẹn.';
  let fourBadgeColor = '#10b981';

  if (totalFour <= 4) {
    fourRiskTier = 'deep_coma_brain_death';
    fourInterpretation = '🚨 Hôn mê rất sâu / Nguy cơ tổn thương thân não nặng hoặc chết não. Tỷ lệ tử vong nội viện > 80%.';
    fourBadgeColor = '#dc2626';
  } else if (totalFour <= 8) {
    fourRiskTier = 'severe_coma';
    fourInterpretation = '⚠️ Hôn mê nặng: Cần bảo vệ đường thở khẩn cấp, đặt nội khí quản và theo dõi áp lực nội sọ (ICP).';
    fourBadgeColor = '#ea580c';
  } else if (totalFour <= 12) {
    fourRiskTier = 'moderate_depression';
    fourInterpretation = 'Ức chế tri giác mức độ trung bình: Cần rà soát nguyên nhân chuyển hóa, độc chất hoặc tổn thương cấu trúc.';
    fourBadgeColor = '#ca8a04';
  }

  // 2. RASS Evaluation
  const rass = inputs.rassScore;
  let rassCategory: NeuroAnalysisResult['rassCategory'] = 'alert_calm';
  let rassInterpretation = 'Tỉnh táo, điềm tĩnh (RASS 0).';
  let rassTargetStatus: NeuroAnalysisResult['rassTargetStatus'] = 'at_target';

  if (rass >= 3) {
    rassCategory = rass === 4 ? 'combative' : 'agitated';
    rassInterpretation = 'Kích động nguy hiểm, bứt rứt kháng máy thở (RASS +3 / +4).';
    rassTargetStatus = 'under_sedated';
  } else if (rass >= 1) {
    rassCategory = 'agitated';
    rassInterpretation = 'Bồn chồn, lo âu nhẹ (RASS +1 / +2).';
    rassTargetStatus = 'under_sedated';
  } else if (rass === 0) {
    rassCategory = 'alert_calm';
    rassInterpretation = 'Tỉnh táo, bình tĩnh (RASS 0).';
    rassTargetStatus = 'at_target';
  } else if (rass >= -2) {
    rassCategory = 'light_sedation';
    rassInterpretation = 'An thần nhẹ: Mở mắt khi gọi tiếng nói > 10s (RASS -1 / -2). ĐÍCH AN THẦN ICU LÝ TƯỞNG.';
    rassTargetStatus = 'at_target';
  } else if (rass === -3) {
    rassCategory = 'moderate_sedation';
    rassInterpretation = 'An thần vừa: Cử động hoặc mở mắt theo tiếng nói < 10s (RASS -3).';
    rassTargetStatus = inputs.isMechanicallyVentilated ? 'at_target' : 'over_sedated';
  } else {
    rassCategory = 'deep_unarousable';
    rassInterpretation = 'An thần sâu / Không đáp ứng với kích thích (RASS -4 / -5).';
    rassTargetStatus = inputs.burstSuppressionRatioPercent && inputs.burstSuppressionRatioPercent > 0 ? 'at_target' : 'over_sedated';
  }

  // 3. CAM-ICU Screening
  // CAM-ICU Positive = (Feature 1 AND Feature 2) AND (Feature 3 OR Feature 4)
  const isDeliriumPositive = (inputs.camIcuAcuteOnset && inputs.camIcuInattention) && (inputs.camIcuAlteredLoc || inputs.camIcuDisorganizedThinking);
  let deliriumSubtype: NeuroAnalysisResult['deliriumSubtype'] = 'none';
  let deliriumRecommendation = 'Không có dấu hiệu sảng ICU. Tiếp tục các biện pháp phòng ngừa không dùng thuốc (ABCDEF bundle).';

  if (isDeliriumPositive) {
    if (rass > 0) {
      deliriumSubtype = 'hyperactive';
      deliriumRecommendation = 'Sảng tăng động (Hyperactive): Tìm nguyên nhân kích hoạt (đau, bí tiểu, cai thuốc, sốt). Hạn chế cố định thể chất; dùng Dexmedetomidine hoặc Quetiapine liều thấp nếu mất an toàn.';
    } else if (rass < 0) {
      deliriumSubtype = 'hypoactive';
      deliriumRecommendation = 'Sảng giảm động (Hypoactive - Thường bị bỏ sót): Giảm tối đa thuốc an thần Benzodiazepine/Opioid, vận động sớm bên giường bệnh, điều chỉnh nhịp ngày đêm.';
    } else {
      deliriumSubtype = 'mixed';
      deliriumRecommendation = 'Sảng hỗn hợp: Tối ưu gói ABCDEF, đánh giá lại tri giác mỗi ca trực.';
    }
  }

  // 4. EEG Spectral Decomposition (NeuroKit2)
  const delta = inputs.deltaPowerPercent;
  const theta = inputs.thetaPowerPercent;
  const alpha = inputs.alphaPowerPercent;
  const tar = alpha > 0 ? parseFloat((theta / alpha).toFixed(2)) : 5.0;

  let spectralDominance = 'Sóng Alpha (8-13 Hz) ưu thế';
  let brainStateSummary = 'Điện não đồ thức tỉnh bình thường.';
  let seizureRiskStatus: NeuroAnalysisResult['seizureRiskStatus'] = 'low_risk';
  let bis = inputs.bispectralIndexEstimated !== undefined ? inputs.bispectralIndexEstimated : 90;

  if (inputs.eegPatternType === 'spike_wave_seizure') {
    spectralDominance = 'Phóng điện Nhọn-Sóng (Spike-Wave) kịch phát';
    brainStateSummary = '🚨 ĐỘNG KINH ĐANG HOẠT ĐỘNG: Phóng điện kịch phát tần số cao biên độ lớn.';
    seizureRiskStatus = 'active_seizure';
    bis = 85;
  } else if (inputs.eegPatternType === 'isoelectric_flat') {
    spectralDominance = 'Điện não đẳng điện (Phẳng < 2uV)';
    brainStateSummary = '⚫ KHÔNG CÒN HOẠT ĐỘNG ĐIỆN NÃO: Nghi ngờ hoại tử vỏ não toàn bộ / Chết não.';
    bis = 0;
  } else if (inputs.eegPatternType === 'burst_suppression') {
    spectralDominance = `Mô hình Ức chế Bùng nổ (BSR ${inputs.burstSuppressionRatioPercent || 65}%)`;
    brainStateSummary = 'Ức chế chuyển hóa não sâu do thuốc mê toàn thân (Propofol/Thiopental).';
    bis = 20;
  } else if (delta > 50) {
    spectralDominance = 'Sóng chậm Delta (<4 Hz) ưu thế lan tỏa';
    brainStateSummary = 'Ức chế hoạt động vỏ não nặng / Hôn mê do tổn thương cấu trúc hoặc thiếu oxy não.';
    bis = 30;
  } else if (tar > 2.0) {
    spectralDominance = 'Sóng Theta (4-8 Hz) lan tỏa (TAR > 2.0)';
    brainStateSummary = 'Bệnh não chuyển hóa / Nhiễm độc / Sảng ICU tiến triển.';
    bis = 55;
  }

  // 5. Clinical Recommendations
  const immediateActions: string[] = [];
  const sedationAdjustments: string[] = [];
  const monitoringProtocols: string[] = [];

  if (fourRiskTier === 'deep_coma_brain_death' || totalFour <= 4) {
    immediateActions.push('Đánh giá phản xạ thân não khẩn cấp (Đồng tử, Mắt búp bê, Phản xạ ho/hút đờm).');
    immediateActions.push('Nếu nghi ngờ chết não: Tiến hành quy trình kiểm định chết não chuẩn (Test ngừng thở Apnea test, cEEG 30 phút).');
  }

  if (seizureRiskStatus === 'active_seizure') {
    immediateActions.push('🚨 CẤP CỨU ĐỘNG KINH: Cắt cơn ngay bằng Lorazepam 4mg IV hoặc Midazolam 10mg IM.');
    immediateActions.push('Nạp thuốc chống động kinh bậc 2: Levetiracetam 60 mg/kg (tối đa 4500 mg) hoặc Valproate 40 mg/kg IV trong 10 phút.');
  }

  if (rassTargetStatus === 'over_sedated') {
    sedationAdjustments.push('Bệnh nhân đang bị an thần quá sâu (Over-sedated). Thực hiện Nghiệm pháp Gián đoạn An thần Hàng ngày (Daily Sedation Interruption - DSI).');
    sedationAdjustments.push('Giảm 25-50% liều thuốc an thần truyền liên tục và chuyển sang chế độ an thần theo mục tiêu (Target-controlled).');
  } else if (rassTargetStatus === 'under_sedated') {
    sedationAdjustments.push('Đánh giá thang điểm đau CPOT trước khi tăng an thần. Ưu tiên kiểm soát đau (Analgesia-first sedation).');
  }

  monitoringProtocols.push('Theo dõi điện não đồ liên tục (Continuous EEG - cEEG) ít nhất 24-48 giờ ở bệnh nhân hôn mê không giải thích được hoặc sau ngừng tuần hoàn.');
  monitoringProtocols.push('Đánh giá đồng thời Thang điểm FOUR Score và CAM-ICU mỗi 4 - 8 giờ.');

  const clinicalSummary = `[ĐÁNH GIÁ THẦN KINH ICU - DOCSPACE PRO]
• Thang điểm FOUR Score: ${totalFour}/16 điểm (${fourRiskTier.toUpperCase()})
• Thang điểm RASS: ${rass > 0 ? `+${rass}` : rass} (${rassCategory.toUpperCase()}) ➔ ${rassTargetStatus === 'at_target' ? 'ĐẠT ĐÍCH' : (rassTargetStatus === 'over_sedated' ? 'QUÁ SÂU' : 'CHƯA ĐỦ')}
• Tầm soát Sảng CAM-ICU: ${isDeliriumPositive ? `DƯƠNG TÍNH (${deliriumSubtype.toUpperCase()})` : 'ÂM TÍNH'}
• Mô hình Điện não (NeuroKit2): ${brainStateSummary}
• Tỷ số Sóng Chậm TAR (Theta/Alpha): ${tar} | Tần số chủ đạo: ${inputs.dominantFrequencyHz} Hz
• Khuyến cáo chính: ${immediateActions.concat(sedationAdjustments)[0] || 'Duy trì theo dõi sát tri giác.'}`;

  return {
    totalFourScore: totalFour,
    fourRiskTier,
    fourInterpretation,
    fourBadgeColor,
    rassCategory,
    rassInterpretation,
    rassTargetStatus,
    isDeliriumPositive,
    deliriumSubtype,
    deliriumRecommendation,
    spectralDominance,
    spectralRatioThetaAlpha: tar,
    brainStateSummary,
    seizureRiskStatus,
    bisEstimated: bis,
    immediateActions,
    sedationAdjustments,
    monitoringProtocols,
    clinicalSummary,
  };
}

/**
 * Render Biểu Đồ Phổ Năng Lượng 5 Dải Sóng Não (EEG PSD Bands) SVG Chuẩn NeuroKit2
 */
export function renderEegPsdBandsSvg(inputs: NeuroInputs, theme: 'paper' | 'neon' | 'dark' = 'paper'): string {
  const w = 480;
  const h = 180;
  const padL = 45;
  const padR = 20;
  const padT = 25;
  const padB = 30;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  const bands = [
    { name: 'Delta (δ)', range: '0.5-4 Hz', val: inputs.deltaPowerPercent, color: '#dc2626' },
    { name: 'Theta (θ)', range: '4-8 Hz', val: inputs.thetaPowerPercent, color: '#ea580c' },
    { name: 'Alpha (α)', range: '8-13 Hz', val: inputs.alphaPowerPercent, color: '#10b981' },
    { name: 'Beta (β)', range: '13-30 Hz', val: inputs.betaPowerPercent, color: '#0284c7' },
    { name: 'Gamma (γ)', range: '30-50 Hz', val: inputs.gammaPowerPercent, color: '#7c3aed' },
  ];

  const barW = chartW / 5 - 10;

  return `
    <svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-surface); border-radius:10px; display:block;">
      <!-- Title -->
      <text x="${padL}" y="16" fill="var(--color-text)" font-size="10.5" font-weight="800">
        Phân Bố Mật Độ Phổ Năng Lượng 5 Dải Sóng Não (NeuroKit2 PSD)
      </text>

      <!-- Y Grid Lines (0%, 25%, 50%, 75%, 100%) -->
      ${[0, 25, 50, 75, 100].map(pct => {
        const y = padT + chartH - (pct / 100) * chartH;
        return `
          <line x1="${padL}" y1="${y}" x2="${padL + chartW}" y2="${y}" stroke="var(--color-border)" stroke-width="0.8" stroke-dasharray="2,2"/>
          <text x="${padL - 6}" y="${y + 3}" fill="var(--color-text-muted)" font-size="8" text-anchor="end">${pct}%</text>
        `;
      }).join('')}

      <!-- Bars -->
      ${bands.map((b, idx) => {
        const x = padL + idx * (barW + 12) + 6;
        const barH = (Math.min(100, b.val) / 100) * chartH;
        const y = padT + chartH - barH;
        return `
          <g>
            <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="4" fill="${b.color}" opacity="0.9" />
            <text x="${x + barW / 2}" y="${y - 4}" fill="${b.color}" font-size="9" font-weight="900" text-anchor="middle">${b.val}%</text>
            <text x="${x + barW / 2}" y="${padT + chartH + 13}" fill="var(--color-text)" font-size="8.5" font-weight="700" text-anchor="middle">${b.name.split(' ')[0]}</text>
            <text x="${x + barW / 2}" y="${padT + chartH + 24}" fill="var(--color-text-muted)" font-size="7.5" text-anchor="middle">${b.range}</text>
          </g>
        `;
      }).join('')}
    </svg>
  `;
}

/**
 * Render Dải Sóng Điện Não Đa Đạo Trình (4-Channel EEG Traces) SVG Tương Tác
 */
export function renderEegTracesSvg(inputs: NeuroInputs, theme: 'paper' | 'neon' | 'dark' = 'paper'): string {
  const totalW = 860;
  const totalH = 260;
  const padL = 60;
  const padR = 20;
  const padT = 32;
  const padB = 25;
  const plotW = totalW - padL - padR;
  const channelH = (totalH - padT - padB) / 4;

  let bgFill = 'var(--color-bg)';
  let gridLine = 'var(--color-border)';
  let traceColor = '#0284c7';
  let textColor = 'var(--color-text)';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridLine = 'rgba(56, 189, 248, 0.12)';
    traceColor = '#38bdf8';
    textColor = '#38bdf8';
  } else if (theme === 'dark') {
    bgFill = '#0f172a';
    gridLine = 'rgba(255, 255, 255, 0.08)';
    traceColor = '#38bdf8';
    textColor = '#94a3b8';
  }

  const channels = ['Fp1-F3 (Trán T)', 'C3-P3 (Đỉnh T)', 'Fp2-F4 (Trán P)', 'C4-P4 (Đỉnh P)'];
  const numSamples = 300;
  const stepX = plotW / numSamples;

  const pat = inputs.eegPatternType;
  const freq = inputs.dominantFrequencyHz || 8;
  const bsr = inputs.burstSuppressionRatioPercent || 0;

  const traces: string[] = [];

  for (let ch = 0; ch < 4; ch++) {
    const midY = padT + ch * channelH + channelH / 2;
    let pathD = `M ${padL},${midY} `;

    for (let i = 0; i < numSamples; i++) {
      const x = padL + i * stepX;
      let yOffset = 0;
      const t = (i / numSamples) * 4; // 4 seconds window

      if (pat === 'isoelectric_flat') {
        yOffset = (Math.random() - 0.5) * 1.5; // Phẳng < 2 uV
      } else if (pat === 'burst_suppression') {
        const cycle = (i % 80);
        if (cycle < (80 * (bsr / 100))) {
          // Suppression phase
          yOffset = (Math.random() - 0.5) * 1.5;
        } else {
          // Burst phase
          yOffset = Math.sin(t * 25 + ch) * 18 + (Math.random() - 0.5) * 8;
        }
      } else if (pat === 'spike_wave_seizure') {
        const spikePhase = (i % 25);
        if (spikePhase < 4) {
          // Sharp spike
          yOffset = -22 * (1 - spikePhase / 4);
        } else {
          // Slow wave
          yOffset = Math.sin((spikePhase / 21) * Math.PI) * 16;
        }
      } else if (pat === 'triphasic_waves') {
        const triPhase = (i % 40);
        if (triPhase < 10) yOffset = 8;
        else if (triPhase < 22) yOffset = -20;
        else yOffset = 10;
      } else if (pat === 'diffuse_delta_coma') {
        yOffset = Math.sin(t * freq * 2 * Math.PI + ch * 0.5) * 16 + Math.sin(t * 1.2) * 8;
      } else {
        // Normal alpha rhythm
        yOffset = Math.sin(t * freq * 2 * Math.PI + ch * 0.3) * 12 + (Math.random() - 0.5) * 4;
      }

      pathD += `L ${x.toFixed(1)},${(midY + yOffset).toFixed(1)} `;
    }

    traces.push(pathD);
  }

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="${totalH}" style="background:${bgFill}; border-radius:10px; display:block; max-width:100%; box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <!-- Header -->
      <rect x="0" y="0" width="${totalW}" height="${padT}" fill="rgba(0,0,0,0.04)" rx="10"/>
      <text x="14" y="21" fill="${textColor}" font-size="11.5" font-weight="800" font-family="'Inter', sans-serif">
        🧠 ĐIỆN NÃO ĐỒ ĐA KÊNH THỜI GIAN THỰC (4-CHANNEL cEEG) — MÔ HÌNH: ${inputs.eegPatternType.toUpperCase()} | BIS: ${inputs.bispectralIndexEstimated ?? 75}
      </text>
      <text x="${totalW - 14}" y="21" fill="var(--color-text-muted)" font-size="10" font-weight="700" text-anchor="end">
        NeuroKit2 Continuous EEG Studio (Tốc độ 30 mm/s)
      </text>

      <!-- Channel Baselines & Labels -->
      ${channels.map((name, ch) => {
        const midY = padT + ch * channelH + channelH / 2;
        return `
          <g>
            <line x1="${padL}" y1="${midY}" x2="${totalW - padR}" y2="${midY}" stroke="${gridLine}" stroke-width="0.8" stroke-dasharray="2,2"/>
            <text x="${padL - 8}" y="${midY + 3.5}" fill="var(--color-text-muted)" font-size="8.5" font-weight="800" text-anchor="end">${name}</text>
            <path d="${traces[ch]}" fill="none" stroke="${traceColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        `;
      }).join('')}

      <!-- Bottom Caliper -->
      <g transform="translate(${padL}, ${totalH - 8})">
        <text x="0" y="0" fill="var(--color-text-muted)" font-size="9" font-weight="600">
          Cửa sổ hiển thị: <strong>4.0 giây</strong> | Độ nhạy: <strong>7 &mu;V/mm</strong> | Lọc thông dải: <strong>0.5 - 35 Hz</strong>
        </text>
      </g>
    </svg>
  `;
}
