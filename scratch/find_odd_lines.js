const fs = require('fs');

const content = fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/vault-reader-pro.ts', 'utf8');
const lines = content.split('\n');

let inTemplate = false;
lines.forEach((l, idx) => {
  const matches = l.match(/`/g) || [];
  if (matches.length % 2 !== 0) {
    console.log(`Line ${idx + 1} (toggle template): ${l}`);
  }
});
