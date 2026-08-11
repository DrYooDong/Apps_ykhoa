const fs = require('fs');

function parseCSV(text) {
  const lines = [];
  let cur = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i+1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((char === '\r' && nextChar === '\n') || char === '\n' || char === '\r') {
      if (inQuotes) {
        cur += char;
      } else {
        if (char === '\r' && nextChar === '\n') i++;
        lines.push(cur);
        cur = '';
      }
    } else {
      cur += char;
    }
  }
  if (cur.length > 0) lines.push(cur);
  return lines;
}

function parseCSVLine(line) {
  const fields = [];
  let cur = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i+1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(cur);
      cur = '';
    } else {
      cur += char;
    }
  }
  fields.push(cur);
  return fields;
}

const rawText = fs.readFileSync('D:/Apps_ykhoa/knowledge-vault/_resources/data/clinical_guidelines_rows.csv', 'utf8');
const lines = parseCSV(rawText);
console.log('Total CSV rows (including header):', lines.length);

const header = parseCSVLine(lines[0]);
console.log('Header Columns count:', header.length);
console.log('Header Columns:', header);

const records = [];
const idMap = new Map();
const dupIds = [];
const missingFiles = [];
const invalidJsonSubgroups = [];
const invalidJsonParts = [];
const invalidJsonIcd10 = [];

lines.slice(1).forEach((line, idx) => {
  if (!line.trim()) return;
  const fields = parseCSVLine(line);
  if (fields.length !== header.length) {
    console.warn(`Row ${idx+2} column count mismatch: expected ${header.length}, got ${fields.length}`);
  }
  const rowObj = {};
  header.forEach((h, i) => {
    rowObj[h] = fields[i] || '';
  });
  records.push(rowObj);

  // ID Check
  if (idMap.has(rowObj.id)) {
    dupIds.push({ id: rowObj.id, row1: idMap.get(rowObj.id), row2: idx+2 });
  } else {
    idMap.set(rowObj.id, idx+2);
  }

  // File path check
  if (rowObj.file) {
    const localPath = 'D:/Apps_ykhoa/src/content/ebm/guidelines/' + rowObj.file.replace(/^Kho Guidelines\//i, 'kho-guidelines/');
    if (!fs.existsSync(localPath)) {
      missingFiles.push({ id: rowObj.id, file: rowObj.file, localPath });
    }
  }

  // Subgroups JSON Check
  if (rowObj.subgroups) {
    try {
      JSON.parse(rowObj.subgroups);
    } catch(e) {
      invalidJsonSubgroups.push({ id: rowObj.id, raw: rowObj.subgroups, err: e.message });
    }
  }

  // Parts JSON Check
  if (rowObj.parts) {
    try {
      JSON.parse(rowObj.parts);
    } catch(e) {
      invalidJsonParts.push({ id: rowObj.id, raw: rowObj.parts, err: e.message });
    }
  }

  // ICD10 JSON Check
  if (rowObj.icd10) {
    try {
      JSON.parse(rowObj.icd10);
    } catch(e) {
      invalidJsonIcd10.push({ id: rowObj.id, raw: rowObj.icd10, err: e.message });
    }
  }
});

console.log('\n--- AUDIT SUMMARY ---');
console.log('Total Records Parsed:', records.length);
console.log('Duplicate IDs found:', dupIds.length, dupIds);
console.log('Missing HTML files linked:', missingFiles.length);
if (missingFiles.length > 0) {
  console.log('First 5 missing files:', missingFiles.slice(0, 5));
}
console.log('Invalid JSON in `subgroups`:', invalidJsonSubgroups.length);
if (invalidJsonSubgroups.length > 0) {
  console.log('First 3 invalid subgroups:', invalidJsonSubgroups.slice(0, 3));
}
console.log('Invalid JSON in `parts`:', invalidJsonParts.length);
if (invalidJsonParts.length > 0) {
  console.log('First 3 invalid parts:', invalidJsonParts.slice(0, 3));
}
console.log('Invalid JSON in `icd10`:', invalidJsonIcd10.length);

// Audit fields presence stats
const stats = {};
header.forEach(h => {
  const nonNull = records.filter(r => r[h] !== '' && r[h] !== undefined && r[h] !== null).length;
  stats[h] = `${nonNull}/${records.length} (${Math.round(nonNull/records.length*100)}%)`;
});
console.log('\n--- FIELD POPULATION STATS ---');
console.log(stats);
