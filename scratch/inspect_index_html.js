const fs = require('fs');

const content = fs.readFileSync('d:\\Apps_ykhoa\\index.html', 'utf8');

console.log('=== SCRIPTS IN index.html ===');
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let m;
while ((m = scriptRegex.exec(content)) !== null) {
  console.log(m[0].slice(0, 150));
}

console.log('\n=== HREF LINKS IN index.html ===');
const hrefRegex = /href=["']([^"']+)["']/gi;
const hrefs = new Set();
while ((m = hrefRegex.exec(content)) !== null) {
  hrefs.add(m[1]);
}
hrefs.forEach(h => {
  if (!h.startsWith('http') && !h.startsWith('#') && !h.startsWith('data:')) {
    console.log(h);
  }
});
