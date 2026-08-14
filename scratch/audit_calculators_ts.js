const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

const baseDir = 'd:\\Apps_ykhoa\\src\\content\\calculators';
const allFiles = walk(baseDir);

const jsFiles = allFiles.filter(f => f.endsWith('.js'));
const tsFiles = allFiles.filter(f => f.endsWith('.ts'));
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

console.log('========================================================');
console.log('📊 AUDIT REPORT: src/content/calculators');
console.log('========================================================');
console.log('📁 Tổng số file HTML:', htmlFiles.length);
console.log('📁 Tổng số file TS (TypeScript):', tsFiles.length);
console.log('📁 Tổng số file JS còn lại:', jsFiles.length);

if (jsFiles.length > 0) {
  console.log('\n❌ File .js tìm thấy trong src/content/calculators:');
  jsFiles.forEach(f => console.log('   -', path.relative(baseDir, f)));
} else {
  console.log('\n✅ 0 file .js trong src/content/calculators!');
}

console.log('\n📝 Danh sách các file TypeScript trong module:');
tsFiles.forEach(f => console.log('   💎', path.relative(baseDir, f)));

let inlineScripts = [];
let scriptTags = [];

htmlFiles.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  const relPath = path.relative(baseDir, hf);

  // Check inline script
  const inlineRegex = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = inlineRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 0) {
      inlineScripts.push({ file: relPath, snippet: text.substring(0, 100) });
    }
  }

  // Check all script tags with src
  const srcRegex = /<script[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let srcMatch;
  while ((srcMatch = srcRegex.exec(content)) !== null) {
    const src = srcMatch[1];
    scriptTags.push({ file: relPath, src: src });
  }
});

console.log('\n--------------------------------------------------------');
console.log('🔍 Kiểm tra Inline Scripts:');
if (inlineScripts.length === 0) {
  console.log('   ✅ 100% (' + htmlFiles.length + '/' + htmlFiles.length + ') file HTML KHÔNG CÓ inline script!');
} else {
  console.log('   ❌ Có ' + inlineScripts.length + ' inline scripts:');
  inlineScripts.forEach(s => console.log('      - ' + s.file + ': ' + s.snippet.replace(/\n/g, ' ')));
}

console.log('\n🔍 Phân tích các script tags được nhúng:');
const uniqueSrcs = [...new Set(scriptTags.map(s => s.src))];
uniqueSrcs.forEach(src => {
  const count = scriptTags.filter(s => s.src === src).length;
  console.log(`   - [${count} files] ${src}`);
});

console.log('========================================================\n');
