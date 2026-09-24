/**
 * CliniPortal — Bundle Specialty Symptoms & Master Symptom Dictionary Generator
 * Đồng bộ dữ liệu các tệp triệu chứng trong src/content/knowledge-vault/data/symptoms/*.json
 * vào:
 *   1. Master Symptoms JSON (clinical-rules-symptoms.json) - phục vụ website runtime
 *   2. Master Symptom Dictionary Markdown (DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md) - nạp vào NotebookLM
 * 
 * Chạy bằng: node tools/scripts/bundle-symptoms.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../src/content/knowledge-vault/data');
const SYMPTOMS_DIR = path.join(DATA_DIR, 'symptoms');
const OUT_SYMPTOMS_PATH = path.join(DATA_DIR, 'clinical-rules-symptoms.json');
const OUT_MD_DICT_PATH = path.join(DATA_DIR, 'DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md');

const SYSTEM_NAMES = {
  'toan-than.json': 'Toàn thân & Sinh hiệu chung',
  'tim-mach.json': 'Hệ Tim mạch & Huyết động',
  'ho-hap.json': 'Hệ Hô hấp & Lồng ngực',
  'tieu-hoa.json': 'Hệ Tiêu hóa, Gan mật & Ổ bụng',
  'than-kinh.json': 'Hệ Thần kinh & Ý thức',
  'da-niem.json': 'Da niêm & Dị ứng lâm sàng',
  'can-lam-sang.json': 'Cận lâm sàng (Huyết học, Sinh hóa, Vi sinh, CĐHA)',
  'tiet-nieu.json': 'Hệ Tiết niệu & Chức năng thận',
  'noi-tiet.json': 'Hệ Nội tiết & Chuyển hóa',
  'huyet-hoc.json': 'Huyết học & Đông máu',
  'san-phu-khoa.json': 'Sản phụ khoa',
  'tien-can.json': 'Tiền căn & Yếu tố nguy cơ nền'
};

function formatMap(map) {
  if (!map) return '—';
  if (map.val !== undefined) return `\`${map.fld} ${map.op} ${map.val}\``;
  if (map.valNam !== undefined || map.valNu !== undefined) {
    return `\`Nam: ${map.fld} ${map.op} ${map.valNam} | Nữ: ${map.valNu}\``;
  }
  return `\`${map.fld} ${map.op}\``;
}

function generateMarkdownDictionary(itemsByFile, totalCount) {
  const nowStr = new Date().toISOString().split('T')[0];
  let md = `# 📘 CLINIPORTAL — DANH MỤC TỪ VỰNG LÂM SÀNG CHUẨN (MASTER SYMPTOM DICTIONARY)

> **Phiên bản**: v5.0 | **Ngày cập nhật**: ${nowStr} | **Tổng số triệu chứng chuẩn**: ${totalCount}
> **Vị trí lưu trữ**: \`src/content/knowledge-vault/data/DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md\`
> **Mục đích**: Bản đồ từ vựng tham chiếu chuẩn mực (Anchor Vocabulary). Dùng để nạp trực tiếp vào **Google NotebookLM** cùng với tài liệu Guideline để AI đối chiếu, tái sử dụng mã ID sẵn có và tuyệt đối tránh tạo triệu chứng trùng lặp.

---

## 🧭 HƯỚNG DẪN DÀNH CHO AI (SYSTEM PROMPT RULES CHO NOTEBOOKLM)

Khi bạn (AI / NotebookLM) phân tích tài liệu lâm sàng/Guideline và trích xuất dữ liệu bệnh học (Prompt 05, Prompt 06):

1. **TRA CỨU TRƯỚC (Look up first)**:
   - Trước khi điền trường \`symptomIds\` trong tiêu chuẩn hoặc \`selected\` trong ca mẫu, **BẮT BUỘC** tra cứu bảng danh mục từ vựng dưới đây.
2. **TÁI SỬ DỤNG MÃ ID HIỆN HỮU (Reuse Existing IDs)**:
   - Nếu triệu chứng trong Guideline hoặc bệnh án tương đương hoặc là một biến thể ngữ nghĩa (nằm trong cột *Từ khóa & Biến thể / Aliases*) → **BẮT BUỘC dùng lại \`Mã ID chuẩn\`** đã có.
   - Ví dụ:
     - Thấy "sốt cao", "sốt > 38°C", "nóng sốt" → Dùng \`sot\`.
     - Thấy "sốt cao liên tục ngày 1-7", "sốt dengue đột ngột" → Dùng \`tc_sot_cao_dot_ngot_duoi_7_ngay\`.
     - Thấy "mạch nhanh xoang", "nhịp tim > 100" → Dùng \`mach_nhanh\`.
     - Thấy "hct tăng dốc đứng", "cô đặc máu" → Dùng \`tc_co_dac_mau_hct_tang_tren_20_phan_tram\`.
     - Thấy "tiểu cầu tụt < 100 G/L" → Dùng \`tc_giam_tieu_cau_duoi_100_g_l\`.
3. **KHI NÀO ĐƯỢC PHÉP ĐỀ XUẤT TRIỆU CHỨNG MỚI?**:
   - CHỈ KHI NÀO triệu chứng / dấu hiệu / nghiệm pháp / xét nghiệm đó **HOÀN TOÀN MỚI**, đặc thù cho bệnh lý đang nạp và chưa từng xuất hiện trong bất kỳ mục nào dưới đây.
   - Khi tạo ID mới, phải tuân thủ nghiêm ngặt:
     - Viết thường không dấu, dùng dấu gạch dưới \`_\` (ví dụ: \`dau_nguc_kieu_mang_phoi\`, \`ran_no_khu_tru\`).
     - **KHÔNG** dùng tiền tố tùy tiện như \`tc_\`, \`c_\`, \`trieu_chung_\` (các tiền tố cũ chỉ để tương thích ngược).
     - Bắt buộc khai báo đầy đủ trong mảng \`trieuChungMoi\` kèm: \`id\`, \`ten\`, \`nhom\`, \`loai\`, \`tuKhoa\`, \`aliases\`, \`map\`.

---

## 🗂️ BẢNG TỪ VỰNG CHI TIẾT THEO HỆ CƠ QUAN

`;

  let sectionIdx = 1;
  for (const [file, items] of Object.entries(itemsByFile)) {
    const sysTitle = SYSTEM_NAMES[file] || file;
    md += `### ${sectionIdx}. ${sysTitle} (\`${file}\` — ${items.length} mục)\n\n`;

    if (items.length === 0) {
      md += `*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*\n\n`;
      sectionIdx++;
      continue;
    }

    md += `| STT | Mã ID chuẩn | Tên triệu chứng lâm sàng | Loại | Từ khóa & Biến thể / Aliases | Ngưỡng tự suy |\n`;
    md += `|:---:|:---|:---|:---:|:---|:---:|\n`;

    items.forEach((item, idx) => {
      const stt = idx + 1;
      const code = `\`${item.id}\``;
      const ten = item.ten.replace(/\|/g, '\\|');
      const loai = (item.loai || []).join(', ').toUpperCase();
      const allKeywords = [
        ...(item.tuKhoa || []),
        ...(item.aliases || [])
      ].filter(Boolean);
      const kwStr = allKeywords.slice(0, 8).join(', ').replace(/\|/g, '\\|');
      const mapStr = formatMap(item.map);

      md += `| ${stt} | ${code} | ${ten} | ${loai} | ${kwStr} | ${mapStr} |\n`;
    });

    md += '\n';
    sectionIdx++;
  }

  md += `---
*Tài liệu tự động tạo bởi: \`tools/scripts/bundle-symptoms.mjs\` — CliniPortal Knowledge Engineering Squad.*
`;

  return md;
}

export function bundleSymptoms() {
  console.log('🔄 Đang gom các tệp triệu chứng theo hệ cơ quan từ:', SYMPTOMS_DIR);

  if (!fs.existsSync(SYMPTOMS_DIR)) {
    console.error('❌ Không tìm thấy thư mục symptoms!');
    return false;
  }

  const PREFERRED_ORDER = [
    'toan-than.json',
    'tim-mach.json',
    'ho-hap.json',
    'tieu-hoa.json',
    'than-kinh.json',
    'da-niem.json',
    'can-lam-sang.json',
    'tiet-nieu.json',
    'noi-tiet.json',
    'huyet-hoc.json',
    'san-phu-khoa.json',
    'tien-can.json'
  ];

  const allFiles = fs.readdirSync(SYMPTOMS_DIR).filter(f => f.endsWith('.json'));
  const files = [
    ...PREFERRED_ORDER.filter(f => allFiles.includes(f)),
    ...allFiles.filter(f => !PREFERRED_ORDER.includes(f))
  ];

  let allSymptoms = [];
  const itemsByFile = {};
  const seenIds = new Set();
  const summary = {};

  for (const file of files) {
    const fPath = path.join(SYMPTOMS_DIR, file);
    try {
      const items = JSON.parse(fs.readFileSync(fPath, 'utf8'));
      if (Array.isArray(items)) {
        summary[file] = items.length;
        itemsByFile[file] = items;
        for (const s of items) {
          if (seenIds.has(s.id)) {
            console.warn(`⚠️ Cảnh báo: Trùng lặp mã triệu chứng ID "${s.id}" trong ${file}!`);
          }
          seenIds.add(s.id);
          allSymptoms.push(s);
        }
      }
    } catch (e) {
      console.error(`❌ Lỗi đọc tệp ${file}:`, e.message);
    }
  }

  console.log(`\n✅ Đã quét và gom ${allSymptoms.length} triệu chứng từ ${files.length} tệp hệ cơ quan:`);
  for (const [file, count] of Object.entries(summary)) {
    console.log(`   - ${file.padEnd(20)}: ${count} triệu chứng`);
  }

  // 1. Ghi vào clinical-rules-symptoms.json (cho website runtime)
  fs.writeFileSync(OUT_SYMPTOMS_PATH, JSON.stringify(allSymptoms, null, 2) + '\n', 'utf8');
  console.log(`\n✅ [1/2] Đã đồng bộ Master Symptoms JSON: ${OUT_SYMPTOMS_PATH}`);

  // 2. Ghi vào DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md (cho NotebookLM)
  const mdContent = generateMarkdownDictionary(itemsByFile, allSymptoms.length);
  fs.writeFileSync(OUT_MD_DICT_PATH, mdContent, 'utf8');
  console.log(`✅ [2/2] Đã sinh Master Symptom Dictionary Markdown cho NotebookLM: ${OUT_MD_DICT_PATH}`);

  console.log('🎉 Hoàn tất gom cụm triệu chứng và xuất từ điển kép!\n');
  return true;
}

// Chạy trực tiếp nếu là entry point
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  bundleSymptoms();
}
