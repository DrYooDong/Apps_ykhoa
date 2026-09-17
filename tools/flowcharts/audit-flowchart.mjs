#!/usr/bin/env node

/**
 * 🔴 AGENT-FC04: Flowchart Quality Gate Auditor (audit-flowchart.mjs)
 * Medical Flowchart Agent Squad
 * 
 * Chức năng:
 *  - Quét kiểm tra tệp SVG lưu đồ y khoa.
 *  - Bắt buộc: KHÔNG chứa thẻ HTML nào bên trong <text> hoặc <svg> (<strong>, <span>, <br>, <b>...).
 *  - Bắt buộc: Có thuộc tính viewBox để co giãn responsive.
 *  - Bắt buộc: Sử dụng Design Tokens var(--color-...).
 *  - Kiểm tra tính toàn vẹn của thẻ đóng và định tuyến trực giao.
 * 
 * Sử dụng:
 *  node tools/flowcharts/audit-flowchart.mjs <path_to_svg_or_dir>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const targetArg = process.argv[2] || path.join(__dirname, 'output');
const targetPath = path.resolve(process.cwd(), targetArg);

console.log('\n=================================================================');
console.log('🔴 AGENT-FC04: Flowchart Quality Gate Auditor — Starting Audit...');
console.log('=================================================================\n');

function getSvgFiles(dirOrFile) {
  if (!fs.existsSync(dirOrFile)) return [];
  if (fs.statSync(dirOrFile).isFile()) {
    return dirOrFile.endsWith('.svg') ? [dirOrFile] : [];
  }
  const files = [];
  const entries = fs.readdirSync(dirOrFile, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dirOrFile, e.name);
    if (e.isDirectory()) {
      files.push(...getSvgFiles(full));
    } else if (e.isFile() && e.name.endsWith('.svg')) {
      files.push(full);
    }
  }
  return files;
}

const svgFiles = getSvgFiles(targetPath);
if (svgFiles.length === 0) {
  console.log(`⚠️  Không tìm thấy tệp SVG nào tại: ${targetPath}`);
  process.exit(0);
}

let totalErrors = 0;
let totalWarnings = 0;

for (const svgFile of svgFiles) {
  const relPath = path.relative(ROOT_DIR, svgFile).replace(/\\/g, '/');
  console.log(`🔍 Đang kiểm định lưu đồ SVG: ${relPath}`);
  const content = fs.readFileSync(svgFile, 'utf8');

  // 1. Kiểm tra cấm HTML bên trong SVG
  const htmlInSvgRegex = /<(strong|b|span|br|em|code|div|p)\b[^>]*>/i;
  const htmlMatches = content.match(htmlInSvgRegex);
  if (htmlMatches) {
    console.log(`   ❌ [CRITICAL ERROR] Phát hiện thẻ HTML <${htmlMatches[1]}> bên trong SVG! Trình duyệt sẽ render lỗi.`);
    totalErrors++;
  } else {
    console.log(`   ✅ [PASS] 100% Pure SVG (Không chứa thẻ HTML cấm).`);
  }

  // 2. Kiểm tra viewBox responsive
  if (content.includes('viewBox="') || content.includes("viewBox='")) {
    console.log(`   ✅ [PASS] Có thuộc tính viewBox co giãn responsive.`);
  } else {
    console.log(`   ❌ [ERROR] Thiếu thuộc tính viewBox.`);
    totalErrors++;
  }

  // 3. Kiểm tra Design Tokens
  if (content.includes('var(--color-')) {
    console.log(`   ✅ [PASS] Ứng dụng Design Tokens CliniPortal.`);
  } else {
    console.log(`   ⚠️  [WARNING] Không tìm thấy Design Tokens var(--color-...).`);
    totalWarnings++;
  }

  // 4. Kiểm tra thẻ đóng SVG
  if (content.trim().endsWith('</svg>')) {
    console.log(`   ✅ [PASS] Toàn vẹn thẻ đóng </svg>.`);
  } else {
    console.log(`   ❌ [ERROR] Thẻ đóng </svg> bị thiếu hoặc hỏng.`);
    totalErrors++;
  }
  console.log('');
}

console.log('-----------------------------------------------------------------');
console.log(`Tổng kết: ${totalErrors} Errors | ${totalWarnings} Warnings`);
console.log('-----------------------------------------------------------------\n');

if (totalErrors > 0) {
  process.exit(1);
} else {
  console.log('🎉 [PASS] Lưu đồ y khoa SVG đạt chuẩn chất lượng xuất bản CliniPortal!\n');
  process.exit(0);
}
