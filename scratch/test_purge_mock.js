const fs = require('fs');

global.window = {};
let dataCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelinesdata.js', 'utf8');
dataCode = dataCode.replace(/const SAMPLE_STUDIES/g, 'global.SAMPLE_STUDIES');
eval(dataCode);

const sampleStudies = global.SAMPLE_STUDIES || [];
console.log('Official SAMPLE_STUDIES count:', sampleStudies.length);
sampleStudies.forEach((s, idx) => {
  console.log(`${idx + 1}. [${s.id}] - ${s.title}`);
});
