const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = walk('d:\\Apps_ykhoa\\src').filter(f => f.endsWith('.html'));
let headerJsMatches = 0;
let footerJsMatches = 0;

htmlFiles.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  if (content.includes('components/header.js')) {
    console.log(`[HEADER.JS] in ${path.relative('d:\\Apps_ykhoa', hf)}`);
    headerJsMatches++;
  }
  if (content.includes('components/footer.js')) {
    console.log(`[FOOTER.JS] in ${path.relative('d:\\Apps_ykhoa', hf)}`);
    footerJsMatches++;
  }
});

console.log(`\nFound ${headerJsMatches} header.js and ${footerJsMatches} footer.js references.`);
