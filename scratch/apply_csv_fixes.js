const fs = require('fs');
const path = require('path');

function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let currentVal = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal);
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(currentVal);
      if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
        lines.push(row);
      }
      row = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal || row.length > 0) {
    row.push(currentVal);
    lines.push(row);
  }
  return lines;
}

function serializeCSV(headers, data) {
  const escapeCell = (val) => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  };

  const lines = [];
  lines.push(headers.map(escapeCell).join(','));
  data.forEach(row => {
    lines.push(headers.map(h => escapeCell(row[h] || '')).join(','));
  });
  return lines.join('\r\n');
}

const csvPath = path.resolve('knowledge-vault/_resources/data/clinical_guidelines_rows.csv');
const raw = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(raw);
const headers = rows[0];
let data = rows.slice(1).map((r, idx) => {
  const obj = {};
  headers.forEach((h, hIdx) => {
    obj[h] = r[hIdx] || '';
  });
  return obj;
});

console.log(`Original rows count: ${data.length}`);

// 1. Path Corrections & Cleaning Nonexistent Files
data.forEach(item => {
  // Row 34: Fix Chỉ định nhập viện
  if (item.id === 'guideline_2026_byt_chi_dinh_nhap_vien_79') {
    item.file = 'kho-guidelines/2026-byt-chi-dinh-nhap-vien-cap-cuu.html';
  }
  // Row 66: Fix Low-carb vs Low-fat Chawla
  if (item.id === 'study_2020_low_carb_vs_low_fat_chawla') {
    item.file = 'kho-guidelines/2020-nutrients-lowcarb-vs-lowfat.html';
  }

  // Clear 404 nonexistent files
  const nonexistent = [
    'kho-guidelines/2021-byt-huong-dan-chan-doan-va-dieu-tri-nhiem-nam-xam-lan.html',
    'kho-guidelines/2022-byt-huong-dan-chan-doan-dieu-tri-va-quan-ly-benh-vong-mac-dai-thao-duong.html',
    'kho-guidelines/2023-byt-huong-dan-dieu-tri-du-phong-thuyen-tac-huyet-khoi-tinh-mach.html',
    'kho-guidelines/2023-byt-huong-dan-chan-doan-va-dieu-tri-hoi-chung-dong-mach-vanh-man.html',
    'kho-guidelines/2024-byt-huong-dan-chan-doan-va-dieu-tri-dot-quy-nao.html',
    'kho-guidelines/9789240101876-eng.html',
    'kho-guidelines/the-role-of-the-mediterranean-diet-in-secondary-cardiovascular-disease-prevention.html'
  ];
  if (nonexistent.includes(item.file)) {
    item.file = '';
  }

  // Clear raw PDF file strings
  if (item.file.toLowerCase().endsWith('.pdf')) {
    item.file = '';
  }

  // Set multipart for Lao 2024
  if (item.id === 'guideline_byt_lao_2024') {
    item.parts = JSON.stringify([
      { title: "Phần 1: Chẩn đoán & Lâm sàng", file: "kho-guidelines/2024-byt-lao-p1.html" },
      { title: "Phần 2: Điều trị & Dự phòng", file: "kho-guidelines/2024-byt-lao-p2.html" }
    ]);
  }

  // Set multipart for Viêm gan B BYT 2026
  if (item.id === 'guideline_byt_hbv_2026') {
    item.parts = JSON.stringify([
      { title: "Bản tóm tắt lâm sàng", file: "kho-guidelines/2026-byt-tom-tat-viem-gan-b.html" },
      { title: "Bản hướng dẫn đầy đủ", file: "kho-guidelines/2026-byt-viem-gan-b.html" }
    ]);
  }
});

// 2. Remove Duplicates & Consolidate
// A. Bệnh phổi mô kẽ BYT 2023
const gIld = data.find(d => d.id === 'guideline_2023_byt_benh_phoi_mo_ke');
const sIld = data.find(d => d.id === 'study_2023_byt_benh_phoi_mo_ke');
if (gIld && sIld) {
  gIld.summary = sIld.summary;
  gIld.detailedConclusion = sIld.detailedConclusion;
  data = data.filter(d => d.id !== 'study_2023_byt_benh_phoi_mo_ke');
}

