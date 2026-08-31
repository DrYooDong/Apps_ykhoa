const fs = require('fs');
const path = require('path');

const basicMedicalDir = path.resolve(__dirname, '..');

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

const files = getFiles(basicMedicalDir);
let fixedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(basicMedicalDir, file);

  // If table is inside <div class="table-responsive"> but </table> is followed directly by ## or <div class="citation-box"> and then </div>
  if (/<div class="table-responsive">\s*<table[\s\S]*?<\/table>\s*\n\s*##\s*\d+\.\s*Tài Liệu Tham Khảo/i.test(content)) {
    console.log('Fixing table wrapper in:', rel);
    content = content.replace(/(<div class="table-responsive">\s*<table[\s\S]*?<\/table>)\s*(\n\s*##\s*\d+\.\s*Tài Liệu Tham Khảo[\s\S]*?<div class="citation-box">[\s\S]*?<\/div>)\s*\n\s*<\/div>/gi, (m, tableCode, refCode) => {
      return `${tableCode}\n</div>\n\n${refCode}`;
    });
    fs.writeFileSync(file, content, 'utf8');
    fixedFiles++;
  }
});

console.log('Fixed', fixedFiles, 'files.');
