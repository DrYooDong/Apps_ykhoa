/**
 * CliniPortal — Knowledge Vault Catalog Builder Script
 * Quét toàn bộ markdown trong knowledge-vault/ và biên dịch sang vault-catalog.json
 */

const fs = require('fs');
const path = require('path');

const VAULT_ROOT = path.resolve(__dirname, '../knowledge-vault');
const OUTPUT_FILE = path.resolve(__dirname, '../src/content/knowledge-vault/data/vault-catalog.json');

const KHO_MAPPINGS = [
  // 1. Nhóm Cơ sở
  { dir: '1.1. Kho giải phẫu & sinh lý', code: 'GPSL', name: 'GP & sinh lý', group: 'Cơ sở', icon: 'fa-heart-pulse', color: '#0284c7' },
  { dir: '1.2. Kho hóa sinh y học', code: 'HS', name: 'Hóa sinh', group: 'Cơ sở', icon: 'fa-flask', color: '#8b5cf6' },
  { dir: '1.3. Kho sinh lý bệnh', code: 'SLB', name: 'Sinh lý bệnh', group: 'Cơ sở', icon: 'fa-bolt', color: '#f59e0b' },
  { dir: '1.4. Kho dịch tễ học', code: 'DTH', name: 'Dịch tễ học', group: 'Cơ sở', icon: 'fa-virus', color: '#10b981' },
  { dir: '2.2. Kho kỹ năng lâm sàng', code: 'KN', name: 'Kỹ năng', group: 'Cơ sở', icon: 'fa-stethoscope', color: '#6366f1' },

  // 2. Nhóm Chuyên sâu
  { dir: '1.5. Kho yếu tố nguy cơ', code: 'YTNC', name: 'Yếu tố nguy cơ', group: 'Chuyên sâu', icon: 'fa-triangle-exclamation', color: '#f97316' },
  { dir: '2.1. Kho tiếp cận lâm sàng', code: 'TC', name: 'Lâm sàng', group: 'Chuyên sâu', icon: 'fa-magnifying-glass', color: '#0ea5e9' },
  { dir: '3.3. Kho cận lâm sàng & xét nghiệm', code: 'CLS', name: 'Cận lâm sàng', group: 'Chuyên sâu', icon: 'fa-flask-vial', color: '#6366f1' },
  { dir: '2.3. Kho chẩn đoán', code: 'CD', name: 'Tiêu chuẩn chẩn đoán', group: 'Chuyên sâu', icon: 'fa-clipboard-check', color: '#ec4899' },
  { dir: '2.4. Kho phác đồ điều trị', code: 'PDDT', name: 'Phác đồ', group: 'Chuyên sâu', icon: 'fa-pills', color: '#3b82f6' },
  { dir: 'Kho cập nhật', code: 'PDDT', name: 'Phác đồ', group: 'Chuyên sâu', icon: 'fa-pills', color: '#3b82f6' },
  { dir: '3.2. Kho dược thư & tương tác thuốc', code: 'DUOC', name: 'Dược', group: 'Chuyên sâu', icon: 'fa-capsules', color: '#06b6d4' },
  { dir: 'Kho dinh dưỡng lâm sàng', code: 'TV', name: 'Tư vấn', group: 'Chuyên sâu', icon: 'fa-hand-holding-medical', color: '#84cc16' },
  { dir: '2.5. Kho biến chứng', code: 'BC', name: 'Biến chứng', group: 'Chuyên sâu', icon: 'fa-heart-crack', color: '#ef4444' },

  // 3. Nhóm Hỗ trợ
  { dir: '3.1. Kho công cụ & thang điểm', code: 'CC', name: 'Công cụ & Thang điểm', group: 'Hỗ trợ', icon: 'fa-calculator', color: '#f59e0b' },
  { dir: 'Kho nghiên cứu khoa học & EBM', code: 'EBM', name: 'NCKH & EBM', group: 'Hỗ trợ', icon: 'fa-chart-pie', color: '#64748b' },
  { dir: 'Kho chưa lọc', code: 'RAW', name: 'Kho chưa lọc', group: 'Hỗ trợ', icon: 'fa-box-archive', color: '#78716c' },
  { dir: '0. Kho thực thể hạt nhân', code: 'CORE', name: 'Thực thể Hạt nhân', group: 'Hỗ trợ', icon: 'fa-dna', color: '#a855f7' }
];

