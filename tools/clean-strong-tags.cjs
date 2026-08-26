const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content');

function processDir(curr) {
  const files = fs.readdirSync(curr);
  for (const f of files) {
    const full = path.join(curr, f);
    if (fs.statSync(full).isDirectory()) {
      processDir(full);
    } else if (f.endsWith('.mdx')) {
      let content = fs.readFileSync(full, 'utf8');
      const original = content;

      // Replace all remaining <strong> and </strong>
      content = content.replace(/<strong>/gi, '**');
      content = content.replace(/<\/strong>/gi, '**');

      // Clean multiple consecutive asterisks like ****text**** -> **text**
      content = content.replace(/\*{3,}/g, '**');

      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8');
        console.log('Fixed strong tags in:', full);
      }
    }
  }
}

processDir(dir);
