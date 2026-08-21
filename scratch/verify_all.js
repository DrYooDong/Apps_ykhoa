const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('src/content/pathophysiology/quiz/exam-bank-data.ts', 'utf8');
const regex = /sourceFile:\s*['"]([^'"]+)['"]/g;
let m;
let ok = 0, fail = 0;
while ((m = regex.exec(content)) !== null) {
  const p = m[1];
  const exists = fs.existsSync(path.resolve(__dirname, '..', p));
  if (exists) {
    ok++;
  } else {
    fail++;
    console.log('FAIL:', p);
  }
}
console.log(`[Exam Bank Paths] Total: ${ok + fail} | OK: ${ok} | Failed: ${fail}`);
