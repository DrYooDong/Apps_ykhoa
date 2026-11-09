/**
 * Clinical Handbook MDX Validator & Linter
 * Path: .agents/skills/clinical-handbook-mdx-module/scripts/validate_handbook_mdx.mjs
 * 
 * Kiểm tra toàn diện file MDX Sổ tay lâm sàng:
 * 1. YAML Frontmatter Schema & Sections ID sync
 * 2. Anti-ASCII detection
 * 3. KaTeX syntax health & unescaped broken commands
 * 4. HTML tag balance
 * 5. Mandatory UI components presence
 */

import fs from 'fs';
import path from 'path';

const filePath = process.argv[2];
if (!filePath) {
  console.error('❌ Vui lòng cung cấp đường dẫn file MDX:');
  console.error('   node .agents/skills/clinical-handbook-mdx-module/scripts/validate_handbook_mdx.mjs <file.mdx>');
  process.exit(1);
}

const resolvedPath = path.resolve(filePath);
if (!fs.existsSync(resolvedPath)) {
  console.error(`❌ Không tìm thấy file: ${resolvedPath}`);
  process.exit(1);
}

const rawContent = fs.readFileSync(resolvedPath, 'utf8');
const errors = [];
const warnings = [];
const successes = [];

// 1. FRONTMATTER VALIDATION
if (!rawContent.startsWith('---')) {
  errors.push('File không bắt đầu bằng khối frontmatter YAML (---)');
} else {
  const parts = rawContent.split('---');
  if (parts.length < 3) {
    errors.push('Khối frontmatter YAML chưa được đóng bằng --- hợp lệ');
  } else {
    const yamlStr = parts[1];
    const requiredFields = [
      'title', 'slug', 'specialty', 'specialtyLabel', 
      'disease', 'diseaseLabel', 'order', 'tags', 
      'difficulty', 'estimatedTime', 'lastUpdated', 'sections'
    ];
    
    for (const field of requiredFields) {
      const fieldRegex = new RegExp(`^\\s*${field}:`, 'm');
      if (!fieldRegex.test(yamlStr)) {
        errors.push(`Thiếu trường bắt buộc trong YAML frontmatter: "${field}"`);
      }
    }

    // Extract section IDs from YAML
    const sectionIdMatches = [...yamlStr.matchAll(/id:\s*["']?([^"'\n\r]+)["']?/g)].map(m => m[1].trim());
    if (sectionIdMatches.length === 0) {
      warnings.push('Chưa khai báo danh sách sections trong YAML frontmatter');
    } else {
      successes.push(`Tìm thấy ${sectionIdMatches.length} section(s) trong Frontmatter YAML.`);
      
      // Check each section has corresponding ## Heading {#id} in markdown body
      const body = parts.slice(2).join('---');
      for (const sId of sectionIdMatches) {
        const anchorRegex = new RegExp(`\\{#${sId}\\}`, 'i');
        if (!anchorRegex.test(body)) {
          errors.push(`Section id "${sId}" trong YAML không có thẻ tiêu đề Heading khớp "{#${sId}}" trong bài`);
        }
      }
    }
  }
}

// 2. ANTI-ASCII AUDIT
const asciiBoxRegex = /(\+-[-+]+-\+|\|[-|\s]{4,}\|)/g;
const asciiMatches = rawContent.match(asciiBoxRegex);
if (asciiMatches && asciiMatches.length > 0) {
  errors.push(`Phát hiện ASCII Art (${asciiMatches.length} vị trí). Bắt buộc chuyển sang Responsive Grid Cards hoặc SVG!`);
} else {
  successes.push('100% Sạch ASCII Art (Tuân thủ Anti-ASCII Rule).');
}

// 3. KATEX MATH HEALTH AUDIT
const brokenKatexRegex = /(\brac\{|\bimes\b|\bpm\b|ULN_\{AST\})/g;
const brokenMath = rawContent.match(brokenKatexRegex);
if (brokenMath && brokenMath.length > 0) {
  errors.push(`Phát hiện cú pháp KaTeX bị gõ thiếu dấu gạch chéo ngược: ${brokenMath.slice(0, 3).join(', ')}... (sửa thành \\frac, \\times, \\pm)`);
} else {
  successes.push('Cú pháp KaTeX đạt chuẩn y sinh.');
}

// 4. HTML TAG BALANCE AUDIT
const tagsToCheck = ['div', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'p', 'span', 'ul', 'li', 'strong', 'nav', 'section'];
for (const tag of tagsToCheck) {
  const openRegex = new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi');
  const closeRegex = new RegExp(`</${tag}>`, 'gi');
  const openCount = (rawContent.match(openRegex) || []).length;
  const closeCount = (rawContent.match(closeRegex) || []).length;
  if (openCount !== closeCount) {
    errors.push(`Mất cân bằng thẻ <${tag}>: Mở = ${openCount}, Đóng = ${closeCount}`);
  }
}

// 5. MANDATORY COCKPIT UI COMPONENTS
const requiredComponents = [
  { name: 'Dải chỉ số nhanh 30s (.stats-strip)', regex: /class=["'][^"']*stats-strip[^"']*["']/i },
  { name: 'Thanh điều hướng nhanh (.pillars-nav)', regex: /class=["'][^"']*pillars-nav[^"']*["']/i },
  { name: 'Khung Callout đúc kết (.callout)', regex: /class=["'][^"']*callout[^"']*["']/i },
  { name: 'Thẻ cạm bẫy lâm sàng (.pitfall-card)', regex: /class=["'][^"']*pitfall-card[^"']*["']/i },
  { name: 'Ca bệnh thực chiến (.case-study-card)', regex: /class=["'][^"']*case-study-card[^"']*["']/i }
];

for (const comp of requiredComponents) {
  if (comp.regex.test(rawContent)) {
    successes.push(`Có linh kiện: ${comp.name}`);
  } else {
    warnings.push(`Chưa có linh kiện khuyến nghị: ${comp.name}`);
  }
}

// REPORT
console.log('====================================================');
console.log(`🩺 BÁO CÁO KIỂM ĐỊNH SỔ TAY LÂM SÀNG MDX:`);
console.log(`📄 File: ${path.basename(resolvedPath)}`);
console.log('====================================================');

if (successes.length > 0) {
  console.log('\n✅ TIÊU CHUẨN ĐẠT ĐƯỢC:');
  successes.forEach(s => console.log(`   + ${s}`));
}

if (warnings.length > 0) {
  console.log('\n⚠️ CẢNH BÁO / KHUYẾN NGHỊ:');
  warnings.forEach(w => console.log(`   - ${w}`));
}

if (errors.length > 0) {
  console.log('\n❌ LỖI BẮT BUỘC SỬA:');
  errors.forEach(e => console.log(`   ! ${e}`));
  console.log('\n🛑 KẾT QUẢ: KHÔNG ĐẠT (Cần hoàn thiện trước khi xuất bản).');
  process.exit(1);
} else {
  console.log('\n🎉 KẾT QUẢ: 100% ĐẠT TIÊU CHUẨN XUẤT BẢN SỔ TAY LÂM SÀNG!');
  process.exit(0);
}

