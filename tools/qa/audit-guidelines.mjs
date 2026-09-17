#!/usr/bin/env node

/**
 * 🔬 CliniPortal QA Agent Squad — Guidelines EBM Audit Master
 * Script: tools/qa/audit-guidelines.mjs
 * 
 * Khảo sát, rà soát và kiểm định toàn diện 107 tệp MDX trong:
 * src/content/ebm/guidelines/kho-guidelines/
 * 
 * 7 Chiều kiểm tra:
 *  1. Stats Strip Truncation & Generic Placeholders (Cắt xén chữ, placeholder chung)
 *  2. Frontmatter & KeyRecommendations Boilerplate (Template copy-paste, thiếu schema)
 *  3. Section Icons Monotony (Đơn điệu icon, toàn bộ dùng fa-book-medical)
 *  4. KaTeX $...$ Syntax Violations (Vi phạm cấm $...$ theo Design Spec)
 *  5. CRLF Line Endings (\r\n thay vì \n)
 *  6. HTML Tag Integrity (Lệch thẻ đóng/mở div, section, table, ul, ol, li...)
 *  7. Metadata Registry Sync (Đồng bộ với kho-guidelines-registry.ts)
 * 
 * Phân loại:
 *  - Nhóm A (🔴 Critical - Cần sửa cấp bách)
 *  - Nhóm B (🟡 Needs Polish - Cần tinh chỉnh)
 *  - Nhóm C (🟢 Passing - Đạt chuẩn)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const GUIDELINES_DIR = path.join(ROOT_DIR, 'src/content/ebm/guidelines/kho-guidelines');
const REGISTRY_FILE = path.join(ROOT_DIR, 'src/content/ebm/guidelines/js/kho-guidelines-registry.ts');
const REPORT_OUTPUT = path.join(__dirname, 'reports/guidelines-audit-report.json');

const isVerbose = process.argv.includes('--verbose');
const isStrict = process.argv.includes('--strict');

// Danh sách các cụm từ template boilerplate kinh điển
const BOILERPLATE_PHRASES = [
  'khuyến cáo chẩn đoán và phân tầng nguy cơ theo tiêu chuẩn',
  'khởi trị dược lý và tối ưu hóa liều dùng chuẩn y học chứng cứ',
  'đánh giá đáp ứng lâm sàng, theo dõi an toàn và chỉ số xét nghiệm đích',
  'phòng ngừa biến chứng nặng và bẫy lâm sàng thường gặp trong thực hành',
  'nắm vững các chỉ định điều trị và cập nhật phác đồ chuẩn y học chứng cứ'
];

// Placeholder stat-val kinh điển
const GENERIC_STAT_VALS = [
  'khuyến cáo class i',
  'khuyến cáo class 1',
  'bằng chứng mức a',
  'đích lâm sàng',
  'an toàn & biến chứng'
];

// Structural tags cần kiểm tra cân bằng
const STRUCTURAL_TAGS = ['div', 'section', 'article', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'ul', 'ol', 'li', 'aside', 'nav'];

// Đọc registry để kiểm tra độ đồng bộ
function loadRegistryIds() {
  const registeredIds = new Set();
  const registeredFiles = new Set();
  if (fs.existsSync(REGISTRY_FILE)) {
    const content = fs.readFileSync(REGISTRY_FILE, 'utf8');
    const idRegex = /"id"\s*:\s*"([^"]+)"/g;
    const fileRegex = /"file"\s*:\s*"([^"]+)"/g;
    let match;
    while ((match = idRegex.exec(content)) !== null) {
      registeredIds.add(match[1]);
    }
    while ((match = fileRegex.exec(content)) !== null) {
      registeredFiles.add(match[1]);
    }
  }
  return { registeredIds, registeredFiles };
}

// Trích xuất Frontmatter và Body
function splitFrontmatter(rawContent) {
  if (!rawContent.startsWith('---')) {
    return { frontmatterRaw: '', body: rawContent, hasFrontmatter: false };
  }
  const endIdx = rawContent.indexOf('\n---', 3);
  if (endIdx === -1) {
    return { frontmatterRaw: '', body: rawContent, hasFrontmatter: false };
  }
  const frontmatterRaw = rawContent.substring(3, endIdx).trim();
  const body = rawContent.substring(endIdx + 4).trim();
  return { frontmatterRaw, body, hasFrontmatter: true };
}

// Phân tích Frontmatter đơn giản không cần dependency bên ngoài
function parseSimpleYaml(yamlStr) {
  const meta = {
    title: '',
    slug: '',
    code: '',
    organization: '',
    year: '',
    category: '',
    status: '',
    version: '',
    updatedAt: '',
    cor: '',
    loe: '',
    description: '',
    tags: [],
    keyRecommendations: [],
    sections: []
  };

  const lines = yamlStr.split('\n');
  let currentList = null;
  let currentSection = null;

  for (let line of lines) {
    line = line.replace(/\r$/, '');
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // List item
    if (trimmed.startsWith('- ')) {
      const val = trimmed.slice(2).replace(/^["']|["']$/g, '').trim();
      if (currentList === 'tags') {
        meta.tags.push(val);
      } else if (currentList === 'keyRecommendations') {
        meta.keyRecommendations.push(val);
      } else if (currentList === 'sections') {
        if (currentSection) meta.sections.push(currentSection);
        currentSection = {};
        // Có thể là "- id: 'sec-1'" trên cùng 1 dòng
        if (val.includes(':')) {
          const [subKey, subVal] = val.split(':').map(s => s.trim());
          currentSection[subKey] = subVal.replace(/^["']|["']$/g, '');
        }
      }
      continue;
    }

    // Key-value pair
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      const rawVal = line.slice(colonIdx + 1).trim();
      const cleanVal = rawVal.replace(/^["']|["']$/g, '').trim();

      if (key === 'tags') {
        currentList = 'tags';
      } else if (key === 'keyRecommendations') {
        currentList = 'keyRecommendations';
      } else if (key === 'sections') {
        currentList = 'sections';
      } else if (currentList === 'sections' && line.startsWith('    ') && currentSection) {
        // Section sub-property
        currentSection[key] = cleanVal;
      } else {
        currentList = null;
        if (key in meta && !Array.isArray(meta[key])) {
          meta[key] = cleanVal;
        }
      }
    }
  }

  if (currentSection && Object.keys(currentSection).length > 0) {
    meta.sections.push(currentSection);
  }

  return meta;
}

// Kiểm tra HTML Tag Integrity
function checkTagIntegrity(bodyContent) {
  // Loại bỏ code blocks (``` ... ``` và `...`)
  let sanitized = bodyContent.replace(/```[\s\S]*?```/g, '');
  sanitized = sanitized.replace(/`[^`]*`/g, '');
  // Loại bỏ comments HTML
  sanitized = sanitized.replace(/<!--[\s\S]*?-->/g, '');

  const tagDeltas = {};
  const issues = [];

  for (const tag of STRUCTURAL_TAGS) {
    const openRegex = new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi');
    const closeRegex = new RegExp(`</${tag}>`, 'gi');

    let openCount = 0;
    let match;
    while ((match = openRegex.exec(sanitized)) !== null) {
      // Bỏ qua self-closing nếu có `<div ... />`
      if (!match[0].endsWith('/>')) {
        openCount++;
      }
    }

    let closeCount = 0;
    while ((match = closeRegex.exec(sanitized)) !== null) {
      closeCount++;
    }

    const delta = openCount - closeCount;
    if (delta !== 0) {
      tagDeltas[tag] = { opened: openCount, closed: closeCount, delta };
      issues.push(`Thẻ <${tag}> lệch: mở ${openCount}, đóng ${closeCount} (delta: ${delta > 0 ? '+' + delta : delta})`);
    }
  }

  return { isBalanced: issues.length === 0, tagDeltas, issues };
}

// Kiểm tra Stats Strip
function checkStatsStrip(bodyContent) {
  const issues = [];
  const cards = [];

  // Tìm vị trí bắt đầu của stats-strip
  const stripStartIdx = bodyContent.search(/<(?:div|section)\s+[^>]*class=["'][^"']*stats-strip/i);
  if (stripStartIdx === -1) {
    return {
      hasStatsStrip: false,
      cardCount: 0,
      cards: [],
      hasTruncation: false,
      hasGenericVals: false,
      issues: ['Không tìm thấy khối .stats-strip trong bài viết']
    };
  }

  // Cắt vùng stats-strip (từ stats-strip đến pillars hoặc page-content hoặc sec-card đầu tiên)
  const restOfBody = bodyContent.slice(stripStartIdx);
  const endMatch = restOfBody.search(/<(?:div|section|article)\s+[^>]*class=["'][^"']*(?:pillars|page-content|sec-card)/i);
  const stripRegion = endMatch !== -1 ? restOfBody.slice(0, endMatch) : restOfBody.slice(0, 3000);

  // Trích xuất các cặp stat-val / stat-num và stat-lbl
  const valMatches = [...stripRegion.matchAll(/<div\s+[^>]*class=["'][^"']*(?:stat-val|stat-num)[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];
  const lblMatches = [...stripRegion.matchAll(/<div\s+[^>]*class=["'][^"']*stat-lbl[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];

  const cardCount = Math.max(valMatches.length, lblMatches.length);
  for (let i = 0; i < cardCount; i++) {
    const val = valMatches[i] ? valMatches[i][1].replace(/<[^>]+>/g, '').trim() : '';
    const lbl = lblMatches[i] ? lblMatches[i][1].replace(/<[^>]+>/g, '').trim() : '';
    cards.push({ val, lbl });
  }

  let hasTruncation = false;
  let hasGenericVals = false;

  for (let i = 0; i < cards.length; i++) {
    const { val, lbl } = cards[i];
    const valLower = val.toLowerCase();
    const lblLower = lbl.toLowerCase();

    // 1. Cắt xén rõ rệt: kết thúc bằng '...' hoặc cắt dở từ (ví dụ "phân t", "và ", "theo ", v.v.)
    if (val.endsWith('...') || /\b(phân t|và|theo|các|trong|với|đến|của)\s*$/i.test(val)) {
      hasTruncation = true;
      issues.push(`Card ${i + 1}: stat-val bị ngắt xén ("${val}")`);
    }

    // 2. stat-lbl bắt đầu bằng ký tự thường tiếp nối stat-val bị cắt (ví dụ: "ầng nguy cơ...", "liều dùng...", "o dõi an toàn...")
    if (/^[a-zà-ỹ]/i.test(lbl) && (lbl.startsWith('ầng ') || lbl.startsWith(' liều ') || lbl.startsWith('liều ') || lbl.startsWith('o dõi ') || lbl.startsWith('bẫy '))) {
      hasTruncation = true;
      issues.push(`Card ${i + 1}: stat-lbl là phần tiếp nối của câu bị cắt ("${lbl.slice(0, 30)}...")`);
    }

    // 3. stat-lbl kết thúc bằng '....' (lỗi sinh tự động)
    if (lbl.endsWith('....') || lbl.endsWith('...')) {
      hasTruncation = true;
      issues.push(`Card ${i + 1}: stat-lbl kết thúc bằng dấu chấm lửng cắt xén ("${lbl.slice(0, 30)}...")`);
    }

    // 4. Generic placeholders
    if (GENERIC_STAT_VALS.some(g => valLower.includes(g))) {
      hasGenericVals = true;
      issues.push(`Card ${i + 1}: stat-val dùng placeholder chung ("${val}")`);
    }

    // 5. stat-val quá dài (> 45 ký tự) do nhồi nhét cả câu văn vào stat-val
    if (val.length > 45) {
      issues.push(`Card ${i + 1}: stat-val quá dài (${val.length} ký tự): "${val.slice(0, 35)}..."`);
    }
  }

  return {
    hasStatsStrip: true,
    cardCount: cards.length,
    cards,
    hasTruncation,
    hasGenericVals,
    issues
  };
}

// Kiểm tra KeyRecommendations Boilerplate
function checkKeyRecommendations(keyRecs) {
  const issues = [];
  if (!keyRecs || keyRecs.length === 0) {
    return { isBoilerplate: true, count: 0, issues: ['Thiếu keyRecommendations trong frontmatter'] };
  }

  let boilerplateMatchCount = 0;
  for (const rec of keyRecs) {
    const recLower = rec.toLowerCase();
    if (BOILERPLATE_PHRASES.some(p => recLower.includes(p))) {
      boilerplateMatchCount++;
    }
  }

  const isBoilerplate = boilerplateMatchCount >= 2;
  if (isBoilerplate) {
    issues.push(`Trùng khớp ${boilerplateMatchCount}/${keyRecs.length} mẫu boilerplate câu từ sao chép hàng loạt`);
  }

  return {
    isBoilerplate,
    count: keyRecs.length,
    boilerplateMatchCount,
    issues
  };
}

// Kiểm tra Section Icons Monotony
function checkIconMonotony(sections) {
  const issues = [];
  if (!sections || sections.length === 0) {
    return { isMonotonous: false, distinctIcons: 0, totalSections: 0, issues: ['Không tìm thấy sections'] };
  }

  const icons = sections.map(s => s.icon || '').filter(Boolean);
  const uniqueIcons = new Set(icons);

  // Nếu có từ 3 section trở lên mà 100% dùng cùng 1 icon
  const isMonotonous = sections.length >= 3 && uniqueIcons.size === 1;
  const isAllBookMedical = isMonotonous && icons[0]?.includes('fa-book-medical');

  if (isMonotonous) {
    issues.push(`Tất cả ${sections.length} sections đều dùng cùng 1 icon: "${icons[0]}"`);
  }

  return {
    isMonotonous,
    isAllBookMedical,
    totalSections: sections.length,
    distinctIcons: uniqueIcons.size,
    icons: Array.from(uniqueIcons),
    issues
  };
}

// Kiểm tra KaTeX $...$ Syntax Violations
function checkKatexViolations(bodyContent) {
  // Bỏ qua code blocks
  let textToScan = bodyContent.replace(/```[\s\S]*?```/g, '');
  textToScan = textToScan.replace(/`[^`]*`/g, '');
  textToScan = textToScan.replace(/<!--[\s\S]*?-->/g, '');

  const issues = [];
  // Tìm $...$ trong 1 dòng (tránh nhầm lẫn currency đơn lẻ)
  const mathRegex = /\$([^$\n\r]+)\$/g;
  let match;
  let count = 0;
  const samples = [];

  while ((match = mathRegex.exec(textToScan)) !== null) {
    const inner = match[1].trim();
    // Bỏ qua nếu chỉ là số tiền đơn lẻ, nhưng hầu hết trong tài liệu y khoa là công thức/ion
    if (/^[0-9]+(\.[0-9]+)?$/.test(inner)) continue;
    count++;
    if (samples.length < 3) {
      samples.push(`$${inner}$`);
    }
  }

  if (count > 0) {
    issues.push(`Phát hiện ${count} biểu thức KaTeX $...$ trong thân bài (vi phạm Design Spec Rule 7). Mẫu: ${samples.join(', ')}`);
  }

  return {
    hasKatex: count > 0,
    count,
    samples,
    issues
  };
}

// MAIN AUDIT RUNNER
async function runAudit() {
  console.log('\n======================================================================');
  console.log('🔬 CLINI_PORTAL QA SQUAD — GUIDELINES EBM MASTER AUDIT (PHASE 1)');
  console.log('======================================================================\n');
  console.log(`🎯 Thư mục mục tiêu: ${GUIDELINES_DIR}`);

  if (!fs.existsSync(GUIDELINES_DIR)) {
    console.error(`❌ Thư mục không tồn tại: ${GUIDELINES_DIR}`);
    process.exit(1);
  }

  const { registeredIds, registeredFiles } = loadRegistryIds();
  console.log(`📚 Đã nạp Registry: ${registeredIds.size} IDs, ${registeredFiles.size} Files đăng ký.\n`);

  const files = fs.readdirSync(GUIDELINES_DIR)
    .filter(f => f.endsWith('.mdx'))
    .sort();

  console.log(`🔍 Tìm thấy ${files.length} tệp MDX. Bắt đầu quét 7 chiều...\n`);

  const results = [];
  const groupA = []; // Critical (Truncation, Tag Integrity mismatch, Schema breaking)
  const groupB = []; // Needs polish (Boilerplate, Icon monotony, CRLF, KaTeX)
  const groupC = []; // Passing (Clean)

  let totalTruncationFiles = 0;
  let totalGenericStatsFiles = 0;
  let totalBoilerplateFiles = 0;
  let totalIconMonotonyFiles = 0;
  let totalKatexFiles = 0;
  let totalCrlfFiles = 0;
  let totalTagMismatchFiles = 0;
  let totalRegistryMissingFiles = 0;

  for (const fileName of files) {
    const filePath = path.join(GUIDELINES_DIR, fileName);
    const fileStat = fs.statSync(filePath);
    const rawContent = fs.readFileSync(filePath, 'utf8');

    const fileReport = {
      file: fileName,
      slug: path.basename(fileName, '.mdx'),
      sizeBytes: fileStat.size,
      group: 'C',
      criticalIssues: [],
      warningIssues: [],
      checks: {}
    };

    // 1. Kiểm tra CRLF
    const hasCrlf = rawContent.includes('\r\n');
    if (hasCrlf) {
      totalCrlfFiles++;
      fileReport.warningIssues.push('Line endings CRLF (cần chuẩn hóa sang LF)');
    }
    fileReport.checks.crlf = hasCrlf;

    // 2. Tách và Parse Frontmatter
    const { frontmatterRaw, body, hasFrontmatter } = splitFrontmatter(rawContent);
    if (!hasFrontmatter) {
      fileReport.criticalIssues.push('Không có frontmatter YAML');
    }
    const meta = parseSimpleYaml(frontmatterRaw);
    fileReport.checks.frontmatter = {
      title: meta.title,
      cor: meta.cor,
      loe: meta.loe,
      sectionsCount: meta.sections.length
    };

    // 3. Kiểm tra Stats Strip
    const statsResult = checkStatsStrip(body);
    fileReport.checks.statsStrip = statsResult;
    if (statsResult.hasTruncation) {
      totalTruncationFiles++;
      fileReport.criticalIssues.push(...statsResult.issues.filter(i => i.includes('ngắt xén') || i.includes('tiếp nối')));
    }
    if (statsResult.hasGenericVals) {
      totalGenericStatsFiles++;
      fileReport.criticalIssues.push(...statsResult.issues.filter(i => i.includes('placeholder')));
    }

    // 4. Kiểm tra KeyRecommendations Boilerplate
    const recsResult = checkKeyRecommendations(meta.keyRecommendations);
    fileReport.checks.keyRecommendations = recsResult;
    if (recsResult.isBoilerplate) {
      totalBoilerplateFiles++;
      fileReport.warningIssues.push(...recsResult.issues);
    }

    // 5. Kiểm tra Icon Monotony
    const iconResult = checkIconMonotony(meta.sections);
    fileReport.checks.icons = iconResult;
    if (iconResult.isMonotonous) {
      totalIconMonotonyFiles++;
      fileReport.warningIssues.push(...iconResult.issues);
    }

    // 6. Kiểm tra KaTeX $...$
    const katexResult = checkKatexViolations(body);
    fileReport.checks.katex = katexResult;
    if (katexResult.hasKatex) {
      totalKatexFiles++;
      fileReport.warningIssues.push(...katexResult.issues);
    }

    // 7. Kiểm tra HTML Tag Integrity
    const tagResult = checkTagIntegrity(body);
    fileReport.checks.tags = tagResult;
    if (!tagResult.isBalanced) {
      totalTagMismatchFiles++;
      fileReport.criticalIssues.push(...tagResult.issues);
    }

    // 8. Kiểm tra Registry
    const slug = path.basename(fileName, '.mdx');
    const isRegistered = registeredIds.has(slug) || registeredFiles.has(fileName);
    fileReport.checks.registry = isRegistered;
    if (!isRegistered) {
      totalRegistryMissingFiles++;
      fileReport.warningIssues.push(`Chưa được đăng ký trong kho-guidelines-registry.ts`);
    }

    // PHÂN LOẠI NHÓM
    if (fileReport.criticalIssues.length > 0) {
      fileReport.group = 'A';
      groupA.push(fileReport);
    } else if (fileReport.warningIssues.length > 0) {
      fileReport.group = 'B';
      groupB.push(fileReport);
    } else {
      fileReport.group = 'C';
      groupC.push(fileReport);
    }

    results.push(fileReport);
  }

  // Xuất Báo Cáo JSON
  const summaryReport = {
    generatedAt: new Date().toISOString(),
    totalFiles: files.length,
    groups: {
      A: {
        label: 'Nhóm A (Critical — Cần xử lý cấp bách)',
        count: groupA.length,
        files: groupA.map(f => ({
          file: f.file,
          criticalCount: f.criticalIssues.length,
          issues: f.criticalIssues
        }))
      },
      B: {
        label: 'Nhóm B (Needs Polish — Cần tinh chỉnh)',
        count: groupB.length,
        files: groupB.map(f => ({
          file: f.file,
          warningCount: f.warningIssues.length,
          issues: f.warningIssues
        }))
      },
      C: {
        label: 'Nhóm C (Passing — Đạt chuẩn)',
        count: groupC.length,
        files: groupC.map(f => f.file)
      }
    },
    metrics: {
      statsTruncationFiles: totalTruncationFiles,
      genericStatsFiles: totalGenericStatsFiles,
      boilerplateRecFiles: totalBoilerplateFiles,
      iconMonotonyFiles: totalIconMonotonyFiles,
      katexViolationFiles: totalKatexFiles,
      crlfLineEndingFiles: totalCrlfFiles,
      tagMismatchFiles: totalTagMismatchFiles,
      registryMissingFiles: totalRegistryMissingFiles
    },
    details: results
  };

  const reportsDir = path.dirname(REPORT_OUTPUT);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  fs.writeFileSync(REPORT_OUTPUT, JSON.stringify(summaryReport, null, 2), 'utf8');

  // IN BẢNG TỔNG KẾT
  console.log('──────────────────────────────────────────────────────────────────────');
  console.log('📊 KẾT QUẢ QUÉT 7 CHIỀU KIỂM ĐỊNH (107 TỆP MDX)');
  console.log('──────────────────────────────────────────────────────────────────────');
  console.log(` 🔴 Stats Strip Bị Cắt Xén (Truncated):     ${String(totalTruncationFiles).padStart(3)} tệp`);
  console.log(` 🔴 Stats Strip Generic Placeholder:        ${String(totalGenericStatsFiles).padStart(3)} tệp`);
  console.log(` 🔴 Thẻ HTML Lệch Cặp Đóng/Mở (Tag Mismatch):${String(totalTagMismatchFiles).padStart(3)} tệp`);
  console.log(` 🟡 keyRecommendations Mẫu Boilerplate:     ${String(totalBoilerplateFiles).padStart(3)} tệp`);
  console.log(` 🟡 Sections Đơn Điệu Icon (100% 1 icon):    ${String(totalIconMonotonyFiles).padStart(3)} tệp`);
  console.log(` 🟡 KaTeX $...$ Violations (Cấm theo Spec): ${String(totalKatexFiles).padStart(3)} tệp`);
  console.log(` 🟢 CRLF Line Endings (Cần chuyển sang LF): ${String(totalCrlfFiles).padStart(3)} tệp`);
  console.log(` 🟢 Chưa Đăng Ký Registry:                  ${String(totalRegistryMissingFiles).padStart(3)} tệp`);
  console.log('──────────────────────────────────────────────────────────────────────');
  console.log('🏆 PHÂN BỔ NHÓM PHÂN LOẠI HÀNH ĐỘNG:');
  console.log(` 🔴 NHÓM A (Critical - Cần sửa cấp bách):   ${String(groupA.length).padStart(3)} tệp (${((groupA.length / files.length) * 100).toFixed(1)}%)`);
  console.log(` 🟡 NHÓM B (Needs Polish - Cần tinh chỉnh):  ${String(groupB.length).padStart(3)} tệp (${((groupB.length / files.length) * 100).toFixed(1)}%)`);
  console.log(` 🟢 NHÓM C (Passing - Đạt chuẩn tuyệt đối):  ${String(groupC.length).padStart(3)} tệp (${((groupC.length / files.length) * 100).toFixed(1)}%)`);
  console.log('──────────────────────────────────────────────────────────────────────');
  console.log(`💾 Đã xuất báo cáo chi tiết: ${path.relative(ROOT_DIR, REPORT_OUTPUT)}\n`);

  if (groupA.length > 0) {
    console.log('📋 DANH SÁCH TỆP NHÓM A TIÊU BIỂU:');
    groupA.slice(0, 10).forEach((f, idx) => {
      console.log(`  ${idx + 1}. [${f.file}] -> ${f.criticalIssues[0]}`);
    });
    if (groupA.length > 10) {
      console.log(`  ... và ${groupA.length - 10} tệp khác.`);
    }
    console.log('');
  }

  if (isStrict && groupA.length > 0) {
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error('❌ Lỗi thực thi audit:', err);
  process.exit(1);
});
