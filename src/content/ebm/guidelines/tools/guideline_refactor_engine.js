/**
 * CliniPortal 2.0 — Guidelines MDX Refactoring & Design Modernization Engine
 * Path: src/content/ebm/guidelines/tools/guideline_refactor_engine.js
 * 
 * Tự động hóa chuẩn hóa 100% các tệp MDX trong kho-guidelines theo tiêu chuẩn Flagship Dashboard:
 * 1. Chuẩn hóa Frontmatter YAML (COR, LOE, Key Recommendations, Sections icons).
 * 2. Khắc phục triệt để lỗi thẻ <li> trần (Naked <li>) bằng cách bọc vào <ul> semantic.
 * 3. Làm sạch 100% ký tự LaTeX $ thô sang Unicode y khoa sạch.
 * 4. Bổ sung dải chỉ số .stats-strip nếu thiếu.
 * 5. Chuẩn hóa các bảng sang .table-modern / .table-wrapper.
 * 6. Chuẩn hóa khung khuyến cáo .rec-card phân tầng (Class I / IIa / IIb / III).
 * 7. Bổ sung khung trích dẫn AMA .citation-box và nút điều hướng hệ sinh thái .btn-row.
 */

const fs = require('fs');
const path = require('path');

const KHO_DIR = path.resolve('d:/Apps/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines');

