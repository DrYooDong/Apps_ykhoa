export interface ClinicalProtocol {
  id: string;
  title: string;
  subtitle: string;
  category: 'Hô hấp' | 'Toan chuyển hóa' | 'Kiềm chuyển hóa' | 'Kiềm hô hấp' | 'Cạm bẫy & Thủ thuật';
  badgeColor: string;
  summary: string;
  pathophysiology: string;
  diagnosticCriteria: string[];
  treatmentSteps: {
    title: string;
    description: string;
    priority: 'Khẩn cấp' | 'Quan trọng' | 'Duy trì';
  }[];
  pitfallsAndWarnings: string[];
  sourceReference: string;
}

export const CLINICAL_PROTOCOLS: ClinicalProtocol[] = [
  {
    id: 'type1-failure',
    title: 'Xử trí Suy hô hấp Type 1 (Giảm oxy máu)',
    subtitle: 'Defective Oxygenation with Normal or Low PaCO2',
    category: 'Hô hấp',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    summary: 'Đặc trưng bởi PaO2 giảm (< 60 mmHg hay < 8 kPa) trong khi PaCO2 bình thường hoặc giảm do thở nhanh phản xạ. Cơ chế chủ yếu là bất tương xứng thông khí/tưới máu (V/Q mismatch) hoặc Shunt trong phổi.',
    pathophysiology: 'Phế nang bị đông đặc (viêm phổi), xẹp phổi, ngập dịch (phù phổi cấp, ARDS) hoặc tắc mạch (thuyên tắc phổi). Máu đi qua các vùng này không nhận được oxy nhưng vùng phế nang lành tăng thông khí có thể đào thải được CO2, do đó PaCO2 không tăng.',
    diagnosticCriteria: [
      'PaO2 < 60 mmHg (< 8 kPa) hoặc SaO2 < 90% trên khí trời',
      'PaCO2 bình thường (35 - 45 mmHg) hoặc giảm (< 35 mmHg)',
      'A-a gradient tăng cao (> 20 mmHg hoặc > 2.6 kPa)',
      'Tỉ lệ P/F < 300 (ARDS: Nhẹ 200-300, Vừa 100-200, Nặng < 100)'
    ],
    treatmentSteps: [
      {
        title: '1. Liệu pháp Oxy theo bậc thang (Escalating Oxygen Therapy)',
        description: 'Bậc 1: Gọng kính mũi (Nasal prongs) 1 - 6 L/phút (FiO2 24 - 44%). Bậc 2: Mask mặt đơn giản 6 - 10 L/phút (FiO2 35 - 50%). Bậc 3: Mask có túi dự trữ không thở lại (NRB mask) 10 - 15 L/phút (FiO2 60 - 90%). Bậc 4: Oxy dòng cao qua canule mũi (HFNC) với lưu lượng tới 60 L/phút và FiO2 100%. Mục tiêu SpO2: 94 - 98%.',
        priority: 'Khẩn cấp'
      },
      {
        title: '2. Thông khí áp lực dương (CPAP / NIV)',
        description: 'Chỉ định sớm trong Phù phổi cấp huyết động hoặc ARDS nhẹ-vừa để mở các phế nang bị xẹp (recruitment), giảm shunt phổi và giảm công thở cho bệnh nhân.',
        priority: 'Quan trọng'
      },
      {
        title: '3. Điều trị nguyên nhân gốc rễ',
        description: 'Kháng sinh sớm nếu viêm phổi; Chống đông nếu thuyên tắc phổi; Lợi tiểu quai + giãn mạch nếu phù phổi cấp do suy tim; Dẫn lưu ngực nếu tràn khí/tràn dịch màng phổi.',
        priority: 'Quan trọng'
      },
      {
        title: '4. Giám sát không xâm lấn bằng Pulse Oximetry',
        description: 'Vì PaCO2 bình thường và không có nguy cơ ứ thán khí, máy kẹp SpO2 ngón tay là phương tiện theo dõi tiến triển cực kỳ chuẩn xác và tiện lợi, hạn chế chọc động mạch lặp lại.',
        priority: 'Duy trì'
      }
    ],
    pitfallsAndWarnings: [
      'Khi PaO2 rơi xuống dưới 60 mmHg (8 kPa), bệnh nhân bước vào ĐOẠN DỐC của đường cong Oxyhemoglobin: chỉ cần PaO2 giảm thêm một chút xíu là SaO2 sẽ tụt dốc thảm hại gây thiếu oxy mô cấp!',
      'Nếu bệnh nhân thở nhanh kéo dài mà không cải thiện, cơ hô hấp sẽ bị kiệt sức (Exhaustion), chuyển biến đột ngột thành Suy hô hấp Type 2 với PaCO2 tăng vọt.'
    ],
    sourceReference: 'Arterial Blood Gases Made Easy (Chương 1.3, tr. 20-21; Chương 1.6-1.7, tr. 54-55)'
  },
  {
    id: 'type2-copd',
    title: 'Xử trí Đợt cấp COPD & Suy hô hấp Type 2 (Tăng CO2 máu)',
    subtitle: 'Alveolar Hypoventilation & The "Hypoxic Drive" Caution',
    category: 'Hô hấp',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    summary: 'Suy giảm thông khí phế nang dẫn tới tích tụ acid bay hơi (CO2). Cần phân biệt rõ: Đợt cấp trên nền mạn tính (có tăng HCO3- từ trước) với Cấp tính đơn thuần (ngộ độc thuốc, nhược cơ).',
    pathophysiology: 'Ở bệnh nhân COPD tăng CO2 mạn tính, thụ thể trung ương sensing CO2 bị trơ hóa. Trung tâm hô hấp duy trì nhịp thở nhờ thụ thể xoang cảnh cảm nhận PaO2 thấp (Hypoxic drive). Thở oxy liều cao bừa bãi sẽ làm mất kích thích này, gây giảm thông khí và hôn mê tăng CO2 máu (CO2 Narcosis).',
    diagnosticCriteria: [
      'PaCO2 > 45 mmHg (> 6.0 kPa)',
      'Toan hô hấp cấp: pH < 7.35 và HCO3- bình thường (chưa kịp bù)',
      'Toan hô hấp mạn: pH 7.35 - 7.40 và HCO3- > 28 mmol/L (thận đã bù)',
      'Cấp trên nền mạn: pH < 7.35 dù HCO3- đã tăng cao từ trước'
    ],
    treatmentSteps: [
      {
        title: '1. Liệu pháp Oxy Kiểm soát chặt chẽ (Controlled Oxygen Therapy)',
        description: 'Sử dụng Mask Venturi cố định nồng độ 24% hoặc 28% (hoặc gọng mũi 1 - 2 L/phút). MỤC TIÊU SpO2 NGHIÊM NGẶT: 88% - 92%. TUYỆT ĐỐI KHÔNG dùng mask túi 100% trừ khi có ngừng tim!',
        priority: 'Khẩn cấp'
      },
      {
        title: '2. Thông khí cơ học không xâm nhập (BiPAP / NIV)',
        description: 'CHỈ ĐỊNH VÀNG: Đợt cấp COPD có toan hô hấp (pH 7.25 - 7.35, PaCO2 > 45 mmHg) còn tỉnh hợp tác. Bắt đầu IPAP 10-12 cmH2O, EPAP 4-5 cmH2O, nâng dần để hạ PaCO2 và nâng pH.',
        priority: 'Khẩn cấp'
      },
      {
        title: '3. Khí dung giãn phế quản & Corticosteroid toàn thân',
        description: 'Salbutamol 2.5 - 5mg + Ipratropium 0.5mg khí dung lặp lại. Methylprednisolone 40mg IV hoặc Prednisolone 30-40mg uống 5 ngày. Kháng sinh nếu đờm mủ.',
        priority: 'Quan trọng'
      },
      {
        title: '4. Đặt nội khí quản và thở máy xâm nhập',
        description: 'Chỉ định khi toan máu nặng (pH < 7.25), hôn mê li bì, ngừng thở hoặc thất bại với NIV sau 1 - 2 giờ.',
        priority: 'Khẩn cấp'
      }
    ],
    pitfallsAndWarnings: [
      'CẢNH BÁO BỎ OXY: Nếu bệnh nhân COPD có PaCO2 tăng lên sau thở oxy, KHÔNG ĐƯỢC ngắt hẳn oxy mà phải giảm nồng độ oxy và đặt máy thở BiPAP ngay! Ngắt oxy sẽ gây tụt PaO2 chết não tức thì.',
      'Pulse oximetry KHÔNG ĐO ĐƯỢC PaCO2. Một bệnh nhân có SpO2 96% vẫn có thể đang bị toan hô hấp chết người (xem Ca 10).'
    ],
    sourceReference: 'Arterial Blood Gases Made Easy (Chương 1.2, tr. 7; Chương 1.3, tr. 22-23; Ca 5, 6, 9, 10)'
  },
  {
    id: 'dka-protocol',
    title: 'Phác đồ Xử trí Nhiễm toan Ceton ĐTĐ (DKA)',
    subtitle: 'Triad of Hyperglycaemia, Ketosis & High Anion Gap Acidosis',
    category: 'Toan chuyển hóa',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    summary: 'Biến chứng cấp tính đe dọa tính mạng do thiếu hụt insulin tuyệt đối. Gây toan chuyển hóa tăng Anion Gap rất nặng, mất nước sâu do lợi niệu thẩm thấu và rối loạn điện giải.',
    pathophysiology: 'Thiếu insulin làm tế bào không dùng được glucose, cơ thể tăng dị hóa mỡ giải phóng acid béo tự do. Gan chuyển hóa acid béo thành thể ceton (Acetoacetate, Beta-hydroxybutyrate) làm cạn kiệt dự trữ Bicarbonate máu.',
    diagnosticCriteria: [
      'Toan máu: pH < 7.30 hoặc HCO3- < 15 mmol/L (Nặng: pH < 7.1 hoặc HCO3- < 5 mmol/L)',
      'Tăng ceton máu (> 3 mmol/L) hoặc ceton nước tiểu (>= 2+)',
      'Đường huyết tương > 11 mmol/L (> 200 mg/dL) hoặc tiền sử ĐTĐ',
      'Khoảng trống Anion (Anion Gap) > 16 mmol/L'
    ],
    treatmentSteps: [
      {
        title: '1. Bù dịch tích cực (Fluid Resuscitation)',
        description: 'Giờ đầu tiên: Truyền 1000 mL NaCl 0.9% tĩnh mạch. Giờ 2-4: 500 - 1000 mL/h tùy tình trạng huyết động. Tổng lượng dịch thiếu hụt thường từ 5 - 8 lít.',
        priority: 'Khẩn cấp'
      },
      {
        title: '2. Bù Kali máu TRƯỚC HOẶC ĐỒNG THỜI với Insulin',
        description: 'Nếu K+ < 3.5 mmol/L: TRÌ HOÃN INSULIN, truyền bù Kali 20 - 40 mEq/h cho tới khi K+ > 3.5. Nếu K+ 3.5 - 5.5: Pha 20 - 30 mEq Kali vào mỗi lít dịch truyền. Nếu K+ > 5.5: Chưa bù Kali, xét nghiệm lại mỗi 2 giờ.',
        priority: 'Khẩn cấp'
      },
      {
        title: '3. Truyền Insulin tác dụng ngắn tĩnh mạch liên tục',
        description: 'Liều 0.1 UI/kg/giờ tĩnh mạch (Regular Insulin). Mục tiêu hạ đường huyết 3 - 4 mmol/L/giờ (50 - 75 mg/dL/h). Khi đường huyết xuống < 14 mmol/L (250 mg/dL), PHẢI ĐỔI sang dịch truyền Glucose 5% + NaCl 0.45% để tiếp tục duy trì insulin dập ceton mà không gây hạ đường huyết.',
        priority: 'Khẩn cấp'
      },
      {
        title: '4. Thận trọng với Bicarbonate',
        description: 'CHỈ XEM XÉT DÙNG BICARBONATE khi pH < 6.90. Pha 100 mmol NaHCO3 vào 400 mL nước cất + 20 mEq KCl truyền trong 2 giờ. Dùng bicarb không đúng chỉ định làm tăng phù não, hạ kali máu nặng và toan dịch não tủy nghịch lý.',
        priority: 'Quan trọng'
      }
    ],
    pitfallsAndWarnings: [
      'Trong quá trình điều trị DKA, bệnh nhân thường chuyển từ Toan tăng Anion Gap sang Toan AG bình thường (Hyperchloraemic Acidosis) do truyền một lượng lớn muối NaCl 0.9% và đào thải ceton qua thận. Đây là diễn tiến lành tính.',
      'Cần theo dõi sát tri giác để phát hiện sớm Phù não (Headache, lơ mơ, chậm nhịp tim), đặc biệt ở trẻ em và thanh thiếu niên.'
    ],
    sourceReference: 'Arterial Blood Gases Made Easy (Chương 1.5, tr. 42-43; Ca 18) & JBDS DKA Guidelines'
  },
  {
    id: 'lactic-sepsis',
    title: 'Xử trí Toan Lactic & Sốc nhiễm khuẩn (Surviving Sepsis)',
    subtitle: 'Tissue Hypoxia, Anaerobic Metabolism & Surviving Sepsis Bundle',
    category: 'Toan chuyển hóa',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    summary: 'Toan lactic là nguyên nhân phổ biến nhất của toan chuyển hóa ở bệnh nhân nằm viện, định nghĩa khi HCO3- giảm kèm Lactate huyết tương > 4 mmol/L. Là chỉ số vàng tiên lượng tử vong.',
    pathophysiology: 'Thiếu oxy tế bào do tụt huyết áp, sốc nhiễm khuẩn, giảm tưới máu tạng hoặc tắc mạch khu trú (nhồi máu ruột). Tế bào chuyển sang chu trình đường phân kỵ khí, sinh ra acid lactic không hồi phục nếu tưới máu không được tái lập.',
    diagnosticCriteria: [
      'Lactate máu > 2.0 mmol/L (Toan lactic rõ: > 4.0 mmol/L)',
      'Toan chuyển hóa tăng Anion Gap (AG > 16-18 mmol/L)',
      'Dấu hiệu giảm tưới máu: Huyết áp tụt (MAP < 65 mmHg), thiểu niệu (< 0.5 mL/kg/h), da nổi vân tím, CRT > 3s'
    ],
    treatmentSteps: [
      {
        title: '1. Gói xử trí 1 giờ (Hour-1 Surviving Sepsis Bundle)',
        description: '1. Định lượng Lactate máu ngay; 2. Cấy máu trước khi dùng kháng sinh; 3. Dùng kháng sinh phổ rộng IV trong vòng 60 phút; 4. Bù nhanh dịch tinh thể đẳng trương 30 mL/kg đối với tụt huyết áp hoặc Lactate >= 4 mmol/L.',
        priority: 'Khẩn cấp'
      },
      {
        title: '2. Thuốc vận mạch nâng huyết áp',
        description: 'Dùng Noradrenaline (Norepinephrine) truyền tĩnh mạch qua catheter trung tâm, khởi đầu 0.05 - 0.1 mcg/kg/phút, chuẩn độ để duy trì Huyết áp trung bình (MAP) >= 65 mmHg.',
        priority: 'Khẩn cấp'
      },
      {
        title: '3. Đo lường độ thanh thải Lactate (Lactate Clearance)',
        description: 'Xét nghiệm lại Lactate mỗi 2 - 4 giờ. Mục tiêu giảm ít nhất 10 - 20% nồng độ lactate sau mỗi 2 giờ hồi sức là dấu hiệu hồi phục tưới máu mô.',
        priority: 'Quan trọng'
      }
    ],
    pitfallsAndWarnings: [
      'KHÔNG TRUYỀN NATRI BICARBONATE ĐỂ ĐIỀU TRỊ TOAN LACTIC (trừ khi pH < 7.1)! Bicarbonate làm dịch chuyển đường cong oxyhemoglobin sang trái khiến tế bào càng khó nhận oxy, đồng thời sinh CO2 nội bào làm toan nội bào nặng nề hơn.',
      'Ở bệnh nhân đau bụng dữ dội khám bụng mềm có rung nhĩ: Lactate tăng cao gợi ý ngay Nhồi máu mạc treo (Mesenteric Ischemia), phải chụp CTA bụng cấp cứu!'
    ],
    sourceReference: 'Arterial Blood Gases Made Easy (Chương 1.5, tr. 40-41; Ca 17, 22) & SSC Guidelines'
  },
  {
    id: 'metabolic-alkalosis-vomiting',
    title: 'Xử trí Kiềm chuyển hóa & Mất dịch dạ dày (Vomiting)',
    subtitle: 'Hypochloremic, Hypokalemic Metabolic Alkalosis',
    category: 'Kiềm chuyển hóa',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    summary: 'Rối loạn toan kiềm chiếm 50% các trường hợp ở bệnh nhân ngoại khoa. Tử vong lên tới 45% khi pH > 7.55 và 80% khi pH > 7.65.',
    pathophysiology: 'Nôn ói hoặc hút sonde dạ dày làm mất acid HCl và nước. Thận mất Clo và Kali. Để giữ Natri cứu vãn thể tích tuần hoàn, thận dưới tác dụng của aldosterone buộc phải bài tiết H+ vào nước tiểu (Paradoxical aciduria), làm duy trì tình trạng kiềm máu nghiêm trọng.',
    diagnosticCriteria: [
      'pH > 7.45 (hoặc bình thường nếu có bù trừ mạn)',
      'HCO3- > 28 mmol/L và Base Excess (BE) > +2 mmol/L',
      'Hạ Clo máu (Cl- < 95 mmol/L) và Hạ Kali máu (K+ < 3.5 mmol/L)'
    ],
    treatmentSteps: [
      {
        title: '1. Bù dịch chứa Clo (Chloride Replacement)',
        description: 'Truyền tĩnh mạch dung dịch Natri Clorid 0.9% (Normal Saline). Khi cung cấp đủ Cl- cho thận, thận sẽ tái lập khả năng bài tiết HCO3- dư thừa ra nước tiểu.',
        priority: 'Khẩn cấp'
      },
      {
        title: '2. Bù Kali Clorid (KCl)',
        description: 'Bổ sung KCl 20 - 40 mEq/L dịch truyền. Bù đủ Kali giúp tế bào thận không còn phải thải H+ để đổi lấy Na+, từ đó dập tắt vòng xoắn duy trì kiềm chuyển hóa.',
        priority: 'Khẩn cấp'
      },
      {
        title: '3. Điều chỉnh liều lợi tiểu',
        description: 'Nếu kiềm chuyển hóa do dùng Furosemide liều cao (thường gặp ở bệnh nhân COPD kèm suy tim), phối hợp thuốc lợi tiểu giữ Kali (Spironolactone) hoặc Acetazolamide (Diamox) 250-500mg để thận thải bớt bicarbonate.',
        priority: 'Quan trọng'
      }
    ],
    pitfallsAndWarnings: [
      'Tuyệt đối không mang trẻ bị hẹp môn vị phì đại đi mổ cấp cứu khi chưa chỉnh xong kiềm hạ clo hạ kali! Trẻ có nguy cơ ngừng thở sau mổ do ức chế trung tâm hô hấp.',
      'Kiềm máu nặng gây co giật, hạ calci ion hóa máu và loạn nhịp thất nguy hiểm.'
    ],
    sourceReference: 'Arterial Blood Gases Made Easy (Chương 1.5, tr. 44-45; Ca 26, 27, 28)'
  },
  {
    id: 'abg-technique-pitfalls',
    title: 'Kỹ thuật lấy ABG, Test Allen & Nhận biết Nhầm Máu Tĩnh Mạch',
    subtitle: 'Arterial Blood Gas Sampling & Pitfall Prevention',
    category: 'Cạm bẫy & Thủ thuật',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    summary: 'Quy trình lấy máu động mạch chuẩn y khoa, kỹ thuật test Allen cải biên bảo vệ tưới máu bàn tay, và các bẫy sai sót khiến kết quả khí máu bị diễn giải sai lầm.',
    pathophysiology: 'Động mạch quay là vị trí ưu tiên số 1 vì có vòng cung động mạch gan tay nối thông với động mạch trụ. Phải đảm bảo tuần hoàn bàng hệ trước khi châm kim để tránh nguy cơ tắc mạch gây hoại tử ngón tay.',
    diagnosticCriteria: [
      'Vị trí ưu tiên: 1. Động mạch quay (cổ tay); 2. Động mạch cánh tay (nếp khuỷu); 3. Động mạch đùi (tam giác Scarpa)',
      'Góc đâm kim: 45 độ với động mạch quay (ngửa cổ tay 20-30 độ); 90 độ với động mạch đùi',
      'Test Allen cải biên: Bóp chặt cả 2 ĐM quay và trụ -> Nắm chặt tay 30s cho lòng bàn tay trắng bệch -> Mở tay và thả ĐM trụ -> Lòng bàn tay hồng lại trong vòng 10 giây = Test dương tính (An toàn để lấy máu)'
    ],
    treatmentSteps: [
      {
        title: '1. Chuẩn bị bệnh nhân & Đạt trạng thái ổn định (Steady State)',
        description: 'Nếu bệnh nhân vừa thay đổi nồng độ oxy thở hoặc cài đặt máy thở, PHẢI CHỜ ÍT NHẤT 20 PHÚT trước khi lấy máu để khí máu đạt trạng thái cân bằng sinh lý.',
        priority: 'Quan trọng'
      },
      {
        title: '2. Kỹ thuật đuổi bọt khí & Chống đông Heparin',
        description: 'Tráng xi-lanh bằng Heparin và đẩy hết thuốc thừa (dư heparin làm toan máu giả tạo). Sau khi lấy máu, ĐUỔI HẾT BỌT KHÍ NGAY LẬP TỨC và đậy nắp kín (bọt khí làm PaO2 tăng giả và PaCO2 giảm giả).',
        priority: 'Khẩn cấp'
      },
      {
        title: '3. Bảo quản lạnh nếu vận chuyển > 10 phút',
        description: 'Phân tích khí máu ngay lập tức. Nếu thời gian vận chuyển đến phòng xét nghiệm > 10 phút, PHẢI ĐẶT BƠM TIÊM VÀO ĐÁ LẠNH (Crushed ice) để làm chậm quá trình tiêu thụ oxy và sinh acid của hồng cầu.',
        priority: 'Quan trọng'
      },
      {
        title: '4. Đè ép vị trí chọc kim ít nhất 5 phút',
        description: 'Đè ép trực tiếp liên tục ít nhất 5 phút (ít nhất 10-15 phút nếu bệnh nhân có rối loạn đông máu hoặc đang dùng thuốc chống đông) để tránh khối máu tụ (Hematoma) và phình mạch giả.',
        priority: 'Khẩn cấp'
      }
    ],
    pitfallsAndWarnings: [
      'NHẬN DIỆN LẤY NHẦM MÁU TĨNH MẠCH (VBG): Máu màu đỏ thẫm; không tự đẩy piston nảy lên mà phải dùng tay kéo hút; SaO2 trên máy khí máu thấp xa so với SpO2 kẹp ngón tay. VBG KHÔNG THỂ DÙNG ĐỂ ĐÁNH GIÁ OXY HÓA MÁU (PaO2)!',
      'CẠM BẪY KHÍ MÁU BÌNH THƯỜNG TRONG THUYÊN TẮC PHỔI: 15-20% bệnh nhân thuyên tắc phổi cấp có khí máu hoàn toàn bình thường. Không được loại trừ PE chỉ dựa vào khí máu!'
    ],
    sourceReference: 'Arterial Blood Gases Made Easy (Chương 1.6, tr. 48-53; Chương 1.7, tr. 56; Ca 29, 30)'
  }
];
