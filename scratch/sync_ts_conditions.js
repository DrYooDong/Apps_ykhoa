const fs = require('fs');

const conditionsData = JSON.parse(fs.readFileSync('scratch/conditions_master.json', 'utf8'));

// Tạo Object TS code cho CLINICAL_CONDITIONS
const tsEntries = conditionsData.map(c => {
  return `  '${c.id}': { id: '${c.id}', name: '${c.name.replace(/'/g, "\\'")}', icd10: ${JSON.stringify(c.icd10)}, color: '${c.color}', bg: '${c.bg}' }`;
}).join(',\n');

const tsBlock = `export const CLINICAL_CONDITIONS: Record<string, ClinicalConditionMeta> = {\n${tsEntries}\n};`;

// 1. Cập nhật guidelinesdata.ts
let gdataContent = fs.readFileSync('src/content/ebm/guidelines/guidelinesdata.ts', 'utf8');
const startPattern1 = 'export const CLINICAL_CONDITIONS: Record<string, ClinicalConditionMeta> = {';
const endPattern1 = '};\n\nexport const JOURNAL_METRICS_DATABASE';

const p1Start = gdataContent.indexOf(startPattern1);
const p1End = gdataContent.indexOf(endPattern1);

if (p1Start !== -1 && p1End !== -1) {
  gdataContent = gdataContent.substring(0, p1Start) + tsBlock + '\n\n' + gdataContent.substring(p1End + 3);
  fs.writeFileSync('src/content/ebm/guidelines/guidelinesdata.ts', gdataContent, 'utf8');
  console.log('✅ Updated src/content/ebm/guidelines/guidelinesdata.ts');
} else {
  console.log('❌ Could not locate CLINICAL_CONDITIONS block in guidelinesdata.ts');
}

// 2. Cập nhật data.ts
let dataContent = fs.readFileSync('src/content/ebm/data.ts', 'utf8');
const startPattern2 = 'export const CLINICAL_CONDITIONS: Record<string, ClinicalConditionMeta> = {';
const endPattern2 = '};\n\nexport const JOURNAL_METRICS_DATABASE';

const p2Start = dataContent.indexOf(startPattern2);
const p2End = dataContent.indexOf(endPattern2);

if (p2Start !== -1 && p2End !== -1) {
  dataContent = dataContent.substring(0, p2Start) + tsBlock + '\n\n' + dataContent.substring(p2End + 3);
  fs.writeFileSync('src/content/ebm/data.ts', dataContent, 'utf8');
  console.log('✅ Updated src/content/ebm/data.ts');
} else {
  console.log('❌ Could not locate CLINICAL_CONDITIONS block in data.ts');
}
