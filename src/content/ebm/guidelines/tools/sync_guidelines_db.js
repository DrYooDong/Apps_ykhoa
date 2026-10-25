/**
 * CliniPortal 2.0 — Guidelines & EBM Single Source of Truth Synchronization Engine
 * Path: src/content/ebm/guidelines/tools/sync_guidelines_db.js
 *
 * Tự động đồng bộ từ các tệp MDX Native (kho-guidelines/*.mdx)
 * sang CSDL JSON (data/guidelines-db.json) và Registry (js/kho-guidelines-registry.ts).
 * 
 * Cách dùng:
 * - Đồng bộ thông thường: node tools/sync_guidelines_db.js
 * - Migration 1 lần từ Registry sang MDX: node tools/sync_guidelines_db.js --migrate
 */

const fs = require('fs');
const path = require('path');

const KHO_GUIDELINES_DIR = path.resolve(__dirname, '../kho-guidelines');
const DB_JSON_PATH = path.resolve(__dirname, '../data/guidelines-db.json');
const REGISTRY_TS_PATH = path.resolve(__dirname, '../js/kho-guidelines-registry.ts');

// Danh sách các trường thuộc về Study object (dùng cho bảng, bộ lọc, CDSS & EBM Analytics)
const STUDY_FIELDS = [
  'id', 'title', 'titleEn', 'drug', 'sourceType', 'specialty', 'specialty2',
  'specialties', 'design', 'intervention', 'primaryEndpoint', 'keyResults',
  'impact', 'year', 'organization', 'journal', 'phase', 'sampleSize',
  'population', 'summary', 'detailedConclusion', 'fdaStatus', 'sourceUrl',
  'file', 'asianData', 'bookmarked', 'parts', 'icd10', 'subgroups',
  'conditionKey', 'impactFactor', 'if', 'quartile', 'sjr', 'snip', 'hIndex',
  'publisher', 'cor', 'loe', 'code', 'tags', 'keyRecommendations', 'description', 'category'
];

/**
 * Phân tích cú pháp YAML Frontmatter từ nội dung tệp MDX
 */
function parseFrontmatter(content) {
  if (!content || !content.startsWith('---')) {
    return { frontmatter: {}, body: content || '', rawFrontmatter: '' };
  }

  const lines = content.split(/\r?\n/);
  if (lines[0].trim() !== '---') {
    return { frontmatter: {}, body: content, rawFrontmatter: '' };
  }

  let endIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIdx = i;
      break;
    }
  }

  if (endIdx === -1) {
    return { frontmatter: {}, body: content, rawFrontmatter: '' };
  }

  const frontmatterLines = lines.slice(1, endIdx);
  const rawFrontmatter = frontmatterLines.join('\n');
  const body = lines.slice(endIdx + 1).join('\n');
  const frontmatter = {};

  let currentKey = null;
  let currentMode = null; // 'array_simple', 'array_objects', 'object'
  let currentObj = null;

  for (let i = 0; i < frontmatterLines.length; i++) {
    const rawLine = frontmatterLines[i];
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed.startsWith('#')) continue;

    const indentMatch = rawLine.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;

    // Sub-item của mảng đối tượng (vd: sections: - id: ...)
    if (indent >= 2 && currentMode === 'array_objects' && trimmed.startsWith('-')) {
      const rest = trimmed.replace(/^-\s*/, '').trim();
      currentObj = {};
      frontmatter[currentKey].push(currentObj);

      if (rest.includes(':')) {
        const cIdx = rest.indexOf(':');
        const sKey = rest.slice(0, cIdx).trim();
        let sVal = rest.slice(cIdx + 1).trim();
        currentObj[sKey] = cleanScalar(sVal);
      }
      continue;
    }

    if (indent >= 4 && currentMode === 'array_objects' && currentObj && trimmed.includes(':')) {
      const cIdx = trimmed.indexOf(':');
      const sKey = trimmed.slice(0, cIdx).trim();
      let sVal = trimmed.slice(cIdx + 1).trim();
      currentObj[sKey] = cleanScalar(sVal);
      continue;
    }

    // Sub-item của mảng chuỗi (vd: tags, icd10, keyRecommendations)
    if (indent >= 2 && (currentMode === 'array_simple' || currentMode === 'array') && trimmed.startsWith('-')) {
      let itemVal = trimmed.replace(/^-\s*/, '').trim();
      if (!Array.isArray(frontmatter[currentKey])) frontmatter[currentKey] = [];
      frontmatter[currentKey].push(cleanScalar(itemVal));
      continue;
    }

    // Sub-item của object (vd: subgroups)
    if (indent >= 2 && currentMode === 'object' && trimmed.includes(':')) {
      const cIdx = trimmed.indexOf(':');
      let subKey = trimmed.slice(0, cIdx).trim().replace(/^["']|["']$/g, '');
      let subVal = trimmed.slice(cIdx + 1).trim();
      if (!frontmatter[currentKey] || typeof frontmatter[currentKey] !== 'object') {
        frontmatter[currentKey] = {};
      }
      frontmatter[currentKey][subKey] = cleanScalar(subVal);
      continue;
    }

    // Top-level key
    if (indent === 0 && trimmed.includes(':')) {
      const cIdx = trimmed.indexOf(':');
      const key = trimmed.slice(0, cIdx).trim();
      let val = trimmed.slice(cIdx + 1).trim();

      if (val === '') {
        currentKey = key;
        currentObj = null;
        if (key === 'subgroups' || key === 'metrics') {
          currentMode = 'object';
          frontmatter[key] = {};
        } else if (key === 'sections') {
          currentMode = 'array_objects';
          frontmatter[key] = [];
        } else {
          currentMode = 'array_simple';
          frontmatter[key] = [];
        }
      } else {
        currentKey = key;
        currentMode = null;
        currentObj = null;
        frontmatter[key] = cleanScalar(val);
      }
    }
  }

  return { frontmatter, body, rawFrontmatter };
}