// B. AHA/ACC 2025 High Blood Pressure
const gHtn = data.find(d => d.id === 'guideline_2025_aha_acc_hypertension');
const sHtn = data.find(d => d.id === 'study_1784201407856_17hl4qiwi');
if (gHtn && sHtn) {
  if (!gHtn.sourceUrl) gHtn.sourceUrl = sHtn.sourceUrl;
  if (!gHtn.author) gHtn.author = sHtn.author;
  data = data.filter(d => d.id !== 'study_1784201407856_17hl4qiwi');
}

// C. FOB in Sputum-Negative TB
const sFob1 = data.find(d => d.id === 'study_1783915156968_8wsq0fp4m');
const sFob2 = data.find(d => d.id === 'study_2026_fob_sputum_negative_tb_chauda');
if (sFob1 && sFob2) {
  if (!sFob2.sourceUrl) sFob2.sourceUrl = sFob1.sourceUrl;
  if (!sFob2.author) sFob2.author = sFob1.author;
  data = data.filter(d => d.id !== 'study_1783915156968_8wsq0fp4m');
}

// 3. Add missing records for CKM and SSC 2021
if (!data.some(d => d.file && d.file.includes('2026-aha-acc-ckm-syndrome.html'))) {
  data.push({
    id: 'guideline_2026_aha_acc_ada_asn_ckm_syndrome',
    title: 'Hướng dẫn AHA/ACC/ADA/ASN 2026 về Hội chứng Tim mạch - Thận - Chuyển hóa (CKM Syndrome)',
    drug: 'SGLT2i, GLP-1 RA, Finerenone, Statin, ACEi/ARB',
    sourceType: 'guideline',
    specialty: 'cardio',
    design: 'guideline',
    intervention: 'Sàng lọc đa tầng PREVENT-CVD, can thiệp lối sống, điều trị bảo vệ bộ ba Tim-Thận-Chuyển hóa (SGLT2i, GLP-1 RA, nsMRA Finerenone)',
    primaryEndpoint: 'Dự phòng và làm chậm tiến triển biến cố tim mạch (MACE, suy tim) và bệnh thận mạn giai đoạn cuối (ESKD)',
    keyResults: 'Phân giai đoạn CKM (Stage 0-4b); Sử dụng thang điểm PREVENT dự báo nguy cơ tim mạch - thận 10 năm và 30 năm; Chỉ định phối hợp ức chế SGLT2, đồng vận GLP-1 và đối kháng thụ thể khoáng corticoid không steroid (Finerenone) ở bệnh nhân đái tháo đường típ 2 kèm CKD hoặc suy tim.',
    impact: 'practice-changing',
    year: '2026',
    organization: 'AHA / ACC / ADA / ASN',
    phase: 'Clinical Guideline',
    sampleSize: '',
    population: 'Người lớn có hoặc có nguy cơ mắc hội chứng chuyển hóa, đái tháo đường, bệnh thận mạn hoặc bệnh tim mạch',
    summary: 'Hướng dẫn đồng thuận đa chuyên khoa AHA/ACC/ADA/ASN 2026 chính thức định nghĩa và phân tầng Hội chứng Tim mạch - Thận - Chuyển hóa (CKM) từ Giai đoạn 0 đến 4b. Khuyến cáo tiếp cận tích hợp dự phòng sớm, sử dụng thang điểm PREVENT-CVD và phối hợp sớm các nhóm thuốc điều biến chuyển hóa - bảo vệ cơ quan đích (SGLT2i, GLP-1 RA, Finerenone, Statin, RASi).',
    detailedConclusion: 'Chiến lược quản lý CKM 2026 chuyển dịch từ điều trị từng bệnh lý riêng rẽ sang mô hình tiếp cận đa cơ quan tích hợp, nhấn mạnh sàng lọc albumin niệu (uACR) và eGFR định kỳ, kiểm soát đồng thời các yếu tố nguy cơ tim mạch và chuyển hóa.',
    fdaStatus: 'Đã phê duyệt',
    sourceUrl: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001184',
    file: 'kho-guidelines/2026-aha-acc-ckm-syndrome.html',
    asianData: 'true',
    bookmarked: 'false',
    createdAt: '2026-08-15 08:00:00.000+00',
    author: 'Chiadi E. Ndumele et al.',
    subgroups: '',
    relatedCalculators: 'pages/Công cụ/Thận/CKD_EPI.html',
    relatedFlowcharts: 'pages/Tiếp cận/tiep-can.html',
    relatedDrugs: 'pages/Dược lý/duoc-ly.html',
    matrixEndpoints: '',
    decisionTree: '',
    pocketCard: '',
    citation: 'Ndumele CE, et al. Circulation. 2026; AHA/ACC/ADA/ASN CKM Guideline.',
    radarUrl: '',
    femalePercent: '',
    controlEventRate: '',
    arr: '',
    nnt: '',
    nnh: '',
    applicability: '',
    icd10: '["E11","I50","N18","E78"]',
    parts: '',
    conditionKey: 'ckd'
  });
}

