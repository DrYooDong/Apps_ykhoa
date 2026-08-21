const fs = require('fs');
const path = require('path');

const vaultBase = 'd:/Apps_ykhoa/knowledge-vault';

// All Kho definitions
const KHO_CONFIGS = [
  // Nhóm 1: Cơ sở Y khoa
  { matchName: 'giải phẫu & sinh lý', code: 'GPSL', name: 'Giải phẫu & Sinh lý', group: 'Cơ sở Y khoa', icon: 'fa-heart-pulse', color: '#0284c7' },
  { matchName: 'hóa sinh y học', code: 'HS', name: 'Hóa sinh Y học', group: 'Cơ sở Y khoa', icon: 'fa-flask', color: '#8b5cf6' },
  { matchName: 'sinh lý bệnh', code: 'SLB', name: 'Sinh lý bệnh', group: 'Cơ sở Y khoa', icon: 'fa-bolt', color: '#f59e0b' },
  { matchName: 'dịch tễ học', code: 'DTH', name: 'Dịch tễ & Vi sinh', group: 'Cơ sở Y khoa', icon: 'fa-virus', color: '#10b981' },
  
  // Nhóm 2: Lâm sàng & Bệnh học
  { matchName: 'tiếp cận lâm sàng', code: 'TC', name: 'Tiếp cận Lâm sàng', group: 'Lâm sàng & Bệnh học', icon: 'fa-magnifying-glass', color: '#0ea5e9' },
  { matchName: 'kỹ năng lâm sàng', code: 'KN', name: 'Kỹ năng Lâm sàng', group: 'Lâm sàng & Bệnh học', icon: 'fa-stethoscope', color: '#6366f1' },
  { matchName: 'chẩn đoán', code: 'CD', name: 'Chẩn đoán Bệnh học', group: 'Lâm sàng & Bệnh học', icon: 'fa-clipboard-check', color: '#ec4899' },
  { matchName: 'phác đồ điều trị', code: 'PDDT', name: 'Phác đồ Điều trị', group: 'Lâm sàng & Bệnh học', icon: 'fa-pills', color: '#3b82f6' },
  { matchName: 'biến chứng', code: 'BC', name: 'Biến chứng & Tiên lượng', group: 'Lâm sàng & Bệnh học', icon: 'fa-triangle-exclamation', color: '#ef4444' },

  // Nhóm 3: Chuyên sâu & Bổ trợ
  { matchName: 'công cụ & thang điểm', code: 'CC', name: 'Công Cụ & Thang Điểm', group: 'Thực Hành & Bổ Trợ', icon: 'fa-calculator', color: '#f59e0b' },
  { matchName: 'dược thư & tương tác', code: 'DUOC', name: 'Dược Thư & Tương Tác Thuốc', group: 'Thực Hành & Bổ Trợ', icon: 'fa-capsules', color: '#06b6d4' },
  { matchName: 'cận lâm sàng & xét nghiệm', code: 'CLS', name: 'Cận Lâm Sàng & Xét Nghiệm', group: 'Thực Hành & Bổ Trợ', icon: 'fa-flask-vial', color: '#6366f1' },
  { matchName: 'cập nhật', code: 'CN', name: 'Cập nhật Guidelines', group: 'Chuyên sâu & Bổ trợ', icon: 'fa-arrows-rotate', color: '#14b8a6' },
  { matchName: 'thực thể hạt nhân', code: 'CORE', name: 'Thực thể Hạt nhân', group: 'Chuyên sâu & Bổ trợ', icon: 'fa-dna', color: '#a855f7' },
  { matchName: 'nghiên cứu khoa học', code: 'EBM', name: 'NCKH & EBM', group: 'Chuyên sâu & Bổ trợ', icon: 'fa-chart-pie', color: '#64748b' },
  { matchName: 'dinh dưỡng', code: 'DD', name: 'Dinh dưỡng Lâm sàng', group: 'Chuyên sâu & Bổ trợ', icon: 'fa-apple-whole', color: '#84cc16' },
  { matchName: 'chưa lọc', code: 'RAW', name: 'Kho Chưa lọc / Tổng quan', group: 'Chuyên sâu & Bổ trợ', icon: 'fa-box-archive', color: '#78716c' }
];

const vaultEntries = fs.readdirSync(vaultBase, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name);

let catalog = [];
let statsByKho = {};

