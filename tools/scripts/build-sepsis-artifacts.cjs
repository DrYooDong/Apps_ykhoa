const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const scratchDir = 'C:/Users/nguye/.gemini/antigravity-ide/brain/139e351c-bae5-40e1-becf-a6bcac23ca6e/scratch/sepsis_build';
const targetDir = path.resolve(__dirname, '../../src/content/docspace/public/cdss/sepsis');

console.log('--- 1. Syncing src from sepsis to scratchDir ---');
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
copyDirRecursive(path.join(targetDir, 'src'), path.join(scratchDir, 'src'));
console.log('Source code synced successfully!');

console.log('--- 2. Running Vite build in scratchDir ---');
execSync('npx vite build', {
  cwd: scratchDir,
  stdio: 'inherit',
  shell: true
});

console.log('--- 3. Building Standalone IIFE Bundle with esbuild ---');
const esbuild = require(path.join(scratchDir, 'node_modules/esbuild'));

const entryPoint = path.join(scratchDir, 'src/main.tsx');
const iifeOut = path.join(scratchDir, 'dist/assets/sepsis-app.iife.js');

esbuild.buildSync({
  entryPoints: [entryPoint],
  bundle: true,
  outfile: iifeOut,
  format: 'iife',
  platform: 'browser',
  minify: false,
  external: ['tailwindcss'],
  define: {
    'process.env.NODE_ENV': '"production"',
    'global': 'window'
  },
  loader: {
    '.css': 'empty',
    '.png': 'dataurl',
    '.svg': 'text'
  }
});
console.log(`IIFE bundle created: ${(fs.statSync(iifeOut).size / 1024).toFixed(1)} KB`);

console.log('--- 4. Copying built assets to sepsis directory ---');
const distAssets = path.join(scratchDir, 'dist/assets');
const targetAssets = path.join(targetDir, 'assets');

let newCssName = '';
let newJsName = '';

for (const file of fs.readdirSync(distAssets)) {
  const srcFile = path.join(distAssets, file);
  const destFile = path.join(targetAssets, file);
  fs.copyFileSync(srcFile, destFile);
  console.log(`Copied ${file} -> ${destFile} (${(fs.statSync(destFile).size / 1024).toFixed(1)} KB)`);
  if (file.endsWith('.css') && file.startsWith('index-')) {
    newCssName = file;
  }
  if (file.endsWith('.js') && file.startsWith('index-') && !file.includes('iife')) {
    newJsName = file;
  }
}

console.log(`--- 5. Updating index.html with new asset hashes (CSS: ${newCssName}, JS: ${newJsName}) ---`);
const indexHtmlPath = path.join(targetDir, 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace CSS
if (newCssName) {
  html = html.replace(/href="\.\/assets\/index-[^"]+\.css"/, `href="./assets/${newCssName}"`);
}
// Replace JS module
if (newJsName) {
  html = html.replace(/src="\.\/assets\/index-[^"]+\.js"/, `src="./assets/${newJsName}"`);
}

fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('Updated index.html successfully!');
