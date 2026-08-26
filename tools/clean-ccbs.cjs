const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/basic-medical/pathophysiology-cases');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const f of files) {
  const full = path.join(dir, f);
  let content = fs.readFileSync(full, 'utf8');
  const original = content;
  
  // Fix <hr /> class='...'> -> <hr class='...' />
  content = content.replace(/<hr\s*\/>\s*class=("[^"]*"|'[^']*')>/gi, '<hr class=$1 />');
  content = content.replace(/<hr\s+class=("[^"]*"|'[^']*')>/gi, '<hr class=$1 />');
  
  // Fix <div class='table-responsive'> inside <PathoAlert> without closing </div> before </PathoAlert>
  content = content.replace(/(<div\s+class=["']table-responsive["']>[\s\S]*?<\/table>)\s*(<\/PathoAlert>)/gi, '$1\n</div>\n$2');
  
  // Remove orphan </div> tags
  content = content.replace(/(<\/PathoAlert>)\s*<\/div>\s*<\/div>\s*<\/div>/gi, '$1');
  content = content.replace(/(<\/PathoAlert>)\s*<\/div>\s*<\/div>/gi, '$1');
  content = content.replace(/(<\/PathoAlert>)\s*<\/div>/gi, '$1');

  // Fix className -> class in HTML tables
  content = content.replace(/className=/g, 'class=');
  
  if (content !== original) {
    fs.writeFileSync(full, content, 'utf8');
    console.log('Fixed HTML tags in:', f);
  }
}
