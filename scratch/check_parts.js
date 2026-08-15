const fs = require('fs');
const path = require('path');
const csvPath = path.resolve('knowledge-vault/_resources/data/clinical_guidelines_rows.csv');
const content = fs.readFileSync(csvPath, 'utf8');

const matches = [...content.matchAll(/parts/g)];
console.log('parts occurrences in CSV:', matches.length);
