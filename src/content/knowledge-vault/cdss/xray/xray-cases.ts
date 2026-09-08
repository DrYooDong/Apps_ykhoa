import type { CaseStudy, KnowledgeEntry } from './xray-types';

export const DEFAULT_CASES: CaseStudy[] = [
  {
    id: 'case-copd-001',
    title: 'Bệnh phổi tắc nghẽn mãn tính (COPD) nặng',
    patientAge: 68,
    patientGender: 'M',
    clinicalHistory: 'Nam 68 tuổi, tiền sử hút thuốc 40 năm. Khó thở tăng dần, ho khan mạn tính. FEV1/FVC < 70%. Nhập viện vì đợt cấp COPD.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'copd-hyperinflate',
        name: 'Tăng thông khí phổi',
        description: 'Phổi tăng sáng hai bên, đặc biệt vùng ngoại vi. Khoang liên sườn giãn rộng.',
        severity: 'moderate',
        location: 'Hai phổi, vùng ngoại vi',
        radiographicSign: 'Hyperlucency - Phổi sáng hơn bình thường do khí phế thũng. Các bóng khí phế nang giãn rộng làm giảm mật độ mô phổi.',
        differentialDiagnosis: ['Khí phế thũng trung tâm tiểu thùy', 'Khí phế thủng toàn tiểu thùy', 'Hội chứng Swyer-James'],
        clinicalCorrelation: 'Tương quan với giảm FEV1, tăng dung tích cặn chức năng (FRC). Bệnh nhân có khó thở khi gắng sức.',
        confidence: 0.92,
        x: 200, y: 350, radius: 120,
        type: 'lucency',
      },
      {
        id: 'copd-flatdiaphragm',
        name: 'Cơ hoành dẹt',
        description: 'Cơ hoành hai bên dẹt xuống thấp, vòm hoành phải ở khoang liên sườn 8, trái ở KLS 9.',
        severity: 'moderate',
        location: 'Cơ hoành hai bên',
        radiographicSign: 'Flat diaphragm - Vòm hoành thấp hơn bình thường, mất độ cong sinh lý. Dấu hiệu tăng thông khí mạn tính.',
        differentialDiagnosis: ['Tăng thông khí do hen', 'Xơ phổi giai đoạn muộn'],
        clinicalCorrelation: 'Cơ hoành dẹt làm giảm hiệu quả co bóp, góp phần vào suy hô hấp.',
        confidence: 0.88,
        x: 300, y: 560, radius: 150,
        type: 'lucency',
      },
      {
        id: 'copd-narrowheart',
        name: 'Bóng tim thu nhỏ',
        description: 'Chỉ số tim/ngực < 0.42 (bình thường 0.45-0.5). Bóng tim hẹp do phổi tăng thông khí.',
        severity: 'mild',
        location: 'Trung thất',
        radiographicSign: 'Narrow cardiac silhouette - Tim trông nhỏ hơn do phổi giãn quá mức đẩy vào.',
        differentialDiagnosis: ['Giảm thể tích tuần hoàn', 'Suy dinh dưỡng nặng'],
        clinicalCorrelation: 'Bóng tim nhỏ là dấu hiệu gián tiếp của khí phế thủng nặng.',
        confidence: 0.85,
        x: 300, y: 420, radius: 80,
        type: 'lucency',
      },
    ],
    diagnosis: 'COPD giai đoạn D (GOLD) - Khí phế thủng phổi nặng hai bên',
    notes: 'Phim X-quang ngực tư thế thẳng cho thấy dấu hiệu điển hình của khí phế thủng: phổi tăng sáng, cơ hoành dẹt, bóng tim hẹp. Cần chụp CT ngực đánh giá mức độ khí phế thủng.',
    tags: ['COPD', 'khí phế thủng', 'hô hấp', 'người già'],
    createdAt: '2024-01-15',
    isTemplate: true,
  },
  {
    id: 'case-pneumonia-001',
    title: 'Viêm phổi thùy phải dưới',
    patientAge: 45,
    patientGender: 'F',
    clinicalHistory: 'Nữ 45 tuổi, sốt cao 39°C 3 ngày, ho đờm vàng xanh, đau ngực phải. Nghe phổi có ran ẩm đáy phải. CRP 180 mg/L, bạch cầu 15.000.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'pneumonia-consolidation',
        name: 'Đông đặc phổi thùy dưới phải',
        description: 'Opaque đồng nhất vùng đáy phổi phải, xóa góc sườn hoành phải. Ranh giới rõ với nhu mô phổi bình thường lân cận.',
        severity: 'severe',
        location: 'Thùy dưới phổi phải',
        radiographicSign: 'Lobar consolidation - Vùng đông đặc đồng nhất, bờ rõ, có thể thấy air bronchogram. Xóa góc costophrenic.',
        differentialDiagnosis: ['Ung thư phổi tắc nghẽn', 'Xẹp phổi do nút nhầy', 'Nhồi máu phổi'],
        clinicalCorrelation: 'Tương quan với triệu chứng lâm sàng: sốt, ho đờm, ran ẩm. Đáp ứng kháng sinh sau 48-72h.',
        confidence: 0.95,
        x: 200, y: 450, radius: 90,
        type: 'opacity',
      },
      {
        id: 'pneumonia-air-broncho',
        name: 'Air bronchogram',
        description: 'Các nhánh phế quản chứa khí thấy rõ trong vùng đông đặc, tạo hình ảnh đường sáng trên nền mờ.',
        severity: 'moderate',
        location: 'Trong vùng đông đặc',
        radiographicSign: 'Air bronchogram sign - Đường sáng của phế quản chứa khí nổi trên nền nhu mô đông đặc mờ đục.',
        differentialDiagnosis: ['Viêm phổi do phế cầu', 'Viêm phổi do Klebsiella', 'Phù phổi khu trú'],
        clinicalCorrelation: 'Air bronchogram gợi ý quá trình bệnh trong phế nang, không phải trong phế quản.',
        confidence: 0.90,
        x: 190, y: 420, radius: 40,
        type: 'opacity',
      },
      {
        id: 'pneumonia-effusion',
        name: 'Tràn dịch màng phổi phải (lượng ít)',
        description: 'Mờ đáy phổi phải, mất góc costophrenic phải. Mức dịch ước tính < 500ml.',
        severity: 'mild',
        location: 'Khoang màng phổi phải',
        radiographicSign: 'Small pleural effusion - Mờ đáy phổi, meniscus sign. Blunting of costophrenic angle.',
        differentialDiagnosis: ['Tràn dịch cận viêm phổi', 'Tràn dịch do suy tim', 'Tràn dịch ác tính'],
        clinicalCorrelation: 'Tràn dịch phản ứng cạnh viêm phổi. Cần siêu âm đánh giá lượng dịch và chọc dịch nếu nghi ngờ.',
        confidence: 0.82,
        x: 160, y: 540, radius: 50,
        type: 'effusion',
      },
    ],
    diagnosis: 'Viêm phổi thùy phải dưới - Có thể do Streptococcus pneumoniae',
    notes: 'Đông đặc thùy điển hình với air bronchogram. Tràn dịch màng phổi lượng ít phản ứng. Điều trị kháng sinh phổ rộng, đánh giá lại sau 48-72h. Nếu không đáp ứng cần CT ngực và nội soi phế quản.',
    tags: ['viêm phổi', 'đông đặc', 'nhiễm khuẩn', 'air bronchogram'],
    createdAt: '2024-02-20',
    isTemplate: true,
  },
  {
    id: 'case-lung-cancer-001',
    title: 'Ung thư phổi trung tâm',
    patientAge: 62,
    patientGender: 'M',
    clinicalHistory: 'Nam 62 tuổi, hút thuốc 30 bao-năm. Ho ra máu ít, gầy sút 5kg/2 tháng. Nội soi phế quản: u sùi phế quản gốc phải.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'cancer-mass',
        name: 'Khối u rốn phổi phải',
        description: 'Khối mờ đậm vùng rốn phải, bờ không đều, kích thước ước tính 5x4cm. Có dấu hiệu phế quản bị chèn ép.',
        severity: 'critical',
        location: 'Rốn phổi phải',
        radiographicSign: 'Hilar mass - Khối mờ vùng rốn phổi, bờ tua gai hoặc không đều. Có thể có dấu hiệu chèn ép phế quản.',
        differentialDiagnosis: ['Ung thư tế bào vảy', 'Ung thư tế bào nhỏ', 'U lympho', 'Di căn hạch'],
        clinicalCorrelation: 'Ho ra máu + gầy sút + tiền sử hút thuốc = nghi ngờ cao ung thư phổi. Cần sinh thiết.',
        confidence: 0.94,
        x: 280, y: 280, radius: 55,
        type: 'mass',
      },
      {
        id: 'cancer-atelectasis',
        name: 'Xẹp phổi thùy giữa phải',
        description: 'Tam giác mờ vùng rốn phải (golden S sign), ranh giới bởi khe nứt ngang và khe nứt chéo.',
        severity: 'severe',
        location: 'Thùy giữa phổi phải',
        radiographicSign: "Golden S sign of Golden - Đường cong hình chữ S ngược tạo bởi bờ dưới khối u và bờ trên thùy giữa xẹp.",
        differentialDiagnosis: ['Xẹp phổi do tắc nghẽn', 'Viêm phổi không resolving', 'U carcinoid'],
        clinicalCorrelation: 'Xẹp thùy giữa do khối u trung tâm chèn ép phế quản. Cần CT và nội soi phế quản.',
        confidence: 0.88,
        x: 230, y: 350, radius: 60,
        type: 'opacity',
      },
      {
        id: 'cancer-calcification',
        name: 'Hạch trung thất vôi hóa',
        description: 'Các nốt vôi hóa vùng trung thất cạnh khí quản, có thể là hạch di căn hoặc hạch lao cũ.',
        severity: 'moderate',
        location: 'Trung thất trên',
        radiographicSign: 'Mediastinal calcified lymph nodes - Nốt đậm độ cao, bờ rõ vùng trung thất.',
        differentialDiagnosis: ['Hạch lao vôi hóa', 'Hạch di căn', 'Bệnh bụi phổi'],
        clinicalCorrelation: 'Cần phân biệt hạch lao cũ và hạch di căn. PET-CT giúp đánh giá hoạt động chuyển hóa.',
        confidence: 0.75,
        x: 310, y: 180, radius: 15,
        type: 'calcification',
      },
    ],
    diagnosis: 'Ung thư phế quản phải - Giai đoạn IIIA (T3N2M0) - Cần staging hoàn chỉnh',
    notes: 'Khối u trung tâm với dấu hiệu Golden S. Cần CT ngực có thuốc cản quang, PET-CT, nội soi phế quản sinh thiết, đánh giá chức năng hô hấp trước phẫu thuật. Hội chẩn đa chuyên khoa.',
    tags: ['ung thư phổi', 'khối u', 'hạch trung thất', 'xẹp phổi'],
    createdAt: '2024-03-10',
    isTemplate: true,
  },
  {
    id: 'case-heart-failure-001',
    title: 'Suy tim sung huyết',
    patientAge: 72,
    patientGender: 'F',
    clinicalHistory: 'Nữ 72 tuổi, tiền sử suy tim EF 30%. Khó thở khi nằm, phù hai chân. NT-proBNP 5800 pg/mL. Nghe phổi ran nổ hai đáy.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'hf-cardiomegaly',
        name: 'Bóng tim to',
        description: 'CTR = 0.62 (bình thường < 0.5). Bóng tim to toàn bộ, đặc biệt buồng thất trái.',
        severity: 'severe',
        location: 'Trung thất dưới',
        radiographicSign: 'Cardiomegaly (CTR > 0.5) - Bóng tim to trên phim thẳng. Đánh giá từng buồng tim.',
        differentialDiagnosis: ['Bệnh van tim', 'Bệnh cơ tim giãn', 'Tràn dịch màng ngoài tim'],
        clinicalCorrelation: 'CTR > 0.5 tương quan với suy tim mạn. Siêu âm tim đánh giá EF và cấu trúc.',
        confidence: 0.96,
        x: 310, y: 420, radius: 110,
        type: 'cardiomegaly',
      },
      {
        id: 'hf-edema',
        name: 'Phù phổi kẽ',
        description: 'Đường Kerley B ở đáy phổi hai bên. mờ phế tru quản quanh rốn phổi (perihilar haze).',
        severity: 'severe',
        location: 'Phổi hai bên, vùng đáy',
        radiographicSign: 'Kerley B lines - Đường ngang ngắn ở đáy phổi, vuông góc với màng phổi. Perihilar haze do phù nề kẽ.',
        differentialDiagnosis: ['Xơ phổi kẽ', 'Bạch huyếtang carcinomatosa', 'Viêm phổi không điển hình'],
        clinicalCorrelation: 'Kerley B phản ánh tăng áp lực tĩnh mạch phổi > 18 mmHg. Đáp ứng lợi tiểu.',
        confidence: 0.91,
        x: 200, y: 500, radius: 70,
        type: 'opacity',
      },
      {
        id: 'hf-effusion',
        name: 'Tràn dịch màng phổi hai bên',
        description: 'Mờ hai đáy phổi, mất góc costophrenic hai bên. Bên phải nhiều hơn bên trái.',
        severity: 'moderate',
        location: 'Khoang màng phổi hai bên',
        radiographicSign: 'Bilateral pleural effusion - Mờ đáy phổi hai bên, meniscus sign. Thường phải > trái trong suy tim.',
        differentialDiagnosis: ['Tràn dịch do suy tim', 'Tràn dịch do giảm albumin', 'Tràn dịch ác tính hai bên'],
        clinicalCorrelation: 'Tràn dịch hai bên trong suy tim thường đối xứng hoặc phải nhiều hơn. Đáp ứng điều trị suy tim.',
        confidence: 0.89,
        x: 300, y: 560, radius: 100,
        type: 'effusion',
      },
      {
        id: 'hf-cephalization',
        name: 'Tái phân bố mạch máu lên đỉnh',
        description: 'Mạch máu vùng đỉnh phổi nổi rõ hơn bình thường, đường kính mạch máu đỉnh ≥ mạch máu đáy.',
        severity: 'moderate',
        location: 'Phổi hai bên, vùng đỉnh',
        radiographicSign: 'Cephalization of pulmonary vessels - Mạch máu đỉnh phổi to bằng hoặc hơn mạch máu đáy. Bình thường: đáy > đỉnh.',
        differentialDiagnosis: ['Tăng áp tĩnh mạch phổi', 'Hẹp hai lá', 'Tái phân bố tư thế'],
        clinicalCorrelation: 'Dấu hiệu sớm của phù phổi, trước khi có Kerley B. Áp lực mao mạch phổi > 12 mmHg.',
        confidence: 0.84,
        x: 300, y: 150, radius: 80,
        type: 'opacity',
      },
    ],
    diagnosis: 'Suy tim sung huyết mất bù - Phù phổi kẽ + tràn dịch màng phổi hai bên',
    notes: 'Tam chứng: bóng tim to + phù phổi kẽ + tràn dịch hai bên. Điều trị: lợi tiểu furosemide, hạn chế dịch, tư thế ngồi. Đánh giá lại phim sau 24-48h điều trị.',
    tags: ['suy tim', 'phù phổi', 'tràn dịch', 'bóng tim to'],
    createdAt: '2024-04-05',
    isTemplate: true,
  },
  {
    id: 'case-pneumothorax-001',
    title: 'Tràn khí màng phổi tự phát',
    patientAge: 25,
    patientGender: 'M',
    clinicalHistory: 'Nam 25 tuổi, cao gầy, hút thuốc. Đau ngực phải đột ngột khi chơi thể thao. Khó thở nhẹ. Nghe phổi giảm rì rào phế nang phải.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'ptx-air',
        name: 'Tràn khí màng phổi phải',
        description: 'Vùng sáng ngoài rìa phổi phải, không thấy mạch máu phổi. Đường màng phổi tạng thấy rõ song song thành ngực.',
        severity: 'severe',
        location: 'Khoang màng phổi phải, vùng đỉnh',
        radiographicSign: 'Visceral pleural line - Đường sáng mảnh song song thành ngực. Vùng ngoài không có mạch máu phổi (lucent area without vascular markings).',
        differentialDiagnosis: ['Bóng da cuộn', 'Nếp gấp màng phổi', 'Khí trong dạ dày'],
        clinicalCorrelation: 'Tràn khí tự phát nguyên phát ở người trẻ, cao gầy, hút thuốc. Đánh giá kích thước để quyết định dẫn lưu.',
        confidence: 0.97,
        x: 450, y: 200, radius: 80,
        type: 'pneumothorax',
      },
      {
        id: 'ptx-collapse',
        name: 'Xẹp phổi phải một phần',
        description: 'Phổi phải xẹp về phía rốn, bờ thấy rõ. Ước tính xẹp khoảng 30% thể tích.',
        severity: 'moderate',
        location: 'Phổi phải',
        radiographicSign: 'Lung collapse - Nhu mô phổi đặc hơn bình thường, co về phía rốn. Mạch máu tập trung.',
        differentialDiagnosis: ['Xẹp phổi do tắc nghẽn', 'Xẹp do chèn ép ngoài'],
        clinicalCorrelation: 'Xẹp < 30% có thể theo dõi. > 30% hoặc có triệu chứng cần dẫn lưu.',
        confidence: 0.88,
        x: 420, y: 350, radius: 60,
        type: 'opacity',
      },
    ],
    diagnosis: 'Tràn khí màng phổi phải tự phát nguyên phát - Xẹp phổi 30%',
    notes: 'Tràn khí tự phát nguyên phát. Chỉ định: hút khí bằng kim hoặc dẫn lưu ống nhỏ (pigtail). Theo dõi phim sau 6h. Tư vấn bỏ thuốc lá.',
    tags: ['tràn khí', 'tự phát', 'cấp cứu', 'người trẻ'],
    createdAt: '2024-05-12',
    isTemplate: true,
  },
  {
    id: 'case-bowel-obstruction-001',
    title: 'Tắc ruột non cơ học',
    patientAge: 55,
    patientGender: 'F',
    clinicalHistory: 'Nữ 55 tuổi, tiền sử mổ cắt tử cung 5 năm trước. Đau bụng quặn từng cơn, nôn, bí trung đại tiện 2 ngày. Bụng chướng căng.',
    examType: 'abdomen_supine',
    findings: [
      {
        id: 'bo-dilated',
        name: 'Quai ruột non giãn',
        description: 'Nhiều quai ruột non giãn > 3cm, chứa cả hơi và dịch. Hình ảnh bậc thang hơi-dịch (step-ladder pattern).',
        severity: 'severe',
        location: 'Giữa ổ bụng',
        radiographicSign: 'Dilated small bowel loops - Quai ruột giãn > 3cm (bình thường < 2.5cm). Van nối tràng (plicae circulares) thấy rõ bắt ngang quai ruột.',
        differentialDiagnosis: ['Tắc ruột do dính', 'Thoát vị nghẹt', 'U chèn ép', 'Viêm ruột'],
        clinicalCorrelation: 'Tiền sử mổ bụng + tắc ruột = nghi ngờ tắc do dính. Cần CT bụng có thuốc cản quang để xác định vị trí và nguyên nhân.',
        confidence: 0.93,
        x: 300, y: 380, radius: 120,
        type: 'lucency',
      },
      {
        id: 'bo-fluid-levels',
        name: 'Mức hơi-dịch',
        description: 'Các mức hơi-dịch ngang thấy trên phim tư thế đứng. Chiều rộng quai ruột > 3cm.',
        severity: 'severe',
        location: 'Ổ bụng',
        radiographicSign: 'Air-fluid levels - Các đường ngang chia đôi quai ruột thành phần hơi trên và phần dịch dưới.',
        differentialDiagnosis: ['Tắc ruột cơ học', 'Liệt ruột', 'Viêm phúc mạc'],
        clinicalCorrelation: 'Mức hơi-dịch nhiều tầng gợi ý tắc ruột cơ học. Liệt ruột thường ít mức hơn.',
        confidence: 0.91,
        x: 250, y: 400, radius: 45,
        type: 'lucency',
      },
      {
        id: 'bo-gasless',
        name: 'Thiếu hơi đại tràng',
        description: 'Đại tràng ít hơi, không thấy hơi trực tràng. Khung đại tràng xẹp.',
        severity: 'moderate',
        location: 'Khung đại tràng',
        radiographicSign: 'Gasless colon - Đại tràng không chứa hơi bình thường. Gợi ý tắc hoàn toàn.',
        differentialDiagnosis: ['Tắc ruột hoàn toàn', 'Nhịn ăn lâu ngày', 'Thụt tháo gần đây'],
        clinicalCorrelation: 'Đại tràng xẹp + ruột non giãn = tắc ruột cơ học hoàn toàn. Cần can thiệp ngoại khoa.',
        confidence: 0.86,
        x: 300, y: 550, radius: 100,
        type: 'opacity',
      },
    ],
    diagnosis: 'Tắc ruột non cơ học hoàn toàn - Nghi ngờ do dính sau mổ',
    notes: 'Tam chứng: quai ruột non giãn + mức hơi-dịch + đại tràng xẹp. Chỉ định: đặt ống thông dạ dày, bù dịch điện giải, theo dõi. Nếu không cải thiện sau 24-48h hoặc có dấu hiệu estrangulation → phẫu thuật.',
    tags: ['tắc ruột', 'ruột non', 'cấp cứu bụng', 'sau mổ'],
    createdAt: '2024-06-08',
    isTemplate: true,
  },
];

