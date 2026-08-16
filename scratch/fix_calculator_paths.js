const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
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

function fixRelativePaths(filePath, targetDepth) {
  let content = fs.readFileSync(filePath, 'utf8');
  const expectedPrefix = '../'.repeat(targetDepth);

  // Replace occurrences of ../../../.. or ../../.. or ../.. for css, js, components, assets, images
  const folders = ['css', 'js', 'components', 'data', 'assets', 'images', 'index.html'];
  
  folders.forEach(f => {
    // Match any series of ../ followed by the folder/file
    const regex = new RegExp('(\\.\\.\\/)+(' + f + ')', 'g');
    content = content.replace(regex, `${expectedPrefix}$2`);
  });

  // Also fix breadcrumb url to index.html and cong-cu.html
  content = content.replace(/\"url\":\s*\"(\.\.\/)+index\.html\"/g, `"url": "${expectedPrefix}index.html"`);
  
  // Fix data-header-path and data-footer-path
  content = content.replace(/data-header-path=\"(\.\.\/)+components\/header\.html\"/g, `data-header-path="${expectedPrefix}components/header.html"`);
  content = content.replace(/data-footer-path=\"(\.\.\/)+components\/footer\.html\"/g, `data-footer-path="${expectedPrefix}components/footer.html"`);

  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. Process pages/Công cụ
const pagesFiles = walk(path.join(rootDir, 'pages', 'Công cụ'));
pagesFiles.forEach(f => {
  const rel = path.relative(path.join(rootDir, 'pages', 'Công cụ'), f);
  const depth = rel.includes(path.sep) ? 3 : 2; // depth 2 for cong-cu.html, depth 3 for subfolder/*.html
  fixRelativePaths(f, depth);
});
console.log(`Fixed paths for ${pagesFiles.length} files in pages/Công cụ/`);

// 2. Process src/content/calculators
const srcFiles = walk(path.join(rootDir, 'src', 'content', 'calculators'));
srcFiles.forEach(f => {
  const rel = path.relative(path.join(rootDir, 'src', 'content', 'calculators'), f);
  const depth = rel.includes(path.sep) ? 4 : 3; // depth 3 for cong-cu.html, depth 4 for subfolder/*.html
  fixRelativePaths(f, depth);
});
console.log(`Fixed paths for ${srcFiles.length} files in src/content/calculators/`);
