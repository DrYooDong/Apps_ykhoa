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

const baseDir = 'd:\\Apps_ykhoa\\src\\content\\pathophysiology';
const htmlFiles = walk(baseDir).filter(f => f.endsWith('.html'));

let filesToUpdate = [];

htmlFiles.forEach(hf => {
  let content = fs.readFileSync(hf, 'utf8');
  let changed = false;

  // Replace references to the deleted js files in this directory with .ts (using type="module")
  const jsReplacements = [
    { from: /<script[^>]*src=["']([^"']*?)physio-shared\.js["'][^>]*><\/script>/g, to: '<script type="module" src="$1physio-shared.ts"></script>' },
    { from: /<script[^>]*src=["']([^"']*?)physio-quiz-engine\.js["'][^>]*><\/script>/g, to: '<script type="module" src="$1physio-quiz-engine.ts"></script>' },
    { from: /<script[^>]*src=["']([^"']*?)physio-formula-engine\.js["'][^>]*><\/script>/g, to: '<script type="module" src="$1physio-formula-engine.ts"></script>' },
    { from: /<script[^>]*src=["']([^"']*?)physio-md-engine\.js["'][^>]*><\/script>/g, to: '<script type="module" src="$1physio-md-engine.ts"></script>' },
    { from: /<script[^>]*src=["']([^"']*?)physio-mirror\.js["'][^>]*><\/script>/g, to: '<script type="module" src="$1physio-mirror.ts"></script>' },
    { from: /<script[^>]*src=["']([^"']*?)physio-pathway-viewer\.js["'][^>]*><\/script>/g, to: '<script type="module" src="$1physio-pathway-viewer.ts"></script>' },
    { from: /<script[^>]*src=["']([^"']*?)physio-progress\.js["'][^>]*><\/script>/g, to: '<script type="module" src="$1physio-progress.ts"></script>' },
    { from: /<script[^>]*src=["']([^"']*?)physio-glossary\.js["'][^>]*><\/script>/g, to: '<script type="module" src="$1physio-glossary.ts"></script>' },
    { from: /<script[^>]*src=["']([^"']*?)physio-clinical-bridge\.js["'][^>]*><\/script>/g, to: '<script type="module" src="$1physio-clinical-bridge.ts"></script>' },
    { from: /<script[^>]*src=["']([^"']*?)physio-components\.js["'][^>]*><\/script>/g, to: '<script type="module" src="$1physio-components.ts"></script>' }
  ];

  jsReplacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(hf, content, 'utf8');
    filesToUpdate.push(path.relative(baseDir, hf));
  }
});

console.log(`Updated ${filesToUpdate.length} HTML files with .ts module script tags.`);
filesToUpdate.forEach(f => console.log('  -', f));
