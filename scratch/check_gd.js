const fs = require('fs');
const path = require('path');

// Check if guidelinesdata.ts or .js exists
const tsPath = path.resolve('src/content/ebm/guidelines/guidelinesdata.ts');
const jsPath = path.resolve('src/content/ebm/guidelines/guidelinesdata.js');

console.log('tsPath exists:', fs.existsSync(tsPath));
console.log('jsPath exists:', fs.existsSync(jsPath));

if (fs.existsSync(tsPath)) {
  const tsContent = fs.readFileSync(tsPath, 'utf8');
  console.log('tsPath length:', tsContent.length);
}

if (fs.existsSync(jsPath)) {
  const jsContent = fs.readFileSync(jsPath, 'utf8');
  console.log('jsPath length:', jsContent.length);
}
