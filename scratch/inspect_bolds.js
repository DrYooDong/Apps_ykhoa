const fs = require('fs');
const path = require('path');
const dir = 'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  const lines = content.split('\n');
  
  lines.forEach((line, i) => {
    // find raw ** in html
    if (line.includes('**')) {
      console.log(`[RAW **] ${f}:${i + 1} -> ${line.trim()}`);
    }
    
    // find long strong tags > 40 chars
    const strongs = line.match(/<strong>(.*?)<\/strong>/g) || [];
    strongs.forEach(s => {
      const inner = s.replace(/<\/?strong>/g, '');
      if (inner.length > 50) {
        console.log(`[LONG BOLD] ${f}:${i + 1} (${inner.length} chars) -> ${inner}`);
      }
    });

    // find lines with >3 strong tags
    if (strongs.length >= 4) {
      console.log(`[MANY BOLDS (${strongs.length})] ${f}:${i + 1} -> ${line.trim()}`);
    }
  });
});
