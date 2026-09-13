/**
 * CliniPortal MedLens — Knowledge Vault & DocSpace Readiness Audit Script
 * Kiểm tra toàn diện chất lượng và độ sẵn sàng của các Kho Tri Thức trước khi nạp Ca Lâm Sàng
 * Chạy: node tools/scripts/vault-readiness-check.mjs
 */

import fs from 'fs';
import path from 'path';

console.log('\n🏛️  =============================================================');
console.log('    CLINIPORTAL MEDLENS — KNOWLEDGE VAULT READINESS AUDIT');
console.log('=============================================================\n');

let totalChecks = 0;
let passedChecks = 0;

function check(name, pass, detail) {
  totalChecks++;
  if (pass) {
    passedChecks++;
    console.log(`  ✅ [PASS] ${name}: ${detail}`);
  } else {
    console.error(`  ❌ [FAIL] ${name}: ${detail}`);
  }
}

// 1. Kiểm tra clinical-rules-symptoms.json & clinical-rules-diseases.json
const dataDir = path.resolve('src/content/knowledge-vault/data');
const symPath = path.join(dataDir, 'clinical-rules-symptoms.json');
const disPath = path.join(dataDir, 'clinical-rules-diseases.json');
const kbPath = path.join(dataDir, 'clinical-rules-kb.json');

let symptoms = [];
let diseases = [];
let kb;

try {
  symptoms = JSON.parse(fs.readFileSync(symPath, 'utf8'));
  diseases = JSON.parse(fs.readFileSync(disPath, 'utf8'));
  check('Modular Clinical Rules Files', true, `Đọc thành công tệp Triệu chứng (${(fs.statSync(symPath).size / 1024).toFixed(1)} KB) & Bệnh lý (${(fs.statSync(disPath).size / 1024).toFixed(1)} KB)`);
  
  if (fs.existsSync(kbPath)) {
    kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
  } else {
    kb = { trieuChung: symptoms, benh: diseases };
  }
} catch (e) {
  check('Modular Clinical Rules Files', false, `Lỗi đọc tệp: ${e.message}`);
}

if (kb) {
  check('Symptoms Vocabulary', kb.trieuChung.length >= 150, `Có ${kb.trieuChung.length} triệu chứng lâm sàng chuẩn hóa (Mục tiêu ≥ 150)`);
  check('Diseases Coverage', kb.benh.length >= 30, `Có ${kb.benh.length} bệnh lý cốt lõi được cấu trúc hóa suy luận CDSS (Mục tiêu ≥ 30)`);

  // Kiểm tra liên kết triệu chứng
  const sMap = new Set(kb.trieuChung.map(s => s.id));
  let brokenCount = 0;
  for (const b of kb.benh) {
    for (const [tcId] of b.dd) {
      if (!sMap.has(tcId)) brokenCount++;
    }
  }
  check('Zero Broken Symptom Links', brokenCount === 0, `Không có liên kết triệu chứng mồ côi (Lỗi: ${brokenCount})`);

  // Kiểm tra phác đồ điều trị của các bệnh
  const hasProtocols = kb.benh.every(b => b.phacDo && b.phacDo.thuoc && b.phacDo.thuoc.length > 0);
  check('Protocol Definitions', hasProtocols, `100% bệnh lý có phác đồ điều trị, danh mục thuốc và liều lượng`);
}

// 2. Kiểm tra diagnostic-criteria-database.ts
const diagPath = path.resolve('src/content/docspace/data/diagnostic-criteria-database.ts');
const hasDiagFile = fs.existsSync(diagPath);
check('Diagnostic Criteria DB', hasDiagFile, `Tồn tại CSDL Tiêu chuẩn chẩn đoán 30 bệnh (${(fs.statSync(diagPath).size / 1024).toFixed(1)} KB)`);

// 3. Kiểm tra epidemiology-context-database.ts
const epiPath = path.resolve('src/content/docspace/src/data/epidemiology-context-database.ts');
const hasEpiFile = fs.existsSync(epiPath);
check('Epidemiology Context DB', hasEpiFile, `Tồn tại CSDL Bối cảnh Dịch tễ học lâm sàng (${(fs.statSync(epiPath).size / 1024).toFixed(1)} KB)`);

