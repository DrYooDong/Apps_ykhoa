/**
 * CliniPortal — Bundle Specialty Symptoms
 * Đồng bộ dữ liệu các tệp triệu chứng trong src/content/knowledge-vault/data/symptoms/*.json
 * vào Master Symptoms JSON (clinical-rules-symptoms.json).
 * 
 * Chạy bằng: node tools/scripts/bundle-symptoms.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../src/content/knowledge-vault/data');
const SYMPTOMS_DIR = path.join(DATA_DIR, 'symptoms');
const OUT_SYMPTOMS_PATH = path.join(DATA_DIR, 'clinical-rules-symptoms.json');

export function bundleSymptoms() {
  console.log('🔄 Đang gom các tệp triệu chứng theo hệ cơ quan từ:', SYMPTOMS_DIR);

  if (!fs.existsSync(SYMPTOMS_DIR)) {
    console.error('❌ Không tìm thấy thư mục symptoms!');
    return false;
  }

  const PREFERRED_ORDER = [
    'toan-than.json',
    'tim-mach.json',
    'ho-hap.json',
    'tieu-hoa.json',
    'tiet-nieu.json',
    'noi-tiet.json',
    'than-kinh.json',
    'da-niem.json',
    'huyet-hoc.json',
    'san-phu-khoa.json',
    'can-lam-sang.json',
    'tien-can.json'
  ];

  const allFiles = fs.readdirSync(SYMPTOMS_DIR).filter(f => f.endsWith('.json'));
  const files = [
    ...PREFERRED_ORDER.filter(f => allFiles.includes(f)),
    ...allFiles.filter(f => !PREFERRED_ORDER.includes(f))
  ];

  let allSymptoms = [];
  const seenIds = new Set();
  const summary = {};

  for (const file of files) {
    const fPath = path.join(SYMPTOMS_DIR, file);
    try {
      const items = JSON.parse(fs.readFileSync(fPath, 'utf8'));
      if (Array.isArray(items)) {
        summary[file] = items.length;
        for (const s of items) {
          if (seenIds.has(s.id)) {
            console.warn(`⚠️ Cảnh báo: Trùng lặp mã triệu chứng ID "${s.id}" trong ${file}!`);
          }
          seenIds.add(s.id);
          allSymptoms.push(s);
        }
      }
    } catch (e) {
      console.error(`❌ Lỗi đọc tệp ${file}:`, e.message);
    }
  }

  console.log(`\n✅ Đã quét và gom ${allSymptoms.length} triệu chứng từ ${files.length} tệp hệ cơ quan:`);
  for (const [file, count] of Object.entries(summary)) {
    console.log(`   - ${file.padEnd(20)}: ${count} triệu chứng`);
  }

  // Ghi vào clinical-rules-symptoms.json
  fs.writeFileSync(OUT_SYMPTOMS_PATH, JSON.stringify(allSymptoms, null, 2) + '\n', 'utf8');
  console.log(`\n✅ Đã đồng bộ thành công Master Symptoms: ${OUT_SYMPTOMS_PATH}`);
  console.log('🎉 Hoàn tất gom cụm triệu chứng theo hệ cơ quan!\n');
  return true;
}

// Chạy trực tiếp nếu là entry point
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  bundleSymptoms();
}
