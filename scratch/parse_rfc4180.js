const fs = require('fs');

const content = fs.readFileSync('D:/Apps_ykhoa/knowledge-vault/_resources/data/clinical_guidelines_rows.csv', 'utf8');

// Let's test standard CSV parsing using standard RFC 4180 state machine
function parseRFC4180(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i+1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field);
        field = '';
      } else if (c === '\n' || (c === '\r' && next === '\n')) {
        if (c === '\r') i++;
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const rows = parseRFC4180(content);
console.log('Total parsed rows:', rows.length);
console.log('Header length:', rows[0].length);

let malformed = 0;
rows.forEach((r, idx) => {
  if (idx === 0) return;
  if (r.length !== rows[0].length) {
    malformed++;
    console.log(`Row ${idx+1} (id: ${r[0]}): has ${r.length} fields instead of ${rows[0].length}`);
  }
});
console.log('Malformed rows count:', malformed);
