const fs = require('fs');
const path = require('path');

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

const files = getMdxFiles('d:/Apps/Apps_ykhoa/src/content/basic-medical');

const samples = {
  patho: files.filter(f => f.includes('pathophysiology-cases')).slice(0, 3),
  physio: files.filter(f => f.includes('physiology')).slice(0, 3),
  biochem: files.filter(f => f.includes('biochemistry')).slice(0, 3),
  epi: files.filter(f => f.includes('epidemiology')).slice(0, 3),
};

for (const [category, list] of Object.entries(samples)) {
  console.log('=== Category:', category);
  list.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const parts = content.split('---');
    const body = parts.slice(2).join('---');
    const lastHeadingMatch = [...body.matchAll(/##\s+([^\n]+)/g)].pop();
    const lastHeading = lastHeadingMatch ? lastHeadingMatch[0] : 'NONE';
    const boxIdx = body.indexOf('<div class="citation-box"');
    const tail = boxIdx !== -1 ? body.substring(Math.max(0, boxIdx - 400), boxIdx + 150) : 'NO BOX';
    console.log(path.basename(f), '| Last heading:', lastHeading);
    console.log('Context around citation-box:\n' + tail.trim());
    console.log('----------------------------------------');
  });
}
