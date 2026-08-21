const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function checkPathsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  // Check vault references
  const vaultMatches = content.match(/knowledge-vault\/[^"'\`\)\s]+/g);
  if (vaultMatches) {
    vaultMatches.forEach(vm => {
      const fullPath = path.resolve(rootDir, vm);
      if (!fs.existsSync(fullPath)) {
        issues.push({ type: 'vault-path', match: vm, resolved: fullPath, exists: false });
      }
    });
  }

  // Check img src references
  const imgSrcRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = imgSrcRegex.exec(content)) !== null) {
    const src = m[1];
    if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('#')) {
      const resolved = src.startsWith('/') ? path.resolve(rootDir, src.slice(1)) : path.resolve(path.dirname(filePath), src);
      if (!fs.existsSync(resolved)) {
        issues.push({ type: 'img-src', match: src, resolved, exists: false });
      }
    }
  }

  // Check markdown image references
  const mdImgRegex = /!\[.*?\]\((.*?)\)/g;
  while ((m = mdImgRegex.exec(content)) !== null) {
    const src = m[1].trim();
    if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('#')) {
      const resolved = src.startsWith('/') ? path.resolve(rootDir, src.slice(1)) : path.resolve(path.dirname(filePath), src);
      if (!fs.existsSync(resolved)) {
        issues.push({ type: 'md-img', match: src, resolved, exists: false });
      }
    }
  }

  return issues;
}

function scanDir(dirName) {
  const fullDir = path.resolve(rootDir, dirName);
  const allIssues = {};
  
  function walk(d) {
    const list = fs.readdirSync(d);
    list.forEach(f => {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) {
        walk(p);
      } else if (f.endsWith('.html') || f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.md') || f.endsWith('.json')) {
        const issues = checkPathsInFile(p);
        if (issues.length > 0) {
          allIssues[path.relative(rootDir, p)] = issues;
        }
      }
    });
  }

  walk(fullDir);
  return allIssues;
}

console.log('=== SCANNING src/content/pathophysiology ===');
const pathoIssues = scanDir('src/content/pathophysiology');
for (const [file, iss] of Object.entries(pathoIssues)) {
  console.log(`\nFile: ${file}`);
  iss.forEach(i => console.log(`  [${i.type}] ${i.match}`));
}

console.log('\n=== SCANNING src/content/ebm/guidelines/kho-guidelines ===');
const kgIssues = scanDir('src/content/ebm/guidelines/kho-guidelines');
for (const [file, iss] of Object.entries(kgIssues)) {
  console.log(`\nFile: ${file}`);
  iss.forEach(i => console.log(`  [${i.type}] ${i.match}`));
}
if (Object.keys(kgIssues).length === 0) {
  console.log('  No issues found in kho-guidelines HTML/TS files!');
}

console.log('\n=== SCANNING src/content/ebm ===');
const ebmIssues = scanDir('src/content/ebm');
for (const [file, iss] of Object.entries(ebmIssues)) {
  console.log(`\nFile: ${file}`);
  iss.forEach(i => console.log(`  [${i.type}] ${i.match}`));
}
