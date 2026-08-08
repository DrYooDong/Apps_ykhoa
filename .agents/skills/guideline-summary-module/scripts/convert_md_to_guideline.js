/**
 * convert_md_to_guideline.js
 * 
 * Script Node.js tự động chuyển đổi file Markdown (.md) tóm tắt Guideline / RCT y khoa
 * thành trang HTML tóm tắt độc lập (cấp 4) tại src/content/ebm/guidelines/kho-guidelines/<slug>.html
 * và tự động đăng ký bản ghi dữ liệu vào src/content/ebm/guidelines/guidelinesdata.js.
 * 
 * Cách sử dụng:
 *   node .agents/skills/guideline-summary-module/scripts/convert_md_to_guideline.js <path_to_md_file>
 * Ví dụ:
 *   node .agents/skills/guideline-summary-module/scripts/convert_md_to_guideline.js src/content/ebm/guidelines/kho-guidelines/phac-do-soc-nhiem-khuan-sepsis3.md
 */

const fs = require('fs');
const path = require('path');

// Đường dẫn tương đối từ workspace root
const WORKSPACE_ROOT = path.resolve(__dirname, '../../../../');
const KHO_GUIDELINES_DIR = path.join(WORKSPACE_ROOT, 'src/content/ebm/guidelines/kho-guidelines');
const DATA_FILE_PATH = path.join(WORKSPACE_ROOT, 'src/content/ebm/guidelines/guidelinesdata.js');

// Helper đọc và parse YAML Frontmatter thủ công đơn giản
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const match = content.match(frontmatterRegex);
  
  const metadata = {};
  let body = content;

  if (match) {
    body = content.replace(frontmatterRegex, '');
    const lines = match[1].split(/\r?\n/);
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        metadata[key] = value;
      }
    }
  }

  return { metadata, body };
}

// Convert Markdown formatting (bold, italic, code, math) sang HTML
function formatInlineText(text) {
  if (!text) return '';
  return text
    .replace(/\$\s*\\ge\s*(\d+(\.\d+)?)\s*\$/g, '≥ $1')
    .replace(/\$\s*\\le\s*(\d+(\.\d+)?)\s*\$/g, '≤ $1')
    .replace(/\$\s*([^$]+)\s*\$/g, '<code>$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>');
}

// Convert Callout Boxes (> [!IMPORTANT], > [!TIP], > [!WARNING], > [!CAUTION], > [!NOTE])
function processCallouts(markdown) {
  const lines = markdown.split(/\r?\n/);
  const resultLines = [];
  let inCallout = false;
  let calloutType = 'info';
  let calloutLines = [];

  const getCalloutMeta = (typeStr) => {
    const t = (typeStr || '').toUpperCase();
    if (t === 'IMPORTANT' || t === 'SUCCESS') return { class: 'success', icon: '✅' };
    if (t === 'WARNING') return { class: 'warning', icon: '⚠️' };
    if (t === 'DANGER' || t === 'CAUTION') return { class: 'danger', icon: '🚫' };
    return { class: 'info', icon: '💡' };
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const calloutMatch = line.match(/^>\s*\[\!(IMPORTANT|TIP|WARNING|CAUTION|DANGER|NOTE|INFO)\]\s*(.*)/i);
    
    if (calloutMatch) {
      if (inCallout) {
        const meta = getCalloutMeta(calloutType);
        resultLines.push(renderInfobox(meta, calloutLines));
        calloutLines = [];
      }
      inCallout = true;
      calloutType = calloutMatch[1];
      if (calloutMatch[2].trim()) {
        calloutLines.push(calloutMatch[2].trim());
      }
    } else if (inCallout && line.startsWith('>')) {
      calloutLines.push(line.replace(/^>\s?/, ''));
    } else {
      if (inCallout) {
        const meta = getCalloutMeta(calloutType);
        resultLines.push(renderInfobox(meta, calloutLines));
        calloutLines = [];
        inCallout = false;
      }
      resultLines.push(line);
    }
  }

  if (inCallout) {
    const meta = getCalloutMeta(calloutType);
    resultLines.push(renderInfobox(meta, calloutLines));
  }

  return resultLines.join('\n');
}

