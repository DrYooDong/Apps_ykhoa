const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
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

const wwwPagesDir = path.join(__dirname, '../www/pages');
const htmlFiles = getAllHtmlFiles(wwwPagesDir);

let cleaned = 0;
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (/<script\s+src=["'][^"']*sidebar\.js["'][^>]*><\/script>/gi.test(content)) {
    content = content.replace(/<script\s+src=["'][^"']*sidebar\.js["'][^>]*><\/script>/gi, '');
    fs.writeFileSync(file, content, 'utf8');
    cleaned++;
    console.log(`Cleaned sidebar.js from ${path.relative(path.join(__dirname, '..'), file)}`);
  }
});

console.log(`Cleaned ${cleaned} files.`);
