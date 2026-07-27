const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
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

// 1. Fix src/content/approaches/symptoms/systemic-symptoms/fever/tc-sot.html
replaceInFile(path.join(projectRoot, 'src/content/approaches/symptoms/systemic-symptoms/fever/tc-sot.html'), [
  { old: 'TC_Sot&HachTo.html', new: 'tc-sot-hachto.html' },
  { old: 'TC_Sot&RoiLoanTriGiac.html', new: 'tc-sot-roiloantrigiac.html' },
  { old: 'TC_Sot&HCNhiemSieuVi.html', new: 'tc-sot-hcnhiemsieuvi.html' },
  { old: 'TC_Sot&HCNhiemTrung.html', new: 'tc-sot-hcnhiemtrung.html' },
  { old: 'TC_Sot&HCSoc.html', new: 'tc-sot-hcsoc.html' }
]);

// 2. Fix src/content/pharmacology/duoc-ly.html
replaceInFile(path.join(projectRoot, 'src/content/pharmacology/duoc-ly.html'), [
  { old: 'Chuyên khoa/DL_Tiêuhoá.html', new: 'specialties/dl-tieuhoa.html' }
]);

// 3. Fix src/content/pharmacology/specialties/
replaceInFile(path.join(projectRoot, 'src/content/pharmacology/specialties/dl-khangsinh.html'), [
  { old: '../../Công cụ/Chung/QuyDoi_LieuTuongDuong.html', new: '../../calculators/general/quy-doi-lieu-tuong-duong.html' },
  { old: '../../Công cụ/Truyền Nhiễm/Chinhlieu_khangsinh.html', new: '../../calculators/infectious/chinh-lieu-khang-sinh.html' }
]);

replaceInFile(path.join(projectRoot, 'src/content/pharmacology/specialties/dl-tieuhoa.html'), [
  { old: '../../Kỹ năng hover/ky-nang-lam-sang.html', new: '../../skills/ky-nang.html' },
  { old: '../../Công cụ/Tiêu hóa & Dinh dưỡng/DG_Xogan.html', new: '../../calculators/gastroenterology/dg-xo-gan.html' },
  { old: '../../Công cụ/Tiêu hóa & Dinh dưỡng/DG_ptncHCC.html', new: '../../calculators/gastroenterology/dg-ptnc-hcc.html' }
]);

replaceInFile(path.join(projectRoot, 'src/content/pharmacology/specialties/dl-timmach.html'), [
  { old: '../../Công cụ/Chung/QuyDoi_LieuTuongDuong.html', new: '../../calculators/general/quy-doi-lieu-tuong-duong.html' },
  { old: '../../Công cụ/Tim mạch & huyết khối/DG_Suytim.html', new: '../../calculators/cardiology/dg-suy-tim.html' },
  { old: '../../Công cụ/Cấp cứu & hồi sức/QL_Vanmach.html', new: '../../calculators/emergency/ql-van-mach.html' }
]);

replaceInFile(path.join(projectRoot, 'src/content/pharmacology/specialties/dl-vanmach.html'), [
  { old: '../../Công cụ/Chung/QuyDoi_LieuTuongDuong.html', new: '../../calculators/general/quy-doi-lieu-tuong-duong.html' },
  { old: '../../Công cụ/Cấp cứu & hồi sức/QL_Vanmach.html', new: '../../calculators/emergency/ql-van-mach.html' }
]);

console.log('Fix 26 completed!');
