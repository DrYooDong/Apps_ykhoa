#!/usr/bin/env node

/**
 * CliniPortal — Medical Humanizer & Slop Cleanup Script
 * Rà soát và làm sạch các tàn dư chatbot AI / NotebookLM conversational fluff
 * trong các kho tri thức y khoa (đặc biệt ưu tiên CD, PDDT, DTH, YTNC).
 *
 * Tuân thủ nghiêm ngặt nguyên tắc của skill `medical-humanizer`:
 * 1. BẢO TOÀN 100% DỮ LIỆU Y HỌC (Liều lượng, chỉ số, mã ICD, tên thuốc, khuyến cáo).
 * 2. LOẠI BỎ TRIỆT ĐỂ:
 *    - Các câu gợi ý hội thoại ở cuối bài ("💡 Gợi ý tiếp theo...", "Bạn có muốn tôi biên soạn...")
 *    - Các câu dẫn nhập rườm rà ("Dưới đây là...", "Chào bạn...")
 *    - Các cụm từ tàn dư NotebookLM ("trong Notebook này", "thuộc tài liệu xyz.pdf")
 * 3. CHUẨN HÓA MỤC TRÍCH DẪN EBM.
 *
 * Cú pháp:
 *   node tools/scripts/clean-vault-slop.mjs [--dry-run] [--apply] [--vault <dir>]
 */

import fs from 'fs';
import path from 'path';

const VAULT_ROOT = path.resolve('knowledge-vault');
const PRIORITY_VAULTS = [
  '2.3. Kho chẩn đoán',
  '2.4. Kho phác đồ điều trị',
  '1.4. Kho dịch tễ học',
  '1.5. Kho yếu tố nguy cơ'
];

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || !args.includes('--apply');
const isAll = args.includes('--all');
const specificVault = args.find((a, i) => args[i - 1] === '--vault');

console.log('\n=============================================================');
console.log('🩺  CLINIPORTAL VAULT MEDICAL HUMANIZER & CLEANUP TOOL');
console.log('=============================================================');
console.log(`Chế độ: ${isDryRun ? '🔍 DRY RUN (Chỉ kiểm tra, không ghi đè)' : '⚡ APPLY (Thực hiện sửa đổi file)'}`);
if (specificVault) console.log(`Phạm vi: ${specificVault}`);
else if (isAll) console.log('Phạm vi: Toàn bộ 21 Kho Knowledge Vault');
else console.log('Phạm vi: 4 Kho ưu tiên (CD, PDDT, DTH, YTNC)');
console.log('=============================================================\n');

let scannedFiles = 0;
let modifiedFiles = 0;
const modifiedList = [];

