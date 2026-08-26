const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/basic-medical/pathophysiology-cases');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const f of files) {
  const full = path.join(dir, f);
  let content = fs.readFileSync(full, 'utf8');
  const original = content;

  // Fix unclosed <div class="related-card-content"> inside <a>
  content = content.replace(/(<div\s+class=["']related-card-content["']>[\s\S]*?)(<i\s+class=[^>]*><\/i>\s*<\/a>)/gi, '$1</div>\n$2');
  
  // Also close </section> if <section ...> exists without clean closing
  content = content.replace(/(<section\s+class=["']related-links-section["']>[\s\S]*?)(<\/section>)?\s*$/gi, (match, p1) => {
    // If doesn't end with </section>, add it
    if (!match.includes('</section>')) {
      return p1 + '\n</div>\n</section>\n';
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(full, content, 'utf8');
    console.log('Fixed related-links in:', f);
  }
}
