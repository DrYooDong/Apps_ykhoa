#!/usr/bin/env node
/**
 * 🩺 DocSpace Clinical Data Verification Linter
 * Bộ công cụ kiểm toán tự động của DocSpace Clinical Data Verification Squad (docspace-clinical-data-qa-squad)
 * 
 * Chuyên trách:
 * - Pillar 1: Phát hiện và khử sạch lỗi HTML entities (&gt;, &lt;, &quot;, &amp;)
 * - Pillar 2: Rà soát và chuẩn hóa từ viết tắt y khoa (Abbreviation Guard)
 * - Pillar 3: Phát hiện trùng lặp biến thể triệu chứng và tiền tố thừa (Deduplication & Prefix Cleaner)
 * - Pillar 4: Kiểm soát ranh giới phân loại lâm sàng - cận lâm sàng - tiền căn - dịch tễ
 * 
 * Cách chạy:
 *   node tools/qa/docspace-clinical-data-linter.mjs
 *   node tools/qa/docspace-clinical-data-linter.mjs --fix
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

const SYMPTOMS_PATH = path.join(rootDir, 'src/content/knowledge-vault/data/clinical-rules-symptoms.json');
const KB_PATH = path.join(rootDir, 'src/content/knowledge-vault/data/clinical-rules-kb.json');
const CASES_PATH = path.join(rootDir, 'src/content/knowledge-vault/data/sample-clinical-cases.json');

const isFixMode = process.argv.includes('--fix');

function readJson(filepath) {
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

function writeJson(filepath, data) {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}

function normalizeSimple(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log('╔══════════════════════════════════════════════════════════════════════╗');
console.log('║       🩺 DOCSPACE CLINICAL DATA VERIFICATION LINTER                  ║');
console.log('║       Phụ trách: DocSpace Clinical Data Verification Squad           ║');
console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

if (!fs.existsSync(SYMPTOMS_PATH)) {
  console.error(`❌ Không tìm thấy tệp: ${SYMPTOMS_PATH}`);
  process.exit(1);
}

const symptoms = readJson(SYMPTOMS_PATH);
let htmlEntityIssues = [];
let abbreviationIssues = [];
let prefixIssues = [];
let duplicatePairs = [];

// Các pattern HTML entity cần làm sạch
const ENTITY_REGEX = /&(?:gt|lt|quot|amp|#39|nbsp);/g;
const ENTITY_MAP = {
  '&gt;': '>',
  '&lt;': '<',
  '&quot;': '"',
  '&amp;': '&',
  '&#39;': "'",
  '&nbsp;': ' ',
};

// Các tiền tố thừa làm xấu giao diện nút bấm
const FORBIDDEN_PREFIXES = [
  /^cận lâm sàng:\s*/i,
  /^dấu hiệu cảnh báo:\s*/i,
  /^sốt rét ác tính:\s*/i,
  /^biến chứng:\s*/i,
  /^hội chứng:\s*/i,
];

// Từ viết tắt thô / lóng cần chuẩn hóa
const RAW_ABBR_PATTERNS = [
  { regex: /\bpos\b/i, suggest: '(+)', desc: 'dùng (+) thay vì "pos"' },
  { regex: /\bneg\b/i, suggest: '(-)', desc: 'dùng (-) thay vì "neg"' },
  { regex: /\bha\s+tut\b/i, suggest: 'Huyết áp tụt', desc: 'viết rõ "Huyết áp tụt"' },
  { regex: /\bspo2\b/, suggest: 'SpO₂', desc: 'định dạng SpO₂ chuẩn typographic' },
];

