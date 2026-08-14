const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const targetDir = path.resolve('d:/Apps_ykhoa/src/content/approaches');
const htmlFiles = walk(targetDir);

console.log('TỔNG SỐ FILE HTML TRONG APPROACHES:', htmlFiles.length);

let inlineCount = 0;
let cleanCount = 0;
const inlineFiles = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match <script> tags without src=
  const scriptRegex = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let totalInlineChars = 0;
  while ((match = scriptRegex.exec(content)) !== null) {
    const scriptBody = match[1].trim();
    if (scriptBody.length > 0) {
      totalInlineChars += scriptBody.length;
    }
  }

  if (totalInlineChars > 0) {
    inlineCount++;
    inlineFiles.push({ file: path.relative(targetDir, file), chars: totalInlineChars });
  } else {
    cleanCount++;
  }
});

console.log('HTML ĐÃ SẠCH 100% INLINE SCRIPT:', cleanCount);
console.log('HTML CÒN INLINE SCRIPT:', inlineCount);
if (inlineFiles.length > 0) {
  console.log('\nDANH SÁCH FILE CÒN INLINE SCRIPT:');
  inlineFiles.forEach(f => console.log(`- ${f.file} (~${f.chars} chars)`));
}
