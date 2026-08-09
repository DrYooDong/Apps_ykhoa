const fs = require('fs');

let dataCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelinesdata.js', 'utf8');
dataCode = dataCode.replace(/const SAMPLE_STUDIES/g, 'global.SAMPLE_STUDIES');
eval(dataCode);

const studies = global.SAMPLE_STUDIES || [];

console.log(`--- Total Studies in SAMPLE_STUDIES: ${studies.length} ---`);
studies.forEach((s, idx) => {
  console.log(`${idx + 1}. [${s.id}] (${s.sourceType || 'N/A'}) - ${s.title}`);
});
