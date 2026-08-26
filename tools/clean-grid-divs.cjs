const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/basic-medical/pathophysiology-cases');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const f of files) {
  const full = path.join(dir, f);
  let content = fs.readFileSync(full, 'utf8');
  const original = content;

  // Replace <div class="physio-grid-title">...</div> with #### ...
  content = content.replace(/<div\s+class=["']physio-grid-title["']>([\s\S]*?)<\/div>/gi, '\n#### $1\n');
  
  // Remove <div class="physio-grid"> and <div class="physio-grid-card">
  content = content.replace(/<div\s+class=["']physio-grid["']>/gi, '');
  content = content.replace(/<div\s+class=["']physio-grid-card["']>/gi, '');
  
  // Clean related-links-section
  content = content.replace(/<section\s+class=["']related-links-section["']>[\s\S]*?<\/section>/gi, '');
  content = content.replace(/<section\s+class=["']related-links-section["']>[\s\S]*$/gi, '');

  // Remove any remaining raw unclosed divs
  content = content.replace(/<div\s+class=["'][^"']*["']>/gi, '');
  content = content.replace(/<\/div>/gi, '');

  if (content !== original) {
    fs.writeFileSync(full, content, 'utf8');
    console.log('Cleaned all grid divs in:', f);
  }
}