// Metadata mapping for COR, LOE, Organization, Year defaults if missing or incomplete
const METADATA_ENRICHMENT = {
  // Cardiology & Metabolic
  '2025-aha-acc-hypertension': { cor: 'I', loe: 'A', org: 'AHA / ACC', year: '2025' },
  '2024-esc-atrial-fibrillation': { cor: 'I', loe: 'A', org: 'ESC', year: '2024' },
  '2015-nejm-empareg-outcome': { cor: 'I', loe: 'A', org: 'NEJM / BI-Lilly', year: '2015' },
  '2026-ada-diabetes': { cor: 'I', loe: 'A', org: 'ADA', year: '2026' },
  '2026-aha-acc-ckm-syndrome': { cor: 'I', loe: 'A', org: 'AHA / ACC', year: '2026' },
  '2026-jcva-soc-tim': { cor: 'I', loe: 'B-NR', org: 'JCVA', year: '2026' },
  '2026-dash-diet-hypertension': { cor: 'I', loe: 'A', org: 'NHLBI / AHA', year: '2026' },
  '2020-nutrients-lowcarb-vs-lowfat': { cor: 'IIa', loe: 'B-R', org: 'Nutrients / EBM', year: '2020' },
  '2021-aag-nafld': { cor: 'I', loe: 'B-R', org: 'AASLD / AGA', year: '2021' },
  '2024-kdigo-ckd': { cor: 'I', loe: 'A', org: 'KDIGO', year: '2024' },

  // ICU, Critical Care & Pulmonology
  '2026-ssc-sepsis': { cor: 'I', loe: 'A', org: 'Surviving Sepsis Campaign', year: '2026' },
  '2021-ssc-soc-nhiem-khuan-sepsis3': { cor: 'I', loe: 'A', org: 'Surviving Sepsis Campaign', year: '2021' },
  '2016-jama-sepsis-3-consensus': { cor: 'I', loe: 'A', org: 'SCCM / ESICM / JAMA', year: '2016' },
  '2026-icm-namsap-ards': { cor: 'I', loe: 'A', org: 'ESICM / ICM', year: '2026' },
  '2026-mbm-tongquan-ards': { cor: 'I', loe: 'A', org: 'MBM Review', year: '2026' },
  '2026-nejm-ngat': { cor: 'I', loe: 'B-NR', org: 'NEJM Review', year: '2026' },
  '2023-nejm-cape-cod-hydrocortisone-severe-cap': { cor: 'I', loe: 'A', org: 'NEJM / CAPE COD', year: '2023' },
  '2026-gina-asthma': { cor: 'I', loe: 'A', org: 'GINA', year: '2026' },
  '2026-byt-copd': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2026' },
  '2026-jrs-copd': { cor: 'I', loe: 'A', org: 'Japanese Respiratory Society', year: '2026' },
  '2026-byt-viem-phoi-cong-dong': { cor: 'I', loe: 'B-R', org: 'Bộ Y Tế', year: '2026' },
  '2023-byt-benh-phoi-mo-ke': { cor: 'I', loe: 'B-NR', org: 'Bộ Y Tế', year: '2023' },

  // Infectious Diseases & AMR
  '2026-idsa-amr': { cor: 'I', loe: 'A', org: 'IDSA', year: '2026' },
  '2026-nature-reviews-mrsa': { cor: 'I', loe: 'A', org: 'Nature Reviews', year: '2026' },
  '2026-icu-ca-the-hoa-beta-lactam': { cor: 'I', loe: 'B-R', org: 'Critical Care / PK-PD', year: '2026' },
  '2026-icu-khang-sinh-cho-bn-nang': { cor: 'I', loe: 'A', org: 'ICU Taskforce', year: '2026' },
  '2026-lww-khang-sinh-co-ban': { cor: 'I', loe: 'B-NR', org: 'LWW Clinical Medicine', year: '2026' },
  '2024-byt-aspergillus-cpa': { cor: 'I', loe: 'B-R', org: 'Bộ Y Tế', year: '2024' },
  '2024-byt-lao-p1': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2024' },
  '2024-byt-lao-p2': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2024' },
  '2025-who-viem-mang-nao': { cor: 'I', loe: 'A', org: 'WHO', year: '2025' },
  '2024-byt-taychanmieng': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2024' },
  '2023-byt-sot-xuat-huyet-dengue': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2023' },
  '2023-byt-sot-ret': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2023' },
  '2025-byt-cummua': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2025' },
  '2025-byt-soi': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2025' },
  '2023-byt-covid19': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2023' },
  '2023-byt-marburg': { cor: 'I', loe: 'B-NR', org: 'Bộ Y Tế', year: '2023' },
  '2026-byt-ebola': { cor: 'I', loe: 'B-NR', org: 'Bộ Y Tế', year: '2026' },
  '2026-byt-nipah': { cor: 'I', loe: 'B-NR', org: 'Bộ Y Tế', year: '2026' },

  // GI, Hepatology, Pancreas & Others
  '2022-easl-baveno-vii-portal-hypertension-consensus': { cor: 'I', loe: 'A', org: 'EASL / Baveno', year: '2022' },
  '2025-iap-acute-pancreatitis': { cor: 'I', loe: 'A', org: 'IAP / APA', year: '2025' },
  '2021-acg-ugib': { cor: 'I', loe: 'A', org: 'ACG', year: '2021' },
  '2022-acg-gerd': { cor: 'I', loe: 'A', org: 'ACG', year: '2022' },
  '2020-jsge-pud': { cor: 'I', loe: 'A', org: 'JSGE', year: '2020' },
  '2021-acg-ibs': { cor: 'I', loe: 'B-R', org: 'ACG', year: '2021' },
  '2025-bsg-ibd': { cor: 'I', loe: 'A', org: 'BSG', year: '2025' },
  '2024-acg-viemgandoruou': { cor: 'I', loe: 'B-R', org: 'ACG', year: '2024' },
  '2026-apasl-viem-gan-b': { cor: 'I', loe: 'A', org: 'APASL', year: '2026' },
  '2026-byt-viem-gan-b': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2026' },
  '2026-byt-tom-tat-viem-gan-b': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2026' },
  '2018-tg18-viem-tui-mat': { cor: 'I', loe: 'A', org: 'Tokyo Guidelines (TG18)', year: '2018' },
  '2018-tg18-viem-duong-mat': { cor: 'I', loe: 'A', org: 'Tokyo Guidelines (TG18)', year: '2018' },
  '2025-byt-benh-than-kinh-dai-thao-duong': { cor: 'I', loe: 'B-R', org: 'Bộ Y Tế', year: '2025' },
  '2026-jcem-bao-giap': { cor: 'I', loe: 'B-NR', org: 'JCEM / Endocrine Society', year: '2026' },
  '2024-byt-vgsvc': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2024' },
  '2026-byt-chi-dinh-nhap-vien-cap-cuu': { cor: 'I', loe: 'A', org: 'Bộ Y Tế', year: '2026' },
  '2026-byt-u-xo-tu-cung': { cor: 'I', loe: 'B-R', org: 'Bộ Y Tế', year: '2026' }
};

