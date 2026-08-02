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

console.log('[Post-Build] All static assets copied to dist/ successfully!');
