/**
 * Arrhythmia Pro Studio - Virtual Patient Scenarios & Quiz Bank (TypeScript Module)
 * CliniPortal Cardiology Module
 * Chứa 6 Ca bệnh Bệnh nhân ảo cấp cứu & Ngân hàng 10+ câu hỏi Quiz Arena.
 */

export interface ECGParams {
  hr: number;
  qrsWidth: number;
  pWave: string;
  prInterval: number;
  regularity: string;
  qtInterval: number;
  stSegment: string;
  deltaWave: boolean;
  epsilonWave: boolean;
}

export interface BrugadaCriteriaSteps {
  step1: boolean;
  step2: boolean;
  step3: boolean;
}

export interface ArrhythmiaScenario {
  id: string;
  title: string;
  patientInfo: string;
  vitals: string;
  ecgParams: ECGParams;
  correctDiagnosisId: string;
  brugadaCriteria: BrugadaCriteriaSteps;
  clinicalPearls: string;
  emergencyAction: string;
}

export interface ArrhythmiaQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const SCENARIOS: ArrhythmiaScenario[] = [
  {
    id: 'scen-vt-scar',
    title: 'Ca 1: Cơn nhịp nhanh QRS rộng sau Nhồi máu cơ tim cũ',
    patientInfo:
      'Bệnh nhân nam, 62 tuổi. Tiền sử NMCT thành trước 3 năm. Vào viện vì hồi hộp dồn dập, khó thở nhẹ và vã mồ hôi.',
    vitals: 'BP: 105/65 mmHg | SpO2: 96% | HR: 160 l/p',
    ecgParams: {
      hr: 160,
      qrsWidth: 160,
      pWave: 'absent',
      prInterval: 0,
      regularity: 'regular',
      qtInterval: 420,
      stSegment: 'normal',
      deltaWave: false,
      epsilonWave: false
    },
    correctDiagnosisId: 'vt-scar-related',
    brugadaCriteria: {
      step1: true, // Vắng mặt RS ở V1-V6
      step2: true, // R-S > 100ms
      step3: true // Phân ly nhĩ thất
    },
    clinicalPearls:
      'Bệnh nhân có tiền sử bệnh tim cấu trúc (NMCT cũ) xuất hiện cơn nhịp nhanh QRS rộng đều > 80% là Nhịp nhanh thất (VT). Xử trí cấp cứu: Chuẩn bị sốc điện chuyển nhịp đồng bộ nếu có rối loạn huyết động, hoặc tiêm tĩnh mạch Amiodarone 150mg.',
    emergencyAction:
      'Xử trí: Đánh giá huyết động khẩn cấp. Nếu tụt áp / lơ mơ &rarr; Sốc điện đồng bộ DC 100-200J. Nếu huyết động ổn định &rarr; Truyền tĩnh mạch Amiodarone 150mg trong 10 phút.'
  },
  {
    id: 'scen-avnrt',
    title: 'Ca 2: Cơn hồi hộp trống ngực đột ngột ở người trẻ',
    patientInfo:
      'Bệnh nhân nữ, 28 tuổi, không tiền sử bệnh tim. Đột ngột xuất hiện cơn hồi hộp đánh ngực dồn dập khi vừa vươn người cúi xuống.',
    vitals: 'BP: 115/75 mmHg | SpO2: 99% | HR: 185 l/p',
    ecgParams: {
      hr: 185,
      qrsWidth: 85,
      pWave: 'retrograde',
      prInterval: 90,
      regularity: 'regular',
      qtInterval: 320,
      stSegment: 'normal',
      deltaWave: false,
      epsilonWave: false
    },
    correctDiagnosisId: 'avnrt',
    brugadaCriteria: {
      step1: false,
      step2: false,
      step3: false
    },
    clinicalPearls:
      "Nhịp nhanh QRS hẹp đều tần số 180-200 l/p, bắt đầu và kết thúc đột ngột ở người trẻ tim cấu trúc bình thường gợi ý AVNRT. Hình ảnh Pseudo R' ở V1 hoặc Pseudo S ở DII, DIII, aVF.",
    emergencyAction:
      'Xử trí: 1. Nghiệm pháp cường phế vị (xoa xoang động mạch cảnh / nghiệm pháp Valsalva). 2. Nếu thất bại &rarr; Tiêm tĩnh mạch nhanh Adenosine 6mg IV push (bơm nhanh + xả 20ml NaCl 0.9%).'
  },
  {
    id: 'scen-brugada',
    title: 'Ca 3: Cơn ngất ở nam giới trẻ tuổi có tiền sử gia đình đột tử',
    patientInfo:
      'Bệnh nhân nam, 34 tuổi. Vừa ngất ngắn khi đang chạy bộ. Tiền sử gia đình có anh trai ruột đột tử không rõ nguyên nhân ở tuổi 30.',
    vitals: 'BP: 120/80 mmHg | SpO2: 98% | HR: 68 l/p',
    ecgParams: {
      hr: 68,
      qrsWidth: 105,
      pWave: 'normal',
      prInterval: 170,
      regularity: 'regular',
      qtInterval: 410,
      stSegment: 'brugada-coved',
      deltaWave: false,
      epsilonWave: false
    },
    correctDiagnosisId: 'brugada-syndrome',
    brugadaCriteria: {
      step1: false,
      step2: false,
      step3: false
    },
    clinicalPearls:
      'Hình ảnh ST chênh vòm (Type 1 Brugada) &ge; 2mm ở V1-V2 tiếp nối với sóng T âm. Đây là bệnh lý kênh Natri nguy cơ cao gây Rung thất (VF) đột tử.',
    emergencyAction:
      'Xử trí: Nhập viện theo dõi Holter ECG 24h, hội chẩn chuyên khoa Nhịp tim học xét chỉ định cấy máy phá rung tự động (ICD). Tránh tuyệt đối các thuốc chẹn kênh Natri (Flecainide, Propafenone).'
  },
  {
    id: 'scen-af-wpw',
    title: 'Ca 4: Cấp cứu Cơn nhịp nhanh không đều QRS biến đổi ở WPW',
    patientInfo:
      'Bệnh nhân nam, 22 tuổi. Được chẩn đoán WPW từ nhỏ. Đột ngột lên cơn chóng mặt, khó thở dữ dội.',
    vitals: 'BP: 90/55 mmHg | SpO2: 94% | HR: 195 l/p',
    ecgParams: {
      hr: 195,
      qrsWidth: 150,
      pWave: 'chaotic',
      prInterval: 0,
      regularity: 'irregular',
      qtInterval: 380,
      stSegment: 'normal',
      deltaWave: true,
      epsilonWave: false
    },
    correctDiagnosisId: 'af-wpw',
    brugadaCriteria: {
      step1: false,
      step2: false,
      step3: false
    },
    clinicalPearls:
      'Rung nhĩ trên bệnh nhân WPW (AF in WPW): Nhịp thất cực nhanh, khoảng RR không đều hỗn loạn, hình thái QRS biến đổi rộng hẹp liên tục do dẫn truyền qua đường phụ Kent. CHỐNG CHỈ ĐỊNH Digoxin, Verapamil, Beta-blockers!',
    emergencyAction:
      'XỬ TRÍ CẤP CỨU KHẨN: Sốc điện chuyển nhịp đồng bộ DC (nếu có rối loạn huyết động) hoặc truyền Procainamide / Ibutilide tĩnh mạch. CẤM dùng Digoxin / Verapamil vì làm tăng dẫn truyền qua đường phụ gây Rung thất!'
  },
  {
    id: 'scen-avb3',
    title: 'Ca 5: Nhịp chậm gây mệt mỏi & choáng váng ở người cao tuổi',
    patientInfo:
      'Bệnh nhân nữ, 78 tuổi. Mệt mỏi kéo dài 2 tuần, vã mồ hôi lạnh, từng có 2 lần choáng váng muốn xỉu.',
    vitals: 'BP: 155/60 mmHg | SpO2: 95% | HR: 36 l/p',
    ecgParams: {
      hr: 36,
      qrsWidth: 140,
      pWave: 'normal',
      prInterval: 260,
      regularity: 'regular',
      qtInterval: 480,
      stSegment: 'normal',
      deltaWave: false,
      epsilonWave: false
    },
    correctDiagnosisId: 'avb3-complete',
    brugadaCriteria: {
      step1: false,
      step2: false,
      step3: true
    },
    clinicalPearls:
      'Block nhĩ thất độ 3 (Hoàn toàn): Phân ly nhĩ thất hoàn toàn, sóng P phát độc lập với tần số nhĩ ~80 l/p, tần số nhịp thoát thất chậm 36 l/p.',
    emergencyAction:
      'Xử trí: Đặt máy tạo nhịp tạm thời (Transcutaneous / Transvenous Pacing) cấp cứu. Tiêm tĩnh mạch Atropine 0.5-1mg hoặc truyền Adrenaline / Isoproterenol trong khi chờ tạo nhịp. Chỉ định đặt Máy tạo nhịp vĩnh viễn (PPM).'
  },
  {
    id: 'scen-torsades',
    title: 'Ca 6: Xoắn đỉnh (Torsades de Pointes) do phối hợp thuốc kéo dài QTc',
    patientInfo:
      'Bệnh nhân nữ, 55 tuổi. Đang điều trị viêm phổi bằng Erythromycin và dùng Haloperidol. Hạ K+ máu (3.1 mmol/L). Xuất hiện các cơn ngất ngắn ngắt quãng.',
    vitals: 'BP: 100/60 mmHg | SpO2: 97% | HR: 170 l/p',
    ecgParams: {
      hr: 170,
      qrsWidth: 180,
      pWave: 'absent',
      prInterval: 0,
      regularity: 'irregular',
      qtInterval: 540,
      stSegment: 'normal',
      deltaWave: false,
      epsilonWave: false
    },
    correctDiagnosisId: 'torsades',
    brugadaCriteria: {
      step1: false,
      step2: false,
      step3: false
    },
    clinicalPearls:
      'Nhịp nhanh thất đa hình Xoắn đỉnh (Torsades de Pointes) xuất hiện trên nền QTc kéo dài (QTc > 500ms). QRS xoay quanh đường đẳng điện.',
    emergencyAction:
      'Xử trí: 1. Tiêm tĩnh mạch chậm Magie Sulfat 2g IV trong 1-2 phút (cho dù Mg2+ máu bình thường). 2. Bù K+ tĩnh mạch nâng K+ >= 4.0 mmol/L. 3. Ngưng ngay tất cả các thuốc gây kéo dài QT. 4. Tăng tần số tim bằng Isoproterenol hoặc tạo nhịp tạm thời nếu nhịp chậm nền.'
  }
];

