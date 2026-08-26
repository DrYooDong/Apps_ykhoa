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

      // Fix <strong>...** -> **...**
      content = content.replace(/<strong>([\s\S]*?)\*\*/gi, '**$1**');
      // Fix **...</strong> -> **...**
      content = content.replace(/\*\*([\s\S]*?)<\/strong>/gi, '**$1**');
      // Fix <strong>...</strong> -> **...**
      content = content.replace(/<strong>([\s\S]*?)<\/strong>/gi, '**$1**');

      // Fix <em>...* -> *$1*
      content = content.replace(/<em>([\s\S]*?)\*/gi, '*$1*');
      // Fix *...</em> -> *$1*
      content = content.replace(/\*([\s\S]*?)<\/em>/gi, '*$1*');
      // Fix <em>...</em> -> *$1*
      content = content.replace(/<em>([\s\S]*?)<\/em>/gi, '*$1*');

      // Fix unclosed <span> or </span class=...>
      content = content.replace(/<span\s+class=["'][^"']*["']>([\s\S]*?)<\/span>/gi, '$1');
      content = content.replace(/<\/?span[^>]*>/gi, '');

      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8');
        console.log('Normalized markup in:', full);
      }
    }
  }
}

processDir(dir);
