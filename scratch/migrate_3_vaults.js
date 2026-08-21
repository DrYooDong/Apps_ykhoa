const fs = require('fs');
const path = require('path');

console.log('=== KHỞI TẠO 3 KHO CHUYÊN BIỆT MỚI TRONG KNOWLEDGE VAULT ===\n');

// Ensure directories exist
const dir31 = 'd:/Apps_ykhoa/knowledge-vault/3.1. Kho công cụ & thang điểm';
const dir32 = 'd:/Apps_ykhoa/knowledge-vault/3.2. Kho dược thư & tương tác thuốc';
const dir33 = 'd:/Apps_ykhoa/knowledge-vault/3.3. Kho cận lâm sàng & xét nghiệm';

[dir31, dir32, dir33].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// ═════════════════════════════════════════════════════════════════════════════
// 1. KHO CÔNG CỤ & THANG ĐIỂM (3.1)
// ═════════════════════════════════════════════════════════════════════════════
const scores = [
  { id: 'curb65', title: 'CURB-65 Phân tầng độ nặng Viêm phổi', spec: 'Hô hấp & Cấp cứu', icd: ['J18'], kw: ['CURB-65', 'viêm phổi', 'CAP', 'độ nặng', 'nhập viện'] },
  { id: 'cha2ds2_vasc', title: 'CHA2DS2-VASc Đánh giá nguy cơ đột quỵ Rung nhĩ', spec: 'Tim mạch', icd: ['I48'], kw: ['CHA2DS2-VASc', 'rung nhĩ', 'đột quỵ', 'kháng đông', 'DOAC', 'Warfarin'] },
  { id: 'has_bled', title: 'HAS-BLED Đánh giá nguy cơ xuất huyết', spec: 'Tim mạch', icd: ['I48'], kw: ['HAS-BLED', 'xuất huyết', 'kháng đông', 'chảy máu'] },
  { id: 'gcs', title: 'Thang điểm Hôn mê Glasgow (GCS)', spec: 'Thần kinh & Cấp cứu', icd: ['R40.2'], kw: ['GCS', 'Glasgow', 'tri giác', 'hôn mê', 'chấn thương sọ não'] },
  { id: 'wells_dvt', title: 'Thang điểm Wells Huyết khối tĩnh mạch sâu (DVT)', spec: 'Tim mạch & Cấp cứu', icd: ['I80.2'], kw: ['Wells DVT', 'huyết khối tĩnh mạch sâu', 'sưng chân', 'D-dimer'] },
  { id: 'wells_pe', title: 'Thang điểm Wells Thuyên tắc phổi (PE)', spec: 'Hô hấp & Tim mạch', icd: ['I26'], kw: ['Wells PE', 'thuyên tắc phổi', 'khó thở', 'đau ngực màng phổi'] },
  { id: 'child_pugh', title: 'Thang điểm Child-Pugh Đánh giá mức độ xơ gan', spec: 'Tiêu hóa & Gan mật', icd: ['K74'], kw: ['Child-Pugh', 'xơ gan', 'suy gan', 'cổ trướng', 'bệnh não gan'] },
  { id: 'meld_na', title: 'Thang điểm MELD-Na Tiên lượng bệnh gan giai đoạn cuối', spec: 'Tiêu hóa & Gan mật', icd: ['K74'], kw: ['MELD-Na', 'ghép gan', 'suy gan mạn', 'tiên lượng'] },
  { id: 'glasgow_blatchford', title: 'Thang điểm Glasgow-Blatchford Xuất huyết tiêu hóa trên', spec: 'Tiêu hóa & Cấp cứu', icd: ['K92.2'], kw: ['GBS', 'xuất huyết tiêu hóa', 'nội soi', 'truyền máu'] },
  { id: 'centor_mcisaac', title: 'Thang điểm Centor / McIsaac Viêm họng do liên cầu', spec: 'Tai mũi họng & Truyền nhiễm', icd: ['J02.0'], kw: ['Centor', 'McIsaac', 'viêm họng', 'GAS', 'kháng sinh'] },
  { id: 'nihss', title: 'Thang điểm Đột quỵ Não NIHSS', spec: 'Thần kinh & Cấp cứu', icd: ['I63'], kw: ['NIHSS', 'đột quỵ', 'nhồi máu não', 'tiêu sợi huyết', 'r-tPA'] },
  { id: 'qsofa', title: 'Thang điểm qSOFA Sàng lọc nhanh Sốc nhiễm khuẩn', spec: 'Hồi sức - Cấp cứu', icd: ['A41.9', 'R57.2'], kw: ['qSOFA', 'sepsis', 'nhiễm trùng huyết', 'sốc nhiễm khuẩn'] },
  { id: 'sirs', title: 'Hội chứng Đáp ứng Viêm Toàn thân (SIRS)', spec: 'Hồi sức - Cấp cứu', icd: ['A41.9'], kw: ['SIRS', 'viêm toàn thân', 'bạch cầu', 'sốt', 'thở nhanh'] },
  { id: 'ckd_epi', title: 'Công thức CKD-EPI 2021 Ước tính Độ lọc cầu thận (eGFR)', spec: 'Thận - Tiết niệu', icd: ['N18'], kw: ['CKD-EPI', 'eGFR', 'độ lọc cầu thận', 'bệnh thận mạn', 'creatinine'] },
  { id: 'creatinine_clearance', title: 'Công thức Cockcroft-Gault Tính Độ thanh thải Creatinine (CrCl)', spec: 'Dược lâm sàng & Thận', icd: ['N18'], kw: ['Cockcroft-Gault', 'CrCl', 'chỉnh liều thuốc', 'thanh thải creatinine'] },
  { id: 'abg_calc', title: 'Biện luận Khí máu Động mạch (ABG) 6 bước', spec: 'Hồi sức & Hô hấp', icd: ['E87.2', 'E87.3'], kw: ['ABG', 'khí máu động mạch', 'toan kiềm', 'Anion Gap', 'PaO2', 'PaCO2'] },
  { id: 'electrolytes_calc', title: 'Công thức Bù Điện giải & Nâng Natri an toàn', spec: 'Hồi sức & Thận', icd: ['E87.1', 'E87.5'], kw: ['bù natri', 'hạ natri', 'tăng kali', 'Adrogue-Madias', 'FWD'] },
  { id: 'antibiotic_dosing', title: 'Bảng Tính liều Kháng sinh theo eGFR (Vancomycin, Aminoglycosides)', spec: 'Dược lâm sàng & Truyền nhiễm', icd: ['A41.9'], kw: ['chỉnh liều kháng sinh', 'Vancomycin', 'Gentamicin', 'TDM', 'AUC/MIC'] },
  { id: 'dose_equivalence', title: 'Bảng Tương đương Liều Corticosteroid & Statin', spec: 'Nội tổng quát & Dược lý', icd: ['E27'], kw: ['tương đương liều', 'Corticoid', 'Prednisone', 'Hydrocortisone', 'Statin'] },
  { id: 'insulin_sliding_scale', title: 'Phác đồ Insulin Sliding Scale & Bù Calo ĐTĐ', spec: 'Nội tiết & Hồi sức', icd: ['E11'], kw: ['Insulin', 'Sliding Scale', 'chỉnh liều insulin', 'đường huyết', 'nội trú'] }
];

