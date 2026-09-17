#!/usr/bin/env node

/**
 * 🟣 AGENT-05: JSON Schema & Clinical Rules Validator
 * CliniPortal QA Agent Squad
 * 
 * Chức năng:
 *  1. Quét toàn bộ file JSON bệnh học trong src/content/knowledge-vault/data/diseases/.
 *  2. Phát hiện lỗi ký tự gạch dưới bị escape sai cú pháp ("\\_" thay vì "_").
 *  3. Xác thực cấu trúc mảng suy luận lâm sàng `dd`:
 *     - Mỗi phần tử phải là mảng đúng 3 giá trị: [symptom_id, weight, type].
 *     - Trọng số weight phải là số hợp lệ.
 *     - Loại tương tác type phải thuộc tập hợp hợp lệ: ['dt', 'gy', 'ht', 'loaitru'].
 *  4. Phát hiện triệu chứng trùng lặp (duplicate symptoms) trong cùng một bệnh.
 *  5. Hỗ trợ cờ `--fix` để tự động unescape và định dạng lại JSON chuẩn mực.
 * 
 * Sử dụng:
 *  node tools/qa/agent05-json-schema-validator.mjs
 *  node tools/qa/agent05-json-schema-validator.mjs --fix
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const DISEASES_DIR = path.join(ROOT_DIR, 'src/content/knowledge-vault/data/diseases');
const CATALOG_FILE = path.join(ROOT_DIR, 'src/content/knowledge-vault/data/vault-catalog.json');

const isFixMode = process.argv.includes('--fix');

const VALID_DD_TYPES = new Set(['dt', 'gy', 'ht', 'loaitru']);

console.log('\n=================================================================');
console.log('🟣 AGENT-05: JSON Schema & Clinical Rules Validator — Starting Audit...');
console.log('=================================================================\n');

let totalFilesChecked = 0;
let totalErrors = 0;
let totalWarnings = 0;
const report = [];

if (!fs.existsSync(DISEASES_DIR)) {
  console.error(`❌ Thư mục dữ liệu bệnh học không tồn tại: ${DISEASES_DIR}`);
  process.exit(1);
}

const diseaseFiles = fs.readdirSync(DISEASES_DIR).filter(f => f.endsWith('.json'));

for (const fileName of diseaseFiles) {
  const filePath = path.join(DISEASES_DIR, fileName);
  totalFilesChecked++;
  const rawText = fs.readFileSync(filePath, 'utf8');

  const fileIssues = {
    file: fileName,
    escapedUnderscores: 0,
    malformedDdEntries: [],
    duplicateSymptoms: [],
    invalidTypes: []
  };

  // 1. Quét escaped underscores
  const escapedMatches = rawText.match(/\\_/g);
  if (escapedMatches) {
    fileIssues.escapedUnderscores = escapedMatches.length;
    totalErrors += escapedMatches.length;
  }

  // 2. Thử parse JSON
  let data;
  try {
    // Nếu có escaped underscores và đang chạy test, parse sau khi replace tạm để kiểm tra schema
    data = JSON.parse(rawText.replace(/\\_/g, '_'));
  } catch (err) {
    console.error(`❌ [SYNTAX ERROR] Không thể parse JSON tệp ${fileName}: ${err.message}`);
    totalErrors++;
    continue;
  }

  // 3. Kiểm tra cấu trúc bệnh học
  if (Array.isArray(data)) {
    for (const disease of data) {
      validateDisease(disease, fileIssues);
    }
  } else if (typeof data === 'object' && data !== null) {
    // Trường hợp file là object chứa danh sách bệnh
    for (const [key, val] of Object.entries(data)) {
      if (typeof val === 'object' && val !== null) {
        validateDisease(val, fileIssues, key);
      }
    }
  }

  // 4. Xử lý --fix
  if (isFixMode && fileIssues.escapedUnderscores > 0) {
    const fixedContent = rawText.replace(/\\_/g, '_');
    // Format lại đẹp
    try {
      const parsedObj = JSON.parse(fixedContent);
      fs.writeFileSync(filePath, JSON.stringify(parsedObj, null, 2), 'utf8');
      console.log(`[FIXED] Đã tự động unescape và định dạng tệp: ${fileName}`);
    } catch {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`[FIXED] Đã unescape tệp: ${fileName}`);
    }
  }

  if (
    fileIssues.escapedUnderscores > 0 ||
    fileIssues.malformedDdEntries.length > 0 ||
    fileIssues.duplicateSymptoms.length > 0 ||
    fileIssues.invalidTypes.length > 0
  ) {
    report.push(fileIssues);
  }
}

function validateDisease(disease, fileIssues, diseaseKey = disease.id || disease.name || 'unknown') {
  if (!disease.dd) return;

  if (!Array.isArray(disease.dd)) {
    fileIssues.malformedDdEntries.push(`[${diseaseKey}] dd phải là mảng Array`);
    totalErrors++;
    return;
  }

  const seenSymptoms = new Set();

  for (let i = 0; i < disease.dd.length; i++) {
    const entry = disease.dd[i];

    if (!Array.isArray(entry) || entry.length < 3) {
      fileIssues.malformedDdEntries.push(`[${diseaseKey}] dd[${i}] không đủ 3 phần tử: ${JSON.stringify(entry)}`);
      totalErrors++;
      continue;
    }

    const [symptomId, weight, type] = entry;

    if (typeof symptomId !== 'string') {
      fileIssues.malformedDdEntries.push(`[${diseaseKey}] dd[${i}][0] symptomId phải là chuỗi`);
      totalErrors++;
    } else {
      if (seenSymptoms.has(symptomId)) {
        fileIssues.duplicateSymptoms.push(`[${diseaseKey}] Triệu chứng trùng lặp: "${symptomId}"`);
        totalWarnings++;
      }
      seenSymptoms.add(symptomId);
    }

    if (typeof weight !== 'number' || isNaN(weight)) {
      fileIssues.malformedDdEntries.push(`[${diseaseKey}] dd[${i}][1] trọng số phải là số: ${weight}`);
      totalErrors++;
    }

    if (typeof type !== 'string' || !VALID_DD_TYPES.has(type)) {
      fileIssues.invalidTypes.push(`[${diseaseKey}] dd[${i}][2] loại tương tác không hợp lệ: "${type}" (chuẩn: dt, gy, ht, loaitru)`);
      totalWarnings++;
    }
  }
}

// 5. Kiểm tra vault-catalog.json nếu có
if (fs.existsSync(CATALOG_FILE)) {
  try {
    const catalogData = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
    console.log(`✅ [PASS] Đã kiểm tra vault-catalog.json (${Array.isArray(catalogData) ? catalogData.length : Object.keys(catalogData).length} mục đăng ký).`);
  } catch (err) {
    console.error(`❌ [ERROR] vault-catalog.json bị lỗi cú pháp: ${err.message}`);
    totalErrors++;
  }
}

// In kết quả
if (report.length === 0 && totalErrors === 0) {
  console.log(`✅ [PASS] 100% Hoàn hảo! Toàn bộ ${totalFilesChecked} tệp JSON bệnh học chuẩn schema.`);
  console.log(`   - Không còn lỗi escaped underscores (\\_).`);
  console.log(`   - Mảng suy luận dd [symptom, weight, type] đúng cấu trúc.`);
  console.log(`-----------------------------------------------------------------\n`);
  process.exit(0);
} else {
  console.log(`⚠️  Phát hiện vấn đề trên ${report.length} tệp dữ liệu:\n`);
  for (const item of report) {
    console.log(`📄 Tệp: ${item.file}`);
    if (item.escapedUnderscores > 0) {
      console.log(`   ❌ [ERROR] Có ${item.escapedUnderscores} ký tự "\\_" bị escape sai cú pháp (Chạy --fix để sửa)`);
    }
    for (const msg of item.malformedDdEntries) {
      console.log(`   ❌ [ERROR] ${msg}`);
    }
    for (const msg of item.duplicateSymptoms) {
      console.log(`   ⚠️  [WARNING] ${msg}`);
    }
    for (const msg of item.invalidTypes) {
      console.log(`   💡 [SUGGESTION] ${msg}`);
    }
    console.log('');
  }

  console.log(`-----------------------------------------------------------------`);
  console.log(`Tổng kết: ${totalErrors} Errors | ${totalWarnings} Warnings & Suggestions`);
  console.log(`-----------------------------------------------------------------\n`);

  if (totalErrors > 0 && !isFixMode) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}
