const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/content/pathophysiology');
const htmlFile = path.join(baseDir, 'co-che-benh-sinh.html');
const html = fs.readFileSync(htmlFile, 'utf8');

const regex = /href=["']([^"']+)["']/gi;
let match;

console.log(`=== CASE-SENSITIVITY & EXACT PATH AUDIT ===\n`);

while ((match = regex.exec(html)) !== null) {
  const href = match[1];
  if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('http')) continue;

  const cleanHref = href.split('?')[0].split('#')[0];
  if (!cleanHref) continue;

  const fullPath = path.resolve(baseDir, cleanHref);
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ [FILE NOT FOUND]: "${href}"`);
    continue;
  }

  // Check exact case of each path segment
  const relativeSegments = cleanHref.split('/');
  let currentDir = baseDir;
  let caseMismatch = false;
  const correctedSegments = [];

  for (const seg of relativeSegments) {
    if (seg === '.' || seg === '..') {
      currentDir = path.resolve(currentDir, seg);
      correctedSegments.push(seg);
      continue;
    }
    const files = fs.readdirSync(currentDir);
    const exactMatch = files.find(f => f === seg);
    if (!exactMatch) {
      const caseMatch = files.find(f => f.toLowerCase() === seg.toLowerCase());
      if (caseMatch) {
        caseMismatch = true;
        correctedSegments.push(caseMatch);
        currentDir = path.join(currentDir, caseMatch);
      } else {
        console.log(`❌ Segment "${seg}" not found in ${currentDir}`);
      }
    } else {
      correctedSegments.push(exactMatch);
      currentDir = path.join(currentDir, exactMatch);
    }
  }

  if (caseMismatch) {
    const correctedHref = correctedSegments.join('/');
    console.log(`⚠️ [CASE MISMATCH]: "${href}" -> Exact on disk: "${correctedHref}"`);
  }
}
