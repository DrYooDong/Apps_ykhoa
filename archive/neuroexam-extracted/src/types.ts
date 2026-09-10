export interface PatientProfile {
  ageGroup: string; // "Trẻ em (<18)", "Thanh niên (18-40)", "Trung niên (41-65)", "Cao tuổi (>65)"
  ageYears?: number;
  sex: "Nam" | "Nữ";
  onsetTime: string; // "Cấp tính (<3h)", "3-4.5h", "4.5-24h", "Bán cấp (vài ngày)", "Mạn tính"
  onsetContext: string; // "Đột ngột khi đang nghỉ", "Sau gắng sức/chấn thương", "Sau sốt/nhiễm trùng", "Khi thức dậy"
  chiefComplaint: string;
}

export interface VitalSigns {
  hr: number; // nhịp tim
  sbp: number; // huyết áp tâm thu
  dbp: number; // huyết áp tâm trương
  rr: number; // nhịp thở
  spo2: number; // %
  temp: number; // độ C
  glucose: number; // mg/dL
}

export interface MentalStatus {
  gcsEye: number; // 1-4
  gcsVerbal: number; // 1-5
  gcsMotor: number; // 1-6
  gcsScore: number; // 3-15
  fourEye: number; // 0-4
  fourMotor: number; // 0-4
  fourBrainstem: number; // 0-4
  fourRespiration: number; // 0-4
  fourScore: number; // 0-16
  orientationTime: boolean;
  orientationPlace: boolean;
  orientationPerson: boolean;
  speechType: "Bình thường" | "Nói đớ (Dysarthria)" | "Mất ngôn ngữ diễn đạt (Broca)" | "Mất ngôn ngữ tiếp nhận (Wernicke)" | "Toàn thể (Global)" | "Câm gián đoạn";
  summary: string;
}

export interface CranialNervesExam {
  cn1: string; // Khứu giác
  cn2_acuity: string; // Thị lực
  cn2_fields: "Bình thường" | "Bán manh đồng danh (P)" | "Bán manh đồng danh (T)" | "Bán manh thái dương 2 bên" | "Góc tư trên" | "Góc tư dưới";
  cn2_pupils: "Đều 2 bên (PERRLA)" | "Đồng tử P giãn mất phản xạ (Hutchinson/CN III)" | "Đồng tử T giãn mất phản xạ" | "Đồng tử co nhỏ điểm (Pontine/Opioid)" | "Anisocoria (Lệch kích thước)";
  cn2_rapd: boolean; // Relative Afferent Pupillary Defect
  cn3_4_6_motility: "Bình thường" | "Liệt dây III bên Phải (Down & Out + Sụp mi)" | "Liệt dây III bên Trái" | "Liệt dây IV (Nghiêng đầu bù trừ)" | "Liệt dây VI bên Phải (Không liếc ngoài được)" | "Liệt dây VI bên Trái" | "Liếc ngang phối hợp mất";
  cn5_sensory: "Bình thường" | "Tê bì nhánh V1, V2, V3" | "Mất phản xạ giác mạc";
  cn7_facial: "Bình thường" | "Liệt mặt trung ương P (liệt 1/4 dưới, nếp nhăn trán còn)" | "Liệt mặt trung ương T" | "Liệt mặt ngoại biên P (Bell's palsy, nhăn trán mất, hở mi)" | "Liệt mặt ngoại biên T";
  cn8_hearing: "Bình thường" | "Giảm thính lực tiếp nhận" | "Giảm thính lực dẫn truyền";
  cn9_10_gag: "Bình thường" | "Mất phản xạ nôn / Lưỡi gà lệch P" | "Lưỡi gà lệch T";
  cn11_accessory: "Bình thường" | "Yếu cơ nâng vai / cơ ức đòn chũm";
  cn12_hypoglossal: "Bình thường" | "Lưỡi lệch Phải khi thè" | "Lưỡi lệch Trái khi thè";
}

export interface MotorExam {
  rightArmMRC: number; // 0-5
  leftArmMRC: number; // 0-5
  rightLegMRC: number; // 0-5
  leftLegMRC: number; // 0-5
  pronatorDrift: "Không có" | "Dương tính tay Phải" | "Dương tính tay Trái" | "Cả hai tay";
  muscleTone: "Bình thường" | "Tăng trương lực cơ kiểu tháp (Spasticity/Gấp dao)" | "Tăng trương lực cơ kiểu ngoại tháp (Bánh xe răng cưa)" | "Giảm trương lực cơ (Liệt mềm/LMN)";
  weaknessPattern: "Không yếu" | "Liệt nửa người bên Phải" | "Liệt nửa người bên Trái" | "Liệt 2 chi dưới (Paraplegia)" | "Liệt tứ chi (Quadriplegia)" | "Yếu gốc chi chiếm ưu thế (Cơ/NMJ)" | "Yếu ngọn chi chiếm ưu thế (Dây TK)";
}

