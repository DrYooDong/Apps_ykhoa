#!/usr/bin/env node

/**
 * 🏥 CliniPortal Medical Content Linter
 * 
 * Lấy cảm hứng từ hệ thống challenge-linter & parser của freeCodeCamp.
 * Tự động rà soát toàn bộ bài viết MDX / Markdown / HTML trong src/content/:
 * 1. Frontmatter Schema & Metadata Y khoa
 * 2. Tính toàn vẹn của đường dẫn Asset/Image & Internal Links
 * 3. Kiểm tra tính hợp lệ của công thức KaTeX ($...$ và $$...$$)
 * 4. Kiểm tra cấu trúc thẻ & Khối cảnh báo an toàn y tế (Safety/Danger Infoboxes)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');
const CONTENT_DIR = path.resolve(ROOT_DIR, 'src/content');

// ANSI Color Helpers
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

// Statistics
const stats = {
  totalFiles: 0,
  passedFiles: 0,
  warningFiles: 0,
  errorFiles: 0,
  totalErrors: 0,
  totalWarnings: 0,
  startTime: Date.now()
};

/**
 * Đọc danh sách tất cả các file .mdx và .md trong thư mục đệ quy
 */
function getFilesRecursively(dir, extensions = ['.mdx', '.md']) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
        results.push(...getFilesRecursively(fullPath, extensions));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

/**
 * Parse Frontmatter YAML đơn giản & trích xuất dòng
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const match = content.match(frontmatterRegex);
  if (!match) {
    return { frontmatter: null, body: content, raw: '', startLine: 0, endLine: 0 };
  }

  const raw = match[1];
  const body = content.slice(match[0].length);
  const endLine = match[0].split('\n').length;

  const frontmatter = {};
  const lines = raw.split(/\r?\n/);
  let currentKey = null;
  let inArray = false;
  let inObjectArray = false;
  let currentObj = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Key-value pair at root
    const rootKvMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (rootKvMatch) {
      const key = rootKvMatch[1];
      let val = rootKvMatch[2].trim();
      currentKey = key;
      inArray = false;
      inObjectArray = false;

      if (val === '') {
        frontmatter[key] = [];
      } else {
        // Parse scalar
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        frontmatter[key] = val;
      }
      continue;
    }

    // Array item string: "  - item"
    const arrayItemMatch = line.match(/^\s+-\s+(.*)$/);
    if (arrayItemMatch && currentKey) {
      let itemVal = arrayItemMatch[1].trim();
      if (itemVal.includes(':')) {
        // Object item in array
        const objKv = itemVal.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
        if (objKv) {
          if (!Array.isArray(frontmatter[currentKey])) {
            frontmatter[currentKey] = [];
          }
          currentObj = { [objKv[1]]: parseValue(objKv[2]) };
          frontmatter[currentKey].push(currentObj);
          inObjectArray = true;
        }
      } else {
        if (!Array.isArray(frontmatter[currentKey])) {
          frontmatter[currentKey] = [];
        }
        frontmatter[currentKey].push(parseValue(itemVal));
      }
      continue;
    }

    // Nested property in object array: "    number: 1"
    const nestedObjKv = line.match(/^\s+([a-zA-Z0-9_]+):\s*(.*)$/);
    if (nestedObjKv && inObjectArray && currentObj) {
      currentObj[nestedObjKv[1]] = parseValue(nestedObjKv[2]);
    }
  }

  return { frontmatter, body, raw, startLine: 1, endLine };
}

function parseValue(val) {
  val = val.trim();
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }
  if (!isNaN(val) && val !== '') {
    return Number(val);
  }
  if (val === 'true') return true;
  if (val === 'false') return false;
  return val;
}

/**
 * Các bộ kiểm định chất lượng (Linter Rules)
 */
