const fs = require('fs');
const path = require('path');

const gDir = path.resolve(__dirname, '../kho-guidelines');
const bDir = path.resolve(__dirname, '../../../basic-medical');

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

const gFiles = getMdxFiles(gDir);
const bFiles = getMdxFiles(bDir);

console.log('Guideline MDX files:', gFiles.length);
console.log('Basic Medical MDX files:', bFiles.length);

function auditTables(files, label) {
  let totalTables = 0;
  let unwrappedTables = 0;
  let unwrappedFiles = [];
  let tableClasses = {};

  files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const rel = path.basename(f);
    
    // HTML tables
    const tableMatches = [...content.matchAll(/<table([^>]*)>([\s\S]*?)<\/table>/gi)];
    totalTables += tableMatches.length;

    tableMatches.forEach(m => {
      const attrs = m[1];
      const classMatch = attrs.match(/class=["']([^"']+)["']/i);
      const cls = classMatch ? classMatch[1] : '(no-class)';
      cls.split(/\s+/).forEach(c => {
        tableClasses[c] = (tableClasses[c] || 0) + 1;
      });

      // Check if wrapped in table-responsive
      const idx = m.index;
      const before = content.substring(Math.max(0, idx - 120), idx);
      if (!before.includes('table-responsive') && !before.includes('table-wrapper') && !before.includes('table-container') && !before.includes('hemo-table-wrap')) {
        unwrappedTables++;
        unwrappedFiles.push(rel);
      }
    });
  });

  console.log('\n=== Audit:', label, '===');
  console.log('  Total HTML tables:', totalTables);
  console.log('  Unwrapped HTML tables:', unwrappedTables);
  console.log('  Table classes:', tableClasses);
  if (unwrappedFiles.length > 0) {
    console.log('  Sample unwrapped files:', [...new Set(unwrappedFiles)].slice(0, 10));
  }
}

auditTables(gFiles, 'kho-guidelines');
auditTables(bFiles, 'basic-medical');