function parseYamlFrontmatter(content) {
  const res = { aliases: [], keywords: [], icd10: [], tags: [], title: null };
  if (!content.startsWith('---')) return res;
  
  const endIdx = content.indexOf('---', 3);
  if (endIdx === -1) return res;

  const yamlStr = content.slice(3, endIdx);
  const lines = yamlStr.split('\n');
  let currentKey = null;

  lines.forEach(l => {
    const trimmed = l.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('aliases:')) { currentKey = 'aliases'; return; }
    if (trimmed.startsWith('keywords:')) { currentKey = 'keywords'; return; }
    if (trimmed.startsWith('icd10:')) { currentKey = 'icd10'; return; }
    if (trimmed.startsWith('tags:')) { currentKey = 'tags'; return; }
    if (trimmed.startsWith('title:')) {
      const match = trimmed.match(/^title:\s*["']?(.*?)["']?$/);
      if (match) res.title = match[1];
      currentKey = null;
      return;
    }

    if (trimmed.startsWith('-') && currentKey) {
      const val = trimmed.replace(/^-\s*["']?/, '').replace(/["']?$/, '').trim();
      if (val) res[currentKey].push(val);
    }
  });

  return res;
}

KHO_CONFIGS.forEach(kho => {
  const matchedDir = vaultEntries.find(d => d.toLowerCase().includes(kho.matchName.toLowerCase()));
  if (!matchedDir) return;
  
  const khoPath = path.join(vaultBase, matchedDir);

  const allEntries = fs.readdirSync(khoPath, { withFileTypes: true });
  const directFiles = allEntries.filter(e => !e.isDirectory() && e.name.endsWith('.md')).map(e => e.name);
  const subDirs = allEntries.filter(e => e.isDirectory()).map(e => e.name);

  let countInKho = 0;

  const processFile = (filePath, fileName, specialty) => {
    const fileNoExt = path.parse(fileName).name;
    const parts = fileNoExt.split('_');
    const prefix = parts[0] || kho.code;
    const part = parts.length > 2 ? parts[parts.length - 1] : 'P1';
    const defaultTitle = parts.length > 2 ? parts.slice(1, -1).join('_') : (parts[1] || fileNoExt);

    let snippet = '';
    let meta = { aliases: [], keywords: [], icd10: [], tags: [], title: null };

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      meta = parseYamlFrontmatter(content);
      const cleanContent = content.replace(/^---[\s\S]*?---/, '').replace(/[#*`_\[\]]/g, ' ').trim();
      snippet = cleanContent.slice(0, 220).replace(/\s+/g, ' ');
    } catch (e) {}

    catalog.push({
      id: `${prefix}_${Math.random().toString(36).substr(2, 8)}`,
      title: (meta.title || defaultTitle).trim(),
      fullFileName: fileName,
      khoCode: kho.code,
      khoName: kho.name,
      khoGroup: kho.group,
      khoDir: matchedDir,
      khoIcon: kho.icon,
      khoColor: kho.color,
      specialty: meta.specialty || specialty,
      part: part,
      relPath: path.relative(vaultBase, filePath).replace(/\\/g, '/'),
      snippet: snippet,
      readTime: '8-12 phút',
      aliases: meta.aliases || [],
      keywords: meta.keywords || [],
      icd10: meta.icd10 || [],
      tags: meta.tags || []
    });
    countInKho++;
  };

  // Direct files
  directFiles.forEach(f => {
    processFile(path.join(khoPath, f), f, 'Thực hành lâm sàng');
  });

  // Subdirectories
  subDirs.forEach(sub => {
    const subPath = path.join(khoPath, sub);
    const files = fs.readdirSync(subPath, { withFileTypes: true })
      .filter(e => !e.isDirectory() && e.name.endsWith('.md'))
      .map(e => e.name);

    files.forEach(f => {
      processFile(path.join(subPath, f), f, sub);
    });
  });

  statsByKho[kho.name] = countInKho;
});

console.log('\n=== CẬP NHẬT CATALOG TOÀN BỘ VỚI KEYWORDS & ALIASES ===');
console.log(`Tổng số bài viết: ${catalog.length} bài.`);

const outDir = 'd:/Apps_ykhoa/src/content/knowledge-vault/data';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, 'vault-catalog.json');
fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Đã cập nhật catalog với đầy đủ keywords tại: ${outPath}`);
