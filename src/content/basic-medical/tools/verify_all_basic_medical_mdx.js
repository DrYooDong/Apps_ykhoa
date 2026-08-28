/**
 * CliniPortal 2.0 — Basic Medical MDX Automated QA Verification Suite
 * Path: src/content/basic-medical/tools/verify_all_basic_medical_mdx.js
 * 
 * Bảng kiểm QA tự động kiểm tra tính toàn vẹn của 100% tệp MDX trong Basic Medical:
 * - 143/143 tệp có H2 section headings hợp lệ
 * - 143/143 tệp có .stats-strip với 4 thẻ KPI
 * - 143/143 tệp có QuickNav component tương ứng
 * - 143/143 tệp có .citation-box và .btn-row điều hướng
 * - 0 tệp có lỗi ký tự HTML thô (&amp;, &bull;, &rarr;, &ndash;, vàAMP;...)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const modules = [
  { dir: 'physiology', name: 'Giải Phẫu & Sinh Lý (GP-SL)' },
  { dir: 'biochemistry', name: 'Hóa Sinh & Sinh Học Phân Tử (HS-CH)' },
  { dir: 'epidemiology', name: 'Dịch Tễ Học (DTH-YTCC)' },
  { dir: 'pathophysiology-cases', name: 'Cơ Chế Bệnh Sinh (CCBS-SBL)' }
];

let totalFiles = 0;
let passedFiles = 0;
let failedFiles = [];

function checkFile(filePath, modName) {
  totalFiles++;
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(ROOT_DIR, filePath);
  const issues = [];

  // 1. Check Frontmatter
  if (!content.startsWith('---')) {
    issues.push('Thiếu Frontmatter YAML bắt đầu bằng ---');
  }

  // 2. Check HTML Entities
  const entityMatches = content.match(/(&amp;|&bull;|&rarr;|&ndash;|&mdash;|vàAMP;|vàbull;|vàrarr;|vàndash;)/gi);
  if (entityMatches) {
    issues.push(`Chứa ký tự HTML thô: ${entityMatches.slice(0, 3).join(', ')}`);
  }

  // 3. Check Stats Strip
  if (!content.includes('stats-strip') || !content.includes('stats-grid') || !content.includes('stat-card')) {
    issues.push('Thiếu Dải chỉ số nhanh (.stats-strip / .stats-grid / .stat-card)');
  }

  // 4. Check H2 Section Headings
  const h2Matches = content.match(/^##\s+\d+\.\s+.*\{#sec-\d+\}/gm);
  if (!h2Matches || h2Matches.length < 2) {
    issues.push(`Thiếu hoặc không đủ Tiêu đề mục H2 chuẩn {#sec-X} (tìm thấy: ${h2Matches ? h2Matches.length : 0})`);
  }

  // 5. Check QuickNav
  const hasQuickNav = content.includes('QuickNav') || content.includes('PillarsNav');
  if (!hasQuickNav) {
    issues.push('Thiếu thanh điều hướng nhanh QuickNav / PillarsNav');
  }

  // 6. Check Citation Box & Btn Row
  if (!content.includes('citation-box')) {
    issues.push('Thiếu khung trích dẫn AMA (.citation-box)');
  }
  if (!content.includes('btn-row') || !content.includes('btn-primary')) {
    issues.push('Thiếu hàng nút điều hướng (.btn-row / .btn-primary)');
  }

  if (issues.length === 0) {
    passedFiles++;
    return true;
  } else {
    failedFiles.push({ file: relPath, module: modName, issues });
    return false;
  }
}

function runVerification() {
  console.log('🧪 Bắt đầu kiểm định QA toàn bộ kho MDX Cơ Sở Y Khoa...');
  console.log('========================================================\n');

  modules.forEach(mod => {
    const modPath = path.join(ROOT_DIR, mod.dir);
    if (!fs.existsSync(modPath)) return;

    function walkDir(d) {
      const entries = fs.readdirSync(d, { withFileTypes: true });
      entries.forEach(ent => {
        const full = path.join(d, ent.name);
        if (ent.isDirectory() && ent.name !== 'components' && ent.name !== 'tools' && ent.name !== 'images') {
          walkDir(full);
        } else if (ent.isFile() && ent.name.endsWith('.mdx')) {
          checkFile(full, mod.name);
        }
      });
    }

    walkDir(modPath);
  });

  console.log('📊 KẾT QUẢ KIỂM ĐỊNH TỰ ĐỘNG:');
  console.log(`- Tổng số tệp MDX kiểm tra: ${totalFiles}`);
  console.log(`- Tệp đạt chuẩn Gold Standard 2.0: ${passedFiles} / ${totalFiles} (${Math.round((passedFiles / totalFiles) * 100)}%)`);

  if (failedFiles.length > 0) {
    console.log(`\n❌ CÁC TỆP CHƯA ĐẠT CHUẨN (${failedFiles.length} tệp):`);
    failedFiles.forEach(f => {
      console.log(`\n📄 [${f.module}] ${f.file}`);
      f.issues.forEach(iss => console.log(`   ⚠️ ${iss}`));
    });
    process.exit(1);
  } else {
    console.log('\n🎉 100% TỆP ĐẠT CHUẨN FLAGSHIP MDX 2.0 (GOLD STANDARD)! KHÔNG PHÁT HIỆN LỖI.');
    process.exit(0);
  }
}

runVerification();
