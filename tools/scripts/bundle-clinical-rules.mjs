/**
 * CliniPortal — Bundle Specialty Clinical Rules Diseases
 * Đồng bộ dữ liệu các tệp chuyên khoa trong src/content/knowledge-vault/data/diseases/*.json
 * vào Master Clinical Rules KB (clinical-rules-kb.json).
 * 
 * Chạy bằng: node tools/scripts/bundle-clinical-rules.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../src/content/knowledge-vault/data');
const DISEASES_DIR = path.join(DATA_DIR, 'diseases');
const OUT_KB_PATH = path.join(DATA_DIR, 'clinical-rules-kb.json');

function bundleDiseases() {
  console.log('🔄 Đang gom các tệp bệnh lý chuyên khoa từ:', DISEASES_DIR);

  if (!fs.existsSync(DISEASES_DIR)) {
    console.error('❌ Không tìm thấy thư mục diseases!');
    process.exit(1);
  }

  const PREFERRED_ORDER = [
    'ho-hap.json',
    'tim-mach.json',
    'tieu-hoa.json',
    'tiet-nieu.json',
    'noi-tiet.json',
    'than-kinh.json',
    'toan-than.json',
    'san-phu-khoa.json',
    'truyen-nhiem.json'
  ];
  const allFiles = fs.readdirSync(DISEASES_DIR).filter(f => f.endsWith('.json'));
  const files = [
    ...PREFERRED_ORDER.filter(f => allFiles.includes(f)),
    ...allFiles.filter(f => !PREFERRED_ORDER.includes(f))
  ];
  let allDiseases = [];
  const seenIds = new Set();
  const summary = {};

  for (const file of files) {
    const fPath = path.join(DISEASES_DIR, file);
    try {
      const items = JSON.parse(fs.readFileSync(fPath, 'utf8'));
      if (Array.isArray(items)) {
        summary[file] = items.length;
        let fileModified = false;
        for (const d of items) {
          if (seenIds.has(d.id)) {
            console.warn(`⚠️ Cảnh báo: Trùng lặp mã bệnh ID "${d.id}" trong ${file}!`);
          }
          seenIds.add(d.id);

          // Auto-Healer: Nếu dd bị nhầm thành object { symptom: weight }, chuyển về mảng tuple [id, weight, role]
          if (d.dd && typeof d.dd === 'object' && !Array.isArray(d.dd)) {
            console.warn(`🩹 Auto-Healer: Đang chuyển đổi dd dạng object của bệnh "${d.id}" sang mảng 3 thành phần chuẩn...`);
            d.dd = Object.entries(d.dd).map(([k, v]) => [k, typeof v === 'number' ? v : 3, 'dt']);
            fileModified = true;
          }

          allDiseases.push(d);
        }
        if (fileModified) {
          fs.writeFileSync(fPath, JSON.stringify(items, null, 2), 'utf8');
        }
      }
    } catch (e) {
      console.error(`❌ Lỗi đọc tệp ${file}:`, e.message);
    }
  }

  console.log(`\n✅ Đã quét và kiểm tra ${allDiseases.length} bệnh lý từ ${files.length} tệp chuyên khoa:`);
  for (const [file, count] of Object.entries(summary)) {
    console.log(`   - ${file.padEnd(20)}: ${count} bệnh`);
  }

  // 2. Đồng bộ vào clinical-rules-kb.json (Chỉ gom bệnh lý, tách rời triệu chứng sang clinical-rules-symptoms.json)
  if (fs.existsSync(OUT_KB_PATH)) {
    try {
      const kb = JSON.parse(fs.readFileSync(OUT_KB_PATH, 'utf8'));
      kb.benh = allDiseases;
      delete kb.trieuChung; // Giảm gánh nặng: Triệu chứng đã được quản lý độc lập tại clinical-rules-symptoms.json

      if (!kb.meta) kb.meta = {};
      kb.meta.ten = 'Kho tri thức bệnh học lâm sàng — Master Diseases Database (33 Bệnh lý)';
      kb.meta.capNhat = new Date().toISOString();
      kb.meta.symptomsSource = 'clinical-rules-symptoms.json';
      kb.meta.totalDiseases = allDiseases.length;

      fs.writeFileSync(OUT_KB_PATH, JSON.stringify(kb, null, 2) + '\n', 'utf8');
      console.log(`\n✅ Đã đồng bộ Master KB (Đã tinh gọn, không còn nhân bản triệu chứng): ${OUT_KB_PATH}`);
    } catch (e) {
      console.warn(`⚠️ Không thể cập nhật clinical-rules-kb.json:`, e.message);
    }
  }

  console.log('🎉 Hoàn tất gom cụm bệnh lý theo chuyên khoa!\n');
}

import { bundleSymptoms } from './bundle-symptoms.mjs';

function main() {
  bundleSymptoms();
  bundleDiseases();
}

main();
