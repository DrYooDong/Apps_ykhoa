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

const baseDir = 'd:\\Apps_ykhoa\\src\\content\\ebm';
const allFiles = walk(baseDir);
const jsFiles = allFiles.filter(f => f.endsWith('.js'));
const tsFiles = allFiles.filter(f => f.endsWith('.ts'));
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

console.log(`=== AUDIT REPORT: src/content/ebm ===`);
console.log(`Total HTML files: ${htmlFiles.length}`);
console.log(`Total TS files: ${tsFiles.length}`);
console.log(`Total JS files: ${jsFiles.length}`);

if (jsFiles.length > 0) {
  console.error(`ERROR: Found ${jsFiles.length} JS files:`, jsFiles);
} else {
  console.log(`✅ 100% JavaScript files converted to TypeScript! (0 JS files remaining)`);
}

// Check broken local script references in HTML files
let brokenScripts = 0;
let validScripts = 0;

htmlFiles.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  const dir = path.dirname(hf);
  const scriptRegex = /<script[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
      continue; // External CDN
    }
    const resolvedPath = path.resolve(dir, src.split('?')[0]);
    if (!fs.existsSync(resolvedPath)) {
      console.warn(`[BROKEN SCRIPT] in ${path.relative(baseDir, hf)} -> ${src} (Resolved: ${resolvedPath})`);
      brokenScripts++;
    } else {
      validScripts++;
    }
  }
});

console.log(`Valid local scripts: ${validScripts}, Broken local scripts: ${brokenScripts}`);
