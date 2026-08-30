const fs = require('fs');
const path = require('path');

const dir = 'd:/Apps/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

console.log(`Processing ${files.length} guideline MDX files...`);

let processedCount = 0;
let linkFixCount = 0;

files.forEach(fileName => {
  const filePath = path.join(dir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Normalize Legacy Relative URLs -> SPA Hash Routes
  content = content
    .replace(/href=["'](?:\.\.\/)+calculators\/[^"']*["']/g, 'href="#/calculators"')
    .replace(/href=["'](?:\.\.\/)+approaches\/[^"']*["']/g, 'href="#/approaches"')
    .replace(/href=["'](?:\.\.\/)+pharmacology\/[^"']*["']/g, 'href="#/pharmacology"')
    .replace(/href=["'](?:\.\.\/)+skills\/[^"']*["']/g, 'href="#/skills"')
    .replace(/href=["'](?:\.\.\/)+ebm\/[^"']*["']/g, 'href="#/ebm/kho-guidelines"')
    .replace(/href=["'](?:\.\.\/)+basic-medical\/[^"']*["']/g, 'href="#/basic-medical"')
    .replace(/href=["'](?:\.\.\/)+docspace\/[^"']*["']/g, 'href="#/docspace"')
    .replace(/href=["'](?:\.\.\/)+index\.html#\/docspace["']/g, 'href="#/docspace"')
    .replace(/href=["'](?:\.\.\/)+kho-guidelines(?:\/index\.html)?["']/g, 'href="#/ebm/kho-guidelines"')
    .replace(/href=["'](?:\.\.\/)+[^"']*["']/g, 'href="#/ebm/kho-guidelines"')
    .replace(/href=["']guidelines\.html["']/g, 'href="#/ebm/kho-guidelines"')
    .replace(/href=["']index\.html["']/g, 'href="#/ebm/kho-guidelines"');

  if (content !== original) linkFixCount++;

  // 2. Normalize Legacy CSS Variables to CliniPortal Design Tokens
  content = content
    .replace(/var\(--accent\)/g, 'var(--color-primary, #0284c7)')
    .replace(/var\(--text\)/g, 'var(--color-text, #0f172a)')
    .replace(/var\(--text-muted\)/g, 'var(--color-text-muted, #64748b)')
    .replace(/var\(--surface-2\)/g, 'var(--color-surface-2, #f8fafc)')
    .replace(/var\(--surface-3\)/g, 'var(--color-surface-3, #f1f5f9)')
    .replace(/var\(--border-light\)/g, 'var(--color-border, #cbd5e1)')
    .replace(/var\(--border\)/g, 'var(--color-border, #cbd5e1)')
    .replace(/var\(--green\)/g, 'var(--color-success, #10b981)')
    .replace(/var\(--green-bg\)/g, 'rgba(16, 185, 129, 0.08)')
    .replace(/var\(--orange\)/g, 'var(--color-warning, #f59e0b)')
    .replace(/var\(--orange-bg\)/g, 'rgba(245, 158, 11, 0.08)')
    .replace(/var\(--orange-light\)/g, 'rgba(245, 158, 11, 0.25)')
    .replace(/var\(--danger\)/g, 'var(--color-danger, #ef4444)')
    .replace(/var\(--danger-bg\)/g, 'rgba(239, 68, 68, 0.08)')
    .replace(/var\(--teal\)/g, 'var(--color-teal, #0d9488)')
    .replace(/var\(--teal-bg\)/g, 'rgba(13, 148, 136, 0.08)')
    .replace(/var\(--purple\)/g, 'var(--color-purple, #8b5cf6)')
    .replace(/var\(--purple-bg\)/g, 'rgba(139, 92, 246, 0.08)')
    .replace(/var\(--tr\)/g, 'var(--transition-fast, 0.2s ease)');

  // 3. Normalize multiple consecutive horizontal rules
  content = content.replace(/(?:\r?\n\s*---\s*){2,}/g, '\n\n---\n\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    processedCount++;
  }
});

console.log(`\n========================================`);
console.log(`Standardization Complete:`);
console.log(`- Files updated: ${processedCount}/${files.length}`);
console.log(`- Files with link fixes: ${linkFixCount}`);
console.log(`========================================\n`);
