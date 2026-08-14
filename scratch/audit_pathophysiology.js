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

const baseDir = 'd:\\Apps_ykhoa\\src\\content\\pathophysiology';
const allFiles = walk(baseDir);

const jsFiles = allFiles.filter(f => f.endsWith('.js'));
const tsFiles = allFiles.filter(f => f.endsWith('.ts'));
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

console.log('========================================================');
console.log('📊 AUDIT REPORT: src/content/pathophysiology');
console.log('========================================================');
console.log('📁 Tổng số file HTML:', htmlFiles.length);
console.log('📁 Tổng số file JS:', jsFiles.length);
console.log('📁 Tổng số file TS:', tsFiles.length);

console.log('\n📄 Danh sách các file JS:');
jsFiles.forEach(f => console.log('   -', path.relative(baseDir, f)));

console.log('\n📄 Danh sách các file TS:');
tsFiles.forEach(f => console.log('   -', path.relative(baseDir, f)));

let inlineScripts = [];
htmlFiles.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  const rel = path.relative(baseDir, hf);
  const inlineRegex = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = inlineRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 0) {
      inlineScripts.push({ file: rel, snippet: text.substring(0, 80) });
    }
  }
});

console.log('\n🔍 Inline scripts count:', inlineScripts.length);
inlineScripts.forEach(s => console.log('   ⚠️', s.file, ':', s.snippet.replace(/\n/g, ' ')));

console.log('========================================================\n');
