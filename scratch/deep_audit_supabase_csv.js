const fs = require('fs');
const path = require('path');

function parseRFC4180(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i+1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field);
        field = '';
      } else if (c === '\n' || (c === '\r' && next === '\n')) {
        if (c === '\r') i++;
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const content = fs.readFileSync('D:/Apps_ykhoa/knowledge-vault/_resources/data/clinical_guidelines_rows.csv', 'utf8');
const rows = parseRFC4180(content);
const header = rows[0];

const records = rows.slice(1).map(r => {
  const obj = {};
  header.forEach((h, i) => {
    obj[h] = r[i] !== undefined ? r[i] : '';
  });
  return obj;
});

// Load Config from guidelinesdata.js
const SPECIALTIES = { cardio:1, pulmo:1, gi:1, endo:1, neuro:1, infect:1, renal:1, rheum:1, hema:1, onco:1, pedia:1, obgyn:1, icu:1, derma:1, ent:1, nutri:1 };
const SOURCE_TYPES = { 'intl-study':1, 'intl-guideline':1, 'vn-moh':1, 'vn-association':1, 'vn-doh':1 };
const DESIGNS = { rct:1, meta:1, cohort:1, guideline:1, review:1, 'case-report':1, other:1 };
const IMPACTS = { 'practice-changing':1, informative:1, 'early-signal':1, negative:1, regulatory:1 };
const CLINICAL_CONDITIONS = {
  'heart-failure':1, hypertension:1, af:1, cad:1, 'valvular-heart':1,
  'diabetes-t2d':1, 'diabetes-t1d':1, thyroid:1, dyslipidemia:1, obesity:1,
  copd:1, asthma:1, pneumonia:1, 'interstitial-lung':1, tb:1,
  ckd:1, aki:1, nephrotic:1, 'bph-luts':1, uti:1,
  icu:1, 'hepatitis-b':1, 'hepatitis-c':1, flu:1, covid19:1, 'hemorrhagic-fever':1, measles:1, 'invasive-fungal':1, hfmd:1,
  cirrhosis:1, 'masld-mash':1, 'gerd-peptic':1, ibd:1,
  stroke:1, epilepsy:1, 'headache-migraine':1, other:1
};

const issues = {
  missingFiles: [],
  invalidSubgroupsJSON: [],
  invalidPartsJSON: [],
  invalidIcd10JSON: [],
  unknownSpecialties: [],
  unknownSourceTypes: [],
  unknownDesigns: [],
  unknownImpacts: [],
  unknownConditions: [],
  missingTitles: [],
  nullFieldsSummary: {}
};

header.forEach(h => {
  issues.nullFieldsSummary[h] = 0;
});

records.forEach((rec, idx) => {
  const rowNum = idx + 2;

  // 1. Missing Title
  if (!rec.title || !rec.title.trim()) {
    issues.missingTitles.push({ row: rowNum, id: rec.id });
  }

  // 2. Count null/empty fields
  header.forEach(h => {
    if (!rec[h] || rec[h].trim() === '' || rec[h] === 'N/A') {
      issues.nullFieldsSummary[h]++;
    }
  });

  // 3. Enum validation
  if (rec.specialty && !SPECIALTIES[rec.specialty]) {
    issues.unknownSpecialties.push({ row: rowNum, id: rec.id, val: rec.specialty });
  }
  if (rec.sourceType && !SOURCE_TYPES[rec.sourceType]) {
    issues.unknownSourceTypes.push({ row: rowNum, id: rec.id, val: rec.sourceType });
  }
  if (rec.design && !DESIGNS[rec.design]) {
    issues.unknownDesigns.push({ row: rowNum, id: rec.id, val: rec.design });
  }
  if (rec.impact && !IMPACTS[rec.impact]) {
    issues.unknownImpacts.push({ row: rowNum, id: rec.id, val: rec.impact });
  }
  if (rec.conditionKey && !CLINICAL_CONDITIONS[rec.conditionKey]) {
    issues.unknownConditions.push({ row: rowNum, id: rec.id, val: rec.conditionKey });
  }

  // 4. File link check
  if (rec.file && rec.file.trim()) {
    const cleanFile = rec.file.trim().replace(/^Kho Guidelines\//i, 'kho-guidelines/');
    const fullPath = path.join('D:/Apps_ykhoa/src/content/ebm/guidelines/', cleanFile);
    if (!fs.existsSync(fullPath)) {
      issues.missingFiles.push({ row: rowNum, id: rec.id, file: rec.file });
    }
  }

  // 5. JSON fields check
  if (rec.subgroups && rec.subgroups.trim()) {
    try {
      JSON.parse(rec.subgroups);
    } catch(e) {
      issues.invalidSubgroupsJSON.push({ row: rowNum, id: rec.id, err: e.message, val: rec.subgroups.substr(0, 50) });
    }
  }

  if (rec.parts && rec.parts.trim()) {
    try {
      JSON.parse(rec.parts);
    } catch(e) {
      issues.invalidPartsJSON.push({ row: rowNum, id: rec.id, err: e.message, val: rec.parts.substr(0, 50) });
    }
  }

  if (rec.icd10 && rec.icd10.trim()) {
    try {
      const parsed = JSON.parse(rec.icd10);
      if (!Array.isArray(parsed)) {
        issues.invalidIcd10JSON.push({ row: rowNum, id: rec.id, err: 'Not an array', val: rec.icd10 });
      }
    } catch(e) {
      issues.invalidIcd10JSON.push({ row: rowNum, id: rec.id, err: e.message, val: rec.icd10 });
    }
  }
});

console.log('=== AUDIT RESULTS FOR SUPABASE CSV ===');
console.log('Total Records:', records.length);
console.log('Missing Titles:', issues.missingTitles.length);
console.log('Missing Local HTML Files Linked:', issues.missingFiles.length, issues.missingFiles);
console.log('Invalid subgroups JSON:', issues.invalidSubgroupsJSON.length, issues.invalidSubgroupsJSON);
console.log('Invalid parts JSON:', issues.invalidPartsJSON.length, issues.invalidPartsJSON);
console.log('Invalid icd10 JSON:', issues.invalidIcd10JSON.length, issues.invalidIcd10JSON);
console.log('Unknown Specialties:', issues.unknownSpecialties);
console.log('Unknown Source Types:', issues.unknownSourceTypes);
console.log('Unknown Designs:', issues.unknownDesigns);
console.log('Unknown Impacts:', issues.unknownImpacts);
console.log('Unknown Condition Keys:', issues.unknownConditions);

console.log('\n=== FIELD POPULATION (% non-empty) ===');
header.forEach(h => {
  const emptyCount = issues.nullFieldsSummary[h];
  const filledCount = records.length - emptyCount;
  const pct = Math.round((filledCount / records.length) * 100);
  console.log(`${h.padEnd(22)}: ${filledCount}/${records.length} (${pct}%) populated`);
});
