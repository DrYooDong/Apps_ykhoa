// =======================================================================
// WHO AWaRe Antimicrobial Stewardship & Clinical Guidelines (2025 Edition)
// Dữ liệu từ tài liệu chính thức của Tổ chức Y tế Thế giới (WHO)
// "Phân tầng và hướng dẫn sử dụng kháng sinh theo các nhóm - Tiếp cận, Giám sát, Dự trữ (AWaRe)"
// Western Pacific Region - ISBN 978 92 9062 121 8
// =======================================================================

import { AwareCategory, WhoDiseaseGuideline } from '../types';

export interface WhoAwareOverview {
  globalTargetPct: number; // 60%
  descriptionVi: string;
  descriptionEn: string;
  categories: {
    name: AwareCategory;
    color: string;
    bgClass: string;
    borderClass: string;
    textClass: string;
    descriptionVi: string;
    descriptionEn: string;
    examplesVi: string[];
  }[];
}

export const WHO_AWARE_OVERVIEW: WhoAwareOverview = {
  globalTargetPct: 60,
  descriptionVi: 'Hệ thống phân loại AWaRe của WHO phân loại hàng trăm loại kháng sinh thành 3 nhóm: Tiếp cận (Access), Giám sát (Watch) và Dự trữ (Reserve) để hướng dẫn lựa chọn kháng sinh hợp lý và ngăn chặn đà gia tăng của tình trạng kháng kháng sinh (AMR). Mục tiêu toàn cầu của WHO: Ít nhất 60% tổng lượng kháng sinh sử dụng ở cấp quốc gia phải thuộc nhóm Tiếp cận.',
  descriptionEn: 'The WHO AWaRe classification categorizes antibiotics into three groups: Access, Watch, and Reserve to guide optimal antimicrobial use and curb antimicrobial resistance. WHO global target: At least 60% of total antibiotic consumption at the national level should be from the Access group.',
  categories: [
    {
      name: 'Access',
      color: 'green',
      bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      borderClass: 'border-emerald-500',
      textClass: 'text-emerald-700',
      descriptionVi: 'Nhóm Tiếp cận (Access): Kháng sinh có phổ hẹp, hồ sơ an toàn tốt, chi phí hợp lý và khả năng gây chọn lọc kháng thuốc thấp. Được khuyến cáo là lựa chọn đầu tay hoặc thứ hai cho hầu hết các bệnh nhiễm khuẩn thông thường trong chăm sóc ban đầu và bệnh viện.',
      descriptionEn: 'Access group: Antibiotics with narrow spectrum, favorable safety profile, affordable cost, and low potential for selecting resistance. Recommended as first- or second-line choices for most common infections.',
      examplesVi: ['Amoxicillin', 'Amoxicillin+clavulanic acid', 'Ampicillin', 'Cefalexin', 'Cefazolin', 'Cloxacillin', 'Doxycycline', 'Gentamicin', 'Metronidazole', 'Nitrofurantoin', 'Phenoxymethylpenicillin', 'Sulfamethoxazole+trimethoprim']
    },
    {
      name: 'Watch',
      color: 'amber',
      bgClass: 'bg-amber-50 text-amber-800 border-amber-300',
      borderClass: 'border-amber-500',
      textClass: 'text-amber-700',
      descriptionVi: 'Nhóm Giám sát (Watch): Kháng sinh phổ rộng hơn, chi phí cao hơn và có nguy cơ chọn lọc kháng thuốc cao. Chỉ khuyến cáo là lựa chọn đầu tay cho bệnh nhân nặng hoặc khi tác nhân có khả năng cao kháng nhóm Tiếp cận. Cần được theo dõi và quản lý chặt chẽ.',
      descriptionEn: 'Watch group: Broader-spectrum antibiotics with higher potential for resistance selection. Recommended only as first-line for severely ill patients or when pathogens are likely resistant to Access agents.',
      examplesVi: ['Azithromycin', 'Cefixime', 'Cefotaxime', 'Ceftriaxone', 'Cefuroxime', 'Ciprofloxacin', 'Clarithromycin', 'Meropenem', 'Piperacillin+tazobactam', 'Vancomycin (IV)']
    },
    {
      name: 'Reserve',
      color: 'rose',
      bgClass: 'bg-rose-50 text-rose-800 border-rose-300',
      borderClass: 'border-rose-500',
      textClass: 'text-rose-700',
      descriptionVi: 'Nhóm Dự trữ (Reserve): Kháng sinh "cứu cánh cuối cùng" (last-resort) dành cho các bệnh nhiễm khuẩn đe dọa tính mạng do vi khuẩn đa kháng (MDR/XDR như Carbapenemase, ESBL, MRSA, VRE). Phải được bảo tồn nghiêm ngặt qua quy trình duyệt chuyên gia.',
      descriptionEn: 'Reserve group: Last-resort antibiotics reserved for life-threatening infections caused by multidrug-resistant pathogens (CRE, MBL, CRAB, CRPA, MRSA, VRE). Must be strictly preserved through antimicrobial stewardship programs.',
      examplesVi: ['Cefiderocol', 'Ceftazidime+avibactam', 'Fosfomycin (IV)', 'Linezolid', 'Meropenem+vaborbactam', 'Plazomicin', 'Polymyxin B', 'Colistin (Polymyxin E)']
    }
  ]
};

// 8 nguyên tắc cốt lõi khi kê đơn của WHO (Ô 2.3)
export interface WhoD8Rule {
  step: string;
  nameVi: string;
  nameEn: string;
  questionVi: string;
  questionEn: string;
  descVi: string;
}

export const WHO_D8_RULES: WhoD8Rule[] = [
  {
    step: 'D1',
    nameVi: 'Chẩn đoán',
    nameEn: 'Diagnosis',
    questionVi: 'Chẩn đoán lâm sàng là gì? Có bằng chứng nhiễm khuẩn đáng kể không?',
    questionEn: 'What is the clinical diagnosis? Is there significant evidence of bacterial infection?',
    descVi: 'Xác định rõ vị trí nhiễm khuẩn, phân biệt với nhiễm vi-rút hoặc bệnh không nhiễm trùng.'
  },
  {
    step: 'D2',
    nameVi: 'Quyết định',
    nameEn: 'Decision',
    questionVi: 'Sử dụng kháng sinh có thực sự cần thiết không? Có cần nuôi cấy/xét nghiệm không?',
    questionEn: 'Is antibiotic treatment truly necessary? Should cultures or diagnostic tests be performed?',
    descVi: 'Xem xét chiến lược Chăm sóc không dùng kháng sinh nếu bệnh nhẹ, tự giới hạn.'
  },
  {
    step: 'D3',
    nameVi: 'Thuốc',
    nameEn: 'Drug',
    questionVi: 'Kê đơn loại kháng sinh nào? Thuộc nhóm Tiếp cận, Giám sát hay Dự trữ?',
    questionEn: 'Which antibiotic to prescribe? Does it belong to Access, Watch, or Reserve?',
    descVi: 'Ưu tiên phổ hẹp nhất (nhóm Tiếp cận). Kiểm tra tiền sử dị ứng, chống chỉ định và tương tác thuốc.'
  },
  {
    step: 'D4',
    nameVi: 'Liều dùng',
    nameEn: 'Dose',
    questionVi: 'Liều lượng thế nào, ngày dùng mấy lần? Có cần chỉnh liều suy thận/suy gan không?',
    questionEn: 'What is the dosage and dosing frequency? Is dose adjustment needed for renal/hepatic impairment?',
    descVi: 'Đạt mục tiêu PK/PD, dùng liều nạp nếu cần (Colistin, Teicoplanin) và hiệu chỉnh theo CrCl.'
  },
  {
    step: 'D5',
    nameVi: 'Cấp phát',
    nameEn: 'Dispense',
    questionVi: 'Dạng bào chế nào? Nếu dùng đường tĩnh mạch thì khi nào chuyển sang đường uống?',
    questionEn: 'Which formulation? When to switch from IV to oral route?',
    descVi: 'Chuyển sang đường uống (IV-to-oral switch) sớm nhất có thể khi bệnh nhân cải thiện lâm sàng.'
  },
  {
    step: 'D6',
    nameVi: 'Thời gian',
    nameEn: 'Duration',
    questionVi: 'Điều trị trong bao lâu? Khi nào dừng?',
    questionEn: 'What is the treatment duration? When to stop?',
    descVi: 'Áp dụng liệu trình ngắn ngày nhất có bằng chứng lâm sàng (phần lớn 3-5 ngày, tránh kéo dài).'
  },
  {
    step: 'D7',
    nameVi: 'Trao đổi',
    nameEn: 'Discuss',
    questionVi: 'Đã tư vấn cho bệnh nhân về chẩn đoán, diễn tiến triệu chứng và tác dụng phụ chưa?',
    questionEn: 'Have you discussed the diagnosis, expected course, and potential side effects with the patient?',
    descVi: 'Hướng dẫn bệnh nhân dấu hiệu nguy hiểm cần tái khám và cách xử lý thuốc còn thừa.'
  },
  {
    step: 'D8',
    nameVi: 'Đưa vào hồ sơ',
    nameEn: 'Document',
    questionVi: 'Đã ghi chép đầy đủ chỉ định, kế hoạch điều trị và lý do dùng kháng sinh vào hồ sơ chưa?',
    questionEn: 'Have all decisions, indications, and management plans been documented in the patient record?',
    descVi: 'Lưu trữ hồ sơ y bạ phục vụ giám sát sử dụng kháng sinh (Antimicrobial Stewardship).'
  }
];

