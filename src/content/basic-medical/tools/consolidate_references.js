const fs = require('fs');
const path = require('path');

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

function formatInlineHtml(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.startsWith('---')) return false;

  const parts = content.split('---');
  if (parts.length < 3) return false;

  let rawYaml = parts[1];
  let rawBody = parts.slice(2).join('---').trim();

  // Determine module & back link
  let backUrl = '#/basic-medical/giai-phau-sinh-ly';
  let backText = 'Mục Lục Giải Phẫu & Sinh Lý';

  if (filePath.includes('pathophysiology-cases')) {
    backUrl = '#/basic-medical/co-che-benh-sinh';
    backText = 'Mục Lục Cơ Chế Bệnh Sinh';
  } else if (filePath.includes('biochemistry')) {
    backUrl = '#/basic-medical/hoa-sinh';
    backText = 'Mục Lục Hóa Sinh Y Học';
  } else if (filePath.includes('epidemiology')) {
    backUrl = '#/basic-medical/dich-te-hoc';
    backText = 'Mục Lục Dịch Tễ Học';
  }

  // Normalize multiple consecutive ---
  rawBody = rawBody.replace(/(?:\r?\n\s*---\s*){2,}/g, '\n\n---\n\n');

  // Check if "Nội Dung Chuyên Đề" in frontmatter
  rawYaml = rawYaml.replace(/title:\s*["']?Nội Dung Chuyên Đề (\d+)["']?/gi, 'title: "Tài Liệu Tham Khảo EBM"');
  rawYaml = rawYaml.replace(/-\s+Nội Dung Chuyên Đề (\d+)/gi, '- Tài Liệu Tham Khảo EBM');

  // Fix "Nội Dung Chuyên Đề X" heading in body
  rawBody = rawBody.replace(/##\s*(\d+)\.\s*Nội Dung Chuyên Đề \d+\s*\{#sec-(\d+)\}/gi, '## $1. Tài Liệu Tham Khảo EBM {#sec-$2}');

  // Find all headings
  const headingMatches = [...rawBody.matchAll(/##\s+(\d+)\.\s*([^#\n]+)\s*\{#sec-(\d+)\}/g)];
  if (headingMatches.length === 0) {
    console.warn('No headings in ' + filePath);
    return false;
  }

  const lastHeading = headingMatches[headingMatches.length - 1];
  const lastHeadingIndex = lastHeading.index;
  const lastHeadingText = lastHeading[0];
  const lastHeadingNum = lastHeading[1];
  const lastHeadingTitle = lastHeading[2].trim();
  const lastSecId = lastHeading[3];

  // Content before the last heading (strip any trailing ---)
  let beforeLastHeading = rawBody.substring(0, lastHeadingIndex).trim();
  beforeLastHeading = beforeLastHeading.replace(/\s*---\s*$/g, '').trim();

  // Content of the last section
  let lastSectionContent = rawBody.substring(lastHeadingIndex + lastHeadingText.length).trim();

  // Extract reference items from lastSectionContent
  let refItems = [];
  const liMatches = [...lastSectionContent.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  if (liMatches.length > 0) {
    refItems = liMatches.map(m => m[1].trim());
  } else {
    // Remove citation-box, btn-row, comments
    const rawLines = lastSectionContent
      .replace(/<div class="citation-box"[\s\S]*?<\/div>/gi, '')
      .replace(/<div class="btn-row"[\s\S]*?<\/div>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim()
      .split('\n');

    let currentItem = '';
    for (let line of rawLines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const isBullet = /^[-*]\s+/.test(trimmed);
      const isNumber = /^\d+\.\s+/.test(trimmed);

      if (isBullet || isNumber) {
        if (currentItem) {
          refItems.push(currentItem.trim());
        }
        currentItem = trimmed.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '');
      } else if (currentItem) {
        currentItem += ' ' + trimmed;
      } else {
        currentItem = trimmed;
      }
    }
    if (currentItem) {
      refItems.push(currentItem.trim());
    }
  }

  // Format clean list
  let formattedLis = refItems.map(item => {
    let clean = formatInlineHtml(item);
    return `    <li>${clean}</li>`;
  }).join('\n');

  if (!formattedLis) {
    formattedLis = `    <li>Tài liệu tham khảo chuyên ngành cập nhật theo khuyến cáo EBM mới nhất.</li>`;
  }

  // Clean heading title for reference section
  let finalHeadingTitle = lastHeadingTitle;
  if (/Nội Dung Chuyên Đề/i.test(finalHeadingTitle) || !/Tài Liệu|Tham Khảo|Y Văn|References/i.test(finalHeadingTitle)) {
    finalHeadingTitle = 'Tài Liệu Tham Khảo EBM';
  }

  const newLastSection = `## ${lastHeadingNum}. ${finalHeadingTitle} {#sec-${lastSecId}}

<div class="citation-box">
  <div style="font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 8px; font-size: 0.92rem;">
    <i class="fa-solid fa-book-bookmark" style="color: var(--color-primary, #0284c7);"></i>
    <span>Trích dẫn Y văn & Tài liệu tham khảo (EBM / AMA):</span>
  </div>
  <ol style="margin: 0; padding-left: 1.25rem; line-height: 1.8; color: var(--color-text-muted, #475569); font-size: 0.88rem;">
${formattedLis}
  </ol>
</div>

<!-- HÀNG NÚT ĐIỀU HƯỚNG SPA -->
<div class="btn-row">
  <a href="${backUrl}" class="btn btn-primary">
    <i class="fa-solid fa-arrow-left"></i> Quay lại ${backText}
  </a>
  <a href="#sec-1" class="btn">
    <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
  </a>
</div>`;

  const newBody = `${beforeLastHeading}\n\n---\n\n${newLastSection}\n`;
  const newContent = `---${rawYaml}--- \n\n${newBody}`;

  fs.writeFileSync(filePath, newContent, 'utf8');
  return true;
}

// Run for all files
const allFiles = getMdxFiles('d:/Apps/Apps_ykhoa/src/content/basic-medical');
console.log(`Consolidating ${allFiles.length} files...`);

let count = 0;
allFiles.forEach(f => {
  if (processFile(f)) {
    count++;
  }
});

console.log(`Cleaned and consolidated references across ${count}/${allFiles.length} MDX files.`);
