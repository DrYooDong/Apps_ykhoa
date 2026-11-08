/**
 * CliniPortal — Clinical Handbook Master Catalog
 * Path: src/content/clinical-handbook/data/handbook-catalog.ts
 * 
 * CSDL Master 8 Chuyên khoa, danh mục Bệnh lý và các bài viết Đúc kết Kinh nghiệm MDX
 */

import { HandbookSpecialty, HandbookDisease, HandbookArticle, SpecialtyId } from '../types/handbook.types';

export const HANDBOOK_SPECIALTIES: HandbookSpecialty[] = [
  {
    id: 'truyen-nhiem',
    name: 'Bệnh Truyền Nhiễm & Nhiệt Đới',
    shortName: 'Truyền Nhiễm',
    nameEn: 'Infectious & Tropical Diseases',
    icon: 'fa-virus-covid',
    color: '#0284c7',
    bgColor: 'rgba(2, 132, 199, 0.1)',
    badge: 'Khởi điểm 8 Bệnh lý Trọng tâm',
    description: 'Đúc kết lâm sàng thực chiến từ chẩn đoán huyết thanh học, bẫy xét nghiệm, phác đồ điều trị và nghệ thuật kiểm soát biến chứng truyền nhiễm tại Việt Nam.',
    order: 1,
    diseases: [] // Populated below
  },
  {
    id: 'tim-mach',
    name: 'Tim Mạch Học',
    shortName: 'Tim Mạch',
    nameEn: 'Cardiology',
    icon: 'fa-heart-pulse',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    badge: 'Đang biên soạn',
    description: 'Kinh nghiệm chỉnh liều tứ trụ suy tim, bẫy nhồi máu cơ tim không ST chênh lên, rối loạn nhịp và kháng đông thực hành.',
    order: 2,
    diseases: []
  },
  {
    id: 'tieu-hoa-gan-mat',
    name: 'Tiêu Hóa & Gan Mật',
    shortName: 'Tiêu Hóa Gan Mật',
    nameEn: 'Gastroenterology & Hepatology',
    icon: 'fa-bacterium',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    badge: 'Đang biên soạn',
    description: 'Xử trí xuất huyết tiêu hóa do vỡ giãn tĩnh mạch thực quản, báng bụng kháng trị, viêm tụy cấp và bệnh gan mạn.',
    order: 3,
    diseases: []
  },
  {
    id: 'ho-hap',
    name: 'Hô Hấp Học',
    shortName: 'Hô Hấp',
    nameEn: 'Pulmonology',
    icon: 'fa-lungs',
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    badge: 'Đang biên soạn',
    description: 'Đúc kết phân tầng đợt cấp COPD, kiểm soát cơn hen phế quản nặng, bẫy đọc khí máu động mạch và tràn dịch màng phổi.',
    order: 4,
    diseases: []
  },
  {
    id: 'hoi-suc-cap-cuu',
    name: 'Hồi Sức Cấp Cứu & Chống Độc',
    shortName: 'Hồi Sức Cấp Cứu',
    nameEn: 'Intensive Care & Emergency Medicine',
    icon: 'fa-truck-medical',
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    badge: 'Đang biên soạn',
    description: 'Chiến lược hồi sức huyết động, kiểm soát đường thở khó, toan kiềm hỗn hợp và giải độc khẩn cấp tại giường.',
    order: 5,
    diseases: []
  },
  {
    id: 'noi-tiet',
    name: 'Nội Tiết & Chuyển Hóa',
    shortName: 'Nội Tiết',
    nameEn: 'Endocrinology & Metabolism',
    icon: 'fa-dna',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    badge: 'Đang biên soạn',
    description: 'Kiểm soát đường huyết nội viện, phác đồ DKA/HHS không tụt kali, suy thượng thận cấp và cơn bão giáp.',
    order: 6,
    diseases: []
  },
  {
    id: 'than-tiet-nieu',
    name: 'Thận - Tiết Niệu & Lọc Máu',
    shortName: 'Thận Tiết Niệu',
    nameEn: 'Nephrology & Dialysis',
    icon: 'fa-droplet',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    badge: 'Đang biên soạn',
    description: 'Đúc kết xử trí tổn thương thận cấp (AKI), chỉnh liều thuốc theo eGFR/CKD-EPI và hội chứng thận hư.',
    order: 7,
    diseases: []
  },
  {
    id: 'than-kinh',
    name: 'Thần Kinh Học',
    shortName: 'Thần Kinh',
    nameEn: 'Neurology',
    icon: 'fa-brain',
    color: '#6366f1',
    bgColor: 'rgba(99, 102, 241, 0.1)',
    badge: 'Đang biên soạn',
    description: 'Cửa sổ vàng đột quỵ thiếu máu não cấp, xử trí trạng thái động kinh và chẩn đoán phân biệt yếu liệt chi.',
    order: 8,
    diseases: []
  }
];

