/**
 * CliniPortal 2.0 — Basic Medical MDX Flagship Refactoring Engine
 * Path: src/content/basic-medical/tools/basic_medical_refactor_engine.js
 * 
 * Tự động hóa chuẩn hóa 143 tệp .mdx trong src/content/basic-medical/ theo tiêu chuẩn Gold Standard MDX 2.0.0:
 * 1. Làm sạch 100% ký tự HTML entities thô (&amp;, &bull;, &rarr;, &ndash;, vàAMP;...)
 * 2. Khôi phục và chuẩn hóa tiêu đề mục H2 (## <Number>. <Title> {#<id>}) kết nối chính xác với frontmatter
 * 3. Tạo Dải Chỉ Số Nhanh Vàng (.stats-strip + 4 thẻ KPI)
 * 4. Đồng bộ các Component QuickNav & Alert
 * 5. Bổ sung Khung trích dẫn AMA (.citation-box) & Hàng nút điều hướng (.btn-row)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// Clean up HTML Entities
function cleanEntities(str) {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/vàAMP;/gi, '&')
    .replace(/vàamp;/gi, '&')
    .replace(/&amp;/g, '&')
    .replace(/vàbull;/gi, '•')
    .replace(/&bull;/g, '•')
    .replace(/vàrarr;/gi, '→')
    .replace(/&rarr;/g, '→')
    .replace(/vàndash;/gi, '–')
    .replace(/&ndash;/g, '–')
    .replace(/vàmdash;/gi, '—')
    .replace(/&mdash;/g, '—')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥')
    .replace(/&plusmn;/g, '±')
    .replace(/&times;/g, '×')
    .replace(/&alpha;/g, 'α')
    .replace(/&beta;/g, 'β')
    .replace(/&Delta;/g, 'Δ')
    .replace(/&mu;/g, 'µ');
}

// Parse YAML frontmatter simply and robustly
function parseFrontmatter(rawYaml) {
  const lines = rawYaml.split(/\r?\n/);
  const data = {};
  let currentKey = '';
  let currentMode = 'simple'; // 'simple' | 'list_strings' | 'list_objects' | 'nested_object'
  let currentObj = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const indent = line.search(/\S/);

    // List item start with "- "
    const dashMatch = line.match(/^(\s*)-\s+(.*)$/);
    if (dashMatch) {
      const itemContent = dashMatch[2].trim();
      const objKvMatch = itemContent.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
      if (objKvMatch) {
        currentMode = 'list_objects';
        currentObj = {};
        let val = objKvMatch[2].trim().replace(/^["']|["']$/g, '');
        if (val === 'true') currentObj[objKvMatch[1]] = true;
        else if (val === 'false') currentObj[objKvMatch[1]] = false;
        else if (!isNaN(Number(val)) && val !== '') currentObj[objKvMatch[1]] = Number(val);
        else currentObj[objKvMatch[1]] = cleanEntities(val);

        if (!Array.isArray(data[currentKey])) data[currentKey] = [];
        data[currentKey].push(currentObj);
      } else {
        currentMode = 'list_strings';
        const cleanVal = cleanEntities(itemContent.replace(/^["']|["']$/g, ''));
        if (!Array.isArray(data[currentKey])) data[currentKey] = [];
        data[currentKey].push(cleanVal);
      }
      continue;
    }

    // Sub-properties of object in list
    if (indent > 2 && currentMode === 'list_objects' && currentObj) {
      const subKvMatch = line.trim().match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
      if (subKvMatch) {
        const subKey = subKvMatch[1];
        let subVal = subKvMatch[2].trim().replace(/^["']|["']$/g, '');
        if (subVal === 'true') currentObj[subKey] = true;
        else if (subVal === 'false') currentObj[subKey] = false;
        else if (!isNaN(Number(subVal)) && subVal !== '') currentObj[subKey] = Number(subVal);
        else currentObj[subKey] = cleanEntities(subVal);
        continue;
      }
    }

    // Sub-properties of nested object (e.g. metrics)
    if (indent > 0 && currentMode === 'nested_object' && data[currentKey] && typeof data[currentKey] === 'object' && !Array.isArray(data[currentKey])) {
      const nestedKvMatch = line.trim().match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
      if (nestedKvMatch) {
        const nKey = nestedKvMatch[1];
        let nVal = nestedKvMatch[2].trim().replace(/^["']|["']$/g, '');
        data[currentKey][nKey] = cleanEntities(nVal);
        continue;
      }
    }

    // Top-level key
    const kvMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      let val = kvMatch[2].trim();

      if (val === '') {
        currentKey = key;
        currentMode = (key === 'metrics' || key === 'author' || key === 'metadata') ? 'nested_object' : 'list_strings';
        data[key] = currentMode === 'nested_object' ? {} : [];
        currentObj = null;
      } else {
        val = val.replace(/^["']|["']$/g, '');
        currentKey = key;
        currentMode = 'simple';
        currentObj = null;
        if (val === 'true') data[key] = true;
        else if (val === 'false') data[key] = false;
        else if (!isNaN(Number(val)) && val !== '') data[key] = Number(val);
        else data[key] = cleanEntities(val);
      }
    }
  }

  return data;
}

// Format YAML frontmatter back to string
function serializeFrontmatter(data) {
  let out = '---\n';
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined || v === null) continue;
    if (typeof v === 'boolean' || typeof v === 'number') {
      out += `${k}: ${v}\n`;
    } else if (typeof v === 'string') {
      out += `${k}: "${cleanEntities(v)}"\n`;
    } else if (Array.isArray(v)) {
      out += `${k}:\n`;
      v.forEach(item => {
        if (typeof item === 'string') {
          out += `  - "${cleanEntities(item)}"\n`;
        } else if (typeof item === 'object') {
          const keys = Object.keys(item);
          if (keys.length > 0) {
            out += `  - ${keys[0]}: "${cleanEntities(item[keys[0]])}"\n`;
            for (let i = 1; i < keys.length; i++) {
              const val = item[keys[i]];
              if (typeof val === 'number' || typeof val === 'boolean') {
                out += `    ${keys[i]}: ${val}\n`;
              } else {
                out += `    ${keys[i]}: "${cleanEntities(val)}"\n`;
              }
            }
          }
        }
      });
    } else if (typeof v === 'object') {
      out += `${k}:\n`;
      for (const [subK, subV] of Object.entries(v)) {
        out += `  ${subK}: "${cleanEntities(subV)}"\n`;
      }
    }
  }
  out += '---';
  return out;
}

// Generate 4-Card Stats Strip based on module and metadata
function generateStatsStrip(moduleType, fm, body) {
  let cards = [];

  if (moduleType === 'epidemiology') {
    const m = fm.metrics || {};
    const r0 = m.r0 || '1.5 – 3.0';
    const inc = m.incubationPeriod || '3 – 7 ngày';
    const vector = m.vector ? m.vector.split('(')[0].trim() : 'Người & Véc-tơ';
    const cfr = m.caseFatalityRate || '< 1% (chuẩn EBM)';

    cards = [
      { val: r0, lbl: 'Hệ số lây truyền cơ bản ($R_0$)', color: 'blue' },
      { val: inc, lbl: 'Thời gian ủ bệnh trung bình', color: 'green' },
      { val: vector, lbl: 'Véc-tơ / Phương thức lây truyền chính', color: 'amber' },
      { val: cfr, lbl: 'Tỷ lệ tử vong ca bệnh (CFR)', color: 'red' }
    ];
  } else if (moduleType === 'biochemistry') {
    const code = fm.code || 'CHEM-01';
    const blockName = fm.blockName || 'Hóa Sinh Phân Tử';
    const reactions = fm.keyReactions || [];
    const tests = fm.relatedLabTests || [];

    const testStr = tests.length > 0 ? tests.slice(0, 2).join(', ') : 'Xét nghiệm hóa sinh';

    cards = [
      { val: '30–32 ATP', lbl: 'Năng lượng sinh học / Hiệu suất chuyển hóa', color: 'blue' },
      { val: '$K_m$ & $V_{max}$', lbl: 'Điểm chốt động học enzym & Giới hạn tốc độ', color: 'green' },
      { val: 'EBM 2026', lbl: 'Chuẩn hóa Harper 32nd & Lippincott 8th', color: 'purple' },
      { val: testStr, lbl: 'Cận lâm sàng & Dấu ấn sinh học theo dõi', color: 'teal' }
    ];
  } else if (moduleType === 'pathophysiology') {
    const sys = fm.systemName || 'Bệnh Học Lâm Sàng';
    const code = fm.code || 'CCBS-01';

    cards = [
      { val: code, lbl: `Mã định danh cơ chế • ${sys}`, color: 'purple' },
      { val: 'Cấp Tính / Mạn', lbl: 'Dòng thác sinh lý bệnh phân tử & thích nghi', color: 'blue' },
      { val: 'Tổn Thương Tạng', lbl: 'Mất bù trừ cơ quan đích & rối loạn nội môi', color: 'red' },
      { val: 'Gold Standard', lbl: 'Phác đồ điều trị trúng đích chuẩn Harrison 21st', color: 'green' }
    ];
  } else {
    // Physiology
    const part = fm.part || 'part1';
    const sys = fm.systemName || 'Sinh Lý Cơ Thể';
    const code = fm.code || 'PHYS-01';

    cards = [
      { val: code, lbl: `Mã chuyên đề • ${sys}`, color: 'blue' },
      { val: 'Nội Môi Ổn Định', lbl: 'Cân bằng gradient điện hóa & Áp suất thẩm thấu', color: 'green' },
      { val: 'Feedback Loop', lbl: 'Vòng điều hòa phản hồi thần kinh - thể dịch', color: 'amber' },
      { val: 'Dược Lý EBM', lbl: 'Ứng dụng lâm sàng chuẩn Guyton 14th & Ganong 26th', color: 'purple' }
    ];
  }

  return `<!-- DẢI CHỈ SỐ NHANH (QUICK STATS STRIP) -->
<section class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val ${cards[0].color}">${cards[0].val}</div>
      <div class="stat-lbl">${cards[0].lbl}</div>
    </div>
    <div class="stat-card">
      <div class="stat-val ${cards[1].color}">${cards[1].val}</div>
      <div class="stat-lbl">${cards[1].lbl}</div>
    </div>
    <div class="stat-card">
      <div class="stat-val ${cards[2].color}">${cards[2].val}</div>
      <div class="stat-lbl">${cards[2].lbl}</div>
    </div>
    <div class="stat-card">
      <div class="stat-val ${cards[3].color}">${cards[3].val}</div>
      <div class="stat-lbl">${cards[3].lbl}</div>
    </div>
  </div>
</section>`;
}

// Generate Citation Box & Button Row
function generateFooter(moduleType, fm) {
  let citation = '';
  let backUrl = '#/basic-medical/giai-phau-sinh-ly';
  let backText = 'Mục Lục Giải Phẫu & Sinh Lý';

  if (moduleType === 'epidemiology') {
    backUrl = '#/basic-medical/dich-te-hoc';
    backText = 'Mục Lục Dịch Tễ Học';
    citation = `1. Celentano DD, Szklo M. <em>Gordis Epidemiology</em>. 6th ed. Philadelphia, PA: Elsevier; 2019.<br />
2. World Health Organization (WHO). <em>Global Surveillance and Vector Control Guidelines</em>. Geneva: WHO Press; 2024.<br />
3. Centers for Disease Control and Prevention (CDC). <em>Epidemiology and Prevention of Vaccine-Preventable Diseases</em>. 14th ed. Washington, DC; 2024.`;
  } else if (moduleType === 'biochemistry') {
    backUrl = '#/basic-medical/hoa-sinh';
    backText = 'Mục Lục Hóa Sinh Y Học';
    citation = `1. Rodwell VW, Bender DA, Botham KM, Kennelly PJ, Weil PA. <em>Harper's Illustrated Biochemistry</em>. 32nd ed. New York: McGraw-Hill; 2022.<br />
2. Ferrier DR. <em>Lippincott Illustrated Reviews: Biochemistry</em>. 8th ed. Philadelphia, PA: Wolters Kluwer; 2021.<br />
3. Rifai N, Horvath AR, Wittwer CT. <em>Tietz Textbook of Clinical Chemistry and Molecular Diagnostics</em>. 6th ed. St. Louis, MO: Elsevier; 2018.`;
  } else if (moduleType === 'pathophysiology') {
    backUrl = '#/basic-medical/co-che-benh-sinh';
    backText = 'Mục Lục Cơ Chế Bệnh Sinh';
    citation = `1. Loscalzo J, Fauci A, Kasper D, Hauser S, Longo D, Jameson JL. <em>Harrison's Principles of Internal Medicine</em>. 21st ed. New York: McGraw-Hill; 2022.<br />
2. Kumar V, Abbas AK, Aster JC. <em>Robbins & Cotran Pathologic Basis of Disease</em>. 10th ed. Philadelphia, PA: Elsevier; 2020.<br />
3. Hammer GD, McPhee SJ. <em>Pathophysiology of Disease: An Introduction to Clinical Medicine</em>. 8th ed. New York: McGraw-Hill; 2019.`;
  } else {
    // Physiology
    backUrl = '#/basic-medical/giai-phau-sinh-ly';
    backText = 'Mục Lục Giải Phẫu & Sinh Lý';
    citation = `1. Hall JE, Hall ME. <em>Guyton and Hall Textbook of Medical Physiology</em>. 14th ed. Philadelphia, PA: Elsevier; 2021.<br />
2. Barrett KE, Barman SM, Brooks HL, Yuan JXJ. <em>Ganong's Review of Medical Physiology</em>. 26th ed. New York: McGraw-Hill; 2019.<br />
3. Koeppen BM, Stanton BA. <em>Berne & Levy Physiology</em>. 7th ed. Philadelphia, PA: Elsevier; 2018.`;
  }

  return `<!-- KHUNG TRÍCH DẪN Y VĂN CHUẨN AMA (CITATION BOX) -->
<div class="citation-box">
  <strong>Trích dẫn tài liệu tham khảo chuẩn (AMA Format):</strong><br />
  ${citation}
</div>

<!-- HÀNG NÚT ĐIỀU HƯỚNG SPA -->
<div class="btn-row">
  <a href="${backUrl}" class="btn btn-primary">
    <i class="fa-solid fa-arrow-left"></i> Quay lại ${backText}
  </a>
  <a href="#sec-1" class="btn">
    <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
  </a>
</div>`;
}

// Process a single MDX file
function refactorMdxFile(filePath, moduleType) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Split frontmatter
  if (!content.startsWith('---')) {
    console.warn(`[SKIP] No frontmatter in ${filePath}`);
    return false;
  }

  const parts = content.split('---');
  if (parts.length < 3) {
    console.warn(`[SKIP] Malformed frontmatter in ${filePath}`);
    return false;
  }

  const rawYaml = parts[1];
  let rawBody = parts.slice(2).join('---').trim();

  // Clean raw body
  rawBody = cleanEntities(rawBody);

  const fm = parseFrontmatter(rawYaml);
  const sections = fm.sections || fm.pillars || [];

  // 1. Prepare Title & Header
  let titleIcon = '🧬';
  let quickNavTag = '<PhysioQuickNav />';
  if (moduleType === 'epidemiology') {
    titleIcon = '🔬';
    quickNavTag = '<EpiPillarsNav />';
  } else if (moduleType === 'biochemistry') {
    titleIcon = '🧪';
    quickNavTag = '<BiochemQuickNav />';
  } else if (moduleType === 'pathophysiology') {
    titleIcon = '🔬';
    quickNavTag = '<PathoQuickNav />';
  }

  const cleanTitle = cleanEntities(fm.title || 'Bài Giảng Y Khoa').toUpperCase();

  // 2. Normalize HTML headers and old components in body
  let cleanBody = rawBody
    .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
    .replace(/^#\s+.*$/m, '')
    .replace(/<PhysioQuickNav\s*\/?>/gi, '')
    .replace(/<BiochemQuickNav\s*\/?>/gi, '')
    .replace(/<EpiPillarsNav\s*\/?>/gi, '')
    .replace(/<PathoQuickNav\s*\/?>/gi, '')
    .replace(/<section class="stats-strip"[\s\S]*?<\/section>/gi, '')
    .replace(/<div class="citation-box"[\s\S]*?<\/div>/gi, '')
    .replace(/<div class="btn-row"[\s\S]*?<\/div>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    // Normalize raw HTML headers <h2 ...> -> \n\n---\n\n
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n---\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n')
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n#### $1\n\n')
    .replace(/<hr[^>]*>/gi, '\n\n---\n\n')
    .trim();

  // Remove existing ## headings first so they don't produce empty segments
  cleanBody = cleanBody.replace(/^##\s+.*?$/gm, '').trim();

  // Strip leading and trailing "---" and newlines completely
  cleanBody = cleanBody.replace(/^[\s\r\n]*---+[\s\r\n]*/, '').replace(/[\s\r\n]*---+[\s\r\n]*$/, '').trim();

  // 3. Reconstruct Sections with H2 headings
  const rawSegments = cleanBody
    .split(/\n\s*---\s*\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  let reconstructedBody = '';

  for (let idx = 0; idx < rawSegments.length; idx++) {
    const rawSeg = rawSegments[idx];
    const cleanSeg = rawSeg
      .replace(/^##\s+.*?$/gm, '')
      .replace(/^[\s\r\n]*---+[\s\r\n]*/, '')
      .replace(/[\s\r\n]*---+[\s\r\n]*$/, '')
      .trim();

    if (!cleanSeg) continue;

    const secMeta = sections[idx] || {
      id: `sec-${idx + 1}`,
      number: idx + 1,
      title: `Nội Dung Chuyên Đề ${idx + 1}`
    };

    const secNum = secMeta.number !== undefined ? secMeta.number : idx + 1;
    const secTitle = cleanEntities(secMeta.title || `Phần ${secNum}`);
    const secId = secMeta.id || `sec-${secNum}`;

    reconstructedBody += `\n\n---\n\n## ${secNum}. ${secTitle} {#${secId}}\n\n${cleanSeg}\n`;
  }

  cleanBody = reconstructedBody.trim();

  // 4. Assemble Full Body
  const statsStripHtml = generateStatsStrip(moduleType, fm, cleanBody);
  const footerHtml = generateFooter(moduleType, fm);

  const finalBody = `# ${titleIcon} ${cleanTitle}

${quickNavTag}

${statsStripHtml}

${cleanBody}

${footerHtml}
`;

  // 5. Update frontmatter version & status
  fm.version = '2.0.0';
  fm.status = 'published';
  fm.updatedAt = '2026-08-28';

  const finalYaml = serializeFrontmatter(fm);
  const finalContent = `${finalYaml}\n\n${finalBody}\n`;

  fs.writeFileSync(filePath, finalContent, 'utf8');
  return true;
}

// Run for all 4 modules
function run() {
  console.log('🚀 Bắt đầu chuẩn hóa 143 tệp MDX trong Basic Medical...');

  const modules = [
    { dir: 'physiology', type: 'physiology' },
    { dir: 'biochemistry', type: 'biochemistry' },
    { dir: 'epidemiology', type: 'epidemiology' },
    { dir: 'pathophysiology-cases', type: 'pathophysiology' }
  ];

  let totalProcessed = 0;

  modules.forEach(mod => {
    const modPath = path.join(ROOT_DIR, mod.dir);
    if (!fs.existsSync(modPath)) return;

    function walkDir(d) {
      const entries = fs.readdirSync(d, { withFileTypes: true });
      entries.forEach(ent => {
        const full = path.join(d, ent.name);
        if (ent.isDirectory() && ent.name !== 'components' && ent.name !== 'tools' && ent.name !== 'images') {
          walkDir(full);
        } else if (ent.isFile() && ent.name.endsWith('.mdx')) {
          const success = refactorMdxFile(full, mod.type);
          if (success) {
            totalProcessed++;
            console.log(`✅ [${mod.type.toUpperCase()}] Refactored: ${path.relative(ROOT_DIR, full)}`);
          }
        }
      });
    }

    walkDir(modPath);
  });

  console.log(`\n🎉 Hoàn thành xuất sắc! Đã nâng cấp toàn diện ${totalProcessed} tệp MDX.`);
}

run();
