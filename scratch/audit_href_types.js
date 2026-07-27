const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/pathophysiology/sinhly-sinhlybenh.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

lines.forEach((line, idx) => {
  const match = line.match(/href=["']([^"']+)["']/);
  if (match) {
    const href = match[1];
    if (href.startsWith('#') || href.startsWith('http') || href.startsWith('javascript:')) return;
    const baseDir = path.dirname(filePath);
    const cleanHref = href.split('?')[0].split('#')[0];
    const targetPath = path.resolve(baseDir, cleanHref);
    const exists = fs.existsSync(targetPath);
    if (!exists) {
      console.log(`Line ${idx + 1}: ❌ href="${href}" -> ${targetPath}`);
    }
  }
});
