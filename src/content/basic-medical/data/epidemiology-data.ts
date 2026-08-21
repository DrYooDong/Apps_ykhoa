/**
 * CliniPortal — Epidemiology & Biostatistics Dataset (Dịch Tễ Học Y Khoa & Thống Kê Sinh Học)
 * Path: src/content/pathophysiology/data/epidemiology-data.ts
 * Tiêu chuẩn: CDC Field Epidemiology Manual, Gordis Epidemiology (6th Ed), WHO Guidelines & EBM Standards
 */

import { 
  EpidemiologyBlock, 
  EpidemiologyTopic, 
  EpidemiologyFormula, 
  StudyDesignInfo, 
  OutbreakPattern, 
  CausalityCriterion 
} from '../types/epidemiology.types';

export const EPIDEMIOLOGY_BLOCKS: EpidemiologyBlock[] = [
  {
    id: 'block-1',
    code: 'Khối 1',
    name: 'Đo Lường Sức Khỏe Quần Thể & Tần Suất Bệnh',
    description: 'Tỷ số, tỷ lệ, tỷ suất, phân biệt Hiện mắc (Prevalence) vs Mới mắc (Incidence), gánh nặng bệnh tật DALYs & QALYs.',
    icon: 'fa-chart-pie',
    color: '#0d9488',
    bgColor: 'rgba(13, 148, 136, 0.12)'
  },
  {
    id: 'block-2',
    code: 'Khối 2',
    name: 'Thiết Kế Nghiên Cứu Dịch Tễ Học',
    description: 'Nghiên cứu Cắt ngang (Cross-Sectional), Bệnh-Chứng (Case-Control), Đoàn hệ (Cohort: Tiến cứu & Hồi cứu), Thử nghiệm RCT.',
    icon: 'fa-sitemap',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.12)'
  },
  {
    id: 'block-3',
    code: 'Khối 3',
    name: 'Đánh Giá Test Chẩn Đoán & Sàng Lọc',
    description: 'Độ nhạy (Sensitivity), Độ đặc hiệu (Specificity), Giá trị tiên đoán (PPV/NPV), Tỷ số khả dĩ (LR+/LR-), Định lý Bayes & ROC/AUC.',
    icon: 'fa-microscope',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.12)'
  },
  {
    id: 'block-4',
    code: 'Khối 4',
    name: 'Dịch Tễ Bệnh Truyền Nhiễm & Dập Dịch',
    description: 'Hệ số lây nhiễm cơ bản (R0, Rt), Miễn dịch cộng đồng (Herd Immunity), Tỷ lệ tấn công (Attack Rate), 10 bước điều tra ổ dịch CDC.',
    icon: 'fa-virus-covid',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.12)'
  },
  {
    id: 'block-5',
    code: 'Khối 5',
    name: 'Sai Số (Bias), Nhiễu (Confounding) & Tương Tác',
    description: 'Sai số chọn (Selection Bias), Sai số thông tin (Information/Recall Bias), Yếu tố gây nhiễu và các biện pháp hiệu chỉnh (Stratification, Matching, Multi-regression).',
    icon: 'fa-triangle-exclamation',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.12)'
  },
  {
    id: 'block-6',
    code: 'Khối 6',
    name: 'Mối Quan Hệ Nhân - Quả & Dịch Tễ Bệnh Không Lây',
    description: '9 Tiêu chuẩn Bradford Hill, Mô hình mạng lưới nguyên nhân (Web of Causation), Dịch tễ học bệnh mạn tính tim mạch, đái tháo đường, ung thư.',
    icon: 'fa-network-wired',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.12)'
  }
];

