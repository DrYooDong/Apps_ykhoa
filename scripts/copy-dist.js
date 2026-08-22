const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const foldersToCopy = ['css', 'js', 'components', 'data', 'pages', 'content', 'assets', 'templates', 'images', 'knowledge-vault'];

foldersToCopy.forEach(folder => {
  const srcPath = path.join(rootDir, folder);
  const destPath = path.join(distDir, folder);
  if (fs.existsSync(srcPath)) {
    fs.cpSync(srcPath, destPath, { recursive: true, force: true });
    console.log(`[Post-Build] Copied ${folder} -> dist/${folder}`);
  }
});

// Copy src/content/ (HTML modules) -> dist/src/content/
// Không copy src/core/, src/docspace/ vì TypeScript đã được Vite bundle
const srcContentPath = path.join(rootDir, 'src', 'content');
const destSrcContentPath = path.join(distDir, 'src', 'content');
if (fs.existsSync(srcContentPath)) {
  fs.cpSync(srcContentPath, destSrcContentPath, { recursive: true, force: true });
  console.log('[Post-Build] Copied src/content -> dist/src/content');
}

// Copy src/components/ (nếu có component HTML dùng bởi module pages)
const srcComponentsPath = path.join(rootDir, 'src', 'components');
const destSrcComponentsPath = path.join(distDir, 'src', 'components');
if (fs.existsSync(srcComponentsPath)) {
  fs.cpSync(srcComponentsPath, destSrcComponentsPath, { recursive: true, force: true });
  console.log('[Post-Build] Copied src/components -> dist/src/components');
}

// Copy specific root files (.nojekyll, manifest.json, sw.js)
const rootFilesToCopy = ['.nojekyll', 'manifest.json', 'sw.js'];
rootFilesToCopy.forEach(file => {
  const srcFile = path.join(rootDir, file);
  const destFile = path.join(distDir, file);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`[Post-Build] Copied ${file} -> dist/${file}`);
  }
});

// Ensure .nojekyll exists in dist/ for GitHub Pages
const distNoJekyll = path.join(distDir, '.nojekyll');
if (!fs.existsSync(distNoJekyll)) {
  fs.writeFileSync(distNoJekyll, '');
  console.log('[Post-Build] Created dist/.nojekyll');
}

// Create 404.html fallback for GitHub Pages SPA routing
const distIndex = path.join(distDir, 'index.html');
const dist404 = path.join(distDir, '404.html');
if (fs.existsSync(distIndex)) {
  fs.copyFileSync(distIndex, dist404);
  console.log('[Post-Build] Created dist/404.html (SPA Fallback for GitHub Pages)');
}

console.log('[Post-Build] All static assets copied to dist/ successfully!');
