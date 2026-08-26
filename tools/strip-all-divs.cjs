const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/basic-medical/pathophysiology-cases');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const f of files) {
  const full = path.join(dir, f);
  let content = fs.readFileSync(full, 'utf8');
  const original = content;

  // Replace <div class="key-concept"[^>]*> with ###
  content = content.replace(/<div\s+class=["']key-concept["'][^>]*>\s*([⚡💀🔍🔥❄️]?\s*<strong>([\s\S]*?)<\/strong>)?/gi, (match, p1, p2) => {
    return p2 ? `\n### ${p2}\n` : '\n';
  });

  // Strip all other arbitrary <div ...> and </div>
  content = content.replace(/<div[^>]*>/gi, '');
  content = content.replace(/<\/div>/gi, '');

  if (content !== original) {
    fs.writeFileSync(full, content, 'utf8');
    console.log('Stripped all divs in:', f);
  }
}