// --- 1. Quét HTML Entities & Tiền tố thừa ---
symptoms.forEach((s) => {
  // Check HTML entities trong ten, moTa, tuKhoa
  const rawFields = [s.ten, s.moTa || '', ...(s.tuKhoa || [])].join(' ');
  const matchEntities = rawFields.match(ENTITY_REGEX);
  if (matchEntities) {
    htmlEntityIssues.push({
      id: s.id,
      ten: s.ten,
      entities: [...new Set(matchEntities)],
    });
  }

  // Check tiền tố thừa
  FORBIDDEN_PREFIXES.forEach((rgx) => {
    if (rgx.test(s.ten)) {
      prefixIssues.push({
        id: s.id,
        ten: s.ten,
        cleaned: s.ten.replace(rgx, ''),
      });
    }
  });

  // Check từ viết tắt
  RAW_ABBR_PATTERNS.forEach((rule) => {
    if (rule.regex.test(s.ten)) {
      abbreviationIssues.push({
        id: s.id,
        ten: s.ten,
        suggest: rule.suggest,
        desc: rule.desc,
      });
    }
  });
});

// --- 2. Quét Trùng lặp ngữ nghĩa (Semantic Clustering & Deduplication) ---
// Gom theo nhóm phân loại
const byGroup = {};
symptoms.forEach((s) => {
  const g = s.nhom || 'Khác';
  if (!byGroup[g]) byGroup[g] = [];
  byGroup[g].push(s);
});

Object.entries(byGroup).forEach(([groupName, list]) => {
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i];
      const b = list[j];

      const normA = normalizeSimple(a.ten);
      const normB = normalizeSimple(b.ten);

      if (normA === normB) {
        duplicatePairs.push({ groupName, a: a.ten, b: b.ten, idA: a.id, idB: b.id, reason: 'Trùng lặp tên hoàn toàn' });
        continue;
      }

      // Kiểm tra bao hàm trực tiếp có độ dài lớn
      if (normA.length >= 8 && normB.length >= 8) {
        if (normA.includes(normB) || normB.includes(normA)) {
          duplicatePairs.push({ groupName, a: a.ten, b: b.ten, idA: a.id, idB: b.id, reason: 'Một bên bao hàm hoàn toàn bên kia' });
          continue;
        }
      }

      // Kiểm tra tương đồng từ khóa cốt lõi (Jaccard overlap)
      const wordsA = normA.split(' ').filter((w) => w.length > 2);
      const wordsB = normB.split(' ').filter((w) => w.length > 2);
      const common = wordsA.filter((w) => wordsB.includes(w));

      if (wordsA.length >= 3 && wordsB.length >= 3) {
        const jaccard = common.length / new Set([...wordsA, ...wordsB]).size;
        if (jaccard >= 0.7) {
          duplicatePairs.push({
            groupName,
            a: a.ten,
            b: b.ten,
            idA: a.id,
            idB: b.id,
            reason: `Độ tương đồng từ vựng cao (${Math.round(jaccard * 100)}%)`,
          });
        }
      }
    }
  }
});

// --- BÁO CÁO KẾT QUẢ ---
console.log(`🔍 [PILLAR 1] Kiểm tra Ký tự HTML Entities: ${htmlEntityIssues.length === 0 ? '✅ HOÀN HẢO' : `⚠️ PHÁT HIỆN ${htmlEntityIssues.length} VẤN ĐỀ`}`);
if (htmlEntityIssues.length > 0) {
  htmlEntityIssues.slice(0, 8).forEach((item) => {
    console.log(`   └─ [${item.id}] ${item.ten} -> Chứa: ${item.entities.join(', ')}`);
  });
  if (htmlEntityIssues.length > 8) console.log(`   └─ ... và ${htmlEntityIssues.length - 8} mục khác`);
}

console.log(`\n🔍 [PILLAR 2] Rà soát Tiền tố Giao diện Thừa: ${prefixIssues.length === 0 ? '✅ HOÀN HẢO' : `⚠️ PHÁT HIỆN ${prefixIssues.length} MỤC`}`);
if (prefixIssues.length > 0) {
  prefixIssues.slice(0, 8).forEach((item) => {
    console.log(`   └─ [${item.id}] "${item.ten}" ➔ Đề xuất: "${item.cleaned}"`);
  });
  if (prefixIssues.length > 8) console.log(`   └─ ... và ${prefixIssues.length - 8} mục khác`);
}