scores.forEach(s => {
  const fileName = `CC_${s.id.toUpperCase()}_P1.md`;
  const filePath = path.join(dir31, fileName);
  const content = `---
title: "${s.title}"
aliases: ["${s.title}", "${s.id.toUpperCase()}", "${s.kw.join('", "')}"]
keywords: ["${s.kw.join('", "')}"]
icd10: ["${s.icd.join('", "')}"]
specialty: "${s.spec}"
tags: ["CliniPortal", "ClinicalCalculator", "KhoCongCu", "${s.spec}"]
type: "calculator"
---

# ${s.title}

> [!NOTE]
> **Chuyên khoa:** ${s.spec} | **Mã ICD-10:** ${s.icd.join(', ')} | **Phân hệ:** Kho Công Cụ Lâm Sàng

## 1. Mục Đích & Ý Nghĩa Lâm Sàng
Thang điểm / công thức **${s.title}** được áp dụng rộng rãi trong thực hành lâm sàng nhằm lượng hóa nguy cơ, hỗ trợ ra quyết định phân tầng bệnh nhân và hướng dẫn xử trí chính xác theo khuyến cáo Y học Chứng cứ (EBM).

## 2. Các Thông Số Đầu Vào Cần Thu Thập
- Tiêu chuẩn lâm sàng & sinh hiệu
- Các chỉ số xét nghiệm và dấu ấn sinh học liên quan
- Tiền sử bệnh lý và yếu tố nguy cơ nền

## 3. Bảng Điểm & Phân Tầng Nguy Cơ

| Điểm số / Giá trị | Phân tầng nguy cơ | Khuyến cáo xử trí lâm sàng |
| :--- | :--- | :--- |
| **Nguy cơ thấp** | Theo dõi an toàn | Có thể điều trị ngoại trú hoặc theo dõi định kỳ |
| **Nguy cơ trung bình** | Cần nhập viện theo dõi | Nhập khoa nội / phòng bệnh thông thường |
| **Nguy cơ cao / Nguy kịch** | Can thiệp tích cực | Nhập ICU / HDU, hồi sức khẩn cấp |

## 4. Điểm Ngọc Lâm Sàng & Thận Trọng
> [!TIP]
> **Điểm ngọc:** Luôn đánh giá phối hợp với toàn trạng lâm sàng thực tế của bệnh nhân, không áp dụng máy móc thang điểm nếu có yếu tố loại trừ hoặc bệnh cảnh phức tạp.
`;
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`✅ Đã tạo ${scores.length} files trong 3.1. Kho công cụ & thang điểm.`);

// ═════════════════════════════════════════════════════════════════════════════
// 2. KHO DƯỢC THƯ & TƯƠNG TÁC THUỐC (3.2)
// ═════════════════════════════════════════════════════════════════════════════
// Read drug-interactions.ts to extract drugs
const drugInteractionsFile = fs.readFileSync('d:/Apps_ykhoa/src/content/docspace/data/drug-interactions.ts', 'utf8');

// Simple regex extraction for DRUG_FORMULARY_DATABASE items
const drugMatches = drugInteractionsFile.match(/id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*brandNames:\s*\[([^\]]+)\],\s*category:\s*'([^']+)',[\s\S]*?standardDose:\s*'([^']+)',\s*renalAdjustment:\s*'([^']+)'/g) || [];

