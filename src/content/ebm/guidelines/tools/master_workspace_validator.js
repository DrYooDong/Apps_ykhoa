const fs = require('fs');
const path = require('path');

const gDir = path.resolve(__dirname, '../kho-guidelines');
const bDir = path.resolve(__dirname, '../../../basic-medical');
const sDir = path.resolve(__dirname, '../../medical-statistics');

function getMdxFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'components' && file !== 'images' && file !== 'tools' && file !== 'css' && file !== 'js' && file !== 'views') {
        results = results.concat(getMdxFiles(full));
      }
    } else if (file.endsWith('.mdx')) {
      results.push(full);
    }
  });
  return results;
}

const allFiles = [
  ...getMdxFiles(gDir),
  ...getMdxFiles(bDir),
  ...getMdxFiles(sDir)
];

console.log(`🚀 MASTER VALIDATION RUNNING ON ${allFiles.length} MDX FILES...\n`);

let errors = 0;

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.basename(file);
  const parts = content.split('---');

  if (parts.length < 3) {
    console.log(`❌ [${rel}] Invalid YAML frontmatter`);
    errors++;
    return;
  }

  const body = parts.slice(2).join('---');

  // Check div balance
  const openDivs = (body.match(/<div\b[^>]*>/gi) || []).length;
  const closeDivs = (body.match(/<\/div>/gi) || []).length;
  if (openDivs !== closeDivs) {
    console.log(`❌ [${rel}] Div mismatch: open=${openDivs}, close=${closeDivs}`);
    errors++;
  }

  // Check table balance
  const openTables = (body.match(/<table\b[^>]*>/gi) || []).length;
  const closeTables = (body.match(/<\/table>/gi) || []).length;
  if (openTables !== closeTables) {
    console.log(`❌ [${rel}] Table mismatch: open=${openTables}, close=${closeTables}`);
    errors++;
  }

  // Check section balance
  const openSections = (body.match(/<section\b[^>]*>/gi) || []).length;
  const closeSections = (body.match(/<\/section>/gi) || []).length;
  if (openSections !== closeSections) {
    console.log(`❌ [${rel}] Section mismatch: open=${openSections}, close=${closeSections}`);
    errors++;
  }
});

console.log(`\n======================================================`);
if (errors === 0) {
  console.log(`🎉 ALL ${allFiles.length} MDX FILES ARE 100% VALID & ERROR-FREE!`);
} else {
  console.log(`⚠️ Found ${errors} errors.`);
}
console.log(`======================================================`);
