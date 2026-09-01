/**
 * CliniPortal ASCII to Pure Orthogonal SVG Converter (v2.0)
 * Converts ASCII/Text diagrams in MDX files into responsive, dark-mode ready Pure SVG flowcharts.
 */
const fs = require('fs');
const path = require('path');

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Determine node theme based on text content
function getNodeTheme(text) {
  const t = text.toLowerCase();
  if (t.includes('tử vong') || t.includes('nguy hiểm') || t.includes('sốc') || t.includes('chết') ||
      t.includes('hoại tử') || t.includes('đột biến') || t.includes('kháng') || t.includes('nặng') ||
      t.includes('loét') || t.includes('nhồi máu') || t.includes('đột quỵ') || t.includes('suy tim') ||
      t.includes('hôn mê') || t.includes('huyết khối') || t.includes('vỡ') || t.includes('tắc nghẽn') ||
      t.includes('chống chỉ định') || t.includes('ngộ độc') || t.includes('độc tính')) {
    return {
      fill: 'var(--red-bg, #fef2f2)',
      stroke: 'var(--red, #ef4444)',
      titleColor: 'var(--red, #dc2626)',
      textColor: 'var(--color-text, #0f172a)',
      marker: 'arrRed'
    };
  }
  if (t.includes('khống chế') || t.includes('hồi phục') || t.includes('bình thường') || t.includes('ổn định') ||
      t.includes('bảo vệ') || t.includes('tiêu chuẩn') || t.includes('dương tính') || t.includes('thành công') ||
      t.includes('điều trị') || t.includes('đích') || t.includes('lành') || t.includes('sống sót')) {
    return {
      fill: 'rgba(16, 185, 129, 0.08)',
      stroke: 'var(--color-success, #10b981)',
      titleColor: 'var(--color-success, #10b981)',
      textColor: 'var(--color-text, #0f172a)',
      marker: 'arrGreen'
    };
  }
  if (t.includes('cảnh báo') || t.includes('trung gian') || t.includes('tăng') || t.includes('giảm') ||
      t.includes('rối loạn') || t.includes('bù trừ') || t.includes('kích hoạt') || t.includes('phản ứng') ||
      t.includes('ức chế') || t.includes('âm tính') || t.includes('nghi ngờ') || t.includes('tiến triển') ||
      t.includes('tái hoạt') || t.includes('yếu tố') || t.includes('nguyên nhân')) {
    return {
      fill: 'var(--amber-bg, #fffbeb)',
      stroke: 'var(--amber, #f59e0b)',
      titleColor: 'var(--amber, #d97706)',
      textColor: 'var(--color-text, #0f172a)',
      marker: 'arrAmber'
    };
  }
  if (t.includes('tổng quan') || t.includes('phương trình') || t.includes('cơ chế') || t.includes('quy trình') ||
      t.includes('chu kỳ') || t.includes('giai đoạn') || t.includes('bước') || t.includes('chẩn đoán') ||
      t.includes('tiếp cận') || t.includes('phân loại') || t.includes('diễn tiến') || t.includes('sinh lý')) {
    return {
      fill: 'var(--blue-bg, #eff6ff)',
      stroke: 'var(--blue, #0284c7)',
      titleColor: 'var(--color-primary, #0284c7)',
      textColor: 'var(--color-text, #0f172a)',
      marker: 'arrBlue'
    };
  }
  return {
    fill: 'var(--color-surface-2, #f8fafc)',
    stroke: 'var(--color-border, #cbd5e1)',
    titleColor: 'var(--color-text, #0f172a)',
    textColor: 'var(--color-text-muted, #475569)',
    marker: 'arrBlue'
  };
}

// Wrap text into formatted lines where only first line gets bullet
function wrapBulletItem(text, maxCharsPerLine = 42) {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length <= maxCharsPerLine) {
      cur = (cur + ' ' + w).trim();
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines.map((l, idx) => (idx === 0 ? `• ${l}` : `  ${l}`));
}

