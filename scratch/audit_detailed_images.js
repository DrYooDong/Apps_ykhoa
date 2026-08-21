const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function analyzeKhoGuidelines() {
  const dir = path.resolve(rootDir, 'src/content/ebm/guidelines/kho-guidelines');
  const files = fs.readdirSync(dir);
  console.log('=== CHECKING KHO-GUIDELINES HTML/MD FILES ===');
  let totalImg = 0;
  let brokenImg = 0;

  files.forEach(f => {
    if (f.endsWith('.html') || f.endsWith('.md')) {
      const filePath = path.join(dir, f);
      const content = fs.readFileSync(filePath, 'utf8');
      
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
      let match;
      while ((match = imgRegex.exec(content)) !== null) {
        totalImg++;
        const src = match[1];
        if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('#')) {
          const resolved = src.startsWith('/') ? path.resolve(rootDir, src.slice(1)) : path.resolve(dir, src);
          if (!fs.existsSync(resolved)) {
            brokenImg++;
            console.log(`[BROKEN] ${f} -> ${src} (resolved: ${path.relative(rootDir, resolved)})`);
          } else {
            console.log(`[OK] ${f} -> ${src}`);
          }
        }
      }

      // Check obsidian image links ![[...]]
      const obsRegex = /!\[\[(.*?)\]\]/g;
      while ((match = obsRegex.exec(content)) !== null) {
        totalImg++;
        const src = match[1];
        console.log(`[OBSIDIAN TAG] ${f} -> ![[${src}]]`);
      }
    }
  });

  console.log(`Kho Guidelines: ${totalImg} total images, ${brokenImg} broken.\n`);
}

function analyzePathophysiology() {
  const baseDir = path.resolve(rootDir, 'src/content/pathophysiology');
  console.log('=== CHECKING PATHOPHYSIOLOGY FILES ===');
  
  function walk(currentDir) {
    const list = fs.readdirSync(currentDir);
    list.forEach(f => {
      const fullPath = path.join(currentDir, f);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (f.endsWith('.html') || f.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const fileRel = path.relative(rootDir, fullPath);

        const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
        let match;
        while ((match = imgRegex.exec(content)) !== null) {
          const src = match[1];
          if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('#')) {
            const resolved = src.startsWith('/') ? path.resolve(rootDir, src.slice(1)) : path.resolve(currentDir, src);
            if (!fs.existsSync(resolved)) {
              console.log(`[BROKEN] ${fileRel} -> ${src} (resolved: ${path.relative(rootDir, resolved)})`);
            } else {
              // console.log(`[OK] ${fileRel} -> ${src}`);
            }
          }
        }

        const obsRegex = /!\[\[(.*?)\]\]/g;
        while ((match = obsRegex.exec(content)) !== null) {
          console.log(`[OBSIDIAN TAG] ${fileRel} -> ![[${match[1]}]]`);
        }
      }
    });
  }

  walk(baseDir);
}

function analyzeKnowledgeVault() {
  const baseDir = path.resolve(rootDir, 'knowledge-vault');
  console.log('\n=== CHECKING KNOWLEDGE VAULT ATTACHMENT REFERENCES ===');
  
  const attachmentsDir = path.resolve(baseDir, '_resources/attachments');
  const availableAttachments = new Set(fs.existsSync(attachmentsDir) ? fs.readdirSync(attachmentsDir) : []);
  console.log(`Available in knowledge-vault/_resources/attachments: ${availableAttachments.size} files`);

  let totalRefs = 0;
  let missingRefs = 0;
  const missingByVault = {};

  function walk(currentDir) {
    const list = fs.readdirSync(currentDir);
    list.forEach(f => {
      if (f.startsWith('.')) return;
      const fullPath = path.join(currentDir, f);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (f.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const fileRel = path.relative(rootDir, fullPath);

        const obsRegex = /!\[\[(.*?)\]\]/g;
        let match;
        while ((match = obsRegex.exec(content)) !== null) {
          totalRefs++;
          const target = match[1].trim();
          if (!availableAttachments.has(target)) {
            missingRefs++;
            const vault = fileRel.split(path.sep)[1] || 'root';
            if (!missingByVault[vault]) missingByVault[vault] = [];
            missingByVault[vault].push({ file: fileRel, target });
          }
        }
      }
    });
  }

  walk(baseDir);
  console.log(`Total Obsidian image links: ${totalRefs}`);
  console.log(`Missing in attachments dir: ${missingRefs}`);
  for (const [vault, items] of Object.entries(missingByVault)) {
    console.log(`  Vault [${vault}]: ${items.length} missing image references`);
    items.slice(0, 3).forEach(it => console.log(`    - ${it.file} -> [[${it.target}]]`));
  }
}

analyzeKhoGuidelines();
analyzePathophysiology();
analyzeKnowledgeVault();
