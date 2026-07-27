const fs = require('fs');
const path = require('path');

console.log('=== INVESTIGATING TARGET PATHS ===\n');

const projectRoot = path.join(__dirname, '..');

function searchFile(dir, fileName) {
  const matches = [];
  if (!fs.existsSync(dir)) return matches;
  const items = fs.readdirSync(dir, { recursive: true });
  items.forEach(item => {
    if (path.basename(item).toLowerCase() === fileName.toLowerCase()) {
      matches.push(path.join(dir, item));
    }
  });
  return matches;
}

const targetsToFind = [
  'Chinhlieu_khangsinh.html',
  'chinh-lieu-khang-sinh.html',
  'CKD_EPI.html',
  'ckd-epi.html',
  'DL_Khangsinh.html',
  'DL_Hohap.html',
  'tiep-can.html',
  'duoc-ly.html',
  'Luachon_Khangsinh.html'
];

targetsToFind.forEach(name => {
  const found = searchFile(projectRoot, name);
  console.log(`Searching for "${name}":`);
  found.forEach(f => console.log(`  -> ${path.relative(projectRoot, f)}`));
});