export const EPIDEMIOLOGY_TOPICS: EpidemiologyTopic[] = [
  // BLOCK 1
  {
    id: 'epi-b1-t1',
    code: 'EP-1.1',
    blockId: 'block-1',
    title: 'Phân Biệt Hiện Mắc (Prevalence) vs Mới Mắc (Incidence)',
    slug: 'prevalence-vs-incidence',
    overview: 'Prevalence đo lường gánh nặng bệnh tại một thời điểm (tĩnh), phụ thuộc cả vào tốc độ phát sinh bệnh mới và thời gian sống sót của bệnh nhân (P ≈ I × D). Incidence đo lường nguy cơ phát sinh ca bệnh mới trong một quần thể nguy cơ theo thời gian.',
    keyFormulas: [
      'Prevalence (P) = (Số ca bệnh hiện có tại thời điểm t) / (Tổng dân số tại thời điểm t)',
      'Cumulative Incidence (CI) = (Số ca mới phát sinh trong khoảng thời gian Δt) / (Dân số nguy cơ ban đầu)',
      'Incidence Rate (IR) = (Số ca mới phát sinh) / (Tổng thời gian - người theo dõi / Person-time)',
      'Prevalence ≈ Incidence Rate × Thời gian trung bình mắc bệnh (D)'
    ],
    clinicalPearls: [
      'Thuốc mới kéo dài thời gian sống nhưng không chữa khỏi bệnh sẽ làm TĂNG Prevalence dù Incidence không đổi.',
      'Sàng lọc phát hiện sớm giai đoạn tiền lâm sàng làm TĂNG cả Incidence và Prevalence tức thời (Lead-time effect).',
      'Incidence Rate với mẫu số người-năm (Person-years) là thước đo chuẩn xác nhất khi đoàn hệ có người rút lui (censoring).'
    ],
    biasAndPitfalls: [
      'Lẫn lộn giữa Tỷ lệ hiện mắc điểm (Point Prevalence) và Tỷ lệ hiện mắc kỳ (Period Prevalence).',
      'Đưa người đã mắc bệnh hoặc người không có cơ quan đích vào mẫu số của Incidence (Ví dụ: tính ung thư CTC nhưng tính cả nam giới hoặc người đã cắt tử cung).'
    ],
    relatedMetrics: ['Prevalence', 'Cumulative Incidence', 'Incidence Density Rate', 'Person-Time'],
    tags: ['Tần suất', 'Incidence', 'Prevalence', 'Gánh nặng bệnh']
  },
  {
    id: 'epi-b1-t2',
    code: 'EP-1.2',
    blockId: 'block-1',
    title: 'Các Chỉ Số Tử Vong & Gánh Nặng Bệnh Tật (Mortality, CFR, DALYs, QALYs)',
    slug: 'mortality-cfr-dalys-qalys',
    overview: 'Phân biệt Tỷ suất tử vong thô (CMR), Tỷ suất tử vong đặc hiệu (SMR), Tỷ lệ tử vong trên ca bệnh (Case Fatality Rate - CFR) và các thước đo gánh nặng bệnh tật hiện đại chuẩn WHO (DALYs = YLL + YLD).',
    keyFormulas: [
      'Crude Mortality Rate (CMR) = (Tổng số tử vong trong năm) / (Dân số trung bình giữa năm) × 1,000',
      'Case Fatality Rate (CFR %) = (Số ca tử vong do bệnh X) / (Tổng số ca xác định mắc bệnh X) × 100',
      'Proportionate Mortality Ratio (PMR %) = (Số tử vong do bệnh X) / (Tổng số tử vong do mọi nguyên nhân) × 100',
      'DALY = YLL (Năm sống bị mất do tử vong sớm) + YLD (Năm sống với tàn phế/bệnh tật)'
    ],
    clinicalPearls: [
      'CFR đo lường ĐỘ ĐỘC LỰC/MỨC ĐỘ NGUY HIỂM của tác nhân trên người bệnh, không đo lường nguy cơ tử vong trong toàn dân số.',
      '1 DALY đại diện cho việc mất đi 1 năm sống hoàn toàn khỏe mạnh. Bệnh tim mạch và đột quỵ hiện là nguyên nhân hàng đầu gây mất DALYs toàn cầu.'
    ],
    biasAndPitfalls: [
      'Hiệu ứng tử vong sớm trong dịch: Giai đoạn đầu dịch, CFR thường bị thổi phồng do chỉ xét nghiệm ca nặng (Asymptomatic under-reporting).',
      'Không chuẩn hóa tuổi khi so sánh tỷ suất tử vong giữa hai quốc gia có cơ cấu dân số già và trẻ khác nhau.'
    ],
    relatedMetrics: ['CFR', 'CMR', 'PMR', 'DALYs', 'QALYs', 'YLL', 'YLD'],
    tags: ['Tử vong', 'CFR', 'DALY', 'QALY', 'Gánh nặng']
  },

  // BLOCK 2
  {
    id: 'epi-b2-t1',
    code: 'EP-2.1',
    blockId: 'block-2',
    title: 'Nghiên Cứu Bệnh - Chứng (Case-Control Study) & Odds Ratio (OR)',
    slug: 'case-control-study-odds-ratio',
    overview: 'Thiết kế nghiên cứu quan sát phân tích hồi cứu: Chọn nhóm Bệnh (Cases) và nhóm Không Bệnh (Controls), sau đó điều tra ngược về tiền sử tiếp xúc với yếu tố phơi nhiễm trong quá khứ. Thước đo mối liên quan duy nhất là Tỉ số Số chênh (Odds Ratio - OR).',
    keyFormulas: [
      'Odds Ratio (OR) = (a × d) / (b × c)',
      'Odds phơi nhiễm ở nhóm Bệnh = a / c',
      'Odds phơi nhiễm ở nhóm Chứng = b / d',
      '95% CI của OR ≈ exp(ln(OR) ± 1.96 × sqrt(1/a + 1/b + 1/c + 1/d))'
    ],
    clinicalPearls: [
      'Case-Control là lựa chọn VÀNG cho các BỆNH HIẾM hoặc bệnh có THỜI GIAN Ủ BỆNH KÉO DÀI (Ví dụ: Ung thư trung biểu mô màng phổi do Asbestos).',
      'Khi bệnh hiếm (Rare disease assumption, tỷ lệ bệnh < 5%), OR xấp xỉ Relative Risk (OR ≈ RR).'
    ],
    biasAndPitfalls: [
      'Sai số nhớ lại (Recall Bias): Nhóm bệnh thường nhớ lại tiền sử phơi nhiễm chi tiết hơn nhóm chứng khỏe mạnh.',
      'Sai số chọn nhóm chứng (Berkson Bias): Chọn nhóm chứng từ bệnh nhân nội viện có thể có tỷ lệ phơi nhiễm bất thường so với cộng đồng.'
    ],
    relatedMetrics: ['Odds Ratio (OR)', '95% CI', 'Recall Bias', 'Berkson Bias'],
    tags: ['Case-Control', 'Odds Ratio', 'Bệnh hiếm', 'Hồi cứu']
  },
  {
    id: 'epi-b2-t2',
    code: 'EP-2.2',
    blockId: 'block-2',
    title: 'Nghiên Cứu Đoàn Hệ (Cohort Study) & Nguy Cơ Tương Đối (Relative Risk - RR)',
    slug: 'cohort-study-relative-risk',
    overview: 'Thiết kế nghiên cứu quan sát phân tích tiến cứu (hoặc hồi cứu): Bắt đầu từ nhóm Có phơi nhiễm và nhóm Không phơi nhiễm (tất cả chưa mắc bệnh), theo dõi dọc theo thời gian để so sánh tỷ lệ phát sinh bệnh mới. Thước đo trực tiếp là Nguy cơ tương đối (RR), Nguy cơ quy thuộc (AR) và Tỷ phần quy thuộc (PAF).',
    keyFormulas: [
      'Relative Risk (RR) = [a / (a + b)] / [c / (c + d)] = (Incidence ở nhóm Phơi nhiễm) / (Incidence ở nhóm Không phơi nhiễm)',
      'Attributable Risk (AR / Risk Difference) = [a / (a + b)] - [c / (c + d)]',
      'Attributable Risk Fraction (AR% / EER - CER / EER) = [(RR - 1) / RR] × 100%',
      'Population Attributable Fraction (PAF %) = [p(RR - 1) / (p(RR - 1) + 1)] × 100%',
      'Number Needed to Harm (NNH) = 1 / AR'
    ],
    clinicalPearls: [
      'Cohort Study là thiết kế tối ưu nhất để nghiên cứu YẾU TỐ PHƠI NHIỄM HIẾM (Ví dụ: Phơi nhiễm phóng xạ Chernoby) và đánh giá NHIỀU KẾT CỤC do 1 phơi nhiễm gây ra.',
      'Cohort xác lập chắc chắn MỐI QUAN HỆ THỜI GIAN (Phơi nhiễm xảy ra trước Bệnh).'
    ],
    biasAndPitfalls: [
      'Mất dấu theo dõi (Loss to follow-up / Attrition Bias): Nếu tỷ lệ mất dấu > 20%, giá trị bằng chứng giảm nghiêm trọng.',
      'Chi phí cao, thời gian kéo dài và không phù hợp với bệnh hiếm.'
    ],
    relatedMetrics: ['Relative Risk (RR)', 'Attributable Risk (AR)', 'PAF', 'NNH', 'Loss to Follow-up'],
    tags: ['Cohort', 'Relative Risk', 'Phơi nhiễm hiếm', 'Tiến cứu']
  },
  {
    id: 'epi-b2-t3',
    code: 'EP-2.3',
    blockId: 'block-2',
    title: 'Nghiên Cứu Cắt Ngang (Cross-Sectional) & Sinh Thái (Ecological)',
    slug: 'cross-sectional-and-ecological-studies',
    overview: 'Nghiên cứu cắt ngang thu thập thông tin về phơi nhiễm và bệnh tại cùng một thời điểm ("ảnh chụp nhanh"), cho biết Prevalence và Prevalence Ratio. Nghiên cứu sinh thái thu thập dữ liệu ở cấp độ quần thể, dễ mắc ngụy biện sinh thái (Ecological Fallacy).',
    keyFormulas: [
      'Prevalence Ratio (PR) = [a / (a + b)] / [c / (c + d)] tại thời điểm khảo sát',
      'Prevalence Odds Ratio (POR) = (a × d) / (b × c)'
    ],
    clinicalPearls: [
      'Cross-Sectional phù hợp nhất để khảo sát nhu cầu y tế, phân bổ nguồn lực y tế công cộng và sàng lọc ban đầu.',
      'Ngụy biện sinh thái (Ecological Fallacy): Kết luận về cá nhân dựa trên dữ liệu thống kê gộp của cả quần thể (Ví dụ: Quốc gia tiêu thụ nhiều socola có nhiều giải Nobel hơn không có nghĩa là ăn socola giúp cá nhân thông minh hơn).'
    ],
    biasAndPitfalls: [
      'Hiện tượng Con gà - Quả trứng (Neyman / Length-time bias): Không biết Phơi nhiễm có trước hay Bệnh có trước (Mất mối quan hệ thời gian).',
      'Chỉ phát hiện các ca bệnh có thời gian sống kéo dài (Survival Bias).'
    ],
    relatedMetrics: ['Prevalence Ratio', 'Ecological Fallacy', 'Neyman Bias', 'Temporal Ambiguity'],
    tags: ['Cắt ngang', 'Sinh thái', 'Ecological Fallacy', 'Prevalence Ratio']
  },

  // BLOCK 3
  {
    id: 'epi-b3-t1',
    code: 'EP-3.1',
    blockId: 'block-3',
    title: 'Độ Nhạy (Se), Độ Đặc Hiệu (Sp) & Giá Trị Tiên Đoán (PPV/NPV)',
    slug: 'sensitivity-specificity-ppv-npv',
    overview: 'Độ nhạy và độ đặc hiệu là các đặc tính cố hữu của Test chẩn đoán. PPV và NPV phụ thuộc mật thiết vào Tỷ lệ hiện mắc (Prevalence) trong quần thể thử nghiệm theo Định lý Bayes.',
    keyFormulas: [
      'Sensitivity (Se) = TP / (TP + FN) = Khả năng Test DƯƠNG TÍNH khi THỰC SỰ CÓ BỆNH',
      'Specificity (Sp) = TN / (TN + FP) = Khả năng Test ÂM TÍNH khi THỰC SỰ KHÔNG BỆNH',
      'Positive Predictive Value (PPV) = TP / (TP + FP)',
      'Negative Predictive Value (NPV) = TN / (TN + FN)',
      'PPV theo Bayes = (Se × Prevalence) / [(Se × Prevalence) + ((1 - Sp) × (1 - Prevalence))]'
    ],
    clinicalPearls: [
      'Quy tắc SnNout: Test có Độ nhạy cao (High Sensitivity) khi ÂM TÍNH (Negative) giúp LOẠI TRỪ bệnh (Rule Out). Thích hợp làm xét nghiệm sàng lọc ban đầu.',
      'Quy tắc SpPin: Test có Độ đặc hiệu cao (High Specificity) khi DƯƠNG TÍNH (Positive) giúp XÁC ĐỊNH bệnh (Rule In). Thích hợp làm xét nghiệm khẳng định.',
      'Khi Prevalence GIẢM (ví dụ sàng lọc trong cộng đồng khỏe mạnh), PPV GIẢM RẤT MẠNH dù Se và Sp rất cao (Đa số ca dương tính là Dương tính giả).'
    ],
    biasAndPitfalls: [
      'Áp dụng kết quả nghiên cứu trong bệnh viện tuyến cuối (Prevalence cao) vào phòng khám đa khoa tuyến cơ sở mà không hiệu chỉnh PPV.',
      'Workup Bias (Verification Bias): Chỉ cho người có Test dương tính đi làm tiêu chuẩn vàng (Gold standard).'
    ],
    relatedMetrics: ['Sensitivity', 'Specificity', 'PPV', 'NPV', 'SnNout', 'SpPin', 'Bayes'],
    tags: ['Se', 'Sp', 'PPV', 'NPV', 'Sàng lọc', 'Chẩn đoán']
  },
  {
    id: 'epi-b3-t2',
    code: 'EP-3.2',
    blockId: 'block-3',
    title: 'Tỷ Số Khả Dĩ (Likelihood Ratios: LR+, LR-) & Đường Cong ROC',
    slug: 'likelihood-ratios-and-roc-curves',
    overview: 'Likelihood Ratio là cầu nối trực tiếp giữa Xác suất tiền nghiệm (Pre-test probability) và Xác suất hậu nghiệm (Post-test probability) qua Nomogram Fagan. Đường cong ROC (Receiver Operating Characteristic) tối ưu hóa điểm cắt chẩn đoán (Cut-off point).',
    keyFormulas: [
      'Positive Likelihood Ratio (LR+) = Sensitivity / (1 - Specificity) = TP rate / FP rate',
      'Negative Likelihood Ratio (LR-) = (1 - Sensitivity) / Specificity = FN rate / TN rate',
      'Pre-test Odds = Pre-test Probability / (1 - Pre-test Probability)',
      'Post-test Odds = Pre-test Odds × Likelihood Ratio',
      'Post-test Probability = Post-test Odds / (Post-test Odds + 1)'
    ],
    clinicalPearls: [
      'LR+ > 10 hoặc LR- < 0.1 tạo ra sự THAY ĐỔI LỚN trong xác suất hậu nghiệm, có giá trị chẩn đoán lâm sàng quyết định.',
      'LR+ = 1 hoặc LR- = 1 nghĩa là Test HOÀN TOÀN VÔ GIÁ TRỊ (không thay đổi xác suất bệnh).',
      'Diện tích dưới đường cong ROC (AUC): 0.5 = Không có giá trị; 0.7-0.8 = Khá; 0.8-0.9 = Rất tốt; > 0.9 = Xuất sắc.'
    ],
    biasAndPitfalls: [
      'Dùng sai đơn vị giữa Probability (%) và Odds khi tính toán thủ công.',
      'Chọn điểm cắt (Cut-off) tối đa hóa Se mà không lường trước việc Sp giảm sâu dẫn tới quá tải chuyển viện do dương tính giả.'
    ],
    relatedMetrics: ['LR+', 'LR-', 'ROC Curve', 'AUC', 'Fagan Nomogram', 'Post-test Probability'],
    tags: ['Likelihood Ratio', 'ROC', 'AUC', 'Fagan', 'Bayes']
  },

  // BLOCK 4
  {
    id: 'epi-b4-t1',
    code: 'EP-4.1',
    blockId: 'block-4',
    title: 'Hệ Số Lây Nhiễm (R0, Rt) & Ngưỡng Miễn Dịch Cộng Đồng (Herd Immunity)',
    slug: 'r0-rt-and-herd-immunity-threshold',
    overview: 'Hệ số lây nhiễm cơ bản (R0) là số ca nhiễm thứ phát trung bình do 1 người bệnh tạo ra trong quần thể hoàn toàn nhạy cảm. Hệ số lây nhiễm hiệu dụng (Rt) phản ánh tốc độ lây lan tại thời điểm t khi đã có miễn dịch hoặc can thiệp.',
    keyFormulas: [
      'R0 = β (Xác suất lây trên 1 tiếp xúc) × c (Số tiếp xúc / đơn vị thời gian) × d (Thời gian lây truyền)',
      'Rt = R0 × s (Tỷ lệ người còn nhạy cảm trong quần thể)',
      'Herd Immunity Threshold (HIT %) = [1 - (1 / R0)] × 100%',
      'Tỷ lệ bao phủ tiêm chủng cần thiết (Vc) = HIT / Hiệu lực vaccine (E)'
    ],
    clinicalPearls: [
      'Nếu Rt < 1: Dịch bệnh sẽ tự suy tàn và biến mất. Nếu Rt > 1: Dịch tiếp tục bùng phát lan rộng.',
      'Bệnh Sởi (R0 ≈ 12 - 18) đòi hỏi tỷ lệ miễn dịch cộng đồng cực cao (92 - 95%) để ngăn chặn bùng phát.',
      'Giãn cách xã hội và đeo khẩu trang làm GIẢM c và β, từ đó đưa Rt xuống dưới 1 ngay cả khi chưa có vaccine.'
    ],
    biasAndPitfalls: [
      'Giả định quần thể tiếp xúc đồng nhất (Homogeneous mixing) - trong thực tế, các sự kiện siêu lây nhiễm (Super-spreading events) đóng vai trò lớn trong lây truyền theo luật Pareto (20/80).'
    ],
    relatedMetrics: ['R0', 'Rt', 'Herd Immunity Threshold (HIT)', 'Attack Rate', 'Super-Spreading'],
    tags: ['R0', 'Rt', 'Miễn dịch cộng đồng', 'Dập dịch', 'Vaccine']
  },
  {
    id: 'epi-b4-t2',
    code: 'EP-4.2',
    blockId: 'block-4',
    title: 'Đường Cong Dịch Tễ (Epicurve) & 10 Bước Điều Tra Ổ Dịch CDC',
    slug: 'epicurve-and-10-steps-outbreak-investigation',
    overview: 'Đường cong dịch tễ (Epicurve) biểu diễn số ca bệnh theo thời gian khởi phát triệu chứng, cung cấp thông tin cốt lõi về nguồn lây, phương thức truyền bệnh và thời gian ủ bệnh. Quy trình 10 bước chuẩn CDC hướng dẫn dập dịch thực địa.',
    keyFormulas: [
      'Attack Rate (AR %) = (Số ca mắc mới trong đợt dịch) / (Dân số nguy cơ tiếp xúc lúc bắt đầu đợt dịch) × 100',
      'Secondary Attack Rate (SAR %) = (Số ca nhiễm từ ca F0 trong hộ gia đình) / (Tổng số người tiếp xúc nhạy cảm trong hộ) × 100',
      'Food-specific Attack Rate = (Số người ăn món X bị bệnh) / (Tổng số người ăn món X) × 100'
    ],
    clinicalPearls: [
      'Ổ dịch nguồn chung điểm (Point Source): Đường cong lệch trái, đỉnh dốc đứng, đuôi giảm dần (Ví dụ: Ngộ độc thực phẩm tại 1 bữa tiệc).',
      'Ổ dịch lan tỏa người sang người (Propagated Epidemic): Nhiều đỉnh liên tiếp cách nhau khoảng thời gian tương ứng với 1 thời kỳ ủ bệnh (Ví dụ: Cúm, Sởi, COVID-19).',
      'Thời gian ủ bệnh trung bình được ước tính bằng khoảng cách từ thời điểm phơi nhiễm đến đỉnh dịch của đường cong nguồn điểm.'
    ],
    biasAndPitfalls: [
      'Vẽ Epicurve theo ngày báo cáo xét nghiệm thay vì NGÀY KHỞI PHÁT TRIỆU CHỨNG thực tế (gây nhiễu do độ trễ trả kết quả Lab).'
    ],
    relatedMetrics: ['Epicurve', 'Attack Rate (AR)', 'SAR', 'Point Source', 'Propagated Outbreak'],
    tags: ['Epicurve', 'Điều tra dịch', 'CDC', 'Attack Rate', 'Ngộ độc']
  },

  // BLOCK 5
  {
    id: 'epi-b5-t1',
    code: 'EP-5.1',
    blockId: 'block-5',
    title: 'Hệ Thống Sai Số (Selection Bias & Information Bias)',
    slug: 'selection-and-information-bias',
    overview: 'Sai số hệ thống (Systematic Error / Bias) làm sai lệch ước tính nguy cơ ra khỏi giá trị thực. Phân biệt Sai số chọn (Selection Bias) và Sai số đo lường/thông tin (Information/Measurement Bias).',
    keyFormulas: [
      'Observed OR = True OR × Selection Probability Ratio',
      'Độ chính xác (Precision) phụ thuộc Cỡ mẫu (Random Error) ≠ Tính chuẩn xác (Validity) phụ thuộc Kiểm soát Sai số (Bias)'
    ],
    clinicalPearls: [
      'Berkson Bias: Chọn mẫu bệnh nhân tại bệnh viện có tỷ lệ nhập viện cao hơn đối với người có cả 2 tình trạng phơi nhiễm và bệnh.',
      'Healthy Worker Effect: Quần thể công nhân đang làm việc luôn có tỷ lệ tử vong/bệnh tật thấp hơn dân số nói chung vì người ốm nặng đã nghỉ việc.',
      'Hawthorne Effect: Đối tượng nghiên cứu thay đổi hành vi theo hướng tích cực hơn khi biết mình đang được theo dõi quan sát.'
    ],
    biasAndPitfalls: [
      'Tăng cỡ mẫu KHÔNG THỂ loại bỏ sai số hệ thống (Bias), chỉ làm giảm sai số ngẫu nhiên (Random error).'
    ],
    relatedMetrics: ['Selection Bias', 'Recall Bias', 'Berkson Bias', 'Healthy Worker Effect', 'Hawthorne Effect'],
    tags: ['Sai số', 'Bias', 'Berkson', 'Recall', 'Giá trị nội tại']
  },
  {
    id: 'epi-b5-t2',
    code: 'EP-5.2',
    blockId: 'block-5',
    title: 'Yếu Tố Gây Nhiễu (Confounding) & Hiệu Ứng Tương Tác (Effect Modification)',
    slug: 'confounding-and-effect-modification',
    overview: 'Yếu tố gây nhiễu (Confounder) là yếu tố liên quan đến cả Phơi nhiễm và Kết cục, nhưng không nằm trên chuỗi cơ chế nhân quả trung gian. Hiệu ứng tương tác (Effect Modification) là hiện tượng sinh học có thật khi mức độ liên quan thay đổi theo phân tầng.',
    keyFormulas: [
      'Tiêu chuẩn xác định Nhiễu: 1) Liên quan Phơi nhiễm, 2) Liên quan Kết cục, 3) KHÔNG nằm trên chuỗi nhân quả trung gian',
      'Mantel-Haenszel Pooled OR = Σ(ai × di / Ni) / Σ(bi × ci / Ni)',
      'Nếu Crude OR ≠ Adjusted (Mantel-Haenszel) OR (chênh lệch > 10%) → CÓ NHIỄU (Confounding)',
      'Nếu OR ở tầng 1 KHÁC BIỆT RÕ RỆT so với OR ở tầng 2 → CÓ TƯƠNG TÁC (Effect Modification)'
    ],
    clinicalPearls: [
      'Ví dụ kinh điển: Uống cà phê liên quan Ung thư phổi. Confounder chính là HÚT THUỐC LÁ (người uống cà phê hút thuốc nhiều hơn). Khi hiệu chỉnh hút thuốc, liên quan cà phê - ung thư phổi biến mất.',
      'Nhiễu là SAI SỐ CẦN LOẠI BỎ (bằng Matching, Stratification, Regression). Tương tác là HIỆN TƯỢNG TỰ NHIÊN CẦN MÔ TẢ VÀ BÁO CÁO (không gộp chung).'
    ],
    biasAndPitfalls: [
      'Hiệu chỉnh nhầm biến trung gian (Intermediate variable): Sẽ làm triệt tiêu hiệu ứng bảo vệ hoặc gây bệnh thực sự của phơi nhiễm.'
    ],
    relatedMetrics: ['Confounding', 'Effect Modification', 'Mantel-Haenszel', 'Stratification', 'Matching'],
    tags: ['Nhiễu', 'Confounder', 'Tương tác', 'Mantel-Haenszel', 'Hiệu chỉnh']
  },

  // BLOCK 6
  {
    id: 'epi-b6-t1',
    code: 'EP-6.1',
    blockId: 'block-6',
    title: '9 Tiêu Chuẩn Nhân - Quả Bradford Hill (Hill\'s Criteria for Causality)',
    slug: 'bradford-hill-causality-criteria',
    overview: 'Tương quan thống kê không đồng nghĩa với Nhân - Quả (Correlation is not causation). Ngài Austin Bradford Hill (1965) đề xuất 9 tiêu chuẩn kinh điển để đánh giá liệu mối liên quan quan sát được có phải là nguyên nhân thực sự hay không.',
    keyFormulas: [
      '1. Strength (Sức mạnh liên quan): RR / OR càng lớn thì khả năng nhân quả càng cao.',
      '2. Consistency (Tính nhất quán): Lặp lại trên nhiều quần thể, nhà nghiên cứu, phương pháp khác nhau.',
      '3. Specificity (Tính đặc hiệu): 1 phơi nhiễm đặc hiệu dẫn tới 1 kết cục bệnh cụ thể.',
      '4. Temporality (Quan hệ thời gian): BẮT BUỘC Phơi nhiễm phải xảy ra trước Bệnh.',
      '5. Biological Gradient (Liều - Đáp ứng): Tiếp xúc liều càng cao thì nguy cơ mắc bệnh càng lớn.',
      '6. Plausibility (Tính hợp lý sinh học): Phù hợp với kiến thức cơ chế sinh học, sinh lý bệnh hiện có.',
      '7. Coherence (Tính tương đồng): Không mâu thuẫn với lịch sử tự nhiên của bệnh.',
      '8. Experiment (Bằng chứng thực nghiệm): Giảm phơi nhiễm làm giảm tỷ lệ mắc bệnh.',
      '9. Analogy (Tính tương tự): Tương đồng với các cặp nguyên nhân - bệnh đã được chứng minh.'
    ],
    clinicalPearls: [
      'Tiêu chuẩn BẮT BUỘC DUY NHẤT trong 9 tiêu chuẩn là QUAN HỆ THỜI GIAN (Temporality). Mọi tiêu chuẩn khác có thể khuyết thiếu nhưng vẫn có thể là quan hệ nhân quả.',
      'Ví dụ ứng dụng vĩ đại nhất: Báo cáo của Tổng Y sĩ Hoa Kỳ 1964 chứng minh Hút thuốc lá gây Ung thư phổi dựa trên 9 tiêu chuẩn Bradford Hill.'
    ],
    biasAndPitfalls: [
      'Coi tiêu chuẩn Tính đặc hiệu (Specificity) là tuyệt đối: Nhiều phơi nhiễm (như Thuốc lá) gây ra hàng chục bệnh khác nhau (K phổi, COPD, Bệnh mạch vành, Đột quỵ).'
    ],
    relatedMetrics: ['Temporality', 'Biological Gradient', 'Strength of Association', 'Biological Plausibility'],
    tags: ['Bradford Hill', 'Nhân quả', 'Causality', 'Cơ chế', 'Chứng cứ']
  },
  {
    id: 'epi-b6-t2',
    code: 'EP-6.2',
    blockId: 'block-6',
    title: 'Dịch Tễ Học Bệnh Không Lây Nhiễm (NCDs) & Các Cấp Độ Dự Phòng',
    slug: 'ncds-epidemiology-and-prevention-levels',
    overview: 'Bệnh không lây nhiễm (Tim mạch, Ung thư, ĐTĐ, COPD) chiếm hơn 74% số ca tử vong toàn cầu. Chiến lược can thiệp dựa trên 4 cấp độ dự phòng (Primordial, Primary, Secondary, Tertiary Prevention).',
    keyFormulas: [
      'Dự phòng Cấp 0 (Primordial): Ngăn chặn sự xuất hiện của các yếu tố nguy cơ kinh tế - xã hội - môi trường.',
      'Dự phòng Cấp 1 (Primary): Giảm tỷ lệ MỚI MẮC (Incidence) bằng tiêm vaccine, bỏ thuốc, tập thể thao.',
      'Dự phòng Cấp 2 (Secondary): Giảm tỷ lệ HIỆN MẮC (Prevalence) và tử vong bằng SÀNG LỌC VÀ ĐIỀU TRỊ GIAI ĐOẠN SỚM (Pap smear, Nhũ ảnh, Đo HA).',
      'Dự phòng Cấp 3 (Tertiary): Giảm TÀN PHẾ VÀ BIẾN CHỨNG ở người đã có triệu chứng lâm sàng (Phục hồi chức năng sau đột quỵ, Stent mạch vành).'
    ],
    clinicalPearls: [
      'Sàng lọc huyết áp và đường huyết định kỳ là DỰ PHÒNG CẤP 2 (phát hiện sớm khi chưa có biến chứng).',
      'Tiêm vaccine HPV ngừa ung thư cổ tử cung và vaccine HBV ngừa ung thư gan là DỰ PHÒNG CẤP 1.'
    ],
    biasAndPitfalls: [
      'Lead-time Bias trong sàng lọc: Phát hiện bệnh sớm hơn làm tăng "thời gian sống tính từ lúc chẩn đoán" nhưng KHÔNG kéo dài tuổi thọ thực sự của bệnh nhân.',
      'Length-time Bias: Sàng lọc có xu hướng phát hiện các thể bệnh tiến triển chậm, lành tính hơn các thể tiến triển tối cấp.'
    ],
    relatedMetrics: ['Primordial', 'Primary Prevention', 'Secondary Prevention', 'Tertiary Prevention', 'Lead-time Bias'],
    tags: ['NCDs', 'Dự phòng', 'Sàng lọc', 'Lead-Time Bias', 'Length-Time Bias']
  }
];

