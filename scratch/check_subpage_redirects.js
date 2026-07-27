const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const dir = path.join(__dirname, '../src/content/pathophysiology');
const htmlFiles = getAllHtmlFiles(dir);

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relativeFile = path.relative(dir, file);
  
  // Check scripts loaded
  const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["']/gi;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.startsWith('http')) continue;
    const targetScript = path.resolve(path.dirname(file), src);
    if (!fs.existsSync(targetScript)) {
      console.log(`❌ [MISSING SCRIPT] in ${relativeFile}: src="${src}" -> ${targetScript}`);
    }
  }

  // Check CSS sources exist on disk
  const cssRegex = /<link\s+[^>]*href=["']([^"']+\.css)["']/gi;
  while ((match = cssRegex.exec(content)) !== null) {
    const cssSrc = match[1];
    if (cssSrc.startsWith('http')) continue;
    const targetCss = path.resolve(path.dirname(file), cssSrc);
    if (!fs.existsSync(targetCss)) {
      console.log(`❌ [MISSING CSS] in ${relativeFile}: href="${cssSrc}" -> ${targetCss}`);
    }
  }
});
