const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  replacements.forEach(r => {
    if (content.includes(r.old)) {
      content = content.split(r.old).join(r.new);
      count++;
    }
  });
  if (count > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${count} items in ${path.relative(projectRoot, filePath)}`);
  }
}

replaceInFile(path.join(projectRoot, 'www/index.html'), [
  { old: 'pages/Tiếp cận/4. Bệnh lý/Truyền nhiễm/slb-ccbs-sxhd.html', new: 'pages/Sinh lý - Sinh lý bệnh/SLB_CCBS/SLB_CCBS_SXHD.html' }
]);

replaceInFile(path.join(projectRoot, 'www/pages/Sinh lý - Sinh lý bệnh/SLB_CCBS/SLB_CCBS_AKI.html'), [
  { old: '../../Công cụ/Thận &amp; Điện giải - toan kiềm/renal-function.html', new: '../../Công cụ/Thận & Điện giải - toan kiềm/renal-function.html' }
]);

replaceInFile(path.join(projectRoot, 'www/pages/Sinh lý - Sinh lý bệnh/SLB_CCBS/SLB_CCBS_CKD.html'), [
  { old: '../../Công cụ/Thận &amp; Điện giải - toan kiềm/renal-function.html', new: '../../Công cụ/Thận & Điện giải - toan kiềm/renal-function.html' }
]);

replaceInFile(path.join(projectRoot, 'www/pages/Sinh lý - Sinh lý bệnh/SLB_CCBS/SLB_CCBS_XG.html'), [
  { old: '../../Công cụ/Tiêu hóa &amp; Dinh dưỡng/DG_Xogan.html', new: '../../Công cụ/Tiêu hóa & Dinh dưỡng/DG_Xogan.html' }
]);

console.log('Unescape fixes done!');
