/**
 * CliniPortal 2.0 — MDX JSX Compatibility Sanitizer for Research Vault
 * Path: src/content/ebm/research/tools/sanitize_research_mdx.js
 *
 * Cleans legacy HTML comments, comment banner '====' sequences, double-escaped entities,
 * and unescaped '<digit' sequences outside YAML frontmatter & <script>/<style> blocks.
 */

const fs = require('fs');
const path = require('path');

const KHO_DIR = path.resolve(__dirname, '../kho-nghien-cuu');

function sanitizeBody(body) {
  // Protect <script> and <style> blocks
  const stash = [];
  let text = body.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, (m) => {
    const idx = stash.length;
    stash.push(m);
    return `__RES_STASH_${idx}__`;
  });

  // 1. Convert HTML comments <!-- ... --> to JSX comments {/* ... */}
  text = text.replace(/<!--([\s\S]*?)-->/g, (_m, inner) => {
    const safeInner = inner.replace(/\*\//g, '* /').replace(/={2,}/g, '──');
    return `{/* ${safeInner.trim()} */}`;
  });

  // 2. Clean '====' inside existing JSX comments {/* ==== ... ==== */}
  text = text.replace(/\{\/\*([\s\S]*?)\*\/\}/g, (_m, inner) => {
    return `{/*${inner.replace(/={2,}/g, '──')}*/}`;
  });

  // 3. Clean any remaining Obsidian highlight ==text== outside tags/attributes
  text = text.replace(/==([^=\r\n<>]+)==/g, '<mark>$1</mark>');

  // 4. Fix double-escaped HTML entities (&amp;nbsp;, &amp;mu;, &amp;bull;, &amp;lt;, etc.)
  text = text.replace(/&amp;([a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);/g, '&$1;');

  // 5. Escape bare '<' followed by optional spaces and a digit (e.g. <0.001, < 90, < 0.8) outside math $...$
  text = text.split('\n').map((line) => {
    if (line.includes('$')) return line;
    return line.replace(/<(\s*\d)/g, '&lt;$1');
  }).join('\n');

  // 6. Prevent trailing footnote '*' before </td> from opening cross-cell Markdown emphasis
  text = text.replace(/\)\*(?:&#8203;)?<\/td>/g, ')&#42;</td>');

  // 7. Normalize <li> symmetry for MDX v3 AST parser:
  text = text.replace(/<li>\r?\n[ \t]*(?!<(?:div|ul|ol|p|table)\b)/g, '<li>');
  text = text.replace(/([^\s>]|<\/(?:strong|em|code|span|a|i|small|sup|sub)>)\r?\n[ \t]*<\/li>/g, '$1</li>');

  // Restore stashed blocks
  stash.forEach((orig, idx) => {
    text = text.split(`__RES_STASH_${idx}__`).join(orig);
  });

  return text;
}

function run() {
  const files = fs.readdirSync(KHO_DIR).filter((f) => f.endsWith('.mdx'));
  let updated = 0;

  for (const file of files) {
    const fp = path.join(KHO_DIR, file);
    const raw = fs.readFileSync(fp, 'utf8');
    const fmMatch = raw.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n?)([\s\S]*)$/);
    if (!fmMatch) continue;

    const cleanedBody = sanitizeBody(fmMatch[2]);
    const nextRaw = fmMatch[1] + cleanedBody;
    if (nextRaw !== raw) {
      fs.writeFileSync(fp, nextRaw, 'utf8');
      updated++;
    }
  }

  console.log(`[Sanitize Research MDX] Cleaned ${updated}/${files.length} MDX files.`);
}

run();
