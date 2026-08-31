const fs = require('fs');
const path = require('path');

const basicMedicalDir = path.resolve(__dirname, '..');

// Helper to get files
function getFiles(dir, ext = '.mdx') {
  let res = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (item === 'components' || item === 'images' || item === 'tools' || item === 'css' || item === 'js' || item === 'views') continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      res = res.concat(getFiles(full, ext));
    } else if (item.endsWith(ext)) {
      res.push(full);
    }
  }
  return res;
}

const allFiles = getFiles(basicMedicalDir);
console.log(`Found ${allFiles.length} MDX files in basic-medical.`);

let updatedCount = 0;
let tableWrappedCount = 0;

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  const relPath = path.relative(basicMedicalDir, file);

  // 1. Wrap unwrapped tables
  // Find <table class="physio-table..."> or <table class="table-modern..."> not preceded by table-responsive
  content = content.replace(/(?<!<div class="table-responsive">\s*)(<table\b[^>]*>[\s\S]*?<\/table>)/gi, (match, tableCode, offset, fullStr) => {
    // Check if within 120 chars before there is already a table wrapper open tag
    const beforeStr = fullStr.substring(Math.max(0, offset - 120), offset);
    if (beforeStr.includes('table-responsive') || beforeStr.includes('table-wrapper') || beforeStr.includes('table-container') || beforeStr.includes('hemo-table-wrap') || beforeStr.includes('physio-table-wrap')) {
      return match;
    }
    tableWrappedCount++;
    return `<div class="table-responsive">\n  ${tableCode.trim()}\n</div>`;
  });

  // 2. Parse frontmatter and body
  const parts = content.split('---');
  if (parts.length < 3) {
    console.warn(`Skipping ${relPath}: Invalid frontmatter`);
    return;
  }

  let frontmatter = parts[1];
  let body = parts.slice(2).join('---');

  // Check if body already has a clean reference heading
  const hasRefHeadingRegex = /##\s*(\d+\.\s*)?.*(Tài Liệu Tham Khảo|Trích Dẫn|References|Y Văn)/i;
  
  // Extract all existing H2 headings in body
  const headingMatches = [...body.matchAll(/##\s*(\d+)\.\s*([^{}\n]+)\s*\{#([^}\n]+)\}/g)];
  let maxSectionNum = 0;
  headingMatches.forEach(m => {
    const num = parseInt(m[1], 10);
    if (!isNaN(num) && num > maxSectionNum) {
      maxSectionNum = num;
    }
  });

  // Check if Biochemistry format: ## 7. ... & Trích Dẫn EBM {#sec-7}
  const isBiochemConflated = /##\s*7\.\s*([^&\n]+)\s*&\s*Trích Dẫn EBM\s*\{#sec-7\}/i.test(body);

  if (isBiochemConflated) {
    // Split section 7 into section 7 and section 8
    body = body.replace(/##\s*7\.\s*([^&\n]+)\s*&\s*Trích Dẫn EBM\s*\{#sec-7\}/i, (m, p1) => {
      return `## 7. ${p1.trim()} {#sec-7}`;
    });

    // Locate the citation box or list
    if (body.includes('<div class="citation-box">')) {
      body = body.replace(/<div class="citation-box">/i, `## 8. Tài Liệu Tham Khảo EBM {#sec-8}\n\n<div class="citation-box">`);
    } else if (/<ol[\s\S]*?<\/ol>/i.test(body)) {
      body = body.replace(/(<ol\b[^>]*>[\s\S]*?<\/ol>)/i, `## 8. Tài Liệu Tham Khảo EBM {#sec-8}\n\n<div class="citation-box">\n  $1\n</div>`);
    }

    // Update frontmatter sections if needed
    if (frontmatter.includes('number: 7') && !frontmatter.includes('number: 8')) {
      frontmatter = frontmatter.replace(/(- id:\s*["']?sec-7["']?[\s\S]*?title:\s*["'][^"']+["'][\s\S]*?icon:\s*["'][^"']+["'])/i, 
        `$1\n  - id: "sec-8"\n    number: 8\n    title: "Tài Liệu Tham Khảo EBM"\n    icon: "fa-solid fa-bookmark"`
      );
    }
  } else if (!hasRefHeadingRegex.test(body)) {
    // Needs a new reference heading with number = maxSectionNum + 1
    const nextNum = maxSectionNum > 0 ? maxSectionNum + 1 : 1;
    const refHeadingText = `## ${nextNum}. Tài Liệu Tham Khảo EBM {#sec-${nextNum}}`;

    // Find the references list (either in <ol>...</ol> or <div class="citation-box">)
    if (body.includes('<div class="citation-box">')) {
      body = body.replace(/<div class="citation-box">/i, `${refHeadingText}\n\n<div class="citation-box">`);
    } else if (/<ol[\s\S]*?<\/ol>/i.test(body)) {
      // Find the last <ol> before navigation buttons or end
      const olMatches = [...body.matchAll(/<ol\b[^>]*>([\s\S]*?)<\/ol>/gi)];
      if (olMatches.length > 0) {
        const lastOl = olMatches[olMatches.length - 1];
        const lastOlFull = lastOl[0];
        const lastOlIdx = lastOl.index;

        // Check if lastOl is near the end of body (within last 4000 chars)
        if (body.length - lastOlIdx < 4000) {
          // Replace lastOl with refHeadingText + citation-box
          const before = body.substring(0, lastOlIdx);
          const after = body.substring(lastOlIdx + lastOlFull.length);
          
          // Clean up any stray </div> before or after
          let cleanBefore = before.trimEnd();
          if (cleanBefore.endsWith('</div>') && !cleanBefore.endsWith('</div>\n</div>')) {
            // Check if this </div> was an extra unclosed wrapper
            const openDivs = (cleanBefore.match(/<div\b[^>]*>/gi) || []).length;
            const closeDivs = (cleanBefore.match(/<\/div>/gi) || []).length;
            if (closeDivs >= openDivs) {
              cleanBefore = cleanBefore.substring(0, cleanBefore.lastIndexOf('</div>')).trimEnd();
            }
          }

          body = `${cleanBefore}\n\n${refHeadingText}\n\n<div class="citation-box">\n  ${lastOlFull.trim()}\n</div>\n\n${after.trimStart()}`;
        }
      }
    }

    // Update frontmatter sections if sections array exists
    if (frontmatter.includes('sections:') && !frontmatter.includes(`sec-${nextNum}`)) {
      const lastSecMatch = frontmatter.match(/(\s*-\s*id:\s*["']?sec-\d+["']?[\s\S]*?title:\s*["'][^"']+["'][\s\S]*?icon:\s*["'][^"']+["'])(?=\n[a-zA-Z]|\n---|$)/i);
      if (lastSecMatch) {
        frontmatter = frontmatter.replace(lastSecMatch[0], `${lastSecMatch[0]}\n  - id: "sec-${nextNum}"\n    number: ${nextNum}\n    title: "Tài Liệu Tham Khảo EBM"\n    icon: "fa-solid fa-bookmark"`);
      }
    }
  }

  // 3. Clean up any duplicated </div> before .btn-row
  body = body.replace(/<\/div>\s*<\/div>\s*(<div class="btn-row">|<div style="margin-top: 1.5rem;">\s*<div class="btn-row">)/gi, (m, btn) => {
    return `</div>\n\n<!-- HÀNG NÚT ĐIỀU HƯỚNG SPA -->\n${btn}`;
  });

  const newContent = `---${frontmatter}---${body}`;
  if (newContent !== originalContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    updatedCount++;
    console.log(`✅ Updated: ${relPath}`);
  }
});

console.log(`\n======================================================`);
console.log(`🎉 Finished! Updated ${updatedCount} files.`);
console.log(`📊 Wrapped ${tableWrappedCount} tables in .table-responsive.`);
console.log(`======================================================`);
