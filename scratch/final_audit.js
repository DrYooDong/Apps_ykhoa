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

const condContent = fs.readFileSync('knowledge-vault/_resources/data/clinical_conditions_rows.csv', 'utf8');
const guideContent = fs.readFileSync('knowledge-vault/_resources/data/clinical_guidelines_rows.csv', 'utf8');

const condRows = parseCSV(condContent);
const guideRows = parseCSV(guideContent);

const condHeader = condRows[0];
const conditions = condRows.slice(1).map(r => {
  const obj = {};
  condHeader.forEach((h, i) => obj[h.trim()] = r[i]);
  return obj;
});

const guideHeader = guideRows[0];
const guidelines = guideRows.slice(1).map(r => {
  const obj = {};
  guideHeader.forEach((h, i) => obj[h.trim()] = r[i]);
  return obj;
});

console.log('=== AUDIT REPORT ===');
console.log('Total Conditions in CSV:', conditions.length);
console.log('Total Guidelines in CSV:', guidelines.length);

const condMap = new Map();
conditions.forEach(c => {
  try {
    const icdArr = JSON.parse(c.icd10);
    if (!Array.isArray(icdArr)) throw new Error('Not array');
  } catch(e) {
    console.error('Invalid ICD10 format in condition:', c.id, c.icd10);
  }
  condMap.set(c.id, c);
});

let invalidGuideCond = 0;
let invalidGuideICD = 0;

guidelines.forEach(g => {
  if (!condMap.has(g.conditionKey)) {
    console.error('Invalid conditionKey in guideline:', g.id, g.conditionKey);
    invalidGuideCond++;
  }
  try {
    const icdArr = JSON.parse(g.icd10);
    if (!Array.isArray(icdArr)) throw new Error('Not array');
  } catch(e) {
    console.error('Invalid icd10 format in guideline:', g.id, g.icd10);
    invalidGuideICD++;
  }
});

console.log('Invalid Condition Keys in Guidelines:', invalidGuideCond);
console.log('Invalid ICD10 arrays in Guidelines:', invalidGuideICD);

if (invalidGuideCond === 0 && invalidGuideICD === 0) {
  console.log('🎉 100% PERFECT INTEGRITY & COMPATIBILITY BETWEEN GUIDELINES AND CONDITIONS!');
}
