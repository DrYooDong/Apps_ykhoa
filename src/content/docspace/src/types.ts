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
  map: ThresholdMap | null;
}

export interface DanSo {
  gioiTinh: 'any' | 'nam' | 'nu';
  tuoiMin?: number | null;
  tuoiMax?: number | null;
}

export interface PhacDo {
  tuyen: string[];
  thuoc: [string, string, string][]; // [Tên thuốc, Liều / đường dùng, Ghi chú]
  theoDoi: string[];
  luuY: string[];
  nguon: string[];
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

export interface AnalysisResult {
  b: Benh;
  pct: number;
  score: number;
  max: number;
  matched: MatchedEvidence[];
  missing: MissingEvidence[];
  notes: string[];
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

// Mục Đặt vấn đề (Problem List) theo chuẩn PGS.TS Hoàng Văn Sĩ & BSCKI Trần Thanh Tuấn
export interface ProblemStatementEntry {
  id: string;
  label: string;             // Tên vấn đề (VD: Hội chứng nhiễm trùng, Cơn đau ngực cấp, v.v.)
  type: 'trieu-chung' | 'hoi-chung' | 'dich-te' | 'bat-thuong-cls';
  isPrimary: boolean;        // Vấn đề CHÍNH được chọn để biện luận chẩn đoán
  evidence: string[];        // Dữ kiện chứng minh (cơ năng, thực thể, CLS)
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

