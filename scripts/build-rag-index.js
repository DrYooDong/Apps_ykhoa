const fs = require('fs');
const path = require('path');

const VAULT_DIR = path.join(__dirname, '../knowledge-vault');
const OUT_FILE = path.join(VAULT_DIR, '_resources/data/search-index.json');

function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.startsWith('.') || file.startsWith('_')) continue;
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

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { metadata: {}, body: content };
  
  const lines = match[1].split('\n');
  const metadata = {};
  
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    
    // Xử lý chuỗi hoặc mảng đơn giản
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    } else if (val.startsWith('[') && val.endsWith(']')) {
      try {
        // Thay thế dấu ngoặc kép đơn thành kép để parse được JSON nếu cần, hoặc dùng hàm cẩu thả
        val = JSON.parse(val);
      } catch (e) {
        val = [];
      }
    }
    metadata[key] = val;
  }
  
  const body = content.slice(match[0].length).trim();
  return { metadata, body };
}

function chunkContent(body) {
  // Chia khối nội dung dựa trên các thẻ tiêu đề (### hoặc ####)
  // Biểu thức chính quy: Nhìn về phía trước tìm một dòng mới theo sau là ký tự #
  const blocks = body.split(/\n(?=#{1,4}\s)/);
  const chunks = [];
  
  for (let block of blocks) {
    block = block.trim();
    if (!block) continue;
    
    let heading = "Tổng quan";
    const lines = block.split('\n');
    if (lines[0].match(/^#{1,4}\s/)) {
      heading = lines[0].replace(/^#{1,4}\s/, '').trim();
      // Remove heading from block body to save space? Tùy, cứ giữ nguyên để AI có bối cảnh
    }
    
    chunks.push({
      heading,
      content: block
    });
  }
  
  return chunks;
}

function buildIndex() {
  const mdFiles = walkSync(VAULT_DIR);
  const indexData = [];
  
  console.log(`Đang phân tích ${mdFiles.length} files...`);

  for (const file of mdFiles) {
    const rawContent = fs.readFileSync(file, 'utf-8');
    const { metadata, body } = parseFrontmatter(rawContent);
    const relativePath = path.relative(VAULT_DIR, file).replace(/\\/g, '/');
    
    const chunks = chunkContent(body);
    
    // Ghép tên thư mục mẹ vào Title nếu Title chưa có
    const parentDir = path.basename(path.dirname(file));
    let baseTitle = metadata.title || path.basename(file, '.md');
    let finalTitle = baseTitle;
    if (parentDir && parentDir !== 'knowledge-vault' && !baseTitle.toLowerCase().includes(parentDir.toLowerCase())) {
      finalTitle = `${parentDir} - ${baseTitle}`;
    }
    
    chunks.forEach((chunk, i) => {
      indexData.push({
        id: `${relativePath}#chunk-${i}`,
        file: relativePath,
        title: finalTitle,
        specialty: metadata.specialty || 'General',
        tags: Array.isArray(metadata.tags) ? metadata.tags : [],
        heading: chunk.heading,
        content: chunk.content
      });
    });
  }
  
  fs.writeFileSync(OUT_FILE, JSON.stringify(indexData, null, 2), 'utf-8');
  console.log(`\nHoàn thành! Đã tạo Index với ${indexData.length} chunks (khối ngữ nghĩa).`);
  console.log(`File lưu tại: ${OUT_FILE}`);
}

buildIndex();
