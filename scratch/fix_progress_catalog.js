const fs = require('fs');
const path = require('path');

const progressFile = path.join(__dirname, '../src/content/pathophysiology/js/physio-progress.js');
let content = fs.readFileSync(progressFile, 'utf8');

const physioDir = path.join(__dirname, '../src/content/pathophysiology/physiology');
const parts = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7'];

const newCatalogObj = {};
parts.forEach(p => {
  const pDir = path.join(physioDir, p);
  if (fs.existsSync(pDir)) {
    newCatalogObj[p] = fs.readdirSync(pDir).filter(f => f.endsWith('.html'));
  }
});

const newCatalogCode = `    const LESSON_CATALOG = ${JSON.stringify(newCatalogObj, null, 8)};`;

// Replace LESSON_CATALOG block
const catalogRegex = /const LESSON_CATALOG = \{[\s\S]*?\};/;
if (catalogRegex.test(content)) {
  content = content.replace(catalogRegex, newCatalogCode);
  fs.writeFileSync(progressFile, content, 'utf8');
  console.log(`Updated LESSON_CATALOG in ${progressFile}`);
} else {
  console.error('LESSON_CATALOG pattern not found in physio-progress.js');
}
