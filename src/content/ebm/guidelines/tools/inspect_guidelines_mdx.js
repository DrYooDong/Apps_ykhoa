const fs = require('fs');
const path = require('path');

const dir = 'd:/Apps/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

console.log(`Analyzing ${files.length} guideline MDX files...`);

let issues = {
  duplicateCitationBox: [],
  hasCitationBox: [],
  noCitationBox: [],
  noidungChuyende: [],
  htmlEntities: [],
  diagramBlocks: [],
  totalTables: 0,
  tablesWithBold: []
};

files.forEach(file => {
  const fullPath = path.join(dir, file);
  const content = fs.readFileSync(fullPath, 'utf8');

  // Check citation box
  const boxMatches = content.match(/<div class="citation-box"[\s\S]*?<\/div>/gi);
  if (boxMatches) {
    issues.hasCitationBox.push(file);
    if (boxMatches.length > 1) {
      issues.duplicateCitationBox.push({ file, count: boxMatches.length });
    }
  } else {
    issues.noCitationBox.push(file);
  }

  // Check "Nội Dung Chuyên Đề"
  if (/Nội Dung Chuyên Đề \d+/i.test(content)) {
    issues.noidungChuyende.push(file);
  }

  // Check raw entities
  if (/&amp;|&lt;|&gt;/i.test(content)) {
    issues.htmlEntities.push(file);
  }

  // Check diagrams
  if (/```(?:diagram|flowchart|scheme)|(?:├──|└──|──►|─►)/.test(content)) {
    issues.diagramBlocks.push(file);
  }

  // Check tables with bold **
  if (/<table[\s\S]*?<\/table>/i.test(content)) {
    issues.totalTables++;
    if (/<td[^>]*>\s*\*\*/i.test(content)) {
      issues.tablesWithBold.push(file);
    }
  }
});

console.log('--- SCAN RESULTS ---');
console.log('Total files:', files.length);
console.log('Files with citation-box:', issues.hasCitationBox.length);
console.log('Files without citation-box:', issues.noCitationBox.length);
console.log('Files with duplicate citation-box:', issues.duplicateCitationBox.length);
console.log('Files with "Nội Dung Chuyên Đề":', issues.noidungChuyende.length);
console.log('Files with raw HTML entities (&amp; etc):', issues.htmlEntities.length);
console.log('Files with diagrams / flowcharts:', issues.diagramBlocks.length);
console.log('Files with tables containing <td>**:', issues.tablesWithBold.length);

if (issues.noCitationBox.length > 0) {
  console.log('\nSample files WITHOUT citation-box:', issues.noCitationBox.slice(0, 5));
}
if (issues.hasCitationBox.length > 0) {
  console.log('\nSample files WITH citation-box:', issues.hasCitationBox.slice(0, 5));
}
