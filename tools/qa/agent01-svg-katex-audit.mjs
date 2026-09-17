#!/usr/bin/env node

/**
 * 🔵 AGENT-01: SVG & KaTeX Quality Auditor
 * CliniPortal QA Agent Squad
 * 
 * Chức năng:
 *  1. Quét ký tự box-drawing rác (─│┼┬┴┤├╠╣╦╩╬╔╗╚╝═) trong toàn bộ file MDX.
 *  2. Quét code blocks thô (```) còn sót lại chưa được chuyển đổi thành bảng hoặc SVG.
 *  3. Quét ký hiệu ion y khoa viết trần thiếu KaTeX wrapper ($Ca^{2+}$, $Na^{+}$, v.v.).
 * 
 * Sử dụng:
 *  node tools/qa/agent01-svg-katex-audit.mjs
 *  node tools/qa/agent01-svg-katex-audit.mjs --fix
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const TARGET_DIRS = [
  path.join(ROOT_DIR, 'src/content/basic-medical/biochemistry'),
  path.join(ROOT_DIR, 'src/content/basic-medical/pathophysiology-cases'),
  path.join(ROOT_DIR, 'src/content/basic-medical/physiology'),
  path.join(ROOT_DIR, 'src/content/basic-medical/epidemiology')
];

const isFixMode = process.argv.includes('--fix');

// Biểu thức regex phát hiện ký tự rác box-drawing
const BOX_DRAWING_REGEX = /[─│┼┬┴┤├╠╣╦╩╬╔╗╚╝═]/g;

// Biểu thức phát hiện ký hiệu ion viết trần không nằm trong math block ($...$)
const RAW_ION_REGEX = /(?<!\$)\b(Ca2\+|Na\+|K\+|Mg2\+|Cl-|HCO3-|Fe2\+|Fe3\+|H\+)\b(?!\$)/g;

function scanMdxFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanMdxFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

console.log('\n=================================================================');
console.log('🔵 AGENT-01: SVG & KaTeX Quality Auditor — Starting Audit...');
console.log('=================================================================\n');

let totalFilesScanned = 0;
let totalErrors = 0;
let totalWarnings = 0;
const report = [];

for (const targetDir of TARGET_DIRS) {
  if (!fs.existsSync(targetDir)) continue;
  const files = scanMdxFiles(targetDir);
  totalFilesScanned += files.length;

  for (const filePath of files) {
    const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    const fileIssues = {
      file: relPath,
      boxDrawingMatches: 0,
      rawCodeBlocks: 0,
      rawIons: []
    };

    // 1. Kiểm tra box drawing
    const boxMatches = content.match(BOX_DRAWING_REGEX);
    if (boxMatches) {
      fileIssues.boxDrawingMatches = boxMatches.length;
      totalErrors += boxMatches.length;

      if (isFixMode) {
        content = content.replace(BOX_DRAWING_REGEX, '');
        modified = true;
      }
    }

    // 2. Kiểm tra code blocks thô (không phải code mẫu lập trình, mà là dạng ``` thường)
    const codeBlockMatches = content.match(/```[a-z0-9_-]*\n[\s\S]*?```/g);
    if (codeBlockMatches) {
      // Chỉ cảnh báo nếu code block chứa dấu phân cách bảng hoặc sơ đồ ascii
      let suspiciousCount = 0;
      for (const block of codeBlockMatches) {
        if (block.includes('|') || block.includes('-->') || block.includes('==>') || block.includes('+--')) {
          suspiciousCount++;
        }
      }
      if (suspiciousCount > 0) {
        fileIssues.rawCodeBlocks = suspiciousCount;
        totalWarnings += suspiciousCount;
      }
    }

    // 3. Kiểm tra ion viết trần
    // Lược bỏ các đoạn đã nằm trong `<svg` hoặc `$$` trước khi quét
    const textOnly = content
      .replace(/<svg[\s\S]*?<\/svg>/gi, '')
      .replace(/\$\$[\s\S]*?\$\$/g, '')
      .replace(/\$[^\$]+?\$/g, '');

    const ionMatches = textOnly.match(RAW_ION_REGEX);
    if (ionMatches) {
      const uniqueIons = [...new Set(ionMatches)];
      fileIssues.rawIons = uniqueIons;
      totalWarnings += uniqueIons.length;
    }

    if (modified && isFixMode) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[FIXED] Đã dọn dẹp ký tự box-drawing tại: ${relPath}`);
    }

    if (fileIssues.boxDrawingMatches > 0 || fileIssues.rawCodeBlocks > 0 || fileIssues.rawIons.length > 0) {
      report.push(fileIssues);
    }
  }
}

// In kết quả
if (report.length === 0) {
  console.log(`✅ [PASS] 100% Hoàn hảo! Không phát hiện lỗi ký tự rác, code block thô hay ion trần.`);
  console.log(`📊 Tổng số file MDX đã kiểm tra: ${totalFilesScanned}\n`);
  process.exit(0);
} else {
  console.log(`⚠️  Phát hiện vấn đề trên ${report.length} file (Tổng quét: ${totalFilesScanned} files):\n`);
  for (const item of report) {
    console.log(`📄 File: ${item.file}`);
    if (item.boxDrawingMatches > 0) {
      console.log(`   ❌ [ERROR] ${item.boxDrawingMatches} ký tự box-drawing rác (Chạy --fix để tự động xóa)`);
    }
    if (item.rawCodeBlocks > 0) {
      console.log(`   ⚠️  [WARNING] ${item.rawCodeBlocks} khối code block thô chứa bảng hoặc sơ đồ cần vector hóa`);
    }
    if (item.rawIons.length > 0) {
      console.log(`   💡 [SUGGESTION] Ký hiệu ion nên đóng gói KaTeX: ${item.rawIons.join(', ')}`);
    }
    console.log('');
  }

  console.log(`-----------------------------------------------------------------`);
  console.log(`Tổng kết: ${totalErrors} Errors | ${totalWarnings} Warnings & Suggestions`);
  console.log(`-----------------------------------------------------------------\n`);

  if (totalErrors > 0 && !isFixMode) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}