export interface SensoryExam {
  lightTouch: "Bình thường" | "Giảm nửa người Phải" | "Giảm nửa người Trái" | "Mất cảm giác dạng găng - vớ" | "Mất cảm giác theo khoanh da";
  dermatomeLevel: string; // "Không có mức rõ", "C4 (Vai)", "C6 (Ngón cái)", "T4 (Núm vú)", "T10 (Rốn)", "L4 (Gối/Cẳng chân)", "L5 (Mu bàn chân)", "S1 (Gót/Bờ ngoài)", "S2-S5 (Yên ngựa - Saddle)"
  proprioception: "Bình thường" | "Mất cảm giác tư thế khớp" | "Rung âm thoa giảm ngọn chi";
  saddleAnesthesia: boolean; // Tê vùng yên ngựa (Cauda Equina Red Flag)
}

export interface ReflexesExam {
  bicepsReflex: number; // 0-4+
  tricepsReflex: number;
  patellarReflex: number;
  achillesReflex: number;
  babinskiSign: "Âm tính (Đáp ứng gập)" | "Dương tính bên Phải (Duỗi ngón cái)" | "Dương tính bên Trái" | "Dương tính cả 2 bên";
  clonus: "Không có" | "Có giật xương bánh chè/cổ chân (>3 nhịp)";
  meningealSigns: boolean; // Cổ cứng
  kernigSign: boolean;
  brudzinskiSign: boolean;
}

export interface CoordinationGaitExam {
  fingerToNose: "Chính xác" | "Quá tầm bên Phải (Dysmetria)" | "Quá tầm bên Trái" | "Run chủ ý (Intention tremor)";
  heelToShin: "Bình thường" | "Rối loạn bên Phải" | "Rối loạn bên Trái";
  rapidAlternating: "Bình thường" | "Mất đồng vận (Dysdiadochokinesia)";
  rombergTest: "Âm tính (Đứng vững khi nhắm mắt)" | "Dương tính (Mất thăng bằng rõ khi nhắm mắt - Cảm giác sâu)" | "Không đứng được cả khi mở mắt (Tiểu não)";
  gaitType: "Bình thường" | "Dáng đi phạt cỏ (Hemiparetic/Vung chân)" | "Dáng đi bước lảo đảo (Ataxic - Chân đế rộng)" | "Dáng đi cuống đít / lê chân (Parkinsonian festination)" | "Dáng đi chân rũ / nhấc cao (Steppage - Liệt TK Mác/L5)" | "Dáng đi cắt kéo (Spastic scissoring)" | "Dáng đi lắc lư vịt (Waddling - Yếu đai hông/Loạn dưỡng cơ)" | "Dáng đi giảm đau (Antalgic)";
}

export interface HintsTestExam {
  performed: boolean;
  headImpulse: "Bình thường (Đột quỵ nguy cơ cao)" | "Có giật chỉnh lại (Bắt saccade - Thần kinh ngoại biên lành tính)" | "Chưa đánh giá";
  nystagmus: "Không có" | "Rung giật ngang đơn hướng (Ngoại biên)" | "Đổi hướng khi liếc mắt (Hướng tâm - Nguy cơ đột quỵ)" | "Rung giật dọc / xoay (Trung ương)";
  testOfSkew: "Không lệch" | "Lệch trục nhãn cầu đứng (Skew deviation - Nguy cơ đột quỵ thân não)" | "Chưa đánh giá";
  conclusion: string;
}

export interface ClinicalPearl {
  id: string;
  category: string;
  title: string;
  author: string;
  date: string;
  content: string;
  evidenceLevel: string;
  tags: string[];
}

export interface CaseTemplate {
  id: string;
  title: string;
  subtitle: string;
  badgeColor: string;
  category: string;
  summary: string;
  profile: PatientProfile;
  vitals: VitalSigns;
  mentalStatus: Partial<MentalStatus>;
  cranialNerves: Partial<CranialNervesExam>;
  motorExam: Partial<MotorExam>;
  sensoryExam: Partial<SensoryExam>;
  reflexes: Partial<ReflexesExam>;
  coordinationGait: Partial<CoordinationGaitExam>;
  hints?: Partial<HintsTestExam>;
  redFlags: string[];
  expectedDiagnosis: string;
  goldStandardNotes: string;
}

export interface DiagnosticResult {
  neuroLocalization: {
    primarySite: string;
    syndromeType: string;
    rationale: string;
  };
  diagnoses: Array<{
    rank: number;
    diseaseName: string;
    confidence: number;
    clinicalEvidence: string;
    counterEvidence: string;
  }>;
  urgentActions: string[];
  diagnosticWorkupPlan: Array<{
    modality: string;
    purpose: string;
    priority: string;
  }>;
  managementRecommendations: {
    acuteInterventions: string[];
    medications: Array<{
      drugName: string;
      dosage: string;
      notes: string;
    }>;
    monitoring: string;
  };
  clinicalPearlsAndPitfalls: string[];
}
