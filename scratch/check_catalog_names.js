const fs = require('fs');
const path = require('path');

const physioDir = path.join(__dirname, '../src/content/pathophysiology/physiology');
const parts = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7'];

const actualCatalog = {};

parts.forEach(part => {
  const partDir = path.join(physioDir, part);
  if (fs.existsSync(partDir)) {
    actualCatalog[part] = fs.readdirSync(partDir).filter(f => f.endsWith('.html'));
  }
});

console.log('Actual files on disk:\n', JSON.stringify(actualCatalog, null, 4));
