const fs = require('fs');

const extraDiseasesCode = `
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
        'Thở oxy qua kính mũi hoặc ماسك Venturi kiểm soát mục tiêu SpO2 88-92%',
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
  }
`;

console.log('Extra diseases code parsed safely!');
