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

function getAccurateDiseaseName(relParts, fileNameNoExt) {
  // Ignored generic folder names
  const genericFolders = new Set([
    'bệnh lý cụ thể', 'cơ sở', 'cập nhật', 'bệnh lý', 'tác nhân', 
    '1.1. nhiễm khuẩn', '1.2. siêu vi (virus)', '1.3. nấm & kst', 
    '1.2.1 virus dna', '1.2.2 virus rna', 'cầu khuẩn gram (+)',
    'song cầu khuẩn gram (-)', 'trực khuẩn gram (+)', 'trực khuẩn gram (-) & đường ruột',
    'vi khuẩn kỵ khí & khác', 'vi khuẩn nội bào & xoắn khuẩn', 'mycobacteria'
  ]);

  for (let i = relParts.length - 2; i >= 0; i--) {
    const part = relParts[i].trim();
    const partLower = part.toLowerCase();
    
    // Skip numbered grouping prefixes like "3.1. Tim mạch", "2.1. Nhiễm trùng Thần kinh", etc.
    if (/^\d+(\.\d+)*\.\s*/.test(part) && (partLower.includes('tim mạch') || partLower.includes('nhiễm trùng') || partLower.includes('hô hấp') || partLower.includes('tiêu hóa') || partLower.includes('thần kinh') || partLower.includes('thận') || partLower.includes('nội tiết'))) {
      continue;
    }
    
    if (!genericFolders.has(partLower) && !partLower.startsWith('moc')) {
      return part.replace(/^\d+(\.\d+)*\.\s*/, '');
    }
  }

  return fileNameNoExt.replace(/^MOC\s*-\s*/i, '').replace(/^Bệnh lý\s*-\s*/i, '');
}

console.log('Testing accurate disease names extraction...');
const samples = allFiles.slice(0, 30).map(f => {
  const parts = f.relToTarget.split(path.sep);
  const fnNoExt = path.parse(f.fileName).name;
  return {
    rel: f.relToTarget,
    extractedDisease: getAccurateDiseaseName(parts, fnNoExt)
  };
});
console.log(samples.slice(0, 15));
