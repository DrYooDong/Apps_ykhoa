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
        x: 135, y: 240, radius: 85,
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
        x: 210, y: 360, radius: 65,
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
  {
    id: 'case-loculated-effusion-001',
    title: 'Tràn dịch màng phổi khu trú & U ma rãnh liên thùy',
    patientAge: 64,
    patientGender: 'M',
    clinicalHistory: 'Nam 64 tuổi, tiền sử viêm mủ màng phổi cũ đã điều trị 3 năm trước và suy tim nhẹ. Gần đây tức nặng ngực phải khi nằm nghiêng, khó thở nhẹ khi gắng sức. Không sốt. Thử nghiệm thay đổi tư thế chụp thấy bóng mờ không thay đổi hình dạng.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'loc-pseudotumor',
        name: 'U ma rãnh liên thùy bé (Vanishing Pseudotumor)',
        nameVi: 'U ma rãnh liên thùy bé',
        description: 'Bóng mờ hình thoi / thấu kính hai mặt lồi (biconvex/spindle-shaped) nằm dọc theo rãnh liên thùy ngang phổi phải. Bờ rõ nét, hai đầu vuốt nhọn (tapered ends). Biến mất sau khi điều trị lợi tiểu.',
        severity: 'moderate',
        location: 'Rãnh liên thùy ngang (Minor fissure) phổi phải',
        radiographicSign: 'Vanishing tumor of the pleura / Phantom tumor - Dịch bị bao bọc trong rãnh liên thùy tạo hình giả u, không dịch chuyển theo tư thế nằm.',
        differentialDiagnosis: ['U màng phổi nguyên phát', 'U phổi ngoại vi', 'Kén phế quản', 'Tụ máu màng phổi'],
        clinicalCorrelation: 'Thường gặp trong suy tim sung huyết trên bệnh nhân có dính rãnh liên thùy sau viêm màng phổi trước đó. Đáp ứng ngoạn mục với Furosemide.',
        confidence: 0.94,
        x: 215, y: 345, radius: 55,
        type: 'effusion',
      },
      {
        id: 'loc-pleural-peel',
        name: 'Dày dính & tràn dịch vách hóa thành ngực',
        nameVi: 'Tràn dịch vách hóa thành ngực',
        description: 'Bóng mờ dạng chữ D (D-shaped opacity) áp sát thành ngực bên phải, tạo góc tù (obtuse angles) với thành ngực, ranh giới trong lồi vào nhu mô phổi.',
        severity: 'moderate',
        location: 'Màng phổi thành bên phải',
        radiographicSign: 'Obtuse angle sign / Incomplete border sign - Góc tù giữa tổn thương màng phổi và thành ngực chứng minh tổn thương xuất phát từ khoang màng phổi.',
        differentialDiagnosis: ['U mỡ màng phổi', 'Dày dính màng phổi sau chấn thương', 'U trung biểu mô (Mesothelioma)'],
        clinicalCorrelation: 'Dịch màng phổi bị vách hóa không chảy tự do vào góc sườn hoành. Chọc hút mù có tỷ lệ thất bại cao, bắt buộc siêu âm dẫn đường.',
        confidence: 0.89,
        x: 105, y: 430, radius: 50,
        type: 'effusion',
      },
      {
        id: 'loc-apical-thickening',
        name: 'Dày màng phổi đỉnh và vòm hoành dính',
        nameVi: 'Dày dính màng phổi di chứng',
        description: 'Dải mờ vòm màng phổi đỉnh phải và góc sườn hoành phải bị kéo rút nhọn do xơ dính cũ.',
        severity: 'mild',
        location: 'Đỉnh và đáy phổi phải',
        radiographicSign: 'Pleural tenting & blunting - Vòm hoành bị kéo nhọn hình lều, bằng chứng của dính màng phổi mạn tính.',
        differentialDiagnosis: ['Xơ sẹo sau lao', 'Di chứng mủ màng phổi'],
        clinicalCorrelation: 'Gợi ý nền bệnh màng phổi mạn tính tạo điều kiện cho dịch khu trú vách hóa.',
        confidence: 0.85,
        x: 125, y: 575, radius: 45,
        type: 'opacity',
      },
    ],
    diagnosis: 'Tràn dịch màng phổi khu trú rãnh liên thùy ngang (Hội chứng u ma - Pseudotumor) & Vách hóa thành ngực phải',
    notes: 'Ca khó điển hình: tổn thương dễ chẩn đoán nhầm thành u phổi hoặc u trung thất. Cần siêu âm ngực để xác định tính chất dịch vách hóa và CT ngực tiêm cản quang để khẳng định không có ngấm thuốc dạng u.',
    tags: ['tràn dịch khu trú', 'u ma', 'pseudotumor', 'vách hóa', 'suy tim', 'ca khó'],
    createdAt: '2024-07-15',
    isTemplate: true,
  },
  {
    id: 'case-early-consolidation-001',
    title: 'Đông đặc phổi giai đoạn sớm & Kính mờ (GGO)',
    patientAge: 38,
    patientGender: 'F',
    clinicalHistory: 'Nữ 38 tuổi, sốt 38.3°C ngày thứ 2, ho khan kèm tức ngực trái mơ hồ, không khó thở, SpO2 96%. Nghe phổi có giảm nhẹ rì rào phế nang phân thùy lưỡi trái, chưa có ran nổ rõ. CRP 35 mg/L, bạch cầu 10.800.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'early-ggo',
        name: 'Kính mờ phế nang sớm (Ground-Glass Opacity)',
        nameVi: 'Kính mờ phế nang sớm (GGO)',
        description: 'Vùng tăng đậm độ nhẹ dạng mờ sương mỏng manh ở phân thùy lưỡi phổi trái. Các mạch máu phổi bên dưới vẫn còn nhìn thấy mờ qua vùng tổn thương (chưa bị xóa hoàn toàn).',
        severity: 'moderate',
        location: 'Phân thùy lưỡi (Lingula) phổi trái',
        radiographicSign: 'Ground-glass attenuation - Mờ dạng mây sương, bảo tồn đường bờ mạch máu phổi bên dưới, phản ánh dịch rỉ viêm mới lấp đầy một phần phế nang.',
        differentialDiagnosis: ['Viêm phổi virus (Cúm, COVID-19)', 'Viêm phổi Mycoplasma', 'Phù phổi khu trú', 'Xuất huyết phế nang'],
        clinicalCorrelation: 'Giai đoạn xuất tiết sớm (early exudative phase). Nếu không điều trị sớm sẽ tiến triển thành đông đặc hoàn toàn trong 24-48 giờ.',
        confidence: 0.91,
        x: 395, y: 430, radius: 65,
        type: 'opacity',
      },
      {
        id: 'early-acinar',
        name: 'Nốt mờ phế nang chùm (Acinar Rosettes)',
        nameVi: 'Nốt mờ phế nang chùm',
        description: 'Các nốt mờ nhỏ 5-8mm dạng bông rải rác cụm quanh nhánh phế quản phân thùy, bờ mờ không sắc nét.',
        severity: 'moderate',
        location: 'Quanh phế quản thùy lưỡi',
        radiographicSign: 'Acinar nodules / Peribronchial cuffing - Dày thành phế quản và thâm nhiễm phế nang quanh phế quản giai đoạn phế quản phế viêm sớm.',
        differentialDiagnosis: ['Viêm tiểu phế quản nhiễm trùng', 'Lao phế quản phát tán sớm'],
        clinicalCorrelation: 'Bệnh tích viêm lan truyền qua lòng phế quản (bronchogenic spread) giai đoạn khởi phát.',
        confidence: 0.87,
        x: 365, y: 390, radius: 40,
        type: 'opacity',
      },
      {
        id: 'early-silhouette',
        name: 'Dấu hiệu Silhouette sớm ở bờ tim trái',
        nameVi: 'Xóa mờ bờ tim trái một phần',
        description: 'Bờ thất trái ở đoạn giữa bị mờ nhẹ do tổn thương phế nang ở thùy lưỡi (nằm cùng mặt phẳng giải phẫu trước tim).',
        severity: 'mild',
        location: 'Bờ tim trái',
        radiographicSign: 'Partial Silhouette Sign of Felson - Mất ranh giới bờ tim do hai cấu trúc có cùng tỷ trọng nước nằm tiếp xúc với nhau.',
        differentialDiagnosis: ['Tổn thương thùy dưới trái', 'Mỡ màng ngoài tim'],
        clinicalCorrelation: 'Xác định vị trí tổn thương chắc chắn nằm ở thùy lưỡi (thùy trên trước) chứ không phải thùy dưới.',
        confidence: 0.89,
        x: 350, y: 460, radius: 45,
        type: 'opacity',
      },
    ],
    diagnosis: 'Phế quản phế viêm giai đoạn sớm (Early Bronchopneumonia) / Kính mờ phế nang thùy lưỡi trái',
    notes: 'Ca khó tinh tế: Tổn thương rất dễ bị bỏ sót nếu chỉ nhìn lướt qua hoặc máy có độ tương phản động kém. Cần chỉnh cửa sổ LUNG (tăng tương phản) để thấy rõ đám mờ sương và bảo tồn mạch máu.',
    tags: ['đông đặc sớm', 'kính mờ', 'GGO', 'viêm phổi sớm', 'ca khó', 'silhouette'],
    createdAt: '2024-07-22',
    isTemplate: true,
  },
  {
    id: 'case-apical-tb-cavity-001',
    title: 'Lao phổi tiến triển tạo hang đỉnh phổi',
    patientAge: 49,
    patientGender: 'M',
    clinicalHistory: 'Nam 49 tuổi, thể trạng gầy, ho khạc đờm nhầy 2 tháng, sốt nhẹ về chiều và vã mồ hôi đêm. Sút 6kg. Thỉnh thoảng ho có vệt máu tươi. Ran ẩm đáy đòn phải.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'tb-thick-cavity',
        name: 'Hang lao thành dày vùng đỉnh - hạ đòn phải',
        nameVi: 'Hang lao đỉnh phổi phải',
        description: 'Vùng thấu quang tròn đường kính 3.5cm tại vùng hạ đòn phải, thành dày 3-4mm, bờ trong nham nhở, có mức dịch - hơi nhỏ bên trong đáy hang.',
        severity: 'critical',
        location: 'Hạ đòn và đỉnh phổi phải (Thùy trên)',
        radiographicSign: 'Thick-walled cavitary lesion - Hang thành dày thùy trên có mức dịch, dấu hiệu hoại tử bã đậu thoát ra ngoài qua đường phế quản.',
        differentialDiagnosis: ['Áp xe phổi do vi khuẩn kỵ khí', 'Ung thư phổi hoại tử tạo hang', 'Nấm phổi Aspergilloma', 'U hạt Wegener'],
        clinicalCorrelation: 'Hang lao là ổ chứa lượng lớn trực khuẩn lao (10^7 - 10^9 vi khuẩn), nguy cơ lây nhiễm rất cao trong cộng đồng và nguy cơ ho ra máu sét đánh.',
        confidence: 0.96,
        x: 205, y: 175, radius: 45,
        type: 'mass',
      },
      {
        id: 'tb-satellite-spread',
        name: 'Nốt vệ tinh phát tán theo đường phế quản',
        nameVi: 'Nốt vệ tinh phát tán phế quản',
        description: 'Nhiều nốt mờ kích thước 3-6mm đậm độ không đồng đều rải rác xung quanh hang và thùy dưới cùng bên.',
        severity: 'severe',
        location: 'Quanh hang lao và đáy phổi phải',
        radiographicSign: 'Satellite nodules / Bronchogenic dissemination - Nốt vệ tinh rải rác xung quanh hang mẹ là dấu hiệu đặc trưng phân biệt lao với ung thư phổi.',
        differentialDiagnosis: ['Di căn phổi thể nốt', 'Viêm phổi kẽ'],
        clinicalCorrelation: 'Chứng minh vi khuẩn lao đang hoạt động và gieo rắc theo dịch phế quản.',
        confidence: 0.92,
        x: 235, y: 230, radius: 55,
        type: 'opacity',
      },
      {
        id: 'tb-hilar-retraction',
        name: 'Xơ co kéo rốn phổi phải lên trên',
        nameVi: 'Co kéo rốn phổi & dày dính đỉnh',
        description: 'Rốn phổi phải bị kéo cao hơn bình thường (bình thường rốn phổi phải thấp hơn rốn phổi trái 1-2cm), kèm dải xơ đỉnh phổi.',
        severity: 'moderate',
        location: 'Rốn phổi phải và vòm đỉnh',
        radiographicSign: 'Hilar elevation & apical pleural cap - Xơ hóa co rút thể tích thùy trên kéo rốn phổi lên cao.',
        differentialDiagnosis: ['Xẹp thùy trên phải hoàn toàn', 'Di chứng xơ sẹo phẫu thuật cũ'],
        clinicalCorrelation: 'Phản ánh quá trình viêm mạn tính và xơ hóa mô phổi kéo dài nhiều tháng.',
        confidence: 0.88,
        x: 260, y: 260, radius: 40,
        type: 'opacity',
      },
    ],
    diagnosis: 'Lao phổi tiến triển có tạo hang hạ đòn phải (Active Cavitary Tuberculosis) - Phát tán phế quản',
    notes: 'Bệnh cảnh cấp bách lây nhiễm cao. Chỉ định cách ly buồng áp lực âm, xét nghiệm GeneXpert / AFB đờm 3 mẫu, tầm soát HIV và bắt đầu phác đồ chống lao tiêu chuẩn 2RHZE/4RHE.',
    tags: ['lao phổi', 'hang lao', 'hoại tử bã đậu', 'nốt vệ tinh', 'ho ra máu', 'truyền nhiễm'],
    createdAt: '2024-08-05',
    isTemplate: true,
  },
  {
    id: 'case-pneumoperitoneum-001',
    title: 'Liềm hơi dưới hoành do thủng tạng rỗng',
    patientAge: 58,
    patientGender: 'M',
    clinicalHistory: 'Nam 58 tuổi, tiền sử viêm loét dạ dày tá tràng không điều trị đều. Cách 4 giờ đột ngột đau bụng dữ dội như dao đâm vùng thượng vị, lan khắp bụng. Bụng gồng cứng như gỗ, mất vùng đục trước gan. Chụp X-quang ngực thẳng tư thế đứng cấp cứu bụng.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'air-subdiaphragm-right',
        name: 'Liềm hơi dưới vòm hoành phải',
        nameVi: 'Liềm hơi dưới vòm hoành phải',
        description: 'Dải sáng thấu quang hình liềm mảnh (3-5mm) nằm ngay dưới vòm hoành phải, ngăn cách giữa vòm hoành cản quang và nhu mô gan đậm độ đồng nhất.',
        severity: 'critical',
        location: 'Dưới vòm hoành phải',
        radiographicSign: 'Free subdiaphragmatic air / Crescent sign - Dấu hiệu liềm hơi dưới vòm hoành ở tư thế đứng, chỉ cần lượng khí rất nhỏ (1-2 mL) cũng có thể phát hiện được.',
        differentialDiagnosis: ['Hội chứng Chilaiditi (đại tràng xen giữa gan và cơ hoành)', 'Áp xe dưới hoành có sinh hơi', 'Mỡ dưới hoành'],
        clinicalCorrelation: 'Dấu hiệu chỉ điểm thủng tạng rỗng (thường là thủng ổ loét dạ dày hoặc hành tá tràng) có chỉ định mổ cấp cứu bụng ngoại khoa khẩn.',
        confidence: 0.98,
        x: 200, y: 565, radius: 65,
        type: 'free_air',
      },
      {
        id: 'air-subdiaphragm-left',
        name: 'Khí tự do dưới vòm hoành trái tách biệt dạ dày',
        nameVi: 'Khí tự do dưới vòm hoành trái',
        description: 'Dải hơi mỏng dưới vòm hoành trái nằm riêng biệt ở phía trên bóng hơi dạ dày (Magenblase).',
        severity: 'severe',
        location: 'Dưới vòm hoành trái',
        radiographicSign: 'Subdiaphragmatic gas stripe - Khí tự do nằm sát cơ hoành, phía dưới là thành dạ dày và bóng hơi tiêu hóa.',
        differentialDiagnosis: ['Bóng hơi phình vị dạ dày bình thường', 'Túi hơi đại tràng góc lách'],
        clinicalCorrelation: 'Khẳng định tràn khí phúc mạc hai bên (Bilateral pneumoperitoneum).',
        confidence: 0.92,
        x: 410, y: 575, radius: 50,
        type: 'free_air',
      },
      {
        id: 'air-rigler-double-wall',
        name: 'Dấu hiệu thành đôi Rigler (Rigler Sign)',
        nameVi: 'Dấu hiệu thành đôi Rigler',
        description: 'Nhìn thấy rõ nét cả bờ trong và bờ ngoài của thành quai ruột ở vùng bụng trên do có khí tự do bao bọc bên ngoài thành ruột.',
        severity: 'severe',
        location: 'Vùng hạ sườn và thượng vị',
        radiographicSign: "Rigler's sign / Double-wall sign - Thành ruột nhìn rõ như một đường viền trắng nổi trên nền khí đen cả hai phía.",
        differentialDiagnosis: ['Hai quai ruột chứa hơi nằm áp sát nhau'],
        clinicalCorrelation: 'Lượng khí tự do trong ổ phúc mạc từ trung bình đến lớn.',
        confidence: 0.91,
        x: 310, y: 640, radius: 50,
        type: 'free_air',
      },
    ],
    diagnosis: 'Tràn khí phúc mạc tự do cấp tính (Pneumoperitoneum) - Thủng ổ loét hành tá tràng / tạng rỗng',
    notes: 'CẤP CỨU NGOẠI KHOA KHẨN CẤP: Chống sốc, đặt ống thông dạ dày hút giảm áp, truyền kháng sinh phổ rộng tĩnh mạch và chuyển ngay phòng mổ nội soi hoặc mở bụng khâu lỗ thủng.',
    tags: ['thủng tạng rỗng', 'liềm hơi dưới hoành', 'cấp cứu bụng', 'ngoại khoa', 'viêm phúc mạc', 'rigler'],
    createdAt: '2024-08-18',
    isTemplate: true,
  },
  {
    id: 'case-ards-covid-001',
    title: 'Hội chứng suy hô hấp cấp tiến triển (ARDS) - Kính mờ lan tỏa & Đông đặc hai phổi ngoại vi',
    patientAge: 52,
    patientGender: 'M',
    clinicalHistory: 'Nam 52 tuổi, sốt cao ngày thứ 6, ho khan nhiều, khó thở tiến triển nhanh nguy kịch. Khí máu động mạch: PaO2/FiO2 = 115 mmHg, SpO2 82% với mặt nạ túi trữ 15L/p. Thâm nhiễm hai phổi xuất hiện cấp tính trong 24 giờ.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'ards-bilateral-ggo',
        name: 'Kính mờ lan tỏa hai bên ưu thế ngoại vi (Diffuse Bilateral GGO)',
        nameVi: 'Kính mờ lan tỏa hai bên ngoại vi',
        description: 'Vùng mờ sương mỏng manh dạng kính mờ (Ground-glass opacities) lan tỏa rộng khắp hai bên phế trường, phân bố ưu thế ở ngoại vi và thùy dưới, chừa vùng đỉnh phổi.',
        severity: 'critical',
        location: 'Hai phế trường, vùng giữa và ngoại vi',
        radiographicSign: 'Diffuse peripheral ground-glass attenuation - Tổn thương phế nang lan tỏa cấp tính (DAD) do phù phế nang không do nguyên nhân tim mạch.',
        differentialDiagnosis: ['Phù phổi cấp do suy tim sung huyết', 'Viêm phổi virus kẽ lan tỏa', 'Xuất huyết phế nang lan tỏa'],
        clinicalCorrelation: 'Tương ứng với tổn thương màng phế nang - mao mạch làm tràn ngập dịch giàu protein vào phế nang, gây shunt trong phổi nặng.',
        confidence: 0.95,
        x: 180, y: 390, radius: 95,
        type: 'opacity',
      },
      {
        id: 'ards-patchy-consolidation',
        name: 'Đông đặc phế nang đa ổ kèm phế quản khí (Multifocal Consolidation)',
        nameVi: 'Đông đặc phế nang đa ổ hai bên',
        description: 'Các đám đông đặc phế nang không đồng nhất rải rác ở đáy hai phổi, nhìn thấy phế quản khí (air bronchogram) phân nhánh.',
        severity: 'critical',
        location: 'Đáy phổi hai bên',
        radiographicSign: 'Patchy alveolar consolidation with air bronchograms - Đông đặc không đồng đều, tăng đậm độ ở các vùng phụ thuộc trọng lực.',
        differentialDiagnosis: ['Bội nhiễm vi khuẩn kèm theo', 'Nhồi máu phổi diện rộng'],
        clinicalCorrelation: 'Gợi ý vùng phổi đông đặc đông đặc nặng cần áp lực PEEP thích hợp để huy động phế nang (alveolar recruitment).',
        confidence: 0.93,
        x: 420, y: 440, radius: 85,
        type: 'opacity',
      },
      {
        id: 'ards-normal-heart',
        name: 'Bóng tim và cuống mạch bình thường (Không suy tim)',
        nameVi: 'Bóng tim & cuống mạch bình thường',
        description: 'Chỉ số tim/ngực CTR = 0.44 (bình thường), cuống mạch trung thất không giãn, không có đường Kerley B hay tràn dịch màng phổi lượng nhiều.',
        severity: 'mild',
        location: 'Trung thất & rốn phổi',
        radiographicSign: 'Normal cardiac silhouette & vascular pedicle - Dấu hiệu âm tính quan trọng loại trừ phù phổi huyết động do suy tim trái.',
        differentialDiagnosis: ['Suy tim ứ huyết (CTR thường > 0.55 và có Kerley B)', 'Hẹp van hai lá'],
        clinicalCorrelation: 'Khẳng định suy hô hấp do tổn thương màng phế nang cấp (ARDS tiêu chuẩn Berlin 2012), không do quá tải tuần hoàn.',
        confidence: 0.96,
        x: 300, y: 430, radius: 65,
        type: 'lucency',
      },
    ],
    diagnosis: 'Hội chứng suy hô hấp cấp tiến triển nặng (Severe ARDS - Berlin Definition) / Tổn thương phế nang lan tỏa (DAD)',
    notes: 'CẤP CỨU HỒI SỨC TÍCH CỰC (ICU): Đặt nội khí quản thông khí bảo vệ phổi (Vt 4-6 ml/kg PBW, duy trì Pplat < 30 cmH2O, PEEP 10-14 cmH2O). Chỉ định thông khí nằm sấp (Prone positioning) ít nhất 16h/ngày và xem xét ECMO nếu PaO2/FiO2 < 80 mmHg kéo dài.',
    tags: ['ARDS', 'suy hô hấp cấp', 'kính mờ lan tỏa', 'đông đặc hai bên', 'ICU', 'hồi sức'],
    createdAt: '2024-09-02',
    isTemplate: true,
  },
  {
    id: 'case-miliary-tb-001',
    title: 'Lao kê lan tỏa hai phổi (Miliary Tuberculosis)',
    patientAge: 29,
    patientGender: 'F',
    clinicalHistory: 'Nữ 29 tuổi, sốt âm ỉ kéo dài 4 tuần không rõ nguyên nhân (FUO), gầy sút cân nhanh 6kg, suy nhược, khó thở nhẹ khi gắng sức. Tiền sử dùng thuốc ức chế miễn dịch điều trị lupus. Nghe phổi rì rào phế nang đều hai bên, chưa nghe ran rõ.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'miliary-snowstorm-nodules',
        name: 'Vô số vi nốt hạt kê 1-3mm lan tỏa đồng đều (Miliary Snowstorm)',
        nameVi: 'Vô số vi nốt hạt kê 1-3mm',
        description: 'Vô số nốt mờ kích thước rất nhỏ 1-3 mm phân bố đồng đều như rắc hạt mè trên khắp hai phế trường từ đỉnh đến đáy, ranh giới rõ nét, mật độ dày đặc.',
        severity: 'critical',
        location: 'Toàn bộ hai phế trường từ đỉnh đến đáy',
        radiographicSign: 'Miliary pattern / Snowstorm appearance - Hạt kê lan tỏa đối xứng qua đường máu, các nốt có kích thước và đậm độ tương đồng nhau.',
        differentialDiagnosis: ['Di căn ung thư thể kê (tuyến giáp, thận, hắc tố)', 'Bệnh bụi phổi Silicosis', 'Nhiễm nấm Histoplasmosis', 'Sarcoidosis'],
        clinicalCorrelation: 'Gợi ý trực khuẩn lao Mycobacterium tuberculosis phát tán ồ ạt qua đường tuần hoàn máu (hematogenous dissemination).',
        confidence: 0.97,
        x: 230, y: 310, radius: 90,
        type: 'nodule',
      },
      {
        id: 'miliary-preserved-volume',
        name: 'Thể tích phổi bảo tồn hoàn toàn',
        nameVi: 'Thể tích phổi bình thường',
        description: 'Hai trường phổi nở đều, vòm hoành nằm đúng vị trí sinh lý (KLS 9-10 sau), không có xẹp thùy phổi hay xơ co kéo lớn.',
        severity: 'mild',
        location: 'Lồng ngực hai bên',
        radiographicSign: 'Preserved lung volume with symmetric expansion - Đặc trưng của tổn thương kẽ thể kê giai đoạn cấp.',
        differentialDiagnosis: ['Xơ phổi kẽ tiến triển (thể tích phổi thường co nhỏ)'],
        clinicalCorrelation: 'Dù tổn thương vi thể dày đặc nhưng cơ học phổi giai đoạn đầu vẫn chưa bị xơ teo.',
        confidence: 0.90,
        x: 400, y: 320, radius: 85,
        type: 'lucency',
      },
      {
        id: 'miliary-subtle-hilar',
        name: 'Hạch rốn phổi và mạng lưới kẽ tăng sinh',
        nameVi: 'Mạng lưới tổ chức kẽ rốn phổi',
        description: 'Dày nhẹ tổ chức kẽ quanh rốn phổi và bóng hạch rốn phổi mờ nhẹ hai bên.',
        severity: 'moderate',
        location: 'Rốn phổi hai bên',
        radiographicSign: 'Fine reticular interstitial background with mild hilar fullness - Mạng kẽ dạng lưới mỏng liên kết các vi nốt hạt kê.',
        differentialDiagnosis: ['Viêm phổi kẽ do virus', 'Phù phổi kẽ'],
        clinicalCorrelation: 'Phản ứng viêm hệ thống và hạch bạch huyết trung thất do trực khuẩn lao.',
        confidence: 0.88,
        x: 290, y: 290, radius: 50,
        type: 'opacity',
      },
    ],
    diagnosis: 'Lao kê lan tỏa hai phổi cấp tính (Acute Miliary Tuberculosis) - Phát tán theo đường máu',
    notes: 'NGUY CƠ LAO MÀNG NÃO & SUY ĐA TẠNG: Cần chỉ định chọc dịch não tủy tầm soát viêm màng não lao, soi đáy mắt tìm nốt củ lao màng mạch (Choroidal tubercles), cấy máu, GeneXpert đờm và bắt đầu phác đồ chống lao phối hợp Corticoid sớm.',
    tags: ['lao kê', 'miliary TB', 'vi nốt hạt mè', 'sốt kéo dài', 'phát tán đường máu', 'ca khó'],
    createdAt: '2024-09-10',
    isTemplate: true,
  },
  {
    id: 'case-pericardial-effusion-001',
    title: 'Tràn dịch màng ngoài tim lượng nhiều (Bóng tim hình giọt nước / Chai nước)',
    patientAge: 61,
    patientGender: 'F',
    clinicalHistory: 'Nữ 61 tuổi, mệt lả, khó thở nặng khi nằm đầu bằng (orthopnea), cảm giác tức nặng ngực mơ hồ. Khám: Huyết áp 92/68 mmHg, mạch nhanh 112 l/p, mạch nghịch (Pulsus paradoxus 16 mmHg), tĩnh mạch cổ nổi to ở tư thế 45°, tiếng tim mờ xa xăm. Điện tâm đồ: điện thế thấp lan tỏa và so le điện thế.',
    examType: 'chest_pa',
    findings: [
      {
        id: 'pericardial-flask-heart',
        name: 'Bóng tim to đối xứng hình chai nước (Water Bottle / Flask Heart)',
        nameVi: 'Bóng tim hình chai nước (CTR > 0.68)',
        description: 'Bóng tim giãn to khổng lồ hình bình cầu đối xứng, chỉ số tim/ngực CTR = 0.68, đường bờ tim hai bên nhẵn thon đều, mất các eo giải phẫu sinh lý giữa quai động mạch chủ và thất.',
        severity: 'critical',
        location: 'Bóng tim trung thất',
        radiographicSign: 'Water-bottle sign / Flask-shaped cardiac silhouette - Dịch màng ngoài tim tự do (>500 mL) đọng ở phần thấp và bung đều sang hai bên dưới tác dụng của trọng lực ở tư thế đứng.',
        differentialDiagnosis: ['Bệnh cơ tim giãn (Dilated cardiomyopathy - thường kèm sung huyết phổi nặng)', 'Hở van tim nặng đa van'],
        clinicalCorrelation: 'Dấu hiệu kinh điển của tràn dịch màng ngoài tim lượng nhiều. Cảnh báo nguy cơ chèn ép tim cấp (Cardiac Tamponade).',
        confidence: 0.98,
        x: 325, y: 440, radius: 130,
        type: 'opacity',
      },
      {
        id: 'pericardial-clear-lung-fields',
        name: 'Phế trường sáng không sung huyết (Oligemic / Clear Lungs)',
        nameVi: 'Phế trường sáng không sung huyết',
        description: 'Hai phế trường hoàn toàn sáng trong, mạng lưới mạch máu phổi bình thường, không có tái phân bố mạch máu lên đỉnh (Cephalization) hay đường Kerley B.',
        severity: 'moderate',
        location: 'Hai phế trường',
        radiographicSign: 'Clear lung fields in severe cardiomegaly - Dấu hiệu mấu chốt phân biệt tràn dịch màng ngoài tim với suy tim sung huyết trái (trong suy tim trái, bóng tim to luôn đi kèm sung huyết phế nang hoặc Kerley).',
        differentialDiagnosis: ['Suy tim ứ huyết (Luôn kèm sung huyết phổi)'],
        clinicalCorrelation: 'Giảm cung lượng tim do hạn chế đổ đầy cơ học (diastolic filling restriction), không có ứ trệ tuần hoàn tĩnh mạch phổi.',
        confidence: 0.96,
        x: 160, y: 350, radius: 80,
        type: 'lucency',
      },
      {
        id: 'pericardial-fat-pad-sign',
        name: 'Dấu hiệu đường mỡ màng ngoài tim (Epicardial Fat Pad Sign)',
        nameVi: 'Dấu hiệu dải mỡ thượng tâm mạc',
        description: 'Dải thấu quang mỏng của lá mỡ thượng tâm mạc bị đẩy tách biệt khỏi đường bờ ngoài của màng ngoài tim một khoảng > 5mm do lớp dịch nằm xen giữa.',
        severity: 'severe',
        location: 'Bờ trước dưới tim',
        radiographicSign: 'Epicardial fat pad sign / Pericardial stripe thickening - Dày dải màng ngoài tim > 2mm khẳng định chắc chắn có dịch giữa các lá màng.',
        differentialDiagnosis: ['Dày dính màng ngoài tim đơn thuần', 'U mỡ màng ngoài tim'],
        clinicalCorrelation: 'Khẳng định tổn thương là dịch khoang màng ngoài tim chứ không phải phì đại thành cơ tim.',
        confidence: 0.92,
        x: 430, y: 520, radius: 45,
        type: 'lucency',
      },
    ],
    diagnosis: 'Tràn dịch màng ngoài tim lượng nhiều (Severe Pericardial Effusion) - Đe dọa chèn ép tim cấp (Impending Tamponade)',
    notes: 'CẤP CỨU TIM MẠCH TỐI KHẨN: Chỉ định siêu âm tim tại giường (POCUS) khẩn cấp xác nhận đè sụp nhĩ phải/thất phải thì tâm trương, chuẩn bị bộ chọc hút dẫn lưu màng ngoài tim (Pericardiocentesis) giải áp cấp cứu.',
    tags: ['tràn dịch màng ngoài tim', 'chai nước', 'water bottle', 'tamponade', 'chèn ép tim', 'CTR cao', 'ca khó'],
    createdAt: '2024-09-18',
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
  {
    id: 'kb-approach-006',
    title: 'Phân biệt tràn dịch khu trú (Pseudotumor) với u nhu mô phổi',
    category: 'Ca khó & Bẫy chẩn đoán',
    content: `## Phân biệt Tràn dịch rãnh liên thùy (Hội chứng u ma) vs Khối u phổi

### 1. Đặc điểm của "U ma" (Phantom Tumor / Vanishing Tumor):
- **Vị trí**: Nằm hoàn toàn dọc theo hướng đi của rãnh liên thùy bé (ngang) hoặc rãnh lớn (chếch).
- **Hình thái**: Hình thấu kính hai mặt lồi (biconvex spindle lens) với hai đầu vuốt nhọn dần (tapered ends) tiếp nối vào đường rãnh liên thùy mỏng.
- **Bờ**: Nhẵn, sắc nét, không có tua gai (corona radiata) hay phá hủy xương sườn.
- **Tiến triển**: Biến mất nhanh chóng sau 48-72 giờ điều trị suy tim bằng thuốc lợi tiểu (Furosemide).

### 2. Dấu hiệu tổn thương ngoài phổi (Pleural vs Parenchymal):
- **Góc tiếp xúc**: Tổn thương xuất phát từ màng phổi tạo **góc tù (obtuse angle > 90°)** với thành ngực (Dấu hiệu chữ D).
- Khối u từ nhu mô phổi lấn vào màng phổi tạo **góc nhọn (acute angle < 90°)**.
- **Dấu hiệu ranh giới không hoàn toàn (Incomplete border sign)**: Bờ ngoài tiếp xúc với thành ngực không nhìn thấy được.`,
    tags: ['pseudotumor', 'u ma', 'rãnh liên thùy', 'tràn dịch khu trú', 'góc tù'],
    createdAt: '2024-09-01',
    updatedAt: '2024-09-01',
  },
  {
    id: 'kb-approach-007',
    title: 'Kỹ thuật điều chỉnh cửa sổ PACS & Nhận diện kính mờ sớm (GGO)',
    category: 'Kỹ thuật PACS',
    content: `## Đọc tổn thương kính mờ (Ground-Glass Opacity) trên X-quang kỹ thuật số

### 1. Bản chất hình ảnh học của GGO:
- Tăng tỷ trọng nhu mô phổi dạng mờ sương mỏng manh.
- **Dấu hiệu mấu chốt**: Mạch máu phổi và thành phế quản bên dưới **VẪN CÒN NHÌN THẤY RÕ** qua đám mờ (chưa bị xóa hoàn toàn như trong đông đặc đặc đồng nhất).
- Phản ánh sự lấp đầy một phần lòng phế nang bởi dịch rỉ viêm, tế bào hoặc dày các vách kẽ phế nang.

### 2. Thao tác Window/Level (Độ tương phản động):
- **Cửa sổ Nhu mô (Lung Window)**: Tăng tương phản (+25 đến +50), giảm nhẹ độ sáng (-10) để phân tách ranh giới mờ sương với nhu mô phổi lành.
- **Bộ lọc Hi-Dynamic DR**: Tăng cường viền cấu trúc vi mô, giúp phát hiện sớm các chùm nốt phế nang (acinar rosettes 5-8mm) trước khi hợp lưu thành đông đặc lớn.
- **Dấu hiệu Silhouette một phần**: Chú ý mất đường bờ tim trái (thùy lưỡi) hoặc vòm hoành (thùy dưới) dù đám mờ rất nhẹ.`,
    tags: ['kính mờ', 'GGO', 'PACS window', 'đông đặc sớm', 'dynamic contrast'],
    createdAt: '2024-09-01',
    updatedAt: '2024-09-01',
  },
  {
    id: 'kb-approach-008',
    title: 'Chẩn đoán phân biệt bóng tim to: Suy tim ứ huyết vs Tràn dịch màng ngoài tim',
    category: 'Chẩn đoán phân biệt',
    content: `## Phân biệt Suy tim xung huyết vs Tràn dịch màng ngoài tim lượng nhiều

| Tiêu chí | Suy tim sung huyết (CHF) | Tràn dịch màng ngoài tim (Pericardial Effusion) |
|---|---|---|
| **Hình dạng bóng tim** | Thất trái phì đại lệch trái, cung tim rõ eo | Hình bình cầu / giọt nước / chai nước đối xứng (Water-bottle heart) |
| **Đường bờ tim** | Nhìn rõ ranh giới các cung giải phẫu | Nhẵn tròn, mất các eo giải phẫu bình thường |
| **Phế trường phổi** | Sung huyết rốn phổi, tái phân bố đỉnh, Kerley B | **SÁNG TRONG (Oligemic / Clear lungs)**, không sung huyết |
| **Chỉ số CTR** | 0.52 - 0.62 | Thường > 0.65 - 0.70 |
| **Dấu hiệu đặc trưng** | Dơi bay (Batwing), Kerley A & B, mờ góc sườn hoành | Dải mỡ thượng tâm mạc bị đẩy tách (Epicardial fat pad sign) |
| **Lâm sàng cấp cứu** | Khó thở kịch phát về đêm, ran ẩm đáy phổi | Tam chứng Beck (HA tụt, Tĩnh mạch cổ nổi, Tiếng tim mờ), Mạch nghịch |`,
    tags: ['suy tim', 'tràn dịch màng ngoài tim', 'chai nước', 'CTR', 'chèn ép tim'],
    createdAt: '2024-09-01',
    updatedAt: '2024-09-01',
  },
];