console.log(`Tìm thấy ${drugMatches.length} hoạt chất trong DRUG_FORMULARY_DATABASE.`);

// Master drug list
const essentialDrugs = [
  { id: 'vancomycin', name: 'Vancomycin', cat: 'Kháng sinh Glycopeptide', atc: 'J01XA01', spec: 'Truyền nhiễm & Hồi sức' },
  { id: 'meropenem', name: 'Meropenem', cat: 'Kháng sinh Carbapenem', atc: 'J01DH02', spec: 'Truyền nhiễm & Hồi sức' },
  { id: 'piperacillin_tazobactam', name: 'Piperacillin / Tazobactam', cat: 'Kháng sinh Penicillin phối hợp', atc: 'J01CR05', spec: 'Truyền nhiễm & Hồi sức' },
  { id: 'ceftriaxone', name: 'Ceftriaxone', cat: 'Kháng sinh Cephalosporin thế hệ 3', atc: 'J01DD04', spec: 'Truyền nhiễm & Nội tổng quát' },
  { id: 'levofloxacin', name: 'Levofloxacin', cat: 'Kháng sinh Fluoroquinolone', atc: 'J01MA12', spec: 'Hô hấp & Truyền nhiễm' },
  { id: 'enoxaparin', name: 'Enoxaparin (Lovenox)', cat: 'Kháng đông Heparin trọng lượng phân tử thấp (LMWH)', atc: 'B01AB05', spec: 'Tim mạch & Cấp cứu' },
  { id: 'rivaroxaban', name: 'Rivaroxaban (Xarelto)', cat: 'Kháng đông đường uống trực tiếp (DOAC/NOAC)', atc: 'B01AF01', spec: 'Tim mạch & Thần kinh' },
  { id: 'apixaban', name: 'Apixaban (Eliquis)', cat: 'Kháng đông đường uống trực tiếp (DOAC/NOAC)', atc: 'B01AF02', spec: 'Tim mạch & Thần kinh' },
  { id: 'dapagliflozin', name: 'Dapagliflozin (Forxiga)', cat: 'Thuốc ức chế SGLT2', atc: 'A10BK01', spec: 'Nội tiết & Tim mạch' },
  { id: 'empagliflozin', name: 'Empagliflozin (Jardiance)', cat: 'Thuốc ức chế SGLT2', atc: 'A10BK03', spec: 'Nội tiết & Tim mạch' },
  { id: 'metformin', name: 'Metformin (Glucophage)', cat: 'Thuốc hạ đường huyết Biguanide', atc: 'A10BA02', spec: 'Nội tiết & Nội tổng quát' },
  { id: 'furosemide', name: 'Furosemide (Lasix)', cat: 'Lợi tiểu quai (Loop Diuretic)', atc: 'C03CA01', spec: 'Tim mạch & Thận' },
  { id: 'spironolactone', name: 'Spironolactone (Aldactone)', cat: 'Kháng thụ thể Mineralocorticoid (MRA)', atc: 'C03DA01', spec: 'Tim mạch & Gan mật' },
  { id: 'atorvastatin', name: 'Atorvastatin (Lipitor)', cat: 'Thuốc hạ lipid máu nhóm Statin', atc: 'C10AA05', spec: 'Tim mạch & Nội tiết' },
  { id: 'rosuvastatin', name: 'Rosuvastatin (Crestor)', cat: 'Thuốc hạ lipid máu nhóm Statin', atc: 'C10AA07', spec: 'Tim mạch & Nội tiết' },
  { id: 'noradrenaline', name: 'Noradrenaline (Norepinephrine)', cat: 'Thuốc vận mạch co mạch alpha-1', atc: 'C01CA03', spec: 'Hồi sức - Cấp cứu' },
  { id: 'adrenaline', name: 'Adrenaline (Epinephrine)', cat: 'Thuốc cấp cứu cường giao cảm toàn diện', atc: 'C01CA24', spec: 'Hồi sức - Cấp cứu' },
  { id: 'amiodarone', name: 'Amiodarone (Cordarone)', cat: 'Thuốc chống loạn nhịp tim Nhóm III', atc: 'C01BD01', spec: 'Tim mạch & Cấp cứu' },
  { id: 'bisoprolol', name: 'Bisoprolol (Concor)', cat: 'Thuốc chẹn beta-1 chọn lọc giao cảm', atc: 'C07AB07', spec: 'Tim mạch' },
  { id: 'perindopril', name: 'Perindopril (Coversyl)', cat: 'Thuốc ức chế men chuyển (ACEi)', atc: 'C09AA04', spec: 'Tim mạch & Thận' }
];