if (!data.some(d => d.file && d.file.includes('2021-ssc-soc-nhiem-khuan-sepsis3.html'))) {
  data.push({
    id: 'guideline_2021_ssc_soc_nhiem_khuan_sepsis3',
    title: 'Phác Đồ Xử Trí Cấp Cứu Sốc Nhiễm Khuẩn (Sepsis-3) & SSC 2021',
    drug: 'Norepinephrine, Vasopressin, Kháng sinh phổ rộng, Hydrocortisone',
    sourceType: 'guideline',
    specialty: 'crit',
    design: 'guideline',
    intervention: 'Gói hồi sức 1 giờ (Hour-1 Bundle): đo Lactate, cấy máu, dùng kháng sinh tĩnh mạch phổ rộng trong 1h, bù dịch 30ml/kg dịch tinh thể, dùng vận mạch Norepinephrine duy trì MAP ≥65 mmHg',
    primaryEndpoint: 'Giảm tỷ lệ tử vong trong vòng 28 ngày và phòng ngừa suy đa cơ quan ở bệnh nhân sốc nhiễm khuẩn',
    keyResults: 'Khuyến cáo mạnh sử dụng Norepinephrine là vận mạch đầu tay; bổ sung Vasopressin (0.03 UI/phút) khi liều Nor tăng cao; chỉ định Hydrocortisone khi sốc kháng vận mạch; theo dõi thanh thải lactate để đánh giá đáp ứng hồi sức tưới máu mô.',
    impact: 'practice-changing',
    year: '2021',
    organization: 'Surviving Sepsis Campaign (SCCM & ESICM)',
    phase: 'Clinical Guideline',
    sampleSize: '',
    population: 'Bệnh nhân người lớn nhiễm trùng huyết và sốc nhiễm khuẩn tại khoa cấp cứu và ICU',
    summary: 'Hướng dẫn Surviving Sepsis Campaign (SSC 2021) cập nhật chẩn đoán và điều trị sốc nhiễm khuẩn theo tiêu chuẩn Sepsis-3: Định nghĩa qSOFA/SOFA, gói hành động 1 giờ, tối ưu dịch truyền động học, chiến lược vận mạch sớm và phác đồ kháng sinh cá thể hóa.',
    detailedConclusion: 'Hồi sức sốc nhiễm khuẩn đòi hỏi nhận diện sớm và can thiệp quyết liệt trong 1 giờ đầu, cá thể hóa mục tiêu huyết động MAP ≥65 mmHg, tránh quá tải dịch và kiểm soát nguồn nhiễm trùng kịp thời.',
    fdaStatus: 'N/A',
    sourceUrl: 'https://www.sccm.org/SurvivingSepsisCampaign/Guidelines/Adult-Patients',
    file: 'kho-guidelines/2021-ssc-soc-nhiem-khuan-sepsis3.html',
    asianData: 'true',
    bookmarked: 'false',
    createdAt: '2026-08-15 08:00:00.000+00',
    author: 'Evans L, Rhodes A, Alhazzani W, et al.',
    subgroups: '',
    relatedCalculators: 'pages/Công cụ/Hồi sức/SOFA.html',
    relatedFlowcharts: 'pages/Tiếp cận/tiep-can.html',
    relatedDrugs: 'pages/Dược lý/duoc-ly.html',
    matrixEndpoints: '',
    decisionTree: '',
    pocketCard: '',
    citation: 'Evans L, et al. Crit Care Med. 2021;49(11):e1063-e1143.',
    radarUrl: '',
    femalePercent: '',
    controlEventRate: '',
    arr: '',
    nnt: '',
    nnh: '',
    applicability: '',
    icd10: '["A41.9","R65.21"]',
    parts: '',
    conditionKey: 'icu'
  });
}

// Write back to file
const updatedCSV = serializeCSV(headers, data);
fs.writeFileSync(csvPath, updatedCSV, 'utf8');
console.log('Successfully updated clinical_guidelines_rows.csv!');
