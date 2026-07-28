const fs = require('fs');
const path = require('path');

const VAULT_DIR = path.join(__dirname, '../knowledge-vault');

// Helper để đệ quy duyệt qua tất cả các file .md
function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else if (file.endsWith('.md')) {
      filelist.push(filepath);
    }
  }
  return filelist;
}

// Bóc tách chuyên khoa và tag từ đường dẫn thư mục
function extractMetadataFromPath(filepath) {
  const relativePath = path.relative(VAULT_DIR, filepath);
  const parts = relativePath.split(path.sep);
  
  // parts chứa các thư mục con, ví dụ: ['3. Nội tổng quát', '3.5. Thần kinh', 'Bệnh lý cụ thể', 'Đột quỵ', '2. Cơ chế bệnh sinh - P1.md']
  const filename = parts.pop();
  const title = path.basename(filename, '.md').replace(/^[\d\.\-]+\s*/, ''); // Bỏ các số đầu như "2. "
  
  // Lấy specialty (thường là cấp độ 2 hoặc 3 trong kiến trúc thư mục y khoa)
  let specialty = 'General';
  const tags = [];
  
  for (const part of parts) {
    const cleanPart = part.replace(/^[\d\.\-]+\s*/, ''); // Bỏ số
    tags.push(cleanPart);
    if (part.match(/Thần kinh|Tim mạch|Hô hấp|Tiêu hóa|Nội tiết|Thận|Truyền nhiễm|Huyết học/i)) {
      specialty = cleanPart;
    }
  }

  // Nếu không tìm thấy specialty cụ thể, lấy folder cấp cao nhất có thể
  if (specialty === 'General' && parts.length > 0) {
    specialty = parts[0].replace(/^[\d\.\-]+\s*/, '');
  }

  return { title, specialty, tags };
}

function processFiles() {
  const mdFiles = walkSync(VAULT_DIR);
  let processedCount = 0;
  let skippedCount = 0;

  for (const file of mdFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    
    // Kiểm tra nếu đã có frontmatter
    if (content.trim().startsWith('---')) {
      skippedCount++;
      continue;
    }

    const { title, specialty, tags } = extractMetadataFromPath(file);
    const tagsString = tags.length > 0 ? `[${tags.map(t => `"${t}"`).join(', ')}]` : `[]`;

    const date = new Date().toISOString().split('T')[0];

    const frontmatter = `---
title: "${title}"
specialty: "${specialty}"
tags: ${tagsString}
last_updated: "${date}"
---
`;

    const newContent = frontmatter + content;
    fs.writeFileSync(file, newContent, 'utf-8');
    processedCount++;
    console.log(`[Thêm Frontmatter] ${path.relative(VAULT_DIR, file)}`);
  }

  console.log(`\nHoàn thành! Đã gắn YAML cho ${processedCount} file. Đã bỏ qua ${skippedCount} file (đã có frontmatter).`);
}

processFiles();
