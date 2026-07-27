const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/content/pathophysiology/sinhly-sinhlybenh.html');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const targets = [
  'sl-vonao-chucnang-tkkcao.html',
  'sl-bachcau-miendich.html',
  'sl-cotim-dientim.html',
  'sl-ctim-cungluongtim.html',
  'sl-hemach-dieuhoaHa.html'
];

lines.forEach((line, idx) => {
  targets.forEach(t => {
    if (line.includes(t)) {
      console.log(`Line ${idx + 1}: ${t}`);
      console.log(`   ${line.trim()}\n`);
    }
  });
});
