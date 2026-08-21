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
        const parts = relToTarget.split(path.sep);
        allFiles.push({
          targetFolder: target,
          relToVault,
          relToTarget,
          fileName: entry.name,
          parts: parts,
          fullPath
        });
      }
    }
  }

  traverse(root);
});

console.log(`Total files found: ${allFiles.length}`);

// Group by file name patterns
const patternMap = {};
allFiles.forEach(f => {
  const name = f.fileName;
  patternMap[name] = (patternMap[name] || 0) + 1;
});

console.log('\nTop 40 File Names across all 9 folders:');
Object.entries(patternMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 40)
  .forEach(([k, v]) => console.log(`  ${v.toString().padStart(4, ' ')} | ${k}`));

// Examine folder paths to understand disease extraction
console.log('\nSample file paths:');
allFiles.slice(0, 30).forEach(f => console.log(`[${f.targetFolder}] ${f.relToTarget}`));

// Let's analyze how diseases are nested across target folders
const sampleByFolder = {};
targetFolders.forEach(target => {
  const folderFiles = allFiles.filter(f => f.targetFolder === target);
  sampleByFolder[target] = {
    count: folderFiles.length,
    samples: folderFiles.slice(0, 10).map(f => f.relToTarget)
  };
});

console.log('\nFolder breakdown:');
for (const [folder, data] of Object.entries(sampleByFolder)) {
  console.log(`\n=== ${folder} (${data.count} files) ===`);
  data.samples.forEach(s => console.log(`  ${s}`));
}
