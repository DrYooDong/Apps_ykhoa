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

const guideContent = fs.readFileSync('knowledge-vault/_resources/data/clinical_guidelines_rows.csv', 'utf8');
const guideRows = parseCSV(guideContent);
const guideHeader = guideRows[0];
const guidelines = guideRows.slice(1).map(r => {
  const obj = {};
  guideHeader.forEach((h, i) => obj[h.trim()] = r[i]);
  return obj;
});

console.log('Total guidelines:', guidelines.length);
guidelines.forEach((g, idx) => {
  console.log(`[${idx+1}] ID: ${g.id} | Spec: ${g.specialty} | Cond: ${g.conditionKey || 'EMPTY'} | ICD: ${g.icd10 || 'EMPTY'}`);
  console.log(`     Title: ${g.title}`);
});
