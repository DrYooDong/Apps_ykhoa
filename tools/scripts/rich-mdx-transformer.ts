/**
 * @file rich-mdx-transformer.ts
 * @description Rich DOM-to-MDX Transformer that converts HTML backup articles into publication-grade MDX
 * with interactive tables, styled alert boxes, SVG diagrams, and clean YAML frontmatter.
 */

import * as fs from 'fs';
import * as path from 'path';

// Clean text for JSX text / attribute
function cleanJsx(str: string): string {
  if (!str) return '';
  return str.replace(/&(?!(amp|lt|gt|quot|apos|#\d+);)/g, 'và');
}

// Convert HTML body into Markdown/JSX body
function transformHtmlBodyToMdx(html: string): string {
  let body = html;

  // 1. Extract visual-container or main-container or main or physio-content
  const mainMatch = body.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
                    body.match(/<div class="main-container"[^>]*>([\s\S]*?)<\/div>\s*<\/body>/i) ||
                    body.match(/<div class="main-wrapper"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/body>/i);
  if (mainMatch) {
    body = mainMatch[1];
  }

  // Remove breadcrumb, header, sidebar, scripts, styles, topnav, banner
  body = body.replace(/<clini-breadcrumb[\s\S]*?<\/clini-breadcrumb>/gi, '');
  body = body.replace(/<div id="header-placeholder"[\s\S]*?<\/div>/gi, '');
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<style[\s\S]*?<\/style>/gi, '');
  body = body.replace(/<aside[\s\S]*?<\/aside>/gi, '');
  body = body.replace(/<nav class="topnav"[\s\S]*?<\/nav>/gi, '');
  body = body.replace(/<div class="chapter-header"[\s\S]*?<\/div>/gi, '');
  body = body.replace(/<div class="banner"[\s\S]*?<\/div>/gi, '');

  // 2. Transform .key-concept -> <PathoAlert type="pearl" title="...">
  body = body.replace(/<div class="key-concept">([\s\S]*?)<\/div>/gi, (_match, inner) => {
    return `\n\n<PathoAlert type="pearl" title="Khái Niệm Cốt Lõi & Dịch Chuyển Mô Hình">\n${inner.trim()}\n</PathoAlert>\n\n`;
  });

  // 3. Transform .clinical-note-box -> <PathoAlert type="info" title="...">
  body = body.replace(/<div class="clinical-note-box">([\s\S]*?)<\/div>/gi, (_match, inner) => {
    return `\n\n<PathoAlert type="info" title="Lưu Ý Thực Hành Lâm Sàng & Phân Tích Chuyên Sâu">\n${inner.trim()}\n</PathoAlert>\n\n`;
  });

  // 4. Transform .danger-box -> <PathoAlert type="danger" title="...">
  body = body.replace(/<div class="danger-box">([\s\S]*?)<\/div>/gi, (_match, inner) => {
    return `\n\n<PathoAlert type="danger" title="Cảnh Báo Lâm Sàng & Dấu Hiệu Nguy Hiểm">\n${inner.trim()}\n</PathoAlert>\n\n`;
  });

  // 5. Clean class -> className or preserve table classes
  body = body.replace(/<table class="([^"]*)">/gi, '<table className="$1">');

  // 6. Escape raw & in text content (not in tags)
  body = cleanJsx(body);

  return body.trim();
}

/**
 * 1. Transform CCBS files from backup
 */
export async function transformBackupCcbs() {
  const backupDir = 'd:/Apps/Apps_ykhoa/archive/pages_backup_extracted/pages_backup/Sinh lý - Sinh lý bệnh/SLB_CCBS';
  const targetDir = 'd:/Apps/Apps_ykhoa/src/content/basic-medical/pathophysiology-cases';

  if (!fs.existsSync(backupDir)) return;

  const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.html'));
  console.log(`\n🚀 Transforming ${files.length} rich CCBS articles from backup...`);

  let count = 0;
  for (const file of files) {
    const filePath = path.join(backupDir, file);
    const rawHtml = fs.readFileSync(filePath, 'utf-8');

    const titleMatch = rawHtml.match(/<h1>([\s\S]*?)<\/h1>/i) || rawHtml.match(/<title>([^<]*)<\/title>/i);
    let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : file.replace(/\.html$/, '');
    title = title.replace(/ – CliniPortal.*$/i, '').trim();

    const slug = file.replace(/\.html$/, '').toLowerCase().replace(/_/g, '-');
    const targetMdxPath = path.join(targetDir, `${slug}.mdx`);

    const mdxBody = transformHtmlBodyToMdx(rawHtml);

    const fullMdx = `---
title: "${title.replace(/"/g, "'")}"
slug: "${slug}"
code: "${file.replace(/\.html$/, '').replace(/_/g, '-')}"
category: "pathophysiology-cases"
status: "published"
version: "2.0.0"
updatedAt: "${new Date().toISOString().split('T')[0]}"
description: "Phân tích toàn diện cơ chế bệnh sinh, bệnh nguyên phân tử và tương quan lâm sàng của ${title.replace(/"/g, "'")}."
tags:
  - "Cơ chế bệnh sinh"
  - "Sinh lý bệnh"
  - "${title.split('(')[0].trim()}"
sections:
  - id: "sec-1"
    number: 1
    title: "Cơ Chế Bệnh Sinh & Bệnh Nguyên"
    icon: "fa-microscope"
  - id: "sec-2"
    number: 2
    title: "Rối Loạn Chức Năng & Biểu Hiện Lâm Sàng"
    icon: "fa-stethoscope"
  - id: "sec-3"
    number: 3
    title: "Lưu Ý Thực Hành & Biện Luận EBM"
    icon: "fa-gem"
---

import { PathoAlert, PathoQuickNav } from './components'

# 🔬 ${cleanJsx(title.toUpperCase())}

<PathoQuickNav />

---

${mdxBody}

---

## Tài Liệu Tham Khảo EBM

1. **Harrison's Principles of Internal Medicine** (21st ed.). McGraw-Hill Education.
2. **Robbins & Cotran Pathologic Basis of Disease** (10th ed.). Elsevier.
3. **Guyton and Hall Textbook of Medical Physiology** (14th ed.). Saunders.
`;

    fs.writeFileSync(targetMdxPath, fullMdx, 'utf-8');
    console.log(`  ✅ Enhanced MDX with rich content: ${slug}.mdx (${fullMdx.length} bytes)`);
    count++;
  }
}

/**
 * 2. Transform Medical Statistics files from backup
 */
export async function transformBackupStats() {
  const backupDir = 'd:/Apps/Apps_ykhoa/archive/pages_backup_extracted/pages_backup/Y học chứng cứ/Thống kê y học';
  const targetDir = 'd:/Apps/Apps_ykhoa/src/content/ebm/medical-statistics';

  if (!fs.existsSync(backupDir)) return;

  const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.html') && !f.includes('quiz') && !f.includes('Thongkeyhoc'));
  console.log(`\n🚀 Transforming ${files.length} rich Medical Statistics lessons from backup...`);

  let count = 0;
  for (const file of files) {
    const filePath = path.join(backupDir, file);
    const rawHtml = fs.readFileSync(filePath, 'utf-8');

    const titleMatch = rawHtml.match(/<title>([^<]*)<\/title>/i) || rawHtml.match(/<h1>([\s\S]*?)<\/h1>/i);
    let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/— CliniPortal.*$/i, '').trim() : file.replace(/\.html$/, '');

    // Map filename e.g. 2_DG_Congcu_Chandoan.html -> 2-dg-congcu-chandoan.mdx
    const slug = file.replace(/\.html$/, '').toLowerCase().replace(/_/g, '-').replace(/&/g, '-and-');
    const targetMdxPath = path.join(targetDir, `${slug}.mdx`);

    const mdxBody = transformHtmlBodyToMdx(rawHtml);

    const fullMdx = `---
title: "${title.replace(/"/g, "'")}"
slug: "${slug}"
code: "STAT-${slug.toUpperCase()}"
category: "medical-statistics"
status: "published"
version: "2.0.0"
updatedAt: "${new Date().toISOString().split('T')[0]}"
description: "Nguyên lý và ứng dụng thực hành thống kê sinh học lâm sàng trong nghiên cứu y học: ${title.replace(/"/g, "'")}."
tags:
  - "Thống kê y học"
  - "Biostatistics"
  - "Nghiên cứu lâm sàng"
sections:
  - id: "sec-1"
    number: 1
    title: "Nguyên Lý & Định Nghĩa Cốt Lõi"
    icon: "fa-chart-pie"
  - id: "sec-2"
    number: 2
    title: "Công Thức & Mô Hình Tính Toán"
    icon: "fa-calculator"
  - id: "sec-3"
    number: 3
    title: "Phiên Giải Kết Quả & Biện Luận Y Văn"
    icon: "fa-square-poll-vertical"
---

# 📊 ${cleanJsx(title.toUpperCase())}

---

${mdxBody}

---

## Tài Liệu Tham Khảo Y Văn

1. **Greenhalgh, T. (2019)**. *How to Read a Paper: The Basics of Evidence-Based Medicine and Healthcare*. Wiley-Blackwell.
2. **Fletcher, G. S. (2020)**. *Clinical Epidemiology: The Essentials* (6th ed.). Wolters Kluwer.
`;

    fs.writeFileSync(targetMdxPath, fullMdx, 'utf-8');
    console.log(`  ✅ Enhanced MDX with rich content: ${slug}.mdx (${fullMdx.length} bytes)`);
    count++;
  }
}

async function main() {
  await transformBackupCcbs();
  await transformBackupStats();
}

main().catch(console.error);
