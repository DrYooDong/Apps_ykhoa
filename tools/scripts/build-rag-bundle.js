const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../src/data/search-index.json');
const outputPath = path.join(__dirname, '../../src/data/search-index-bundle.js');

try {
  console.log('Đang đọc file JSON...');
  const data = fs.readFileSync(dataPath, 'utf8');
  console.log('Đang tạo bundle JS...');
  const output = `window.CLINIPORTAL_SEARCH_INDEX = ${data};`;
  fs.writeFileSync(outputPath, output);
  console.log('Tạo bundle thành công tại:', outputPath);
} catch (error) {
  console.error('Lỗi tạo bundle:', error);
}