function wrapTitleText(text, maxCharsPerLine = 55) {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length <= maxCharsPerLine) {
      cur = (cur + ' ' + w).trim();
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function parseAsciiDiagram(rawText, sectionHeading = '') {
  const rawLines = rawText.split(/\r?\n/).map(l => l.trimEnd());
  const cleanLines = rawLines.filter(l => l.trim().length > 0);
  
  if (cleanLines.length === 0) return null;

  const items = [];
  let currentItem = null;

  for (let idx = 0; idx < rawLines.length; idx++) {
    const line = rawLines[idx];
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check connector only line (e.g. │, ▼, ┌──┴──┐, └──┬──┘, --->)
    if (/^[│|▼▲↓↑➔→←┌┐└┘├┤─\-\+\s\.\(\)\/]+$/.test(trimmed) && !trimmed.includes('[') && !/[a-zA-ZÀ-ỹ0-9]{3,}/.test(trimmed)) {
      if (trimmed.includes('┌') && trimmed.includes('┐')) {
        items.push({ type: 'split' });
      } else if (trimmed.includes('└') && trimmed.includes('┘')) {
        items.push({ type: 'merge' });
      } else if (trimmed.includes('▼') || trimmed.includes('│') || trimmed.includes('➔')) {
        const anno = trimmed.replace(/[│|▼▲↓↑➔→←┌┐└┘├┤─\-\+\s]/g, '').trim();
        items.push({ type: 'arrow', label: anno });
      }
      continue;
    }

    // Check if line contains 2 or 3 parallel bracket boxes
    const brackets = [];
    const re = /\[([^\]]+)\]/g;
    let m;
    while ((m = re.exec(line)) !== null) {
      brackets.push({ text: m[1].trim(), index: m.index });
    }

    if (brackets.length === 2) {
      items.push({
        type: 'two-columns',
        leftTitle: brackets[0].text,
        rightTitle: brackets[1].text,
        leftLines: [],
        rightLines: []
      });
      currentItem = items[items.length - 1];
      continue;
    }

    if (brackets.length === 3) {
      items.push({
        type: 'three-columns',
        col1Title: brackets[0].text,
        col2Title: brackets[1].text,
        col3Title: brackets[2].text,
        col1Lines: [],
        col2Lines: [],
        col3Lines: []
      });
      currentItem = items[items.length - 1];
      continue;
    }

    if (brackets.length === 1) {
      const nodeText = brackets[0].text;
      items.push({
        type: 'single-node',
        title: nodeText,
        lines: []
      });
      currentItem = items[items.length - 1];
      continue;
    }

    // Bullets or sub-lines under current item
    if (currentItem) {
      if (currentItem.type === 'single-node') {
        const cleanSub = trimmed.replace(/^[\-\•\*\>\s]+/, '').trim();
        if (cleanSub && !cleanSub.startsWith('│') && !cleanSub.startsWith('┌') && !cleanSub.startsWith('└')) {
          currentItem.lines.push(cleanSub);
        }
      } else if (currentItem.type === 'two-columns') {
        const mid = Math.floor(line.length / 2);
        const leftPart = line.substring(0, mid).trim().replace(/^[\-\•\*\>\s│|]+/, '').replace(/[│|]+$/, '').trim();
        const rightPart = line.substring(mid).trim().replace(/^[\-\•\*\>\s│|]+/, '').replace(/[│|]+$/, '').trim();
        if (leftPart) currentItem.leftLines.push(leftPart);
        if (rightPart) currentItem.rightLines.push(rightPart);
      } else if (currentItem.type === 'three-columns') {
        const third = Math.floor(line.length / 3);
        const p1 = line.substring(0, third).trim().replace(/^[\-\•\*\>\s│|]+/, '').trim();
        const p2 = line.substring(third, third * 2).trim().replace(/^[\-\•\*\>\s│|]+/, '').trim();
        const p3 = line.substring(third * 2).trim().replace(/^[\-\•\*\>\s│|]+/, '').trim();
        if (p1) currentItem.col1Lines.push(p1);
        if (p2) currentItem.col2Lines.push(p2);
        if (p3) currentItem.col3Lines.push(p3);
      }
    } else {
      const cleanLine = trimmed.replace(/^[\-\•\*\>\s│|]+/, '').trim();
      if (cleanLine.length > 2 && !cleanLine.startsWith('┌') && !cleanLine.startsWith('└')) {
        items.push({
          type: 'single-node',
          title: cleanLine,
          lines: []
        });
        currentItem = items[items.length - 1];
      }
    }
  }

  const cleanItems = items.filter(it => {
    if (it.type === 'arrow' || it.type === 'split' || it.type === 'merge') return true;
    if (it.type === 'single-node') return it.title && it.title.length > 0;
    if (it.type === 'two-columns') return it.leftTitle || it.rightTitle;
    if (it.type === 'three-columns') return it.col1Title || it.col2Title || it.col3Title;
    return true;
  });

  if (cleanItems.length === 0) return null;

  let title = '';
  const firstBracket = rawText.match(/\[([^\]]+)\]/);
  if (firstBracket) {
    title = firstBracket[1].replace(/^[0-9\.\s]+/, '').trim();
  }
  if (!title && sectionHeading) {
    title = sectionHeading.replace(/^#+\s*/, '').replace(/\{#[^\}]+\}/, '').trim();
  }
  if (!title) title = 'SƠ ĐỒ CƠ CHẾ LÂM SÀNG';

  return generateSvgFromItems(cleanItems, title);
}

