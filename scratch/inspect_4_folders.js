const fs = require('fs');
const path = require('path');
const base = 'd:/Apps_ykhoa/knowledge-vault';

const targetFolders = [
  '0. Giải phẫu & sinh lý',
  '0. Hóa sinh y học',
  '0. Kỹ năng',
  '0. Tiếp cận vấn đề lâm sàng'
];

targetFolders.forEach(folder => {
  const p = path.join(base, folder);
  if (!fs.existsSync(p)) return;

  function walk(dir) {
    let list = [];
    fs.readdirSync(dir, { withFileTypes: true }).forEach(item => {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) list = list.concat(walk(full));
      else list.push({ rel: path.relative(p, full), name: item.name });
    });
    return list;
  }

  const files = walk(p);
  console.log(`\n=============================================================`);
  console.log(`${folder} (${files.length} files)`);
  console.log(`=============================================================`);
  files.forEach(f => console.log('  ' + f.rel));
});
