const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const wwwDir = path.join(rootDir, 'www');

console.log('--- Preparing Web Assets for Capacitor (./www) ---');

// Ensure www folder exists cleanly
if (fs.existsSync(wwwDir)) {
  fs.rmSync(wwwDir, { recursive: true, force: true });
}
fs.mkdirSync(wwwDir, { recursive: true });

const itemsToCopy = [
  'index.html',
  'icons-collection.html',
  'manifest.json',
  'sw.js',
  'assets',
  'components',
  'css',
  'js',
  'pages',
  'templates'
];

for (const item of itemsToCopy) {
  const src = path.join(rootDir, item);
  const dest = path.join(wwwDir, item);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true, force: true });
    console.log(`  [+] Copied ${item}`);
  }
}

console.log('✅ Web assets successfully bundled into ./www');
