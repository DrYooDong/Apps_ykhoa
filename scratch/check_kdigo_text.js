const fs = require('fs');

const content = fs.readFileSync('d:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines/2024-kdigo-ckd.html', 'utf8');
const lines = content.split('\n');

console.log('--- CHECKING DOLLARS ---');
lines.forEach((line, idx) => {
  if (line.includes('$')) {
    // Check if it's inside script tag or template literal ${
    if (!line.includes('${') && !line.includes('var(')) {
      console.log(`${idx + 1}: ${line.trim()}`);
    }
  }
});

console.log('\n--- CHECKING HASH SYMBOLS ---');
lines.forEach((line, idx) => {
  const cleaned = line.replace(/#[0-9a-fA-F]{3,8}/g, '').replace(/href="#[^"]*"/g, '');
  if (cleaned.includes('#')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
