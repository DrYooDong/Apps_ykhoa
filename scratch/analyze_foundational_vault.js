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
  if (!fs.existsSync(p)) {
    console.log(`Folder not found: ${folder}`);
    return;
  }

  let files = [];
  function walk(dir) {
    const list = fs.readdirSync(dir, { withFileTypes: true });
    list.forEach(item => {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) walk(full);
      else {
        files.push({
          rel: path.relative(p, full),
          name: item.name,
          full
        });
      }
    });
  }
  walk(p);

  console.log(`\n======================================================`);
  console.log(`FOLDER: ${folder} (${files.length} files)`);
  console.log(`======================================================`);
  
  // Group by first level subdirectory
  const groups = {};
  files.forEach(f => {
    const parts = f.rel.split(path.sep);
    const g = parts.length > 1 ? parts[0] : '[ROOT]';
    groups[g] = (groups[g] || 0) + 1;
  });
  console.log('Subcategories:', JSON.stringify(groups, null, 2));
  console.log('Sample files (first 10):');
  files.slice(0, 10).forEach(f => console.log('  - ' + f.rel));
});
