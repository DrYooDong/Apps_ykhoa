const fs = require('fs');
const path = require('path');

const guidelinesDir = path.join(__dirname, '../src/content/ebm/guidelines');
const htmlFile = path.join(guidelinesDir, 'guidelines.html');
const html = fs.readFileSync(htmlFile, 'utf8');

// 1. Collect all HTML IDs
const idRegex = /id\s*=\s*"([^"]+)"/gi;
const htmlIds = new Set();
let match;
while ((match = idRegex.exec(html)) !== null) {
  htmlIds.add(match[1]);
}
console.log(`Total HTML IDs in guidelines.html: ${htmlIds.size}`);

// 2. Scan TS/JS files for document.getElementById('...')
const tsFiles = [];
function collectFiles(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      collectFiles(full);
    } else if (item.endsWith('.ts') || item.endsWith('.js')) {
      tsFiles.push(full);
    }
  }
}
collectFiles(guidelinesDir);

const queriedIds = new Map();
const getElRegex = /getElementById\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
const querySelRegex = /querySelector(?:All)?\(\s*['"`]#([a-zA-Z0-9_\-]+)['"`]\s*\)/g;

for (const file of tsFiles) {
  const relPath = path.relative(guidelinesDir, file);
  const content = fs.readFileSync(file, 'utf8');
  
  let qMatch;
  while ((qMatch = getElRegex.exec(content)) !== null) {
    const id = qMatch[1];
    if (!queriedIds.has(id)) queriedIds.set(id, []);
    queriedIds.get(id).push(relPath);
  }
  while ((qMatch = querySelRegex.exec(content)) !== null) {
    const id = qMatch[1];
    if (!queriedIds.has(id)) queriedIds.set(id, []);
    queriedIds.get(id).push(relPath);
  }
}

console.log(`Total Unique IDs queried by JS/TS: ${queriedIds.size}`);

// Check which queried IDs are missing in guidelines.html (or dynamically created)
const missingInHtml = [];
for (const [id, callers] of queriedIds.entries()) {
  if (!htmlIds.has(id)) {
    missingInHtml.push({ id, callers });
  }
}

console.log(`\n--- QUERIED IDs NOT DIRECTLY IN guidelines.html (${missingInHtml.length}) ---`);
missingInHtml.forEach(({ id, callers }) => {
  console.log(`- #${id} (called in: ${Array.from(new Set(callers)).join(', ')})`);
});