export const STUDY_DESIGNS_DATA: StudyDesignInfo[] = [
  {
    id: 'rct',
    name: 'Thử Nghiệm Lâm Sàng Ngẫu Nhiên Có Đối Chứng (RCT)',
    englishName: 'Randomized Controlled Trial',
    type: 'Thực nghiệm Can thiệp',
    unit: 'Cá thể',
    direction: 'Tiến cứu (Forward)',
    primaryMeasure: 'Relative Risk (RR), RRR, ARR, NNT',
    strengths: ['Tiêu chuẩn vàng đánh giá hiệu quả điều trị', 'Phân bổ ngẫu nhiên triệt tiêu Confounding', 'Xác lập quan hệ nhân quả mạnh nhất'],
    limitations: ['Chi phí đắt đỏ', 'Vấn đề đạo đức y sinh', 'Khó áp dụng cho phơi nhiễm có hại'],
    biasRisk: 'Thấp nhất (nếu làm mù đôi Double-blind & phân bổ ngẫu nhiên chuẩn)',
    example: 'Thử nghiệm thuốc ức chế SGLT2i so với Giả dược trên 5,000 bệnh nhân suy tim EF giảm.'
  },
  {
    id: 'cohort',
    name: 'Nghiên Cứu Đoàn Hệ (Cohort Study)',
    englishName: 'Prospective / Retrospective Cohort',
    type: 'Quan sát Phân tích',
    unit: 'Cá thể',
    direction: 'Tiến cứu hoặc Hồi cứu (Phơi nhiễm → Bệnh)',
    primaryMeasure: 'Relative Risk (RR), Hazard Ratio (HR), Incidence Rate, AR, PAF',
    strengths: ['Tối ưu cho phơi nhiễm hiếm', 'Đánh giá được nhiều kết cục từ 1 phơi nhiễm', 'Xác lập chắc chắn quan hệ thời gian'],
    limitations: ['Chi phí cao, thời gian theo dõi dài', 'Không phù hợp với bệnh hiếm', 'Nguy cơ mất dấu theo dõi (Attrition bias)'],
    biasRisk: 'Trung bình (Dễ bị Confounding, Attrition Bias)',
    example: 'Nghiên cứu Framingham Heart Study theo dõi cư dân thị trấn Framingham qua nhiều thế hệ.'
  },
  {
    id: 'case-control',
    name: 'Nghiên Cứu Bệnh - Chứng (Case-Control Study)',
    englishName: 'Case-Control Study',
    type: 'Quan sát Phân tích',
    unit: 'Cá thể',
    direction: 'Hồi cứu (Bệnh → Phơi nhiễm quá khứ)',
    primaryMeasure: 'Odds Ratio (OR)',
    strengths: ['Tối ưu cho BỆNH HIẾM và bệnh có thời gian ủ bệnh kéo dài', 'Thực hiện nhanh, chi phí thấp', 'Khảo sát được nhiều phơi nhiễm cho 1 bệnh'],
    limitations: ['Không tính được Incidence trực tiếp', 'Không phù hợp cho phơi nhiễm hiếm', 'Rất dễ mắc sai số nhớ lại (Recall bias)'],
    biasRisk: 'Cao (Recall Bias, Selection Bias / Berkson Bias)',
    example: 'Nghiên cứu Doll & Hill 1950 so sánh bệnh nhân ung thư phổi với bệnh nhân mắc bệnh khác về tiền sử hút thuốc.'
  },
  {
    id: 'cross-sectional',
    name: 'Nghiên Cứu Cắt Ngang (Cross-Sectional Study)',
    englishName: 'Cross-Sectional / Prevalence Study',
    type: 'Quan sát Mô tả / Phân tích',
    unit: 'Cá thể',
    direction: 'Đồng thời tại 1 thời điểm',
    primaryMeasure: 'Prevalence, Prevalence Ratio (PR), Prevalence Odds Ratio (POR)',
    strengths: ['Nhanh chóng, tiết kiệm chi phí', 'Đo lường gánh nặng bệnh trong cộng đồng', 'Cung cấp cơ sở hình thành giả thuyết'],
    limitations: ['Không xác định được quan hệ thời gian (Gà có trước hay Trứng có trước)', 'Dễ mắc Neyman bias / Length bias'],
    biasRisk: 'Trung bình - Cao (Temporal ambiguity, Survival bias)',
    example: 'Khảo sát tỷ lệ tăng huyết áp và thói quen ăn mặn trên 10,000 người dân thành phố tại thời điểm năm 2026.'
  },
  {
    id: 'ecological',
    name: 'Nghiên Cứu Sinh Thái (Ecological Study)',
    englishName: 'Ecological / Correlational Study',
    type: 'Quan sát Mô tả',
    unit: 'Quần thể / Quốc gia / Tỉnh thành',
    direction: 'Đồng thời cấp độ nhóm',
    primaryMeasure: 'Hệ số tương quan Pearson (r), Tỷ suất cấp quần thể',
    strengths: ['Sử dụng dữ liệu thống kê sẵn có', 'Chi phí rất thấp', 'Tốt để so sánh giữa các quốc gia'],
    limitations: ['Dễ mắc Ngụy biện sinh thái (Ecological Fallacy)', 'Không thể liên hệ trực tiếp cá nhân'],
    biasRisk: 'Rất cao (Ecological Fallacy, Confounding)',
    example: 'So sánh lượng tiêu thụ chất béo bình quân đầu người và tỷ lệ ung thư vú giữa 30 quốc gia.'
  }
];

