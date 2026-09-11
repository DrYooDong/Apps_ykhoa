/**
 * CliniPortal — Ingest Kho Chẩn Đoán to DocSpace Database
 * Script tự động quét toàn bộ file Markdown trong `knowledge-vault/2.3. Kho chẩn đoán/`,
 * phân tích frontmatter + cấu trúc bài viết (P1, P2, P3...), group theo thực thể bệnh,
 * và xuất ra file TypeScript độc lập `src/content/docspace/data/kho-chan-doan-db.ts`
 * để tích hợp vào CSDL Chẩn đoán & Chuỗi Phản Ứng Lâm Sàng (CRCE v3.0 / CDSS).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VAULT_CD_DIR = path.resolve(__dirname, '../../knowledge-vault/2.3. Kho chẩn đoán');
const TARGET_TS_FILE = path.resolve(__dirname, '../../src/content/docspace/data/kho-chan-doan-db.ts');
const CATALOG_JSON_FILE = path.resolve(__dirname, '../../src/content/docspace/src/data/vault-catalog-cd.json');

// Helper to convert Vietnamese string to clean snake_case slug
function slugify(text) {
  if (!text) return 'unspecified';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

// Clean markdown/latex formatting
function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/\\\(|\\\)/g, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/\$([^$]+)\$/g, '$1')
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Frontmatter parser handling codeblocks and clean YAML
function parseFile(content) {
  let raw = content;
  // Handle case where frontmatter is wrapped in ```
  if (raw.startsWith('```')) {
    raw = raw.replace(/^```[a-zA-Z]*\r?\n/, '');
    const endCode = raw.indexOf('```');
    if (endCode !== -1 && endCode < 3000) {
      // Remove closing code fence if within metadata block
      raw = raw.slice(0, endCode) + raw.slice(endCode + 3);
    }
  }

  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fmMatch) {
    return { meta: {}, body: raw };
  }

  const yamlStr = fmMatch[1];
  const body = fmMatch[2];
  const meta = {};

  const lines = yamlStr.split(/\r?\n/);
  let currentKey = null;
  let isArray = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('- ') && currentKey && isArray) {
      const val = cleanText(trimmed.slice(2).replace(/^["']|["']$/g, ''));
      if (val) meta[currentKey].push(val);
      continue;
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
  }

  return { meta, body };
}

// Determine clinical severity based on keywords & content
function determineSeverity(name, meta, body) {
  const combined = (name + ' ' + (meta.keywords || []).join(' ') + ' ' + (body || '').slice(0, 500)).toLowerCase();
  if (
    combined.includes('cấp cứu') ||
    combined.includes('sốc') ||
    combined.includes('nhồi máu') ||
    combined.includes('xuất huyết não') ||
    combined.includes('đột quỵ') ||
    combined.includes('ngộ độc') ||
    combined.includes('thuyên tắc') ||
    combined.includes('vỡ') ||
    combined.includes('ngừng tim') ||
    combined.includes('khí máu') ||
    combined.includes('ards') ||
    combined.includes('phản vệ') ||
    combined.includes('hôn mê') ||
    combined.includes('dọa vỡ')
  ) {
    return 'emergency';
  }

  if (
    combined.includes('cấp') ||
    combined.includes('nhiễm trùng') ||
    combined.includes('viêm mủ') ||
    combined.includes('sốt xuất huyết') ||
    combined.includes('tiền sản giật') ||
    combined.includes('bỏng') ||
    combined.includes('viêm tụy') ||
    combined.includes('viêm ruột thừa') ||
    combined.includes('suy tim') ||
    combined.includes('gãy xương')
  ) {
    return 'urgent';
  }

  return 'routine';
}

// Extract summary from body
function extractSummary(diseaseName, body) {
  if (!body || body.trim().length < 50) {
    return `Tài liệu hướng dẫn chẩn đoán và phân loại bệnh học y khoa chuẩn EBM cho ${diseaseName}.`;
  }

  // Look for blockquote core summary
  const bqMatch = body.match(/>\s*\*\*Tóm tắt cốt lõi\*\*:\s*([\s\S]*?)(?:\r?\n\r?\n|---|\n#)/i);
  if (bqMatch) {
    return cleanText(bqMatch[1]);
  }

  // Look for general blockquote
  const bqGeneral = body.match(/>\s*([^\n\r]+(?:\r?\n>[^\n\r]+)*)/);
  if (bqGeneral && bqGeneral[1].length > 40) {
    return cleanText(bqGeneral[1].replace(/^>\s*/gm, ''));
  }

  // Look for first paragraph after headers
  const paragraphs = body
    .split(/\r?\n\r?\n/)
    .map(p => p.trim())
    .filter(p => p && !p.startsWith('#') && !p.startsWith('---') && !p.startsWith('[['))
    .map(cleanText)
    .filter(p => p.length > 50);

  if (paragraphs.length > 0) {
    return paragraphs[0].slice(0, 300) + (paragraphs[0].length > 300 ? '...' : '');
  }

  return `Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho ${diseaseName}.`;
}

