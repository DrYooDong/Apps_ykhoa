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
          dirName: path.dirname(relToTarget),
          fullPath
        });
      }
    }
  }

  traverse(root);
});

console.log(`Total files: ${allFiles.length}`);

// Group by classification rule test
const categories = {
  dich_te: [],
  sinh_ly_benh: [],
  chan_doan: [],
  dieu_tri: [],
  bien_chung: [],
  cap_nhat: [],
  moc_overview: [],
  other: []
};

allFiles.forEach(f => {
  const n = f.fileName.toLowerCase();
  
  if (n.startsWith('moc') || n.includes('bệnh lý - ') || n.startsWith('0. tổng quan & định hướng')) {
    categories.moc_overview.push(f);
  } else if (n.includes('dịch tễ') || n.includes('định nghĩa & dịch tễ') || n.startsWith('1. tổng quan & dịch tễ')) {
    categories.dich_te.push(f);
  } else if (n.includes('sinh lý bệnh') || n.includes('cơ chế bệnh sinh') || n.includes('nguyên nhân')) {
    categories.sinh_ly_benh.push(f);
  } else if (n.includes('lâm sàng') || n.includes('cận lâm sàng') || n.includes('chẩn đoán') || n.includes('triệu chứng') || n.includes('khám')) {
    categories.chan_doan.push(f);
  } else if (n.includes('điều trị') || n.includes('quản lý') || n.includes('phác đồ') || n.includes('thuốc') || n.includes('xử trí')) {
    categories.dieu_tri.push(f);
  } else if (n.includes('biến chứng') || n.includes('tiên lượng')) {
    categories.bien_chung.push(f);
  } else if (n.startsWith('byt_') || n.startsWith('uptodate_') || n.includes('cập nhật') || n.startsWith('aha_') || n.startsWith('esc_') || n.startsWith('kdigo_') || n.startsWith('gold_') || n.startsWith('gina_')) {
    categories.cap_nhat.push(f);
  } else {
    categories.other.push(f);
  }
});

console.log('\n--- Classification Counts ---');
for (const [k, v] of Object.entries(categories)) {
  console.log(`${k.padEnd(15)}: ${v.length} files`);
}

console.log('\n--- Sample "other" files (first 40) ---');
categories.other.slice(0, 40).forEach(f => console.log(`[${f.targetFolder}] ${f.relToTarget}`));

console.log('\n--- Sample "moc_overview" files (first 20) ---');
categories.moc_overview.slice(0, 20).forEach(f => console.log(`[${f.targetFolder}] ${f.relToTarget}`));