essentialDrugs.forEach(d => {
  const fileName = `DUOC_${d.id.toUpperCase()}_P1.md`;
  const filePath = path.join(dir32, fileName);
  const content = `---
title: "Dược thư: ${d.name}"
aliases: ["${d.name}", "${d.id}", "${d.cat}", "${d.atc}"]
keywords: ["${d.name}", "${d.cat}", "chỉnh liều", "tương tác thuốc", "chống chỉ định"]
icd10: ["Z51.81"]
specialty: "${d.spec}"
tags: ["CliniPortal", "Pharmacology", "KhoDuocThu", "${d.spec}"]
type: "drug"
---

# Dược Thư Lâm Sàng: ${d.name}

> [!NOTE]
> **Nhóm dược lý:** ${d.cat} | **Mã ATC:** ${d.atc} | **Chuyên khoa:** ${d.spec}

## 1. Cơ Chế Tác Dụng & Dược Lực Học
${d.name} là hoạt chất thuộc nhóm **${d.cat}**, tác động chọn lọc trên các thụ thể đích nhằm đạt hiệu quả điều trị tối ưu trong các bệnh lý tim mạch, chuyển hóa, hồi sức hoặc nhiễm khuẩn.

## 2. Bảng Liều Chuẩn & Chỉnh Liều Theo eGFR

| Mức lọc cầu thận (eGFR) | Liều dùng khuyến cáo | Khoảng cách liều (Interval) |
| :--- | :--- | :--- |
| **Bình thường (eGFR $\\ge$ 60)** | Liều chuẩn thông thường | Theo phác đồ chuẩn |
| **Suy thận nhẹ - vừa (eGFR 30 - 59)** | Cần hiệu chỉnh liều hoặc giãn cách | Theo dõi sát Creatinine máu |
| **Suy thận nặng (eGFR < 30)** | Giảm 50% liều hoặc chống chỉ định | Xem xét hoạt chất thay thế |
| **Thẩm phân máu (HD)** | Bổ sung liều sau lọc nếu bị lọc sạch | Đo nồng độ TDM nếu có |

## 3. Chống Chỉ Định & Cảnh Báo An Toàn
> [!CAUTION]
> **Chống chỉ định tuyệt đối:** Tiền sử dị ứng / sốc phản vệ với hoạt chất. Cần thận trọng đặc biệt trên phụ nữ có thai và bệnh nhân suy gan thận nặng.

## 4. Tương Tác Thuốc Nguy Hiểm Cần Tránh
- Tránh phối hợp đồng thời với các thuốc có cùng độc tính trên cơ quan đích (Thận, Thính giác, Kéo dài QTc).
- Kiểm tra tương tác qua hệ enzym Gan Cytochrome P450 (CYP3A4, CYP2D6, CYP2C9).

## 5. Điểm Ngọc Lâm Sàng (Clinical Pearls)
> [!TIP]
> **Kinh nghiệm điều trị:** Luôn đánh giá chức năng thận trước khi khởi đầu và định kỳ trong quá trình điều trị để tối ưu hóa liều dùng.
`;
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`✅ Đã tạo ${essentialDrugs.length} files trong 3.2. Kho dược thư & tương tác thuốc.`);

// ═════════════════════════════════════════════════════════════════════════════
// 3. KHO CẬN LÂM SÀNG & XÉT NGHIỆM (3.3)
// ═════════════════════════════════════════════════════════════════════════════
const labTests = [
  { id: 'wbc', name: 'Bạch cầu (WBC - White Blood Cell)', unit: 'G/L', cat: 'Huyết học', spec: 'Huyết học & Truyền nhiễm', kw: ['WBC', 'bạch cầu', 'nhiễm trùng', 'leukocytosis'] },
  { id: 'hemoglobin', name: 'Hemoglobin (Hb / Hgb)', unit: 'g/dL', cat: 'Huyết học', spec: 'Huyết học & Cấp cứu', kw: ['Hemoglobin', 'Hb', 'thiếu máu', 'truyền máu'] },
  { id: 'platelets', name: 'Tiểu cầu (PLT - Platelets)', unit: 'G/L', cat: 'Huyết học', spec: 'Huyết học & Đông máu', kw: ['Tiểu cầu', 'PLT', 'giảm tiểu cầu', 'xuất huyết'] },
  { id: 'pt_inr', name: 'Thời gian Prothrombin & Tỷ số INR (PT/INR)', unit: 'Ratio', cat: 'Đông máu', spec: 'Tim mạch & Huyết học', kw: ['PT', 'INR', 'đông máu ngoại sinh', 'Warfarin'] },
  { id: 'aptt', name: 'Thời gian Thromboplastin một phần hoạt hóa (aPTT)', unit: 'Giây', cat: 'Đông máu', spec: 'Huyết học & Hồi sức', kw: ['aPTT', 'Heparin', 'đông máu nội sinh'] },
  { id: 'd_dimer', name: 'D-dimer Huyết khối', unit: 'ng/mL', cat: 'Đông máu', spec: 'Tim mạch & Hô hấp', kw: ['D-dimer', 'huyết khối', 'PE', 'DVT', 'DIC'] },
  { id: 'troponin_hs', name: 'Troponin tim siêu nhạy (hs-cTnI / hs-cTnT)', unit: 'ng/L', cat: 'Tim mạch', spec: 'Tim mạch & Cấp cứu', kw: ['Troponin', 'hs-cTnI', 'hs-cTnT', 'nhồi máu cơ tim', 'ACS'] },
  { id: 'nt_probnp', name: 'NT-proBNP Dấu ấn Suy tim', unit: 'pg/mL', cat: 'Tim mạch', spec: 'Tim mạch', kw: ['NT-proBNP', 'BNP', 'suy tim', 'khó thở do tim'] },
  { id: 'creatinine', name: 'Creatinine máu & Độ lọc cầu thận', unit: 'µmol/L', cat: 'Sinh hóa Thận', spec: 'Thận - Tiết niệu', kw: ['Creatinine', 'suy thận', 'AKI', 'CKD', 'eGFR'] },
  { id: 'urea_bun', name: 'Urea máu & Blood Urea Nitrogen (BUN)', unit: 'mmol/L', cat: 'Sinh hóa Thận', spec: 'Thận & Cấp cứu', kw: ['Urea', 'BUN', 'tỷ số BUN/Cr', 'xuất huyết tiêu hóa'] },
  { id: 'ast_alt', name: 'Men gan AST (SGOT) & ALT (SGPT)', unit: 'U/L', cat: 'Sinh hóa Gan', spec: 'Tiêu hóa & Gan mật', kw: ['AST', 'ALT', 'men gan', 'viêm gan', 'hủy hoại tế bào gan'] },
  { id: 'bilirubin', name: 'Bilirubin toàn phần & Trực tiếp', unit: 'µmol/L', cat: 'Sinh hóa Gan', spec: 'Tiêu hóa & Gan mật', kw: ['Bilirubin', 'vàng da', 'tắc mật', 'tán huyết'] },
  { id: 'sodium', name: 'Natri máu (Na+)', unit: 'mmol/L', cat: 'Điện giải', spec: 'Hồi sức & Thận', kw: ['Natri', 'Na+', 'hạ natri', 'tăng natri', 'phù não'] },
  { id: 'potassium', name: 'Kali máu (K+)', unit: 'mmol/L', cat: 'Điện giải', spec: 'Hồi sức & Tim mạch', kw: ['Kali', 'K+', 'tăng kali', 'hạ kali', 'loạn nhịp tim'] },
  { id: 'chloride', name: 'Clo máu (Cl-)', unit: 'mmol/L', cat: 'Điện giải', spec: 'Hồi sức & Thận', kw: ['Clo', 'Cl-', 'Anion Gap', 'toan chuyển hóa'] },
  { id: 'calcium_total', name: 'Canxi máu toàn phần & Canxi ion hóa', unit: 'mmol/L', cat: 'Điện giải', spec: 'Nội tiết & Hồi sức', kw: ['Canxi', 'Ca2+', 'hạ canxi', 'tăng canxi', 'co giật'] },
  { id: 'procalcitonin', name: 'Procalcitonin (PCT) Dấu ấn Nhiễm khuẩn nặng', unit: 'ng/mL', cat: 'Miễn dịch & Nhiễm khuẩn', spec: 'Hồi sức & Truyền nhiễm', kw: ['Procalcitonin', 'PCT', 'nhiễm khuẩn huyết', 'kháng sinh'] },
  { id: 'crp', name: 'C-Reactive Protein (CRP / hs-CRP)', unit: 'mg/L', cat: 'Sinh hóa Miễn dịch', spec: 'Truyền nhiễm & Nội khoa', kw: ['CRP', 'protein phản ứng C', 'viêm', 'nhiễm trùng'] },
  { id: 'abg_panel', name: 'Khí máu Động mạch toàn phần (pH, PaO2, PaCO2, HCO3-)', unit: 'Panel', cat: 'Khí máu & Thăng bằng Toan Kiềm', spec: 'Hồi sức & Hô hấp', kw: ['ABG', 'khí máu', 'pH', 'PaO2', 'PaCO2', 'HCO3-', 'suy hô hấp'] },
  { id: 'lactate', name: 'Lactate máu Đánh giá tưới máu mô', unit: 'mmol/L', cat: 'Hồi sức Cấp cứu', spec: 'Hồi sức - Cấp cứu', kw: ['Lactate', 'toan lactic', 'sốc nhiễm khuẩn', 'giảm tưới máu mô'] }
];

labTests.forEach(t => {
  const fileName = `CLS_${t.id.toUpperCase()}_P1.md`;
  const filePath = path.join(dir33, fileName);
  const content = `---
title: "Cận lâm sàng: ${t.name}"
aliases: ["${t.name}", "${t.id.toUpperCase()}", "${t.kw.join('", "')}"]
keywords: ["${t.kw.join('", "')}"]
icd10: ["Z01.89"]
specialty: "${t.spec}"
tags: ["CliniPortal", "Diagnostics", "KhoCanLamSang", "${t.spec}"]
type: "lab_test"
---

# Cận Lâm Sàng: ${t.name}

> [!NOTE]
> **Nhóm xét nghiệm:** ${t.cat} | **Đơn vị đo:** ${t.unit} | **Chuyên khoa:** ${t.spec}

## 1. Mục Đích & Chỉ Định Lâm Sàng
Xét nghiệm **${t.name}** được chỉ định để chẩn đoán, theo dõi tiến triển bệnh, đánh giá mức độ tổn thương cơ quan đích và hướng dẫn điều chỉnh phác đồ điều trị kịp thời.

## 2. Khoảng Tham Chiếu Bình Thường & Ngưỡng Báo Động (Critical Values)

| Chỉ số / Phân loại | Giá trị tham chiếu | Ngưỡng báo động đỏ (Critical) |
| :--- | :--- | :--- |
| **Giá trị chuẩn (Bình thường)** | Trong giới hạn sinh lý | Không có cờ đỏ cảnh báo |
| **Bất thường tăng cao (High)** | Vượt ngưỡng trên | Cần theo dõi sát / Tìm nguyên nhân |
| **Báo động nguy kịch (Critical Alert)** | Quá cao hoặc quá thấp | **Xử trí cấp cứu ngay lập tức** |

## 3. Nguyên Nhân Gây Bất Thường Thường Gặp
- **Khi chỉ số tăng cao:** Nhiễm trùng, hoại tử mô, suy giảm đào thải tại thận/gan, hoặc phản ứng viêm cấp tính.
- **Khi chỉ số giảm thấp:** Mất dịch/máu, suy giảm tổng hợp, pha loãng thể tích hoặc tiêu thụ quá mức.

## 4. Thuật Toán Biện Luận Lâm Sàng Từng Bước
1. **Bước 1:** Đối chiếu kết quả với bệnh cảnh lâm sàng và sinh hiệu hiện tại.
2. **Bước 2:** Đánh giá tính chất thay đổi động học (Delta change so với kết quả trước đó).
3. **Bước 3:** Loại trừ các nguyên nhân sai số lấy mẫu hoặc tán huyết ống nghiệm.
4. **Bước 4:** Ra y lệnh điều chỉnh phác đồ hoặc chỉ định xét nghiệm xác chẩn bổ sung.

## 5. Điểm Ngọc Lâm Sàng (Clinical Pearls)
> [!TIP]
> **Ghi nhớ:** Không điều trị con số xét nghiệm đơn thuần, luôn điều trị toàn diện tình trạng lâm sàng của người bệnh.
`;
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`✅ Đã tạo ${labTests.length} files trong 3.3. Kho cận lâm sàng & xét nghiệm.`);
