/**
 * CliniPortal — Knowledge Vault Catalog Builder Script
 * Quét toàn bộ markdown trong knowledge-vault/ và biên dịch sang vault-catalog.json
 * Tự động đồng bộ sang cả Knowledge Vault Hub và DocSpace MedLens
 */

const fs = require('fs');
const path = require('path');

const VAULT_ROOT = path.resolve(__dirname, '../../knowledge-vault');
const OUTPUT_FILE = path.resolve(__dirname, '../../src/content/knowledge-vault/data/vault-catalog.json');
const DOCSPACE_OUTPUT_FILE = path.resolve(__dirname, '../../src/content/docspace/src/data/vault-catalog.json');

const KHO_MAPPINGS = [
  // 1. Nhóm Cơ sở
  { dir: '1.1. Kho giải phẫu & sinh lý', code: 'GPSL', name: 'GP & sinh lý', group: 'Cơ sở', icon: 'fa-heart-pulse', color: '#0284c7' },
  { dir: '1.2. Kho hóa sinh y học', code: 'HS', name: 'Hóa sinh', group: 'Cơ sở', icon: 'fa-flask', color: '#8b5cf6' },
  { dir: '1.3. Kho sinh lý bệnh', code: 'SLB', name: 'Sinh lý bệnh', group: 'Cơ sở', icon: 'fa-bolt', color: '#f59e0b' },
  { dir: '1.4. Kho dịch tễ học', code: 'DTH', name: 'Dịch tễ học & Yếu tố nguy cơ', group: 'Cơ sở', icon: 'fa-virus', color: '#10b981' },
  { dir: '2.2. Kho kỹ năng lâm sàng', code: 'KN', name: 'Kỹ năng', group: 'Cơ sở', icon: 'fa-stethoscope', color: '#6366f1' },

  // 2. Nhóm Chuyên sâu
  { dir: '2.1. Kho tiếp cận lâm sàng', code: 'TC', name: 'Lâm sàng', group: 'Chuyên sâu', icon: 'fa-magnifying-glass', color: '#0ea5e9' },
  { dir: '3.3. Kho cận lâm sàng & xét nghiệm', code: 'CLS', name: 'Cận lâm sàng', group: 'Chuyên sâu', icon: 'fa-flask-vial', color: '#6366f1' },
  { dir: '2.3. Kho chẩn đoán', code: 'CD', name: 'Chẩn đoán', group: 'Chuyên sâu', icon: 'fa-clipboard-check', color: '#ec4899' },
  { dir: '2.4. Kho phác đồ điều trị', code: 'PDDT', name: 'Phác đồ, Dược & Tư vấn', group: 'Chuyên sâu', icon: 'fa-pills', color: '#3b82f6' },
  { dir: 'Kho cập nhật', code: 'CN', name: 'Cập nhật Hướng dẫn', group: 'Chuyên sâu', icon: 'fa-arrows-rotate', color: '#2563eb' },
  { dir: '3.2. Kho dược thư & tương tác thuốc', code: 'DUOC', name: 'Dược thư hoạt chất', group: 'Chuyên sâu', icon: 'fa-capsules', color: '#06b6d4' },
  { dir: '2.5. Kho biến chứng', code: 'BC', name: 'Biến chứng', group: 'Chuyên sâu', icon: 'fa-heart-crack', color: '#ef4444' },

  // 3. Nhóm Thực hành & Bệnh án
  { dir: 'Kho bệnh án', code: 'BA', name: 'Bệnh án SOAP', group: 'Thực hành', icon: 'fa-book-medical', color: '#10b981' },

  // 4. Nhóm Hỗ trợ
  { dir: 'Kho dinh dưỡng lâm sàng', code: 'DD', name: 'Dinh dưỡng lâm sàng', group: 'Hỗ trợ', icon: 'fa-utensils', color: '#eab308' },
  { dir: '3.1. Kho công cụ & thang điểm', code: 'CC', name: 'Công cụ & Thang điểm', group: 'Hỗ trợ', icon: 'fa-calculator', color: '#f59e0b' },
  { dir: 'Kho nghiên cứu khoa học & EBM', code: 'EBM', name: 'NCKH & EBM', group: 'Hỗ trợ', icon: 'fa-chart-pie', color: '#64748b' },
  { dir: 'Kho CDSS', code: 'CDSS', name: 'Kho CDSS', group: 'Hỗ trợ', icon: 'fa-laptop-medical', color: '#0284c7' },
  { dir: 'Kho ICD-10', code: 'ICD10', name: 'Kho ICD-10', group: 'Hỗ trợ', icon: 'fa-barcode', color: '#0ea5e9' },
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
  let clean = body
    .replace(/^#+.*$/gm, '')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$]*?\$/g, ' ')
    .replace(/^-{3,}/gm, ' ')
    .replace(/^={3,}/gm, ' ')
    .replace(/\[MÔ HÌNH[\s\S]*?\]/gi, ' ')
    .replace(/\bMOC\b\s*[-–—:]*/gi, ' ')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\[\d+(?:[,\s–-]+\d+)*\]/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/>.*$/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[\s\-_–—:,;|./\\]+/, '');

  if (!clean || clean.length < 5) return 'Tài liệu kiến thức y khoa chuẩn hóa theo chứng cứ EBM.';
  return clean.slice(0, 220);
}