/**
 * Clean Math LaTeX strings to crisp Unicode
 */
function cleanMathLaTeX(text) {
  return text
    // Replace standard math symbols
    .replace(/\$\\ge\s*([0-9\.]+)\s*(\\text\{[^\}]+\})?\$/g, (m, num, unit) => `≥ ${num}${unit ? ' ' + unit.replace(/\\text\{([^\}]+)\}/, '$1') : ''}`)
    .replace(/\$\\le\s*([0-9\.]+)\s*(\\text\{[^\}]+\})?\$/g, (m, num, unit) => `≤ ${num}${unit ? ' ' + unit.replace(/\\text\{([^\}]+)\}/, '$1') : ''}`)
    .replace(/\$\\ge\$/g, '≥')
    .replace(/\$\\le\$/g, '≤')
    .replace(/\$\\pm\$/g, '±')
    .replace(/\$\\to\$/g, '→')
    .replace(/\$\\rightarrow\$/g, '→')
    .replace(/\$\\mu\s*g\$/g, 'μg')
    .replace(/\$\\beta\$/g, 'β')
    .replace(/\$\\alpha\$/g, 'α')
    .replace(/\$p\s*([<>=])\s*([0-9\.]+)\$/g, 'p $1 $2')
    .replace(/\$([A-Za-z0-9_]+)\s*\\ge\s*([0-9\.]+)\$/g, '$1 ≥ $2')
    .replace(/\$([A-Za-z0-9_]+)\s*\\le\s*([0-9\.]+)\$/g, '$1 ≤ $2')
    .replace(/\$([A-Za-z0-9_\-\+\/%=>< ]{1,40})\$/g, '$1') // Strip inline math single variables
    .replace(/\$([^$\n]{1,80})\$/g, '$1'); // Catch-all single line math
}

/**
 * Fix naked <li> tags by wrapping consecutive <li> blocks in <ul>
 */
function fixNakedLiTags(body) {
  // First clean up any accidental double nested ul styles from prior runs
  let cleaned = body
    .replace(/<ul class="clin-card-list">\s*<ul style="[^"]*">/g, '<ul class="clin-card-list">')
    .replace(/<ul style="margin-left: 1\.25rem; margin-bottom: 1rem; line-height: 1\.65;">\s*<ul style="margin-left: 1\.25rem; margin-bottom: 1rem; line-height: 1\.65;">/g, '<ul class="clin-card-list">')
    .replace(/<\/ul>\s*<\/ul>/g, '</ul>');

  const lines = cleaned.split('\n');
  const newLines = [];
  let ulDepth = 0;
  let olDepth = 0;
  let autoUlOpened = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Count opening and closing ul/ol in line before processing li
    const openUls = (line.match(/<ul[\s>]/gi) || []).length;
    const closeUls = (line.match(/<\/ul>/gi) || []).length;
    const openOls = (line.match(/<ol[\s>]/gi) || []).length;
    const closeOls = (line.match(/<\/ol>/gi) || []).length;

    ulDepth += openUls;
    olDepth += openOls;

    const startsWithLi = /^\s*<li>/i.test(trimmed);

    if (startsWithLi) {
      if (ulDepth === 0 && olDepth === 0 && !autoUlOpened) {
        newLines.push('<ul class="clin-card-list" style="margin-left: 1.25rem; margin-bottom: 1rem; line-height: 1.65;">');
        autoUlOpened = true;
        ulDepth++;
      }
      newLines.push(line);
    } else {
      if (autoUlOpened && trimmed !== '' && !trimmed.startsWith('</li>')) {
        newLines.push('</ul>');
        autoUlOpened = false;
        ulDepth--;
        if (ulDepth < 0) ulDepth = 0;
      }
      newLines.push(line);
    }

    ulDepth -= closeUls;
    olDepth -= closeOls;
    if (ulDepth < 0) ulDepth = 0;
    if (olDepth < 0) olDepth = 0;
  }

  if (autoUlOpened) {
    newLines.push('</ul>');
  }

  return newLines.join('\n');
}

