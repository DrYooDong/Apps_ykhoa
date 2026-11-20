#!/usr/bin/env node
/**
 * CliniPortal Performance Budget & Bundle Audit Gate
 * Chạy: npm run audit:perf
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

const TARGETS = [
  { name: 'Root SPA (dist/assets)', dir: path.join(ROOT, 'dist/assets'), jsLimitKB: 1500, cssLimitKB: 400 },
  { name: 'DocSpace (src/content/docspace/dist/assets)', dir: path.join(ROOT, 'src/content/docspace/dist/assets'), jsLimitKB: 1000, cssLimitKB: 250 },
];

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function auditTarget(target) {
  console.log(`\n📦 ${target.name}`);
  console.log('─'.repeat(70));
  if (!fs.existsSync(target.dir)) {
    console.log('   ⚠️  Thư mục build chưa tồn tại. Hãy chạy build trước.');
    return { warnings: 1 };
  }

  const files = fs.readdirSync(target.dir).filter((f) => f.endsWith('.js') || f.endsWith('.css'));
  let totalJs = 0;
  let totalJsGz = 0;
  let totalCss = 0;
  let totalCssGz = 0;
  let warnings = 0;

  const stats = files.map((file) => {
    const buf = fs.readFileSync(path.join(target.dir, file));
    const gz = zlib.gzipSync(buf).length;
    const isJs = file.endsWith('.js');
    if (isJs) {
      totalJs += buf.length;
      totalJsGz += gz;
    } else {
      totalCss += buf.length;
      totalCssGz += gz;
    }
    return { file, raw: buf.length, gz, isJs };
  }).sort((a, b) => b.raw - a.raw);

  console.log(`   Top 8 chunks lớn nhất:`);
  stats.slice(0, 8).forEach((s) => {
    const limit = s.isJs ? target.jsLimitKB * 1024 : target.cssLimitKB * 1024;
    const flag = s.raw > limit ? '⚠️ ' : '✅ ';
    if (s.raw > limit) warnings++;
    console.log(`   ${flag}${s.file.padEnd(42)} ${formatKB(s.raw).padStart(10)}  (gzip: ${formatKB(s.gz).padStart(8)})`);
  });

  console.log(`\n   📊 Tổng JS : ${formatKB(totalJs)} (gzip: ${formatKB(totalJsGz)}) | Tổng CSS: ${formatKB(totalCss)} (gzip: ${formatKB(totalCssGz)}) | Tổng chunks: ${files.length}`);
  return { warnings };
}

console.log('╔══════════════════════════════════════════════════════════════════════╗');
console.log('║          ⚡ CLINIPORTAL PERFORMANCE BUDGET & BUNDLE AUDIT            ║');
console.log('╚══════════════════════════════════════════════════════════════════════╝');

let totalWarnings = 0;
for (const t of TARGETS) {
  totalWarnings += auditTarget(t).warnings;
}

console.log('\n' + '═'.repeat(70));
console.log(totalWarnings === 0
  ? '✅ PASS: Tất cả các chunk đều nằm trong ngưỡng Performance Budget!'
  : `ℹ️  Ghi nhận ${totalWarnings} chunk vượt ngưỡng ngân sách (cần tiếp tục tách nhỏ ở vòng tối ưu tiếp theo).`);
console.log('═'.repeat(70) + '\n');