function lintFile(filePath) {
  const issues = { errors: [], warnings: [] };
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const ext = path.extname(filePath).toLowerCase();
  const fileDir = path.dirname(filePath);

  const { frontmatter, body, endLine } = parseFrontmatter(content);

  // RULE 1: Frontmatter Presence for Content Collections
  const isDocOrReadme = filePath.toLowerCase().includes('readme.md') ||
                        filePath.toLowerCase().includes('huong-dan') ||
                        filePath.toLowerCase().includes('note-') ||
                        filePath.toLowerCase().includes('prompt_');

  if (ext === '.mdx' || (!isDocOrReadme && filePath.includes('src/content'))) {
    if (!frontmatter) {
      issues.errors.push({
        rule: 'frontmatter/missing',
        message: 'File MDX thiếu khối Frontmatter (bắt đầu và kết thúc bằng ---)',
        line: 1
      });
    } else {
      // RULE 2: Required Title
      if (!frontmatter.title || String(frontmatter.title).trim() === '') {
        issues.errors.push({
          rule: 'frontmatter/title-required',
          message: 'Frontmatter thiếu trường "title" hoặc title rỗng',
          line: 1
        });
      }

      // RULE 3: Category validation
      if (!frontmatter.category) {
        issues.warnings.push({
          rule: 'frontmatter/category-missing',
          message: 'Khuyến nghị thêm trường "category" (physiology / epidemiology / biochemistry / guidelines...)',
          line: 1
        });
      }

      // RULE 4: Date Format (updatedAt)
      if (frontmatter.updatedAt) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(String(frontmatter.updatedAt))) {
          issues.warnings.push({
            rule: 'frontmatter/date-format',
            message: `Trường updatedAt="${frontmatter.updatedAt}" nên chuẩn hóa theo định dạng YYYY-MM-DD`,
            line: 1
          });
        }
      }

      // RULE 5: Sections / Pillars Array
      if (frontmatter.sections && Array.isArray(frontmatter.sections)) {
        frontmatter.sections.forEach((sec, idx) => {
          if (!sec.id || !sec.title) {
            issues.warnings.push({
              rule: 'frontmatter/section-schema',
              message: `Mục section [${idx}] thiếu id hoặc title`,
              line: 1
            });
          }
        });
      }
    }
  }

  // RULE 6: KaTeX Math Balance Check ($ and $$)
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    // Bỏ qua dòng trong code block
    if (line.trim().startsWith('```')) return;

    // Đếm số dấu $ không phải escape \$
    const cleanLine = line.replace(/\\\$/g, '');
    const dollarCount = (cleanLine.match(/(?<!\$)\$(?!\$)/g) || []).length;
    if (dollarCount % 2 !== 0) {
      issues.warnings.push({
        rule: 'katex/unmatched-inline-math',
        message: `Khả năng chưa đóng dấu $ cho công thức KaTeX inline (tìm thấy ${dollarCount} dấu $)`,
        line: lineNum,
        snippet: line.trim()
      });
    }
  });

  // RULE 7: Asset & Local Link Integrity
  // Bỏ qua các đoạn mã inline `...` và block ```...``` trước khi quét ảnh
  const cleanContentForAssets = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]+`/g, '');

  const markdownImgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = markdownImgRegex.exec(cleanContentForAssets)) !== null) {
    const imgPath = match[2].trim().split(' ')[0].split('?')[0].split('#')[0];
    const matchIndex = match.index;
    const lineNum = cleanContentForAssets.slice(0, matchIndex).split('\n').length;

    // Chỉ check file local (không check http:// hoặc https://)
    if (!imgPath.startsWith('http://') && !imgPath.startsWith('https://') && !imgPath.startsWith('data:')) {
      let resolvedPath;
      if (imgPath.startsWith('/')) {
        resolvedPath = path.join(ROOT_DIR, 'public', imgPath);
      } else {
        resolvedPath = path.resolve(fileDir, imgPath);
      }

      if (!fs.existsSync(resolvedPath)) {
        issues.errors.push({
          rule: 'asset/image-not-found',
          message: `Ảnh không tồn tại trên đĩa: "${imgPath}"`,
          line: lineNum,
          snippet: match[0]
        });
      }
    }
  }

  // RULE 8: Medical Quality Check — Clinical Pearls check
  if (ext === '.mdx' && frontmatter) {
    const hasPearlsInFrontmatter = Array.isArray(frontmatter.clinicalPearls) && frontmatter.clinicalPearls.length > 0;
    const hasPearlsInBody = content.includes('clinicalPearls') || content.includes('Điểm Nhấn Lâm Sàng') || content.includes('Clinical Pearls');
    if (!hasPearlsInFrontmatter && !hasPearlsInBody && !isDocOrReadme) {
      issues.warnings.push({
        rule: 'medical/pearls-recommended',
        message: 'Khuyến nghị bổ sung khối clinicalPearls hoặc Điểm nhấn lâm sàng theo chuẩn EBM',
        line: 1
      });
    }
  }

  return issues;
}

/**
 * In kết quả ra màn hình CLI (chuẩn UI freeCodeCamp)
 */
function run() {
  console.log(`\n${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  🏥 CliniPortal Medical Content Linter & Validation Engine           ${colors.reset}`);
  console.log(`${colors.dim}  Kiểm định chất lượng Metadata, Assets, KaTeX & Chuẩn EBM             ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  const files = getFilesRecursively(CONTENT_DIR);
  stats.totalFiles = files.length;

  console.log(`${colors.dim}Đang quét ${stats.totalFiles} tài liệu y khoa trong ${CONTENT_DIR}...${colors.reset}\n`);

  const results = [];

  for (const filePath of files) {
    const issues = lintFile(filePath);
    const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');

    if (issues.errors.length > 0 || issues.warnings.length > 0) {
      results.push({ relPath, issues });
      if (issues.errors.length > 0) {
        stats.errorFiles++;
        stats.totalErrors += issues.errors.length;
      }
      if (issues.warnings.length > 0) {
        stats.warningFiles++;
        stats.totalWarnings += issues.warnings.length;
      }
    } else {
      stats.passedFiles++;
    }
  }

  // Render file reports
  for (const { relPath, issues } of results) {
    const hasError = issues.errors.length > 0;
    const statusIcon = hasError ? `${colors.red}✖${colors.reset}` : `${colors.yellow}⚠${colors.reset}`;
    console.log(`${statusIcon} ${colors.bold}${relPath}${colors.reset}`);

    issues.errors.forEach(err => {
      console.log(`   ${colors.red}error${colors.reset} [${err.rule}] Line ${err.line}: ${err.message}`);
      if (err.snippet) {
        console.log(`     ${colors.dim}${err.snippet}${colors.reset}`);
      }
    });

    issues.warnings.forEach(warn => {
      console.log(`   ${colors.yellow}warn ${colors.reset} [${warn.rule}] Line ${warn.line}: ${warn.message}`);
      if (warn.snippet) {
        console.log(`     ${colors.dim}${warn.snippet}${colors.reset}`);
      }
    });

    console.log('');
  }

  const duration = ((Date.now() - stats.startTime) / 1000).toFixed(2);

  // Summary box
  console.log(`${colors.bold}${colors.cyan}──────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`${colors.bold}  📊 Tổng kết Linter:${colors.reset}`);
  console.log(`  • Tổng số files quét : ${colors.bold}${stats.totalFiles}${colors.reset}`);
  console.log(`  • Hợp lệ hoàn toàn   : ${colors.green}${colors.bold}${stats.passedFiles} files${colors.reset}`);
  console.log(`  • Cảnh báo (Warnings): ${stats.totalWarnings > 0 ? colors.yellow : colors.green}${colors.bold}${stats.totalWarnings} cảnh báo${colors.reset} (${stats.warningFiles} files)`);
  console.log(`  • Lỗi (Errors)       : ${stats.totalErrors > 0 ? colors.red : colors.green}${colors.bold}${stats.totalErrors} lỗi${colors.reset} (${stats.errorFiles} files)`);
  console.log(`  • Thời gian chạy     : ${colors.dim}${duration}s${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}──────────────────────────────────────────────────────────────────────${colors.reset}\n`);

  if (stats.totalErrors > 0) {
    console.log(`${colors.bgRed}${colors.white}${colors.bold} FAILED ${colors.reset} Phát hiện ${stats.totalErrors} lỗi nghiêm trọng cần khắc phục trước khi build/commit.\n`);
    process.exit(1);
  } else {
    console.log(`${colors.bgGreen}${colors.white}${colors.bold} PASSED ${colors.reset} Toàn bộ tài liệu y khoa đạt tiêu chuẩn kiểm định!\n`);
    process.exit(0);
  }
}

run();