function generateSvgFromItems(items, title) {
  const width = 880;
  let curY = 20;
  const elements = [];

  let lastNodeBottom = null;
  let lastNodeCenterX = width / 2;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.type === 'arrow' || item.type === 'split' || item.type === 'merge') {
      continue;
    }

    if (item.type === 'single-node') {
      const theme = getNodeTheme(item.title + ' ' + (item.lines || []).join(' '));
      const titleLines = wrapTitleText(item.title, 55);
      const subLines = (item.lines || []).flatMap(l => wrapBulletItem(l, 60));
      
      const nodeH = Math.max(46, 24 + titleLines.length * 18 + subLines.length * 18);
      const maxLineLen = Math.max(...titleLines.map(l => l.length), ...subLines.map(l => l.length * 0.85));
      const nodeW = Math.min(740, Math.max(380, maxLineLen * 10 + 40));
      const nodeX = (width - nodeW) / 2;

      if (lastNodeBottom !== null) {
        const arrowY1 = lastNodeBottom;
        const arrowY2 = curY;
        elements.push(`
      <line x1="${lastNodeCenterX}" y1="${arrowY1}" x2="${lastNodeCenterX}" y2="${arrowY2}" stroke="#0284c7" stroke-width="1.8" marker-end="url(#arrBlue)"/>`);
      }

      elements.push(`
      <!-- Single Node: ${escapeXml(item.title.substring(0, 30))} -->
      <rect x="${nodeX}" y="${curY}" width="${nodeW}" height="${nodeH}" rx="10" fill="${theme.fill}" stroke="${theme.stroke}" stroke-width="1.8"/>`);

      let textY = curY + 22;
      for (let tIdx = 0; tIdx < titleLines.length; tIdx++) {
        const isBold = tIdx === 0;
        elements.push(`
      <text x="${nodeX + nodeW / 2}" y="${textY}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="${isBold ? '800' : '600'}" font-size="12" fill="${theme.titleColor}">${escapeXml(titleLines[tIdx])}</text>`);
        textY += 18;
      }

      if (subLines.length > 0) {
        textY += 4;
        for (const sLine of subLines) {
          elements.push(`
      <text x="${nodeX + 24}" y="${textY}" text-anchor="start" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${theme.textColor}">${escapeXml(sLine)}</text>`);
          textY += 18;
        }
      }

      lastNodeBottom = curY + nodeH;
      lastNodeCenterX = width / 2;
      curY += nodeH + 28;
    }
    else if (item.type === 'two-columns') {
      const leftTheme = getNodeTheme(item.leftTitle + ' ' + (item.leftLines || []).join(' '));
      const rightTheme = getNodeTheme(item.rightTitle + ' ' + (item.rightLines || []).join(' '));

      const leftTitleLines = wrapTitleText(item.leftTitle || '', 34);
      const rightTitleLines = wrapTitleText(item.rightTitle || '', 34);

      const leftSubLines = (item.leftLines || []).flatMap(l => wrapBulletItem(l, 38));
      const rightSubLines = (item.rightLines || []).flatMap(l => wrapBulletItem(l, 38));

      const leftH = Math.max(90, 26 + leftTitleLines.length * 18 + leftSubLines.length * 18);
      const rightH = Math.max(90, 26 + rightTitleLines.length * 18 + rightSubLines.length * 18);
      const colH = Math.max(leftH, rightH);

      const colW = 390;
      const leftX = 40;
      const rightX = width - colW - 40;

      if (lastNodeBottom !== null) {
        const splitY = lastNodeBottom + 14;
        elements.push(`
      <!-- Bifurcation Path -->
      <path d="M ${lastNodeCenterX} ${lastNodeBottom} L ${lastNodeCenterX} ${splitY} L ${leftX + colW / 2} ${splitY} L ${leftX + colW / 2} ${curY}" fill="none" stroke="${leftTheme.stroke}" stroke-width="1.8" marker-end="url(#${leftTheme.marker})"/>
      <path d="M ${lastNodeCenterX} ${splitY} L ${rightX + colW / 2} ${splitY} L ${rightX + colW / 2} ${curY}" fill="none" stroke="${rightTheme.stroke}" stroke-width="1.8" marker-end="url(#${rightTheme.marker})"/>`);
      }

      // Left Column
      elements.push(`
      <!-- Left Column: ${escapeXml((item.leftTitle || '').substring(0, 30))} -->
      <rect x="${leftX}" y="${curY}" width="${colW}" height="${colH}" rx="10" fill="${leftTheme.fill}" stroke="${leftTheme.stroke}" stroke-width="1.5"/>`);
      let leftY = curY + 22;
      for (const tLine of leftTitleLines) {
        elements.push(`
      <text x="${leftX + colW / 2}" y="${leftY}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="12" fill="${leftTheme.titleColor}">${escapeXml(tLine)}</text>`);
        leftY += 18;
      }
      elements.push(`
      <line x1="${leftX + 20}" y1="${leftY - 4}" x2="${leftX + colW - 20}" y2="${leftY - 4}" stroke="var(--color-border, #cbd5e1)" stroke-width="1"/>`);
      leftY += 12;
      for (const sLine of leftSubLines) {
        elements.push(`
      <text x="${leftX + 20}" y="${leftY}" text-anchor="start" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${leftTheme.textColor}">${escapeXml(sLine)}</text>`);
        leftY += 18;
      }

      // Right Column
      elements.push(`
      <!-- Right Column: ${escapeXml((item.rightTitle || '').substring(0, 30))} -->
      <rect x="${rightX}" y="${curY}" width="${colW}" height="${colH}" rx="10" fill="${rightTheme.fill}" stroke="${rightTheme.stroke}" stroke-width="1.5"/>`);
      let rightY = curY + 22;
      for (const tLine of rightTitleLines) {
        elements.push(`
      <text x="${rightX + colW / 2}" y="${rightY}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="12" fill="${rightTheme.titleColor}">${escapeXml(tLine)}</text>`);
        rightY += 18;
      }
      elements.push(`
      <line x1="${rightX + 20}" y1="${rightY - 4}" x2="${rightX + colW - 20}" y2="${rightY - 4}" stroke="var(--color-border, #cbd5e1)" stroke-width="1"/>`);
      rightY += 12;
      for (const sLine of rightSubLines) {
        elements.push(`
      <text x="${rightX + 20}" y="${rightY}" text-anchor="start" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="${rightTheme.textColor}">${escapeXml(sLine)}</text>`);
        rightY += 18;
      }

      if (i + 1 < items.length && items[i + 1].type === 'single-node') {
        const mergeY = curY + colH + 16;
        const nextNodeY = curY + colH + 32;
        elements.push(`
      <!-- Reconvergence Path -->
      <path d="M ${leftX + colW / 2} ${curY + colH} L ${leftX + colW / 2} ${mergeY} L ${width / 2} ${mergeY} L ${width / 2} ${nextNodeY}" fill="none" stroke="#059669" stroke-width="1.8" marker-end="url(#arrGreen)"/>
      <path d="M ${rightX + colW / 2} ${curY + colH} L ${rightX + colW / 2} ${mergeY} L ${width / 2} ${mergeY}" fill="none" stroke="#059669" stroke-width="1.8"/>`);
        lastNodeBottom = null;
        curY = nextNodeY;
      } else {
        lastNodeBottom = curY + colH;
        curY += colH + 28;
      }
      lastNodeCenterX = width / 2;
    }
    else if (item.type === 'three-columns') {
      const c1Theme = getNodeTheme(item.col1Title + ' ' + (item.col1Lines || []).join(' '));
      const c2Theme = getNodeTheme(item.col2Title + ' ' + (item.col2Lines || []).join(' '));
      const c3Theme = getNodeTheme(item.col3Title + ' ' + (item.col3Lines || []).join(' '));

      const c1H = Math.max(90, 26 + (item.col1Lines || []).length * 18);
      const c2H = Math.max(90, 26 + (item.col2Lines || []).length * 18);
      const c3H = Math.max(90, 26 + (item.col3Lines || []).length * 18);
      const colH = Math.max(c1H, c2H, c3H);

      const colW = 250;
      const x1 = 30;
      const x2 = 315;
      const x3 = 600;

      if (lastNodeBottom !== null) {
        const splitY = lastNodeBottom + 14;
        elements.push(`
      <path d="M ${lastNodeCenterX} ${lastNodeBottom} L ${lastNodeCenterX} ${splitY} L ${x1 + colW / 2} ${splitY} L ${x1 + colW / 2} ${curY}" fill="none" stroke="${c1Theme.stroke}" stroke-width="1.8" marker-end="url(#${c1Theme.marker})"/>
      <path d="M ${lastNodeCenterX} ${splitY} L ${x2 + colW / 2} ${splitY} L ${x2 + colW / 2} ${curY}" fill="none" stroke="${c2Theme.stroke}" stroke-width="1.8" marker-end="url(#${c2Theme.marker})"/>
      <path d="M ${lastNodeCenterX} ${splitY} L ${x3 + colW / 2} ${splitY} L ${x3 + colW / 2} ${curY}" fill="none" stroke="${c3Theme.stroke}" stroke-width="1.8" marker-end="url(#${c3Theme.marker})"/>`);
      }

      [[x1, item.col1Title, item.col1Lines, c1Theme], [x2, item.col2Title, item.col2Lines, c2Theme], [x3, item.col3Title, item.col3Lines, c3Theme]].forEach(([cx, cTitle, cLines, cTh]) => {
        elements.push(`
      <rect x="${cx}" y="${curY}" width="${colW}" height="${colH}" rx="8" fill="${cTh.fill}" stroke="${cTh.stroke}" stroke-width="1.5"/>
      <text x="${cx + colW / 2}" y="${curY + 22}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11.5" fill="${cTh.titleColor}">${escapeXml(cTitle)}</text>
      <line x1="${cx + 15}" y1="${curY + 30}" x2="${cx + colW - 15}" y2="${curY + 30}" stroke="var(--color-border, #cbd5e1)" stroke-width="1"/>`);
        let sy = curY + 46;
        (cLines || []).forEach(sl => {
          elements.push(`
      <text x="${cx + 12}" y="${sy}" text-anchor="start" font-family="'Plus Jakarta Sans', sans-serif" font-size="10.5" fill="${cTh.textColor}">• ${escapeXml(sl)}</text>`);
          sy += 18;
        });
      });

      lastNodeBottom = curY + colH;
      curY += colH + 28;
      lastNodeCenterX = width / 2;
    }
  }

  const totalH = curY + 10;

  return `
<div class="flowchart-card">
  <div class="flowchart-header">
    <div class="flowchart-title"><i class="fa-solid fa-route" style="color: var(--color-primary, #0284c7);"></i> SƠ ĐỒ LÂM SÀNG: ${escapeXml(title)}</div>
    <span class="badge badge-blue">Pure Orthogonal SVG</span>
  </div>
  <div class="flowchart-svg-container">
    <svg class="flowchart-svg" viewBox="0 0 ${width} ${totalH}" width="${width}" height="${totalH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7"/>
        </marker>
        <marker id="arrGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669"/>
        </marker>
        <marker id="arrAmber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706"/>
        </marker>
        <marker id="arrRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
        </marker>
      </defs>
${elements.join('')}
    </svg>
  </div>
</div>`;
}

