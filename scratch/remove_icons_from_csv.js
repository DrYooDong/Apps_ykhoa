const fs = require('fs');

function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let curVal = '';
  
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const nextC = text[i+1];
    if (c === '"') {
      if (inQuotes && nextC === '"') {
        curVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push(curVal);
      curVal = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && nextC === '\n') i++;
      row.push(curVal);
      curVal = '';
      if (row.length > 0 && row.some(x => x.trim().length > 0)) {
        lines.push(row);
      }
      row = [];
    } else {
      curVal += c;
    }
  }
  if (curVal.length > 0 || row.length > 0) {
    row.push(curVal);
    lines.push(row);
  }
  return lines;
}

function formatCSVRow(fields) {
  return fields.map(f => {
    if (f === null || f === undefined) return '';
    const str = String(f);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }).join(',');
}

const condContent = fs.readFileSync('knowledge-vault/_resources/data/clinical_conditions_rows.csv', 'utf8');
const condRows = parseCSV(condContent);
const condHeader = condRows[0];

console.log('Original Header:', condHeader);

const idIdx = condHeader.indexOf('id');
const nameIdx = condHeader.indexOf('name');
const icdIdx = condHeader.indexOf('icd10');
const colorIdx = condHeader.indexOf('color');
const bgIdx = condHeader.indexOf('bg');

const newHeader = ['id', 'name', 'icd10', 'color', 'bg'];
const newRows = [newHeader];

condRows.slice(1).forEach(r => {
  newRows.push([
    r[idIdx],
    r[nameIdx],
    r[icdIdx],
    r[colorIdx],
    r[bgIdx]
  ]);
});

const newCSVLines = newRows.map(r => formatCSVRow(r)).join('\n');
fs.writeFileSync('knowledge-vault/_resources/data/clinical_conditions_rows.csv', newCSVLines, 'utf8');

console.log('✅ Successfully removed icon column from clinical_conditions_rows.csv');
