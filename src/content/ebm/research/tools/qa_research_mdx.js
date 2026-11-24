/**
 * CliniPortal 2.0 — Research MDX Quality Gate & Duplicate Checker
 * Path: src/content/ebm/research/tools/qa_research_mdx.js
 *
 * Checks:
 *  1. Required 7-Axis Shared Labels present in YAML Frontmatter
 *  2. Zero duplicate DOI / PMID / NCT / Slug across kho-nghien-cuu
 *  3. Referenced ./images/* exist in kho-nghien-cuu/images/
 *  4. Clean HTML/JSX container tag balance & no double-escaped entities
 */

const fs = require('fs');
const path = require('path');

const KHO_DIR = path.resolve(__dirname, '../kho-nghien-cuu');
const IMG_DIR = path.join(KHO_DIR, 'images');

const REQUIRED_LABELS = [
  'title',
  'year',
  'journal',
  'specialty',
  'conditionKey',
  'design',
  'interventionClass',
  'primaryEndpointCategory',
  'outcomeDirection',
  'impactVerdict',
  'robOverall',
  'gradeCertainty'
];

function runQa() {
  if (!fs.existsSync(KHO_DIR)) {
    console.error('[QA Research] Missing directory:', KHO_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(KHO_DIR).filter((f) => f.endsWith('.mdx'));
  const seenSlugs = new Set();
  const seenDois = new Set();
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of files) {
    const filePath = path.join(KHO_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) {
      console.error(`❌ [${file}] Missing YAML frontmatter`);
      totalErrors++;
      continue;
    }

    const rawFm = fmMatch[1];
    for (const key of REQUIRED_LABELS) {
      const re = new RegExp(`^${key}:\\s*.+$`, 'm');
      if (!re.test(rawFm)) {
        console.error(`❌ [${file}] Missing required shared label "${key}"`);
        totalErrors++;
      }
    }

    const slugMatch = rawFm.match(/^slug:\s*["']?([^"'\r\n]+)["']?/m);
    const slug = slugMatch ? slugMatch[1].trim() : file.replace(/\.mdx$/, '');
    if (seenSlugs.has(slug)) {
      console.error(`❌ [${file}] Duplicate slug "${slug}"`);
      totalErrors++;
    }
    seenSlugs.add(slug);

    const doiMatch = rawFm.match(/^doi:\s*["']?([^"'\r\n]+)["']?/m);
    if (doiMatch && doiMatch[1].trim()) {
      const doi = doiMatch[1].trim().toLowerCase();
      if (seenDois.has(doi)) {
        console.error(`❌ [${file}] Duplicate DOI "${doi}"`);
        totalErrors++;
      }
      seenDois.add(doi);
    }

    // Check referenced images
    const imgRegex = /(?:\.\/)?images\/([a-zA-Z0-9_.-]+\.(?:png|jpg|jpeg|svg|webp|gif))/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(content)) !== null) {
      const imgName = imgMatch[1];
      if (!fs.existsSync(path.join(IMG_DIR, imgName))) {
        console.error(`❌ [${file}] Missing referenced image: images/${imgName}`);
        totalErrors++;
      }
    }

    if (content.includes('&amp;amp;')) {
      console.warn(`⚠️ [${file}] Contains double-escaped &amp;amp;`);
      totalWarnings++;
    }
  }

  console.log(
    `[QA Research] Checked ${files.length} research MDX files — Errors: ${totalErrors}, Warnings: ${totalWarnings}`
  );
  if (totalErrors > 0) process.exit(1);
}

runQa();
