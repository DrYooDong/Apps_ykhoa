const fs = require('fs');

const content = fs.readFileSync('d:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines/2024-kdigo-ckd.html', 'utf8');
const lines = content.split('\n');

console.log('--- ISSUES AUDIT IN 2024-kdigo-ckd.html ---');

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  const trimmed = line.trim();

  // 1. Check dollar signs
  if (trimmed.includes('$') && !trimmed.includes('${') && !trimmed.includes('var(')) {
    console.log(`L${lineNum} [DOLLAR]: ${trimmed}`);
  }

  // 2. Check hash headings or hash tags
  if (trimmed.includes('#')) {
    // filter out hex color codes #123456 and href="#id"
    const noColorOrHref = trimmed.replace(/#[0-9a-fA-F]{3,8}/g, '').replace(/href="#[^"]*"/g, '');
    if (noColorOrHref.includes('#')) {
      console.log(`L${lineNum} [HASH]: ${trimmed}`);
    }
  }

  // 3. Check markdown bold/italic tags like **word** or *word* inside text
  if (/\*\*[^*]+\*\*/.test(trimmed) || /(?<![a-zA-Z0-9])\*[^*]+\*(?![a-zA-Z0-9])/.test(trimmed)) {
    console.log(`L${lineNum} [MARKDOWN_AST]: ${trimmed}`);
  }
});
