const fs = require('fs');

const content = fs.readFileSync('d:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines/2026-byt-u-xo-tu-cung.html', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  const trimmed = line.trim();

  if (trimmed.includes('text{') || trimmed.includes('^circ') || trimmed.includes('\\') || trimmed.includes('[!')) {
    console.log(`L${lineNum}: ${trimmed}`);
  }
});
