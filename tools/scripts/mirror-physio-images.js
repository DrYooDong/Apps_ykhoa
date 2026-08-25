const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const physioImagesDir = path.join(rootDir, 'src', 'content', 'pathophysiology', 'images');
const rootImagesDir = path.join(rootDir, 'images');

console.log('physioImagesDir exists:', fs.existsSync(physioImagesDir));

for (let i = 1; i <= 7; i++) {
  const phanDir = path.join(physioImagesDir, `Phan${i}`);
  const partDir = path.join(physioImagesDir, `part${i}`);

  if (fs.existsSync(phanDir)) {
    if (!fs.existsSync(partDir)) {
      fs.mkdirSync(partDir, { recursive: true });
    }
    const files = fs.readdirSync(phanDir);
    files.forEach(f => {
      const srcFile = path.join(phanDir, f);
      const destFile = path.join(partDir, f);
      if (fs.statSync(srcFile).isFile() && !fs.existsSync(destFile)) {
        fs.copyFileSync(srcFile, destFile);
      }
    });
  }

  if (fs.existsSync(partDir)) {
    if (!fs.existsSync(phanDir)) {
      fs.mkdirSync(phanDir, { recursive: true });
    }
    const files = fs.readdirSync(partDir);
    files.forEach(f => {
      const srcFile = path.join(partDir, f);
      const destFile = path.join(phanDir, f);
      if (fs.statSync(srcFile).isFile() && !fs.existsSync(destFile)) {
        fs.copyFileSync(srcFile, destFile);
      }
    });
  }
}

if (!fs.existsSync(rootImagesDir)) {
  fs.mkdirSync(rootImagesDir, { recursive: true });
}
fs.cpSync(physioImagesDir, rootImagesDir, { recursive: true, force: true });
console.log('Success mirroring images!');
