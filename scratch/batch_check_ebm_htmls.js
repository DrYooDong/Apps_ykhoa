const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = walk('d:\\Apps_ykhoa\\src\\content\\ebm').filter(f => f.endsWith('.html'));
const structuralTags = ['div', 'section', 'article', 'main', 'header', 'footer', 'nav', 'aside', 'table', 'tbody', 'thead', 'tr', 'td', 'th', 'ul', 'ol', 'li'];

let failedCount = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const stack = [];
  const tagRegex = /<\/?([a-zA-Z0-9]+)(?:\s+[^>]*)?>/g;
  let match;

  while ((match = tagRegex.exec(content)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();

    if (fullTag.endsWith('/>') || ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName)) {
      continue;
    }

    if (!structuralTags.includes(tagName)) {
      continue;
    }

    const isClosing = fullTag.startsWith('</');

    if (!isClosing) {
      stack.push({ tag: tagName });
    } else {
      if (stack.length === 0) {
        // extra closing tag
      } else {
        const last = stack.pop();
        if (last.tag !== tagName) {
          // mismatched tag
        }
      }
    }
  }

  if (stack.length > 5) {
    console.warn(`[WARN] Large unclosed stack (${stack.length}) in: ${path.relative('d:\\Apps_ykhoa\\src\\content\\ebm', file)}`);
    failedCount++;
  }
});

console.log(`Audited ${htmlFiles.length} HTML files. Anomalies: ${failedCount}`);
