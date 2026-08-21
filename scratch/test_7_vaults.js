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

console.log(`Total files found: ${allFiles.length}`);

// Specialty mapper
function getSpecialty(targetFolder, relParts) {
  if (targetFolder === '1. Bệnh truyền nhiễm') return 'Truyền nhiễm & Vi sinh';
  if (targetFolder === '2. Hồi sức - Cấp cứu') return 'Hồi sức - Cấp cứu';
  if (targetFolder === '3. Nội tổng quát') {
    const first = (relParts[0] || '').toLowerCase();
    if (first.includes('tim mạch')) return 'Tim mạch';
    if (first.includes('hô hấp')) return 'Hô hấp';
    if (first.includes('tiêu hóa')) return 'Tiêu hóa - Gan mật';
    if (first.includes('thận')) return 'Thận - Tiết niệu';
    if (first.includes('thần kinh')) return 'Thần kinh';
    if (first.includes('nội tiết')) return 'Nội tiết - Chuyển hóa';
    return 'Nội tổng quát';
  }
  if (targetFolder === '4. Huyết học & ung thư') return 'Huyết học - Ung thư';
  if (targetFolder === '5. Mắt - Tai mũi họng - Răng hàm mặt') return 'Mắt - TMH - RHM';
  if (targetFolder === '6. Da liễu & cơ xương khớp') return 'Da liễu - Cơ xương khớp';
  if (targetFolder === '7. Ngoại khoa') return 'Ngoại khoa';
  if (targetFolder === '8. Sản phụ khoa') return 'Sản phụ khoa';
  if (targetFolder === '9. Nhi khoa') return 'Nhi khoa';
  return 'Đa khoa';
}

// Disease name extractor
function getDiseaseName(relParts, fileNameNoExt) {
  // If there are subfolders, try to find the disease folder
  const genericFolders = new Set([
    'bệnh lý cụ thể', 'cơ sở', 'cập nhật', 'bệnh lý', 'tác nhân', 
    '1.1. nhiễm khuẩn', '1.2. siêu vi (virus)', '1.3. nấm & kst', 
    '1.2.1 virus dna', '1.2.2 virus rna', 'cầu khuẩn gram (+)',
    'song cầu khuẩn gram (-)', 'trực khuẩn gram (+)', 'trực khuẩn gram (-) & đường ruột',
    'vi khuẩn kỵ khí & khác', 'vi khuẩn nội bào & xoắn khuẩn', 'mycobacteria',
    'đường ruột', 'có sinh bào tử', 'không sinh bào tử', 'không lên men', 'esbl, cre',
    'xoắn khuẩn', 'vi khuẩn kỵ khí', '1.2.1.1. virus dna chuỗi kép (dsdna)',
    '1.2.1.2. virus dna chuỗi đơn (ssdna)', '1.2.2.1. virus rna chuỗi đơn dương (+ssrna)',
    '1.2.2.2. virus rna chuỗi đơn âm (-ssrna)', '1.2.2.3. virus rna chuỗi kép (dsrna)',
    'a. có màng bọc', 'b. không màng bọc', 'alphaherpesviruses', 'betaherpesviruses', 'gammaherpesviruses',
    'herpesviridae', 'poxviridae', 'adenoviridae', 'papillomaviridae', 'parvoviridae',
    'coronaviridae', 'flaviviridae', 'picornaviridae', 'togaviridae', 'caliciviridae', 'hepeviridae',
    'paramyxoviridae', 'orthomyxoviridae', 'rhabdoviridae', 'filoviridae', 'bunyavirales', 'arenaviridae',
    'reoviridae', 'retroviridae', '1.3.1. nấm (fungi)', '1.3.2. ký sinh trùng',
    'nấm hạt men (yeasts)', 'nấm sợi (molds)', 'nấm lưỡng hình (dimorphic fungi)',
    'đơn bào (protozoa)', 'giun sán (helminths)', 'đơn bào đường ruột & niệu dục',
    'đơn bào máu & mô', 'giun (nematodes)', 'sán lá (trematodes)', 'sán dải (cestodes)',
    'giun đường ruột', 'giun mô & ký sinh', 'sán lá gan', 'sán lá phổi', 'sán lá ruột', 'sán dải (sán dây)'
  ]);

  for (let i = relParts.length - 2; i >= 0; i--) {
    const part = relParts[i].trim();
    const partLower = part.toLowerCase();
    
    // Skip numbered specialty headings e.g. "3.1. Tim mạch", "2.1. Nhiễm trùng Thần kinh"
    if (/^\d+(\.\d+)*\.\s*/.test(part) && (
      partLower.includes('tim mạch') || partLower.includes('nhiễm trùng') || 
      partLower.includes('hô hấp') || partLower.includes('tiêu hóa') || 
      partLower.includes('thần kinh') || partLower.includes('thận') || 
      partLower.includes('nội tiết') || partLower.includes('đánh giá') ||
      partLower.includes('sốc') || partLower.includes('sepsis') ||
      partLower.includes('phản vệ') || partLower.includes('suy hô hấp') ||
      partLower.includes('rối loạn') || partLower.includes('dược lý') ||
      partLower.includes('chăm sóc')
    )) {
      continue;
    }
    
    if (!genericFolders.has(partLower) && !partLower.startsWith('moc')) {
      return part.replace(/^\d+(\.\d+)*\.\s*/, '');
    }
  }

  // If at root or directly under generic folder, use clean file name
  return fileNameNoExt
    .replace(/^MOC\s*-\s*/i, '')
    .replace(/^Bệnh lý\s*-\s*/i, '')
    .replace(/^\d+(\.\d+)*\.\s*/, '');
}

