const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/ebm/guidelines/kho-guidelines');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex matching `.infobox strong { display: block; ... }`
  const regex = /\.infobox\s+strong\s*\{[^}]*display\s*:\s*block[^}]*\}/g;

  if (regex.test(content)) {
    content = content.replace(regex, `.infobox-title, .infobox > div > strong:first-child { display: block; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--text); }\n    .infobox strong { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; }`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    updatedCount++;
  }
});

console.log(`Total files updated: ${updatedCount}`);