function scanVault() {
  const catalog = [];
  const khoStats = {};
  const warnings = [];
  let totalDiskFiles = 0;
  let skippedFiles = 0;

  // Initialize stats for each mapped kho
  KHO_MAPPINGS.forEach(kho => {
    khoStats[kho.code] = {
      name: kho.name,
      dir: kho.dir,
      count: 0,
      skipped: 0
    };
  });

  console.log('\n🔍 Bắt đầu quét Knowledge Vault...');

  KHO_MAPPINGS.forEach(kho => {
    const fullKhoPath = path.join(VAULT_ROOT, kho.dir);
    if (!fs.existsSync(fullKhoPath)) {
      warnings.push(`[NOT FOUND] Thư mục kho không tồn tại: ${kho.dir}`);
      return;
    }

    function walkDir(dirPath, specialtyName) {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
          // Bỏ qua thư mục _ (như _raw_transcripts) và .obsidian
          if (!entry.name.startsWith('_') && !entry.name.startsWith('.')) {
            walkDir(fullPath, entry.name);
          } else {
            // Count skipped files inside skipped directories
            try {
              const skippedEntries = fs.readdirSync(fullPath);
              skippedFiles += skippedEntries.filter(f => f.endsWith('.md')).length;
            } catch (e) {}
          }
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          totalDiskFiles++;

          if (entry.name.startsWith('_')) {
            skippedFiles++;
            khoStats[kho.code].skipped++;
            return;
          }

          let content = '';
          try {
            content = fs.readFileSync(fullPath, 'utf-8');
          } catch (err) {
            warnings.push(`[READ ERROR] Không đọc được file: ${fullPath} (${err.message})`);
            return;
          }

          const { meta, body } = parseFrontmatter(content);
          const relPath = path.relative(VAULT_ROOT, fullPath).replace(/\\/g, '/');

          if (Object.keys(meta).length === 0) {
            warnings.push(`[NO FRONTMATTER] ${relPath} không có YAML frontmatter.`);
          }

          const baseTitle = entry.name.replace(/\.md$/, '').replace(/^[A-Z0-9]+_/, '').replace(/_P\d+$/, '');
          const title = meta.title || baseTitle;
          const specialty = meta.specialty || specialtyName || 'Tổng quát';
          const part = meta.part || (entry.name.includes('_P2') ? 'P2' : (entry.name.includes('_P3') ? 'P3' : (entry.name.startsWith('MOC') ? 'MOC' : 'P1')));
          const snippet = extractSnippet(body);

          const context = meta.context || (entry.name.includes('_Noi_') ? 'noi-tru' : (kho.code === 'TV' || entry.name.includes('_Ngoai_') ? 'ngoai-tru' : undefined));
          const topic = meta.topic || (entry.name.includes('_QuenLieu') ? 'quen-lieu' : (entry.name.includes('_TacDungPhu') ? 'tac-dung-phu' : (entry.name.includes('_DauHieuDo') ? 'dau-hieu-do' : (entry.name.includes('_P1') ? 'tong-quan' : undefined))));
          const perspective = meta.perspective || (kho.code === 'TV' ? 'patient-only' : undefined);

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
            context,
            topic,
            perspective,
            relPath,
            snippet,
            readTime: meta.readTime || '8-12 phút',
            aliases: Array.isArray(meta.aliases) ? meta.aliases : (meta.aliases ? [meta.aliases] : [title]),
            keywords: Array.isArray(meta.keywords) ? meta.keywords : (meta.keywords ? [meta.keywords] : [title.toLowerCase()]),
            icd10: Array.isArray(meta.icd10) ? meta.icd10 : (meta.icd10 ? [meta.icd10] : []),
            tags: Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : [`y-khoa/${kho.code.toLowerCase()}`]),

            // SOAP & Case extensions
            caseId: meta.caseId || undefined,
            experienceLevel: meta.experienceLevel || undefined,
            difficultyRating: meta.difficultyRating ? Number(meta.difficultyRating) : undefined,
            authorDoctor: meta.authorDoctor || undefined,
            demographicContext: meta.demographicContext || undefined,
            historyPearls: meta.historyPearls || undefined,
            objectivePitfalls: meta.objectivePitfalls || undefined,
            diagnosticPearls: meta.diagnosticPearls || undefined,
            takeawayLessons: meta.takeawayLessons || undefined,
          };

          catalog.push(article);
          khoStats[kho.code].count++;
        }
      }
    }

    walkDir(fullKhoPath, kho.name);
  });

  // Also include Master MOC if exists
  const masterMocPath = path.join(VAULT_ROOT, 'MOC - Kho Kiến Thức Y Khoa.md');
  if (fs.existsSync(masterMocPath)) {
    totalDiskFiles++;
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
    if (khoStats['CORE']) khoStats['CORE'].count++;
  }

  // Ensure output directory exists for Knowledge Vault Hub
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2), 'utf-8');

  // Ensure output directory exists for DocSpace MedLens
  const docspaceOutDir = path.dirname(DOCSPACE_OUTPUT_FILE);
  if (!fs.existsSync(docspaceOutDir)) fs.mkdirSync(docspaceOutDir, { recursive: true });
  fs.writeFileSync(DOCSPACE_OUTPUT_FILE, JSON.stringify(catalog, null, 2), 'utf-8');

  // Print Summary Stats Table
  console.log('\n=============================================================');
  console.log('📊 BÁO CÁO THỐNG KÊ DANH MỤC KNOWLEDGE VAULT');
  console.log('=============================================================');
  console.log('| Mã Kho | Tên Phân Hệ Kho                  | Đã nạp | Bỏ qua |');
  console.log('|--------|----------------------------------|--------|--------|');
  Object.keys(khoStats).forEach(code => {
    const s = khoStats[code];
    const namePadded = (s.name + '                                ').slice(0, 32);
    const countPadded = (s.count + '     ').slice(0, 6);
    const skipPadded = (s.skipped + '     ').slice(0, 6);
    console.log(`| ${code.padEnd(6)} | ${namePadded} | ${countPadded} | ${skipPadded} |`);
  });
  console.log('=============================================================');
  console.log(` Tổng số file Markdown trên disk : ${totalDiskFiles}`);
  console.log(` Tổng số bài viết đã lập chỉ mục : ${catalog.length}`);
  console.log(` Số file tạm / raw bỏ qua        : ${skippedFiles}`);
  console.log(` Cảnh báo / Parse issues         : ${warnings.length}`);
  console.log('=============================================================');
  console.log(`✅ [1/2] Đã lưu Vault Hub: ${OUTPUT_FILE}`);
  console.log(`✅ [2/2] Đã sync DocSpace: ${DOCSPACE_OUTPUT_FILE}\n`);

  if (warnings.length > 0 && warnings.length <= 10) {
    console.log('⚠️ Chi tiết cảnh báo:');
    warnings.forEach(w => console.log('  ' + w));
  } else if (warnings.length > 10) {
    console.log(`⚠️ Có ${warnings.length} cảnh báo (10 cảnh báo đầu tiên):`);
    warnings.slice(0, 10).forEach(w => console.log('  ' + w));
  }
}

scanVault();
