#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const GUIDELINES_DIR = path.resolve(__dirname, '../../src/content/ebm/guidelines/kho-guidelines');

function extractMainBody(rawHtml) {
  // Find start index of first content section: stats-strip, pillars, or page-content
  let startIdx = -1;
  const statsMatch = rawHtml.search(/<(div|section)\s+class=["'][^"']*stats-strip/i);
  const pillarsMatch = rawHtml.search(/<(div|section)\s+class=["'][^"']*pillars["']/i);
  const pageContentMatch = rawHtml.search(/<(div|main)\s+class=["'][^"']*page-content/i);

  const indices = [statsMatch, pillarsMatch, pageContentMatch].filter(i => i !== -1);
  if (indices.length > 0) {
    startIdx = Math.min(...indices);
  } else {
    // fallback
    const firstSecCard = rawHtml.search(/<(div|section|article)\s+[^>]*id=["']sec-1["']/i);
    if (firstSecCard !== -1) startIdx = firstSecCard;
  }

  if (startIdx === -1) return '';

  let bodyPortion = rawHtml.substring(startIdx);

  // Find end index: first occurrence of <footer, <div id="footer, <div class="page-footer", <script, or </body>
  const endMatch = bodyPortion.search(/<footer|<div\s+id=["']footer|<div\s+class=["']page-footer|<script|<\/body/i);
  if (endMatch !== -1) {
    bodyPortion = bodyPortion.substring(0, endMatch);
  }

  return bodyPortion.trim();
}

const files = fs.readdirSync(GUIDELINES_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
files.forEach(f => {
  const content = fs.readFileSync(path.join(GUIDELINES_DIR, f), 'utf8');
  const body = extractMainBody(content);
  console.log(`${f}: HTML ${(content.length/1024).toFixed(1)} KB -> Body ${(body.length/1024).toFixed(1)} KB (${Math.round(body.length/content.length*100)}%)`);
});
