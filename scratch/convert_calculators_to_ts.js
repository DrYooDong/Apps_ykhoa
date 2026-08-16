const cp = require('child_process');
const fs = require('fs');
const path = require('path');

// 1. Get all original calculator html files from git
const files = cp.execSync('git ls-tree -r --name-only HEAD~1 src/content/calculators')
  .toString()
  .split('\n')
  .map(s => s.trim())
  .filter(f => f.endsWith('.html') && f !== 'src/content/calculators/cong-cu.html');

console.log(`Found ${files.length} calculator HTML files in git HEAD~1`);

// 2. We will create a rich typescript registry: src/content/calculators/tools-rich-registry.ts
// which stores the full HTML layout, CSS styles, and auto-hydration script for each tool.
const toolRegistryEntries = [];

files.forEach(filePath => {
  const rawHtml = cp.execSync(`git show HEAD~1:${filePath}`).toString();
  const slug = path.basename(filePath, '.html');
  const subspecialty = filePath.split('/')[3]; // e.g. emergency, cardiology, renal...

  // Extract title
  const titleMatch = rawHtml.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/– CliniPortal.*$/i, '').trim() : slug;

  // Extract styles
  const styleMatches = rawHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  const styles = styleMatches.map(s => s.replace(/<\/?style[^>]*>/gi, '').trim()).join('\n\n');

  // Extract scripts (both inline and companion scripts)
  const scriptMatches = rawHtml.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi) || [];
  const inlineScripts = scriptMatches.map(s => s.replace(/<\/?script[^>]*>/gi, '').trim()).join('\n\n');

  // Extract main HTML body (exclude header placeholder and footer placeholder)
  let bodyHtml = rawHtml;
  
  // Strip head, doctype
  const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    bodyHtml = bodyMatch[1];
  }

  // Remove header/footer placeholders and external script tags
  bodyHtml = bodyHtml
    .replace(/<div id="header-placeholder"[\s\S]*?<\/div>/gi, '')
    .replace(/<div id="footer-placeholder"[\s\S]*?<\/div>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .trim();

  // Create individual standalone TS view file for the tool!
  const tsViewFileName = path.join(path.dirname(filePath), `${slug}-view.ts`);
  
  const tsViewContent = `/**
 * CliniPortal — ${title} (TypeScript Native View)
 * Auto-generated from rich original interactive tool
 */

export const ${slug.replace(/[^a-zA-Z0-9]/g, '_')}_STYLES = ${JSON.stringify(styles)};

export const ${slug.replace(/[^a-zA-Z0-9]/g, '_')}_TEMPLATE = ${JSON.stringify(bodyHtml)};

export function render_${slug.replace(/[^a-zA-Z0-9]/g, '_')}_View(): string {
  return \`
    <div class="calculator-rich-container animate-fade-in" style="width:100%; max-width:1440px; margin:0 auto; padding: 1rem;">
      <style>
        \${${slug.replace(/[^a-zA-Z0-9]/g, '_')}_STYLES}
      </style>
      \${${slug.replace(/[^a-zA-Z0-9]/g, '_')}_TEMPLATE}
    </div>
  \`;
}

export function hydrate_${slug.replace(/[^a-zA-Z0-9]/g, '_')}_Scripts(): void {
  try {
    ${inlineScripts ? inlineScripts : '// Script logic imported from companion TS engine'}
  } catch (err) {
    console.error('Hydration error for ${slug}:', err);
  }
}
`;

  fs.writeFileSync(tsViewFileName, tsViewContent, 'utf8');
  console.log(`Generated: ${tsViewFileName} (${bodyHtml.length} bytes template)`);

  toolRegistryEntries.push({
    slug,
    title,
    subspecialty,
    filePath,
    viewExport: `render_${slug.replace(/[^a-zA-Z0-9]/g, '_')}_View`,
    hydrateExport: `hydrate_${slug.replace(/[^a-zA-Z0-9]/g, '_')}_Scripts`,
    importPath: `./${subspecialty}/${slug}-view`
  });
});

console.log(`Successfully generated ${toolRegistryEntries.length} rich TypeScript calculator views!`);
