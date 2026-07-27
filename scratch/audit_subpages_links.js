const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const dir = path.join(__dirname, '../src/content/pathophysiology');
const htmlFiles = getAllHtmlFiles(dir);

let totalBroken = 0;

htmlFiles.forEach(file => {
  const baseDir = path.dirname(file);
  const relFile = path.relative(dir, file);
  const html = fs.readFileSync(file, 'utf8');
  const regex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('http')) continue;

    const cleanHref = href.split('?')[0].split('#')[0];
    if (!cleanHref) continue;

    const targetPath = path.resolve(baseDir, cleanHref);
    if (!fs.existsSync(targetPath)) {
      totalBroken++;
      console.log(`❌ [BROKEN LINK] in "${relFile}": href="${href}" -> Expected: ${targetPath}`);
    }
  }
});

console.log(`\nAudit finished across ${htmlFiles.length} HTML files. Total broken links found: ${totalBroken}`);
