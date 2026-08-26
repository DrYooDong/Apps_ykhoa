const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/basic-medical/pathophysiology-cases');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const f of files) {
  const full = path.join(dir, f);
  let content = fs.readFileSync(full, 'utf8');
  const original = content;

  // Remove legacy wrapper divs
  content = content.replace(/<div\s+class=["']physio-content["']>/gi, '');
  content = content.replace(/<div\s+class=["']physio-text-block["']>/gi, '');
  content = content.replace(/<div\s+class=["']main-content-grid["']>/gi, '');
  content = content.replace(/<div\s+class=["']app-container["']>/gi, '');
  content = content.replace(/<div\s+class=["']visual-container["']>/gi, '');
  content = content.replace(/<div\s+class=["']content-wrapper["']>/gi, '');
  content = content.replace(/<div\s+class=["']article-layout["']>/gi, '');
  
  // Remove orphan </div> lines
  content = content.replace(/^\s*<\/div>\s*$/gm, '');

  if (content !== original) {
    fs.writeFileSync(full, content, 'utf8');
    console.log('Stripped legacy divs in:', f);
  }
}
