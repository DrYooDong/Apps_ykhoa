/**
 * CliniPortal 2.0 — Protocol Flowchart Generator Engine
 * Path: src/content/protocols/protocol-flowchart-engine.ts
 *
 * Tự động chuyển đổi các bước (steps[]) của ClinicalProtocol thành SVG Flowchart trực giao chuẩn Editorial.
 */

import { ClinicalProtocol, ProtocolStep } from './protocol-types';

export interface FlowchartRenderNode {
  id: string;
  stepOrder: number;
  label: string;
  subLabel?: string;
  phase: string;
  type: 'start' | 'decision' | 'action' | 'alert' | 'stable';
  x: number;
  y: number;
  width: number;
  height: number;
  details: string;
  timeframe?: string;
  drugsCount?: number;
}

export interface FlowchartRenderEdge {
  from: string;
  to: string;
  label?: string;
  isYes?: boolean;
}

/**
 * Tự động tính toán tọa độ lưới (Auto-layout Grid) cho các bước phác đồ
 */
export function generateFlowchartData(protocol: ClinicalProtocol): { nodes: FlowchartRenderNode[]; edges: FlowchartRenderEdge[] } {
  const steps = protocol.steps || [];
  const nodes: FlowchartRenderNode[] = [];
  const edges: FlowchartRenderEdge[] = [];

  const startY = 30;
  const nodeHeight = 65;
  const nodeWidth = 260;
  const verticalGap = 45;

  // Lưới 3 cột: Cột 0 (Trái - Alert / Refractory: x=40), Cột 1 (Giữa - Main Line: x=350), Cột 2 (Phải - Stable / Outpatient: x=660)
  const colX = {
    left: 40,
    center: 350,
    right: 660,
  };

  steps.forEach((step, index) => {
    let col = 'center';
    let nodeType: 'start' | 'decision' | 'action' | 'alert' | 'stable' = step.flowchartNodeType || 'action';

    if (step.phase === 'triage') {
      nodeType = index === 0 ? 'start' : 'decision';
      col = 'center';
    } else if (step.phase === 'refractory' || step.isAlert) {
      nodeType = 'alert';
      col = 'left';
    } else if (step.phase === 'recovery' || (step.title && step.title.includes('Ngoại trú'))) {
      nodeType = 'stable';
      col = 'right';
    } else {
      nodeType = 'action';
      col = 'center';
    }

    const currentY = startY + index * (nodeHeight + verticalGap);

    const renderNode: FlowchartRenderNode = {
      id: step.stepId,
      stepOrder: step.order,
      label: step.title,
      subLabel: step.timeframe ? `[${step.timeframe}] ${step.conditionIf || ''}` : step.conditionIf,
      phase: step.phase,
      type: nodeType,
      x: colX[col as keyof typeof colX],
      y: currentY,
      width: nodeWidth,
      height: nodeHeight,
      details: step.description,
      timeframe: step.timeframe,
      drugsCount: step.drugs ? step.drugs.length : 0,
    };

    nodes.push(renderNode);

    // Sinh Edges tuần tự
    if (index > 0) {
      const prevNode = nodes[index - 1]!;
      edges.push({
        from: prevNode.id,
        to: renderNode.id,
        label: step.conditionIf ? (step.conditionIf.length > 25 ? step.conditionIf.substring(0, 22) + '...' : step.conditionIf) : 'Tiếp theo',
        isYes: step.phase === 'refractory' ? true : undefined,
      });
    }
  });

  return { nodes, edges };
}

/**
 * Render chuỗi SVG hoàn chỉnh
 */
