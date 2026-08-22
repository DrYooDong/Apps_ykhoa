/**
 * CliniPortal 2.0 — Master Clinical Protocols Type Definitions
 * Path: src/content/protocols/protocol-types.ts
 *
 * Định nghĩa chuẩn Schema TypeScript cho Phác đồ điều trị, Bước xử trí thuật toán,
 * Bảng liều thuốc (chỉnh liều eGFR), Cảnh báo chống chỉ định chéo & Ra quyết định cùng BN.
 */

export type TriageLevel = 'emergency' | 'inpatient' | 'outpatient';
export type ProtocolPhase = 'triage' | 'first-line' | 'second-line' | 'refractory' | 'recovery';
export type DrugRoute = 'PO' | 'IV' | 'SC' | 'IM' | 'Inhaled' | 'Topical' | 'PR' | 'Nebulized';
export type ConflictDangerLevel = 'absolute' | 'relative' | 'caution';
export type SharedDecisionApproach = 'standard-invasive' | 'conservative' | 'alternative';
export type CostLevel = 'low' | 'medium' | 'high';

export interface DrugDosage {
  genericName: string;           // Tên hoạt chất quốc tế (VD: Paracetamol, Noradrenaline)
  tradeNames?: string[];         // Biệt dược thông dụng (VD: Efferalgan, Hancor)
  route: DrugRoute;              // Đường dùng thuốc
  loadingDose?: string;          // Liều nạp / Liều tấn công
  maintenanceDose: string;       // Liều duy trì / Tốc độ truyền
  maxDose24h?: string;           // Liều tối đa trong 24 giờ
  renalAdjustment?: string;      // Cách chỉnh liều theo chức năng thận (eGFR / CrCl)
  hepaticAdjustment?: string;    // Cách chỉnh liều khi có suy giảm chức năng gan
  isHighAlert?: boolean;         // Thuốc cảnh báo cao (Vận mạch, Kháng đông, Thuốc hẹp liều)
  clinicalNotes?: string;        // Lưu ý lâm sàng đặc biệt & tác dụng phụ cần theo dõi
}

export interface ProtocolStep {
  stepId: string;                // Định danh bước (VD: "step_triage", "step_fluid_bolus")
  order: number;                 // Thứ tự thực hiện (1, 2, 3...)
  phase: ProtocolPhase;          // Giai đoạn phác đồ
  title: string;                 // Tiêu đề bước
  timeframe?: string;            // Cột mốc thời gian (VD: "0 - 15 phút", "Giờ thứ 1")
  description: string;           // Diễn giải chi tiết hành động
  conditionIf?: string;          // Điều kiện rẽ nhánh (NẾU...)
  conditionThen?: string;        // Kết quả / Hành động rẽ nhánh (THÌ...)
  drugs?: DrugDosage[];          // Danh sách thuốc được sử dụng trong bước này
  isAlert?: boolean;             // Cảnh báo bước can thiệp tối khẩn / báo động đỏ
  flowchartNodeType?: 'start' | 'decision' | 'action' | 'alert' | 'stable';
}

export interface CrossContraindication {
  conflictWithCondition: string; // Tên bệnh kèm hoặc mã ICD (VD: "Hen phế quản (J45)")
  forbiddenDrugOrAction: string; // Thuốc hoặc hành động bị cấm / hạn chế (VD: "Aspirin & NSAIDs")
  dangerLevel: ConflictDangerLevel; // Mức độ nguy hiểm: Tuyệt đối, Tương đối, Cảnh giác
  explanation: string;          // Cơ chế gây hại và rủi ro lâm sàng
  recommendation: string;        // Đề xuất thuốc / giải pháp thay thế an toàn
}

export interface SharedDecisionOption {
  optionName: string;            // Tên phương án (VD: "Nhập viện Hồi sức Tích cực & Bù dịch TM")
  approachType: SharedDecisionApproach;
  pros: string[];                // Danh sách ưu điểm / Lợi ích
  cons: string[];                // Nhược điểm / Nguy cơ & Tác dụng phụ
  estimatedCost: CostLevel;      // Ước tính chi phí tương đối
  suitableFor: string;           // Đối tượng bệnh nhân phù hợp nhất
}

