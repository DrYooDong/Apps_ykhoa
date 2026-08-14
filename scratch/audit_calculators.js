const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const baseDir = 'd:/Apps_ykhoa/src/content/calculators';
const files = walk(baseDir);

console.log('Total HTML files in calculators:', files.length);
console.log('');

const withInline = [];
const withoutInline = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let totalChars = 0;
  while ((match = regex.exec(content)) !== null) {
    totalChars += match[1].trim().length;
  }
  const relPath = f.replace(path.resolve(baseDir) + '\\', '').replace(/\\/g, '/');
  const sizeKb = (fs.statSync(f).size / 1024).toFixed(1);
  if (totalChars > 0) {
    withInline.push({ file: relPath, inlineChars: totalChars, sizeKb });
  } else {
    withoutInline.push({ file: relPath, sizeKb });
  }
});

console.log('=== FILES WITH INLINE SCRIPT (' + withInline.length + ') ===');
withInline.sort((a, b) => b.inlineChars - a.inlineChars);
withInline.forEach(f => {
  console.log(`  [${f.sizeKb}KB | ${f.inlineChars} inline chars] ${f.file}`);
});

console.log('');
console.log('=== FILES WITHOUT INLINE SCRIPT (already clean or static) (' + withoutInline.length + ') ===');
withoutInline.forEach(f => {
  console.log(`  [${f.sizeKb}KB] ${f.file}`);
});

// Check .js files that should be converted
console.log('');
console.log('=== LEGACY .JS FILES TO CONVERT ===');
function walkAll(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkAll(fullPath));
    } else if (file.endsWith('.js') && !file.includes('.min.')) {
      results.push(fullPath);
    }
  });
  return results;
}
const jsFiles = walkAll(baseDir);
jsFiles.forEach(f => {
  const relPath = f.replace(path.resolve(baseDir) + '\\', '').replace(/\\/g, '/');
  const sizeKb = (fs.statSync(f).size / 1024).toFixed(1);
  console.log(`  [${sizeKb}KB] ${relPath}`);
});
