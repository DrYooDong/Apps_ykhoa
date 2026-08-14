const fs = require('fs');
const path = require('path');

const baseDir = 'd:\\Apps_ykhoa';
const footerHtml = fs.readFileSync(path.join(baseDir, 'components', 'footer.html'), 'utf8');
const headerHtml = fs.readFileSync(path.join(baseDir, 'components', 'header.html'), 'utf8');

function checkLinks(html, name) {
  console.log(`=== CHECKING LINKS IN ${name} ===`);
  const regex = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const href = m[1];
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) continue;
    const clean = href.replace(/^(\.\/|\/)+/, '');
    const resolved = path.join(baseDir, clean);
    const exists = fs.existsSync(resolved);
    console.log(`[${exists ? 'OK' : 'MISSING'}] ${href} -> ${resolved}`);
  }
}

checkLinks(headerHtml, 'components/header.html');
checkLinks(footerHtml, 'components/footer.html');
