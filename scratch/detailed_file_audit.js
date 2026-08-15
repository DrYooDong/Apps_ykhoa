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

console.log(`Kho has ${khoFiles.length} summary files (+ index.html).`);

// Let's analyze all rows where file is not empty or where file is wrong
console.log('\n--- 1. FILE COLUMN PATH AUDIT ---');
data.forEach(d => {
  if (d.file) {
    const fn = path.basename(d.file);
    const fullPath = path.join(khoDir, fn);
    const exists = fs.existsSync(fullPath);
    if (!exists) {
      console.log(`[INVALID FILE PATH] Row ${d._rowNum} [${d.id}]: "${d.file}" (file not found in kho-guidelines)`);
    } else if (!d.file.startsWith('kho-guidelines/')) {
      console.log(`[NON-STANDARD PREFIX] Row ${d._rowNum} [${d.id}]: "${d.file}" -> should be "kho-guidelines/${fn}"`);
    }
  }
});

// Let's check which kho files are currently unreferenced in CSV
console.log('\n--- 2. KHO FILES NOT LINKED TO ANY ROW ---');
khoFiles.forEach(kf => {
  const isLinked = data.some(d => d.file && path.basename(d.file) === kf);
  if (!isLinked) {
    console.log(`Unlinked kho file: ${kf}`);
    // Check if there is a row that corresponds to this file!
    const content = fs.readFileSync(path.join(khoDir, kf), 'utf8');
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    console.log(`   Page Title: "${titleMatch ? titleMatch[1] : ''}"`);
  }
});
