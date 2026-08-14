const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
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

const baseDir = 'd:\\Apps_ykhoa\\src\\content\\approaches';
const allFiles = walk(baseDir);

const jsFiles = allFiles.filter(f => f.endsWith('.js'));
const tsFiles = allFiles.filter(f => f.endsWith('.ts'));
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

console.log('========================================================');
console.log('📊 AUDIT HOÀN TẤT CHO PHÂN HỆ: src/content/approaches');
console.log('========================================================');
console.log('📁 Tổng số file HTML:', htmlFiles.length);
console.log('📁 Tổng số file TS (TypeScript):', tsFiles.length);
console.log('📁 Tổng số file JS còn lại (Mục tiêu = 0):', jsFiles.length);

if (jsFiles.length > 0) {
  console.log('❌ File JS chưa chuyển đổi:');
  jsFiles.forEach(f => console.log('   -', f));
} else {
  console.log('✅ 100% CÁC FILE JS ĐÃ ĐƯỢC CHUYỂN ĐỔI SANG TYPESCRIPT HOẶC ĐÃ DỌN DẸP SẠCH SẼ!');
}

console.log('\n📝 Danh sách các file TypeScript trong module:');
tsFiles.forEach(f => console.log('   💎', path.relative(baseDir, f)));

let inlineScriptCount = 0;
let oldJsRefScriptCount = 0;

htmlFiles.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  // Check inline script
  const scriptRegex = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    if (match[1].trim().length > 0) {
      console.log('⚠️ [INLINE SCRIPT]:', path.relative(baseDir, hf));
      inlineScriptCount++;
    }
  }
  // Check if any old .js file is still referenced
  const srcJsRegex = /<script[^>]+src=["']([^"']+\.js)["']/gi;
  let jsMatch;
  while ((jsMatch = srcJsRegex.exec(content)) !== null) {
    const src = jsMatch[1];
    if (!src.includes('main.js') && !src.includes('header.js') && !src.includes('mui-port.js') && !src.includes('supabase-js') && !src.includes('cdn')) {
      console.log('⚠️ [OLD JS REF]:', path.relative(baseDir, hf), '->', src);
      oldJsRefScriptCount++;
    }
  }
});

console.log('\n--------------------------------------------------------');
console.log('🔍 Kiểm tra Thẻ Script:');
console.log('   - Số lượng Inline script sót lại:', inlineScriptCount, inlineScriptCount === 0 ? '✅ (Sạch 100%)' : '❌');
console.log('   - Số lượng Script tham chiếu JS cũ chưa đổi sang TS:', oldJsRefScriptCount, oldJsRefScriptCount === 0 ? '✅ (Khớp 100%)' : '❌');
console.log('========================================================\n');
