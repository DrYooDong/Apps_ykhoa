const fs = require('fs');

const content = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/vault-reader-pro.ts', 'utf8');
const lines = content.split('\n');

let count = 0;
lines.forEach((l, idx) => {
  const b = (l.match(/`/g) || []).length;
  count += b;
  if (l.includes('`') && l.includes('${title}') && l.includes('md')) {
    console.log(`Line ${idx + 1}: ${l}`);
  }
});
console.log(`Total backticks: ${count}`);
