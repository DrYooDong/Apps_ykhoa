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
console.log('📊 AUDIT TOÀN DIỆN: src/content/pathophysiology');
console.log('========================================================');
console.log('📁 Tổng số file HTML:', htmlFiles.length);
console.log('📁 Tổng số file TypeScript (.ts):', tsFiles.length);
console.log('📁 Tổng số file JavaScript (.js) nội tại:', jsFiles.length, jsFiles.length === 0 ? '✅ (Mục tiêu = 0 ĐẠT)' : '❌');

console.log('\n📝 Danh sách 100% các file TypeScript trong phân hệ:');
tsFiles.forEach(f => console.log('   💎', path.relative(baseDir, f)));

// Check script references
let brokenScripts = 0;
let totalScripts = 0;

htmlFiles.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  const dir = path.dirname(hf);
  const srcRegex = /<script[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = srcRegex.exec(content)) !== null) {
    const src = match[1];
    totalScripts++;
    if (src.startsWith('http') || src.startsWith('//')) continue;
    const resolved = path.resolve(dir, src);
    if (!fs.existsSync(resolved)) {
      console.log(`❌ FILE NOT FOUND: ${path.relative(baseDir, hf)} -> ${src}`);
      brokenScripts++;
    }
  }
});

console.log('\n--------------------------------------------------------');
console.log(`🔍 Kiểm tra liên kết scripts: Đã quét ${totalScripts} thẻ, lỗi gãy = ${brokenScripts} ${brokenScripts === 0 ? '✅ (0 lỗi)' : '❌'}`);
console.log('========================================================\n');
