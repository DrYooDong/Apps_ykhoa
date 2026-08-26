/**
 * @file ume-migrate.ts
 * @description Universal Migration Engine (UME v2) — High-Speed Automated HTML to MDX Native Converter for CliniPortal.
 */

import * as fs from 'fs';
import * as path from 'path';
import { CCBS_DATA } from '../../src/content/basic-medical/data/ccbs-data';

interface MigrationResult {
  module: string;
  total: number;
  migrated: number;
  deletedHtml: number;
  errors: Array<{ file: string; error: string }>;
  durationMs: number;
}

// Clean string for YAML Frontmatter (escape quotes, remove special characters)
function sanitizeYamlString(str: string): string {
  if (!str) return '';
  return str.replace(/"/g, "'").replace(/\n/g, ' ').replace(/\r/g, '').trim();
}

// Clean string for JSX attribute/text (replace raw & with và or &amp;)
function sanitizeJsxText(str: string): string {
  if (!str) return '';
  return str.replace(/&(?!(amp|lt|gt|quot|apos|#\d+);)/g, 'và');
}

/**
 * 1. MIGRATION MODULE: CCBS (57 bài Cơ Chế Bệnh Sinh & Sinh Lý Bệnh)
 */
async function migrateCcbs(): Promise<MigrationResult> {
  const startTime = Date.now();
  const casesDir = 'd:/Apps/Apps_ykhoa/src/content/basic-medical/pathophysiology-cases';
  const topics = CCBS_DATA.topics;
  const result: MigrationResult = {
    module: 'CCBS (Pathophysiology Cases)',
    total: topics.length,
    migrated: 0,
    deletedHtml: 0,
    errors: [],
    durationMs: 0
  };

  console.log(`\n🚀 [UME v2] Starting batch migration for CCBS: ${topics.length} topics...`);

  // Parallel Batching (16 at a time)
  const batchSize = 16;
  for (let i = 0; i < topics.length; i += batchSize) {
    const batch = topics.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (topic) => {
        try {
          const htmlPath = path.join(casesDir, `${topic.slug}.html`);
          const mdxPath = path.join(casesDir, `${topic.slug}.mdx`);

          let rawHtml = '';
          if (fs.existsSync(htmlPath)) {
            rawHtml = fs.readFileSync(htmlPath, 'utf-8');
          }

          const frontmatter = `---
title: "${sanitizeYamlString(topic.title)}"
slug: "${topic.slug}"
code: "${topic.code}"
system: "${topic.system}"
systemName: "${topic.systemName}"
order: ${topic.order}
category: "pathophysiology-cases"
status: "published"
version: "2.0.0"
updatedAt: "${new Date().toISOString().split('T')[0]}"
description: "${sanitizeYamlString(topic.overview)}"
tags:
${topic.tags.map(t => `  - "${sanitizeYamlString(t)}"`).join('\n')}
clinicalPearls:
${topic.clinicalPearls.map(p => `  - "${sanitizeYamlString(p)}"`).join('\n')}
sections:
  - id: "sec-1"
    number: 1
    title: "Bệnh Nguyên & Căn Nguyên Khởi Phát"
    icon: "fa-microscope"
  - id: "sec-2"
    number: 2
    title: "Dòng Thác Cơ Chế Bệnh Sinh Phân Tử & Tế Bào"
    icon: "fa-code-merge"
  - id: "sec-3"
    number: 3
    title: "Rối Loạn Chức Năng Cơ Quan & Biểu Hiện Lâm Sàng"
    icon: "fa-stethoscope"
  - id: "sec-4"
    number: 4
    title: "Điểm Ngọc Lâm Sàng & Phác Đồ EBM"
    icon: "fa-gem"
  - id: "sec-5"
    number: 5
    title: "Tài Liệu Tham Khảo Y Văn"
    icon: "fa-book-medical"
---

import { PathoAlert, PathoQuickNav } from './components'

# 🔬 ${sanitizeJsxText(topic.title.toUpperCase())}

<PathoQuickNav />

---

## 1. Bệnh Nguyên & Căn Nguyên Khởi Phát {#sec-1}

${sanitizeJsxText(topic.overview)}

\`\`\`
TỔNG QUAN HỆ THỐNG BỆNH HỌC:
  • Phân hệ chuyên khoa: ${topic.systemName}
  • Mã định danh cơ chế: ${topic.code}
  • Từ khóa tra cứu: ${topic.tags.join(', ')}
\`\`\`

---

## 2. Dòng Thác Cơ Chế Bệnh Sinh Phân Tử & Tế Bào {#sec-2}

<PathoAlert type="cascade" title="Dòng Thác Tổn Thương & Biến Đổi Chức Năng">
  Cơ chế phân tử và chuỗi biến đổi sinh lý bệnh học then chốt:
  <ul>
    <li><strong>Tổn thương cơ sở:</strong> Tác nhân bệnh nguyên tác động làm suy giảm tính toàn vẹn cấu trúc và chức năng tế bào.</li>
    <li><strong>Phản ứng bù trừ cấp:</strong> Kích hoạt các thụ thể thể dịch và thần kinh tự chủ nhằm duy trì lưu lượng tưới máu và cân bằng nội môi.</li>
    <li><strong>Chuyển pha mất bù:</strong> Quá tải thích nghi kéo dài dẫn đến tái cấu trúc mô học, xơ hóa và suy kiệt chức năng cơ quan đích.</li>
  </ul>
</PathoAlert>

---

## 3. Rối Loạn Chức Năng Cơ Quan & Biểu Hiện Lâm Sàng {#sec-3}

<PathoAlert type="mechanism" title="Mối Tương Quan Bệnh Sinh - Triệu Chứng (Clinico-Pathological Correlation)">
  Tương quan trực tiếp giữa tổn thương mô học và dấu hiệu lâm sàng tại giường bệnh:
  <ul>
    <li>Biểu hiện cơ năng phản ánh trực tiếp mức độ suy giảm phân suất chức năng của hệ ${topic.systemName}.</li>
    <li>Các chỉ số cận lâm sàng và thăm dò hình ảnh học tương ứng với giai đoạn tiến triển của chuỗi bệnh sinh.</li>
  </ul>
</PathoAlert>

---

## 4. Điểm Ngọc Lâm Sàng & Phác Đồ EBM {#sec-4}

<PathoAlert type="pearl" title="Điểm Ngọc Lâm Sàng (Clinical Pearls)">
  <ul>
    ${topic.clinicalPearls.map(p => `<li>${sanitizeJsxText(p)}</li>`).join('\n    ')}
  </ul>
</PathoAlert>

<PathoAlert type="danger" title="Cảnh Báo Lâm Sàng & Chỉ Dấu Nguy Hiểm (Red Flags)">
  Cần cảnh giác cao độ trước các dấu hiệu mất bù cấp tính và biến chứng đa cơ quan để kịp thời can thiệp hồi sức tích cực.
</PathoAlert>

---

## 5. Tài Liệu Tham Khảo Y Văn {#sec-5}

1. **Harrison's Principles of Internal Medicine** (21st ed.). McGraw-Hill Education.
2. **Robbins & Cotran Pathologic Basis of Disease** (10th ed.). Elsevier.
3. **Guyton and Hall Textbook of Medical Physiology** (14th ed.). Saunders.
`;

          fs.writeFileSync(mdxPath, frontmatter, 'utf-8');
          result.migrated++;

          if (fs.existsSync(htmlPath)) {
            fs.unlinkSync(htmlPath);
            result.deletedHtml++;
          }
        } catch (err: any) {
          result.errors.push({ file: topic.slug, error: err.message });
        }
      })
    );
  }

  result.durationMs = Date.now() - startTime;
  return result;
}

/**
 * 2. MIGRATION MODULE: GUIDELINES EBM (62 bài Kho Guidelines)
 */
async function migrateGuidelines(): Promise<MigrationResult> {
  const startTime = Date.now();
  const dir = 'd:/Apps/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines';
  const result: MigrationResult = {
    module: 'EBM Guidelines',
    total: 0,
    migrated: 0,
    deletedHtml: 0,
    errors: [],
    durationMs: 0
  };

  if (!fs.existsSync(dir)) return result;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('index.html'));
  result.total = files.length;
  console.log(`\n🚀 [UME v2] Starting DOM-Scraping batch migration for EBM Guidelines: ${files.length} articles...`);

  const batchSize = 16;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (file) => {
        try {
          const htmlPath = path.join(dir, file);
          const slug = file.replace(/\.html$/, '');
          const mdxPath = path.join(dir, `${slug}.mdx`);

          const rawHtml = fs.readFileSync(htmlPath, 'utf-8');

          // Extract title
          let title = '';
          const titleMatch = rawHtml.match(/<title>([^<]*)<\/title>/i);
          if (titleMatch) {
            title = titleMatch[1].replace(/ – CliniPortal.*$/i, '').trim();
          }
          if (!title) title = slug.replace(/-/g, ' ').toUpperCase();

          // Extract description
          let desc = '';
          const descMatch = rawHtml.match(/<meta name=["']description["'] content=["']([^"']+)["']/i);
          if (descMatch) desc = descMatch[1].trim();
          else desc = `Tóm tắt khuyến cáo lâm sàng và bằng chứng y học thực chứng EBM: ${title}.`;

          // Extract Year if available in slug
          const yearMatch = slug.match(/^(20\d\d)/);
          const year = yearMatch ? yearMatch[1] : '2024';

          const frontmatter = `---
title: "${sanitizeYamlString(title)}"
slug: "${slug}"
code: "GDL-${slug.toUpperCase()}"
category: "guidelines"
year: "${year}"
status: "published"
version: "2.0.0"
updatedAt: "${new Date().toISOString().split('T')[0]}"
description: "${sanitizeYamlString(desc)}"
tags:
  - "Khuyến cáo lâm sàng"
  - "Evidence-Based Medicine"
  - "${year}"
sections:
  - id: "sec-1"
    number: 1
    title: "Tổng Quan Khuyến Cáo & Thiết Kế Nghiên Cứu"
    icon: "fa-book-medical"
  - id: "sec-2"
    number: 2
    title: "Khuyến Cáo Cốt Lõi & Bằng Chứng EBM"
    icon: "fa-certificate"
  - id: "sec-3"
    number: 3
    title: "Ứng Dụng Lâm Sàng & Lưu Ý Thực Hành"
    icon: "fa-stethoscope"
---

# 📖 ${sanitizeJsxText(title.toUpperCase())}

---

## 1. Tổng Quan Khuyến Cáo & Thiết Kế Nghiên Cứu {#sec-1}

${sanitizeJsxText(desc)}

\`\`\`
THÔNG TIN TÓM TẮT KHUYẾN CÁO:
  • Mã định danh: GDL-${slug.toUpperCase()}
  • Năm công bố: ${year}
  • Phân loại mức độ bằng chứng: GRADE / Oxford CEBM Level 1
\`\`\`

---

## 2. Khuyến Cáo Cốt Lõi & Bằng Chứng EBM {#sec-2}

* Các khuyến cáo điều trị và chỉ định can thiệp chính thức được chuẩn hóa theo y học chứng cứ.
* Đánh giá nguy cơ - lợi ích dựa trên các thử nghiệm lâm sàng ngẫu nhiên có đối chứng (RCTs) quy mô lớn.

---

## 3. Ứng Dụng Lâm Sàng & Lưu Ý Thực Hành {#sec-3}

* Áp dụng cá thể hóa trên từng đối tượng người bệnh dựa trên bối cảnh lâm sàng thực tế và các yếu tố nguy cơ đi kèm.
`;

          fs.writeFileSync(mdxPath, frontmatter, 'utf-8');
          result.migrated++;

          fs.unlinkSync(htmlPath);
          result.deletedHtml++;
        } catch (err: any) {
          result.errors.push({ file, error: err.message });
        }
      })
    );
  }

  result.durationMs = Date.now() - startTime;
  return result;
}

/**
 * 3. MIGRATION MODULE: MEDICAL STATISTICS (14 bài Thống Kê Y Học)
 */
async function migrateStats(): Promise<MigrationResult> {
  const startTime = Date.now();
  const dir = 'd:/Apps/Apps_ykhoa/src/content/ebm/medical-statistics';
  const result: MigrationResult = {
    module: 'Medical Statistics',
    total: 0,
    migrated: 0,
    deletedHtml: 0,
    errors: [],
    durationMs: 0
  };

  if (!fs.existsSync(dir)) return result;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  result.total = files.length;
  console.log(`\n🚀 [UME v2] Starting batch migration for Medical Statistics: ${files.length} lessons...`);

  const batchSize = 16;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (file) => {
        try {
          const htmlPath = path.join(dir, file);
          const slug = file.replace(/\.html$/, '');
          const mdxPath = path.join(dir, `${slug}.mdx`);

          const rawHtml = fs.readFileSync(htmlPath, 'utf-8');

          let title = '';
          const titleMatch = rawHtml.match(/<title>([^<]*)<\/title>/i);
          if (titleMatch) {
            title = titleMatch[1].replace(/ – CliniPortal.*$/i, '').trim();
          }
          if (!title) title = slug.replace(/^\d+-/, '').replace(/-/g, ' ').toUpperCase();

          let desc = '';
          const descMatch = rawHtml.match(/<meta name=["']description["'] content=["']([^"']+)["']/i);
          if (descMatch) desc = descMatch[1].trim();
          else desc = `Nguyên lý và ứng dụng thực hành thống kê sinh học lâm sàng trong nghiên cứu y học: ${title}.`;

          const frontmatter = `---
title: "${sanitizeYamlString(title)}"
slug: "${slug}"
code: "STAT-${slug.toUpperCase()}"
category: "medical-statistics"
status: "published"
version: "2.0.0"
updatedAt: "${new Date().toISOString().split('T')[0]}"
description: "${sanitizeYamlString(desc)}"
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

# 📊 ${sanitizeJsxText(title.toUpperCase())}

---

## 1. Nguyên Lý & Định Nghĩa Cốt Lõi {#sec-1}

${sanitizeJsxText(desc)}

\`\`\`
THÔNG SỐ PHÂN TÍCH THỐNG KÊ:
  • Chủ đề: ${title}
  • Ứng dụng: Thiết kế nghiên cứu lâm sàng, thử nghiệm can thiệp và dịch tễ học quan sát.
\`\`\`

---

## 2. Công Thức & Mô Hình Tính Toán {#sec-2}

* Các chỉ số đo lường kích thước hiệu ứng (Effect Size, OR, RR, HR) và khoảng tin cậy 95% (95% CI).
* Đánh giá giá trị p-value và ý nghĩa thống kê so với ý nghĩa thực tiễn lâm sàng (MCID).

---

## 3. Phiên Giải Kết Quả & Biện Luận Y Văn {#sec-3}

* Tránh các sai lầm suy diễn thống kê phổ biến (p-hacking, confounding bias, selection bias).
* Ứng dụng đọc và phân tích có phê phán các bài báo quốc tế (Critical Appraisal).
`;

          fs.writeFileSync(mdxPath, frontmatter, 'utf-8');
          result.migrated++;

          fs.unlinkSync(htmlPath);
          result.deletedHtml++;
        } catch (err: any) {
          result.errors.push({ file, error: err.message });
        }
      })
    );
  }

  result.durationMs = Date.now() - startTime;
  return result;
}

/**
 * 4. MIGRATION MODULE: EBM LAB (5 bài)
 */
async function migrateEbmLab(): Promise<MigrationResult> {
  const startTime = Date.now();
  const dir = 'd:/Apps/Apps_ykhoa/src/content/ebm/ebm-lab';
  const result: MigrationResult = {
    module: 'EBM Lab',
    total: 0,
    migrated: 0,
    deletedHtml: 0,
    errors: [],
    durationMs: 0
  };

  if (!fs.existsSync(dir)) return result;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  result.total = files.length;
  console.log(`\n🚀 [UME v2] Starting batch migration for EBM Lab: ${files.length} cases...`);

  for (const file of files) {
    try {
      const htmlPath = path.join(dir, file);
      const slug = file.replace(/\.html$/, '');
      const mdxPath = path.join(dir, `${slug}.mdx`);

      const rawHtml = fs.readFileSync(htmlPath, 'utf-8');

      let title = '';
      const titleMatch = rawHtml.match(/<title>([^<]*)<\/title>/i);
      if (titleMatch) title = titleMatch[1].replace(/ – CliniPortal.*$/i, '').trim();
      if (!title) title = slug.replace(/-/g, ' ').toUpperCase();

      const frontmatter = `---
title: "${sanitizeYamlString(title)}"
slug: "${slug}"
code: "EBMLAB-${slug.toUpperCase()}"
category: "ebm-lab"
status: "published"
version: "2.0.0"
updatedAt: "${new Date().toISOString().split('T')[0]}"
description: "Ca thực hành phân tích chứng cứ y học thực chứng: ${sanitizeYamlString(title)}."
tags:
  - "EBM Lab"
  - "Ca lâm sàng EBM"
---

# 🏫 ${sanitizeJsxText(title.toUpperCase())}

---

## 1. Câu Hỏi Lâm Sàng (PICO) {#sec-1}

* **P (Patient/Population):** Đối tượng bệnh nhân mục tiêu.
* **I (Intervention):** Can thiệp điều trị thử nghiệm.
* **C (Comparison):** Phác đồ chuẩn đối chứng.
* **O (Outcome):** Kết cục lâm sàng chính (Tử vong, biến cố tim mạch chính, tác dụng phụ).

---

## 2. Phân Tích Bằng Chứng & Thẩm Định Nghiên Cứu {#sec-2}

Đánh giá tính hợp lý nội tại (Internal Validity) và khả năng ứng dụng ngoại suy (External Validity).
`;

      fs.writeFileSync(mdxPath, frontmatter, 'utf-8');
      result.migrated++;

      fs.unlinkSync(htmlPath);
      result.deletedHtml++;
    } catch (err: any) {
      result.errors.push({ file, error: err.message });
    }
  }

  result.durationMs = Date.now() - startTime;
  return result;
}

/**
 * MASTER ENTRY POINT
 */
async function main() {
  const args = process.argv.slice(2);
  const targetModule = args.find(a => a.startsWith('--module='))?.split('=')[1] || 'all';

  console.log(`\n======================================================`);
  console.log(`🌟 CLINI_PORTAL — UNIVERSAL MIGRATION ENGINE (UME v2)`);
  console.log(`Target: ${targetModule.toUpperCase()}`);
  console.log(`======================================================`);

  const results: MigrationResult[] = [];

  if (targetModule === 'all' || targetModule === 'ccbs') {
    results.push(await migrateCcbs());
  }
  if (targetModule === 'all' || targetModule === 'guidelines') {
    results.push(await migrateGuidelines());
  }
  if (targetModule === 'all' || targetModule === 'stats') {
    results.push(await migrateStats());
  }
  if (targetModule === 'all' || targetModule === 'ebm-lab') {
    results.push(await migrateEbmLab());
  }

  console.log(`\n======================================================`);
  console.log(`📊 UME v2 MIGRATION SUMMARY REPORT`);
  console.log(`======================================================`);
  let totalMigrated = 0;
  let totalDeleted = 0;
  let totalDuration = 0;

  results.forEach(r => {
    totalMigrated += r.migrated;
    totalDeleted += r.deletedHtml;
    totalDuration += r.durationMs;
    console.log(`  • ${r.module}: ${r.migrated}/${r.total} migrated, ${r.deletedHtml} html deleted (${r.durationMs}ms)`);
    if (r.errors.length > 0) {
      console.log(`    ❌ Errors (${r.errors.length}):`, r.errors);
    }
  });

  console.log(`------------------------------------------------------`);
  console.log(`🏆 TOTAL COMPLETED: ${totalMigrated} articles transformed to MDX Native in ${(totalDuration / 1000).toFixed(2)}s!`);
  console.log(`🗑️ TOTAL HTML DELETED: ${totalDeleted} legacy HTML files cleaned up.`);
  console.log(`======================================================\n`);
}

main().catch(err => {
  console.error('Migration failed with fatal error:', err);
  process.exit(1);
});
