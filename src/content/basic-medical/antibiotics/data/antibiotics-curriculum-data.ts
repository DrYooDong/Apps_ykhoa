/**
 * CliniPortal — Antibiotics Curriculum & Master Registry
 * Path: src/content/basic-medical/antibiotics/data/antibiotics-curriculum-data.ts
 * 
 * Toàn bộ CSDL 6 Modules, 14 Bài học & 5 Công cụ Lâm sàng Tương tác
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
    badge: '2 Bài giảng',
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
        slug: 'ks-3-2-duong-dung-chuyen-doi-iv-sang-po',
        title: 'Nguyên tắc Lựa chọn Đường dùng & Chiến lược Chuyển đổi Kháng sinh từ IV sang PO',
        moduleNumber: 3,
        moduleKey: 'module3-pk-pd-duong-dung',
        moduleTitle: 'Module 3: PK/PD & Đường Dùng',
        lessonNumber: 2,
        order: 6,
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
    badge: '3 Bài giảng',
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
        order: 7,
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
        order: 8,
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
        order: 9,
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
      }
    ]
  },
  {
    id: 'module5-di-ung-beta-lactam',
    number: 5,
    key: 'module5-di-ung-beta-lactam',
    title: 'Module 5: Dị Ứng Kháng Sinh Beta-Lactam & Thuật Toán Phản Ứng Chéo',
    shortTitle: 'Dị Ứng Beta-Lactam',
    icon: 'fa-shield-halved',
    color: 'var(--dsp-rose)',
    badge: '2 Bài giảng',
    description: 'Phân biệt dị ứng thực sự (qua trung gian IgE / Non-IgE) vs tác dụng phụ thông thường; tỷ lệ phản ứng chéo thực tế giữa Penicillin, Cephalosporin, Carbapenem và quy trình xóa nhãn dị ứng (Delabeling).',
    clinicalObjective: 'Tự tin chỉ định Cephalosporin thế hệ 3/4 hoặc Carbapenem cho bệnh nhân có tiền sử dị ứng Penicillin nhẹ mà không cần né tránh kháng sinh tối ưu.',
    lessons: [
      {
        id: 'ks-5-1',
        slug: 'ks-5-1-phan-biet-di-ung-that-vs-adr',
        title: 'Phân biệt Dị ứng thật sự vs Tác dụng phụ / Không dung nạp của Kháng sinh',
        moduleNumber: 5,
        moduleKey: 'module5-di-ung-beta-lactam',
        moduleTitle: 'Module 5: Dị Ứng Beta-Lactam',
        lessonNumber: 1,
        order: 10,
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
        title: 'Tỷ lệ Phản ứng chéo thực tế giữa các Beta-lactam & Cơ chế Chuỗi bên R1/R2',
        moduleNumber: 5,
        moduleKey: 'module5-di-ung-beta-lactam',
        moduleTitle: 'Module 5: Dị Ứng Beta-Lactam',
        lessonNumber: 2,
        order: 11,
        description: 'Dữ liệu y học chứng cứ hiện đại chứng minh phản ứng chéo giữa Penicillin và Cephalosporin thực tế chỉ < 2% (chứ không phải 10% như sách cũ), Carbapenem < 1% và Aztreonam 0% (trừ Ceftazidime vì có cùng chuỗi bên R1). Bảng đối soát chuỗi bên hóa học.',
        estimatedMinutes: 25,
        tags: ['Phản ứng chéo', 'Chuỗi bên R1', 'Cephalosporin', 'Carbapenem', 'Aztreonam', 'EBM 2026'],
        isNewEbm2026: true,
        hasInteractiveTool: true,
        toolId: 'delabeling-matrix',
        keyTakeaway: 'Phản ứng dị ứng chéo phụ thuộc vào sự tương đồng của chuỗi bên R1, không phải do vòng Beta-lactam; Cephalosporin thế hệ 3/4 (Ceftriaxone, Cefotaxime, Cefepime) có chuỗi bên khác Penicillin nên tỷ lệ dị ứng chéo cực thấp (< 2%).',
        sections: [
          { id: 'sec-1', number: 1, title: 'Sự thật y học chứng cứ: Xóa bỏ huyền thoại "Dị ứng chéo 10%"', icon: 'fa-bullhorn' },
          { id: 'sec-2', number: 2, title: 'Cơ chế hóa học phân tử: Cấu trúc vòng Beta-lactam vs Chuỗi bên R1 & R2', icon: 'fa-atom' },
          { id: 'sec-3', number: 3, title: 'Ma trận đối soát chuỗi bên giống nhau: Ampicillin - Cefalexin, Amoxicillin - Cefadroxil', icon: 'fa-table-cells-large' },
          { id: 'sec-4', number: 4, title: 'Độ an toàn của Carbapenem (< 1%) & Trường hợp đặc biệt Aztreonam (0%)', icon: 'fa-shield-check' },
          { id: 'sec-5', number: 5, title: 'Thuật toán lâm sàng chọn Beta-lactam an toàn khi có tiền sử dị ứng Penicillin', icon: 'fa-code-branch' }
        ]
      }
    ]
  },
  {
    id: 'module6-phac-do-ngoai-tru',
    number: 6,
    key: 'module6-phac-do-ngoai-tru',
    title: 'Module 6: Phác Đồ Tiếp Cận & Điều Trị 3 Nhiễm Trùng Ngoại Trú Thường Gặp',
    shortTitle: 'Nhiễm Trùng Ngoại Trú',
    icon: 'fa-stethoscope',
    color: 'var(--dsp-teal)',
    badge: '3 Bài giảng',
    description: 'Hướng dẫn kê đơn cụ thể, liều lượng, thời gian dùng thuốc theo IDSA & BYT cho 3 bệnh lý ngoại trú chiếm 70% lượng kháng sinh cộng đồng: Viêm phổi nhẹ (CAP), Nhiễm khuẩn tiết niệu không biến chứng (UTI) và Nhiễm khuẩn da mô mềm (SSTI).',
    clinicalObjective: 'Kê đơn chính xác thuốc nhóm Access đầu tay, đúng liều lượng, đúng thời gian cho các nhiễm trùng ngoại trú thường gặp mà không lạm dụng Quinolone hay Cephalosporin thế hệ 3.',
    lessons: [
      {
        id: 'ks-6-1',
        slug: 'ks-6-1-dieu-tri-cap-the-nhe',
        title: 'Hướng dẫn điều trị Viêm phổi mắc phải cộng đồng (CAP) thể nhẹ ngoại trú',
        moduleNumber: 6,
        moduleKey: 'module6-phac-do-ngoai-tru',
        moduleTitle: 'Module 6: Nhiễm Trùng Ngoại Trú',
        lessonNumber: 1,
        order: 12,
        description: 'Tiêu chuẩn chẩn đoán CAP thể nhẹ (CRB-65 = 0); vi khuẩn gây bệnh chính (Phế cầu, Hemophilus, vi khuẩn không điển hình); phác đồ đầu tay Amoxicillin liều cao (1g x 3 lần/ngày) hoặc Amox-Clav phối hợp Doxycycline/Macrolide; thời gian điều trị tối ưu 5 ngày.',
        estimatedMinutes: 25,
        tags: ['CAP', 'Viêm phổi', 'CRB-65', 'Amoxicillin liều cao', 'Doxycycline', 'IDSA ATS'],
        isNewEbm2026: true,
        keyTakeaway: 'Phế cầu kháng Penicillin ở mức độ trung gian tại Việt Nam có thể vượt qua bằng Amoxicillin liều cao (3g/ngày); thời gian điều trị CAP thể nhẹ chỉ cần 5 ngày khi bệnh nhân đã ổn định lâm sàng.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Chẩn đoán xác định & Phân tầng nguy cơ ngoại trú bằng thang điểm CRB-65', icon: 'fa-lungs-virus' },
          { id: 'sec-2', number: 2, title: 'Bản đồ vi sinh CAP ngoại trú: Phế cầu, Haemophilus & Vi khuẩn không điển hình', icon: 'fa-bacterium' },
          { id: 'sec-3', number: 3, title: 'Phác đồ đầu tay cho người khỏe mạnh không bệnh đồng mắc', icon: 'fa-capsules' },
          { id: 'sec-4', number: 4, title: 'Phác đồ cho người có bệnh đồng mắc mạn tính hoặc nghi ngờ kháng thuốc', icon: 'fa-user-injured' },
          { id: 'sec-5', number: 5, title: 'Thời gian điều trị 5 ngày chuẩn EBM & Tiêu chí ngưng kháng sinh', icon: 'fa-calendar-check' }
        ]
      },
      {
        id: 'ks-6-2',
        slug: 'ks-6-2-dieu-tri-uti-khong-bien-chung',
        title: 'Hướng dẫn điều trị Nhiễm khuẩn đường tiết niệu dưới (Viêm bàng quang không biến chứng)',
        moduleNumber: 6,
        moduleKey: 'module6-phac-do-ngoai-tru',
        moduleTitle: 'Module 6: Nhiễm Trùng Ngoại Trú',
        lessonNumber: 2,
        order: 13,
        description: 'Chẩn đoán viêm bàng quang cấp ở phụ nữ tiền mãn kinh; loại trừ viêm đài bể thận (sốt, đau hông lưng); lựa chọn đầu tay nhóm Access: Nitrofurantoin (5 ngày), Fosfomycin trometamol (3g liều duy nhất), Co-trimoxazole (3 ngày nếu nhạy). Cảnh báo không dùng Quinolone cho UTI không biến chứng.',
        estimatedMinutes: 20,
        tags: ['UTI', 'Viêm bàng quang', 'Nitrofurantoin', 'Fosfomycin', 'E. coli', 'IDSA UTI'],
        isNewEbm2026: true,
        keyTakeaway: 'Nitrofurantoin và Fosfomycin chỉ đạt nồng độ cao trong nước tiểu mà không ngấm vào mô nhu mô thận, là vũ khí hoàn hảo cho viêm bàng quang để tránh chọn lọc vi khuẩn đường ruột kháng thuốc.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Định nghĩa Viêm bàng quang không biến chứng & Tiêu chí phân biệt Viêm đài bể thận', icon: 'fa-toilet' },
          { id: 'sec-2', number: 2, title: 'Phổ vi khuẩn gây bệnh hàng đầu (UPEC - Uropathogenic E. coli)', icon: 'fa-bacteria' },
          { id: 'sec-3', number: 3, title: 'Phác đồ lựa chọn đầu tay nhóm Access: Nitrofurantoin vs Fosfomycin', icon: 'fa-prescription-bottle-medical' },
          { id: 'sec-4', number: 4, title: 'Tại sao FDA và IDSA khuyến cáo CHỐNG LẠI việc dùng Ciprofloxacin cho UTI nhẹ?', icon: 'fa-circle-xmark' },
          { id: 'sec-5', number: 5, title: 'Theo dõi đáp ứng, giáo dục bệnh nhân dự phòng tái phát', icon: 'fa-shield-heart' }
        ]
      },
      {
        id: 'ks-6-3',
        slug: 'ks-6-3-dieu-tri-ssti-the-nhe',
        title: 'Hướng dẫn điều trị Nhiễm khuẩn Da & Mô mềm (SSTI) thể nhẹ ngoại trú',
        moduleNumber: 6,
        moduleKey: 'module6-phac-do-ngoai-tru',
        moduleTitle: 'Module 6: Nhiễm Trùng Ngoại Trú',
        lessonNumber: 3,
        order: 14,
        description: 'Phân loại SSTI có mủ (áp xe, mụn nhọt - nguyên nhân tụ cầu S. aureus) vs không mủ (viêm mô tế bào lan tỏa, viêm quầng - nguyên nhân liên cầu Streptococcus); nguyên tắc rạch tháo mủ là chính cho áp xe nhỏ; phác đồ Cefalexin/Cloxacillin; xử trí vết thương súc vật cắn bằng Amox-Clav.',
        estimatedMinutes: 20,
        tags: ['SSTI', 'Viêm mô tế bào', 'Áp xe', 'Tụ cầu', 'Liên cầu', 'Vết cắn động vật'],
        isNewEbm2026: true,
        keyTakeaway: 'Áp xe có mủ nhỏ thì rạch thoát mủ (I&D) là biện pháp điều trị quyết định, kháng sinh chỉ là thứ yếu; với viêm mô tế bào không mủ thì liên cầu là nguyên nhân chính, dùng Cefalexin bao phủ tốt.',
        sections: [
          { id: 'sec-1', number: 1, title: 'Phân đôi con đường: SSTI có mủ (Purulent) vs SSTI không mủ (Non-purulent)', icon: 'fa-code-branch' },
          { id: 'sec-2', number: 2, title: 'Vai trò tối thượng của Rạch và Tháo mủ (Incision & Drainage)', icon: 'fa-scalpel' },
          { id: 'sec-3', number: 3, title: 'Phác đồ kháng sinh đường uống cho Viêm mô tế bào không mủ (Liên cầu)', icon: 'fa-capsules' },
          { id: 'sec-4', number: 4, title: 'Đánh giá nguy cơ CA-MRSA & Lựa chọn Co-trimoxazole / Clindamycin / Doxycycline', icon: 'fa-shield-virus' },
          { id: 'sec-5', number: 5, title: 'Phác đồ đặc thù cho vết thương do chó, mèo hoặc người cắn (Bao phủ Pasteurella & Kỵ khí)', icon: 'fa-dog' }
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

