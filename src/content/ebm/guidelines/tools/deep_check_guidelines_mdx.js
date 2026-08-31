const fs = require('fs');
const path = require('path');

const gDir = path.resolve(__dirname, '../kho-guidelines');

function getMdxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'components' && file !== 'images' && file !== 'tools') {
        results = results.concat(getMdxFiles(full));
      }
    } else if (file.endsWith('.mdx')) {
      results.push(full);
    }
  });
  return results;
}

const files = getMdxFiles(gDir);
console.log(`🔍 Bắt đầu kiểm tra chuyên sâu 8 hạng mục lỗi trên ${files.length} tệp MDX trong Kho Guidelines...\n`);

const report = {
  totalFiles: files.length,
  tagMismatches: [],
  unwrappedTables: [],
  tableWrapperMismatches: [],
  missingRefHeadings: [],
  missingCitationBox: [],
  frontmatterIssues: [],
  missingNavButtons: [],
  brokenKaTeX: [],
  rawArtifacts: []
};

files.forEach(filePath => {
  const relPath = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Check Frontmatter
  if (!content.startsWith('---')) {
    report.frontmatterIssues.push({ file: relPath, issue: 'Thiếu mở đầu YAML frontmatter ---' });
  }
  const parts = content.split('---');
  if (parts.length < 3) {
    report.frontmatterIssues.push({ file: relPath, issue: 'Frontmatter không hợp lệ hoặc thiếu dấu đóng ---' });
    return;
  }
  const frontmatter = parts[1];
  const body = parts.slice(2).join('---');

  if (!frontmatter.includes('title:')) {
    report.frontmatterIssues.push({ file: relPath, issue: 'Thiếu trường title' });
  }
  if (!frontmatter.includes('slug:')) {
    report.frontmatterIssues.push({ file: relPath, issue: 'Thiếu trường slug' });
  }

  // 2. Tag Balance Checks
  const countMatches = (regex) => (body.match(regex) || []).length;
  
  const openDivs = countMatches(/<div\b[^>]*>/gi);
  const closeDivs = countMatches(/<\/div>/gi);
  if (openDivs !== closeDivs) {
    report.tagMismatches.push({ file: relPath, tag: 'div', open: openDivs, close: closeDivs, diff: openDivs - closeDivs });
  }

  const openSections = countMatches(/<section\b[^>]*>/gi);
  const closeSections = countMatches(/<\/section>/gi);
  if (openSections !== closeSections) {
    report.tagMismatches.push({ file: relPath, tag: 'section', open: openSections, close: closeSections, diff: openSections - closeSections });
  }

  const openTables = countMatches(/<table\b[^>]*>/gi);
  const closeTables = countMatches(/<\/table>/gi);
  if (openTables !== closeTables) {
    report.tagMismatches.push({ file: relPath, tag: 'table', open: openTables, close: closeTables, diff: openTables - closeTables });
  }

  const openOls = countMatches(/<ol\b[^>]*>/gi);
  const closeOls = countMatches(/<\/ol>/gi);
  if (openOls !== closeOls) {
    report.tagMismatches.push({ file: relPath, tag: 'ol', open: openOls, close: closeOls, diff: openOls - closeOls });
  }

  // 3. Table Wrappers Check
  const tableMatches = [...body.matchAll(/<table\b([^>]*)>([\s\S]*?)<\/table>/gi)];
  tableMatches.forEach(m => {
    const idx = m.index;
    const before = body.substring(Math.max(0, idx - 150), idx);
    const isWrapped = before.includes('table-responsive') || 
                      before.includes('table-wrapper') || 
                      before.includes('data-table-wrapper') || 
                      before.includes('table-container') || 
                      before.includes('hemo-table-wrap') ||
                      before.includes('physio-table-wrap');
    if (!isWrapped) {
      report.unwrappedTables.push({ file: relPath, tableAttrs: m[1] });
    }
  });

  // Check if any table-wrapper contains section card or heading before closing
  if (/<div class="[^"]*(table-responsive|table-wrapper|data-table-wrapper)[^"]*">\s*<table[\s\S]*?<\/table>\s*<(section|h2|div class="sec-card")/i.test(body)) {
    report.tableWrapperMismatches.push({ file: relPath, issue: 'Table wrapper bao trùm cả Section/Heading bên dưới trước khi đóng </div>' });
  }

  // 4. Reference Heading & Citation Box Check
  const hasRefHeading = /##\s*(\d+\.\s*)?.*(Tài Liệu Tham Khảo|Trích Dẫn|References|Y Văn)/i.test(body) ||
                        /<h[23][^>]*class="[^"]*sec-title[^"]*"[^>]*>[\s\S]*?(Tài Liệu|Tham Khảo|References|Trích Dẫn|Y Văn)[\s\S]*?<\/h[23]>/i.test(body) ||
                        /<div[^>]*class="[^"]*sec-title[^"]*"[^>]*>[\s\S]*?(Tài Liệu|Tham Khảo|References|Trích Dẫn|Y Văn)[\s\S]*?<\/div>/i.test(body) ||
                        /<div[^>]*class="[^"]*sec-hdr[^"]*"[^>]*>[\s\S]*?(Tài Liệu|Tham Khảo|References|Trích Dẫn|Y Văn)[\s\S]*?<\/div>/i.test(body) ||
                        /<strong[^>]*>[\s\S]*?Trích dẫn tài liệu tham khảo/i.test(body);

  if (!hasRefHeading) {
    report.missingRefHeadings.push(relPath);
  }

  if (!body.includes('citation-box') && !body.includes('ref-list') && !body.includes('reference-box')) {
    report.missingCitationBox.push(relPath);
  }

  // 5. Navigation Buttons Check
  if (!body.includes('btn-row') && !body.includes('btn-primary') && !body.includes('Quay lại')) {
    report.missingNavButtons.push(relPath);
  }

  // 6. Broken Math / KaTeX check (unbalanced $$)
  const mathBlockMatches = (body.match(/\$\$/g) || []).length;
  if (mathBlockMatches % 2 !== 0) {
    report.brokenKaTeX.push({ file: relPath, issue: `Số lượng dấu $$ không cân bằng (${mathBlockMatches} dấu)` });
  }

  // 7. Raw Artifacts Check
  if (body.includes('[object Object]') || body.includes('undefined') || body.includes('&amp;amp;')) {
    report.rawArtifacts.push(relPath);
  }
});

