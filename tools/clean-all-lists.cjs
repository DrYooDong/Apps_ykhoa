const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/basic-medical/pathophysiology-cases');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const f of files) {
  const full = path.join(dir, f);
  let content = fs.readFileSync(full, 'utf8');
  const original = content;

  // Remove all remaining <ul>, </ul>, <ol>, </ol>
  content = content.replace(/<\/?ul[^>]*>/gi, '');
  content = content.replace(/<\/?ol[^>]*>/gi, '');
  
  // Replace any leftover <li> tags with markdown dashes
  content = content.replace(/<li>([\s\S]*?)<\/li>/gi, (match, p1) => {
    return '\n- ' + p1.trim() + '\n';
  });
  content = content.replace(/<\/?li[^>]*>/gi, '');

  if (content !== original) {
    fs.writeFileSync(full, content, 'utf8');
    console.log('Cleaned all list tags in:', f);
  }
}
