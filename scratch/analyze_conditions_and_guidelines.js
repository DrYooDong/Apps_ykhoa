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

console.log('=== CONDITIONS COUNT:', conditions.length);
console.log('=== GUIDELINES COUNT:', guidelines.length);

const condMap = new Map();
conditions.forEach(c => {
  condMap.set(c.id, c);
});

console.log('\n--- EXISTING CONDITIONS ---');
conditions.forEach(c => {
  console.log(`[${c.id}] ${c.name} -> ICD10: ${c.icd10}`);
});

console.log('\n--- ALL GUIDELINES AND THEIR CURRENT CONDITION KEY / ICD10 ---');
const missingOrEmpty = [];
guidelines.forEach(g => {
  let icds = [];
  try {
    if (g.icd10) {
      icds = typeof g.icd10 === 'string' && g.icd10.startsWith('[') ? JSON.parse(g.icd10) : [g.icd10];
    }
  } catch(e) {
    icds = [g.icd10];
  }
  
  const hasCond = condMap.has(g.conditionKey);
  console.log(`Guideline: ${g.id} | Spec: ${g.specialty} | CondKey: ${g.conditionKey || 'NONE'} (Valid: ${hasCond}) | ICD: ${JSON.stringify(icds)} | Title: ${g.title.slice(0, 50)}...`);
  if (!g.conditionKey || !hasCond) {
    missingOrEmpty.push({ id: g.id, title: g.title, conditionKey: g.conditionKey, specialty: g.specialty, icd10: icds });
  }
});

console.log('\n--- GUIDELINES NEEDING CONDITION MAPPING ---', missingOrEmpty.length);
missingOrEmpty.forEach(m => console.log(JSON.stringify(m)));
