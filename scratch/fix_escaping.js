const fs = require('fs');
const file = 'src/docspace/features/dependency-map-view.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\`/g, '`');
content = content.replace(/\\\$/g, '$');
fs.writeFileSync(file, content);
console.log('Fixed escaping in dependency-map-view.ts');
