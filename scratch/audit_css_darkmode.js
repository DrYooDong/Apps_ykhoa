const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

const contentDir = 'd:\\Apps_ykhoa\\src\\content';
const cssFiles = walk(contentDir).filter(f => f.endsWith('.css'));

console.log(`=== AUDITING 27 CSS FILES FOR DARK MODE & COLOR TOKENS ===\n`);

cssFiles.forEach(cf => {
  const content = fs.readFileSync(cf, 'utf8');
  const rel = path.relative(contentDir, cf);
  const hasDarkTheme = content.includes('[data-theme="dark"]') || content.includes('data-theme=dark') || content.includes('@media (prefers-color-scheme: dark)');
  const hasTokens = content.includes('var(--color-') || content.includes('var(--bg') || content.includes('var(--surface') || content.includes('var(--text');

  console.log(`File: ${rel}`);
  console.log(`  - Has Dark Theme rules: ${hasDarkTheme ? 'YES' : 'NO'}`);
  console.log(`  - Uses CSS Tokens: ${hasTokens ? 'YES' : 'NO'}`);
});
