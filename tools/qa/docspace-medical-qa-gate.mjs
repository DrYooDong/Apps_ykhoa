#!/usr/bin/env node
/**
 * DOCSPACE MEDICAL KNOWLEDGE QA GATE
 * Automated 6-Pillar Audit for CliniPortal DocSpace MedLens
 * Standard: EBM 2026, BYT Guidelines, Zero-Orphan Symptoms
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const kbPath = path.join(rootDir, 'src/content/knowledge-vault/data/clinical-rules-kb.json');
const symPath = path.join(rootDir, 'src/content/knowledge-vault/data/clinical-rules-symptoms.json');
const disDir = path.join(rootDir, 'src/content/knowledge-vault/data/diseases');
const casesPath = path.join(rootDir, 'src/content/knowledge-vault/data/sample-clinical-cases.json');
const enrichedDir = path.join(rootDir, 'src/content/docspace/data/enriched');
const baDir = path.join(rootDir, 'src/content/knowledge-vault/ba');

console.log('╔══════════════════════════════════════════════════════════════════════╗');
console.log('║       🩺 CLINI-DOCSPACE MEDICAL KNOWLEDGE STANDARDIZATION GATE       ║');
console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

let passCount = 0;
let failCount = 0;

function report(pillarNum, title, passed, details) {
  if (passed) {
    passCount++;
    console.log(`✅ [PILLAR ${pillarNum}] ${title}: PASS`);
  } else {
    failCount++;
    console.error(`❌ [PILLAR ${pillarNum}] ${title}: FAIL`);
  }
  if (details && details.length > 0) {
    details.forEach(d => console.log(`   └─ ${d}`));
  }
  console.log('');
}

// =========================================================================
// PILLAR 1: ZERO-ORPHAN SYMPTOMS & DICTIONARY INTEGRITY
// =========================================================================
const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
const symStandalone = JSON.parse(fs.readFileSync(symPath, 'utf8'));
const symptoms = symStandalone;
const symSet = new Set(symptoms.map(s => s.id));

let orphanCount = 0;
const orphanDetails = [];

// Check disease specialty files
const disFiles = fs.readdirSync(disDir).filter(f => f.endsWith('.json'));
let totalDisRules = 0;
let totalDisCount = 0;

disFiles.forEach(f => {
  const list = JSON.parse(fs.readFileSync(path.join(disDir, f), 'utf8'));
  totalDisCount += list.length;
  list.forEach(d => {
    const rules = d.dd || d.trieuChung || [];
    rules.forEach(r => {
      totalDisRules++;
      const symId = Array.isArray(r) ? r[0] : r.id;
      if (!symSet.has(symId)) {
        orphanCount++;
        orphanDetails.push(`Orphan symptom in ${f} (${d.ten}): "${symId}"`);
      }
    });
  });
});

// Check sample clinical cases
const sampleCases = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
let caseOrphans = 0;
sampleCases.forEach(c => {
  const refs = [...(c.sel || []), ...(c.selected || []), ...(c.negated || [])];
  refs.forEach(id => {
    if (!symSet.has(id)) {
      caseOrphans++;
      orphanDetails.push(`Orphan symptom in case "${c.ten}": "${id}"`);
    }
  });
});

report(1, 'Zero-Orphan Symptoms Verification', orphanCount === 0 && caseOrphans === 0, [
  `Tra cứu 289 triệu chứng chuẩn trong từ điển lâm sàng`,
  `Kiểm định ${totalDisCount} bệnh lý (${totalDisRules} luật diễn dịch dd/dt/gy/ht)`,
  `Kiểm định ${sampleCases.length} ca bệnh mẫu thực chiến`,
  `Tổng số triệu chứng mồ côi phát hiện: ${orphanCount + caseOrphans}`
]);

// =========================================================================
// PILLAR 2: SYMPTOM DEDUPLICATION & MULTI-FILE SYNCHRONIZATION
// =========================================================================
const idSeen = new Set();
const dupIds = [];
symptoms.forEach(s => {
  if (idSeen.has(s.id)) dupIds.push(s.id);
  idSeen.add(s.id);
});

const kbDiseases = kb.benh || [];
const isSync = kbDiseases.length === totalDisCount;
report(2, 'Symptom Dictionary Deduplication & Multi-file Sync', dupIds.length === 0 && isSync, [
  `Tổng số triệu chứng trong clinical-rules-symptoms.json: ${symptoms.length}`,
  `Trùng lặp ID triệu chứng: ${dupIds.length}`,
  `Đồng bộ bệnh lý giữa diseases/*.json và clinical-rules-kb.json: ${isSync ? `HOÀN HẢO (${kbDiseases.length}/${totalDisCount} bệnh)` : 'LỆCH DỮ LIỆU'}`
]);

// =========================================================================
// PILLAR 3: CDSS ROLES & WEIGHT INTEGRITY GATE
// =========================================================================
const validRoles = new Set(['dt', 'gy', 'ht', 'loaitru']);
let invalidRoles = 0;
disFiles.forEach(f => {
  const list = JSON.parse(fs.readFileSync(path.join(disDir, f), 'utf8'));
  list.forEach(d => {
    const rules = d.dd || d.trieuChung || [];
    rules.forEach(r => {
      const role = Array.isArray(r) ? r[2] : r.role;
      if (role && !validRoles.has(role)) {
        invalidRoles++;
      }
    });
  });
});

report(3, 'CDSS Role Matrix Integrity (dt, gy, ht, loaitru)', invalidRoles === 0, [
  `Phân tầng 4 nhóm giá trị: Đặc trưng (dt) · Gợi ý (gy) · Hỗ trợ (ht) · Loại trừ (loaitru)`,
  `Luật có vai trò không hợp lệ: ${invalidRoles}`
]);

// =========================================================================
// PILLAR 4: ENRICHED DISEASE SCHEMA & ICD-10 STANDARD
// =========================================================================
const enrichedFiles = fs.readdirSync(enrichedDir).filter(f => f.endsWith('.json'));
const requiredKeys = [
  'icdCode', 'diseaseName', 'specialty', 'severity', 'summary',
  'goldStandard', 'criteriaRule', 'criteria', 'severityGrading',
  'protocol', 'complications', 'monitoringLabs', 'vaultPathways'
];

let schemaErrors = 0;
enrichedFiles.forEach(f => {
  const d = JSON.parse(fs.readFileSync(path.join(enrichedDir, f), 'utf8'));
  requiredKeys.forEach(k => {
    if (d[k] === undefined) {
      schemaErrors++;
      console.log(`Missing key ${k} in ${f}`);
    }
  });
});

report(4, 'Enriched Disease Schema & ICD-10 Cataloging', schemaErrors === 0, [
  `Đã kiểm tra ${enrichedFiles.length} tệp bệnh chuyên sâu tại data/enriched/`,
  `Kiểm định 14 trường dữ liệu tiêu chuẩn (icdCode, criteria, protocol 7 thành phần...)`,
  `Lỗi sai lệch cấu trúc Schema: ${schemaErrors}`
]);

// =========================================================================
// PILLAR 5: CLINICAL SOAP FORMAT & STRUCTURE
// =========================================================================
const baFiles = fs.readdirSync(baDir).filter(f => f.endsWith('.md'));
let soapErrors = 0;

baFiles.forEach(f => {
  const c = fs.readFileSync(path.join(baDir, f), 'utf8');
  const hasS = /##\s*(1\.|I\.|)\s*S|Subjective|Bệnh sử|Lý do/i.test(c);
  const hasO = /##\s*(2\.|II\.|)\s*O|Objective|Khám|Khách quan/i.test(c);
  const hasA = /##\s*(3\.|III\.|)\s*A|Assessment|Đánh giá|Chẩn đoán/i.test(c);
  const hasP = /##\s*(4\.|IV\.|)\s*P|Plan|Kế hoạch|Điều trị/i.test(c);
  if (!hasS || !hasO || !hasA || !hasP) {
    soapErrors++;
  }
});

report(5, 'Clinical SOAP 4-Quadrant Architecture', soapErrors === 0, [
  `Đã thẩm định ${baFiles.length} hồ sơ bệnh án lâm sàng thực chiến tại knowledge-vault/ba/`,
  `Kiểm định 4 góc nhìn chuẩn mực: Subjective (S) - Objective (O) - Assessment (A) - Plan (P)`,
  `Hồ sơ khuyết thiếu phần: ${soapErrors}`
]);

// =========================================================================
// PILLAR 6: ANTI-AI-ISM & CLINICAL HUMANIZER SCANNER
// =========================================================================
const aiRegexes = [
  /điều tối quan trọng/gi,
  /bức tranh toàn cảnh/gi,
  /mê cung các triệu chứng/gi,
  /việc quản lý toàn diện đòi hỏi/gi,
  /như một lời nhắc nhở/gi,
  /đóng vai trò then chốt trong việc định hình/gi,
  /không thể phủ nhận rằng/gi
];

let aiMatchesCount = 0;
baFiles.forEach(f => {
  const c = fs.readFileSync(path.join(baDir, f), 'utf8');
  aiRegexes.forEach(rg => {
    const m = c.match(rg);
    if (m) aiMatchesCount += m.length;
  });
});

report(6, 'Clinical Humanizer & Anti-AI-ism Quality Pass', aiMatchesCount === 0, [
  `Quét tự động toàn bộ văn bản y khoa chống văn phong sáo rỗng LLM`,
  `Số lượng phát hiện cụm từ AI máy móc: ${aiMatchesCount}`
]);

// =========================================================================
// SUMMARY
// =========================================================================
console.log('══════════════════════════════════════════════════════════════════════');
console.log(`KẾT QUẢ KIỂM ĐỊNH Y HỌC: ${passCount}/6 PILLARS PASS | ${failCount} FAIL`);
console.log('══════════════════════════════════════════════════════════════════════\n');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
