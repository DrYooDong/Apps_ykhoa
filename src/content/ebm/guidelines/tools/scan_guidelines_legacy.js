const fs = require('fs');
const path = require('path');

const dir = 'd:/Apps/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

let legacyLinks = [];
let doubleDashes = [];
let unstyledReferences = [];
let oldCssVars = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');

  // Check legacy relative links
  const links = content.match(/href=["']\.\.\/[^"']+["']/g);
  if (links) {
    legacyLinks.push({ file: f, count: links.length, sample: links.slice(0, 3) });
  }

  // Check double dashes
  if (/(?:\r?\n\s*---\s*){2,}/.test(content)) {
    doubleDashes.push(f);
  }

  // Check old CSS variables (like var(--accent), var(--text), var(--surface-2))
  const oldVars = content.match(/var\(--(?:accent|text|surface-2|border-light|green|orange|tr)\)/g);
  if (oldVars) {
    oldCssVars.push({ file: f, count: oldVars.length, sample: [...new Set(oldVars)] });
  }
});

console.log('Legacy links found in:', legacyLinks.length, 'files');
console.log('Double dashes found in:', doubleDashes.length, 'files');
console.log('Old non-standard CSS vars found in:', oldCssVars.length, 'files');

if (legacyLinks.length > 0) {
  console.log('\nSample legacy links:', legacyLinks.slice(0, 3));
}
if (oldCssVars.length > 0) {
  console.log('\nSample old vars:', oldCssVars.slice(0, 3));
}
