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

// Let's create an intelligent classifier & renamer function
function resolveMapping(f) {
  const target = f.targetFolder;
  const rel = f.relToTarget;
  const fileName = f.fileName;
  const fileNameNoExt = path.parse(fileName).name;
  const parts = rel.split(path.sep);

  // Determine specialty branch
  let specialty = 'Đa khoa';
  if (target === '1. Bệnh truyền nhiễm') specialty = 'Truyền nhiễm';
  else if (target === '2. Hồi sức - Cấp cứu') specialty = 'Hồi sức - Cấp cứu';
  else if (target === '3. Nội tổng quát') {
    if (parts[0].includes('Tim mạch')) specialty = 'Tim mạch';
    else if (parts[0].includes('Hô hấp')) specialty = 'Hô hấp';
    else if (parts[0].includes('Tiêu hóa')) specialty = 'Tiêu hóa - Gan mật';
    else if (parts[0].includes('Thận')) specialty = 'Thận - Tiết niệu';
    else if (parts[0].includes('Thần kinh')) specialty = 'Thần kinh';
    else if (parts[0].includes('Nội tiết')) specialty = 'Nội tiết - Chuyển hóa';
    else specialty = 'Nội tổng quát';
  } else if (target === '4. Huyết học & ung thư') specialty = 'Huyết học - Ung thư';
  else if (target === '5. Mắt - Tai mũi họng - Răng hàm mặt') specialty = 'Mắt - TMH - RHM';
  else if (target === '6. Da liễu & cơ xương khớp') specialty = 'Da liễu - Cơ xương khớp';
  else if (target === '7. Ngoại khoa') specialty = 'Ngoại khoa';
  else if (target === '8. Sản phụ khoa') specialty = 'Sản phụ khoa';
  else if (target === '9. Nhi khoa') specialty = 'Nhi khoa';

  // Determine Disease / Problem Name
  let diseaseName = 'Vấn đề chung';
  if (parts.length >= 2) {
    // If inside a subfolder, usually the parent folder is disease name
    // e.g. "Bệnh lý cụ thể\Suy tủy\1. Tổng quan & Dịch tễ học.md" -> "Suy tủy"
    // e.g. "3.1.1. Bệnh mạch vành & ACS\Hội chứng vành cấp\1. Tổng quan..." -> "Hội chứng vành cấp"
    // e.g. "1. Tác nhân\1.1. Nhiễm khuẩn\Cầu khuẩn Gram (+)\Liên cầu..." -> "Liên cầu (Streptococcus)"
    const parentFolder = parts[parts.length - 2];
    if (parentFolder === 'Bệnh lý cụ thể' || parentFolder.startsWith('3.') || parentFolder.startsWith('2.') || parentFolder.startsWith('1.')) {
      diseaseName = fileNameNoExt;
    } else {
      diseaseName = parentFolder;
    }
  } else {
    diseaseName = fileNameNoExt.replace(/^MOC\s*-\s*/i, '').replace(/^Bệnh lý\s*-\s*/i, '');
  }

  // Determine Target Kho & Prefix & Part
  let kho = '';
  let prefix = '';
  let part = 'P1';
  let cleanDisease = diseaseName;

  const fnLower = fileNameNoExt.toLowerCase();

  // 1. Dịch tễ học
  if (fnLower.includes('dịch tễ') || fnLower.includes('định nghĩa') || fnLower.startsWith('1. tổng quan') || fnLower.startsWith('1. định nghĩa')) {
    kho = 'Kho dịch tễ học';
    prefix = 'DTH';
    part = 'P1';
  }
  // 2. Sinh lý bệnh
  else if (fnLower.includes('sinh lý bệnh') || fnLower.includes('cơ chế bệnh sinh') || fnLower.includes('nguyên nhân') || fnLower.startsWith('2.') || fnLower.startsWith('3. nguyên nhân')) {
    kho = 'Kho sinh lý bệnh';
    prefix = 'SLB';
    if (fnLower.includes('2.2') || fnLower.includes('p2') || fnLower.includes('phần 2')) part = 'P2';
    else if (fnLower.includes('p3') || fnLower.includes('phần 3')) part = 'P3';
    else if (fnLower.includes('3. nguyên nhân')) part = 'P3';
    else part = 'P1';
  }
  // 3. Chẩn đoán
  else if (fnLower.includes('lâm sàng') || fnLower.includes('cận lâm sàng') || fnLower.includes('chẩn đoán') || fnLower.includes('triệu chứng') || fnLower.startsWith('3. lâm sàng') || fnLower.startsWith('4. ') || fnLower.startsWith('5. chẩn đoán')) {
    kho = 'Kho chẩn đoán';
    prefix = 'CD';
    if (fnLower.startsWith('3. lâm sàng') || fnLower.includes('lâm sàng') && !fnLower.includes('cận lâm sàng')) part = 'P1_LS';
    else if (fnLower.startsWith('4. cận lâm sàng') || fnLower.includes('cận lâm sàng')) part = 'P2_CLS';
    else if (fnLower.startsWith('5. chẩn đoán') || fnLower.includes('chẩn đoán')) part = 'P3_CD';
    else part = 'P1';
  }
  // 4. Phác đồ điều trị
  else if (fnLower.includes('điều trị') || fnLower.includes('quản lý') || fnLower.includes('phác đồ') || fnLower.includes('thuốc') || fnLower.includes('xử trí') || fnLower.startsWith('6. điều trị') || fnLower.startsWith('7. điều trị') || target.includes('Hồi sức') || rel.includes('Dược lý')) {
    kho = 'Kho phác đồ điều trị';
    prefix = 'PDDT';
    if (fnLower.includes('6.1') || fnLower.includes('7.1') || fnLower.includes('ngoại trú')) part = 'P1';
    else if (fnLower.includes('6.2') || fnLower.includes('7.2') || fnLower.includes('nội trú')) part = 'P2';
    else if (fnLower.includes('6.3') || fnLower.includes('7.3')) part = 'P3';
    else part = 'P1';
  }
  // 5. Biến chứng
  else if (fnLower.includes('biến chứng') || fnLower.includes('tiên lượng') || fnLower.startsWith('7. biến chứng') || fnLower.startsWith('8. ') || fnLower.startsWith('9. tiên lượng')) {
    kho = 'Kho biến chứng';
    prefix = 'BC';
    if (fnLower.includes('biến chứng') && !fnLower.includes('tiên lượng')) part = 'P1_BC';
    else if (fnLower.includes('tiên lượng') && !fnLower.includes('biến chứng')) part = 'P2_TL';
    else part = 'P1';
  }
  // 6. Cập nhật
  else if (fnLower.startsWith('byt_') || fnLower.startsWith('uptodate_') || fnLower.includes('cập nhật') || fnLower.startsWith('aha_') || fnLower.startsWith('esc_') || fnLower.startsWith('kdigo_') || fnLower.startsWith('gold_') || fnLower.startsWith('gina_')) {
    kho = 'Kho cập nhật';
    prefix = 'CN';
    part = fnLower.includes('p2') ? 'P2' : (fnLower.includes('p3') ? 'P3' : 'P1');
  }
  // Tác nhân vi sinh / Vi khuẩn / Virus
  else if (rel.includes('1. Tác nhân') || rel.includes('0. Cơ sở')) {
    kho = 'Kho dịch tễ học'; // or Kho sinh lý bệnh
    prefix = 'DTH_ViSinh';
    cleanDisease = fileNameNoExt;
    part = 'P1';
  }
  // Master disease file (e.g. "Suy tủy.md", "Glaucoma góc đóng cấp.md", "MOC...")
  else if (fileNameNoExt === diseaseName || fnLower.startsWith('moc') || fnLower.startsWith('bệnh lý -')) {
    kho = 'Kho chẩn đoán'; // or MOC hub
    prefix = 'CD_TongQuan';
    part = 'MOC';
  } else {
    kho = 'Kho chẩn đoán';
    prefix = 'CD';
    cleanDisease = fileNameNoExt;
    part = 'P1';
  }

  // Final new file name: Prefix + _ + CleanDisease + _ + Part + .md
  const newFileName = `${prefix}_${cleanDisease}_${part}.md`.replace(/\s+/g, ' ').trim();
  const newRelPath = path.join(kho, specialty, newFileName);

  return {
    kho,
    specialty,
    diseaseName: cleanDisease,
    prefix,
    part,
    newFileName,
    newRelPath,
    originalRel: f.relToVault
  };
}

const results = allFiles.map(resolveMapping);
const khoStats = {};
results.forEach(r => {
  khoStats[r.kho] = (khoStats[r.kho] || 0) + 1;
});

console.log('\n--- SIMULATED REORGANIZATION STATS ---');
console.log(JSON.stringify(khoStats, null, 2));

console.log('\n--- SAMPLES FOR EACH KHO ---');
Object.keys(khoStats).forEach(k => {
  console.log(`\n=== ${k} ===`);
  results.filter(r => r.kho === k).slice(0, 5).forEach(r => {
    console.log(`OLD: ${r.originalRel}`);
    console.log(`NEW: ${r.newRelPath}\n`);
  });
});