// Extract Gold Standard
function extractGoldStandard(diseaseName, body, specialty) {
  if (!body) return `Tiêu chuẩn vàng theo khuyến cáo chuyên khoa ${specialty || 'Bộ Y Tế'}`;

  const gsMatch = body.match(/(?:tiêu chuẩn vàng|gold standard)[:\s*]+([^\n\r]+(?:\r?\n[^\n\r#]+)?)/i);
  if (gsMatch) {
    const cleaned = cleanText(gsMatch[1]);
    if (cleaned.length > 15) return cleaned.slice(0, 200);
  }

  return `Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa ${specialty || 'Bộ Y Tế'}`;
}

// Extract criteria list from text
function extractCriteria(slug, diseaseName, body, meta) {
  const criteria = [];
  let index = 1;

  if (body) {
    // Look for major/minor items
    const lines = body.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (
        (line.startsWith('- **') || line.startsWith('* **') || line.match(/^\d+\.\s*\*\*/)) &&
        line.length > 15 &&
        !line.includes('Tài liệu tham khảo') &&
        !line.includes('Tóm tắt cốt lõi')
      ) {
        let type = 'major';
        const lower = line.toLowerCase();
        if (lower.includes('bắt buộc') || lower.includes('tiêu chuẩn chính') || lower.includes('chủ yếu') || lower.includes('quyết định')) {
          type = 'mandatory';
        } else if (lower.includes('xét nghiệm') || lower.includes('cận lâm sàng') || lower.includes('biomarker') || lower.includes('máu') || lower.includes('men')) {
          type = 'lab';
        } else if (lower.includes('x-quang') || lower.includes('siêu âm') || lower.includes('ct') || lower.includes('mri') || lower.includes('hình ảnh') || lower.includes('ecg')) {
          type = 'imaging';
        } else if (lower.includes('phụ') || lower.includes('kèm theo') || lower.includes('không đặc hiệu')) {
          type = 'minor';
        }

        const label = cleanText(line.slice(0, 180));
        if (label && !criteria.some(c => c.label === label)) {
          criteria.push({
            id: `${slug}_c${index++}`,
            type,
            label,
            sourceGuideline: meta.sources?.[0] || meta.specialty || 'Khuyến cáo chuyên khoa'
          });
        }
        if (criteria.length >= 8) break;
      }
    }
  }

  // If no criteria found from body, generate structured initial criteria from keywords/meta
  if (criteria.length === 0) {
    const kw = Array.isArray(meta.keywords) ? meta.keywords : [];
    criteria.push({
      id: `${slug}_c1`,
      type: 'major',
      label: `Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của ${diseaseName}`,
      description: kw.slice(0, 3).join(', ') || 'Dấu hiệu khởi phát và diễn tiến lâm sàng',
      sourceGuideline: meta.specialty || 'Bộ Y Tế'
    });
    criteria.push({
      id: `${slug}_c2`,
      type: 'lab',
      label: `Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định ${diseaseName}`,
      labThreshold: 'Biến đổi trên ngưỡng tham chiếu bình thường',
      sourceGuideline: meta.specialty || 'Bộ Y Tế'
    });
    criteria.push({
      id: `${slug}_c3`,
      type: 'imaging',
      label: `Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong ${diseaseName}`,
      description: 'Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh',
      sourceGuideline: meta.specialty || 'Bộ Y Tế'
    });
  }

  return criteria;
}

// Generate full Reaction Chain Definition
function buildDiseaseDefinition(diseaseName, files, specialtyDir) {
  const slug = slugify(diseaseName);
  
  // Aggregate metadata across all parts
  let combinedMeta = {
    title: diseaseName,
    icd10: [],
    specialty: specialtyDir,
    aliases: [],
    keywords: [],
    sources: [],
    tags: []
  };

  let combinedBody = '';
  let partsInfo = {};

  for (const f of files) {
    const content = fs.readFileSync(f.fullPath, 'utf8');
    const { meta, body } = parseFile(content);

    if (meta.title && !combinedMeta.title) combinedMeta.title = meta.title;
    if (meta.specialty) combinedMeta.specialty = meta.specialty;
    if (Array.isArray(meta.icd10)) {
      meta.icd10.forEach(code => {
        if (!combinedMeta.icd10.includes(code)) combinedMeta.icd10.push(code);
      });
    } else if (typeof meta.icd10 === 'string') {
      const code = meta.icd10.trim();
      if (code && !combinedMeta.icd10.includes(code)) combinedMeta.icd10.push(code);
    }

    if (Array.isArray(meta.aliases)) {
      meta.aliases.forEach(a => { if (!combinedMeta.aliases.includes(a)) combinedMeta.aliases.push(a); });
    }
    if (Array.isArray(meta.keywords)) {
      meta.keywords.forEach(k => { if (!combinedMeta.keywords.includes(k)) combinedMeta.keywords.push(k); });
    }
    if (Array.isArray(meta.sources)) {
      meta.sources.forEach(s => { if (!combinedMeta.sources.includes(s)) combinedMeta.sources.push(s); });
    }

    partsInfo[f.part] = {
      filename: f.filename,
      size: f.size,
      relPath: f.relPath
    };

    combinedBody += '\n\n' + body;
  }

  // Primary ICD code
  let icdCode = 'R69';
  if (combinedMeta.icd10.length > 0) {
    // Extract code only (e.g. "A90 - Sốt Dengue" -> "A90")
    const match = combinedMeta.icd10[0].match(/^([A-Z][0-9]+(?:\.[0-9]+)?)/i);
    icdCode = match ? match[1].toUpperCase() : combinedMeta.icd10[0];
  }

  // Prefixes
  const icdPrefixes = combinedMeta.icd10.map(c => {
    const m = c.match(/^([A-Z][0-9]+)/i);
    return m ? m[1].toUpperCase() : c;
  }).filter((v, i, a) => a.indexOf(v) === i);

  if (icdPrefixes.length === 0) icdPrefixes.push(icdCode.split('.')[0]);

  const severity = determineSeverity(diseaseName, combinedMeta, combinedBody);
  const summary = extractSummary(diseaseName, combinedBody);
  const goldStandard = extractGoldStandard(diseaseName, combinedBody, combinedMeta.specialty);
  const criteria = extractCriteria(slug, diseaseName, combinedBody, combinedMeta);

  const criteriaRule = {
    minMajorRequired: 1,
    minMinorRequired: 1,
    mandatoryIds: criteria.filter(c => c.type === 'mandatory').map(c => c.id),
    ruleDescription: `Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (${combinedMeta.specialty || 'Bộ Y Tế'})`
  };

  // Build protocol
  const guidelineStr = combinedMeta.sources?.[0] || `Hướng dẫn Chẩn đoán & Điều trị ${diseaseName} - Bộ Y Tế & Quốc Tế`;
  const protocol = {
    title: `Phác đồ Tiếp cận & Điều trị ${diseaseName} (${combinedMeta.specialty})`,
    guideline: guidelineStr,
    targetGoals: [
      `Kiểm soát triệu chứng cấp tính & ổn định sinh hiệu`,
      `Điều trị căn nguyên đặc hiệu & ngăn ngừa biến chứng`,
      `Đánh giá đáp ứng điều trị và theo dõi dài hạn`
    ],
    initialManagement: [
      `Đánh giá toàn diện sinh hiệu, tri giác và các dấu hiệu cảnh báo đỏ (Red Flags)`,
      `Thiết lập đường truyền tĩnh mạch và lấy mẫu xét nghiệm chẩn đoán ban đầu`,
      `Phân tầng độ nặng và quyết định hướng xử trí (ngoại trú / nhập viện / hồi sức tích cực)`
    ],
    firstLineDrugs: [
      {
        drugName: `Thuốc điều trị bậc 1 cho ${diseaseName}`,
        class: `Thuốc đặc hiệu chuyên khoa ${combinedMeta.specialty}`,
        route: `Uống / Tiêm truyền`,
        dosage: `Theo cân nặng và chức năng gan thận`,
        frequency: `Theo phác đồ chuẩn`,
        instructions: `Sử dụng theo đúng chỉ định chuyên khoa, theo dõi sát tác dụng phụ`,
        isFirstLine: true
      }
    ],
    secondLineDrugs: [],
    supportiveCare: [
      `Theo dõi sát dấu hiệu sinh tồn và diễn tiến lâm sàng`,
      `Bù đủ dịch, cân bằng điện giải và dinh dưỡng hợp lý`,
      `Tái khám định kỳ hoặc hội chẩn đa chuyên khoa khi không đáp ứng`
    ]
  };

  // Complications
  const complications = [
    {
      name: `Biến chứng cấp tính của ${diseaseName}`,
      timeframe: 'acute_24h',
      warningSigns: `Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác`,
      preventiveAction: `Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ`,
      onCallAlertText: `Báo động biến chứng cấp trên bệnh nhân ${diseaseName}: Kiểm tra sinh hiệu và báo bác sĩ trực ngay`
    },
    {
      name: `Di chứng hoặc biến chứng mạn tính`,
      timeframe: 'chronic',
      warningSigns: `Suy giảm chức năng cơ quan đích kéo dài`,
      preventiveAction: `Điều trị duy trì và tái khám theo dõi định kỳ`,
      onCallAlertText: `Theo dõi tiến triển mạn tính và tuân thủ điều trị`
    }
  ];

  const monitoringLabs = [
    `Công thức máu toàn phần (CBC)`,
    `Sinh hóa máu: Chức năng gan (AST, ALT), Chức năng thận (Creatinine, Urea)`,
    `Điện giải đồ (Na, K, Cl)`,
    `Các dấu ấn chuyên khoa đặc hiệu theo dõi đáp ứng điều trị`
  ];

  // Vault Pathways linking 6 primary kho
  const kwSearch = diseaseName.toLowerCase();
  const vaultPathways = [
    { khoCode: 'TC', khoName: 'Kho Lâm Sàng', articleTitle: `Tiếp cận chẩn đoán ${diseaseName}`, searchKeyword: kwSearch },
    { khoCode: 'CD', khoName: 'Kho Tiêu Chuẩn CĐ', articleTitle: `Tiêu chuẩn chẩn đoán ${diseaseName}`, searchKeyword: kwSearch },
    { khoCode: 'CLS', khoName: 'Kho Cận Lâm Sàng', articleTitle: `Xét nghiệm & Cận lâm sàng ${diseaseName}`, searchKeyword: kwSearch },
    { khoCode: 'PDDT', khoName: 'Kho Phác Đồ', articleTitle: `Phác đồ điều trị ${diseaseName}`, searchKeyword: kwSearch },
    { khoCode: 'DUOC', khoName: 'Kho Dược', articleTitle: `Dược thư & Sử dụng thuốc ${diseaseName}`, searchKeyword: kwSearch },
    { khoCode: 'BC', khoName: 'Kho Biến Chứng', articleTitle: `Biến chứng & Tiên lượng ${diseaseName}`, searchKeyword: kwSearch }
  ];

  return {
    slug,
    definition: {
      icdCode,
      icdPrefixes,
      diseaseName,
      specialty: combinedMeta.specialty,
      severity,
      summary,
      goldStandard,
      criteriaRule,
      criteria,
      protocol,
      complications,
      monitoringLabs,
      vaultPathways
    },
    meta: {
      aliases: combinedMeta.aliases,
      keywords: combinedMeta.keywords,
      parts: partsInfo
    }
  };
}

export function runIngestion(options = { dryRun: false }) {
  console.log('🚀 Bắt đầu quét Kho Chẩn Đoán...');
  if (!fs.existsSync(VAULT_CD_DIR)) {
    console.error(`❌ Thư mục không tồn tại: ${VAULT_CD_DIR}`);
    return;
  }

  const subDirs = fs.readdirSync(VAULT_CD_DIR, { withFileTypes: true }).filter(d => d.isDirectory());
  console.log(`📁 Tìm thấy ${subDirs.length} chuyên khoa trong Kho Chẩn Đoán.`);

  const diseaseMap = new Map();

  for (const sub of subDirs) {
    const subPath = path.join(VAULT_CD_DIR, sub.name);
    const files = fs.readdirSync(subPath).filter(f => f.endsWith('.md'));

    for (const f of files) {
      const fullPath = path.join(subPath, f);
      const stat = fs.statSync(fullPath);

      // Extract disease name and part
      // Match CD_<Name>_P<part>.md or CĐ_<Name>.md or <Name>_P<part>.md
      let diseaseName = f.replace(/\.md$/i, '');
      let part = 'P1';

      const partMatch = diseaseName.match(/^(?:CD_|CĐ_)?(.+?)(?:_P(\d+))?$/i);
      if (partMatch) {
        diseaseName = partMatch[1].trim();
        if (partMatch[2]) part = 'P' + partMatch[2];
      }

      if (!diseaseMap.has(diseaseName)) {
        diseaseMap.set(diseaseName, {
          specialty: sub.name,
          files: []
        });
      }

      diseaseMap.get(diseaseName).files.push({
        filename: f,
        part,
        size: stat.size,
        fullPath,
        relPath: `2.3. Kho chẩn đoán/${sub.name}/${f}`
      });
    }
  }

  console.log(`✅ Tổng số bệnh lý nhận diện được: ${diseaseMap.size} bệnh lý.`);

  const resultDatabase = {};
  const catalogList = [];

  for (const [diseaseName, info] of diseaseMap.entries()) {
    const { slug, definition, meta } = buildDiseaseDefinition(diseaseName, info.files, info.specialty);
    
    // Check if slug already exists to prevent duplicate keys
    let finalKey = slug;
    let counter = 1;
    while (resultDatabase[finalKey]) {
      finalKey = `${slug}_${counter++}`;
    }

    resultDatabase[finalKey] = definition;

    catalogList.push({
      key: finalKey,
      name: diseaseName,
      icdCode: definition.icdCode,
      specialty: definition.specialty,
      severity: definition.severity,
      aliases: meta.aliases,
      parts: meta.parts,
      criteriaCount: definition.criteria.length
    });
  }

  console.log(`📊 Đã biên dịch xong ${Object.keys(resultDatabase).length} định nghĩa chuỗi chẩn đoán.`);

  if (options.dryRun) {
    console.log('🧪 Chế độ Dry-Run: Không ghi file lên đĩa.');
    const sampleKeys = Object.keys(resultDatabase).slice(0, 5);
    console.log('Mẫu 5 bệnh đầu tiên:', sampleKeys);
    return;
  }

  // 1. Ghi file TypeScript riêng: kho-chan-doan-db.ts
  const tsContent = `/**
 * CliniPortal Kho Chẩn Đoán Database — Generated Automatically
 * Nguồn dữ liệu: knowledge-vault/2.3. Kho chẩn đoán/ (15 Chuyên khoa, ${diseaseMap.size} Bệnh lý)
 * Tự động tạo bởi: tools/scripts/ingest-kho-chan-doan.mjs
 * Ngày cập nhật: ${new Date().toISOString().split('T')[0]}
 */

import type { DiseaseReactionChainDefinition } from './diagnostic-criteria-database';

export const KHO_CHAN_DOAN_DATABASE: Record<string, DiseaseReactionChainDefinition> = ${JSON.stringify(resultDatabase, null, 2)};

export const KHO_CHAN_DOAN_KEYS = Object.keys(KHO_CHAN_DOAN_DATABASE);
`;

  fs.writeFileSync(TARGET_TS_FILE, tsContent, 'utf8');
  console.log(`💾 [1/2] Đã xuất file TypeScript DB: ${TARGET_TS_FILE} (${(Buffer.byteLength(tsContent) / 1024).toFixed(1)} KB)`);

  // 2. Ghi catalog JSON cho DocSpace UI: vault-catalog-cd.json
  const catalogContent = JSON.stringify({
    totalDiseases: catalogList.length,
    updatedAt: new Date().toISOString(),
    diseases: catalogList
  }, null, 2);

  fs.writeFileSync(CATALOG_JSON_FILE, catalogContent, 'utf8');
  console.log(`💾 [2/2] Đã xuất Catalog CD JSON: ${CATALOG_JSON_FILE} (${(Buffer.byteLength(catalogContent) / 1024).toFixed(1)} KB)`);

  console.log('🎉 Hoàn tất nạp Kho Chẩn Đoán vào DocSpace thành công!');
}

// Chạy trực tiếp nếu gọi từ CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const isDryRun = process.argv.includes('--dry-run');
  runIngestion({ dryRun: isDryRun });
}
