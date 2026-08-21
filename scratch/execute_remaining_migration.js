const fs = require('fs');
const path = require('path');
const base = 'd:/Apps_ykhoa/knowledge-vault';

const target3 = [
  '10. Nghiên cứu khoa học & EBM',
  '0. Thực thể hạt nhân',
  '11. Dinh dưỡng'
];

console.log('=== BẮT ĐẦU DI CHUYỂN & CHUẨN HÓA 3 KHO CUỐI CÙNG ===');

let all3Files = [];

target3.forEach(target => {
  const root = path.join(base, target);
  if (!fs.existsSync(root)) return;

  function traverse(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else {
        all3Files.push({
          targetFolder: target,
          relToTarget: path.relative(root, fullPath),
          fileName: entry.name,
          fullPath
        });
      }
    });
  }
  traverse(root);
});

console.log(`Tìm thấy ${all3Files.length} files.`);

function cleanSubjectName(str) {
  return str
    .replace(/^DASH_/i, 'Chế độ ăn DASH ')
    .replace(/\(phần 1\)$/i, '')
    .replace(/\(phần 2\)$/i, '')
    .replace(/\(P1\)$/i, '')
    .replace(/\(P2\)$/i, '')
    .replace(/_P1$/i, '')
    .replace(/_P2$/i, '')
    .replace(/^\d+(\.\d+)*\.\s*/, '')
    .trim();
}

function classifyRemaining(f) {
  const target = f.targetFolder;
  const rel = f.relToTarget;
  const fileNameNoExt = path.parse(f.fileName).name;
  const parts = rel.split(path.sep);

  let kho = '';
  let subDir = '';
  let prefix = '';
  let part = 'P1';
  let subject = cleanSubjectName(fileNameNoExt);

  if (
    fileNameNoExt.toLowerCase().includes('phần 2') || 
    fileNameNoExt.includes('(P2)') || 
    fileNameNoExt.includes('(p2)') ||
    fileNameNoExt.includes('_P2')
  ) {
    part = 'P2';
  } else if (
    fileNameNoExt.toLowerCase().includes('phần 3') || 
    fileNameNoExt.includes('(P3)') ||
    fileNameNoExt.includes('_P3')
  ) {
    part = 'P3';
  }

  // 1. Nghiên cứu khoa học & EBM
  if (target === '10. Nghiên cứu khoa học & EBM') {
    kho = 'Kho nghiên cứu khoa học & EBM';
    prefix = 'EBM';
    const sub = parts[0] || '';
    if (sub.includes('Phương pháp luận') || sub.includes('10.1')) {
      subDir = '01. Phương pháp luận & Thiết kế nghiên cứu';
    } else if (sub.includes('Xác suất') || sub.includes('Thống kê') || sub.includes('10.0') || sub.includes('10.2')) {
      subDir = '02. Xác suất & Thống kê sinh học';
    } else if (sub.includes('Y học chứng cứ') || sub.includes('10.3')) {
      subDir = '03. Thực hành Y học chứng cứ EBM';
    } else if (sub.includes('viết') || sub.includes('Xuất bản') || sub.includes('10.4') || sub.includes('10.5')) {
      subDir = '04. Viết & Xuất bản bài báo khoa học';
    } else {
      subDir = '01. Phương pháp luận & Thiết kế nghiên cứu';
    }
  }

  // 2. Thực thể hạt nhân
  else if (target === '0. Thực thể hạt nhân') {
    kho = 'Kho thực thể hạt nhân';
    prefix = 'CORE';
    const sub = parts[0] || '';
    if (sub.includes('Triệu chứng') || sub.includes('1.')) {
      subDir = '01. Triệu chứng & Hội chứng';
    } else if (sub.includes('Dược lý') || sub.includes('2.')) {
      subDir = '02. Dược lý & Hoạt chất';
    } else if (sub.includes('Cận lâm sàng') || sub.includes('3.')) {
      subDir = '03. Cận lâm sàng & Dấu ấn';
    } else if (sub.includes('Hệ cơ quan') || sub.includes('4.')) {
      subDir = '04. Cơ quan & Cấu trúc giải phẫu';
    } else {
      subDir = '01. Triệu chứng & Hội chứng';
    }
  }

  // 3. Dinh dưỡng
  else if (target === '11. Dinh dưỡng') {
    kho = 'Kho dinh dưỡng lâm sàng';
    prefix = 'DD';
    subDir = '01. Chế độ ăn & Dinh dưỡng điều trị';
  }

  if (fileNameNoExt.startsWith('MOC')) {
    subject = fileNameNoExt.replace(/^MOC\s*-\s*/i, '');
    part = 'MOC';
  }

  const newFileName = `${prefix}_${subject}_${part}.md`.replace(/\s+/g, ' ');
  return {
    kho,
    subDir,
    prefix,
    subject,
    part,
    newFileName,
    targetRelPath: path.join(kho, subDir, newFileName),
    originalRel: path.join(target, rel),
    fullPath: f.fullPath
  };
}

const list = all3Files.map(classifyRemaining);

// Resolve collisions
const destMap = {};
list.forEach(item => {
  let fullTarget = item.targetRelPath;
  if (destMap[fullTarget]) {
    let count = 2;
    let candidate = path.join(item.kho, item.subDir, `${item.prefix}_${item.subject}_P${count}.md`);
    while (destMap[candidate]) {
      count++;
      candidate = path.join(item.kho, item.subDir, `${item.prefix}_${item.subject}_P${count}.md`);
    }
    item.part = `P${count}`;
    item.newFileName = `${item.prefix}_${item.subject}_P${count}.md`;
    fullTarget = candidate;
    item.targetRelPath = fullTarget;
  }
  destMap[fullTarget] = item.originalRel;
  item.finalFullPath = path.join(base, fullTarget);
});

// Save snapshot map
const mapPath = path.join(__dirname, 'migration_map_remaining.json');
fs.writeFileSync(mapPath, JSON.stringify(list.map(x => ({
  old: x.originalRel,
  new: x.targetRelPath
})), null, 2), 'utf8');
console.log(`Đã lưu bảng ánh xạ tại: ${mapPath}`);

// Execute moves
let successCount = 0;
let errorCount = 0;

list.forEach(item => {
  try {
    const destDir = path.dirname(item.finalFullPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.renameSync(item.fullPath, item.finalFullPath);
    successCount++;
  } catch (err) {
    console.error(`Lỗi di chuyển ${item.fullPath} -> ${item.finalFullPath}:`, err.message);
    errorCount++;
  }
});

console.log(`Hoàn tất di chuyển: ${successCount} thành công, ${errorCount} thất bại.`);

// Clean up old folders
function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      removeEmptyDirs(path.join(dir, entry.name));
    }
  }
  const remaining = fs.readdirSync(dir);
  if (remaining.length === 0) {
    fs.rmdirSync(dir);
  }
}

target3.forEach(target => {
  const root = path.join(base, target);
  removeEmptyDirs(root);
  if (fs.existsSync(root)) {
    const rem = fs.readdirSync(root);
    if (rem.length === 0) {
      fs.rmdirSync(root);
      console.log(`Đã xóa thư mục cũ rỗng: ${target}`);
    } else {
      console.log(`Thư mục ${target} còn ${rem.length} mục.`);
    }
  } else {
    console.log(`Đã xóa thư mục cũ: ${target}`);
  }
});

console.log('\n=== TỔNG KẾT DI CHUYỂN 3 KHO CUỐI CÙNG THÀNH CÔNG ===');
