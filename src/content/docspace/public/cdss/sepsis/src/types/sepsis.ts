export type PatientType = 'adult' | 'pediatric' | 'maternal';

export type ClinicalSetting = 
  | 'acute_hospital'      // Khoa cấp cứu / Khoa phòng nội trú bệnh viện
  | 'icu'                 // Khoa Hồi sức tích cực (ICU/CVIU)
  | 'emergency_ambulance' // Xe cấp cứu / Tiền viện
  | 'community_custodial';// Y tế cơ sở / Cộng đồng / Phòng khám ban đầu

export type InfectionSource = 
  | 'respiratory' 
  | 'urinary' 
  | 'abdominal' 
  | 'skin_soft_tissue' 
  | 'bloodstream_catheter' 
  | 'cns' 
  | 'pelvic_obstetric' 
  | 'unknown';

export interface PatientData {
  id: string;
  patientName: string;
  patientCode: string;
  patientType: PatientType;
  ageYears: number;
  ageMonths?: number; // Cho trẻ em < 1 tuổi
  gender: 'male' | 'female';
  setting: ClinicalSetting;
  pregnancyWeek?: number; // Cho thai phụ
  isPostpartum?: boolean; // Hậu sản (trong vòng 4 tuần sau sinh)
  weightKg: number;

  // Tiền sử & Nguy cơ cao
  hasFrailty: boolean;
  hasImmunosuppression: boolean; // Ghép tạng, ung thư dùng hóa trị ≤ 30 ngày, corticoid
  hasRecentSurgery: boolean;      // Phẫu thuật hoặc thủ thuật xâm lấn ≤ 6 tuần
  hasIndwellingCatheter: boolean; // Sonde tiểu, CVC, PICC
  hasRepeatedAntibioticUse: boolean;
  hasSkinBreach: boolean;        // Vết rách da, bỏng, loét, vết mổ
  communicationDifficulty: boolean; // Khó giao tiếp / Sa sút trí tuệ / Thiểu năng

  // Ổ nhiễm trùng nghi ngờ
  suspectedInfection: boolean;
  infectionSource: InfectionSource;
  feverOrRigors: boolean;
  recentMultiplePresentations: boolean; // Từng tái khám nhiều lần vì triệu chứng tương tự

  // Sinh hiệu (Vital Signs)
  sbp: number; // Huyết áp tâm thu (mmHg)
  dbp: number; // Huyết áp tâm trương (mmHg)
  heartRate: number; // Nhịp tim (lần/phút)
  respiratoryRate: number; // Tần số thở (lần/phút)
  temperature: number; // Thân nhiệt (°C)
  spo2: number; // Độ bão hòa oxy máu mao mạch (%)
  onSupplementalOxygen: boolean; // Đang thở oxy hỗ trợ
  fio2Percent: number; // Nồng độ oxy hít vào (%) ví dụ 21% (khí trời), 40%, 60%
  copdOrHypercapnicRisk: boolean; // Bệnh nhân có nguy cơ suy hô hấp tăng CO2 (đích SpO2 NEWS2 88-92%)

  // Tri giác & Thần kinh
  avpu: 'A' | 'V' | 'P' | 'U'; // Alert, Voice, Pain, Unresponsive
  gcs: number; // Thang điểm Glasgow (3 - 15)
  newAlteredMentalState: boolean; // Lú lẫn mới xuất hiện / thay đổi hành vi cấp
  bilateralFixedPupils: boolean; // Đồng tử giãn cố định 2 bên (tiêu chí Phoenix)

  // Dấu hiệu tưới máu & Da & Bài tiết
  mottledOrAshen: boolean; // Da vân đá / tái tro
  cyanosis: boolean; // Tím tái môi, đầu chi, lưỡi
  nonBlanchingRash: boolean; // Ban xuất huyết không biến mất khi đè ép (petechial/purpuric rash)
  capillaryRefillSeconds: number; // Thời gian đổ đầy mao mạch (giây)
  urineOutputStatus: 'normal' | 'not_12_18h' | 'not_over_18h'; // Lượng nước tiểu
  urineOutputMlKgHr?: number; // Nước tiểu mL/kg/giờ qua sonde

  // Hỗ trợ hô hấp & Tuần hoàn
  invasiveMechanicalVentilation: boolean; // Thở máy xâm lấn (IMV)
  nonInvasiveVentilation: boolean; // Thở máy không xâm lấn / HFNC
  vasoactiveMedCount: number; // 0, 1 hoặc >= 2 thuốc vận mạch
  vasoactiveUsed: {
    norepinephrine: boolean;
    epinephrine: boolean;
    vasopressin: boolean;
    dopamine: boolean;
    dobutamine: boolean;
  };

