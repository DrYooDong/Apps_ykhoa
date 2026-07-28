const fs = require('fs');
const path = require('path');

const dir = 'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.md'));

console.log('Found files:', files.length);

const results = [];

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    if (line.includes('$')) {
      // Find occurrences of $
      // Distinguish JS template literal ${...} from math $...$
      let dollarPositions = [];
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '$') {
          if (line[i+1] === '{') {
            // template literal ${
            continue;
          }
          if (i > 0 && line[i-1] === '\\') {
            // escaped \$
            continue;
          }
          dollarPositions.push(i);
        }
      }
      
      if (dollarPositions.length > 0) {
        results.push({
          file,
          lineNum: index + 1,
          count: dollarPositions.length,
          odd: dollarPositions.length % 2 !== 0,
          line: line.trim()
        });
      }
    }
  });
});

console.log(`Total lines with $ (excluding \${}): ${results.length}`);
const oddLines = results.filter(r => r.odd);
console.log(`Lines with ODD number of $ (potential unmatched formula): ${oddLines.length}`);

console.log('\n--- ODD LINES ---');
oddLines.forEach(r => {
  console.log(`${r.file}:${r.lineNum} -> ${r.line}`);
});

console.log('\n--- ALL LINES WITH $ ---');
results.forEach(r => {
  console.log(`[${r.odd ? 'ODD ' : 'EVEN'}] ${r.file}:${r.lineNum} -> ${r.line}`);
});
