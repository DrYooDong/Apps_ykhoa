const fs = require('fs');
const file = 'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases/slb-ccbs-lao.html';
const content = fs.readFileSync(file, 'utf-8');
const lines = content.split('\n');

let found = 0;
lines.forEach((l, i) => {
  const cleaned = l.replace(/\$\{[^}]+\}/g, '');
  if (cleaned.includes('$')) {
    console.log(`Line ${i + 1}: ${l.trim()}`);
    found++;
  }
});
console.log('Dollar count in slb-ccbs-lao.html:', found);
