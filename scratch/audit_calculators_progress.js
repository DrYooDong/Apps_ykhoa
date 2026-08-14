const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, files);
    } else if (file.endsWith('.html')) {
      files.push(filePath);
    }
  });
  return files;
}

const allHtml = getFiles('d:/Apps_ykhoa/src/content/calculators');
let inlineCount = 0;
let cleanCount = 0;
const inlineFiles = [];

allHtml.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const scripts = content.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi) || [];
  const validScripts = scripts.filter(s => !s.includes('type="application/ld+json"') && s.replace(/<script[^>]*>|<\/script>/gi, '').trim().length > 0);
  if (validScripts.length > 0) {
    inlineCount++;
    inlineFiles.push({ file: path.relative('d:/Apps_ykhoa/src/content/calculators', f), len: validScripts.join('').length });
  } else {
    cleanCount++;
  }
});

console.log('TỔNG HTML:', allHtml.length);
console.log('ĐÃ SẠCH 100% INLINE:', cleanCount);
console.log('CÒN INLINE SCRIPT:', inlineCount);
console.log('\nDANH SÁCH CÁC FILE CÒN INLINE SCRIPT:');
inlineFiles.sort((a,b) => b.len - a.len).forEach((x, idx) => {
  console.log((idx + 1) + '. ' + x.file + ' (~' + x.len + ' chars)');
});
