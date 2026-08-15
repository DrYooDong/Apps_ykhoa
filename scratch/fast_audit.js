const fs = require('fs');
const path = require('path');

const targetDir = 'src/content/pathophysiology';

// Gom toàn bộ nội dung file trong src, components, pages thành 1 chuỗi lớn duy nhất
let bigContent = '';
function collectFiles(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.git') && !full.includes('dist')) {
        collectFiles(full);
      }
    } else if (/\.(html|ts|js|json|css|md)$/.test(f)) {
      bigContent += ' ' + fs.readFileSync(full, 'utf8');
    }
  });
}

collectFiles('src');
collectFiles('components');
collectFiles('pages');
collectFiles('data');

console.log(`BigContent length: ${(bigContent.length / 1024 / 1024).toFixed(2)} MB`);

// Quét các file trong pathophysiology
function scanPatho(dir) {
  let list = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      list = list.concat(scanPatho(full));
    } else {
      list.push(full.replace(/\\/g, '/'));
    }
  });
  return list;
}

const pathoFiles = scanPatho(targetDir);

const zeroBytes = [];
const zeroRefs = [];
const suspiciousFiles = [];

pathoFiles.forEach(pf => {
  const baseName = path.basename(pf);
  const relPath = path.relative(targetDir, pf).replace(/\\/g, '/');
  const size = fs.statSync(pf).size;

  if (size === 0) {
    zeroBytes.push({ path: relPath, size });
    return;
  }

  // Đếm số lần xuất hiện của baseName trong bigContent
  const escaped = baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = bigContent.match(new RegExp(escaped, 'g'));
  const count = matches ? matches.length : 0;

  // Nếu file chỉ xuất hiện <= 1 lần (nghĩa là chỉ nằm trong chính nó)
  if (count <= 1 && !relPath.startsWith('images/') && !relPath.startsWith('biochemistry/')) {
    zeroRefs.push({ path: relPath, size, count });
  }

  if (relPath.includes('copy') || relPath.includes('temp') || relPath.includes('backup') || relPath.includes('old')) {
    suspiciousFiles.push({ path: relPath, size });
  }
});

console.log(`\n=== 1. FILE 0 BYTES (RỖNG) [${zeroBytes.length} files] ===`);
zeroBytes.forEach(f => console.log(`- ${f.path}`));

console.log(`\n=== 2. FILE ÍT/KHÔNG CÓ THAM CHIẾU NGOÀI (Orphaned / Test) [${zeroRefs.length} files] ===`);
zeroRefs.forEach(f => console.log(`- ${f.path} (${f.size} bytes)`));

console.log(`\n=== 3. FILE TÊN TẠM / BACKUP [${suspiciousFiles.length} files] ===`);
suspiciousFiles.forEach(f => console.log(`- ${f.path} (${f.size} bytes)`));
