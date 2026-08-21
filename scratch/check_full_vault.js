const fs = require('fs');
const path = require('path');
const base = 'd:/Apps_ykhoa/knowledge-vault';

console.log('=== TỔNG KIỂM TRA HỆ THỐNG TOÀN BỘ KNOWLEDGE VAULT ===\n');

const entries = fs.readdirSync(base, { withFileTypes: true });
const dirs = entries.filter(e => e.isDirectory() && !e.name.startsWith('.')).map(e => e.name);

let grandTotalMd = 0;

dirs.forEach(dir => {
  const p = path.join(base, dir);
  let count = 0;
  function walk(d) {
    fs.readdirSync(d, { withFileTypes: true }).forEach(it => {
      const full = path.join(d, it.name);
      if (it.isDirectory()) walk(full);
      else if (it.name.endsWith('.md')) count++;
    });
  }
  walk(p);
  console.log(`📁 ${dir.padEnd(30, ' ')}: ${count.toString().padStart(4, ' ')} markdown files`);
  grandTotalMd += count;
});

console.log('\n------------------------------------------------------------');
console.log(`TỔNG SỐ TỆP TIN TRONG CÁC PHÂN HỆ: ${grandTotalMd} files`);
console.log('------------------------------------------------------------');
