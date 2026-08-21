const fs = require('fs');
const path = require('path');

const base = 'd:/Apps_ykhoa/knowledge-vault';
const targetFolders = [
  '1. Bệnh truyền nhiễm', '2. Hồi sức - Cấp cứu', '3. Nội tổng quát',
  '4. Huyết học & ung thư', '5. Mắt - Tai mũi họng - Răng hàm mặt',
  '6. Da liễu & cơ xương khớp', '7. Ngoại khoa', '8. Sản phụ khoa', '9. Nhi khoa'
];

let allFiles = [];

targetFolders.forEach(target => {
  const root = path.join(base, target);
  if (!fs.existsSync(root)) return;

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else {
        const relToVault = path.relative(base, fullPath);
        const relToTarget = path.relative(root, fullPath);
        allFiles.push({
          targetFolder: target,
          relToVault,
          relToTarget,
          fileName: entry.name,
          fullPath
        });
      }
    }
  }

  traverse(root);
});

// Check breakdown of files by folder
targetFolders.forEach(f => {
  const folderFiles = allFiles.filter(x => x.targetFolder === f);
  console.log('\n=============================================');
  console.log('Folder: ' + f + ' (' + folderFiles.length + ' files)');
  console.log('=============================================');
  const subTypes = {};
  folderFiles.forEach(file => {
    const parts = file.relToTarget.split(path.sep);
    const key = parts.length > 1 ? parts[0] : '[ROOT FILE]';
    subTypes[key] = (subTypes[key] || 0) + 1;
  });
  console.log('Subcategories:', JSON.stringify(subTypes, null, 2));
});
