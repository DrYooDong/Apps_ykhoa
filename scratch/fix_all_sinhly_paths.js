const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/content/pathophysiology');
const htmlFile = path.join(baseDir, 'sinhly-sinhlybenh.html');
let html = fs.readFileSync(htmlFile, 'utf8');

// Build map of all actual html files in physiology/part1..part7
const physioDir = path.join(baseDir, 'physiology');
const fileMap = {}; // key: normalized slug/words, value: relative path from baseDir

const parts = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7'];

parts.forEach(part => {
  const partDir = path.join(physioDir, part);
  if (fs.existsSync(partDir)) {
    const files = fs.readdirSync(partDir).filter(f => f.endsWith('.html'));
    files.forEach(file => {
      const relPath = `physiology/${part}/${file}`;
      fileMap[file.toLowerCase()] = relPath;
    });
  }
});

console.log('Available physiology files on disk:\n', fileMap);

// Known explicit mapping for old/legacy paths -> new valid relative paths
const explicitMap = {
  // Part 1
  'Sinhly/Phan1/SL_TB_Daicuong&TB.html': 'physiology/part1/sl-tb-daicuong-tb.html',
  'Sinhly/Phan1/SL_TB_Mangtebao.html': 'physiology/part1/sl-tb-mangtebao.html',
  'Sinhly/Phan1/SL_TB_Diensinhly.html': 'physiology/part1/sl-tb-diensinhly.html',

  // Part 2
  'Sinhly/Phan2/SL_Synapse.html': 'physiology/part2/sl-synapse.html',
  'Sinhly/Phan2/SL_Coxuong.html': 'physiology/part2/sl-coxuong.html',
  'Sinhly/Phan2/SL_Cotron&Cotim.html': 'physiology/part2/sl-cotron-cotim.html',
  'Sinhly/Phan2/SL_Tuygai.html': 'physiology/part2/sl-tuygai.html',
  'Sinhly/Phan2/SL_Thannao&Tieunao&Hangnen.html': 'physiology/part2/sl-thannao-tieunao-hachnen.html',
  'Sinhly/Phan2/SL_Vonao&ChucnangTKcaocap.html': 'physiology/part2/sl-vonao-chucnangtkcaocap.html',
  'Sinhly/Phan2/SL_Thankinh-tuchu.html': 'physiology/part2/sl-thankinh-tuchu.html',
  'Sinhly/Phan2/SL_Giacquan.html': 'physiology/part2/sl-giacquan.html',

  // Part 3
  'Sinhly/Phan3/SL_HeMau&Huyethoc.html': 'physiology/part3/sl-hemau-huyethoc.html',
  'Sinhly/Phan3/SL_Hongcau.html': 'physiology/part3/sl-hongcau.html',
  'Sinhly/Phan3/SL_Tieucaucammau.html': 'physiology/part3/sl-tieucaucammau.html',
  'Sinhly/Phan3/SL_Bachcau_Mien dich.html': 'physiology/part3/sl-bachcau-mien-dich.html',
  'Sinhly/Phan3/SL_Nhommau&Truyenmau.html': 'physiology/part3/sl-nhommau-truyenmau.html',

  // Part 4
  'Sinhly/Phan4/SL_CoTim&HoatdongDien.html': 'physiology/part4/sl-cotim-hoatdongdien.html',
  'Sinhly/Phan4/SL_Cktim&Cungluongtim.html': 'physiology/part4/sl-cktim-cungluongtim.html',
  'Sinhly/Phan4/SL_HeMach&DieuhoaHA.html': 'physiology/part4/sl-hemach-dieuhoaha.html',
  'Sinhly/Phan4/SL_CoHohap&Thongkhi.html': 'physiology/part4/sl-cohohap-thongkhi.html',
  'Sinhly/Phan4/SL_Traodoikhi.html': 'physiology/part4/sl-traodoikhi.html',
  'Sinhly/Phan4/SL_Vanchuyen&DieuhoaHH.html': 'physiology/part4/sl-vanchuyen-dieuhoahh.html',

  // Part 5
  'Sinhly/Phan5/SL_TH_Mieng&TQ.html': 'physiology/part5/sl-th-mieng-tq.html',
  'Sinhly/Phan5/SL_TH_Daday.html': 'physiology/part5/sl-th-daday.html',
  'Sinhly/Phan5/SL_TH_GanTuy.html': 'physiology/part5/sl-th-gantuy.html',
  'Sinhly/Phan5/SL_TH_Ruotnon.html': 'physiology/part5/sl-th-ruotnon.html',
  'Sinhly/Phan5/SL_TH_Ruotgia.html': 'physiology/part5/sl-th-ruotgia.html',
  'Sinhly/Phan5/SL_ChuyenhoaNL&Dieuhoanhiet.html': 'physiology/part5/sl-chuyenhoanl-dieuhoanhiet.html',

  // Part 6
  'Sinhly/Phan6/SL_Than_Cauthan.html': 'physiology/part6/sl-than-cauthan.html',
  'Sinhly/Phan6/SL_Than_Ongthan.html': 'physiology/part6/sl-than-ongthan.html',
  'Sinhly/Phan6/SL_Than_Phaloang&Dieuhoadich.html': 'physiology/part6/sl-than-phaloang-dieuhoadich.html',
  'Sinhly/Phan6/SL_Than_Toankiem.html': 'physiology/part6/sl-than-toankiem.html',

  // Part 7
  'Sinhly/Phan7/SL_NT_Tongquat.html': 'physiology/part7/sl-nt-tongquat.html',
  'Sinhly/Phan7/SL_NT_GH.html': 'physiology/part7/sl-nt-gh.html',
  'Sinhly/Phan7/SL_NT_Tuyengiap.html': 'physiology/part7/sl-nt-tuyengiap.html',
  'Sinhly/Phan7/SL_NT_VoThuongthan.html': 'physiology/part7/sl-nt-vothuongthan.html',
  'Sinhly/Phan7/SL_NT_Tuyentuy.html': 'physiology/part7/sl-nt-tuyentuy.html',
  'Sinhly/Phan7/SL_SS_Sinhsan.html': 'physiology/part7/sl-ss-sinhsan.html',

  // Incorrect physiology paths
  'physiology/part2/sl-vonao-chucnang-tkkcao.html': 'physiology/part2/sl-vonao-chucnangtkcaocap.html',
  'physiology/part3/sl-bachcau-miendich.html': 'physiology/part3/sl-bachcau-mien-dich.html',
  'physiology/part4/sl-cotim-dientim.html': 'physiology/part4/sl-cotim-hoatdongdien.html',
  'physiology/part4/sl-ctim-cungluongtim.html': 'physiology/part4/sl-cktim-cungluongtim.html',
  'physiology/part4/sl-hemach-dieuhoaHa.html': 'physiology/part4/sl-hemach-dieuhoaha.html'
};

let replacementsMade = 0;

for (const [oldPath, newPath] of Object.entries(explicitMap)) {
  if (html.includes(oldPath)) {
    // Verify target file exists
    const fullTarget = path.resolve(baseDir, newPath);
    if (!fs.existsSync(fullTarget)) {
      console.error(`ERROR: Target ${newPath} does not exist on disk!`);
      process.exit(1);
    }
    html = html.split(oldPath).join(newPath);
    replacementsMade++;
    console.log(`Replaced: "${oldPath}" -> "${newPath}"`);
  }
}

fs.writeFileSync(htmlFile, html, 'utf8');
console.log(`\nSuccessfully updated ${replacementsMade} links in ${htmlFile}`);
