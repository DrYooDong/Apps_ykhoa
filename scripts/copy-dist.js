const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const foldersToCopy = ['css', 'js', 'components', 'data', 'pages', 'content', 'assets', 'templates'];

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

console.log('[Post-Build] All static assets copied to dist/ successfully!');
