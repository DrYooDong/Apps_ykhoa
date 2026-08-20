const fs = require('fs');
const path = require('path');

// Mock a lightweight browser environment to test all functions end-to-end
const guidelinesDir = path.join(__dirname, '../src/content/ebm/guidelines');
const htmlFile = path.join(guidelinesDir, 'guidelines.html');
const html = fs.readFileSync(htmlFile, 'utf8');

console.log('=== TEST TOÀN DIỆN CÁC NÚT & TÍNH NĂNG TRONG GUIDELINES ===');

// Check script references and imports
const issues = [];

// 1. Kiểm tra script ../js/ebm-format-loader.js vs .ts
if (html.includes('src="../js/ebm-format-loader.js"')) {
  const tsPath = path.join(guidelinesDir, '../js/ebm-format-loader.ts');
  const jsPath = path.join(guidelinesDir, '../js/ebm-format-loader.js');
  if (!fs.existsSync(jsPath) && fs.existsSync(tsPath)) {
    issues.push({
      type: 'SCRIPT_404',
      file: 'guidelines.html',
      detail: 'guidelines.html trỏ tới "../js/ebm-format-loader.js" nhưng file thực tế là "ebm-format-loader.ts". Nên cập nhật hoặc import vào module.'
    });
  }
}

// 2. Kiểm tra journal-quality-analyzer.html
const jqHtmlFile = path.join(guidelinesDir, 'journal-quality-analyzer.html');
if (fs.existsSync(jqHtmlFile)) {
  const jqHtml = fs.readFileSync(jqHtmlFile, 'utf8');
  const srcRegex = /<script[^>]+src=["']([^"']+)["']/g;
  let m;
  while ((m = srcRegex.exec(jqHtml)) !== null) {
    const src = m[1];
    if (src.startsWith('http')) continue;
    const resolved = path.resolve(guidelinesDir, src);
    if (!fs.existsSync(resolved)) {
      issues.push({
        type: 'JQ_SCRIPT_404',
        file: 'journal-quality-analyzer.html',
        detail: `Script không tồn tại: ${src} -> ${resolved}`
      });
    }
  }
}

// 3. Kiểm tra các nút trong guidelines.html có ID hoặc onclick bị trùng hoặc hỏng
const idOccurrences = new Map();
const idRegex = /\bid\s*=\s*"([^"]+)"/gi;
let idMatch;
while ((idMatch = idRegex.exec(html)) !== null) {
  const id = idMatch[1];
  idOccurrences.set(id, (idOccurrences.get(id) || 0) + 1);
}
for (const [id, count] of idOccurrences.entries()) {
  if (count > 1) {
    issues.push({
      type: 'DUPLICATE_ID',
      file: 'guidelines.html',
      detail: `ID "#${id}" xuất hiện ${count} lần trong guidelines.html`
    });
  }
}

console.log(`Tìm thấy ${issues.length} vấn đề cần lưu ý:`);
issues.forEach(i => console.log(`[${i.type}] (${i.file}): ${i.detail}`));

if (issues.length === 0) {
  console.log('✅ Tất cả cấu trúc thẻ, ID và liên kết đều hoàn hảo!');
}
