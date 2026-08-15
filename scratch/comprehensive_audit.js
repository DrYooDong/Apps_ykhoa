const fs = require('fs');
const path = require('path');

function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let currentVal = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal);
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(currentVal);
      if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
        lines.push(row);
      }
      row = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal || row.length > 0) {
    row.push(currentVal);
    lines.push(row);
  }
  return lines;
}

const csvPath = path.resolve('knowledge-vault/_resources/data/clinical_guidelines_rows.csv');
const raw = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(raw);
const headers = rows[0];
const data = rows.slice(1).map((r, idx) => {
  const obj = { _rowNum: idx + 2 };
  headers.forEach((h, hIdx) => {
    obj[h] = r[hIdx] || '';
  });
  return obj;
});

const khoDir = path.resolve('src/content/ebm/guidelines/kho-guidelines');
const khoFiles = fs.readdirSync(khoDir).filter(f => f.endsWith('.html') && f !== 'index.html');

console.log('====================================================');
console.log('1. DUPLICATE ANALYSIS IN CSV');
console.log('====================================================\n');

// Check 1: Same file referenced multiple times
const fileUsage = new Map();
data.forEach(d => {
  if (d.file && d.file.trim()) {
    const fn = path.basename(d.file.trim());
    if (!fileUsage.has(fn)) fileUsage.set(fn, []);
    fileUsage.get(fn).push(d);
  }
});

console.log('--- Duplicate File References in CSV ---');
fileUsage.forEach((list, fn) => {
  if (list.length > 1) {
    console.log(`\nFile "${fn}" is referenced by ${list.length} rows:`);
    list.forEach(r => {
      console.log(`  Row ${r._rowNum} [${r.id}]: "${r.title}" (Org: ${r.organization}, Year: ${r.year})`);
    });
  }
});

// Check 2: Semantic / Title / Topic Duplicates
console.log('\n--- Semantic / Study Overlaps ---');
const checkedPairs = new Set();
for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    const a = data[i];
    const b = data[j];
    
    // Normalize titles & search terms
    const getTerms = (item) => {
      const t = (item.title + ' ' + item.id + ' ' + (item.citation || '')).toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, ' ');
      return new Set(t.split(/\s+/).filter(w => w.length > 3 && !['huong','dan','chan','doan','dieu','tri','kèm','theo','quyết','định','năm','trưởng','guideline','guidelines','study','trial','review','clinical'].includes(w)));
    };

    const setA = getTerms(a);
    const setB = getTerms(b);
    let common = 0;
    setA.forEach(w => { if (setB.has(w)) common++; });
    const minSize = Math.min(setA.size, setB.size);
    const score = minSize > 0 ? common / minSize : 0;

    if (score >= 0.6 && common >= 2) {
      console.log(`\n[Potential Duplicate Pair]`);
      console.log(`  - Row ${a._rowNum} [${a.id}] (Year: ${a.year}, File: "${a.file}"): ${a.title}`);
      console.log(`  - Row ${b._rowNum} [${b.id}] (Year: ${b.year}, File: "${b.file}"): ${b.title}`);
      console.log(`    Common keywords (${common}): ${[...setA].filter(w => setB.has(w)).join(', ')}`);
    }
  }
}

console.log('\n====================================================');
console.log('2. ACTUAL KHO FILES VS CSV FILE COLUMN AUDIT');
console.log('====================================================\n');

khoFiles.forEach((kf, idx) => {
  const referencedIn = data.filter(d => d.file && path.basename(d.file.trim()) === kf);
  console.log(`[${idx+1}] ${kf}`);
  if (referencedIn.length === 1) {
    console.log(`    -> Linked to Row ${referencedIn[0]._rowNum} [${referencedIn[0].id}] "${referencedIn[0].title.slice(0, 50)}..."`);
  } else if (referencedIn.length > 1) {
    console.log(`    -> WARNING: MULTI-LINKED (${referencedIn.length} rows): ${referencedIn.map(r => `Row ${r._rowNum} [${r.id}]`).join(', ')}`);
  } else {
    console.log(`    -> WARNING: NOT DIRECTLY LINKED in 'file' column!`);
  }
});
