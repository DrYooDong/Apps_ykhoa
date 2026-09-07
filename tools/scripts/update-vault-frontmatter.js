/**
 * CliniPortal — Knowledge Vault Frontmatter Generator & Updater
 * Tự động trích xuất metadata y khoa và gắn YAML Frontmatter cho các tệp Markdown mới
 */

const fs = require('fs');
const path = require('path');

const VAULT_DIR = path.resolve(__dirname, '../../knowledge-vault');
const DRY_RUN = process.argv.includes('--dry-run');

// Danh sách các từ viết tắt chuyên môn y khoa cần giữ nguyên in hoa
const MEDICAL_ACRONYMS = [
  'WHO', 'HIV', 'WSES', 'IAI', 'SIBO', 'ECM', 'DNA', 'RNA', 'CKD', 'AKI',
  'SSC', 'KDIGO', 'ESC', 'AACE', 'ADA', 'BYT', 'COPD', 'JRS', 'VUNA', 'APASL',
  'AJR', 'AASLD', 'KASL', 'ALF', 'EAS', 'NEJM', 'TIA', 'CUREUS', 'NICE', 'CDC',
  'FDA', 'GCS', 'EBM', 'TALTMC', 'SXH', 'DENGUE', 'HE', 'SBP', 'LVP', 'PICD',
  'ACS', 'NMCT', 'BCAA', 'BCAAs', 'LES', 'ILEP', 'COVID-19', 'SARS-CoV-2',
  'VGSV-B', 'VGSV-C', 'VGSV', 'HBV', 'HCV', 'HAV', 'HEV', 'HDV', 'EBV', 'CMV',
  'ARF', 'ARDS', 'ECMO', 'CRRT', 'PE', 'DVT', 'INR', 'aPTT', 'PT', 'GFR', 'eGFR', 'AHD'
];

// Bản đồ chuyên khoa -> slug tag hệ cơ quan
const SPECIALTY_SLUGS = {
  'tim mạch': 'tim-mach',
  'tiêu hóa': 'tieu-hoa',
  'tiêu hóa - gan mật': 'tieu-hoa',
  'gan mật': 'tieu-hoa',
  'hô hấp': 'ho-hap',
  'thần kinh': 'than-kinh',
  'thận - tiết niệu': 'than-tiet-nieu',
  'thận': 'than-tiet-nieu',
  'nội tiết - chuyển hóa': 'noi-tiet',
  'nội tiết': 'noi-tiet',
  'da liễu - cơ xương khớp': 'co-xuong-khop',
  'cơ xương khớp': 'co-xuong-khop',
  'cơ xương khớp & miễn dịch': 'co-xuong-khop',
  'truyền nhiễm & vi sinh': 'truyen-nhiem',
  'truyền nhiễm': 'truyen-nhiem',
  'hscc': 'hoi-suc',
  'hồi sức': 'hoi-suc',
  'hồi sức cấp cứu': 'hoi-suc',
  'cấp cứu & tim mạch': 'tim-mach',
  'nhi khoa': 'nhi-khoa',
  'sản phụ khoa': 'san-phu-khoa',
  'ngoại khoa': 'ngoai-khoa',
  'dinh dưỡng': 'tieu-hoa',
  'hóa sinh': 'noi-tiet',
  'chuyển hóa & sinh học phân tử': 'noi-tiet'
};

