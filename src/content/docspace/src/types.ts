export type Gender = 'nam' | 'nu' | 'khac';
export type RoleType = 'dt' | 'gy' | 'ht' | 'loaitru'; // đặc trưng, gợi ý, hỗ trợ, loại trừ
export type CategoryType = 'cn' | 'tt' | 'tc' | 'cls'; // cơ năng, thực thể, tiền căn, cận lâm sàng

export interface ThresholdMap {
  fld: string;
  op: '>=' | '>' | '<=' | '<';
  val?: number;
  valNu?: number;
  valNam?: number;
}

export interface TrieuChung {
  id: string;
  ten: string;
  nhom: string;
  loai: CategoryType[];
  tuKhoa: string[];
  aliases?: string[];
  map: ThresholdMap | null;
}

export interface DanSo {
  gioiTinh: 'any' | 'nam' | 'nu';
  tuoiMin?: number | null;
  tuoiMax?: number | null;
}

export type BranchAxisType =
  | 'severity'       // Theo mức độ nặng (Nhẹ, Vừa, Nặng, Nguy kịch)
  | 'phenotype'      // Theo thể lâm sàng / căn nguyên / vi sinh (Có mủ vs Không mủ, Vi khuẩn vs Siêu vi)
  | 'stage'          // Theo giai đoạn bệnh (Child-Pugh A/B/C, CKD G1-G5, NYHA I-IV)
  | 'triage_score'   // Theo thang điểm nguy cơ / phân tuyến (CURB-65, PSI, NEWS2, PEWS)
  | 'treatment_step' // Theo bậc điều trị (GINA Step 1-5, GOLD A-B-E)
  | 'comorbidity'    // Theo nhóm bệnh đồng mắc / nguy cơ (Kèm ASCVD/CKD/HF vs Không có)
  | 'custom';        // Tự do định nghĩa theo tính chất bệnh

export interface ClinicalBranch {
  id: string;                         // Mã nhánh duy nhất (VD: 'mild', 'canh_bao', 'curb65_high', 'purulent')
  name: string;                       // Tên nhánh hiển thị (VD: 'Mức độ 1: SXHD nhẹ', 'CURB-65 ≥ 3 (Nhập ICU)')
  axisType?: BranchAxisType;          // Trục phân nhánh
  badgeText?: string;                 // Nhãn ngắn (VD: 'Ngoại trú', 'ICU', 'Bậc 3', 'Có mủ')
  color?: 'emerald' | 'amber' | 'rose' | 'red' | 'blue' | 'indigo' | 'purple' | 'slate' | string;
  criteria: string;                   // Tiêu chuẩn lâm sàng & CLS để xếp vào nhánh này
  triage?: string;                    // Tuyến tiếp nhận / Khoa điều trị
  targetVitals?: string;              // Sinh hiệu / Mục tiêu điều trị của nhánh
  escalationCriteria?: string;        // Tiêu chuẩn chuyển nhánh / leo thang phác đồ
  dischargeCriteria?: string;         // Tiêu chuẩn hạ bậc / xuất viện
  drugs?: [string, string, string][]; // Danh mục thuốc đặc thù của nhánh
  firstLineDrugs?: Array<{
    drugName: string;
    class: string;
    route: string;
    dosage: string;
    frequency: string;
    instructions: string;
    isFirstLine: boolean;
  }>;
  secondLineDrugs?: Array<{
    drugName: string;
    class: string;
    route: string;
    dosage: string;
    frequency: string;
    instructions: string;
    isFirstLine: boolean;
  }>;
  monitoring?: string[];              // Theo dõi đặc thù của nhánh
  cautions?: string[];                // Lưu ý đặc thù của nhánh
  timelinePhases?: any[];             // Bảng 4 cột lộ trình điều trị từng ngày của nhánh
  patientCounseling?: string;         // Tư vấn bệnh nhân theo nhánh
}

export type BranchingMode = 'single' | 'multi';
export type BranchingSelectionFlow = 'sequential' | 'independent' | 'matrix';