export const QUIZ_BANK: ArrhythmiaQuizQuestion[] = [
  {
    id: 'q1',
    question:
      'Tiêu chuẩn quan trọng nhất trên ECG để phân biệt Nhịp nhanh thất (VT) với SVT dẫn truyền lệch hướng theo Brugada Step 1 là gì?',
    options: [
      'A. Tần số tim > 200 l/p',
      'B. Vắng mặt hoàn toàn phức bộ RS ở tất cả đạo trình trước tim (V1 đến V6)',
      'C. Sóng T đảo ngược ở DII',
      'D. Khoảng PR kéo dài > 200ms'
    ],
    correctIndex: 1,
    explanation:
      'Bước 1 trong Thuật toán Brugada: Kiểm tra sự có mặt của phức bộ RS ở V1-V6. Nếu vắng mặt hoàn toàn RS (chỉ có dạng R đơn độc hoặc QS ở tất cả V1-V6) &rarr; Chẩn đoán khẳng định VT với độ đặc hiệu 100%.'
  },
  {
    id: 'q2',
    question:
      'Bệnh nhân Rung nhĩ kèm hội chứng WPW (AF in WPW) có chống chỉ định tuyệt đối với nhóm thuốc nào sau đây?',
    options: [
      'A. Procainamide tĩnh mạch',
      'B. Sốc điện chuyển nhịp DC',
      'C. Digoxin, Verapamil, Diltiazem và các thuốc chẹn Beta',
      'D. Ibutilide tĩnh mạch'
    ],
    correctIndex: 2,
    explanation:
      'Các thuốc chẹn nút nhĩ thất (Digoxin, Verapamil, Diltiazem, Beta-blockers) làm ức chế nút AV, dẫn đến xung động Rung nhĩ hỗn loạn 300-500 l/p ồ ạt đi qua đường phụ Kent trực tiếp xuống thất, gây Rung thất (VF) đột tử!'
  },
  {
    id: 'q3',
    question:
      'Khi tính QTc theo công thức Bazett ở bệnh nhân có tần số tim nhanh (> 100 l/p), hiện tượng nào sau đây thường xảy ra?',
    options: [
      'A. Tính toán quá mức khoảng QTc (Overestimation)',
      'B. Tính toán thấp hơn khoảng QTc thực tế (Underestimation)',
      'C. Không thay đổi kết quả',
      'D. Bị triệt tiêu hoàn toàn'
    ],
    correctIndex: 0,
    explanation:
      'Công thức Bazett (QT / √RR) có nhược điểm hiệu chỉnh quá mức (overestimate) QTc khi tần số tim nhanh > 100 l/p và hiệu chỉnh thiếu khi nhịp chậm < 60 l/p. Do đó Fridericia hoặc Framingham được khuyến cáo hơn khi nhịp tim quá nhanh/chậm.'
  },
  {
    id: 'q4',
    question: 'Thuốc ưu tiên hàng đầu để xử trí cấp cứu cơn Xoắn đỉnh (Torsades de Pointes) là gì?',
    options: [
      'A. Adenosine 6mg tiêm nhanh',
      'B. Magie Sulfat (MgSO4) 2g tiêm tĩnh mạch',
      'C. Digoxin 0.5mg tiêm tĩnh mạch',
      'D. Verapamil 5mg tiêm tĩnh mạch'
    ],
    correctIndex: 1,
    explanation:
      'Magie Sulfat (MgSO4) 2g IV là y lệnh hàng đầu điều trị xoắn đỉnh (kể cả khi nồng độ Mg2+ máu bình thường) vì nó ức chế dòng Canxi đi vào tế bào, làm dập tắt các khử cực muộn (DAD/EAD).'
  },
  {
    id: 'q5',
    question: 'Đặc điểm ECG nào sau đây gợi ý Bệnh cơ tim thất phải gây loạn nhịp (ARVC)?',
    options: [
      'A. Sóng Delta ở DII',
      'B. Sóng Epsilon ở cuối phức bộ QRS tại đạo trình V1 - V3',
      'C. Phức bộ QRS hẹp < 80ms',
      'D. ST chênh xuống dạng hình dốc'
    ],
    correctIndex: 1,
    explanation:
      'Sóng Epsilon là một nấc nhỏ mọc ở cuối QRS (đầu đoạn ST) ở đạo trình V1-V3, thể hiện sự dẫn truyền chậm trễ ở vùng thất phải bị xơ hóa mỡ trong bệnh lý ARVC.'
  }
];

export function getScenarios(): ArrhythmiaScenario[] {
  return SCENARIOS;
}

export function getScenarioById(id: string): ArrhythmiaScenario | null {
  return SCENARIOS.find(s => s.id === id) || null;
}

export function getQuizBank(): ArrhythmiaQuizQuestion[] {
  return QUIZ_BANK;
}

export const ArrhythmiaScenarios = {
  getScenarios,
  getScenarioById,
  getQuizBank
};

// Global binding
if (typeof window !== 'undefined') {
  (window as any).ArrhythmiaScenarios = ArrhythmiaScenarios;
}