  // Cận lâm sàng & Biomarkers
  pao2?: number; // Phân áp oxy động mạch (mmHg) nếu có khí máu
  lactateInitial?: number; // Lactate ban đầu (mmol/L)
  lactateRepeat6h?: number; // Lactate đo lại sau 2 - 6 giờ (mmol/L)
  procalcitonin?: number; // Procalcitonin (ng/mL)
  crp?: number; // CRP (mg/L hoặc mg/dL)
  wbc?: number; // Bạch cầu (x10^9/L)
  neutrophilCount?: number; // Bạch cầu hạt trung tính (x10^9/L)
  lymphocyteCount?: number; // Bạch cầu lympho (x10^9/L)
  platelets?: number; // Tiểu cầu (x10^9/L hoặc x10^3/µL)
  bilirubinUmolL?: number; // Bilirubin toàn phần (µmol/L)
  creatinineUmolL?: number; // Creatinine huyết thanh (µmol/L)
  inr?: number; // INR đông máu
  dDimerMgL?: number; // D-dimer (mg/L FEU)
  fibrinogenMgDl?: number; // Fibrinogen (mg/dL)

  // Vi sinh & Chẩn đoán phân tử nhanh
  bloodCultureCollected: boolean; // Đã cấy máu trước kháng sinh chưa
  bloodCultureResult?: 'pending' | 'negative' | 'positive';
  bloodCultureOrganism?: string;
  rapidMolecularT2Done: boolean; // T2Bacteria / T2Resistance
  rapidMolecularResult?: 'pending' | 'negative' | 'positive';
  rapidMolecularPathogen?: string; // e.g. K. pneumoniae, P. aeruginosa, A. baumannii
  rapidMolecularResistanceGenes?: string[]; // e.g. blaKPC, blaOXA-48, blaCTX-M, mecA
}

export interface ScoreItemBreakdown {
  name: string;
  score: number;
  description: string;
  isRedFlag?: boolean;
}

export interface CDSSAssessmentResult {
  // Sepsis-3 (Adults)
  sofaScore: number;
  sofaBreakdown: ScoreItemBreakdown[];
  deltaSofa: number;
  qsofaScore: number;
  qsofaBreakdown: ScoreItemBreakdown[];
  qsofaCriteriaMet: string[];
  isQsofaPositive: boolean;
  isSepsis3: boolean;
  isSepticShock3: boolean;

  // Thang điểm tham khảo lịch sử (SIRS - Bone 1992)
  sirsScore: number;
  sirsCriteriaMet: string[];
  isSirsPositive: boolean;

  // NEWS2 & LP-NEWS
  news2Score: number;
  news2Breakdown: ScoreItemBreakdown[];
  news2RiskCategory: 'very_low' | 'low' | 'medium' | 'high';
  hasSingleParam3RedFlag: boolean;
  lpNewsScore: number;
  lpNewsBreakdown: ScoreItemBreakdown[];
  lpNewsMortalityRiskTier: 'low' | 'moderate' | 'high' | 'critical';
  lpNewsPredictedMortalityText: string;

  // NICE NG253 (2024/2026) Risk Stratification
  niceRiskCategory: 'low' | 'medium' | 'high';
  niceHighRiskCriteriaMet: string[];
  niceMediumRiskCriteriaMet: string[];
  niceAntibioticMaxDelayHours: number; // 1h, 3h, 6h

  // Phoenix Sepsis Criteria (Pediatrics < 18y)
  phoenixScore?: number;
  phoenixBreakdown?: ScoreItemBreakdown[];
  phoenixCardiovascularScore?: number;
  isPhoenixSepsis?: boolean;
  isPhoenixSepticShock?: boolean;

  // Obstetric Sepsis (Pregnancy / Postpartum)
  obstetricQsofaScore?: number;
  obstetricQsofaBreakdown?: ScoreItemBreakdown[];
  obstetricSofaScore?: number;
  obstetricSofaBreakdown?: ScoreItemBreakdown[];
  isObstetricSepsis?: boolean;
  isObstetricSepticShock?: boolean;

  // Biomarker Prognostics
  calculatedMap: number;
  calculatedNlr?: number;
  nlrRiskLevel?: 'normal' | 'elevated' | 'high';
  lactateClearancePercent?: number;
  lactateClearanceEvaluation?: 'adequate' | 'suboptimal' | 'poor' | 'na';
  pctEvaluation?: string;
  crpEvaluation?: string;

  // Overall CDSS Conclusion
  primaryDiagnosis: 'no_sepsis' | 'uncomplicated_infection' | 'suspected_sepsis' | 'confirmed_sepsis' | 'septic_shock';
  urgencyLevel: 'routine' | 'urgent' | 'emergency';
  summarySentence: string;

  // Action Plan & Protocols
  actions: {
    antibioticTiming: string;
    antibioticRegimen: string[];
    fluidResuscitation: string;
    vasopressorStrategy: string;
    escalationAndConsult: string[];
    monitoringFrequency: string;
    microbiologySteps: string[];
    sourceControlNotes: string;
  };
}