export function renderProtocolSvg(protocol: ClinicalProtocol, activeStepId?: string): string {
  const { nodes, edges } = generateFlowchartData(protocol);
  if (nodes.length === 0) return '<div class="empty-svg">Chưa có dữ liệu bước phác đồ</div>';

  const maxY = Math.max(...nodes.map(n => n.y + n.height)) + 50;
  const viewBoxHeight = Math.max(maxY, 450);
  const nodeMap = new Map<string, FlowchartRenderNode>();
  nodes.forEach(n => nodeMap.set(n.id, n));

  // 1. Render Edges (Đường nối Trực giao 90° bo cong Q)
  const edgesSvg = edges.map(e => {
    const from = nodeMap.get(e.from);
    const to = nodeMap.get(e.to);
    if (!from || !to) return '';

    const fx = from.x + from.width / 2;
    const fy = from.y + from.height;
    const tx = to.x + to.width / 2;
    const ty = to.y;

    let pathD = '';
    let labelX = (fx + tx) / 2;
    let labelY = (fy + ty) / 2;

    if (Math.abs(fx - tx) < 15) {
      pathD = `M ${fx} ${fy} L ${tx} ${ty}`;
    } else {
      const midY = fy + (ty - fy) / 2;
      pathD = `M ${fx} ${fy} L ${fx} ${midY - 6} Q ${fx} ${midY} ${fx + (tx > fx ? 6 : -6)} ${midY} L ${tx + (tx > fx ? -6 : 6)} ${midY} Q ${tx} ${midY} ${tx} ${midY + 6} L ${tx} ${ty}`;
      labelX = (fx + tx) / 2;
      labelY = midY;
    }

    const isActive = activeStepId && (e.from === activeStepId || e.to === activeStepId);
    const strokeColor = isActive ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #cbd5e1)';
    const strokeWidth = isActive ? '2.5' : '1.5';

    let labelSvg = '';
    if (e.label && e.label !== 'Tiếp theo') {
      const rectW = Math.max(e.label.length * 6.5 + 14, 50);
      labelSvg = `
        <g>
          <rect x="${labelX - rectW / 2}" y="${labelY - 10}" width="${rectW}" height="20" rx="4" fill="var(--color-surface, #ffffff)" stroke="${strokeColor}" stroke-width="0.75" />
          <text x="${labelX}" y="${labelY + 4}" font-size="10" font-weight="700" fill="${e.isYes ? '#ef4444' : 'var(--color-text, #0f172a)'}" text-anchor="middle">
            ${escapeSvg(e.label)}
          </text>
        </g>
      `;
    }

    return `
      <g class="flowchart-edge">
        <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" marker-end="url(#proto-arrowhead)" />
        ${labelSvg}
      </g>
    `;
  }).join('');

  // 2. Render Nodes
  const nodesSvg = nodes.map(n => {
    const isActive = activeStepId === n.id;
    let strokeColor = 'var(--color-border, #e2e8f0)';
    let fillColor = 'var(--color-surface, #ffffff)';
    let titleColor = 'var(--color-text, #0f172a)';
    let badgeBg = 'rgba(2, 132, 199, 0.1)';
    let badgeText = '#0284c7';

    if (n.type === 'start') {
      strokeColor = 'var(--color-primary, #0284c7)';
      titleColor = 'var(--color-primary, #0284c7)';
      badgeBg = 'rgba(2, 132, 199, 0.15)';
      badgeText = '#0284c7';
    } else if (n.type === 'alert') {
      strokeColor = '#ef4444';
      fillColor = 'rgba(239, 68, 68, 0.04)';
      titleColor = '#ef4444';
      badgeBg = 'rgba(239, 68, 68, 0.15)';
      badgeText = '#ef4444';
    } else if (n.type === 'stable') {
      strokeColor = '#10b981';
      titleColor = '#059669';
      badgeBg = 'rgba(16, 185, 129, 0.15)';
      badgeText = '#059669';
    } else if (n.type === 'decision') {
      strokeColor = '#f59e0b';
      titleColor = '#b45309';
      badgeBg = 'rgba(245, 158, 11, 0.15)';
      badgeText = '#b45309';
    } else {
      strokeColor = '#0d9488';
      titleColor = '#0d9488';
      badgeBg = 'rgba(13, 148, 136, 0.15)';
      badgeText = '#0d9488';
    }

    if (isActive) {
      strokeColor = 'var(--color-primary, #0284c7)';
      fillColor = 'rgba(2, 132, 199, 0.08)';
    }

    const shortTitle = n.label.length > 32 ? n.label.substring(0, 30) + '...' : n.label;
    const shortSub = n.subLabel ? (n.subLabel.length > 38 ? n.subLabel.substring(0, 36) + '...' : n.subLabel) : '';

    return `
      <g class="flowchart-node js-proto-node" data-step-id="${n.id}" style="cursor:pointer;" tabindex="0" role="button" aria-label="${escapeSvg(n.label)}">
        <!-- Node Card -->
        <rect x="${n.x}" y="${n.y}" width="${n.width}" height="${n.height}" rx="8" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${isActive ? '2.5' : '1.5'}" />
        
        <!-- Step Order Badge -->
        <rect x="${n.x + 8}" y="${n.y + 8}" width="20" height="18" rx="4" fill="${badgeBg}" />
        <text x="${n.x + 18}" y="${n.y + 21}" font-size="10.5" font-weight="800" fill="${badgeText}" text-anchor="middle">
          ${n.stepOrder}
        </text>

        <!-- Node Main Title -->
        <text x="${n.x + 34}" y="${n.y + 22}" font-size="12" font-weight="700" fill="${titleColor}">
          ${escapeSvg(shortTitle)}
        </text>

        <!-- Subtitle / Timeframe -->
        ${shortSub ? `
          <text x="${n.x + 12}" y="${n.y + 44}" font-size="10" font-weight="500" fill="var(--color-text-muted, #64748b)">
            ${escapeSvg(shortSub)}
          </text>
        ` : ''}

        <!-- Drugs Indicator Pill -->
        ${n.drugsCount && n.drugsCount > 0 ? `
          <g>
            <rect x="${n.x + n.width - 48}" y="${n.y + 8}" width="40" height="16" rx="4" fill="rgba(2, 132, 199, 0.1)" />
            <text x="${n.x + n.width - 28}" y="${n.y + 19}" font-size="9" font-weight="700" fill="var(--color-primary, #0284c7)" text-anchor="middle">
              💊 ${n.drugsCount} thuốc
            </text>
          </g>
        ` : ''}
      </g>
    `;
  }).join('');

  return `
    <svg viewBox="0 0 960 ${viewBoxHeight}" class="protocol-flowchart-svg" style="width:100%; height:auto; display:block;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="proto-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-border, #94a3b8)" />
        </marker>
      </defs>
      
      <!-- Grid Columns Guide Labels (Header) -->
      <text x="170" y="16" font-size="10.5" font-weight="700" fill="#ef4444" text-anchor="middle">🔴 NHÁNH NGUY KỊCH / CẤP CỨU</text>
      <text x="480" y="16" font-size="10.5" font-weight="700" fill="var(--color-primary, #0284c7)" text-anchor="middle">🔵 ĐIỀU TRỊ CHÍNH (FIRST-LINE)</text>
      <text x="790" y="16" font-size="10.5" font-weight="700" fill="#10b981" text-anchor="middle">🟢 HỒI PHỤC / NGOẠI TRÚ</text>
      <line x1="20" y1="22" x2="940" y2="22" stroke="var(--color-border, #e2e8f0)" stroke-width="1" stroke-dasharray="4 4" />

      <!-- Edges Layer -->
      <g class="flowchart-edges-layer">${edgesSvg}</g>
      <!-- Nodes Layer -->
      <g class="flowchart-nodes-layer">${nodesSvg}</g>
    </svg>
  `;
}

function escapeSvg(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
