const fs = require('fs');
const path = require('path');

const targetDir = 'src/content/pathophysiology';

console.log('=== KIỂM TRA TRÙNG LẶP / DƯ THỪA ===\n');

// 1. So sánh physio-shared.ts ở root vs js/physio-shared.ts
const pRoot = path.join(targetDir, 'physio-shared.ts');
const pJs = path.join(targetDir, 'js/physio-shared.ts');
if (fs.existsSync(pRoot) && fs.existsSync(pJs)) {
  console.log('--- physio-shared.ts (Root vs js/) ---');
  console.log(`Root size: ${fs.statSync(pRoot).size} bytes`);
  console.log(`js/ size: ${fs.statSync(pJs).size} bytes`);
  console.log(`Is identical: ${fs.readFileSync(pRoot, 'utf8') === fs.readFileSync(pJs, 'utf8')}`);
}

// 2. So sánh slb-ccbs-dot-quy.html vs .ts
const dqHtml = path.join(targetDir, 'pathophysiology-cases/slb-ccbs-dot-quy.html');
const dqTs = path.join(targetDir, 'pathophysiology-cases/slb-ccbs-dot-quy.ts');
if (fs.existsSync(dqHtml) && fs.existsSync(dqTs)) {
  console.log('\n--- slb-ccbs-dot-quy (HTML vs TS) ---');
  console.log(`HTML size: ${fs.statSync(dqHtml).size} bytes`);
  console.log(`TS size: ${fs.statSync(dqTs).size} bytes`);
}

// 3. So sánh slb-ccbs-xhth-tren.html vs .ts
const xhHtml = path.join(targetDir, 'pathophysiology-cases/slb-ccbs-xhth-tren.html');
const xhTs = path.join(targetDir, 'pathophysiology-cases/slb-ccbs-xhth-tren.ts');
if (fs.existsSync(xhHtml) && fs.existsSync(xhTs)) {
  console.log('\n--- slb-ccbs-xhth-tren (HTML vs TS) ---');
  console.log(`HTML size: ${fs.statSync(xhHtml).size} bytes`);
  console.log(`TS size: ${fs.statSync(xhTs).size} bytes`);
}

// 4. Tìm các tham chiếu (references) đến sl-giacquan.html, content/, physio-shared.ts
console.log('\n--- TÌM XEM CÓ FILE NÀO ĐANG IMPORT/LINK ĐẾN CÁC FILE TRÊN ---');
const allTextFiles = [];
function getFiles(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.git')) getFiles(full);
    } else if (/\.(html|ts|js|json|md)$/.test(f)) {
      allTextFiles.push(full);
    }
  });
}
getFiles('src');

function countRefs(pattern) {
  let count = 0;
  allTextFiles.forEach(file => {
    const txt = fs.readFileSync(file, 'utf8');
    if (txt.includes(pattern)) count++;
  });
  return count;
}

console.log(`References to 'sl-giacquan.html': ${countRefs('sl-giacquan.html')}`);
console.log(`References to 'pathophysiology/content/': ${countRefs('pathophysiology/content/')}`);
console.log(`References to 'slb-ccbs-dot-quy.ts': ${countRefs('slb-ccbs-dot-quy.ts')}`);
console.log(`References to 'slb-ccbs-xhth-tren.ts': ${countRefs('slb-ccbs-xhth-tren.ts')}`);