export interface BranchAxis {
  axisId: string;                     // ID trục phân nhánh, vd: 'axis_etiology', 'axis_severity'
  axisName: string;                   // Tên trục phân loại, vd: 'Phân loại theo Nguyên nhân'
  axisType: BranchAxisType;           // 'severity' | 'phenotype' | 'stage' ...
  axisOrder?: number;                 // Thứ tự ưu tiên / bước chọn (1, 2, 3...)
  isRequired?: boolean;               // Bắt buộc chọn hay tùy chọn
  description?: string;               // Giải thích nguyên lý trục
  branches: ClinicalBranch[];         // Các nhánh thuộc trục này
}

export interface CombinedProtocol {
  id: string;                         // ID tổ hợp, vd: 'cp_etio_alcohol_severity_cp_b'
  axisSelections: Record<string, string>; // { [axisId]: branchId }
  combinedName?: string;              // Tên phác đồ tổ hợp
  badgeText?: string;
  color?: string;
  criteriaSummary?: string;
  triage?: string;
  targetVitals?: string;
  escalationCriteria?: string;
  dischargeCriteria?: string;
  drugs?: [string, string, string][];
  firstLineDrugs?: Array<{
    drugName: string;
    class: string;
    route: string;
    dosage: string;
    frequency: string;
    instructions: string;
    isFirstLine: boolean;
  }>;
  secondLineDrugs?: Array<{
    drugName: string;
    class: string;
    route: string;
    dosage: string;
    frequency: string;
    instructions: string;
    isFirstLine: boolean;
  }>;
  additionalTreatments?: string[];
  keyWarnings?: string[];
  monitoring?: string[];
  cautions?: string[];
  timelinePhases?: any[];
  patientCounseling?: string;
}

export interface ClinicalIndicationItem {
  indicationName: string;
  criteria: string;
  orderTarget?: string;
  note?: string;
}

export interface ClinicalIndicationGroup {
  category: string;
  badgeText?: string;
  color?: 'rose' | 'amber' | 'blue' | 'indigo' | 'cyan' | 'purple' | 'emerald' | string;
  items: Array<ClinicalIndicationItem | string>;
}

export interface ClinicalBranchingSystem {
  mode?: BranchingMode;               // 'single' (mặc định cho 1 trục) | 'multi' (cho Đa trục như Xơ gan, COPD, Suy tim)
  selectionFlow?: BranchingSelectionFlow; // 'sequential' | 'independent' | 'matrix'
  
  // Dành cho chế độ Single Axis (hoặc fallback tương thích ngược):
  axisName?: string;                   // Tên trục phân loại
  axisType?: BranchAxisType;           // Loại trục phân loại
  description?: string;               // Giải thích nguyên lý phân nhánh của bệnh này
  branches?: ClinicalBranch[];         // Danh sách các nhánh của phác đồ
  
  // Dành cho chế độ Multi-Axis Branching v4.0:
  axes?: BranchAxis[];                // Danh sách các trục phân loại độc lập
  combinedProtocols?: CombinedProtocol[]; // Danh mục phác đồ điều trị tổ hợp khi chọn các trục
}

export interface ProtocolBySeverity {
  severityRef: 'mild' | 'moderate' | 'severe' | 'critical' | 'phenotype' | string;
  tabLabel: string;
  badgeColor?: 'success' | 'warning' | 'danger' | 'critical' | 'info' | string;
  icdSuffix?: string;
  triage: string;
  targetVitals: string;
  escalationCriteria?: string;   // Tiêu chuẩn leo thang lên phân độ kế tiếp
  dischargeCriteria?: string;    // Tiêu chuẩn hạ bậc hoặc xuất viện
  drugs?: [string, string, string][];
  firstLineDrugs?: Array<{
    drugName: string;
    class: string;
    route: string;
    dosage: string;
    frequency: string;
    instructions: string;
    isFirstLine: boolean;
  }>;
  timelinePhases?: any[];
  patientCounseling?: string;
}

export interface PhacDo {
  tuyen: string[];
  thuoc: [string, string, string][]; // [Tên thuốc, Liều / đường dùng, Ghi chú]
  theoDoi: string[];
  luuY: string[];
  nguon: string[];
  protocols?: ProtocolBySeverity[];
}

export interface Benh {
  id: string;
  ten: string;
  icd: string;
  nhom: string;
  baoDong: boolean;
  ghiChuBaoDong: string;
  tomTat: string;
  danSo: DanSo;
  dd: [string, number, RoleType][]; // [trieuChungId, weight, role]
  phacDo: PhacDo;
}

