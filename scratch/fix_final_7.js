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

// 1. www/index.html
replaceInFile(path.join(projectRoot, 'www/index.html'), [
  { old: 'pages/Tiếp cận/3. Quản lý bệnh lý mạn tính & hệ thống/Huyết học & Truyền nhiễm/TC_SXHD.html', new: 'pages/Tiếp cận/4. Bệnh lý/Truyền nhiễm/slb-ccbs-sxhd.html' },
  { old: 'pages/Công cụ/Thận & Điện giải - toan kiểm/DG_ABG.html', new: 'pages/Công cụ/Thận & Điện giải - toan kiềm/DG_ABG.html' }
]);

// 2. www/pages/Sinh lý - Sinh lý bệnh/Sinhly/Phan4/SL_Traodoikhi.html
replaceInFile(path.join(projectRoot, 'www/pages/Sinh lý - Sinh lý bệnh/Sinhly/Phan4/SL_Traodoikhi.html'), [
  { old: '../../../../Công cụ/', new: '../../../Công cụ/' },
  { old: '../../../../Dược lý/', new: '../../../Dược lý/' },
  { old: '../../../../Kỹ năng/', new: '../../../Kỹ năng/' }
]);

// 3. www/pages/Sinh lý - Sinh lý bệnh/SLB_CCBS/
replaceInFile(path.join(projectRoot, 'www/pages/Sinh lý - Sinh lý bệnh/SLB_CCBS/SLB_CCBS_AKI.html'), [
  { old: '../../Công cụ/Thận &amp; Điện giải/DG_GFR.html', new: '../../Công cụ/Thận &amp; Điện giải - toan kiềm/renal-function.html' }
]);
replaceInFile(path.join(projectRoot, 'www/pages/Sinh lý - Sinh lý bệnh/SLB_CCBS/SLB_CCBS_CKD.html'), [
  { old: '../../Công cụ/Thận &amp; Điện giải/DG_GFR.html', new: '../../Công cụ/Thận &amp; Điện giải - toan kiềm/renal-function.html' }
]);
replaceInFile(path.join(projectRoot, 'www/pages/Sinh lý - Sinh lý bệnh/SLB_CCBS/SLB_CCBS_DTD.html'), [
  { old: '../../Dược lý/Chuyên khoa/DL_Nộitiết.html', new: '../../Dược lý/duoc-ly.html' }
]);
replaceInFile(path.join(projectRoot, 'www/pages/Sinh lý - Sinh lý bệnh/SLB_CCBS/SLB_CCBS_TSG.html'), [
  { old: '../../Công cụ/Sản phụ khoa/DG_Tien-san-giat.html', new: '../../Công cụ/cong-cu.html' }
]);

console.log('Final fixes done!');
