const fs = require('fs');
const path = require('path');

const khoDir = path.resolve('src/content/ebm/guidelines/kho-guidelines');
const ckmContent = fs.readFileSync(path.join(khoDir, '2026-aha-acc-ckm-syndrome.html'), 'utf8');
const sscContent = fs.readFileSync(path.join(khoDir, '2021-ssc-soc-nhiem-khuan-sepsis3.html'), 'utf8');

console.log('--- 2026-aha-acc-ckm-syndrome.html header ---');
console.log(ckmContent.slice(0, 800));

console.log('\n--- 2021-ssc-soc-nhiem-khuan-sepsis3.html header ---');
console.log(sscContent.slice(0, 800));
