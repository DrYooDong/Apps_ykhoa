/**
 * CliniPortal — Disease Symptoms Ingester (Prompt 04 Companion CLI)
 * 
 * Tự động tiếp nhận khối JSON trích xuất từ Prompt 04 (symptomsByFile),
 * hợp nhất vào 12 tệp hệ cơ quan trong src/content/knowledge-vault/data/symptoms/*.json,
 * tự động loại bỏ trùng lặp và kích hoạt biên dịch Master Symptom Dictionary.
 * 
 * Cách dùng:
 *   node tools/scripts/ingest-disease-symptoms.mjs <duong-dan-file-json>
 * Ví dụ:
 *   node tools/scripts/ingest-disease-symptoms.mjs tools/scratch/symptoms-dengue.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { bundleSymptoms } from './bundle-symptoms.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../src/content/knowledge-vault/data');
const SYMPTOMS_DIR = path.join(DATA_DIR, 'symptoms');

const VALID_FILES = new Set([
  'toan-than.json',
  'tim-mach.json',
  'ho-hap.json',
  'tieu-hoa.json',
  'than-kinh.json',
  'da-niem.json',
  'can-lam-sang.json',
  'tiet-nieu.json',
  'noi-tiet.json',
  'huyet-hoc.json',
  'san-phu-khoa.json',
  'tien-can.json'
]);

function cleanText(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}

function dedupeArray(arr) {
  if (!Array.isArray(arr)) return [];
  const set = new Set();
  const res = [];
  for (const item of arr) {
    if (typeof item === 'string') {
      const cleaned = cleanText(item);
      const lower = cleaned.toLowerCase();
      if (!set.has(lower) && cleaned.length > 0) {
        set.add(lower);
        res.push(cleaned);
      }
    }
  }
  return res;
}

export function ingestDiseaseSymptoms(filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    console.error(`❌ Lỗi: Không tìm thấy tệp JSON đầu vào tại: ${filePath}`);
    console.log('👉 Cách dùng: node tools/scripts/ingest-disease-symptoms.mjs <duong-dan-file.json>');
    process.exit(1);
  }

  let rawData;
  try {
    const rawContent = fs.readFileSync(filePath, 'utf8').trim();
    // Bóc tách nếu người dùng paste cả khối markdown ```json ... ```
    const jsonStr = rawContent.replace(/^```json\s*/i, '').replace(/```\s*$/i, '');
    rawData = JSON.parse(jsonStr);
  } catch (e) {
    console.error(`❌ Lỗi phân tích cú pháp JSON: ${e.message}`);
    process.exit(1);
  }

  const diseaseName = rawData.benhLy || rawData.diseaseName || 'Bệnh lý';
  const symptomsByFile = rawData.symptomsByFile || rawData;

  console.log(`\n================================================================`);
  console.log(`🩺 TIẾP NHẬN DỮ LIỆU TRIỆU CHỨNG BỆNH HỌC: "${diseaseName}"`);
  console.log(`================================================================`);

  if (!fs.existsSync(SYMPTOMS_DIR)) {
    fs.mkdirSync(SYMPTOMS_DIR, { recursive: true });
  }

  let totalAdded = 0;
  let totalUpdated = 0;
  const fileStats = {};

  for (const [targetFile, incomingList] of Object.entries(symptomsByFile)) {
    if (!VALID_FILES.has(targetFile)) {
      continue;
    }
    if (!Array.isArray(incomingList) || incomingList.length === 0) {
      continue;
    }

    const targetFilePath = path.join(SYMPTOMS_DIR, targetFile);
    let existingSymptoms = [];
    if (fs.existsSync(targetFilePath)) {
      try {
        const fileContent = fs.readFileSync(targetFilePath, 'utf8').trim();
        if (fileContent.length > 0) {
          existingSymptoms = JSON.parse(fileContent);
          if (!Array.isArray(existingSymptoms)) existingSymptoms = [];
        }
      } catch (e) {
        console.warn(`⚠️ Cảnh báo đọc tệp ${targetFile}, khởi tạo mảng mới: ${e.message}`);
        existingSymptoms = [];
      }
    }

    const symptomMap = new Map();
    for (const sym of existingSymptoms) {
      if (sym && sym.id) {
        symptomMap.set(sym.id, sym);
      }
    }

    let addedInFile = 0;
    let updatedInFile = 0;

    for (const sym of incomingList) {
      if (!sym || !sym.id) continue;

      const symId = sym.id.trim().toLowerCase();
      const ten = cleanText(sym.ten);
      const nhom = cleanText(sym.nhom);
      const loai = Array.isArray(sym.loai) ? sym.loai : ['cn'];
      const tuKhoa = dedupeArray(sym.tuKhoa || []);
      const aliases = dedupeArray(sym.aliases || []);
      const map = sym.map || null;

      if (symptomMap.has(symId)) {
        // Cập nhật hợp nhất
        const existing = symptomMap.get(symId);
        existing.ten = existing.ten || ten;
        existing.nhom = existing.nhom || nhom;
        existing.loai = Array.from(new Set([...(existing.loai || []), ...loai]));
        existing.tuKhoa = dedupeArray([...(existing.tuKhoa || []), ...tuKhoa]);
        existing.aliases = dedupeArray([...(existing.aliases || []), ...aliases]);
        if (!existing.map && map) {
          existing.map = map;
        }
        updatedInFile++;
        totalUpdated++;
      } else {
        // Thêm mới
        const newSym = {
          id: symId,
          ten,
          nhom,
          loai,
          tuKhoa,
          aliases,
          map
        };
        existingSymptoms.push(newSym);
        symptomMap.set(symId, newSym);
        addedInFile++;
        totalAdded++;
      }
    }

    // Ghi lại tệp hệ cơ quan
    fs.writeFileSync(targetFilePath, JSON.stringify(existingSymptoms, null, 2) + '\n', 'utf8');
    fileStats[targetFile] = { added: addedInFile, updated: updatedInFile, total: existingSymptoms.length };
  }

  console.log(`📊 Kết quả cập nhật từng tệp hệ cơ quan:`);
  for (const [file, stat] of Object.entries(fileStats)) {
    console.log(`   - ${file.padEnd(20)}: +${stat.added} mới, ~${stat.updated} cập nhật (Tổng hiện tại: ${stat.total})`);
  }
  console.log(`----------------------------------------------------------------`);
  console.log(`🎉 Tổng kết: +${totalAdded} triệu chứng mới, ~${totalUpdated} cập nhật bổ sung.`);
  console.log(`🔄 Đang tự động biên dịch lại Master Symptom Dictionary & Runtime KB...`);

  // Tự động gọi bundleSymptoms để đồng bộ DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md và clinical-rules-symptoms.json
  bundleSymptoms();

  console.log(`================================================================`);
  console.log(`✅ HOÀN TẤT NẠP TRIỆU CHỨNG BỆNH LÝ VÀO HỆ THỐNG DOCSPACE!`);
  console.log(`================================================================\n`);
}

// Nếu gọi trực tiếp từ CLI
if (process.argv[1] && process.argv[1].endsWith('ingest-disease-symptoms.mjs')) {
  const targetFileArg = process.argv[2];
  if (!targetFileArg) {
    console.log('👉 Cách dùng: node tools/scripts/ingest-disease-symptoms.mjs <duong-dan-file.json>');
    process.exit(1);
  }
  ingestDiseaseSymptoms(path.resolve(process.cwd(), targetFileArg));
}
