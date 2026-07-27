const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const filesToClean = [
  'www/pages/Công cụ/Chung/Bệnh án/benh-an-noi-khoa.html',
  'www/pages/Công cụ/Cấp cứu & hồi sức/QL_Maytho.html',
  'www/pages/Công cụ/Cấp cứu & hồi sức/QL_Vanmach.html'
];

filesToClean.forEach(rel => {
  const fp = path.join(projectRoot, rel);
  if (fs.existsSync(fp)) {
    let content = fs.readFileSync(fp, 'utf8');
    content = content.replace(/<script\s+src=["'][^"']*sidebar\.js["'][^>]*><\/script>/gi, '');
    fs.writeFileSync(fp, content, 'utf8');
    console.log(`Removed sidebar.js script tag from ${rel}`);
  }
});
