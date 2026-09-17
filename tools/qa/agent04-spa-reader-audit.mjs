#!/usr/bin/env node

/**
 * 🔴 AGENT-04: SPA Reader View Injection Auditor
 * CliniPortal QA Agent Squad
 * 
 * Chức năng:
 *  1. Quét file TypeScript của SPA Reader (physio-html-reader-view.ts).
 *  2. Xác thực việc nạp đầy đủ các stylesheet phụ thuộc:
 *     - guidelines-article.css
 *     - mdx-base.css
 *     - physio-shared.css
 *  3. Xác thực thẻ inline <style id="physio-mdx-reader-styles"> bảo đảm:
 *     - Quy tắc chống vỡ 2 cột: flex-direction: column !important.
 *     - Quy tắc typography: .infobox-title font-weight: 800 !important.
 *     - Quy tắc Dark Mode: [data-theme="dark"] .infobox-title.
 *  4. Kiểm tra cơ chế chống race condition DOM mount.
 * 
 * Sử dụng:
 *  node tools/qa/agent04-spa-reader-audit.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const READER_VIEW_FILE = path.join(ROOT_DIR, 'src/content/basic-medical/views/physio-html-reader-view.ts');

console.log('\n=================================================================');
console.log('🔴 AGENT-04: SPA Reader View Injection Auditor — Starting Audit...');
console.log('=================================================================\n');

let totalErrors = 0;
let totalWarnings = 0;

if (!fs.existsSync(READER_VIEW_FILE)) {
  console.error(`❌ [ERROR] Không tìm thấy tệp Reader View: ${READER_VIEW_FILE}`);
  process.exit(1);
}

const relPath = path.relative(ROOT_DIR, READER_VIEW_FILE).replace(/\\/g, '/');
console.log(`🔍 Đang phân tích tệp SPA Reader: ${relPath}\n`);

const content = fs.readFileSync(READER_VIEW_FILE, 'utf8');

// 1. Kiểm tra việc nạp các file CSS vào head
const requiredStylesheets = [
  { name: 'guidelines-article.css', check: 'guidelines-article.css' },
  { name: 'mdx-base.css', check: 'mdx-base.css' },
  { name: 'physio-shared.css', check: 'physio-shared.css' }
];

console.log('📋 1. Kiểm tra nạp Dynamic Stylesheets vào DOM Head:');
for (const item of requiredStylesheets) {
  if (content.includes(item.check)) {
    console.log(`   ✅ [PASS] Có nạp dynamic: ${item.name}`);
  } else {
    console.log(`   ❌ [ERROR] Thiếu lệnh nạp dynamic stylesheet: ${item.name}`);
    totalErrors++;
  }
}

// 2. Kiểm tra inline override style trong DOM
console.log('\n📋 2. Kiểm tra Inline Style Override Container (#physio-mdx-reader-styles):');

const hasInlineStyles = content.includes('id="physio-mdx-reader-styles"');
if (hasInlineStyles) {
  console.log(`   ✅ [PASS] Đã có container <style id="physio-mdx-reader-styles">`);

  // Kiểm tra flex-direction: column
  const hasColumnFix = content.includes('flex-direction: column !important');
  if (hasColumnFix) {
    console.log(`   ✅ [PASS] Đã có override flex-direction: column !important cho .infobox`);
  } else {
    console.log(`   ❌ [ERROR] Thiếu override flex-direction: column !important trong inline styles`);
    totalErrors++;
  }

  // Kiểm tra font-weight cho .infobox-title
  const hasTitleWeight = content.includes('font-weight: 800 !important');
  if (hasTitleWeight) {
    console.log(`   ✅ [PASS] Đã có typography override font-weight: 800 !important`);
  } else {
    console.log(`   ⚠️  [WARNING] Chưa thấy font-weight: 800 !important cho tiêu đề infobox`);
    totalWarnings++;
  }

  // Kiểm tra Dark Mode title color
  const hasDarkTitle = content.includes('[data-theme="dark"]') && content.includes('#physio-article-mount .infobox-title');
  if (hasDarkTitle) {
    console.log(`   ✅ [PASS] Đã có quy tắc Dark Mode đồng bộ cho tiêu đề infobox`);
  } else {
    console.log(`   ❌ [ERROR] Thiếu quy tắc Dark Mode cho #physio-article-mount .infobox-title`);
    totalErrors++;
  }
} else {
  console.log(`   ❌ [ERROR] Không tìm thấy khối <style id="physio-mdx-reader-styles">`);
  totalErrors++;
}

// 3. Kiểm tra cơ chế chống race condition khi render
console.log('\n📋 3. Kiểm tra cơ chế Async Hydration & Chống Race Condition:');
const hasAsyncMount = content.includes('setTimeout') || content.includes('requestAnimationFrame');
if (hasAsyncMount) {
  console.log(`   ✅ [PASS] Có độ trễ an toàn (setTimeout) để container mount vào DOM trước khi hydrate.`);
} else {
  console.log(`   ⚠️  [WARNING] Có nguy cơ race condition nếu hydrate ngay trước khi DOM hoàn tất mount.`);
  totalWarnings++;
}

console.log('\n-----------------------------------------------------------------');
console.log(`Tổng kết: ${totalErrors} Errors | ${totalWarnings} Warnings`);
console.log('-----------------------------------------------------------------\n');

if (totalErrors > 0) {
  process.exit(1);
} else {
  console.log('🎉 [PASS] Kiến trúc SPA Reader View an toàn và đạt tiêu chuẩn chất lượng!\n');
  process.exit(0);
}