function generateId(prefix, text) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8);
  const hash = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${clean}_${hash}`;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta: {}, body: content };

  const rawMeta = match[1];
  const body = content.slice(match[0].length);
  const meta = {};

  const lines = rawMeta.split('\n');
  let currentKey = null;
  let isArray = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    if (trimmed.startsWith('- ') && currentKey && isArray) {
      const val = trimmed.slice(2).replace(/^["']|["']$/g, '').trim();
      meta[currentKey].push(val);
      return;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx > -1) {
      currentKey = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();
      if (val === '' || val === '[]') {
        meta[currentKey] = [];
        isArray = true;
      } else {
        isArray = false;
        meta[currentKey] = val.replace(/^["']|["']$/g, '').trim();
      }
    }
  });

  return { meta, body };
}

function extractSnippet(body) {
  const clean = body
    .replace(/^#+.*$/gm, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[\[.*?\]\]/g, '')
    .replace(/>.*$/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
  return clean.slice(0, 220);
}

function scanVault() {
  const catalog = [];

  KHO_MAPPINGS.forEach(kho => {
    const fullKhoPath = path.join(VAULT_ROOT, kho.dir);
    if (!fs.existsSync(fullKhoPath)) return;

    function walkDir(dirPath, specialtyName) {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
          walkDir(fullPath, entry.name);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const { meta, body } = parseFrontmatter(content);
          const relPath = path.relative(VAULT_ROOT, fullPath).replace(/\\/g, '/');

          const baseTitle = entry.name.replace(/\.md$/, '').replace(/^[A-Z0-9]+_/, '').replace(/_P\d+$/, '');
          const title = meta.title || baseTitle;
          const specialty = meta.specialty || specialtyName || 'Tổng quát';
          const part = meta.part || (entry.name.includes('_P2') ? 'P2' : (entry.name.includes('_P3') ? 'P3' : 'P1'));
          const snippet = extractSnippet(body);

          const article = {
            id: meta.id || `${kho.code}_${title.slice(0, 15).replace(/[^a-zA-Z0-9]/g, '_')}_${Math.random().toString(36).substring(2, 6)}`,
            title,
            fullFileName: entry.name,
            khoCode: kho.code,
            khoName: kho.name,
            khoGroup: kho.group,
            khoDir: kho.dir,
            khoIcon: kho.icon,
            khoColor: kho.color,
            specialty,
            part,
            relPath,
            snippet,
            readTime: meta.readTime || '8-12 phút',
            aliases: Array.isArray(meta.aliases) ? meta.aliases : (meta.aliases ? [meta.aliases] : [title]),
            keywords: Array.isArray(meta.keywords) ? meta.keywords : (meta.keywords ? [meta.keywords] : [title.toLowerCase()]),
            icd10: Array.isArray(meta.icd10) ? meta.icd10 : (meta.icd10 ? [meta.icd10] : []),
            tags: Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : [`y-khoa/${kho.code.toLowerCase()}`])
          };

          catalog.push(article);
        }
      }
    }

    walkDir(fullKhoPath, kho.name);
  });

  // Also include Master MOC if exists
  const masterMocPath = path.join(VAULT_ROOT, 'MOC - Kho Kiến Thức Y Khoa.md');
  if (fs.existsSync(masterMocPath)) {
    const content = fs.readFileSync(masterMocPath, 'utf-8');
    const { meta, body } = parseFrontmatter(content);
    catalog.unshift({
      id: 'MOC_Master_Vault',
      title: 'MOC - Kho Kiến Thức Y Khoa',
      fullFileName: 'MOC - Kho Kiến Thức Y Khoa.md',
      khoCode: 'CORE',
      khoName: 'Thực thể Hạt nhân',
      khoGroup: 'Hỗ trợ',
      khoDir: '0. Kho thực thể hạt nhân',
      khoIcon: 'fa-book-medical',
      khoColor: '#0284c7',
      specialty: 'Tổng hợp',
      part: 'MOC',
      relPath: 'MOC - Kho Kiến Thức Y Khoa.md',
      snippet: extractSnippet(body),
      readTime: '5 phút',
      aliases: ['Master MOC', 'Trang chủ Vault'],
      keywords: ['master moc', 'trang chủ', 'tổng hợp'],
      icd10: [],
      tags: ['y-khoa/trang-chu']
    });
  }

  // Ensure output directory exists
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2), 'utf-8');
  console.log(`[VAULT CATALOG] Successfully indexed ${catalog.length} articles into: ${OUTPUT_FILE}`);
}

scanVault();
