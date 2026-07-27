const fs = require('fs');
const path = require('path');

const wwwDir = path.join(__dirname, '../www');
const srcDir = path.join(__dirname, '../src');

console.log('Checking www vs src files...');

function searchFiles(dir, matchName) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const items = fs.readdirSync(dir, { recursive: true });
  items.forEach(item => {
    if (item.toLowerCase().includes(matchName.toLowerCase())) {
      results.push(path.join(dir, item));
    }
  });
  return results;
}

console.log('\nSinhly-sinhlybenh files:');
console.log(searchFiles(wwwDir, 'sinhly-sinhlybenh'));
console.log(searchFiles(srcDir, 'sinhly-sinhlybenh'));