console.log('================================================================');
console.log(`📊 TỔNG HỢP KIỂM TRA 61 TỆP TRONG KHO GUIDELINES:`);
console.log('================================================================');

console.log(`1. Thẻ HTML mở/đóng không cân bằng: ${report.tagMismatches.length} lỗi`);
if (report.tagMismatches.length > 0) {
  report.tagMismatches.forEach(e => {
    console.log(`   ❌ [${e.file}] Thẻ <${e.tag}>: mở = ${e.open}, đóng = ${e.close} (Lệch: ${e.diff})`);
  });
} else {
  console.log(`   ✅ 100% tệp cân bằng thẻ HTML.`);
}

console.log(`\n2. Bảng chưa có Responsive Wrapper: ${report.unwrappedTables.length} bảng`);
if (report.unwrappedTables.length > 0) {
  report.unwrappedTables.forEach(e => {
    console.log(`   ❌ [${e.file}] Bảng: ${e.tableAttrs}`);
  });
} else {
  console.log(`   ✅ 100% bảng đã có container cuộn responsive.`);
}

console.log(`\n3. Lỗi đóng thẻ Table Wrapper bao trùm phần sau: ${report.tableWrapperMismatches.length} lỗi`);
if (report.tableWrapperMismatches.length > 0) {
  report.tableWrapperMismatches.forEach(e => {
    console.log(`   ❌ [${e.file}] ${e.issue}`);
  });
} else {
  console.log(`   ✅ 100% table wrapper đóng đúng vị trí.`);
}

console.log(`\n4. Thiếu Heading Tài Liệu Tham Khảo: ${report.missingRefHeadings.length} tệp`);
if (report.missingRefHeadings.length > 0) {
  report.missingRefHeadings.forEach(f => console.log(`   ❌ ${f}`));
} else {
  console.log(`   ✅ 100% tệp đã có Heading Tài Liệu Tham Khảo.`);
}

console.log(`\n5. Thiếu khung citation-box / trích dẫn: ${report.missingCitationBox.length} tệp`);
if (report.missingCitationBox.length > 0) {
  report.missingCitationBox.forEach(f => console.log(`   ⚠️ ${f}`));
} else {
  console.log(`   ✅ 100% tệp có khung trích dẫn.`);
}

console.log(`\n6. Thiếu hàng nút điều hướng (.btn-row): ${report.missingNavButtons.length} tệp`);
if (report.missingNavButtons.length > 0) {
  report.missingNavButtons.forEach(f => console.log(`   ❌ ${f}`));
} else {
  console.log(`   ✅ 100% tệp có hàng nút điều hướng.`);
}

console.log(`\n7. Lỗi cú pháp KaTeX Math ($$): ${report.brokenKaTeX.length} lỗi`);
if (report.brokenKaTeX.length > 0) {
  report.brokenKaTeX.forEach(e => console.log(`   ❌ [${e.file}] ${e.issue}`));
} else {
  console.log(`   ✅ 100% cú pháp KaTeX hợp lệ.`);
}

console.log(`\n8. Lỗi Frontmatter YAML: ${report.frontmatterIssues.length} lỗi`);
if (report.frontmatterIssues.length > 0) {
  report.frontmatterIssues.forEach(e => console.log(`   ❌ [${e.file}] ${e.issue}`));
} else {
  console.log(`   ✅ 100% Frontmatter YAML hợp lệ.`);
}

console.log(`\n9. Dấu vết văn bản thô / artifacts: ${report.rawArtifacts.length} lỗi`);
if (report.rawArtifacts.length > 0) {
  report.rawArtifacts.forEach(f => console.log(`   ❌ ${f}`));
} else {
  console.log(`   ✅ 0 tệp có lỗi artifacts.`);
}
console.log('================================================================');
