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
const htmlFiles = fs.readdirSync(khoDir).filter(f => f.endsWith('.html'));

console.log(`=== MAPPING ALL ${htmlFiles.length} KHO-GUIDELINE FILES ===\n`);

htmlFiles.forEach((file, idx) => {
  const filePath = path.join(khoDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // extract title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const pageTitle = titleMatch ? titleMatch[1].trim() : (h1Match ? h1Match[1].trim() : 'NO_TITLE');

  // find in CSV
  const directMatches = data.filter(d => d.file && path.basename(d.file) === file);
  const partialMatches = data.filter(d => d.file && d.file.includes(file.replace('.html', '')));
  
  console.log(`[${idx + 1}] File: ${file}`);
  console.log(`    HTML Title: "${pageTitle}"`);
  if (directMatches.length > 0) {
    directMatches.forEach(m => {
      console.log(`    MATCH (exact file): Row ${m._rowNum} [${m.id}] "${m.title}"`);
    });
  } else if (partialMatches.length > 0) {
    partialMatches.forEach(m => {
      console.log(`    MATCH (partial file): Row ${m._rowNum} [${m.id}] file="${m.file}"`);
    });
  } else {
    console.log(`    >>> NO DIRECT CSV FILE MATCH! Finding candidate by title/content...`);
    // Search candidates
    const candidates = [];
    data.forEach(d => {
      const combined = (d.title + ' ' + d.id + ' ' + d.summary).toLowerCase();
      const simpleFile = file.replace(/^(20\d\d-)/, '').replace(/\.html$/, '').replace(/-/g, ' ');
      const words = simpleFile.split(' ').filter(w => w.length > 2);
      let matchCount = 0;
      words.forEach(w => { if (combined.includes(w)) matchCount++; });
      if (matchCount >= 2 || (words.length === 1 && matchCount === 1)) {
        candidates.push({ row: d._rowNum, id: d.id, title: d.title, file: d.file, matchCount });
      }
    });
    candidates.sort((a, b) => b.matchCount - a.matchCount);
    candidates.slice(0, 3).forEach(c => {
      console.log(`       Candidate: Row ${c.row} [${c.id}] (file="${c.file}") "${c.title}"`);
    });
  }
});