export interface KnowledgeBase {
  meta: {
    ten: string;
    phienBan: number;
    capNhat: string;
  };
  trieuChung: TrieuChung[];
  benh: Benh[];
}

export interface ClinicalFormState {
  gioiTinh: Gender;
  tuoi: string;
  ngheNghiep: string;
  lyDo: string;
  ngayVaoVien?: string;
  text: {
    cn: string;
    tt: string;
    tc: string;
    cls: string;
  };
}

export interface VitalsState {
  vNhiet: string;
  vMach: string;
  vHATT: string;
  vHATTr: string;
  vTho: string;
  vSpo2: string;
  vBMI?: string;
}

export interface LabsState {
  lBC: string;
  lTC: string;
  lHct: string;
  lGlu: string;
  lTrop: string;
  lCre?: string;
  lAST?: string;
  lALT?: string;
  lCRP?: string;
}

export interface MatchedEvidence {
  tc: TrieuChung;
  w: number;
  role: RoleType;
  via: 'chọn' | '⚙ tự suy' | 'mô tả';
}

export interface MissingEvidence {
  tc: TrieuChung;
  w: number;
  role: RoleType;
}

// ==============================================================================
// 🧠 HỘI CHỨNG LÂM SÀNG (CLINICAL SYNDROME ENGINE)
// Định nghĩa: Hội chứng lâm sàng là tập hợp ít nhất 02 triệu chứng
// ==============================================================================
export interface SyndromeDefinition {
  id: string;                    // VD: "hc_warning_signs_dengue"
  ten: string;                   // VD: "Hội chứng Dấu hiệu Cảnh báo SXHD"
  chuyenKhoa?: string;           // VD: "Truyền nhiễm"
  moTa: string;                  // Mô tả lâm sàng
  nguong: {
    loai: 'at_least_n' | 'all' | 'percentage';
    n: number;                   // Tối thiểu n triệu chứng để coi là ĐẠT
    phanTram?: number;
  };
  trieuChung: string[];          // Danh sách IDs triệu chứng thành phần (tối thiểu >= 2 triệu chứng)
  goldStandardRelated?: boolean;
}

export interface SyndromeMatchResult {
  syndromeId: string;
  ten: string;
  matchedCount: number;          // Số triệu chứng hiện có
  totalCount: number;            // Tổng số triệu chứng trong hội chứng (VD: 10)
  threshold: number;             // Ngưỡng đạt (VD: 2)
  isMet: boolean;                // matchedCount >= threshold
  ratioText: string;             // "2/10", "3/7", "2/5"
  matchedSymptoms: Array<{ id: string; ten: string }>; // Triệu chứng đã có
  missingSymptoms: Array<{ id: string; ten: string }>; // Triệu chứng chưa có
  summaryText: string;           // "Đạt 2/10 triệu chứng (Ngưỡng: ≥ 2)"
}

export interface AnalysisResult {
  b: Benh;
  pct: number;
  score: number;
  max: number;
  matched: MatchedEvidence[];
  missing: MissingEvidence[];
  notes: string[];
  syndromeMatches?: Record<string, SyndromeMatchResult>;
  leadSyndromes?: SyndromeMatchResult[];
  epiBoost?: {
    boosted: boolean;
    reason: string;
    points: number;
  };
}

// Bối cảnh Dịch tễ học phục vụ Tam giác chẩn đoán Truyền nhiễm
export interface EpidemiologyContext {
  contactHistory: string;     // Tiếp xúc nguồn lây / người mắc bệnh tương tự
  travelHistory: string;      // Tiền sử đi lại / du lịch trong 14-30 ngày (rừng núi, vùng dịch)
  endemicArea: string;        // Vùng dịch tễ lưu hành (Tây Nguyên, ĐBSCL, vùng lũ lụt...)
  seasonalContext: string;    // Mùa bệnh (Mùa mưa lũ, Mùa hè, Đông Xuân...)
  outbreakAlert: string;      // Ổ dịch địa phương đang lưu hành (SXH, Sởi, Cúm...)
  vectorExposure: string;     // Tiếp xúc vector (Muỗi Aedes, muỗi Anopheles, ấu trùng mò, ve, chuột...)
  occupationalRisk: string;   // Nguy cơ nghề nghiệp (Nông dân, làm rẫy, thú y, cống rãnh...)
  waterFoodRisk: string;      // Nguồn nước/thực phẩm (Lội nước lụt, nước ao tù, ăn đồ sống, sữa tươi...)
  customNotes?: string;       // Ghi chú dịch tễ khác
}

