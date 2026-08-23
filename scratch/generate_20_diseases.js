const fs = require('fs');

const currentFile = fs.readFileSync('src/content/docspace/data/diagnostic-criteria-database.ts', 'utf8');

// Find insertion point before: export function findReactionChainByIcd
const insertMarker = 'export function findReactionChainByIcd';
const parts = currentFile.split(insertMarker);

if (parts.length < 2) {
  console.error('Marker not found!');
  process.exit(1);
}

// Check where the object closes before export
const lastClosingBrace = parts[0].lastIndexOf('};');
const baseCode = parts[0].substring(0, lastClosingBrace);

const new20Diseases = `
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
  }
`;

console.log('Writing 20 new disease definitions into diagnostic-criteria-database.ts...');
`;

fs.writeFileSync('scratch/generate_20_diseases.js', extraDiseasesCode);
console.log('Scratch script written.');
