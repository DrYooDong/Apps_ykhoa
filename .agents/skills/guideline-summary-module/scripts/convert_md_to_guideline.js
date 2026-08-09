/**
 * convert_md_to_guideline.js
 * 
 * Script Node.js tự động chuyển đổi file Markdown (.md) tóm tắt Guideline / RCT y khoa
 * thành trang HTML tóm tắt ĐỈNH CAO (Flagship Standard) tại src/content/ebm/guidelines/kho-guidelines/<slug>.html
 * theo đúng tiêu chuẩn giao diện của byt-sot-xuat-huyet-dengue-2023.html
 * và tự động đăng ký bản ghi dữ liệu vào src/content/ebm/guidelines/guidelinesdata.js.
 * 
 * Cách sử dụng:
 *   node .agents/skills/guideline-summary-module/scripts/convert_md_to_guideline.js <path_to_md_file>
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../../../');
const KHO_GUIDELINES_DIR = path.join(WORKSPACE_ROOT, 'src/content/ebm/guidelines/kho-guidelines');
const DATA_FILE_PATH = path.join(WORKSPACE_ROOT, 'src/content/ebm/guidelines/guidelinesdata.js');

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

function formatInlineText(text) {
  if (!text) return '';
  return text
    .replace(/\\ge/g, '≥')
    .replace(/\\le/g, '≤')
    .replace(/\\text\{([^}]+)\}/g, ' $1')
    .replace(/\^2/g, '²')
    .replace(/\\%/g, '%')
    .replace(/\\\((.*?)\\\)/g, '$1')
    .replace(/\\rightarrow/g, '→')
    .replace(/<-/g, '←')
    .replace(/\\beta_1/g, 'β₁')
    .replace(/\\beta_2/g, 'β₂')
    .replace(/\\beta/g, 'β')
    .replace(/\\alpha1/g, 'α₁')
    .replace(/\\alpha/g, 'α')
    .replace(/T_4/g, 'T₄')
    .replace(/T_3/g, 'T₃')
    .replace(/5'\$/g, '5′')
    .replace(/5'/g, '5′')
    .replace(/K\^\+/g, 'K⁺')
    .replace(/Na\^\+/g, 'Na⁺')
    .replace(/\$([^$]+)\$/g, '$1')
    .replace(/\$/g, '')
    .replace(/\\/g, '')
    .replace(/<(?![a-zA-Z/!?-])/g, '&lt;')
    .replace(/\bCOR\s*1\b/gi, '<span class="cor-badge cor-1">COR 1</span>')
    .replace(/\bCOR\s*2a\b/gi, '<span class="cor-badge cor-2a">COR 2a</span>')
    .replace(/\bCOR\s*2b\b/gi, '<span class="cor-badge cor-2b">COR 2b</span>')
    .replace(/\bCOR\s*3-?Harm\b/gi, '<span class="cor-badge cor-3-harm">COR 3-HARM</span>')
    .replace(/\bLOE\s*([A-C](?:-[R|NR])?)\b/gi, '<span class="loe-badge">LOE $1</span>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>');
}

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
    if (t === 'TEAL') return { class: 'teal', icon: '💡' };
    return { class: 'info', icon: 'ℹ️' };
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const calloutMatch = line.match(/^[\s\-*]*>\s*\[\!(IMPORTANT|TIP|WARNING|CAUTION|DANGER|NOTE|INFO|TEAL)\]\s*(.*)/i);
    
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
    } else if (inCallout && (line.trim().startsWith('>') || line.trim().startsWith('- >'))) {
      calloutLines.push(line.replace(/^[\s\-*]*>\s?/, ''));
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
  return `\n\n<div class="infobox ${meta.class}">
  <span class="infobox-icon">${meta.icon}</span>
  <div>
    ${contentHtml}
  </div>
</div>\n\n`;
}

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

  let ths = headers.map(h => `<th>${formatInlineText(h)}</th>`).join('\n              ');
  let trs = rows.map(row => {
    let tds = row.map(cell => `<td>${formatInlineText(cell)}</td>`).join('');
    return `<tr>${tds}</tr>`;
  }).join('\n            ');

  return `<div class="table-wrapper">
  <table class="data-table">
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

function processFlowcharts(markdown) {
  const codeBlockRegex = /```([a-z]*)\r?\n([\s\S]*?)```/g;
  return markdown.replace(codeBlockRegex, (match, lang, codeContent) => {
    return renderFlowchartHtml(codeContent);
  });
}

function renderFlowchartHtml(codeContent) {
  const lines = codeContent.split(/\r?\n/);
  const formattedLines = lines.map(line => {
    if (!line.trim()) return ' ';
    let l = line.replace(/<-/g, '←').replace(/<(?![a-zA-Z1-6/!])/g, '&lt;');
    // Highlight box-drawing lines
    l = l.replace(/([┌┐└┘├┤┬┴┼───│─]+)/g, '<span class="fc-line">$1</span>');
    // Highlight bracketed nodes
    l = l.replace(/\[\s*(.*?)\s*\]/g, (m, nodeText) => {
      const lower = nodeText.toLowerCase();
      let nodeClass = 'fc-node';
      let icon = '';
      if (lower === 'có' || lower === 'dương tính' || lower.includes('dương tính')) {
        nodeClass += ' fc-node-yes';
        icon = '<i class="fa-solid fa-check"></i> ';
      } else if (lower === 'không' || lower === 'âm tính' || lower.includes('âm tính')) {
        nodeClass += ' fc-node-no';
        icon = '<i class="fa-solid fa-xmark"></i> ';
      } else if (lower.includes('nghi ngờ') || lower.includes('chưa phân loại') || lower.includes('thận trọng')) {
        nodeClass += ' fc-node-warn';
        icon = '<i class="fa-solid fa-triangle-exclamation"></i> ';
      }
      return `<span class="${nodeClass}">${icon}${nodeText}</span>`;
    });
    return l;
  });

  return `<div class="flowchart-card">
  <div class="flowchart-card-hdr">
    <div class="flowchart-card-hdr-title"><i class="fa-solid fa-diagram-project"></i> Sơ đồ Thuật toán Lâm sàng</div>
    <span class="badge badge-blue">Clinical Algorithm</span>
  </div>
  <div class="flowchart-card-body">
    <pre class="flowchart-box">${formattedLines.join('\n')}</pre>
  </div>
</div>`;
}

function convertMdToGuidelineHtml(mdPath) {
  console.log(`\n🚀 Đang xử lý file (Mẫu Flagship): ${mdPath}`);

  const rawContent = fs.readFileSync(mdPath, 'utf8');
  const { metadata, body } = parseFrontmatter(rawContent);

  const fileSlug = metadata.slug || slugify(metadata.title || path.basename(mdPath, '.md'));
  const htmlFilename = `${fileSlug}.html`;
  const htmlOutputPath = path.join(KHO_GUIDELINES_DIR, htmlFilename);

  const safeBody = body.replace(/<(?![a-zA-Z/!?-])/g, '&lt;');
  const processedBody = processTables(processCallouts(processFlowcharts(safeBody)));
  const rawSections = processedBody.split(/\n(?=##?\s+)/);

  let overviewHtml = '';
  let pillars = [];
  let secCards = [];
  let secIndex = 1;

  const sectionIcons = ['fa-stethoscope', 'fa-vial', 'fa-pills', 'fa-heart-pulse', 'fa-shield-halved', 'fa-triangle-exclamation', 'fa-circle-nodes', 'fa-book-medical'];

  for (let i = 0; i < rawSections.length; i++) {
    const secStr = rawSections[i].trim();
    if (!secStr) continue;

    if (secStr.startsWith('# ') && !secStr.startsWith('## ')) {
      const lines = secStr.split('\n');
      const content = lines.slice(1).join('\n').trim();
      overviewHtml = formatInlineText(content);
    } else if (secStr.startsWith('## ')) {
      const lines = secStr.split('\n');
      const secTitle = lines[0].replace(/^##\s+/, '').trim();
      const secContent = lines.slice(1).join('\n').trim();

      if (secTitle.toLowerCase().includes('trụ cột') || secTitle.toLowerCase().includes('pillars')) {
        const pillarMatches = secContent.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('1.') || l.trim().startsWith('2.') || l.trim().startsWith('3.') || l.trim().startsWith('4.'));
        pillars = pillarMatches.map((pLine, idx) => {
          let cleaned = pLine.replace(/^[-*\d.]+\s*/, '').trim();
          
          // Extract emoji from title if present
          let customIcon = null;
          const emojiRegex = /^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|⚡|🎯|🛡️|⏱️|🩸|🌡️|📊|💉)\s*/u;
          const emojiMatch = cleaned.match(emojiRegex);
          if (emojiMatch) {
            customIcon = emojiMatch[1];
            cleaned = cleaned.slice(emojiMatch[0].length).trim();
          }
          // Remove numbering again if present (e.g., "1. ")
          cleaned = cleaned.replace(/^\d+\.\s*/, '').trim();

          const parts = cleaned.split(':');
          let pTitle = parts.length > 1 ? parts[0].replace(/\*\*/g, '') : `Trụ cột ${idx + 1}`;
          let pDesc = parts.length > 1 ? parts.slice(1).join(':') : cleaned;

          // Strip any residual leading emoji/numbering from title
          pTitle = pTitle.replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}⚡🎯🛡️⏱️🩸]\s*/u, '').replace(/^\d+\.\s*/, '').trim();

          const defaultIcons = ['⚡', '🎯', '🛡️', '⏱️'];
          return {
            title: pTitle.trim(),
            desc: formatInlineText(pDesc.trim()),
            icon: customIcon || defaultIcons[idx % defaultIcons.length],
            class: `p${(idx % 4) + 1}`
          };
        });
      } else {
        const iconClass = sectionIcons[(secIndex - 1) % sectionIcons.length];
        
        const flowcharts = [];
        let bodyHtml = secContent.replace(/<div class="flowchart-card">[\s\S]*?<\/div>\s*<\/div>/g, m => {
          flowcharts.push(m);
          return `___FLOWCHART_PLACEHOLDER_${flowcharts.length - 1}___`;
        });

        bodyHtml = bodyHtml
          .replace(/^###\s+(.*$)/gm, '\n\n<h3 class="sec-subtitle"><i class="fa-solid fa-angle-right"></i> $1</h3>\n\n')
          .replace(/^####\s+(.*$)/gm, '\n\n<h4 class="sec-h4">$1</h4>\n\n')
          .replace(/^\s*[-*]\s+(.*$)/gm, '<li class="ul-item">$1</li>')
          .replace(/^\s*(\d+)\.\s+(.*$)/gm, '<li class="ol-item" data-num="$1">$2</li>');

        // Group consecutive <ul> list items
        bodyHtml = bodyHtml.replace(/(?:<li class="ul-item">[\s\S]*?<\/li>\s*)+/g, match => {
          const cleanedLi = match.replace(/ class="ul-item"/g, '');
          return `\n\n<ul style="margin-left: 1.25rem; margin-bottom: 0.75rem; line-height: 1.6;">${cleanedLi.trim()}</ul>\n\n`;
        });

        // Group consecutive <ol> list items
        bodyHtml = bodyHtml.replace(/(?:<li class="ol-item" data-num="\d+">[\s\S]*?<\/li>\s*)+/g, match => {
          const cleanedLi = match.replace(/ class="ol-item" data-num="\d+"/g, '');
          return `\n\n<ol style="margin-left: 1.25rem; margin-bottom: 0.75rem; line-height: 1.6;">${cleanedLi.trim()}</ol>\n\n`;
        });

        // Apply inline formatting across the section content
        bodyHtml = formatInlineText(bodyHtml);

        bodyHtml = bodyHtml
          .split(/\n\s*\n/)
          .map(block => {
            const trimmed = block.trim();
            if (!trimmed) return '';
            if (trimmed.startsWith('<') || trimmed.startsWith('___FLOWCHART_PLACEHOLDER_')) {
              return trimmed;
            }
            return `<p style="line-height: 1.65;">${trimmed}</p>`;
          })
          .join('\n');

        flowcharts.forEach((fc, idx) => {
          bodyHtml = bodyHtml.replace(`___FLOWCHART_PLACEHOLDER_${idx}___`, fc);
        });

        const cardId = `sec-${slugify(secTitle)}`;

        secCards.push({
          id: cardId,
          title: secTitle,
          iconClass: iconClass,
          content: bodyHtml
        });
        secIndex++;
      }
    }
  }

  const titleVi = metadata.title || 'Hướng Dẫn Lâm Sàng Cập Nhật 2026';
  const titleEn = metadata.englishTitle || metadata.title || '';
  const org = metadata.organization || metadata.author || 'Bộ Y tế Việt Nam / Hội Chuyên Khoa';
  const year = metadata.year || new Date().getFullYear();
  const metaDesc = metadata.summary || titleVi;

  const quickNavHtml = secCards.map((card, idx) => {
    return `<a href="#${card.id}" class="quicknav-link ${idx === 0 ? 'active' : ''}">${idx + 1}. ${card.title.replace(/^\d+\.\s*/, '')}</a>`;
  }).join('\n    ');

  const pillarsGridHtml = (pillars.length > 0 ? pillars : [
    { title: 'Chẩn Đoán Sớm', desc: 'Sàng lọc và phân loại mức độ nguy cơ ngay khi tiếp cận.', icon: '⚡', class: 'p1' },
    { title: 'Điều Trị Chuẩn Hóa', desc: 'Áp dụng phác đồ và tối ưu hóa liều dùng lâm sàng.', icon: '🎯', class: 'p2' },
    { title: 'Theo Dõi Tích Cực', desc: 'Đánh giá đáp ứng và phòng ngừa biến chứng nguy hiểm.', icon: '🛡️', class: 'p3' },
    { title: 'Xử Trí Suy Tạng', desc: 'Hồi sức chuyên sâu và can thiệp đa mô thức.', icon: '🩸', class: 'p4' }
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
    <div class="sec-card" id="${card.id}">
      <div class="sec-hdr">
        <i class="fa-solid ${card.iconClass} sec-hdr-icon"></i>
        <h2 class="sec-title">${card.title}</h2>
      </div>
      <div class="sec-body">
        ${card.content}
      </div>
    </div>`).join('\n');

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

  <!-- FontAwesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

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
      --radius: 16px; --tr: 220ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    [data-theme="dark"] {
      --green: #10b981; --green-bg: #064e3b; --green-light: #047857;
      --orange: #f59e0b; --orange-bg: #78350f; --orange-light: #b45309;
      --red: #ef4444; --red-bg: #7f1d1d; --red-light: #b91c1c;
      --blue: #3b82f6; --blue-bg: #1e3a8a; --blue-light: #1d4ed8;
      --teal: #14b8a6; --teal-bg: #115e59; --teal-light: #0f766e;
      --purple: #8b5cf6; --purple-bg: #4c1d95; --purple-light: #6d28d9;
      --accent: #38bdf8;
      --bg: #0f172a; --surface: #1e293b; --surface-2: #0f172a;
      --border: #334155; --border-light: #1e293b;
      --text: #f8fafc; --text-muted: #cbd5e1; --text-faint: #64748b;
    }

    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; font-size: 15px; background: var(--bg); color: var(--text); line-height: 1.65; min-height: 100vh; transition: background var(--tr), color var(--tr); }

    /* TOP NAV */
    .topnav { position: sticky; top: 0; z-index: 200; background: rgba(255, 255, 255, 0.94); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border-bottom: 1px solid var(--border-light); display: flex; align-items: center; gap: 1rem; padding: 0 1.5rem; height: 56px; transition: background var(--tr), border-color var(--tr); }
    [data-theme="dark"] .topnav { background: rgba(30, 41, 59, 0.9); }
    .topnav-back { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--accent); text-decoration: none; font-size: 0.82rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 8px; transition: background var(--tr); white-space: nowrap; }
    .topnav-back:hover { background: var(--blue-bg); }
    .topnav-divider { width: 1px; height: 18px; background: var(--border-light); flex-shrink: 0; }
    .topnav-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.88rem; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .topnav-theme-toggle { margin-left: auto; background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.1rem; padding: 0.5rem; border-radius: 50%; transition: background var(--tr); display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; }
    .topnav-theme-toggle:hover { background: var(--surface-2); color: var(--accent); }

    /* QUICK NAV BAR */
    .quicknav { position: sticky; top: 56px; z-index: 190; background: var(--surface); border-bottom: 1px solid var(--border-light); display: flex; gap: 0.5rem; padding: 0.6rem 1.5rem; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .quicknav::-webkit-scrollbar { height: 3px; }
    .quicknav::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
    .quicknav-link { display: inline-flex; align-items: center; white-space: nowrap; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); text-decoration: none; padding: 0.35rem 0.85rem; border-radius: 20px; background: var(--surface-2); border: 1px solid var(--border-light); transition: all var(--tr); }
    .quicknav-link:hover, .quicknav-link.active { background: var(--blue-bg); color: var(--accent); border-color: var(--blue-light); }

    /* HERO */
    .hero { background: linear-gradient(135deg, #0c4a6e 0%, #0f6fb4 45%, #065f46 100%); color: #fff; padding: 3.5rem 1.5rem 4.5rem; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 20% 50%, rgba(56, 189, 248, 0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 55%); }
    .hero-inner { max-width: 1000px; margin: 0 auto; position: relative; z-index: 1; }
    .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.14); border: 1px solid rgba(255, 255, 255, 0.24); border-radius: 20px; padding: 0.3rem 0.9rem; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 1rem; color: #7dd3fc; }
    .hero-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 0.85rem; }
    .hero-title span { display: block; background: linear-gradient(90deg, #7dd3fc, #6ee7b7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 0.65em; font-weight: 600; letter-spacing: 0; margin-bottom: 0.2rem; }
    .hero-subtitle { font-size: 0.95rem; opacity: 0.88; max-width: 780px; margin-bottom: 2rem; line-height: 1.65; }
    .hero-meta { display: flex; flex-wrap: wrap; gap: 0.75rem 2rem; font-size: 0.8rem; opacity: 0.8; }
    .hero-meta-item { display: flex; align-items: center; gap: 6px; }

    /* PILLARS STRIP */
    .pillars { background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 1.75rem 1.5rem; }
    .pillars-inner { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
    .pillar { background: var(--surface-2); border: 1px solid var(--border-light); border-radius: 14px; padding: 1.1rem 1.2rem; display: flex; align-items: flex-start; gap: 0.85rem; position: relative; overflow: hidden; transition: box-shadow var(--tr); }
    .pillar::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; border-radius: 4px 0 0 4px; }
    .pillar.p1::before { background: var(--blue); }
    .pillar.p2::before { background: var(--orange); }
    .pillar.p3::before { background: var(--red); }
    .pillar.p4::before { background: var(--teal); }
    .pillar:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
    .pillar-icon { font-size: 1.6rem; flex-shrink: 0; line-height: 1; }
    .pillar-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.88rem; color: var(--text); margin-bottom: 0.25rem; }
    .pillar-desc { font-size: 0.76rem; color: var(--text-muted); line-height: 1.45; }

    /* PAGE CONTENT */
    .page-content { max-width: 1000px; margin: 0 auto; padding: 2.25rem 1.5rem; display: flex; flex-direction: column; gap: 2rem; }

    /* SECTION CARDS */
    /* SECTION CARDS & HEADINGS */
    .sec-card { background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius); overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.03); scroll-margin-top: 110px; }
    .sec-hdr { padding: 1.15rem 1.5rem; border-bottom: 1px solid var(--border-light); background: var(--surface-2); display: flex; align-items: center; gap: 0.75rem; }
    .sec-hdr-icon { font-size: 1.15rem; color: var(--accent); background: var(--blue-bg); width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--blue-light); flex-shrink: 0; }
    .sec-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; font-weight: 800; color: var(--text); letter-spacing: -0.01em; }
    .sec-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }

    /* SUBHEADINGS (H3, H4) */
    .sec-subtitle { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.95rem; color: var(--text); margin-top: 0.5rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.6rem; }
    .sec-subtitle i { color: var(--accent); font-size: 0.75rem; background: var(--blue-bg); width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--blue-light); flex-shrink: 0; }
    .sec-subtitle::after { content: ''; flex: 1; height: 2px; background: linear-gradient(90deg, var(--border-light), transparent); border-radius: 1px; margin-left: 0.5rem; }

    .sec-h4 { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.88rem; color: var(--text); margin-top: 1rem; margin-bottom: 0.4rem; border-left: 3px solid var(--accent); padding-left: 0.65rem; display: flex; align-items: center; }

    /* INFO BOXES */
    .infobox { display: flex; align-items: flex-start; gap: 0.85rem; padding: 1rem 1.25rem; border-radius: 12px; font-size: 0.85rem; line-height: 1.6; }
    .infobox-icon { font-size: 1.3rem; flex-shrink: 0; line-height: 1.3; }
    .infobox.danger { background: var(--red-bg); border: 1px solid var(--red-light); border-left: 4px solid var(--red); color: var(--text); }
    .infobox.success { background: var(--green-bg); border: 1px solid var(--green-light); border-left: 4px solid var(--green); color: var(--text); }
    .infobox.warning { background: var(--orange-bg); border: 1px solid var(--orange-light); border-left: 4px solid var(--orange); color: var(--text); }
    .infobox.info { background: var(--blue-bg); border: 1px solid var(--blue-light); border-left: 4px solid var(--blue); color: var(--text); }
    .infobox.teal { background: var(--teal-bg); border: 1px solid var(--teal-light); border-left: 4px solid var(--teal); color: var(--text); }
    .infobox strong { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: var(--text); }

    /* TABLES */
    .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 12px; border: 1px solid var(--border-light); margin-bottom: 1rem; }
    .data-table { width: 100%; border-collapse: collapse; font-size: 0.83rem; min-width: 650px; text-align: left; }
    .data-table thead th { padding: 0.75rem 1rem; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; background: var(--surface-2); color: var(--text-muted); border-bottom: 1px solid var(--border-light); }
    .data-table td { padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-light); vertical-align: top; line-height: 1.55; }
    .data-table tbody tr:last-child td { border-bottom: none; }

    /* BADGES & TAGS */
    .rx-tag { display: inline-block; background: var(--surface-2); color: var(--text-muted); font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; padding: 0.15rem 0.5rem; border-radius: 6px; border: 1px solid var(--border-light); margin: 0.15rem 0.1rem; }
    .rx-tag.highlight { background: var(--blue-bg); color: var(--accent); border-color: var(--blue-light); font-weight: 600; }
    .rx-tag.alert { background: var(--red-bg); color: var(--red); border-color: var(--red-light); font-weight: 600; }

    /* FIGO BOARD & UI DIAGRAMS */
    .figo-board { background: var(--surface); border: 1px solid var(--border-light); border-radius: 16px; overflow: hidden; margin: 1.25rem 0; box-shadow: 0 4px 14px rgba(0,0,0,0.04); }
    .figo-board-hdr { background: linear-gradient(135deg, #0c4a6e 0%, #0f6fb4 100%); color: #fff; padding: 0.85rem 1.25rem; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 800; display: flex; align-items: center; gap: 0.6rem; }
    .figo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; padding: 1.25rem; background: var(--surface-2); }
    .figo-card { background: var(--surface); border: 1px solid var(--border-light); border-radius: 12px; padding: 1.1rem; display: flex; flex-direction: column; gap: 0.75rem; transition: transform var(--tr), box-shadow var(--tr); }
    .figo-card:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.06); }
    .figo-card.figo-submucosal { border-top: 4px solid var(--orange); }
    .figo-card.figo-intramural { border-top: 4px solid var(--blue); }
    .figo-card.figo-subserosal { border-top: 4px solid var(--green); }
    .figo-card.figo-special { border-top: 4px solid var(--purple); }
    .figo-card-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.84rem; color: var(--text); display: flex; align-items: center; gap: 0.4rem; }
    .figo-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .figo-pill { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 6px; }
    .figo-pill.orange { background: var(--orange-bg); color: var(--orange); border: 1px solid var(--orange-light); }
    .figo-pill.blue { background: var(--blue-bg); color: var(--blue); border: 1px solid var(--blue-light); }
    .figo-pill.green { background: var(--green-bg); color: var(--green); border: 1px solid var(--green-light); }
    .figo-pill.purple { background: var(--purple-bg); color: var(--purple); border: 1px solid var(--purple-light); }
    .figo-desc { font-size: 0.8rem; color: var(--text-muted); line-height: 1.55; }

    /* FLOWCHART V2 UI */
    .flowchart-v2 { background: var(--surface); border: 1px solid var(--border-light); border-radius: 16px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
    .flowchart-v2-hdr { background: linear-gradient(135deg, #065f46 0%, #0d9488 100%); color: #fff; padding: 0.85rem 1.25rem; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 800; display: flex; align-items: center; gap: 0.6rem; }
    .flowchart-v2-body { padding: 1.5rem; background: var(--surface-2); display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .flow-step { background: var(--surface); border: 1.5px solid var(--accent); border-radius: 12px; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 0.85rem; width: 100%; max-width: 720px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    .flow-step .step-num { width: 32px; height: 32px; border-radius: 50%; background: var(--accent); color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .flow-step .step-content { flex: 1; font-size: 0.83rem; line-height: 1.5; color: var(--text); }
    .flow-step .step-content strong { display: block; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; font-weight: 800; margin-bottom: 0.2rem; color: var(--accent); }
    .flow-arrow { color: var(--accent); font-size: 1.2rem; }
    .flow-branches { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; width: 100%; }
    .branch-card { background: var(--surface); border: 1px solid var(--border-light); border-radius: 12px; padding: 1.1rem; display: flex; flex-direction: column; gap: 0.6rem; }
    .branch-card.branch-red { border-top: 4px solid var(--red); }
    .branch-card.branch-green { border-top: 4px solid var(--green); }
    .branch-card.branch-orange { border-top: 4px solid var(--orange); }
    .branch-hdr { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.83rem; color: var(--text); display: flex; align-items: center; gap: 0.4rem; }
    .branch-card ul { margin-left: 1rem; font-size: 0.78rem; color: var(--text-muted); line-height: 1.55; }

    /* DOPPLER CARD UI */
    .doppler-card { background: var(--surface); border: 1px solid var(--border-light); border-radius: 16px; overflow: hidden; margin: 1.25rem 0; box-shadow: 0 4px 14px rgba(0,0,0,0.04); }
    .doppler-hdr { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #fff; padding: 0.85rem 1.25rem; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 800; display: flex; align-items: center; gap: 0.6rem; }
    .doppler-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; padding: 1.25rem; background: var(--surface-2); }
    .doppler-box { background: var(--surface); border: 1px solid var(--border-light); border-radius: 12px; padding: 1.1rem; display: flex; flex-direction: column; gap: 0.75rem; }
    .doppler-box.leiomyoma { border-left: 4px solid var(--blue); }
    .doppler-box.adenomyosis { border-left: 4px solid var(--orange); }
    .doppler-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.85rem; color: var(--text); display: flex; align-items: center; gap: 0.4rem; }
    .doppler-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8rem; color: var(--text-muted); line-height: 1.55; }
    .doppler-list li { display: flex; align-items: flex-start; gap: 0.5rem; }
    .doppler-list li i { flex-shrink: 0; margin-top: 0.2rem; }

    /* ══════════════════════════════════════════════════════
       FLOWCHART — PREMIUM CLINICAL ALGORITHM UI
       "Deep Diagnostic Map" Design System v2.0
    ══════════════════════════════════════════════════════ */
    @keyframes fc-pulse-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(15,111,180,0); } 50% { box-shadow: 0 0 0 4px rgba(15,111,180,0.12); } }
    @keyframes fc-fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

    .flowchart-card {
      background: var(--surface);
      border-radius: 18px;
      overflow: hidden;
      margin-bottom: 1.75rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(15,111,180,0.1);
      transition: box-shadow 280ms cubic-bezier(0.16,1,0.3,1), transform 280ms cubic-bezier(0.16,1,0.3,1);
      animation: fc-fade-in 0.4s ease both;
    }
    .flowchart-card:hover {
      box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(15,111,180,0.2);
      transform: translateY(-2px);
    }

    /* HEADER — Gradient Medical Banner */
    .flowchart-card-hdr {
      background: linear-gradient(135deg, #0c4a6e 0%, #0f6fb4 55%, #1d4ed8 100%);
      padding: 0.9rem 1.35rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      position: relative;
      overflow: hidden;
    }
    .flowchart-card-hdr::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 80% 50%, rgba(56,189,248,0.18) 0%, transparent 60%);
      pointer-events: none;
    }
    .flowchart-card-hdr-title {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.01em;
      position: relative;
      z-index: 1;
    }
    .flowchart-card-hdr-title i {
      font-size: 1rem;
      color: #7dd3fc;
    }
    .flowchart-card-hdr .badge {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 0.25rem 0.65rem;
      border-radius: 20px;
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
      color: #e0f2fe;
      white-space: nowrap;
      position: relative;
      z-index: 1;
    }

    /* BODY CANVAS — Dot-Grid Blueprint */
    .flowchart-card-body {
      padding: 2rem 1.75rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      background: #f0f6ff;
      background-image:
        radial-gradient(ellipse at 15% 20%, rgba(59,130,246,0.08) 0%, transparent 55%),
        radial-gradient(ellipse at 85% 75%, rgba(16,185,129,0.06) 0%, transparent 55%),
        radial-gradient(circle, rgba(15,111,180,0.25) 1px, transparent 1px);
      background-size: auto, auto, 22px 22px;
      color: var(--text);
      position: relative;
    }
    [data-theme="dark"] .flowchart-card-body {
      background: #060e1c;
      background-image:
        radial-gradient(ellipse at 15% 20%, rgba(59,130,246,0.12) 0%, transparent 55%),
        radial-gradient(ellipse at 85% 75%, rgba(16,185,129,0.08) 0%, transparent 55%),
        radial-gradient(circle, rgba(56,189,248,0.2) 1px, transparent 1px);
      background-size: auto, auto, 22px 22px;
    }

    /* FLOWCHART PRE CANVAS */
    pre.flowchart-box {
      font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
      font-size: 0.84rem;
      line-height: 1.8;
      margin: 0;
      white-space: pre;
      color: #334155;
    }
    [data-theme="dark"] pre.flowchart-box { color: #cbd5e1; }

    /* NODES — Premium Pill Badges */
    .fc-node {
      display: inline-block;
      padding: 0.28rem 0.85rem;
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      color: #1e40af;
      border: 1.5px solid #93c5fd;
      border-radius: 10px;
      font-weight: 800;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.78rem;
      vertical-align: middle;
      box-shadow: 0 2px 8px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.8);
      transition: transform 160ms, box-shadow 160ms;
      line-height: 1.4;
      letter-spacing: -0.01em;
    }
    .fc-node:hover { transform: scale(1.03); box-shadow: 0 4px 14px rgba(37,99,235,0.22), inset 0 1px 0 rgba(255,255,255,0.8); }
    [data-theme="dark"] .fc-node {
      background: linear-gradient(135deg, #1e3a5f 0%, #1e3a8a 100%);
      color: #93c5fd;
      border-color: #2563eb;
      box-shadow: 0 2px 10px rgba(37,99,235,0.3), 0 0 0 1px rgba(147,197,253,0.1), inset 0 1px 0 rgba(255,255,255,0.05);
    }

    /* NODE YES — Success Green */
    .fc-node-yes {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%) !important;
      color: #15803d !important;
      border-color: #86efac !important;
      box-shadow: 0 2px 8px rgba(21,128,61,0.15), inset 0 1px 0 rgba(255,255,255,0.8) !important;
    }
    .fc-node-yes:hover { box-shadow: 0 4px 14px rgba(21,128,61,0.22), inset 0 1px 0 rgba(255,255,255,0.8) !important; }
    [data-theme="dark"] .fc-node-yes {
      background: linear-gradient(135deg, #064e3b 0%, #065f46 100%) !important;
      color: #34d399 !important;
      border-color: #059669 !important;
      box-shadow: 0 2px 10px rgba(5,150,105,0.35), 0 0 0 1px rgba(52,211,153,0.1) !important;
    }

    /* NODE NO — Danger Red */
    .fc-node-no {
      background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%) !important;
      color: #b91c1c !important;
      border-color: #fca5a5 !important;
      box-shadow: 0 2px 8px rgba(185,28,28,0.13), inset 0 1px 0 rgba(255,255,255,0.8) !important;
    }
    .fc-node-no:hover { box-shadow: 0 4px 14px rgba(185,28,28,0.2), inset 0 1px 0 rgba(255,255,255,0.8) !important; }
    [data-theme="dark"] .fc-node-no {
      background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%) !important;
      color: #fca5a5 !important;
      border-color: #dc2626 !important;
      box-shadow: 0 2px 10px rgba(220,38,38,0.35), 0 0 0 1px rgba(252,165,165,0.1) !important;
    }

    /* NODE WARN — Amber Warning */
    .fc-node-warn {
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%) !important;
      color: #b45309 !important;
      border-color: #fcd34d !important;
      box-shadow: 0 2px 8px rgba(180,83,9,0.13), inset 0 1px 0 rgba(255,255,255,0.8) !important;
    }
    .fc-node-warn:hover { box-shadow: 0 4px 14px rgba(180,83,9,0.2), inset 0 1px 0 rgba(255,255,255,0.8) !important; }
    [data-theme="dark"] .fc-node-warn {
      background: linear-gradient(135deg, #78350f 0%, #92400e 100%) !important;
      color: #fcd34d !important;
      border-color: #d97706 !important;
      box-shadow: 0 2px 10px rgba(217,119,6,0.35), 0 0 0 1px rgba(252,211,77,0.1) !important;
    }

    /* CONNECTOR LINES */
    .fc-line {
      color: #0f6fb4;
      font-weight: 700;
      opacity: 1;
      text-shadow: 0 0 12px rgba(15,111,180,0.35);
    }
    [data-theme="dark"] .fc-line {
      color: #38bdf8;
      text-shadow: 0 0 12px rgba(56,189,248,0.4);
    }

    /* SCROLL HINT on small screens */
    .flowchart-card-body::after {
      content: '↔ Cuộn ngang để xem đầy đủ';
      display: none;
      font-family: 'Inter', sans-serif;
      font-size: 0.7rem;
      color: var(--text-faint);
      padding: 0.5rem 0 0;
      text-align: center;
    }
    @media (max-width: 640px) { .flowchart-card-body::after { display: block; } }

    code { font-family: 'JetBrains Mono', monospace; background: var(--surface-2); padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.82em; border: 1px solid var(--border-light); }

    /* CITATION & FOOTER */
    .citation-box { background: var(--surface-2); border: 1px solid var(--border-light); border-radius: 12px; padding: 1.25rem; font-size: 0.82rem; color: var(--text-muted); line-height: 1.75; font-style: italic; }
    .page-footer { max-width: 1000px; margin: 0 auto; padding: 2rem 1.5rem 4rem; text-align: center; font-size: 0.8rem; color: var(--text-faint); border-top: 1px solid var(--border-light); }

    @media (max-width: 768px) {
      .page-content { padding: 1.25rem 1rem; }
      .sec-body { padding: 1.1rem 1rem; }
      .pillars-inner { grid-template-columns: 1fr; }
    }

    @media print {
      body { background: #fff !important; color: #000 !important; }
      .topnav, .quicknav, .topnav-theme-toggle, .page-footer, .topnav-pdf-btn { display: none !important; }
      .sec-card { break-inside: avoid; border: 1px solid #ccc !important; box-shadow: none !important; }
    }
  </style>
</head>
<body>

  <!-- TOP NAV -->
  <nav class="topnav">
    <a href="../guidelines.html" class="topnav-back">
      <i class="fa-solid fa-chevron-left"></i>
      Kho Guidelines
    </a>
    <div class="topnav-divider"></div>
    <div class="topnav-title">${titleVi}</div>
    <button class="topnav-theme-toggle topnav-pdf-btn" onclick="window.print()" title="Tải PDF / In bài viết" style="margin-left: auto; margin-right: 4px;">
      <i class="fa-solid fa-file-pdf"></i>
    </button>
    <button class="topnav-theme-toggle" id="themeToggleBtn" aria-label="Đổi giao diện">
      <i class="fa-solid fa-moon"></i>
    </button>
  </nav>

  <!-- QUICK NAV BAR -->
  <div class="quicknav">
    ${quickNavHtml}
  </div>

  <!-- HERO -->
  <div class="hero">
    <div class="hero-inner">
      <div class="hero-badge"><i class="fa-solid fa-book-journal-whills"></i> ${org} · ${year}</div>
      <h1 class="hero-title">
        ${titleEn ? `<span>${titleEn}</span>` : ''}
        ${titleVi}
      </h1>
      ${overviewHtml ? `<p class="hero-subtitle">${overviewHtml}</p>` : ''}
      <div class="hero-meta">
        <div class="hero-meta-item"><i class="fa-solid fa-calendar-check"></i> Cập nhật: ${year}</div>
        <div class="hero-meta-item"><i class="fa-solid fa-building-flag"></i> ${org}</div>
        <div class="hero-meta-item"><i class="fa-solid fa-stethoscope"></i> Chuyên khoa: ${(metadata.specialty || 'Nội khoa').toUpperCase()}</div>
      </div>
    </div>
  </div>

  <!-- PILLARS STRIP -->
  <div class="pillars">
    <div class="pillars-inner">
      ${pillarsGridHtml}
    </div>
  </div>

  <!-- MAIN CONTENT -->
  <div class="page-content">
    ${cardsHtml}

    <!-- CITATION & SOURCE -->
    <div class="sec-card">
      <div class="sec-hdr">
        <i class="fa-solid fa-bookmark sec-hdr-icon"></i>
        <h2 class="sec-title">Tài Liệu Tham Khảo Chuẩn AMA</h2>
      </div>
      <div class="sec-body">
        <div class="citation-box">
          1. ${metadata.author || org}. <em>${titleVi} (${titleEn})</em>. ${year}. DOI / Ref: ${metadata.sourceUrl || 'JCEM / Endocrine Society Guidelines'}.
        </div>
      </div>
    </div>

  </div>

  <!-- PAGE FOOTER -->
  <footer class="page-footer">
    <p>© 2026 CliniPortal — Phân hệ Y học Chứng cứ (EBM). Bản quyền tóm tắt hướng dẫn y khoa chuẩn hóa.</p>
  </footer>

  <script>
    // Theme Toggle with LocalStorage
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('cliniportal_ebm_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      htmlEl.setAttribute('data-theme', savedTheme);
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = savedTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
      }
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        themeToggleBtn.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('cliniportal_ebm_theme', newTheme);
      });
    }

    // Quicknav Active Highlight with IntersectionObserver
    const sections = document.querySelectorAll('.sec-card[id]');
    const navLinks = document.querySelectorAll('.quicknav-link');

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentId) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-10% 0px -70% 0px' });

    sections.forEach(section => navObserver.observe(section));
  </script>
</body>
</html>`;

  fs.writeFileSync(htmlOutputPath, fullHtml, 'utf8');
  console.log(`✅ Đã tạo trang HTML Flagship tóm tắt: ${htmlOutputPath}`);

  updateGuidelinesData(metadata, fileSlug, htmlFilename);
  updateKhoGuidelinesIndex(metadata, fileSlug, htmlFilename, secCards);
}

function updateKhoGuidelinesIndex(metadata, fileSlug, htmlFilename, secCards) {
  const indexPath = path.join(KHO_GUIDELINES_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) return;

  let indexContent = fs.readFileSync(indexPath, 'utf8');

  if (indexContent.includes(htmlFilename)) {
    console.log(`ℹ️ Thẻ card cho ${htmlFilename} đã tồn tại trong kho-guidelines/index.html. Giữ nguyên.`);
    return;
  }

  const titleVi = metadata.title || 'Hướng Dẫn Lâm Sàng Cập Nhật 2026';
  const summary = metadata.summary || metadata.title || '';
  const org = metadata.organization || metadata.author || 'Hội Chuyên Khoa';
  const year = metadata.year || new Date().getFullYear();
  const category = metadata.category || 'icu';

  const previewListHtml = (secCards || []).slice(0, 6).map((sec, i) => {
    return `              <li>• <a href="${htmlFilename}#${sec.id}">${i + 1}. ${sec.title.replace(/^\d+\.\s*/, '')}</a></li>`;
  }).join('\n');

  const cardHtml = `
      <!-- FILE: ${htmlFilename} -->
      <div class="toc-card" data-category="${category}" data-keywords="${slugify(titleVi).replace(/-/g, ' ')} ${year}">
        <div class="toc-card-header">
          <span class="toc-card-type type-icu"><i class="fa-solid fa-file-medical"></i> ${org}</span>
          <span class="toc-card-file">${htmlFilename}</span>
        </div>
        <div class="toc-card-body">
          <h2 class="toc-card-title">
            <a href="${htmlFilename}">${titleVi}</a>
          </h2>
          <p class="toc-card-desc">
            ${summary}
          </p>

          <!-- IN-PAGE TOC PREVIEW -->
          <div class="toc-sections-preview">
            <div class="toc-sections-title"><i class="fa-solid fa-list"></i> Các phần mục lục trong trang:</div>
            <ul class="toc-sections-list">
${previewListHtml}
            </ul>
          </div>

          <div class="toc-card-footer">
            <span>📅 Cập nhật ${year} · ${org}</span>
            <a href="${htmlFilename}" class="toc-btn">Xem chi tiết <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
`;

  const gridMarker = '<div class="guidelines-grid" id="guidelinesGrid">';
  if (indexContent.includes(gridMarker)) {
    indexContent = indexContent.replace(gridMarker, `${gridMarker}\n${cardHtml}`);
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log(`✅ Đã tự động thêm thẻ card của ${htmlFilename} vào trang chủ kho-guidelines/index.html!`);
  }
}

function updateGuidelinesData(metadata, fileSlug, htmlFilename) {
  let jsContent = fs.readFileSync(DATA_FILE_PATH, 'utf8');
  const studyId = `study_${fileSlug.replace(/-/g, '_')}`;

  const relFilePath = `kho-guidelines/${htmlFilename}`;

  if (jsContent.includes(`id: "${studyId}"`) || jsContent.includes(`id: '${studyId}'`)) {
    console.log(`ℹ️ Bản ghi ${studyId} đã tồn tại trong guidelinesdata.js. Giữ nguyên.`);
    return;
  }

  const newStudyObject = {
    id: studyId,
    title: metadata.title || "Tóm tắt Hướng Dẫn Lâm Sàng",
    drug: metadata.drug || "",
    sourceType: metadata.sourceType || "intl-guideline",
    specialty: metadata.specialty || "endo",
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
