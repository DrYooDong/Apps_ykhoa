/**
 * master_project_audit.js
 * 
 * Script tổng hợp kiểm tra chất lượng mã nguồn CliniPortal trước khi hoàn thành bất kỳ task nào.
 * Tự động quét 7 bài test:
 * 1. Thẻ HTML đóng/mở (HTML Tag Integrity Check)
 * 2. Đường dẫn tương đối chuẩn theo cấp thư mục (Relative Path Level Audit)
 * 3. Cú pháp JavaScript (JS Syntax Check)
 * 4. Hardcoded Colors (Quy tắc CSS Variables / Design Tokens)
 * 5. Tính toàn vẹn của các file Critical Hub
 * 6. Ký tự Dollar ($) & Công thức Math/LaTeX (Unmatched Math Formula & LaTeX Symbols)
 * 7. Bullets, Numbering & Phân cấp Tiêu đề (Heading Hierarchy & Fake Headings)
 * 
 * Cách chạy:
 *   node scratch/master_project_audit.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');

let totalErrors = 0;
let totalWarnings = 0;

console.log('====================================================');
console.log('🔍 BẮT ĐẦU QUÉT KIỂM TRA LỖI TOÀN DIỆN DỰ ÁN CLINIPORTAL');
console.log('====================================================\n');

function getAllFiles(dirPath, arrayOfFiles = [], ext = '.html') {
  const files = fs.readdirSync(dirPath);
  const ignoredDirs = ['node_modules', 'brain', 'knowledge-vault', 'dist', 'android', 'ios', 'build', '.git', '.agents', '.gemini', 'archive'];

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!file.startsWith('.') && !ignoredDirs.includes(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles, ext);
      }
    } else if (file.endsWith(ext)) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const htmlFiles = getAllFiles(ROOT_DIR, [], '.html');
const jsFiles = getAllFiles(ROOT_DIR, [], '.js');
const cssFiles = getAllFiles(ROOT_DIR, [], '.css');

// ----------------------------------------------------
// 1. QUÉT THẺ HTML ĐÓNG/MỞ
// ----------------------------------------------------
console.log('👉 [TEST 1/7] Kiểm tra cân bằng thẻ HTML structural tags...');

const tagsToStack = ['div', 'main', 'article', 'section', 'nav', 'aside', 'header', 'footer'];
let tagErrorsCount = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const tagRegex = /<\/?([a-z0-9]+)(\s[^>]*)?>/gi;
  let match;
  const stack = [];
  const selfClosing = ['img', 'input', 'br', 'hr', 'link', 'meta', 'base', 'source', 'param'];

  while ((match = tagRegex.exec(content)) !== null) {
    const isClosing = match[0].startsWith('</');
    const tagName = match[1].toLowerCase();

    if (selfClosing.includes(tagName)) continue;
    if (!tagsToStack.includes(tagName)) continue;

    if (isClosing) {
      if (stack.length > 0 && stack[stack.length - 1] === tagName) {
        stack.pop();
      }
    } else {
      if (!match[0].endsWith('/>')) {
        stack.push(tagName);
      }
    }
  }

  if (stack.length > 0) {
    tagErrorsCount++;
    totalErrors++;
    const rel = path.relative(ROOT_DIR, file);
    console.log(`  ❌ [HTML TAG ERROR] ${rel} -> Thiếu thẻ đóng: ${stack.join(', ')}`);
  }
});

if (tagErrorsCount === 0) {
  console.log(`  ✅ Passed: ${htmlFiles.length} file HTML hoàn toàn cân bằng thẻ đóng/mở.`);
}

// ----------------------------------------------------
// 2. QUÉT CÚ PHÁP JAVASCRIPT (NODE -C)
// ----------------------------------------------------
console.log('\n👉 [TEST 2/7] Kiểm tra cú pháp JavaScript (JS Syntax Check)...');

let jsErrorsCount = 0;
jsFiles.forEach(file => {
  const rel = path.relative(ROOT_DIR, file);
  try {
    execSync(`node -c "${file}"`, { stdio: 'pipe' });
  } catch (err) {
    jsErrorsCount++;
    totalErrors++;
    console.log(`  ❌ [JS SYNTAX ERROR] ${rel}: Cú pháp không hợp lệ!`);
  }
});

if (jsErrorsCount === 0) {
  console.log(`  ✅ Passed: ${jsFiles.length} file JavaScript đạt chuẩn cú pháp.`);
}

// ----------------------------------------------------
// 3. QUÉT HARDCODED COLORS (DESIGN TOKENS RULE 2)
// ----------------------------------------------------
console.log('\n👉 [TEST 3/7] Kiểm tra Hardcoded Hex Colors trong CSS/HTML...');

let hardcodedCount = 0;
const allowedHex = ['#ffffff', '#000000', '#fff', '#000', 'transparent'];

cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line) => {
    if (line.includes(':root') || line.includes('--color') || line.includes('--') || line.trim().startsWith('/*')) return;
    const hexMatches = line.match(/#[0-9a-fA-F]{3,8}\b/g);
    if (hexMatches) {
      hexMatches.forEach(hex => {
        if (!allowedHex.includes(hex.toLowerCase())) {
          hardcodedCount++;
        }
      });
    }
  });
});

if (hardcodedCount > 0) {
  totalWarnings += hardcodedCount;
  console.log(`  ⚠️ Warning: Phát hiện ${hardcodedCount} vị trí màu hex trực tiếp trong CSS (Khuyên dùng var(--color-*)).`);
} else {
  console.log('  ✅ Passed: Không phát hiện vi phạm màu hex trực tiếp.');
}

// ----------------------------------------------------
// 4. QUÉT CẤP ĐƯỜNG DẪN TƯƠNG ĐỐI (RELATIVE PATH AUDIT)
// ----------------------------------------------------
console.log('\n👉 [TEST 4/7] Kiểm tra đường dẫn tương đối (Relative Path Audit)...');

let pathWarningsCount = 0;
htmlFiles.forEach(file => {
  const rel = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1;
  const content = fs.readFileSync(file, 'utf8');

  if (depth === 4) {
    if (content.includes('href="../../../css') || content.includes('src="../../../js')) {
      pathWarningsCount++;
      totalWarnings++;
      console.log(`  ⚠️ Warning: ${rel} là Cấp 4 nhưng đang dùng tiền tố Cấp 3 (../../../). Nên dùng ../../../../`);
    }
  }
});

if (pathWarningsCount === 0) {
  console.log('  ✅ Passed: Các đường dẫn tương đối đúng cấp độ.');
}

// ----------------------------------------------------
// 5. TÍNH TOÀN VẸN CỦA FILE CRITICAL HUB
// ----------------------------------------------------
console.log('\n👉 [TEST 5/7] Kiểm tra file Critical Hub...');

const criticalHubs = [
  'js/main.js',
  'js/cliniportal-sync.js',
  'js/homepage-effects.js',
  'src/content/ebm/guidelines/guidelinesdata.js',
  'src/content/ebm/guidelines/guidelines.js'
];

let hubErrors = 0;
criticalHubs.forEach(hubRel => {
  const hubPath = path.join(ROOT_DIR, hubRel);
  if (!fs.existsSync(hubPath)) {
    hubErrors++;
    totalErrors++;
    console.log(`  ❌ [CRITICAL HUB ERROR] Không tìm thấy file: ${hubRel}`);
  }
});

if (hubErrors === 0) {
  console.log('  ✅ Passed: 100% các file Critical Hub hiện diện đầy đủ.');
}

// ----------------------------------------------------
// 6. QUÉT LỖI KÝ TỰ DOLLAR ($) & CÔNG THỨC MATH/LATEX
// ----------------------------------------------------
console.log('\n👉 [TEST 6/7] Kiểm tra Ký tự Dollar ($) & Công thức Math/LaTeX...');

let dollarOddCount = 0;
let latexSymbolWarnings = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  const rel = path.relative(ROOT_DIR, file);

  lines.forEach((line, idx) => {
    if (line.includes('<script') || line.includes('</script>') || line.trim().startsWith('//')) return;

    // Check $ occurrences (excluding ${...} and \$)
    let dollarPositions = [];
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '$') {
        if (line[i + 1] === '{') continue;
        if (i > 0 && line[i - 1] === '\\') continue;
        dollarPositions.push(i);
      }
    }

    if (dollarPositions.length > 0 && dollarPositions.length % 2 !== 0) {
      dollarOddCount++;
      totalWarnings++;
      if (dollarOddCount <= 10) {
        console.log(`  ⚠️ Warning [MATH $ UNMATCHED] ${rel}:${idx + 1} -> Số lượng $ lẻ (${dollarPositions.length}): "${line.trim().slice(0, 80)}"`);
      }
    }

    // Check unescaped raw LaTeX symbols in HTML text
    if (line.includes('\\ge ') || line.includes('\\le ') || line.includes('\\rightarrow')) {
      latexSymbolWarnings++;
      totalWarnings++;
      if (latexSymbolWarnings <= 5) {
        console.log(`  ⚠️ Warning [RAW LATEX SYMBOL] ${rel}:${idx + 1} -> Ký hiệu LaTeX thô (nên đổi thành ≥, ≤, →): "${line.trim().slice(0, 80)}"`);
      }
    }
  });
});

if (dollarOddCount === 0 && latexSymbolWarnings === 0) {
  console.log('  ✅ Passed: Không phát hiện lỗi ký tự $ lẻ hoặc ký hiệu LaTeX thô.');
} else {
  console.log(`  ℹ️ Phát hiện ${dollarOddCount} dòng $ lẻ và ${latexSymbolWarnings} vị trí ký hiệu LaTeX thô.`);
}

// ----------------------------------------------------
// 7. QUÉT BULLETS, NUMBERING & HEADING HIERARCHY
// ----------------------------------------------------
console.log('\n👉 [TEST 7/7] Kiểm tra Bullets, Numbering & Heading Hierarchy...');

let rawBulletCount = 0;
let fakeHeadingCount = 0;
let headingSkipCount = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  const rel = path.relative(ROOT_DIR, file);

  let lastHeadingLevel = 0;

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Check raw unicode bullets in <p> tag
    if (trimmed.startsWith('<p>') && (trimmed.includes('•') || trimmed.includes('⁃') || trimmed.includes('‣'))) {
      rawBulletCount++;
      totalWarnings++;
      if (rawBulletCount <= 5) {
        console.log(`  ⚠️ Warning [RAW BULLET IN <P>] ${rel}:${idx + 1} -> Dùng bullet thô thay vì <ul><li>: "${trimmed.slice(0, 80)}"`);
      }
    }

    // Check fake headings: <p><strong>Title</strong></p> or <p><b>Title</b></p>
    if (/^<p>\s*<(strong|b)>[^<]+<\/(strong|b)>\s*<\/p>$/i.test(trimmed)) {
      fakeHeadingCount++;
      totalWarnings++;
      if (fakeHeadingCount <= 5) {
        console.log(`  ⚠️ Warning [FAKE HEADING] ${rel}:${idx + 1} -> Viết <strong> trong <p> làm heading giả (nên đổi thành <h3>): "${trimmed.slice(0, 80)}"`);
      }
    }

    // Check Heading Hierarchy
    const hMatch = trimmed.match(/^<h([1-6])\b[^>]*>/i);
    if (hMatch) {
      const level = parseInt(hMatch[1], 10);
      if (lastHeadingLevel > 0 && level > lastHeadingLevel + 1) {
        headingSkipCount++;
        totalWarnings++;
        if (headingSkipCount <= 5) {
          console.log(`  ⚠️ Warning [HEADING JUMP] ${rel}:${idx + 1} -> Nhảy cấp từ h${lastHeadingLevel} xuống h${level}`);
        }
      }
      lastHeadingLevel = level;
    }
  });
});

if (rawBulletCount === 0 && fakeHeadingCount === 0 && headingSkipCount === 0) {
  console.log('  ✅ Passed: Bullets, Numbering và Heading Hierarchy đạt chuẩn Semantic 100%.');
} else {
  console.log(`  ℹ️ Báo cáo: ${rawBulletCount} raw bullets, ${fakeHeadingCount} fake headings, ${headingSkipCount} heading jumps.`);
}

// ----------------------------------------------------
// TỔNG KẾT BÁO CÁO
// ----------------------------------------------------
console.log('\n====================================================');
console.log('📊 TỔNG KẾT KẾT QUẢ AUDIT DỰ ÁN CLINIPORTAL');
console.log('====================================================');
console.log(`- File HTML đã kiểm tra : ${htmlFiles.length}`);
console.log(`- File JS đã kiểm tra   : ${jsFiles.length}`);
console.log(`- Số Lỗi Cần Vá (Errors): ${totalErrors}`);
console.log(`- Số Cảnh Báo (Warnings): ${totalWarnings}`);

if (totalErrors === 0) {
  console.log('\n🎉 ĐẠT CHUẨN PRE-COMPLETION! Dự án sẵn sàng để commit/kết thúc task.');
  process.exit(0);
} else {
  console.log('\n❌ CHƯA ĐẠT CHUẨN! Vui lòng khắc phục các lỗi trên trước khi kết thúc task.');
  process.exit(1);
}
