const fs = require('fs');
const path = require('path');

const base = 'd:/Apps_ykhoa/knowledge-vault';

function walk(dir) {
  let results = [];
  try {
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
  } catch (e) {}
  return results;
}

const entries = fs.readdirSync(base, { withFileTypes: true });
console.log("Top-level entries in knowledge-vault:");
entries.forEach(e => {
  console.log((e.isDirectory() ? '[DIR] ' : '[FILE] ') + e.name);
});

const targetFolders = [
  '1. Bệnh truyền nhiễm', '2. Hồi sức - Cấp cứu', '3. Nội tổng quát',
  '4. Huyết học & ung thư', '5. Mắt - Tai mũi họng - Răng hàm mặt',
  '6. Da liễu & cơ xương khớp', '7. Ngoại khoa', '8. Sản phụ khoa', '9. Nhi khoa'
];

targetFolders.forEach(f => {
  const p = path.join(base, f);
  if (fs.existsSync(p)) {
    const files = walk(p);
    console.log(`\n========================================`);
    console.log(`FOLDER: ${f} (${files.length} files)`);
    console.log(`========================================`);
    files.forEach(file => {
      console.log(' - ' + path.relative(p, file));
    });
  }
});
