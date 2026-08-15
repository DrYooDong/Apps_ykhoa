const fs = require('fs');
const path = require('path');

const targetDir = 'src/content/pathophysiology';

function scanDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(scanDir(fullPath));
    } else {
      results.push({
        relativePath: path.relative(targetDir, fullPath).replace(/\\/g, '/'),
        fullPath: fullPath.replace(/\\/g, '/'),
        size: stat.size,
        ext: path.extname(file)
      });
    }
  });
  return results;
}

const allFiles = scanDir(targetDir);
console.log(`=== TỔNG QUAN THƯ MỤC: ${targetDir} (${allFiles.length} files) ===\n`);

// 1. Phân loại theo thư mục gốc của pathophysiology
const rootFiles = allFiles.filter(f => !f.relativePath.includes('/'));
console.log('--- CÁC FILE NẰM Ở GỐC src/content/pathophysiology/ ---');
rootFiles.forEach(f => {
  console.log(`- ${f.relativePath} (${f.size} bytes)`);
});

// 2. Quét các file HTML vs TS view tương ứng
console.log('\n--- PHÂN TÍCH FILE HTML vs TS VIEW ---');
const htmlFiles = rootFiles.filter(f => f.ext === '.html');
const tsFiles = rootFiles.filter(f => f.ext === '.ts');

htmlFiles.forEach(h => {
  const base = h.relativePath.replace('.html', '');
  const matchingTsView = tsFiles.find(t => t.relativePath === `${base}-view.ts`);
  const matchingTs = tsFiles.find(t => t.relativePath === `${base}.ts`);
  console.log(`HTML: ${h.relativePath} -> Matching View: ${matchingTsView ? matchingTsView.relativePath : 'None'} | Matching TS: ${matchingTs ? matchingTs.relativePath : 'None'}`);
});

// 3. Kiểm tra các thư mục con
const subDirs = fs.readdirSync(targetDir).filter(f => fs.statSync(path.join(targetDir, f)).isDirectory());
console.log('\n--- CÁC THƯ MỤC CON ---');
subDirs.forEach(d => {
  const filesInDir = allFiles.filter(f => f.relativePath.startsWith(d + '/'));
  console.log(`- ${d}/ : ${filesInDir.length} files`);
});

// 4. Kiểm tra các file nghi ngờ rác/dư thừa:
// - File rỗng (0 bytes)
// - File backup (.bak, .old, .temp, copy...)
// - File redirect đơn giản (ví dụ sinh-ly-hoc.html chỉ có redirect)
// - File trùng lặp
console.log('\n--- CÁC FILE NGHI VẤN DƯ THỪA / CẦN XEM XÉT ---');
allFiles.forEach(f => {
  if (f.size === 0) {
    console.log(`[0 BYTES RỖNG] ${f.relativePath}`);
  }
  if (/(bak|old|copy|temp|test|tmp|backup)/i.test(f.relativePath)) {
    console.log(`[TÊN BACKUP/TEMP] ${f.relativePath}`);
  }
  if (f.relativePath.endsWith('readme.md') || f.relativePath.endsWith('README.md')) {
    // console.log(`[DOCS] ${f.relativePath}`);
  }
});
