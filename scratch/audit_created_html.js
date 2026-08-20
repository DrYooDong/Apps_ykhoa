const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = [
  'src/content/pathophysiology/biochemistry/block2-catalysis-signaling/mang-te-bao-van-chuyen.html',
  'src/content/pathophysiology/biochemistry/block6-organ-metabolism/hoa-sinh-mau-dong-mau.html',
  'src/content/pathophysiology/biochemistry/block5-molecular-genetics/ky-thuat-pcr-ngs.html',
  'src/content/pathophysiology/biochemistry/block3-bioenergetics/nang-luong-sinh-hoc.html',
  'src/content/pathophysiology/biochemistry/block3-bioenergetics/chuoi-ho-hap-etc.html'
];

console.log('=== BẮT ĐẦU AUDIT TOÀN DIỆN 5 TỆP HTML ĐÃ SOẠN ===\n');

let allPassed = true;

for (const f of files) {
  console.log('====================================================');
  console.log('📄 Tệp:', f);
  
  // 1. Check tag integrity
  try {
    const tagRes = execSync(`node scratch/check_tags.js "${f}"`, { encoding: 'utf-8' });
    const tagPass = tagRes.includes('PASSED');
    console.log('  1. Tag integrity:', tagPass ? '✅ PASSED' : '❌ FAILED');
    if (!tagPass) {
      allPassed = false;
      console.log(tagRes);
    }
  } catch (err) {
    allPassed = false;
    console.log('  1. Tag integrity: ❌ ERROR:', err.message);
  }

  // 2. Check format bugs ($ and #)
  try {
    const fmtRes = execSync(`node scratch/check_format_bugs.js "${f}"`, { encoding: 'utf-8' });
    const fmtPass = fmtRes.includes('TUYỆT VỜI');
    console.log('  2. Format bugs ($ / #):', fmtPass ? '✅ 0 LỖI' : '❌ CÓ LỖI');
    if (!fmtPass) {
      allPassed = false;
      console.log(fmtRes);
    }
  } catch (err) {
    allPassed = false;
    console.log('  2. Format bugs: ❌ ERROR:', err.message);
  }

  // 3. Check CSS/JS links
  const content = fs.readFileSync(path.resolve(f), 'utf-8');
  const cssMatches = content.match(/href="([^"]+\.css)"/g) || [];
  const jsMatches = content.match(/src="([^"]+\.(?:js|ts))"/g) || [];
  
  let linkErrors = 0;
  const dir = path.dirname(path.resolve(f));
  
  for (const match of [...cssMatches, ...jsMatches]) {
    const rel = match.split('"')[1];
    if (rel.startsWith('http')) continue;
    const resolved = path.resolve(dir, rel);
    if (!fs.existsSync(resolved)) {
      console.log('  3. Broken Link: ❌ File không tồn tại:', rel, '->', resolved);
      linkErrors++;
      allPassed = false;
    }
  }
  if (linkErrors === 0) {
    console.log(`  3. Relative Assets: ✅ Đầy đủ (${cssMatches.length} CSS, ${jsMatches.length} JS)`);
  }

  // 4. File size
  const stats = fs.statSync(path.resolve(f));
  console.log('  4. Dung lượng:', (stats.size / 1024).toFixed(1) + ' KB | Số dòng:', content.split('\n').length);
}

console.log('====================================================');
console.log(allPassed ? '🎉 TOÀN BỘ 5 TỆP HTML ĐỀU ĐẠT TIÊU CHUẨN 100%!' : '⚠️ CÓ TỆP CẦN SỬA LỖI!');