// Bảng phản ứng chéo dị ứng Beta-lactam theo WHO (Bảng 3.2 & 3.3)
export interface WhoCrossReactivityItem {
  pairVi: string;
  pairEn: string;
  crossRate: string;
  safetyVi: string;
  safetyEn: string;
  noteVi: string;
}

export const WHO_CROSS_REACTIVITY: WhoCrossReactivityItem[] = [
  {
    pairVi: 'Penicillin và Cephalosporin',
    pairEn: 'Penicillins and Cephalosporins',
    crossRate: '< 2%',
    safetyVi: 'An toàn sử dụng trong hầu hết các trường hợp dị ứng penicillin không nghiêm trọng và ngược lại.',
    safetyEn: 'Cephalosporins can be safely used in most non-severe penicillin allergy cases and vice versa.',
    noteVi: 'Trừ khi có tiền sử sốc phản vệ đe dọa tính mạng, hội chứng Stevens-Johnson hoặc phản ứng nặng qua trung gian IgE.'
  },
  {
    pairVi: 'Penicillin và Carbapenem',
    pairEn: 'Penicillins and Carbapenems',
    crossRate: '< 1%',
    safetyVi: 'Carbapenem có thể được sử dụng an toàn trong hầu hết các trường hợp dị ứng penicillin và ngược lại.',
    safetyEn: 'Carbapenems can be safely used in almost all cases of penicillin allergy.',
    noteVi: 'Tỷ lệ phản ứng chéo thực tế cực thấp (<1%). Tránh dùng nếu có sốc phản vệ nặng với beta-lactam.'
  },
  {
    pairVi: 'Penicillin và Monobactam (Aztreonam)',
    pairEn: 'Penicillins and Monobactams (Aztreonam)',
    crossRate: '0%',
    safetyVi: 'Monobactam có thể được sử dụng an toàn trong trường hợp dị ứng với penicillin, cephalosporin hoặc carbapenem.',
    safetyEn: 'Monobactams can be safely used in beta-lactam allergy without cross-reactivity.',
    noteVi: 'Ngoại lệ duy nhất: Tránh dùng Aztreonam nếu bệnh nhân dị ứng với Ceftazidime vì có cấu trúc chuỗi bên giống hệt nhau.'
  }
];

// Bảng tác dụng dự kiến của kháng sinh nhóm Dự trữ đối với vi khuẩn đa kháng (Bảng 41.1 của WHO)
export interface WhoReserveActivity {
  drugName: string;
  esbl: '+' | '+/-' | '-';
  kpc: '+' | '+/-' | '-';
  mbl: '+' | '+/-' | '-'; // NDM, VIM, IMP
  ampc: '+' | '+/-' | '-';
  oxa48: '+' | '+/-' | '-';
  pseudomonas: '+' | '+/-' | '-';
  acinetobacter: '+' | '+/-' | '-';
  clinicalNoteVi: string;
}

export const WHO_RESERVE_ACTIVITY: WhoReserveActivity[] = [
  {
    drugName: 'Cefiderocol',
    esbl: '+',
    kpc: '+',
    mbl: '+',
    ampc: '+',
    oxa48: '+',
    pseudomonas: '+',
    acinetobacter: '+',
    clinicalNoteVi: 'Cephalosporin siderophore; có hoạt tính trên MBL (NDM, VIM). Thận trọng với A. baumannii do thử nghiệm lâm sàng báo cáo tỷ lệ tử vong cao hơn liệu pháp so sánh.'
  },
  {
    drugName: 'Ceftazidime + Avibactam',
    esbl: '+',
    kpc: '+',
    mbl: '-',
    ampc: '+',
    oxa48: '+',
    pseudomonas: '+',
    acinetobacter: '-',
    clinicalNoteVi: 'Chất ức chế serine-beta-lactamase (KPC, OXA-48). KHÔNG có hoạt tính trên vi khuẩn sinh MBL trừ khi phối hợp với Aztreonam. Cần thêm Metronidazole nếu nhiễm trùng ổ bụng.'
  },
  {
    drugName: 'Meropenem + Vaborbactam',
    esbl: '+',
    kpc: '+',
    mbl: '-',
    ampc: '+',
    oxa48: '-',
    pseudomonas: '+/-',
    acinetobacter: '-',
    clinicalNoteVi: 'Rất mạnh trên KPC sinh bởi Enterobacterales. Không có hoạt tính trên OXA-48 hoặc MBL.'
  },
  {
    drugName: 'Plazomicin',
    esbl: '+',
    kpc: '+',
    mbl: '+/-',
    ampc: '+',
    oxa48: '+',
    pseudomonas: '-',
    acinetobacter: '-',
    clinicalNoteVi: 'Aminoglycoside thế hệ mới kháng lại men biến đổi aminoglycoside. Dùng 1 lần/ngày. Không có hoạt tính trên P. aeruginosa và A. baumannii.'
  },
  {
    drugName: 'Polymyxin B & Colistin',
    esbl: '+',
    kpc: '+',
    mbl: '+',
    ampc: '+',
    oxa48: '+',
    pseudomonas: '+',
    acinetobacter: '+',
    clinicalNoteVi: 'Lựa chọn cứu cánh cho trực khuẩn Gram âm đa kháng (CRAB, CRPA, CRE). Độc tính thận và thần kinh cao; bắt buộc dùng liều nạp.'
  },
  {
    drugName: 'Fosfomycin (IV)',
    esbl: '+',
    kpc: '+/-',
    mbl: '+/-',
    ampc: '+',
    oxa48: '+/-',
    pseudomonas: '+/-',
    acinetobacter: '-',
    clinicalNoteVi: 'Thường dùng phối hợp với các kháng sinh khác để tránh phát sinh đột biến đề kháng nhanh. Theo dõi quá tải natri và hạ kali máu.'
  }
];

