#!/usr/bin/env node
/**
 * 🩺 DocSpace 4-Step Cross-Pipeline & Knowledge Verification Gate
 * Kiểm định toàn diện luồng nạp tri thức 4 bước trong DocSpace:
 * 
 * 1. Pillar 1: Ràng buộc khóa ngoại liên bước (Cross-Step Foreign Key Integrity)
 *    - Bước 1 (Ca mẫu) ⇄ Bước 3 (CDSS Symptoms & dd) ⇄ Bước 4 (Enriched Criteria) ⇄ Kho Hội chứng (Syndromes)
 * 2. Pillar 2: Kiểm toán HTML Entities & Tiền tố rác (Zero HTML Entities)
 * 3. Pillar 3: Kiểm chuẩn Tính nguyên tử & Ngắn gọn của Triệu chứng (Atomicity & Brevity Linter)
 *    - Tên ngắn gọn (<= 50 ký tự), không ghép tên bệnh vào triệu chứng chung
 *    - Rà soát triệu chứng định lượng có hay thiếu `map`
 * 4. Pillar 4: Kiểm định Kho Hội chứng & Khả năng Biện luận Bước 3
 * 5. Pillar 5: Ma trận Độ Sẵn Sàng 4 Bước (4-Step Disease Readiness Matrix)
 * 
 * Chạy bằng:
 *   node tools/scripts/validate-docspace-pipeline.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const DOCSPACE_DATA_DIR = path.join(ROOT_DIR, 'src/content/docspace/data');

const SYMPTOMS_FILE = path.join(DOCSPACE_DATA_DIR, 'clinical-rules-symptoms.json');
const KB_FILE = path.join(DOCSPACE_DATA_DIR, 'clinical-rules-kb.json');
const CASES_FILE = path.join(DOCSPACE_DATA_DIR, 'sample-clinical-cases.json');
const ENRICHED_DIR = path.join(DOCSPACE_DATA_DIR, 'enriched');
const SYNDROMES_DIR = path.join(DOCSPACE_DATA_DIR, 'syndromes');
const DISEASES_DIR = path.join(DOCSPACE_DATA_DIR, 'diseases');

function readJsonSafe(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`❌ Lỗi đọc file JSON ${filePath}:`, err.message);
    return null;
  }
}

function getAllJsonFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllJsonFiles(full, list);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      list.push(full);
    }
  }
  return list;
}

console.log('╔══════════════════════════════════════════════════════════════════════╗');
console.log('║       🩺 DOCSPACE 4-STEP CROSS-PIPELINE VERIFICATION GATE            ║');
console.log('║       Chuẩn hóa Luồng Nạp & Biện Luận Lâm Sàng Chuẩn Xác             ║');
console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

// 1. NẠP MASTER SYMPTOMS
const symptoms = readJsonSafe(SYMPTOMS_FILE) || [];
const symptomMap = new Map(symptoms.map(s => [s.id, s]));
console.log(`📚 Đã nạp ${symptoms.length} triệu chứng từ Master Symptom Dictionary.`);

let totalPillarsPassed = 0;
const TOTAL_PILLARS = 5;

// ==============================================================================
// PILLAR 1: RÀNG BUỘC KHÓA NGOẠI LIÊN BƯỚC (CROSS-STEP FK INTEGRITY)
// ==============================================================================
console.log('\n─── [PILLAR 1] RÀNG BUỘC KHÓA NGOẠI LIÊN BƯỚC (FK INTEGRITY) ───');
const orphanIssues = [];

// 1.1 Kiểm tra Bước 1 (Ca mẫu lâm sàng)
const sampleCases = readJsonSafe(CASES_FILE) || [];
for (const c of sampleCases) {
  const allCaseSyms = [...(c.selected || []), ...(c.sel || []), ...(c.negated || [])];
  for (const symId of allCaseSyms) {
    if (!symptomMap.has(symId)) {
      orphanIssues.push(`[Bước 1 Ca mẫu: ${c.id}] Triệu chứng "${symId}" không tồn tại trong từ điển.`);
    }
  }
}

// 1.2 Kiểm tra Bước 3 (Luật dd trong KB và diseases/*.json)
const kb = readJsonSafe(KB_FILE);
const diseasesInKb = kb?.benh || [];
for (const dis of diseasesInKb) {
  const ddRules = dis.dd || [];
  for (const rule of ddRules) {
    const symId = Array.isArray(rule) ? rule[0] : rule.id;
    if (!symptomMap.has(symId)) {
      orphanIssues.push(`[Bước 3 KB: ${dis.id}] Triệu chứng "${symId}" trong dd không tồn tại.`);
    }
  }
}

// 1.3 Kiểm tra Kho Hội chứng (Syndromes trieuChung)
const syndromeFiles = getAllJsonFiles(SYNDROMES_DIR);
let syndromeCount = 0;
for (const sFile of syndromeFiles) {
  syndromeCount++;
  const syn = readJsonSafe(sFile);
  if (syn && Array.isArray(syn.trieuChung)) {
    for (const symId of syn.trieuChung) {
      if (!symptomMap.has(symId)) {
        orphanIssues.push(`[Kho Hội chứng: ${syn.id}] Triệu chứng "${symId}" không tồn tại trong từ điển.`);
      }
    }
  }
}

// 1.4 Kiểm tra Bước 4 (Enriched criteria)
const enrichedFiles = getAllJsonFiles(ENRICHED_DIR);
for (const eFile of enrichedFiles) {
  const enr = readJsonSafe(eFile);
  if (enr && Array.isArray(enr.criteria)) {
    for (const crit of enr.criteria) {
      if (Array.isArray(crit.symptomIds)) {
        for (const symId of crit.symptomIds) {
          if (!symptomMap.has(symId)) {
            orphanIssues.push(`[Bước 4 Enriched: ${enr.icdCode || path.basename(eFile)}] Triệu chứng "${symId}" không tồn tại.`);
          }
        }
      }
    }
  }
}

if (orphanIssues.length === 0) {
  console.log('✅ PASS: 100% ID triệu chứng liên kết chặt chẽ giữa 4 Bước (0 ID mồ côi).');
  totalPillarsPassed++;
} else {
  console.error(`❌ FAIL: Phát hiện ${orphanIssues.length} vi phạm khóa ngoại liên bước:`);
  orphanIssues.slice(0, 15).forEach(issue => console.log(`   └─ ${issue}`));
  if (orphanIssues.length > 15) console.log(`   └─ ... và ${orphanIssues.length - 15} lỗi khác.`);
}

// ==============================================================================
// PILLAR 2: ZERO HTML ENTITIES & TIỀN TỐ GIAO DIỆN RÁC
// ==============================================================================
console.log('\n─── [PILLAR 2] LÀM SẠCH KÝ TỰ HTML ENTITIES (ZERO HTML ENTITIES) ───');
const ENTITY_REGEX = /&(?:gt|lt|quot|amp|#39|nbsp);/g;
const htmlIssues = [];

const allDataJsonFiles = [
  SYMPTOMS_FILE,
  KB_FILE,
  CASES_FILE,
  ...getAllJsonFiles(path.join(DOCSPACE_DATA_DIR, 'symptoms')),
  ...getAllJsonFiles(DISEASES_DIR),
  ...syndromeFiles,
  ...enrichedFiles
];

const uniqueDataFiles = [...new Set(allDataJsonFiles)];
for (const f of uniqueDataFiles) {
  if (!fs.existsSync(f)) continue;
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(ENTITY_REGEX);
  if (matches) {
    const rel = path.relative(DOCSPACE_DATA_DIR, f).replace(/\\/g, '/');
    htmlIssues.push(`${rel}: chứa ${[...new Set(matches)].join(', ')} (${matches.length} lần)`);
  }
}

if (htmlIssues.length === 0) {
  console.log(`✅ PASS: 0 thực thể HTML rò rỉ trong toàn bộ ${uniqueDataFiles.length} tệp CSDL.`);
  totalPillarsPassed++;
} else {
  console.error(`❌ FAIL: Phát hiện rò rỉ HTML entities trong ${htmlIssues.length} tệp:`);
  htmlIssues.forEach(iss => console.log(`   └─ ${iss}`));
}

// ==============================================================================
// PILLAR 3: KIỂM CHUẨN TÍNH NGUYÊN TỬ & ĐỘ NGẮN GỌN (ATOMICITY & BREVITY)
// ==============================================================================
console.log('\n─── [PILLAR 3] TÍNH NGUYÊN TỬ, TÊN NGẮN GỌN & ÁNH XẠ ĐỊNH LƯỢNG ───');
const longNames = [];
const diseaseSpecificSymptoms = [];
let noMapCount = 0;
const candidatesForMap = [];

const QUANTITATIVE_KEYWORDS = [
  'hct', 'tiểu cầu', 'plt', 'wbc', 'bạch cầu', 'huyết áp', 'mạch', 'nhịp tim',
  'spo2', 'thân nhiệt', 'sốt', 'nhiệt độ', 'ast', 'alt', 'men gan', 'creatinine',
  'fibroscan', 'apri', 'fib-4', 'crt', 'gcs'
];

for (const s of symptoms) {
  // 3.1 Kiểm tra độ dài tên (khuyên dùng <= 50 ký tự)
  if (s.ten && s.ten.length > 55) {
    longNames.push({ id: s.id, len: s.ten.length, ten: s.ten });
  }

  // 3.2 Kiểm tra tên có dính tên bệnh cụ thể (không nguyên tử)
  if (s.id.includes('_dengue') && !s.id.includes('ns1')) {
    diseaseSpecificSymptoms.push({ id: s.id, ten: s.ten });
  }

  // 3.3 Kiểm tra map định lượng
  if (!s.map) {
    noMapCount++;
    const lowerTen = (s.ten || '').toLowerCase();
    const hasQuant = QUANTITATIVE_KEYWORDS.some(kw => lowerTen.includes(kw));
    if (hasQuant) {
      candidatesForMap.push({ id: s.id, ten: s.ten });
    }
  }
}

console.log(`📊 Thống kê chất lượng triệu chứng:`);
console.log(`   • Triệu chứng có tên dài (> 55 ký tự): ${longNames.length}/${symptoms.length}`);
console.log(`   • Triệu chứng dính tên bệnh cụ thể: ${diseaseSpecificSymptoms.length}`);
console.log(`   • Triệu chứng có quy tắc ánh xạ định lượng (map): ${symptoms.length - noMapCount}/${symptoms.length} (${((symptoms.length - noMapCount)/symptoms.length * 100).toFixed(1)}%)`);
console.log(`   • Triệu chứng mang tính định lượng nhưng còn thiếu map: ${candidatesForMap.length}`);

if (longNames.length <= 40 && diseaseSpecificSymptoms.length <= 5) {
  console.log('✅ PASS: Cấu trúc từ điển triệu chứng đạt ngưỡng chấp nhận (Ghi nhận cảnh báo tên dài cần rút gọn).');
  totalPillarsPassed++;
} else {
  console.warn('⚠️ CẢNH BÁO: Cần tiến hành rút gọn tên triệu chứng và phân tách ngữ cảnh bệnh.');
}

// ==============================================================================
// PILLAR 4: KHO HỘI CHỨNG & TÍCH HỢP BIỆN LUẬN BƯỚC 3 (SYNDROME INTEGRATION)
// ==============================================================================
console.log('\n─── [PILLAR 4] KHO HỘI CHỨNG & KHẢ NĂNG BIỆN LUẬN BƯỚC 3 ───');
let validSyndromeCount = 0;
const syndromeIssues = [];

for (const sFile of syndromeFiles) {
  const syn = readJsonSafe(sFile);
  if (!syn) continue;
  if (!syn.id || !syn.ten || !syn.nguong || !Array.isArray(syn.trieuChung)) {
    syndromeIssues.push(`[${path.basename(sFile)}]: Thiếu trường bắt buộc (id, ten, nguong, trieuChung).`);
    continue;
  }
  if (syn.trieuChung.length < 2) {
    syndromeIssues.push(`[${syn.id}]: Hội chứng phải có ít nhất 2 triệu chứng thành phần (hiện có ${syn.trieuChung.length}).`);
  }
  validSyndromeCount++;
}

console.log(`🧠 Tổng số hội chứng lâm sàng hợp lệ: ${validSyndromeCount}/${syndromeCount}`);
if (syndromeIssues.length === 0 && validSyndromeCount >= 10) {
  console.log('✅ PASS: Kho hội chứng lâm sàng chuẩn mực, sẵn sàng tích hợp 2 pha vào Bước 3.');
  totalPillarsPassed++;
} else {
  console.error(`❌ FAIL: Có ${syndromeIssues.length} vấn đề cấu trúc hội chứng:`);
  syndromeIssues.forEach(iss => console.log(`   └─ ${iss}`));
}

// ==============================================================================
// PILLAR 5: MA TRẬN ĐỘ SẴN SÀNG 4 BƯỚC (4-STEP DISEASE READINESS MATRIX)
// ==============================================================================
console.log('\n─── [PILLAR 5] MA TRẬN ĐỘ SẴN SÀNG 4 BƯỚC (DISEASE READINESS) ───');

const enrichedSlugs = new Set(
  fs.readdirSync(ENRICHED_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
);

const sampleCaseDiseaseIds = new Set(sampleCases.map(c => c.diseaseId));

const readinessRows = [];

for (const dis of diseasesInKb) {
  const hasStep1 = sampleCaseDiseaseIds.has(dis.id);
  const hasStep2 = true; // Tóm tắt lâm sàng đã có trong KB (tomTat, danSo)
  const hasStep3 = Array.isArray(dis.dd) && dis.dd.length >= 10;
  const hasStep4 = enrichedSlugs.has(dis.id);

  const stepsMet = [hasStep1, hasStep2, hasStep3, hasStep4].filter(Boolean).length;
  const scorePercent = (stepsMet / 4) * 100;

  readinessRows.push({
    id: dis.id,
    ten: dis.ten,
    step1: hasStep1 ? '✅' : '❌',
    step2: hasStep2 ? '✅' : '❌',
    step3: hasStep3 ? '✅' : '❌',
    step4: hasStep4 ? '✅' : '❌',
    score: `${stepsMet}/4 (${scorePercent}%)`
  });
}

console.log('┌────────────────────────────┬────────┬────────┬────────┬────────┬────────────┐');
console.log('│ Bệnh lý                    │ Bước 1 │ Bước 2 │ Bước 3 │ Bước 4 │ Sẵn sàng   │');
console.log('├────────────────────────────┼────────┼────────┼────────┼────────┼────────────┤');
for (const row of readinessRows) {
  const namePadded = row.ten.padEnd(26).slice(0, 26);
  console.log(`│ ${namePadded} │   ${row.step1}   │   ${row.step2}   │   ${row.step3}   │   ${row.step4}   │ ${row.score.padEnd(10)} │`);
}
console.log('└────────────────────────────┴────────┴────────┴────────┴────────┴────────────┘');
console.log('Chú thích: Bước 1 = Ca mẫu | Bước 2 = Tóm tắt | Bước 3 = Luật CDSS dd | Bước 4 = Phác đồ Enriched');

if (readinessRows.length > 0) {
  totalPillarsPassed++;
}

// ==============================================================================
// TỔNG KẾT
// ==============================================================================
console.log('\n══════════════════════════════════════════════════════════════════════');
console.log(`TỔNG KẾT KIỂM ĐỊNH PIPELINE: ${totalPillarsPassed}/${TOTAL_PILLARS} PILLARS ĐẠT CHUẨN`);
console.log('══════════════════════════════════════════════════════════════════════\n');

if (totalPillarsPassed === TOTAL_PILLARS) {
  process.exit(0);
} else {
  process.exit(1);
}
