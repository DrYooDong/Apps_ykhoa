const fs = require('fs');
const path = require('path');

const tsPath = path.resolve('src/content/ebm/guidelines/guidelinesdata.ts');
const tsContent = fs.readFileSync(tsPath, 'utf8');

// Extract all studies from tsContent if possible or log structure
console.log('--- guidelinesdata.ts sample ---');
console.log(tsContent.slice(0, 1000));

// Find all `file:` occurrences in guidelinesdata.ts
const fileMatches = [...tsContent.matchAll(/file:\s*['"`]([^'"`]+)['"`]/g)];
console.log(`Total 'file:' in guidelinesdata.ts: ${fileMatches.length}`);
fileMatches.forEach(m => console.log('  TS file:', m[1]));

// Find all id occurrences in guidelinesdata.ts
const idMatches = [...tsContent.matchAll(/id:\s*['"`]([^'"`]+)['"`]/g)];
console.log(`Total 'id:' in guidelinesdata.ts: ${idMatches.length}`);
idMatches.forEach(m => console.log('  TS id:', m[1]));