// Danh mục 35 bệnh lý lâm sàng tiêu biểu theo Hướng dẫn AWaRe của WHO
export const WHO_DISEASE_GUIDELINES: WhoDiseaseGuideline[] = [
  {
    id: 'who-cap-mild',
    chapterNumber: 12,
    nameVi: 'Viêm phổi mắc phải tại cộng đồng – Thể nhẹ (CAP)',
    nameEn: 'Community-Acquired Pneumonia – Mild (CAP)',
    category: 'primary_care',
    categoryLabelVi: 'Chăm sóc sức khỏe ban đầu',
    categoryLabelEn: 'Primary Health Care',
    definitionVi: 'Bệnh cấp tính ảnh hưởng đến nhu mô phổi, đặc trưng bởi ho, sốt (>38°C), thở nhanh, khó thở nhẹ, không có tiêu chí nặng theo CURB-65.',
    definitionEn: 'Acute lower respiratory infection characterized by cough, fever, tachypnoea, without severity signs on CURB-65.',
    commonPathogens: {
      bacterial: ['Streptococcus pneumoniae (Phế cầu)', 'Haemophilus influenzae', 'Moraxella catarrhalis', 'Mycoplasma pneumoniae'],
      viral: ['Vi-rút cúm (A, B)', 'RSV', 'SARS-CoV-2', 'Rhinovirus']
    },
    clinicalPresentationVi: 'Khởi phát ho < 2 tuần, có đờm hoặc khó thở nhẹ, sốt ≥ 38°C. Điểm CURB-65 từ 0 đến 1 điểm.',
    clinicalPresentationEn: 'New cough < 2 weeks, fever, mild shortness of breath. CURB-65 score 0-1.',
    nonAntibioticCareVi: 'Bù đủ nước, nghỉ ngơi, dùng Paracetamol 500mg - 1g mỗi 4-6 giờ hoặc Ibuprofen 200-400mg mỗi 6-8 giờ hạ sốt giảm đau.',
    firstLineAdult: 'Amoxicillin: 1 g đường uống mỗi 8 giờ (hoặc Phenoxymethylpenicillin 500 mg (800.000 IU) mỗi 6 giờ)',
    firstLinePediatric: 'Amoxicillin đường uống: 80–90 mg/kg/ngày chia 2 lần (cách nhau 12 giờ)',
    secondLineAdult: 'Amoxicillin+clavulanic acid: 875 mg + 125 mg uống mỗi 8 giờ HOẶC Doxycycline 100 mg uống mỗi 12 giờ',
    secondLinePediatric: 'Trẻ không đáp ứng đầu tay sau 48-72h: Chuyển tuyến hoặc hội chẩn chuyên khoa nhi.',
    durationVi: '5 ngày (ở trẻ em không rút lõm lồng ngực và vùng tỷ lệ HIV thấp có thể dùng 3 ngày)',
    durationEn: '5 days (3 days for non-severe children in low-HIV prevalence settings)',
    clinicalNotesVi: 'Phế cầu kháng penicillin mức độ thấp và trung bình vẫn đáp ứng rất tốt với Amoxicillin liều cao (1g q8h ở người lớn hoặc 80-90mg/kg/ngày ở trẻ em).',
    awareClasses: {
      firstLine: ['Access'],
      secondLine: ['Access']
    }
  },
  {
    id: 'who-cap-severe',
    chapterNumber: 27,
    nameVi: 'Viêm phổi mắc phải tại cộng đồng – Thể nặng (CAP)',
    nameEn: 'Community-Acquired Pneumonia – Severe (CAP)',
    category: 'hospital',
    categoryLabelVi: 'Bệnh viện',
    categoryLabelEn: 'Hospital Care',
    definitionVi: 'Viêm phổi cộng đồng có suy hô hấp, rối loạn huyết động hoặc điểm CURB-65 ≥ 2 điểm cần nhập viện điều trị tích cực.',
    definitionEn: 'Severe CAP requiring hospitalization and parenteral therapy (CURB-65 score >= 2).',
    commonPathogens: {
      bacterial: ['Streptococcus pneumoniae', 'Staphylococcus aureus', 'Legionella pneumophila', 'Enterobacterales', 'Mycoplasma pneumoniae'],
      viral: ['Vi-rút cúm (A, B)', 'SARS-CoV-2', 'RSV']
    },
    clinicalPresentationVi: 'Khó thở nặng, tím tái, nhịp thở > 30 l/p, SpO2 giảm, huyết áp tụt, lú lẫn hoặc người cao tuổi ≥ 65 tuổi (CURB-65 ≥ 2).',
    clinicalPresentationEn: 'Tachypnea >30/min, hypoxemia, hypotension, confusion, CURB-65 >= 2.',
    firstLineAdult: 'Ceftriaxone 2 g TTM mỗi 24 giờ HOẶC Cefotaxime 2 g TTM mỗi 8 giờ; NẾU CURB-65 ≥ 2: BỔ SUNG Clarithromycin 500 mg uống/TTM mỗi 12 giờ',
    firstLinePediatric: 'Amoxicillin hoặc Ampicillin 50 mg/kg/liều TTM mỗi 8 giờ VÀ Gentamicin 7,5 mg/kg TTM mỗi ngày 1 lần',
    secondLineAdult: 'Amoxicillin+clavulanic acid 1 g + 200 mg TTM mỗi 8 giờ (có thể tăng 1.2g q6h) + Clarithromycin 500 mg q12h',
    secondLinePediatric: 'Cefotaxime 50 mg/kg mỗi 8 giờ HOẶC Ceftriaxone 80 mg/kg mỗi 24 giờ TTM',
    durationVi: '5 ngày (đánh giá kéo dài nếu chưa ổn định lâm sàng hoặc có biến chứng mủ màng phổi)',
    durationEn: '5 days (prolong if clinically unstable or complications like empyema occur)',
    clinicalNotesVi: 'Phối hợp thêm Clarithromycin giúp bao phủ các tác nhân không điển hình (Legionella, Mycoplasma). Chuyển xuống đường uống khi hết sốt 48 giờ.',
    awareClasses: {
      firstLine: ['Watch', 'Watch'],
      secondLine: ['Access', 'Watch']
    }
  },
  {
    id: 'who-hap-vap',
    chapterNumber: 28,
    nameVi: 'Viêm phổi bệnh viện (HAP) & Viêm phổi thở máy (VAP)',
    nameEn: 'Hospital-Acquired Pneumonia (HAP) & Ventilator-Associated (VAP)',
    category: 'hospital',
    categoryLabelVi: 'Bệnh viện',
    categoryLabelEn: 'Hospital Care',
    definitionVi: 'Bệnh nhiễm khuẩn phổi khởi phát sau ≥ 48 giờ kể từ khi nhập viện hoặc đặt ống nội khí quản.',
    definitionEn: 'Pneumonia developing 48 hours or more after hospital admission or endotracheal intubation.',
    commonPathogens: {
      bacterial: ['Pseudomonas aeruginosa', 'Acinetobacter baumannii', 'Klebsiella pneumoniae (sinh ESBL/KPC)', 'Staphylococcus aureus (MRSA)', 'Enterobacterales']
    },
    clinicalPresentationVi: 'Sốt mới xuất hiện, tăng tiết đờm mủ đường thở, suy hô hấp, thâm nhiễm mới trên X-quang phổi.',
    clinicalPresentationEn: 'New fever, purulent respiratory secretions, worsening gas exchange, new infiltrates.',
    firstLineAdult: 'Không thở máy (nguy cơ thấp): Amoxicillin+clavulanic acid 1,2 g TTM mỗi 8h HOẶC Cefotaxime 2 g TTM mỗi 8h HOẶC Ceftriaxone 2 g TTM mỗi 24h. Nguy cơ P. aeruginosa: Piperacillin+tazobactam 4,5 g TTM mỗi 6 giờ.',
    firstLinePediatric: 'Amoxicillin+clavulanic acid 50 mg/kg amox TTM mỗi 8h HOẶC Cefotaxime 50 mg/kg mỗi 8h TTM. Nguy cơ trực khuẩn mủ xanh: Piperacillin+tazobactam 100 mg/kg mỗi 8h.',
    secondLineAdult: 'Nghi ngờ MRSA: Bổ sung Vancomycin 15-20 mg/kg mỗi 12 giờ TTM.',
    secondLinePediatric: 'Nghi ngờ MRSA: Bổ sung Vancomycin 15 mg/kg mỗi 8 giờ TTM.',
    durationVi: '7 ngày (đánh giá lại chẩn đoán nếu sau ngày 7 chưa ổn định lâm sàng)',
    durationEn: '7 days (re-evaluate if clinically unstable at day 7)',
    clinicalNotesVi: 'Tránh lạm dụng kháng sinh nhóm Dự trữ khi chưa có kết quả cấy vi sinh. Xuống thang điều trị ngay khi có kháng sinh đồ.',
    awareClasses: {
      firstLine: ['Access', 'Watch'],
      secondLine: ['Watch']
    }
  },
  {
    id: 'who-uti-lower',
    chapterNumber: 23,
    nameVi: 'Nhiễm khuẩn đường tiết niệu dưới (Viêm bàng quang cấp)',
    nameEn: 'Lower Urinary Tract Infection (Acute Cystitis)',
    category: 'primary_care',
    categoryLabelVi: 'Chăm sóc sức khỏe ban đầu',
    categoryLabelEn: 'Primary Health Care',
    definitionVi: 'Nhiễm khuẩn cấp tính niêm mạc bàng quang, chủ yếu mắc phải tại cộng đồng.',
    definitionEn: 'Acute non-obstructive bacterial infection of the bladder mucosa in the community.',
    commonPathogens: {
      bacterial: ['Escherichia coli (>80%)', 'Klebsiella pneumoniae', 'Proteus mirabilis', 'Staphylococcus saprophyticus', 'Enterococcus faecalis']
    },
    clinicalPresentationVi: 'Tiểu buốt, tiểu rắt, tiểu nhiều lần, đau tức vùng hạ vị/xương mu, nước tiểu đục hoặc có máu vi thể. Không có sốt cao hay đau hông lưng.',
    clinicalPresentationEn: 'Dysuria, urgency, frequency, suprapubic tenderness. No high fever or flank pain.',
    nonAntibioticCareVi: 'Uống nhiều nước, có thể dùng thuốc giảm đau bàng quang hoặc paracetamol giảm đau tức hạ vị.',
    firstLineAdult: 'Nitrofurantoin: 100 mg uống mỗi 12 giờ (dạng phóng thích biến đổi) hoặc 50 mg mỗi 6 giờ x 5 ngày; HOẶC Amoxicillin+clavulanic acid: 500 mg + 125 mg uống mỗi 8 giờ x 3–5 ngày',
    firstLinePediatric: 'Nitrofurantoin uống: 2 mg/kg/liều mỗi 12 giờ x 5 ngày; HOẶC Amox+Clav uống: 80-90 mg/kg/ngày thành phần amox chia 2-3 lần x 3-5 ngày',
    secondLineAdult: 'Sulfamethoxazole+trimethoprim: 800 mg + 160 mg uống mỗi 12 giờ x 3 ngày (chỉ dùng nếu tỷ lệ kháng tại địa phương < 20%) HOẶC Trimethoprim 200 mg q12h x 3 ngày',
    secondLinePediatric: 'Sulfamethoxazole+trimethoprim: 20 mg/kg SMX + 4 mg/kg TMP mỗi 12 giờ x 3 ngày',
    durationVi: '3–5 ngày đối với phụ nữ không mang thai (nam giới 7 ngày, phụ nữ có thai 5 ngày)',
    durationEn: '3-5 days for non-pregnant women (7 days in men, 5 days in pregnancy)',
    clinicalNotesVi: 'Nitrofurantoin là kháng sinh lựa chọn hàng đầu vì duy trì nồng độ rất cao trong nước tiểu, ít ảnh hưởng hệ vi sinh đường ruột và giữ được hoạt tính tốt trên nhiều chủng E. coli sinh ESBL. KHÔNG dùng Nitrofurantoin khi nghi ngờ viêm bể thận vì nồng độ trong mô thận rất thấp.',
    awareClasses: {
      firstLine: ['Access'],
      secondLine: ['Access']
    }
  },
  {
    id: 'who-uti-upper',
    chapterNumber: 34,
    nameVi: 'Nhiễm khuẩn đường tiết niệu trên (Viêm bể thận cấp)',
    nameEn: 'Upper Urinary Tract Infection (Acute Pyelonephritis)',
    category: 'hospital',
    categoryLabelVi: 'Bệnh viện & Ngoại trú',
    categoryLabelEn: 'Hospital Care',
    definitionVi: 'Nhiễm khuẩn cấp tính nhu mô thận và đài bể thận, có thể dẫn đến nhiễm khuẩn huyết.',
    definitionEn: 'Acute bacterial infection of the renal parenchyma and pelvicalyceal system.',
    commonPathogens: {
      bacterial: ['Escherichia coli (>80%)', 'Klebsiella pneumoniae', 'Proteus mirabilis', 'Enterococcus spp.', 'Pseudomonas aeruginosa']
    },
    clinicalPresentationVi: 'Sốt cao, rét run, đau hông lưng một hoặc hai bên, gõ rung thận (+), kèm triệu chứng kích thích đường tiểu (tiểu buốt, tiểu rắt).',
    clinicalPresentationEn: 'Fever, rigors, flank pain, costovertebral angle tenderness, dysuria.',
    firstLineAdult: 'Thể nhẹ/ngoại trú: Ciprofloxacin 500 mg uống mỗi 12 giờ x 7 ngày. Thể nặng/nhập viện: Ceftriaxone 1 g TTM mỗi 24 giờ HOẶC Cefotaxime 1 g TTM mỗi 8 giờ (+/- Amikacin 15 mg/kg mỗi 24h TTM nếu nguy cơ ESBL cao)',
    firstLinePediatric: 'Trẻ nhẹ: Ciprofloxacin 15 mg/kg mỗi 12 giờ. Trẻ nặng: Cefotaxime 50 mg/kg mỗi 8 giờ HOẶC Ceftriaxone 80 mg/kg mỗi 24 giờ TTM (+/- Gentamicin 7,5 mg/kg/ngày)',
    secondLineAdult: 'Nghi ngờ ESBL: Cân nhắc phác đồ tiết kiệm Carbapenem bằng Amikacin 15 mg/kg/ngày TTM hoặc Piperacillin+tazobactam 4.5g q6h.',
    secondLinePediatric: 'Amikacin 15 mg/kg/ngày TTM kết hợp Ceftriaxone/Cefotaxime.',
    durationVi: '7 ngày (nam giới có kèm viêm tuyến tiền liệt có thể cần 14 ngày)',
    durationEn: '7 days (longer if prostatic involvement in men)',
    clinicalNotesVi: 'Phải cấy nước tiểu trước liều kháng sinh đầu tiên. Giảm bậc xuống kháng sinh đường uống ngay sau 48-72 giờ khi bệnh nhân hết sốt và cải thiện lâm sàng.',
    awareClasses: {
      firstLine: ['Watch', 'Access'],
      secondLine: ['Access', 'Watch']
    }
  },
  {
    id: 'who-sepsis-adult',
    chapterNumber: 24,
    nameVi: 'Nhiễm khuẩn huyết & Sốc nhiễm khuẩn ở người lớn (Sepsis-3)',
    nameEn: 'Adult Sepsis & Septic Shock (Sepsis-3)',
    category: 'hospital',
    categoryLabelVi: 'Bệnh viện - Cấp cứu',
    categoryLabelEn: 'Hospital - Emergency & ICU',
    definitionVi: 'Rối loạn chức năng đa tạng đe dọa tính mạng do phản ứng của cơ thể đối với nhiễm khuẩn bị mất kiểm soát (tăng điểm SOFA ≥ 2).',
    definitionEn: 'Life-threatening organ dysfunction caused by a dysregulated host response to infection (delta SOFA >= 2).',
    commonPathogens: {
      bacterial: ['Escherichia coli', 'Klebsiella pneumoniae', 'Staphylococcus aureus (gồm MRSA)', 'Streptococcus pneumoniae', 'Pseudomonas aeruginosa', 'Acinetobacter baumannii']
    },
    clinicalPresentationVi: 'Sốt cao hoặc hạ thân nhiệt, thở nhanh (≥22 l/p), tụt huyết áp (HATB < 65 mmHg hoặc HA tâm thu ≤ 100 mmHg), tri giác suy giảm (GCS < 15), thiểu niệu, lactate máu > 2 mmol/L.',
    clinicalPresentationEn: 'Fever or hypothermia, tachypnea >=22/min, hypotension MAP <65, altered mental state, oliguria, lactate >2 mmol/L.',
    firstLineAdult: 'Không rõ nguồn: Ceftriaxone 2 g TTM mỗi 24 giờ HOẶC Cefotaxime 2 g TTM mỗi 8 giờ KẾT HỢP VỚI Amikacin 15 mg/kg/ngày TTM (hoặc Gentamicin 5 mg/kg/ngày). Nếu từ ổ bụng: thêm Metronidazole 500 mg q8h.',
    firstLinePediatric: 'Xem chương Nhiễm khuẩn huyết sơ sinh & trẻ em.',
    secondLineAdult: 'Nguy cơ cao trực khuẩn Gram âm kháng thuốc/bệnh viện: Piperacillin+tazobactam 4,5 g q6h HOẶC Meropenem 1-2 g q8h TTM. Nếu nghi ngờ MRSA: thêm Vancomycin 15-20 mg/kg q12h TTM.',
    secondLinePediatric: 'Cefotaxime/Ceftriaxone kết hợp Gentamicin/Amikacin.',
    durationVi: '7 ngày đối với nhiễm khuẩn huyết không rõ nguồn (hoặc tùy theo nguồn nhiễm đã được kiểm soát)',
    durationEn: '7 days for sepsis of unknown source (individualize based on source control)',
    clinicalNotesVi: 'Bắt đầu tiêm kháng sinh đường tĩnh mạch trong vòng 1 giờ đầu (Golden Hour) sau khi phát hiện sốc nhiễm khuẩn. Lấy 2 bộ cấy máu trước khi dùng thuốc nhưng không được trì hoãn truyền kháng sinh.',
    awareClasses: {
      firstLine: ['Watch', 'Access'],
      secondLine: ['Watch', 'Reserve']
    }
  },
  {
    id: 'who-sepsis-peds',
    chapterNumber: 25,
    nameVi: 'Nhiễm khuẩn huyết ở trẻ sơ sinh (<28 ngày) & Trẻ em (28 ngày–12 tuổi)',
    nameEn: 'Neonatal (<28 days) & Pediatric Sepsis (28 days–12 years)',
    category: 'hospital',
    categoryLabelVi: 'Bệnh viện - Nhi khoa',
    categoryLabelEn: 'Hospital - Pediatrics & NICU',
    definitionVi: 'Tình trạng nhiễm khuẩn toàn thân nghiêm trọng ở trẻ sơ sinh và trẻ nhỏ với các dấu hiệu nguy hiểm (PSBI / pSOFA).',
    definitionEn: 'Life-threatening systemic bacterial infection in neonates and children meeting PSBI or pSOFA criteria.',
    commonPathogens: {
      bacterial: ['Streptococcus agalactiae (GBS)', 'Escherichia coli', 'Listeria monocytogenes', 'Klebsiella pneumoniae', 'Staphylococcus aureus']
    },
    clinicalPresentationVi: 'Bỏ bú, li bì, co giật, thở nhanh > 60 l/p, rút lõm ngực nặng, sốt > 38°C hoặc hạ thân nhiệt < 35.5°C, vàng da sớm.',
    clinicalPresentationEn: 'Poor feeding, lethargy, seizures, tachypnea >60, chest indrawing, hypothermia <35.5C or fever.',
    firstLineAdult: 'Áp dụng phác đồ Người lớn.',
    firstLinePediatric: 'Sơ sinh: Ampicillin 50 mg/kg mỗi 12h (tuần đầu) hoặc mỗi 8h (>1 tuần) TTM KẾT HỢP Gentamicin 5 mg/kg mỗi 24h TTM (hoặc Benzylpenicillin + Gentamicin). Trẻ lớn: Ceftriaxone 80 mg/kg q24h hoặc Cefotaxime 50 mg/kg q8h.',
    secondLineAdult: 'N/A',
    secondLinePediatric: 'Cefotaxime 50 mg/kg mỗi 8h TTM HOẶC Cloxacillin 25-50 mg/kg mỗi 6-12h TTM kết hợp Amikacin 15 mg/kg mỗi 24h TTM.',
    durationVi: '7 ngày (14 ngày nếu có biến chứng viêm màng não)',
    durationEn: '7 days (14 days if concurrent meningitis)',
    clinicalNotesVi: 'Ampicillin bao phủ Listeria monocytogenes và Enterococcus; Gentamicin hiệp đồng diệt trực khuẩn Gram âm và liên cầu B. Không dùng Ceftriaxone cho trẻ sơ sinh bị tăng bilirubin máu hoặc truyền canxi.',
    awareClasses: {
      firstLine: ['Access', 'Access'],
      secondLine: ['Watch', 'Access']
    }
  },
  {
    id: 'who-meningitis',
    chapterNumber: 26,
    nameVi: 'Viêm màng não do vi khuẩn',
    nameEn: 'Bacterial Meningitis',
    category: 'hospital',
    categoryLabelVi: 'Bệnh viện - Cấp cứu thần kinh',
    categoryLabelEn: 'Hospital - Neurological Emergency',
    definitionVi: 'Tình trạng viêm cấp tính màng não và tủy sống do vi khuẩn xâm nhập vào dịch não tủy, có nguy cơ tử vong và di chứng thần kinh rất cao.',
    definitionEn: 'Acute purulent bacterial infection of the meninges and subarachnoid space.',
    commonPathogens: {
      bacterial: ['Streptococcus pneumoniae (Phế cầu)', 'Neisseria meningitidis (Não mô cầu)', 'Haemophilus influenzae type b', 'Listeria monocytogenes (người già >50t, thai phụ, sơ sinh)']
    },
    clinicalPresentationVi: 'Khởi phát cấp <48 giờ: tam chứng sốt cao, đau đầu dữ dội, cứng cổ, kèm thay đổi tri giác hoặc ban xuất huyết hoại tử (não mô cầu).',
    clinicalPresentationEn: 'Acute fever, severe headache, neck stiffness, altered mental status, purpura fulminans.',
    firstLineAdult: 'Ceftriaxone 2 g TTM mỗi 12 giờ (tổng 4 g/ngày) HOẶC Cefotaxime 2 g TTM mỗi 6 giờ (tổng 8 g/ngày). NẾU ≥ 50 TUỔI HOẶC CÓ THAI: BỔ SUNG Ampicillin 2 g TTM mỗi 4 giờ (để diệt Listeria).',
    firstLinePediatric: 'Trẻ > 1 tháng: Ceftriaxone 100 mg/kg mỗi 24 giờ TTM HOẶC Cefotaxime 50 mg/kg mỗi 8 giờ TTM. Trẻ sơ sinh (<1 tháng): Ampicillin 50 mg/kg q8-12h + Cefotaxime 50 mg/kg q6-12h.',
    secondLineAdult: 'Chloramphenicol 1 g TTM mỗi 6 giờ (chỉ dùng khi dị ứng nặng và không còn lựa chọn khác).',
    secondLinePediatric: 'Meropenem 40 mg/kg mỗi 8 giờ TTM nếu nghi ngờ trực khuẩn Gram âm đa kháng.',
    durationVi: 'Phế cầu: 10–14 ngày; Não mô cầu: 5–7 ngày; Listeria: 21 ngày; Chưa rõ căn nguyên: 10 ngày (trẻ sơ sinh 3 tuần)',
    durationEn: 'S. pneumoniae: 10-14 days; N. meningitidis: 5-7 days; Listeria: 21 days; Unknown: 10 days',
    clinicalNotesVi: 'Dexamethasone 0,15 mg/kg mỗi 6 giờ tiêm tĩnh mạch dùng ngay trước hoặc cùng liều kháng sinh đầu tiên để giảm viêm và di chứng điếc/thần kinh. Chỉ tiếp tục nếu phân lập được Phế cầu.',
    awareClasses: {
      firstLine: ['Watch', 'Access'],
      secondLine: ['Access', 'Watch']
    }
  },
  {
    id: 'who-c-difficile',
    chapterNumber: 33,
    nameVi: 'Nhiễm khuẩn đường tiêu hóa do Clostridioides difficile (CDI)',
    nameEn: 'Clostridioides difficile Infection (CDI)',
    category: 'hospital',
    categoryLabelVi: 'Bệnh viện & Ngoại trú',
    categoryLabelEn: 'Hospital Care',
    definitionVi: 'Viêm đại tràng do độc tố của C. difficile, thường khởi phát sau khi dùng kháng sinh phổ rộng.',
    definitionEn: 'Toxin-mediated colitis caused by Clostridioides difficile, typically following antibiotic exposure.',
    commonPathogens: {
      bacterial: ['Clostridioides difficile (đặc biệt chủng sinh độc tố A/B, chủng dịch tễ BI/NAP1/027)']
    },
    clinicalPresentationVi: 'Tiêu chảy phân lỏng ≥ 3 lần/24 giờ, đau quặn bụng, sốt, tăng bạch cầu. Thể nặng: phình đại tràng nhiễm độc, viêm đại tràng giả mạc.',
    clinicalPresentationEn: 'Watery diarrhea >= 3 times/24h, abdominal cramps, leukocytosis, toxic megacolon.',
    firstLineAdult: 'Vancomycin: 125 mg ĐƯỜNG UỐNG mỗi 6 giờ x 10 ngày (Vancomycin đường uống không hấp thu, tác dụng tại chỗ trong lòng ruột).',
    firstLinePediatric: 'Vancomycin đường uống: 5–10 mg/kg mỗi 6 giờ x 10 ngày (tối đa 125 mg/liều).',
    secondLineAdult: 'Metronidazole: 500 mg ĐƯỜNG UỐNG mỗi 8 giờ x 10 ngày (chỉ dành cho đợt đầu tiên thể nhẹ khi không có vancomycin uống). Nếu thể tối cấp/nặng: Vancomycin uống 500 mg q6h phối hợp Metronidazole 500 mg q8h TTM.',
    secondLinePediatric: 'Metronidazole uống: 7,5 mg/kg mỗi 8 giờ x 10 ngày.',
    durationVi: '10 ngày',
    durationEn: '10 days',
    clinicalNotesVi: 'QUAN TRỌNG: Ngừng ngay lập tức tất cả các kháng sinh phổ rộng không cần thiết đang dùng trước đó. Vancomycin tiêm tĩnh mạch KHÔNG có tác dụng trên C. difficile ruột vì không thải vào lòng đại tràng, bắt buộc phải dùng Vancomycin ĐƯỜNG UỐNG.',
    awareClasses: {
      firstLine: ['Watch'],
      secondLine: ['Access']
    }
  },
  {
    id: 'who-intra-abdominal',
    chapterNumber: 29,
    nameVi: 'Nhiễm khuẩn ổ bụng – Viêm ruột thừa, Viêm túi mật & Viêm đường mật',
    nameEn: 'Intra-abdominal Infections (Appendicitis, Cholecystitis, Cholangitis)',
    category: 'hospital',
    categoryLabelVi: 'Bệnh viện - Ngoại khoa',
    categoryLabelEn: 'Hospital - Surgical',
    definitionVi: 'Nhiễm khuẩn cấp tính trong khoang bụng và đường mật, thường do phối hợp vi khuẩn gram âm đường ruột và vi khuẩn kỵ khí.',
    definitionEn: 'Acute polymicrobial peritoneal and biliary infections requiring source control and antimicrobial therapy.',
    commonPathogens: {
      bacterial: ['Escherichia coli', 'Klebsiella pneumoniae', 'Bacteroides fragilis (Kỵ khí)', 'Enterococcus spp.', 'Streptococcus anginosus group']
    },
    clinicalPresentationVi: 'Đau bụng cấp khu trú (hạ sườn phải hoặc hố chậu phải), sốt, buồn nôn, phản ứng thành bụng hoặc viêm phúc mạc, vàng da (viêm đường mật).',
    clinicalPresentationEn: 'Acute abdominal pain (RUQ or RLQ), fever, rebound tenderness, jaundice in cholangitis.',
    firstLineAdult: 'Thể nhẹ/vừa: Amoxicillin+clavulanic acid 1,2 g TTM mỗi 8 giờ (hoặc uống 875/125mg q8h) HOẶC Cefotaxime 2 g q8h TTM / Ceftriaxone 2 g q24h TTM KẾT HỢP Metronidazole 500 mg TTM mỗi 8 giờ.',
    firstLinePediatric: 'Amox+Clav 50 mg/kg amox TTM mỗi 8 giờ HOẶC Ampicillin 50 mg/kg q8h + Gentamicin 7,5 mg/kg/ngày + Metronidazole 7,5 mg/kg q8h.',
    secondLineAdult: 'Nhiễm khuẩn ổ bụng nặng / nguy cơ ESBL: Piperacillin+tazobactam 4,5 g TTM mỗi 6 giờ HOẶC Meropenem 1 g TTM mỗi 8 giờ.',
    secondLinePediatric: 'Piperacillin+tazobactam 100 mg/kg mỗi 8 giờ HOẶC Meropenem 20 mg/kg mỗi 8 giờ TTM.',
    durationVi: '4-5 ngày sau khi đã kiểm soát được nguồn nhiễm khuẩn bằng phẫu thuật/dẫn lưu; trường hợp ruột thừa không thủng cắt xong ngừng kháng sinh.',
    durationEn: '4-5 days following adequate source control (stop after appendectomy if uncomplicated)',
    clinicalNotesVi: 'Kiểm soát nguồn bệnh (dẫn lưu mủ, cắt ruột thừa, cắt túi mật, can thiệp ERCP lấy sỏi mật) là yếu tố quyết định số 1. Kháng sinh luôn phải bao phủ cả vi khuẩn kỵ khí (Bacteroides spp.).',
    awareClasses: {
      firstLine: ['Access', 'Watch', 'Access'],
      secondLine: ['Watch', 'Watch']
    }
  },
  {
    id: 'who-necrotizing-fasciitis',
    chapterNumber: 37,
    nameVi: 'Nhiễm khuẩn mô mềm hoại tử – Viêm cân mạc hoại tử (Necrotizing Fasciitis)',
    nameEn: 'Necrotizing Soft Tissue Infections (Necrotizing Fasciitis)',
    category: 'hospital',
    categoryLabelVi: 'Bệnh viện - Cấp cứu ngoại khoa',
    categoryLabelEn: 'Hospital - Surgical Emergency',
    definitionVi: 'Nhiễm trùng hoại tử tối cấp đe dọa tính mạng ở các mô mềm sâu và cân cơ (vi khuẩn ăn thịt người), tiến triển cực kỳ nhanh chóng.',
    definitionEn: 'Fulminant, life-threatening deep soft tissue infection with progressive fascial necrosis.',
    commonPathogens: {
      bacterial: ['Streptococcus pyogenes (GAS - sinh độc tố)', 'Clostridium perfringens', 'Bacteroides spp.', 'Staphylococcus aureus (MRSA)', 'Enterobacterales', 'Vibrio vulnificus']
    },
    clinicalPresentationVi: 'Đau dữ dội vượt quá mức so với tổn thương ngoài da, da đổi màu xám tím, bọng nước xuất huyết, phù cứng, tiếng lép bép do sinh khí, sốc nhiễm độc.',
    clinicalPresentationEn: 'Severe pain out of proportion to exam, violaceous bullae, crepitus, skin necrosis, toxic shock.',
    firstLineAdult: 'Piperacillin+tazobactam 4,5 g TTM mỗi 6 giờ VÀ Clindamycin 900 mg TTM mỗi 8 giờ (+ Vancomycin 15-20 mg/kg mỗi 12 giờ nếu nghi ngờ MRSA).',
    firstLinePediatric: 'Piperacillin+tazobactam 100 mg/kg mỗi 8h VÀ Clindamycin 10 mg/kg mỗi 8h TTM (+ Vancomycin 15 mg/kg mỗi 8h TTM nếu nghi MRSA).',
    secondLineAdult: 'Nếu loại trừ GAS: Ceftriaxone 2 g q24h TTM + Metronidazole 500 mg q8h TTM + Vancomycin 15-20 mg/kg q12h.',
    secondLinePediatric: 'Ceftriaxone 80 mg/kg q24h TTM + Metronidazole 7,5 mg/kg q8h + Vancomycin.',
    durationVi: '2 đến 3 tuần (tùy thuộc mức độ cắt lọc phẫu thuật và kiểm soát nguồn bệnh)',
    durationEn: '2-3 weeks (guided by debridement completeness and clinical recovery)',
    clinicalNotesVi: 'Phẫu thuật cắt lọc mô hoại tử khẩn cấp là biện pháp sống còn hàng đầu, không được trì hoãn phẫu thuật để chờ chẩn đoán hình ảnh. Clindamycin có tác dụng ức chế tổng hợp độc tố (anti-toxin effect) của liên cầu và tụ cầu.',
    awareClasses: {
      firstLine: ['Watch', 'Access', 'Watch'],
      secondLine: ['Watch', 'Access', 'Watch']
    }
  },
  {
    id: 'who-osteomyelitis',
    chapterNumber: 35,
    nameVi: 'Viêm tủy xương cấp tính do vi khuẩn',
    nameEn: 'Acute Bacterial Osteomyelitis',
    category: 'hospital',
    categoryLabelVi: 'Bệnh viện',
    categoryLabelEn: 'Hospital Care',
    definitionVi: 'Nhiễm khuẩn cấp tính trong xương gây viêm và phá hủy cấu trúc xương bè và tủy xương.',
    definitionEn: 'Acute bacterial infection causing progressive inflammation and destruction of bone and marrow.',
    commonPathogens: {
      bacterial: ['Staphylococcus aureus (>80%, gồm cả MRSA)', 'Streptococcus spp.', 'Kingella kingae (trẻ nhỏ)', 'Salmonella spp. (bệnh hồng cầu hình liềm)', 'Pseudomonas aeruginosa']
    },
    clinicalPresentationVi: 'Đau nhức sâu khu trú trong xương, sưng nóng đỏ tại chỗ, sốt, hạn chế vận động chi hoặc không thể đi lại ở trẻ nhỏ.',
    clinicalPresentationEn: 'Localized bone pain, tenderness, warmth, swelling, fever, refusal to bear weight.',
    firstLineAdult: 'Cloxacillin: 2 g TTM mỗi 6 giờ (có thể tăng 12 g/ngày để tăng nồng độ ngấm vào xương).',
    firstLinePediatric: 'Cloxacillin TTM: 25-50 mg/kg mỗi 6 giờ (uống 15 mg/kg mỗi 6 giờ).',
    secondLineAdult: 'Cefazolin 2 g TTM mỗi 8 giờ HOẶC Ceftriaxone 2 g TTM mỗi 24 giờ HOẶC Clindamycin 600 mg TTM/uống mỗi 8 giờ (nếu nghi ngờ CA-MRSA).',
    secondLinePediatric: 'Cefazolin 25 mg/kg q12h HOẶC Ceftriaxone 80 mg/kg q24h HOẶC Clindamycin 10 mg/kg q8h TTM.',
    durationVi: '4 đến 6 tuần ở người lớn; khoảng 3 tuần ở trẻ em bị nhiễm khuẩn không biến chứng',
    durationEn: '4-6 weeks in adults; ~3 weeks in uncomplicated pediatric cases',
    clinicalNotesVi: 'Kháng sinh điều trị viêm tủy xương cần có khả năng thâm nhập tốt vào mô xương. Cần chụp X-quang hoặc MRI và lấy mẫu sinh thiết/cấy máu để điều trị nhắm đích.',
    awareClasses: {
      firstLine: ['Access'],
      secondLine: ['Watch', 'Watch', 'Access']
    }
  },
  {
    id: 'who-surgical-prophylaxis',
    chapterNumber: 40,
    nameVi: 'Dự phòng phẫu thuật bằng kháng sinh',
    nameEn: 'Surgical Antibiotic Prophylaxis',
    category: 'hospital',
    categoryLabelVi: 'Bệnh viện - Phòng mổ',
    categoryLabelEn: 'Hospital - Operating Room',
    definitionVi: 'Sử dụng kháng sinh trước khi rạch da nhằm đạt nồng độ diệt khuẩn tối đa tại vết mổ trước khi có sự phơi nhiễm vi khuẩn.',
    definitionEn: 'Administration of an effective antimicrobial immediately before incision to prevent surgical site infection.',
    commonPathogens: {
      bacterial: ['Staphylococcus aureus', 'Coagulase-negative Staphylococci', 'Streptococcus spp.', 'Enterobacterales', 'Bacteroides fragilis (mổ bụng/đại tràng)']
    },
    clinicalPresentationVi: 'Dự phòng cho các phẫu thuật sạch-nhiễm, phẫu thuật nhiễm hoặc phẫu thuật sạch có đặt vật liệu nhân tạo (thay khớp, van tim, mạch máu).',
    clinicalPresentationEn: 'Prophylaxis for clean-contaminated, contaminated, or clean implant surgeries.',
    firstLineAdult: 'Phẫu thuật chung/sạch-nhiễm: Cefazolin 2 g TTM liều duy nhất trong vòng 120 phút trước rạch da (bệnh nhân > 120kg dùng 3g). Phẫu thuật ruột/đại trực tràng: Cefazolin 2 g + Metronidazole 500 mg TTM liều duy nhất.',
    firstLinePediatric: 'Cefazolin 50 mg/kg TTM liều duy nhất (+ Metronidazole 7,5 mg/kg TTM nếu mổ ruột/nhiễm bẩn).',
    secondLineAdult: 'Amoxicillin+clavulanic acid 2 g + 200 mg TTM liều duy nhất; HOẶC Cefuroxime 1,5 g TTM liều duy nhất; Dị ứng nặng beta-lactam: Gentamicin 5 mg/kg + Metronidazole 500 mg TTM.',
    secondLinePediatric: 'Amox+Clav 50 mg/kg TTM liều duy nhất HOẶC Cefuroxime 50 mg/kg TTM.',
    durationVi: 'Liều duy nhất (Single dose) trước mổ. KHÔNG tiếp tục dùng kháng sinh sau khi đóng vết mổ (theo khuyến cáo chính thức của WHO 2025). Chỉ bổ sung thêm liều trong mổ nếu cuộc mổ kéo dài hơn 2 lần chu kỳ bán thải (tức > 4 giờ với Cefazolin) hoặc mất máu > 1.500 mL.',
    durationEn: 'Single pre-operative dose within 120 min before incision. No post-operative doses recommended by WHO.',
    clinicalNotesVi: 'WHO 2025 khuyến cáo mạnh mẽ: Dùng kháng sinh sau phẫu thuật không làm giảm tỷ lệ nhiễm trùng vết mổ mà làm tăng nguy cơ kháng thuốc và tiêu chảy C. difficile.',
    awareClasses: {
      firstLine: ['Access', 'Access'],
      secondLine: ['Access', 'Watch']
    }
  }
];

