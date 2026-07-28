const fs = require('fs');
const path = require('path');

const dir = 'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  let fileHasDollars = false;
  lines.forEach((line, lineIndex) => {
    if (line.includes('$')) {
      if (!fileHasDollars) {
        console.log('\n=== FILE: ' + file + ' ===');
        fileHasDollars = true;
      }
      console.log('Line ' + (lineIndex + 1) + ': ' + line.trim());
    }
  });
});
