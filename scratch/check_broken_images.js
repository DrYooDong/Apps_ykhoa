const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const targetDirs = [
  path.resolve(rootDir, 'src/content/pathophysiology'),
  path.resolve(rootDir, 'src/content/ebm/guidelines/kho-guidelines'),
  path.resolve(rootDir, 'pages')
];

// 1. Build an index of all image files in the repository
const allImageFiles = new Map(); // basename -> array of absolute paths

function indexImages(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (item === 'node_modules' || item === '.git' || item === '.gemini') continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      indexImages(fullPath);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].includes(ext)) {
        const base = item.toLowerCase();
        if (!allImageFiles.has(base)) {
          allImageFiles.set(base, []);
        }
        allImageFiles.get(base).push(fullPath);
      }
    }
  }
}

console.log('Indexing all images in repo...');
indexImages(rootDir);
console.log(`Indexed ${allImageFiles.size} unique image filenames.`);

function getAllFiles(dir, exts = ['.html', '.md', '.ts', '.js', '.json']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, exts));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (exts.includes(ext)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

const brokenItems = [];

for (const dir of targetDirs) {
  const files = getAllFiles(dir);
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    // 1. HTML img src="..."
    const imgSrcRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match;
    while ((match = imgSrcRegex.exec(content)) !== null) {
      const src = match[1];
      checkImage(file, src, match[0]);
    }

    // 2. Markdown ![alt](src)
    const mdImgRegex = /!\[.*?\]\((.*?)\)/g;
    while ((match = mdImgRegex.exec(content)) !== null) {
      const src = match[1].trim();
      checkImage(file, src, match[0]);
    }

    // 3. Obsidian ![[src]]
    const obsidianImgRegex = /!\[\[(.*?)\]\]/g;
    while ((match = obsidianImgRegex.exec(content)) !== null) {
      const src = match[1].trim();
      checkImage(file, src, match[0]);
    }
  }
}

function checkImage(filePath, src, rawTag) {
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src.startsWith('#')) {
    return;
  }

  let targetPath;
  if (src.startsWith('/')) {
    targetPath = path.resolve(rootDir, src.substring(1));
  } else {
    targetPath = path.resolve(path.dirname(filePath), src);
  }

  if (!fs.existsSync(targetPath)) {
    const baseName = path.basename(src).toLowerCase();
    const potentialMatches = allImageFiles.get(baseName) || [];

    brokenItems.push({
      sourceFile: path.relative(rootDir, filePath),
      src,
      resolvedPath: path.relative(rootDir, targetPath),
      baseName,
      potentialMatches: potentialMatches.map(p => path.relative(rootDir, p)),
      rawTag
    });
  }
}

console.log(`\nTotal broken image references: ${brokenItems.length}`);

// Group by source directory
const grouped = {};
for (const item of brokenItems) {
  const group = item.sourceFile.split(path.sep).slice(0, 3).join('/');
  if (!grouped[group]) grouped[group] = [];
  grouped[group].push(item);
}

for (const [grp, items] of Object.entries(grouped)) {
  console.log(`\n========================================`);
  console.log(`GROUP: ${grp} (${items.length} broken links)`);
  console.log(`========================================`);
  items.forEach(it => {
    console.log(`File: ${it.sourceFile}`);
    console.log(`  Broken src: ${it.src}`);
    console.log(`  Resolved to: ${it.resolvedPath}`);
    if (it.potentialMatches.length > 0) {
      console.log(`  Found existing file(s) in repo:`);
      it.potentialMatches.forEach(m => console.log(`    -> ${m}`));
    } else {
      console.log(`  NOT FOUND ANYWHERE IN REPO!`);
    }
  });
}

// Write detailed report to scratch
fs.writeFileSync(path.resolve(__dirname, 'broken_images_report.json'), JSON.stringify(brokenItems, null, 2));