// Phân nhóm AWaRe chính thức cho từng mã thuốc trong hệ thống
export const WHO_AWARE_DRUG_MAP: Record<string, { category: AwareCategory; whoDoseAdultVi?: string; whoDosePedsVi?: string; notesVi?: string }> = {
  meropenem: {
    category: 'Watch',
    whoDoseAdultVi: '1 g mỗi 8 giờ TTM (Nhiễm khuẩn huyết/ổ bụng nặng: 2 g mỗi 8 giờ)',
    whoDosePedsVi: '20 mg/kg mỗi 8 giờ TTM (Viêm màng não: 40 mg/kg mỗi 8 giờ, tối đa 6 g/ngày)',
    notesVi: 'Kháng sinh nhóm Giám sát phổ rộng. Cần bảo tồn cho các ca nhiễm trực khuẩn Gram âm sinh ESBL hoặc nhiễm khuẩn huyết nặng.'
  },
  imipenem: {
    category: 'Watch',
    whoDoseAdultVi: '500 mg mỗi 6 giờ TTM (hoặc 1 g mỗi 8 giờ)',
    whoDosePedsVi: '15-25 mg/kg mỗi 6 giờ TTM',
    notesVi: 'Carbapenem nhóm Giám sát. Cần theo dõi nguy cơ co giật khi dùng liều cao hoặc suy thận.'
  },
  ertapenem: {
    category: 'Watch',
    whoDoseAdultVi: '1 g mỗi 24 giờ TTM',
    whoDosePedsVi: '15 mg/kg mỗi 12 giờ (trẻ 3 tháng-12 tuổi)',
    notesVi: 'Carbapenem dùng 1 lần/ngày, không có hoạt tính trên P. aeruginosa và Acinetobacter.'
  },
  doripenem: {
    category: 'Watch',
    whoDoseAdultVi: '500 mg mỗi 8 giờ TTM (truyền 1-4 giờ)',
    notesVi: 'Carbapenem nhóm Giám sát.'
  },
  piperacillin_tazo: {
    category: 'Watch',
    whoDoseAdultVi: '4,5 g (4 g + 500 mg) mỗi 6 giờ TTM',
    whoDosePedsVi: '100 mg piperacillin/kg mỗi 8 giờ TTM (tối đa 10 g/ngày)',
    notesVi: 'Kháng sinh chống trực khuẩn mủ xanh và kỵ khí. Thuộc nhóm Giám sát của WHO.'
  },
  ampicillin_sulbactam: {
    category: 'Access',
    whoDoseAdultVi: '1,5 g - 3 g mỗi 6 giờ TTM',
    whoDosePedsVi: '50 mg ampicillin/kg mỗi 6-8 giờ TTM',
    notesVi: 'Kháng sinh nhóm Tiếp cận có hoạt tính diệt vi khuẩn kỵ khí và một số chủng Acinetobacter baumannii.'
  },
  cefo_sulbactam_11: {
    category: 'Watch',
    whoDoseAdultVi: '2 g - 4 g/ngày chia 2 lần TTM',
    notesVi: 'Phối hợp Cephalosporin thế hệ 3 và ức chế beta-lactamase.'
  },
  cefo_sulbactam_21: {
    category: 'Watch',
    whoDoseAdultVi: '1,5 g - 3 g mỗi 12 giờ TTM',
    notesVi: 'Phối hợp tỷ lệ 2:1 Cefoperazone/Sulbactam.'
  },
  ceftriaxon: {
    category: 'Watch',
    whoDoseAdultVi: '1 g - 2 g mỗi 24 giờ TTM/TB (Viêm màng não: 2 g mỗi 12 giờ, tổng 4 g/ngày)',
    whoDosePedsVi: '50-80 mg/kg mỗi 24 giờ TTM (Viêm màng não: 100 mg/kg mỗi 24 giờ, tối đa 3 g/ngày)',
    notesVi: 'Cephalosporin thế hệ 3 nhóm Giám sát. Không dùng cùng dung dịch chứa canxi ở trẻ sơ sinh.'
  },
  cefotaxim: {
    category: 'Watch',
    whoDoseAdultVi: '1 g - 2 g mỗi 8 giờ TTM (Viêm màng não: 2 g mỗi 6 giờ, tổng 8 g/ngày)',
    whoDosePedsVi: '50 mg/kg mỗi 8 giờ TTM (sơ sinh tuần đầu: mỗi 12 giờ)',
    notesVi: 'Lựa chọn thay thế an toàn cho trẻ sơ sinh thay cho Ceftriaxone.'
  },
  ceftazidim: {
    category: 'Watch',
    whoDoseAdultVi: '1 g - 2 g mỗi 8 giờ TTM',
    whoDosePedsVi: '30-50 mg/kg mỗi 8 giờ TTM',
    notesVi: 'Cephalosporin thế hệ 3 chống Pseudomonas aeruginosa.'
  },
  cefepim: {
    category: 'Watch',
    whoDoseAdultVi: '1 g - 2 g mỗi 8-12 giờ TTM',
    whoDosePedsVi: '50 mg/kg mỗi 8-12 giờ TTM',
    notesVi: 'Cephalosporin thế hệ 4 nhóm Giám sát.'
  },
  ceftazidim_avibactam: {
    category: 'Reserve',
    whoDoseAdultVi: '2,5 g (2 g + 500 mg) mỗi 8 giờ truyền tĩnh mạch > 2 giờ',
    whoDosePedsVi: '62,5 mg/kg mỗi 8 giờ TTM (tối đa 2,5 g/liều)',
    notesVi: 'KHÁNG SINH NHÓM DỰ TRỮ (Chương 43). Hoạt tính mạnh trên KPC và OXA-48. Không có tác dụng trên men MBL (NDM).'
  },
  ceftolozan_tazo: {
    category: 'Reserve',
    whoDoseAdultVi: '1,5 g (1 g + 500 mg) mỗi 8 giờ TTM (HAP/VAP dùng 3 g mỗi 8 giờ)',
    notesVi: 'Kháng sinh nhóm Dự trữ chống Pseudomonas aeruginosa kháng thuốc.'
  },
  cefazolin: {
    category: 'Access',
    whoDoseAdultVi: '1 g - 2 g mỗi 8 giờ TTM; Dự phòng phẫu thuật: 2 g liều duy nhất trước rạch da (<120 min)',
    whoDosePedsVi: '25 mg/kg mỗi 12 giờ TTM; Dự phòng mổ: 50 mg/kg liều duy nhất',
    notesVi: 'Kháng sinh nhóm Tiếp cận. Lựa chọn số 1 thế giới cho dự phòng phẫu thuật và MSSA.'
  },
  cefuroxim: {
    category: 'Watch',
    whoDoseAdultVi: '750 mg - 1,5 g mỗi 8 giờ TTM (hoặc uống 500 mg mỗi 12 giờ)',
    whoDosePedsVi: '30-50 mg/kg mỗi 8 giờ TTM',
    notesVi: 'Cephalosporin thế hệ 2 nhóm Giám sát.'
  },
  cefoxitin: {
    category: 'Watch',
    whoDoseAdultVi: '1 g - 2 g mỗi 6-8 giờ TTM',
    notesVi: 'Cephamycin có hoạt tính trên vi khuẩn kỵ khí.'
  },
  ciprofloxacin: {
    category: 'Watch',
    whoDoseAdultVi: '500 mg mỗi 12 giờ uống HOẶC 400 mg mỗi 8-12 giờ TTM',
    whoDosePedsVi: '15 mg/kg mỗi 12 giờ uống/TTM (tối đa 1,5 g/ngày uống, 1,2 g/ngày TTM)',
    notesVi: 'Fluoroquinolone nhóm Giám sát. Cảnh báo nguy cơ kéo dài khoảng QT, đứt gân và độc tính thần kinh.'
  },
  levofloxacin: {
    category: 'Watch',
    whoDoseAdultVi: '500 mg - 750 mg mỗi 24 giờ uống/TTM',
    notesVi: 'Hô hấp fluoroquinolone nhóm Giám sát.'
  },
  moxifloxacin: {
    category: 'Watch',
    whoDoseAdultVi: '400 mg mỗi 24 giờ uống/TTM',
    notesVi: 'Fluoroquinolone nhóm Giám sát đào thải qua gan, không cần chỉnh liều theo thận.'
  },
  vancomycin: {
    category: 'Watch',
    whoDoseAdultVi: 'TTM: 15–20 mg/kg mỗi 12 giờ (liều nạp 25-30 mg/kg nếu nặng). UỐNG: 125 mg mỗi 6 giờ (chỉ dùng cho C. difficile)',
    whoDosePedsVi: 'TTM: 15 mg/kg mỗi 8 giờ (sơ sinh: mỗi 12 giờ). UỐNG: 5-10 mg/kg mỗi 6 giờ cho C. difficile',
    notesVi: 'Glycopeptide nhóm Giám sát. Vancomycin đường uống KHÔNG hấp thu toàn thân, chỉ dùng điều trị viêm ruột do C. difficile.'
  },
  teicoplanin: {
    category: 'Watch',
    whoDoseAdultVi: 'Liều nạp 6 mg/kg (hoặc 12 mg/kg nếu nặng) mỗi 12 giờ x 3-5 liều, sau đó 6 mg/kg/ngày',
    notesVi: 'Glycopeptide nhóm Giám sát, thời gian bán thải dài, dung nạp tốt hơn vancomycin.'
  },
  linezolid: {
    category: 'Reserve',
    whoDoseAdultVi: '600 mg mỗi 12 giờ uống hoặc TTM (sinh khả dụng đường uống 100%)',
    whoDosePedsVi: '10 mg/kg mỗi 8 giờ uống/TTM (sơ sinh tuần đầu: mỗi 12 giờ)',
    notesVi: 'KHÁNG SINH NHÓM DỰ TRỮ (Chương 45). Cứu cánh cho VRE, MRSA kháng vancomycin. Dùng > 4 tuần tăng nguy cơ ức chế tủy xương và viêm dây thần kinh thị giác.'
  },
  daptomycin: {
    category: 'Reserve',
    whoDoseAdultVi: '6 - 10 mg/kg mỗi 24 giờ TTM (bất hoạt bởi surfactant phổi, KHÔNG dùng cho viêm phổi)',
    notesVi: 'Lipopeptide nhóm Dự trữ chống Gram dương đa kháng. Tuyệt đối không dùng cho viêm phổi.'
  },
  colistin: {
    category: 'Reserve',
    whoDoseAdultVi: 'Liều nạp 9 triệu IU (~300 mg CBA) TTM; Liều duy trì: 4,5 triệu IU (~150 mg CBA) mỗi 12 giờ',
    whoDosePedsVi: 'Duy trì: 1,25–2,5 mg CBA/kg mỗi 12 giờ TTM (hoặc 0,625-1,25 mg CBA/kg mỗi 6 giờ)',
    notesVi: 'KHÁNG SINH NHÓM DỰ TRỮ (Chương 48). Độc thận rất cao (30-50%). Bắt buộc dùng liều nạp ngày đầu. 1 triệu IU natri colistimethate tương đương 34 mg CBA.'
  },
  tigecyclin: {
    category: 'Reserve',
    whoDoseAdultVi: 'Liều nạp 100 mg TTM, sau đó 50 mg mỗi 12 giờ TTM',
    notesVi: 'Glycylcycline nhóm Dự trữ chống vi khuẩn đa kháng.'
  },
  metronidazol: {
    category: 'Access',
    whoDoseAdultVi: '500 mg mỗi 8 giờ uống hoặc TTM (Áp xe amip: 750 mg mỗi 8 giờ x 10 ngày)',
    whoDosePedsVi: '7,5 mg/kg mỗi 8 giờ uống/TTM (sơ sinh: mỗi 12 giờ)',
    notesVi: 'Kháng sinh nhóm Tiếp cận. Rất mạnh trên vi khuẩn kỵ khí và đơn bào (trùng roi, amip).'
  },
  clindamycin: {
    category: 'Access',
    whoDoseAdultVi: '600 mg mỗi 8 giờ uống hoặc TTM (Viêm cân hoại tử: 900 mg mỗi 8 giờ TTM)',
    whoDosePedsVi: '10 mg/kg mỗi 8 giờ TTM/uống (sơ sinh: 5 mg/kg mỗi 8 giờ)',
    notesVi: 'Lincosamide nhóm Tiếp cận. Có tác dụng ức chế sản sinh độc tố (anti-toxin) của tụ cầu và liên cầu.'
  },
  amikacin: {
    category: 'Access',
    whoDoseAdultVi: '15 mg/kg mỗi 24 giờ TTM liều duy nhất',
    whoDosePedsVi: '15 mg/kg mỗi 24 giờ TTM (tối đa 1,5 g/ngày)',
    notesVi: 'Aminoglycoside nhóm Tiếp cận. Lựa chọn tiết kiệm carbapenem (carbapenem-sparing) rất tốt cho nhiễm trùng tiết niệu ESBL.'
  },
  gentamicin: {
    category: 'Access',
    whoDoseAdultVi: '5 mg/kg mỗi 24 giờ TTM liều duy nhất',
    whoDosePedsVi: '7,5 mg/kg mỗi 24 giờ TTM (trẻ sơ sinh: 5 mg/kg mỗi 24 giờ)',
    notesVi: 'Aminoglycoside nhóm Tiếp cận. Phối hợp kinh điển với Ampicillin cho nhiễm khuẩn sơ sinh.'
  },
  aztreonam: {
    category: 'Reserve',
    whoDoseAdultVi: '1 g - 2 g mỗi 8 giờ TTM',
    notesVi: 'Monobactam duy nhất không gây phản ứng chéo với dị ứng penicillin (trừ Ceftazidime).'
  },
  tmp_smx: {
    category: 'Access',
    whoDoseAdultVi: 'Uống: 800 mg SMX + 160 mg TMP mỗi 12 giờ; Pneumocystis: 15-20 mg/kg TMP/ngày chia 3-4 lần',
    whoDosePedsVi: 'Uống: 20 mg/kg SMX + 4 mg/kg TMP mỗi 12 giờ',
    notesVi: 'Kháng sinh nhóm Tiếp cận. Thuốc điều trị đầu tay cho viêm phổi PCP ở bệnh nhân suy giảm miễn dịch.'
  },
  fosfomycin: {
    category: 'Reserve',
    whoDoseAdultVi: 'TTM: 6 g mỗi 8 giờ (12-24 g/ngày) truyền tĩnh mạch chậm',
    whoDosePedsVi: 'TTM: 200-400 mg/kg/ngày chia 3 lần',
    notesVi: 'KHÁNG SINH NHÓM DỰ TRỮ (Chương 44). Thường dùng phối hợp chống vi khuẩn đa kháng. Theo dõi hạ kali máu.'
  },
  azithromycin: {
    category: 'Watch',
    whoDoseAdultVi: '500 mg ngày đầu, sau đó 250 mg/ngày x 4 ngày; Chlamydia/Lậu: 1 g liều duy nhất',
    whoDosePedsVi: '10 mg/kg ngày đầu, sau đó 5 mg/kg/ngày x 4 ngày; Chlamydia sơ sinh: 20 mg/kg/ngày x 3 ngày',
    notesVi: 'Macrolide nhóm Giám sát. Thời gian bán thải dài, có thể gây kéo dài khoảng QT.'
  },
  tobramycin: {
    category: 'Access',
    whoDoseAdultVi: '5-7 mg/kg mỗi 24 giờ TTM',
    notesVi: 'Aminoglycoside nhóm Tiếp cận chống Pseudomonas.'
  },
  cefotiam: {
    category: 'Watch',
    whoDoseAdultVi: '1 g - 2 g mỗi 8-12 giờ TTM',
    notesVi: 'Cephalosporin thế hệ 2 nhóm Giám sát.'
  },
  amox_clav: {
    category: 'Access',
    whoDoseAdultVi: 'Uống: 500/125 mg mỗi 8h hoặc 875/125 mg mỗi 12h; TTM: 1,2 g mỗi 8 giờ',
    whoDosePedsVi: 'Uống: 80-90 mg amox/kg/ngày chia 2-3 lần; TTM: 50 mg amox/kg mỗi 8 giờ',
    notesVi: 'Kháng sinh nhóm Tiếp cận phổ biến nhất. Lưu ý dạng siro trẻ em phải trữ lạnh sau khi pha.'
  },
  tinidazol: {
    category: 'Access',
    whoDoseAdultVi: '2 g liều duy nhất hoặc 500 mg mỗi 12 giờ uống',
    notesVi: 'Nitroimidazole nhóm Tiếp cận.'
  }
};
