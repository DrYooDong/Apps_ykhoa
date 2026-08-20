const fs = require('fs');
const path = require('path');

const guidelinesDir = path.join(__dirname, '../src/content/ebm/guidelines');
const htmlFile = path.join(guidelinesDir, 'guidelines.html');
const html = fs.readFileSync(htmlFile, 'utf8');

// 1. Trích xuất toàn bộ các event handler trong guidelines.html
const attrRegex = /\b(on[a-z]+)\s*=\s*"([^"]+)"/gi;
let match;
const handlersList = [];
while ((match = attrRegex.exec(html)) !== null) {
  handlersList.push({
    event: match[1],
    code: match[2].trim()
  });
}

console.log(`=== TỔNG SỐ INLINE HANDLER GẮN TRỰC TIẾP TRÊN HTML: ${handlersList.length} ===`);

// 2. Tìm tất cả các file TS/JS trong thư mục guidelines và liệt kê các export / window assignments
const tsFiles = [];
function collectFiles(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      collectFiles(full);
    } else if (item.endsWith('.ts') || item.endsWith('.js')) {
      tsFiles.push(full);
    }
  }
}
collectFiles(guidelinesDir);

const windowMembers = new Map();
const exportFns = new Map();

for (const file of tsFiles) {
  const rel = path.relative(guidelinesDir, file);
  const code = fs.readFileSync(file, 'utf8');

  // window.xxx = ...
  const winReg = /(?:window|\(window\s+as\s+any\))\.([a-zA-Z0-9_$]+)\s*=/g;
  let wMatch;
  while ((wMatch = winReg.exec(code)) !== null) {
    const name = wMatch[1];
    if (!windowMembers.has(name)) windowMembers.set(name, []);
    windowMembers.get(name).push(rel);
  }

  // export function xxx
  const expReg = /export\s+function\s+([a-zA-Z0-9_$]+)\s*\(/g;
  let eMatch;
  while ((eMatch = expReg.exec(code)) !== null) {
    const name = eMatch[1];
    if (!exportFns.has(name)) exportFns.set(name, []);
    exportFns.get(name).push(rel);
  }
}

// Thêm inline scripts trong HTML
const inlineScRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let scm;
while ((scm = inlineScRegex.exec(html)) !== null) {
  const scCode = scm[1];
  const fnReg = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
  let fnm;
  while ((fnm = fnReg.exec(scCode)) !== null) {
    windowMembers.set(fnm[1], ['inline <script> in guidelines.html']);
  }
}

console.log(`\n=== TỔNG SỐ HÀM / THUỘC TÍNH ĐƯỢC GẮN VÀO WINDOW: ${windowMembers.size} ===`);

// 3. Kiểm tra từng nút bấm / handler xem hàm được gọi có tồn tại trên window không
console.log('\n=== KIỂM TRA TỪNG NÚT BẤM / SỰ KIỆN ===');
const missing = [];
const verified = [];

for (const h of handlersList) {
  // Bỏ qua các JS statements thuần như if(...), setTimeout, document.getElementById...
  const rawCode = h.code;
  // Tìm các hàm gọi chính
  const calls = rawCode.match(/(?:window\.)?([a-zA-Z0-9_$]+)\s*\(/g) || [];
  for (const c of calls) {
    const fnName = c.replace(/^window\./, '').replace(/\($/, '').trim();
    if (['if', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'alert', 'confirm', 'prompt', 'stopPropagation', 'preventDefault', 'parseFloat', 'parseInt', 'Boolean', 'Number', 'String', 'click'].includes(fnName)) {
      continue;
    }
    if (windowMembers.has(fnName)) {
      verified.push({ fnName, file: windowMembers.get(fnName).join(', '), code: rawCode });
    } else {
      missing.push({ fnName, code: rawCode });
    }
  }
}

console.log(`✅ Các hàm nút bấm HỢP LỆ & ĐƯỢC ĐỊNH NGHĨA RÕ RÀNG: ${verified.length}`);
if (missing.length === 0) {
  console.log('🎉 100% NÚT BẤM VÀ SỰ KIỆN ĐỀU CÓ HÀM XỬ LÝ TRÊN WINDOW!');
} else {
  console.log(`⚠️ PHÁT HIỆN ${missing.length} HÀM CHƯA ĐƯỢC GẮN VÀO WINDOW:`);
  missing.forEach(m => console.log(`  - Hàm: ${m.fnName} trong code: "${m.code}"`));
}
