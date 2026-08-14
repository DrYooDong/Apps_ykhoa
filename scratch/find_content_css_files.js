const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

const contentDir = 'd:\\Apps_ykhoa\\src\\content';
const cssFiles = walk(contentDir).filter(f => f.endsWith('.css'));

console.log(`Found ${cssFiles.length} CSS files in src/content:`);
cssFiles.forEach(cf => {
  console.log(`- ${path.relative(contentDir, cf)}`);
});