// Mục Đặt vấn đề (Problem List) theo chuẩn Kỹ năng LS Nội khoa & PGS.TS Hoàng Văn Sĩ
export interface ProblemStatementEntry {
  id: string;
  label: string;             // Tên vấn đề (VD: Hội chứng nhiễm trùng, Suy hô hấp cấp, Cơn đau ngực cấp, v.v.)
  type: 'trieu-chung' | 'hoi-chung' | 'dich-te' | 'bat-thuong-cls' | 'benh-man-tinh';
  priorityLevel?: 'life-threatening' | 'acute' | 'chronic'; // 3 tầng ưu tiên chuẩn y khoa
  isPrimary: boolean;        // Vấn đề CHÍNH được chọn để làm trục biện luận chẩn đoán
  evidence: string[];        // Dữ kiện chứng minh (cơ năng, thực thể, CLS)
  diagnosticPlan?: string;   // Chiến lược chẩn đoán: Đề nghị CLS nào cho vấn đề này?
  therapeuticPlan?: string;  // Chiến lược điều trị: Can thiệp cấp cứu / Y lệnh ban đầu?
  conflictNotes?: string;    // Ghi chú xung đột điều trị với các vấn đề khác
  notes?: string;            // Ghi chú biện luận thêm
}

// Đánh giá hội tụ Tam giác chẩn đoán Truyền nhiễm: Dịch tễ — Lâm sàng — Cận lâm sàng
export interface DiagnosticTriangleSummary {
  dichTePoints: string[];
  lamSangPoints: string[];
  canLamSangPoints: string[];
  convergenceLevel: 'high' | 'moderate' | 'low'; // Mức độ hội tụ 3 chiều
  primaryOrientation: string;                     // Hướng chẩn đoán nổi trội
}

// Cấu trúc Vấn đề trong Bệnh án SOAP chuẩn y khoa
export interface SoapProblemItem {
  order?: number;
  priority: 'life-threatening' | 'acute' | 'chronic'; // 🔴 Đe dọa tính mạng | 🟡 Cấp tính | 🔵 Mạn tính
  problemName: string;
  evidenceSummary?: string;
  diagnosticOrientation?: string;
  immediateManagement?: string;
  conflictWarning?: string;
}

// SOAP Clinical Experience Interfaces (Kinh nghiệm lâm sàng - Không chứa danh tính bệnh nhân)
export interface SoapSubjective {
  chiefComplaint: string; // Lý do tiếp nhận / Than phiền chính
  historyOfPresentIllness: string; // Bệnh sử & đặc điểm PQRST
  pastMedicalHistory: string; // Tiền căn bệnh lý & Dược sử liên quan
  symptomsList: string[]; // Triệu chứng cơ năng ghi nhận
  historyPearls: string; // Kinh nghiệm hỏi bệnh & Câu hỏi vàng không được bỏ sót
}

export interface SoapObjective {
  vitals: {
    temp?: string;
    pulse?: string;
    bp?: string;
    resp?: string;
    spo2?: string;
    bmi?: string;
  };
  physicalExam: string; // Khám thực thể trọng tâm
  labsAndImaging: string; // Cận lâm sàng & Xét nghiệm định lượng (CLS, ECG, XQ, CT...)
  objectivePitfalls: string; // Dấu hiệu dễ bỏ sót & Bẫy cận lâm sàng
}

export interface SoapAssessment {
  problemList?: SoapProblemItem[]; // Bảng Đặt vấn đề chuẩn 3 tầng ưu tiên (bản lề giữa O và A)
  primaryDiagnosis: string; // Chẩn đoán xác định / Chẩn đoán sơ bộ
  icd10: string; // Mã ICD-10 chuẩn hóa
  differentials: string[]; // Chẩn đoán phân biệt cần loại trừ
  riskStratification: string; // Phân tầng nguy cơ & Thang điểm lượng giá
  diagnosticPearls: string; // Đúc kết biện luận chẩn đoán & Bài học cảnh giác
}

export interface SoapPlanMedication {
  drug: string;
  dose: string;
  route: string;
  note: string;
}

