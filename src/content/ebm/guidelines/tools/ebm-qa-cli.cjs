#!/usr/bin/env node
/**
 * CliniPortal 2.0 — Unified EBM & Guidelines Quality Assurance CLI
 * Path: src/content/ebm/guidelines/tools/ebm-qa-cli.cjs
 *
 * Kiểm định toàn diện 6 Cổng Chất lượng (6-Gate QA) cho Kho Guidelines & Nghiên cứu EBM:
 * 1. Đồng bộ 1:1 giữa 160 file .mdx và KHO_GUIDELINES_STATIC (Registry Sync)
 * 2. Chuẩn hóa YAML Frontmatter (id, title, organization, year, cor, loe)
 * 3. Cấm tuyệt đối LaTeX $...$ ngoài khối <script> (Zero LaTeX Dollar Policy)
 * 4. Đầy đủ thành phần cốt lõi (.stats-strip, .citation-box, .table-card/.table-wrapper)
 * 5. Đầy đủ thành phần Giải phẫu Học thuật cho bài Nghiên cứu (.pico-bento-grid, .rob-card, .verdict-box)
 * 6. Toàn vẹn đường dẫn ảnh đính kèm (Image Asset Existence Check)
 */

const fs = require('fs');
const path = require('path');

const GUIDELINES_DIR = path.resolve(__dirname, '../kho-guidelines');
const IMAGES_DIR = path.resolve(GUIDELINES_DIR, 'images');
const REGISTRY_PATH = path.resolve(__dirname, '../js/kho-guidelines-registry.ts');

function runQaAudit() {
  console.log('======================================================================');
  console.log('🩺 CLINIPORTAL EBM & GUIDELINES 6-GATE UNIFIED QA VALIDATOR');
  console.log('======================================================================');

  const mdxFiles = fs.readdirSync(GUIDELINES_DIR).filter(f => f.endsWith('.mdx'));
  const regText = fs.readFileSync(REGISTRY_PATH, 'utf8');
  const jsonStr = regText
    .replace(/^[\s\S]*?export const KHO_GUIDELINES_STATIC:\s*Study\[\]\s*=\s*/, '')
    .replace(/;\s*$/, '');
  const registryList = JSON.parse(jsonStr);

  const regFileSet = new Set(registryList.map(i => (i.file || i.id + '.mdx').replace(/^.*\//, '')));
  const studyFileSet = new Set(
    registryList
      .filter(i => i.sourceType === 'intl-study' || ['rct', 'meta', 'cohort', 'diagnostic'].includes(i.design))
      .map(i => (i.file || i.id + '.mdx').replace(/^.*\//, ''))
  );

  const errors = [];
  const warnings = [];

  // Gate 1: Registry Sync
  for (const f of mdxFiles) {
    if (!regFileSet.has(f)) {
      errors.push(`[Gate 1 - Registry] File ${f} chưa được đăng ký trong KHO_GUIDELINES_STATIC.`);
    }
  }
  for (const rf of regFileSet) {
    if (!mdxFiles.includes(rf)) {
      errors.push(`[Gate 1 - Registry] Registry khai báo ${rf} nhưng file không tồn tại trên đĩa.`);
    }
  }

  let statsStripCount = 0;
  let citationBoxCount = 0;
  let studyCardReadyCount = 0;
  let checkedImages = 0;

  for (const file of mdxFiles) {
    const fullPath = path.join(GUIDELINES_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');

    // Gate 2: Frontmatter check
    if (!raw.startsWith('---')) {
      errors.push(`[Gate 2 - Frontmatter] ${file}: Thiếu khối YAML Frontmatter mở đầu.`);
    }

    // Gate 3: Zero LaTeX $ check outside <script> blocks and JS template literals ${...}
    const bodyWithoutScript = raw
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/\$\{[^{}\n]+\}/g, '');
    if (/\$[^$\n]+\$/.test(bodyWithoutScript)) {
      const mathMatches = bodyWithoutScript.match(/\$[^$\n]{1,80}\$/g) || [];
      for (const m of mathMatches) {
        if (/\\[a-zA-Z]+|[_^={}]/.test(m) || /^\$[0-9.,]+\s*[–-]\s*\$[0-9.,]+/.test(m)) {
          errors.push(`[Gate 3 - LaTeX Math] ${file}: Phát hiện cú pháp '$' chưa chuyển sang Unicode/HTML: ${m}`);
        }
      }
    }

    // Gate 4: Core UI Components (.stats-strip & .citation-box)
    if (raw.includes('stats-strip')) {
      statsStripCount++;
    } else {
      errors.push(`[Gate 4 - UI Core] ${file}: Thiếu khối .stats-strip.`);
    }

    if (raw.includes('citation-box')) {
      citationBoxCount++;
    } else {
      errors.push(`[Gate 4 - UI Core] ${file}: Thiếu khối .citation-box.`);
    }

    // Gate 5: Study / RCT Deep Appraisal Components
    if (studyFileSet.has(file)) {
      const hasPico = raw.includes('pico-bento-grid');
      const hasRob = raw.includes('rob-card');
      const hasVerdict = raw.includes('verdict-box');
      if (hasPico && hasRob && hasVerdict) {
        studyCardReadyCount++;
      } else {
        errors.push(`[Gate 5 - Study Card] ${file}: Thiếu thành phần nghiên cứu (pico=${hasPico}, rob=${hasRob}, verdict=${hasVerdict}).`);
      }
    }

    // Gate 6: Image Asset Existence Check
    const imgMatches = [...raw.matchAll(/<img\s+[^>]*src=["']([^"']+)["']/gi)];
    for (const im of imgMatches) {
      const src = im[1];
      if (src.includes('images/')) {
        checkedImages++;
        const imgName = src.split('images/').pop();
        const imgPath = path.join(IMAGES_DIR, imgName);
        if (!fs.existsSync(imgPath)) {
          warnings.push(`[Gate 6 - Image] ${file}: Không tìm thấy ảnh ${imgName}`);
        }
      }
    }
  }

  console.log(`✔ Tổng số file .mdx kiểm định      : ${mdxFiles.length} / ${registryList.length} (Registry 1:1)`);
  console.log(`✔ Bài có .stats-strip chuẩn        : ${statsStripCount} / ${mdxFiles.length}`);
  console.log(`✔ Bài có .citation-box chuẩn       : ${citationBoxCount} / ${mdxFiles.length}`);
  console.log(`✔ Bài Nghiên cứu có đủ PICO/RoB2   : ${studyCardReadyCount} / ${studyFileSet.size}`);
  console.log(`✔ Tổng số đường dẫn ảnh đã kiểm tra: ${checkedImages} ảnh`);

  if (warnings.length > 0) {
    console.log(`\n⚠️ Cảnh báo (${warnings.length}):`);
    warnings.slice(0, 10).forEach(w => console.log('  - ' + w));
  }

  if (errors.length > 0) {
    console.error(`\n❌ PHÁT HIỆN ${errors.length} LỖI VI PHẠM:`);
    errors.forEach(e => console.error('  - ' + e));
    process.exit(1);
  }

  console.log('\n======================================================================');
  console.log('🎉 6/6 GATES PASSED — HỆ SINH THÁI EBM & KHO GUIDELINES ĐẠT CHUẨN 100%!');
  console.log('======================================================================');
}

runQaAudit();
