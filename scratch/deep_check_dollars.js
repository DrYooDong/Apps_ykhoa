const fs = require('fs');
const path = require('path');

const dir = 'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.md'));

console.log(`=== AUDITING ${files.length} FILES IN ${dir} ===\n`);

const summary = [];

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const hasMathJax = content.includes('MathJax') || content.includes('mathjax');
  
  const fileIssues = [];
  const dollarLines = [];
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Check dollar occurrences
    if (line.includes('$')) {
      // Find all dollars not in ${var}
      let unescapedDollars = [];
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '$') {
          if (line[i+1] === '{' || (i > 0 && line[i-1] === '$' && line[i] === '{')) {
            // ${
            continue;
          }
          if (i > 0 && line[i-1] === '\\') {
            // \$
            continue;
          }
          unescapedDollars.push(i);
        }
      }
      
      if (unescapedDollars.length > 0) {
        dollarLines.push({
          lineNum,
          count: unescapedDollars.length,
          odd: unescapedDollars.length % 2 !== 0,
          text: line.trim()
        });
      }
    }

    // Check mixed HTML and Markdown bold/italic syntax issues like <strong>...** or <li>**...
    if (line.includes('<strong>') && line.includes('**')) {
      fileIssues.push({
        lineNum,
        type: 'MIXED_BOLD_TAGS',
        text: line.trim()
      });
    }
  });

  summary.push({
    file,
    hasMathJax,
    dollarCount: dollarLines.length,
    dollarLines,
    fileIssues
  });
});

summary.forEach(s => {
  console.log(`--------------------------------------------------`);
  console.log(`FILE: ${s.file} | MathJax: ${s.hasMathJax ? 'YES' : 'NO'} | Lines with $: ${s.dollarCount} | Other Issues: ${s.fileIssues.length}`);
  
  if (s.fileIssues.length > 0) {
    console.log(`  [HTML/MD Mixed Syntax Issues]:`);
    s.fileIssues.forEach(iss => console.log(`    Line ${iss.lineNum}: ${iss.text}`));
  }
  
  if (s.dollarLines.length > 0) {
    console.log(`  [Dollar Lines]:`);
    s.dollarLines.forEach(dl => {
      console.log(`    Line ${dl.lineNum} (count=${dl.count}${dl.odd ? ' - ODD!' : ''}): ${dl.text}`);
    });
  }
});
