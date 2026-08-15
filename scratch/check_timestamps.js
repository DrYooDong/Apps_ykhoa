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

// Check rows 51 to 62 with timestamp IDs
console.log('--- Checking timestamp-based IDs (auto-generated) ---');
const timestampRows = data.filter(d => /^study_\d{13}_/.test(d.id));
timestampRows.forEach(tr => {
  console.log(`Row ${tr._rowNum} [${tr.id}] | Title: "${tr.title}" | Year: ${tr.year} | Org: "${tr.organization}" | File: "${tr.file}"`);
  
  // Search if there is another row with similar topic
  const keywords = tr.title.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !['2025','2026','guidelines','guideline','review','trial','study'].includes(w));
  data.forEach(other => {
    if (other._rowNum !== tr._rowNum) {
      const otherText = (other.title + ' ' + other.id + ' ' + (other.citation || '')).toLowerCase();
      const matchedKw = keywords.filter(k => otherText.includes(k));
      if (matchedKw.length >= Math.min(2, keywords.length) && matchedKw.length >= 2) {
        console.log(`   -> Potential duplicate with Row ${other._rowNum} [${other.id}] "${other.title}"`);
      }
    }
  });
});
