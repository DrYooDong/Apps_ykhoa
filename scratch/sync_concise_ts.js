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
const condRows = parseCSV(condContent);
const condHeader = condRows[0];
const conditions = condRows.slice(1).map(r => {
  const obj = {};
  condHeader.forEach((h, i) => obj[h.trim()] = r[i]);
  return obj;
});

const tsEntries = conditions.map(c => {
  return `  '${c.id}': { id: '${c.id}', name: '${c.name.replace(/'/g, "\\'")}', icd10: ${c.icd10}, color: '${c.color}', bg: '${c.bg}' }`;
}).join(',\n');

const tsBlock = `export const CLINICAL_CONDITIONS: Record<string, ClinicalConditionMeta> = {\n${tsEntries}\n};`;

// Cập nhật guidelinesdata.ts
let gdataContent = fs.readFileSync('src/content/ebm/guidelines/guidelinesdata.ts', 'utf8');
const p1Start = gdataContent.indexOf('export const CLINICAL_CONDITIONS: Record<string, ClinicalConditionMeta> = {');
const p1End = gdataContent.indexOf('export const JOURNAL_METRICS_DATABASE: Record<string, JournalMetricsItem> = {');

if (p1Start !== -1 && p1End !== -1) {
  gdataContent = gdataContent.substring(0, p1Start) + tsBlock + '\n\n' + gdataContent.substring(p1End);
  fs.writeFileSync('src/content/ebm/guidelines/guidelinesdata.ts', gdataContent, 'utf8');
  console.log('✅ Updated guidelinesdata.ts');
} else {
  console.log('❌ Failed to update guidelinesdata.ts');
}

// Cập nhật data.ts
let dataContent = fs.readFileSync('src/content/ebm/data.ts', 'utf8');
const p2Start = dataContent.indexOf('export const CLINICAL_CONDITIONS: Record<string, ClinicalConditionMeta> = {');
const p2End = dataContent.indexOf('export const JOURNAL_METRICS_DATABASE: Record<string, JournalMetric> = {');

if (p2Start !== -1 && p2End !== -1) {
  dataContent = dataContent.substring(0, p2Start) + tsBlock + '\n\n' + dataContent.substring(p2End);
  fs.writeFileSync('src/content/ebm/data.ts', dataContent, 'utf8');
  console.log('✅ Updated data.ts');
} else {
  console.log('❌ Failed to update data.ts');
}
