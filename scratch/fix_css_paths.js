const fs = require('fs');

const files = [
  'src/content/pathophysiology/biochemistry/block2-catalysis-signaling/mang-te-bao-van-chuyen.html',
  'src/content/pathophysiology/biochemistry/block6-organ-metabolism/hoa-sinh-mau-dong-mau.html',
  'src/content/pathophysiology/biochemistry/block5-molecular-genetics/ky-thuat-pcr-ngs.html',
  'src/content/pathophysiology/biochemistry/block3-bioenergetics/nang-luong-sinh-hoc.html',
  'src/content/pathophysiology/biochemistry/block3-bioenergetics/chuoi-ho-hap-etc.html',
  'src/content/pathophysiology/biochemistry/block3-bioenergetics/chu-trinh-krebs.html'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf-8');
  content = content.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/css\//g, 'href="../../../../../css/');
  fs.writeFileSync(f, content, 'utf-8');
  console.log('Fixed:', f);
}