export const OUTBREAK_PATTERNS: OutbreakPattern[] = [
  {
    id: 'point-source',
    name: 'Nguồn Chung Điểm (Point Source Outbreak)',
    englishName: 'Point Source Epidemic',
    description: 'Toàn bộ đối tượng bị phơi nhiễm với cùng một nguồn tác nhân trong một khoảng thời gian ngắn (ngắn hơn 1 thời kỳ ủ bệnh).',
    curveShape: 'Đường cong dốc đứng, đỉnh nhọn lệch trái, sau đó giảm dần theo phân phối log-chuẩn.',
    examples: ['Vụ ngộ độc thực phẩm tại tiệc cưới do vi khuẩn Salmonella', 'Nhiễm độc khí Clo cấp tính tại hồ bơi'],
    keyFeatures: ['Thời gian phơi nhiễm ngắn', 'Khoảng biến thiên của đường cong tương ứng với độ dao động thời gian ủ bệnh', 'Không có lây truyền thứ phát']
  },
  {
    id: 'continuous-source',
    name: 'Nguồn Chung Liên Tục (Continuous Common Source)',
    englishName: 'Continuous Common Source Epidemic',
    description: 'Nguồn lây tồn tại kéo dài qua nhiều ngày hoặc nhiều tuần, mọi người tiếp xúc liên tục theo thời gian.',
    curveShape: 'Đường cong tăng dần, đỉnh bằng phẳng dạng cao nguyên (Plateau), không có đỉnh đơn sắc nét.',
    examples: ['Nguồn nước giếng khoan bị nhiễm khuẩn tả kéo dài tại London (John Snow 1854)', 'Nhiễm nấm Meningitis do thuốc tiêm nhiễm bẩn lưu hành nhiều tháng'],
    keyFeatures: ['Đỉnh kéo dài thành cao nguyên', 'Chỉ kết thúc khi nguồn lây bị cô lập hoặc cắt đứt']
  },
  {
    id: 'propagated',
    name: 'Lây Truyền Lan Tỏa (Propagated / Person-to-Person)',
    englishName: 'Propagated Outbreak',
    description: 'Tác nhân truyền từ người này sang người khác qua đường hô hấp, giọt bắn, tiếp xúc hoặc vector truyền bệnh.',
    curveShape: 'Đường cong có nhiều đỉnh liên tiếp, các đỉnh ngày càng cao và rộng hơn, cách nhau khoảng 1 thời kỳ ủ bệnh.',
    examples: ['Dịch Cúm mùa, Sởi, COVID-19, Đậu mùa khỉ'],
    keyFeatures: ['Tồn tại nhiều thế hệ lây nhiễm (F0 → F1 → F2)', 'Thời gian dịch kéo dài', 'Phụ thuộc vào hệ số lây nhiễm Rt và can thiệp dập dịch']
  }
];

