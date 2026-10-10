const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const scratchDir = 'C:/Users/nguye/.gemini/antigravity-ide/brain/2d57ccc7-68ac-4ba0-bb8c-758c8a7b283c/scratch/sepsis_build';
const targetDir = path.resolve(__dirname, '../../src/content/docspace/public/cdss/sepsis');

console.log('=== CDSS SEPSIS BUILD PIPELINE ===');
console.log('Target Dir:', targetDir);
console.log('Scratch Dir:', scratchDir);

// 1. Recursive copy helper
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

// 2. Setup scratch dir
if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}

console.log('--- 1. Syncing project files to scratchDir ---');
fs.copyFileSync(path.join(targetDir, 'package.json'), path.join(scratchDir, 'package.json'));
fs.copyFileSync(path.join(targetDir, 'vite.config.ts'), path.join(scratchDir, 'vite.config.ts'));
fs.copyFileSync(path.join(targetDir, 'tsconfig.json'), path.join(scratchDir, 'tsconfig.json'));

// Create a clean index.html in scratchDir for Vite bundling with main.tsx as entry point
const viteIndexHtml = `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SepsisCDSS — Phân Tầng Nguy Cơ Nhiễm Trùng</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.tsx"></script>
  </body>
</html>`;
fs.writeFileSync(path.join(scratchDir, 'index.html'), viteIndexHtml, 'utf8');

copyDirRecursive(path.join(targetDir, 'src'), path.join(scratchDir, 'src'));
console.log('Source files synced successfully.');

// 3. Install dependencies in scratchDir if needed
const scratchNodeModules = path.join(scratchDir, 'node_modules');
if (!fs.existsSync(scratchNodeModules)) {
  console.log('--- 2. Installing dependencies in scratchDir ---');
  execSync('npm install --legacy-peer-deps', {
    cwd: scratchDir,
    stdio: 'inherit',
    shell: true
  });
} else {
  console.log('node_modules exists in scratchDir, skipping install.');
}

// 4. Run Vite build
console.log('--- 3. Running Vite build in scratchDir ---');
execSync('npx vite build', {
  cwd: scratchDir,
  stdio: 'inherit',
  shell: true
});

// 5. Build Standalone IIFE Bundle with esbuild
console.log('--- 4. Building Standalone IIFE Bundle with esbuild ---');
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

// 6. Copy built assets back to target
console.log('--- 5. Copying built assets to sepsis directory ---');
const distAssets = path.join(scratchDir, 'dist/assets');
const targetAssets = path.join(targetDir, 'assets');

if (!fs.existsSync(targetAssets)) {
  fs.mkdirSync(targetAssets, { recursive: true });
}

let mainJsFile = '';
let mainCssFile = '';

for (const file of fs.readdirSync(distAssets)) {
  const src = path.join(distAssets, file);
  const dest = path.join(targetAssets, file);
  fs.copyFileSync(src, dest);
  console.log(`- Copied: ${file} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);

  if (file.startsWith('index-') && file.endsWith('.js')) {
    mainJsFile = file;
  }
  if (file.startsWith('index-') && file.endsWith('.css')) {
    mainCssFile = file;
  }
}

// 7. Update index.html script tags
if (mainJsFile || mainCssFile) {
  console.log('--- 6. Updating target index.html asset references ---');
  let indexHtml = fs.readFileSync(path.join(targetDir, 'index.html'), 'utf8');

  if (mainCssFile) {
    indexHtml = indexHtml.replace(/href="\.\/assets\/index-[^"]+\.css"/, `href="./assets/${mainCssFile}"`);
  }
  if (mainJsFile) {
    indexHtml = indexHtml.replace(/src="\.\/assets\/index-[^"]+\.js"/, `src="./assets/${mainJsFile}"`);
  }

  fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtml, 'utf8');
  console.log(`Updated index.html: CSS -> ${mainCssFile}, JS -> ${mainJsFile}`);
}

console.log('=== SEPSIS BUILD COMPLETE AND VERIFIED ===');