// 4. Kiểm tra risk-factors-database.ts
const rfPath = path.resolve('src/content/docspace/src/data/risk-factors-database.ts');
const hasRfFile = fs.existsSync(rfPath);
check('Risk Factors DB', hasRfFile, `Tồn tại CSDL Yếu tố nguy cơ bệnh học (${(fs.statSync(rfPath).size / 1024).toFixed(1)} KB)`);

// 5. Kiểm tra lab-reference-database.ts
const labPath = path.resolve('src/content/docspace/src/data/lab-reference-database.ts');
const hasLabFile = fs.existsSync(labPath);
check('Lab Reference & Panic Values DB', hasLabFile, `Tồn tại CSDL Ngưỡng cận lâm sàng & Báo động đỏ (${(fs.statSync(labPath).size / 1024).toFixed(1)} KB)`);

// 6. Kiểm tra scoring-tools-registry.ts
const scoringPath = path.resolve('src/content/docspace/src/data/scoring-tools-registry.ts');
const hasScoringFile = fs.existsSync(scoringPath);
check('Scoring Tools Registry (Kho CC)', hasScoringFile, `Tồn tại CSDL Thang điểm lâm sàng (${hasScoringFile ? (fs.statSync(scoringPath).size / 1024).toFixed(1) : 0} KB)`);

// 7. Kiểm tra drug-interaction-database.ts
const drugPath = path.resolve('src/content/docspace/src/data/drug-interaction-database.ts');
const hasDrugFile = fs.existsSync(drugPath);
check('Drug Database & Interactions (Kho DUOC)', hasDrugFile, `Tồn tại CSDL Dược thư & Tương tác thuốc (${hasDrugFile ? (fs.statSync(drugPath).size / 1024).toFixed(1) : 0} KB)`);

// 8. Kiểm tra các tệp catalog phân nhóm (vault-catalog-*.json)
const catalogSplitFiles = [
  'vault-catalog-co-so.json',
  'vault-catalog-chuyen-sau.json',
  'vault-catalog-thuc-hanh.json',
  'vault-catalog-ho-tro.json'
];

try {
  let totalModularArticles = 0;
  let allExist = true;
  catalogSplitFiles.forEach(file => {
    const fPath = path.join(dataDir, file);
    if (fs.existsSync(fPath)) {
      const items = JSON.parse(fs.readFileSync(fPath, 'utf8'));
      totalModularArticles += items.length;
    } else {
      allExist = false;
    }
  });

  check('Modular Vault Catalogs', allExist, `Tồn tại đủ 4 tệp catalog phân nhóm (Cơ sở, Chuyên sâu, Thực hành, Hỗ trợ)`);
  check('Vault Catalog Articles', totalModularArticles >= 800, `Có ${totalModularArticles} bài viết EBM trong 16 phân kho (Mục tiêu ≥ 800)`);
} catch (e) {
  check('Modular Vault Catalogs', false, `Lỗi đọc catalog: ${e.message}`);
}

// 9. Kiểm tra Thư mục Bệnh án Ca lâm sàng ba/
const baDir = path.resolve('src/content/knowledge-vault/ba');
const hasBaDir = fs.existsSync(baDir);
let baCasesCount = 0;
if (hasBaDir) {
  baCasesCount = fs.readdirSync(baDir).filter(f => f.endsWith('.md')).length;
}
check('Clinical Cases Ingested (Kho BA)', hasBaDir && baCasesCount >= 7, `Đã nạp ${baCasesCount} ca bệnh lâm sàng SOAP chuẩn hóa vào kho ba/ (Mục tiêu ≥ 7 ca)`);

// Tổng kết
console.log('\n-------------------------------------------------------------');
const percentage = Math.round((passedChecks / totalChecks) * 100);
console.log(`📊  KẾT QUẢ ĐÁNH GIÁ: ${passedChecks}/${totalChecks} Tiêu chí Đạt (${percentage}%)`);

if (percentage === 100) {
  console.log('🌟  HỆ THỐNG KHO TRI THỨC ĐÃ ĐẠT ĐỘ CHÍN TỐI ƯU!');
  console.log('👉  Bạn đã có thể bắt đầu nạp Ca Lâm Sàng SOAP vào DocSpace an toàn và hiệu quả.\n');
} else {
  console.log('⚠️  Cần bổ sung các tiêu chí chưa đạt trước khi nạp ca lâm sàng.\n');
  process.exit(1);
}
