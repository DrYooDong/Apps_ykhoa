const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. sl-than-cauthan.html
const p6File = path.resolve(rootDir, 'src/content/pathophysiology/physiology/part6/sl-than-cauthan.html');
let p6Content = fs.readFileSync(p6File, 'utf8');
p6Content = p6Content.replaceAll('../../images/part6/hinh1.png', '../../images/Phan6/Hinh1.png');
p6Content = p6Content.replaceAll('../../images/part6/hinh2.png', '../../images/Phan6/Hinh2.png');
p6Content = p6Content.replaceAll('../../images/part6/hinh3.png', '../../images/Phan6/Hinh3.png');
fs.writeFileSync(p6File, p6Content, 'utf8');
console.log('Fixed sl-than-cauthan.html');

// 2. sl-th-ruotnon.html
const p5File = path.resolve(rootDir, 'src/content/pathophysiology/physiology/part5/sl-th-ruotnon.html');
let p5Content = fs.readFileSync(p5File, 'utf8');
p5Content = p5Content.replaceAll('../../images/part5/hinh1a.png', '../../images/Phan5/Hinh1a.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh1b.png', '../../images/Phan5/Hinh1b.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh1c.png', '../../images/Phan5/Hinh1c.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh2a.png', '../../images/Phan5/Hinh2a.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh2b.png', '../../images/Phan5/Hinh2b.png');
p5Content = p5Content.replaceAll('../../images/part6/hinh3.png', '../../images/Phan5/Hinh3.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh3.png', '../../images/Phan5/Hinh3.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh4.png', '../../images/Phan5/Hinh4.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh5.png', '../../images/Phan5/Hinh5.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh6a.png', '../../images/Phan5/Hinh6a.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh6b.png', '../../images/Phan5/Hinh6b.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh7.png', '../../images/Phan5/Hinh7.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh8a.png', '../../images/Phan5/Hinh8a.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh8b.png', '../../images/Phan5/Hinh8b.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh9a.png', '../../images/Phan5/Hinh9a.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh9b.png', '../../images/Phan5/Hinh9b.png');
p5Content = p5Content.replaceAll('../../images/part5/hinh10.png', '../../images/Phan5/Hinh10.png');
fs.writeFileSync(p5File, p5Content, 'utf8');
console.log('Fixed sl-th-ruotnon.html');

// 3. sl-nt-tuyengiap.html
const p7File = path.resolve(rootDir, 'src/content/pathophysiology/physiology/part7/sl-nt-tuyengiap.html');
let p7Content = fs.readFileSync(p7File, 'utf8');
p7Content = p7Content.replaceAll('../../images/Phan7/TuyenGiap_Hinh1.png', '../../images/Phan7/Tuyengiap_Hinh1.png');
fs.writeFileSync(p7File, p7Content, 'utf8');
console.log('Fixed sl-nt-tuyengiap.html');
