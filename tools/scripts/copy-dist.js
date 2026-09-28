const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const distDir = path.join(rootDir, 'dist');

const IGNORE_PATTERNS = new Set(['node_modules', '.git', '.obsidian', '.DS_Store', 'Thumbs.db']);

function safeCopyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const basename = path.basename(src);
  if (IGNORE_PATTERNS.has(basename)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(child => {
      safeCopyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    // Incremental copy: skip if destination file exists and has identical size
    if (fs.existsSync(dest)) {
      try {
        const destStats = fs.statSync(dest);
        if (destStats.size === stats.size && destStats.mtimeMs >= stats.mtimeMs) {
          return;
        }
      } catch (e) {}
    }
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    try {
      fs.copyFileSync(src, dest);
    } catch (err) {
      try {
        fs.unlinkSync(dest);
        fs.copyFileSync(src, dest);
      } catch (e) {
        console.warn(`[Copy-Warning] Could not copy ${src} to ${dest}:`, e.message);
      }
    }
  }
}

// 1. Copy Assets & Knowledge Vault
const directFolders = ['assets', 'knowledge-vault'];
directFolders.forEach(folder => {
  const srcPath = path.join(rootDir, folder);
  const destPath = path.join(distDir, folder);
  if (fs.existsSync(srcPath)) {
    safeCopyRecursive(srcPath, destPath);
    console.log(`[Post-Build] Copied ${folder} -> dist/${folder}`);
  }
});

// 2. Compatibility copies for static HTML articles
// assets/images -> dist/images
const srcAssetsImages = path.join(rootDir, 'assets', 'images');
const destDistImages = path.join(distDir, 'images');
if (fs.existsSync(srcAssetsImages)) {
  safeCopyRecursive(srcAssetsImages, destDistImages);
  console.log('[Post-Build] Copied assets/images -> dist/images (Compatibility)');
}

// src/styles -> dist/css & dist/src/styles
const srcStylesPath = path.join(rootDir, 'src', 'styles');
if (fs.existsSync(srcStylesPath)) {
  safeCopyRecursive(srcStylesPath, path.join(distDir, 'css'));
  safeCopyRecursive(srcStylesPath, path.join(distDir, 'src', 'styles'));
  console.log('[Post-Build] Copied src/styles -> dist/css & dist/src/styles');
}

// src/data -> dist/data & dist/src/data
const srcDataPath = path.join(rootDir, 'src', 'data');
if (fs.existsSync(srcDataPath)) {
  safeCopyRecursive(srcDataPath, path.join(distDir, 'data'));
  safeCopyRecursive(srcDataPath, path.join(distDir, 'src', 'data'));
  console.log('[Post-Build] Copied src/data -> dist/data & dist/src/data');
}

// 3. Copy tools/templates -> dist/templates
const srcTemplates = path.join(rootDir, 'tools', 'templates');
const destTemplates = path.join(distDir, 'templates');
if (fs.existsSync(srcTemplates)) {
  safeCopyRecursive(srcTemplates, destTemplates);
  console.log('[Post-Build] Copied tools/templates -> dist/templates');
}

// 4. Copy src/content/ (HTML articles & modules) -> dist/src/content/
const srcContentPath = path.join(rootDir, 'src', 'content');
const destSrcContentPath = path.join(distDir, 'src', 'content');
if (fs.existsSync(srcContentPath)) {
  safeCopyRecursive(srcContentPath, destSrcContentPath);
  console.log('[Post-Build] Copied src/content -> dist/src/content');
}

// 4b. Copy built DocSpace dist -> dist/src/content/docspace
const srcDocSpaceDist = path.join(rootDir, 'src', 'content', 'docspace', 'dist');
const destDocSpaceDist = path.join(distDir, 'src', 'content', 'docspace');
if (fs.existsSync(srcDocSpaceDist)) {
  safeCopyRecursive(srcDocSpaceDist, destDocSpaceDist);
  console.log('[Post-Build] Overlaid built DocSpace dist -> dist/src/content/docspace');
}

// 5. Copy src/components/ -> dist/src/components & dist/components
const srcComponentsPath = path.join(rootDir, 'src', 'components');
if (fs.existsSync(srcComponentsPath)) {
  safeCopyRecursive(srcComponentsPath, path.join(distDir, 'components'));
  safeCopyRecursive(srcComponentsPath, path.join(distDir, 'src', 'components'));
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
