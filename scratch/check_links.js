const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/content/pathophysiology');
const htmlFile = path.join(baseDir, 'co-che-benh-sinh.html');
const html = fs.readFileSync(htmlFile, 'utf8');

const regex = /<a\s+[^>]*href=["']([^"']+)["']/gi;
let match;
const links = [];
while ((match = regex.exec(html)) !== null) {
  links.push(match[1]);
}

console.log(`Found ${links.length} links in ${htmlFile}`);

let missingCount = 0;
let totalChecked = 0;

links.forEach((link, i) => {
  if (link.startsWith('#') || link.startsWith('javascript:') || link.startsWith('http')) return;
  totalChecked++;
  // If query string present, strip it for checking file existence
  const cleanLink = link.split('?')[0];
  const targetPath = path.resolve(baseDir, cleanLink);
  const exists = fs.existsSync(targetPath);
  if (!exists) {
    missingCount++;
    console.log(`❌ [MISSING #${i+1}] href="${link}" -> target: ${targetPath}`);
  } else {
    // console.log(`OK: ${link}`);
  }
});

console.log(`\nSummary: Checked ${totalChecked} local links. Missing: ${missingCount}`);
