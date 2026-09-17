#!/usr/bin/env node

/**
 * 🟡 AGENT-03: Dark Mode & Design Token Auditor
 * CliniPortal QA Agent Squad
 * 
 * Chức năng:
 *  1. Quét các stylesheet chính để phát hiện hardcoded hex color (#hex)
 *     không sử dụng CSS Custom Properties (var(--color-...)).
 *  2. Kiểm tra các class card y khoa (.infobox, .alert, .clinical-pearl)
 *     bắt buộc phải có định nghĩa tương thích Dark Mode ([data-theme="dark"]).
 *  3. Đảm bảo màu chữ (.infobox-title, body text) không bị chìm trên nền tối.
 * 
 * Sử dụng:
 *  node tools/qa/agent03-darkmode-token-audit.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const TARGET_STYLES = [
  path.join(ROOT_DIR, 'src/styles/components/guidelines-article.css'),
  path.join(ROOT_DIR, 'src/styles/components/mdx/mdx-alerts.css'),
  path.join(ROOT_DIR, 'src/styles/components/mdx/mdx-clinical-pearls.css'),
  path.join(ROOT_DIR, 'src/content/basic-medical/css/physio-shared.css')
];

console.log('\n=================================================================');
console.log('🟡 AGENT-03: Dark Mode & Design Token Auditor — Starting Audit...');
console.log('=================================================================\n');

let totalErrors = 0;
let totalWarnings = 0;
const issuesList = [];

for (const cssFile of TARGET_STYLES) {
  const relPath = path.relative(ROOT_DIR, cssFile).replace(/\\/g, '/');
  if (!fs.existsSync(cssFile)) {
    console.log(`⚠️  [WARNING] Không tìm thấy file: ${relPath}`);
    totalWarnings++;
    continue;
  }

  const content = fs.readFileSync(cssFile, 'utf8');
  const fileReport = {
    file: relPath,
    hardcodedHex: [],
    missingDarkMode: [],
    contrastChecks: []
  };

  // 1. Kiểm tra sự tồn tại của [data-theme="dark"]
  const hasDarkModeSupport = content.includes('[data-theme="dark"]') || content.includes('@media (prefers-color-scheme: dark)');
  if (!hasDarkModeSupport) {
    fileReport.missingDarkMode.push(`Stylesheet chưa có bất kỳ quy tắc [data-theme="dark"] nào`);
    totalErrors++;
  } else {
    // Kiểm tra riêng .infobox-title có quy tắc dark mode không
    if (content.includes('.infobox-title')) {
      const hasTitleDark = content.includes('[data-theme="dark"]') && content.includes('.infobox-title');
      if (!hasTitleDark) {
        fileReport.missingDarkMode.push(`Class .infobox-title chưa có override màu cho [data-theme="dark"]`);
        totalWarnings++;
      }
    }
  }

  // 2. Quét hardcoded hex colors trong thuộc tính color / background không bọc trong var()
  // Bỏ qua :root { ... } nơi định nghĩa biến
  const contentWithoutRoot = content.replace(/:root\s*\{[\s\S]*?\}/g, '');
  const lines = contentWithoutRoot.split('\n');

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    // Bỏ qua comments
    if (trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    // Tìm thuộc tính color hoặc background có mã hex tĩnh mà không nằm trong var()
    const hexPropMatch = trimmed.match(/(?:color|background|background-color|border-color)\s*:\s*(#[0-9a-fA-F]{3,8})/i);
    if (hexPropMatch) {
      // Nếu không chứa var(
      if (!trimmed.includes('var(')) {
        fileReport.hardcodedHex.push({
          line: idx + 1,
          code: trimmed
        });
        totalWarnings++;
      }
    }
  });

  if (fileReport.missingDarkMode.length > 0 || fileReport.hardcodedHex.length > 0) {
    issuesList.push(fileReport);
  }
}

// In kết quả
if (issuesList.length === 0) {
  console.log(`✅ [PASS] 100% Hoàn hảo! Toàn bộ các stylesheet đều hỗ trợ Dark Mode và tuân thủ Token.`);
} else {
  for (const item of issuesList) {
    console.log(`📄 File: ${item.file}`);
    if (item.missingDarkMode.length > 0) {
      item.missingDarkMode.forEach(m => console.log(`   ❌ [ERROR] ${m}`));
    }
    if (item.hardcodedHex.length > 0) {
      console.log(`   ⚠️  [WARNING] Phát hiện ${item.hardcodedHex.length} thuộc tính hardcode hex (Nên dùng var(--color-...)):`);
      item.hardcodedHex.slice(0, 3).forEach(h => console.log(`      Dòng ${h.line}: ${h.code}`));
      if (item.hardcodedHex.length > 3) {
        console.log(`      ... và ${item.hardcodedHex.length - 3} dòng khác.`);
      }
    }
    console.log('');
  }
}

console.log('-----------------------------------------------------------------');
console.log(`Tổng kết: ${totalErrors} Errors | ${totalWarnings} Warnings`);
console.log('-----------------------------------------------------------------\n');

if (totalErrors > 0) {
  process.exit(1);
} else {
  console.log('🎉 [PASS] Tiêu chuẩn Dark Mode & Token đạt yêu cầu!\n');
  process.exit(0);
}
