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

const baseDir = 'd:\\Apps_ykhoa\\src\\content\\calculators';
const htmlFiles = walk(baseDir).filter(f => f.endsWith('.html'));

const voidTags = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

let issues = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Simple check for unclosed basic tags like div, main, body, html
  const stack = [];
  const tagRegex = /<\/?([a-zA-Z0-9-]+)(?:\s+[^>]*?)?(\/?)>/g;
  let match;
  let fileIssues = 0;

  // Clean script and style contents
  let cleanContent = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                            .replace(/<!--[\s\S]*?-->/g, '');

  while ((match = tagRegex.exec(cleanContent)) !== null) {
    const isClosing = match[0].startsWith('</');
    const tagName = match[1].toLowerCase();
    const isSelfClosing = match[2] === '/' || voidTags.has(tagName);

    if (voidTags.has(tagName) || isSelfClosing) {
      continue;
    }

    if (isClosing) {
      if (stack.length === 0) {
        // fileIssues++;
      } else {
        const top = stack.pop();
        if (top !== tagName) {
          fileIssues++;
        }
      }
    } else {
      stack.push(tagName);
    }
  }

  if (fileIssues > 0 || stack.length > 0) {
    console.log(`⚠️ Potential tag imbalance in: ${path.relative(baseDir, file)} (Unclosed: ${stack.join(', ')})`);
    issues++;
  }
});

console.log(`Audited ${htmlFiles.length} HTML files. Issues found: ${issues}`);
