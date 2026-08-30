const fs = require('fs');
const path = require('path');

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

const files = getMdxFiles('d:/Apps/Apps_ykhoa/src/content/basic-medical');

let filesToUpdate = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasBox = content.includes('citation-box');
  const hasND = /Nội Dung Chuyên Đề \d+/i.test(content);
  filesToUpdate.push({
    file: f,
    hasBox,
    hasND,
    relPath: path.relative('d:/Apps/Apps_ykhoa/src/content/basic-medical', f)
  });
});

console.log('Total files scanned:', filesToUpdate.length);
const ndFiles = filesToUpdate.filter(x => x.hasND);
console.log('Files with "Nội Dung Chuyên Đề":', ndFiles.length);
ndFiles.forEach(x => console.log(' - ' + x.relPath));
