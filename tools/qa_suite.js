/**
 * CliniPortal — Medical Quality Assurance (QA) Suite (tools/qa_suite.js)
 * Inspired by Expo's docs/checks architecture (Lighthouse SEO, WCAG AAA, Asset Integrity)
 * 
 * Usage:
 *   node tools/qa_suite.js
 *   node tools/qa_suite.js --verbose
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_CONTENT_DIR = path.join(ROOT_DIR, 'src', 'content');
const PAGES_DIR = path.join(ROOT_DIR, 'pages');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');

// Blocklist các từ neo link vô nghĩa (Lighthouse & WCAG Anti-Patterns)
const LINK_TEXT_BLOCKLIST = [
  'tại đây',
  'bấm vào đây',
  'click here',
  'click vào đây',
  'xem thêm',
  'link',
  'tại link này',
  'ở đây',
  'đây',
  'read more',
  'tại link'
];

// Danh sách từ hay bị lặp vô tình khi soạn thảo văn bản
const REPEATED_WORDS_REGEX = /\b(bệnh|thuốc|điều trị|chẩn đoán|bệnh nhân|của|và|trong|khi|các|những|theo|cho|được|the|in|on|at|of|to|and|is)\s+\1\b/gi;

function getAllFiles(dirPath, extensions, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'archive' && file !== '.agents' && file !== '.vscode' && file !== '.astro') {
        getAllFiles(fullPath, extensions, arrayOfFiles);
      }
    } else {
      if (extensions.some((ext) => file.endsWith(ext))) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

// -----------------------------------------------------------------------------
// CHECK 1: KIỂM TRA ĐƯỜNG DẪN TÀI NGUYÊN (ASSET REFERENCES INTEGRITY)
// -----------------------------------------------------------------------------
function checkAssetReferences(files) {
  const issues = [];
  const assetRegex = /(?:src=["']|href=["']|url\(["']?)([^"'()#?]+\.(?:png|jpg|jpeg|svg|webp|gif|pdf|mp4))["']?/gi;

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    let match;

    while ((match = assetRegex.exec(content)) !== null) {
      const assetPath = match[1].trim();
      // Bỏ qua external URL (http, https, //)
      if (/^(?:https?:|\/\/)/i.test(assetPath)) continue;

      let resolvedPath;
      if (assetPath.startsWith('/')) {
        resolvedPath = path.join(ROOT_DIR, assetPath);
      } else {
        resolvedPath = path.resolve(path.dirname(filePath), assetPath);
      }

      if (!fs.existsSync(resolvedPath)) {
        issues.push({
          file: path.relative(ROOT_DIR, filePath),
          asset: assetPath,
          resolved: path.relative(ROOT_DIR, resolvedPath),
          type: 'Missing Asset File'
        });
      }
    }
  });

  return issues;
}

// -----------------------------------------------------------------------------
// CHECK 2: KIỂM TRA CHẤT LƯỢNG ANCHOR TEXT (LINK TEXT SEMANTIC AUDIT)
// -----------------------------------------------------------------------------
function checkLinkTextQuality(files) {
  const issues = [];
  const mdLinkRegex = /\[([^[\]]*)\]\(([^)]+)\)/g;
  const htmlLinkRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi;

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const relPath = path.relative(ROOT_DIR, filePath);

    // Bỏ qua code blocks khi check markdown
    const cleanContent = content.replace(/```[\s\S]*?```/g, '');

    // 1. Kiểm tra Markdown links
    let mdMatch;
    while ((mdMatch = mdLinkRegex.exec(cleanContent)) !== null) {
      const linkText = mdMatch[1].trim().toLowerCase().replace(/[*_`]/g, '');
      const url = mdMatch[2].trim();

      if (LINK_TEXT_BLOCKLIST.includes(linkText)) {
        issues.push({
          file: relPath,
          text: mdMatch[1],
          url,
          type: 'Generic Link Text (SEO/WCAG Anti-Pattern)'
        });
      }
    }

    // 2. Kiểm tra HTML links
    let htmlMatch;
    while ((htmlMatch = htmlLinkRegex.exec(cleanContent)) !== null) {
      const url = htmlMatch[1].trim();
      const linkText = htmlMatch[2].replace(/<[^>]+>/g, '').trim().toLowerCase();

      if (LINK_TEXT_BLOCKLIST.includes(linkText)) {
        issues.push({
          file: relPath,
          text: htmlMatch[2],
          url,
          type: 'Generic Link Text (SEO/WCAG Anti-Pattern)'
        });
      }
    }
  });

  return issues;
}

// -----------------------------------------------------------------------------
// CHECK 3: PHÁT HIỆN TỪ LẶP VÔ Ý (REPEATED WORDS DETECTION)
// -----------------------------------------------------------------------------
function checkRepeatedWords(files) {
  const issues = [];

  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const relPath = path.relative(ROOT_DIR, filePath);
    const cleanContent = content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/<style[\s\S]*?<\/style>/g, '')
      .replace(/<script[\s\S]*?<\/script>/g, '');

    const lines = cleanContent.split('\n');
    lines.forEach((line, index) => {
      let match;
      while ((match = REPEATED_WORDS_REGEX.exec(line)) !== null) {
        issues.push({
          file: `${relPath}:${index + 1}`,
          phrase: match[0],
          type: 'Repeated Word Typo'
        });
      }
    });
  });

  return issues;
}

// -----------------------------------------------------------------------------
// MAIN RUNNER
// -----------------------------------------------------------------------------
function runQASuite() {
  console.log('\n============================================================');
  console.log('🩺 CLINIPORTAL MEDICAL QUALITY ASSURANCE (QA) SUITE');
  console.log('   Inspired by Expo Docs Quality Engine (Lighthouse & WCAG AAA)');
  console.log('============================================================\n');

  const contentFiles = getAllFiles(ROOT_DIR, ['.html', '.md', '.mdx', '.ts']);
  const filteredFiles = contentFiles.filter((f) => !f.includes('archive') && !f.includes('node_modules') && !f.includes('tools/scratch'));

  console.log(`📁 Quét tổng cộng ${filteredFiles.length} tệp nội dung & mã nguồn...`);

  // 1. Asset Check
  console.log('\n[1/3] 🔍 Đang kiểm tra tính toàn vẹn đường dẫn Asset / Media...');
  const assetIssues = checkAssetReferences(filteredFiles);
  if (assetIssues.length === 0) {
    console.log('      ✅ Không phát hiện đường dẫn tài nguyên tĩnh nào bị hỏng (0 broken assets).');
  } else {
    console.log(`      ⚠️  Tìm thấy ${assetIssues.length} cảnh báo tài nguyên không tồn tại.`);
    assetIssues.slice(0, 5).forEach((issue) => {
      console.log(`         - [${issue.file}] Không tìm thấy: "${issue.asset}"`);
    });
    if (assetIssues.length > 5) {
      console.log(`         ... và ${assetIssues.length - 5} cảnh báo khác.`);
    }
  }

  // 2. Link Text Quality Check
  console.log('\n[2/3] 🔍 Đang kiểm tra chất lượng văn bản liên kết (SEO & WCAG AAA Anchor Text)...');
  const linkTextIssues = checkLinkTextQuality(filteredFiles);
  if (linkTextIssues.length === 0) {
    console.log('      ✅ 100% liên kết đều có văn bản neo ngữ nghĩa rõ ràng, chuẩn SEO.');
  } else {
    console.log(`      ℹ️  Tìm thấy ${linkTextIssues.length} vị trí dùng từ neo chung chung (vd: "tại đây", "xem thêm"):`);
    linkTextIssues.slice(0, 5).forEach((issue) => {
      console.log(`         - [${issue.file}] "${issue.text}" -> ${issue.url}`);
    });
    if (linkTextIssues.length > 5) {
      console.log(`         ... và ${linkTextIssues.length - 5} vị trí khác.`);
    }
  }

  // 3. Repeated Words Check
  console.log('\n[3/3] 🔍 Đang kiểm tra lỗi đánh máy lặp từ liên tiếp...');
  const repeatedWordIssues = checkRepeatedWords(filteredFiles);
  if (repeatedWordIssues.length === 0) {
    console.log('      ✅ Không phát hiện lỗi lặp từ liên tiếp trong văn bản y khoa.');
  } else {
    console.log(`      ℹ️  Tìm thấy ${repeatedWordIssues.length} điểm có từ lặp liên tiếp:`);
    repeatedWordIssues.slice(0, 5).forEach((issue) => {
      console.log(`         - [${issue.file}] Lặp từ: "${issue.phrase}"`);
    });
    if (repeatedWordIssues.length > 5) {
      console.log(`         ... và ${repeatedWordIssues.length - 5} điểm khác.`);
    }
  }

  console.log('\n============================================================');
  console.log('🎉 HOÀN TẤT KIỂM ĐỊNH CHẤT LƯỢNG CLINIPORTAL!');
  console.log('============================================================\n');
}

runQASuite();
