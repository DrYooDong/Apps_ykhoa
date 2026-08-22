const fs = require('fs');
const path = require('path');

const files = [
  'src/content/ebm/guidelines/kho-guidelines/2021-bavenovii-taltmc.html',
  'src/content/basic-medical/pathophysiology-cases/slb-ccbs-tang-ap-cua.html',
  'src/content/basic-medical/pathophysiology-cases/slb-ccbs-co-truong.html',
  'src/content/basic-medical/pathophysiology-cases/slb-ccbs-dumping.html',
  'src/content/basic-medical/pathophysiology-cases/slb-ccbs-rung-nhi.html'
];

let allPassed = true;

files.forEach(relPath => {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.log('MISSING:', relPath);
    return;
  }

  console.log('\n========================================');
  console.log('FILE:', relPath);
  console.log('========================================');

  const html = fs.readFileSync(fullPath, 'utf8');

  // 1. Check open vs close SVGs
  const openSvg = (html.match(/<svg\b/gi) || []).length;
  const closeSvg = (html.match(/<\/svg>/gi) || []).length;
  if (openSvg !== closeSvg) {
    console.error('❌ Mismatch SVG tags: open =', openSvg, ', close =', closeSvg);
    allPassed = false;
  } else {
    console.log('✅ SVG open/close balance:', openSvg, 'SVGs.');
  }

  // 2. Check HTML inside SVG text
  const svgTexts = html.match(/<text[\s\S]*?<\/text>/gi) || [];
  let invalidSvgText = 0;
  svgTexts.forEach(t => {
    if (/<(b|strong|span|div|p|i|em|br)\b/i.test(t)) {
      console.error('❌ Invalid HTML tag inside SVG <text>:', t.slice(0, 100));
      invalidSvgText++;
      allPassed = false;
    }
  });
  if (invalidSvgText === 0) {
    console.log('✅ No illegal HTML tags inside SVG <text> (' + svgTexts.length + ' <text> elements checked).');
  }

  // 3. Check marker IDs
  const markerUrls = html.match(/marker-(end|start|mid)=["']url\(#([^"')]+)\)["']/g) || [];
  let missingMarkers = 0;
  markerUrls.forEach(m => {
    const idMatch = m.match(/#([^"')]+)/);
    if (idMatch) {
      const id = idMatch[1];
      if (!html.includes('id="' + id + '"') && !html.includes("id='" + id + "'")) {
        console.error('❌ Missing marker definition for id:', id);
        missingMarkers++;
        allPassed = false;
      }
    }
  });
  if (missingMarkers === 0) {
    console.log('✅ All marker definitions valid (' + markerUrls.length + ' markers checked).');
  }

  // 4. Check raw LaTeX Math dollar signs
  const rawDollars = html.match(/\$[a-zA-Z0-9\\_+\-=\s\(\)\^]+\$/g) || [];
  if (rawDollars.length > 0) {
    console.error('❌ Found raw LaTeX dollar signs:', rawDollars);
    allPassed = false;
  } else {
    console.log('✅ No raw LaTeX math dollar signs ($).');
  }

  // 5. Check CSS Tokens & Theme
  const hasDarkTheme = html.includes('[data-theme="dark"]');
  const hasRootTokens = html.includes(':root');
  if (hasDarkTheme && hasRootTokens) {
    console.log('✅ Dark mode support and CSS Variables present.');
  } else {
    console.warn('⚠️ Missing data-theme="dark" or :root variables.');
  }
});

console.log('\n========================================');
console.log('FINAL AUDIT RESULT:', allPassed ? '🎉 ALL CHECKS PASSED 100% PERFECTLY!' : '⚠️ ERRORS DETECTED');
console.log('========================================\n');
