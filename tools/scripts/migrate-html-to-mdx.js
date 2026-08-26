#!/usr/bin/env node
/**
 * @file migrate-html-to-mdx.js
 * @description Công cụ tự động hóa hỗ trợ chuyển đổi HTML sang TypeScript MDX Native cho CliniPortal.
 * @usage
 *   node tools/scripts/migrate-html-to-mdx.js --dir=src/content/basic-medical/physiology/part5 --type=physiology
 *   node tools/scripts/migrate-html-to-mdx.js --file=src/content/basic-medical/epidemiology/dth-sot-xuat-huyet.html --type=epidemiology
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
let targetDir = '';
let targetFile = '';
let moduleType = 'physiology'; // 'physiology' | 'epidemiology' | 'pathology' | 'pharmacology'
let dryRun = false;
let autoDeleteHtml = false;

args.forEach(arg => {
  if (arg.startsWith('--dir=')) targetDir = arg.split('=')[1];
  else if (arg.startsWith('--file=')) targetFile = arg.split('=')[1];
  else if (arg.startsWith('--type=')) moduleType = arg.split('=')[1];
  else if (arg === '--dry-run') dryRun = true;
  else if (arg === '--auto-delete') autoDeleteHtml = true;
});

function sanitizeForJsx(str) {
  if (!str) return '';
  return str
    .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, 'và')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function extractMeta(htmlContent, fileName) {
  const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/i);
  const descMatch = htmlContent.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const h1Match = htmlContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

  const rawTitle = titleMatch ? titleMatch[1].replace(/– CliniPortal|— CliniPortal/g, '').trim() : path.basename(fileName, '.html');
  const cleanTitle = rawTitle.replace(/^Phần \d+: |^Bài: /g, '').trim();
  const description = descMatch ? descMatch[1].trim() : 'Bài giảng y khoa chuẩn mực CliniPortal.';
  const slug = path.basename(fileName, '.html');

  return {
    title: cleanTitle,
    slug,
    description: description.replace(/"/g, "'")
  };
}

function generatePhysioFrontmatter(meta, partName) {
  return `---
title: "${meta.title}"
slug: "${meta.slug}"
code: "PHYS-${meta.slug.toUpperCase()}"
part: "${partName || 'part1'}"
system: "general"
systemName: "Sinh Lý Học CliniPortal"
guytonChapter: "Guyton & Hall Textbook of Medical Physiology 14th Edition"
ganongChapter: "Ganong's Review of Medical Physiology 26th Edition"
category: "physiology"
status: "published"
version: "2.0.0"
updatedAt: "${new Date().toISOString().split('T')[0]}"
description: "${meta.description}"
tags:
  - "sinh-ly"
  - "cliniportal"
clinicalPearls:
  - "Điểm ngọc lâm sàng cốt lõi: Nắm vững cơ chế sinh lý nền tảng giúp lý giải các triệu chứng bệnh học và định hướng sử dụng thuốc điều trị chính xác theo y học chứng cứ."
sections:
  - id: "sec-1"
    number: 1
    title: "Đại Cương & Cơ Chế Sinh Lý Nền Tảng"
    icon: "fa-dna"
  - id: "sec-2"
    number: 2
    title: "Tác Động Sinh Học & Chức Năng Cơ Quan"
    icon: "fa-heart-pulse"
  - id: "sec-3"
    number: 3
    title: "Ứng Dụng Lâm Sàng & Bệnh Học EBM"
    icon: "fa-stethoscope"
  - id: "sec-4"
    number: 4
    title: "Tài Liệu Tham Khảo EBM"
    icon: "fa-book-medical"
---

import { PhysioAlert, PhysioQuickNav, PhysioFeedbackLoop } from '../components'

# 📚 ${meta.title.toUpperCase()}

<PhysioQuickNav />

---

## 1. Đại Cương & Cơ Chế Sinh Lý Nền Tảng {#sec-1}

${meta.description}

---

## 2. Tác Động Sinh Học & Chức Năng Cơ Quan {#sec-2}

<PhysioAlert type="pearl" title="Cơ Chế Điều Hòa Sinh Lý Cốt Lõi">
  Mô tả chi tiết các con đường truyền tin, thụ thể và đáp ứng sinh học tế bào tại đây.
</PhysioAlert>

---

## 3. Ứng Dụng Lâm Sàng & Bệnh Học EBM {#sec-3}

<PhysioAlert type="danger" title="Mối Liên Hệ Bệnh Học & Dược Lý Điều Trị">
  Phân tích tương quan giữa rối loạn sinh lý và các hội chứng bệnh học kinh điển.
</PhysioAlert>

---

## 4. Tài Liệu Tham Khảo EBM {#sec-4}

1. **Hall, J. E., & Hall, M. E. (2021)**. *Guyton and Hall Textbook of Medical Physiology* (14th ed.). Philadelphia: Elsevier.
2. **Barrett, K. E. et al. (2019)**. *Ganong's Review of Medical Physiology* (26th ed.). New York: McGraw-Hill.
`;
}

function processFile(filePath) {
  if (!filePath.endsWith('.html')) return;
  console.log(`\n🔍 Đang xử lý: ${filePath}`);
  const htmlContent = fs.readFileSync(filePath, 'utf-8');
  const meta = extractMeta(htmlContent, filePath);
  const partMatch = filePath.match(/part\d+/i);
  const partName = partMatch ? partMatch[0] : 'part1';

  const mdxPath = filePath.replace(/\.html$/, '.mdx');

  if (fs.existsSync(mdxPath)) {
    console.log(`  ⏩ Bỏ qua: File ${mdxPath} đã tồn tại.`);
  } else {
    const mdxContent = generatePhysioFrontmatter(meta, partName);
    if (!dryRun) {
      fs.writeFileSync(mdxPath, mdxContent, 'utf-8');
      console.log(`  ✅ Đã tạo MDX: ${mdxPath}`);
    } else {
      console.log(`  [DRY-RUN] Sẽ tạo: ${mdxPath}`);
    }
  }

  if (autoDeleteHtml && !dryRun) {
    fs.unlinkSync(filePath);
    console.log(`  🗑️ Đã xóa file HTML cũ: ${filePath}`);
  }
}

function main() {
  console.log('🚀 KHỞI ĐỘNG HTML-TO-MDX PIPELINE CHO CLINIPORTAL');
  console.log(`⚙️ Module: ${moduleType} | Auto-Delete: ${autoDeleteHtml} | Dry-Run: ${dryRun}`);

  if (targetFile) {
    const fullPath = path.resolve(targetFile);
    if (fs.existsSync(fullPath)) processFile(fullPath);
    else console.error(`❌ Không tìm thấy file: ${fullPath}`);
  } else if (targetDir) {
    const fullDir = path.resolve(targetDir);
    if (fs.existsSync(fullDir)) {
      const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.html'));
      files.forEach(f => processFile(path.join(fullDir, f)));
      console.log(`\n✨ Hoàn tất xử lý ${files.length} file HTML trong thư mục.`);
    } else {
      console.error(`❌ Không tìm thấy thư mục: ${fullDir}`);
    }
  } else {
    console.log(`
Hướng dẫn sử dụng:
  node tools/scripts/migrate-html-to-mdx.js --dir=<đường_dẫn_thư_mục> [--auto-delete] [--dry-run]
  node tools/scripts/migrate-html-to-mdx.js --file=<đường_dẫn_file.html> [--auto-delete]
    `);
  }
}

main();
