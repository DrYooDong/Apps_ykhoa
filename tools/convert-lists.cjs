const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/basic-medical/pathophysiology-cases');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const f of files) {
  const full = path.join(dir, f);
  let content = fs.readFileSync(full, 'utf8');
  const original = content;

  // Convert <ul class="..."> and <ol class="..."> to standard markdown lists where possible
  // Replace <ul ...> and </ul>
  content = content.replace(/<ul\s+class=[^>]*>/gi, '');
  content = content.replace(/<\/ul>/gi, '');
  content = content.replace(/<ol\s+class=[^>]*>/gi, '');
  content = content.replace(/<\/ol>/gi, '');
  
  // Replace <li> with -
  content = content.replace(/<li>([\s\S]*?)<\/li>/gi, (match, p1) => {
    return '\n- ' + p1.trim() + '\n';
  });

  // Remove table-responsive wrappers
  content = content.replace(/<div\s+class=["']table-responsive["']>/gi, '<div class="clinical-table-wrapper">');

  if (content !== original) {
    fs.writeFileSync(full, content, 'utf8');
    console.log('Converted lists to Markdown in:', f);
  }
}
