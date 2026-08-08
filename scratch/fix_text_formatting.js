/**
 * fix_text_formatting.js
 * 
 * Script Node.js hỗ trợ tự động vá lỗi định dạng văn bản (Text Formatting Fixer) cho CliniPortal:
 * 1. Chuyển đổi ký hiệu LaTeX thô (\ge, \le, \rightarrow) thành ký hiệu HTML chuẩn (≥, ≤, &rarr;).
 * 2. Chuyển đổi raw unicode bullets (•, ⁃, ‣) nằm trong <p> thành danh sách <ul><li>.
 * 3. Chuyển đổi fake headings (<p><strong>Title</strong></p>) thành thẻ <h3>Title</h3> semantic.
 * 
 * Cách chạy:
 *   node scratch/fix_text_formatting.js <path_to_html_file>
 */

const fs = require('fs');
const path = require('path');

function fixTextFormattingInFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File không tồn tại: ${filePath}`);
    process.exit(1);
  }

  console.log(`🔧 Đang tự động vá lỗi định dạng văn bản cho: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');

  let replacementsCount = 0;

  // 1. Convert raw LaTeX symbols to HTML entities outside script tags
  const latexFixes = [
    { from: /\\ge\b/g, to: '≥' },
    { from: /\\le\b/g, to: '≤' },
    { from: /\\rightarrow\b/g, to: '&rarr;' },
    { from: /\\leftarrow\b/g, to: '&larr;' },
    { from: /\\approx\b/g, to: '≈' },
    { from: /\\pm\b/g, to: '&plusmn;' }
  ];

  latexFixes.forEach(fix => {
    const matches = content.match(fix.from);
    if (matches) {
      replacementsCount += matches.length;
      content = content.replace(fix.from, fix.to);
    }
  });

  // 2. Convert fake headings: <p><strong>Heading Title</strong></p> -> <h3>Heading Title</h3>
  const fakeHeadingRegex = /<p>\s*<(strong|b)>\s*([^<]+)\s*<\/(strong|b)>\s*<\/p>/gi;
  content = content.replace(fakeHeadingRegex, (match, tag, title) => {
    // Only convert if title looks like a section header (less than 80 chars, no sentence ending)
    if (title.length < 80 && !title.endsWith('.')) {
      replacementsCount++;
      return `<h3 class="sec-subtitle" style="margin-top: 1.25rem; margin-bottom: 0.5rem; color: var(--accent);">${title.trim()}</h3>`;
    }
    return match;
  });

  // 3. Convert raw bullets • in <p> to <ul><li>
  const lines = content.split(/\r?\n/);
  const newLines = [];
  let inBulletList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('<p>') && (trimmed.includes('• ') || trimmed.includes('⁃ ') || trimmed.includes('‣ '))) {
      const cleanText = trimmed.replace(/^<p>\s*[•⁃‣]\s*/, '').replace(/<\/p>$/, '');
      if (!inBulletList) {
        newLines.push('        <ul class="physio-list-arrow" style="margin-left: 1.25rem; margin-bottom: 1rem;">');
        inBulletList = true;
      }
      newLines.push(`          <li>${cleanText}</li>`);
      replacementsCount++;
    } else {
      if (inBulletList) {
        newLines.push('        </ul>');
        inBulletList = false;
      }
      newLines.push(line);
    }
  }
  if (inBulletList) {
    newLines.push('        </ul>');
  }

  content = newLines.join('\n');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Đã vá thành công ${replacementsCount} vị trí lỗi định dạng văn bản!`);
}

const targetPath = process.argv[2];
if (!targetPath) {
  console.log('Vui lòng cung cấp đường dẫn file HTML!');
  console.log('Cú pháp: node scratch/fix_text_formatting.js <path_to_html_file>');
  process.exit(1);
}

fixTextFormattingInFile(path.resolve(targetPath));