// Danh sách các bệnh lý thuộc chuyên khoa Truyền Nhiễm
export const INFECTIOUS_DISEASES: HandbookDisease[] = [
  {
    id: 'viem-gan-b',
    slug: 'viem-gan-b',
    specialtyId: 'truyen-nhiem',
    name: 'Viêm Gan Siêu Vi B (HBV)',
    nameEn: 'Chronic Hepatitis B Virus Infection',
    icd10: 'B18.1',
    icon: 'fa-virus',
    color: '#0284c7',
    badge: 'EBM 2026 • Trọng tâm',
    summary: 'Đúc kết toàn diện từ 4 pha tự nhiên, bẫy ngưỡng ALT phòng xét nghiệm, bẫy FibroScan khi gan viêm bùng phát đến nghệ thuật khởi trị vùng xám và phòng ngừa tái hoạt.',
    keyPearlsPreview: [
      'Ngưỡng ALT bình thường thực tế theo AASLD: Nam ≤ 35 U/L, Nữ ≤ 25 U/L (Lab thường lấy 40-50 U/L bỏ sót viêm gan)',
      'Không bao giờ đo độ cứng gan (FibroScan) khi ALT > 5x ULN vì sẽ cho kết quả F4 giả tạo',
      'Anti-HBc IgM (+) không đồng nghĩa 100% viêm gan B cấp (gặp trong 20-30% đợt bùng phát mạn tính)',
      'Định lượng HBsAg (qHBsAg) < 1.000 IU/mL kết hợp HBV DNA < 2.000 IU/mL xác định người mang không hoạt động thực sự'
    ],
    guidelines: ['AASLD 2024/2026 Update', 'EASL 2024 Clinical Practice Guidelines', 'Quyết định 3310/QĐ-BYT'],
    order: 1,
    articles: [
      {
        id: 'hbv-01-tieu-chuan-chan-doan-va-cam-bay',
        slug: 'hbv-01-tieu-chuan-chan-doan-va-cam-bay',
        diseaseId: 'viem-gan-b',
        specialtyId: 'truyen-nhiem',
        title: 'Tiêu Chuẩn Chẩn Đoán Viêm Gan Siêu Vi B & Cạm Bẫy Cận Lâm Sàng',
        subtitle: 'Nhận diện 4 pha tự nhiên, bẫy ngưỡng ALT, bẫy FibroScan và phân tích chuẩn xác bộ dấu ấn huyết thanh',
        description: 'Phân tích đa chiều tiêu chuẩn chẩn đoán nhiễm HBV cấp vs mạn tính, 4 pha sinh học tự nhiên, giải mã bẫy Anti-HBc IgM trong đợt bùng phát và nguyên tắc không đo FibroScan khi men gan tăng vọt.',
        estimatedMinutes: 25,
        tags: ['HBV', 'Tiêu chuẩn chẩn đoán', '4 Pha tự nhiên', 'Bẫy ALT', 'FibroScan', 'qHBsAg', 'EBM 2026'],
        keyTakeaway: 'Luôn đối chiếu ALT với ngưỡng chuẩn AASLD (35/25 U/L) và hoãn đo FibroScan khi ALT > 5x ULN để tránh chẩn đoán nhầm xơ gan F4.',
        order: 1,
        filePath: 'truyen-nhiem/viem-gan-b/hbv-01-tieu-chuan-chan-doan-va-cam-bay.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-08',
        evidenceLevel: 'EBM 2026 • AASLD / EASL / BYT',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây (The Bottom Line & Rule of Thumb)', icon: 'fa-bolt' },
          { id: 'sec-4-phases', number: 2, title: 'Bản Đồ 4 Pha Tự Nhiên Của Nhiễm HBV Mạn Tính', icon: 'fa-diagram-project' },
          { id: 'sec-diagnostic-criteria', number: 3, title: 'Bộ Tiêu Chuẩn Chẩn Đoán Cốt Lõi & Chỉ Định Khởi Trị', icon: 'fa-clipboard-check' },
          { id: 'sec-serology-pitfalls', number: 4, title: 'Cạm Bẫy Huyết Thanh Học (Serology & Anti-HBc IgM)', icon: 'fa-triangle-exclamation' },
          { id: 'sec-alt-fibroscan-pitfalls', number: 5, title: 'Bẫy Ngưỡng ALT Phòng Xét Nghiệm & Bẫy Đo Độ Cứng Gan', icon: 'fa-wave-square' },
          { id: 'sec-qhbsag-role', number: 6, title: 'Tái Hoạt HBV & Phân Tuyến Ngoại Trú - Nội Viện (QĐ 1740)', icon: 'fa-chart-pie' },
          { id: 'sec-bedside-matrix', number: 7, title: 'Bảng Ma Trận Phân Biệt Cấp vs Bùng Phát Mạn', icon: 'fa-table-list' },
          { id: 'sec-case-scenarios', number: 8, title: 'Ca Lâm Sàng Thực Tế & Đúc Kết Xương Máu', icon: 'fa-user-doctor' }
        ]
      },
      {
        id: 'hbv-02-chi-dinh-dieu-tri-va-vung-xam',
        slug: 'hbv-02-chi-dinh-dieu-tri-va-vung-xam',
        diseaseId: 'viem-gan-b',
        specialtyId: 'truyen-nhiem',
        title: 'Chỉ Định Điều Trị Thuốc Kháng Virus & Tiếp Cận "Vùng Xám" (Gray Zones)',
        subtitle: 'Kinh nghiệm quyết định điều trị khi bệnh nhân không thỏa hoàn toàn tiêu chuẩn vàng',
        description: 'Nghệ thuật xử trí các ca HBeAg âm tính có ALT mấp mé, tải lượng virus dao động, người trên 30-35 tuổi có tiền sử gia đình ung thư gan (HCC).',
        estimatedMinutes: 20,
        tags: ['HBV', 'Khởi trị', 'Vùng xám', 'Gray zones', 'Entecavir', 'Tenofovir'],
        keyTakeaway: 'Nếu bệnh nhân > 30 tuổi có tiền căn gia đình HCC, dù ALT bình thường nhưng HBV DNA > 2.000 IU/mL, chỉ định điều trị bảo vệ gan là ưu tiên hàng đầu.',
        order: 2,
        filePath: 'truyen-nhiem/viem-gan-b/hbv-02-chi-dinh-dieu-tri-va-vung-xam.mdx',
        isDraft: true,
        lastUpdated: '2026-11-07',
        evidenceLevel: 'EBM 2026 • AASLD'
      },
      {
        id: 'hbv-03-theo-doi-khang-thuoc-chuyen-doi',
        slug: 'hbv-03-theo-doi-khang-thuoc-chuyen-doi',
        diseaseId: 'viem-gan-b',
        specialtyId: 'truyen-nhiem',
        title: 'Theo Dõi Định Kỳ, Kháng Thuốc & Nghệ Thuật Chọn Lựa TDF vs TAF vs ETV',
        subtitle: 'Chiến lược bảo vệ thận và xương trên bệnh nhân dùng thuốc kháng virus dài hạn',
        description: 'So sánh chi tiết Entecavir, Tenofovir Disoproxil Fumarate (TDF) và Tenofovir Alafenamide (TAF) trên từng nhóm bệnh nhân cụ thể: suy thận, loãng xương, chuẩn bị mang thai.',
        estimatedMinutes: 22,
        tags: ['HBV', 'TDF', 'TAF', 'ETV', 'Suy thận', 'Kháng thuốc'],
        keyTakeaway: 'Ưu tiên TAF hoặc ETV trên bệnh nhân > 60 tuổi, có bệnh xương chuyển hóa hoặc eGFR < 60 mL/ph để tránh độc tính ống thận của TDF.',
        order: 3,
        filePath: 'truyen-nhiem/viem-gan-b/hbv-03-theo-doi-khang-thuoc-chuyen-doi.mdx',
        isDraft: true,
        lastUpdated: '2026-11-07',
        evidenceLevel: 'EASL 2024 • AASLD'
      },
      {
        id: 'hbv-04-tai-hoat-uc-che-mien-dich',
        slug: 'hbv-04-tai-hoat-uc-che-mien-dich',
        diseaseId: 'viem-gan-b',
        specialtyId: 'truyen-nhiem',
        title: 'Dự Phòng Tái Hoạt HBV Khi Dùng Thuốc Ức Chế Miễn Dịch & Sinh Học',
        subtitle: 'Bảo vệ bệnh nhân hóa trị, ghép tạng, dùng corticoid liều cao và kháng thể đơn dòng (Rituximab)',
        description: 'Phân tầng nguy cơ tái hoạt bùng phát suy gan cấp theo nhóm thuốc (Anti-CD20, ức chế TNF-alpha, Corticosteroid) và chỉ định dùng thuốc dự phòng kịp thời.',
        estimatedMinutes: 18,
        tags: ['HBV', 'Tái hoạt', 'Rituximab', 'Hóa trị', 'Dự phòng'],
        keyTakeaway: 'Bệnh nhân có Anti-HBc (+) đơn độc khi dùng Rituximab có nguy cơ tái hoạt > 10% -> BẮT BUỘC dùng thuốc kháng virus dự phòng (ETV/TAF) trước khi bắt đầu hóa trị.',
        order: 4,
        filePath: 'truyen-nhiem/viem-gan-b/hbv-04-tai-hoat-uc-che-mien-dich.mdx',
        isDraft: true,
        lastUpdated: '2026-11-07',
        evidenceLevel: 'AGA / AASLD 2024'
      }
    ]
  },
  {
    id: 'sot-xuat-huyet-dengue',
    slug: 'sot-xuat-huyet-dengue',
    specialtyId: 'truyen-nhiem',
    name: 'Sốt Xuất Huyết Dengue',
    nameEn: 'Dengue Hemorrhagic Fever',
    icd10: 'A97',
    icon: 'fa-mosquito',
    color: '#ef4444',
    badge: 'Cấp cứu Nhiệt đới',
    summary: 'Đúc kết lâm sàng nhận diện pha nguy hiểm (Ngày 3-7), bẫy dung tích hồng cầu (Hct) nền, nghệ thuật bù dịch điện giải và phòng ngừa sốc tái diễn.',
    keyPearlsPreview: [
      'Thời điểm nguy hiểm nhất không phải lúc sốt cao mà là lúc bắt đầu lui sốt (N3-N7)',
      'Hct tăng > 20% so với giá trị nền là bằng chứng thoát huyết tương cấp tính cần bù dịch',
      'Tránh truyền dịch ồ ạt khi bệnh nhân đã vào pha tái hấp thu (N7 trở đi) để ngừa phù phổi cấp'
    ],
    guidelines: ['WHO 2024 Dengue Guidelines', 'Quyết định 2760/QĐ-BYT'],
    order: 2,
    articles: []
  },
  {
    id: 'nhiem-khuan-huyet',
    slug: 'nhiem-khuan-huyet',
    specialtyId: 'truyen-nhiem',
    name: 'Nhiễm Khuẩn Huyết & Sốc Nhiễm Khuẩn',
    nameEn: 'Sepsis & Septic Shock (Sepsis-3)',
    icd10: 'A41.9',
    icon: 'fa-shield-halved',
    color: '#8b5cf6',
    badge: 'Hồi sức Cấp cứu',
    summary: 'Chiến dịch Sống còn Nhiễm khuẩn huyết (SSC 2026), bó 1 giờ (1-hour bundle), sử dụng Noradrenalin sớm qua ngoại vi và mục tiêu thanh thải Lactate.',
    keyPearlsPreview: [
      'Khởi động Noradrenalin sớm ngay trong lúc bù dịch nếu MAP < 65 mmHg kéo dài',
      'Cấy máu trước khi cho kháng sinh nhưng không được trì hoãn kháng sinh quá 1 giờ',
      'Bù dịch ban đầu 30 mL/kg tinh thể cân bằng, sau đó đánh giá đáp ứng dịch động (PLR)'
    ],
    guidelines: ['Surviving Sepsis Campaign 2026', 'IDSA Sepsis Guidance'],
    order: 3,
    articles: []
  },
  {
    id: 'viem-nao-mang-nao',
    slug: 'viem-nao-mang-nao',
    specialtyId: 'truyen-nhiem',
    name: 'Viêm Màng Não Mủ & Viêm Não Virus',
    nameEn: 'Bacterial Meningitis & Viral Encephalitis',
    icd10: 'G00.9 / G04.9',
    icon: 'fa-brain',
    color: '#ec4899',
    badge: 'Khẩn cấp Thần kinh',
    summary: 'Phân tích dịch não tủy (DNT), chỉ định chụp CT sọ não trước chọc dò, vai trò Dexamethasone trước liều kháng sinh đầu và điều trị Acyclovir sớm.',
    keyPearlsPreview: [
      'Dexamethasone 10mg IV nên dùng trước hoặc cùng lúc với liều kháng sinh đầu tiên ở viêm màng não do Phế cầu',
      'Nghi ngờ viêm não do Herpes simplex (HSV-1) phải tiêm ngay Acyclovir tĩnh mạch không chờ kết quả PCR DNT',
      'Đường huyết máu phải đo cùng lúc với chọc dịch não tủy để tính tỷ lệ Glucose DNT / Máu (bình thường > 0.6)'
    ],
    guidelines: ['EAN/ESCMID 2026 Encephalitis Guidelines', 'IDSA Meningitis Guidelines'],
    order: 4,
    articles: []
  },
  {
    id: 'viem-phoi-cong-dong',
    slug: 'viem-phoi-cong-dong',
    specialtyId: 'truyen-nhiem',
    name: 'Viêm Phổi Cộng Đồng (CAP)',
    nameEn: 'Community-Acquired Pneumonia',
    icd10: 'J18.9',
    icon: 'fa-lungs-virus',
    color: '#06b6d4',
    badge: 'Nhiễm khuẩn Hô hấp',
    summary: 'Phân tầng nguy cơ CURB-65 vs PSI, bẫy viêm phổi hít ở người cao tuổi, lựa chọn Beta-lactam phối hợp Macrolide/Quinolone và tiêu chuẩn chuyển sang kháng sinh uống.',
    keyPearlsPreview: [
      'Điểm CURB-65 = 2 cần nhập viện điều trị; ≥ 3 cân nhắc ICU',
      'Phối hợp Ceftriaxone + Azithromycin mang lại hiệu quả hiệp đồng chống viêm và bao phủ vi khuẩn không điển hình',
      'Hạ sốt 48-72h + huyết động ổn định + ăn uống được là chỉ định vàng chuyển sang kháng sinh uống (IV-to-PO)'
    ],
    guidelines: ['ATS/IDSA CAP Guidelines', 'Quyết định 4815/QĐ-BYT'],
    order: 5,
    articles: []
  },
  {
    id: 'cum-mua',
    slug: 'cum-mua',
    specialtyId: 'truyen-nhiem',
    name: 'Cúm & Nhiễm Trùng Hô Hấp Virus Cấp',
    nameEn: 'Influenza & Acute Viral Respiratory Infection',
    icd10: 'J10',
    icon: 'fa-head-side-cough',
    color: '#10b981',
    badge: 'Dịch tễ Mùa',
    summary: 'Chỉ định thuốc ức chế Neuraminidase (Oseltamivir), nhận diện dấu hiệu chuyển nặng, bội nhiễm vi khuẩn thứ phát (tụ cầu vàng, phế cầu).',
    keyPearlsPreview: [
      'Oseltamivir đạt hiệu quả tối ưu nếu dùng trong 48 giờ đầu từ khi khởi phát triệu chứng',
      'Bệnh nhân cúm có dấu hiệu sốt lại sau khi đã lui sốt kèm đờm mủ phải cảnh giác bội nhiễm Tụ cầu vàng (MRSA) hoặc Phế cầu'
    ],
    guidelines: ['WHO Influenza Guidelines', 'CDC Influenza Antiviral Guidance'],
    order: 6,
    articles: []
  },
  {
    id: 'uon-van',
    slug: 'uon-van',
    specialtyId: 'truyen-nhiem',
    name: 'Uốn Ván (Tetanus)',
    nameEn: 'Tetanus Infection',
    icd10: 'A35',
    icon: 'fa-syringe',
    color: '#f59e0b',
    badge: 'Hồi sức Đặc biệt',
    summary: 'Kinh nghiệm xử trí co cứng và co giật cơ, mở khí quản chủ động sớm, xử lý vết thương ngõ vào, SAT vs TIG và phối hợp Metronidazole.',
    keyPearlsPreview: [
      'Mở khí quản chủ động sớm trong uốn ván độ II trở lên để kiểm soát co thắt thanh quản đột ngột gây tử vong',
      'Ưu tiên dùng Kháng thể uốn ván người (TIG) nếu có điều kiện để tránh nguy cơ sốc phản vệ so với huyết thanh ngựa (SAT)'
    ],
    guidelines: ['Hướng dẫn Chẩn đoán & Điều trị Uốn ván Bộ Y tế'],
    order: 7,
    articles: []
  },
  {
    id: 'sot-ret',
    slug: 'sot-ret',
    specialtyId: 'truyen-nhiem',
    name: 'Sốt Rét (Malaria)',
    nameEn: 'Malaria Infection (P. falciparum & P. vivax)',
    icd10: 'B54',
    icon: 'fa-temperature-arrow-up',
    color: '#eab308',
    badge: 'Bệnh Ký sinh trùng',
    summary: 'Nhận diện sốt rét ác tính (thể não, suy thận, đái huyết cầu tố), Artemisinin tiêm tĩnh mạch, điều trị tiệt căn thể ngủ P. vivax với Primaquine và sàng lọc G6PD.',
    keyPearlsPreview: [
      'Artesunate tiêm tĩnh mạch là thuốc lựa chọn hàng đầu cho sốt rét ác tính, vượt trội hơn Quinin',
      'Bắt buộc xét nghiệm men G6PD trước khi dùng Primaquine điều trị tiệt căn thể ngủ P. vivax để ngừa tán huyết cấp'
    ],
    guidelines: ['WHO Guidelines for Malaria 2024', 'Quyết định 2699/QĐ-BYT'],
    order: 8,
    articles: []
  }
];

// Gán danh sách bệnh lý vào chuyên khoa Truyền Nhiễm
HANDBOOK_SPECIALTIES[0].diseases = INFECTIOUS_DISEASES;

/**
 * Helper tra cứu nhanh
 */
export function getHandbookSpecialtyById(id: SpecialtyId): HandbookSpecialty | undefined {
  return HANDBOOK_SPECIALTIES.find(s => s.id === id);
}

export function getHandbookDisease(specialtyId: SpecialtyId, diseaseSlug: string): HandbookDisease | undefined {
  const specialty = getHandbookSpecialtyById(specialtyId);
  return specialty?.diseases.find(d => d.slug === diseaseSlug);
}

export function getHandbookArticle(specialtyId: SpecialtyId, diseaseSlug: string, articleSlug: string): HandbookArticle | undefined {
  const disease = getHandbookDisease(specialtyId, diseaseSlug);
  return disease?.articles.find(a => a.slug === articleSlug);
}

export function getAllHandbookArticles(): HandbookArticle[] {
  const articles: HandbookArticle[] = [];
  for (const spec of HANDBOOK_SPECIALTIES) {
    for (const dis of spec.diseases) {
      articles.push(...dis.articles);
    }
  }
  return articles;
}
