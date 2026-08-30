const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function getMdxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'components' && file !== 'images' && file !== 'tools') {
        results = results.concat(getMdxFiles(full));
      }
    } else if (file.endsWith('.mdx')) {
      results.push(full);
    }
  });
  return results;
}

function processMdxFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.startsWith('---')) return false;

  const parts = content.split('---');
  if (parts.length < 3) return false;

  let rawYaml = parts[1];
  let rawBody = parts.slice(2).join('---').trim();

  // 1. Clean frontmatter sections
  // Remove reference section items from YAML
  // Multi-line item: - id: "sec-X" \n number: X \n title: "Tài Liệu Tham Khảo..." \n icon: "..."
  rawYaml = rawYaml.replace(/\n\s*-\s+id:\s*["']?[^"'\n]+["']?\s*\n\s*number:\s*\d+\s*\n\s*title:\s*["']?[^"'\n]*(?:Tài Liệu|Tham Khảo|Trích Dẫn|References|Y Văn)[^"'\n]*["']?\s*\n\s*icon:\s*["']?[^"'\n]+["']?/gi, '');
  // 2-line item: - id: "sec-X" \n title: "Tài Liệu Tham Khảo..."
  rawYaml = rawYaml.replace(/\n\s*-\s+id:\s*["']?[^"'\n]+["']?\s*\n\s*title:\s*["']?[^"'\n]*(?:Tài Liệu|Tham Khảo|Trích Dẫn|References|Y Văn)[^"'\n]*["']?/gi, '');
  // Single-line item: - "Tài Liệu Tham Khảo..."
  rawYaml = rawYaml.replace(/\n\s*-\s+["']?[^"'\n]*(?:Tài Liệu|Tham Khảo|Trích Dẫn|References|Y Văn)[^"'\n]*["']?/gi, '');

  // 2. Clean body:
  // Remove reference section heading + citation box
  rawBody = rawBody.replace(/(?:\r?\n\s*---\s*)?\r?\n##\s*\d+\.\s*[^#\n]*(?:Tài Liệu|Tham Khảo|Trích Dẫn|References|Y Văn)[^\n]*\{#[^}]+\}\s*<div class="citation-box"[\s\S]*?<\/div>/gi, '');

  // Pattern 2: Any standalone citation-box
  rawBody = rawBody.replace(/<div class="citation-box"[\s\S]*?<\/div>/gi, '');

  // Pattern 3: Any standalone reference heading if leftover
  rawBody = rawBody.replace(/(?:\r?\n\s*---\s*)?\r?\n##\s*\d+\.\s*[^#\n]*(?:Tài Liệu|Tham Khảo|Trích Dẫn|References|Y Văn)[^\n]*\{#[^}]+\}/gi, '');

  // 3. Normalize hr separators before btn-row or end of document
  rawBody = rawBody.replace(/(?:\r?\n\s*---\s*)+(?=\s*(?:<!--[^\n]*-->\s*)?<div class="btn-row")/gi, '\n\n---\n\n');
  rawBody = rawBody.replace(/(?:\r?\n\s*---\s*)+$/g, '');

  // Ensure clean separation between body and btn-row
  if (!rawBody.includes('<div class="btn-row"')) {
    rawBody = rawBody.trim();
  }

  const newContent = `---${rawYaml}\n---\n\n${rawBody}\n`;
  fs.writeFileSync(filePath, newContent, 'utf8');
  return true;
}

const allMdxFiles = getMdxFiles(ROOT_DIR);
console.log(`Tìm thấy ${allMdxFiles.length} tệp MDX trong basic-medical.`);

let processedCount = 0;
allMdxFiles.forEach(f => {
  if (processMdxFile(f)) {
    processedCount++;
  }
});

console.log(`Đã xử lý xong ${processedCount}/${allMdxFiles.length} tệp MDX.`);
