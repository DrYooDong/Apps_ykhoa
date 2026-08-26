const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/basic-medical/pathophysiology-cases');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const f of files) {
  const full = path.join(dir, f);
  let content = fs.readFileSync(full, 'utf8');
  const original = content;

  // Convert <div class="clinical-note-box" ...><h4>...</h4><p>...</p> -> <PathoAlert type="pearl" title="...">
  content = content.replace(/<div\s+class=["']clinical-note-box["'][^>]*>\s*<h4>([\s\S]*?)<\/h4>\s*<p>([\s\S]*?)<\/p>/gi, 
    '<PathoAlert type="pearl" title="$1">\n$2\n</PathoAlert>'
  );

  // Convert any remaining <div class="clinical-note-box"[^>]*> to <div> and ensure closed
  content = content.replace(/<div\s+class=["']clinical-note-box["'][^>]*>/gi, '<div class="callout callout-pearl">');

  // Remove trailing orphan opened <div class="callout ..."> that don't close
  // Check matching <div> and </div>
  const openDivs = (content.match(/<div[^>]*>/gi) || []).length;
  const closeDivs = (content.match(/<\/div>/gi) || []).length;
  if (openDivs > closeDivs) {
    content += '\n' + '</div>\n'.repeat(openDivs - closeDivs);
  }

  if (content !== original) {
    fs.writeFileSync(full, content, 'utf8');
    console.log('Fixed clinical-note-box in:', f);
  }
}