function renderInfobox(meta, lines) {
  let contentHtml = lines.map(l => formatInlineText(l)).join('<br>');
  return `<div class="infobox ${meta.class}">
  <span class="infobox-icon">${meta.icon}</span>
  <div>
    ${contentHtml}
  </div>
</div>`;
}

// Render Table Markdown sang HTML
function processTables(markdown) {
  const lines = markdown.split(/\r?\n/);
  const resultLines = [];
  let tableLines = [];
  let inTable = false;

  for (const line of lines) {
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      inTable = true;
      tableLines.push(line.trim());
    } else {
      if (inTable) {
        resultLines.push(renderTableHtml(tableLines));
        tableLines = [];
        inTable = false;
      }
      resultLines.push(line);
    }
  }
  if (inTable) {
    resultLines.push(renderTableHtml(tableLines));
  }

  return resultLines.join('\n');
}

function renderTableHtml(tableLines) {
  if (tableLines.length < 2) return tableLines.join('\n');

  const headers = tableLines[0].split('|').slice(1, -1).map(h => h.trim());
  const rows = tableLines.slice(2).map(rowStr => rowStr.split('|').slice(1, -1).map(c => c.trim()));

  let ths = headers.map(h => `<th>${formatInlineText(h)}</th>`).join('\n                ');
  let trs = rows.map(row => {
    let tds = row.map(cell => `<td>${formatInlineText(cell)}</td>`).join('');
    return `<tr>${tds}</tr>`;
  }).join('\n              ');

  return `<div class="table-wrapper">
  <table class="regimen-table">
    <thead>
      <tr>
        ${ths}
      </tr>
    </thead>
    <tbody>
      ${trs}
    </tbody>
  </table>
</div>`;
}

