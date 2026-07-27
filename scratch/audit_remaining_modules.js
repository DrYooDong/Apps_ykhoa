const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
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

const projectRoot = path.join(__dirname, '..');

const targetDirs = [
  path.join(projectRoot, 'src/content/approaches'),
  path.join(projectRoot, 'src/content/pharmacology'),
  path.join(projectRoot, 'src/content/skills'),
  path.join(projectRoot, 'src/content/tcm'),
  path.join(projectRoot, 'www/pages/Tiếp cận'),
  path.join(projectRoot, 'www/pages/Dược lý'),
  path.join(projectRoot, 'www/pages/Kỹ năng'),
  path.join(projectRoot, 'www/pages/Y học cổ truyền')
];

let htmlFiles = [];
targetDirs.forEach(d => {
  htmlFiles = htmlFiles.concat(getAllHtmlFiles(d));
});

console.log(`=== BROKEN LINKS REPORT ACROSS ${htmlFiles.length} FILES ===\n`);

let totalBrokenLinks = 0;

htmlFiles.forEach(file => {
  const baseDir = path.dirname(file);
  const relFile = path.relative(projectRoot, file);
  const html = fs.readFileSync(file, 'utf8');

  const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    const text = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('http') || href.startsWith('mailto:')) continue;

    const cleanHref = href.split('?')[0].split('#')[0];
    if (!cleanHref) continue;

    const targetPath = path.resolve(baseDir, cleanHref);
    const exists = fs.existsSync(targetPath);

    if (!exists) {
      totalBrokenLinks++;
      console.log(`❌ [BROKEN LINK #${totalBrokenLinks}] in "${relFile}"`);
      console.log(`   Text: "${text.substring(0, 50)}..."`);
      console.log(`   href: "${href}"`);
      console.log(`   Expected: ${targetPath}`);

      // Candidate search
      const targetDir = path.dirname(targetPath);
      if (fs.existsSync(targetDir)) {
        const dirFiles = fs.readdirSync(targetDir);
        const targetName = path.basename(cleanHref).toLowerCase();
        const candidates = dirFiles.filter(f => {
          const fn = f.toLowerCase();
          return targetName.split(/[-_.]/).some(part => part.length > 3 && fn.includes(part));
        });
        if (candidates.length > 0) {
          console.log(`   💡 Candidates: ${candidates.map(c => path.join(path.relative(baseDir, targetDir), c)).join(' OR ')}`);
        }
      } else {
        console.log(`   ⚠️ Directory does not exist: ${targetDir}`);
      }
      console.log('');
    }
  }
});

console.log(`Summary: Total broken links found: ${totalBrokenLinks}`);
