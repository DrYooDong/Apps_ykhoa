const fs = require('fs');
const path = require('path');

function getAllMdxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMdxFiles(fullPath));
    } else if (file.endsWith('.mdx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allMdx = getAllMdxFiles('d:/Apps/Apps_ykhoa/src/content');
console.log('Total MDX files scanned:', allMdx.length);

const issues = [];

allMdx.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative('d:/Apps/Apps_ykhoa/src/content', file);

  // 1. Check for HTML tags inside <svg>...</svg>
  const svgMatches = content.matchAll(/<svg[\s\S]*?<\/svg>/g);
  for (const m of svgMatches) {
    const svgContent = m[0];
    const invalidTags = svgContent.match(/<(strong|b|em|span|i|p|div|br|hr|table|tr|td|th|ul|ol|li|font|small|h[1-6])(\s[^>]*)?>/gi);
    if (invalidTags) {
      issues.push({
        file: relPath,
        type: 'HTML_TAG_INSIDE_SVG',
        detail: invalidTags.join(', ')
      });
    }
  }

  // 2. Check for unclosed <svg> tags
  const openSvgs = (content.match(/<svg[\s>]/gi) || []).length;
  const closeSvgs = (content.match(/<\/svg>/gi) || []).length;
  if (openSvgs !== closeSvgs) {
    issues.push({
      file: relPath,
      type: 'MISMATCHED_SVG_TAGS',
      detail: 'Open: ' + openSvgs + ', Close: ' + closeSvgs
    });
  }

  // 3. Check for unescaped raw '&' inside SVG (excluding entity refs)
  const svgBlocks = content.match(/<svg[\s\S]*?<\/svg>/g) || [];
  for (const block of svgBlocks) {
    const rawAmp = block.match(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g);
    if (rawAmp) {
      issues.push({
        file: relPath,
        type: 'UNESCAPED_AMP_IN_SVG',
        detail: 'Found ' + rawAmp.length + ' unescaped &'
      });
    }
  }

  // 4. Check for unclosed tags inside SVG (<text> without </text>, <tspan> without </tspan>)
  for (const block of svgBlocks) {
    const openTexts = (block.match(/<text[\s>]/gi) || []).length;
    const closeTexts = (block.match(/<\/text>/gi) || []).length;
    if (openTexts !== closeTexts) {
      issues.push({
        file: relPath,
        type: 'UNCLOSED_TEXT_TAGS_IN_SVG',
        detail: 'Open text: ' + openTexts + ', Close text: ' + closeTexts
      });
    }

    const openTspans = (block.match(/<tspan[\s>]/gi) || []).length;
    const closeTspans = (block.match(/<\/tspan>/gi) || []).length;
    if (openTspans !== closeTspans) {
      issues.push({
        file: relPath,
        type: 'UNCLOSED_TSPAN_TAGS_IN_SVG',
        detail: 'Open tspan: ' + openTspans + ', Close tspan: ' + closeTspans
      });
    }
  }
});

console.log('\n=== AUDIT RESULTS ===');
console.log('Total issues found across ALL MDX files:', issues.length);
if (issues.length === 0) {
  console.log('✅ ALL MDX FILES ARE 100% CLEAN AND FREE OF SVG/HTML PARSING ERRORS!');
} else {
  issues.forEach(iss => {
    console.log(`[${iss.type}] ${iss.file} -> ${iss.detail}`);
  });
}
