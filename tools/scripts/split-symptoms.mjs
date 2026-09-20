/**
 * CliniPortal — Split Symptoms to Specialty Files
 * Phân tách 323 triệu chứng từ clinical-rules-symptoms.json sang thư mục
 * src/content/knowledge-vault/data/symptoms/*.json theo hệ cơ quan.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../src/content/knowledge-vault/data');
const SYMPTOMS_DIR = path.join(DATA_DIR, 'symptoms');
const INPUT_FILE = path.join(DATA_DIR, 'clinical-rules-symptoms.json');

if (!fs.existsSync(SYMPTOMS_DIR)) {
  fs.mkdirSync(SYMPTOMS_DIR, { recursive: true });
}

const rawSymptoms = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));

// Bản đồ phân loại file và chuẩn hóa nhóm
const FILE_MAP = {
  'toan-than.json': 'Toàn thân',
  'tim-mach.json': 'Tim mạch',
  'ho-hap.json': 'Hô hấp',
  'tieu-hoa.json': 'Tiêu hóa',
  'tiet-nieu.json': 'Tiết niệu',
  'noi-tiet.json': 'Nội tiết',
  'than-kinh.json': 'Thần kinh',
  'da-niem.json': 'Da niêm',
  'huyet-hoc.json': 'Huyết học',
  'san-phu-khoa.json': 'Sản phụ khoa',
  'can-lam-sang.json': 'Cận lâm sàng',
  'tien-can.json': 'Tiền căn'
};

const buckets = {
  'toan-than.json': [],
  'tim-mach.json': [],
  'ho-hap.json': [],
  'tieu-hoa.json': [],
  'tiet-nieu.json': [],
  'noi-tiet.json': [],
  'than-kinh.json': [],
  'da-niem.json': [],
  'huyet-hoc.json': [],
  'san-phu-khoa.json': [],
  'can-lam-sang.json': [],
  'tien-can.json': []
};

for (const sym of rawSymptoms) {
  let targetFile = 'toan-than.json';
  let targetNhom = sym.nhom;

  // Khử lỗi HTML entities nếu có trong ten hoặc tuKhoa
  if (sym.ten && sym.ten.includes('&amp;')) {
    sym.ten = sym.ten.replace(/&amp;/g, '&');
  }
  if (sym.nhom && sym.nhom.includes('&amp;')) {
    sym.nhom = sym.nhom.replace(/&amp;/g, '&');
  }

  // Xử lý theo từng trường hợp
  if (sym.nhom === 'Toàn thân') {
    targetFile = 'toan-than.json';
    targetNhom = 'Toàn thân';
  } else if (sym.nhom === 'Tim mạch') {
    targetFile = 'tim-mach.json';
    targetNhom = 'Tim mạch';
  } else if (sym.nhom === 'Hô hấp') {
    targetFile = 'ho-hap.json';
    targetNhom = 'Hô hấp';
  } else if (sym.nhom === 'Tiêu hóa' || sym.nhom === 'Tiêu hóa - Gan mật') {
    targetFile = 'tieu-hoa.json';
    targetNhom = 'Tiêu hóa';
  } else if (sym.nhom === 'Tiết niệu' || sym.nhom === 'Thận - Tiết niệu') {
    targetFile = 'tiet-nieu.json';
    targetNhom = 'Tiết niệu';
  } else if (sym.nhom === 'Nội tiết') {
    targetFile = 'noi-tiet.json';
    targetNhom = 'Nội tiết';
  } else if (sym.nhom === 'Thần kinh') {
    targetFile = 'than-kinh.json';
    targetNhom = 'Thần kinh';
  } else if (sym.nhom === 'Da niêm') {
    targetFile = 'da-niem.json';
    targetNhom = 'Da niêm';
  } else if (sym.nhom === 'Huyết học') {
    targetFile = 'huyet-hoc.json';
    targetNhom = 'Huyết học';
  } else if (sym.nhom === 'Sản phụ khoa') {
    targetFile = 'san-phu-khoa.json';
    targetNhom = 'Sản phụ khoa';
  } else if (sym.nhom === 'Cận lâm sàng') {
    targetFile = 'can-lam-sang.json';
    targetNhom = 'Cận lâm sàng';
  } else if (sym.nhom === 'Tiền căn' || sym.nhom === 'Dịch tễ' || sym.nhom.includes('Tiền căn')) {
    targetFile = 'tien-can.json';
    targetNhom = 'Tiền căn';
  } else if (sym.nhom === 'Mắt') {
    targetFile = 'da-niem.json';
    targetNhom = 'Da niêm';
  } else if (sym.id === 'nao_gan') {
    targetFile = 'than-kinh.json';
    targetNhom = 'Thần kinh';
  } else if (sym.id === 'sot_cao_co_giat_ret_run' || sym.id === 'khong_sot_cao_co_giat' || sym.nhom === 'Cảnh báo nguy hiểm') {
    targetFile = 'toan-than.json';
    targetNhom = 'Toàn thân';
  } else if (sym.id === 'alt_ast_tang_nhe' || sym.id === 'ky_sinh_truung_sot_ret_duong_tinh') {
    targetFile = 'can-lam-sang.json';
    targetNhom = 'Cận lâm sàng';
  } else if (
    sym.nhom === 'Khám thực thể' || 
    sym.nhom === 'Cấp cứu' || 
    sym.nhom === 'Triệu chứng báo động' ||
    sym.nhom === 'Lâm sàng'
  ) {
    // Các triệu chứng tiêu hóa / gan mật
    targetFile = 'tieu-hoa.json';
    targetNhom = 'Tiêu hóa';
  }

  sym.nhom = targetNhom;
  buckets[targetFile].push(sym);
}

// Ghi từng file
let totalExported = 0;
console.log('🔄 Đang xuất các tệp triệu chứng vào:', SYMPTOMS_DIR);
for (const [file, items] of Object.entries(buckets)) {
  const filePath = path.join(SYMPTOMS_DIR, file);
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2) + '\n', 'utf8');
  console.log(`   - ${file.padEnd(20)}: ${items.length} triệu chứng (Nhóm: ${FILE_MAP[file]})`);
  totalExported += items.length;
}

console.log(`\n✅ Đã phân tách thành công ${totalExported}/${rawSymptoms.length} triệu chứng vào 12 tệp!`);
