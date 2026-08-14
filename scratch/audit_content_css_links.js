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

console.log(`Auditing CSS links in ${htmlFiles.length} HTML files in src/content...`);

let brokenCount = 0;
let totalCssLinks = 0;
const brokenMap = new Map();

htmlFiles.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  const dir = path.dirname(hf);
  const cssRegex = /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = cssRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
      continue;
    }
    totalCssLinks++;
    const resolved = path.resolve(dir, href.split('?')[0]);
    if (!fs.existsSync(resolved)) {
      brokenCount++;
      const relHtml = path.relative(contentDir, hf);
      if (!brokenMap.has(relHtml)) {
        brokenMap.set(relHtml, []);
      }
      brokenMap.get(relHtml).push({ href, resolved });
    }
  }
});

console.log(`Total local CSS links checked: ${totalCssLinks}`);
console.log(`Broken CSS links: ${brokenCount}`);

if (brokenCount > 0) {
  console.log('\n--- BROKEN CSS LINKS LIST ---');
  for (const [file, list] of brokenMap.entries()) {
    console.log(`\nFile: ${file}`);
    list.forEach(item => {
      console.log(`  href: ${item.href}`);
      console.log(`  resolved: ${item.resolved}`);
    });
  }
} else {
  console.log('✅ 100% of CSS links in src/content exist and are valid!');
}