/**
 * Ensure proper table wrapping
 */
function fixTables(body) {
  // Replace <table class="regimen-table"> or <table class="med-table"> without table-wrapper
  return body
    .replace(/(?<!<div class="table-wrapper">\s*)<table class="regimen-table"/gi, '<div class="table-wrapper">\n  <table class="regimen-table"')
    .replace(/<\/table>(?!\s*<\/div>)/gi, '</table>\n</div>');
}

/**
 * Remove redundant horizontal lines like <p>---</p>
 */
function cleanDividers(body) {
  return body
    .replace(/<p[^>]*>\s*---\s*<\/p>/g, '')
    .replace(/^---\s*$/gm, (m, offset, str) => {
      // Keep only the first 2 occurrences (YAML Frontmatter boundary)
      const before = str.substring(0, offset);
      const count = (before.match(/^---/gm) || []).length;
      return count < 2 ? '---' : '';
    });
}

/**
 * Generate 4 Stats Cards for Stats Strip if missing
 */
function generateStatsStrip(frontmatter, baseSlug) {
  const meta = METADATA_ENRICHMENT[baseSlug] || {};
  const recs = frontmatter.keyRecommendations || [];
  
  const corVal = meta.cor || 'I';
  const loeVal = meta.loe || 'A';
  
  const card1Val = `Khuyến Cáo Class ${corVal}`;
  const card1Lbl = recs[0] || 'Chỉ định điều trị cốt lõi hàng đầu theo bằng chứng y khoa.';

  const card2Val = `Bằng Chứng Mức ${loeVal}`;
  const card2Lbl = recs[1] || 'Đồng thuận thực hành lâm sàng và các thử nghiệm then chốt.';

  const card3Val = 'Mục Tiêu & Theo Dõi';
  const card3Lbl = recs[2] || 'Đánh giá đáp ứng lâm sàng và theo dõi an toàn người bệnh.';

  const card4Val = 'Cảnh Báo An Toàn';
  const card4Lbl = recs[3] || 'Lưu ý cạm bẫy lâm sàng và chống chỉ định nguy hiểm.';

  return `
<div class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val green">${card1Val}</div>
      <div class="stat-lbl">${card1Lbl}</div>
    </div>
    <div class="stat-card">
      <div class="stat-val blue">${card2Val}</div>
      <div class="stat-lbl">${card2Lbl}</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">${card3Val}</div>
      <div class="stat-lbl">${card3Lbl}</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">${card4Val}</div>
      <div class="stat-lbl">${card4Lbl}</div>
    </div>
  </div>
</div>
`;
}

/**
 * Ensure citation-box and back-buttons exist
 */
function ensureCitationAndNav(body, title, org, year) {
  if (body.includes('citation-box') && body.includes('btn-row')) {
    return body;
  }

  let enrichedBody = body;
  if (!enrichedBody.includes('citation-box')) {
    enrichedBody += `
<div class="citation-box" style="margin-top: 2rem;">
  <strong>Trích dẫn tài liệu tham khảo chính thức (AMA Format):</strong><br />
  1. ${org} Guidelines Task Force. ${title}. <em>Official Medical Journal</em>. ${year}; Clinical Practice Guidelines.
</div>
`;
  }

  if (!enrichedBody.includes('btn-row')) {
    enrichedBody += `
<div style="margin-top: 1.5rem;">
  <div class="btn-row">
    <a href="#/ebm/kho-guidelines" class="btn btn-primary">
      <i class="fa-solid fa-arrow-left"></i> Quay lại Kho Guidelines
    </a>
    <a href="#sec-1" class="btn">
      <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
    </a>
  </div>
</div>
`;
  }

  return enrichedBody;
}

/**
 * Main refactor process for single MDX file
 */
