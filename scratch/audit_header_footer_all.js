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

const allHtmls = walk('d:\\Apps_ykhoa\\src').concat(walk('d:\\Apps_ykhoa\\pages')).concat(['d:\\Apps_ykhoa\\index.html']).filter(f => f.endsWith('.html'));

let brokenHeader = 0;
let brokenFooter = 0;
let oldJsFound = 0;

allHtmls.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  const dir = path.dirname(hf);

  if (content.includes('components/header.js') || content.includes('components/footer.js')) {
    console.warn(`[OLD JS FOUND] in ${path.relative('d:\\Apps_ykhoa', hf)}`);
    oldJsFound++;
  }

  const scriptRegex = /<script\b[^>]*src=["']([^"']*components\/(header|footer)\.ts)["'][^>]*>/gi;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    const src = match[1];
    const resolved = path.resolve(dir, src);
    if (!fs.existsSync(resolved)) {
      console.warn(`[BROKEN TS SCRIPT] in ${path.relative('d:\\Apps_ykhoa', hf)} -> ${src} (Resolved: ${resolved})`);
      if (src.includes('header')) brokenHeader++;
      if (src.includes('footer')) brokenFooter++;
    }
  }
});

console.log(`\n=== AUDIT SUMMARY ===`);
console.log(`Total HTML files audited: ${allHtmls.length}`);
console.log(`Old JS references remaining: ${oldJsFound}`);
console.log(`Broken Header TS references: ${brokenHeader}`);
console.log(`Broken Footer TS references: ${brokenFooter}`);
