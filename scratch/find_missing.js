const fs = require('fs');
const path = require('path');

const missingList = [
  '2021-byt-huong-dan-chan-doan-va-dieu-tri-nhiem-nam-xam-lan.html',
  '2022-byt-huong-dan-chan-doan-dieu-tri-va-quan-ly-benh-vong-mac-dai-thao-duong.html',
  '2023-byt-huong-dan-dieu-tri-du-phong-thuyen-tac-huyet-khoi-tinh-mach.html',
  '2023-byt-huong-dan-chan-doan-va-dieu-tri-hoi-chung-dong-mach-vanh-man.html',
  '2024-byt-huong-dan-chan-doan-va-dieu-tri-dot-quy-nao.html',
  '9789240101876-eng.html',
  'the-role-of-the-mediterranean-diet-in-secondary-cardiovascular-disease-prevention.html',
  'JOMES-29-166.pdf',
  'BYT _ Chỉ định nhập viện _ 2026.pdf',
  'journal.pntd.0012954.pdf'
];

function findInDir(dir, filter) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      if (item === '.git' || item === 'node_modules') continue;
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(findInDir(fullPath, filter));
      } else if (filter(item)) {
        results.push(fullPath);
      }
    }
  } catch (e) {}
  return results;
}

missingList.forEach(m => {
  const found = findInDir('d:/Apps_ykhoa', name => name.toLowerCase().includes(m.toLowerCase().replace(/\.(html|pdf)$/, '')) || name.toLowerCase() === m.toLowerCase());
  console.log(`Searching for: ${m}`);
  if (found.length > 0) {
    found.forEach(f => console.log(`  Found: ${f}`));
  } else {
    console.log(`  NOT FOUND anywhere in workspace.`);
  }
});
