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

const contentDir = 'd:\\Apps_ykhoa\\src\\content';
const htmlFiles = walk(contentDir).filter(f => f.endsWith('.html'));

let totalCssTags = 0;
let brokenLinks = 0;

htmlFiles.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  const dir = path.dirname(hf);
  const regex = /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('http') || href.startsWith('//')) continue;
    totalCssTags++;
    const resolved = path.resolve(dir, href.split('?')[0]);
    if (!fs.existsSync(resolved)) {
      console.warn(`[BROKEN CSS] ${path.relative(contentDir, hf)} -> ${href}`);
      brokenLinks++;
    }
  }
});

console.log(`\n=== FINAL CSS AUDIT SUMMARY for src/content ===`);
console.log(`Total HTML files checked: ${htmlFiles.length}`);
console.log(`Total CSS link tags checked: ${totalCssTags}`);
console.log(`Broken CSS links: ${brokenLinks}`);
if (brokenLinks === 0) {
  console.log(`✅ 100% CSS links across src/content are valid and verified!`);
}
