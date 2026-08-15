/**
 * CliniPortal — Paraclinical Clinical Decision Support Engine (TypeScript)
 * Path: src/content/approaches/paraclinical/tc-paraclinical-engine.ts
 */

export interface ParaclinicalApproachItem {
  id: string;
  name: string;
  category: 'cbc' | 'liver' | 'renal' | 'coagulation';
  icon: string;
  summary: string;
  steps: {
    title: string;
    description: string;
    criticalAlerts?: string[];
  }[];
  differentialDiagnoses: {
    pattern: string;
    likelyCauses: string[];
    nextTests: string[];
  }[];
}

export const PARACLINICAL_APPROACH_DATA: Record<string, ParaclinicalApproachItem> = {
  'tc-thieumau': {
    id: 'tc-thieumau',
    name: 'Tiếp cận Thiếu máu theo MCV và Hồng cầu lưới',
    category: 'cbc',
    icon: '🩸',
    summary: 'Thuật toán chẩn đoán phân biệt thiếu máu dựa trên thể tích trung bình hồng cầu (MCV) và chỉ số hồng cầu lưới hiệu chỉnh (Reticulocyte Index).',
    steps: [
      {
        title: 'Bước 1: Xác định mức độ thiếu máu & tình trạng huyết động',
        description: 'Đánh giá Hb, Hct, sinh hiệu (mạch, HA thế đứng), phát hiện dấu hiệu thiếu oxy não (chóng mặt, lú lẫn) hoặc suy tim cấp.',
        criticalAlerts: ['Hb < 7 g/dL hoặc có huyết động không ổn định cần xem xét truyền máu cấp cứu.']
      },
      {
        title: 'Bước 2: Phân loại theo Thể tích trung bình hồng cầu (MCV)',
        description: 'Phân thành 3 nhóm lớn: MCV < 80 fL (Hồng cầu nhỏ), MCV 80-100 fL (Hồng cầu bình thường), MCV > 100 fL (Hồng cầu to).'
      },
      {
        title: 'Bước 3: Đánh giá đáp ứng tủy xương (Hồng cầu lưới Reticulocyte)',
        description: 'Chỉ số sản xuất hồng cầu lưới (RPI) = Retic% × (Hct BN / 45) × (1 / Hệ số trưởng thành). RPI > 2: Tăng sinh tủy (tán huyết hoặc mất máu cấp); RPI < 2: Giảm sản xuất tủy xương.'
      }
    ],
    differentialDiagnoses: [
      {
        pattern: 'MCV < 80 fL (Hồng cầu nhỏ, nhược sắc)',
        likelyCauses: ['Thiếu máu thiếu sắt (Ferritin giảm)', 'Thalassemia (Ferritin bình thường/tăng, Mentzer index < 13)', 'Thiếu máu bệnh mạn tính (ACD)', 'Ngộ độc chì / Thiếu máu nguyên bào sắt'],
        nextTests: ['Ferritin, Sắt huyết thanh, TIBC, Điện di Hemoglobin']
      },
      {
        pattern: 'MCV 80-100 fL (Hồng cầu đẳng bào)',
        likelyCauses: ['Mất máu cấp tính', 'Tán huyết (Miễn dịch, G6PD, PNH)', 'Suy thận mạn tính (giảm Erythropoietin)', 'Bệnh lý tủy xương (Suy tủy, MDS)'],
        nextTests: ['Bilirubin gián tiếp, LDH, Haptoglobin, Test Coombs trực tiếp, Creatinine']
      },
      {
        pattern: 'MCV > 100 fL (Hồng cầu to)',
        likelyCauses: ['Thiếu Vitamin B12 / Acid Folic (Megaloblastic anemia)', 'Nghiện rượu mạn tính / Bệnh gan', 'Tăng hồng cầu lưới quá mức', 'Hội chứng loạn sinh tủy (MDS)', 'Suy giáp'],
        nextTests: ['Định lượng Vitamin B12, Acid Folic, TSH, FT4, Tủy đồ nếu nghi ngờ MDS']
      }
    ]
  },
  'tc-bachcau': {
    id: 'tc-bachcau',
    name: 'Tiếp cận Rối loạn Bạch cầu (Leukocytosis & Leukopenia)',
    category: 'cbc',
    icon: '🔬',
    summary: 'Phân tích dòng bạch cầu hạt trung tính (Neutrophil), lympho bào, ái toan (Eosinophil) và phát hiện phản ứng giả bạch cầu (Leukemoid) vs Bạch cầu cấp.',
    steps: [
      {
        title: 'Bước 1: Đánh giá số lượng tuyệt đối từng dòng',
        description: 'Không chỉ dựa vào tỷ lệ %, luôn tính số lượng tuyệt đối (Absolute count = Tổng WBC × % dòng).'
      },
      {
        title: 'Bước 2: Phát hiện Tế bào non ác tính (Blasts) hoặc Cờ đỏ huyết học',
        description: 'Kéo lam máu ngoại vi tìm Blasts, thể Auer, khoảng trống bạch huyết hoặc giảm 2-3 dòng tế bào máu.',
        criticalAlerts: ['Bạch cầu > 100.000 /µL có nguy cơ tắc mạch do tăng bạch cầu (Leukostasis) — Cần hồi sức và gạn bạch cầu khẩn cấp!']
      }
    ],
    differentialDiagnoses: [
      {
        pattern: 'Tăng Neutrophil tuyệt đối (> 7.500 /µL)',
        likelyCauses: ['Nhiễm trùng vi khuẩn cấp tính', 'Hoại tử mô (Nhồi máu cơ tim, Bỏng)', 'Stress cơ học/sinh lý, dùng Corticoid', 'Bệnh tăng sinh tủy (CML, Đa hồng cầu)'],
        nextTests: ['CRP, Procalcitonin, Cấy máu, Kéo lam máu ngoại vi tìm NST Philadelphia (BCR-ABL)']
      },
      {
        pattern: 'Tăng Eosinophil tuyệt đối (> 500 /µL)',
        likelyCauses: ['Nhiễm ký sinh trùng (Giun lươn, Sán lá gan, Toxocara)', 'Dị ứng thuốc / Hen phế quản / Chàm', 'Hội chứng tăng Eosinophil (HES)', 'Viêm mạch u hạt Churg-Strauss'],
        nextTests: ['Huyết thanh chẩn đoán ký sinh trùng, Tổng phân tích phân, IgE, Siêu âm tim']
      },
      {
        pattern: 'Giảm Neutrophil nặng (< 500 /µL - Sốt giảm bạch cầu)',
        likelyCauses: ['Hóa trị ung thư', 'Suy tủy xương / Thâm nhiễm tủy', 'Tác dụng phụ của thuốc (Methimazole, Clozapine, Cotrimoxazole)', 'Nhiễm virus nặng (HIV, HBV, HCV, Parvovirus B19)'],
        nextTests: ['Cấy máu lập tức, Kháng sinh phổ rộng chống Pseudomonas trong 1 giờ đầu (Cefepime/Meropenem)']
      }
    ]
  },
  'tc-tieu-cau': {
    id: 'tc-tieu-cau',
    name: 'Tiếp cận Rối loạn Tiểu cầu (Thrombocytopenia & Thrombocytosis)',
    category: 'cbc',
    icon: '🩸',
    summary: 'Lưu đồ xử trí giảm tiểu cầu cấp tính, chẩn đoán phân biệt ITP, TTP, DIC, HIT do Heparin và Sốt xuất huyết Dengue.',
    steps: [
      {
        title: 'Bước 1: Loại trừ Giả giảm tiểu cầu do EDTA (Pseudothrombocytopenia)',
        description: 'Lấy lại mẫu máu vào ống Heparin hoặc Citrate, quan sát lam máu ngoại biên tìm hiện tượng kết cụm tiểu cầu.'
      },
      {
        title: 'Bước 2: Phân tầng nguy cơ xuất huyết đe dọa tính mạng',
        description: 'Đánh giá xuất huyết niêm mạc, đáy mắt, nội sọ hoặc tiểu máu đại thể. Tiểu cầu < 10.000-20.000/µL có nguy cơ xuất huyết tự nhiên.',
        criticalAlerts: ['Nghi ngờ Ban xuất huyết giảm tiểu cầu huyết khối (TTP) là cấp cứu y khoa! KHÔNG truyền tiểu cầu (chống chỉ định tương đối), cần Thay huyết tương (Plasma Exchange - PLEX) khẩn cấp!']
      }
    ],
    differentialDiagnoses: [
      {
        pattern: 'Giảm tiểu cầu kèm Tán huyết vi mạch (MAHA) & Thiếu máu (Mảnh vỡ HC Schistocytes)',
        likelyCauses: ['TTP (Thiếu hụt enzyme ADAMTS13)', 'HUS (Hội chứng tan máu urê huyết cao)', 'DIC (Đông máu nội mạch rải rác - Fibrinogen giảm, D-Dimer tăng vọt)'],
        nextTests: ['Lam máu tìm Schistocytes, ADAMTS13 activity, Nhóm đông máu toàn bộ, D-Dimer, Fibrinogen']
      },
      {
        pattern: 'Giảm tiểu cầu đơn độc ở người bệnh đang dùng Heparin (Ngày 4-10)',
        likelyCauses: ['Giảm tiểu cầu do Heparin (HIT - Heparin Induced Thrombocytopenia Type 2)'],
        nextTests: ['Tính thang điểm 4Ts, Kháng thể kháng phức hợp Heparin-PF4, Chuyển ngay sang thuốc ức chế trực tiếp Thrombin (Argatroban/Fondaparinux)']
      },
      {
        pattern: 'Giảm tiểu cầu đơn độc không kèm bệnh lý hệ thống',
        likelyCauses: ['Xuất huyết giảm tiểu cầu miễn dịch (ITP)', 'Nhiễm virus (Dengue, HCV, HIV, H. pylori)', 'Do thuốc'],
        nextTests: ['Huyết thanh chẩn đoán sốt xuất huyết NS1/IgM, Test HP, Kháng thể kháng nhân ANA']
      }
    ]
  },
  'tc-sinhhoagan': {
    id: 'tc-sinhhoagan',
    name: 'Tiếp cận Bất thường Men gan & Bilirubin',
    category: 'liver',
    icon: '🫗',
    summary: 'Thuật toán phân tích tổn thương tế bào gan (Hepatocellular - AST/ALT) vs Ứ mật (Cholestatic - ALP/GGT) vs Tăng Bilirubin hỗn hợp.',
    steps: [
      {
        title: 'Bước 1: Tính toán Tỷ số R-value để định hình kiểu tổn thương',
        description: 'R = (ALT / Giới hạn trên ALT) ÷ (ALP / Giới hạn trên ALP). R ≥ 5: Kiểu tổn thương tế bào gan; R ≤ 2: Kiểu ứ mật; 2 < R < 5: Kiểu hỗn hợp.'
      },
      {
        title: 'Bước 2: Đánh giá chức năng tổng hợp của Gan',
        description: 'Kiểm tra ngay INR/PT (thời gian Prothrombin), Albumin huyết thanh và phát hiện dấu hiệu Bệnh não gan (Hepatic Encephalopathy).',
        criticalAlerts: ['Tăng men gan cấp tính > 1.000 U/L kèm INR > 1.5 và rối loạn tri giác là dấu hiệu của Suy gan cấp (Acute Liver Failure) — Cần chuyển ICU và hội chẩn ghép gan!']
      }
    ],
    differentialDiagnoses: [
      {
        pattern: 'ALT, AST tăng rất cao (> 1.000 U/L)',
        likelyCauses: ['Viêm gan thiếu máu cục bộ / Thiếu oxy (Ischemic hepatitis / Shock liver)', 'Ngộ độc Paracetamol / Nấm độc Amanita', 'Viêm gan virus cấp (A, B, E)', 'Viêm gan tự miễn cấp bùng phát'],
        nextTests: ['Định lượng Paracetamol máu, HBsAg, Anti-HBc IgM, Anti-HAV IgM, Siêu âm Doppler mạch gan']
      },
      {
        pattern: 'Tỷ số AST/ALT > 2 kèm AST < 300 U/L',
        likelyCauses: ['Bệnh gan do rượu (Alcoholic liver disease)', 'Xơ gan tiến triển (chỉ số APRI / FIB-4 cao)'],
        nextTests: ['GGT, MCV, Siêu âm đàn hồi mô gan (FibroScan)']
      },
      {
        pattern: 'Kiểu tổn thương ứ mật (ALP và GGT tăng ưu thế, R ≤ 2)',
        likelyCauses: ['Tắc mật ngoài gan (Sỏi ống mật chủ, U đầu tụy, U đường mật)', 'Tắc mật trong gan (Viêm đường mật tiên phát PBC, Viêm xơ đường mật PSC, Thuốc)'],
        nextTests: ['Siêu âm bụng / MRCP (Chụp cộng hưởng từ đường mật), Kháng thể kháng ty thể AMA']
      }
    ]
  }
};
