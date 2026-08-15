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

console.log('=== FULL DUPLICATE / OVERLAP SCAN (102 rows) ===\n');

for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    const a = data[i];
    const b = data[j];

    // Check same author + same year
    const sameAuthor = a.author && b.author && a.author.trim().toLowerCase() === b.author.trim().toLowerCase() && a.author.trim() !== '';
    const sameYear = a.year && b.year && a.year === b.year;
    
    // Check key phrase matches
    const getWords = (str) => str.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ' ').split(/\s+/).filter(w => w.length > 3);
    const wordsA = new Set(getWords(a.title + ' ' + a.id));
    const wordsB = new Set(getWords(b.title + ' ' + b.id));
    
    let common = 0;
    wordsA.forEach(w => { if (wordsB.has(w)) common++; });
    const ratio = common / Math.min(wordsA.size, wordsB.size);

    if ((sameAuthor && sameYear) || ratio >= 0.7 || (a.file && b.file && a.file === b.file)) {
      console.log(`[DUPLICATE MATCH] Ratio: ${(ratio*100).toFixed(0)}%`);
      console.log(`  Row ${a._rowNum} [${a.id}]: "${a.title}" (Org: ${a.organization}, Year: ${a.year}, File: "${a.file}")`);
      console.log(`  Row ${b._rowNum} [${b.id}]: "${b.title}" (Org: ${b.organization}, Year: ${b.year}, File: "${b.file}")\n`);
    }
  }
}
