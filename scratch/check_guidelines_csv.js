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
  const obj = { _lineIndex: idx + 2 };
  headers.forEach((h, hIdx) => {
    obj[h] = r[hIdx] || '';
  });
  return obj;
});

console.log(`Total rows in CSV: ${data.length}`);

const khoPath = path.resolve('src/content/ebm/guidelines/kho-guidelines');
const khoFiles = fs.readdirSync(khoPath).filter(f => f.endsWith('.html'));
console.log(`Total HTML files in kho-guidelines: ${khoFiles.length}\n`);

console.log('=== DUPLICATE ANALYSIS ===');
const idMap = new Map();
const titleMap = new Map();
const conditionKeyMap = new Map();

data.forEach(item => {
  // Check ID
  if (item.id) {
    if (idMap.has(item.id)) {
      console.log(`[DUPLICATE ID] "${item.id}" in row ${idMap.get(item.id)._lineIndex} and row ${item._lineIndex}`);
    } else {
      idMap.set(item.id, item);
    }
  }

  // Check Title
  if (item.title) {
    const tNorm = item.title.trim().toLowerCase().replace(/\s+/g, ' ');
    if (titleMap.has(tNorm)) {
      console.log(`[DUPLICATE TITLE] "${item.title}" in row ${titleMap.get(tNorm)._lineIndex} (ID: ${titleMap.get(tNorm).id}) and row ${item._lineIndex} (ID: ${item.id})`);
    } else {
      titleMap.set(tNorm, item);
    }
  }
});

console.log('\n=== FILE PATH CHECKS IN CSV ===');
const missingFiles = [];
const validFiles = [];
const emptyFiles = [];

data.forEach(item => {
  if (!item.file || item.file.trim() === '') {
    emptyFiles.push({ row: item._lineIndex, id: item.id, title: item.title });
  } else {
    const filePath = item.file.trim();
    const basename = path.basename(filePath);
    if (khoFiles.includes(basename)) {
      validFiles.push({ row: item._lineIndex, id: item.id, title: item.title, file: filePath, actualFile: basename });
    } else {
      missingFiles.push({ row: item._lineIndex, id: item.id, title: item.title, file: filePath });
    }
  }
});

console.log(`Valid file links: ${validFiles.length}`);
console.log(`Empty file fields: ${emptyFiles.length}`);
console.log(`Missing / Mismatched file links: ${missingFiles.length}`);

if (missingFiles.length > 0) {
  console.log('\nList of missing / mismatched file references:');
  missingFiles.forEach(m => {
    console.log(`- Row ${m.row} [${m.id}] (${m.title}): "${m.file}"`);
  });
}

console.log('\n=== KHO FILES NOT MATCHED DIRECTLY IN CSV ===');
const matchedBasenames = new Set(validFiles.map(v => v.actualFile));
const unreferencedKho = khoFiles.filter(kf => !matchedBasenames.has(kf));
console.log(`Unreferenced kho files (${unreferencedKho.length}):`);
unreferencedKho.forEach(f => console.log(`- ${f}`));
