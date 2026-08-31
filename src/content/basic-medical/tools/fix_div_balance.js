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
  const body = content.split('---').slice(2).join('---');

  const openDivs = (body.match(/<div\b[^>]*>/gi) || []).length;
  const closeDivs = (body.match(/<\/div>/gi) || []).length;

  if (closeDivs > openDivs) {
    const diff = closeDivs - openDivs;
    let newContent = content;
    for (let i = 0; i < diff; i++) {
      newContent = newContent.replace(/<\/div>\s*(\n\s*<!-- HÀNG NÚT ĐIỀU HƯỚNG SPA -->|\n\s*<div class="btn-row">|\n\s*<div style="margin-top:\s*1\.5rem;">\s*<div class="btn-row">)/i, (m, p1) => {
        return `\n${p1.trimStart()}`;
      });
    }

    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8');
      fixedFiles++;
    }
  }
});

console.log('Fixed extra div in', fixedFiles, 'files.');