export const DEFAULT_KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: 'kb-approach-001',
    title: 'Phương pháp đọc phim X-quang ngực hệ thống',
    category: 'Phương pháp',
    content: `## Quy trình đọc phim X-quang ngực A-B-C-D-E-F-G

### A - Airway (Đường thở)
- Khí quản: có lệch không? (lệch về phía xẹp, đẩy sang bên đối diện trong tràn khí/dịch lớn)
- Phế quản gốc: có thấy rõ không?
- Carina: góc chia nhánh (bình thường 60-70°)

### B - Bones (Xương)
- Xương đòn: đối xứng hai bên
- Xương sườn: đếm từ trên xuống, tìm gãy xương, hủy xương
- Cột sống: thẳng hàng, tìm xẹp đốt sống
- Xương bả vai

### C - Cardiac (Tim)
- CTR (Cardiothoracic Ratio): bình thường < 0.5
- Cung tim: cung trái (thất trái), cung phải (nhĩ phải)
- Bóng động mạch chủ
- Rốn phổi

### D - Diaphragm (Cơ hoành)
- Vòm hoành phải cao hơn trái (0.5-1.5 cm)
- Góc costophrenic: nhọn, rõ
- Góc cardiophrenic
- Hơi tự do dưới hoành (tư thế đứng)

### E - Effusion (Tràn dịch)
- Mờ đáy phổi
- Mất góc costophrenic (>200ml mới thấy trên phim thẳng)
- Meniscus sign
- Tràn dịch kẽ (Kerley B lines)

### F - Fields (Trường phổi)
- So sánh hai bên: đối xứng?
- Mạch máu phổi: kích thước, phân bố
- Tìm opacity, lucency bất thường
- Vùng ngoại vi vs trung tâm

### G - Gastric/Soft tissues
- Bóng hơi dạ dày
- Các mô mềm: vú, nách, cổ`,
    tags: ['phương pháp', 'hệ thống', 'cơ bản', 'đọc phim'],
    createdAt: '2024-01-01',
    updatedAt: '2024-06-01',
  },
  {
    id: 'kb-approach-002',
    title: 'Các dấu hiệu X-quang kinh điển cần nhớ',
    category: 'Dấu hiệu',
    content: `## Dấu hiệu X-quang kinh điển

### 1. Golden S Sign
- **Mô tả**: Đường cong hình chữ S ngược ở rốn phổi
- **Nguyên nhân**: Khối u trung tâm + xẹp thùy phổi phía ngoại vi
- **Ý nghĩa**: Ung thư phổi trung tâm

### 2. Silhouette Sign (Dấu hiệu mất bóng)
- **Mô tả**: Mất ranh giới giữa các cấu trúcnormally thấy rõ
- **Ví dụ**: 
  - Mất bờ tim phải → đông đặc thùy giữa phải
  - Mất bờ tim trái → đông đặc thùy lưỡi
  - Mất cơ hoành phải → đông đặc thùy dưới phải

### 3. Air Bronchogram
- **Mô tả**: Phế quản chứa khí thấy rõ trong nền đông đặc
- **Ý nghĩa**: Quá trình trong phế nang (viêm phổi, phù phổi, BAC)
- **Phân biệt**: Không có trong xẹp phổi do tắc nghẽn

### 4. Hampton's Hump
- **Mô tả**: Vùng mờ hình nêm, đáy hướng về màng phổi
- **Ý nghĩa**: Nhồi máu phổi

### 5. Westermark Sign
- **Mô tả**: Vùng sáng cục bộ do giảm tưới máu
- **Ý nghĩa**: Thuyên tắc phổi

### 6. Double Density Sign
- **Mô tả**: Hai lớp đậm độ chồng lên nhau ở vùng tim
- **Ý nghĩa**: Phì đại nhĩ trái

### 7. Cephalization
- **Mô tả**: Mạch máu đỉnh phổi to ≥ mạch máu đáy
- **Ý nghĩa**: Tăng áp tĩnh mạch phổi (suy tim sớm)

### 8. Kerley Lines
- **Kerley A**: Đường dài 2-6cm, xiên, từ rốn phổi ra ngoại vi
- **Kerley B**: Đường ngắn 1-2cm, ngang, ở đáy phổi vuông góc màng phổi
- **Kerley C**: Mạng lưới mịn ở đáy phổi
- **Ý nghĩa**: Phù phổi kẽ / tăng áp lực mao mạch phổi`,
    tags: ['dấu hiệu', 'kinh điển', 'chẩn đoán'],
    createdAt: '2024-01-15',
    updatedAt: '2024-05-20',
  },
  {
    id: 'kb-approach-003',
    title: 'Phân biệt các nguyên nhân mờ phổi trên X-quang',
    category: 'Chẩn đoán phân biệt',
    content: `## Chẩn đoán phân biệt vùng mờ phổi

### Mờ thùy (Lobar opacity)
1. **Viêm phổi thùy** - Air bronchogram (+), bờ rõ theo giải phẫu thùy
2. **Xẹp phổi** - Dấu hiệu thể tích giảm (lệch trung thất, nâng cơ hoành)
3. **Ung thư phổi tắc nghẽn** - Không air bronchogram, xẹp chậm

### Mờ đốm (Patchy opacity)
1. **Viêm phổi phế quản** - Phân bố không đối xứng, quanh phế quản
2. **Phù phổi** - Đối xứng hai bên, vùng quanh rốn
3. **Xuất huyết phổi** - Thay đổi nhanh, lâm sàng nặng

### Mờ nốt (Nodule)
1. **U nguyên phát** - Bờ tua gai, kích thước tăng
2. **Di căn** - Nhiều nốt, bờ rõ, phân bố ngoại vi
3. **U hạt (granuloma)** - Vôi hóa trung tâm hoặc đồng tâm, ổn định
4. **AVM** - Nối với mạch máu, tăng cường thuốc cản quang

### Mờ lan tỏa (Diffuse opacity)
1. **ARDS** - Mờ trắng hai bên, không đối xứng hoàn toàn
2. **Phù phổi** - Cánh bướm, Kerley B, bóng tim to
3. **Viêm phổi kê** - Nốt nhỏ 1-3mm rải rác
4. **Bệnh bụi phổi** - Tiền sử nghề nghiệp, vôi hóa hạch`,
    tags: ['chẩn đoán phân biệt', 'mờ phổi', 'nốt phổi'],
    createdAt: '2024-02-10',
    updatedAt: '2024-06-15',
  },
  {
    id: 'kb-approach-004',
    title: 'Hướng dẫn đọc X-quang bụng cấp cứu',
    category: 'Phương pháp',
    content: `## Đọc phim X-quang bụng cấp cứu

### Tư thế phim
- **Supine (nằm ngửa)**: Đánh giá tổng quát, kích thước tạng
- **Erect (đứng)**: Phát hiện hơi tự do, mức hơi-dịch
- **Decubitus (nằm nghiêng)**: Thay thế khi bệnh nhân không đứng được

### Trình tự đọc
1. **Khí bất thường**
   - Hơi tự do dưới hoành → thủng tạng rỗng
   - Khí trong thành ruột → hoại tử ruột
   - Khí trong tĩnh mạch cửa → hoại tử ruột nặng
   - Pneumobilia → rò mật-ruột

2. **Ruột**
   - Ruột non: giãn > 3cm = bất thường
     - Van nối tràng (plicae circulares) bắt ngang
   - Đại tràng: giãn > 6cm = bất thường (9cm manh tràng = nguy cơ thủng)
     - Haustra không bắt ngang hoàn toàn
   - Phân biệt: Ruột non (trung tâm, van nối) vs Đại tràng (ngoại vi, haustra)

3. **Tư tạng đặc**
   - Gan: kích thước, vôi hóa
   - Lách: kích thước (bình thường < 12cm)
   - Thận: bóng thận, sỏi (50% sỏi cản quang)
   - Tuyến thượng thận: hiếm thấy

4. **Xương**
   - Cột sống thắt lưng
   - Khung chậu
   - Hông khớp
   - Tìm hủy xương, gãy xương

5. **Mô mềm**
   - Bóng cơ thắt lưng (psoas)
   - Mỡ trước thận
   - Thành bụng

### Dấu hiệu nguy hiểm cần phát hiện
- ⚠️ Hơi tự do dưới hoành
- ⚠️ Giãn ruột + mức hơi-dịch
- ⚠️ Bóng gan mờ (áp xe)
- ⚠️ Sỏi niệu quản + ứ nước
- ⚠️ Phình động mạch chủ bụng (vôi hóa thành mạch)`,
    tags: ['bụng', 'cấp cứu', 'phương pháp', 'tắc ruột'],
    createdAt: '2024-03-01',
    updatedAt: '2024-06-20',
  },
  {
    id: 'kb-approach-005',
    title: 'Kinh nghiệm: Tránh sai lầm thường gặp',
    category: 'Kinh nghiệm',
    content: `## Các sai lầm thường gặp khi đọc X-quang

### 1. Bỏ quên vùng "blind spots"
- **Đỉnh phổi**: Dễ bỏ qua khối nhỏ, lao
- **Sau tim**: Tổn thương thùy dưới trái bị tim che
- **Dưới cơ hoành**: Tổn thương thùy dưới bị cơ hoành che
- **Rìa phim**: Luôn nhìn đến tận rìa

### 2. Nhầm lẫn giải phẫu bình thường
- **Nhú ngực (nipple shadow)**: Nốt tròn đối xứng hai bên, so sánh phim cũ
- **Xương sườn chéo**: Tạo hình ảnh giả giống gãy xương
- **Mạch máu cắt ngang**: Nốt tròn ở ngoại vi, nối với mạch máu
- **Mô mềm vú**: Khối mờ không đều, thay đổi theo tư thế

### 3. Không đánh giá chất lượng phim
- **Tư thế**: Phim xoay → giả bóng tim to, lệch trung thất
- **Hít vào**: Không hít đủ → giả đông đặc, tim to
- **Phơi nhiễm**: Quá sáng/tối → bỏ tổn thương

### 4. Bỏ qua lâm sàng
- Luôn đối chiếu với triệu chứng
- Tiền sử quan trọng: mổ cũ, ung thư, lao
- So sánh phim cũ: tổn thương mới hay cũ?

### 5. Không biết giới hạn của X-quang
- X-quang ngực bỏ qua 20-30% tổn thương so với CT
- X-quang bụng bình thường KHÔNG loại trừ cấp cứu ngoại khoa
- Luôn chỉ định thêm CT/MRI khi lâm sàng nghi ngờ cao

### 6. Mô tả không đầy đủ
- Thiếu vị trí chính xác
- Không mô tả kích thước
- Không so sánh phim cũ
- Không đưa ra chẩn đoán phân biệt`,
    tags: ['sai lầm', 'kinh nghiệm', 'cải thiện'],
    createdAt: '2024-04-01',
    updatedAt: '2024-07-01',
  },
];
