const fs = require('fs');
const path = require('path');

console.log('=== FIXING ALL EBM & GUIDELINES MODULE LINKS ===\n');

// 1. src/content/ebm/guidelines/kho-guidelines/
const srcDir = path.join(__dirname, '../src/content/ebm/guidelines/kho-guidelines');

const srcFixes = [
  {
    file: path.join(srcDir, 'byt-copd-2026.html'),
    replacements: [
      {
        old: '../../calculators/infectious/chinh-lieu-khang-sinh.html',
        new: '../../../calculators/infectious/chinh-lieu-khang-sinh.html'
      },
      {
        old: '../../../../Dược lý/Chuyên khoa/DL_Khangsinh.html',
        new: '../../../pharmacology/duoc-ly.html'
      },
      {
        old: '../../../../Dược lý/Chuyên khoa/DL_Hohap.html',
        new: '../../../pharmacology/duoc-ly.html'
      }
    ]
  },
  {
    file: path.join(srcDir, 'empa-reg.html'),
    replacements: [
      {
        old: '../../calculators/renal/ckd-epi.html',
        new: '../../../calculators/renal/renal-function.html'
      },
      {
        old: '../../../../Công cụ/Thận/CKD_EPI.html',
        new: '../../../calculators/renal/renal-function.html'
      },
      {
        old: '../../approaches/tiep-can.html',
        new: '../../../approaches/tiep-can.html'
      },
      {
        old: '../../pharmacology/duoc-ly.html',
        new: '../../../pharmacology/duoc-ly.html'
      }
    ]
  },
  {
    file: path.join(srcDir, 'ks-cho-bn-nang.html'),
    replacements: [
      {
        old: '../../calculators/infectious/chinh-lieu-khang-sinh.html',
        new: '../../../calculators/infectious/chinh-lieu-khang-sinh.html'
      },
      {
        old: '../../../../Dược lý/Chuyên khoa/DL_Khangsinh.html',
        new: '../../../pharmacology/duoc-ly.html'
      },
      {
        old: '../../../../Kỹ năng/Quản lý điều trị/Luachon_Khangsinh.html',
        new: '../../../skills/ky-nang.html'
      }
    ]
  }
];

srcFixes.forEach(item => {
  if (fs.existsSync(item.file)) {
    let content = fs.readFileSync(item.file, 'utf8');
    item.replacements.forEach(r => {
      if (content.includes(r.old)) {
        content = content.split(r.old).join(r.new);
      }
    });
    fs.writeFileSync(item.file, content, 'utf8');
    console.log(`Updated ${item.file}`);
  }
});

// 2. www/pages/Y học chứng cứ/Guidelines/Kho Guidelines/
const wwwDir = path.join(__dirname, '../www/pages/Y học chứng cứ/Guidelines/Kho Guidelines');

const wwwFixes = [
  {
    file: path.join(wwwDir, 'byt-copd-2026.html'),
    replacements: [
      {
        old: '../../../Công cụ/Truyền Nhiễm/Chinhlieu_khangsinh.html',
        new: '../../../Công cụ/Truyền Nhiễm/Chinhlieu_khangsinh.html'
      }
    ]
  },
  {
    file: path.join(wwwDir, 'empa-reg.html'),
    replacements: [
      {
        old: '../../../Công cụ/Thận/CKD_EPI.html',
        new: '../../../Công cụ/Thận & Điện giải - toan kiềm/renal-function.html'
      }
    ]
  },
  {
    file: path.join(wwwDir, 'ks-cho-bn-nang.html'),
    replacements: [
      {
        old: '../../../Công cụ/Truyền Nhiễm/Chinhlieu_khangsinh.html',
        new: '../../../Công cụ/Truyền Nhiễm/Chinhlieu_khangsinh.html'
      }
    ]
  }
];

wwwFixes.forEach(item => {
  if (fs.existsSync(item.file)) {
    let content = fs.readFileSync(item.file, 'utf8');
    item.replacements.forEach(r => {
      if (content.includes(r.old)) {
        content = content.split(r.old).join(r.new);
      }
    });
    fs.writeFileSync(item.file, content, 'utf8');
    console.log(`Updated ${item.file}`);
  }
});

console.log('Done!');
