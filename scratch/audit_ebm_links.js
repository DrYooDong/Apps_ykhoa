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

const ebmSrcDir = path.join(__dirname, '../src/content/ebm');
const ebmWwwDir = path.join(__dirname, '../www/pages/Y học chứng cứ');

const htmlFiles = [
  ...getAllHtmlFiles(ebmSrcDir),
  ...getAllHtmlFiles(ebmWwwDir)
];

console.log(`=== AUDITING ${htmlFiles.length} HTML FILES IN EBM / GUIDELINES MODULE ===\n`);

let totalBroken = 0;

htmlFiles.forEach(file => {
  const baseDir = path.dirname(file);
  const relFile = path.relative(path.join(__dirname, '..'), file);
  const html = fs.readFileSync(file, 'utf8');
  
  const regex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  let fileBroken = 0;

  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    const text = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('http') || href.startsWith('mailto:')) continue;

    const cleanHref = href.split('?')[0].split('#')[0];
    if (!cleanHref) continue;

    const targetPath = path.resolve(baseDir, cleanHref);
    const exists = fs.existsSync(targetPath);

    if (!exists) {
      totalBroken++;
      fileBroken++;
      console.log(`❌ [BROKEN LINK] in "${relFile}"`);
      console.log(`   Text: "${text.substring(0, 50)}..."`);
      console.log(`   href: "${href}"`);
      console.log(`   Target expected: ${targetPath}`);

      // Try candidate search
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
    } else {
      // Check exact case of segments
      const relSegs = cleanHref.split('/');
      let cur = baseDir;
      let caseMismatch = false;
      const correctedSegs = [];
      for (const seg of relSegs) {
        if (seg === '.' || seg === '..') {
          cur = path.resolve(cur, seg);
          correctedSegs.push(seg);
          continue;
        }
        const dirItems = fs.readdirSync(cur);
        const exact = dirItems.find(i => i === seg);
        if (!exact) {
          const caseMatch = dirItems.find(i => i.toLowerCase() === seg.toLowerCase());
          if (caseMatch) {
            caseMismatch = true;
            correctedSegs.push(caseMatch);
            cur = path.join(cur, caseMatch);
          }
        } else {
          correctedSegs.push(exact);
          cur = path.join(cur, exact);
        }
      }
      if (caseMismatch) {
        console.log(`⚠️ [CASE MISMATCH] in "${relFile}": href="${href}" -> Exact disk name: "${correctedSegs.join('/')}"`);
      }
    }
  }
});

console.log(`==================================================`);
console.log(`EBM Audit Finished across ${htmlFiles.length} HTML files.`);
console.log(`Total broken links found: ${totalBroken}`);
console.log(`==================================================`);
