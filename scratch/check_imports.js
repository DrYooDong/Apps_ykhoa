const fs = require('fs');
const path = require('path');

const targetDir = 'src/content/pathophysiology';

// 1. Kiểm tra physio-shared.ts ở root vs js/
console.log('--- NỘI DUNG root/physio-shared.ts ---');
console.log(fs.readFileSync(path.join(targetDir, 'physio-shared.ts'), 'utf8'));

console.log('\n--- NỘI DUNG js/physio-shared.ts ---');
console.log(fs.readFileSync(path.join(targetDir, 'js/physio-shared.ts'), 'utf8'));

// 2. Kiểm tra ai đang import root/physio-shared.ts vs js/physio-shared.ts
console.log('\n--- IMPORTS CỦA CẢ 2 FILE ---');
function searchImports(filePattern) {
  const hits = [];
  function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) {
        if (!full.includes('node_modules') && !full.includes('.git')) walk(full);
      } else if (/\.(ts|js|html)$/.test(f)) {
        const c = fs.readFileSync(full, 'utf8');
        if (c.includes(filePattern)) hits.push(full);
      }
    });
  }
  walk('src');
  return hits;
}

console.log("Files importing './physio-shared' (Root):", searchImports('./physio-shared'));
console.log("Files importing './js/physio-shared' or similar:", searchImports('js/physio-shared'));
