const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/content/approaches/symptoms/systemic-symptoms/fever/tc-sot.html');
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/href=["']TC_Sot&Daudau\.html["']/g, 'href="tc-sot-daudau.html"');
  content = content.replace(/href=["']TC_Sot&DauCo\.html["']/g, 'href="tc-sot-dauco.html"');
  content = content.replace(/href=["']TC_Sot&DauKhop\.html["']/g, 'href="tc-sot-daukhop.html"');
  content = content.replace(/href=["']TC_Sot&DauNguc\.html["']/g, 'href="tc-sot-daunguc.html"');
  content = content.replace(/href=["']TC_Sot&Ho\.html["']/g, 'href="tc-sot-ho.html"');
  content = content.replace(/href=["']TC_Sot&PhatBan\.html["']/g, 'href="tc-sot-phatban.html"');
  content = content.replace(/href=["']TC_Sot&TieuBuotRat\.html["']/g, 'href="tc-sot-tieubuotrat.html"');
  content = content.replace(/href=["']TC_Sot&VangDa\.html["']/g, 'href="tc-sot-vangda.html"');
  content = content.replace(/href=["']TC_Sot&TieuChay\.html["']/g, 'href="tc-sot-tieuchay.html"');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed final 9 links in tc-sot.html');
}
