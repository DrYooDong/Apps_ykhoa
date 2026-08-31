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
const report = [];

files.forEach(f => {
  const rel = path.relative(baseDir, f);
  const content = fs.readFileSync(f, 'utf8');
  const parts = content.split('---');
  if (parts.length < 3) {
    report.push({ file: rel, error: 'invalid frontmatter' });
    return;
  }
  const rawYaml = parts[1];
  const body = parts.slice(2).join('---');

  const headings = [...body.matchAll(/^##\s+(\d+)\.\s*(.*?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?$/gm)].map(m => ({
    full: m[0],
    num: parseInt(m[1]),
    title: m[2].trim(),
    id: m[3]
  }));

  const hasCitationBox = body.includes('citation-box');
  const hasRefSection = body.includes('ref-section');
  const hasOlLi = /<ol[\s\S]*?<\/ol>/i.test(body);
  const hasDanglingDiv = /<\/table>\s*<ol[\s\S]*?<\/ol>\s*<\/div>/i.test(body);

  // Check last heading
  const lastH = headings[headings.length - 1];
  const isLastHRef = lastH ? /tài liệu|tham khảo|trích dẫn|references|y văn/i.test(lastH.title) : false;

  report.push({
    file: rel,
    headingsCount: headings.length,
    lastHeading: lastH ? `${lastH.num}. ${lastH.title} (${lastH.id})` : 'NONE',
    isLastHRef,
    hasCitationBox,
    hasRefSection,
    hasOlLi,
    hasDanglingDiv
  });
});

console.log('Total files analyzed:', report.length);
console.log('Files where last heading is Ref:', report.filter(x => x.isLastHRef).length);
console.log('Files with dangling div (like slb-ccbs-st):', report.filter(x => x.hasDanglingDiv).length);
console.log('Files with citation-box:', report.filter(x => x.hasCitationBox).length);
console.log('Files with ol/li:', report.filter(x => x.hasOlLi).length);

// Group by pattern
const patterns = {};
report.forEach(r => {
  const key = `HRef:${r.isLastHRef} | CitBox:${r.hasCitationBox} | OlLi:${r.hasOlLi} | Dangling:${r.hasDanglingDiv}`;
  patterns[key] = (patterns[key] || 0) + 1;
});
console.log('Patterns distribution:');
console.log(JSON.stringify(patterns, null, 2));

// Print breakdown by folder
const folders = {};
report.forEach(r => {
  const folder = r.file.split(path.sep)[0];
  if (!folders[folder]) folders[folder] = [];
  folders[folder].push(r);
});

console.log('\n--- Breakdown by folder ---');
for (const [fName, fList] of Object.entries(folders)) {
  console.log(`\n[Folder: ${fName} (${fList.length} files)]`);
  console.log(`  HRef: ${fList.filter(x => x.isLastHRef).length}`);
  console.log(`  CitBox: ${fList.filter(x => x.hasCitationBox).length}`);
  console.log(`  OlLi: ${fList.filter(x => x.hasOlLi).length}`);
  console.log(`  Dangling: ${fList.filter(x => x.hasDanglingDiv).length}`);
  console.log('  Samples:');
  fList.slice(0, 3).forEach(s => {
    console.log(`    - ${s.file} -> LastH: ${s.lastHeading}, HRef: ${s.isLastHRef}`);
  });
}
