const fs = require('fs');
const path = require('path');
const dir = 'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const stats = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  const strongMatches = content.match(/<strong>|<b>|\*\*/g) || [];
  const text = content.replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  const ratio = ((strongMatches.length / words) * 100).toFixed(2);
  stats.push({ file: f, bolds: strongMatches.length, words, ratio: parseFloat(ratio) });
});

stats.sort((a, b) => b.ratio - a.ratio);

stats.forEach(s => {
  console.log(`${s.file}: ${s.bolds} bolds, ${s.words} words -> ${s.ratio}% bold tags ratio`);
});
