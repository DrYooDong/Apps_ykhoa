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

const baseDir = 'd:\\Apps_ykhoa\\src\\content\\calculators';
const htmlFiles = walk(baseDir).filter(f => f.endsWith('.html'));

let missingCount = 0;
let totalScripts = 0;

htmlFiles.forEach(hf => {
  const content = fs.readFileSync(hf, 'utf8');
  const dir = path.dirname(hf);
  const srcRegex = /<script[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = srcRegex.exec(content)) !== null) {
    const src = match[1];
    totalScripts++;
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
      continue;
    }
    const resolved = path.resolve(dir, src);
    if (!fs.existsSync(resolved)) {
      console.log(`❌ FILE NOT FOUND: ${path.relative(baseDir, hf)} -> ${src} (Resolved: ${resolved})`);
      missingCount++;
    }
  }
});

console.log('Total scripts checked:', totalScripts);
console.log('Missing scripts count:', missingCount);
