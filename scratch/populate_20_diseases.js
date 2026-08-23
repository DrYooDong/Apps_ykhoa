const fs = require('fs');

const databaseFile = 'src/content/docspace/data/diagnostic-criteria-database.ts';
let content = fs.readFileSync(databaseFile, 'utf8');

const diseases20Data = `
  // ──────────────────────────────────────────────────────────────────────────
  // 11. HỘI CHỨNG VÀNH CẤP / NHỒI MÁU CƠ TIM (ACS / STEMI / NSTEMI)
  // ──────────────────────────────────────────────────────────────────────────
  'hoi_chung_vanh_cap': {
    icdCode: 'I21.9',
    icdPrefixes: ['I20', 'I21', 'I22', 'I24', 'I25'],
    diseaseName: 'Hội chứng vành cấp / Nhồi máu cơ tim (ACS/STEMI/NSTEMI)',
    specialty: 'Tim mạch can thiệp & Cấp cứu',
    severity: 'emergency',
    summary: 'Biến cố thiếu máu cục bộ cơ tim cấp do nứt vỡ mảng xơ vữa và huyết khối tắc nghẽn động mạch vành.',
    goldStandard: 'Chụp động mạch vành qua da (Coronary Angiography - CAG) xác định vị trí và mức độ hẹp/tắc mạch vành.',
    criteriaRule: {
      mandatoryIds: ['acs_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Động học tăng/giảm Troponin tim (hs-cTnI/hs-cTnT) + Ít nhất 1 bằng chứng: Triệu chứng đau ngực kiểu mạch vành, Biến đổi ECG thiếu máu mới (ST chênh/T âm/LBBB mới), hoặc Rối loạn vận động vùng mới trên Siêu âm tim.'
    },
    criteria: [
      { id: 'acs_crit_1', type: 'mandatory', label: 'Động học tăng và/hoặc giảm Troponin tim (hs-cTnI/hs-cTnT) với ít nhất 1 giá trị vượt bách phân vị thứ 99 (99th URL)', description: 'Chẩn đoán xác định tổn thương hoại tử tế bào cơ tim cấp tính.', labThreshold: 'hs-cTnI > 99th percentile hoặc delta tăng/giảm > 20-50% sau 1-3 giờ' },
      { id: 'acs_crit_2', type: 'major', label: 'Đau thắt ngực kiểu mạch vành điển hình', description: 'Đau đè nặng/bóp nghẹt sau xương ức > 20 phút, lan lên vai/cằm/tay trái, không giảm khi nghỉ hoặc dùng Nitroglycerin.' },
      { id: 'acs_crit_3', type: 'major', label: 'Biến đổi ECG thiếu máu cục bộ mới xuất hiện', description: 'ST chênh lên mới tại điểm J ở ≥ 2 chuyển đạo liên tiếp (STEMI) hoặc ST chênh xuống / T âm nhọn đối xứng (NSTEMI/UA) hoặc Block nhánh trái mới xuất hiện.' },
      { id: 'acs_crit_4', type: 'major', label: 'Bằng chứng hình ảnh rối loạn vận động vùng mới hoặc mất vùng cơ tim sống còn', description: 'Siêu âm tim phát hiện giảm động/vô động thành tim tương ứng vùng cấp máu mạch vành.' },
      { id: 'acs_crit_5', type: 'lab', label: 'Xác định huyết khối trong lòng mạch vành khi chụp mạch hoặc tử thiết', description: 'Huyết khối gây tắc hoàn toàn (TIMI 0/1) hoặc tắc bán phần dòng chảy.' }
    ],
    protocol: {
      title: 'Phác đồ Xử trí Hội chứng Vành Cấp & Can thiệp Mạch vành (ESC/AHA 2023)',
      guideline: 'ESC Guidelines for the management of acute coronary syndromes 2023 & Phác đồ Bộ Y tế',
      targetGoals: ['Tái tưới máu mạch vành càng sớm càng tốt (Door-to-Balloon < 90 phút nếu STEMI)', 'Kiểm soát đau ngực và giảm tiêu thụ oxy cơ tim', 'Dự phòng huyết khối tái phát và biến chứng loạn nhịp thất'],
      initialManagement: [
        'Bất động tại giường, thở oxy nếu SpO2 < 90% hoặc khó thở suy tim',
        'Dùng Nitroglycerin xịt dưới lưỡi hoặc truyền TM (thận trọng nếu HA tâm thu < 90 mmHg hoặc NMCT thất phải)',
        'Giảm đau bằng Morphine 2-4mg TM nếu đau ngực dữ dội không đáp ứng Nitrat',
        'Kích hoạt phòng Can thiệp Tim mạch (Cathlab) khẩn cấp nếu STEMI hoặc NSTEMI nguy cơ rất cao (GRACE > 140, sốc tim)'
      ],
      firstLineDrugs: [
        { drugName: 'Aspirin', class: 'Kháng kết tập tiểu cầu ức chế COX-1', route: 'Nhai/Uống', dosage: 'Liều nạp 150-300mg (nhai nát), sau đó duy trì 81-100mg/ngày', frequency: '1 lần/ngày', instructions: 'Dùng ngay khi tiếp cận bệnh nhân nghi ngờ ACS', isFirstLine: true },
        { drugName: 'Ticagrelor (Brilinta) hoặc Clopidogrel (Plavix)', class: 'Ức chế thụ thể P2Y12', route: 'Uống', dosage: 'Ticagrelor nạp 180mg, sau đó 90mg x 2 lần/ngày (Hoặc Clopidogrel nạp 300-600mg, duy trì 75mg/ngày)', frequency: 'Ticagrelor 2 lần/ngày / Clopidogrel 1 lần/ngày', instructions: 'Phối hợp với Aspirin tạo liệu pháp DAPT kép', isFirstLine: true },
        { drugName: 'Enoxaparin (Lovenox)', class: 'Kháng đông Heparin trọng lượng phân tử thấp (LMWH)', route: 'Tiêm dưới da', dosage: '1 mg/kg mỗi 12 giờ (chỉnh liều nếu eGFR < 30 mL/phút: 1 mg/kg/24h)', frequency: 'Mỗi 12 giờ', instructions: 'Tiêm dưới da bụng luân phiên 2 bên', isFirstLine: true },
        { drugName: 'Atorvastatin', class: 'Statin cường độ cao hạ lipid & ổn định mảng xơ vữa', route: 'Uống', dosage: '40 - 80 mg/ngày', frequency: '1 lần/ngày vào buổi tối', instructions: 'Khởi đầu sớm statin cường độ cao bất kể nồng độ LDL-C ban đầu', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Metoprolol Succinate hoặc Bisoprolol', class: 'Chẹn beta giao cảm chọn lọc Beta-1', route: 'Uống', dosage: 'Metoprolol 25-50mg/ngày hoặc Bisoprolol 2.5-5mg/ngày', frequency: '1 lần/ngày', instructions: 'Khởi đầu sau 24h khi huyết động ổn định, không có dấu hiệu suy tim ứ huyết cấp', isFirstLine: false }
      ],
      supportiveCare: ['Theo dõi Monitor điện tim liên tục 24-48 giờ phát hiện rung thất/nhanh thất', 'Xét nghiệm lại Troponin động học sau 1-3 giờ', 'Hạn chế gắng sức, ăn nhẹ, chống táo bón']
    },
    complications: [
      { name: 'Rung thất / Nhanh thất vô mạch & Ngưng tim đột ngột', timeframe: 'acute_24h', warningSigns: 'Mất ý thức đột ngột, ngưng thở, monitor ECG hiện sóng rung thất', preventiveAction: 'Sốc điện khử rung không đồng bộ ngay 200J Biphasic + Ép tim ACLS + Dùng Amiodarone/Lidocaine', onCallAlertText: 'BÁO ĐỘNG NGƯNG TIM: Sốc điện khử rung ngay và gọi Code Blue' },
      { name: 'Sốc tim & Phù phổi cấp do suy bơm thất trái', timeframe: 'acute_24h', warningSigns: 'Huyết áp tụt < 90/60 mmHg, chi lạnh, thiểu niệu, khó thở dữ dội, phổi đầy rale ẩm', preventiveAction: 'Đặt bóng đối xung nội động mạch chủ (IABP) / Hỗ trợ tuần hoàn ECMO + Thuốc vận mạch Noradrenaline/Dobutamine', onCallAlertText: 'Sốc tim sau NMCT: Truyền Noradrenaline + Dobutamine, hội chẩn can thiệp khẩn' }
    ],
    monitoringLabs: ['Điện tâm đồ 12 chuyển đạo ghi lại mỗi 15-30p trong 2h đầu nếu đau ngực tái phát', 'hs-cTnI/hs-cTnT kiểm tra lại sau 1-3 giờ', 'Siêu âm tim đánh giá chức năng EF và biến chứng cơ học (thủng vách liên thất, đứt dây chằng van hai lá)'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Đau ngực cấp & Phân tầng nguy cơ TIMI/GRACE', searchKeyword: 'tiếp cận đau ngực cấp' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Toàn cầu Định nghĩa Nhồi máu cơ tim Thứ 4', searchKeyword: 'tiêu chuẩn nhồi máu cơ tim' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Đọc ECG trong STEMI, NSTEMI & Động học Men tim Troponin hs', searchKeyword: 'đọc ecg nhồi máu cơ tim troponin' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Xử trí Hội chứng Vành Cấp & PCI ESC 2023', searchKeyword: 'phác đồ hội chứng vành cấp' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Liệu pháp Kháng đông & Kháng kết tập tiểu cầu kép DAPT', searchKeyword: 'kháng đông kháng kết tập tiểu cầu dapt' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Biến chứng Cơ học & Sốc tim sau Nhồi máu cơ tim', searchKeyword: 'biến chứng cơ học sốc tim' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 12. BỆNH PHỔI TẮC NGHẼN MẠN TÍNH (COPD)
  // ──────────────────────────────────────────────────────────────────────────
  'copd': {
    icdCode: 'J44.9',
    icdPrefixes: ['J44'],
    diseaseName: 'Bệnh phổi tắc nghẽn mạn tính (COPD - Đợt cấp & Mạn)',
    specialty: 'Hô hấp & Hồi sức cấp cứu',
    severity: 'urgent',
    summary: 'Bệnh lý hô hấp mạn tính đặc trưng bởi các triệu chứng hô hấp dai dẳng và tắc nghẽn luồng khí không hồi phục hoàn toàn.',
    goldStandard: 'Đo Hô hấp ký sau nghiệm pháp giãn phế quản (Post-BD FEV1/FVC < 0.70).',
    criteriaRule: {
      mandatoryIds: ['copd_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Hô hấp ký sau giãn phế quản FEV1/FVC < 0.70 + Tiền sử phơi nhiễm yếu tố nguy cơ (khói thuốc lá/bụi nghề nghiệp) + Triệu chứng khó thở tiến triển/ho khạc đàm mạn tính.'
    },
    criteria: [
      { id: 'copd_crit_1', type: 'mandatory', label: 'Hô hấp ký sau thử thuốc giãn phế quản có chỉ số Tiffeneau/Gaensler (FEV1/FVC) < 0.70', description: 'Khẳng định tình trạng tắc nghẽn luồng khí cố định không hồi phục hoàn toàn.', labThreshold: 'Post-BD FEV1/FVC < 0.70' },
      { id: 'copd_crit_2', type: 'major', label: 'Tiền sử phơi nhiễm yếu tố nguy cơ', description: 'Hút thuốc lá/thuốc lào (thường > 10-20 gói-năm), khói bếp than tổ ong, bụi nghề nghiệp.' },
      { id: 'copd_crit_3', type: 'major', label: 'Khó thở tiến triển theo thời gian và nặng hơn khi gắng sức', description: 'Bệnh nhân cảm giác khó thở mạn tính, dai dẳng ngày càng tăng (đo theo thang điểm mMRC ≥ 1-2).' },
      { id: 'copd_crit_4', type: 'minor', label: 'Ho khạc đờm mạn tính', description: 'Ho nhiều buổi sáng, khạc đờm trắng/trong tái diễn nhiều tháng trong năm.' },
      { id: 'copd_crit_5', type: 'imaging', label: 'X-quang ngực / CT ngực có hình ảnh ứ khí phế nang', description: 'Hình ảnh lồng ngực hình thùng, vòm hoành hạ thấp phẳng, khoảng sáng sau xương ức rộng, các bóng khí thũng.' }
    ],
    protocol: {
      title: 'Phác đồ Xử trí Đợt Cấp COPD & Duy Trì GOLD 2024',
      guideline: 'Global Initiative for Chronic Obstructive Lung Disease (GOLD 2024) & Hướng dẫn Bộ Y tế',
      targetGoals: ['Cải thiện tình trạng suy hô hấp cấp, đưa SpO2 về 88-92% (tránh tăng CO2 máu)', 'Giãn phế quản tối đa và giảm viêm đường thở', 'Rút ngắn thời gian đợt cấp và phòng ngừa đợt cấp tái phát'],
      initialManagement: [
        'Thở oxy qua kính mũi hoặc mask Venturi kiểm soát mục tiêu SpO2 88-92%',
        'Phun khí dung thuốc giãn phế quản tác dụng nhanh SABA + SAMA phối hợp',
        'Sử dụng Corticosteroid toàn thân sớm (Prednisolone 40mg/ngày trong 5 ngày)',
        'Chỉ định thở không xâm nhập BiPAP/NIV nếu có toan hô hấp cấp (pH < 7.35, PaCO2 > 45 mmHg)'
      ],
      firstLineDrugs: [
        { drugName: 'Salbutamol + Ipratropium (Combivent / Berodual)', class: 'Khí dung giãn phế quản phối hợp SABA + SAMA', route: 'Phun khí dung', dosage: '1-2 tép/lần, có thể lặp lại mỗi 20-30 phút trong giờ đầu, sau đó mỗi 4-6 giờ', frequency: '4 - 6 lần/ngày', instructions: 'Phun qua mặt nạ khí dung với khí nén (tránh dùng oxy liều cao để phun)', isFirstLine: true },
        { drugName: 'Methylprednisolone hoặc Prednisolone', class: 'Glucocorticoid toàn thân chống viêm', route: 'Tiêm TM hoặc Uống', dosage: 'Methylprednisolone 40mg TM/ngày hoặc Prednisolone 40mg uống/ngày trong 5 ngày', frequency: '1 lần/ngày vào buổi sáng', instructions: 'Dùng đợt ngắn 5 ngày, không cần giảm liều dần', isFirstLine: true },
        { drugName: 'Amoxicillin/Clavulanate (Augmentin) hoặc Azithromycin', class: 'Kháng sinh diệt khuẩn đường hô hấp', route: 'Uống/Tiêm TM', dosage: 'Augmentin 1g x 2 lần/ngày hoặc Azithromycin 500mg x 1 lần/ngày trong 5-7 ngày', frequency: 'Theo kháng sinh', instructions: 'Chỉ định khi đợt cấp có đàm đổi màu/mủ (Anthonisen Type 1 hoặc Type 2 có đàm mủ)', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'LABA + LAMA (Tiotropium/Olodaterol hoặc Umeclidinium/Vilanterol)', class: 'Thuốc giãn phế quản tác dụng kéo dài kép', route: 'Hít định liều (DPI/SMI)', dosage: 'Hít 1-2 nhát/ngày duy trì ổn định', frequency: '1-2 lần/ngày', instructions: 'Chỉ định điều trị duy trì ngoại trú nhóm GOLD E (nguy cơ cao đợt cấp)', isFirstLine: false }
      ],
      supportiveCare: ['Vỗ rung lồng ngực, tập ho khạc đờm và tập thở chúm môi', 'Dinh dưỡng giàu protein và chất béo lành mạnh, chia nhỏ bữa ăn', 'Tiêm phòng vắc xin Cúm hàng năm và vắc xin Phế cầu']
    },
    complications: [
      { name: 'Toan hô hấp mất bù & Hôn mê tăng CO2 máu (CO2 Narcosis)', timeframe: 'acute_24h', warningSigns: 'Bệnh nhân ngủ gà, lơ mơ, run vỗ cánh (Asterixis), nhịp thở chậm, Khí máu động mạch pH < 7.25, PaCO2 > 65-70 mmHg', preventiveAction: 'Thở máy không xâm nhập NIV/BiPAP ngay lập tức. Nếu thất bại chuẩn bị đặt ống nội khí quản thở máy xâm nhập', onCallAlertText: 'BÁO ĐỘNG TOAN HÔ HẤP NẶNG: pH < 7.25, PaCO2 tăng cao ➔ Khởi động BiPAP hoặc đặt nội khí quản' },
      { name: 'Tâm phế mạn & Suy tim phải (Cor Pulmonale)', timeframe: 'chronic', warningSigns: 'Phù 2 chi dưới, tĩnh mạch cổ nổi tư thế 45 độ, gan to đau, dấu hiệu Harzer dương tính', preventiveAction: 'Thở oxy dài hạn tại nhà (LTOT > 15h/ngày) + Thuốc lợi tiểu quai liều thấp + Kiểm soát tắc nghẽn phế quản', onCallAlertText: 'COPD có biểu hiện tâm phế mạn: Kiểm tra SpO2, chỉ định siêu âm tim áp lực ĐMP' }
    ],
    monitoringLabs: ['Khí máu động mạch (ABG) kiểm tra pH, PaCO2, PaO2 trước và sau khi can thiệp oxy/NIV', 'X-quang phổi loại trừ tràn khí màng phổi hoặc viêm phổi bội nhiễm', 'Điện giải đồ máu (đặc biệt theo dõi Kali máu khi dùng SABA liều cao)'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Đợt cấp Bệnh phổi tắc nghẽn mạn tính (AECOPD)', searchKeyword: 'đợt cấp copd aecopd' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán & Phân nhóm GOLD A-B-E 2024', searchKeyword: 'tiêu chuẩn gold copd' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Đọc Khí Máu Động Mạch ABG trong Toan hô hấp & Hô hấp ký', searchKeyword: 'khí máu động mạch abg hô hấp ký' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Xử trí Đợt cấp COPD và Thở máy Không xâm nhập NIV', searchKeyword: 'phác đồ đợt cấp copd thở niv' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Các nhóm thuốc Khí dung SABA, SAMA, LABA, LAMA, ICS', searchKeyword: 'khí dung saba sama laba lama' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Toan hô hấp cấp & Tâm phế mạn', searchKeyword: 'toan hô hấp tâm phế mạn' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 13. HEN PHẾ QUẢN (ASTHMA)
  // ──────────────────────────────────────────────────────────────────────────
  'hen_phe_quan': {
    icdCode: 'J45.9',
    icdPrefixes: ['J45'],
    diseaseName: 'Hen phế quản (Asthma - Cơn cấp & Kiểm soát GINA)',
    specialty: 'Hô hấp & Dị ứng lâm sàng',
    severity: 'urgent',
    summary: 'Bệnh lý viêm mạn tính đường thở đặc trưng bởi triệu chứng khò khè, khó thở, nặng ngực biến đổi theo thời gian và tắc nghẽn luồng khí hồi phục được.',
    goldStandard: 'Nghiệm pháp hồi phục phế quản dương tính (FEV1 tăng > 12% và > 200 mL sau hít SABA 400mcg).',
    criteriaRule: {
      mandatoryIds: ['asthma_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Bằng chứng dao động luồng khí thở ra (Nghiệm pháp giãn phế quản hồi phục hoặc dao động PEF > 10-20%) + Triệu chứng hô hấp thay đổi theo thời gian/yếu tố kích gợi.'
    },
    criteria: [
      { id: 'asthma_crit_1', type: 'mandatory', label: 'Nghiệm pháp hồi phục phế quản (Bronchodilator Reversibility Test) dương tính', description: 'FEV1 tăng ≥ 12% và ≥ 200 mL sau hít 4 nhát Salbutamol 100mcg.', labThreshold: 'Delta FEV1 ≥ 12% và ≥ 200 mL' },
      { id: 'asthma_crit_2', type: 'major', label: 'Triệu chứng hô hấp thay đổi theo thời gian và cường độ', description: 'Khò khè, khó thở, nặng ngực và ho; thường nặng hơn về đêm hoặc gần sáng.' },
      { id: 'asthma_crit_3', type: 'major', label: 'Triệu chứng khởi phát bởi các yếu tố kích thích đặc hiệu', description: 'Vận động thể lực, tiếp xúc dị nguyên (phấn hoa, lông thú), thay đổi thời tiết, nhiễm virus, mùi nồng hắc.' },
      { id: 'asthma_crit_4', type: 'minor', label: 'Tiền sử cá nhân hoặc gia đình có cơ địa dị ứng (Atopy)', description: 'Viêm mũi dị ứng, viêm da cơ địa (chàm), dị ứng thức ăn/thuốc.' },
      { id: 'asthma_crit_5', type: 'lab', label: 'Tăng bạch cầu ái toan máu ngoại vi hoặc FeNO tăng cao', description: 'Dấu ấn sinh học viêm dị ứng Type 2.', labThreshold: 'Eosinophil > 300 tế bào/uL hoặc FeNO > 50 ppb' }
    ],
    protocol: {
      title: 'Phác đồ Xử trí Cơn Hen Cấp & Kiểm soát Theo Bậc GINA 2024',
      guideline: 'Global Initiative for Asthma (GINA 2024) & Hướng dẫn Bộ Y tế',
      targetGoals: ['Cắt cơn hen cấp nhanh chóng, giải tỏa tắc nghẽn phế quản', 'Duy trì kiểm soát triệu chứng tốt và hoạt động thể lực bình thường', 'Giảm thiểu nguy cơ xuất hiện cơn hen ác tính trong tương lai'],
      initialManagement: [
        'Thở oxy duy trì SpO2 93-95% (ở trẻ em và người lớn)',
        'Hít/khí dung SABA liều cao lặp lại (Salbutamol 2.5-5mg mỗi 20p x 3 lần trong giờ đầu)',
        'Sử dụng Corticosteroid toàn thân sớm (Prednisolone 40-50mg/ngày trong 5-7 ngày)',
        'Thêm Ipratropium bromide (SAMA) nếu cơn hen mức độ nặng hoặc đáp ứng kém với SABA đơn thuần',
        'Magnesium sulfate 2g truyền tĩnh mạch trong 20 phút nếu cơn hen nặng đe dọa tính mạng'
      ],
      firstLineDrugs: [
        { drugName: 'ICS - Formoterol (Symbicort)', class: 'Corticosteroid hít phối hợp LABA tác dụng nhanh (GINA Track 1)', route: 'Hít qua dụng cụ Turbuhaler/MDI', dosage: '1-2 nhát khi có triệu chứng khó thở và/hoặc duy trì hàng ngày', frequency: 'Cắt cơn theo nhu cầu + Duy trì 1-2 hít x 2 lần/ngày', instructions: 'Liệu pháp SMART: Dùng cùng 1 bình hít để vừa duy trì vừa cắt cơn', isFirstLine: true },
        { drugName: 'Salbutamol (Ventolin)', class: 'Chủ vận Beta-2 tác dụng nhanh SABA', route: 'Phun khí dung hoặc MDI', dosage: 'Khí dung 2.5 - 5mg/lần hoặc xịt 2-4 nhát qua buồng đệm', frequency: 'Mỗi 20p trong giờ đầu, sau đó mỗi 4h khi cần', instructions: 'Súc miệng sau khi hít để tránh nấm miệng và khàn tiếng', isFirstLine: true },
        { drugName: 'Prednisolone hoặc Methylprednisolone', class: 'Glucocorticoid toàn thân chống viêm', route: 'Uống/Tiêm TM', dosage: 'Prednisolone 40 - 50 mg uống/ngày trong 5 - 7 ngày', frequency: '1 lần/ngày vào buổi sáng', instructions: 'Uống sau bữa ăn sáng', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Magnesium Sulfate 20%', class: 'Giãn cơ trơn phế quản truyền TM', route: 'Truyền tĩnh mạch', dosage: '2g pha trong 100mL NaCl 0.9% truyền trong 20 phút', frequency: 'Liều duy nhất trong cấp cứu', instructions: 'Chỉ định trong cơn hen phế quản nặng đáp ứng kém khí dung giờ đầu', isFirstLine: false }
      ],
      supportiveCare: ['Tránh tiếp xúc tuyệt đối với các dị nguyên và khói thuốc lá', 'Lập Bản kế hoạch hành động bệnh hen (Asthma Action Plan) cho bệnh nhân', 'Đo lưu lượng đỉnh (PEF) hàng ngày tại nhà']
    },
    complications: [
      { name: 'Cơn hen phế quản ác tính đe dọa tính mạng (Silent Chest)', timeframe: 'acute_24h', warningSigns: 'Phổi im lặng (không nghe thấy tiếng thở/ran rít), lơ mơ, kiệt sức, nhịp tim chậm, SpO2 tụt < 90%', preventiveAction: 'Đặt ống nội khí quản thở máy với chiến lược thông khí bảo vệ phổi (tần số thấp, thời gian thở ra kéo dài I:E 1:3) + Adrenaline tiêm bắp', onCallAlertText: 'BÁO ĐỘNG HEN ÁC TÍNH: Phổi im lặng, kiệt sức ➔ Đặt NKQ cấp cứu và gọi Bác sĩ Hồi sức' },
      { name: 'Tràn khí màng phổi / Tràn khí trung thất do vỡ bóng khí', timeframe: 'acute_24h', warningSigns: 'Đau ngực nhói đột ngột, khó thở tăng vọt, gõ vang một bên phổi, mất rì rào phế nang', preventiveAction: 'Chụp X-quang phổi khẩn + Chuẩn bị bộ dẫn lưu màng phổi giải áp khẩn cấp', onCallAlertText: 'Hen phế quản nghi ngờ biến chứng tràn khí màng phổi: Khám phổi, chụp X-quang tại giường' }
    ],
    monitoringLabs: ['Khí máu động mạch theo dõi PaO2 và PaCO2 (Lưu ý: PaCO2 bình thường hoặc tăng ở bệnh nhân thở nhanh là dấu hiệu kiệt sức hô hấp)', 'Đo lưu lượng đỉnh (PEF) trước và sau khi dùng thuốc giãn phế quản', 'Bạch cầu ái toan máu và định lượng IgE toàn phần'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Cơn Hen Phế Quản Cấp theo Phân Tầng GINA', searchKeyword: 'cơn hen phế quản cấp gina' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán & Phân bậc Hen phế quản GINA 2024', searchKeyword: 'tiêu chuẩn hen phế quản' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Đo Hô Hấp Ký & Nghiệm pháp Hồi phục Phế quản Test Giãn', searchKeyword: 'nghiệm pháp hồi phục phế quản' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Chiến Lược Điều Trị SMART & Phác đồ Bậc thang GINA Track 1', searchKeyword: 'phác đồ smart gina hen' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Hướng dẫn Sử dụng Các dụng cụ Bình xịt Định liều MDI, DPI, Khí dung', searchKeyword: 'bình xịt định liều mdi dpi' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Cơn Hen Ác Tính & Thở máy trong Hen Phế Quản', searchKeyword: 'cơn hen ác tính thở máy' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 14. SỐC NHIỄM KHUẨN / NHIỄM KHUẨN HUYẾT (SEPSIS / SEPTIC SHOCK)
  // ──────────────────────────────────────────────────────────────────────────
  'soc_nhiem_khuan': {
    icdCode: 'A41.9',
    icdPrefixes: ['A40', 'A41', 'R65'],
    diseaseName: 'Sốc nhiễm khuẩn & Nhiễm khuẩn huyết (Sepsis-3)',
    specialty: 'Hồi sức cấp cứu & Truyền nhiễm',
    severity: 'emergency',
    summary: 'Rối loạn chức năng cơ quan đe dọa tính mạng gây ra bởi đáp ứng mất điều hòa của cơ thể đối với nhiễm trùng.',
    goldStandard: 'Nghi ngờ/xác định nhiễm trùng + Điểm SOFA tăng ≥ 2 điểm so với giá trị nền (Sepsis) và cần dùng thuốc vận mạch duy trì MAP ≥ 65 mmHg + Lactate > 2 mmol/L dù đã bù đủ dịch (Septic Shock).',
    criteriaRule: {
      mandatoryIds: ['sepsis_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Ổ nhiễm trùng xác định hoặc nghi ngờ + Điểm SOFA tăng ≥ 2 điểm (hoặc qSOFA ≥ 2 tại phòng khám/cấp cứu).'
    },
    criteria: [
      { id: 'sepsis_crit_1', type: 'mandatory', label: 'Bằng chứng lâm sàng hoặc cận lâm sàng của ổ nhiễm trùng', description: 'Viêm phổi, nhiễm trùng đường mật, viêm phúc mạc, nhiễm trùng tiểu, viêm mô tế bào...', labThreshold: 'Bạch cầu > 12.000 hoặc < 4.000/uL, Procalcitonin > 0.5 - 2 ng/mL' },
      { id: 'sepsis_crit_2', type: 'major', label: 'Điểm SOFA (Sequential Organ Failure Assessment) tăng ≥ 2 điểm so với nền', description: 'Đánh giá 6 hệ cơ quan: Hô hấp (PaO2/FiO2), Đông máu (Tiểu cầu), Gan (Bilirubin), Tim mạch (Huyết áp/Vận mạch), Thần kinh (Glasgow), Thận (Creatinine/Nước tiểu).' },
      { id: 'sepsis_crit_3', type: 'major', label: 'Tụt huyết áp dai dẳng cần thuốc vận mạch để duy trì huyết áp động mạch trung bình (MAP) ≥ 65 mmHg', description: 'Tiêu chuẩn chẩn đoán Sốc nhiễm khuẩn (Septic Shock).' },
      { id: 'sepsis_crit_4', type: 'lab', label: 'Nồng độ Lactate máu tăng > 2 mmol/L (18 mg/dL) dù đã hồi sức đủ dịch thể tích', description: 'Chỉ dấu chuyển hóa yếm khí và giảm tưới máu vi tuần hoàn mô.', labThreshold: 'Lactate máu > 2.0 mmol/L' },
      { id: 'sepsis_crit_5', type: 'minor', label: 'Thang điểm qSOFA (Quick SOFA) ≥ 2 điểm tại giường', description: 'Nhịp thở ≥ 22 lần/phút, Rối loạn tri giác (GCS < 15), Huyết áp tâm thu ≤ 100 mmHg.' }
    ],
    protocol: {
      title: 'Phác đồ Gói 1 Giờ & 3 Giờ Hồi Sức Sốc Nhiễm Khuẩn (Surviving Sepsis Campaign 2021)',
      guideline: 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021',
      targetGoals: ['Hồi sức huyết động đạt MAP ≥ 65 mmHg và thanh thải Lactate máu giảm > 20% mỗi 2 giờ', 'Dùng kháng sinh phổ rộng đường TM trong giờ đầu tiên (Golden Hour)', 'Kiểm soát và giải quyết triệt để ổ nhiễm trùng (Source Control) trong vòng 6-12 giờ'],
      initialManagement: [
        'Đo nồng độ Lactate máu động mạch/tĩnh mạch ngay lập tức',
        'Cấy máu 2 vị trí (kèm cấy bệnh phẩm ổ nhiễm trùng) TRƯỚC KHI bắt đầu kháng sinh',
        'Khởi động truyền dịch tinh thể đẳng trương (Ringer Lactate) 30 mL/kg trong 3 giờ đầu nếu có tụt HA hoặc Lactate ≥ 4 mmol/L',
        'Bắt đầu truyền thuốc vận mạch Noradrenaline sớm nếu HA không đáp ứng với bù dịch ban đầu',
        'Đạt catheter tĩnh mạch trung tâm và catheter động mạch theo dõi huyết áp liên tục'
      ],
      firstLineDrugs: [
        { drugName: 'Noradrenaline (Norepinephrine)', class: 'Thuốc vận mạch co mạch kích thích Alpha-1 hàng đầu', route: 'Truyền tĩnh mạch liên tục qua bơm tiêm điện (tốt nhất qua CVC)', dosage: 'Khởi đầu 0.05 - 0.2 mcg/kg/phút, chỉnh liều mỗi 5-10 phút để đạt MAP ≥ 65 mmHg', frequency: 'Liên tục 24/24', instructions: 'Thuốc vận mạch lựa chọn hàng 1 trong sốc nhiễm khuẩn', isFirstLine: true },
        { drugName: 'Meropenem hoặc Piperacillin/Tazobactam', class: 'Kháng sinh phổ rộng Gram âm & kỵ khí', route: 'Tiêm/Truyền TM', dosage: 'Meropenem 1g mỗi 8 giờ (truyền kéo dài 3h) hoặc Piperacillin/Tazobactam 4.5g mỗi 6 giờ', frequency: 'Mỗi 6-8 giờ', instructions: 'Tiêm TM liều đầu tiên ngay trong 1 giờ đầu tiếp cận', isFirstLine: true },
        { drugName: 'Vancomycin', class: 'Kháng sinh diệt khuẩn Gram dương MRSA', route: 'Truyền tĩnh mạch', dosage: 'Liều nạp 25 - 30 mg/kg, sau đó duy trì 15-20 mg/kg mỗi 8-12 giờ (đích Trough 15-20 mcg/mL)', frequency: 'Mỗi 8-12 giờ', instructions: 'Truyền chậm tối thiểu 60-120 phút để tránh hội chứng Red Man', isFirstLine: true },
        { drugName: 'Hydrocortisone', class: 'Corticosteroid bổ sung liều sinh lý trong sốc kháng vận mạch', route: 'Tiêm TM', dosage: '200 mg/ngày (chia 50mg mỗi 6h hoặc truyền liên tục)', frequency: 'Mỗi 6 giờ', instructions: 'Chỉ định khi sốc nhiễm khuẩn cần liều Noradrenaline ≥ 0.25 mcg/kg/phút', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Vasopressin', class: 'Thuốc co mạch không qua thụ thể adrenergic', route: 'Truyền tĩnh mạch', dosage: 'Liều cố định 0.03 đơn vị/phút', frequency: 'Liên tục', instructions: 'Thêm vào khi liều Noradrenaline tăng cao nhằm giảm liều Noradrenaline', isFirstLine: false },
        { drugName: 'Dobutamine', class: 'Thuốc tăng co bóp cơ tim Inotrope', route: 'Truyền tĩnh mạch', dosage: '2.5 - 10 mcg/kg/phút', frequency: 'Liên tục', instructions: 'Chỉ định khi có rối loạn chức năng cơ tim do nhiễm khuẩn hoặc tưới máu kém dù đã đạt MAP ≥ 65 mmHg', isFirstLine: false }
      ],
      supportiveCare: ['Kiểm soát đường huyết mục tiêu 140 - 180 mg/dL bằng Insulin truyền tĩnh mạch', 'Dự phòng loét dạ dày do stress bằng PPI và dự phòng huyết khối tĩnh mạch sâu bằng LMWH', 'Nuôi dưỡng đường tiêu hóa sớm liều trophic (10-20 mL/h) trong 48h đầu']
    },
    complications: [
      { name: 'Suy đa tạng (MODS) & Đông máu nội mạch rải rác (DIC)', timeframe: 'acute_24h', warningSigns: 'Tiểu cầu tụt nhanh < 50.000/uL, PT kéo dài (INR > 1.5), Fibrinogen giảm < 1.5g/L, D-Dimer tăng vọt, chảy máu chân kim', preventiveAction: 'Kiểm soát triệt để ổ nhiễm trùng + Truyền huyết tương tươi đông lạnh / tiểu cầu nếu có chảy máu hoạt động', onCallAlertText: 'BÁO ĐỘNG DIC / SUY ĐA TẠNG: Tiểu cầu tụt nhanh, INR tăng ➔ Xét nghiệm đông máu toàn bộ và hội chẩn Hồi sức' },
      { name: 'Hội chứng suy hô hấp cấp tiến triển (ARDS) do Sepsis', timeframe: 'acute_24h', warningSigns: 'Khó thở dữ dội, SpO2 tụt dù thở oxy lưu lượng cao, tổn thương thâm nhiễm 2 phế trường, PaO2/FiO2 < 200-300', preventiveAction: 'Thở máy xâm nhập chiến lược bảo vệ phổi (Thể tích lưu thông thấp Vt = 6 mL/kg cân nặng lý tưởng, Pplat < 30 cmH2O, PEEP tối ưu)', onCallAlertText: 'Bệnh nhân Sepsis diễn tiến ARDS: Chuyển ICU, chuẩn bị máy thở Vt thấp' }
    ],
    monitoringLabs: ['Lactate máu kiểm tra lại mỗi 2-4 giờ cho đến khi về bình thường', 'Khí máu động mạch, Creatinine máu, Men gan Bilirubin, Tiểu cầu, Procalcitonin mỗi ngày', 'Theo dõi huyết áp động mạch liên tục qua catheter và lượng nước tiểu mỗi giờ qua ống sonde tiểu (mục tiêu > 0.5 mL/kg/h)'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Sốc & Phân tầng Nhiễm khuẩn huyết Sepsis-3', searchKeyword: 'tiếp cận sốc nhiễm khuẩn sepsis' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Bảng điểm SOFA & Tiêu chuẩn Sepsis-3 Quốc Tế', searchKeyword: 'thang điểm sofa tiêu chuẩn sepsis' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Ý nghĩa Động học Lactate Máu & Dấu ấn Procalcitonin', searchKeyword: 'lactate procalcitonin sốc nhiễm khuẩn' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Gói 1 Giờ & 3 Giờ Cấp cứu Surviving Sepsis Campaign 2021', searchKeyword: 'phác đồ surviving sepsis campaign' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Sử dụng Thuốc Vận Mạch Noradrenaline, Vasopressin & Kháng sinh Phổ rộng', searchKeyword: 'thuốc vận mạch noradrenaline kháng sinh sepsis' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Suy Đa Tạng MODS & Đông Máu Nội Mạch DIC', searchKeyword: 'suy đa tạng mods đông máu rải rác dic' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 15. XUẤT HUYẾT TIÊU HÓA TRÊN (UGIB)
  // ──────────────────────────────────────────────────────────────────────────
  'xuat_huyet_tieu_hoa_tren': {
    icdCode: 'K92.2',
    icdPrefixes: ['K92', 'K25', 'K26', 'I85'],
    diseaseName: 'Xuất huyết tiêu hóa trên (UGIB - Loét & Vỡ Giãn TMTQ)',
    specialty: 'Tiêu hóa & Hồi sức cấp cứu',
    severity: 'emergency',
    summary: 'Tình trạng chảy máu từ đường tiêu hóa trên (từ thực quản đến góc Treitz), nguyên nhân chính do loét dạ dày tá tràng hoặc vỡ giãn tĩnh mạch thực quản do tăng áp cửa.',
    goldStandard: 'Nội soi thực quản dạ dày tá tràng (EGD) cấp cứu xác định vị trí, nguyên nhân và can thiệp cầm máu (Phân loại Forrest).',
    criteriaRule: {
      mandatoryIds: ['ugib_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Triệu chứng nôn ra máu và/hoặc đi cầu phân đen + Nội soi tiêu hóa xác định tổn thương chảy máu đang hoạt động hoặc có nguy cơ tái xuất huyết cao.'
    },
    criteria: [
      { id: 'ugib_crit_1', type: 'mandatory', label: 'Triệu chứng nôn ra máu đỏ tươi / máu cục hoặc đi cầu phân đen như bã cà phê, mùi khắm đặc trưng', description: 'Dấu hiệu lâm sàng trực tiếp của xuất huyết tiêu hóa trên.' },
      { id: 'ugib_crit_2', type: 'major', label: 'Nội soi dạ dày tá tràng phát hiện ổ loét phân loại Forrest Ia, Ib, IIa, IIb hoặc búi giãn tĩnh mạch thực quản đang chảy máu / có dấu son (Red spots)', description: 'Xác định chính xác vị trí và mức độ nguy cơ tái xuất huyết.', labThreshold: 'Nội soi EGD trong vòng 12-24 giờ' },
      { id: 'ugib_crit_3', type: 'major', label: 'Thiếu máu cấp tính và thay đổi huyết động', description: 'Huyết áp tụt, mạch nhanh > 100 lần/phút, chóng mặt khi thay đổi tư thế, Hemoglobin tụt nhanh.', labThreshold: 'Hb tụt > 2 g/dL hoặc Hct < 30%' },
      { id: 'ugib_crit_4', type: 'lab', label: 'Tỷ lệ BUN / Creatinine máu tăng > 20-30', description: 'Chỉ dấu tái hấp thu protein từ máu bị tiêu hóa trong lòng ruột non.', labThreshold: 'Tỷ lệ BUN/Creatinine > 20:1' },
      { id: 'ugib_crit_5', type: 'minor', label: 'Thang điểm Glasgow-Blatchford Score (GBS) ≥ 1 hoặc Rockall ≥ 3', description: 'Đánh giá phân tầng nguy cơ cần can thiệp truyền máu, nội soi cấp cứu và nguy cơ tử vong.' }
    ],
    protocol: {
      title: 'Phác đồ Xử trí Xuất Huyết Tiêu Hóa Trên Cấp Cứu (ACG/ESGE 2022)',
      guideline: 'ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding 2022 & Phác đồ Bộ Y tế',
      targetGoals: ['Hồi sức huyết động, duy trì Hemoglobin 7 - 8 g/dL (hoặc 9-10 g/dL nếu có bệnh tim mạch thiếu máu cục bộ)', 'Nội soi can thiệp cầm máu sớm trong vòng 24 giờ (hoặc < 12 giờ nếu nghi vỡ giãn TMTQ)', 'Ức chế tiết acid dạ dày mạnh bằng PPI liều cao để ổn định cục máu đông'],
      initialManagement: [
        'Lập 2 đường truyền tĩnh mạch lớn (kim 16G hoặc 18G) và truyền dung dịch tinh thể Ringer Lactate',
        'Đặt ống thông dạ dày hút kiểm tra nếu nôn máu ồ ạt, đặt nội khí quản bảo vệ đường thở nếu rối loạn tri giác',
        'Truyền khối hồng cầu duy trì mục tiêu Hb 7 - 8 g/dL (Chiến lược truyền máu hạn chế)',
        'Tiêm tĩnh mạch Pantoprazole/Esomeprazole liều nạp 80mg TM, sau đó truyền liên tục 8mg/giờ',
        'Dùng thuốc giảm áp lực tĩnh mạch cửa sớm (Octreotide 50mcg bolus TM rồi truyền 50mcg/h hoặc Terlipressin 2mg mỗi 4h) nếu nghi ngờ xơ gan'
      ],
      firstLineDrugs: [
        { drugName: 'Pantoprazole hoặc Esomeprazole', class: 'Ức chế bơm Proton (PPI) liều cao truyền TM', route: 'Tiêm/Truyền TM', dosage: 'Bolus 80mg TM, sau đó truyền liên tục 8mg/giờ trong 72 giờ đầu', frequency: 'Liên tục', instructions: 'Duy trì pH dạ dày > 6 để ngăn ngừa ly giải cục máu đông tại ổ loét', isFirstLine: true },
        { drugName: 'Octreotide hoặc Terlipressin', class: 'Thuốc co mạch tạng giảm áp lực tĩnh mạch cửa', route: 'Tiêm/Truyền TM', dosage: 'Octreotide 50mcg bolus TM, duy trì 50mcg/giờ (hoặc Terlipressin 1-2mg tiêm TM mỗi 4-6h)', frequency: 'Liên tục hoặc mỗi 4h', instructions: 'Dùng ngay khi nghi ngờ xuất huyết do tăng áp cửa do xơ gan', isFirstLine: true },
        { drugName: 'Ceftriaxone', class: 'Kháng sinh dự phòng nhiễm trùng huyết & viêm phúc mạc ở bệnh nhân xơ gan XHTH', route: 'Tiêm TM', dosage: '1g mỗi 24 giờ trong 5-7 ngày', frequency: '1 lần/ngày', instructions: 'Bắt buộc dùng ở bệnh nhân xơ gan có xuất huyết tiêu hóa để giảm tử vong', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Tranexamic Acid (Transamin)', class: 'Thuốc chống tiêu sợi huyết (Lưu ý hạn chế dùng trong XHTH theo thử nghiệm HALT-IT)', route: 'Tiêm TM', dosage: '1g tiêm TM chậm', frequency: 'Khi có rối loạn đông máu tăng tiêu sợi huyết', instructions: 'Không khuyến cáo thường quy theo guideline mới', isFirstLine: false }
      ],
      supportiveCare: ['Nội soi can thiệp cầm máu bằng kẹp clip, tiêm xơ, nhiệt đông hoặc thắt vòng cao su (EVL)', 'Kháng sinh diệt trừ Helicobacter pylori sau khi xuất huyết ổn định', 'Tạm ngưng các thuốc NSAIDs, kháng đông, kháng kết tập tiểu cầu và đánh giá lại chỉ định']
    },
    complications: [
      { name: 'Sốc mất máu giảm thể tích & Ngưng tim', timeframe: 'acute_24h', warningSigns: 'Huyết áp không đo được, mạch nhanh nhỏ khó bắt, da niêm tái nhợt, thiểu niệu vô niệu', preventiveAction: 'Kích hoạt quy trình truyền máu khối lượng lớn (MTP tỉ lệ 1:1:1 Hồng cầu : Huyết tương : Tiểu cầu) + Can thiệp nội soi / Nút mạch DSA khẩn cấp', onCallAlertText: 'BÁO ĐỘNG SỐC MẤT MÁU NẶNG: HA tụt, nôn máu tái phát ➔ Kích hoạt MTP và báo phòng Nội soi/DSA' },
      { name: 'Hôn mê gan (Bệnh não gan) do hấp thu amoniac từ máu trong ruột', timeframe: 'subacute_7d', warningSigns: 'Bệnh nhân xơ gan xuất hiện lú lẫn, rối loạn chu kỳ thức ngủ, run vỗ cánh tay (Flapping tremor)', preventiveAction: 'Dùng Lactulose 30-45mL uống/thụt tháo để đi cầu 2-3 lần/ngày + Kháng sinh Rifaximin đường ruột', onCallAlertText: 'Bệnh nhân xơ gan sau XHTH có dấu hiệu tiền hôn mê gan: Thụt tháo Lactulose ngay' }
    ],
    monitoringLabs: ['Công thức máu (Hb, Hct, Tiểu cầu) kiểm tra mỗi 4-6 giờ trong 24h đầu', 'Đông máu toàn bộ (PT, INR, aPTT, Fibrinogen)', 'Chức năng thận Ure, Creatinine và Điện giải đồ'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Xuất Huyết Tiêu Hóa Trên & Thang Điểm Glasgow-Blatchford', searchKeyword: 'tiếp cận xuất huyết tiêu hóa trên' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Phân loại Nội soi Forrest & Tiêu chuẩn Vỡ Giãn Tĩnh Mạch Thực Quản', searchKeyword: 'phân loại forrest vỡ giãn tĩnh mạch' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Nội Soi Tiêu Hóa Dạ Dày Cấp Cứu & Can Thiệp Kẹp Clip, Thắt Vòng Cao Su EVL', searchKeyword: 'nội soi dạ dày kẹp clip thắt vòng cao su' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Xử trí Xuất Huyết Tiêu Hóa Cấp & Phác đồ PPI Liều Cao ACG 2022', searchKeyword: 'phác đồ xuất huyết tiêu hóa ppi' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Sử dụng Octreotide, Terlipressin và Kháng sinh Dự phòng Ceftriaxone', searchKeyword: 'octreotide terlipressin ceftriaxone' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Sốc Mất Máu Khối Lượng Lớn & Bệnh Não Gan sau Xuất Huyết', searchKeyword: 'sốc mất máu bệnh não gan' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 16. NHIỄM TOAN CETON DO ĐTĐ (DKA) & HHS
  // ──────────────────────────────────────────────────────────────────────────
  'nhiem_toan_ceton_dka': {
    icdCode: 'E10.1',
    icdPrefixes: ['E10.1', 'E11.1', 'E13.1', 'E14.1'],
    diseaseName: 'Nhiễm toan Ceton do ĐTĐ (DKA) & Tăng ALTT (HHS)',
    specialty: 'Nội tiết & Hồi sức cấp cứu',
    severity: 'emergency',
    summary: 'Cấp cứu nội tiết chuyển hóa do thiếu hụt insulin tuyệt đối hoặc tương đối dẫn đến tăng đường huyết, nhiễm toan chuyển hóa tăng khoảng trống anion và tích tụ thể ceton.',
    goldStandard: 'Tam chứng: Đường huyết > 250 mg/dL (13.9 mmol/L) + Toan chuyển hóa (pH < 7.30, HCO3 < 18 mEq/L, Anion Gap > 10-12) + Ceton máu (Beta-hydroxybutyrate ≥ 3.0 mmol/L) hoặc ceton nước tiểu đậm đặc.',
    criteriaRule: {
      mandatoryIds: ['dka_crit_1', 'dka_crit_2', 'dka_crit_3'],
      ruleDescription: 'Bắt buộc thỏa mãn đủ 3 tiêu chuẩn: Tăng đường huyết + Toan chuyển hóa có khoảng trống anion tăng + Dương tính với thể Ceton trong máu hoặc nước tiểu.'
    },
    criteria: [
      { id: 'dka_crit_1', type: 'mandatory', label: 'Tăng đường huyết máu (Glucose > 250 mg/dL hoặc > 13.9 mmol/L)', description: 'Có thể gặp DKA đường huyết bình thường (Euglycemic DKA) ở bệnh nhân dùng ức chế SGLT2i hoặc có thai.', labThreshold: 'Glucose > 250 mg/dL' },
      { id: 'dka_crit_2', type: 'mandatory', label: 'Toan chuyển hóa với pH máu động mạch < 7.30 và Bicarbonate (HCO3-) < 18 mEq/L', description: 'Phân loại: Nhẹ (pH 7.25-7.30), Trung bình (pH 7.00-7.24), Nặng (pH < 7.00).', labThreshold: 'pH < 7.30 và HCO3 < 18 mEq/L' },
      { id: 'dka_crit_3', type: 'mandatory', label: 'Ceton máu (Beta-hydroxybutyrate) ≥ 3.0 mmol/L hoặc Ceton niệu dương tính (≥ ++)', description: 'Chỉ dấu tích tụ thể ceton do thoái giáng lipid.', labThreshold: 'Beta-hydroxybutyrate ≥ 3.0 mmol/L' },
      { id: 'dka_crit_4', type: 'major', label: 'Khoảng trống Anion (Anion Gap) tăng > 10 - 12 mEq/L', description: 'Tính theo công thức: AG = Na+ - (Cl- + HCO3-).', labThreshold: 'Anion Gap > 12 mEq/L' },
      { id: 'dka_crit_5', type: 'minor', label: 'Triệu chứng lâm sàng mất nước nặng, thở Kussmaul và hơi thở mùi táo chín (mùi ceton)', description: 'Khô da niêm, mạch nhanh, hạ huyết áp tư thế, đau bụng cấp giả ngoại khoa, lơ mơ.' }
    ],
    protocol: {
      title: 'Phác đồ Bù Dịch, Bù Kali & Truyền Insulin trong DKA (ADA 2024)',
      guideline: 'American Diabetes Association (ADA Standards of Care 2024) & Hướng dẫn Bộ Y tế',
      targetGoals: ['Đóng khoảng trống Anion Gap (AG < 12) và đưa pH > 7.30, HCO3 > 18 mEq/L', 'Bù đủ dịch thể tích thiếu hụt (thường thiếu 5 - 8 Lít dịch)', 'Hạ đường huyết an toàn 50 - 75 mg/dL mỗi giờ (tránh hạ quá nhanh gây phù não)'],
      initialManagement: [
        'Bù dịch giờ đầu: Truyền NaCl 0.9% 1000 - 1500 mL trong 1 giờ đầu tiên',
        'Kiểm tra Kali máu TRƯỚC KHI tiêm/truyền Insulin (Nếu K+ < 3.3 mEq/L: BÙ KALI TRƯỚC, HOÃN INSULIN để tránh ngừng tim)',
        'Insulin Regular truyền tĩnh mạch liên tục liều 0.1 đơn vị/kg/giờ (hoặc bolus 0.1 U/kg rồi truyền 0.1 U/kg/h)',
        'Khi đường huyết giảm xuống < 200 - 250 mg/dL: Đổi dịch truyền sang Glucose 5% + NaCl 0.45% để duy trì đường huyết 150-200 mg/dL cho đến khi hết toan'
      ],
      firstLineDrugs: [
        { drugName: 'Insulin Regular (Actrapid / Humulin R)', class: 'Insulin người tác dụng ngắn truyền tĩnh mạch', route: 'Truyền tĩnh mạch liên tục qua bơm tiêm điện', dosage: '0.1 đơn vị/kg/giờ (chỉnh liều để đường huyết giảm 50-75 mg/dL/giờ)', frequency: 'Liên tục', instructions: 'Pha 50 UI Actrapid trong 50mL NaCl 0.9% (1 UI/mL)', isFirstLine: true },
        { drugName: 'Kali Clorid (KCl 10%)', class: 'Dung dịch bù điện giải Kali đường TM', route: 'Pha truyền tĩnh mạch', dosage: '20 - 30 mEq Kali cho mỗi Lít dịch truyền duy trì Kali máu 4.0 - 5.0 mEq/L', frequency: 'Pha kèm dịch truyền', instructions: 'Tuyệt đối KHÔNG tiêm tĩnh mạch trực tiếp (nguy cơ ngừng tim)', isFirstLine: true },
        { drugName: 'Natri Clorid 0.9% & 0.45%', class: 'Dịch truyền tinh thể bù nước đẳng trương/nhược trương', route: 'Truyền tĩnh mạch', dosage: '1000 mL giờ đầu, sau đó 250 - 500 mL/giờ tùy huyết động và Na+ hiệu chỉnh', frequency: 'Liên tục', instructions: 'Chuyển sang NaCl 0.45% nếu Natri máu hiệu chỉnh bình thường hoặc tăng', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Natri Bicarbonate 1.4% hoặc 8.4%', class: 'Dung dịch kiềm hóa máu', route: 'Truyền tĩnh mạch', dosage: '100 mmol NaHCO3 pha trong 400mL nước cất + 20 mEq KCl truyền trong 2 giờ', frequency: 'Khi pH < 6.90', instructions: 'Chỉ định hạn chế khi toan máu rất nặng đe dọa ngừng tim (pH < 6.90)', isFirstLine: false }
      ],
      supportiveCare: ['Theo dõi đường huyết mao mạch mỗi 1 giờ và Khí máu/Điện giải mỗi 2-4 giờ', 'Tìm và điều trị yếu tố khởi kích (Nhiễm trùng, ngưng tiêm insulin, nhồi máu cơ tim, đột quỵ)', 'Chuyển sang Insulin tiêm dưới da trước khi ngưng truyền Insulin TM 1-2 giờ']
    },
    complications: [
      { name: 'Hạ Kali máu cấp & Rối loạn nhịp tim ngừng tuần hoàn', timeframe: 'acute_24h', warningSigns: 'Yếu cơ liệt chi, chướng bụng, ECG xuất hiện sóng U, đoạn ST chênh xuống, xoắn đỉnh/rung thất', preventiveAction: 'Bù Kali chủ động ngay khi K+ < 5.2 mEq/L, hoãn truyền Insulin nếu K+ < 3.3 mEq/L', onCallAlertText: 'BÁO ĐỘNG HẠ KALI TRONG DKA: K+ < 3.3 mEq/L ➔ Ngừng truyền Insulin, tăng tốc độ bù Kali tĩnh mạch' },
      { name: 'Phù não cấp (Cerebral Edema) do hạ đường huyết/áp lực thẩm thấu quá nhanh', timeframe: 'acute_24h', warningSigns: 'Đau đầu dữ dội, lơ mơ hôn mê trở lại sau giai đoạn cải thiện, co giật, phù gai thị', preventiveAction: 'Hạ đường huyết từ từ (không quá 75-100 mg/dL/h) + Truyền Mannitol 20% 0.5-1g/kg hoặc NaCl 3%', onCallAlertText: 'Bệnh nhân DKA đau đầu, tri giác xấu đi: Nghi ngờ phù não cấp, truyền Mannitol khẩn cấp' }
    ],
    monitoringLabs: ['Đường huyết mao mạch tại giường mỗi 1 giờ', 'Điện giải đồ (Na+, K+, Cl-), Khí máu động mạch (pH, HCO3-), Anion Gap mỗi 2-4 giờ', 'Định lượng Beta-hydroxybutyrate máu mỗi 4-6 giờ để đánh giá tiêu chuẩn hồi phục DKA'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Hôn mê Tăng Đường Huyết: Phân Biệt DKA & HHS', searchKeyword: 'tiếp cận dka hhs hôn mê tăng đường huyết' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán Nhiễm Toan Ceton ADA 2024 & Euglycemic DKA', searchKeyword: 'tiêu chuẩn dka ada 2024' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Công thức Tính Khoảng Trống Anion Gap & Natri Hiệu Chỉnh', searchKeyword: 'công thức anion gap natri hiệu chỉnh' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Bù Dịch, Kali và Phác đồ Insulin Truyền Tĩnh Mạch ADA', searchKeyword: 'phác đồ truyền insulin dka' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Hướng dẫn Chuyển đổi Insulin Truyền TM sang Tiêm Dưới Da Phác đồ Basal-Bolus', searchKeyword: 'chuyển đổi insulin truyền tm sang tiêm dưới da' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Phù Não Cấp & Hạ Kali Máu Nguy Kịch trong Cấp Cứu DKA', searchKeyword: 'phù não hạ kali dka' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 17. CƠN BÃO GIÁP & NHIỄM ĐỘC GIÁP CẤP (THYROID STORM)
  // ──────────────────────────────────────────────────────────────────────────
  'con_bao_giap': {
    icdCode: 'E05.9',
    icdPrefixes: ['E05'],
    diseaseName: 'Cơn bão giáp & Nhiễm độc giáp cấp (Thyroid Storm)',
    specialty: 'Nội tiết & Hồi sức cấp cứu',
    severity: 'emergency',
    summary: 'Cấp cứu nội tiết tối khẩn cấp do tình trạng nhiễm độc giáp kịch phát đe dọa tính mạng với tỷ lệ tử vong cao nếu không điều trị kịp thời.',
    goldStandard: 'Bằng chứng nhiễm độc giáp (FT4/FT3 tăng vọt, TSH < 0.01 uIU/mL) + Điểm thang điểm Burch-Wartofsky Point Scale (BWPS) ≥ 45 điểm hoặc Thang điểm Akamizu (JTA) xác định.',
    criteriaRule: {
      mandatoryIds: ['storm_crit_1', 'storm_crit_2'],
      ruleDescription: 'Bắt buộc có Xét nghiệm FT4/FT3 tăng, TSH giảm sâu + Điểm thang điểm Burch-Wartofsky ≥ 45 điểm (hoặc 25-44 điểm nghi ngờ).'
    },
    criteria: [
      { id: 'storm_crit_1', type: 'mandatory', label: 'Bằng chứng hóa sinh của nhiễm độc giáp: FT4/FT3 tăng cao và TSH bị ức chế hoàn toàn', description: 'Xác nhận tình trạng cường giáp/nhiễm độc giáp.', labThreshold: 'TSH < 0.01 uIU/mL, FT4 tăng cao' },
      { id: 'storm_crit_2', type: 'mandatory', label: 'Thang điểm Burch-Wartofsky Point Scale (BWPS) ≥ 45 điểm', description: 'Đánh giá các hệ thống: Thân nhiệt, Thần kinh trung ương, Tim mạch, Tiêu hóa/Gan, Suy tim và Yếu tố khởi kích.', labThreshold: 'BWPS Score ≥ 45' },
      { id: 'storm_crit_3', type: 'major', label: 'Rối loạn điều nhiệt: Sốt cao liên tục (thường > 38.5 - 40°C) kèm vã mồ hôi đầm đìa', description: 'Biểu hiện tăng chuyển hóa cực đại.' },
      { id: 'storm_crit_4', type: 'major', label: 'Rối loạn chức năng thần kinh trung ương', description: 'Kích động dữ dội, mê sảng, loạn thần kinh cấp, lơ mơ hoặc hôn mê.' },
      { id: 'storm_crit_5', type: 'major', label: 'Rối loạn nhịp tim nhanh kịch phát (Nhịp xoang nhanh > 130-140 l/p hoặc Rung nhĩ đáp ứng thất rất nhanh) không tương xứng mức độ sốt', description: 'Dấu hiệu kích thích thụ thể beta-adrenergic quá mức.' }
    ],
    protocol: {
      title: 'Phác đồ 5 Bước Tác Chiến Cơn Bão Giáp (ATA / JTA Guidelines)',
      guideline: 'American Thyroid Association (ATA) & Japan Thyroid Association Guidelines for Thyroid Storm',
      targetGoals: ['Chặn tổng hợp và phóng thích hormon giáp mới', 'Ức chế tác dụng ngoại vi của hormon giáp trên tim mạch (Chẹn Beta)', 'Ngăn chặn chuyển đổi T4 thành T3 ở mô ngoại vi', 'Hồi sức suy tim, hạ sốt tích cực và điều trị yếu tố thúc đẩy'],
      initialManagement: [
        'Bước 1: Kháng giáp tổng hợp liều cao (Propylthiouracil - PTU 200mg mỗi 4h uống/sonde hoặc Methimazole 20mg mỗi 6h)',
        'Bước 2: Chẹn beta giao cảm (Propranolol 60-80mg mỗi 4-6h uống hoặc Esmolol truyền TM) để kiểm soát nhịp tim < 90-100 l/p',
        'Bước 3: Dùng dung dịch Iod vô cơ (Lugol 5% 8-10 giọt mỗi 8h hoặc SSKI) CHO SAU KHI DÙNG KHÁNG GIÁP TỐI THIỂU 1 GIỜ (Hiệu ứng Wolff-Chaikoff)',
        'Bước 4: Glucocorticoid toàn thân (Hydrocortisone 100mg TM mỗi 8h hoặc Dexamethasone 2mg mỗi 6h) ức chế chuyển T4 thành T3 và dự phòng suy thượng thận tương đối',
        'Bước 5: Hạ nhiệt tích cực bằng chườm mát, Paracetamol (TUYỆT ĐỐI KHÔNG DÙNG ASPIRIN vì đẩy T4 ra khỏi protein gắn kết)'
      ],
      firstLineDrugs: [
        { drugName: 'Propylthiouracil (PTU)', class: 'Thuốc kháng giáp tổng hợp ức chế tổng hợp và ức chế chuyển T4 thành T3', route: 'Uống hoặc qua ống sonde dạ dày', dosage: 'Liều nạp 500 - 1000 mg, sau đó duy trì 200 - 250 mg mỗi 4 giờ', frequency: 'Mỗi 4 giờ', instructions: 'Thuốc kháng giáp ưu tiên số 1 trong bão giáp', isFirstLine: true },
        { drugName: 'Propranolol', class: 'Chẹn beta không chọn lọc liều cao', route: 'Uống/Tiêm TM', dosage: '60 - 80 mg uống mỗi 4-6 giờ (hoặc 1-2 mg tiêm TM chậm)', frequency: 'Mỗi 4-6 giờ', instructions: 'Liều cao vừa kiểm soát nhịp tim vừa ức chế men 5-deiodinase ngoại vi', isFirstLine: true },
        { drugName: 'Dung dịch Lugol 5% (Potassium Iodide)', class: 'Iod vô cơ ức chế phóng thích hormon giáp tức thì', route: 'Uống', dosage: '8 - 10 giọt pha nước uống mỗi 8 giờ', frequency: 'Mỗi 8 giờ', instructions: 'BẮT BUỘC dùng sau liều PTU đầu tiên ít nhất 1 giờ', isFirstLine: true },
        { drugName: 'Hydrocortisone', class: 'Corticosteroid tiêm tĩnh mạch', route: 'Tiêm TM', dosage: '100 mg tiêm TM mỗi 8 giờ (hoặc Dexamethasone 2mg mỗi 6h)', frequency: 'Mỗi 8 giờ', instructions: 'Giúp ức chế giải phóng hormon giáp và hỗ trợ trục thượng thận', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Esmolol', class: 'Chẹn beta tác dụng cực ngắn truyền TM', route: 'Truyền tĩnh mạch', dosage: 'Nạp 500 mcg/kg trong 1 phút, duy trì 50 - 200 mcg/kg/phút', frequency: 'Liên tục', instructions: 'Ưu tiên lựa chọn ở bệnh nhân huyết động không ổn định hoặc ICU', isFirstLine: false }
      ],
      supportiveCare: ['Bù đủ dịch và điện giải bằng Glucose 5% + NaCl 0.9%', 'Điều trị kháng sinh nếu có ổ nhiễm trùng thúc đẩy', 'Thay huyết tương (Plasmapheresis) nếu thất bại với điều trị nội khoa tối ưu sau 24-48h']
    },
    complications: [
      { name: 'Suy tim cung lượng cao cấp & Phù phổi cấp', timeframe: 'acute_24h', warningSigns: 'Khó thở dữ dội, rale ẩm ngập 2 đáy phổi, tĩnh mạch cổ nổi, huyết áp kẹp tụt', preventiveAction: 'Dùng cẩn trọng chẹn beta + Lợi tiểu Furosemide liều thấp + Thuốc giãn mạch', onCallAlertText: 'BÁO ĐỘNG SUY TIM CẤP TRONG BÃO GIÁP: Khó thở rale ẩm ➔ Hội chẩn Tim mạch - Nội tiết khẩn cấp' },
      { name: 'Trụy tim mạch & Hôn mê bão giáp (Thyroid Storm Coma)', timeframe: 'acute_24h', warningSigns: 'Thân nhiệt hạ đột ngột, huyết áp tụt sâu không đáp ứng, hôn mê sâu', preventiveAction: 'Thở máy, vận mạch Noradrenaline + Thay huyết tương cấp cứu', onCallAlertText: 'Trụy mạch trong bão giáp: Khởi động vận mạch và chuẩn bị lọc máu thay huyết tương' }
    ],
    monitoringLabs: ['FT4, FT3, TSH kiểm tra lại sau 48-72 giờ', 'Bilirubin máu, Men gan AST/ALT (nguy cơ tổn thương gan do bão giáp hoặc do PTU)', 'Điện giải đồ, Đường huyết, Khí máu động mạch mỗi 6-12 giờ'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Cơn Bão Giáp & Thang Điểm Burch-Wartofsky BWPS', searchKeyword: 'tiếp cận bão giáp burch wartofsky' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán Bão giáp theo Hiệp hội Tuyến Giáp Nhật Bản (JTA)', searchKeyword: 'tiêu chuẩn bão giáp jta ata' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Định lượng Hormon Tuyến Giáp FT3, FT4, TSH & TRAb', searchKeyword: 'xét nghiệm ft4 ft3 tsh trab' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Chiến Lược 5 Bước Điều Trị Bão Giáp ATA Guidelines', searchKeyword: 'phác đồ điều trị bão giáp ata' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Hướng dẫn Sử dụng PTU, Dung dịch Lugol và Chẹn Beta Propranolol', searchKeyword: 'thuốc ptu dung dịch lugol propranolol' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Suy Tim Cung Lượng Cao & Tổn Thương Gan Cấp trong Bão Giáp', searchKeyword: 'suy tim bão giáp tổn thương gan' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 18. SUY THƯỢNG THẬN CẤP (ADRENAL CRISIS)
  // ──────────────────────────────────────────────────────────────────────────
  'suy_thuong_than_cap': {
    icdCode: 'E27.2',
    icdPrefixes: ['E27.2', 'E27.1', 'E27.4'],
    diseaseName: 'Suy thượng thận cấp (Adrenal Crisis / Acute Adrenal Insufficiency)',
    specialty: 'Nội tiết & Hồi sức cấp cứu',
    severity: 'emergency',
    summary: 'Cấp cứu nội tiết đe dọa tính mạng do thiếu hụt cấp tính glucocorticoid (Cortisol), thường xảy ra trên bệnh nhân suy thượng thận mạn gặp stress cấp hoặc ngưng corticoid đột ngột.',
    goldStandard: 'Lâm sàng tụt huyết áp trơ với bù dịch/vận mạch + Cortisol máu lúc 8h sáng < 3-5 mcg/dL (< 83-138 nmol/L) hoặc Nghiệm pháp kích thích ACTH (Synacthen test) đỉnh Cortisol < 18 mcg/dL (< 500 nmol/L).',
    criteriaRule: {
      mandatoryIds: ['adrenal_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Tụt huyết áp hoặc sốc kháng bù dịch + Tiền sử dùng Corticoid kéo dài hoặc suy thượng thận mạn + Rối loạn điện giải (Hạ Natri, Tăng Kali máu).'
    },
    criteria: [
      { id: 'adrenal_crit_1', type: 'mandatory', label: 'Hạ huyết áp (Huyết áp tâm thu < 90 mmHg hoặc giảm > 20 mmHg) đáp ứng kém với truyền dịch đơn thuần', description: 'Biểu hiện mất trương lực mạch do thiếu hụt cortisol trầm trọng.' },
      { id: 'adrenal_crit_2', type: 'major', label: 'Tiền sử sử dụng Corticosteroid kéo dài (thuốc tễ, thuốc đông y không rõ nguồn gốc, Medrol, Dexamethasone...) hoặc bệnh lý tuyến thượng thận/tuyến yên', description: 'Yếu tố nguy cơ hàng đầu gây suy thượng thận thứ phát do ức chế trục HPA.' },
      { id: 'adrenal_crit_3', type: 'major', label: 'Rối loạn điện giải điển hình: Hạ Natri máu (< 135 mEq/L) và Tăng Kali máu (> 5.0 mEq/L)', description: 'Do thiếu hụt phối hợp Aldosterone (trong suy thượng thận nguyên phát).', labThreshold: 'Na+ < 135 mEq/L, K+ > 5.0 mEq/L' },
      { id: 'adrenal_crit_4', type: 'lab', label: 'Hạ đường huyết (Glucose máu < 70 mg/dL hoặc < 3.9 mmol/L)', description: 'Do giảm tạo đường mới và tăng nhạy cảm với insulin.', labThreshold: 'Glucose < 3.9 mmol/L' },
      { id: 'adrenal_crit_5', type: 'minor', label: 'Triệu chứng tiêu hóa rầm rộ (Đau bụng dữ dội giả viêm phúc mạc, nôn ói, tiêu chảy) và sút cân, sạm da (Addison)', description: 'Thường bị chẩn đoán nhầm với bụng ngoại khoa cấp.' }
    ],
    protocol: {
      title: 'Phác đồ Bù Hydrocortisone Khẩn Cấp & Hồi Sức Thể Tích trong Suy Thượng Thận Cấp (Endocrine Society 2023)',
      guideline: 'Endocrine Society Clinical Practice Guideline on Adrenal Insufficiency & Phác đồ Bộ Y tế',
      targetGoals: ['Bù Corticosteroid liều cao khẩn cấp (không chờ kết quả xét nghiệm Cortisol)', 'Bù đủ thể tích tuần hoàn và phục hồi huyết áp', 'Hiệu chỉnh hạ Natri máu, tăng Kali máu và hạ đường huyết an toàn'],
      initialManagement: [
        'Tiêm tĩnh mạch Hydrocortisone 100mg Bolus ngay lập tức (hoặc Dexamethasone 4mg nếu cần làm Synacthen test sau đó)',
        'Truyền tĩnh mạch nhanh dung dịch NaCl 0.9% kèm Glucose 5% 1000 mL trong giờ đầu (tổng 2-3 Lít trong vài giờ đầu)',
        'Duy trì Hydrocortisone 200mg/24h (chia 50mg mỗi 6h hoặc truyền tĩnh mạch liên tục 8.3 mg/h)',
        'Xử trí hạ đường huyết bằng truyền Glucose 10-20% và xử trí tăng Kali máu nếu có biến đổi ECG'
      ],
      firstLineDrugs: [
        { drugName: 'Hydrocortisone (Solu-Cortef)', class: 'Glucocorticoid tác dụng nhanh bổ sung hormon thay thế', route: 'Tiêm TM / Truyền TM', dosage: 'Bolus 100mg TM ngay, sau đó 50mg mỗi 6 giờ (hoặc truyền liên tục 200mg/24h)', frequency: 'Mỗi 6 giờ', instructions: 'Thuốc cấp cứu sống còn số 1, tiêm ngay không trì hoãn', isFirstLine: true },
        { drugName: 'Natri Clorid 0.9% + Glucose 5%', class: 'Dung dịch bù nước, điện giải và nâng đường huyết', route: 'Truyền tĩnh mạch', dosage: '1000 mL giờ đầu, sau đó 250 - 500 mL/giờ theo đáp ứng huyết động', frequency: 'Liên tục', instructions: 'Vừa nâng huyết áp vừa cung cấp glucose ngăn ngừa hạ đường huyết', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Fludrocortisone (Florinef)', class: 'Mineralocorticoid bổ sung (chỉ cần trong suy thượng thận nguyên phát khi đã giảm liều Hydrocortisone < 50mg/ngày)', route: 'Uống', dosage: '0.05 - 0.1 mg/ngày', frequency: '1 lần/ngày vào buổi sáng', instructions: 'Không cần dùng trong giai đoạn cấp cứu liều cao Hydrocortisone (do Hydrocortisone liều cao đã có hoạt tính mineralocorticoid đủ)', isFirstLine: false }
      ],
      supportiveCare: ['Tìm và điều trị triệt để yếu tố thúc đẩy (Nhiễm trùng, chấn thương, phẫu thuật, viêm dạ dày ruột)', 'Giảm liều Hydrocortisone dần sau 24-48h khi bệnh nhân ăn uống được và chuyển sang liều uống duy trì', 'Cấp Thẻ Cảnh Báo Suy Thượng Thận (Medical Alert Card) và hướng dẫn tăng gấp đôi liều khi bị ốm (Sick-day rules)']
    },
    complications: [
      { name: 'Sốc mất trương lực mạch kháng trị & Suy tuần hoàn tử vong', timeframe: 'acute_24h', warningSigns: 'Huyết áp tiếp tục tụt sâu dù đã truyền nhiều Lít dịch và dùng Noradrenaline liều cao', preventiveAction: 'Tiêm lặp lại Hydrocortisone 100mg TM + Tăng tốc độ bù dịch NaCl 0.9%', onCallAlertText: 'BÁO ĐỘNG SỐC KHÁNG VẬN MẠCH: Nghi ngờ suy thượng thận cấp ➔ Tiêm ngay Hydrocortisone 100mg TM' },
      { name: 'Hủy myelin cầu não (Osmotic Demyelination Syndrome) do nâng Natri quá nhanh', timeframe: 'subacute_7d', warningSigns: 'Liệt tứ chi, rối loạn phát âm, nuốt khó sau khi điều chỉnh hạ natri máu', preventiveAction: 'Kiểm soát tốc độ tăng Natri máu không quá 8 - 10 mEq/L trong 24 giờ đầu', onCallAlertText: 'Cảnh báo tăng Natri máu quá nhanh: Kiểm tra điện giải đồ mỗi 4-6 giờ' }
    ],
    monitoringLabs: ['Điện giải đồ (Na+, K+, Cl-) mỗi 4-6 giờ trong 24h đầu', 'Đường huyết mao mạch mỗi 2-4 giờ', 'Đo Cortisol máu và ACTH máu trước liều Hydrocortisone đầu tiên (nếu điều kiện cho phép, nhưng không được trì hoãn tiêm thuốc)'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Tụt Huyết Áp Nghi Ngờ Suy Thượng Thận Cấp', searchKeyword: 'tiếp cận suy thượng thận cấp' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán Suy Thượng Thận & Nghiệm Pháp Kích Thích ACTH', searchKeyword: 'tiêu chuẩn suy thượng thận synacthen' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Định lượng Cortisol Máu, ACTH & Đọc Rối Loạn Điện Giải', searchKeyword: 'cortisol máu acth điện giải' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Cấp Cứu Hydrocortisone & Hồi Sức Dịch Endocrine Society', searchKeyword: 'phác đồ hydrocortisone cấp cứu' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Quy tắc Tăng Liều Khi Ốm (Sick-Day Rules) & Liều Hydrocortisone Duy Trì', searchKeyword: 'sick day rules hydrocortisone fludrocortisone' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Dự phòng Hội Chứng Hủy Myelin Cầu Não khi Hiệu Chỉnh Hạ Natri', searchKeyword: 'hủy myelin cầu não hạ natri' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 19. VIÊM RUỘT THỪA CẤP (ACUTE APPENDICITIS)
  // ──────────────────────────────────────────────────────────────────────────
  'viem_ruot_thua_cap': {
    icdCode: 'K35.8',
    icdPrefixes: ['K35'],
    diseaseName: 'Viêm ruột thừa cấp (Acute Appendicitis)',
    specialty: 'Ngoại tiêu hóa & Cấp cứu',
    severity: 'urgent',
    summary: 'Cấp cứu bụng ngoại khoa phổ biến nhất do tắc nghẽn lòng ruột thừa dẫn đến viêm, thiếu máu cục bộ, hoại tử và nguy cơ vỡ gây viêm phúc mạc.',
    goldStandard: 'Siêu âm ổ bụng hoặc Chụp CT bụng có cản quang thấy ruột thừa đường kính > 6mm, thành dày > 2mm, thâm nhiễm mỡ xung quanh (hoặc giải phẫu bệnh sau mổ).',
    criteriaRule: {
      mandatoryIds: ['app_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Đau hố chậu phải khu trú (hoặc đau chuyển từ thượng vị xuống hố chậu phải) + Điểm Alvarado ≥ 7 điểm (hoọc AIR score ≥ 5) hoặc Hình ảnh học khẳng định trên Siêu âm/CT.'
    },
    criteria: [
      { id: 'app_crit_1', type: 'mandatory', label: 'Đau khu trú tại hố chậu phải với điểm đau MacBurney (+)', description: 'Đau âm ỉ bắt đầu quanh rốn/thượng vị rồi di chuyển và khu trú tại hố chậu phải sau 4-12 giờ.' },
      { id: 'app_crit_2', type: 'major', label: 'Dấu hiệu kích thích phúc mạc tại hố chậu phải', description: 'Phản ứng dội Blumberg (+), Đề kháng thành bụng (Guarding), Dấu hiệu Rovsing (+), Dấu cơ thắt lưng chậu (Psoas sign) (+).' },
      { id: 'app_crit_3', type: 'major', label: 'Thang điểm Alvarado Score ≥ 7 điểm hoặc AIR (Appendicitis Inflammatory Response) Score ≥ 5 điểm', description: 'Dự báo xác suất cao viêm ruột thừa cấp cần can thiệp phẫu thuật.', labThreshold: 'Alvarado ≥ 7/10' },
      { id: 'app_crit_4', type: 'imaging', label: 'Siêu âm bụng / CT Scanner bụng phát hiện ruột thừa viêm', description: 'Ruột thừa không xẹp khi đè ép, đường kính ngoài > 6mm, thành dày > 2-3mm, có sỏi phân (Appendicolith) hoặc thâm nhiễm mỡ.', labThreshold: 'Đường kính ruột thừa > 6mm' },
      { id: 'app_crit_5', type: 'lab', label: 'Bạch cầu máu tăng với chuyển trái và CRP tăng', description: 'Bạch cầu > 10.000/uL với Neutrophil > 75%, CRP tăng cao.', labThreshold: 'Bạch cầu > 10.000/uL, Neutrophil > 75%' }
    ],
    protocol: {
      title: 'Phác đồ Phẫu Thuật Nội Soi Cắt Ruột Thừa & Kháng Sinh WSES 2020',
      guideline: 'World Society of Emergency Surgery (WSES Guidelines on Acute Appendicitis 2020) & Hướng dẫn Bộ Y tế',
      targetGoals: ['Phẫu thuật cắt ruột thừa nội soi sớm trong vòng 12-24 giờ để tránh vỡ', 'Kiểm soát nhiễm trùng ổ bụng bằng kháng sinh dự phòng/điều trị', 'Phục hồi nhu động ruột sớm sau mổ (ERAS)'],
      initialManagement: [
        'Nhịn ăn uống hoàn toàn (NPO), đặt đường truyền tĩnh mạch bù dịch Ringer Lactate',
        'Khám bụng ngoại khoa và hội chẩn Phẫu thuật viên Tiêu hóa khẩn cấp',
        'Cho thuốc giảm đau Paracetamol TM (Lưu ý: Giảm đau không làm mờ dấu hiệu lâm sàng theo khuyến cáo hiện đại)',
        'Dùng kháng sinh tĩnh mạch dự phòng trước rạch da 30-60 phút'
      ],
      firstLineDrugs: [
        { drugName: 'Cefoxitin hoặc Cefuroxime + Metronidazole', class: 'Kháng sinh Cephalosporin + Chống kỵ khí', route: 'Tiêm/Truyền TM', dosage: 'Cefuroxime 1.5g TM + Metronidazole 500mg TM trước mổ', frequency: 'Trước phẫu thuật', instructions: 'Tiêm 30-60 phút trước khi bắt đầu phẫu thuật', isFirstLine: true },
        { drugName: 'Paracetamol (Perfalgan)', class: 'Thuốc hạ sốt giảm đau truyền tĩnh mạch', route: 'Truyền tĩnh mạch', dosage: '1000 mg truyền trong 15 phút', frequency: 'Mỗi 6 giờ khi đau', instructions: 'Giảm đau an toàn trước và sau mổ', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Ciprofloxacin + Metronidazole', class: 'Kháng sinh thay thế ở bệnh nhân dị ứng Penicillin', route: 'Truyền tĩnh mạch', dosage: 'Ciprofloxacin 400mg TM + Metronidazole 500mg TM', frequency: 'Mỗi 12 giờ', instructions: 'Chỉ định khi có tiền sử sốc phản vệ với nhóm Beta-lactam', isFirstLine: false }
      ],
      supportiveCare: ['Phẫu thuật cắt ruột thừa nội soi (Laparoscopic Appendectomy) là tiêu chuẩn vàng', 'Vận động sớm sau mổ 6-12 giờ và ăn nhẹ khi có trung tiện', 'Theo dõi dẫn lưu ổ bụng nếu có viêm ruột thừa vỡ']
    },
    complications: [
      { name: 'Viêm ruột thừa vỡ mủ & Viêm phúc mạc toàn thể', timeframe: 'acute_24h', warningSigns: 'Đau bụng lan tỏa khắp bụng, bụng gồng cứng như gỗ (Board-like rigidity), sốt cao rét run, mạch nhanh tụt HA', preventiveAction: 'Phẫu thuật mổ cấp cứu khẩn cấp + Rửa ổ bụng sạch + Kháng sinh phổ rộng bao phủ vi khuẩn ruột', onCallAlertText: 'BÁO ĐỘNG BỤNG NGOẠI KHOA: Bụng cứng như gỗ, nghi vỡ ruột thừa ➔ Gọi Bác sĩ Ngoại mổ cấp cứu' },
      { name: 'Áp xe ruột thừa / Đám quánh ruột thừa', timeframe: 'subacute_7d', warningSigns: 'Đau giảm nhưng sờ thấy khối chắc đau ở hố chậu phải sau 3-5 ngày, sốt dai dẳng', preventiveAction: 'Kháng sinh phổ rộng đường TM + Chọc hút dẫn lưu mủ dưới hướng dẫn siêu âm/CT + Hẹn mổ phiên sau 8-12 tuần', onCallAlertText: 'Phát hiện đám quánh/áp xe ruột thừa: Siêu âm kiểm tra và hội chẩn điều trị bảo tồn' }
    ],
    monitoringLabs: ['Bạch cầu máu và CRP theo dõi đáp ứng viêm sau mổ', 'Theo dõi dấu hiệu sinh tồn và tình trạng bụng mỗi 4-6 giờ'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Đau Bụng Cấp Hố Chậu Phải & Thang Điểm Alvarado', searchKeyword: 'đau hố chậu phải alvarado ruột thừa' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán & Phân độ Viêm Ruột Thừa WSES 2020', searchKeyword: 'tiêu chuẩn viêm ruột thừa wses' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Hình Ảnh Siêu Âm & CT Scanner trong Viêm Ruột Thừa Cấp', searchKeyword: 'siêu âm ct ruột thừa' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Quy Trình Phẫu Thuật Nội Soi Cắt Ruột Thừa & Kháng Sinh Dự Phòng', searchKeyword: 'phẫu thuật nội soi cắt ruột thừa' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Lựa chọn Kháng sinh Dự phòng Phẫu thuật Tiêu hóa', searchKeyword: 'kháng sinh dự phòng phẫu thuật' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Viêm Phúc Mạc Toàn Thể & Áp Xe Ruột Thừa', searchKeyword: 'viêm phúc mạc áp xe ruột thừa' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 20. SỎI MẬT & VIÊM TÚI MẬT CẤP (ACUTE CHOLECYSTITIS)
  // ──────────────────────────────────────────────────────────────────────────
  'viem_tui_mat_cap': {
    icdCode: 'K80.0',
    icdPrefixes: ['K80', 'K81', 'K83'],
    diseaseName: 'Sỏi mật & Viêm túi mật cấp (Acute Cholecystitis)',
    specialty: 'Ngoại tiêu hóa & Gan mật',
    severity: 'urgent',
    summary: 'Tình trạng viêm cấp tính của thành túi mật, thường do sỏi mật gây tắc nghẽn ống túi mật dẫn đến ứ trệ dịch mật và nhiễm trùng thứ phát.',
    goldStandard: 'Siêu âm gan mật hoặc Chụp MRI/CT bụng thấy thành túi mật dày > 4mm, dấu hiệu Murphy siêu âm (+), sỏi kẹt cổ túi mật hoặc dịch quanh túi mật (Tiêu chuẩn Tokyo Guidelines TG18).',
    criteriaRule: {
      mandatoryIds: ['chole_crit_1', 'chole_crit_2'],
      ruleDescription: 'Bắt buộc thỏa mãn Tiêu chuẩn Tokyo TG18: [A] Dấu hiệu viêm tại chỗ (Murphy + / Đau hạ sườn phải) + [B] Dấu hiệu viêm toàn thân (Sốt / Bạch cầu tăng) + [C] Hình ảnh học túi mật viêm.'
    },
    criteria: [
      { id: 'chole_crit_1', type: 'mandatory', label: 'Dấu hiệu viêm tại chỗ vùng túi mật: Dấu hiệu Murphy dương tính (+) hoặc đau tức hạ sườn phải', description: 'Bệnh nhân ngừng thở hít vào do đau khi bác sĩ ấn sâu vào vùng dưới sườn phải (Dấu Murphy).' },
      { id: 'chole_crit_2', type: 'mandatory', label: 'Dấu hiệu viêm toàn thân: Sốt (> 38°C) hoặc Bạch cầu tăng (> 10.000/uL) hoặc CRP tăng', description: 'Phản ứng viêm toàn thân của cơ thể.', labThreshold: 'Bạch cầu > 10.000/uL hoặc CRP > 10 mg/L' },
      { id: 'chole_crit_3', type: 'imaging', label: 'Siêu âm gan mật có hình ảnh viêm túi mật cấp (Tiêu chuẩn TG18)', description: 'Thành túi mật dày > 4mm, có sỏi kẹt cổ/ống túi mật, túi mật căng to (> 8x4 cm), dịch quanh túi mật.', labThreshold: 'Thành túi mật > 4mm' },
      { id: 'chole_crit_4', type: 'major', label: 'Cơn đau quặn mật điển hình', description: 'Đau quặn dữ dội hạ sườn phải sau bữa ăn nhiều dầu mỡ, lan lên vai phải hoặc vùng liên bả vai.' },
      { id: 'chole_crit_5', type: 'lab', label: 'Tăng men gan ứ mật Bilirubin, GGT, Alkaline Phosphatase', description: 'Chỉ dấu gợi ý sỏi ống mật chủ phối hợp hoặc hội chứng Mirizzi.', labThreshold: 'Bilirubin toàn phần > 2 mg/dL' }
    ],
    protocol: {
      title: 'Phác đồ Phân Tầng Độ Nặng & Phẫu Thuật Cắt Túi Mật (Tokyo Guidelines TG18)',
      guideline: 'Tokyo Guidelines 2018 (TG18) for acute cholecystitis and cholangitis & Phác đồ Bộ Y tế',
      targetGoals: ['Phẫu thuật cắt túi mật nội soi sớm trong vòng 72 giờ đầu (Early Laparoscopic Cholecystectomy)', 'Kiểm soát nhiễm trùng đường mật bằng kháng sinh', 'Dẫn lưu túi mật qua da (PTGBD) nếu bệnh nhân nặng không đủ điều kiện phẫu thuật'],
      initialManagement: [
        'Nhịn ăn uống, đặt đường truyền tĩnh mạch bù dịch tinh thể Ringer Lactate',
        'Dùng thuốc giảm đau chống co thắt cơ trơn (Drotaverin / Hyoscine) hoặc NSAIDs tiêm TM',
        'Khởi động kháng sinh tĩnh mạch phổ rộng Gram âm và vi khuẩn đường ruột (Cephalosporin thế hệ 3 + Metronidazole)',
        'Phân độ nặng TG18: Độ I (Nhẹ) ➔ Mổ nội soi sớm; Độ II (Trung bình) ➔ Mổ nội soi khẩn; Độ III (Nặng có suy tạng) ➔ Hồi sức + Dẫn lưu túi mật PTGBD'
      ],
      firstLineDrugs: [
        { drugName: 'Ceftriaxone hoặc Cefotaxime + Metronidazole', class: 'Kháng sinh Cephalosporin thế hệ 3 + Chống kỵ khí', route: 'Tiêm/Truyền TM', dosage: 'Ceftriaxone 2g/ngày + Metronidazole 500mg mỗi 8 giờ', frequency: 'Theo kháng sinh', instructions: 'Thải trừ tốt qua đường mật, kiểm soát vi khuẩn E. coli, Klebsiella', isFirstLine: true },
        { drugName: 'Drotaverine (Nospa) hoặc Paracetamol TM', class: 'Thuốc giảm co thắt cơ trơn đường mật & Giảm đau', route: 'Tiêm TM', dosage: 'Drotaverine 40mg TM hoặc Paracetamol 1g truyền TM', frequency: 'Mỗi 6-8 giờ khi đau', instructions: 'Giảm đau quặn mật hiệu quả', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Piperacillin/Tazobactam hoặc Meropenem', class: 'Kháng sinh phổ rộng cho Viêm túi mật nặng (TG18 Grade III)', route: 'Truyền tĩnh mạch', dosage: 'Piperacillin/Tazobactam 4.5g mỗi 6h hoặc Meropenem 1g mỗi 8h', frequency: 'Mỗi 6-8 giờ', instructions: 'Chỉ định khi có nhiễm trùng đường mật nặng hoặc sốc nhiễm trùng', isFirstLine: false }
      ],
      supportiveCare: ['Phẫu thuật cắt túi mật nội soi sớm trong 72h đầu là phương pháp điều trị dứt điểm', 'Chế độ ăn giảm chất béo, kiêng mỡ động vật sau khi ổn định', 'Theo dõi ống dẫn lưu Kehr nếu có mở ống mật chủ lấy sỏi']
    },
    complications: [
      { name: 'Thủng túi mật & Viêm phúc mạc mật toàn thể', timeframe: 'acute_24h', warningSigns: 'Đau bụng dữ dội lan khắp ổ bụng, đề kháng toàn bụng, sốt cao rét run, huyết áp tụt', preventiveAction: 'Phẫu thuật cấp cứu mổ mở/nội soi khẩn cấp dẫn lưu ổ bụng + Kháng sinh liều cao', onCallAlertText: 'BÁO ĐỘNG THỦNG TÚI MẬT: Bụng gồng cứng, sốt cao ➔ Báo kíp phẫu thuật mổ cấp cứu' },
      { name: 'Viêm đường mật cấp nhiễm trùng (Acute Cholangitis - Tam chứng Charcot / Ngũ chứng Reynolds)', timeframe: 'acute_24h', warningSigns: 'Tam chứng Charcot: Đau hạ sườn phải + Sốt cao rét run + Vàng da niêm vàng mắt; Ngũ chứng Reynolds: Kèm tụt HA và lú lẫn', preventiveAction: 'Nội soi mật tụy ngược dòng ERCP khẩn cấp đặt stent giải áp đường mật + Kháng sinh phổ rộng', onCallAlertText: 'TAM CHỨNG CHARCOT / VIÊM ĐƯỜNG MẬT: Sốt rét run, vàng da ➔ Chuyển làm ERCP cấp cứu' }
    ],
    monitoringLabs: ['Bilirubin toàn phần / trực tiếp, AST, ALT, GGT, ALP mỗi 24-48 giờ', 'Bạch cầu máu và CRP theo dõi đáp ứng điều trị kháng sinh', 'Siêu âm gan mật kiểm tra kích thước đường mật trong và ngoài gan'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Đau Hạ Sườn Phải & Vàng Da Ứ Mật', searchKeyword: 'tiếp cận đau hạ sườn phải vàng da' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán & Phân độ Tokyo Guidelines TG18 Viêm Túi Mật', searchKeyword: 'tiêu chuẩn tokyo tg18 viêm túi mật' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Siêu Âm Gan Mật, Chụp Cắt Lớp Vi Tính & Chụp Cộng Hưởng Từ MRCP', searchKeyword: 'siêu âm gan mật mrcp sỏi mật' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Cắt Túi Mật Nội Soi & Can Thiệp ERCP Lấy Sỏi Ống Mật Chủ', searchKeyword: 'phác đồ cắt túi mật nội soi ercp' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Kháng sinh Bài tiết qua Đường mật & Thuốc Tan Sỏi Acid Ursodeoxycholic', searchKeyword: 'kháng sinh đường mật ursodeoxycholic' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Viêm Đường Mật Cấp Nhiễm Trùng & Thủng Túi Mật', searchKeyword: 'viêm đường mật cấp tam chứng charcot' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 21. NHIỄM TRÙNG ĐƯỜNG TIẾT NIỆU & VIÊM ĐÀI BỂ THẬN (UTI)
  // ──────────────────────────────────────────────────────────────────────────
  'nhiem_trung_tiet_nieu': {
    icdCode: 'N39.0',
    icdPrefixes: ['N39.0', 'N10', 'N30'],
    diseaseName: 'Nhiễm trùng đường tiết niệu & Viêm đài bể thận (UTI / Pyelonephritis)',
    specialty: 'Thận - Tiết niệu & Truyền nhiễm',
    severity: 'urgent',
    summary: 'Tình trạng nhiễm khuẩn của hệ tiết niệu, phân chia thành nhiễm trùng tiểu dưới (viêm bàng quang) và nhiễm trùng tiểu trên (viêm đài bể thận cấp).',
    goldStandard: 'Cấy nước tiểu giữa dòng (Urine Culture) dương tính với vi khuẩn ≥ 10^5 CFU/mL (hoặc ≥ 10^4 CFU/mL ở phụ nữ có triệu chứng) kèm Bạch cầu niệu (+).',
    criteriaRule: {
      mandatoryIds: ['uti_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Hội chứng bàng quang (Tiểu buốt, tiểu rắt, tiểu nhiều lần) hoặc Đau hông lưng sốt cao + Tổng phân tích nước tiểu có Bạch cầu niệu / Nitrite (+).'
    },
    criteria: [
      { id: 'uti_crit_1', type: 'mandatory', label: 'Tổng phân tích nước tiểu có Bạch cầu niệu (Leukocyte Esterase +) và/hoặc Nitrite dương tính (+)', description: 'Chỉ dấu hiện diện của bạch cầu và vi khuẩn khử nitrat trong nước tiểu.', labThreshold: 'Bạch cầu niệu > 10-25 tế bào/uL' },
      { id: 'uti_crit_2', type: 'major', label: 'Hội chứng kích thích bàng quang (Hội chứng niệu đạo cấp)', description: 'Tiểu buốt rát, tiểu rắt nhiều lần, tiểu gấp mót rặn, cảm giác buốt dọc niệu đạo, nước tiểu đục hoặc có mùi hôi.' },
      { id: 'uti_crit_3', type: 'major', label: 'Dấu hiệu viêm đài bể thận cấp: Sốt cao rét run kèm đau hông lưng, dấu rung thận (+)', description: 'Khẳng định nhiễm trùng tiểu trên (Viêm thận bể thận cấp).' },
      { id: 'uti_crit_4', type: 'lab', label: 'Cấy nước tiểu định danh vi khuẩn và làm kháng sinh đồ', description: 'Vi khuẩn phân lập phổ biến nhất là E. coli (> 80%), Klebsiella, Proteus, Enterococcus.', labThreshold: 'Khuẩn lạc ≥ 10^5 CFU/mL' },
      { id: 'uti_crit_5', type: 'imaging', label: 'Siêu âm hệ tiết niệu phát hiện ứ nước đài bể thận, sỏi niệu hoặc dày thành bàng quang', description: 'Tầm soát yếu tố thuận lợi nhiễm trùng tiểu có biến chứng.' }
    ],
    protocol: {
      title: 'Phác đồ Điều Trị Nhiễm Trùng Tiểu & Viêm Đài Bể Thận Cấp (EAU / IDSA Guidelines)',
      guideline: 'European Association of Urology (EAU Guidelines on Urological Infections 2024) & Phác đồ Bộ Y tế',
      targetGoals: ['Tiêu diệt vi khuẩn gây bệnh, dứt điểm triệu chứng tiểu buốt rắt', 'Phòng ngừa vi khuẩn lan tràn vào máu gây Sốc nhiễm khuẩn đường niệu (Urosepsis)', 'Phát hiện và giải quyết dị tật bẩm sinh hoặc sỏi gây tắc nghẽn đường tiểu'],
      initialManagement: [
        'Uống nhiều nước (> 2 - 2.5 Lít/ngày) để tăng lượng nước tiểu rửa trôi vi khuẩn',
        'Lấy mẫu nước tiểu giữa dòng làm Tổng phân tích và Cấy vi khuẩn TRƯỚC KHI dùng kháng sinh',
        'Khởi động kháng sinh theo kinh nghiệm: Nitrofurantoin / Fosfomycin cho viêm bàng quang; Ceftriaxone / Fluoroquinolone cho viêm đài bể thận',
        'Giảm đau chống co thắt bàng quang và hạ sốt nếu có sốt cao'
      ],
      firstLineDrugs: [
        { drugName: 'Ceftriaxone hoặc Cefotaxime', class: 'Kháng sinh Cephalosporin thế hệ 3 điều trị Viêm đài bể thận', route: 'Tiêm TM', dosage: 'Ceftriaxone 1 - 2g tiêm TM mỗi 24 giờ trong 7 - 10 ngày', frequency: '1 lần/ngày', instructions: 'Lựa chọn hàng đầu cho viêm đài bể thận cấp nhập viện', isFirstLine: true },
        { drugName: 'Nitrofurantoin hoặc Ciprofloxacin', class: 'Kháng sinh đường tiết niệu', route: 'Uống', dosage: 'Nitrofurantoin 100mg x 2 lần/ngày (trong 5 ngày) hoặc Ciprofloxacin 500mg x 2 lần/ngày (trong 7 ngày)', frequency: '2 lần/ngày', instructions: 'Nitrofurantoin chỉ dùng cho viêm bàng quang (không dùng cho viêm đài bể thận)', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Fosfomycin Trometamol', class: 'Kháng sinh diệt khuẩn liều duy nhất cho Viêm bàng quang đơn thuần', route: 'Uống', dosage: '3g gói pha nước uống liều duy nhất', frequency: '1 lần duy nhất', instructions: 'Uống vào buổi tối trước khi đi ngủ sau khi đã đi tiểu', isFirstLine: false }
      ],
      supportiveCare: ['Vệ sinh sạch sẽ vùng sinh dục, đi tiểu ngay sau khi quan hệ', 'Tránh nhịn tiểu lâu', 'Tái khám và cấy lại nước tiểu sau khi kết thúc đợt kháng sinh nếu triệu chứng dai dẳng']
    },
    complications: [
      { name: 'Sốc nhiễm khuẩn từ đường tiết niệu (Urosepsis)', timeframe: 'acute_24h', warningSigns: 'Sốt rét run dữ dội, tụt huyết áp < 90/60 mmHg, mạch nhanh, da tái, thở nhanh, thiểu niệu', preventiveAction: 'Cấy máu + Chuyển ngay kháng sinh phổ rộng Carbapenem + Hồi sức dịch và vận mạch Noradrenaline', onCallAlertText: 'BÁO ĐỘNG UROSEPSIS: Nhiễm trùng tiểu có tụt huyết áp ➔ Hồi sức sốc nhiễm khuẩn ngay' },
      { name: 'Áp xe thận / Áp xe quanh thận do sỏi tắc nghẽn', timeframe: 'subacute_7d', warningSigns: 'Sốt cao liên tục không hạ dù đã dùng kháng sinh đúng sau 72 giờ, đau hông lưng tăng', preventiveAction: 'Chụp CT Scanner bụng có cản quang + Chọc hút dẫn lưu mủ qua da dưới hướng dẫn siêu âm', onCallAlertText: 'Viêm đài bể thận điều trị 72h không đỡ: Chụp CT tìm ổ áp xe thận' }
    ],
    monitoringLabs: ['Tổng phân tích nước tiểu và cấy nước tiểu', 'Công thức máu, CRP, Creatinine máu đánh giá chức năng thận', 'Siêu âm ổ bụng kiểm tra ứ nước thận và sỏi niệu'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Hội Chứng Tiểu Buốt, Tiểu Rắt & Đau Hông Lưng', searchKeyword: 'tiếp cận tiểu buốt tiểu rắt' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán Nhiễm Trùng Tiểu Có Biến Chứng & Viêm Đài Bể Thận', searchKeyword: 'tiêu chuẩn nhiễm trùng tiểu eau' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Đọc Tổng Phân Tích Nước Tiểu 10 Thông Số & Cấy Vi Khuẩn', searchKeyword: 'tổng phân tích nước tiểu cấy vi khuẩn' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Kháng Sinh Điều Trị UTI & Viêm Đài Bể Thận Cấp EAU 2024', searchKeyword: 'phác đồ kháng sinh uti viêm đài bể thận' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Dược thư Kháng sinh Tiết niệu Nitrofurantoin, Fosfomycin, Ceftriaxone', searchKeyword: 'kháng sinh nitrofurantoin fosfomycin' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Urosepsis & Áp Xe Thận Quanh Thận', searchKeyword: 'urosepsis áp xe thận' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 22. VIÊM MÀNG NÃO MỦ & VIÊM NÃO CẤP (MENINGITIS)
  // ──────────────────────────────────────────────────────────────────────────
  'viem_mang_nao_mu': {
    icdCode: 'G00.9',
    icdPrefixes: ['G00', 'G03', 'G04'],
    diseaseName: 'Viêm màng não mủ & Viêm não cấp (Bacterial Meningitis)',
    specialty: 'Truyền nhiễm & Thần kinh',
    severity: 'emergency',
    summary: 'Tình trạng nhiễm trùng mủ cấp tính của màng não và khoang dưới nhện, là cấp cứu thần kinh tối khẩn có tỷ lệ tử vong và di chứng tàn tật cao.',
    goldStandard: 'Chọc dò dịch não tủy (CSF Analysis): Dịch đục/mủ, Áp lực mở tăng > 200 mmH2O, Bạch cầu đa nhân thoái hóa tăng cao (> 1000/uL), Protein tăng (> 1 g/L), Glucose DNT / Glucose máu < 0.4, Soi/Cấy DNT phân lập vi khuẩn.',
    criteriaRule: {
      mandatoryIds: ['mening_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Hội chứng màng não (Cổ cứng, Kernig +, Brudzinski +) + Sốt cao cấp tính + Biến đổi dịch não tủy điển hình của viêm màng não mủ.'
    },
    criteria: [
      { id: 'mening_crit_1', type: 'mandatory', label: 'Hội chứng màng não lâm sàng: Dấu hiệu Cổ cứng (+), Dấu Kernig (+), Dấu Brudzinski (+)', description: 'Dấu hiệu kích thích màng não trực tiếp.', labThreshold: 'Cổ cứng (+), Kernig (+)' },
      { id: 'mening_crit_2', type: 'major', label: 'Sốt cao cấp tính kèm đau đầu dữ dội nôn vọt', description: 'Tam chứng kinh điển: Sốt + Đau đầu dữ dội + Cổ cứng.' },
      { id: 'mening_crit_3', type: 'major', label: 'Biến đổi dịch não tủy (CSF) điển hình của viêm màng não mủ', description: 'Bạch cầu DNT tăng cao > 1000/uL (chủ yếu Neutrophil), Protein DNT tăng > 1.0-5.0 g/L, Tỷ lệ Glucose DNT/Máu < 0.4.', labThreshold: 'CSF WBC > 1000/uL, Protein > 1g/L, CSF/Blood Glucose < 0.4' },
      { id: 'mening_crit_4', type: 'lab', label: 'Soi nhuộm Gram hoặc Cấy / PCR dịch não tủy tìm thấy vi khuẩn gây bệnh', description: 'Phế cầu (S. pneumoniae), Não mô cầu (N. meningitidis), H. influenzae, Listeria monocytogenes.', labThreshold: 'Soi/Cấy DNT (+)' },
      { id: 'mening_crit_5', type: 'minor', label: 'Tử ban xuất huyết hoại tử hình sao (gợi ý nhiễm Não mô cầu)', description: 'Tổn thương da đặc trưng của nhiễm khuẩn huyết do Não mô cầu.' }
    ],
    protocol: {
      title: 'Phác đồ Cấp Cứu Viêm Màng Não Mủ & Dexamethasone (IDSA / ESCMID Guidelines)',
      guideline: 'IDSA Practice Guidelines for Healthcare-Associated and Community Bacterial Meningitis & Phác đồ Bộ Y tế',
      targetGoals: ['Bắt đầu kháng sinh diệt khuẩn liều cao ngấm tốt qua màng não trong vòng 30-60 phút đầu', 'Dùng Dexamethasone TRƯỚC hoặc ĐỒNG THỜI với liều kháng sinh đầu tiên để giảm di chứng điếc và tử vong', 'Kiểm soát phù não và biến chứng tăng áp lực nội sọ'],
      initialManagement: [
        'Đánh giá chỉ định chụp CT sọ não TRƯỚC KHI chọc dò DNT nếu có: Dấu thần kinh khu trú, phù gai thị, lơ mơ sâu (GCS < 10), co giật mới',
        'Nếu cần chụp CT sọ não: Cấy máu ngay và TIÊM KHÁNG SINH + DEXAMETHASONE NGAY LẬP TỨC (không trì hoãn kháng sinh chờ chụp CT/chọc dò)',
        'Dexamethasone 10mg tiêm TM 15-20 phút trước hoặc cùng lúc với liều kháng sinh đầu tiên (tiếp tục 10mg mỗi 6h trong 4 ngày nếu là Phế cầu)',
        'Kháng sinh kinh nghiệm liều cao: Ceftriaxone 2g mỗi 12h + Vancomycin 15-20mg/kg mỗi 8-12h (thêm Ampicillin 2g mỗi 4h nếu tuổi > 50 hoặc suy giảm miễn dịch để diệt Listeria)'
      ],
      firstLineDrugs: [
        { drugName: 'Ceftriaxone', class: 'Cephalosporin thế hệ 3 liều cao ngấm màng não', route: 'Tiêm TM', dosage: '2g tiêm TM mỗi 12 giờ (tổng liều 4g/ngày)', frequency: 'Mỗi 12 giờ', instructions: 'Liều điều trị viêm màng não cao gấp đôi liều thường', isFirstLine: true },
        { drugName: 'Vancomycin', class: 'Kháng sinh Glycopeptide diệt Phế cầu kháng thuốc', route: 'Truyền tĩnh mạch', dosage: '15 - 20 mg/kg mỗi 8-12 giờ (duy trì nồng độ đáy Trough 15-20 mcg/mL)', frequency: 'Mỗi 8-12 giờ', instructions: 'Phối hợp bắt buộc trong điều trị kinh nghiệm viêm màng não mủ', isFirstLine: true },
        { drugName: 'Dexamethasone', class: 'Glucocorticoid chống viêm giảm phù màng não', route: 'Tiêm TM', dosage: '10 mg tiêm TM mỗi 6 giờ trong 4 ngày', frequency: 'Mỗi 6 giờ', instructions: 'Tiêm trước hoặc đồng thời với liều kháng sinh đầu tiên', isFirstLine: true },
        { drugName: 'Ampicillin', class: 'Aminopenicillin diệt Listeria monocytogenes', route: 'Tiêm TM', dosage: '2g tiêm TM mỗi 4 giờ', frequency: 'Mỗi 4 giờ', instructions: 'Bổ sung ở bệnh nhân > 50 tuổi, phụ nữ có thai hoặc suy giảm miễn dịch', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Meropenem', class: 'Carbapenem liều cao ngấm màng não', route: 'Truyền tĩnh mạch', dosage: '2g truyền TM mỗi 8 giờ (truyền kéo dài 3h)', frequency: 'Mỗi 8 giờ', instructions: 'Lựa chọn thay thế khi nghi ngờ vi khuẩn đa kháng hoặc dị ứng Cephalosporin', isFirstLine: false }
      ],
      supportiveCare: ['Nằm phòng yên tĩnh, nâng đầu giường 30 độ để giảm áp lực nội sọ', 'Cách ly hô hấp trong 24h đầu nếu nghi ngờ Não mô cầu', 'Uống thuốc điều trị dự phòng cho người tiếp xúc gần (Rifampicin hoặc Ciprofloxacin liều duy nhất)']
    },
    complications: [
      { name: 'Phù não cấp tính & Tụt kẹt não đe dọa tử vong', timeframe: 'acute_24h', warningSigns: 'Tri giác tụt nhanh, đồng tử giãn một bên mất phản xạ ánh sáng, tam chứng Cushing (HA tăng, mạch chậm, thở ngắt quãng)', preventiveAction: 'Nâng đầu 30 độ, tăng thông khí nhẹ, truyền Mannitol 20% 0.5-1g/kg hoặc NaCl 3%', onCallAlertText: 'BÁO ĐỘNG TỤT NÃO: Giãn đồng tử, hôn mê ➔ Truyền Mannitol 20% cấp cứu và gọi Bác sĩ Hồi sức' },
      { name: 'Di chứng điếc thần kinh giác quan & Dày dính màng não gây não úng thủy', timeframe: 'chronic', warningSigns: 'Giảm thính lực sau điều trị, đau đầu dai dẳng, giãn não thất trên phim MRI', preventiveAction: 'Dùng Dexamethasone sớm đủ 4 ngày + Tái khám thính lực đồ sau khi xuất viện', onCallAlertText: 'Theo dõi thính lực và tri giác của bệnh nhân trước khi xuất viện' }
    ],
    monitoringLabs: ['Xét nghiệm Dịch não tủy lại sau 48h nếu lâm sàng không cải thiện', 'Công thức máu, CRP, Procalcitonin, Điện giải đồ (Natri máu để phát hiện SIADH/CSW)', 'Chụp CT hoặc MRI sọ não kiểm tra biến chứng tụ mủ dưới màng cứng hoặc huyết khối xoang tĩnh mạch não'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Bệnh Nhân Sốt, Đau Đầu & Hội Chứng Màng Não', searchKeyword: 'tiếp cận hội chứng màng não' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Phân Biệt Dịch Não Tủy Viêm Màng Não Mủ, Lao, Virus', searchKeyword: 'phân tích dịch não tủy csf' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Kỹ Thuật Chọc Dò Dịch Não Tủy & Chỉ Định Chụp CT Sọ Não Trước Chọc', searchKeyword: 'kỹ thuật chọc dò tủy sống ct sọ não' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Kháng Sinh Liều Cao & Dexamethasone IDSA 2024', searchKeyword: 'phác đồ viêm màng não mủ idsa' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Dược động học Kháng sinh qua Hàng rào Máu Não (Ceftriaxone, Vancomycin)', searchKeyword: 'kháng sinh hàng rào máu não' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Tụt Não & Di Chứng Mất Thính Lực sau Viêm Màng Não', searchKeyword: 'tụt não di chứng điếc viêm màng não' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 23. RUNG NHĨ & LOẠN NHỊP NHANH (ATRIAL FIBRILLATION)
  // ──────────────────────────────────────────────────────────────────────────
  'rung_nhi': {
    icdCode: 'I48.9',
    icdPrefixes: ['I48'],
    diseaseName: 'Rung nhĩ & Loạn nhịp nhanh (Atrial Fibrillation - AFib)',
    specialty: 'Tim mạch lâm sàng & Loạn nhịp',
    severity: 'urgent',
    summary: 'Rối loạn nhịp tim trên thất phổ biến nhất đặc trưng bởi hoạt động điện học nhĩ hỗn loạn, mất co bóp nhĩ hiệu quả và tăng nguy cơ hình thành huyết khối gây đột quỵ tắc mạch.',
    goldStandard: 'Điện tâm đồ 12 chuyển đạo tiêu chuẩn (hoặc dải nhịp kéo dài ≥ 30 giây) ghi nhận: Khoảng cách R-R hoàn toàn không đều, không có sóng P rõ ràng, thay bằng các sóng lăn tăn f (tần số 300-600 l/p).',
    criteriaRule: {
      mandatoryIds: ['afib_crit_1'],
      ruleDescription: 'Bắt buộc có Bằng chứng ECG ghi nhận Rung nhĩ kéo dài ≥ 30 giây + Đánh giá thang điểm nguy cơ tắc mạch CHA2DS2-VASc và nguy cơ xuất huyết HAS-BLED.'
    },
    criteria: [
      { id: 'afib_crit_1', type: 'mandatory', label: 'Điện tâm đồ 12 chuyển đạo ghi nhận nhịp hoàn toàn không đều (Irregularly irregular) và mất sóng P', description: 'Tiêu chuẩn vàng xác định rung nhĩ trên ECG.', labThreshold: 'ECG 12 chuyển đạo hoặc Holter ≥ 30s' },
      { id: 'afib_crit_2', type: 'major', label: 'Triệu chứng hồi hộp đánh trống ngực, mệt mỏi, khó thở hoặc choáng váng', description: 'Biểu hiện lâm sàng do đáp ứng thất nhanh và mất đóng góp co bóp của tâm nhĩ.' },
      { id: 'afib_crit_3', type: 'major', label: 'Đánh giá nguy cơ đột quỵ tắc mạch theo thang điểm CHA2DS2-VASc', description: 'Nam ≥ 2 điểm, Nữ ≥ 3 điểm: Chỉ định bắt buộc dùng thuốc kháng đông đường uống (OAC).', labThreshold: 'CHA2DS2-VASc ≥ 2 (Nam) / ≥ 3 (Nữ)' },
      { id: 'afib_crit_4', type: 'major', label: 'Đánh giá nguy cơ xuất huyết theo thang điểm HAS-BLED', description: 'Điểm ≥ 3: Nguy cơ xuất huyết cao cần theo dõi sát và điều chỉnh các yếu tố nguy cơ có thể đảo ngược.' },
      { id: 'afib_crit_5', type: 'imaging', label: 'Siêu âm tim qua thành ngực (TTE) hoặc qua thực quản (TEE) đánh giá kích thước nhĩ trái và huyết khối tiểu nhĩ trái', description: 'Tầm soát huyết khối trước khi chuyển nhịp.', labThreshold: 'Nhĩ trái dãn > 40-45 mm' }
    ],
    protocol: {
      title: 'Phác đồ Quản Lý Rung Nhĩ Theo Chiến Lược ABC (ESC 2024 Guidelines)',
      guideline: 'ESC Guidelines for the management of atrial fibrillation 2024 & Phác đồ Hội Tim Mạch Việt Nam',
      targetGoals: ['[A] Anticoagulation: Dự phòng đột quỵ bằng thuốc kháng đông thế hệ mới DOAC', '[B] Better symptom control: Kiểm soát tần số thất (< 110 l/p lúc nghỉ) hoặc Kiểm soát nhịp xoang', '[C] Cardiovascular risk factors: Tối ưu hóa điều trị các bệnh tim mạch đồng mắc'],
      initialManagement: [
        'Nếu huyết động không ổn định (Tụt HA, đau thắt ngực, phù phổi cấp): SỐC ĐIỆN CHUYỂN NHỊP ĐỒNG BỘ CẤP CỨU (100 - 200J Biphasic)',
        'Nếu huyết động ổn định: Khởi đầu chiến lược Kiểm soát tần số thất bằng thuốc Chẹn Beta (Bisoprolol, Metoprolol) hoặc Diltiazem/Verapamil hoặc Digoxin',
        'Tính điểm CHA2DS2-VASc và khởi động thuốc kháng đông đường uống thế hệ mới DOAC (Rivaroxaban, Apixaban, Dabigatran) ưu tiên hơn Kháng Vitamin K',
        'Cân nhắc chuyển nhịp (bằng thuốc Amiodarone/Flecainide hoặc sốc điện) nếu rung nhĩ mới xuất hiện < 48 giờ hoặc đã dùng đủ kháng đông 3 tuần'
      ],
      firstLineDrugs: [
        { drugName: 'Rivaroxaban (Xarelto) hoặc Apixaban (Eliquis)', class: 'Thuốc kháng đông đường uống thế hệ mới ức chế Yếu tố Xa (DOAC)', route: 'Uống', dosage: 'Rivaroxaban 20mg/ngày (chỉnh liều 15mg nếu CrCl 15-49 mL/phút) hoặc Apixaban 5mg x 2 lần/ngày', frequency: 'Rivaroxaban 1 lần/ngày / Apixaban 2 lần/ngày', instructions: 'Kháng đông lựa chọn ưu tiên hàng đầu phòng ngừa đột quỵ trong rung nhĩ không do van tim', isFirstLine: true },
        { drugName: 'Bisoprolol hoặc Metoprolol Succinate', class: 'Chẹn beta chọn lọc Beta-1 kiểm soát tần số thất', route: 'Uống', dosage: 'Bisoprolol 2.5 - 10 mg/ngày hoặc Metoprolol 25 - 100 mg/ngày', frequency: '1 lần/ngày', instructions: 'Mục tiêu đưa tần số tim lúc nghỉ < 100-110 l/phút', isFirstLine: true },
        { drugName: 'Digoxin', class: 'Glycoside trợ tim kiểm soát tần số thất', route: 'Uống/Tiêm TM', dosage: '0.125 - 0.25 mg/ngày', frequency: '1 lần/ngày', instructions: 'Ưu tiên phối hợp khi bệnh nhân rung nhĩ có kèm Suy tim phân suất tống máu giảm (HFrEF)', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Amiodarone (Cordarone)', class: 'Thuốc chống loạn nhịp nhóm III chuyển nhịp và duy trì nhịp xoang', route: 'Uống/Truyền TM', dosage: 'Liều nạp truyền TM 300mg trong 1h, sau đó 900mg/24h hoặc nạp đường uống 600mg/ngày trong 1-2 tuần', frequency: 'Theo phác đồ nạp', instructions: 'Thuốc chuyển nhịp an toàn ở bệnh nhân có suy tim hoặc bệnh tim cấu trúc', isFirstLine: false }
      ],
      supportiveCare: ['Tầm soát và điều trị các nguyên nhân gây khởi phát rung nhĩ (Cường giáp, ngưng thở khi ngủ OSA, lạm dụng rượu)', 'Theo dõi chức năng thận định kỳ để hiệu chỉnh liều DOAC', 'Cân nhắc triệt đốt rung nhĩ qua catheter (Catheter Ablation) nếu triệu chứng kháng thuốc']
    },
    complications: [
      { name: 'Đột quỵ thiếu máu não thuyên tắc do huyết khối từ tâm nhĩ', timeframe: 'acute_24h', warningSigns: 'Yếu liệt nửa người đột ngột, méo miệng, nói ngọng, rối loạn thính giác/thị giác', preventiveAction: 'Dùng kháng đông đường uống DOAC liên tục không ngắt quãng theo đúng chỉ định CHA2DS2-VASc', onCallAlertText: 'Rung nhĩ xuất hiện dấu hiệu thần kinh khu trú: Kích hoạt Code Stroke ngay lập tức' },
      { name: 'Suy tim cấp do nhịp tim quá nhanh (Tachycardiomyopathy)', timeframe: 'subacute_7d', warningSigns: 'Khó thở khi nằm, phù 2 chân, rale ẩm đáy phổi, tần số tim > 130-150 l/p kéo dài', preventiveAction: 'Kiểm soát chặt chẽ tần số thất bằng phối hợp Chẹn Beta + Digoxin', onCallAlertText: 'Rung nhĩ đáp ứng thất nhanh gây suy tim: Dùng thuốc kiểm soát nhịp và hội chẩn Tim mạch' }
    ],
    monitoringLabs: ['Điện tâm đồ 12 chuyển đạo và Holter ECG 24-48 giờ', 'Siêu âm tim Doppler màu đánh giá chức năng thất trái EF và kích thước nhĩ trái', 'Định lượng TSH, FT4 loại trừ cường giáp; Creatinine máu tính độ thanh thải CrCl'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Rối Loạn Nhịp Tim Nhanh & Thang Điểm CHA2DS2-VASc', searchKeyword: 'tiếp cận rung nhĩ cha2ds2 vasc' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán Rung Nhĩ & Phân Loại ESC 2024', searchKeyword: 'tiêu chuẩn rung nhĩ esc' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Đọc Điện Tâm Đồ Rung Nhĩ & Siêu Âm Tim Qua Thực Quản TEE', searchKeyword: 'ecg rung nhĩ siêu âm tim tee' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Chiến Lược ABC Quản Lý Rung Nhĩ & Sốc Điện Chuyển Nhịp', searchKeyword: 'phác đồ rung nhĩ chiến lược abc' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Hướng dẫn Sử dụng Thuốc Kháng Đông DOAC (Rivaroxaban, Apixaban, Dabigatran)', searchKeyword: 'thuốc kháng đông doac noac' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Dự phòng Đột Quỵ Thuyên Tắc & Xuất Huyết Do Kháng Đông', searchKeyword: 'đột quỵ thuyên tắc rung nhĩ has bled' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 24. HẠ NATRI MÁU & RỐI LOẠN ĐIỆN GIẢI (HYPONATREMIA)
  // ──────────────────────────────────────────────────────────────────────────
  'ha_natri_mau': {
    icdCode: 'E87.1',
    icdPrefixes: ['E87.1', 'E87.5', 'E87.6'],
    diseaseName: 'Hạ Natri máu & Rối loạn điện giải (Hyponatremia / SIADH)',
    specialty: 'Thận - Lọc máu & Hồi sức cấp cứu',
    severity: 'urgent',
    summary: 'Rối loạn nước và điện giải phổ biến nhất tại bệnh viện, xác định khi nồng độ Natri huyết thanh < 135 mEq/L, có thể gây ngộ độc nước tế bào não và tử vong.',
    goldStandard: 'Xét nghiệm Điện giải đồ máu: Natri huyết thanh < 135 mEq/L + Định lượng Áp lực thẩm thấu máu (Posm < 275 mOsm/kg) + Áp lực thẩm thấu niệu và Natri niệu phân loại nguyên nhân.',
    criteriaRule: {
      mandatoryIds: ['hypo_na_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Natri máu < 135 mEq/L + Áp lực thẩm thấu máu giảm (Hạ Natri máu nhược trương thực sự) + Đánh giá tình trạng thể tích dịch ngoại bào (Giảm thể tích / Đẳng thể tích / Tăng thể tích).'
    },
    criteria: [
      { id: 'hypo_na_1', type: 'mandatory', label: 'Natri huyết thanh giảm < 135 mEq/L (Hạ nặng khi Na+ < 120-125 mEq/L)', description: 'Xác định tình trạng hạ natri máu.', labThreshold: 'Na+ < 135 mEq/L (Nặng < 120 mEq/L)' },
      { id: 'hypo_na_2', type: 'major', label: 'Áp lực thẩm thấu huyết tương giảm (Posm < 275 mOsm/kg)', description: 'Khẳng định hạ natri máu nhược trương thực sự (loại trừ giả hạ natri do tăng lipid/protein máu hoặc tăng đường huyết).', labThreshold: 'Posm < 275 mOsm/kg' },
      { id: 'hypo_na_3', type: 'major', label: 'Triệu chứng thần kinh của phù não cấp do ngộ độc nước', description: 'Đau đầu, buồn nôn, lú lẫn, co giật, hôn mê, suy hô hấp do thoát vị não (thường gặp khi Na+ giảm nhanh trong < 48 giờ).' },
      { id: 'hypo_na_4', type: 'lab', label: 'Natri niệu (UNa) và Áp lực thẩm thấu niệu (Uosm) phân loại cơ chế', description: 'UNa > 30 mEq/L gợi ý mất muối qua thận hoặc SIADH; UNa < 20 mEq/L gợi ý mất qua đường tiêu hóa hoặc suy tim/xơ gan.', labThreshold: 'UNa > 30 hoặc < 20 mEq/L' },
      { id: 'hypo_na_5', type: 'minor', label: 'Phân loại tình trạng thể tích dịch ngoại bào (ECV)', description: 'Giảm thể tích (Hypovolemic), Đẳng thể tích (Euvolemic - SIADH, suy giáp), Tăng thể tích (Hypervolemic - Suy tim, xơ gan, hội chứng thận hư).' }
    ],
    protocol: {
      title: 'Phác đồ Bù Natri Ưu Trương 3% & Quy Tắc An Toàn Tránh Hủy Myelin (ERA-EDTA / US Guidelines)',
      guideline: 'Clinical practice guideline on diagnosis and treatment of hyponatraemia (European Society of Endocrinology / ERA-EDTA)',
      targetGoals: ['Cắt đứt ngay triệu chứng thần kinh nặng đe dọa tính mạng (co giật, hôn mê)', 'Nâng Natri máu an toàn 4 - 6 mEq/L trong vài giờ đầu khi có triệu chứng nặng', 'QUY TẮC BẤT DI BẤT DỊCH: Tốc độ tăng Na+ KHÔNG VƯỢT QUÁ 8 - 10 mEq/L trong 24 giờ đầu để tránh Hội chứng hủy myelin cầu não (ODS)'],
      initialManagement: [
        'Nếu có triệu chứng thần kinh nặng (Co giật, hôn mê, lơ mơ): TRUYỀN NGAY NATRI CLORID 3% 100-150 mL TRONG 10-20 PHÚT, có thể lặp lại 2 lần đến khi hết triệu chứng hoặc Na+ tăng 5 mEq/L',
        'Nếu không có triệu chứng nặng: Điều trị theo nguyên nhân thể tích:',
        '- Hạ Na+ giảm thể tích ➔ Truyền dung dịch đẳng trương NaCl 0.9%',
        '- Hạ Na+ đẳng thể tích (SIADH) ➔ Hạn chế nước (< 800 - 1000 mL/ngày) + Bổ sung muối viên',
        '- Hạ Na+ tăng thể tích (Suy tim/Xơ gan) ➔ Hạn chế nước + Dùng lợi tiểu quai Furosemide',
        'Kiểm tra Natri máu mỗi 2-4 giờ trong giai đoạn cấp để kiểm soát tốc độ tăng'
      ],
      firstLineDrugs: [
        { drugName: 'Natri Clorid 3% (NaCl 3% Ưu trương)', class: 'Dung dịch muối ưu trương cấp cứu phù não', route: 'Truyền tĩnh mạch', dosage: 'Bolus 100 - 150 mL truyền trong 10-20 phút, lặp lại nếu còn triệu chứng nặng', frequency: 'Khi có triệu chứng thần kinh nặng', instructions: 'Thuốc cấp cứu nguy cơ cao, kiểm soát chặt chẽ tốc độ truyền', isFirstLine: true },
        { drugName: 'Natri Clorid 0.9%', class: 'Dung dịch muối đẳng trương', route: 'Truyền tĩnh mạch', dosage: '0.5 - 1 mL/kg/giờ tùy tình trạng mất nước', frequency: 'Liên tục', instructions: 'Chỉ định cho hạ Natri máu có giảm thể tích tuần hoàn', isFirstLine: true },
        { drugName: 'Furosemide (Lasix)', class: 'Lợi tiểu quai tăng thải nước tự do', route: 'Tiêm TM hoặc Uống', dosage: '20 - 40 mg TM', frequency: 'Mỗi 12-24 giờ', instructions: 'Chỉ định trong hạ Natri máu do SIADH hoặc suy tim/xơ gan tăng thể tích', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Tolvaptan (Samsca)', class: 'Thuốc đối kháng thụ thể Vasopressin V2 (Vaptan)', route: 'Uống', dosage: '15 mg/ngày, có thể tăng lên 30-60 mg/ngày', frequency: '1 lần/ngày', instructions: 'Chỉ định cho SIADH kháng trị hoặc hạ natri do suy tim/xơ gan không đáp ứng hạn chế nước', isFirstLine: false }
      ],
      supportiveCare: ['Hạn chế nước đường uống nghiêm ngặt đối với bệnh nhân SIADH', 'Theo dõi sát lượng nước tiểu (nếu nước tiểu bài niệu ồ ạt > 300-500 mL/h là dấu hiệu nguy cơ tăng Na+ quá tốc độ)', 'Nếu Na+ tăng quá nhanh > 10 mEq/L/24h: Truyền ngay Nước cất pha Glucose 5% hoặc tiêm Desmopressin (DDAVP) để hãm tốc độ']
    },
    complications: [
      { name: 'Hội chứng Hủy Myelin Cầu Não (Osmotic Demyelination Syndrome - ODS / CPM)', timeframe: 'subacute_7d', warningSigns: 'Bệnh nhân tỉnh táo ban đầu sau đó 2-6 ngày xuất hiện liệt tứ chi, liệt hành não, mất ngôn ngữ, hội chứng khóa trong (Locked-in syndrome)', preventiveAction: 'Tuyệt đối không nâng Natri quá 8 mEq/L trong 24h ở người có nguy cơ cao (suy dinh dưỡng, nghiện rượu, hạ kali)', onCallAlertText: 'BÁO ĐỘNG TĂNG NATRI QUÁ TỐC ĐỘ: Na+ tăng > 8 mEq/L trong 24h ➔ Dừng NaCl 3%, truyền Glucose 5% hãm tốc độ' },
      { name: 'Co giật & Tụt kẹt não do phù não cấp tính', timeframe: 'acute_24h', warningSigns: 'Co giật toàn thể, hôn mê sâu, suy hô hấp ngưng thở', preventiveAction: 'Truyền ngay bolus NaCl 3% 100-150mL cấp cứu', onCallAlertText: 'Hạ Natri máu có co giật: Truyền ngay 150mL NaCl 3% trong 15 phút' }
    ],
    monitoringLabs: ['Natri máu kiểm tra mỗi 2 giờ trong khi truyền NaCl 3%, mỗi 4-6 giờ khi tình trạng ổn định', 'Áp lực thẩm thấu máu, Áp lực thẩm thấu niệu, Natri niệu, Kali máu', 'Theo dõi sát bảng cân bằng xuất nhập dịch và lượng nước tiểu mỗi giờ'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Chẩn Đoán Hạ Natri Máu Theo Thể Tích & Áp Lực Thẩm Thấu', searchKeyword: 'tiếp cận hạ natri máu' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán Hội chứng SIADH & Phân Độ Hạ Natri Máu', searchKeyword: 'tiêu chuẩn siadh hạ natri' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Công thức Tính Độ Thiếu Hụt Natri & Tốc Độ Nâng Natri An Toàn', searchKeyword: 'công thức bù natri clorid 3%' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Bù Dung Dịch NaCl 3% Ưu Trương Cấp Cứu ERA-EDTA', searchKeyword: 'phác đồ bù natri 3% era edta' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Sử dụng Thuốc Đối Kháng Thụ Thể Vasopressin Tolvaptan & Desmopressin', searchKeyword: 'tolvaptan desmopressin hạ natri' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Dự phòng & Xử trí Hội Chứng Hủy Myelin Cầu Não ODS', searchKeyword: 'hủy myelin cầu não ods' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 25. VIÊM LOÉT DẠ DÀY TÁ TRÀNG & NHIỄM H. PYLORI (PUD)
  // ──────────────────────────────────────────────────────────────────────────
  'viem_loet_da_day_hp': {
    icdCode: 'K25.9',
    icdPrefixes: ['K25', 'K26', 'K27', 'K29'],
    diseaseName: 'Viêm loét dạ dày tá tràng & Nhiễm H. Pylori (PUD)',
    specialty: 'Tiêu hóa & Nội khoa tổng quát',
    severity: 'routine',
    summary: 'Tổn thương khuyết sâu qua lớp cơ niêm mạc của dạ dày hoặc tá tràng, nguyên nhân chủ yếu do nhiễm vi khuẩn Helicobacter pylori hoặc sử dụng thuốc NSAIDs/Aspirin.',
    goldStandard: 'Nội soi thực quản dạ dày tá tràng (EGD) nhìn thấy ổ loét (đường kính ≥ 5mm) + Test vi khuẩn H. pylori dương tính (Test nhanh Urease RUT / Test thở C13 / Mô bệnh học).',
    criteriaRule: {
      mandatoryIds: ['pud_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Hình ảnh ổ loét trên Nội soi tiêu hóa + Triệu chứng đau bụng vùng thượng vị + Xét nghiệm xác định tình trạng nhiễm H. pylori.'
    },
    criteria: [
      { id: 'pud_crit_1', type: 'mandatory', label: 'Nội soi dạ dày tá tràng phát hiện ổ loét niêm mạc (kích thước ≥ 5mm có đáy phủ giả mạc)', description: 'Chẩn đoán xác định vị trí loét (loét dạ dày, loét hành tá tràng) và sinh thiết loại trừ ung thư ở ổ loét dạ dày.' },
      { id: 'pud_crit_2', type: 'major', label: 'Đau tức, nóng rát hoặc cồn cào vùng thượng vị có tính chất chu kỳ', description: 'Loét tá tràng thường đau lúc đói hoặc ban đêm (ăn vào đỡ đau); Loét dạ dày thường đau tăng sau khi ăn.' },
      { id: 'pud_crit_3', type: 'lab', label: 'Xét nghiệm chẩn đoán nhiễm Helicobacter pylori dương tính', description: 'Test nhanh Urease (CLO test) qua sinh thiết nội soi, Test hơi thở UBT (13C/14C), Kháng nguyên H. pylori trong phân (HpSA).', labThreshold: 'RUT / UBT (+)' },
      { id: 'pud_crit_4', type: 'major', label: 'Tiền sử sử dụng thuốc chống viêm không steroid (NSAIDs), Aspirin hoặc Corticoid kéo dài', description: 'Nguyên nhân hàng đầu gây loét dạ dày không do H. pylori.' },
      { id: 'pud_crit_5', type: 'minor', label: 'Hội chứng khó tiêu chức năng: Đầy bụng, ợ hơi, ợ chua, buồn nôn', description: 'Các triệu chứng đi kèm thường gặp.' }
    ],
    protocol: {
      title: 'Phác đồ Điều Trị Loét & Phác Đồ Diệt Trừ H. Pylori 4 Thuốc Có Bismuth (Maastricht VI / ACG)',
      guideline: 'Management of Helicobacter pylori infection: the Maastricht VI/Florence consensus report & Phác đồ Bộ Y tế',
      targetGoals: ['Làm lành hoàn toàn ổ loét và giảm nhanh triệu chứng đau rát thượng vị', 'Diệt trừ triệt để vi khuẩn H. pylori (tỷ lệ thành công mục tiêu > 90%)', 'Phòng ngừa biến chứng xuất huyết tiêu hóa, thủng ổ loét và hẹp môn vị'],
      initialManagement: [
        'Ngưng sử dụng các thuốc gây tổn thương niêm mạc (NSAIDs, Aspirin) nếu có thể',
        'Sử dụng PPI liều chuẩn 2 lần/ngày trước bữa ăn 30 phút trong 4 - 8 tuần',
        'Nếu có nhiễm H. pylori: Áp dụng Phác đồ 4 thuốc có Bismuth trong 14 ngày (Phác đồ ưu tiên hàng đầu tại Việt Nam do tỷ lệ kháng Clarithromycin cao)',
        'Kiểm tra lại hiệu quả diệt trừ H. pylori bằng Test thở C13 sau khi ngưng kháng sinh tối thiểu 4 tuần và ngưng PPI tối thiểu 2 tuần'
      ],
      firstLineDrugs: [
        { drugName: 'Esomeprazole (Nexium) hoặc Rabeprazole (Pariet)', class: 'Ức chế bơm Proton (PPI) thế hệ mới', route: 'Uống', dosage: '20 - 40 mg x 2 lần/ngày (uống trước ăn sáng và ăn tối 30 phút)', frequency: '2 lần/ngày', instructions: 'Uống nguyên viên, không nhai hoặc nghiền nát', isFirstLine: true },
        { drugName: 'Bismuth Subsalicylate / Subcitrate', class: 'Muối Bismuth bao phủ bảo vệ ổ loét & diệt khuẩn', route: 'Uống', dosage: 'Bismuth 120 - 240 mg x 2-4 lần/ngày trong 14 ngày', frequency: '2 - 4 lần/ngày', instructions: 'Làm phân có màu đen lành tính trong thời gian uống thuốc', isFirstLine: true },
        { drugName: 'Metronidazole (Flagyl) + Tetracycline', class: 'Kháng sinh phối hợp trong phác đồ 4 thuốc có Bismuth', route: 'Uống', dosage: 'Tetracycline 500mg x 4 lần/ngày + Metronidazole 500mg x 3 lần/ngày trong 14 ngày', frequency: 'Theo liều', instructions: 'Uống đủ liệu trình 14 ngày để tránh vi khuẩn kháng thuốc', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Phác đồ 4 thuốc không Bismuth (PPI + Amoxicillin 1g x 2 + Clarithromycin 500mg x 2 + Metronidazole 500mg x 2)', class: 'Phác đồ đồng thời (Concomitant therapy)', route: 'Uống', dosage: 'Uống trong 14 ngày', frequency: '2 lần/ngày', instructions: 'Lựa chọn thay thế nếu bệnh nhân không dung nạp hoặc không có Bismuth', isFirstLine: false }
      ],
      supportiveCare: ['Ăn đúng giờ, không bỏ bữa, hạn chế đồ cay nóng, cà phê, rượu bia', 'Tránh thức khuya và giảm căng thẳng stress thần kinh', 'Nội soi kiểm tra lại ổ loét dạ dày sau 8-12 tuần để xác nhận lành sẹo và sinh thiết kiểm tra']
    },
    complications: [
      { name: 'Xuất huyết tiêu hóa trên do loét dạ dày tá tràng', timeframe: 'acute_24h', warningSigns: 'Nôn ra máu, đi cầu phân đen, hoa mắt chóng mặt, tụt huyết áp', preventiveAction: 'Nội soi can thiệp cầm máu + Dùng PPI liều cao truyền TM', onCallAlertText: 'Loét dạ dày có nôn máu / phân đen: Chuyển cấp cứu nội soi cầm máu' },
      { name: 'Thủng ổ loét dạ dày tá tràng gây viêm phúc mạc', timeframe: 'acute_24h', warningSigns: 'Đau bụng đột ngột dữ dội như dao đâm vùng thượng vị, bụng co cứng như gỗ, X-quang có liềm hơi dưới hoành', preventiveAction: 'Phẫu thuật cấp cứu khâu lỗ thủng ổ loét + Kháng sinh ổ bụng', onCallAlertText: 'BÁO ĐỘNG THỦNG Ổ LOÉT: Đau như dao đâm, liềm hơi dưới hoành ➔ Chuyển mổ cấp cứu' }
    ],
    monitoringLabs: ['Test hơi thở 13C-UBT kiểm tra lại sau khi kết thúc đợt điều trị 4-8 tuần', 'Nội soi dạ dày kiểm tra lại đối với loét dạ dày', 'Công thức máu kiểm tra thiếu máu thiếu sắt mạn tính'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Đau Thượng Vị & Hội Chứng Khó Tiêu Chức Năng', searchKeyword: 'tiếp cận đau thượng vị khó tiêu' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán Loét Dạ Dày Tá Tràng & Khuyến Cáo Đồng Thuận Maastricht VI', searchKeyword: 'tiêu chuẩn loét dạ dày maastricht vi' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Các Phương Pháp Xét Nghiệm Chẩn Đoán H. Pylori (RUT, UBT, Phân, Huyết Thanh)', searchKeyword: 'xét nghiệm chẩn đoán h pylori' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ 4 Thuốc Có Bismuth Diệt Trừ H. Pylori 14 Ngày Hiệu Quả Cao', searchKeyword: 'phác đồ 4 thuốc có bismuth h pylori' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Cơ chế Tác dụng & Cách Uống Đúng của Nhóm Ức Chế Bơm Proton PPI', searchKeyword: 'thuốc ppi esomeprazole rabeprazole' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Thủng Ổ Loét & Hẹp Môn Vị Do Viêm Loét Dạ Dày Tá Tràng', searchKeyword: 'thủng ổ loét hẹp môn vị' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 26. SỐC PHẢN VỆ & PHẢN ỨNG PHẢN VỆ (ANAPHYLAXIS)
  // ──────────────────────────────────────────────────────────────────────────
  'soc_phan_ve': {
    icdCode: 'T78.2',
    icdPrefixes: ['T78.2', 'T78.0'],
    diseaseName: 'Sốc phản vệ & Phản ứng phản vệ (Anaphylaxis)',
    specialty: 'Dị ứng - Miễn dịch & Cấp cứu',
    severity: 'emergency',
    summary: 'Phản ứng quá mẫn toàn thân cấp tính, nặng nề, khởi phát đột ngột và có thể dẫn đến tử vong nhanh chóng do tắc nghẽn đường thở hoặc suy tuần hoàn.',
    goldStandard: 'Tiêu chuẩn chẩn đoán lâm sàng WAO 2020 / Thông tư 51 Bộ Y tế: Xuất hiện đột ngột trong vài phút đến vài giờ sau khi tiếp xúc dị nguyên với tổn thương Da niêm + Ít nhất 1 trong 2 hệ: Hô hấp (Khó thở, thở rít, co thắt) hoặc Tuần hoàn (Tụt huyết áp, ngất).',
    criteriaRule: {
      mandatoryIds: ['anaph_crit_1'],
      ruleDescription: 'Bắt buộc có Triệu chứng khởi phát cấp tính (vài phút đến vài giờ) sau tiếp xúc dị nguyên nghi ngờ với biểu hiện ít nhất 2 trong 4 hệ cơ quan: Da niêm, Hô hấp, Tim mạch, Tiêu hóa (hoặc Tụt HA đơn độc sau tiếp xúc dị nguyên đã biết).'
    },
    criteria: [
      { id: 'anaph_crit_1', type: 'mandatory', label: 'Khởi phát đột ngột sau tiếp xúc dị nguyên (thuốc, thức ăn, nọc côn trùng, vaccine, dịch truyền)', description: 'Thời gian khởi phát từ vài giây, vài phút đến vài giờ.' },
      { id: 'anaph_crit_2', type: 'major', label: 'Tổn thương da và niêm mạc: Mày đay, phù mạch (phù môi, mắt, lưỡi), ngứa, ban đỏ toàn thân', description: 'Có mặt ở > 90% các ca phản vệ.' },
      { id: 'anaph_crit_3', type: 'major', label: 'Triệu chứng hô hấp: Khó thở, khàn tiếng, thở rít thanh quản (Stridor), thở khò khè co thắt phế quản, SpO2 tụt', description: 'Dấu hiệu nguy kịch tắc nghẽn đường thở trên (phù nề thanh môn) hoặc co thắt đường thở dưới.' },
      { id: 'anaph_crit_4', type: 'major', label: 'Triệu chứng tuần hoàn: Tụt huyết áp (HA tâm thu < 90 mmHg hoặc giảm > 30% mức nền), mạch nhanh nhỏ, choáng váng, ngất', description: 'Đặc trưng của Phản vệ Độ III (Nguy kịch / Sốc phản vệ).' },
      { id: 'anaph_crit_5', type: 'minor', label: 'Triệu chứng tiêu hóa: Đau quặn bụng dữ dội, buồn nôn, nôn mửa, tiêu chảy không tự chủ', description: 'Do co thắt cơ trơn đường tiêu hóa.' }
    ],
    protocol: {
      title: 'Phác đồ Cấp Cứu Sốc Phản Vệ Tiêm Bắp Adrenaline (Thông tư 51/2017/TT-BYT & WAO 2020)',
      guideline: 'Thông tư 51/2017/TT-BYT Hướng dẫn phòng, chẩn đoán và xử trí phản vệ & World Allergy Organization (WAO 2020)',
      targetGoals: ['TIÊM BẮP ADRENALINE CÀNG SỚM CÀNG TỐT (Thuốc sống còn duy nhất)', 'Đảm bảo thông thoáng đường thở và cung cấp oxy lưu lượng cao', 'Hồi sức tuần hoàn duy trì huyết áp ổn định'],
      initialManagement: [
        'Ngừng ngay lập tức đường tiếp xúc với dị nguyên nghi ngờ (ngừng truyền thuốc/dịch)',
        'TIÊM BẮP ADRENALINE (Epinephrine) 1:1000 NGAY LẬP TỨC: Người lớn 1/2 ống (0.5mg), Trẻ em 1/5 - 1/3 ống (0.01 mg/kg) vào mặt trước ngoài đùi',
        'Đặt bệnh nhân nằm đầu bằng, kê cao chân (Ngoại trừ trường hợp khó thở thanh quản có thể ngồi)',
        'Thở oxy qua mặt nạ 6-10 Lít/phút',
        'Lập đường truyền tĩnh mạch lớn và truyền nhanh NaCl 0.9% 1000-2000 mL ở người lớn',
        'Nếu sau 3-5 phút huyết áp chưa lên: TIÊM BẮP LẶP LẠI LIỀU ADRENALINE THỨ 2 (có thể tiêm lặp lại mỗi 3-5 phút)'
      ],
      firstLineDrugs: [
        { drugName: 'Adrenaline (Epinephrine) 1mg/1mL (1:1000)', class: 'Thuốc cấp cứu phản vệ sống còn kích thích Alpha & Beta Adrenergic', route: 'Tiêm bắp (vùng mặt trước ngoài đùi)', dosage: 'Người lớn: 0.5 mg (1/2 ống); Trẻ em: 0.01 mg/kg (tối đa 0.3mg)', frequency: 'Lặp lại mỗi 3 - 5 phút nếu chưa hồi phục huyết áp', instructions: 'Tiêm bắp mặt trước ngoài đùi hấp thu nhanh nhất. Tuyệt đối không trì hoãn', isFirstLine: true },
        { drugName: 'Natri Clorid 0.9%', class: 'Dịch truyền tinh thể bù thể tích lòng mạch', route: 'Truyền tĩnh mạch', dosage: 'Truyền nhanh 1000 - 2000 mL trong 30-60 phút đầu', frequency: 'Theo đáp ứng huyết áp', instructions: 'Bù dịch thể tích lớn do dãn mạch và thoát dịch lòng mạch ồ ạt', isFirstLine: true },
        { drugName: 'Diphenhydramine hoặc Dimedrol', class: 'Kháng Histamin H1', route: 'Tiêm bắp hoặc Tiêm TM', dosage: 'Diphenhydramine 25 - 50 mg (Dimedrol 10mg tiêm bắp/TM)', frequency: 'Mỗi 6-8 giờ', instructions: 'Dùng hỗ trợ giảm mày đay ngứa (KHÔNG thay thế được Adrenaline)', isFirstLine: true },
        { drugName: 'Methylprednisolone (Solu-Medrol)', class: 'Corticosteroid phòng ngừa phản vệ pha 2 (Biphasic anaphylaxis)', route: 'Tiêm TM', dosage: 'Người lớn 40 - 80 mg TM; Trẻ em 1-2 mg/kg TM', frequency: 'Mỗi 12 giờ', instructions: 'Tác dụng chậm sau 4-6 giờ, dùng để phòng ngừa phản vệ tái phát muộn', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Adrenaline truyền tĩnh mạch liên tục', class: 'Vận mạch duy trì trong sốc phản vệ kháng tiêm bắp', route: 'Truyền tĩnh mạch qua bơm tiêm điện', dosage: 'Khởi đầu 0.1 mcg/kg/phút, chỉnh liều duy trì MAP ≥ 65 mmHg', frequency: 'Liên tục', instructions: 'Chỉ định khi đã tiêm bắp 2-3 liều Adrenaline mà huyết áp vẫn không lên', isFirstLine: false },
        { drugName: 'Salbutamol khí dung', class: 'Giãn phế quản cắt cơn co thắt khí phế quản', route: 'Phun khí dung', dosage: '2.5 - 5 mg/lần', frequency: 'Khi có co thắt phế quản kèm theo', instructions: 'Phun qua mặt nạ khí dung', isFirstLine: false }
      ],
      supportiveCare: ['Chuẩn bị sẵn sàng bộ đặt nội khí quản và mở khí quản cấp cứu nếu phù nề thanh môn nặng', 'Theo dõi bệnh nhân tại phòng cấp cứu tối thiểu 24 - 48 giờ để phòng ngừa phản vệ pha 2', 'Tư vấn dị ứng, kê đơn bút tiêm tự động Epinephrine (EpiPen) nếu có điều kiện']
    },
    complications: [
      { name: 'Ngạt thở cấp do phù nề thanh quản tắc nghẽn đường thở', timeframe: 'acute_24h', warningSigns: 'Tiếng thở rít thanh quản dữ dội, co kéo hõm ức, khàn tiếng mất tiếng, tím tái SpO2 tụt nhanh', preventiveAction: 'Tiêm Adrenaline ngay + Đặt nội khí quản sớm trước khi thanh môn phù nề bít hoàn toàn hoặc mở màng nhẫn giáp cấp cứu', onCallAlertText: 'BÁO ĐỘNG TẮC NGHẼN ĐƯỜNG THỞ: Thở rít thanh quản ➔ Tiêm Adrenaline và gọi Bác sĩ Gây mê đặt NKQ khó' },
      { name: 'Phản vệ pha 2 (Biphasic Anaphylaxis) tái phát sau 4-12 giờ', timeframe: 'acute_24h', warningSigns: 'Triệu chứng tụt huyết áp, khó thở, mày đay tái xuất hiện sau khi bệnh nhân đã ổn định hoàn toàn', preventiveAction: 'Theo dõi bệnh nhân liên tục tối thiểu 24 giờ tại cơ sở y tế + Dùng Corticosteroid đủ liều', onCallAlertText: 'Phản vệ tái phát pha 2: Xử trí lại theo phác đồ cấp cứu tiêm bắp Adrenaline' }
    ],
    monitoringLabs: ['Theo dõi dấu hiệu sinh tồn (Mạch, Huyết áp, SpO2, Nhịp thở) mỗi 5-15 phút trong 2 giờ đầu', 'Định lượng Tryptase huyết thanh (lấy mẫu trong vòng 1-2 giờ sau khởi phát) để xác nhận chẩn đoán hồi cứu', 'Điện tâm đồ 12 chuyển đạo theo dõi thiếu máu cơ tim cấp do phản vệ (Hội chứng Kounis)'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Chẩn Đoán Phản Vệ & Phân Độ I, II, III, IV Theo Thông Tư 51', searchKeyword: 'tiếp cận phản vệ thông tư 51' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán Phản Vệ Thế Giới WAO 2020 & EAACI', searchKeyword: 'tiêu chuẩn phản vệ wao' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Ý nghĩa Xét nghiệm Tryptase Huyết Thanh & Test Dị Ứng Da Lẩy (Prick Test)', searchKeyword: 'tryptase phản vệ test da lẩy' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Hộp Thuốc Cấp Cứu Phản Vệ & Quy Trình Tiêm Bắp Adrenaline', searchKeyword: 'phác đồ cấp cứu sốc phản vệ adrenaline' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Kỹ thuật Tiêm Bắp Adrenaline Vùng Đùi & Sử Dụng Bút Tiêm EpiPen', searchKeyword: 'tiêm bắp adrenaline epipen' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Phù Nề Thanh Môn Cấp Cứu & Phản Vệ Pha 2 Biphasic', searchKeyword: 'phù thanh môn phản vệ pha 2' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 27. TRÀN DỊCH & TRÀN KHÍ MÀNG PHỔI (EFFUSION / PNEUMOTHORAX)
  // ──────────────────────────────────────────────────────────────────────────
  'tran_dich_tran_khi_mang_phoi': {
    icdCode: 'J90',
    icdPrefixes: ['J90', 'J91', 'J93'],
    diseaseName: 'Tràn dịch & Tràn khí màng phổi cấp (Effusion / Pneumothorax)',
    specialty: 'Hô hấp & Ngoại lồng ngực',
    severity: 'urgent',
    summary: 'Sự tích tụ bất thường của dịch hoặc không khí trong khoang màng phổi gây chèn ép nhu mô phổi, cản trở hô hấp và có thể đe dọa huyết động (Tràn khí màng phổi áp lực).',
    goldStandard: 'Chụp X-quang ngực thẳng hoặc Siêu âm màng phổi / CT lồng ngực thấy hình ảnh tách lá thành lá tạng (dải sáng vô mạch đối với tràn khí hoặc mức mờ đồng nhất đối với tràn dịch) + Chọc hút dịch/khí chẩn đoán.',
    criteriaRule: {
      mandatoryIds: ['pleural_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Hình ảnh X-quang ngực / Siêu âm / CT khẳng định dịch hoặc khí trong khoang màng phổi + Hội chứng 3 giảm (đối với tràn dịch) hoặc Tam chứng Gaillard (đối với tràn khí).'
    },
    criteria: [
      { id: 'pleural_crit_1', type: 'mandatory', label: 'Hình ảnh X-quang ngực thẳng / CT lồng ngực xác định dịch hoặc khí khoang màng phổi', description: 'Tràn khí: Khoảng sáng vô mạch ngoại vi, đường viền màng phổi tạng; Tràn dịch: Mờ góc sườn hoành, đường cong Damoiseau.', labThreshold: 'X-quang ngực (+)' },
      { id: 'pleural_crit_2', type: 'major', label: 'Hội chứng 3 giảm (Tràn dịch màng phổi): Rì rào phế nang giảm, Rung thanh giảm, Gõ đục', description: 'Khám thực thể kinh điển của tràn dịch màng phổi.' },
      { id: 'pleural_crit_3', type: 'major', label: 'Tam chứng Gaillard (Tràn khí màng phổi): Rì rào phế nang giảm, Rung thanh giảm, Gõ vang trống', description: 'Khám thực thể kinh điển của tràn khí màng phổi.' },
      { id: 'pleural_crit_4', type: 'major', label: 'Dấu hiệu Tràn khí màng phổi áp lực (Tension Pneumothorax): Khó thở dữ dội, tĩnh mạch cổ nổi, tụt HA, trung thất bị đẩy lệch sang bên đối diện', description: 'Cấp cứu tối khẩn cần chọc kim giải áp ngay không chờ chụp X-quang.' },
      { id: 'pleural_crit_5', type: 'lab', label: 'Tiêu chuẩn Light phân loại Dịch thấm và Dịch tiết (Tràn dịch màng phổi)', description: 'Dịch tiết nếu thỏa ≥ 1 tiêu chuẩn: Protein dịch/huyết thanh > 0.5; LDH dịch/huyết thanh > 0.6; LDH dịch > 2/3 giới hạn trên bình thường.', labThreshold: 'Protein DNT/Serum > 0.5 hoặc LDH > 0.6' }
    ],
    protocol: {
      title: 'Phác đồ Chọc Hút Khí/Dịch & Dẫn Lưu Màng Phổi (BTS / ATS Guidelines)',
      guideline: 'British Thoracic Society (BTS Pleural Disease Guidelines 2023) & Hướng dẫn Bộ Y tế',
      targetGoals: ['Giải áp khoang màng phổi, tái mở rộng nhu mô phổi', 'Phục hồi trao đổi khí oxy và ổn định huyết động', 'Xác định căn nguyên (Lao, ung thư, viêm phổi mủ, suy tim) để điều trị triệt để'],
      initialManagement: [
        'Nếu TRÀN KHÍ MÀNG PHỔI ÁP LỰC: CẮM KIM LỚN (14-16G) GIẢI ÁP NGAY TẠI KHOANG LIÊN SƯỜN 2 ĐƯỜNG TRUNG ĐÒN HOẶC KHOANG LIÊN SƯỜN 4-5 ĐƯỜNG NÁCH TRƯỚC',
        'Thở oxy lưu lượng cao qua mask có túi dự trữ (Oxy nồng độ cao giúp tăng hấp thu khí khoang màng phổi)',
        'Chọc hút dịch màng phổi chẩn đoán và điều trị (không hút quá 1000 - 1500 mL/lần để tránh phù phổi do tái nở)',
        'Đặt ống dẫn lưu màng phổi kín (Chest Tube Drainage với hệ thống van nước một chiều Bülau / bình hút áp lực âm -20 cmH2O)'
      ],
      firstLineDrugs: [
        { drugName: 'Paracetamol + Tramadol', class: 'Thuốc giảm đau trước và sau can thiệp thủ thuật lồng ngực', route: 'Uống/Tiêm TM', dosage: 'Paracetamol 1g TM + Tramadol 50-100mg TM khi đau', frequency: 'Mỗi 6-8 giờ', instructions: 'Giúp bệnh nhân giảm đau để hít thở sâu và ho khạc tốt', isFirstLine: true },
        { drugName: 'Lidocaine 2%', class: 'Thuốc gây tê tại chỗ trước chọc hút/đặt dẫn lưu', route: 'Gây tê từng lớp thành ngực', dosage: '5 - 10 mL gây tê đến tận màng phổi lá thành', frequency: 'Trước thủ thuật', instructions: 'Gây tê kỹ màng phổi thành để tránh phản xạ sốc phế vị', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Kháng sinh điều trị Viêm mủ màng phổi (Empyema)', class: 'Kháng sinh phổ rộng bao phủ vi khuẩn yếm khí', route: 'Tiêm TM', dosage: 'Augmentin 1.2g mỗi 8h hoặc Ceftriaxone 2g + Metronidazole 500mg mỗi 8h', frequency: 'Mỗi 8 giờ', instructions: 'Chỉ định khi dịch màng phổi là dịch mủ đục hoặc pH < 7.20', isFirstLine: false }
      ],
      supportiveCare: ['Tập thở bóng spirometry và thổi chai nước giúp phổi nở hoàn toàn', 'Theo dõi cột nước bình dẫn lưu dao động theo nhịp thở và số lượng khí/dịch ra mỗi ngày', 'Chỉ kẹp và rút ống dẫn lưu khi phổi nở hoàn toàn trên X-quang và không còn khí/dịch ra']
    },
    complications: [
      { name: 'Phù phổi tái nở (Re-expansion Pulmonary Edema)', timeframe: 'acute_24h', warningSigns: 'Ho dữ dội, khó thở cấp tính, khạc đờm bọt hồng sau khi hút tháo lượng lớn dịch/khí quá nhanh (> 1.5L)', preventiveAction: 'Không hút quá 1.2 - 1.5 Lít dịch trong một lần chọc tháo, hút áp lực âm nhẹ nhàng', onCallAlertText: 'BÁO ĐỘNG PHÙ PHỔI TÁI NỞ: Ho khạc bọt hồng sau chọc dịch ➔ Ngừng hút ngay, thở oxy PEEP' },
      { name: 'Chảy máu màng phổi do tổn thương bó mạch thần kinh liên sườn', timeframe: 'acute_24h', warningSigns: 'Máu đỏ tươi chảy ra ào ạt qua ống dẫn lưu (> 200 mL/giờ trong 3 giờ liên tiếp), huyết áp tụt', preventiveAction: 'Luôn chọc kim và đặt dẫn lưu ở bờ trên xương sườn dưới (để tránh bó mạch ở bờ dưới xương sườn trên)', onCallAlertText: 'Máu chảy nhiều qua dẫn lưu màng phổi: Khám ngực, xét nghiệm Hct dịch và hội chẩn Phẫu thuật lồng ngực' }
    ],
    monitoringLabs: ['X-quang ngực thẳng kiểm tra lại sau thủ thuật chọc dịch/đặt dẫn lưu', 'Xét nghiệm dịch màng phổi: Sinh hóa (Protein, LDH, Glucose, pH), Tế bào học, Nhuộm soi Gram/AFB, Cấy vi khuẩn, PCR Lao (GeneXpert)', 'Khí máu động mạch theo dõi PaO2 và SpO2'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Hội Chứng 3 Giảm & Tam Chứng Gaillard', searchKeyword: 'tiếp cận tràn dịch tràn khí màng phổi' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Light Phân Biệt Dịch Thấm & Dịch Tiết Màng Phổi', searchKeyword: 'tiêu chuẩn light tràn dịch màng phổi' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Kỹ Thuật Chọc Hút Dịch Màng Phổi & Siêu Âm Phổi Lồng Ngực', searchKeyword: 'chọc dịch màng phổi siêu âm phổi' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Đặt Ống Dẫn Lưu Màng Phổi & Xử Trí Cấp Cứu Tràn Khí Áp Lực', searchKeyword: 'phác đồ dẫn lưu màng phổi tràn khí áp lực' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Gây Dính Màng Phổi Bằng Bột Talc, Bleomycin hoặc Povidone Iodine', searchKeyword: 'gây dính màng phổi bột talc' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Phù Phổi Do Tái Nở & Tràn Máu Màng Phổi', searchKeyword: 'phù phổi tái nở tràn máu màng phổi' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 28. SỎI THẬN & CƠN ĐAU QUẶN THẬN (RENAL COLIC)
  // ──────────────────────────────────────────────────────────────────────────
  'soi_than_con_dau_quan_than': {
    icdCode: 'N20.0',
    icdPrefixes: ['N20', 'N21', 'N22', 'N23'],
    diseaseName: 'Sỏi thận & Cơn đau quặn thận (Renal Colic / Urolithiasis)',
    specialty: 'Thận - Tiết niệu & Ngoại niệu',
    severity: 'urgent',
    summary: 'Hội chứng đau cấp tính dữ dội do sỏi di chuyển gây tắc nghẽn đột ngột đường dẫn niệu (niệu quản/đài bể thận) làm tăng áp lực trong lòng đài bể thận.',
    goldStandard: 'Chụp CT Scanner hệ tiết niệu không tiêm cản quang (Non-contrast CT KUB) xác định chính xác kích thước, vị trí, độ cản quang (Hounsfield Unit) và mức độ ứ nước của sỏi.',
    criteriaRule: {
      mandatoryIds: ['colic_crit_1'],
      minMajorRequired: 1,
      ruleDescription: 'Bắt buộc có Cơn đau quặn thận điển hình vùng hông lưng lan xuống bẹn/sinh dục + Hình ảnh sỏi trên CT KUB / Siêu âm hoặc Hồng cầu niệu vi thể.'
    },
    criteria: [
      { id: 'colic_crit_1', type: 'mandatory', label: 'Cơn đau quặn thận điển hình (Renal Colic)', description: 'Đau khởi phát đột ngột, dữ dội từng cơn vùng hông lưng mạn sườn, lan dọc theo đường đi niệu quản xuống bẹn, bìu hoặc môi lớn, bệnh nhân lăn lộn không có tư thế giảm đau.' },
      { id: 'colic_crit_2', type: 'major', label: 'Chụp CT Scanner hệ tiết niệu không cản quang (CT KUB) phát hiện sỏi niệu quản / sỏi thận', description: 'Tiêu chuẩn vàng với độ nhạy và độ đặc hiệu > 95-98%.', labThreshold: 'CT KUB xác định sỏi' },
      { id: 'colic_crit_3', type: 'major', label: 'Siêu âm hệ tiết niệu thấy hình ảnh sỏi (tăng âm kèm bóng lưng) và giãn đài bể thận niệu quản ứ nước', description: 'Phương tiện tầm soát ban đầu không xâm lấn, an toàn cho phụ nữ có thai.', labThreshold: 'Thận ứ nước độ I - III' },
      { id: 'colic_crit_4', type: 'lab', label: 'Tổng phân tích nước tiểu có Hồng cầu niệu (Đái máu vi thể hoặc đại thể)', description: 'Do sỏi cọ xát gây tổn thương niêm mạc niệu quản.', labThreshold: 'RBC niệu (+)' },
      { id: 'colic_crit_5', type: 'minor', label: 'Triệu chứng kích thích bàng quang đi kèm (Tiểu buốt, tiểu rắt, tiểu nhiều lần)', description: 'Thường gặp khi sỏi di chuyển xuống đoạn thấp sát thành bàng quang (đoạn nội thành).' }
    ],
    protocol: {
      title: 'Phác đồ Giảm Đau Cơn Đau Quặn Thận & Liệu Pháp Tống Xuất Sỏi MET (EAU 2024)',
      guideline: 'EAU Guidelines on Urolithiasis 2024 & Phác đồ Bộ Y tế',
      targetGoals: ['Cắt cơn đau quặn thận nhanh chóng bằng thuốc NSAIDs đường tiêm', 'Bảo tồn chức năng thận, giải tỏa tắc nghẽn niệu quản', 'Hỗ trợ tống xuất sỏi tự nhiên (sỏi < 6mm) hoặc chỉ định can thiệp tán sỏi tán sỏi nội soi / ESWL'],
      initialManagement: [
        'Thuốc giảm đau hàng đầu: Thuốc chống viêm không steroid NSAIDs tiêm TM/tiêm bắp (Ketorolac / Diclofenac)',
        'Nếu NSAIDs chống chỉ định hoặc không đỡ: Dùng Morphine/Pethidine phối hợp',
        'Thuốc chống co thắt cơ trơn (Drotaverin / Buscopan)',
        'Liệu pháp tống xuất sỏi đường nội khoa (MET): Thuốc chẹn alpha-1 (Tamsulosin 0.4mg/ngày) cho sỏi niệu quản đoạn dưới kích thước 5 - 10 mm'
      ],
      firstLineDrugs: [
        { drugName: 'Diclofenac hoặc Ketorolac', class: 'Thuốc chống viêm không steroid NSAIDs giảm áp lực đài bể thận', route: 'Tiêm bắp / Tiêm TM', dosage: 'Diclofenac 75mg tiêm bắp sâu hoặc Ketorolac 30mg tiêm TM', frequency: 'Mỗi 12 giờ khi đau', instructions: 'Thuốc giảm đau lựa chọn số 1 (giảm phù nề và giảm co thắt niệu quản tốt hơn Opioid)', isFirstLine: true },
        { drugName: 'Tamsulosin (Harnal Ocas)', class: 'Chẹn thụ thể Alpha-1A adrenergic giãn cơ trơn niệu quản (Liệu pháp MET)', route: 'Uống', dosage: '0.4 mg/ngày uống sau bữa ăn', frequency: '1 lần/ngày vào buổi tối', instructions: 'Tăng tỷ lệ tống xuất sỏi niệu quản tự nhiên và giảm cơn đau tái phát', isFirstLine: true },
        { drugName: 'Drotaverine (Nospa)', class: 'Thuốc chống co thắt cơ trơn', route: 'Tiêm TM hoặc Uống', dosage: '40 - 80 mg mỗi 8 giờ', frequency: '2 - 3 lần/ngày', instructions: 'Phối hợp giảm đau co thắt', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Morphine Sulfate', class: 'Giảm đau Opioid nhóm mạnh', route: 'Tiêm dưới da hoặc Tiêm TM', dosage: '5 - 10 mg tiêm TM chậm', frequency: 'Khi đau dữ dội không đáp ứng NSAIDs', instructions: 'Chỉ định khi đau quặn thận trơ với NSAIDs hoặc có suy thận', isFirstLine: false }
      ],
      supportiveCare: ['Uống nhiều nước (2.5 - 3 Lít/ngày) và vận động nhẹ nhàng để hỗ trợ rơi sỏi', 'Lọc nước tiểu qua màng lọc để thu thập sỏi phân tích thành phần hóa học (Canxi Oxalat, Acid Uric, Struvite)', 'Chỉ định can thiệp ngoại khoa: Tán sỏi ngoài cơ thể (ESWL), Tán sỏi nội soi ngược dòng (URS), Tán sỏi qua da (PCNL)']
    },
    complications: [
      { name: 'Viêm đài bể thận cấp tắc nghẽn có ứ mủ thận (Obstructive Pyelonephritis / Urosepsis)', timeframe: 'acute_24h', warningSigns: 'Cơn đau quặn thận kèm SỐT CAO RÉT RUN, mạch nhanh, huyết áp tụt, bạch cầu tăng vọt', preventiveAction: 'CẤP CỨU NGOẠI KHOA TỐI KHẨN: Đặt sonde JJ niệu quản hoặc Mở đài bể thận dẫn lưu mủ qua da giải áp NGAY LẬP TỨC + Kháng sinh TM', onCallAlertText: 'BÁO ĐỘNG SỎI TẮC NGHẼN Ứ MỦ THẬN: Sốt rét run + Đau quặn thận ➔ Gọi Bác sĩ Ngoại niệu đặt sonde JJ cấp cứu' },
      { name: 'Suy thận cấp sau thận do sỏi niệu quản 2 bên hoặc sỏi trên thận độc nhất', timeframe: 'acute_24h', warningSigns: 'Vô niệu hoàn toàn (không có nước tiểu), Creatinine máu tăng vọt, Kali máu tăng', preventiveAction: 'Đặt ống thông JJ giải áp cấp cứu hai bên hoặc mở thận qua da', onCallAlertText: 'Sỏi niệu quản gây vô niệu: Đặt sonde JJ giải áp cấp cứu' }
    ],
    monitoringLabs: ['CT KUB hoặc Siêu âm hệ tiết niệu kiểm tra vị trí sỏi', 'Creatinine máu, Ure máu, Điện giải đồ (đánh giá chức năng thận)', 'Tổng phân tích nước tiểu và cấy nước tiểu loại trừ nhiễm trùng phối hợp'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Cơn Đau Quặn Thận & Phân Biệt Đau Bụng Ngoại Khoa', searchKeyword: 'tiếp cận cơn đau quặn thận' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán & Phân Loại Sỏi Hệ Tiết Niệu EAU 2024', searchKeyword: 'tiêu chuẩn sỏi thận eau' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Chụp CT Scanner KUB Không Cản Quang & Đánh Giá Độ Cản Quang Hounsfield', searchKeyword: 'ct kub sỏi thận hounsfield' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Giảm Đau Cơn Quặn Thận & Liệu Pháp Tống Xuất Sỏi Tamsulosin MET', searchKeyword: 'phác đồ giảm đau cơn quặn thận tamsulosin' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Sử dụng NSAIDs Tiêm, Thuốc Chẹn Alpha-1 & Thuốc Kiềm Hóa Nước Tiểu', searchKeyword: 'thuốc tamsulosin diclofenac sỏi thận' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Cấp Cứu Sỏi Niệu Quản Tắc Nghẽn Gây Ứ Mủ Thận & Đặt Sonde JJ', searchKeyword: 'sỏi tắc nghẽn ứ mủ thận sonde jj' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 29. HỘI CHỨNG THẬN HƯ (NEPHROTIC SYNDROME)
  // ──────────────────────────────────────────────────────────────────────────
  'hoi_chung_than_hu': {
    icdCode: 'N04.9',
    icdPrefixes: ['N04'],
    diseaseName: 'Hội chứng thận hư nguyên phát / thứ phát (Nephrotic Syndrome)',
    specialty: 'Thận học & Miễn dịch lâm sàng',
    severity: 'urgent',
    summary: 'Hội chứng lâm sàng và sinh hóa đặc trưng bởi tổn thương màng đáy cầu thận gây thoát protein niệu ồ ạt, dẫn đến giảm albumin máu, phù toàn thân và rối loạn lipid máu.',
    goldStandard: 'Đạm niệu 24 giờ ≥ 3.5 g/24h (hoặc Tỷ lệ Protein/Creatinine niệu UPCR ≥ 3.5 g/g) + Albumin huyết thanh giảm < 30 g/L + Sinh thiết thận xác định thể tổn thương mô bệnh học (MCD, FSGS, MN, MPGN).',
    criteriaRule: {
      mandatoryIds: ['neph_crit_1', 'neph_crit_2'],
      ruleDescription: 'Bắt buộc có đủ 2 tiêu chuẩn chính: Đạm niệu ngưỡng thận hư (≥ 3.5 g/24h) + Albumin máu giảm nặng (< 30 g/L). Phù và Tăng lipid máu là các tiêu chuẩn phụ đi kèm.'
    },
    criteria: [
      { id: 'neph_crit_1', type: 'mandatory', label: 'Protein niệu 24 giờ ≥ 3.5 g/24h (hoặc UPCR ≥ 3.5 g/g hoặc ≥ 3000 mg/g ở người lớn; ≥ 40 mg/m2/h ở trẻ em)', description: 'Tiêu chuẩn bắt buộc tiên quyết của hội chứng thận hư.', labThreshold: 'Protein niệu ≥ 3.5 g/24h' },
      { id: 'neph_crit_2', type: 'mandatory', label: 'Albumin huyết thanh giảm nặng < 30 g/L (hoặc Protein toàn phần máu < 60 g/L)', description: 'Hậu quả trực tiếp của mất protein qua cầu thận.', labThreshold: 'Albumin máu < 30 g/L (thường < 20-25 g/L)' },
      { id: 'neph_crit_3', type: 'major', label: 'Phù toàn thân tiến triển nhanh, phù mềm, trắng, ấn lõm đối xứng 2 bên', description: 'Bắt đầu từ mí mắt, mặt, lan xuống 2 chân, kèm tràn dịch đa màng (màng bụng, màng phổi, màng tinh hoàn).' },
      { id: 'neph_crit_4', type: 'major', label: 'Rối loạn lipid máu: Tăng Cholesterol toàn phần và Triglyceride máu', description: 'Do gan tăng tổng hợp lipoprotein để bù trừ giảm áp lực keo máu.', labThreshold: 'Cholesterol toàn phần > 6.5 - 8.0 mmol/L' },
      { id: 'neph_crit_5', type: 'lab', label: 'Sinh thiết thận (Renal Biopsy) làm mô bệnh học quang học, huỳnh quang và kính hiển vi điện tử', description: 'Xác định thể nguyên nhân: Sang thương tối thiểu (MCD), Xơ chai cầu thận khu trú từng vùng (FSGS), Bệnh cầu thận màng (MN)...' }
    ],
    protocol: {
      title: 'Phác đồ Điều Trị Hội Chứng Thận Hư Bằng Corticoid & Ức Chế Miễn Dịch (KDIGO 2024)',
      guideline: 'KDIGO 2024 Clinical Practice Guideline for the Management of Glomerular Diseases & Phác đồ Bộ Y tế',
      targetGoals: ['Đưa bệnh nhân về thoái lui hoàn toàn (Protein niệu < 0.3 g/24h, Albumin máu bình thường)', 'Kiểm soát phù và duy trì huyết áp mục tiêu < 120/80 mmHg', 'Dự phòng các biến chứng huyết khối tắc mạch và nhiễm trùng'],
      initialManagement: [
        'Chế độ ăn giảm muối nghiêm ngặt (< 2g Natri/ngày tương đương < 5g muối ăn), lượng protein vừa phải (0.8-1.0 g/kg/ngày)',
        'Sử dụng thuốc lợi tiểu quai Furosemide phối hợp Spironolactone để giảm phù (thận trọng giảm thể tích tuần hoàn hiệu dụng)',
        'Chỉ định truyền Albumin 20% khi có phù kháng trị kèm hạ huyết áp hoặc Albumin máu < 15-20 g/L',
        'Liệu pháp ức chế miễn dịch đầu tay: Prednisolone liều cao 1 mg/kg/ngày (tối đa 60-80mg/ngày) trong 4 - 8 tuần'
      ],
      firstLineDrugs: [
        { drugName: 'Prednisolone hoặc Methylprednisolone', class: 'Glucocorticoid ức chế miễn dịch liều tấn công', route: 'Uống', dosage: '1 mg/kg/ngày (hoặc 2 mg/kg cách ngày) uống 1 lần duy nhất sau ăn sáng trong 4-8 tuần, sau đó giảm liều dần', frequency: '1 lần/ngày vào buổi sáng', instructions: 'Bắt buộc uống thuốc bảo vệ dạ dày PPI và bổ sung Canxi/Vitamin D đi kèm', isFirstLine: true },
        { drugName: 'Furosemide (Lasix)', class: 'Lợi tiểu quai kiểm soát phù', route: 'Uống hoặc Tiêm TM', dosage: '40 - 80 mg/ngày, có thể tăng liều nếu phù nặng', frequency: '1 - 2 lần/ngày (sáng, trưa)', instructions: 'Theo dõi sát điện giải đồ Kali máu và huyết áp', isFirstLine: true },
        { drugName: 'Enoxaparin (Lovenox)', class: 'Thuốc kháng đông LMWH dự phòng biến chứng thuyên tắc huyết khối', route: 'Tiêm dưới da', dosage: '40 mg tiêm dưới da 1 lần/ngày', frequency: '1 lần/ngày', instructions: 'Chỉ định dự phòng khi Albumin máu < 20 - 25 g/L có nguy cơ huyết khối cao', isFirstLine: true },
        { drugName: 'Atorvastatin', class: 'Statin hạ lipid máu', route: 'Uống', dosage: '10 - 20 mg/ngày vào buổi tối', frequency: '1 lần/ngày', instructions: 'Kiểm soát rối loạn lipid máu thứ phát', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Cyclosporine A hoặc Tacrolimus (CNIs) / Cyclophosphamide', class: 'Thuốc ức chế miễn dịch bậc 2 cho thể kháng steroid hoặc hay tái phát', route: 'Uống', dosage: 'Cyclosporine 3-5 mg/kg/ngày hoặc Tacrolimus 0.05-0.1 mg/kg/ngày', frequency: 'Chia 2 lần/ngày', instructions: 'Chỉ định khi phụ thuộc hoặc kháng Corticosteroid', isFirstLine: false }
      ],
      supportiveCare: ['Dùng thuốc ức chế men chuyển (ACEi) hoặc ức chế thụ thể (ARB) để giảm áp lực lọc cầu thận và giảm đạm niệu khi huyết áp cho phép', 'Tiêm phòng vắc xin phế cầu và vắc xin cúm (tránh tiêm vắc xin sống giảm độc lực khi đang dùng liều ức chế miễn dịch cao)', 'Theo dõi cân nặng và que nhúng nước tiểu đạm niệu hàng ngày tại nhà']
    },
    complications: [
      { name: 'Tắc mạch huyết khối (Thuyên tắc tĩnh mạch thận / Thuyên tắc phổi / DVT)', timeframe: 'acute_24h', warningSigns: 'Đau thắt hông lưng đột ngột, đái máu đại thể (Tắc TM thận) hoặc Đau ngực khó thở cấp tính (Thuyên tắc phổi)', preventiveAction: 'Dự phòng kháng đông LMWH khi Albumin < 20g/L + Không nằm bất động kéo dài', onCallAlertText: 'BÁO ĐỘNG THUYÊN TẮC HUYẾT KHỐI Ở BN THẬN HƯ: Đau hông lưng, đái máu ➔ Siêu âm Doppler TM thận khẩn' },
      { name: 'Nhiễm trùng nặng (Viêm phúc mạc tiên phát, Viêm mô tế bào, Viêm phổi)', timeframe: 'subacute_7d', warningSigns: 'Sốt cao, đau bụng lan tỏa, dịch màng bụng đục, sưng nóng đỏ đau da cẳng chân', preventiveAction: 'Kháng sinh Cephalosporin thế hệ 3 sớm + Giữ vệ sinh da sạch sẽ', onCallAlertText: 'Bệnh nhân thận hư sốt đau bụng: Chọc dò dịch màng bụng tìm viêm phúc mạc tiên phát' }
    ],
    monitoringLabs: ['Protein niệu 24 giờ hoặc UPCR mỗi 2-4 tuần để đánh giá đáp ứng thoái lui', 'Albumin máu, Protein toàn phần, Bộ mỡ máu Lipid panel mỗi tháng', 'Creatinine máu, Điện giải đồ, Chức năng gan, Đường huyết theo dõi tác dụng phụ của Corticoid'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Phù Toàn Thân & Hội Chứng Thận Hư Người Lớn', searchKeyword: 'tiếp cận hội chứng thận hư phù toàn thân' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Chẩn đoán & Phân Loại Bệnh Cầu Thận KDIGO 2024', searchKeyword: 'tiêu chuẩn hội chứng thận hư kdigo' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Định Lượng Đạm Niệu 24 Giờ, Tỷ Lệ UPCR & Chỉ Định Sinh Thiết Thận', searchKeyword: 'đạm niệu 24h upcr sinh thiết thận' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Corticosteroid Tấn Công, Giảm Liều & Thuốc Ức Chế Calcineurin CNIs', searchKeyword: 'phác đồ corticoid thận hư kdigo' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Hướng dẫn Sử dụng Prednisolone, Cyclosporine, Thuốc Lợi Tiểu & Kháng Đông Dự Phòng', searchKeyword: 'prednisolone cyclosporine lợi tiểu' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Biến Chứng Huyết Khối Tĩnh Mạch Thận & Viêm Phúc Mạc Tiên Phát', searchKeyword: 'huyết khối tĩnh mạch thận viêm phúc mạc tiên phát' }
    ]
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 30. HẠ ĐƯỜNG HUYẾT CẤP (HYPOGLYCEMIA)
  // ──────────────────────────────────────────────────────────────────────────
  'ha_duong_huyet_cap': {
    icdCode: 'E16.2',
    icdPrefixes: ['E16.0', 'E16.1', 'E16.2'],
    diseaseName: 'Hạ đường huyết cấp & Hôn mê hạ đường huyết (Hypoglycemia)',
    specialty: 'Nội tiết & Hồi sức cấp cứu',
    severity: 'emergency',
    summary: 'Cấp cứu nội tiết thường gặp nhất ở bệnh nhân đái tháo đường điều trị bằng insulin hoặc sulfonylurea, gây tổn thương não không hồi phục nếu không được nâng đường huyết kịp thời.',
    goldStandard: 'Tam chứng Whipple: [1] Triệu chứng lâm sàng phù hợp hạ đường huyết + [2] Glucose huyết tương hạ < 70 mg/dL (< 3.9 mmol/L) hoặc < 54 mg/dL (< 3.0 mmol/L) + [3] Triệu chứng biến mất nhanh chóng sau khi bổ sung Glucose.',
    criteriaRule: {
      mandatoryIds: ['hypogly_crit_1', 'hypogly_crit_2'],
      ruleDescription: 'Bắt buộc thỏa mãn Tam chứng Whipple: Glucose máu < 70 mg/dL kèm triệu chứng thần kinh/giao cảm và hồi phục ngay sau khi dùng đường.'
    },
    criteria: [
      { id: 'hypogly_crit_1', type: 'mandatory', label: 'Glucose huyết tương hoặc mao mạch giảm < 70 mg/dL (< 3.9 mmol/L) (Hạ nặng khi < 54 mg/dL hoặc cần người khác hỗ trợ)', description: 'Ngưỡng chẩn đoán xác định hạ đường huyết lâm sàng.', labThreshold: 'Glucose < 70 mg/dL (3.9 mmol/L)' },
      { id: 'hypogly_crit_2', type: 'mandatory', label: 'Triệu chứng biến mất nhanh chóng ngay sau khi được nạp Glucose đường uống hoặc truyền tĩnh mạch', description: 'Tiêu chuẩn thứ 3 của Tam chứng Whipple.' },
      { id: 'hypogly_crit_3', type: 'major', label: 'Triệu chứng cường giao cảm tự chủ (Autonomic symptoms)', description: 'Vã mồ hôi lạnh đầm đìa, run tay chân, tim đập nhanh hồi hộp, cảm giác đói cồn cào, lo âu, xanh tái.' },
      { id: 'hypogly_crit_4', type: 'major', label: 'Triệu chứng thiếu hụt glucose tế bào não (Neuroglycopenic symptoms)', description: 'Hoa mắt, nhìn mờ, lơ mơ, mất tập trung, hành vi kỳ lạ, co giật, yếu liệt nửa người thoáng qua, hôn mê sâu.' },
      { id: 'hypogly_crit_5', type: 'minor', label: 'Tiền sử sử dụng Insulin hoặc thuốc hạ đường huyết nhóm Sulfonylurea (Gliclazide, Glimepiride) bỏ bữa ăn hoặc vận động quá sức', description: 'Yếu tố dịch tễ và khởi kích hàng đầu.' }
    ],
    protocol: {
      title: 'Phác đồ Cấp Cứu Quy Tắc 15 - 15 & Tiêm Truyền Glucose Ưu Trương (ADA 2024)',
      guideline: 'ADA Standards of Care in Diabetes 2024 & Hướng dẫn Cấp cứu Hạ Đường Huyết Bộ Y tế',
      targetGoals: ['Nâng ngay nồng độ đường huyết lên > 70-100 mg/dL trong vòng 10-15 phút', 'Phục hồi hoàn toàn tri giác và bảo vệ tế bào thần kinh não', 'Xác định nguyên nhân và điều chỉnh liều thuốc đái tháo đường tránh tái phát'],
      initialManagement: [
        'NẾU BỆNH NHÂN TỈNH TÁO: ÁP DỤNG QUY TẮC 15 - 15:',
        '- Cho ăn/uống 15g Carbohydrate tác dụng nhanh (1/2 lon nước ngọt có đường, 3-4 viên kẹo đường, 1 ly nước đường pha 3 muỗng đường)',
        '- Kiểm tra lại đường huyết sau 15 phút. Nếu vẫn < 70 mg/dL: Lặp lại 15g đường',
        'NẾU BỆNH NHÂN HÔN MÊ / KHÔNG UỐNG ĐƯỢC:',
        '- Tiêm tĩnh mạch trực tiếp dung dịch Glucose ưu trương 20% hoặc 30% liều 30 - 50 mL (hoặc Glucose 10% 150-200 mL)',
        '- Sau đó duy trì truyền tĩnh mạch Glucose 5% hoặc 10% để giữ đường huyết > 100 mg/dL',
        '- Nếu không có đường truyền tĩnh mạch: Tiêm bắp Glucagon 1mg ngay lập tức'
      ],
      firstLineDrugs: [
        { drugName: 'Glucose 20% hoặc Glucose 30%', class: 'Dung dịch đường ưu trương tiêm tĩnh mạch trực tiếp', route: 'Tiêm TM trực tiếp', dosage: '30 - 50 mL tiêm TM chậm trong 3-5 phút', frequency: 'Cấp cứu ngay khi hôn mê', instructions: 'Tiêm tĩnh mạch trực tiếp để nâng đường huyết tức thì cho bệnh nhân hôn mê', isFirstLine: true },
        { drugName: 'Glucose 10% hoặc Glucose 5%', class: 'Dung dịch đường truyền tĩnh mạch duy trì', route: 'Truyền tĩnh mạch', dosage: 'Truyền 100 - 150 mL/giờ duy trì đường huyết 100-150 mg/dL', frequency: 'Liên tục', instructions: 'Bắt buộc duy trì truyền đường sau khi tỉnh, đặc biệt nếu hạ đường huyết do Sulfonylurea tác dụng kéo dài', isFirstLine: true },
        { drugName: 'Glucagon 1mg', class: 'Hormon tăng đường huyết tiêm bắp cấp cứu ngoại viện', route: 'Tiêm bắp hoặc Tiêm dưới da', dosage: '1 mg tiêm bắp 1 lần', frequency: 'Khi không có đường truyền TM', instructions: 'Thuốc cấp cứu hàng đầu cho người nhà/ngoại viện khi bệnh nhân hôn mê', isFirstLine: true }
      ],
      secondLineDrugs: [
        { drugName: 'Hydrocortisone 100mg', class: 'Corticosteroid nâng đường huyết trong hạ đường huyết kháng trị', route: 'Tiêm TM', dosage: '100 mg tiêm TM', frequency: 'Khi hạ đường huyết trơ với truyền glucose', instructions: 'Chỉ định khi nghi ngờ hạ đường huyết do suy thượng thận hoặc trơ với truyền đường', isFirstLine: false }
      ],
      supportiveCare: ['Cho bệnh nhân ăn bữa ăn chính hoặc ăn nhẹ (bánh mì, sữa) ngay sau khi tỉnh táo hoàn toàn', 'Theo dõi đường huyết liên tục tối thiểu 24 - 48 giờ đối với hạ đường huyết do Sulfonylurea tác dụng kéo dài (Diamicron MR, Amaryl)', 'Giáo dục bệnh nhân cách nhận biết dấu hiệu sớm và luôn mang theo kẹo/đường bên mình']
    },
    complications: [
      { name: 'Tổn thương não thiếu đường không hồi phục (Hypoglycemic Encephalopathy / Hôn mê sâu)', timeframe: 'acute_24h', warningSigns: 'Bệnh nhân hôn mê kéo dài, không tỉnh lại dù đường huyết đã được đưa về > 150-200 mg/dL, co giật', preventiveAction: 'Nâng đường huyết càng sớm càng tốt, thở máy, dùng Mannitol nếu có phù não', onCallAlertText: 'BÁO ĐỘNG HÔN MÊ HẠ ĐƯỜNG HUYẾT KÉO DÀI: Đã truyền đường nhưng chưa tỉnh ➔ Chụp MRI não và hồi sức thần kinh' },
      { name: 'Hạ đường huyết tái phát muộn do thuốc Sulfonylurea / Insulin bán thải kéo dài', timeframe: 'acute_24h', warningSigns: 'Đường huyết tụt lại sau khi ngưng truyền dịch đường 2-6 giờ', preventiveAction: 'Nhập viện theo dõi tối thiểu 24-48h và duy trì truyền đường liên tục đối với ngộ độc Sulfonylurea', onCallAlertText: 'Bệnh nhân dùng Sulfonylurea: Giữ lại viện theo dõi đường huyết tối thiểu 24h' }
    ],
    monitoringLabs: ['Đường huyết mao mạch tại giường mỗi 15-30 phút trong 2h đầu, sau đó mỗi 1-2 giờ', 'Điện giải đồ, Chức năng thận Creatinine máu (đào thải kém làm tích tụ thuốc)', 'Khí máu động mạch nếu có hôn mê kéo dài'],
    vaultPathways: [
      { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: 'Tiếp cận Hôn Mê Hạ Đường Huyết & Tam Chứng Whipple', searchKeyword: 'tiếp cận hạ đường huyết whipple' },
      { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: 'Tiêu chuẩn Phân Độ Hạ Đường Huyết ADA 2024 (Level 1, 2, 3)', searchKeyword: 'tiêu chuẩn hạ đường huyết ada' },
      { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: 'Đo Đường Huyết Mao Mạch Tại Giường & Cảm Biến Theo Dõi Đường Huyết Liên Tục CGM', searchKeyword: 'đo đường huyết cgm' },
      { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: 'Phác đồ Quy Tắc 15-15 & Xử Trí Tiêm Glucose Ưu Trương Cấp Cứu', searchKeyword: 'phác đồ quy tắc 15 15 glucose cấp cứu' },
      { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: 'Dược thư Glucose 20%, 30%, Bút Tiêm Tự Động Glucagon & Nhóm Thuốc Nguy Cơ Cao', searchKeyword: 'glucose ưu trương glucagon' },
      { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: 'Xử trí Bệnh Não Hạ Đường Huyết & Dự Phòng Hạ Đường Huyết Tái Phát', searchKeyword: 'bệnh não hạ đường huyết' }
    ]
  }
`;

const insertMarker = 'export function findReactionChainByIcd';
const parts = content.split(insertMarker);
const lastClosingBrace = parts[0].lastIndexOf('};');
const baseCode = parts[0].substring(0, lastClosingBrace);

const updatedContent = baseCode + ',\n' + diseases20Data + '\n};\n\n' + insertMarker + parts[1];
fs.writeFileSync(databaseFile, updatedContent);
console.log('Successfully added 20 new disease definitions to diagnostic-criteria-database.ts!');

