const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const examFile = path.resolve(rootDir, 'src/content/pathophysiology/quiz/exam-bank-data.ts');
let content = fs.readFileSync(examFile, 'utf8');

// Build map of all current vault files
const allVaultFiles = [];
function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== '.obsidian') walk(p);
    } else if (f.endsWith('.md')) {
      allVaultFiles.push(path.relative(rootDir, p).replace(/\\/g, '/'));
    }
  });
}
walk(path.resolve(rootDir, 'knowledge-vault'));

console.log(`Total vault MD files: ${allVaultFiles.length}`);

const sourceFileRegex = /sourceFile:\s*['"]([^'"]+)['"]/g;
let match;
const replacements = [];

while ((match = sourceFileRegex.exec(content)) !== null) {
  const oldPath = match[1];
  const oldBase = path.basename(oldPath, '.md').toLowerCase();
  
  // Find best match in allVaultFiles
  let bestMatch = allVaultFiles.find(vf => {
    const vfBase = path.basename(vf, '.md').toLowerCase();
    return vfBase.includes(oldBase) || oldBase.includes(vfBase);
  });

  if (!bestMatch) {
    // Try keyword matching
    const keywords = oldBase.replace(/[\d\-_]/g, ' ').split(/\s+/).filter(w => w.length > 2);
    bestMatch = allVaultFiles.find(vf => {
      const vfLower = vf.toLowerCase();
      return keywords.every(kw => vfLower.includes(kw));
    });
  }

  if (bestMatch) {
    console.log(`[MATCH] ${oldPath} \n  -> ${bestMatch}\n`);
    replacements.push({ old: oldPath, newPath: bestMatch });
  } else {
    console.log(`[NO MATCH] ${oldPath}`);
  }
}