function cleanScalar(val) {
  if (val === undefined || val === null) return '';
  const str = String(val).trim();
  if (str === 'true') return true;
  if (str === 'false') return false;
  if (str === 'null') return null;
  
  if ((str.startsWith('"') && str.endsWith('"')) ||
      (str.startsWith("'") && str.endsWith("'")) ||
      str.startsWith('[') || str.startsWith('{')) {
    try {
      return JSON.parse(str.replace(/'/g, '"'));
    } catch (e) {
      return str.replace(/^["']|["']$/g, '');
    }
  }

  if (!isNaN(Number(str)) && str !== '') {
    return Number(str);
  }

  return str.replace(/^["']|["']$/g, '');
}

/**
 * Tuần tự hóa đối tượng thành chuỗi YAML Frontmatter chuẩn mực
 */
function serializeFrontmatter(studyData, extraFields = {}) {
  const merged = { ...extraFields, ...studyData };
  const lines = ['---'];

  // Thứ tự ưu tiên hiển thị các trường chuẩn trong Frontmatter
  const priorityKeys = [
    'id', 'slug', 'title', 'titleEn', 'code', 'organization', 'journal', 'year',
    'sourceType', 'specialty', 'specialty2', 'design', 'impact',
    'cor', 'loe', 'category', 'status', 'version', 'updatedAt',
    'conditionKey', 'icd10', 'drug', 'population', 'intervention',
    'primaryEndpoint', 'keyResults', 'summary', 'detailedConclusion',
    'asianData', 'subgroups', 'impactFactor', 'quartile', 'sjr', 'hIndex',
    'fdaStatus', 'sampleSize', 'sourceUrl', 'file',
    'description', 'tags', 'keyRecommendations', 'clinicalPearls', 'sections'
  ];

  const seen = new Set();
  const allKeys = [
    ...priorityKeys.filter(k => k in merged),
    ...Object.keys(merged).filter(k => !priorityKeys.includes(k))
  ];

  for (const k of allKeys) {
    if (seen.has(k)) continue;
    seen.add(k);

    let v = merged[k];
    if (v === undefined || v === null) continue;

    // Chuẩn hóa chuỗi subgroups dạng JSON string thành object nếu cần
    if (k === 'subgroups' && typeof v === 'string' && v.trim().startsWith('{')) {
      try { v = JSON.parse(v); } catch (e) {}
    }

    if (typeof v === 'string') {
      lines.push(`${k}: ${JSON.stringify(v)}`);
    } else if (typeof v === 'number' || typeof v === 'boolean') {
      lines.push(`${k}: ${v}`);
    } else if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(`${k}: []`);
      } else if (v.every(item => typeof item === 'string' || typeof item === 'number')) {
        lines.push(`${k}: ${JSON.stringify(v)}`);
      } else {
        lines.push(`${k}:`);
        v.forEach(item => {
          if (typeof item === 'object' && item !== null) {
            const entries = Object.entries(item);
            lines.push(`  - ${entries[0][0]}: ${JSON.stringify(entries[0][1])}`);
            for (let e = 1; e < entries.length; e++) {
              lines.push(`    ${entries[e][0]}: ${JSON.stringify(entries[e][1])}`);
            }
          } else {
            lines.push(`  - ${JSON.stringify(item)}`);
          }
        });
      }
    } else if (typeof v === 'object') {
      const entries = Object.entries(v);
      if (entries.length === 0) {
        lines.push(`${k}: {}`);
      } else {
        lines.push(`${k}:`);
        for (const [subK, subV] of entries) {
          lines.push(`  ${JSON.stringify(subK)}: ${JSON.stringify(subV)}`);
        }
      }
    }
  }

  lines.push('---');
  return lines.join('\n');
}

/**
 * Trích xuất Study object chuẩn hóa từ frontmatter
 */
function extractStudyFromFrontmatter(fm, fileName) {
  const baseSlug = fileName.replace(/\.mdx$/i, '');
  const id = fm.id || fm.slug || baseSlug;
  const file = fm.file || `${baseSlug}.mdx`;

  let year = new Date().getFullYear();
  if (fm.year !== undefined && fm.year !== null) {
    const y = parseInt(String(fm.year), 10);
    if (!isNaN(y)) year = y;
  }

  let subgroups = fm.subgroups || {};
  if (typeof subgroups === 'string' && subgroups.trim().startsWith('{')) {
    try { subgroups = JSON.parse(subgroups); } catch (e) {}
  }

  let icd10 = fm.icd10;
  if (typeof icd10 === 'string') {
    if (icd10.trim().startsWith('[')) {
      try { icd10 = JSON.parse(icd10); } catch (e) { icd10 = [icd10]; }
    } else {
      icd10 = icd10.split(',').map(s => s.trim()).filter(Boolean);
    }
  } else if (!Array.isArray(icd10)) {
    icd10 = [];
  }

  const study = {
    id: String(id).trim(),
    title: fm.title || baseSlug,
    titleEn: fm.titleEn || undefined,
    drug: fm.drug || undefined,
    sourceType: fm.sourceType || 'intl-guideline',
    specialty: fm.specialty || 'other',
    specialty2: fm.specialty2 || undefined,
    design: fm.design || 'guideline',
    intervention: fm.intervention || undefined,
    primaryEndpoint: fm.primaryEndpoint || undefined,
    keyResults: fm.keyResults || undefined,
    impact: fm.impact || 'informative',
    year: year,
    organization: fm.organization || undefined,
    journal: fm.journal || undefined,
    phase: fm.phase || undefined,
    population: fm.population || undefined,
    summary: fm.summary || fm.description || undefined,
    detailedConclusion: fm.detailedConclusion || undefined,
    file: file,
    conditionKey: fm.conditionKey || undefined,
    icd10: icd10,
    asianData: Boolean(fm.asianData),
    bookmarked: Boolean(fm.bookmarked)
  };

  if (Object.keys(subgroups).length > 0) {
    study.subgroups = subgroups;
  }
  if (fm.sampleSize !== undefined) study.sampleSize = fm.sampleSize;
  if (fm.fdaStatus) study.fdaStatus = fm.fdaStatus;
  if (fm.sourceUrl) study.sourceUrl = fm.sourceUrl;
  if (fm.impactFactor) study.impactFactor = fm.impactFactor;
  if (fm.quartile) study.quartile = fm.quartile;
  if (fm.sjr) study.sjr = fm.sjr;
  if (fm.hIndex) study.hIndex = fm.hIndex;
  if (fm.code) study.code = fm.code;
  if (fm.tags) study.tags = Array.isArray(fm.tags) ? fm.tags : [fm.tags];
  if (fm.keyRecommendations) study.keyRecommendations = Array.isArray(fm.keyRecommendations) ? fm.keyRecommendations : [fm.keyRecommendations];
  if (fm.description) study.description = fm.description;
  if (fm.category) study.category = fm.category;
  if (fm.cor) study.cor = fm.cor;
  if (fm.loe) study.loe = fm.loe;

  return study;
}

/**
 * QUY TRÌNH 1: Đồng bộ từ kho-guidelines/*.mdx ra guidelines-db.json & kho-guidelines-registry.ts
 */
function syncAllFromMdx(options = {}) {
  const silent = Boolean(options.silent);
  if (!silent) {
    console.log('\n=============================================================');
    console.log('🔄 BẮT ĐẦU ĐỒNG BỘ GUIDELINES TỪ KHO TỆP MDX NATIVE');
    console.log('=============================================================');
  }

  if (!fs.existsSync(KHO_GUIDELINES_DIR)) {
    console.error(`❌ Thư mục không tồn tại: ${KHO_GUIDELINES_DIR}`);
    return false;
  }

  const mdxFiles = fs.readdirSync(KHO_GUIDELINES_DIR).filter(f => f.endsWith('.mdx'));
  if (mdxFiles.length === 0) {
    console.warn('⚠️ Không tìm thấy tệp .mdx nào trong thư mục kho-guidelines');
    return false;
  }

  const studies = [];
  const warnings = [];
  const specialtyCount = {};

  mdxFiles.forEach(fileName => {
    const filePath = path.join(KHO_GUIDELINES_DIR, fileName);
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter } = parseFrontmatter(content);

    if (!frontmatter.title) {
      warnings.push(`${fileName}: Thiếu trường 'title' trong frontmatter`);
    }

    const study = extractStudyFromFrontmatter(frontmatter, fileName);
    studies.push(study);

    const spec = study.specialty || 'other';
    specialtyCount[spec] = (specialtyCount[spec] || 0) + 1;
  });

  // Sắp xếp nghiên cứu: Năm mới nhất trước, sau đó theo ID
  studies.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.id.localeCompare(b.id);
  });

  // 1. Ghi CSDL JSON (guidelines-db.json)
  fs.writeFileSync(DB_JSON_PATH, JSON.stringify(studies, null, 2), 'utf8');

  // 2. Ghi Kho Metadata Registry TypeScript (kho-guidelines-registry.ts)
  const registryCode = `/**
 * CliniPortal 2.0 — Kho Guidelines Static Metadata Registry
 * Path: src/content/ebm/guidelines/kho-guidelines-registry.ts
 *
 * TỰ ĐỘNG SINH TỪ TẬP TỆP MDX NATIVE (Single Source of Truth)
 * Cập nhật: ${new Date().toISOString().split('T')[0]} (${studies.length} tài liệu lâm sàng chuẩn hóa 1:1)
 * KHÔNG SỬA TAY FILE NÀY — Chỉnh sửa trực tiếp tại src/content/ebm/guidelines/kho-guidelines/<slug>.mdx
 */

import { Study } from './guidelines-types';

export const KHO_GUIDELINES_STATIC: Study[] = ${JSON.stringify(studies, null, 2)};
`;

  fs.writeFileSync(REGISTRY_TS_PATH, registryCode, 'utf8');

  if (!silent) {
    console.log(`✅ Đã quét và tổng hợp thành công: ${studies.length} tệp MDX`);
    console.log(`📁 Đã cập nhật snapshot CSDL: ${path.relative(process.cwd(), DB_JSON_PATH)}`);
    console.log(`🏛️ Đã cập nhật Registry TS:  ${path.relative(process.cwd(), REGISTRY_TS_PATH)}`);
    console.log('\n📊 Phân bố theo chuyên khoa:');
    Object.entries(specialtyCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([spec, count]) => {
        console.log(`   - ${spec.padEnd(12)}: ${count} bài`);
      });

    if (warnings.length > 0) {
      console.warn('\n⚠️ Cảnh báo kiểm định:');
      warnings.forEach(w => console.warn(`   ! ${w}`));
    }
    console.log('\n🎉 ĐỒNG BỘ HOÀN TẤT 100%! HỆ THỐNG ĐÃ ĐỒNG NHẤT VỚI KHO MDX.\n');
  }

  return { total: studies.length, specialtyCount, warnings };
}

/**
 * QUY TRÌNH 2 (MIGRATION 1 LẦN):
 * Đẩy toàn bộ metadata phong phú từ kho-guidelines-registry.ts vào từng file .mdx
 */
function migrateRegistryToMdx() {
  console.log('\n=============================================================');
  console.log('🚀 BẮT ĐẦU MIGRATION: ĐỒNG BỘ METADATA REGISTRY VÀO 118 TỆP MDX');
  console.log('=============================================================');

  if (!fs.existsSync(REGISTRY_TS_PATH)) {
    console.error(`❌ Không tìm thấy file registry: ${REGISTRY_TS_PATH}`);
    return;
  }

  const regContent = fs.readFileSync(REGISTRY_TS_PATH, 'utf8');
  const jsonMatch = regContent.match(/export const KHO_GUIDELINES_STATIC:\s*Study\[\]\s*=\s*(\[[\s\S]*\]);?\s*$/);
  if (!jsonMatch) {
    console.error('❌ Không bóc tách được mảng KHO_GUIDELINES_STATIC từ file registry');
    return;
  }

  const registryStudies = JSON.parse(jsonMatch[1]);
  const studyMap = new Map();
  registryStudies.forEach(s => {
    studyMap.set(s.id, s);
    if (s.file) {
      studyMap.set(s.file.replace(/\.mdx$/i, ''), s);
    }
  });

  const mdxFiles = fs.readdirSync(KHO_GUIDELINES_DIR).filter(f => f.endsWith('.mdx'));
  let updatedCount = 0;

  mdxFiles.forEach(fileName => {
    const filePath = path.join(KHO_GUIDELINES_DIR, fileName);
    const baseSlug = fileName.replace(/\.mdx$/i, '');
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, body } = parseFrontmatter(content);

    const regStudy = studyMap.get(frontmatter.id) || studyMap.get(frontmatter.slug) || studyMap.get(baseSlug);

    // Gộp: Dữ liệu hiện có trong MDX + Dữ liệu chi tiết từ Registry
    const mergedData = { ...frontmatter };
    if (regStudy) {
      STUDY_FIELDS.forEach(field => {
        if (regStudy[field] !== undefined && regStudy[field] !== null) {
          mergedData[field] = regStudy[field];
        }
      });
    }

    // Đảm bảo slug, id và file chuẩn hóa
    mergedData.id = mergedData.id || baseSlug;
    mergedData.slug = mergedData.slug || mergedData.id;
    mergedData.file = `${mergedData.id}.mdx`;

    const newFrontmatterStr = serializeFrontmatter(mergedData);
    const newContent = `${newFrontmatterStr}\n${body.startsWith('\n') ? body.slice(1) : body}`;

    fs.writeFileSync(filePath, newContent, 'utf8');
    updatedCount++;
    console.log(`[MIGRATED] ${fileName} (${mergedData.specialty} | ${mergedData.year})`);
  });

  console.log(`\n🎉 Đã nâng cấp toàn diện Frontmatter cho ${updatedCount} tệp MDX!`);
  console.log('Tiến hành chạy kiểm định và đồng bộ ngược lại DB...\n');

  // Chạy sync để làm mới guidelines-db.json và kho-guidelines-registry.ts từ nguồn MDX
  syncAllFromMdx();
}

// Chạy trực tiếp từ dòng lệnh
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--migrate')) {
    migrateRegistryToMdx();
  } else {
    syncAllFromMdx();
  }
}

module.exports = {
  parseFrontmatter,
  serializeFrontmatter,
  syncAllFromMdx,
  migrateRegistryToMdx
};
