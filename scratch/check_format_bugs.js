const fs = require('fs');
const path = require('path');

const targetFile = process.argv[2] || 'src/content/pathophysiology/biochemistry/block4-intermediary-metabolism/chuyen-hoa-lipid.html';
const content = fs.readFileSync(targetFile, 'utf8');
const lines = content.split('\n');

console.log(`Checking ${targetFile}...\n`);

let dollarIssues = [];
let hashIssues = [];

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  
  // 1. Check for $ LaTeX delimiters
  if (line.includes('$')) {
    dollarIssues.push({ line: lineNum, text: line.trim() });
  }

  // 2. Check for markdown headings or raw tags (# Heading, ## Heading, #tag)
  // Ignore CSS hex colors (#fff, #0284c7), anchor links (href="#sec-1"), CSS selectors (id="#..."), SVG url(#arrow...)
  let cleanLine = line
    .replace(/#[0-9a-fA-F]{3,8}\b/g, '')
    .replace(/href=["']#[^"']*["']/g, '')
    .replace(/url\(#[^)]*\)/g, '')
    .replace(/getElementById\(["']#?[^"']*["']\)/g, '');

  if (cleanLine.includes('#')) {
    // Check if it's a markdown heading e.g. # Title, ## Title or #tag
    hashIssues.push({ line: lineNum, text: line.trim() });
  }
});

console.log(`=== KẾT QUẢ KIỂM TRA KÝ TỰ $ (LaTeX/Math raw): ${dollarIssues.length} lỗi ===`);
dollarIssues.forEach(item => {
  console.log(`  [Dòng ${item.line}]: ${item.text}`);
});

console.log(`\n=== KẾT QUẢ KIỂM TRA KÝ TỰ # (Markdown/Raw hash): ${hashIssues.length} lỗi ===`);
hashIssues.forEach(item => {
  console.log(`  [Dòng ${item.line}]: ${item.text}`);
});

if (dollarIssues.length === 0 && hashIssues.length === 0) {
  console.log('\n✅ TUYỆT VỜI: Không tìm thấy bất kỳ lỗi $ (LaTeX raw) hay # (Markdown raw) nào!');
}
