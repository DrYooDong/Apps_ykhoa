const fs = require('fs');
const path = require('path');
const base = 'd:/Apps_ykhoa/knowledge-vault';

const target3 = [
  '10. Nghiên cứu khoa học & EBM',
  '0. Thực thể hạt nhân',
  '11. Dinh dưỡng'
];

target3.forEach(folder => {
  const p = path.join(base, folder);
  if (!fs.existsSync(p)) {
    console.log(`Not found: ${folder}`);
    return;
  }

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
  files.forEach(f => console.log('  - ' + f.rel));
});
