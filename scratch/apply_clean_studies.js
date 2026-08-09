const fs = require('fs');

global.window = {};
let dataContent = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelinesdata.js', 'utf8');

let dataCode = dataContent.replace(/const SAMPLE_STUDIES/g, 'global.SAMPLE_STUDIES');
eval(dataCode);

const studies = global.SAMPLE_STUDIES || [];
const khoFiles = new Set(fs.readdirSync('D:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines'));

const validStudies = [];
const seenIds = new Set();
const seenTitles = new Set();

studies.forEach(s => {
  if (seenIds.has(s.id)) return;
  if (seenTitles.has(s.title)) return;
  if (s.title === "Tóm tắt Hướng Dẫn Lâm Sàng") return; // Remove generic placeholder titles

  const fileRel = s.file ? s.file.replace('kho-guidelines/', '') : '';
  
  if (fileRel && khoFiles.has(fileRel)) {
    seenIds.add(s.id);
    seenTitles.add(s.title);
    validStudies.push(s);
  }
});

console.log('Cleaned SAMPLE_STUDIES count:', validStudies.length);

// Format clean JSON into guidelinesdata.js replacement
const sampleStudiesCode = `    const SAMPLE_STUDIES = ${JSON.stringify(validStudies, null, 2)};`;

const newContent = dataContent.replace(/const SAMPLE_STUDIES\s*=\s*\[[\s\S]*?\];/m, sampleStudiesCode);

fs.writeFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelinesdata.js', newContent, 'utf8');
console.log('Successfully updated guidelinesdata.js with clean real guidelines!');
