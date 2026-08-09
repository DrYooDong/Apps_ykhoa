const fs = require('fs');
const path = require('path');

const dir = 'd:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = content.split('\n');
  let alerts = [];
  let latex = [];
  let rawQuotes = [];

  lines.forEach((l, idx) => {
    const lineNum = idx + 1;
    const trimmed = l.trim();
    if (trimmed.includes('[!')) {
      alerts.push({ lineNum, text: trimmed });
    }
    if (trimmed.includes('text{') || trimmed.includes('^circ')) {
      latex.push({ lineNum, text: trimmed });
    }
    if (trimmed.startsWith('> ') || (trimmed.startsWith('>') && !trimmed.startsWith('><') && !trimmed.startsWith('></') && !trimmed.includes('<'))) {
      rawQuotes.push({ lineNum, text: trimmed });
    }
  });

  if (alerts.length > 0 || latex.length > 0 || rawQuotes.length > 0) {
    console.log(`=== ${f} ===`);
    if (alerts.length > 0) console.log(`  Alerts ([!]): ${alerts.length}`);
    alerts.forEach(a => console.log(`    L${a.lineNum}: ${a.text}`));
    if (latex.length > 0) console.log(`  LaTeX Artifacts: ${latex.length}`);
    latex.forEach(l => console.log(`    L${l.lineNum}: ${l.text}`));
    if (rawQuotes.length > 0) console.log(`  Raw Blockquotes: ${rawQuotes.length}`);
    rawQuotes.forEach(q => console.log(`    L${q.lineNum}: ${q.text}`));
  }
});
