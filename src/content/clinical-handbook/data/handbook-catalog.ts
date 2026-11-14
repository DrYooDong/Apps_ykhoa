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
    badge: '10 Bệnh lý Trọng tâm',
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
        id: 'hbv-02-phac-do-dieu-tri-ngoai-tru',
        slug: 'hbv-02-phac-do-dieu-tri-ngoai-tru',
        diseaseId: 'viem-gan-b',
        specialtyId: 'truyen-nhiem',
        title: 'Phác Đồ Điều Trị Viêm Gan Siêu Vi B Mạn Ngoại Trú & Quản Lý Tình Huống Đặc Biệt',
        subtitle: 'Lựa chọn NAs hàng một, chỉnh liều suy thận, quản lý thai kỳ, đồng nhiễm và tiêu chuẩn ngưng thuốc (QĐ 1740/QĐ-BYT)',
        description: 'Hướng dẫn toàn diện phác đồ điều trị ngoại trú: cá thể hóa TDF/TAF/ETV, bảng hiệu chỉnh liều theo eGFR, phác đồ dự phòng lây truyền mẹ sang con (PMTCT), đồng nhiễm HIV/HCV, dự phòng tái hoạt hóa trị và tầm soát ung thư gan định kỳ.',
        estimatedMinutes: 25,
        tags: ['HBV', 'Điều trị ngoại trú', 'TDF', 'TAF', 'ETV', 'Chỉnh liều suy thận', 'Phụ nữ mang thai', 'QĐ 1740/QĐ-BYT', 'EBM 2026'],
        keyTakeaway: 'Ưu tiên TAF hoặc ETV trên người lớn tuổi hoặc suy thận; dùng TDF cho phụ nữ mang thai; tuyệt đối không ngưng NAs ở bệnh nhân xơ gan F4.',
        order: 2,
        filePath: 'truyen-nhiem/viem-gan-b/hbv-02-phac-do-dieu-tri-ngoai-tru.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-09',
        evidenceLevel: 'EBM 2026 • QĐ 1740/QĐ-BYT • EASL / AASLD',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây (The Bottom Line & Rule of Thumb)', icon: 'fa-bolt' },
          { id: 'sec-outpatient-goals', number: 2, title: 'Mục Tiêu & Bộ Tiêu Chuẩn Chỉ Định NAs Ngoại Trú', icon: 'fa-clipboard-check' },
          { id: 'sec-firstline-nas', number: 3, title: 'Phác Đồ Thuốc NAs Hàng Một (TDF vs TAF vs ETV)', icon: 'fa-pills' },
          { id: 'sec-renal-dosing', number: 4, title: 'Bảng Hiệu Chỉnh Liều Dùng Theo eGFR & Thận Nhân Tạo', icon: 'fa-droplet' },
          { id: 'sec-special-populations', number: 5, title: 'Phác Đồ 6 Tình Huống Đặc Biệt Thường Gặp Ngoại Trú', icon: 'fa-hospital-user' },
          { id: 'sec-stopping-criteria', number: 6, title: 'Tiêu Chuẩn Cân Nhắc Ngưng NAs & Theo Dõi Sau Ngưng', icon: 'fa-door-open' },
          { id: 'sec-monitoring-hcc', number: 7, title: 'Lịch Tái Khám Định Kỳ & Tầm Soát Ung Thư Gan (HCC)', icon: 'fa-calendar-check' },
          { id: 'sec-decision-algorithm', number: 8, title: 'Sơ Đồ Thuật Toán Quyết Định & Ray Dẫn Đường Tiếp Cận', icon: 'fa-diagram-project' },
          { id: 'sec-case-scenarios', number: 9, title: 'Ca Lâm Sàng Thực Chiến & Đúc Kết Xương Máu', icon: 'fa-user-doctor' },
          { id: 'sec-references', number: 10, title: 'Tài Liệu Tham Khảo (Chuẩn AMA Format)', icon: 'fa-book-bookmark' }
        ]
      },
      {
        id: 'hbv-03-quan-ly-dong-nhiem-va-dong-mac',
        slug: 'hbv-03-quan-ly-dong-nhiem-va-dong-mac',
        diseaseId: 'viem-gan-b',
        specialtyId: 'truyen-nhiem',
        title: 'Quản Lý Các Bệnh Lý Đồng Nhiễm & Đồng Mắc Với Viêm Gan Siêu Vi B Mạn Tính',
        subtitle: 'Phác đồ phối hợp HCV/HIV/HDV, MASLD, đái tháo đường, bảo vệ thận - xương và dự phòng tái hoạt khi hóa trị',
        description: 'Hướng dẫn chuyên sâu quản lý đa bệnh lý: phác đồ DAA cho HBV/HCV, khung xương ARV cho HBV/HIV, Bulevirtide cho HBV/HDV, chiến lược MASLD/T2DM và bảng chỉnh liều NAs suy thận (QĐ 1740/QĐ-BYT).',
        estimatedMinutes: 30,
        tags: ['HBV', 'Đồng nhiễm HCV', 'Đồng nhiễm HIV', 'Đồng nhiễm HDV', 'MASLD', 'Bulevirtide', 'Suy thận', 'Tái hoạt hóa trị', 'QĐ 1740/QĐ-BYT', 'EBM 2026'],
        keyTakeaway: 'Có bệnh đồng nhiễm hoặc đồng mắc là chỉ định khởi trị NAs ngay; ưu tiên TAF/ETV bảo vệ thận và xương; dùng NAs dự phòng trước 2 tuần khi hóa trị Rituximab.',
        order: 3,
        filePath: 'truyen-nhiem/viem-gan-b/hbv-03-quan-ly-dong-nhiem-va-dong-mac.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-09',
        evidenceLevel: 'EBM 2026 • QĐ 1740/QĐ-BYT • EASL / AASLD / APASL',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây (The Bottom Line & Rule of Thumb)', icon: 'fa-bolt' },
          { id: 'sec-concepts', number: 2, title: 'Phân Biệt Khái Niệm & Tác Động Hiệp Đồng Lên Xơ Hóa - Ung Thư Gan', icon: 'fa-diagram-project' },
          { id: 'sec-viral-coinfections', number: 3, title: 'Quản Lý Các Bệnh Đồng Nhiễm Virus (HCV, HIV, HDV)', icon: 'fa-virus' },
          { id: 'sec-metabolic-comorbidities', number: 4, title: 'Quản Lý Bệnh Lý Chuyển Hóa, MASLD & Bệnh Gan Do Rượu (ALD)', icon: 'fa-dna' },
          { id: 'sec-renal-bone-safety', number: 5, title: 'Hồ Sơ An Toàn Thận - Xương & Bảng Hiệu Chỉnh Liều NAs Theo eGFR', icon: 'fa-droplet' },
          { id: 'sec-immunosuppression-flare', number: 6, title: 'Phân Tầng Nguy Cơ & Dự Phòng Tái Hoạt Khi Hóa Trị / Ức Chế Miễn Dịch', icon: 'fa-shield-halved' },
          { id: 'sec-comorbidity-matrix', number: 7, title: 'Bảng Tổng Hợp Chiến Lược Quản Lý & Tương Tác Thuốc', icon: 'fa-table-list' },
          { id: 'sec-pitfalls', number: 8, title: 'Lưới Cạm Bẫy Lâm Sàng Trong Xử Trí Bệnh Đồng Mắc', icon: 'fa-triangle-exclamation' },
          { id: 'sec-case-scenarios', number: 9, title: 'Tuyển Tập 7 Ca Lâm Sàng Thực Chiến & Đúc Kết Xương Máu', icon: 'fa-user-doctor' },
          { id: 'sec-references', number: 10, title: 'Tài Liệu Tham Khảo (Chuẩn AMA Format)', icon: 'fa-book-bookmark' }
        ]
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
    id: 'viem-gan-c',
    slug: 'viem-gan-c',
    specialtyId: 'truyen-nhiem',
    name: 'Viêm Gan Siêu Vi C (HCV)',
    nameEn: 'Chronic Hepatitis C Virus Infection',
    icd10: 'B18.2',
    icon: 'fa-virus-slash',
    color: '#059669',
    badge: 'EBM 2026 • Đột phá DAA',
    summary: 'Đúc kết toàn diện từ động học HCV RNA vs Anti-HCV, xét nghiệm phản xạ Reflex Testing, phác đồ DAA toàn bộ kiểu gen 8-12 tuần, điều trị suy thận lọc máu đến dự phòng bùng phát HBV và kiểm soát tương tác thuốc tim mạch.',
    keyPearlsPreview: [
      'Anti-HCV (+) chỉ là sẹo huyết thanh; tuyệt đối không khởi trị DAA nếu chưa có xét nghiệm khẳng định vi rút sống (HCV RNA định lượng)',
      '30-50% người bệnh HCV mạn có ALT hoàn toàn bình thường nhưng xơ hóa vẫn âm thầm tiến triển (không dùng ALT để loại trừ bệnh)',
      'Phác đồ DAA pangenotypic (SOF/VEL, G/P) dùng liều tiêu chuẩn an toàn cho mọi mức eGFR kể cả bệnh nhân lọc máu chu kỳ',
      '100% bệnh nhân HCV trước khi dùng DAA phải được tầm soát HBsAg và kê NAs che chắn nếu HBsAg (+) để ngừa viêm gan bùng phát tối cấp'
    ],
    guidelines: ['Quyết định 2855/QĐ-BYT (2024)', 'AASLD-IDSA 2025/2026 HCV Guidance', 'EASL 2024 CPG', 'WHO 2024/2026 Consolidated Guidelines'],
    order: 2,
    articles: [
      {
        id: 'hcv-01-tieu-chuan-chan-doan-va-cam-bay',
        slug: 'hcv-01-tieu-chuan-chan-doan-va-cam-bay',
        diseaseId: 'viem-gan-c',
        specialtyId: 'truyen-nhiem',
        title: 'Tiêu Chuẩn Chẩn Đoán Viêm Gan Siêu Vi C & Cạm Bẫy Cận Lâm Sàng',
        subtitle: 'Nhận diện động học HCV RNA vs Anti-HCV, xét nghiệm phản xạ Reflex Testing, phân tầng xơ hóa APRI/FIB-4/FibroScan và 9 cạm bẫy thực chiến',
        description: 'Hướng dẫn toàn diện từ động học phân tử, tiêu chuẩn chẩn đoán cấp/mạn/lọc máu, xét nghiệm phản xạ reflex testing đến các cạm bẫy men gan bình thường và tiền phân tích men RNase.',
        estimatedMinutes: 25,
        tags: ['HCV', 'Tiêu chuẩn chẩn đoán', 'Reflex Testing', 'Anti-HCV', 'HCV RNA', 'HCVcAg', 'Bẫy Men Gan', 'FibroScan & APRI', 'QĐ 2855/QĐ-BYT', 'EBM 2026'],
        keyTakeaway: 'Anti-HCV (+) chỉ là sẹo huyết thanh (không điều trị DAA nếu chưa có HCV RNA); 30-50% bệnh nhân có men gan bình thường nhưng xơ hóa vẫn âm thầm tiến triển.',
        order: 1,
        filePath: 'truyen-nhiem/viem-gan-c/hcv-01-tieu-chuan-chan-doan-va-cam-bay.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-14',
        evidenceLevel: 'EBM 2026 • AASLD / EASL / BYT',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây (The Bottom Line & Rule of Thumb)', icon: 'fa-bolt' },
          { id: 'sec-kinetics', number: 2, title: 'Động Học Dấu Ấn Sinh Học & Ý Nghĩa Lâm Sàng (HCV RNA, HCVcAg, Anti-HCV)', icon: 'fa-dna' },
          { id: 'sec-criteria', number: 3, title: 'Bộ Tiêu Chuẩn Chẩn Đoán Cốt Lõi (Cấp, Mạn, Quần Thể Đặc Biệt)', icon: 'fa-clipboard-check' },
          { id: 'sec-fibrosis', number: 4, title: 'Đánh Giá Giai Đoạn Xơ Hóa Gan Không Xâm Lấn (APRI, FIB-4, FibroScan)', icon: 'fa-wave-square' },
          { id: 'sec-reflex-testing', number: 5, title: 'Chiến Lược Sàng Lọc & Xét Nghiệm Phản Xạ (Reflex HCV RNA Testing)', icon: 'fa-arrows-spin' },
          { id: 'sec-outpatient-pitfalls', number: 6, title: 'Năm Sai Lầm Thường Gặp Tại Phòng Khám Ngoại Trú', icon: 'fa-triangle-exclamation' },
          { id: 'sec-inpatient-pitfalls', number: 7, title: 'Bốn Lỗ Hổng & Cơ Hội Bị Bỏ Sót Tại Nội Viện', icon: 'fa-hospital-user' },
          { id: 'sec-preanalytical', number: 8, title: 'Cạm Bẫy Tiền Phân Tích & Giới Hạn Kỹ Thuật (Men RNase, LOD vs LLOQ)', icon: 'fa-flask-vial' },
          { id: 'sec-serology-matrix', number: 9, title: 'Ma Trận 7 Tổ Hợp Xét Nghiệm & Hành Động Lâm Sàng', icon: 'fa-table-list' },
          { id: 'sec-flowchart-steps', number: 10, title: 'Lưu Đồ 6 Bước Tiếp Cận Chuẩn Hóa Ngoại Trú & Nội Viện', icon: 'fa-diagram-project' },
          { id: 'sec-case-scenarios', number: 11, title: 'Ca Lâm Sàng Thực Tế & Bài Học Xương Máu', icon: 'fa-user-doctor' },
          { id: 'sec-references', number: 12, title: 'Tài Liệu Tham Khảo (Chuẩn AMA)', icon: 'fa-book-bookmark' }
        ]
      },
      {
        id: 'hcv-02-phac-do-dieu-tri-ngoai-tru',
        slug: 'hcv-02-phac-do-dieu-tri-ngoai-tru',
        diseaseId: 'viem-gan-c',
        specialtyId: 'truyen-nhiem',
        title: 'Phác Đồ Điều Trị Viêm Gan Siêu Vi C Ngoại Trú & Giám Sát SVR12',
        subtitle: 'Lựa chọn phác đồ DAA toàn bộ kiểu gen (SOF/VEL, G/P, SOF/DAC), quản lý 7 quần thể ngoại trú đặc biệt, xử trí quên liều và tầm soát HCC',
        description: 'Đặc tả phác đồ DAA đường uống 8-12 tuần, không cần giảm liều ở người suy thận lọc máu, kiểm soát tương tác PPI/Amiodarone/Statin và thuật toán xử trí gián đoạn thuốc.',
        estimatedMinutes: 25,
        tags: ['HCV', 'Phác đồ DAA', 'Pangenotypic', 'SOF/VEL', 'Glecaprevir/Pibrentasvir', 'SOF/DAC', 'SVR12', 'Suy thận lọc máu', 'Xử trí quên liều', 'QĐ 2855/QĐ-BYT'],
        keyTakeaway: 'Phác đồ DAA toàn bộ kiểu gen dùng liều chuẩn cho mọi mức eGFR kể cả lọc máu; cấm dùng thuốc ức chế Protease ở xơ gan mất bù; tầm soát HCC mỗi 6 tháng suốt đời cho nhóm F3-F4.',
        order: 2,
        filePath: 'truyen-nhiem/viem-gan-c/hcv-02-phac-do-dieu-tri-ngoai-tru.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-14',
        evidenceLevel: 'EBM 2026 • AASLD / EASL / BYT',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây (The Bottom Line & DAA Rules)', icon: 'fa-bolt' },
          { id: 'sec-pre-treatment', number: 2, title: 'Quy Trình Đánh Giá & Danh Mục Xét Nghiệm Tiền Trị (QĐ 2855)', icon: 'fa-stethoscope' },
          { id: 'sec-regimens', number: 3, title: 'Phác Đồ DAA Ngoại Trú Chuẩn Mực (SOF/VEL, G/P, SOF/DAC, SOF/LED)', icon: 'fa-pills' },
          { id: 'sec-pediatric', number: 4, title: 'Phác Đồ Phân Liều Cho Trẻ Em & Thanh Thiếu Niên (3 - 17 Tuổi)', icon: 'fa-child' },
          { id: 'sec-special-populations', number: 5, title: 'Quản Lý 7 Quần Thể Ngoại Trú Đặc Biệt (HBV, HIV, CKD, DDI, Quên Liều, Thai Kỳ, Rescue)', icon: 'fa-shield-halved' },
          { id: 'sec-monitoring-svr12', number: 6, title: 'Lịch Trình Tái Khám, Tiêu Chuẩn Ngừng Thuốc & Xác Định SVR12', icon: 'fa-clock-rotate-left' },
          { id: 'sec-post-svr12-hcc', number: 7, title: 'Chiến Lược Quản Lý Dài Hạn & Tầm Soát HCC Sau SVR12 (F3 - F4)', icon: 'fa-crosshairs' },
          { id: 'sec-bedside-cases', number: 8, title: 'Ca Lâm Sàng Ngoại Trú Thực Chiến & Đúc Kết Xương Máu', icon: 'fa-user-doctor' },
          { id: 'sec-references', number: 9, title: 'Tài Liệu Tham Khảo (Chuẩn AMA)', icon: 'fa-book-bookmark' }
        ]
      },
      {
        id: 'hcv-03-quan-ly-dong-nhiem-va-dong-mac',
        slug: 'hcv-03-quan-ly-dong-nhiem-va-dong-mac',
        diseaseId: 'viem-gan-c',
        specialtyId: 'truyen-nhiem',
        title: 'Quản Lý Bệnh Lý Đồng Nhiễm & Đồng Mắc Với Viêm Gan Siêu Vi C',
        subtitle: 'Khung bệnh sinh hệ thống, phác đồ đồng nhiễm HBV/HIV/HDV, suy thận mạn eGFR ≤ 30, rối loạn chuyển hóa MASLD/ĐTĐ týp 2, viêm mạch Cryoglobulinemia và tương tác tim mạch',
        description: 'Hướng dẫn quản lý toàn diện các bệnh đồng nhiễm qua đường máu, an toàn kê đơn DAA trên bệnh nhân suy thận nặng/lọc máu, cạm bẫy tương tác thuốc và bảng kiểm 6 bước ngoại trú.',
        estimatedMinutes: 30,
        tags: ['HCV', 'Đồng nhiễm HBV', 'Đồng nhiễm HIV', 'Suy thận CKD', 'MASLD', 'Đái tháo đường', 'Cryoglobulinemia', 'Amiodarone & Statin', 'QĐ 2855/QĐ-BYT', 'EBM 2026'],
        keyTakeaway: 'Bắt buộc khởi trị NAs che chắn cho 100% ca HBsAg (+) để ngăn bùng phát viêm gan B; chủ động giảm 15-30% liều insulin khi bắt đầu DAA; chống chỉ định tuyệt đối Amiodarone với Sofosbuvir.',
        order: 3,
        filePath: 'truyen-nhiem/viem-gan-c/hcv-03-quan-ly-dong-nhiem-va-dong-mac.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-14',
        evidenceLevel: 'EBM 2026 • AASLD / EASL / BYT',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây (The Bottom Line & Comorbidity Rules)', icon: 'fa-bolt' },
          { id: 'sec-pathophysiology', number: 2, title: 'Khung Bệnh Sinh Học Hệ Thống Của Nhiễm HCV & Gia Tốc Xơ Hóa', icon: 'fa-network-wired' },
          { id: 'sec-viral-coinfections', number: 3, title: 'Đồng Nhiễm Vi Rút Qua Đường Máu: HBV, HIV Và HDV', icon: 'fa-virus-slash' },
          { id: 'sec-ckd-dialysis', number: 4, title: 'Bệnh Thận Mạn Tính (CKD) & Quản Lý Trên Bệnh Nhân Lọc Máu Chu Kỳ', icon: 'fa-kidneys' },
          { id: 'sec-metabolic-masld', number: 5, title: 'Rối Loạn Chuyển Hóa, Đái Tháo Đường Týp 2 & Gan Nhiễm Mỡ (MASLD)', icon: 'fa-droplet' },
          { id: 'sec-cardiovascular-ddi', number: 6, title: 'Bệnh Tim Mạch & Các Cạm Bẫy Tương Tác Thuốc DAA Chí Mạng', icon: 'fa-heart-pulse' },
          { id: 'sec-extrahepatic', number: 7, title: 'Biểu Hiện Ngoài Gan: Viêm Mạch Cryoglobulinemia & U Lympho B', icon: 'fa-snowflake' },
          { id: 'sec-tb-alcohol-pwid', number: 8, title: 'Các Tình Huống Đặc Thù: Lao Phổi (Rifampicin), Rượu & Quần Thể PWID', icon: 'fa-capsules' },
          { id: 'sec-bedside-cases', number: 9, title: 'Bảy Ca Lâm Sàng Ngoại Trú Thực Chiến Minh Họa', icon: 'fa-user-doctor' },
          { id: 'sec-checklist', number: 10, title: 'Bảng Kiểm 6 Bước Quản Lý Bệnh Đồng Mắc Ngoại Trú (Checklist DAA)', icon: 'fa-clipboard-check' },
          { id: 'sec-references', number: 11, title: 'Tài Liệu Tham Khảo (Chuẩn AMA)', icon: 'fa-book-bookmark' }
        ]
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
    articles: [
      {
        id: 'dengue-01-chan-doan-phan-do-va-dong-hoc',
        slug: 'dengue-01-chan-doan-phan-do-va-dong-hoc',
        diseaseId: 'sot-xuat-huyet-dengue',
        specialtyId: 'truyen-nhiem',
        title: 'Tiếp Cận Chẩn Đoán Xác Định, Phân Độ & Động Học Sốt Xuất Huyết Dengue',
        subtitle: 'Giá trị các yếu tố lâm sàng, cận lâm sàng, dấu hiệu cảnh báo (DWS) và nhận diện sớm sốc thoát huyết tương theo QĐ 2760/QĐ-BYT',
        description: 'Hướng dẫn toàn diện từ cơ chế thoát huyết tương, động học Hct - Tiểu cầu - NS1Ag, bộ dấu hiệu cảnh báo (DWS), phân độ BYT 2760 / WHO 2009 đến 3 ca lâm sàng thực chiến có bẫy tán huyết Coombs (+).',
        estimatedMinutes: 25,
        tags: ['Sốt xuất huyết Dengue', 'Tiêu chuẩn chẩn đoán', 'Dấu hiệu cảnh báo DWS', 'Hematocrit', 'Tiểu cầu', 'NS1Ag', 'Sốc SXHD', 'QĐ 2760/QĐ-BYT', 'EBM 2026'],
        keyTakeaway: 'Thời điểm nguy hiểm nhất là khi bắt đầu hạ sốt (N3-N7); Hct tăng ≥ 20% là tiêu chuẩn vàng cô đặc máu; tuyệt đối ngưng bù dịch ở pha tái hấp thu để ngừa phù phổi cấp.',
        order: 1,
        filePath: 'truyen-nhiem/sot-xuat-huyet-dengue/dengue-01-chan-doan-phan-do-va-dong-hoc.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-09',
        evidenceLevel: 'EBM 2026 • QĐ 2760/QĐ-BYT • WHO 2024/2025',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây (The Bottom Line & Rule of Thumb)', icon: 'fa-bolt' },
          { id: 'sec-pathophysiology-3phases', number: 2, title: 'Tổng Quan Sinh Lý Bệnh & Động Học 3 Giai Đoạn Bệnh', icon: 'fa-diagram-project' },
          { id: 'sec-clinical-dws-staging', number: 3, title: 'Giá Trị Yếu Tố Lâm Sàng, Dấu Hiệu Cảnh Báo (DWS) & Phân Độ', icon: 'fa-clipboard-check' },
          { id: 'sec-lab-biomarkers-cbc', number: 4, title: 'Giá Trị Cận Lâm Sàng: Dấu Ấn Vi Sinh & Động Học Công Thức Máu', icon: 'fa-vial-virus' },
          { id: 'sec-biochem-imaging-pitfalls', number: 5, title: 'Sinh Hóa Máu, Chẩn Đoán Hình Ảnh & Cạm Bẫy Lâm Sàng', icon: 'fa-triangle-exclamation' },
          { id: 'sec-decision-flow', number: 6, title: 'Lưu Đồ Thuật Toán Phân Tầng & Ray Dẫn Đường Quyết Định', icon: 'fa-route' },
          { id: 'sec-case-scenarios', number: 7, title: 'Tuyển Tập 3 Ca Lâm Sàng Thực Chiến & Biện Luận Phức Tạp', icon: 'fa-user-doctor' },
          { id: 'sec-self-assessment', number: 8, title: 'Bộ Câu Hỏi Tự Đánh Giá & Đáp Án Biện Luận Y Khoa', icon: 'fa-circle-question' },
          { id: 'sec-references', number: 9, title: 'Tài Liệu Tham Khảo (Chuẩn AMA Format)', icon: 'fa-book-bookmark' }
        ]
      },
      {
        id: 'dengue-02-viem-gan-nang-va-suy-gan-cap',
        slug: 'dengue-02-viem-gan-nang-va-suy-gan-cap',
        diseaseId: 'sot-xuat-huyet-dengue',
        specialtyId: 'truyen-nhiem',
        title: 'Tiếp Cận Bệnh Nhân Sốt Xuất Huyết Dengue Có Men Gan > 1000 U/L (Viêm Gan Nặng & Suy Gan Cấp)',
        subtitle: 'Phân tầng DISH vs ALF, bẫy Ringer Lactate/Paracetamol, phác đồ N-Acetylcysteine và lọc máu cấp cứu (QĐ 2760/QĐ-BYT)',
        description: 'Hướng dẫn toàn diện từ cơ chế 5 tầng hoại tử tế bào gan, thang điểm MELD, tiêu chuẩn chẩn đoán Viêm gan nặng (DISH) và Suy gan cấp (ALF) đến phác đồ dịch truyền NaCl 0.9%, NAC tĩnh mạch, TPE/CRRT và phân tích 3 ca thực chiến có bẫy tán huyết.',
        estimatedMinutes: 25,
        tags: ['Sốt xuất huyết Dengue', 'Men gan > 1000 U/L', 'Viêm gan nặng (DISH)', 'Suy gan cấp (ALF)', 'N-Acetylcysteine (NAC)', 'Thay huyết tương (TPE)', 'MELD Score', 'Bẫy Ringer Lactate', 'QĐ 2760/QĐ-BYT', 'EBM 2026'],
        keyTakeaway: 'Men gan AST/ALT ≥ 1000 U/L là SXHD nặng; chống chỉ định Ringer Lactate và ngưng tuyệt đối Paracetamol; dùng ngay NAC khi có Bệnh não gan + INR ≥ 1.5 hoặc MELD ≥ 15.',
        order: 2,
        filePath: 'truyen-nhiem/sot-xuat-huyet-dengue/dengue-02-viem-gan-nang-va-suy-gan-cap.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-09',
        evidenceLevel: 'EBM 2026 • QĐ 2760/QĐ-BYT • WHO 2025',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây (The Bottom Line & Rule of Thumb)', icon: 'fa-bolt' },
          { id: 'sec-definition-staging', number: 2, title: 'Định Nghĩa, Phân Tầng DISH - ALF & Gánh Nặng Dịch Tễ', icon: 'fa-layer-group' },
          { id: 'sec-pathophysiology', number: 3, title: 'Cơ Chế Bệnh Sinh 5 Tầng Tổn Thương Gan & Editorial SVG', icon: 'fa-diagram-project' },
          { id: 'sec-clinical-biomarkers', number: 4, title: 'Đặc Điểm Lâm Sàng, Động Học AST > ALT & Thang Điểm MELD', icon: 'fa-chart-line' },
          { id: 'sec-diagnostic-flowtrack', number: 5, title: 'Quy Trình 4 Bước Phân Tầng & Bảng Chẩn Đoán Phân Biệt', icon: 'fa-route' },
          { id: 'sec-treatment-protocol', number: 6, title: 'Phác Đồ Hồi Sức Tích Cực, Liệu Pháp NAC & Thay Huyết Tương', icon: 'fa-heart-pulse' },
          { id: 'sec-pitfalls-grid', number: 7, title: 'Lưới 4 Cạm Bẫy Lâm Sàng Tử Vong Trong Suy Gan Dengue', icon: 'fa-triangle-exclamation' },
          { id: 'sec-case-scenarios', number: 8, title: 'Tuyển Tập 3 Ca Lâm Sàng Thực Chiến & Biện Luận Phức Tạp', icon: 'fa-user-doctor' },
          { id: 'sec-self-assessment', number: 9, title: 'Bộ Câu Hỏi Tự Đánh Giá & Đáp Án Biện Luận Y Khoa', icon: 'fa-circle-question' },
          { id: 'sec-references', number: 10, title: 'Tài Liệu Tham Khảo (Chuẩn AMA Format)', icon: 'fa-book-bookmark' }
        ]
      },
      {
        id: 'dengue-03-chi-dinh-truyen-tieu-cau',
        slug: 'dengue-03-chi-dinh-truyen-tieu-cau',
        diseaseId: 'sot-xuat-huyet-dengue',
        specialtyId: 'truyen-nhiem',
        title: 'Chỉ Định Truyền Tiểu Cầu Trong Sốt Xuất Huyết Dengue: Từ Bằng Chứng Đến Thực Hành Lâm Sàng',
        subtitle: 'Động học giảm tiểu cầu, sự phân ly lâm sàng, ngưỡng truyền điều trị vs chống truyền dự phòng (ADEPT), biến chứng TACO/TRALI, chỉ số IPF và HLH thứ phát',
        description: 'Hướng dẫn thực hành toàn diện dựa trên QĐ 2760/QĐ-BYT (Phụ lục 17 & mục C.2.7), WHO 2024–2025 và thử nghiệm ADEPT (Lancet 2017): phân tích 3 cơ chế giảm tiểu cầu, 5 ngưỡng chỉ định truyền tiểu cầu, hồi sức đa chế phẩm, lựa chọn RDP/SDP và 4 ca lâm sàng thực chiến.',
        estimatedMinutes: 25,
        tags: ['Sốt xuất huyết Dengue', 'Truyền tiểu cầu', 'Ngưỡng tiểu cầu', 'ADEPT Trial', 'Chỉ số IPF', 'TACO & TRALI', 'HLH thứ phát', 'QĐ 2760/QĐ-BYT', 'WHO 2024–2025', 'EBM 2026'],
        keyTakeaway: 'Tuyệt đối không truyền tiểu cầu dự phòng theo con số nếu không có xuất huyết nặng; truyền khi xuất huyết nặng (< 50.000/mm³), chọc dò giảm áp (< 50.000/mm³), thủ thuật xâm lấn (< 30.000/mm³), trước mổ cấp cứu (đích > 75.000/mm³) hoặc cá thể hóa khi < 5.000/mm³ kèm nguy cơ cao.',
        order: 3,
        filePath: 'truyen-nhiem/sot-xuat-huyet-dengue/dengue-03-chi-dinh-truyen-tieu-cau.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-10',
        evidenceLevel: 'EBM 2026 • QĐ 2760/QĐ-BYT • WHO 2024–2025',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây & Đặt Vấn Đề Lâm Sàng', icon: 'fa-bolt' },
          { id: 'sec-pathophysiology', number: 2, title: 'Sinh Lý Bệnh Giảm Tiểu Cầu, Động Học & Sự Phân Ly Lâm Sàng', icon: 'fa-dna' },
          { id: 'sec-indications', number: 3, title: 'Các Trường Hợp Có Chỉ Định Truyền Tiểu Cầu & Ngưỡng Mục Tiêu', icon: 'fa-bullseye' },
          { id: 'sec-evidence-risks', number: 4, title: 'Bằng Chứng Chống Truyền Dự Phòng (ADEPT), Biến Chứng & Chỉ Số IPF', icon: 'fa-shield-halved' },
          { id: 'sec-protocol-dosing', number: 5, title: 'Quy Trình, Lựa Chọn Chế Phẩm, Liều Lượng & Theo Dõi An Toàn', icon: 'fa-droplet' },
          { id: 'sec-case-scenarios', number: 6, title: 'Tuyển Tập 4 Ca Lâm Sàng Minh Họa Thực Tế', icon: 'fa-user-doctor' },
          { id: 'sec-bedside-checklist', number: 7, title: 'Bảng Kiểm Thực Hành & Lưu Đồ Ra Quyết Định Tại Giường Bệnh', icon: 'fa-route' },
          { id: 'sec-take-home', number: 8, title: 'Kết Luận & 5 Thông Điệp Thực Hành Cốt Lõi', icon: 'fa-lightbulb' },
          { id: 'sec-references', number: 9, title: 'Tài Liệu Tham Khảo (Định Dạng AMA)', icon: 'fa-book-bookmark' }
        ]
      },
      {
        id: 'dengue-04-sot-cap-ns1-am-tinh-giam-tieu-cau',
        slug: 'dengue-04-sot-cap-ns1-am-tinh-giam-tieu-cau',
        diseaseId: 'sot-xuat-huyet-dengue',
        specialtyId: 'truyen-nhiem',
        title: 'Tiếp Cận Chẩn Đoán Sốt Cấp Tính Có NS1Ag Âm Tính & Tiểu Cầu Giảm Dần',
        subtitle: 'Giải mã hiện tượng NS1Ag âm tính giả trong nhiễm thứ phát, hệ thống 3 nhóm chẩn đoán phân biệt nhiệt đới và lưu đồ xử trí 3 bước',
        description: 'Chiến lược tiếp cận sốt cấp kèm giảm tiểu cầu khi NS1Ag âm tính: động học NS1 và phức hợp miễn dịch IgG, 3 chiến lược xét nghiệm giải cứu (RDT bộ ba, RT-PCR, huyết thanh kép), phân biệt Arbovirus, nhiễm khuẩn huyết, sốt mò, sốt rét, Leptospirosis, thương hàn, HLH, TMA, G6PD và 4 ca lâm sàng thực chiến.',
        estimatedMinutes: 25,
        tags: ['Sốt xuất huyết Dengue', 'NS1Ag âm tính', 'Giảm tiểu cầu', 'Âm tính giả', 'Chẩn đoán phân biệt', 'Nhiễm khuẩn huyết', 'Sốt mò', 'Leptospirosis', 'HLH thứ phát', 'TMA & G6PD', 'WHO 2025', 'QĐ 2760/QĐ-BYT'],
        keyTakeaway: 'Tuyệt đối không loại trừ SXHD chỉ vì NS1Ag (-) từ ngày 4–7 hay nhiễm thứ phát (độ nhạy giảm còn 67,1–77,3%); phối hợp bộ ba NS1+IgM+IgG hoặc RT-PCR, đồng thời sàng lọc nhiễm khuẩn huyết, sốt mò, sốt rét, Leptospirosis, HLH và TMA.',
        order: 4,
        filePath: 'truyen-nhiem/sot-xuat-huyet-dengue/dengue-04-sot-cap-ns1-am-tinh-giam-tieu-cau.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-11',
        evidenceLevel: 'EBM 2026 • WHO 2025 • QĐ 2760/QĐ-BYT',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây & Thách Thức Chẩn Đoán', icon: 'fa-bolt' },
          { id: 'sec-ns1-kinetics', number: 2, title: 'Giải Mã Hiện Tượng NS1Ag Âm Tính Giả & Chiến Lược Khắc Phục', icon: 'fa-vial-virus' },
          { id: 'sec-differential-system', number: 3, title: 'Hệ Thống 3 Nhóm Chẩn Đoán Phân Biệt Sốt Cấp Giảm Tiểu Cầu', icon: 'fa-layer-group' },
          { id: 'sec-diagnostic-flow', number: 4, title: 'Lưu Đồ & Chiến Lược Cận Lâm Sàng Tiếp Cận Từng Bước', icon: 'fa-route' },
          { id: 'sec-pitfalls', number: 5, title: 'Lưới Cạm Bẫy Lâm Sàng Sống Còn Cần Tránh', icon: 'fa-triangle-exclamation' },
          { id: 'sec-case-scenarios', number: 6, title: 'Tuyển Tập 4 Ca Lâm Sàng Thực Chiến & Biện Luận Phức Tạp', icon: 'fa-user-doctor' },
          { id: 'sec-recommendations', number: 7, title: '5 Khuyến Cáo Thực Hành Lâm Sàng Cho Bác Sĩ Điều Trị', icon: 'fa-lightbulb' },
          { id: 'sec-references', number: 8, title: 'Tài Liệu Tham Khảo (Định Dạng AMA)', icon: 'fa-book-bookmark' }
        ]
      }
    ]
  },
  {
    id: 'ap-xe-gan',
    slug: 'ap-xe-gan',
    specialtyId: 'truyen-nhiem',
    name: 'Áp Xe Gan (Liver Abscess)',
    nameEn: 'Amoebic, Pyogenic, Fasciola & Fungal Liver Abscess',
    icd10: 'K75.0 / A06.4',
    icon: 'fa-microscope',
    color: '#0d9488',
    badge: 'EBM 2026 • Đa căn nguyên',
    summary: 'Tiếp cận tam giác chẩn đoán truyền nhiễm (Dịch tễ – Lâm sàng – Cận lâm sàng) phân biệt 4 căn nguyên gây áp xe gan: Amip (ALA), Vi khuẩn sinh mủ (PLA), Sán lá gan lớn (Fasciola) và Nấm (Aspergillus).',
    keyPearlsPreview: [
      'Áp xe gan Amip (ALA): ưu thế nam trẻ uống rượu (4:1–14:1), ổ đơn độc thùy phải dấu "bia đôi", mủ nâu "sốt cá cơm" vô khuẩn, tiêu chảy chỉ < 1/3 ca',
      'Áp xe vi khuẩn (PLA): lớn tuổi, ĐTĐ/sỏi mật, dấu "cụm" (cluster sign), cảnh giác Klebsiella pneumoniae sinh khí & di căn mắt/màng não',
      'Sán lá gan lớn (Fasciola): ăn rau thủy sinh, tăng mạnh Eosinophil, cụm "hình tổ ong" dễ nhầm u gan — dùng Triclabendazole, tránh chọc hút',
      'Áp xe gan do Nấm (Aspergillus): 86% suy giảm miễn dịch sâu, cấy máu nhạy chỉ 11% — định hướng Galactomannan & sinh thiết sợi nấm 45°'
    ],
    guidelines: ['Quyết định 1203/QĐ-BYT (2022)', 'Quyết định 487/QĐ-BYT (2021)', 'IDSA / EBM 2026'],
    order: 3,
    articles: [
      {
        id: 'ap-xe-gan-01-tam-giac-chan-doan-phan-biet-can-nguyen',
        slug: 'ap-xe-gan-01-tam-giac-chan-doan-phan-biet-can-nguyen',
        diseaseId: 'ap-xe-gan',
        specialtyId: 'truyen-nhiem',
        title: 'Tiếp Cận Tam Giác Chẩn Đoán Truyền Nhiễm Trong Phân Biệt Các Căn Nguyên Gây Áp Xe Gan',
        subtitle: 'Phân biệt Amip (ALA), Vi khuẩn sinh mủ (PLA), Sán lá gan lớn (Fasciola) và Nấm (Aspergillus) qua 3 đỉnh Dịch tễ – Lâm sàng – Cận lâm sàng',
        description: 'Vận dụng mô hình tam giác chẩn đoán truyền nhiễm để nhận diện và điều trị trúng đích 4 căn nguyên gây áp xe gan, bảng ma trận so sánh 7 tiêu chí, cạm bẫy chẩn đoán và 4 ca lâm sàng thực tế (vỡ màng phổi, Actinomyces, Fasciola, Aspergillus).',
        estimatedMinutes: 25,
        tags: ['Áp xe gan', 'Tam giác chẩn đoán', 'Áp xe gan Amip (ALA)', 'Áp xe gan vi khuẩn (PLA)', 'Sán lá gan lớn (Fasciola)', 'Áp xe gan do nấm (Aspergillus)', 'Klebsiella pneumoniae', 'Actinomyces', 'QĐ 1203/QĐ-BYT', 'EBM 2026'],
        keyTakeaway: 'Kết hợp 3 đỉnh Dịch tễ – Lâm sàng – Cận lâm sàng/CT ("bia đôi" ALA, "cụm" PLA, "tổ ong" + Eosinophil Fasciola, Galactomannan + SGMD Aspergillus) giúp chọn đúng điều trị đặc hiệu và tránh chọc hút hay kháng sinh mù quáng.',
        order: 1,
        filePath: 'truyen-nhiem/ap-xe-gan/ap-xe-gan-01-tam-giac-chan-doan-phan-biet-can-nguyen.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-11',
        evidenceLevel: 'EBM 2026 • QĐ 1203/QĐ-BYT • QĐ 487/QĐ-BYT',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây & Mục Tiêu Bài Học', icon: 'fa-bolt' },
          { id: 'sec-diagnostic-triangle', number: 2, title: 'Mô Hình Tam Giác Chẩn Đoán Truyền Nhiễm', icon: 'fa-diagram-project' },
          { id: 'sec-four-etiologies', number: 3, title: 'Phân Tích 4 Căn Nguyên Theo Tam Giác Chẩn Đoán', icon: 'fa-layer-group' },
          { id: 'sec-comparison-matrix', number: 4, title: 'Bảng Tổng Hợp So Sánh & Lưu Đồ Tiếp Cận Tại Giường', icon: 'fa-table-list' },
          { id: 'sec-pitfalls', number: 5, title: 'Lưới Cạm Bẫy Chẩn Đoán & Điều Trị Sống Còn', icon: 'fa-triangle-exclamation' },
          { id: 'sec-case-scenarios', number: 6, title: 'Tuyển Tập 4 Ca Lâm Sàng Minh Họa & Biện Luận', icon: 'fa-user-doctor' },
          { id: 'sec-references', number: 7, title: 'Tài Liệu Tham Khảo (Theo Chuẩn AMA)', icon: 'fa-book-bookmark' }
        ]
      }
    ]
  },
  {
    id: 'nhiem-khuan-huyet',
    slug: 'sepsis',
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
    order: 4,
    articles: [
      {
        id: 'sepsis-01-tiep-can-ban-dau-va-quan-ly-ssc-2026',
        slug: 'sepsis-01-tiep-can-ban-dau-va-quan-ly-ssc-2026',
        diseaseId: 'nhiem-khuan-huyet',
        specialtyId: 'truyen-nhiem',
        title: 'Tiếp Cận Ban Đầu & Quản Lý Nhiễm Trùng Huyết - Sốc Nhiễm Trùng Theo Surviving Sepsis Campaign (SSC) 2026',
        subtitle: 'Đồng thuận Sepsis-3, sàng lọc NEWS2 vs qSOFA, kháng sinh 1 giờ vs 3 giờ, Noradrenalin ngoại vi sớm, hồi sức dịch 30 mL/kg và kiểm soát nguồn nhiễm trong 6 giờ',
        description: 'Cẩm nang thực chiến chẩn đoán và hồi sức nhiễm trùng huyết & sốc nhiễm trùng theo hướng dẫn mới nhất SSC 2026: tối ưu hóa PK/PD kháng sinh, nghiệm pháp PLR đánh giá đáp ứng dịch, phân tầng thuốc vận mạch 3 bậc và ca lâm sàng thực tế tại khoa cấp cứu.',
        estimatedMinutes: 30,
        keyTakeaway: 'Dùng kháng sinh trong vòng 1 giờ cho mọi ca sốc hoặc sepsis chắc chắn; Noradrenalin sớm qua ngoại vi nếp khuỷu; bù 30 mL/kg Ringer Lactate trong 3h rồi đánh giá động (PLR); kiểm soát nguồn nhiễm triệt để ≤ 6 giờ.',
        order: 1,
        filePath: 'truyen-nhiem/sepsis/sepsis-01-tiep-can-ban-dau-va-quan-ly-ssc-2026.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-14',
        evidenceLevel: 'EBM 2026 • Surviving Sepsis Campaign (SSC) • Sepsis-3',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây & Mục Tiêu Học Tập', icon: 'fa-bolt' },
          { id: 'sec-definitions-framework', number: 2, title: 'Định Nghĩa Sepsis-3 & Khung Phân Tầng SSC 2026', icon: 'fa-diagram-project' },
          { id: 'sec-screening-early-warning', number: 3, title: 'Nhận Diện & Sàng Lọc: NEWS2 vs qSOFA', icon: 'fa-clipboard-check' },
          { id: 'sec-antimicrobial-timing', number: 4, title: 'Kháng Sinh 1 Giờ vs 3 Giờ & Tối Ưu Hóa PK/PD', icon: 'fa-clock' },
          { id: 'sec-fluid-resuscitation', number: 5, title: 'Hồi Sức Dịch Ban Đầu & Đánh Giá Động (PLR)', icon: 'fa-droplet' },
          { id: 'sec-vasopressors-inotropes', number: 6, title: 'Vận Mạch Ngoại Vi Sớm & Thuốc Bổ Trợ', icon: 'fa-heart-pulse' },
          { id: 'sec-source-control', number: 7, title: 'Kiểm Soát Nguồn Nhiễm Khẩn Cấp ≤ 6 Giờ', icon: 'fa-crosshairs' },
          { id: 'sec-clinical-pitfalls', number: 8, title: 'Lưới Cạm Bẫy Lâm Sàng & Cờ Đỏ Tử Vong', icon: 'fa-triangle-exclamation' },
          { id: 'sec-case-scenario', number: 9, title: 'Ca Lâm Sàng Thực Chiến: Sốc Nhiễm Trùng Đường Mật', icon: 'fa-user-doctor' },
          { id: 'sec-references', number: 10, title: 'Tài Liệu Tham Khảo (Chuẩn AMA Format)', icon: 'fa-book-bookmark' }
        ],
        tags: [
          'Nhiễm trùng huyết',
          'Sốc nhiễm trùng',
          'Surviving Sepsis Campaign 2026',
          'Sepsis-3',
          'NEWS2',
          'qSOFA',
          'Kháng sinh 1 giờ',
          'Norepinephrine ngoại vi',
          'Hồi sức dịch 30 mL/kg',
          'Đánh giá PLR',
          'Source Control',
          'EBM 2026'
        ]
      }
    ]
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
    guidelines: ['WHO 2024 Meningitis Manual', 'Quyết định 4068/QĐ-BYT', 'EAN/ESCMID 2026 Encephalitis Guidelines', 'IDSA Meningitis Guidelines'],
    order: 5,
    articles: [
      {
        id: 'vmn-01-phan-tich-ket-qua-dich-nao-tuy',
        slug: 'vmn-01-phan-tich-ket-qua-dich-nao-tuy',
        diseaseId: 'viem-nao-mang-nao',
        specialtyId: 'truyen-nhiem',
        title: 'Phân Tích Các Kết Quả Chọc Dò Dịch Não Tủy Thường Gặp',
        subtitle: 'Áp lực mở, đại thể, tế bào – sinh hóa, vi sinh, bảng đối chiếu 6 hội chứng, công thức hiệu chỉnh chạm mạch và bẫy phân ly đạm - tế bào',
        description: 'Hướng dẫn thực chiến đọc kết quả dịch não tủy (DNT): đo áp lực mở & đại thể (xanthochromia, màng mạng nhện), tế bào học, tỷ số Glucose DNT/máu, Lactate, ADA, nhuộm Gram/CrAg/GeneXpert, phân biệt chạm mạch vs xuất huyết dưới nhện, ảnh hưởng kháng sinh trước LP và biện luận ca bệnh phân ly đạm - tế bào.',
        estimatedMinutes: 22,
        tags: ['Dịch não tủy (DNT)', 'Chọc dò tủy sống', 'Viêm màng não vi khuẩn', 'Viêm màng não virus', 'Viêm màng não lao', 'Cryptococcus', 'Xuất huyết dưới nhện (SAH)', 'Chạm mạch thủ thuật', 'Phân ly đạm - tế bào', 'QĐ 4068/QĐ-BYT', 'WHO 2024'],
        keyTakeaway: 'Luôn đo đường huyết tĩnh mạch cùng lúc chọc dò để tính tỷ số Glucose DNT/máu (< 0,4 gợi ý vi khuẩn/lao); hiệu chỉnh trừ 1 WBC mỗi 500–1.000 RBC khi chạm mạch và cảnh giác phân ly đạm - tế bào để tránh lạm dụng kháng sinh.',
        order: 1,
        filePath: 'truyen-nhiem/viem-nao-mang-nao/vmn-01-phan-tich-ket-qua-dich-nao-tuy.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-12',
        evidenceLevel: 'EBM 2026 • WHO 2024 • IDSA / ESCMID • QĐ 4068/QĐ-BYT',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây & Mục Tiêu Bài Học', icon: 'fa-bolt' },
          { id: 'sec-collection-gross', number: 2, title: 'Quy Trình Thu Thập, Áp Lực Mở & Đại Thể DNT', icon: 'fa-droplet' },
          { id: 'sec-routine-params', number: 3, title: 'Thông Số Tế Bào, Sinh Hóa & Vi Sinh Chuyên Sâu', icon: 'fa-vial-virus' },
          { id: 'sec-syndrome-matrix', number: 4, title: 'Bảng Đối Chiếu 6 Hội Chứng Dịch Não Tủy Kinh Điển', icon: 'fa-table-list' },
          { id: 'sec-diagnostic-svg', number: 5, title: 'Lưu Đồ Tiếp Cận DNT & Định Hướng Xử Trí Sớm', icon: 'fa-diagram-project' },
          { id: 'sec-pitfalls', number: 6, title: 'Tình Huống Đặc Biệt & Cạm Bẫy Đọc Kết Quả', icon: 'fa-triangle-exclamation' },
          { id: 'sec-case-study', number: 7, title: 'Ca Lâm Sàng Thực Chiến: Phân Ly Đạm - Tế Bào & Chạm Mạch', icon: 'fa-user-doctor' },
          { id: 'sec-key-pearls', number: 8, title: '4 Thông Điệp Thực Hành Cốt Lõi (Key Pearls)', icon: 'fa-lightbulb' },
          { id: 'sec-references', number: 9, title: 'Tài Liệu Tham Khảo (Định Dạng AMA)', icon: 'fa-book-bookmark' }
        ]
      }
    ]
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
    order: 6,
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
    order: 7,
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
    order: 8,
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
    order: 9,
    articles: []
  },
  {
    id: 'roi-loan-tri-giac',
    slug: 'roi-loan-tri-giac',
    specialtyId: 'truyen-nhiem',
    name: 'Rối Loạn Tri Giác & Hôn Mê',
    nameEn: 'Altered Mental Status & Coma',
    icd10: 'R40.2',
    icon: 'fa-brain',
    color: '#6366f1',
    badge: 'Cấp cứu Thần kinh – Truyền nhiễm',
    summary: 'Tiếp cận nguyên nhân và xử trí cấp cứu bệnh nhân rối loạn tri giác / hôn mê: giải phẫu aRAS, ABCDE & Coma Cocktail, phân biệt tổn thương cấu trúc vs chuyển hóa (AEIOU-TIPS, Toxidromes), khám GCS/FOUR/đồng tử và bẫy tắc động mạch thân nền.',
    keyPearlsPreview: [
      'Thử đường huyết mao mạch & đánh giá SpO2 trong 2 phút đầu tiên; đặt NKQ khi GCS ≤ 8 và cố định cột sống cổ nếu nghi chấn thương',
      'Bộ ba Coma Cocktail: Dextrose 50% (glucose < 70 mg/dL), Thiamine 100–500 mg IV trước/cùng truyền đường, Naloxone 0,4–2 mg IV nếu nghi Opioid',
      'Tổn thương vỏ não 1 bên đơn độc KHÔNG gây hôn mê trừ khi có hiệu ứng khối gây tụt não chèn ép thân não (aRAS)',
      'Đồng tử đầu kim kèm apneustic, ocular bobbing và duỗi cứng mất não: cảnh giác tắc động mạch thân nền hoặc xuất huyết cầu não'
    ],
    guidelines: ['ENLS Coma Protocol v6.0 (2024)', 'Quyết định 5331/QĐ-BYT'],
    order: 10,
    articles: [
      {
        id: 'roi-loan-tri-giac-01-tiep-can-nguyen-nhan-va-cap-cuu',
        slug: 'roi-loan-tri-giac-01-tiep-can-nguyen-nhan-va-cap-cuu',
        diseaseId: 'roi-loan-tri-giac',
        specialtyId: 'truyen-nhiem',
        title: 'Tiếp Cận Nguyên Nhân & Xử Trí Cấp Cứu Bệnh Nhân Rối Loạn Tri Giác / Hôn Mê',
        subtitle: 'Giải phẫu aRAS, quy trình ABCDE & Coma Cocktail, phân biệt Cấu trúc vs AEIOU-TIPS / Toxidromes, thang điểm GCS/FOUR và ca thực chiến tắc ĐM thân nền',
        description: 'Hướng dẫn toàn diện tiếp cận bệnh nhân rối loạn tri giác và hôn mê: từ sinh lý bệnh aRAS, lưu đồ cấp cứu 2 phút đầu, bảng AEIOU-TIPS, 5 hội chứng độc học (Toxidromes), thăm khám đồng tử – kiểu thở – Coma Mimics đến chiến lược cận lâm sàng 3 bậc và ca lâm sàng tắc động mạch thân nền.',
        estimatedMinutes: 25,
        tags: ['Rối loạn tri giác', 'Hôn mê', 'aRAS', 'ABCDE & Coma Cocktail', 'AEIOU-TIPS', 'Toxidromes', 'GCS & FOUR', 'Tắc động mạch thân nền', 'ENLS v6.0', 'QĐ 5331/QĐ-BYT'],
        keyTakeaway: 'Ổn định ABCDE và đo đường huyết mao mạch/SpO2 trong 2 phút đầu; phân biệt tổn thương cấu trúc (dấu khu trú/CT) với chuyển hóa-độc chất (AEIOU-TIPS); bắt buộc chụp CT sọ trước khi chọc dò dịch não tủy.',
        order: 1,
        filePath: 'truyen-nhiem/roi-loan-tri-giac/roi-loan-tri-giac-01-tiep-can-nguyen-nhan-va-cap-cuu.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-12',
        evidenceLevel: 'EBM 2026 • ENLS v6.0 (2024) • QĐ 5331/QĐ-BYT',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây & Mục Tiêu Bài Học', icon: 'fa-bolt' },
          { id: 'sec-neuroanatomy', number: 2, title: 'Giải Phẫu & Sinh Lý Bệnh Học Của Tri Giác', icon: 'fa-brain' },
          { id: 'sec-abcde', number: 3, title: 'Cấp Cứu Ban Đầu ABCDE & Điều Trị Đảo Ngược Tức Thì', icon: 'fa-truck-medical' },
          { id: 'sec-etiologies', number: 4, title: 'Phân Loại Hệ Thống Nguyên Nhân (Cấu Trúc, AEIOU-TIPS & Toxidromes)', icon: 'fa-layer-group' },
          { id: 'sec-neuro-exam', number: 5, title: 'Thăm Khám Thần Kinh Có Định Hướng Nguyên Nhân', icon: 'fa-eye' },
          { id: 'sec-workup', number: 6, title: 'Chiến Lược Cận Lâm Sàng Theo 3 Bậc', icon: 'fa-microscope' },
          { id: 'sec-case-study', number: 7, title: 'Ca Lâm Sàng Thực Chiến: Hôn Mê Do Tắc Động Mạch Thân Nền', icon: 'fa-user-doctor' },
          { id: 'sec-pitfalls', number: 8, title: 'Cạm Bẫy Lâm Sàng & Điểm Then Chốt Cần Nhớ', icon: 'fa-triangle-exclamation' },
          { id: 'sec-references', number: 9, title: 'Tài Liệu Tham Khảo (Định Dạng AMA)', icon: 'fa-book-bookmark' }
        ]
      }
    ]
  },
  {
    id: 'sot-crnn',
    slug: 'sot-crnn',
    specialtyId: 'truyen-nhiem',
    name: 'Sốt Không Rõ Nguyên Nhân (FUO)',
    nameEn: 'Fever of Unknown Origin',
    icd10: 'R50.9',
    icon: 'fa-temperature-arrow-up',
    color: '#f59e0b',
    badge: 'EBM 2026 • Delphi Consensus',
    summary: 'Quy trình tiếp cận từng bước sốt kéo dài (FUO) và viêm chưa rõ nguyên nhân (IUO): 5 nhóm căn nguyên kinh điển, bộ xét nghiệm tối thiểu tiêu chuẩn, khai thác manh mối PDCs, ứng dụng 18F-FDG PET/CT, sinh thiết đích và nghệ thuật điều trị thử.',
    keyPearlsPreview: [
      'Sốt kéo dài không đồng nghĩa với nhiễm trùng: bệnh tự miễn/viêm mạch và bệnh lý ác tính chiếm tỷ trọng lớn',
      'Khám lâm sàng có hệ thống lặp lại mỗi ngày để tìm manh mối PDCs (đáy mắt, ĐM thái dương, hạch, mào tinh hoàn)',
      'Bộ xét nghiệm tối thiểu (cấy máu 3 bộ, CT ngực-bụng-chậu cản quang) phải hoàn tất trước khi nghĩ đến FUO',
      '18F-FDG PET/CT có giá trị then chốt trong định vị mục tiêu sinh thiết mô khi các thăm dò cơ bản âm tính'
    ],
    guidelines: ['Delphi Consensus 2024 (FUO/IUO Update)', 'Mandell Infectious Diseases 9th Ed', 'Petersdorf & Durack Consensus'],
    order: 11,
    articles: [
      {
        id: 'fuo-01-tiep-can-chan-doan-va-xu-tri',
        slug: 'fuo-01-tiep-can-chan-doan-va-xu-tri',
        diseaseId: 'sot-crnn',
        specialtyId: 'truyen-nhiem',
        title: 'Tiếp Cận Bệnh Nhân Sốt Kéo Dài & Sốt Không Rõ Nguyên Nhân (FUO)',
        subtitle: 'Đồng thuận quốc tế Delphi 2024, phân loại 5 nhóm nguyên nhân, khai thác manh mối PDCs, bộ xét nghiệm tối thiểu, vai trò 18F-FDG PET/CT và ca thực chiến GCA',
        description: 'Hướng dẫn toàn diện tiếp cận sốt không rõ nguyên nhân (FUO) và viêm chưa rõ nguyên nhân (IUO) theo đồng thuận Delphi 2024, từ bộ xét nghiệm tối thiểu, khai thác manh mối PDCs, chỉ định 18F-FDG PET/CT đến ca lâm sàng viêm động mạch tế bào khổng lồ (GCA).',
        estimatedMinutes: 25,
        tags: ['FUO', 'Sốt kéo dài', 'IUO', 'PDCs', '18F-FDG PET/CT', 'Viêm mạch GCA', 'Bộ xét nghiệm tối thiểu', 'Sốt do thuốc', 'EBM 2026'],
        keyTakeaway: 'Sốt kéo dài không đồng nghĩa nhiễm trùng; khám lâm sàng lặp lại mỗi ngày tìm PDCs; CT ngực-bụng-chậu cản quang là tối thiểu; cấm kháng sinh/corticoid bao vây khi bệnh nhân ổn định.',
        order: 1,
        filePath: 'truyen-nhiem/sot-crnn/fuo-01-tiep-can-chan-doan-va-xu-tri.mdx',
        isFeatured: true,
        lastUpdated: '2026-11-14',
        evidenceLevel: 'EBM 2026 • Delphi Consensus / Mandell',
        sections: [
          { id: 'sec-takeaway', number: 1, title: 'Đúc Kết 30 Giây (The Bottom Line & Rule of Thumb)', icon: 'fa-bolt' },
          { id: 'sec-definitions', number: 2, title: 'Định Nghĩa Cổ Điển & Cập Nhật Đồng Thuận Quốc Tế (FUO & IUO)', icon: 'fa-temperature-arrow-up' },
          { id: 'sec-etiology', number: 3, title: 'Năm Nhóm Căn Nguyên Kinh Điển Gây Sốt Kéo Dài', icon: 'fa-viruses' },
          { id: 'sec-pdcs', number: 4, title: 'Khai Thác Manh Mối Tiềm Tàng (PDCs) & Khám Thực Thể Toàn Diện', icon: 'fa-magnifying-glass' },
          { id: 'sec-minimum-workup', number: 5, title: 'Bộ Xét Nghiệm Tối Thiểu Bắt Buộc (Bậc 1 Minimum Workup)', icon: 'fa-vial' },
          { id: 'sec-advanced-workup', number: 6, title: 'Thăm Dò Nâng Cao: 18F-FDG PET/CT, TEE, Sinh Thiết & NGS', icon: 'fa-microscope' },
          { id: 'sec-treatment-trials', number: 7, title: 'Nguyên Tắc Xử Trí, Sốt Do Thuốc & Nghệ Thuật Điều Trị Thử', icon: 'fa-pills' },
          { id: 'sec-pitfalls', number: 8, title: 'Bốn Cạm Bẫy Nguy Hiểm Cần Tránh Khi Tiếp Cận FUO', icon: 'fa-triangle-exclamation' },
          { id: 'sec-bedside-case', number: 9, title: 'Ca Lâm Sàng Thực Chiến: Viêm Động Mạch Tế Bào Khổng Lồ (GCA)', icon: 'fa-user-doctor' },
          { id: 'sec-references', number: 10, title: 'Tài Liệu Tham Khảo (Chuẩn AMA)', icon: 'fa-book-bookmark' }
        ]
      }
    ]
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
