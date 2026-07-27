const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/content/pathophysiology');
const htmlFile = path.join(baseDir, 'sinhly-sinhlybenh.html');
const html = fs.readFileSync(htmlFile, 'utf8');

const regex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
let match;
const links = [];

while ((match = regex.exec(html)) !== null) {
  links.push(match[1]);
}

console.log(`=== UNIQUE HREFS IN sinhly-sinhlybenh.html ===\n`);
const uniqueHrefs = [...new Set(links)];

uniqueHrefs.forEach(href => {
  const cleanHref = href.split('?')[0].split('#')[0];
  if (!cleanHref) {
    console.log(`[HASH ONLY] ${href}`);
    return;
  }
  const targetPath = path.resolve(baseDir, cleanHref);
  const exists = fs.existsSync(targetPath);
  console.log(`${exists ? '✅' : '❌'} href="${href}" -> ${targetPath}`);
});
