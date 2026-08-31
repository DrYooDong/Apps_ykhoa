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
let tagErrors = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const body = content.split('---').slice(2).join('---');
  const rel = path.relative(basicMedicalDir, file);

  const openDivs = (body.match(/<div\b[^>]*>/gi) || []).length;
  const closeDivs = (body.match(/<\/div>/gi) || []).length;

  if (openDivs !== closeDivs) {
    console.log('❌ Tag mismatch in', rel, ': open <div> =', openDivs, ', close </div> =', closeDivs);
    tagErrors++;
  }
});

console.log('Tag verification finished. Errors:', tagErrors);
