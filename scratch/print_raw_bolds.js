const fs = require('fs');
const path = require('path');
const dir = 'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  const lines = content.split('\n');
  let printedFile = false;
  lines.forEach((l, i) => {
    if (l.includes('**')) {
      if (!printedFile) {
        console.log(`\n=== FILE: ${f} ===`);
        printedFile = true;
      }
      console.log(`Line ${i + 1}: ${l.trim()}`);
    }
  });
});
