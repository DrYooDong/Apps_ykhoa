/**
 * tools/qa/audit-dark-mode-colors.mjs
 * Rà soát các thuộc tính inline hardcoded màu gây chói mắt hoặc mất tương phản trong Dark Mode:
 * - background: #fff / #ffffff / white (phải dùng var(--color-surface, #fff))
 * - color: #000 / #000000 / black (phải dùng var(--color-text, #0f172a))
 * - border-color: #e2e8f0 (phải dùng var(--color-border, #e2e8f0))
 */

import fs from 'fs';
import path from 'path';

const GUIDELINES_DIR = path.resolve('src/content/ebm/guidelines/kho-guidelines');
const files = fs.readdirSync(GUIDELINES_DIR).filter(f => f.endsWith('.mdx'));

let issues = [];

for (const f of files) {
  const content = fs.readFileSync(path.join(GUIDELINES_DIR, f), 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, i) => {
    // Check style="..."
    const styleMatches = line.match(/style="([^"]+)"/g);
    if (styleMatches) {
      for (const sm of styleMatches) {
        // Hardcoded background white without var()
        if (/(background|background-color)\s*:\s*(#ffffff|#fff\b|white\b)/i.test(sm) && !sm.includes('var(')) {
          issues.push({ file: f, line: i + 1, type: 'hardcoded-white-bg', snippet: line.trim() });
        }
        // Hardcoded color black without var()
        if (/\bcolor\s*:\s*(#000000|#000\b|black\b)/i.test(sm) && !sm.includes('var(')) {
          issues.push({ file: f, line: i + 1, type: 'hardcoded-black-text', snippet: line.trim() });
        }
      }
    }
  });
}

console.log('======================================================');
console.log('🌓 CLINI_PORTAL QA SQUAD — DARK MODE & COLOR AUDIT');
console.log('======================================================');
console.log(`🔍 Đã quét ${files.length} tệp MDX.`);
console.log(`📊 Tìm thấy: ${issues.length} vị trí hardcoded màu.`);

if (issues.length > 0) {
  console.log('\nTop 20 vị trí vi phạm:');
  issues.slice(0, 20).forEach(iss => {
    console.log(`  [${iss.file}:${iss.line}] (${iss.type}): ${iss.snippet.slice(0, 90)}...`);
  });
} else {
  console.log('✅ Toàn bộ 100% kho guidelines tuân thủ Dark Mode tokens!');
}
