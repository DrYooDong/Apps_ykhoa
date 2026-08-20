const fs = require('fs');

// 1. Cấu hình danh mục Kho Vấn Đề / Bệnh (ICD-10 Mapped Clinical Conditions) hoàn chỉnh, chuẩn hóa
const CONDITIONS_DATA = [
  // Tim Mạch
  { id: 'heart-failure', name: 'Suy tim (Heart Failure)', icd10: ['I50', 'I50.1', 'I50.9', 'I42'], icon: '🫀', color: '#dc2626', bg: '#fef2f2' },
  { id: 'hypertension', name: 'Tăng huyết áp', icd10: ['I10', 'I11', 'I15', 'O14'], icon: '🩺', color: '#0891b2', bg: '#ecfeff' },
  { id: 'af', name: 'Rung nhĩ & Loạn nhịp tim (AF)', icd10: ['I48', 'I48.0', 'I48.9', 'I49'], icon: '⚡', color: '#ea580c', bg: '#fff7ed' },
  { id: 'cad', name: 'Bệnh mạch vành & Hội chứng vành (CAD/CCS/ACS)', icd10: ['I25', 'I20', 'I21', 'I22', 'I73.9'], icon: '❤️‍🔥', color: '#b91c1c', bg: '#fff1f1' },
  { id: 'valvular-heart', name: 'Bệnh van tim & Viêm nội tâm mạc', icd10: ['I34', 'I35', 'I05', 'I33', 'I38'], icon: '💓', color: '#be123c', bg: '#fff1f2' },
  { id: 'cardiogenic-shock', name: 'Sốc tim & Ngừng tuần hoàn (Cardiac Arrest)', icd10: ['R57.0', 'I46', 'I46.9'], icon: '🚨', color: '#e11d48', bg: '#fff1f2' },
  { id: 'syncope', name: 'Ngất & Rối loạn vận mạch (Syncope)', icd10: ['R55', 'I95.1'], icon: '😵‍💫', color: '#64748b', bg: '#f8fafc' },
  { id: 'vte-pe', name: 'Huyết khối tĩnh mạch & Thuyên tắc phổi (VTE/PE)', icd10: ['I82', 'I26', 'I80'], icon: '🩸', color: '#9f1239', bg: '#fff1f2' },

  // Hô Hấp & Cấp Cứu - ICU
  { id: 'copd', name: 'Bệnh phổi tắc nghẽn mạn tính (COPD)', icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'], icon: '🌬️', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'asthma', name: 'Hen phế quản (Asthma)', icd10: ['J45', 'J45.0', 'J45.9'], icon: '💨', color: '#0d9488', bg: '#f0fdfa' },
  { id: 'pneumonia', name: 'Viêm phổi mắc phải cộng đồng & Bệnh viện (CAP/HAP/VAP)', icd10: ['J18', 'J15', 'J13', 'J18.9'], icon: '🫁', color: '#2563eb', bg: '#eff6ff' },
  { id: 'interstitial-lung', name: 'Bệnh phổi mô kẽ & Xơ phổi (ILD)', icd10: ['J84', 'J84.1', 'J84.9'], icon: '🕸️', color: '#475569', bg: '#f8fafc' },
  { id: 'tb', name: 'Lao phổi & Lao ngoài phổi (Tuberculosis)', icd10: ['A15', 'A16', 'A19'], icon: '🔬', color: '#b45309', bg: '#fef3c7' },
  { id: 'ards', name: 'Hội chứng suy hô hấp cấp tiến triển (ARDS)', icd10: ['J80', 'R09.2'], icon: '🫁', color: '#0369a1', bg: '#f0f9ff' },
  { id: 'icu', name: 'Nhiễm trùng Hồi sức & Sốc nhiễm khuẩn (Sepsis/Septic Shock)', icd10: ['A41', 'A41.9', 'R65.2', 'R57.2'], icon: '💉', color: '#059669', bg: '#ecfdf5' },
  { id: 'aki', name: 'Tổn thương thận cấp & Lọc máu liên tục (AKI/CRRT)', icd10: ['N17', 'N17.0', 'N17.9', 'Z99.2'], icon: '💧', color: '#047857', bg: '#f0fdf4' },

  // Nội Tiết, Chuyển Hóa & Dinh Dưỡng
  { id: 'diabetes-t2d', name: 'Đái tháo đường Típ 2 & Biến chứng', icd10: ['E11', 'E11.9', 'E11.2', 'E11.4'], icon: '🩸', color: '#7c3aed', bg: '#faf5ff' },
  { id: 'diabetes-t1d', name: 'Đái tháo đường Típ 1', icd10: ['E10', 'E10.9', 'E10.1'], icon: '💉', color: '#6d28d9', bg: '#f5f3ff' },
  { id: 'thyroid', name: 'Bệnh tuyến giáp (Bão giáp / Suy giáp / Cường giáp)', icd10: ['E05', 'E05.5', 'E03', 'E02'], icon: '🦋', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'dyslipidemia', name: 'Rối loạn lipid máu & Xơ vữa', icd10: ['E78', 'E78.0', 'E78.2', 'E78.5'], icon: '🧪', color: '#d97706', bg: '#fffbeb' },
  { id: 'obesity', name: 'Béo phì & Hội chứng chuyển hóa', icd10: ['E66', 'E66.0', 'E66.9', 'E88.81'], icon: '⚖️', color: '#9a3412', bg: '#fff7ed' },
  { id: 'clinical-nutrition', name: 'Dinh dưỡng lâm sàng & Chế độ ăn điều trị', icd10: ['E46', 'E43', 'E44', 'Z71.3'], icon: '🥗', color: '#16a34a', bg: '#f0fdf4' },

  // Thận - Tiết Niệu
  { id: 'ckd', name: 'Bệnh thận mạn (CKD) & Thiếu máu thận', icd10: ['N18', 'N18.3', 'N18.5', 'N18.9', 'D63.1'], icon: '🧪', color: '#059669', bg: '#ecfdf5' },
  { id: 'nephrotic', name: 'Hội chứng thận hư & Viêm cầu thận', icd10: ['N04', 'N00', 'N03'], icon: '🧫', color: '#0f766e', bg: '#f0fdfa' },
  { id: 'bph-luts', name: 'Tăng sinh lành tính tuyến tiền liệt (BPH/LUTS)', icd10: ['N40', 'N40.1', 'R39.1'], icon: '🚹', color: '#4338ca', bg: '#eef2ff' },
  { id: 'uti', name: 'Nhiễm khuẩn tiết niệu (UTI)', icd10: ['N39.0', 'N10', 'N30'], icon: '🚽', color: '#1d4ed8', bg: '#eff6ff' },

  // Tiêu Hóa - Gan Mật
  { id: 'cirrhosis', name: 'Xơ gan, Tăng áp cửa & Bệnh gan do rượu', icd10: ['K74', 'K70', 'K70.3', 'I85'], icon: '🍷', color: '#991b1b', bg: '#fef2f2' },
  { id: 'masld-mash', name: 'Bệnh gan thoái hóa mỡ (MASLD / MASH / NAFLD)', icd10: ['K76.0', 'K75.8'], icon: '🥑', color: '#65a30d', bg: '#f7fee7' },
  { id: 'gerd-peptic', name: 'Trào ngược GERD & Loét dạ dày tá tràng', icd10: ['K21', 'K25', 'K26', 'K27'], icon: '🔥', color: '#c2410c', bg: '#fff7ed' },
  { id: 'biliary-tract', name: 'Bệnh lý Đường mật, Túi mật & Viêm tụy cấp (TG18/IAP)', icd10: ['K81', 'K81.0', 'K80', 'K83.0', 'K85'], icon: '🟢', color: '#059669', bg: '#ecfdf5' },
  { id: 'ibd', name: 'Viêm ruột mạn tính (IBD) & Hội chứng ruột kích thích (IBS)', icd10: ['K50', 'K51', 'K58'], icon: '🌀', color: '#7e22ce', bg: '#faf5ff' },
  { id: 'ugib', name: 'Xuất huyết tiêu hóa trên (UGIB)', icd10: ['K92.2', 'K92.0', 'I85.0', 'K25.0'], icon: '🩸', color: '#b91c1c', bg: '#fff1f1' },

  // Truyền Nhiễm & Vi Sinh - Kháng Thuốc
  { id: 'hepatitis-b', name: 'Viêm gan vi rút B', icd10: ['B18.0', 'B18.1', 'B16'], icon: '🟡', color: '#ca8a04', bg: '#fefce8' },
  { id: 'hepatitis-c', name: 'Viêm gan vi rút C', icd10: ['B18.2', 'B17.1'], icon: '🟢', color: '#16a34a', bg: '#f0fdf4' },
  { id: 'flu', name: 'Cúm mùa & Nhiễm trùng hô hấp vi rút', icd10: ['J09', 'J10', 'J11'], icon: '🌡️', color: '#2563eb', bg: '#eff6ff' },
  { id: 'covid19', name: 'COVID-19', icd10: ['U07.1', 'U07.2'], icon: '🦠', color: '#6366f1', bg: '#e0e7ff' },
  { id: 'hemorrhagic-fever', name: 'Sốt xuất huyết (Dengue / Marburg / Ebola / Nipah / Hanta)', icd10: ['A90', 'A91', 'A98.3', 'A98.4', 'A98.5', 'A98.8'], icon: '⚠️', color: '#be185d', bg: '#fce7f3' },
  { id: 'measles', name: 'Sởi & Ngoại ban vi rút', icd10: ['B05', 'B05.9'], icon: '🔴', color: '#e11d48', bg: '#fff1f2' },
  { id: 'hfmd', name: 'Bệnh Tay chân miệng (HFMD)', icd10: ['B08.4'], icon: '👶', color: '#ea580c', bg: '#fff7ed' },
  { id: 'mpox', name: 'Bệnh Đậu mùa khỉ (Mpox)', icd10: ['B04'], icon: '🐒', color: '#a16207', bg: '#fefce8' },
  { id: 'invasive-fungal', name: 'Nhiễm nấm xâm lấn (Aspergillus / Candida / Cryptococcus)', icd10: ['B49', 'B44', 'B37.7', 'B45'], icon: '🍄', color: '#854d0e', bg: '#fefce8' },
  { id: 'malaria', name: 'Sốt rét (Malaria)', icd10: ['B50', 'B51', 'B52', 'B54'], icon: '🦟', color: '#d97706', bg: '#fffbeb' },
  { id: 'meningitis', name: 'Viêm màng não & Viêm não (Meningitis)', icd10: ['G00', 'G01', 'G02', 'G03', 'A39'], icon: '🧠', color: '#7c3aed', bg: '#faf5ff' },
  { id: 'diphtheria', name: 'Bệnh Bạch hầu (Diphtheria)', icd10: ['A36', 'A36.0', 'A36.9'], icon: '🛡️', color: '#b45309', bg: '#fef3c7' },
  { id: 'hiv-aids', name: 'HIV/AIDS & Nhiễm trùng cơ hội', icd10: ['B20', 'B24', 'Z21'], icon: '🎗️', color: '#e11d48', bg: '#fff1f2' },
  { id: 'ams-resistance', name: 'Quản lý Kháng sinh (AMS) & Vi khuẩn Kháng thuốc (MRSA/CRE)', icd10: ['Z16', 'U82', 'U83', 'A49.02'], icon: '💊', color: '#047857', bg: '#f0fdf4' },

  // Thần Kinh
  { id: 'stroke', name: 'Đột quỵ thiếu máu não, Xuất huyết & Sa sút trí tuệ', icd10: ['I63', 'I61', 'I64', 'G45', 'F03'], icon: '🧠', color: '#9333ea', bg: '#faf5ff' },
  { id: 'epilepsy', name: 'Động kinh & Co giật', icd10: ['G40', 'G40.9', 'R56'], icon: '⚡', color: '#a855f7', bg: '#f3e8ff' },
  { id: 'headache-migraine', name: 'Đau đầu & Migraine', icd10: ['G43', 'G44', 'G44.2'], icon: '🤯', color: '#6b21a8', bg: '#faf5ff' },
  { id: 'neuro-emergencies', name: 'Cấp cứu Thần kinh & Tụ máu ngoài màng cứng (AEDH)', icd10: ['S06.4', 'S06', 'I62', 'G71.0'], icon: '🚨', color: '#7e22ce', bg: '#faf5ff' },

  // Cơ Xương Khớp & Tự Miễn
  { id: 'gout', name: 'Bệnh Gút (Gout) & Tăng acid uric máu', icd10: ['M10', 'M10.0', 'E79.0'], icon: '🦶', color: '#b91c1c', bg: '#fef2f2' },
  { id: 'ra', name: 'Viêm khớp dạng thấp (RA)', icd10: ['M05', 'M06'], icon: '🦴', color: '#c05621', bg: '#fffaf0' },
  { id: 'osteoporosis', name: 'Loãng xương & Sức khỏe Xương (Vitamin D/Canxi)', icd10: ['M81', 'M80', 'E55.9'], icon: '🦴', color: '#71717a', bg: '#f4f4f5' },
  { id: 'lupus-sle', name: 'Lupus ban đỏ hệ thống & Viêm thận Lupus (SLE)', icd10: ['M32', 'M32.1', 'N08.5'], icon: '🦋', color: '#be185d', bg: '#fce7f3' },

  // Ung Bướu, Huyết Học & Sản Phụ Khoa
  { id: 'solid-cancers', name: 'Ung thư các tạng (Phổi, Gan, Vú, Đại trực tràng, Cổ tử cung)', icd10: ['C34', 'C22', 'C50', 'C18', 'C53', 'D59.5'], icon: '🎗️', color: '#be123c', bg: '#fff1f2' },
  { id: 'hemangioma', name: 'U máu & Bất thường mạch máu (ISSVA)', icd10: ['D18', 'D18.0', 'Q28'], icon: '🩸', color: '#db2777', bg: '#fdf2f8' },
  { id: 'uterine-fibroids', name: 'U xơ tử cung & Bệnh lý Sản Phụ khoa', icd10: ['D25', 'D25.9', 'N80', 'N92.0', 'O14', 'O72'], icon: '🌸', color: '#e11d48', bg: '#fff1f2' }
];

// Tạo nội dung CSV cho clinical_conditions_rows.csv
function formatCSVRow(fields) {
  return fields.map(f => {
    if (f === null || f === undefined) return '';
    const str = String(f);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }).join(',');
}

const condCSVHeader = ['id', 'name', 'icd10', 'icon', 'color', 'bg'];
const condCSVLines = [
  condCSVHeader.join(','),
  ...CONDITIONS_DATA.map(c => formatCSVRow([
    c.id,
    c.name,
    JSON.stringify(c.icd10),
    c.icon,
    c.color,
    c.bg
  ]))
];

fs.writeFileSync('knowledge-vault/_resources/data/clinical_conditions_rows.csv', condCSVLines.join('\n'), 'utf8');
console.log('✅ Updated clinical_conditions_rows.csv with', CONDITIONS_DATA.length, 'standardized conditions');

// Xuất file JSON để dùng cho mapping
fs.writeFileSync('scratch/conditions_master.json', JSON.stringify(CONDITIONS_DATA, null, 2), 'utf8');
