const fs = require('fs');

global.window = {};
let dataCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelinesdata.js', 'utf8');
dataCode = dataCode.replace(/const SAMPLE_STUDIES/g, 'global.SAMPLE_STUDIES');
eval(dataCode);

const studies = global.SAMPLE_STUDIES || [];

const khoFiles = new Set(fs.readdirSync('D:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines'));

const validStudies = [];
const seenIds = new Set();
const seenTitles = new Set();

studies.forEach(s => {
  if (seenIds.has(s.id)) return;
  if (seenTitles.has(s.title)) return;

  const fileRel = s.file ? s.file.replace('kho-guidelines/', '') : '';
  
  // Keep only if file exists in kho-guidelines
  if (fileRel && khoFiles.has(fileRel)) {
    seenIds.add(s.id);
    seenTitles.add(s.title);
    validStudies.push(s);
  } else {
    console.log('Removing mock/duplicate study:', s.id, '-', s.title);
  }
});

console.log(`\nValid studies count: ${validStudies.length} (out of ${studies.length})`);
