const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/ebm/guidelines/kho-guidelines');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} HTML files in ${dir}`);

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if .infobox strong { display: block; } exists
  const hasDisplayBlock = /\.infobox\s+strong\s*\{[^}]*display\s*:\s*block/i.test(content);
  
  // Check for bullets after <br> inside infobox
  const hasInfoboxBullets = /class=["']infobox[^"']*["'][\s\S]*?<br>\s*[•\-]/i.test(content);

  console.log(`${file}: display:block = ${hasDisplayBlock}, infobox bullets = ${hasInfoboxBullets}`);
});
