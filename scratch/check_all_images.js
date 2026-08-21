const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function checkDir(dirName) {
  const dir = path.resolve(rootDir, dirName);
  if (!fs.existsSync(dir)) return [];
  const results = [];

  function walk(currentDir) {
    const list = fs.readdirSync(currentDir);
    for (const f of list) {
      const fullPath = path.join(currentDir, f);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (f.endsWith('.html') || f.endsWith('.md') || f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.json')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const fileRel = path.relative(rootDir, fullPath);

        // 1. img src
        const imgSrcRegex = /<img[^>]+src=["']([^"']+)["']/gi;
        let m;
        while ((m = imgSrcRegex.exec(content)) !== null) {
          const src = m[1];
          if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('#')) {
            const resolved = src.startsWith('/') ? path.resolve(rootDir, src.slice(1)) : path.resolve(currentDir, src);
            const exists = fs.existsSync(resolved);
            results.push({ file: fileRel, src, resolved: path.relative(rootDir, resolved), exists, type: 'img' });
          }
        }

        // 2. markdown image ![...](...)
        const mdRegex = /!\[.*?\]\((.*?)\)/g;
        while ((m = mdRegex.exec(content)) !== null) {
          const src = m[1].trim();
          if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('#')) {
            const resolved = src.startsWith('/') ? path.resolve(rootDir, src.slice(1)) : path.resolve(currentDir, src);
            const exists = fs.existsSync(resolved);
            results.push({ file: fileRel, src, resolved: path.relative(rootDir, resolved), exists, type: 'markdown' });
          }
        }

        // 3. obsidian [[...]] image
        const obsRegex = /!\[\[(.*?)\]\]/g;
        while ((m = obsRegex.exec(content)) !== null) {
          const src = m[1].trim();
          const resolved = path.resolve(currentDir, src);
          const exists = fs.existsSync(resolved);
          results.push({ file: fileRel, src, resolved: path.relative(rootDir, resolved), exists, type: 'obsidian' });
        }
      }
    }
  }

  walk(dir);
  return results;
}

console.log('=== KHO GUIDELINES ===');
const kgResults = checkDir('src/content/ebm/guidelines/kho-guidelines');
console.log(`Total image links in kho-guidelines: ${kgResults.length}`);
kgResults.forEach(r => {
  console.log(`[${r.exists ? 'OK' : 'BROKEN'}] ${r.file} -> ${r.src} (resolved: ${r.resolved})`);
});

console.log('\n=== PATHOPHYSIOLOGY ===');
const pathoResults = checkDir('src/content/pathophysiology');
console.log(`Total image links in pathophysiology: ${pathoResults.length}`);
const pathoBroken = pathoResults.filter(r => !r.exists);
console.log(`Broken in pathophysiology: ${pathoBroken.length}`);
pathoBroken.forEach(r => {
  console.log(`[BROKEN] ${r.file} -> ${r.src} (resolved: ${r.resolved})`);
});

console.log('\n=== KNOWLEDGE VAULT ===');
const kvResults = checkDir('knowledge-vault');
console.log(`Total image links in knowledge-vault: ${kvResults.length}`);
const kvBroken = kvResults.filter(r => !r.exists);
console.log(`Broken in knowledge-vault: ${kvBroken.length}`);
kvBroken.slice(0, 30).forEach(r => {
  console.log(`[BROKEN] ${r.file} -> ${r.src} (resolved: ${r.resolved})`);
});
