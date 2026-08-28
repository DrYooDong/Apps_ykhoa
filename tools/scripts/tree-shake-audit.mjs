#!/usr/bin/env node

/**
 * 🌲 CliniPortal Tree Shaking & Dead Code Auditor
 * 
 * Lấy cảm hứng từ công cụ knip & tree-shaking ecosystem của freeCodeCamp.
 * 1. Quét tài nguyên ảnh/media mồ côi (Orphan Assets) không còn được tham chiếu trong bất kỳ view/bài viết nào.
 * 2. Tính toán dung lượng lãng phí có thể giải phóng (Reclaimable Disk Space).
 * 3. Kiểm tra các tệp MDX chưa được khai báo loader trong src/content.config.ts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');

// ANSI Colors
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
};

const ASSET_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico', '.mp3', '.mp4']);
const CODE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.html', '.css', '.md', '.mdx', '.json']);
const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', 'archive', '.agents', '.gemini']);

/**
 * Lấy tất cả các file theo extension (nhanh, bỏ qua thư mục cấm)
 */
function getAllFiles(dir, extSet) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...getAllFiles(fullPath, extSet));
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extSet.has(ext)) {
          results.push(fullPath);
        }
      }
    }
  } catch (err) {
    // ignore read error
  }
  return results;
}

/**
 * Format bytes thành KB hoặc MB
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function runAudit() {
  const startTime = Date.now();
  console.log(`\n${colors.bold}${colors.green}══════════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}${colors.green}  🌲 CliniPortal Tree Shaking & Asset Garbage Collection Auditor      ${colors.reset}`);
  console.log(`${colors.dim}  Phát hiện tài nguyên mồ côi, file rác & tối ưu hóa dung lượng        ${colors.reset}`);
  console.log(`${colors.bold}${colors.green}══════════════════════════════════════════════════════════════════════${colors.reset}\n`);

  // 1. Quét tất cả asset media
  console.log(`${colors.dim}Đang lập danh mục tài nguyên ảnh & media...${colors.reset}`);
  const assetFiles = [
    ...getAllFiles(SRC_DIR, ASSET_EXTENSIONS),
    ...getAllFiles(PUBLIC_DIR, ASSET_EXTENSIONS)
  ];

  let totalAssetBytes = 0;
  const assetMap = new Map();
  const assetBasenames = new Map(); // basename -> array of paths

  for (const file of assetFiles) {
    const stats = fs.statSync(file);
    const size = stats.size;
    totalAssetBytes += size;
    const basename = path.basename(file).toLowerCase();
    const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
    const info = { fullPath: file, relPath, basename, size, referenced: false };
    assetMap.set(file, info);

    if (!assetBasenames.has(basename)) {
      assetBasenames.set(basename, []);
    }
    assetBasenames.get(basename).push(info);
  }

  // 2. Thu thập danh sách code files
  console.log(`${colors.dim}Đang quét mã nguồn và bài viết (${Array.from(CODE_EXTENSIONS).join(', ')})...${colors.reset}`);
  const codeFiles = [
    ...getAllFiles(SRC_DIR, CODE_EXTENSIONS),
    path.join(ROOT_DIR, 'index.html')
  ].filter(f => fs.existsSync(f) && !ASSET_EXTENSIONS.has(path.extname(f).toLowerCase()));

  // 3. Quét từng code file bằng regex siêu tốc
  const assetRegex = /[\w.-]+\.(?:png|jpg|jpeg|svg|webp|gif|ico|mp3|mp4)/gi;
  let processedFiles = 0;
  for (const codeFile of codeFiles) {
    try {
      const content = fs.readFileSync(codeFile, 'utf-8');
      const matches = content.match(assetRegex);
      if (matches) {
        for (const match of matches) {
          const lower = match.toLowerCase();
          const list = assetBasenames.get(lower);
          if (list) {
            list.forEach(item => item.referenced = true);
          }
        }
      }
    } catch {
      // ignore
    }
    processedFiles++;
  }

  const orphanAssets = [];
  const activeAssets = [];

  for (const info of assetMap.values()) {
    if (info.referenced) {
      activeAssets.push(info);
    } else {
      orphanAssets.push(info);
    }
  }

  // 4. Kiểm tra Collections trong src/content.config.ts
  const configPath = path.join(SRC_DIR, 'content.config.ts');
  let configText = '';
  if (fs.existsSync(configPath)) {
    configText = fs.readFileSync(configPath, 'utf-8');
  }

  const allMdxFiles = getAllFiles(path.join(SRC_DIR, 'content'), new Set(['.mdx']));
  const unregisteredMdx = [];

  for (const mdx of allMdxFiles) {
    const rel = path.relative(path.join(SRC_DIR, 'content'), mdx).replace(/\\/g, '/');
    const folder = rel.split('/')[0];
    if (!configText.includes(folder) && !folder.includes('.')) {
      unregisteredMdx.push(rel);
    }
  }

  // 5. In kết quả
  let deadBytes = 0;
  orphanAssets.forEach(o => deadBytes += o.size);

  if (orphanAssets.length > 0) {
    console.log(`\n${colors.yellow}⚠️ Danh sách ${orphanAssets.length} tài nguyên mồ côi (Orphaned Assets) có thể dọn dẹp:${colors.reset}`);
    orphanAssets.sort((a, b) => b.size - a.size);
    const topOrphans = orphanAssets.slice(0, 15);
    topOrphans.forEach(o => {
      console.log(`   ${colors.dim}•${colors.reset} ${o.relPath} ${colors.cyan}(${formatBytes(o.size)})${colors.reset}`);
    });
    if (orphanAssets.length > 15) {
      console.log(`   ${colors.dim}...và ${orphanAssets.length - 15} file khác.${colors.reset}`);
    }
  }

  if (unregisteredMdx.length > 0) {
    console.log(`\n${colors.magenta}ℹ️ Danh sách ${unregisteredMdx.length} bài viết MDX chưa đăng ký loader trong content.config.ts:${colors.reset}`);
    unregisteredMdx.slice(0, 10).forEach(u => {
      console.log(`   ${colors.dim}•${colors.reset} src/content/${u}`);
    });
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`\n${colors.bold}${colors.green}──────────────────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`${colors.bold}  📊 Tổng kết Tree Shaking Audit:${colors.reset}`);
  console.log(`  • Tổng số asset media   : ${colors.bold}${assetFiles.length}${colors.reset} files (${formatBytes(totalAssetBytes)})`);
  console.log(`  • Asset đang sử dụng    : ${colors.green}${colors.bold}${activeAssets.length}${colors.reset} files (${formatBytes(totalAssetBytes - deadBytes)})`);
  console.log(`  • Asset mồ côi (Dead)   : ${orphanAssets.length > 0 ? colors.yellow : colors.green}${colors.bold}${orphanAssets.length}${colors.reset} files (${colors.yellow}${formatBytes(deadBytes)}${colors.reset} có thể giải phóng)`);
  console.log(`  • Tổng số file code quét: ${colors.bold}${processedFiles}${colors.reset} files`);
  console.log(`  • Thời gian phân tích   : ${colors.dim}${duration}s${colors.reset}`);
  console.log(`${colors.bold}${colors.green}──────────────────────────────────────────────────────────────────────${colors.reset}\n`);
}

runAudit();
