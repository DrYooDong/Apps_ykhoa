const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('d:/Apps_ykhoa/src/content/approaches');
const missingModule = [];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (!content.includes('type="module"') && !content.includes("type='module'")) {
    missingModule.push(f.replace('d:\\Apps_ykhoa\\', '').replace(/\\/g, '/'));
  }
});

console.log('HTML files without TS module script:', missingModule.length);
if (missingModule.length > 0) {
  console.log(JSON.stringify(missingModule, null, 2));
} else {
  console.log('All 70 HTML files have TS module imports!');
}