export const BRADFORD_HILL_CRITERIA: CausalityCriterion[] = [
  {
    id: 'strength',
    number: 1,
    name: 'Sức Mạnh Liên Quan',
    englishName: 'Strength of Association',
    description: 'Tỉ số nguy cơ (RR) hoặc Số chênh (OR) càng lớn thì khả năng mối liên quan đó là nhân quả càng cao, vì khó bị giải thích bởi sai số nhỏ.',
    classicExample: 'Người hút thuốc lá nặng có nguy cơ ung thư phổi cao gấp 20 - 30 lần người không hút (RR ≈ 25).'
  },
  {
    id: 'consistency',
    number: 2,
    name: 'Tính Nhất Quán',
    englishName: 'Consistency',
    description: 'Mối liên quan được quan sát thấy lặp đi lặp lại bởi các nhà nghiên cứu khác nhau, ở các địa điểm và trên các nhóm dân số khác nhau.',
    classicExample: 'Hơn 50 nghiên cứu dịch tễ độc lập tại nhiều quốc gia đều ghi nhận thuốc lá làm tăng nguy cơ ung thư phổi.'
  },
  {
    id: 'specificity',
    number: 3,
    name: 'Tính Đặc Hiệu',
    englishName: 'Specificity',
    description: 'Một yếu tố phơi nhiễm đặc hiệu dẫn tới một kết cục bệnh lý cụ thể (tiêu chuẩn này yếu nhất do nhiều phơi nhiễm gây đa bệnh).',
    classicExample: 'Bụi amiang (Asbestos) gây ra u trung biểu mô màng phổi (Mesothelioma) đặc hiệu.'
  },
  {
    id: 'temporality',
    number: 4,
    name: 'Quan Hệ Thời Gian (BẮT BUỘC)',
    englishName: 'Temporality',
    description: 'Yếu tố phơi nhiễm BẮT BUỘC phải xuất hiện trước khi bệnh khởi phát. Đây là tiêu chuẩn bắt buộc duy nhất không thể thiếu.',
    classicExample: 'Hút thuốc lá nhiều năm trước khi phát hiện khối u phổi trên phim chụp X-quang.'
  },
  {
    id: 'gradient',
    number: 5,
    name: 'Gradient Sinh Học (Liều - Đáp Ứng)',
    englishName: 'Biological Gradient / Dose-Response',
    description: 'Mức độ tiếp xúc phơi nhiễm càng nhiều (liều lượng, thời gian, tần suất) thì nguy cơ mắc bệnh hoặc tử vong càng tăng tuyến tính.',
    classicExample: 'Số gói-năm hút thuốc càng cao thì tỷ lệ mắc ung thư phổi và COPD càng tăng rõ rệt.'
  },
  {
    id: 'plausibility',
    number: 6,
    name: 'Tính Hợp Lý Sinh Học',
    englishName: 'Biological Plausibility',
    description: 'Mối liên quan phải phù hợp với hiểu biết khoa học và cơ chế sinh học, sinh lý bệnh học hiện thời.',
    classicExample: 'Khói thuốc chứa hơn 70 chất sinh ung (PAHs, Nitrosamines) gây đột biến gen TP53 và KRAS ở tế bào biểu mô phế quản.'
  },
  {
    id: 'coherence',
    number: 7,
    name: 'Tính Tương Đồng',
    englishName: 'Coherence',
    description: 'Mối liên hệ nhân quả không xung đột với lịch sử tự nhiên và dịch tễ học đã biết của căn bệnh.',
    classicExample: 'Tỷ lệ ung thư phổi ở nam giới tăng mạnh sau khi thuốc lá điếu công nghiệp trở nên phổ biến sau Thế chiến I.'
  },
  {
    id: 'experiment',
    number: 8,
    name: 'Bằng Chứng Thực Nghiệm',
    englishName: 'Experimental Evidence',
    description: 'Khi tiến hành can thiệp giảm hoặc loại bỏ phơi nhiễm, tỷ lệ mắc bệnh trong quần thể giảm tương ứng.',
    classicExample: 'Người cai thuốc lá sau 10 năm có nguy cơ ung thư phổi giảm một nửa so với người tiếp tục hút.'
  },
  {
    id: 'analogy',
    number: 9,
    name: 'Tính Tương Tự',
    englishName: 'Analogy',
    description: 'Có thể so sánh tương tự với các mối quan hệ nhân quả giữa các tác nhân và bệnh lý tương tự đã được y văn chứng minh.',
    classicExample: 'Nếu Rubella và Thalidomide gây dị tật thai nhi bẩm sinh, virus Zika gây teo não ở thai nhi là hoàn toàn tương tự.'
  }
];
