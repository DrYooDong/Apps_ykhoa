const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/content/basic-medical/pathophysiology-cases');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (const f of files) {
  const full = path.join(dir, f);
  let content = fs.readFileSync(full, 'utf8');
  const original = content;

  // Fix broken <tr> with - <strong>... inside <table>
  content = content.replace(/(<tbody>[\s\S]*?<\/tbody>)/gi, (match, tableBody) => {
    return tableBody.replace(/-\s*<strong>([\s\S]*?)<\/strong>/gi, '<tr>\n<td><strong>$1</strong></td>');
  });

  if (content !== original) {
    fs.writeFileSync(full, content, 'utf8');
    console.log('Fixed table rows in:', f);
  }
}
