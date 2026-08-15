const fs = require('fs');
const path = require('path');

const targetDir = 'src/content/pathophysiology';

// Quét toàn bộ codebase để lập bản đồ reference
const allSourceFiles = [];
function collectFiles(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.git') && !full.includes('dist')) {
        collectFiles(full);
      }
    } else if (/\.(html|ts|js|json|css|md)$/.test(f)) {
      allSourceFiles.push({
        path: full.replace(/\\/g, '/'),
        content: fs.readFileSync(full, 'utf8')
      });
    }
  });
}

collectFiles('src');
collectFiles('components');
collectFiles('pages');
collectFiles('data');

console.log(`Loaded ${allSourceFiles.length} source files for reference scanning.\n`);

// Danh sách các file trong pathophysiology
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

const fileAudit = [];

pathoFiles.forEach(pf => {
  const baseName = path.basename(pf);
  const relPath = path.relative(targetDir, pf).replace(/\\/g, '/');
  const size = fs.statSync(pf).size;

  let refCount = 0;
  allSourceFiles.forEach(sf => {
    // Không tự đếm chính file đó
    if (sf.path === pf) return;
    if (sf.content.includes(baseName) || sf.content.includes(relPath)) {
      refCount++;
    }
  });

  fileAudit.push({
    path: relPath,
    fullPath: pf,
    size,
    baseName,
    refCount
  });
});

console.log('=== KẾT QUẢ RÀ SOÁT CÁC FILE TRONG src/content/pathophysiology ===\n');

const zeroBytes = fileAudit.filter(f => f.size === 0);
const zeroRefs = fileAudit.filter(f => f.refCount === 0 && !f.path.startsWith('images/') && !f.path.startsWith('biochemistry/'));
const duplicates = fileAudit.filter(f => f.path === 'physio-shared.ts' || f.path === 'js/physio-shared.ts');

console.log(`1. [FILE 0 BYTES RỖNG] (${zeroBytes.length} files):`);
zeroBytes.forEach(f => console.log(`   - ${f.path} (0 bytes)`));

console.log(`\n2. [FILE KHÔNG CÓ THAM CHIẾU NÀO (0 References)] (${zeroRefs.length} files):`);
zeroRefs.forEach(f => console.log(`   - ${f.path} (${f.size} bytes)`));

console.log(`\n3. [FILE TRÙNG LẶP]:`);
duplicates.forEach(f => console.log(`   - ${f.path} (${f.size} bytes, ${f.refCount} refs)`));
