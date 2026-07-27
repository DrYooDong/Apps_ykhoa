const fs = require('fs');
const path = require('path');

console.log('=== FIXING ALL REMAINING MODULES (APPROACHES, PHARMACOLOGY, SKILLS, TCM) ===\n');

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

// 1. Fix src/content/pharmacology/symptoms/*.html
const pharmaSymptomsDir = path.join(projectRoot, 'src/content/pharmacology/symptoms');
if (fs.existsSync(pharmaSymptomsDir)) {
  const files = fs.readdirSync(pharmaSymptomsDir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    replaceInFile(path.join(pharmaSymptomsDir, f), [
      {
        old: '../../Công cụ/Chung/QuyDoi_LieuTuongDuong.html',
        new: '../../calculators/general/quy-doi-lieu-tuong-duong.html'
      }
    ]);
  });
}

// 2. Fix src/content/skills/
replaceInFile(path.join(projectRoot, 'src/content/skills/can-lam-sang/doc-ecg-co-ban.html'), [
  {
    old: '../../Công cụ/Tim mạch & huyết khối/DG_Suytim.html',
    new: '../../calculators/cardiology/dg-suy-tim.html'
  }
]);

replaceInFile(path.join(projectRoot, 'src/content/skills/can-lam-sang/doc-sh-gan.html'), [
  {
    old: '../../Công cụ/Tiêu hóa & Dinh dưỡng/DG_Xogan.html',
    new: '../../calculators/gastroenterology/dg-xo-gan.html'
  },
  {
    old: '../../Công cụ/Tiêu hóa & Dinh dưỡng/DG_ptncHCC.html',
    new: '../../calculators/gastroenterology/dg-ptnc-hcc.html'
  },
  {
    old: '../../Dược lý/Chuyên khoa/DL_Tiêuhoá.html',
    new: '../../pharmacology/duoc-ly.html'
  }
]);

replaceInFile(path.join(projectRoot, 'src/content/skills/treatment-management/luachon-khangsinh.html'), [
  {
    old: '../../Công cụ/Truyền Nhiễm/Chinhlieu_khangsinh.html',
    new: '../../calculators/infectious/chinh-lieu-khang-sinh.html'
  }
]);

// 3. Fix www/pages/Tiếp cận/1. HS-CC/emergency-quick-protocol.html
replaceInFile(path.join(projectRoot, 'www/pages/Tiếp cận/1. HS-CC/emergency-quick-protocol.html'), [
  { old: 'href="../Sinh lý - Sinh lý bệnh/Sinhly-sinhlybenh.html"', new: 'href="../../Sinh lý - Sinh lý bệnh/Sinhly-sinhlybenh.html"' },
  { old: 'href="../Kỹ năng/ky-nang.html"', new: 'href="../../Kỹ năng/ky-nang.html"' },
  { old: 'href="../Công cụ/cong-cu.html"', new: 'href="../../Công cụ/cong-cu.html"' },
  { old: 'href="../Dược lý/duoc-ly.html"', new: 'href="../../Dược lý/duoc-ly.html"' },
  { old: 'href="../Y học chứng cứ/yhcc.html"', new: 'href="../../Y học chứng cứ/yhcc.html"' }
]);

// 4. Fix www/pages/Tiếp cận/2. Triệu chứng/
replaceInFile(path.join(projectRoot, 'www/pages/Tiếp cận/2. Triệu chứng/Than phiền Hô hấp - Tim mạch/TC_Khotho.html'), [
  { old: 'href="../../../tiep-can.html"', new: 'href="../../tiep-can.html"' }
]);

replaceInFile(path.join(projectRoot, 'www/pages/Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/TC_Vangda.html'), [
  { old: 'href="../../../tiep-can.html"', new: 'href="../../tiep-can.html"' }
]);

// 5. Fix www/pages/Tiếp cận/3. Cận lâm sàng/
const clsFiles = ['TC_bachcau.html', 'TC_monocyte.html', 'TC_Sinhhoagan.html', 'TC_Thieumau.html', 'TC_tieu-cau.html'];
clsFiles.forEach(f => {
  replaceInFile(path.join(projectRoot, 'www/pages/Tiếp cận/3. Cận lâm sàng', f), [
    { old: 'href="../../../../../index.html"', new: 'href="../../../../index.html"' },
    { old: 'href="../../../tiep-can.html"', new: 'href="../tiep-can.html"' },
    { old: 'href="../../tiep-can.html"', new: 'href="../tiep-can.html"' }
  ]);
});

// 6. Fix www/pages/Dược lý/Chuyên khoa/DL_Tiêuhoá.html
replaceInFile(path.join(projectRoot, 'www/pages/Dược lý/Chuyên khoa/DL_Tiêuhoá.html'), [
  { old: 'href="../../Kỹ năng hover/ky-nang-lam-sang.html"', new: 'href="../../Kỹ năng/ky-nang.html"' }
]);

// 7. Fix www/pages/Y học cổ truyền/Xoa bóp & bấm huyệt/ban-do-huyet-vi.html
replaceInFile(path.join(projectRoot, 'www/pages/Y học cổ truyền/Xoa bóp & bấm huyệt/ban-do-huyet-vi.html'), [
  { old: 'href="../../../Kỹ năng/Bệnh án/KN_Benhan_Noikhoa.html"', new: 'href="../../Kỹ năng/Bệnh án/KN_Benhan_Noikhoa.html"' }
]);

console.log('\nFix finished across remaining modules!');