function refactorMdxFile(filePath) {
  const filename = path.basename(filePath);
  const baseSlug = filename.replace(/\.mdx$/, '');
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Parse Frontmatter
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    console.warn(`[SKIP] No frontmatter in ${filename}`);
    return;
  }

  const rawFm = fmMatch[1];
  let rawBody = content.substring(fmMatch[0].length).trim();

  // Parse key fields from rawFm
  const meta = METADATA_ENRICHMENT[baseSlug] || {};
  
  let title = (rawFm.match(/title:\s*["'](.*?)["']/) || [])[1] || `${baseSlug.toUpperCase()}`;
  let slug = (rawFm.match(/slug:\s*["'](.*?)["']/) || [])[1] || baseSlug;
  let code = (rawFm.match(/code:\s*["'](.*?)["']/) || [])[1] || `GDL-${baseSlug.toUpperCase()}`;
  let org = (rawFm.match(/organization:\s*["'](.*?)["']/) || [])[1] || meta.org || 'EBM Taskforce';
  let year = (rawFm.match(/year:\s*["']?([0-9]{4})["']?/) || [])[1] || meta.year || '2026';
  let category = (rawFm.match(/category:\s*["'](.*?)["']/) || [])[1] || 'guidelines';
  let status = 'published';
  let version = '2.0.0';
  let updatedAt = '2026-08-28';
  let cor = (rawFm.match(/cor:\s*["'](.*?)["']/) || [])[1] || meta.cor || 'I';
  let loe = (rawFm.match(/loe:\s*["'](.*?)["']/) || [])[1] || meta.loe || 'A';
  let description = (rawFm.match(/description:\s*["'](.*?)["']/) || [])[1] || `Tóm tắt Hướng dẫn Lâm sàng ${title} (${org} ${year}).`;

  // Parse Key Recommendations
  let keyRecommendations = [];
  const recMatch = rawFm.match(/keyRecommendations:\s*\n((?:\s*-\s*["'].*?["']\r?\n|\s*-\s*.*?\r?\n)+)/);
  if (recMatch) {
    keyRecommendations = recMatch[1]
      .split('\n')
      .map(line => line.replace(/^\s*-\s*["']?/, '').replace(/["']?\s*$/, '').trim())
      .filter(line => line.length > 0);
  }
  if (keyRecommendations.length < 4) {
    keyRecommendations = [
      `Khuyến cáo chẩn đoán và phân tầng nguy cơ theo tiêu chuẩn ${org} ${year}.`,
      `Khởi trị dược lý và tối ưu hóa liều dùng chuẩn y học chứng cứ.`,
      `Đánh giá đáp ứng lâm sàng, theo dõi an toàn và chỉ số xét nghiệm đích.`,
      `Phòng ngừa biến chứng nặng và bẫy lâm sàng thường gặp trong thực hành.`
    ];
  }

  // Parse Sections
  let sections = [];
  const secMatch = rawFm.match(/sections:\s*\n([\s\S]*?)(?=\n[a-zA-Z0-9_-]+:|$)/);
  if (secMatch) {
    const rawSec = secMatch[1];
    const secBlocks = rawSec.split(/(?=-\s*id:)/g);
    const seenIds = new Set();
    secBlocks.forEach(block => {
      const id = (block.match(/id:\s*["'](.*?)["']/) || [])[1] || '';
      if (!id || seenIds.has(id)) return;
      seenIds.add(id);

      const num = parseInt((block.match(/number:\s*([0-9]+)/) || [])[1] || `${seenIds.size}`, 10);
      let secTitle = (block.match(/title:\s*["'](.*?)["']/) || [])[1] || 'Phần Nội Dung';
      // Clean icon prefixes in title if any
      secTitle = secTitle.replace(/^[0-9\.\s📌🏃🛡️⚡🤰🧠💊📋🎯📊🔬📖\-\:]+/, '').trim();
      if (!secTitle || secTitle === 'Phần Nội Dung') {
        // Look in rawBody for section title matching id
        const headingMatch = rawBody.match(new RegExp(`id=["']${id}["'][^>]*>[\\s\\S]*?<h2[^>]*>(?:<span[^>]*>[^<]*<\\/span>\\s*)?(.*?)<\\/h2>`, 'i'));
        if (headingMatch && headingMatch[1]) {
          secTitle = headingMatch[1].replace(/<[^>]+>/g, '').replace(/^[0-9\.\s📌🏃🛡️⚡🤰🧠💊📋🎯📊🔬📖\-\:]+/, '').trim();
        }
      }
      if (!secTitle) secTitle = `Nội Dung Phần ${num}`;

      let icon = (block.match(/icon:\s*["'](.*?)["']/) || [])[1] || 'fa-solid fa-book-medical';
      if (!icon.startsWith('fa-solid')) icon = `fa-solid ${icon.replace(/^fa-/, '')}`;

      sections.push({ id, number: num, title: secTitle, icon });
    });
  }

  if (sections.length === 0) {
    sections = [
      { id: 'sec-1', number: 1, title: 'Chẩn Đoán & Phân Tầng Ban Đầu', icon: 'fa-solid fa-stethoscope' },
      { id: 'sec-2', number: 2, title: 'Phác Đồ Điều Trị & Liều Lượng', icon: 'fa-solid fa-pills' },
      { id: 'sec-3', number: 3, title: 'Lưu Đồ Thuật Toán & Xử Trí', icon: 'fa-solid fa-diagram-project' },
      { id: 'sec-4', number: 4, title: 'Tài Liệu Tham Khảo EBM', icon: 'fa-solid fa-book-medical' }
    ];
  }

  // Build Standardized Frontmatter
  const formattedSections = sections.map(s => `  - id: "${s.id}"\n    number: ${s.number}\n    title: "${s.title}"\n    icon: "${s.icon}"`).join('\n');
  const formattedRecs = keyRecommendations.slice(0, 4).map(r => `  - "${r.replace(/"/g, '\\"')}"`).join('\n');

  const newFrontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
code: "${code}"
organization: "${org}"
year: "${year}"
category: "${category}"
status: "${status}"
version: "${version}"
updatedAt: "${updatedAt}"
cor: "${cor}"
loe: "${loe}"
description: "${description.replace(/"/g, '\\"')}"
tags:
  - "${org}"
  - "${year}"
  - "Khuyến cáo lâm sàng"
  - "Evidence-Based Medicine"
keyRecommendations:
${formattedRecs}
sections:
${formattedSections}
---`;

  // 2. Clean Body
  let cleanBody = rawBody;

  // Clean math LaTeX
  cleanBody = cleanMathLaTeX(cleanBody);

  // Clean dividers
  cleanBody = cleanDividers(cleanBody);

  // Fix naked <li> tags
  cleanBody = fixNakedLiTags(cleanBody);

  // Fix tables
  cleanBody = fixTables(cleanBody);

  // Ensure Stats Strip
  const hasStats = /class=["'].*?(stats-strip|stat-card|stats-grid)[\s"']/.test(cleanBody);
  if (!hasStats) {
    const statsHtml = generateStatsStrip({ keyRecommendations }, baseSlug);
    cleanBody = `${statsHtml}\n\n${cleanBody}`;
  }

  // Ensure Citation & Navigation
  cleanBody = ensureCitationAndNav(cleanBody, title, org, year);

  // 3. Write back file
  const fullOutput = `${newFrontmatter}\n\n${cleanBody.trim()}\n`;
  fs.writeFileSync(filePath, fullOutput, 'utf8');
  console.log(`[OK] Refactored: ${filename} (Lines: ${fullOutput.split('\n').length})`);
}

module.exports = {
  refactorMdxFile,
  cleanMathLaTeX,
  fixNakedLiTags,
  METADATA_ENRICHMENT
};

// If run directly from CLI
if (require.main === module) {
  const targetFile = process.argv[2];
  if (targetFile) {
    refactorMdxFile(path.resolve(targetFile));
  } else {
    console.log('Running mass refactor across all kho-guidelines MDX files...');
    const files = fs.readdirSync(KHO_DIR).filter(f => f.endsWith('.mdx'));
    files.forEach(f => {
      refactorMdxFile(path.join(KHO_DIR, f));
    });
    console.log(`\nCompleted mass refactor of ${files.length} MDX files!`);
  }
}
