const fs = require('fs');
const path = require('path');
const dir = 'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

console.log(`=== AUDITING BOLDING IN ALL ${files.length} FILES ===\n`);

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  const lines = content.split('\n');
  
  let rawMDCount = 0;
  let strongCount = 0;
  
  lines.forEach((line, i) => {
    // count **
    const mdMatches = line.match(/\*\*(.*?)\*\*/g) || [];
    rawMDCount += mdMatches.length;
    
    // count <strong>
    const strongMatches = line.match(/<strong>(.*?)<\/strong>/g) || [];
    strongCount += strongMatches.length;
  });
  
  if (rawMDCount > 0 || strongCount > 15) {
    console.log(`${f}: ${rawMDCount} raw ** tags, ${strongCount} <strong> tags`);
  }
});