function cleanSlopFromContent(content, filePath) {
  let cleaned = content;
  let hasChanges = false;

  // 1. Loại bỏ các câu kết gợi ý hội thoại chatbot ở cuối file
  // Ví dụ: 💡 **Gợi ý tiếp theo**: Bạn có muốn tôi biên soạn tiếp...
  const endingPatterns = [
    /\r?\n(?:---|___|\*\*\*)\r?\n+💡\s*\*\*Gợi ý tiếp theo\*\*[\s\S]*$/i,
    /\r?\n+💡\s*\*\*Gợi ý tiếp theo\*\*[\s\S]*$/i,
    /\r?\n+(?:💡\s*)?(?:Bạn có muốn tôi|Nếu bạn cần|Hy vọng bài viết|Tôi có thể hỗ trợ|Bạn có thắc mắc)[\s\S]*$/i,
    /\r?\n+(?:Chúc bạn|Rất vui được|Hãy cho tôi biết nếu)[\s\S]*$/i
  ];

  for (const pat of endingPatterns) {
    if (pat.test(cleaned)) {
      cleaned = cleaned.replace(pat, '');
      hasChanges = true;
    }
  }

  // 2. Làm sạch cụm từ nội bộ liên quan đến Notebook / NotebookLM
  const notebookPhrases = [
    /có trong Notebook/gi,
    /trong Notebook này/gi,
    /trong notebook của bạn/gi,
    /tài liệu trong Notebook/gi,
    /trong Notebook/gi,
    /từ Notebook này/gi
  ];

  for (const np of notebookPhrases) {
    if (np.test(cleaned)) {
      cleaned = cleaned.replace(np, 'trong y văn y học chứng cứ');
      hasChanges = true;
    }
  }

  // Làm sạch các file PDF thô nội bộ như "Thuộc tài liệu: _xyz.pdf_"
  if (/(?:thuộc tài liệu|nguồn tài liệu|tài liệu):\s*_[a-zA-Z0-9_.-]+\.pdf_\s*(?:trong y văn)?/gi.test(cleaned)) {
    cleaned = cleaned.replace(/(?:thuộc tài liệu|nguồn tài liệu|tài liệu):\s*_[a-zA-Z0-9_.-]+\.pdf_\s*(?:trong y văn)?/gi, 'Tài liệu tham khảo chuyên ngành');
    hasChanges = true;
  }

  // 3. Làm sạch lời chào hoặc mở đầu chatbot không cần thiết ở đầu body
  // Tách frontmatter và body
  const fmMatch = cleaned.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (fmMatch) {
    const fm = fmMatch[0];
    let body = cleaned.slice(fm.length);

    const introPatterns = [
      /^(?:\r?\n)*(?:Chào bạn!|Xin chào!)\s*/i,
      /^(?:\r?\n)*(?:Dưới đây là|Sau đây là)\s+(?:bài viết|tổng hợp|nội dung|bản tóm tắt)[\s\S]*?:\r?\n+/i
    ];

    for (const pat of introPatterns) {
      if (pat.test(body)) {
        body = body.replace(pat, '');
        hasChanges = true;
      }
    }

    cleaned = fm + body.trimStart();
  }

  // 4. Tránh dư thừa dòng trống ở cuối file
  cleaned = cleaned.trimEnd() + '\n';

  return { cleaned, hasChanges };
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (!entry.name.startsWith('.') && !entry.name.startsWith('_')) {
        processDirectory(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      scannedFiles++;
      const original = fs.readFileSync(fullPath, 'utf-8');
      const { cleaned, hasChanges } = cleanSlopFromContent(original, fullPath);

      if (hasChanges && cleaned !== original) {
        modifiedFiles++;
        const rel = path.relative(VAULT_ROOT, fullPath).replace(/\\/g, '/');
        modifiedList.push(rel);

        if (!isDryRun) {
          fs.writeFileSync(fullPath, cleaned, 'utf-8');
        }
      }
    }
  }
}

const allVaultDirs = fs.readdirSync(VAULT_ROOT, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_'))
  .map(d => d.name);

const targetDirs = specificVault ? [specificVault] : (isAll ? allVaultDirs : PRIORITY_VAULTS);

targetDirs.forEach(dirName => {
  const p = path.join(VAULT_ROOT, dirName);
  if (fs.existsSync(p)) {
    console.log(`📂 Đang quét: ${dirName}...`);
    processDirectory(p);
  }
});

console.log('\n=============================================================');
console.log('📊 KẾT QUẢ RÀ SOÁT LÀM SẠCH VAULT');
console.log('=============================================================');
console.log(`Số file đã quét       : ${scannedFiles}`);
console.log(`Số file có vết AI cần sửa: ${modifiedFiles}`);
console.log('=============================================================');

if (modifiedList.length > 0) {
  console.log(`\nDanh sách các file ${isDryRun ? 'sẽ được làm sạch' : 'đã được làm sạch'} (${modifiedList.length} files):`);
  modifiedList.forEach((f, idx) => {
    console.log(`  ${idx + 1}. ${f}`);
  });
}

if (isDryRun) {
  console.log('\n💡 Đây là lượt chạy thử (DRY RUN). Để áp dụng thực tế, chạy:');
  console.log('   node tools/scripts/clean-vault-slop.mjs --apply\n');
} else {
  console.log(`\n✅ Đã làm sạch thành công ${modifiedFiles} file!`);
}
