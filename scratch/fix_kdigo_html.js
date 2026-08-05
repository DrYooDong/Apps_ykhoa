const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/content/ebm/guidelines/kho-guidelines/2024-kdigo-ckd.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replace < that is not followed by [a-zA-Z/!]
// i.e., look for < NOT followed by a valid tag start
const newContent = content.replace(/<(?![a-zA-Z/!])/g, '&lt;');

if (content !== newContent) {
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Successfully replaced unescaped < with &lt; in 2024-kdigo-ckd.html');
} else {
  console.log('No unescaped < found.');
}
