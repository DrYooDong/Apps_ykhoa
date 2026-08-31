const fs = require('fs');
const path = require('path');

const khoGuidelinesDir = path.resolve(__dirname, '../kho-guidelines');
const basicMedicalDir = path.resolve(__dirname, '../../../basic-medical');
const medicalStatisticsDir = path.resolve(__dirname, '../../medical-statistics');

function getMdxFiles(dir) {
  if (!fs.existsSync(dir)) return [];
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

function auditFolder(dir, label) {
  const files = getMdxFiles(dir);
  const missingHeadingFiles = [];
  const withHeadingFiles = [];
  const noRefsFiles = [];

  files.forEach(f => {
    const rel = path.relative(dir, f);
    const content = fs.readFileSync(f, 'utf8');
    const parts = content.split('---');
    const body = parts.slice(2).join('---');

    // Check for reference heading
    // Formats like: ## X. Tài Liệu Tham Khảo... or <h2 class="sec-title">...Tài liệu tham khảo...</h2> or <div class="sec-title">...Tài liệu tham khảo...</div>
    const hasRefHeading = /##\s*(\d+\.\s*)?.*(Tài Liệu Tham Khảo|Trích Dẫn|References|Y Văn)/i.test(body) ||
      /<h[23][^>]*class="[^"]*sec-title[^"]*"[^>]*>[\s\S]*?(Tài Liệu|Tham Khảo|References|Trích Dẫn|Y Văn)[\s\S]*?<\/h[23]>/i.test(body) ||
      /<div[^>]*class="[^"]*sec-title[^"]*"[^>]*>[\s\S]*?(Tài Liệu|Tham Khảo|References|Trích Dẫn|Y Văn)[\s\S]*?<\/div>/i.test(body) ||
      /<div[^>]*class="[^"]*sec-hdr[^"]*"[^>]*>[\s\S]*?(Tài Liệu|Tham Khảo|References|Trích Dẫn|Y Văn)[\s\S]*?<\/div>/i.test(body);

    // Check for reference items
    const hasOlLi = /<ol[\s\S]*?<\/ol>/i.test(body);
    const hasCitationBox = body.includes('citation-box');
    const hasNumberedRefsAtEnd = /\n\d+\.\s+[A-Z]/i.test(body.split('\n').slice(-30).join('\n'));

    const hasAnyRefs = hasOlLi || hasCitationBox || hasNumberedRefsAtEnd;

    if (!hasAnyRefs) {
      noRefsFiles.push(rel);
    } else if (!hasRefHeading) {
      missingHeadingFiles.push({
        file: rel,
        hasOlLi,
        hasCitationBox,
        hasNumberedRefsAtEnd
      });
    } else {
      withHeadingFiles.push(rel);
    }
  });

  console.log(`\n======================================================`);
  console.log(`📁 FOLDER: ${label} (${files.length} tệp MDX)`);
  console.log(`======================================================`);
  console.log(`✅ Đã có Heading "Tài liệu tham khảo": ${withHeadingFiles.length} / ${files.length}`);
  console.log(`❌ THIẾU Heading "Tài liệu tham khảo": ${missingHeadingFiles.length} / ${files.length}`);
  console.log(`⚠️ Không tìm thấy danh sách tham khảo: ${noRefsFiles.length} / ${files.length}`);

  if (missingHeadingFiles.length > 0) {
    console.log(`\nDanh sách các tệp THIẾU Heading:`);
    missingHeadingFiles.forEach(m => {
      console.log(`  - ${m.file}`);
    });
  }

  if (noRefsFiles.length > 0) {
    console.log(`\nDanh sách các tệp KHÔNG có danh sách tham khảo:`);
    noRefsFiles.forEach(f => {
      console.log(`  - ${f}`);
    });
  }

  return { total: files.length, missing: missingHeadingFiles, with: withHeadingFiles, noRefs: noRefsFiles };
}

console.log('🔍 BẮT ĐẦU RÀ SOÁT "TÀI LIỆU THAM KHẢO" TOÀN BỘ WORKSPACE...');
const gRes = auditFolder(khoGuidelinesDir, 'Kho Guidelines (src/content/ebm/guidelines/kho-guidelines)');
const bRes = auditFolder(basicMedicalDir, 'Cơ Sở Y Khoa (src/content/basic-medical)');
const sRes = auditFolder(medicalStatisticsDir, 'Thống Kê Y Học (src/content/ebm/medical-statistics)');
