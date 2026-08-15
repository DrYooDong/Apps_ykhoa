const fs = require('fs');
const path = require('path');

const targetDir = 'src/content/pathophysiology';

console.log('=== KIỂM TRA NỘI DUNG CÁC FILE NGHI VẤN ===\n');

// 1. Kiểm tra sinh-ly-hoc.html và sinhly-sinhlybenh.html
['sinh-ly-hoc.html', 'sinhly-sinhlybenh.html', 'reader.html', 'index.md'].forEach(f => {
  const p = path.join(targetDir, f);
  if (fs.existsSync(p)) {
    console.log(`--- File: ${f} (${fs.statSync(p).size} bytes) ---`);
    console.log(fs.readFileSync(p, 'utf8').substring(0, 300));
    console.log('\n');
  }
});

// 2. Kiểm tra thư mục content/
console.log('--- src/content/pathophysiology/content ---');
if (fs.existsSync(path.join(targetDir, 'content'))) {
  const cFiles = fs.readdirSync(path.join(targetDir, 'content'));
  console.log(cFiles);
  cFiles.forEach(cf => {
    const cp = path.join(targetDir, 'content', cf);
    if (fs.statSync(cp).isDirectory()) {
      console.log(`  Subdir ${cf}:`, fs.readdirSync(cp));
    } else {
      console.log(`  File ${cf}: ${fs.statSync(cp).size} bytes`);
    }
  });
}

// 3. Kiểm tra thư mục js/
console.log('\n--- src/content/pathophysiology/js ---');
if (fs.existsSync(path.join(targetDir, 'js'))) {
  const jsFiles = fs.readdirSync(path.join(targetDir, 'js'));
  jsFiles.forEach(jf => {
    const jp = path.join(targetDir, 'js', jf);
    if (fs.statSync(jp).isDirectory()) {
      console.log(`  Subdir ${jf}:`, fs.readdirSync(jp));
    } else {
      console.log(`  File ${jf}: ${fs.statSync(jp).size} bytes`);
    }
  });
}

// 4. Kiểm tra data/
console.log('\n--- src/content/pathophysiology/data ---');
if (fs.existsSync(path.join(targetDir, 'data'))) {
  const dFiles = fs.readdirSync(path.join(targetDir, 'data'));
  dFiles.forEach(df => {
    const dp = path.join(targetDir, 'data', df);
    console.log(`  File ${df}: ${fs.statSync(dp).size} bytes`);
  });
}
