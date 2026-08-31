const fs = require('fs');
const path = require('path');
const baseDir = path.resolve(__dirname, '..');

function getMdxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'components' && file !== 'images' && file !== 'tools') {
        results = results.concat(getMdxFiles(full));
      }
    } else if (file.endsWith('.mdx')) {
      results.push(full);
    }
  });
  return results;
}

const files = getMdxFiles(baseDir);
console.log('Total files:', files.length);

const results = [];

files.forEach(f => {
  const rel = path.relative(baseDir, f);
  const content = fs.readFileSync(f, 'utf8');
  const parts = content.split('---');
  if (parts.length < 3) return;

  const rawYaml = parts[1];
  const body = parts.slice(2).join('---');

  const headings = [...body.matchAll(/^##\s+(\d+)\.\s*(.*?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?$/gm)].map(m => ({
    full: m[0],
    num: parseInt(m[1]),
    title: m[2].trim(),
    id: m[3]
  }));

  const yamlSections = [];
  const secRegex = /-\s*id:\s*["']?([^"'\n]+)["']?\s*\n\s*number:\s*(\d+)\s*\n\s*title:\s*["']?([^"'\n]+)["']?(?:\s*\n\s*icon:\s*["']?([^"'\n]+)["']?)?/g;
  let match;
  while ((match = secRegex.exec(rawYaml)) !== null) {
    yamlSections.push({
      id: match[1],
      number: parseInt(match[2]),
      title: match[3],
      icon: match[4]
    });
  }

  // Extract reference items
  let refItems = [];
  const liMatches = [...body.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  // We only want the reference lis (usually in citation-box, ref-section, or at the end)
  // Let's find the ol at the end of the file
  const lastOlMatch = body.match(/<ol[^>]*>([\s\S]*?)<\/ol>(?:\s*<\/div>)?\s*(?:<!--[^\n]*-->\s*)?<div class="btn-row"/i);
  if (lastOlMatch) {
    const olContent = lastOlMatch[1];
    const lis = [...olContent.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(m => m[1].trim());
    refItems = lis;
  } else if (body.includes('citation-box')) {
    const citMatch = body.match(/<div class="citation-box"[\s\S]*?<ol[^>]*>([\s\S]*?)<\/ol>[\s\S]*?<\/div>/i);
    if (citMatch) {
      const lis = [...citMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(m => m[1].trim());
      refItems = lis;
    }
  } else if (body.includes('ref-section')) {
    const refSecMatch = body.match(/<div class="ref-section"[\s\S]*?<ol[^>]*>([\s\S]*?)<\/ol>[\s\S]*?<\/div>/i);
    if (refSecMatch) {
      const lis = [...refSecMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(m => m[1].trim());
      refItems = lis;
    }
  }

  const lastH = headings[headings.length - 1];
  const lastY = yamlSections[yamlSections.length - 1];

  results.push({
    file: rel,
    headingsCount: headings.length,
    lastHeading: lastH,
    yamlSectionsCount: yamlSections.length,
    lastYamlSection: lastY,
    refItemsCount: refItems.length,
    hasRefHeading: lastH && /tài liệu|tham khảo|references|y văn/i.test(lastH.title)
  });
});

console.log('Results summary:');
console.log('Total files checked:', results.length);
console.log('Files with extracted ref items > 0:', results.filter(r => r.refItemsCount > 0).length);
console.log('Files with 0 extracted ref items:', results.filter(r => r.refItemsCount === 0).length);
if (results.filter(r => r.refItemsCount === 0).length > 0) {
  console.log('Files with 0 ref items:', results.filter(r => r.refItemsCount === 0).map(r => r.file));
}
