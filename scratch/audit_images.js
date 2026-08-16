const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles('src/content/pathophysiology');
const missing = [];
const found = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    const src = m[1];
    let resolved = path.resolve(path.dirname(file), src);
    if (!fs.existsSync(resolved)) {
      const clean = src.replace(/^(\.\.\/)+images\//i, '').replace(/^images\//i, '');
      const alt1 = path.resolve('src/content/pathophysiology/images', clean);
      const alt2 = path.resolve('src/content/pathophysiology/images', clean.replace('part', 'Phan'));
      const alt3 = path.resolve('src/content/pathophysiology/images', clean.replace('Phan', 'part'));
      if (fs.existsSync(alt1) || fs.existsSync(alt2) || fs.existsSync(alt3)) {
        found.push({ file: path.relative('.', file), src, note: 'Found via alias' });
      } else {
        missing.push({ file: path.relative('.', file), src });
      }
    } else {
      found.push({ file: path.relative('.', file), src });
    }
  }
});

console.log('Total images found in HTML:', found.length);
console.log('Total missing images:', missing.length);
console.log('Missing images list:');
missing.forEach(m => console.log(`- ${m.file} -> ${m.src}`));
