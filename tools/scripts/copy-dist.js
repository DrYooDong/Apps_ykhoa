const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const distDir = path.join(rootDir, 'dist');

// 1. Copy Assets & Knowledge Vault
const directFolders = ['assets', 'knowledge-vault'];
directFolders.forEach(folder => {
  const srcPath = path.join(rootDir, folder);
  const destPath = path.join(distDir, folder);
  if (fs.existsSync(srcPath)) {
    fs.cpSync(srcPath, destPath, { recursive: true, force: true });
    console.log(`[Post-Build] Copied ${folder} -> dist/${folder}`);
  }
});

// 2. Compatibility copies for static HTML articles
// assets/images -> dist/images
const srcAssetsImages = path.join(rootDir, 'assets', 'images');
const destDistImages = path.join(distDir, 'images');
if (fs.existsSync(srcAssetsImages)) {
  fs.cpSync(srcAssetsImages, destDistImages, { recursive: true, force: true });
  console.log('[Post-Build] Copied assets/images -> dist/images (Compatibility)');
}

// src/styles -> dist/css & dist/src/styles
const srcStylesPath = path.join(rootDir, 'src', 'styles');
if (fs.existsSync(srcStylesPath)) {
  fs.cpSync(srcStylesPath, path.join(distDir, 'css'), { recursive: true, force: true });
  fs.cpSync(srcStylesPath, path.join(distDir, 'src', 'styles'), { recursive: true, force: true });
  console.log('[Post-Build] Copied src/styles -> dist/css & dist/src/styles');
}

// src/data -> dist/data & dist/src/data
const srcDataPath = path.join(rootDir, 'src', 'data');
if (fs.existsSync(srcDataPath)) {
  fs.cpSync(srcDataPath, path.join(distDir, 'data'), { recursive: true, force: true });
  fs.cpSync(srcDataPath, path.join(distDir, 'src', 'data'), { recursive: true, force: true });
  console.log('[Post-Build] Copied src/data -> dist/data & dist/src/data');
}

// 3. Copy tools/templates -> dist/templates
const srcTemplates = path.join(rootDir, 'tools', 'templates');
const destTemplates = path.join(distDir, 'templates');
if (fs.existsSync(srcTemplates)) {
  fs.cpSync(srcTemplates, destTemplates, { recursive: true, force: true });
  console.log('[Post-Build] Copied tools/templates -> dist/templates');
}

// 4. Copy src/content/ (HTML articles & modules) -> dist/src/content/
const srcContentPath = path.join(rootDir, 'src', 'content');
const destSrcContentPath = path.join(distDir, 'src', 'content');
if (fs.existsSync(srcContentPath)) {
  fs.cpSync(srcContentPath, destSrcContentPath, { recursive: true, force: true });
  console.log('[Post-Build] Copied src/content -> dist/src/content');
}

// 5. Copy src/components/ -> dist/src/components & dist/components
const srcComponentsPath = path.join(rootDir, 'src', 'components');
if (fs.existsSync(srcComponentsPath)) {
  fs.cpSync(srcComponentsPath, path.join(distDir, 'components'), { recursive: true, force: true });
  fs.cpSync(srcComponentsPath, path.join(distDir, 'src', 'components'), { recursive: true, force: true });
  console.log('[Post-Build] Copied src/components -> dist/components & dist/src/components');
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
