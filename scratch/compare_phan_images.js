const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const brokenList = [];

for (let part = 1; part <= 7; part++) {
  const imgDir = path.resolve(rootDir, `src/content/pathophysiology/images/Phan${part}`);
  const existingFiles = fs.existsSync(imgDir) ? fs.readdirSync(imgDir) : [];
  console.log(`\n=== Phan${part} (Existing ${existingFiles.length} files) ===`);
  console.log('Files:', existingFiles);

  const htmlDir = path.resolve(rootDir, `src/content/pathophysiology/physiology/part${part}`);
  if (fs.existsSync(htmlDir)) {
    const htmlFiles = fs.readdirSync(htmlDir);
    htmlFiles.forEach(hf => {
      if (hf.endsWith('.html')) {
        const content = fs.readFileSync(path.join(htmlDir, hf), 'utf8');
        const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
        let m;
        while ((m = imgRegex.exec(content)) !== null) {
          const src = m[1];
          const baseName = path.basename(src);
          const exists = existingFiles.some(f => f.toLowerCase() === baseName.toLowerCase());
          if (!exists) {
            brokenList.push({ part, hf, src, baseName });
            console.log(`  [MISSING in Phan${part}] ${hf} -> ${baseName}`);
          } else {
            // Check case-sensitivity match
            const exact = existingFiles.includes(baseName);
            if (!exact) {
              console.log(`  [CASE MISMATCH] ${hf} -> ${baseName} (actual: ${existingFiles.find(f => f.toLowerCase() === baseName.toLowerCase())})`);
            }
          }
        }
      }
    });
  }
}

console.log(`\nTotal missing in Phan1-7: ${brokenList.length}`);
