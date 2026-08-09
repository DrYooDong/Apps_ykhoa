const fs = require('fs');
const path = require('path');

const dir = 'd:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = content.split('\n');
  let dollars = [];
  let hashes = [];
  
  lines.forEach((l, idx) => {
    if (l.includes('$') && !l.includes('${') && !l.includes('var(')) {
      dollars.push({ line: idx + 1, text: l.trim() });
    }
    const trimmed = l.trim();
    if (trimmed.startsWith('# ') || trimmed.startsWith('## ') || trimmed.startsWith('### ') || trimmed.startsWith('#### ')) {
      hashes.push({ line: idx + 1, text: l.trim() });
    }
  });

  if (dollars.length > 0 || hashes.length > 0) {
    console.log(`=== ${f} ===`);
    console.log(`  Dollars: ${dollars.length}`);
    dollars.forEach(d => console.log(`    L${d.line}: ${d.text}`));
    console.log(`  Hash Headings: ${hashes.length}`);
    hashes.forEach(h => console.log(`    L${h.line}: ${h.text}`));
  }
});