// Helper slugify tiếng Việt thành slug URL không dấu
function slugify(str) {
  if (!str) return 'guideline-summary';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Main conversion function
function convertMdToGuidelineHtml(mdPath) {
  console.log(`\n🚀 Đang xử lý file: ${mdPath}`);

  const rawContent = fs.readFileSync(mdPath, 'utf8');
  const { metadata, body } = parseFrontmatter(rawContent);

  const fileSlug = metadata.slug || slugify(metadata.title || path.basename(mdPath, '.md'));
  const htmlFilename = `${fileSlug}.html`;
  const htmlOutputPath = path.join(KHO_GUIDELINES_DIR, htmlFilename);

  const processedBody = processTables(processCallouts(body));
  const rawSections = processedBody.split(/\n(?=##\s+)/);

  let overviewHtml = '';
  let pillars = [];
  let secCards = [];
  let secIndex = 1;

  const sectionIcons = ['📋', '💊', '🎯', '📊', '🛡️', '🧪', '🔬', '⚙️'];

  for (let i = 0; i < rawSections.length; i++) {
    const secStr = rawSections[i].trim();
    if (!secStr) continue;

    if (secStr.startsWith('# ') && !secStr.startsWith('## ')) {
      const lines = secStr.split('\n');
      const title = lines[0].replace(/^#\s+/, '').trim();
      const content = lines.slice(1).join('\n').trim();
      overviewHtml = `<p class="hero-subtitle">${formatInlineText(content)}</p>`;
    } else if (secStr.startsWith('## ')) {
      const lines = secStr.split('\n');
      const secTitle = lines[0].replace(/^##\s+/, '').trim();
      const secContent = lines.slice(1).join('\n').trim();

      if (secTitle.toLowerCase().includes('trụ cột') || secTitle.toLowerCase().includes('pillars')) {
        const pillarMatches = secContent.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('1.') || l.trim().startsWith('2.') || l.trim().startsWith('3.'));
        pillars = pillarMatches.map((pLine, idx) => {
          const cleaned = pLine.replace(/^[-*\d.]+\s*/, '').trim();
          const parts = cleaned.split(':');
          const pTitle = parts.length > 1 ? parts[0].replace(/\*\*/g, '') : `Trụ cột ${idx + 1}`;
          const pDesc = parts.length > 1 ? parts.slice(1).join(':') : cleaned;
          return {
            title: pTitle.trim(),
            desc: formatInlineText(pDesc.trim()),
            icon: idx === 0 ? '⚡' : idx === 1 ? '🎯' : idx === 2 ? '🛡️' : '⏱️',
            class: `p${(idx % 3) + 1}`
          };
        });
      } else {
        const icon = sectionIcons[(secIndex - 1) % sectionIcons.length];
        
        let bodyHtml = secContent
          .replace(/^###\s+(.*$)/gm, '<h3 class="sec-subtitle" style="margin-top: 1rem; margin-bottom: 0.5rem; color: var(--accent);">$1</h3>')
          .replace(/^####\s+(.*$)/gm, '<strong>$1</strong>')
          .replace(/^\s*-\s+(.*$)/gm, '<li>$1</li>');

        bodyHtml = bodyHtml
          .split('\n\n')
          .map(block => {
            if (block.trim().startsWith('<div') || block.trim().startsWith('<table') || block.trim().startsWith('<h3') || block.trim().startsWith('<ul') || block.trim().startsWith('<ol')) {
              return block;
            }
            if (block.includes('<li>')) {
              return `<ul style="margin-left: 1.25rem; margin-bottom: 1rem; line-height: 1.6;">${block}</ul>`;
            }
            return `<p style="margin-bottom: 1rem; line-height: 1.6;">${formatInlineText(block)}</p>`;
          })
          .join('\n');

        secCards.push({
          id: `sec-${secIndex}`,
          title: secTitle,
          icon: icon,
          content: bodyHtml
        });
        secIndex++;
      }
    }
  }

  const titleVi = metadata.title || 'Tóm Tắt Hướng Dẫn Lâm Sàng';
  const titleEn = metadata.englishTitle || metadata.title || '';
  const org = metadata.organization || metadata.author || 'Bộ Y Tế / Hội Chuyên Khoa';
  const year = metadata.year || new Date().getFullYear();
  const metaDesc = metadata.summary || titleVi;

  const pillarsNavHtml = secCards.map((card, idx) => {
    return `<a href="#${card.id}" class="pillar-tab p-${(idx % 5) + 1}">${idx + 1}. ${card.title.replace(/^\d+\.\s*/, '')}</a>`;
  }).join('\n      ');

  const pillarsGridHtml = (pillars.length > 0 ? pillars : [
    { title: 'Chẩn đoán sớm', desc: 'Sàng lọc và phân loại mức độ nguy cơ ngay khi tiếp cận.', icon: '⚡', class: 'p1' },
    { title: 'Điều trị chuẩn hóa', desc: 'Áp dụng phác đồ và tối ưu hóa liều dùng lâm sàng.', icon: '🎯', class: 'p2' },
    { title: 'Theo dõi & An toàn', desc: 'Đánh giá đáp ứng và phòng ngừa biến chứng nguy hiểm.', icon: '🛡️', class: 'p3' }
  ]).map(p => `
      <div class="pillar ${p.class}">
        <div class="pillar-icon">${p.icon}</div>
        <div>
          <div class="pillar-title">${p.title}</div>
          <div class="pillar-desc">${p.desc}</div>
        </div>
      </div>`).join('');

  const cardsHtml = secCards.map(card => `
    <!-- ${card.title} -->
    <article class="sec-card" id="${card.id}">
      <div class="sec-hdr">
        <span class="sec-hdr-icon">${card.icon}</span>
        <h2 class="sec-title">${card.title}</h2>
      </div>
      <div class="sec-body">
        ${card.content}
      </div>
    </article>`).join('\n');

  const fullHtml = `<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${metaDesc.replace(/"/g, '&quot;')}">
  <title>${titleVi} – CliniPortal</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

    :root {
      --green: #059669; --green-bg: #f0fdf4; --green-light: #a7f3d0;
      --orange: #d97706; --orange-bg: #fffbeb; --orange-light: #fde68a;
      --red: #dc2626; --red-bg: #fef2f2; --red-light: #fca5a5;
      --blue: #2563eb; --blue-bg: #eff6ff; --blue-light: #bfdbfe;
      --teal: #0d9488; --teal-bg: #f0fdfa; --teal-light: #99f6e4;
      --purple: #7c3aed; --purple-bg: #faf5ff; --purple-light: #ddd6fe;
      --accent: #0f6fb4;
      --bg: #f0f4f8; --surface: #ffffff; --surface-2: #f8fafc;
      --border: #cbd5e1; --border-light: #e2e8f0;
      --text: #0f172a; --text-muted: #475569; --text-faint: #94a3b8;
      --radius: 16px; --tr: 220ms cubic-bezier(0.16,1,0.3,1);
    }

    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; font-size: 15px; background: var(--bg); color: var(--text); line-height: 1.65; min-height: 100vh; }

    /* TOP NAV */
    .topnav { position: sticky; top: 0; z-index: 200; background: rgba(255,255,255,0.94); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border-bottom: 1px solid var(--border-light); display: flex; align-items: center; gap: 1rem; padding: 0 1.5rem; height: 56px; }
    .topnav-back { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--accent); text-decoration: none; font-size: 0.82rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 8px; transition: background var(--tr); white-space: nowrap; }
    .topnav-back:hover { background: var(--blue-bg); }
    .topnav-divider { width: 1px; height: 18px; background: var(--border-light); flex-shrink: 0; }
    .topnav-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.88rem; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    /* HERO */
    .hero { background: linear-gradient(135deg, #0c4a6e 0%, #0f6fb4 40%, #065f46 100%); color: #fff; padding: 3rem 1.5rem 4.5rem; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 15% 60%, rgba(56,189,248,0.2) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(16,185,129,0.15) 0%, transparent 50%); }
    .hero-inner { max-width: 960px; margin: 0 auto; position: relative; z-index: 1; }
    .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.24); border-radius: 20px; padding: 0.3rem 0.9rem; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 1rem; color: #7dd3fc; }
    .hero-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.7rem, 4vw, 2.5rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 0.75rem; }
    .hero-title span { display: block; background: linear-gradient(90deg, #7dd3fc, #6ee7b7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 0.7em; font-weight: 600; letter-spacing: 0; margin-bottom: 0.2rem; }
    .hero-subtitle { font-size: 0.95rem; opacity: 0.85; max-width: 680px; margin-bottom: 1.5rem; line-height: 1.6; }

    /* PILLARS STICKY NAV STRIP */
    .pillars-nav { position: sticky; top: 56px; z-index: 190; background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 0.75rem 1.5rem; }
    .pillars-nav-inner { max-width: 960px; margin: 0 auto; display: flex; gap: 0.6rem; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .pillar-tab { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.85rem; border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.78rem; font-weight: 700; color: var(--text-muted); border: 1px solid var(--border-light); background: var(--surface-2); text-decoration: none; white-space: nowrap; transition: all var(--tr); }
    .pillar-tab:hover { border-color: var(--accent); color: var(--accent); background: var(--blue-bg); }
    .pillar-tab.p-1 { border-left: 4px solid var(--blue); }
    .pillar-tab.p-2 { border-left: 4px solid var(--teal); }
    .pillar-tab.p-3 { border-left: 4px solid var(--green); }
    .pillar-tab.p-4 { border-left: 4px solid var(--purple); }
    .pillar-tab.p-5 { border-left: 4px solid var(--red); }

    /* PILLARS */
    .pillars { background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 1.5rem; }
    .pillars-inner { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
    .pillar { background: var(--surface-2); border: 1px solid var(--border-light); border-radius: 14px; padding: 1.1rem 1.25rem; display: flex; align-items: flex-start; gap: 0.85rem; position: relative; overflow: hidden; }
    .pillar::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; border-radius: 4px 0 0 4px; }
    .pillar.p1::before { background: var(--blue); }
    .pillar.p2::before { background: var(--green); }
    .pillar.p3::before { background: var(--orange); }
    .pillar-icon { font-size: 1.6rem; flex-shrink: 0; line-height: 1; }
    .pillar-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.88rem; color: var(--text); margin-bottom: 0.2rem; }
    .pillar-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.45; }

    /* PAGE CONTENT */
    .page-content { max-width: 960px; margin: 0 auto; padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 1.75rem; }

    /* SEC CARD */
    .sec-card { background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius); overflow: hidden; scroll-margin-top: 110px; }
    .sec-hdr { padding: 1rem 1.25rem; border-bottom: 1px solid var(--border-light); background: var(--surface-2); display: flex; align-items: center; gap: 0.6rem; }
    .sec-hdr-icon { font-size: 1.1rem; }
    .sec-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.95rem; font-weight: 800; color: var(--text); }
    .sec-body { padding: 1.35rem; }

    /* INFOBOX ALERTS */
    .infobox { display: flex; align-items: flex-start; gap: 0.85rem; padding: 1rem 1.15rem; border-radius: 12px; margin-bottom: 1rem; font-size: 0.85rem; line-height: 1.6; }
    .infobox:last-child { margin-bottom: 0; }
    .infobox-icon { font-size: 1.25rem; flex-shrink: 0; line-height: 1.2; }
    .infobox.danger { background: var(--red-bg); border: 1px solid var(--red-light); border-left: 4px solid var(--red); }
    .infobox.success { background: var(--green-bg); border: 1px solid var(--green-light); border-left: 4px solid var(--green); }
    .infobox.warning { background: var(--orange-bg); border: 1px solid var(--orange-light); border-left: 4px solid var(--orange); }
    .infobox.info { background: var(--blue-bg); border: 1px solid var(--blue-light); border-left: 4px solid var(--blue); }
    .infobox strong { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: var(--text); }

    /* REGIMEN TABLE */
    .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 1rem; }
    .regimen-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; min-width: 600px; }
    .regimen-table th { background: var(--surface-2); color: var(--text-muted); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.7rem 0.85rem; border-bottom: 1px solid var(--border-light); text-align: left; }
    .regimen-table td { padding: 0.8rem 0.85rem; border-bottom: 1px solid var(--border-light); vertical-align: top; line-height: 1.55; }
    .rx-tag { display: inline-block; background: var(--border-light); color: var(--text-muted); font-size: 0.72rem; font-family: 'JetBrains Mono', monospace; padding: 0.15rem 0.45rem; border-radius: 5px; margin: 0.1rem 0.1rem 0.1rem 0; }
    .rx-tag.preferred { background: var(--green-bg); color: #065f46; border: 1px solid var(--green-light); font-weight: 600; }

    code { font-family: 'JetBrains Mono', monospace; background: var(--surface-2); padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.82em; border: 1px solid var(--border-light); }

    @media (max-width: 768px) {
      .page-content { padding: 1.25rem 1rem; }
      .sec-body { padding: 1rem; }
    }
  </style>
</head>
<body>

  <!-- TOP NAV -->
  <nav class="topnav">
    <a href="../guidelines.html" class="topnav-back">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      Kho Guidelines
    </a>
    <div class="topnav-divider"></div>
    <div class="topnav-title">${titleVi}</div>
  </nav>

  <!-- HERO -->
  <header class="hero">
    <div class="hero-inner">
      <div class="hero-badge">🔬 ${org} (${year})</div>
      <h1 class="hero-title">
        ${titleEn ? `<span>${titleEn}</span>` : ''}
        ${titleVi}
      </h1>
      ${overviewHtml}
    </div>
  </header>

  <!-- PILLARS STRIP NAV -->
  <div class="pillars-nav">
    <div class="pillars-nav-inner">
      ${pillarsNavHtml}
    </div>
  </div>

  <!-- PILLARS GRID -->
  <section class="pillars">
    <div class="pillars-inner">
      ${pillarsGridHtml}
    </div>
  </section>

  <!-- MAIN CONTENT -->
  <main class="page-content">
    ${cardsHtml}
  </main>

</body>
</html>`;

  fs.writeFileSync(htmlOutputPath, fullHtml, 'utf8');
  console.log(`✅ Đã tạo trang HTML tóm tắt: ${htmlOutputPath}`);

  updateGuidelinesData(metadata, fileSlug, htmlFilename);
}

function updateGuidelinesData(metadata, fileSlug, htmlFilename) {
  let jsContent = fs.readFileSync(DATA_FILE_PATH, 'utf8');
  const studyId = `study_${fileSlug.replace(/-/g, '_')}`;

  const relFilePath = `kho-guidelines/${htmlFilename}`;

  if (jsContent.includes(`id: "${studyId}"`) || jsContent.includes(`id: '${studyId}'`)) {
    console.log(`ℹ️ Bản ghi ${studyId} đã tồn tại trong guidelinesdata.js. Giữ nguyên hoặc bỏ qua việc chèn trùng lặp.`);
    return;
  }

  const newStudyObject = {
    id: studyId,
    title: metadata.title || "Tóm tắt Hướng Dẫn Lâm Sàng",
    drug: metadata.drug || "",
    sourceType: metadata.sourceType || "intl-guideline",
    specialty: metadata.specialty || "icu",
    design: metadata.design || "guideline",
    impact: metadata.impact || "practice-changing",
    year: parseInt(metadata.year || new Date().getFullYear(), 10),
    organization: metadata.organization || metadata.author || "Hội Chuyên Khoa",
    phase: "Clinical Guideline",
    sampleSize: null,
    population: metadata.population || "Bệnh nhân lâm sàng",
    summary: metadata.summary || metadata.title || "",
    detailedConclusion: metadata.detailedConclusion || metadata.summary || "",
    sourceUrl: metadata.sourceUrl || "",
    file: relFilePath,
    asianData: true,
    bookmarked: false
  };

  const formattedObjStr = `      {\n` +
    Object.entries(newStudyObject).map(([k, v]) => {
      let valStr = JSON.stringify(v);
      return `        ${k}: ${valStr}`;
    }).join(',\n') +
    `\n      },\n`;

  const insertMarker = 'const SAMPLE_STUDIES = [';
  if (jsContent.includes(insertMarker)) {
    jsContent = jsContent.replace(insertMarker, `${insertMarker}\n${formattedObjStr}`);
    fs.writeFileSync(DATA_FILE_PATH, jsContent, 'utf8');
    console.log(`✅ Đã đăng ký thành công bản ghi mới (${studyId}) vào guidelinesdata.js!`);
  } else {
    console.warn(`⚠️ Không tìm thấy vị trí const SAMPLE_STUDIES trong guidelinesdata.js để tự động chèn.`);
  }
}

const targetMdFile = process.argv[2];
if (!targetMdFile) {
  console.log(`Vui lòng cung cấp đường dẫn file .md!`);
  console.log(`Cú pháp: node convert_md_to_guideline.js <path_to_md_file>`);
  process.exit(1);
}

const resolvedPath = path.isAbsolute(targetMdFile) ? targetMdFile : path.join(WORKSPACE_ROOT, targetMdFile);
if (!fs.existsSync(resolvedPath)) {
  console.error(`❌ File không tồn tại: ${resolvedPath}`);
  process.exit(1);
}

convertMdToGuidelineHtml(resolvedPath);
