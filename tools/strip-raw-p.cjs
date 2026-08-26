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

      // Remove raw <p> and </p> tags
      content = content.replace(/<\/?p[^>]*>/gi, '');

      // Remove multiple consecutive <br />
      content = content.replace(/(<br\s*\/>\s*){2,}/gi, '\n\n');

      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8');
        console.log('Stripped raw <p> tags in:', full);
      }
    }
  }
}

processDir(dir);
