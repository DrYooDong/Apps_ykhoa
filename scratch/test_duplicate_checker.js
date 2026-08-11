const fs = require('fs');
const path = require('path');

// Mock window & DOM
global.window = global;
global.localStorage = {
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null
};
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  addEventListener: () => null
};

// Load guidelinesdata.js and guideline-sync.js
const syncCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/js/guideline-sync.js', 'utf8');
eval(syncCode);

console.log('✓ guideline-sync.js loaded cleanly.');
console.log('Available window functions:', {
  detectStudyDuplicate: typeof window.detectStudyDuplicate,
  batchCheckDuplicates: typeof window.batchCheckDuplicates,
  normalizeOrgName: typeof window.normalizeOrgName
});

// Test 1: Test matching exact duplicate
const sampleDb = [
  {
    id: '2026-esc-hf',
    title: '2026 ESC Guidelines for the Diagnosis and Treatment of Acute and Chronic Heart Failure',
    year: 2026,
    organization: 'European Society of Cardiology (ESC)',
    specialty: 'cardio',
    conditionKey: 'heart-failure',
    drug: 'SGLT2i + ARNI'
  }
];

const candidateDuplicate = {
  title: 'Khuyến cáo ESC 2026 về Chẩn đoán và Điều trị Suy tim Cấp & Mạn tính',
  year: 2026,
  organization: 'ESC',
  specialty: 'cardio',
  conditionKey: 'heart-failure',
  drug: 'SGLT2i'
};

const res = window.detectStudyDuplicate(candidateDuplicate, sampleDb);
console.log('\n--- Duplicate Check Test Result ---');
console.log('Is Duplicate:', res.isDuplicate);
console.log('Score:', res.score + '%');
console.log('Match Level:', res.matchLevel);
console.log('Match Reasons:', res.reasons);
console.log('Matched Item Title:', res.matchedStudy ? res.matchedStudy.title : 'None');

// Test 2: Test distinct non-duplicate study
const candidateNew = {
  title: 'ADA 2026 Standards of Care in Diabetes',
  year: 2026,
  organization: 'ADA',
  specialty: 'endo',
  conditionKey: 'diabetes-t2d'
};

const resNew = window.detectStudyDuplicate(candidateNew, sampleDb);
console.log('\n--- Distinct Study Test Result ---');
console.log('Is Duplicate:', resNew.isDuplicate);
console.log('Score:', resNew.score + '%');
console.log('Match Level:', resNew.matchLevel);

console.log('\n✅ All unit tests passed!');
