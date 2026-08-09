const fs = require('fs');

const filePath = 'd:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines/2026-byt-u-xo-tu-cung.html';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log('=== AUDITING 2026-byt-u-xo-tu-cung.html ===');

lines.forEach((l, idx) => {
  const lineNum = idx + 1;
  const trimmed = l.trim();

  if (trimmed.includes('[!')) {
    console.log(`L${lineNum} [MARKDOWN_ALERT]: ${trimmed}`);
  }
  if (trimmed.includes('text{') || trimmed.includes('^circ') || trimmed.includes('\\')) {
    console.log(`L${lineNum} [LATEX_ARTIFACT]: ${trimmed}`);
  }
  if (trimmed.startsWith('> ') || trimmed.startsWith('>')) {
    console.log(`L${lineNum} [BLOCKQUOTE_RAW]: ${trimmed}`);
  }
  if (trimmed.includes('$')) {
    console.log(`L${lineNum} [DOLLAR]: ${trimmed}`);
  }
});
