const fs = require('fs');

global.window = {};
let dataCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelinesdata.js', 'utf8');
dataCode = dataCode.replace(/const SAMPLE_STUDIES/g, 'global.SAMPLE_STUDIES');
eval(dataCode);

const studies = global.SAMPLE_STUDIES || [];

console.log('Total studies in guidelinesdata.js:', studies.length);

let mohCount = 0;
let associationCount = 0;
let intlCount = 0;
let practiceChangingCount = 0;

studies.forEach(s => {
  if (s.sourceType === 'vn-moh' || s.sourceType === 'national-guideline') mohCount++;
  else if (s.sourceType === 'vn-association') associationCount++;
  else intlCount++;

  if (s.impact === 'practice-changing') practiceChangingCount++;
});

console.log('Vietnam MOH / National Guidelines:', mohCount);
console.log('Vietnam Association Guidelines:', associationCount);
console.log('Total VN Guidelines:', mohCount + associationCount);
console.log('Practice-Changing Studies:', practiceChangingCount);