// Classifier function
function classifyFile(f) {
  const relParts = f.relToTarget.split(path.sep);
  const fileNameNoExt = path.parse(f.fileName).name;
  const fnLower = fileNameNoExt.toLowerCase();
  const specialty = getSpecialty(f.targetFolder, relParts);
  const diseaseName = getDiseaseName(relParts, fileNameNoExt);

  let kho = '';
  let prefix = '';
  let part = 'P1';

  // 1. Kho Dịch tễ học
  if (fnLower.includes('dịch tễ') || fnLower.includes('định nghĩa & dịch tễ') || fnLower.startsWith('1. tổng quan & dịch tễ') || fnLower.startsWith('1. định nghĩa') || fnLower.startsWith('1. tổng quan')) {
    kho = 'Kho dịch tễ học';
    prefix = 'DTH';
    part = 'P1';
  }
  // Vi sinh vật / Tác nhân gây bệnh (trong 1. Bệnh truyền nhiễm/1. Tác nhân)
  else if (f.relToTarget.includes('1. Tác nhân') || f.relToTarget.includes('0. Cơ sở & chẩn đoán vi sinh')) {
    kho = 'Kho dịch tễ học';
    prefix = 'DTH';
    part = 'P1';
  }
  // 2. Kho Sinh lý bệnh
  else if (
    fnLower.includes('sinh lý bệnh') || 
    fnLower.includes('cơ chế bệnh sinh') || 
    fnLower.includes('nguyên nhân') || 
    fnLower.startsWith('2. cơ chế') || 
    fnLower.startsWith('2.1. cơ chế') || 
    fnLower.startsWith('2.2. sinh lý') || 
    fnLower.startsWith('2. sinh lý') ||
    fnLower.startsWith('3. nguyên nhân')
  ) {
    kho = 'Kho sinh lý bệnh';
    prefix = 'SLB';
    if (fnLower.includes('2.2') || fnLower.includes('p2') || fnLower.includes('phần 2')) part = 'P2';
    else if (fnLower.includes('p3') || fnLower.includes('phần 3') || fnLower.includes('3. nguyên nhân')) part = 'P3';
    else part = 'P1';
  }
  // 3. Kho Chẩn đoán
  else if (
    fnLower.includes('lâm sàng') || 
    fnLower.includes('cận lâm sàng') || 
    fnLower.includes('chẩn đoán') || 
    fnLower.includes('triệu chứng') || 
    fnLower.startsWith('3. lâm sàng') || 
    fnLower.startsWith('4. cận lâm sàng') || 
    fnLower.startsWith('5. chẩn đoán') ||
    fnLower.startsWith('4.1. lâm sàng') ||
    fnLower.startsWith('4.2. cận lâm sàng') ||
    fnLower.startsWith('6. chẩn đoán')
  ) {
    kho = 'Kho chẩn đoán';
    prefix = 'CD';
    if (fnLower.startsWith('3. lâm sàng') || (fnLower.includes('lâm sàng') && !fnLower.includes('cận lâm sàng'))) part = 'P1';
    else if (fnLower.startsWith('4. cận lâm sàng') || fnLower.includes('cận lâm sàng')) part = 'P2';
    else if (fnLower.startsWith('5. chẩn đoán') || fnLower.startsWith('6. chẩn đoán') || fnLower.includes('chẩn đoán')) part = 'P3';
    else part = 'P1';
  }
  // 4. Kho Phác đồ điều trị
  else if (
    fnLower.includes('điều trị') || 
    fnLower.includes('quản lý') || 
    fnLower.includes('phác đồ') || 
    fnLower.includes('thuốc') || 
    fnLower.includes('xử trí') || 
    fnLower.includes('kháng sinh') ||
    fnLower.startsWith('6. điều trị') || 
    fnLower.startsWith('7. điều trị') || 
    fnLower.startsWith('6.1.') || 
    fnLower.startsWith('6.2.') || 
    fnLower.startsWith('7.1.') || 
    fnLower.startsWith('7.2.') ||
    f.relToTarget.includes('3. Dược lý Nhiễm trùng') ||
    f.targetFolder === '2. Hồi sức - Cấp cứu'
  ) {
    kho = 'Kho phác đồ điều trị';
    prefix = 'PDDT';
    if (fnLower.includes('6.1') || fnLower.includes('7.1') || fnLower.includes('ngoại trú') || fnLower.includes('stemi')) part = 'P1';
    else if (fnLower.includes('6.2') || fnLower.includes('7.2') || fnLower.includes('nội trú') || fnLower.includes('nste-acs')) part = 'P2';
    else if (fnLower.includes('6.3') || fnLower.includes('7.3')) part = 'P3';
    else part = 'P1';
  }
  // 5. Kho Biến chứng
  else if (
    fnLower.includes('biến chứng') || 
    fnLower.includes('tiên lượng') || 
    fnLower.startsWith('7. biến chứng') || 
    fnLower.startsWith('8. biến chứng') || 
    fnLower.startsWith('8. tiên lượng') || 
    fnLower.startsWith('9. tiên lượng') ||
    fnLower.startsWith('7. biến chứng & tiên lượng')
  ) {
    kho = 'Kho biến chứng';
    prefix = 'BC';
    if (fnLower.includes('biến chứng') && !fnLower.includes('tiên lượng')) part = 'P1';
    else if (fnLower.includes('tiên lượng') && !fnLower.includes('biến chứng')) part = 'P2';
    else part = 'P1';
  }
  // 6. Kho Cập nhật
  else if (
    fnLower.startsWith('byt_') || 
    fnLower.startsWith('uptodate_') || 
    fnLower.includes('cập nhật') || 
    fnLower.startsWith('aha_') || 
    fnLower.startsWith('esc_') || 
    fnLower.startsWith('kdigo_') || 
    fnLower.startsWith('gold_') || 
    fnLower.startsWith('gina_')
  ) {
    kho = 'Kho cập nhật';
    prefix = 'CN';
    part = fnLower.includes('p2') ? 'P2' : (fnLower.includes('p3') ? 'P3' : 'P1');
  }
  // 7. Kho chưa lọc (MOC, files không phân loại được, tài liệu phụ trợ)
  else {
    kho = 'Kho chưa lọc';
    prefix = 'RAW';
    part = 'P1';
  }

  // Generate target filename
  let cleanDisease = diseaseName.trim();
  if (!cleanDisease) cleanDisease = fileNameNoExt.trim();

  // If in Kho chưa lọc, we keep RAW prefix + clean name + part
  let newFileName = `${prefix}_${cleanDisease}_${part}.md`.replace(/\s+/g, ' ');
  
  // Return info
  return {
    kho,
    specialty,
    diseaseName: cleanDisease,
    prefix,
    part,
    newFileName,
    newRelPath: path.join(kho, specialty, newFileName),
    originalRel: f.relToVault,
    fullPath: f.fullPath
  };
}

const classified = allFiles.map(classifyFile);

const counts = {};
classified.forEach(c => {
  counts[c.kho] = (counts[c.kho] || 0) + 1;
});

console.log('\n--- PHÂN BỔ THEO 7 KHO ---');
console.log(JSON.stringify(counts, null, 2));

console.log('\n--- MẪU TRONG "Kho chưa lọc" ---');
const rawFiles = classified.filter(c => c.kho === 'Kho chưa lọc');
console.log(`Số lượng files trong Kho chưa lọc: ${rawFiles.length}`);
rawFiles.forEach(f => {
  console.log(`OLD: ${f.originalRel} --> NEW: ${f.newRelPath}`);
});
