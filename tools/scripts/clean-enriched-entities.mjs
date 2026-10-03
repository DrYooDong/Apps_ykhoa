import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENRICHED_DIR = path.resolve(__dirname, '../../src/content/docspace/data/enriched');

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&gt;=/g, '≥')
    .replace(/&lt;=/g, '≤')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function cleanEnrichedFiles() {
  const files = fs.readdirSync(ENRICHED_DIR).filter(f => f.endsWith('.json'));
  let count = 0;

  for (const f of files) {
    const fpath = path.join(ENRICHED_DIR, f);
    const content = fs.readFileSync(fpath, 'utf8');

    if (content.includes('&amp;') || content.includes('&gt;') || content.includes('&lt;') || content.includes('&#39;')) {
      const decoded = decodeEntities(content);
      try {
        JSON.parse(decoded); // validate JSON syntax
        fs.writeFileSync(fpath, decoded, 'utf8');
        count++;
        console.log(`✅ Cleaned entities in: ${f}`);
      } catch (err) {
        console.error(`❌ Parse error after decode in ${f}:`, err.message);
      }
    }
  }

  console.log(`\n🎉 Total files cleaned: ${count}`);
}

cleanEnrichedFiles();
