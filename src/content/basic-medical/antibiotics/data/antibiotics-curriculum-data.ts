/**
 * CliniPortal — Antibiotics Curriculum & Master Registry
 * Path: src/content/basic-medical/antibiotics/data/antibiotics-curriculum-data.ts
 * 
 * Toàn bộ CSDL 6 Modules, 19 Bài học & 5 Công cụ Lâm sàng Tương tác
 * Đối soát 1:1 với Đề cương Kế hoạch & Kho Knowledge Vault 1.5
 */

import { AntibioticModule, AntibioticLesson, AntibioticToolMeta } from '../types/antibiotics.types';

export const ANTIBIOTIC_TOOLS: AntibioticToolMeta[] = [
  {
    id: 'd8-safety-wizard',
    title: 'D8 Prescribing Safety Wizard',
    shortTitle: 'Bảng kiểm D8',
    icon: 'fa-clipboard-check',
    badge: 'Checklist 8 Điểm',
    color: 'var(--dsp-emerald)',
    description: 'Bảng kiểm 8 điều bắt buộc trước khi ký đơn thuốc kháng sinh nhằm chặn đứng sai sót liều, phối hợp trùng lặp và lạm dụng nhóm Dự trữ.',
    clinicalValue: 'Giảm 42% tỷ lệ kê đơn không hợp lý tại khoa Cấp cứu & Nội tổng quát.',
    targetAudience: 'Bác sĩ điều trị, Bác sĩ nội trú, Dược sĩ lâm sàng'
  },
  {
    id: 'pkpd-simulator',
    title: 'PK/PD Infusion Mode Simulator',
    shortTitle: 'Mô phỏng PK/PD',
    icon: 'fa-chart-line',
    badge: 'Truyền kéo dài & T>MIC',
    color: 'var(--dsp-sky)',
    description: 'Trực quan hóa nồng độ thuốc theo thời gian trên Canvas/SVG: so sánh tiêm ngắt quãng (Bolus 30p) vs truyền kéo dài (3-4h) vs truyền liên tục 24h đối với Beta-lactam.',
    clinicalValue: 'Tối ưu hóa %T > MIC đạt 100% cho bệnh nhân sốc nhiễm khuẩn và ICU.',
    targetAudience: 'Bác sĩ Hồi sức cấp cứu (ICU), Bác sĩ Truyền nhiễm'
  },
  {
    id: 'aware-navigator',
    title: 'WHO AWaRe 2023 Traffic Light Navigator',
    shortTitle: 'Tra cứu AWaRe',
    icon: 'fa-traffic-light',
    badge: 'Đèn Xanh - Vàng - Đỏ',
    color: 'var(--dsp-amber)',
    description: 'Tra cứu tức thì 180+ hoạt chất theo phân loại WHO AWaRe 2023 kèm cảnh báo đề kháng tại Việt Nam và hướng dẫn ưu tiên nhóm Tiếp cận (Access).',
    clinicalValue: 'Đạt mục tiêu chỉ số sử dụng ≥ 60% kháng sinh Access của bệnh viện.',
    targetAudience: 'Tất cả nhân viên y tế tham gia kê đơn và cấp phát'
  },
  {
    id: 'delabeling-matrix',
    title: 'Beta-Lactam Delabeling & Cross-Reactivity Matrix',
    shortTitle: 'Xóa nhãn dị ứng Penicillin',
    icon: 'fa-shield-halved',
    badge: 'Chuỗi bên R1 & Chéo < 2%',
    color: 'var(--dsp-rose)',
    description: 'Thuật toán phân tầng nguy cơ dị ứng thực sự vs tác dụng phụ thường gặp, ma trận tương đồng chuỗi bên R1/R2 để chọn Cephalosporin/Carbapenem an toàn.',
    clinicalValue: 'Xóa nhãn dị ứng sai cho > 90% bệnh nhân từng bị gán nhãn dị ứng Penicillin.',
    targetAudience: 'Bác sĩ Lâm sàng, Dị ứng - Miễn dịch học'
  },
  {
    id: 'iv-po-stepdown',
    title: 'IV-to-PO Step-Down Evaluator',
    shortTitle: 'Chuyển tiêm sang uống',
    icon: 'fa-pills',
    badge: 'Sinh khả dụng F > 90%',
    color: 'var(--dsp-teal)',
    description: 'Đánh giá 4 tiêu chuẩn lâm sàng ổn định và đề xuất danh mục kháng sinh đường uống tương đương có sinh khả dụng vượt trội để xuất viện sớm.',
    clinicalValue: 'Rút ngắn thời gian nằm viện 1.5 - 2 ngày, giảm nguy cơ nhiễm khuẩn catheter.',
    targetAudience: 'Bác sĩ điều trị nội trú, Dược sĩ giám sát AMS'
  }
];

