const fs = require('fs');
const path = require('path');

const dir = 'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.md'));

console.log("=== ALL LINES CONTAINING DOLLAR SIGNS IN PATHOPHYSIOLOGY CASES ===\n");

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    if (line.includes('$')) {
      // ignore ${var}
      const cleaned = line.replace(/\$\{[^}]+\}/g, '');
      if (cleaned.includes('$')) {
        console.log(`${file}:${index + 1}`);
        console.log(`   ${line.trim()}\n`);
      }
    }
  });
});
