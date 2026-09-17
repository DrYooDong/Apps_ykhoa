import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIR = path.resolve(__dirname, '../../src/content/ebm/guidelines/kho-guidelines');

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.mdx'));
let converted = 0;

for (const file of files) {
  const p = path.join(DIR, file);
  const text = fs.readFileSync(p, 'utf8');
  if (text.includes('\r\n')) {
    fs.writeFileSync(p, text.replace(/\r\n/g, '\n'), 'utf8');
    converted++;
  }
}

console.log(`Normalized CRLF -> LF for ${converted} files.`);
