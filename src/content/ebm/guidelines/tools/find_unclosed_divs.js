const fs = require('fs');
const path = require('path');

function findUnclosed(filename) {
  const filePath = path.resolve(__dirname, '../kho-guidelines', filename);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let depth = 0;
  console.log(`\n=== Finding unclosed tags in ${filename} ===`);
  lines.forEach((line, i) => {
    const opens = (line.match(/<div\b[^>]*>/gi) || []).length;
    const closes = (line.match(/<\/div>/gi) || []).length;
    const prevDepth = depth;
    depth += opens - closes;
    if (line.includes('sec-card') || line.includes('sec-hdr') || line.includes('stats-strip') || i === lines.length - 1) {
      console.log(`Line ${i + 1} (depth ${prevDepth} -> ${depth}): ${line.trim().slice(0, 80)}`);
    }
  });
  console.log(`Total unclosed: ${depth}`);
}

findUnclosed('2026-gina-asthma.mdx');
findUnclosed('2026-icm-namsap-ards.mdx');