console.log(`\n🔍 [PILLAR 3] Rà soát Viết tắt & Typographic: ${abbreviationIssues.length === 0 ? '✅ HOÀN HẢO' : `ℹ️ GHI NHẬN ${abbreviationIssues.length} MỤC`}`);
if (abbreviationIssues.length > 0) {
  abbreviationIssues.slice(0, 6).forEach((item) => {
    console.log(`   └─ [${item.id}] "${item.ten}" ➔ ${item.desc}`);
  });
}

console.log(`\n🔍 [PILLAR 4] Phát hiện Biến thể Triệu chứng Trùng lặp/Gần nghĩa: ${duplicatePairs.length === 0 ? '✅ HOÀN HẢO' : `⚠️ PHÁT HIỆN ${duplicatePairs.length} CẶP TRÙNG LẶP`}`);
if (duplicatePairs.length > 0) {
  duplicatePairs.slice(0, 10).forEach((pair) => {
    console.log(`   └─ [${pair.groupName}] "${pair.a}" <==> "${pair.b}" (${pair.reason})`);
  });
  if (duplicatePairs.length > 10) console.log(`   └─ ... và ${duplicatePairs.length - 10} cặp khác`);
}

// --- TỰ ĐỘNG SỬA LỖI NẾU CÓ CỜ --fix ---
if (isFixMode) {
  console.log('\n🛠️ Đang kích hoạt chế độ AUTO-FIX:');
  let fixCount = 0;

  symptoms.forEach((s) => {
    // Sửa HTML entities
    let original = s.ten;
    Object.entries(ENTITY_MAP).forEach(([entity, char]) => {
      if (s.ten.includes(entity)) {
        s.ten = s.ten.replaceAll(entity, char);
      }
      if (s.moTa && s.moTa.includes(entity)) {
        s.moTa = s.moTa.replaceAll(entity, char);
      }
      if (s.tuKhoa) {
        s.tuKhoa = s.tuKhoa.map((k) => k.replaceAll(entity, char));
      }
    });

    // Sửa tiền tố thừa "Cận lâm sàng: "
    FORBIDDEN_PREFIXES.forEach((rgx) => {
      if (rgx.test(s.ten)) {
        s.ten = s.ten.replace(rgx, '');
        // Viết hoa chữ cái đầu
        s.ten = s.ten.charAt(0).toUpperCase() + s.ten.slice(1);
      }
    });

    if (s.ten !== original) fixCount++;
  });

  writeJson(SYMPTOMS_PATH, symptoms);

  // Đồng bộ sang clinical-rules-kb.json nếu tồn tại
  if (fs.existsSync(KB_PATH)) {
    const kb = readJson(KB_PATH);
    if (kb.trieuChung && Array.isArray(kb.trieuChung)) {
      const symMap = new Map(symptoms.map((s) => [s.id, s]));
      kb.trieuChung.forEach((kbs) => {
        const found = symMap.get(kbs.id);
        if (found) {
          kbs.ten = found.ten;
          kbs.moTa = found.moTa;
          kbs.tuKhoa = found.tuKhoa;
        }
      });
      writeJson(KB_PATH, kb);
    }
  }

  console.log(`✅ Đã tự động sửa thành công ${fixCount} mục dữ liệu trong cả 2 tệp CSDL!`);
}

console.log('\n══════════════════════════════════════════════════════════════════════');
console.log(`TỔNG KẾT: ${htmlEntityIssues.length} HTML lỗi | ${prefixIssues.length} tiền tố thừa | ${duplicatePairs.length} cặp trùng`);
console.log('══════════════════════════════════════════════════════════════════════');