export interface SoapPlan {
  immediateActions: string; // Xử trí cấp cứu & Ban đầu
  medications: SoapPlanMedication[]; // Y lệnh thuốc chi tiết
  monitoringAndTargets: string; // Chỉ tiêu theo dõi & Mục tiêu lâm sàng
  consultationOrReferral: string; // Tiêu chuẩn hội chẩn / chuyển viện / xuất viện
  takeawayLessons: string; // Bài học kinh nghiệm & Lời khuyên điều trị cốt lõi
}

export interface SoapClinicalExperience {
  id: string;
  title: string; // Tiêu đề ca kinh nghiệm (VD: Cơn đau thắt ngực không ổn định ở BN ĐTĐ cao tuổi)
  specialty: string; // Chuyên khoa (Tim mạch, Hô hấp, Tiêu hóa, Cấp cứu, Thần kinh...)
  experienceLevel: 'essential' | 'pitfall' | 'rare' | 'advanced'; // Ca kinh điển | Bẫy lâm sàng | Tình huống hiếm | Chuyên sâu
  tags: string[]; // Từ khóa tìm kiếm
  demographicContext: string; // Bối cảnh cơ địa lâm sàng (VD: Nam 68 tuổi, thể trạng béo phì, tiền căn ĐTĐ)
  createdAt: string;
  updatedAt?: string; // Timestamp cập nhật lần cuối
  authorDoctor?: string; // Bác sĩ / Giảng viên lâm sàng đúc kết
  isFavorite?: boolean;
  viewCount?: number; // Số lượt xem / tham khảo
  sourceReference?: string; // Nguồn tham khảo (Guideline, Sách, Ca thực tế lâm sàng)
  clinicalContext?: string; // Bối cảnh khoa phòng (ICU, Cấp cứu, Phòng khám, Nội trú...)
  difficultyRating?: 1 | 2 | 3 | 4 | 5; // Độ khó ca bệnh (1: Đơn giản -> 5: Cực phức tạp)
  outcomeNotes?: string; // Kết cục ca bệnh & Di chứng nếu có
  s: SoapSubjective;
  o: SoapObjective;
  a: SoapAssessment;
  p: SoapPlan;
}

export interface GuidelineStudy {
  id: string;
  title: string;
  drug: string;
  sourceType: 'vn-moh' | 'intl-guideline' | 'intl-study' | 'vn-association' | string;
  specialty: string;
  design: string;
  icd10Codes: string[];
  intervention: string;
  primaryEndpoint: string;
  keyResults: string;
  keyFindings?: string;
  impact: string;
  year: number;
  organization: string;
  population?: string;
  phase?: string;
  summary: string;
  detailedConclusion: string;
  sourceUrl?: string;
  file?: string;
  asianData?: boolean;
  bookmarked?: boolean;
}

export interface GuidelineRecommendationItem {
  study: GuidelineStudy;
  matchScore: number;
  matchReason: string;
}

// ==============================================================================
// 🧬 PERSONALIZED CLINICAL STRATIFICATION ENGINE (PCSE) TYPES
// ==============================================================================
export type AgeCategory = 'neonatal' | 'infant' | 'pediatric' | 'adolescent' | 'adult' | 'elderly';
export type CkdStage = 'G1' | 'G2' | 'G3a' | 'G3b' | 'G4' | 'G5' | 'Normal';

export interface PatientPhenotype {
  age?: number;
  ageCategory: AgeCategory;
  ageLabel: string;
  gender: Gender;
  isPregnant?: boolean;
  bmi?: number;
  bmiCategory?: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  eGfr?: number;
  ckdStage?: CkdStage;
  hasRenalRisk: boolean;
  hasHepaticRisk: boolean;
  activeGradeIdx: number;
  activeGradeTitle?: string;
  activeComplicationsCount: number;
  keyAlerts: string[];
}

export interface AppliedComplicationAction {
  id: string;
  name: string;
  orders: string[];
  monitoring: string;
  urgency: 'stat' | 'urgent' | 'routine';
}

export interface AppliedDoseAdjustment {
  type: 'renal' | 'hepatic' | 'pediatric' | 'pregnancy' | 'elderly';
  title: string;
  rule: string;
  cautions: string[];
  contraindicatedDrugs?: string[];
}