export const ANTIBIOTIC_MODULES: AntibioticModule[] = [
  {
    id: 'module1-vi-sinh',
    number: 1,
    key: 'module1-vi-sinh',
    title: 'Module 1: Vi Sinh Y Học & Phân Nhóm Vi Khuẩn',
    shortTitle: 'Vi Sinh & Nhuộm Gram',
    icon: 'fa-bacterium',
    color: 'var(--dsp-sky)',
    badge: '2 Bài giảng',
    description: 'Nền tảng cấu trúc tế bào vi khuẩn, vách peptidoglycan, màng ngoài Gram âm và kỹ thuật diễn giải kết quả nhuộm Gram tại giường bệnh.',
    clinicalObjective: 'Đọc nhanh kết quả nhuộm Gram sơ bộ trong 15 phút để định hướng kháng sinh kinh nghiệm ban đầu trước khi có kháng sinh đồ.',
    lessons: [
      {
        id: 'ks-1-1',
        slug: 'ks-1-1-cau-truc-vi-khuan-phan-loai',
        title: 'Cấu trúc vi khuẩn & Phân loại hình thái học lâm sàng',
        moduleNumber: 1,
        moduleKey: 'module1-vi-sinh',
        moduleTitle: 'Module 1: Vi Sinh Y Học & Phân Nhóm',
        lessonNumber: 1,
        order: 1,
        description: 'Phân tích chi tiết vách Peptidoglycan Gram (+) vs Gram (-), màng ngoài LPS (Endotoxin), kênh Porin và cấu trúc không điển hình (Mycoplasma, Chlamydia, Legionella).',
        estimatedMinutes: 20,
        tags: ['Vi sinh', 'Gram dương', 'Gram âm', 'Peptidoglycan', 'LPS', 'Porin'],
        keyTakeaway: 'Gram âm có màng ngoài lipid kép và kênh porin là rào cản tự nhiên, kháng sinh cần có tính chất phân tử đặc thù để xuyên qua.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Đại cương & Bố cục phân loại vi khuẩn lâm sàng', icon: 'fa-microscope' },
          { id: 'sec-2', number: 2, title: 'Giải phẫu vách tế bào vi khuẩn: Gram dương vs Gram âm', icon: 'fa-layer-group' },
          { id: 'sec-3', number: 3, title: 'Hệ thống Kênh Porin & Cơ chế thẩm thấu kháng sinh', icon: 'fa-door-open' },
          { id: 'sec-4', number: 4, title: 'Nhóm vi khuẩn không điển hình & Đích tác động ngoại lệ', icon: 'fa-dna' },
          { id: 'sec-5', number: 5, title: 'Bảng tổng hợp đặc điểm hình thái học & Phổ kháng sinh ban đầu', icon: 'fa-table' }
        ]
      },
      {
        id: 'ks-1-2',
        slug: 'ks-1-2-nhuom-gram-xet-nghiem-vi-sinh',
        title: 'Đọc & Diễn giải kết quả Nhuộm Gram - Xét nghiệm Vi sinh cơ bản',
        moduleNumber: 1,
        moduleKey: 'module1-vi-sinh',
        moduleTitle: 'Module 1: Vi Sinh Y Học & Phân Nhóm',
        lessonNumber: 2,
        order: 2,
        description: 'Kỹ thuật lấy bệnh phẩm đúng quy cách (đàm, máu, nước tiểu, dịch não tủy), nguyên lý nhuộm Gram 4 bước và thuật toán đọc hình thái cầu khuẩn/trực khuẩn.',
        estimatedMinutes: 25,
        tags: ['Nhuộm Gram', 'Cấy máu', 'Bệnh phẩm', 'Cầu khuẩn', 'Trực khuẩn', 'Vi sinh lâm sàng'],
        keyTakeaway: 'Nhuộm Gram là xét nghiệm vi sinh khẩn cấp nhanh nhất; cầu khuẩn Gram (+) đám gợi ý Tụ cầu, chuỗi gợi ý Liên cầu; trực khuẩn Gram (-) gợi ý Enterobacterales hoặc Trực khuẩn mủ xanh.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Nguyên lý hóa sinh & 4 bước kỹ thuật Nhuộm Gram', icon: 'fa-flask' },
          { id: 'sec-2', number: 2, title: 'Tiêu chuẩn chất lượng mẫu đàm (Thang điểm Bartlett & Murray-Washington)', icon: 'fa-lungs' },
          { id: 'sec-3', number: 3, title: 'Giải mã hình ảnh vi thể: Cầu khuẩn, Trực khuẩn, Trực cầu khuẩn', icon: 'fa-eye' },
          { id: 'sec-4', number: 4, title: 'Cấy máu chuẩn: Thể tích, thời điểm & Phân biệt vấy tạp khuẩn', icon: 'fa-vial' },
          { id: 'sec-5', number: 5, title: 'Lưu đồ phản xạ lâm sàng xử trí dựa trên Nhuộm Gram cấp cứu', icon: 'fa-diagram-project' }
        ]
      }
    ]
  },
  {
    id: 'module2-phan-loai-aware',
    number: 2,
    key: 'module2-phan-loai-aware',
    title: 'Module 2: Bảng Tuần Hoàn Kháng Sinh & Khung WHO AWaRe 2023',
    shortTitle: 'Cơ Chế & AWaRe 2023',
    icon: 'fa-traffic-light',
    color: 'var(--dsp-amber)',
    badge: '2 Bài giảng',
    description: 'Hệ thống 5 đích tác động phân tử, bảng tuần hoàn các họ kháng sinh và khung phân tầng AWaRe của WHO hướng dẫn sử dụng kháng sinh có trách nhiệm.',
    clinicalObjective: 'Nhận diện ngay vị trí phân tầng của bất kỳ kháng sinh nào trong tủ thuốc bệnh viện để bảo vệ tối đa các thuốc nhóm Dự trữ.',
    lessons: [
      {
        id: 'ks-2-1',
        slug: 'ks-2-1-co-che-tac-dung-cau-truc-hoa-hoc',
        title: 'Phân loại kháng sinh theo Cơ chế tác dụng & Cấu trúc hóa học',
        moduleNumber: 2,
        moduleKey: 'module2-phan-loai-aware',
        moduleTitle: 'Module 2: Bảng Tuần Hoàn & AWaRe',
        lessonNumber: 1,
        order: 3,
        description: 'Chi tiết 5 cơ chế diệt khuẩn: ức chế tổng hợp vách (Beta-lactam, Glycopeptide), ức chế tổng hợp protein 30S/50S (Aminoglycoside, Macrolide, Tetracycline), ức chế DNA/RNA (Quinolone, Rifamycin), phá hủy màng (Polymyxin) và ức chế chuyển hóa acid folic (Co-trimoxazole).',
        estimatedMinutes: 30,
        tags: ['Cơ chế diệt khuẩn', 'Beta-lactam', 'Ribosome', 'Quinolone', 'Aminoglycoside', 'Macrolide'],
        keyTakeaway: 'Nắm vững 5 đích tác động phân tử là chìa khóa để phối hợp kháng sinh hiệp đồng (ví dụ: Beta-lactam mở đường cho Aminoglycoside vào tế bào) và tránh phối hợp đối kháng.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Sơ đồ tổng quan 5 Đích tác động phân tử của kháng sinh', icon: 'fa-bullseye' },
          { id: 'sec-2', number: 2, title: 'Nhóm ức chế tổng hợp vách tế bào: Beta-lactam & Glycopeptide', icon: 'fa-shield-virus' },
          { id: 'sec-3', number: 3, title: 'Nhóm ức chế tổng hợp protein: Tiểu phần 30S vs 50S Ribosome', icon: 'fa-dna' },
          { id: 'sec-4', number: 4, title: 'Nhóm ức chế Acid Nucleic & Màng tế bào vi khuẩn', icon: 'fa-bacterium' },
          { id: 'sec-5', number: 5, title: 'Bảng tuần hoàn kháng sinh đối soát Họ thuốc - Hoạt chất - Phổ tác dụng', icon: 'fa-table-cells' }
        ]
      },
      {
        id: 'ks-2-2',
        slug: 'ks-2-2-khung-aware-who-den-tin-hieu',
        title: 'Phân tầng Kháng sinh theo Khung AWaRe WHO 2023: Chiến lược Đèn Tín Hiệu',
        moduleNumber: 2,
        moduleKey: 'module2-phan-loai-aware',
        moduleTitle: 'Module 2: Bảng Tuần Hoàn & AWaRe',
        lessonNumber: 2,
        order: 4,
        description: 'Chiến lược phân nhóm Access (Tiếp cận - Đèn xanh), Watch (Giám sát - Đèn vàng) và Reserve (Dự trữ - Đèn đỏ); chính sách quản lý kháng sinh bệnh viện (AMS) và danh mục thuốc không khuyến cáo (Discouraged fixed-dose combinations).',
        estimatedMinutes: 25,
        tags: ['AWaRe WHO', 'Access', 'Watch', 'Reserve', 'AMS', 'Quản lý kháng sinh'],
        awareTier: 'access',
        hasInteractiveTool: true,
        toolId: 'aware-navigator',
        keyTakeaway: 'Bệnh viện cần duy trì tỷ lệ kháng sinh nhóm Access tối thiểu ≥ 60% tổng lượng tiêu thụ; nhóm Watch phải theo dõi sát và nhóm Reserve chỉ dùng khi có hội chẩn chuyên gia.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Bối cảnh khủng hoảng đề kháng toàn cầu & Sự ra đời của AWaRe', icon: 'fa-earth-americas' },
          { id: 'sec-2', number: 2, title: 'Nhóm Access (Đèn Xanh): Kháng sinh nền tảng cho nhiễm khuẩn thông thường', icon: 'fa-circle-check' },
          { id: 'sec-3', number: 3, title: 'Nhóm Watch (Đèn Vàng): Kháng sinh có nguy cơ đề kháng cao cần kiểm soát', icon: 'fa-triangle-exclamation' },
          { id: 'sec-4', number: 4, title: 'Nhóm Reserve (Đèn Đỏ): Vũ khí tối hậu cho vi khuẩn đa kháng (MDR/XDR)', icon: 'fa-ban' },
          { id: 'sec-5', number: 5, title: 'Áp dụng chỉ số AWaRe vào đánh giá chất lượng kê đơn tại Việt Nam', icon: 'fa-chart-pie' }
        ]
      }
    ]
  },
  {
    id: 'module3-pk-pd-duong-dung',
    number: 3,
    key: 'module3-pk-pd-duong-dung',
    title: 'Module 3: Dược Động/Dược Lực Học (PK/PD) & Nguyên Tắc Đường Dùng',
    shortTitle: 'PK/PD & Đường Dùng',
    icon: 'fa-chart-line',
    color: 'var(--dsp-violet)',
    badge: '3 Bài giảng',
    description: 'Chỉ số PK/PD định lượng (T > MIC, Cmax/MIC, AUC24/MIC), tối ưu hóa liều truyền tĩnh mạch và nguyên tắc chuyển đổi sớm từ đường tiêm sang đường uống (IV-to-PO).',
    clinicalObjective: 'Tính toán chế độ liều truyền kéo dài Beta-lactam để đạt 100% T > MIC và áp dụng tiêu chí chuyển IV-to-PO an toàn giúp xuất viện sớm.',
    lessons: [
      {
        id: 'ks-3-1',
        slug: 'ks-3-1-chi-so-pk-pd-co-ban',
        title: 'Các chỉ số PK/PD cơ bản trong lựa chọn liều và tối ưu hóa hiệu lực diệt khuẩn',
        moduleNumber: 3,
        moduleKey: 'module3-pk-pd-duong-dung',
        moduleTitle: 'Module 3: PK/PD & Đường Dùng',
        lessonNumber: 1,
        order: 5,
        description: '3 Mô hình diệt khuẩn kinh điển: phụ thuộc thời gian (T > MIC đối với Penicillin, Cephalosporin, Carbapenem), phụ thuộc nồng độ đỉnh (Cmax/MIC đối với Aminoglycoside) và phụ thuộc diện tích dưới đường cong (AUC24/MIC đối với Vancomycin, Fluoroquinolone).',
        estimatedMinutes: 25,
        tags: ['PK/PD', 'T>MIC', 'Cmax/MIC', 'AUC24/MIC', 'Truyền kéo dài', 'Động học diệt khuẩn'],
        pkpdModel: 'T>MIC',
        hasInteractiveTool: true,
        toolId: 'pkpd-simulator',
        keyTakeaway: 'Đối với Beta-lactam, tăng liều một lần không làm tăng tốc độ diệt khuẩn; kéo dài thời gian truyền (3-4 giờ hoặc truyền liên tục 24h) mới là chìa khóa sống còn ở bệnh nhân nặng.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Khái niệm Dược động học (PK) và Dược lực học (PD) trong kháng sinh học', icon: 'fa-calculator' },
          { id: 'sec-2', number: 2, title: 'Kháng sinh diệt khuẩn phụ thuộc thời gian (%T > MIC)', icon: 'fa-clock' },
          { id: 'sec-3', number: 3, title: 'Kháng sinh diệt khuẩn phụ thuộc nồng độ đỉnh (Cmax / MIC)', icon: 'fa-mountain' },
          { id: 'sec-4', number: 4, title: 'Kháng sinh phụ thuộc tổng lượng tiếp xúc (AUC24 / MIC)', icon: 'fa-chart-area' },
          { id: 'sec-5', number: 5, title: 'Ứng dụng lâm sàng: Phác đồ truyền kéo dài Meropenem, Piperacillin-Tazobactam', icon: 'fa-syringe' }
        ]
      },
      {
        id: 'ks-3-2',
        slug: 'ks-3-2-pho-tac-dong-cua-cac-loai-khang-sinh',
        title: 'Phổ tác động của các loại kháng sinh & Ma trận đề kháng vi sinh lâm sàng',
        moduleNumber: 3,
        moduleKey: 'module3-pk-pd-duong-dung',
        moduleTitle: 'Module 3: PK/PD & Đường Dùng',
        lessonNumber: 2,
        order: 6,
        description: 'Hệ thống hóa phổ tác động của kháng sinh trên 4 nhóm vi sinh cốt lõi: Gram dương, Gram âm, Kỵ khí, Không điển hình; cơ chế đề kháng MSSA vs MRSA, ESBL, AmpC, CRE và cập nhật BL/BLI thế hệ mới cùng Cefiderocol.',
        estimatedMinutes: 30,
        tags: ['Phổ kháng sinh', 'Gram dương', 'Gram âm', 'Kỵ khí', 'Atypicals', 'ESBL', 'CRE', 'MRSA', 'Pseudomonas', 'Cefiderocol'],
        isNewEbm2026: true,
        keyTakeaway: 'Nắm vững đặc tính kháng tự nhiên (Enterococcus & Listeria kháng Cephalosporin; vi khuẩn bất điển hình kháng Beta-lactam; Stenotrophomonas kháng Carbapenem) giúp phòng ngừa kê đơn sai lầm.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Tổng quan về Phổ tác động & 4 Khung vi sinh lâm sàng', icon: 'fa-bacteria' },
          { id: 'sec-2', number: 2, title: 'Phổ tác dụng trên Cầu khuẩn Gram dương hiếu khí', icon: 'fa-shield-virus' },
          { id: 'sec-3', number: 3, title: 'Phổ tác dụng trên Trực khuẩn Gram âm & Cơ chế đề kháng', icon: 'fa-bacterium' },
          { id: 'sec-4', number: 4, title: 'Phổ tác dụng trên Vi khuẩn kỵ khí tuyệt đối & tùy nghi', icon: 'fa-biohazard' },
          { id: 'sec-5', number: 5, title: 'Phổ tác dụng trên Nhóm vi khuẩn bất điển hình (Atypicals)', icon: 'fa-dna' },
          { id: 'sec-6', number: 6, title: 'Kháng sinh thế hệ mới cho các chủng siêu kháng (MDR/XDR)', icon: 'fa-capsules' },
          { id: 'sec-7', number: 7, title: 'Bảng ma trận tra cứu phổ kháng sinh tổng hợp tại giường bệnh', icon: 'fa-table' },
          { id: 'sec-8', number: 8, title: 'Tài liệu tham khảo (AMA Style)', icon: 'fa-book-medical' }
        ]
      },
      {
        id: 'ks-3-3',
        slug: 'ks-3-3-duong-dung-chuyen-doi-iv-sang-po',
        title: 'Nguyên tắc Lựa chọn Đường dùng & Chiến lược Chuyển đổi Kháng sinh từ IV sang PO',
        moduleNumber: 3,
        moduleKey: 'module3-pk-pd-duong-dung',
        moduleTitle: 'Module 3: PK/PD & Đường Dùng',
        lessonNumber: 3,
        order: 7,
        description: 'Tiêu chuẩn lựa chọn đường tĩnh mạch (nhiễm khuẩn nặng, sốc, viêm nội tâm mạc, viêm màng não); 4 tiêu chí đánh giá lâm sàng ổn định để chuyển IV sang PO và danh mục kháng sinh có sinh khả dụng cao F > 90%.',
        estimatedMinutes: 20,
        tags: ['IV-to-PO', 'Sinh khả dụng', 'Đường dùng', 'Xuất viện sớm', 'Catheter'],
        hasInteractiveTool: true,
        toolId: 'iv-po-stepdown',
        keyTakeaway: 'Chuyển IV sang PO khi bệnh nhân hết sốt 24h, huyết động ổn định, đường tiêu hóa hoạt động tốt; ưu tiên thuốc có F > 90% như Ciprofloxacin, Levofloxacin, Linezolid, Metronidazole.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Khi nào bắt buộc phải dùng đường tiêm truyền tĩnh mạch (IV)?', icon: 'fa-syringe' },
          { id: 'sec-2', number: 2, title: 'Lợi ích đa chiều của việc chuyển đổi sớm sang đường uống (PO)', icon: 'fa-pills' },
          { id: 'sec-3', number: 3, title: 'Bộ 4 tiêu chuẩn lâm sàng kích hoạt quy trình chuyển đổi IV-to-PO', icon: 'fa-list-check' },
          { id: 'sec-4', number: 4, title: 'Bảng tra cứu sinh khả dụng (F%) & Các cặp thuốc IV-PO tương đương', icon: 'fa-arrow-right-arrow-left' },
          { id: 'sec-5', number: 5, title: 'Quy trình lâm sàng chuyển đổi tại giường bệnh & Xử trí ngoại lệ', icon: 'fa-hospital-user' }
        ]
      }
    ]
  },
  {
    id: 'module4-ke-don-an-toan-adr',
    number: 4,
    key: 'module4-ke-don-an-toan-adr',
    title: 'Module 4: Kê Đơn An Toàn, Tránh Phối Hợp Trùng Lặp & Quản Lý Độc Tính',
    shortTitle: 'Kê Đơn An Toàn & ADR',
    icon: 'fa-clipboard-check',
    color: 'var(--dsp-emerald)',
    badge: '4 Bài giảng',
    description: 'Bảng kiểm 8 bước D8 trước khi ký đơn, ma trận phối hợp kháng sinh hợp lý (tránh trùng lặp phổ kỵ khí/Gram âm) và theo dõi độc tính thận, thính giác, kéo dài khoảng QT.',
    clinicalObjective: 'Loại bỏ hoàn toàn các lỗi phối hợp thuốc trùng lặp và cá thể hóa liều kháng sinh dựa trên chức năng thận (eGFR/CrCl).',
    lessons: [
      {
        id: 'ks-4-1',
        slug: 'ks-4-1-bang-kiem-8-dieu-d8-checklist',
        title: 'Bảng kiểm 8 điều (D8 Checklist) trước khi viết đơn thuốc kháng sinh',
        moduleNumber: 4,
        moduleKey: 'module4-ke-don-an-toan-adr',
        moduleTitle: 'Module 4: Kê Đơn An Toàn & ADR',
        lessonNumber: 1,
        order: 8,
        description: '8 Câu hỏi bắt buộc tự vấn trước khi ký đơn: 1. Có bằng chứng nhiễm khuẩn không? 2. Ổ nhiễm trùng ở đâu? 3. Vi khuẩn gây bệnh tiềm năng? 4. Thuốc nào tối ưu theo AWaRe? 5. Liều & khoảng cách dùng theo CrCl? 6. Đường dùng nào? 7. Thời gian điều trị dự kiến? 8. Thời điểm đánh giá lại 48-72h?',
        estimatedMinutes: 20,
        tags: ['D8 Checklist', 'An toàn kê đơn', 'Hiệu chỉnh liều', 'CrCl', 'Đánh giá 48h'],
        hasInteractiveTool: true,
        toolId: 'd8-safety-wizard',
        keyTakeaway: 'Không bao giờ viết đơn kháng sinh theo thói quen; thực hiện trọn vẹn 8 bước D8 giúp ngăn ngừa trên 80% các đơn thuốc thiếu an toàn hoặc kéo dài quá mức.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Tổng quan triết lý "D8 Prescribing Safety"', icon: 'fa-shield-halved' },
          { id: 'sec-2', number: 2, title: 'Bước 1 đến Bước 4: Chẩn đoán, Ổ nhiễm, Vi sinh & Lựa chọn hoạt chất', icon: 'fa-stethoscope' },
          { id: 'sec-3', number: 3, title: 'Bước 5 đến Bước 8: Liều CrCl, Đường dùng, Thời gian & Điểm dừng 48h', icon: 'fa-sliders' },
          { id: 'sec-4', number: 4, title: 'Các bẫy lâm sàng thường gặp khi bỏ qua checklist', icon: 'fa-triangle-exclamation' },
          { id: 'sec-5', number: 5, title: 'Biểu mẫu hồ sơ bệnh án chuẩn hóa tích hợp D8', icon: 'fa-file-medical' }
        ]
      },
      {
        id: 'ks-4-2',
        slug: 'ks-4-2-nguyen-tac-phoi-hop-tranh-trung-lap',
        title: 'Nguyên tắc phối hợp kháng sinh & Cách phát hiện - Tránh phối hợp trùng lặp',
        moduleNumber: 4,
        moduleKey: 'module4-ke-don-an-toan-adr',
        moduleTitle: 'Module 4: Kê Đơn An Toàn & ADR',
        lessonNumber: 2,
        order: 9,
        description: '4 Chỉ định phối hợp kháng sinh hợp lệ (mở rộng phổ kinh nghiệm trong sốc, hợp đồng diệt khuẩn, ngăn ngừa vi khuẩn đề kháng, nhiễm đa khuẩn); cảnh báo các kiểu phối hợp trùng lặp phổ kỵ khí (Metronidazole + Beta-lactam có chất ức chế) hoặc trùng lặp Gram âm.',
        estimatedMinutes: 25,
        tags: ['Phối hợp kháng sinh', 'Trùng lặp phổ', 'Kỵ khí', 'Hiệp đồng', 'Tương tác thuốc'],
        keyTakeaway: 'Phối hợp kháng sinh phải có mục đích rõ ràng; không dùng Metronidazole khi đã có Piperacillin-Tazobactam, Amox-Clav hoặc Carbapenem vì các thuốc này đã bao phủ kỵ khí rất mạnh.',
        sections: [
          { id: 'sec-1', number: 1, title: '4 Chỉ định kinh điển cho phép phối hợp kháng sinh trong điều trị', icon: 'fa-handshake' },
          { id: 'sec-2', number: 2, title: 'Cơ chế hiệp đồng diệt khuẩn (Synergy) phân tử', icon: 'fa-plus' },
          { id: 'sec-3', number: 3, title: 'Bẫy trùng lặp 1: Phối hợp kỵ khí kép (Double Anaerobic Coverage)', icon: 'fa-clone' },
          { id: 'sec-4', number: 4, title: 'Bẫy trùng lặp 2: Phối hợp Gram âm trùng lặp & Nguy cơ độc tính', icon: 'fa-bacteria' },
          { id: 'sec-5', number: 5, title: 'Ma trận đối soát phối hợp kháng sinh: Hợp lý vs Bất hợp lý', icon: 'fa-table' }
        ]
      },
      {
        id: 'ks-4-3',
        slug: 'ks-4-3-tac-dung-phu-doc-tinh-khang-sinh',
        title: 'Các tác dụng phụ thường gặp & Độc tính nghiêm trọng của từng nhóm kháng sinh',
        moduleNumber: 4,
        moduleKey: 'module4-ke-don-an-toan-adr',
        moduleTitle: 'Module 4: Kê Đơn An Toàn & ADR',
        lessonNumber: 3,
        order: 10,
        description: 'Độc tính trên thận (Aminoglycoside, Vancomycin, Colistin), độc tính thính giác và tiền đình, kéo dài khoảng QT gây xoắn đỉnh (Macrolide, Fluoroquinolone), đứt gân gót Achilles, độc tính thần kinh và nguy cơ viêm đại tràng giả mạc do Clostridioides difficile.',
        estimatedMinutes: 20,
        tags: ['Tác dụng phụ', 'Độc tính thận', 'Kéo dài QT', 'Viêm gân', 'C. difficile', 'Theo dõi TDM'],
        keyTakeaway: 'Mọi kháng sinh phổ rộng đều làm tăng nguy cơ tiêu chảy do C. difficile; cảnh báo đen (Black Box Warning) của Quinolone trên gân cơ và phình động mạch chủ đòi hỏi chỉ định thận trọng.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Độc tính Thận (Nephrotoxicity) & Chiến lược bảo vệ ống thận', icon: 'fa-kidneys' },
          { id: 'sec-2', number: 2, title: 'Độc tính Thính giác - Tiền đình (Ototoxicity) & Lưu ý Aminoglycoside', icon: 'fa-ear-listen' },
          { id: 'sec-3', number: 3, title: 'Biến chứng Tim mạch: Kéo dài khoảng QT & Nguy cơ Xoắn đỉnh', icon: 'fa-heart-crack' },
          { id: 'sec-4', number: 4, title: 'Cảnh báo FDA về Quinolone: Gân cơ, Khớp, Thần kinh & Phình mạch', icon: 'fa-triangle-exclamation' },
          { id: 'sec-5', number: 5, title: 'Nhiễm khuẩn Clostridioides difficile: Cơ chế, Dự phòng & Xử trí', icon: 'fa-biohazard' }
        ]
      },
      {
        id: 'ks-4-4',
        slug: 'ks-4-4',
        title: 'Các lưu ý, tương kỵ & chống chỉ định khi sử dụng kháng sinh',
        moduleNumber: 4,
        moduleKey: 'module4-ke-don-an-toan-adr',
        moduleTitle: 'Module 4: Kê Đơn An Toàn & ADR',
        lessonNumber: 4,
        order: 11,
        description: 'Tương kỵ lý hóa ngoài cơ thể (Ceftriaxone-Canxi, Beta-lactam và Aminoglycoside), tương kỵ dung môi và Y-site; tương tác dược động học CYP450, tương tác dược lực học (Linezolid - Serotonin, xoắn đỉnh QT); chống chỉ định tuyệt đối và lưu ý trên thai kỳ, trẻ sơ sinh, suy thận, suy gan và béo phì.',
        estimatedMinutes: 25,
        tags: ['Tương kỵ thuốc', 'Chống chỉ định', 'Ceftriaxone & Canxi', 'Hội chứng Serotonin', 'Phụ nữ mang thai', 'Hiệu chỉnh suy thận'],
        isNewEbm2026: true,
        keyTakeaway: 'Tương kỵ lý hóa Ceftriaxone + Canxi ở trẻ sơ sinh là chống chỉ định tuyệt đối gây tử vong; tuân thủ quy tắc xả rửa nòng ống (flush) và cách ly thời gian uống 2-4h đối với ion kim loại đa hóa trị.',
        sections: [
          { id: 'sec-1', number: 1, title: 'An Toàn & Biến Cố Bất Lợi', icon: 'fa-shield-halved' },
          { id: 'sec-2', number: 2, title: 'Tương Kỵ Lý Hóa & Đường Truyền', icon: 'fa-vial-circle-check' },
          { id: 'sec-3', number: 3, title: 'Tương Tác Thuốc Dược Động & Dược Lực', icon: 'fa-triangle-exclamation' },
          { id: 'sec-4', number: 4, title: 'Bản Đồ Chống Chỉ Định Tuyệt Đối', icon: 'fa-ban' },
          { id: 'sec-5', number: 5, title: 'Quần Thể Bệnh Nhân Đặc Biệt', icon: 'fa-hospital-user' },
          { id: 'sec-6', number: 6, title: 'Bảng Kiểm 5 Bước Tại Giường', icon: 'fa-list-check' },
          { id: 'sec-7', number: 7, title: 'Tài Liệu Tham Khảo (AMA Style)', icon: 'fa-book-medical' }
        ]
      }
    ]
  },
  {
    id: 'module5-di-ung-beta-lactam',
    number: 5,
    key: 'module5-di-ung-beta-lactam',
    title: 'Module 5: Dị Ứng Kháng Sinh Beta-Lactam & Quinolone',
    shortTitle: 'Dị Ứng Beta-Lactam & Quinolone',
    icon: 'fa-shield-halved',
    color: 'var(--dsp-rose)',
    badge: '3 Bài giảng',
    description: 'Phân biệt dị ứng thực sự vs tác dụng phụ/không dung nạp; tỷ lệ phản ứng chéo thực tế giữa Penicillin, Cephalosporin, Carbapenem; cơ chế dị ứng Quinolone, cảnh báo Hộp đen FDA và chiến lược thay thế an toàn.',
    clinicalObjective: 'Tự tin chỉ định Cephalosporin/Carbapenem cho bệnh nhân có tiền sử dị ứng Penicillin nhẹ; nhận diện phản ứng chéo Quinolone và kê đơn thay thế an toàn tại giường bệnh.',
    lessons: [
      {
        id: 'ks-5-1',
        slug: 'ks-5-1-phan-biet-di-ung-that-vs-adr',
        title: 'Phân biệt Dị ứng thật sự vs Tác dụng phụ / Không dung nạp của Kháng sinh',
        moduleNumber: 5,
        moduleKey: 'module5-di-ung-beta-lactam',
        moduleTitle: 'Module 5: Dị Ứng Beta-Lactam & Quinolone',
        lessonNumber: 1,
        order: 12,
        description: 'Hơn 90% bệnh nhân mang nhãn "dị ứng Penicillin" không thực sự có dị ứng IgE. Phân loại 4 nhóm phản ứng miễn dịch Gell & Coombs, phân biệt với tác dụng phụ tiêu hóa (buồn nôn, tiêu chảy) và ban da lành tính sau nhiễm virus.',
        estimatedMinutes: 25,
        tags: ['Dị ứng Penicillin', 'Gell Coombs', 'Delabeling', 'Phản vệ', 'IgE', 'SCARs'],
        hasInteractiveTool: true,
        toolId: 'delabeling-matrix',
        keyTakeaway: 'Gán nhãn dị ứng Penicillin sai khiến bệnh nhân phải dùng Quinolone, Vancomycin đắt tiền hơn, nhiều độc tính hơn và tăng tỷ lệ tử vong; cần tích cực xóa nhãn sai.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Nghịch lý 90% "Dị ứng Penicillin" là chẩn đoán sai lầm', icon: 'fa-circle-question' },
          { id: 'sec-2', number: 2, title: 'Phân loại 4 nhóm phản ứng miễn dịch dị ứng (Gell & Coombs)', icon: 'fa-diagram-project' },
          { id: 'sec-3', number: 3, title: 'Phân biệt Tác dụng không mong muốn (ADR) vs Dị ứng thực sự', icon: 'fa-scale-unbalanced' },
          { id: 'sec-4', number: 4, title: 'Các hội chứng dị ứng da nghiêm trọng (SCARs: SJS, TEN, DRESS, AGEP)', icon: 'fa-skull-crossbones' },
          { id: 'sec-5', number: 5, title: 'Lưu đồ khai thác bệnh sử dị ứng chuẩn hóa tại giường bệnh', icon: 'fa-clipboard-question' }
        ]
      },
      {
        id: 'ks-5-2',
        slug: 'ks-5-2-ty-le-phan-ung-cheo-beta-lactam',
        title: 'Dị ứng Kháng sinh Beta-Lactam và Chiến lược Thay thế Kháng sinh An toàn',
        moduleNumber: 5,
        moduleKey: 'module5-di-ung-beta-lactam',
        moduleTitle: 'Module 5: Dị Ứng Beta-Lactam & Quinolone',
        lessonNumber: 2,
        order: 13,
        description: 'Dữ liệu y học chứng cứ hiện đại chứng minh phản ứng chéo giữa Penicillin và Cephalosporin thực tế chỉ < 2.5%, Carbapenem < 1% và Aztreonam 0% (trừ Ceftazidime vì có cùng chuỗi bên R1). Bảng tra cứu phác đồ Non-Beta-lactam và lưu đồ thuật toán 4 bước tại giường bệnh.',
        estimatedMinutes: 25,
        tags: ['Phản ứng chéo', 'Chuỗi bên R1', 'Cephalosporin', 'Carbapenem', 'Aztreonam', 'EBM 2026'],
        isNewEbm2026: true,
        hasInteractiveTool: true,
        toolId: 'delabeling-matrix',
        keyTakeaway: 'Phản ứng dị ứng chéo phụ thuộc vào sự tương đồng của chuỗi bên R1, không phải do vòng Beta-lactam; Cephalosporin thế hệ 3/4 (Ceftriaxone, Cefotaxime, Cefepime) có chuỗi bên khác Penicillin nên tỷ lệ dị ứng chéo cực thấp (< 2%).',
        sections: [
          { id: 'sec-1', number: 1, title: 'Gánh Nặng Lâm Sàng Của Việc Dán Nhãn Dị Ứng Beta-Lactam Sai Lầm', icon: 'fa-triangle-exclamation' },
          { id: 'sec-2', number: 2, title: 'Cơ Sở Miễn Dịch Học & Ma Trận Phản Ứng Chéo Cấu Trúc Phân Tử', icon: 'fa-atom' },
          { id: 'sec-3', number: 3, title: 'Phân Tầng Nguy Cơ Dị Ứng Beta-Lactam Tại Giường Bệnh', icon: 'fa-chart-pie' },
          { id: 'sec-4', number: 4, title: 'Chiến Lược Thay Thế Kháng Sinh An Toàn Theo Hội Chứng Nhiễm Trùng', icon: 'fa-clipboard-check' },
          { id: 'sec-5', number: 5, title: 'Bảng Tra Cứu Kháng Sinh Thay Thế Non-Beta-Lactam', icon: 'fa-table-list' },
          { id: 'sec-6', number: 6, title: 'Sơ Đồ Thuật Toán Ra Quyết Định Tại Giường Bệnh', icon: 'fa-route' },
          { id: 'sec-7', number: 7, title: 'Tài Liệu Tham Khảo (AMA Style)', icon: 'fa-book-medical' }
        ]
      },
      {
        id: 'ks-5-3',
        slug: 'ks-5-3-di-ung-khang-sinh-quinolone-va-chien-luoc-thay-the',
        title: 'Dị ứng Kháng sinh nhóm Quinolone và Chiến lược Thay thế Kháng sinh An toàn',
        moduleNumber: 5,
        moduleKey: 'module5-di-ung-beta-lactam',
        moduleTitle: 'Module 5: Dị Ứng Beta-Lactam & Quinolone',
        lessonNumber: 3,
        order: 14,
        description: 'Cơ chế dị ứng IgE thật sự vs giả dị ứng kích hoạt thụ thể MRGPRX2; tỷ lệ phản ứng chéo nội nhóm cực cao (40-80%); 5 cảnh báo hộp đen FDA (đứt gân Achilles, bệnh thần kinh ngoại biên, phình bóc tách ĐMC); và thuật toán kê đơn thay thế Non-Quinolone chuẩn WHO AWaRe 2026.',
        estimatedMinutes: 30,
        tags: ['Dị ứng Quinolone', 'Fluoroquinolone', 'Black Box Warnings', 'MRGPRX2', 'Phản ứng chéo nội nhóm', 'Chiến lược thay thế', 'WHO AWaRe 2026'],
        isNewEbm2026: true,
        keyTakeaway: 'Phản ứng chéo giữa các Quinolone rất cao (40-80%); khi đã dị ứng một Quinolone bắt buộc chống chỉ định toàn nhóm và chuyển hẳn sang Non-Quinolone.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Tổng Quan Dược Lý & Xu Hướng Sử Dụng Quinolone Trong Lâm Sàng', icon: 'fa-capsules' },
          { id: 'sec-2', number: 2, title: 'Cơ Chế Miễn Dịch Học Dị Ứng & Phản Ứng Quá Mẫn Do Quinolone', icon: 'fa-shield-halved' },
          { id: 'sec-3', number: 3, title: 'Cảnh Báo Hộp Đen (FDA Black Box Warnings) & Độc Tính Đa Cơ Quan', icon: 'fa-triangle-exclamation' },
          { id: 'sec-4', number: 4, title: 'Bảng Đối So Sánh: Dị Ứng Thật Sự vs Giả Dị Ứng vs Độc Tính Dược Lý', icon: 'fa-table-columns' },
          { id: 'sec-5', number: 5, title: 'Chiến Lược Thay Thế Kháng Sinh Non-Quinolone Theo Hội Chứng Nhiễm Trùng', icon: 'fa-clipboard-check' },
          { id: 'sec-6', number: 6, title: 'Lưu Đồ Thuật Toán 4 Bước Xử Trí & Kê Đơn Thay Thế Tại Giường Bệnh', icon: 'fa-route' },
          { id: 'sec-7', number: 7, title: 'Tài Liệu Tham Khảo (AMA Style)', icon: 'fa-book-medical' }
        ]
      }
    ]
  },
  {
    id: 'module6-cac-nhom-khang-sinh',
    number: 6,
    key: 'module6-cac-nhom-khang-sinh',
    title: 'Module 6: Các Nhóm Kháng Sinh',
    shortTitle: 'Các Nhóm Kháng Sinh',
    icon: 'fa-capsules',
    color: 'var(--dsp-teal)',
    badge: '5 Bài giảng',
    description: 'Hệ thống hóa dược lý lâm sàng từng nhóm kháng sinh kinh điển và thế hệ mới: cấu trúc hóa học (SAR), cơ chế diệt khuẩn, đề kháng, tối ưu hóa PK/PD ở bệnh nhân nặng, độc tính và áp dụng ca lâm sàng.',
    clinicalObjective: 'Làm chủ đặc tính dược lý, phổ tác dụng, mục tiêu PK/PD và ranh giới an toàn của từng nhóm kháng sinh để cá thể hóa điều trị tại giường bệnh.',
    lessons: [
      {
        id: 'ks-6-1',
        slug: 'ks-6-1-nhom-khang-sinh-beta-lactam',
        title: 'Tổng quan về nhóm kháng sinh Beta-lactam: Từ cơ chế dược lý đến tối ưu hóa lâm sàng và điều trị bệnh nhân nặng',
        moduleNumber: 6,
        moduleKey: 'module6-cac-nhom-khang-sinh',
        moduleTitle: 'Module 6: Các Nhóm Kháng Sinh',
        lessonNumber: 1,
        order: 15,
        description: 'Toàn diện về 4 phân nhóm Beta-lactam (Penicillins, Cephalosporins, Carbapenems, Monobactams): tương quan cấu trúc–hoạt tính (SAR R1/R2), ức chế PBP, 4 cơ chế đề kháng Ambler A–D, mục tiêu PK/PD 100% fT > 4×MIC (ACCP 2026), dị ứng chéo chuỗi bên R1, độc tính thần kinh và ca lâm sàng CAP chuẩn IDSA/ATS.',
        estimatedMinutes: 35,
        tags: ['Beta-Lactam', 'Penicillins', 'Cephalosporins', 'Carbapenems', 'Monobactams', 'PK/PD', 'Truyền kéo dài', 'ACCP 2026'],
        awareTier: 'access',
        pkpdModel: 'T>MIC',
        isNewEbm2026: true,
        hasInteractiveTool: true,
        toolId: 'pkpd-simulator',
        keyTakeaway: 'Ở bệnh nhân nặng ICU/sepsis, cần liều nạp (Loading Dose) kèm truyền kéo dài 3–4h hoặc liên tục 24h để đạt 100% fT > MIC (hoặc 4×MIC); phản ứng chéo Beta-lactam phụ thuộc chuỗi bên R1 chứ không phải vòng trung tâm.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Đặt Vấn Đề & Cấu Trúc Hóa Học Dược Lý (SAR)', icon: 'fa-solid fa-atom' },
          { id: 'sec-2', number: 2, title: 'Cơ Chế Diệt Khuẩn & 4 Cơ Chế Đề Kháng', icon: 'fa-solid fa-shield-virus' },
          { id: 'sec-3', number: 3, title: 'PK/PD (%fT > MIC) & Tối Ưu Liều Bệnh Nhân Nặng', icon: 'fa-solid fa-chart-line' },
          { id: 'sec-4', number: 4, title: 'Phân Loại Lâm Sàng & Phổ Kháng Khuẩn Chi Tiết', icon: 'fa-solid fa-table-list' },
          { id: 'sec-5', number: 5, title: 'Độc Tính, Dị Ứng Chéo R1 & An Toàn Lâm Sàng', icon: 'fa-solid fa-triangle-exclamation' },
          { id: 'sec-6', number: 6, title: 'Ca Lâm Sàng Minh Họa & Quy Trình Giám Sát', icon: 'fa-solid fa-stethoscope' },
          { id: 'sec-7', number: 7, title: 'Tài Liệu Tham Khảo (AMA Style)', icon: 'fa-solid fa-book-medical' }
        ]
      },
      {
        id: 'ks-6-2',
        slug: 'ks-6-2-nhom-khang-sinh-aminoglycoside',
        title: 'Tổng quan về nhóm kháng sinh Aminoglycoside: Cơ chế dược lý, tối ưu hóa PK/PD và quản trị độc tính lâm sàng',
        moduleNumber: 6,
        moduleKey: 'module6-cac-nhom-khang-sinh',
        moduleTitle: 'Module 6: Các Nhóm Kháng Sinh',
        lessonNumber: 2,
        order: 16,
        description: 'Toàn diện nhóm Aminoglycoside (Gentamicin, Tobramycin, Amikacin, Plazomicin): cấu trúc đa cation, cơ chế diệt khuẩn 6 bước trên 30S ribosome & hiệp đồng Gram dương, 4 cơ chế đề kháng (AMEs, 16S-RMTases), chiến lược Extended-Interval (Cmax/MIC ≥ 8–10) & TDM 2 điểm mẫu, quản trị độc tính thận–tai–thần kinh cơ (MT-RNR1) và ca lâm sàng VAP do MDR P. aeruginosa.',
        estimatedMinutes: 35,
        tags: ['Aminoglycoside', 'Gentamicin', 'Tobramycin', 'Amikacin', 'Plazomicin', 'Cmax/MIC', 'Extended-Interval', 'TDM', 'MT-RNR1'],
        awareTier: 'access',
        pkpdModel: 'Cmax/MIC',
        isNewEbm2026: true,
        hasInteractiveTool: true,
        toolId: 'pkpd-simulator',
        keyTakeaway: 'Dùng liều cao kéo dài khoảng cách (Extended-Interval) tối ưu Cmax/MIC ≥ 8–10, bão hòa thụ thể Megalin ống thận để giảm AKI và xóa đề kháng thích ứng; giám sát TDM 2 điểm mẫu, ngưng sớm sau 72h khi thoát sốc và tầm soát nguy cơ đột biến ty thể MT-RNR1.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Cấu Trúc Hóa Học & Phân Loại Dược Lý', icon: 'fa-solid fa-atom' },
          { id: 'sec-2', number: 2, title: 'Cơ Chế Diệt Khuẩn & Phổ Kháng Khuẩn', icon: 'fa-solid fa-bacteria' },
          { id: 'sec-3', number: 3, title: '4 Cơ Chế Đề Kháng Vi Sinh (AMEs & 16S-RMTases)', icon: 'fa-solid fa-shield-virus' },
          { id: 'sec-4', number: 4, title: 'PK/PD (Cmax/MIC), Extended-Interval & TDM', icon: 'fa-solid fa-chart-line' },
          { id: 'sec-5', number: 5, title: 'Độc Tính Lâm Sàng & Quản Trị Rủi Ro', icon: 'fa-solid fa-triangle-exclamation' },
          { id: 'sec-6', number: 6, title: 'Ca Lâm Sàng VAP MDR P. aeruginosa & Tính TDM', icon: 'fa-solid fa-stethoscope' },
          { id: 'sec-7', number: 7, title: 'Tài Liệu Tham Khảo (AMA Style)', icon: 'fa-solid fa-book-medical' }
        ]
      },
      {
        id: 'ks-6-3',
        slug: 'ks-6-3-nhom-khang-sinh-quinolone',
        title: 'Tổng quan về nhóm kháng sinh Fluoroquinolone: Cơ chế dược lý, tối ưu hóa PK/PD và quản trị rủi ro độc tính lâm sàng',
        moduleNumber: 6,
        moduleKey: 'module6-cac-nhom-khang-sinh',
        moduleTitle: 'Module 6: Các Nhóm Kháng Sinh',
        lessonNumber: 3,
        order: 17,
        description: 'Toàn diện nhóm Fluoroquinolone (Ciprofloxacin, Levofloxacin, Moxifloxacin, Delafloxacin): tương quan cấu trúc–hoạt tính (SAR C-6/C-7/N-1/C-8) & 4 thế hệ, cơ chế ức chế DNA Gyrase/Topoisomerase IV và 3 cơ chế đề kháng (QRDR, RND Efflux, PMQR), tối ưu hóa PK/PD (fAUC0–24/MIC, MSW, IV-to-PO 1:1 & tương tác chelate cation), Cảnh báo Hộp đen US FDA và ca lâm sàng CAP điều trị Levofloxacin liều cao ngắn ngày.',
        estimatedMinutes: 35,
        tags: ['Fluoroquinolone', 'Ciprofloxacin', 'Levofloxacin', 'Moxifloxacin', 'Delafloxacin', 'fAUC/MIC', 'FDA Black Box', 'IV-to-PO'],
        awareTier: 'watch',
        pkpdModel: 'AUC24/MIC',
        isNewEbm2026: true,
        hasInteractiveTool: true,
        toolId: 'iv-po-stepdown',
        keyTakeaway: 'Tối ưu hóa fAUC0–24/MIC (≥ 100–125 Gram âm, ≥ 30–40 phế cầu) & Cmax/MIC ≥ 8–10 để vượt Cửa sổ chọn lọc đột biến (MSW); tận dụng F = 99–100% chuyển IV-to-PO 1:1 (cách ly cation kim loại 2h trước / 4–6h sau) và tuân thủ nghiêm Cảnh báo Hộp đen FDA (gân Achilles, QTc/ĐMC, thần kinh, rối loạn đường huyết).',
        sections: [
          { id: 'sec-1', number: 1, title: 'Cấu Trúc Hóa Học (SAR) & Phân Loại 4 Thế Hệ', icon: 'fa-solid fa-atom' },
          { id: 'sec-2', number: 2, title: 'Cơ Chế Diệt Khuẩn & 3 Con Đường Đề Kháng', icon: 'fa-solid fa-shield-virus' },
          { id: 'sec-3', number: 3, title: 'PK/PD (fAUC/MIC), Dược Động Học & IV-to-PO', icon: 'fa-solid fa-chart-line' },
          { id: 'sec-4', number: 4, title: 'Cảnh Báo Hộp Đen FDA & Độc Tính Hệ Thống', icon: 'fa-solid fa-triangle-exclamation' },
          { id: 'sec-5', number: 5, title: 'Ca Lâm Sàng CAP & Quy Trình Giám Sát An Toàn', icon: 'fa-solid fa-stethoscope' },
          { id: 'sec-6', number: 6, title: 'Tài Liệu Tham Khảo (AMA Style)', icon: 'fa-solid fa-book-medical' }
        ]
      },
      {
        id: 'ks-6-4',
        slug: 'ks-6-4-nhom-khang-sinh-tetracycline-glycylcycline',
        title: 'Tổng quan về nhóm kháng sinh Tetracycline & Glycylcycline: Dược lý học phân tử, đề kháng vi sinh, tối ưu hóa PK/PD và quản trị độc tính lâm sàng',
        moduleNumber: 6,
        moduleKey: 'module6-cac-nhom-khang-sinh',
        moduleTitle: 'Module 6: Các Nhóm Kháng Sinh',
        lessonNumber: 4,
        order: 18,
        description: 'Toàn diện nhóm Tetracycline & Glycylcycline (Doxycycline, Minocycline, Tigecycline, Eravacycline, Omadacycline): tiến hóa 3 thế hệ & SAR 4 vòng hydronaphthacene, ức chế 30S ribosome, 4 cơ chế đề kháng Tet resistome (MFS/RND, RPPs, Tet(X), 16S rRNA), PK/PD fAUC24h/MIC & phác đồ Tigecycline liều cao (200 mg → 100 mg q12h), Cảnh báo Hộp đen US FDA và ca lâm sàng sốc nhiễm khuẩn cIAI/VAP do CRAB & CRE.',
        estimatedMinutes: 35,
        tags: ['Tetracycline', 'Doxycycline', 'Minocycline', 'Glycylcycline', 'Tigecycline', 'Eravacycline', 'Omadacycline', 'fAUC/MIC', 'FDA Black Box', 'CRAB', 'CRE'],
        awareTier: 'access',
        pkpdModel: 'AUC24/MIC',
        isNewEbm2026: true,
        hasInteractiveTool: true,
        toolId: 'aware-navigator',
        keyTakeaway: 'Doxycycline (Access) là trụ cột cho vi khuẩn không điển hình, Rickettsia & CA-MRSA; Tigecycline (Reserve) thấm mô cực sâu (Vd 7–10 L/kg) nhưng Cmax máu & thải thận thấp (cấm đơn trị BSI/cUTI) — khi dùng cứu cánh CRAB/CRE cần phác đồ liều cao (200 → 100 mg q12h) phối hợp thuốc theo IDSA 2024–2026.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Lịch Sử & Tiến Hóa 3 Thế Hệ Tetracycline–Glycylcycline', icon: 'fa-solid fa-timeline' },
          { id: 'sec-2', number: 2, title: 'Cấu Trúc Phân Tử (SAR) & Cơ Chế Ribosome 30S', icon: 'fa-solid fa-atom' },
          { id: 'sec-3', number: 3, title: '4 Cơ Chế Đề Kháng Vi Sinh (Tet Resistome)', icon: 'fa-solid fa-shield-virus' },
          { id: 'sec-4', number: 4, title: 'PK/PD (fAUC/MIC), Dược Động Học & Liều Cao', icon: 'fa-solid fa-chart-line' },
          { id: 'sec-5', number: 5, title: 'Phổ Kháng Khuẩn & Phân Tầng Chỉ Định Lâm Sàng', icon: 'fa-solid fa-bacteria' },
          { id: 'sec-6', number: 6, title: 'Độc Tính, FDA Black Box & Tương Tác Thuốc', icon: 'fa-solid fa-triangle-exclamation' },
          { id: 'sec-7', number: 7, title: 'Ca Lâm Sàng CRAB/CRE & Kế Hoạch Giám Sát', icon: 'fa-solid fa-stethoscope' },
          { id: 'sec-8', number: 8, title: 'Tài Liệu Tham Khảo (AMA Style)', icon: 'fa-solid fa-book-medical' }
        ]
      },
      {
        id: 'ks-6-5',
        slug: 'ks-6-5-nhom-khang-sinh-macrolide',
        title: 'Tổng quan về nhóm kháng sinh Macrolide: Dược lý học phân tử, đề kháng vi sinh, tối ưu hóa PK/PD và quản trị độc tính lâm sàng',
        moduleNumber: 6,
        moduleKey: 'module6-cac-nhom-khang-sinh',
        moduleTitle: 'Module 6: Các Nhóm Kháng Sinh',
        lessonNumber: 5,
        order: 19,
        description: 'Toàn diện nhóm Macrolide (Erythromycin, Clarithromycin, Azithromycin, Ketolide): cấu trúc vòng lactone 14–15–16C & cơ chế khóa kênh thoát peptide 23S rRNA (50S), 3 cơ chế đề kháng (erm/MLSB/D-test, bơm mef(A), đột biến 23S rRNA), PK/PD fAUC24/MIC & tích tụ bạch cầu hướng hóa của Azithromycin (Vd 31.1 L/kg, t1/2 68–72h), độc tính tim mạch QTc/TdP, ranh giới CYP3A4, điều hòa miễn dịch trên CF/COPD và ca lâm sàng CAP nội trú.',
        estimatedMinutes: 35,
        tags: ['Macrolide', 'Erythromycin', 'Clarithromycin', 'Azithromycin', 'Ketolide', 'fAUC/MIC', 'MLSB', 'D-test', 'QTc', 'CYP3A4', 'Điều hòa miễn dịch'],
        awareTier: 'watch',
        pkpdModel: 'AUC24/MIC',
        isNewEbm2026: true,
        hasInteractiveTool: true,
        toolId: 'iv-po-stepdown',
        keyTakeaway: 'Azithromycin tích tụ nội bào bạch cầu gấp 10–100× huyết tương (t1/2 68–72h) cho phép liệu trình ngắn 3–5 ngày và không ức chế CYP3A4 (an toàn với Statin); luôn giám sát QTc (ngưng nếu > 500 ms hoặc tăng > 60 ms) và làm D-test tầm soát kháng Clindamycin cảm ứng (gen erm).',
        sections: [
          { id: 'sec-1', number: 1, title: 'Vị Trí Dược Lý & Hoàn Cảnh Lâm Sàng Macrolide', icon: 'fa-solid fa-compass' },
          { id: 'sec-2', number: 2, title: 'Cấu Trúc Vòng Lactone (SAR) & Cơ Chế Ribosome 50S', icon: 'fa-solid fa-atom' },
          { id: 'sec-3', number: 3, title: 'Phổ Kháng Khuẩn & 3 Cơ Chế Đề Kháng (erm, mef, 23S)', icon: 'fa-solid fa-shield-virus' },
          { id: 'sec-4', number: 4, title: 'Dược Động Học (PK) & Dược Lực Học (fAUC/MIC)', icon: 'fa-solid fa-chart-line' },
          { id: 'sec-5', number: 5, title: 'Độc Tính Tim Mạch (QTc), ADR & Tương Tác CYP3A4', icon: 'fa-solid fa-triangle-exclamation' },
          { id: 'sec-6', number: 6, title: 'Điều Hòa Miễn Dịch & Ứng Dụng Ngoài Kháng Khuẩn', icon: 'fa-solid fa-lungs' },
          { id: 'sec-7', number: 7, title: 'Ca Lâm Sàng CAP Nội Trú & Chiến Lược Step-Down', icon: 'fa-solid fa-stethoscope' },
          { id: 'sec-8', number: 8, title: 'Tài Liệu Tham Khảo (AMA Style)', icon: 'fa-solid fa-book-medical' }
        ]
      }
    ]
  }
];

// Helper functions
export function getAllAntibioticLessons(): AntibioticLesson[] {
  return ANTIBIOTIC_MODULES.flatMap(m => m.lessons);
}

export function getAntibioticLessonBySlug(slug: string): AntibioticLesson | undefined {
  const clean = slug.replace(/\.(html|mdx|md)$/i, '');
  return getAllAntibioticLessons().find(l => l.slug === clean);
}

export function getAntibioticModuleByKey(key: string): AntibioticModule | undefined {
  return ANTIBIOTIC_MODULES.find(m => m.key === key || m.id === key);
}

export function getAntibioticToolById(id: string): AntibioticToolMeta | undefined {
  return ANTIBIOTIC_TOOLS.find(t => t.id === id);
}