// Bản đồ thư mục kho -> { khoCode, loaiTag }
const KHO_CONFIG = {
  'Kho cập nhật': { code: 'cn', loai: 'guideline' },
  '1.3. Kho sinh lý bệnh': { code: 'slb', loai: 'disease' },
  '1.2. Kho hóa sinh y học': { code: 'hs', loai: 'biochemistry' },
  '1.4. Kho dịch tễ học': { code: 'dth', loai: 'epidemiology' },
  'Kho bệnh án': { code: 'ba', loai: 'case-presentation' },
  '1.1. Kho giải phẫu & sinh lý': { code: 'gpsl', loai: 'anatomy-physiology' },
  '1.5. Kho yếu tố nguy cơ': { code: 'ytnc', loai: 'risk-factor' },
  '2.1. Kho tiếp cận lâm sàng': { code: 'tc', loai: 'symptom' },
  '2.2. Kho kỹ năng lâm sàng': { code: 'kn', loai: 'skill' },
  '2.3. Kho chẩn đoán': { code: 'cd', loai: 'criteria' },
  '2.4. Kho phác đồ điều trị': { code: 'pddt', loai: 'protocol' },
  '2.5. Kho biến chứng': { code: 'bc', loai: 'complication' },
  '3.1. Kho công cụ & thang điểm': { code: 'cc', loai: 'tool' },
  '3.2. Kho dược thư & tương tác thuốc': { code: 'duoc', loai: 'drug' },
  '3.3. Kho cận lâm sàng & xét nghiệm': { code: 'cls', loai: 'lab' },
  'Kho dinh dưỡng lâm sàng': { code: 'tv', loai: 'nutrition' },
  'Kho nghiên cứu khoa học & EBM': { code: 'ebm', loai: 'ebm' },
  'Kho CDSS': { code: 'cdss', loai: 'cdss' },
  'Kho ICD-10': { code: 'icd10', loai: 'icd10' }
};

function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_resources')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSync(fullPath, filelist);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      filelist.push(fullPath);
    }
  }
  return filelist;
}

