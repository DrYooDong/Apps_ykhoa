const fs = require('fs');
const path = require('path');

const guidelinesDir = path.join(__dirname, '../src/content/ebm/guidelines');

console.log('=== 1. KIỂM TRA ĐƯỜNG DẪN FILE TÓM TẮT TRONG KHO GUIDELINES ===');
const registryFile = path.join(guidelinesDir, 'kho-guidelines-registry.ts');
let brokenLinks = 0;
let validLinks = 0;

if (fs.existsSync(registryFile)) {
  const regContent = fs.readFileSync(registryFile, 'utf8');
  // Match 'file': '...' or "file": "..." or path: "..."
  const fileRegex = /['"](kho-guidelines\/[^'"]+\.html)['"]/g;
  let match;
  while ((match = fileRegex.exec(regContent)) !== null) {
    const relHtml = match[1];
    const fullHtmlPath = path.join(guidelinesDir, relHtml);
    if (fs.existsSync(fullHtmlPath)) {
      validLinks++;
    } else {
      console.log(`❌ Không tìm thấy file: ${relHtml}`);
      brokenLinks++;
    }
  }
  console.log(`Kết quả: ${validLinks} file tồn tại hợp lệ, ${brokenLinks} file bị thiếu link.`);
}

console.log('\n=== 2. KIỂM TRA ĐƯỜNG DẪN STATIC TRONG GUIDELINESDATA.TS ===');
const dataFile = path.join(guidelinesDir, 'guidelinesdata.ts');
if (fs.existsSync(dataFile)) {
  const dataContent = fs.readFileSync(dataFile, 'utf8');
  const fileRegex = /['"](kho-guidelines\/[^'"]+\.html)['"]/g;
  let match;
  let dataBroken = 0;
  let dataValid = 0;
  while ((match = fileRegex.exec(dataContent)) !== null) {
    const relHtml = match[1];
    const fullHtmlPath = path.join(guidelinesDir, relHtml);
    if (fs.existsSync(fullHtmlPath)) {
      dataValid++;
    } else {
      console.log(`❌ guidelinesdata.ts chứa link hỏng: ${relHtml}`);
      dataBroken++;
    }
  }
  console.log(`Kết quả: ${dataValid} link file tóm tắt hợp lệ trong guidelinesdata.ts, ${dataBroken} file hỏng.`);
}

console.log('\n=== 3. KIỂM TRA CÁC ĐƯỜNG DẪN TƯƠNG ĐỐI CSS/JS TRONG GUIDELINES.HTML ===');
const htmlFile = path.join(guidelinesDir, 'guidelines.html');
const html = fs.readFileSync(htmlFile, 'utf8');

// link href
const linkRegex = /<link[^>]+href=["']([^"']+)["']/g;
let lMatch;
while ((lMatch = linkRegex.exec(html)) !== null) {
  const href = lMatch[1];
  if (href.startsWith('http') || href.startsWith('//')) continue;
  const target = path.resolve(guidelinesDir, href);
  if (!fs.existsSync(target)) {
    console.log(`❌ <link> hỏng: ${href} (đường dẫn: ${target})`);
  } else {
    console.log(`✅ <link> OK: ${href}`);
  }
}

// script src
const srcRegex = /<script[^>]+src=["']([^"']+)["']/g;
let sMatch;
while ((sMatch = srcRegex.exec(html)) !== null) {
  const src = sMatch[1];
  if (src.startsWith('http') || src.startsWith('//')) continue;
  const target = path.resolve(guidelinesDir, src);
  if (!fs.existsSync(target)) {
    console.log(`❌ <script> hỏng: ${src} (đường dẫn: ${target})`);
  } else {
    console.log(`✅ <script> OK: ${src}`);
  }
}