export interface ClinicalProtocol {
  id: string;                    // ID định danh duy nhất (VD: "pddt-dengue-byt-2023")
  title: string;                 // Tên phác đồ tiếng Việt
  titleEn?: string;              // Tên phác đồ tiếng Anh
  aliases?: string[];            // Tên gọi khác / Từ đồng nghĩa
  icd10: string[];               // Danh sách mã ICD-10 tương ứng
  specialty: string;             // Key chuyên khoa (infectious, cardio, emergency...)
  triageLevel: TriageLevel;      // Mức độ ưu tiên xử trí
  guidelineSource: string;       // Hướng dẫn nguồn (VD: "QĐ 2760/QĐ-BYT Bộ Y Tế 2023")
  evidenceLevel: string;         // Mức độ chứng cứ (VD: "Class I, Level A")
  year: number;                  // Năm ban hành / cập nhật
  summary: string;               // Tóm tắt cô đọng nguyên tắc điều trị
  redFlags: string[];            // Dấu hiệu cờ đỏ / Báo động đỏ cần can thiệp khẩn
  steps: ProtocolStep[];         // Chuỗi các bước xử trí thuật toán
  contraindications: CrossContraindication[]; // Danh sách chống chỉ định chéo
  sharedDecisionOptions: SharedDecisionOption[]; // Ma trận ra quyết định cùng bệnh nhân
  dischargeCriteria?: string[];  // Tiêu chuẩn xuất viện / theo dõi an toàn
  updatedAt?: string;            // Ngày cập nhật dữ liệu
  
  // ═══ CÁC TRƯỜNG ĐẶC THÙ CHUYÊN BIỆT THEO TỪNG NGĂN TỦ ═══
  emergencyDetails?: {
    hemodynamicTargets?: string[]; // Đích huyết động (MAP >= 65, Lactate < 2, ScvO2 >= 70%)
    inotropesVasopressors?: string[]; // Phác đồ vận mạch & tăng co bóp
    resuscitationFluid?: string; // Loại dịch truyền hồi sức ưu tiên
    emergencyScores?: string[]; // Thang điểm qSOFA, SOFA, APACHE, GCS
  };
  cardioDetails?: {
    ecgBiomarkers?: string; // Tiêu chuẩn ECG & Men tim (hs-cTn 0h/1h, NT-proBNP)
    antiplateletAnticoagulation?: string; // Phác đồ DAPT & Kháng đông
    gdmtPillars?: string; // 4 Trụ cột suy tim GDMT (ARNI/ACEi + BB + MRA + SGLT2i)
    cardiacScores?: string[]; // Thang điểm GRACE, TIMI, CHA2DS2-VASc, HAS-BLED, Killip
  };
  giDetails?: {
    endoscopyProtocol?: string; // Phác đồ nội soi can thiệp & thuốc co mạch tạng
    liverFunctionStaging?: string; // Phân độ Child-Pugh, MELD, Bệnh não gan
    ascitesSbpManagement?: string; // Quản lý Cổ trướng & SBP
    pancreatitisFluid?: string; // Bù dịch trong Viêm tụy cấp
  };
  infectiousDetails?: {
    diseaseDayPhase?: string; // Phân chia giai đoạn theo ngày bệnh
    hctPlateletKinetic?: string; // Động học Hct và Tiểu cầu tại giường
    antimicrobialStewardship?: string; // Kháng sinh kinh nghiệm -> Xuống thang
    isolationPrecautions?: string; // Cấp độ phòng hộ & cách ly
  };
}

export interface ProtocolFilterState {
  searchQuery: string;
  specialty: string;
  triageLevel: string;
  sortBy: 'title' | 'year' | 'triage';
}
