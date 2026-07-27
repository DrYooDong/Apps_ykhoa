const fs = require('fs');
const path = require('path');

function checkHTMLTags(filePath) {
  if (!filePath) {
    console.log("Usage: node scratch/check_tags.js <path_to_html_file>");
    process.exit(1);
  }

  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) {
    console.error("Error: File not found: " + absPath);
    process.exit(1);
  }

  console.log(`Checking HTML tag integrity for: ${absPath}...\n`);
  const rawContent = fs.readFileSync(absPath, 'utf8');

  // Strip script, style, and comments
  let cleanContent = rawContent
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');

  const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
  const tagRegex = /<\/?([a-zA-Z0-9-]+)(?:\s+[^>]*?)?(\/?)>/g;

  const stack = [];
  const errors = [];
  const lines = rawContent.split('\n');

  let match;
  while ((match = tagRegex.exec(cleanContent)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = match[2] === '/' || voidElements.has(tagName);

    if (isSelfClosing) continue;

    // Find approximate line number
    const index = match.index;
    const lineNumber = rawContent.substring(0, index).split('\n').length;

    if (!isClosing) {
      stack.push({ tag: tagName, line: lineNumber, full: fullTag });
    } else {
      if (stack.length === 0) {
        errors.push(`Line ${lineNumber}: Unexpected closing tag </${tagName}> (stack empty)`);
      } else {
        const top = stack[stack.length - 1];
        if (top.tag === tagName) {
          stack.pop();
        } else {
          // Check if top matching exists higher in stack
          let foundIdx = -1;
          for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i].tag === tagName) {
              foundIdx = i;
              break;
            }
          }
          if (foundIdx !== -1) {
            // Unclosed tags between foundIdx and top
            for (let i = stack.length - 1; i > foundIdx; i--) {
              errors.push(`Line ${stack[i].line}: Unclosed tag <${stack[i].tag}> before </${tagName}> at line ${lineNumber}`);
            }
            stack.splice(foundIdx);
          } else {
            errors.push(`Line ${lineNumber}: Mismatched closing tag </${tagName}> (Expected </${top.tag}> opened at line ${top.line})`);
          }
        }
      }
    }
  }

  // Any remaining unclosed critical containers
  stack.forEach(item => {
    if (['div', 'main', 'section', 'article', 'body', 'html', 'header', 'footer'].includes(item.tag)) {
      errors.push(`Line ${item.line}: Unclosed structural tag <${item.tag}> (Tag opened but never closed)`);
    }
  });

  if (errors.length === 0) {
    console.log("✅ HTML Tag Integrity Check PASSED! No unclosed structural tags detected.");
  } else {
    console.log(`❌ Found ${errors.length} tag balance issue(s):`);
    errors.forEach(err => console.log("   " + err));
  }
}

const targetFile = process.argv[2];
checkHTMLTags(targetFile);
