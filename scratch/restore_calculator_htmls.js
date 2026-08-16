const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = cp.execSync('git ls-tree -r --name-only HEAD~2 src/content/calculators', { cwd: rootDir })
  .toString()
  .split('\n')
  .map(s => s.trim())
  .filter(s => s.endsWith('.html'));

console.log('Restoring', files.length, 'HTML files...');

files.forEach(file => {
  const content = cp.execSync(`git show HEAD~2:${file}`, { cwd: rootDir });
  const localPath = path.join(rootDir, file);
  fs.mkdirSync(path.dirname(localPath), { recursive: true });
  fs.writeFileSync(localPath, content);
  
  // Also copy to pages/Công cụ/
  const relPath = file.replace(/^src\/content\/calculators\//, '');
  const pagesPath = path.join(rootDir, 'pages', 'Công cụ', relPath);
  fs.mkdirSync(path.dirname(pagesPath), { recursive: true });
  fs.writeFileSync(pagesPath, content);
});

console.log('Restoration completed successfully! Restored ' + files.length + ' files to src/content/calculators/ and pages/Công cụ/');
