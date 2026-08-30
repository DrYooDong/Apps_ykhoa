const fs = require('fs');
const path = require('path');

const dir = 'd:/Apps/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

console.log(`🧪 Bắt đầu kiểm định QA toàn bộ ${files.length} tệp MDX trong Kho Guidelines EBM...`);
console.log('========================================================\n');

let passCount = 0;
let failCount = 0;
let details = [];

files.forEach(fileName => {
  const filePath = path.join(dir, fileName);
  const content = fs.readFileSync(filePath, 'utf8');

  let fileErrors = [];
  let fileWarnings = [];

  // 1. Check Frontmatter
  if (!content.startsWith('---')) {
    fileErrors.push('Thiếu YAML Frontmatter mở đầu');
  } else {
    const parts = content.split('---');
    if (parts.length < 3) {
      fileErrors.push('Cấu trúc YAML Frontmatter không đóng');
    } else {
      const yaml = parts[1];
      if (!/title:\s*["'].+["']/i.test(yaml) && !/title:\s*.+/i.test(yaml)) {
        fileErrors.push('Thiếu trường "title" trong Frontmatter');
      }
    }
  }

  // 2. Check Legacy Links
  if (/href=["'](?:\.\.\/)+/i.test(content)) {
    fileErrors.push('Chứa đường dẫn tương đối HTML cũ (../../../)');
  }

  // 3. Check Citation Box
  const citationMatches = content.match(/<div class="citation-box"[\s\S]*?<\/div>/gi);
  if (!citationMatches || citationMatches.length === 0) {
    fileWarnings.push('Không tìm thấy thẻ <div class="citation-box">');
  } else if (citationMatches.length > 1) {
    fileErrors.push(`Có ${citationMatches.length} khối citation-box trùng lặp`);
  }

  // 4. Check Double Separators
  if (/(?:\r?\n\s*---\s*){2,}/.test(content)) {
    fileErrors.push('Chứa nhiều dấu ngăn cách --- liên tiếp');
  }

  // Log Results for this file
  if (fileErrors.length === 0) {
    passCount++;
  } else {
    failCount++;
    console.error(`❌ [LỖI] ${fileName}:`);
    fileErrors.forEach(err => console.error(`   - ${err}`));
  }

  if (fileWarnings.length > 0) {
    console.warn(`⚠️ [CẢNH BÁO] ${fileName}:`);
    fileWarnings.forEach(w => console.warn(`   - ${w}`));
  }
});

console.log('\n========================================================');
console.log(`📊 KẾT QUẢ KIỂM ĐỊNH TỰ ĐỘNG KHO GUIDELINES EBM:`);
console.log(`- Tổng số tệp MDX kiểm tra: ${files.length}`);
console.log(`- Tệp đạt chuẩn Gold Standard EBM: ${passCount} / ${files.length} (${Math.round(passCount / files.length * 100)}%)`);

if (failCount === 0) {
  console.log('\n🎉 100% TỆP GUIDELINE ĐẠT CHUẨN GOLD STANDARD EBM! KHÔNG PHÁT HIỆN LỖI.\n');
  process.exit(0);
} else {
  console.error(`\n🚨 Phát hiện ${failCount} tệp có lỗi cần khắc phục.\n`);
  process.exit(1);
}
