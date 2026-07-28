const fs = require('fs');
const file = 'd:/Apps_ykhoa/src/content/pathophysiology/pathophysiology-cases/slb-ccbs-aki.html';
let content = fs.readFileSync(file, 'utf-8');
content = content.replace(/\$G_2\/M\$/g, 'G<sub>2</sub>/M');
fs.writeFileSync(file, content, 'utf-8');
console.log('Fixed AKI file successfully.');
