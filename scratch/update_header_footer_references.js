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

const htmlFiles = walk('d:\\Apps_ykhoa\\src').concat(walk('d:\\Apps_ykhoa\\pages')).concat(['d:\\Apps_ykhoa\\index.html']).filter(f => f.endsWith('.html'));

let updatedFiles = 0;

htmlFiles.forEach(hf => {
  let content = fs.readFileSync(hf, 'utf8');
  let changed = false;

  // Replace header.js
  if (content.includes('components/header.js')) {
    content = content.replace(/(<script\b[^>]*src=["'][^"']*components\/header)\.js(["'][^>]*>[\s\S]*?<\/script>)/gi, (match, p1, p2) => {
      let tag = p1 + '.ts' + p2;
      if (!tag.includes('type="module"')) {
        tag = tag.replace('<script', '<script type="module"');
      }
      return tag;
    });
    changed = true;
  }

  // Replace footer.js
  if (content.includes('components/footer.js')) {
    content = content.replace(/(<script\b[^>]*src=["'][^"']*components\/footer)\.js(["'][^>]*>[\s\S]*?<\/script>)/gi, (match, p1, p2) => {
      let tag = p1 + '.ts' + p2;
      if (!tag.includes('type="module"')) {
        tag = tag.replace('<script', '<script type="module"');
      }
      return tag;
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(hf, content, 'utf8');
    updatedFiles++;
  }
});

console.log(`Updated header/footer script tags in ${updatedFiles} HTML files.`);
