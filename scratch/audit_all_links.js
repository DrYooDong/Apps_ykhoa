const fs = require('fs');
const path = require('path');

function auditFile(htmlFile) {
  if (!fs.existsSync(htmlFile)) {
    console.log(`File not found: ${htmlFile}`);
    return;
  }
  const baseDir = path.dirname(htmlFile);
  const html = fs.readFileSync(htmlFile, 'utf8');
  const regex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  let count = 0;
  let broken = 0;

  console.log(`\n==================================================`);
  console.log(`=== AUDITING LINKS IN: ${path.relative(path.join(__dirname, '..'), htmlFile)} ===`);
  console.log(`==================================================\n`);

  while ((match = regex.exec(html)) !== null) {
    count++;
    const href = match[1];
    const inner = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('http')) {
      continue;
    }

    const cleanHref = href.split('?')[0].split('#')[0];
    const targetPath = path.resolve(baseDir, cleanHref);
    const exists = fs.existsSync(targetPath);

    if (!exists) {
      broken++;
      console.log(`❌ [BROKEN LINK #${count}]`);
      console.log(`   Text: "${inner.substring(0, 60)}..."`);
      console.log(`   href: "${href}"`);
      console.log(`   Expected file: ${targetPath}`);

      // Candidate search
      const targetDir = path.dirname(targetPath);
      if (fs.existsSync(targetDir)) {
        const dirFiles = fs.readdirSync(targetDir);
        const targetName = path.basename(cleanHref).toLowerCase();
        const candidates = dirFiles.filter(f => {
          const fn = f.toLowerCase();
          return targetName.split(/[-_]/).some(part => part.length > 3 && fn.includes(part));
        });
        if (candidates.length > 0) {
          console.log(`   💡 Did you mean: ${candidates.map(c => path.join(path.relative(baseDir, targetDir), c)).join(' OR ')}`);
        }
      } else {
        console.log(`   ⚠️ Directory does not exist: ${targetDir}`);
      }
      console.log('');
    }
  }

  console.log(`Audited ${count} total links in ${path.basename(htmlFile)}. Broken links found: ${broken}`);
}

auditFile(path.join(__dirname, '../src/content/pathophysiology/co-che-benh-sinh.html'));
auditFile(path.join(__dirname, '../www/pages/Sinh lý - Sinh lý bệnh/Sinhly-sinhlybenh.html'));
