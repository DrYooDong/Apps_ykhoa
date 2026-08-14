const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('d:\\Apps_ykhoa\\index.html', 'utf8');
const baseDir = 'd:\\Apps_ykhoa';

console.log('=== CHECKING ALL SCRIPTS IN index.html ===');
const scriptRegex = /<script\b[^>]*src=["']([^"']+)["'][^>]*>/gi;
let m;
let broken = 0;
while ((m = scriptRegex.exec(content)) !== null) {
  const src = m[1];
  if (src.startsWith('http') || src.startsWith('//')) continue;
  const resolved = path.resolve(baseDir, src);
  const exists = fs.existsSync(resolved);
  console.log(`[${exists ? 'OK' : 'MISSING'}] ${src} -> ${resolved}`);
  if (!exists) broken++;
}

console.log('\n=== CHECKING ALL STYLESHEETS IN index.html ===');
const linkRegex = /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
while ((m = linkRegex.exec(content)) !== null) {
  const href = m[1];
  if (href.startsWith('http') || href.startsWith('//')) continue;
  const resolved = path.resolve(baseDir, href);
  const exists = fs.existsSync(resolved);
  console.log(`[${exists ? 'OK' : 'MISSING'}] ${href} -> ${resolved}`);
  if (!exists) broken++;
}

console.log(`\nTotal broken links: ${broken}`);