function cleanTitle(raw) {
  if (!raw) return '';
  let t = raw
    .replace(/^#+\s+/, '')
    .replace(/^\*\*|\*\*$/g, '')
    .replace(/^[\*\_]|[\*\_]$/g, '')
    .trim();

  // Bỏ các tiền tố tiêu chuẩn (lặp nhiều vòng nếu lồng nhau)
  const prefixes = [
    /^(?:1\.\s*)?NỘI DUNG\s+[A-ZÀ-Ỹ\s]+CHI TIẾT:\s*/i,
    /^BÀI HỌC\s+(?:CHUYÊN SÂU|KHUYẾN CÁO|LÂM SÀNG|CHI TIẾT)?:\s*/i,
    /^BÀI GIẢNG:\s*/i,
    /^T[ÓỐ]M TẮT\s+(?:NGHIÊN CỨU LÂM SÀNG|KHUYẾN CÁO|HƯỚNG DẪN)?:\s*/i,
    /^HƯỚNG DẪN\s+(?:CHUYÊN MÔN|ĐIỀU TRỊ|LÂM SÀNG)?:\s*/i,
    /^CHƯƠNG\s+[IVXLCDM\d]+:\s*/i
  ];

  let prev = '';
  while (prev !== t) {
    prev = t;
    for (const p of prefixes) {
      t = t.replace(p, '').trim();
    }
  }

  // Bỏ các hậu tố chỉ phần
  t = t
    .replace(/\s*[-\—]\s*PHẦN\s+\d+.*$/i, '')
    .replace(/\s*\(PHẦN\s+\d+.*\)$/i, '')
    .replace(/\s*_P\d+$/i, '')
    .replace(/\s*\(P\d+\)$/i, '')
    .trim();

  // Bỏ các ký tự markdown còn sót
  t = t.replace(/\*\*/g, '').replace(/[\_\`]/g, '').trim();

  // Chuẩn hóa nếu toàn bộ là chữ in hoa
  if (t === t.toUpperCase() && t.length > 5) {
    let lower = t.toLowerCase();
    t = lower.charAt(0).toUpperCase() + lower.slice(1);
    
    // Khôi phục các từ viết tắt chuyên môn
    for (const acr of MEDICAL_ACRONYMS) {
      const reg = new RegExp('(^|[^a-zA-Z0-9À-ỹ])' + acr + '(?=[^a-zA-Z0-9À-ỹ]|$)', 'gi');
      t = t.replace(reg, (match, prefix) => prefix + acr);
    }
  }

  // Xóa các tiền tố còn sót sau khi chuẩn hóa chữ hoa/thường
  t = t
    .replace(/^bài học:\s*/i, '')
    .replace(/^bài giảng:\s*/i, '')
    .replace(/^t[óố]m tắt:\s*/i, '')
    .trim();

  // Đảm bảo chữ cái đầu luôn viết hoa
  if (t.length > 0) {
    t = t.charAt(0).toUpperCase() + t.slice(1);
  }
  t = t.replace(/^T[ốô]m\s+/i, 'Tóm ');

  return t;
}

function extractMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(VAULT_DIR, filePath).replace(/\\/g, '/');
  const pathParts = relPath.split('/');
  const filename = path.basename(filePath, '.md');

  // Kho cấp 1
  const topKho = pathParts[0];
  const khoInfo = KHO_CONFIG[topKho] || { code: 'gen', loai: 'article' };

  // Chuyên khoa (thư mục con cấp 2 nếu có)
  let specialty = 'Tổng quát';
  if (topKho === 'Kho bệnh án') {
    if (filename.includes('AKI') || filename.includes('CKD')) specialty = 'Thận - Tiết niệu';
    else if (filename.includes('Lupus')) specialty = 'Cơ xương khớp & Miễn dịch';
  } else if (pathParts.length > 2) {
    specialty = pathParts[1];
  } else if (topKho === '1.2. Kho hóa sinh y học') {
    specialty = 'Chuyển hóa & Sinh học phân tử';
  }

  // Nhận diện phần (part)
  let part = 'P1';
  const partMatch = filename.match(/_P(\d+)/i) || 
                    filename.match(/_phan_(\d+)/i) || 
                    filename.match(/_part_(\d+)/i) ||
                    filename.match(/_P(\d+)\./i);
  if (partMatch) {
    part = 'P' + partMatch[1];
  } else if (filename.endsWith('_TT')) {
    part = 'TT';
  }

  // Trích xuất tiêu đề từ nội dung
  let title = '';
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('# ')) {
      title = cleanTitle(line);
      break;
    } else if (line.startsWith('## ') || line.startsWith('### ')) {
      const candidate = cleanTitle(line);
      if (candidate && !candidate.startsWith('PHẦN') && !candidate.toLowerCase().includes('nội dung sinh lý')) {
        title = candidate;
        break;
      }
    } else if (line.startsWith('**TÓM TẮT') || line.startsWith('**BÀI HỌC') || line.startsWith('**HƯỚNG DẪN')) {
      title = cleanTitle(line);
      break;
    }
  }

  // Fallback từ filename nếu không trích được hoặc quá ngắn
  if (!title || title.length < 5) {
    title = filename
      .replace(/^[A-Z0-9]+_/, '')
      .replace(/_P\d+$/i, '')
      .replace(/_TT$/i, '')
      .replace(/_phan_\d+$/i, '')
      .replace(/_/g, ' ')
      .trim();

    if (topKho === 'Kho bệnh án') {
      title = `Trình bệnh án: ${title}`;
    }
  }

  // Tags
  const specLower = specialty.toLowerCase().trim();
  const specSlug = SPECIALTY_SLUGS[specLower] || 'tong-quat';

  const tags = [
    `he-co-quan/${specSlug}`,
    `loai/${khoInfo.loai}`,
    `y-khoa/${khoInfo.code}`
  ];

  // Aliases & Keywords
  const cleanBaseTitle = filename.replace(/^[A-Z0-9]+_/, '').replace(/_P\d+$/i, '').replace(/_/g, ' ').trim();
  const aliases = [title];
  if (cleanBaseTitle && cleanBaseTitle !== title && !aliases.includes(cleanBaseTitle)) {
    aliases.push(cleanBaseTitle);
  }

  const keywords = [
    title.toLowerCase(),
    specialty.toLowerCase()
  ];
  if (cleanBaseTitle && !keywords.includes(cleanBaseTitle.toLowerCase())) {
    keywords.push(cleanBaseTitle.toLowerCase());
  }

  const today = '2026-09-06';

  return {
    filePath,
    relPath,
    filename,
    title,
    part,
    specialty,
    kho: topKho,
    tags,
    aliases,
    keywords,
    updated: today,
    rawContent: content
  };
}

function buildFrontmatterYaml(meta) {
  const aliasesBlock = meta.aliases.map(a => `  - ${JSON.stringify(a)}`).join('\n');
  const keywordsBlock = meta.keywords.map(k => `  - ${JSON.stringify(k)}`).join('\n');
  const tagsBlock = meta.tags.map(t => `  - ${JSON.stringify(t)}`).join('\n');

  return `---
title: ${JSON.stringify(meta.title)}
part: ${JSON.stringify(meta.part)}
aliases:
${aliasesBlock}
keywords:
${keywordsBlock}
specialty: ${JSON.stringify(meta.specialty)}
kho: ${JSON.stringify(meta.kho)}
tags:
${tagsBlock}
updated: ${JSON.stringify(meta.updated)}
---

`;
}

function run() {
  console.log(`=== CliniPortal Knowledge Vault Frontmatter Updater ===`);
  console.log(`Chế độ: ${DRY_RUN ? 'DRY RUN (Xem trước, không ghi đè)' : 'LIVE EXECUTION (Thực thi ghi tệp)'}\n`);

  const allFiles = walkSync(VAULT_DIR);
  let alreadyHasFm = 0;
  let emptyFilesDeleted = 0;
  const toProcess = [];

  for (const file of allFiles) {
    // Kiểm tra tệp rỗng 0-byte (như Chưa đặt tên.md)
    const stat = fs.statSync(file);
    if (stat.size === 0) {
      if (path.basename(file) === 'Chưa đặt tên.md') {
        console.log(`[DỌN TỆP RỖNG] Phát hiện tệp 0-byte: ${path.relative(VAULT_DIR, file)}`);
        if (!DRY_RUN) {
          fs.unlinkSync(file);
          console.log(`  -> Đã xóa tệp rỗng.`);
        }
        emptyFilesDeleted++;
        continue;
      }
    }

    const content = fs.readFileSync(file, 'utf-8');
    if (content.trim().startsWith('---')) {
      alreadyHasFm++;
      continue;
    }

    toProcess.push(extractMetadata(file));
  }

  console.log(`Tổng tệp quét được: ${allFiles.length}`);
  console.log(`Tệp đã có Frontmatter: ${alreadyHasFm}`);
  console.log(`Tệp rỗng cần dọn: ${emptyFilesDeleted}`);
  console.log(`Tệp cần gắn Frontmatter: ${toProcess.length}\n`);

  // Thống kê theo thư mục
  const byDir = {};
  for (const item of toProcess) {
    byDir[item.kho] = (byDir[item.kho] || 0) + 1;
  }
  console.log(`Phân bố tệp cần xử lý:`, byDir);
  console.log('----------------------------------------------------');

  let processedCount = 0;
  for (const item of toProcess) {
    const yaml = buildFrontmatterYaml(item);
    const newContent = yaml + item.rawContent;

    if (DRY_RUN) {
      if (processedCount < 15 || processedCount >= toProcess.length - 10) {
        console.log(`[DRY-RUN ${processedCount + 1}/${toProcess.length}] ${item.relPath}`);
        console.log(`  Title: ${item.title} | Part: ${item.part} | Specialty: ${item.specialty}`);
        console.log(`  Tags: ${item.tags.join(', ')}`);
      } else if (processedCount === 15) {
        console.log(`  ... [Ẩn bớt ${toProcess.length - 25} tệp ở giữa] ...`);
      }
    } else {
      fs.writeFileSync(item.filePath, newContent, 'utf-8');
      console.log(`[OK ${processedCount + 1}/${toProcess.length}] Gắn Frontmatter: ${item.relPath}`);
    }
    processedCount++;
  }

  console.log('----------------------------------------------------');
  console.log(`\nHoàn tất! Tổng số tệp đã xử lý: ${processedCount}/${toProcess.length}`);
  if (DRY_RUN) {
    console.log(`Lưu ý: Đây là chế độ DRY RUN. Để áp dụng thực tế, hãy chạy lệnh không có --dry-run.`);
  } else {
    console.log(`Đã ghi thành công YAML Frontmatter vào toàn bộ ${processedCount} tệp!`);
  }
}

run();