// Convert a whole MDX file
function convertFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let updated = content;
  let count = 0;

  // Regex to match code blocks without language tag that have ASCII diagram markers
  const blockRegex = /```(?:\w+)?\r?\n([\s\S]*?)```/g;
  
  const replacements = [];
  let match;
  while ((match = blockRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const innerText = match[1];

    const firstLine = fullMatch.split(/\r?\n/)[0];
    const lang = firstLine.replace('```', '').trim().toLowerCase();
    if (['js', 'ts', 'javascript', 'typescript', 'json', 'html', 'css', 'bash', 'sh', 'sql', 'python', 'yaml'].includes(lang)) {
      continue;
    }

    if (innerText.includes('│') || innerText.includes('▼') || innerText.includes('┌') ||
        (innerText.includes('[') && innerText.includes(']') && (innerText.includes('->') || innerText.includes('➔') || innerText.includes('──►') || innerText.includes('===>')))) {
      
      const textBefore = content.substring(0, match.index);
      const headingMatches = [...textBefore.matchAll(/##+\s+([^\r\n]+)/g)];
      const lastHeading = headingMatches.length > 0 ? headingMatches[headingMatches.length - 1][1] : '';

      const svgHtml = parseAsciiDiagram(innerText, lastHeading);
      if (svgHtml) {
        replacements.push({ target: fullMatch, replacement: svgHtml });
      }
    }
  }

  if (replacements.length === 0) return 0;

  for (const rep of replacements) {
    updated = updated.replace(rep.target, rep.replacement);
    count++;
  }

  fs.writeFileSync(filePath, updated, 'utf8');
  return count;
}

// Process directory
function processDirectory(dirPath) {
  function getFiles(d) {
    let r = [];
    fs.readdirSync(d).forEach(f => {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) r = r.concat(getFiles(p));
      else if (f.endsWith('.mdx')) r.push(p);
    });
    return r;
  }

  const files = getFiles(dirPath);
  let totalFiles = 0;
  let totalDiagrams = 0;

  files.forEach(f => {
    try {
      const c = convertFile(f);
      if (c > 0) {
        totalFiles++;
        totalDiagrams += c;
        console.log(`[CONVERTED] ${path.relative('d:/Apps/Apps_ykhoa', f)} (${c} diagrams)`);
      }
    } catch (err) {
      console.error(`[ERROR] ${f}:`, err.message);
    }
  });

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total Files Converted: ${totalFiles}`);
  console.log(`Total Diagrams Converted: ${totalDiagrams}`);
}

module.exports = { convertFile, processDirectory, parseAsciiDiagram };

if (require.main === module) {
  const targetDir = process.argv[2] || 'd:/Apps/Apps_ykhoa/src/content/basic-medical';
  console.log('Processing directory:', targetDir);
  processDirectory(targetDir);
}
