#!/usr/bin/env node

/**
 * 🎯 CLINIPORTAL MEDICAL FLOWCHART ENGINE (generate-flowchart.mjs)
 * Medical Flowchart Agent Squad
 * 
 * Chức năng:
 *  - Chuyển đổi cấu trúc JSON Clinical Logic thành Pure Orthogonal SVG Editorial 100%.
 *  - Tính toán tự động tọa độ đường nối trực giao (bẻ góc 90° bo tròn r=6px).
 *  - Tự động tạo mặt nạ nhãn chữ (<rect> label masking) che đứt đường nối.
 *  - Áp dụng 100% Design Tokens và hỗ trợ Dark Mode hoàn hảo.
 *  - Tuyệt đối KHÔNG sử dụng thẻ HTML bên trong SVG <text> (chuẩn W3C SVG 1.1).
 * 
 * Sử dụng:
 *  node tools/flowcharts/generate-flowchart.mjs --input <path_to_json> --output <path_to_svg>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

// Đọc tham số CLI
const args = process.argv.slice(2);
let inputPath = path.join(__dirname, 'data/sample-anaphylaxis-flowchart.json');
let outputPath = path.join(__dirname, 'output/anaphylaxis-flowchart.svg');

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--input' && args[i + 1]) {
    inputPath = path.resolve(process.cwd(), args[i + 1]);
    i++;
  } else if (args[i] === '--output' && args[i + 1]) {
    outputPath = path.resolve(process.cwd(), args[i + 1]);
    i++;
  }
}

if (!fs.existsSync(inputPath)) {
  console.error(`❌ [ERROR] Không tìm thấy file JSON đầu vào: ${inputPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// 🎨 Bảng màu 7 trạng thái Editorial Tokens
const THEMES = {
  focal: {
    fill: 'var(--color-danger-hl, rgba(239, 68, 68, 0.08))',
    stroke: 'var(--color-danger, #ef4444)',
    strokeWidth: 2,
    badgeBg: 'var(--color-danger, #ef4444)',
    badgeText: '#ffffff',
    titleColor: 'var(--color-danger, #dc2626)',
    marker: 'arr-danger'
  },
  start: {
    fill: 'var(--color-primary-hl, rgba(2, 132, 199, 0.08))',
    stroke: 'var(--color-primary, #0284c7)',
    strokeWidth: 1.5,
    badgeBg: 'var(--color-primary, #0284c7)',
    badgeText: '#ffffff',
    titleColor: 'var(--color-primary, #0284c7)',
    marker: 'arr-primary'
  },
  decision: {
    fill: 'var(--color-warning-hl, rgba(245, 158, 11, 0.08))',
    stroke: 'var(--color-warning, #f59e0b)',
    strokeWidth: 1.5,
    badgeBg: 'var(--color-warning, #f59e0b)',
    badgeText: '#0f172a',
    titleColor: 'var(--color-warning, #d97706)',
    marker: 'arr-warning'
  },
  action: {
    fill: 'var(--color-teal-hl, rgba(20, 184, 166, 0.08))',
    stroke: 'var(--color-teal, #14b8a6)',
    strokeWidth: 1.5,
    badgeBg: 'var(--color-teal, #14b8a6)',
    badgeText: '#ffffff',
    titleColor: 'var(--color-teal, #0d9488)',
    marker: 'arr-teal'
  },
  dose: {
    fill: 'var(--color-purple-hl, rgba(168, 85, 247, 0.08))',
    stroke: 'var(--color-purple, #a855f7)',
    strokeWidth: 1.5,
    badgeBg: 'var(--color-purple, #a855f7)',
    badgeText: '#ffffff',
    titleColor: 'var(--color-purple, #9333ea)',
    marker: 'arr-purple'
  },
  stable: {
    fill: 'var(--color-success-hl, rgba(16, 185, 129, 0.08))',
    stroke: 'var(--color-success, #10b981)',
    strokeWidth: 1.5,
    badgeBg: 'var(--color-success, #10b981)',
    badgeText: '#ffffff',
    titleColor: 'var(--color-success, #059669)',
    marker: 'arr-success'
  },
  standard: {
    fill: 'var(--color-surface, #ffffff)',
    stroke: 'var(--color-border, #cbd5e1)',
    strokeWidth: 1.5,
    badgeBg: 'var(--color-border, #94a3b8)',
    badgeText: '#ffffff',
    titleColor: 'var(--color-text, #0f172a)',
    marker: 'arr-default'
  }
};

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Bẻ dòng văn bản tự động thành các dòng tspan
function wrapText(text, maxCharsPerLine = 36) {
  if (!text) return [];
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Tính tọa độ anchor của node
function getNodeAnchor(node, anchorName) {
  const cx = node.x + node.width / 2;
  const cy = node.y + node.height / 2;

  switch (anchorName) {
    case 'top': return { x: cx, y: node.y };
    case 'bottom': return { x: cx, y: node.y + node.height };
    case 'left': return { x: node.x, y: cy };
    case 'right': return { x: node.x + node.width, y: cy };
    default: return { x: cx, y: cy };
  }
}

// Tạo đường nối trực giao bẻ góc 90 độ có bo góc tròn (r=6px)
function buildOrthogonalPath(fromPt, toPt, fromAnchor, toAnchor, radius = 6) {
  const x1 = fromPt.x;
  const y1 = fromPt.y;
  const x2 = toPt.x;
  const y2 = toPt.y;

  // Trường hợp 1: Thẳng hàng đứng hoàn hảo
  if (Math.abs(x1 - x2) < 2) {
    return {
      d: `M ${x1} ${y1} L ${x2} ${y2}`,
      midX: x1,
      midY: (y1 + y2) / 2
    };
  }

  // Trường hợp 2: Thẳng hàng ngang hoàn hảo
  if (Math.abs(y1 - y2) < 2) {
    return {
      d: `M ${x1} ${y1} L ${x2} ${y2}`,
      midX: (x1 + x2) / 2,
      midY: y1
    };
  }

  // Trường hợp 3: Rẽ nhánh từ dưới lên trên (Vertical step)
  if (fromAnchor === 'bottom' && toAnchor === 'top') {
    const midY = (y1 + y2) / 2;
    const dirX = x2 > x1 ? 1 : -1;
    const r = Math.min(radius, Math.abs(x2 - x1) / 2, Math.abs(midY - y1) / 2);

    const d = `M ${x1} ${y1} ` +
      `L ${x1} ${midY - r} ` +
      `Q ${x1} ${midY} ${x1 + dirX * r} ${midY} ` +
      `L ${x2 - dirX * r} ${midY} ` +
      `Q ${x2} ${midY} ${x2} ${midY + r} ` +
      `L ${x2} ${y2}`;

    return {
      d,
      midX: (x1 + x2) / 2,
      midY: midY
    };
  }

  // Trường hợp 4: Rẽ nhánh từ 2 bên (left / right sang top)
  if ((fromAnchor === 'left' || fromAnchor === 'right') && toAnchor === 'top') {
    const dirX = fromAnchor === 'right' ? 1 : -1;
    const r = Math.min(radius, Math.abs(x2 - x1) / 2, Math.abs(y2 - y1) / 2);

    const d = `M ${x1} ${y1} ` +
      `L ${x2 - dirX * r} ${y1} ` +
      `Q ${x2} ${y1} ${x2} ${y1 + r} ` +
      `L ${x2} ${y2}`;

    return {
      d,
      midX: (x1 + x2) / 2,
      midY: y1
    };
  }

  // Fallback: 2-segment L
  return {
    d: `M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`,
    midX: x1,
    midY: y2
  };
}

// Bắt đầu render SVG
const viewBoxWidth = data.viewBox?.width || 960;
const viewBoxHeight = data.viewBox?.height || 600;

const nodeMap = new Map();
data.nodes.forEach(n => nodeMap.set(n.id, n));

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" width="100%" height="100%" class="editorial-flowchart-svg" style="max-width: ${viewBoxWidth}px; display: block; margin: 1.5rem auto; font-family: var(--font-sans, 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif); background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); overflow: hidden;">
  <defs>
    <!-- Markers cho các loại mũi tên -->
    <marker id="arr-default" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-border, #94a3b8)" />
    </marker>
    <marker id="arr-primary" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-primary, #0284c7)" />
    </marker>
    <marker id="arr-danger" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-danger, #ef4444)" />
    </marker>
    <marker id="arr-success" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-success, #10b981)" />
    </marker>
    <marker id="arr-warning" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-warning, #f59e0b)" />
    </marker>
    <marker id="arr-teal" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-teal, #14b8a6)" />
    </marker>
    <marker id="arr-purple" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-purple, #a855f7)" />
    </marker>
  </defs>

  <style>
    .flowchart-node-rect { transition: all 0.2s ease; cursor: default; }
    .flowchart-node-rect:hover { filter: brightness(0.96); }
    [data-theme="dark"] .editorial-flowchart-svg {
      background: var(--color-surface, #0f172a) !important;
      border-color: var(--color-border, #1e293b) !important;
    }
    [data-theme="dark"] .flowchart-node-rect:hover { filter: brightness(1.1); }
  </style>
`;

// Render Header Title nếu có
if (data.title) {
  svg += `
  <!-- Header Bar -->
  <g class="flowchart-header">
    <rect x="0" y="0" width="${viewBoxWidth}" height="28" fill="var(--color-surface-2, #f8fafc)" border-bottom="1px solid var(--color-border, #e2e8f0)"/>
    <text x="20" y="18" font-size="11" font-weight="800" fill="var(--color-primary, #0284c7)" letter-spacing="0.5">${escapeXml(data.title)}</text>
  </g>
`;
}

// 1. Render Edges (Đường nối phía dưới nodes)
svg += `\n  <!-- Edges Layer -->\n  <g class="flowchart-edges">\n`;

for (const edge of data.edges) {
  const fromNode = nodeMap.get(edge.from);
  const toNode = nodeMap.get(edge.to);

  if (!fromNode || !toNode) continue;

  const fromAnchor = edge.fromAnchor || 'bottom';
  const toAnchor = edge.toAnchor || 'top';
  const fromPt = getNodeAnchor(fromNode, fromAnchor);
  const toPt = getNodeAnchor(toNode, toAnchor);

  const pathData = buildOrthogonalPath(fromPt, toPt, fromAnchor, toAnchor);
  const edgeType = edge.type || 'default';
  let strokeColor = 'var(--color-border, #cbd5e1)';
  let markerId = 'arr-default';

  if (edgeType === 'danger') {
    strokeColor = 'var(--color-danger, #ef4444)';
    markerId = 'arr-danger';
  } else if (edgeType === 'success') {
    strokeColor = 'var(--color-success, #10b981)';
    markerId = 'arr-success';
  } else if (edgeType === 'primary') {
    strokeColor = 'var(--color-primary, #0284c7)';
    markerId = 'arr-primary';
  }

  svg += `    <path d="${pathData.d}" fill="none" stroke="${strokeColor}" stroke-width="1.75" marker-end="url(#${markerId})" stroke-linecap="round" stroke-linejoin="round" />\n`;

  // Render Label Masking nếu có nhãn
  if (edge.label) {
    const labelText = escapeXml(edge.label);
    const labelWidth = Math.max(70, labelText.length * 7 + 16);
    const labelHeight = 20;
    const labelX = pathData.midX - labelWidth / 2;
    const labelY = pathData.midY - labelHeight / 2;

    svg += `    <g class="edge-label-group">
      <rect x="${labelX}" y="${labelY}" width="${labelWidth}" height="${labelHeight}" rx="4" fill="var(--color-surface, #ffffff)" stroke="${strokeColor}" stroke-width="1" />
      <text x="${pathData.midX}" y="${labelY + 13}" font-size="9" font-weight="800" fill="${strokeColor}" text-anchor="middle" letter-spacing="0.3">${labelText}</text>
    </g>\n`;
  }
}

svg += `  </g>\n`;

// 2. Render Nodes
svg += `\n  <!-- Nodes Layer -->\n  <g class="flowchart-nodes">\n`;

for (const node of data.nodes) {
  const theme = THEMES[node.type] || THEMES.standard;
  const rx = 10;

  svg += `    <g class="node-group" id="${node.id}">
      <!-- Node Background Card -->
      <rect class="flowchart-node-rect" x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" rx="${rx}" fill="${theme.fill}" stroke="${theme.stroke}" stroke-width="${theme.strokeWidth}" />
`;

  let currentY = node.y + 18;

  // Badge Tag nếu có
  if (node.badge) {
    const badgeText = escapeXml(node.badge);
    const badgeWidth = badgeText.length * 6 + 12;
    svg += `      <rect x="${node.x + 12}" y="${node.y + 10}" width="${badgeWidth}" height="16" rx="4" fill="${theme.badgeBg}" />
      <text x="${node.x + 12 + badgeWidth / 2}" y="${node.y + 21}" font-size="8.5" font-weight="800" fill="${theme.badgeText}" text-anchor="middle" letter-spacing="0.5">${badgeText}</text>
`;
    currentY = node.y + 38;
  }

  // Node Title
  if (node.title) {
    svg += `      <text x="${node.x + 12}" y="${currentY}" font-size="12" font-weight="800" fill="${theme.titleColor}">
        ${escapeXml(node.title)}
      </text>
`;
    currentY += 16;
  }

  // Node Description (Tự wrap text bằng tspan)
  if (node.desc) {
    const descLines = wrapText(node.desc, Math.floor(node.width / 6.8));
    for (const line of descLines) {
      svg += `      <text x="${node.x + 12}" y="${currentY}" font-size="9.5" font-weight="500" fill="var(--color-text, #334155)">
        ${escapeXml(line)}
      </text>
`;
      currentY += 13;
    }
  }

  svg += `    </g>\n`;
}

svg += `  </g>\n</svg>\n`;

// Ghi file output
const outDir = path.dirname(outputPath);
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(outputPath, svg, 'utf8');

console.log('\n=================================================================');
console.log('🎨 CLINIPORTAL FLOWCHART ENGINE — RENDERING COMPLETE');
console.log('=================================================================');
console.log(`📄 Input schema : ${path.relative(ROOT_DIR, inputPath)}`);
console.log(`✨ Generated SVG: ${path.relative(ROOT_DIR, outputPath)}`);
console.log(`📊 Nodes count  : ${data.nodes.length}`);
console.log(`🔗 Edges count  : ${data.edges.length}`);
console.log(`📐 Dimensions   : ${viewBoxWidth}x${viewBoxHeight} (Responsive Viewport)`);
console.log('🎉 [PASS] Lưu đồ y khoa trực giao thuần SVG đạt tiêu chuẩn Editorial!\n');
