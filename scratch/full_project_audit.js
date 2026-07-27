const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'archive') {
        getAllHtmlFiles(fullPath, arrayOfFiles);
      }
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const projectRoot = path.join(__dirname, '..');
const htmlFiles = [
  ...getAllHtmlFiles(path.join(projectRoot, 'src')),
  ...getAllHtmlFiles(path.join(projectRoot, 'www'))
];

console.log(`=== FULL PROJECT AUDIT ACROSS ${htmlFiles.length} HTML FILES ===\n`);

let totalBroken = 0;

htmlFiles.forEach(file => {
  const baseDir = path.dirname(file);
  const relFile = path.relative(projectRoot, file);
  const html = fs.readFileSync(file, 'utf8');

  const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('http') || href.startsWith('mailto:')) continue;

    const cleanHref = href.split('?')[0].split('#')[0];
    if (!cleanHref) continue;

    const targetPath = path.resolve(baseDir, cleanHref);
    const exists = fs.existsSync(targetPath);

    if (!exists) {
      totalBroken++;
      console.log(`❌ [BROKEN LINK] in "${relFile}": href="${href}" -> ${targetPath}`);
    }
  }
});

console.log(`\n==================================================`);
console.log(`FULL PROJECT AUDIT FINISHED (${htmlFiles.length} HTML files).`);
console.log(`Total broken links in entire repository: ${totalBroken}`);
console.log(`==================================================`);
