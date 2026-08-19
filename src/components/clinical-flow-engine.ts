/**
 * ════════════════════════════════════════════════════════════════════════════
 *  CLINICAL FLOW & DECISION TREE RENDERER ENGINE — CLINI-PORTAL (TypeScript)
 *  Hỗ trợ: Pure SVG, Hierarchical Layout, Active Path Traversal, Subtree Pruning,
 *  Orthogonal Routing, Dark Mode CSS Variables & Synchronized Clinical Inspector.
 * ════════════════════════════════════════════════════════════════════════════
 */

export interface ClinicalFlowNode {
  id: string;
  title: string;
  type?: 'start' | 'action' | 'decision' | 'question' | 'danger' | 'success' | 'focal' | string;
  badge?: string;
  subtitle?: string;
  details?: string;
  evidence?: string;
  dose?: string;
  redFlags?: string[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface Waypoint {
  x: number;
  y: number;
}

export interface ClinicalFlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: 'normal' | 'danger' | 'success' | 'warning' | string;
  exitX?: number;
  exitY?: number;
  entryX?: number;
  entryY?: number;
  waypoints?: Waypoint[];
}

export interface ClinicalFlowDiagramData {
  rootId?: string;
  width?: number;
  height?: number;
  nodes: ClinicalFlowNode[];
  edges: ClinicalFlowEdge[];
}

export interface ClinicalFlowState {
  currentNodeId: string | null;
  history: Array<{ edgeId?: string; label?: string; nodeId: string; title: string; badge?: string }>;
  activeNodes: string[];
  activeEdges: string[];
}

export interface ClinicalFlowEngineOptions {
  container?: HTMLElement | string;
  inspector?: HTMLElement | string;
  width?: number;
  height?: number;
  onNodeSelect?: (node: ClinicalFlowNode) => void;
  onStateChange?: (state: ClinicalFlowState) => void;
}

export class ClinicalFlowEngine {
  public container: HTMLElement | null = null;
  public inspectorContainer: HTMLElement | null = null;
  public width: number;
  public height: number;
  public data: ClinicalFlowDiagramData | null = null;

  public currentNodeId: string | null = null;
  public activePathNodes: Set<string> = new Set();
  public activePathEdges: Set<string> = new Set();
  public excludedNodes: Set<string> = new Set();
  public decisionHistory: Array<{ edgeId?: string; label?: string; nodeId: string; title: string; badge?: string }> = [];

  public onNodeSelect?: (node: ClinicalFlowNode) => void;
  public onStateChange?: (state: ClinicalFlowState) => void;

  private svgEl: SVGElement | null = null;
  private edgesGroup: SVGGElement | null = null;
  private nodesGroup: SVGGElement | null = null;
  private breadcrumbsEl: HTMLElement | null = null;

  constructor(options: ClinicalFlowEngineOptions = {}) {
    if (typeof options.container === 'string') {
      this.container = document.querySelector(options.container);
    } else if (options.container) {
      this.container = options.container;
    }

    if (typeof options.inspector === 'string') {
      this.inspectorContainer = document.querySelector(options.inspector);
    } else if (options.inspector) {
      this.inspectorContainer = options.inspector;
    }

    this.width = options.width || 960;
    this.height = options.height || 640;
    this.onNodeSelect = options.onNodeSelect;
    this.onStateChange = options.onStateChange;

    if (this.container) {
      this.initViewport();
    }
  }

  public initViewport(): void {
    if (!this.container) return;
    this.container.classList.add('clinical-flow-viewport');
    this.container.innerHTML = `
        <div class="flow-engine-toolbar">
            <div class="flow-history-breadcrumbs" id="flowBreadcrumbs">
                <span class="breadcrumb-chip active"><i class="fa-solid fa-play"></i> Bắt đầu</span>
            </div>
            <div class="flow-actions-group">
                <button class="flow-btn-tool" id="btnStepBack" title="Lùi lại bước trước (Undo)">
                    <i class="fa-solid fa-arrow-rotate-left"></i> Lùi bước
                </button>
                <button class="flow-btn-tool" id="btnResetFlow" title="Đặt lại từ đầu">
                    <i class="fa-solid fa-arrows-rotate"></i> Làm mới
                </button>
            </div>
        </div>
        <div class="flow-svg-canvas-wrapper" id="flowCanvasWrapper">
            <svg class="clinical-flow-svg" viewBox="0 0 ${this.width} ${this.height}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <marker id="med-arrow-def" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-border, #334155)" />
                    </marker>
                    <marker id="med-arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-primary, #0284c7)" />
                    </marker>
                    <marker id="med-arrow-danger" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-danger, #ef4444)" />
                    </marker>
                    <marker id="med-arrow-success" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-success, #10b981)" />
                    </marker>
                </defs>
                <g class="flow-layer-edges"></g>
                <g class="flow-layer-nodes"></g>
            </svg>
        </div>
    `;

    this.svgEl = this.container.querySelector('.clinical-flow-svg');
    this.edgesGroup = this.container.querySelector('.flow-layer-edges');
    this.nodesGroup = this.container.querySelector('.flow-layer-nodes');
    this.breadcrumbsEl = this.container.querySelector('#flowBreadcrumbs');

    const btnStepBack = this.container.querySelector('#btnStepBack');
    const btnResetFlow = this.container.querySelector('#btnResetFlow');

    if (btnStepBack) {
      btnStepBack.addEventListener('click', () => this.stepBack());
    }
    if (btnResetFlow) {
      btnResetFlow.addEventListener('click', () => this.reset());
    }
  }

  public load(diagramData: ClinicalFlowDiagramData): void {
    if (!diagramData || !diagramData.nodes) return;
    this.data = JSON.parse(JSON.stringify(diagramData));
    this.width = this.data!.width || this.width;
    this.height = this.data!.height || this.height;

    if (this.svgEl) {
      this.svgEl.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    }

    this.calculateAutoLayout();
    this.reset();
  }

  public calculateAutoLayout(): void {
    if (!this.data || !this.data.nodes) return;
    
    const hasCustomCoords = this.data.nodes.every(n => typeof n.x === 'number' && typeof n.y === 'number');
    if (hasCustomCoords) return;

    const rootId = this.data.rootId || this.data.nodes[0]!.id;

    const depths = new Map<string, number>();
    depths.set(rootId, 0);
    const queue = [rootId];

    while (queue.length > 0) {
      const currId = queue.shift()!;
      const currDepth = depths.get(currId)!;
      const outEdges = (this.data.edges || []).filter(e => e.source === currId);

      outEdges.forEach(e => {
        if (!depths.has(e.target)) {
          depths.set(e.target, currDepth + 1);
          queue.push(e.target);
        }
      });
    }

    const levelGroups = new Map<number, ClinicalFlowNode[]>();
    this.data.nodes.forEach(n => {
      const d = depths.get(n.id) || 0;
      if (!levelGroups.has(d)) levelGroups.set(d, []);
      levelGroups.get(d)!.push(n);
    });

    const maxLevel = Math.max(...levelGroups.keys(), 0);
    const levelHeight = (this.height - 120) / Math.max(maxLevel, 1);
    const nodeWidth = 240;
    const nodeHeight = 85;

    levelGroups.forEach((nodesInLevel, level) => {
      const y = 40 + level * levelHeight;
      const totalWidth = this.width;
      const count = nodesInLevel.length;
      const segment = totalWidth / (count + 1);

      nodesInLevel.forEach((n, idx) => {
        n.width = n.width || nodeWidth;
        n.height = n.height || nodeHeight;
        n.x = Math.round(segment * (idx + 1) - n.width / 2);
        n.y = Math.round(y);
      });
    });
  }

  public reset(): void {
    if (!this.data || !this.data.nodes || this.data.nodes.length === 0) return;
    const rootNode = this.data.nodes.find(n => n.id === this.data!.rootId) || this.data.nodes[0]!;
    
    this.currentNodeId = rootNode.id;
    this.activePathNodes = new Set([rootNode.id]);
    this.activePathEdges = new Set();
    this.excludedNodes = new Set();
    this.decisionHistory = [{ nodeId: rootNode.id, title: rootNode.title, badge: rootNode.badge }];

    this.render();
    this.updateInspector(rootNode);
    this.updateBreadcrumbs();
  }

  public selectBranch(edgeId: string): void {
    if (!this.data) return;
    const edge = (this.data.edges || []).find(e => e.id === edgeId);
    if (!edge) return;

    const targetNode = this.data.nodes.find(n => n.id === edge.target);
    if (!targetNode) return;

    this.decisionHistory.push({
      edgeId: edge.id,
      label: edge.label || 'Tiếp tục',
      nodeId: targetNode.id,
      title: targetNode.title,
      badge: targetNode.badge
    });

    this.activePathEdges.add(edge.id);
    this.activePathNodes.add(targetNode.id);
    this.currentNodeId = targetNode.id;

    const siblingEdges = (this.data.edges || []).filter(e => e.source === edge.source && e.id !== edge.id);
    siblingEdges.forEach(sibEdge => {
      this.pruneSubtree(sibEdge.target);
    });

    this.render();
    this.updateInspector(targetNode);
    this.updateBreadcrumbs();

    if (this.onStateChange) this.onStateChange(this.getState());
  }

  public pruneSubtree(startNodeId: string): void {
    const queue = [startNodeId];
    while (queue.length > 0) {
      const currId = queue.shift()!;
      this.excludedNodes.add(currId);
      const outEdges = (this.data?.edges || []).filter(e => e.source === currId);
      outEdges.forEach(e => {
        if (!this.excludedNodes.has(e.target)) {
          queue.push(e.target);
        }
      });
    }
  }

  public stepBack(): void {
    if (this.decisionHistory.length <= 1) return;

    this.decisionHistory.pop();

    this.activePathNodes.clear();
    this.activePathEdges.clear();
    this.excludedNodes.clear();

    this.decisionHistory.forEach((step) => {
      this.activePathNodes.add(step.nodeId);
      if (step.edgeId) this.activePathEdges.add(step.edgeId);

      if (step.edgeId) {
        const edge = (this.data?.edges || []).find(e => e.id === step.edgeId);
        if (edge) {
          const siblingEdges = (this.data?.edges || []).filter(e => e.source === edge.source && e.id !== edge.id);
          siblingEdges.forEach(sibEdge => this.pruneSubtree(sibEdge.target));
        }
      }
    });

    const currentStep = this.decisionHistory[this.decisionHistory.length - 1]!;
    this.currentNodeId = currentStep.nodeId;
    const currentNode = this.data?.nodes.find(n => n.id === this.currentNodeId);

    this.render();
    if (currentNode) this.updateInspector(currentNode);
    this.updateBreadcrumbs();

    if (this.onStateChange) this.onStateChange(this.getState());
  }

  public render(): void {
    if (!this.data) return;
    this.renderEdges();
    this.renderNodes();
  }

  private renderEdges(): void {
    if (!this.edgesGroup || !this.data) return;
    this.edgesGroup.innerHTML = '';
    const edges = this.data.edges || [];

    edges.forEach(edge => {
      const srcNode = this.data!.nodes.find(n => n.id === edge.source);
      const tgtNode = this.data!.nodes.find(n => n.id === edge.target);
      if (!srcNode || !tgtNode) return;

      const exitX = edge.exitX !== undefined ? edge.exitX : 0.5;
      const exitY = edge.exitY !== undefined ? edge.exitY : 1.0;
      const entryX = edge.entryX !== undefined ? edge.entryX : 0.5;
      const entryY = edge.entryY !== undefined ? edge.entryY : 0.0;

      const startX = (srcNode.x || 0) + (srcNode.width || 240) * exitX;
      const startY = (srcNode.y || 0) + (srcNode.height || 85) * exitY;
      const endX = (tgtNode.x || 0) + (tgtNode.width || 240) * entryX;
      const endY = (tgtNode.y || 0) + (tgtNode.height || 85) * entryY;

      let pathD = '';
      let labelX = (startX + endX) / 2;
      let labelY = (startY + endY) / 2;

      if (edge.waypoints && edge.waypoints.length > 0) {
        pathD = `M ${startX} ${startY}`;
        edge.waypoints.forEach(wp => { pathD += ` L ${wp.x} ${wp.y}`; });
        pathD += ` L ${endX} ${endY}`;
        const midWp = edge.waypoints[Math.floor(edge.waypoints.length / 2)]!;
        labelX = midWp.x;
        labelY = midWp.y;
      } else if (Math.abs(startX - endX) < 4) {
        pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
        labelY = (startY + endY) / 2;
      } else {
        const midY = startY + (endY - startY) * 0.5;
        const radius = 6;
        const isGoingRight = endX > startX;
        const isGoingDown = endY > startY;

        const dirY = isGoingDown ? 1 : -1;
        const dirX = isGoingRight ? 1 : -1;

        pathD = `M ${startX} ${startY} ` +
                `L ${startX} ${midY - radius * dirY} ` +
                `Q ${startX} ${midY} ${startX + radius * dirX} ${midY} ` +
                `L ${endX - radius * dirX} ${midY} ` +
                `Q ${endX} ${midY} ${endX} ${midY + radius * dirY} ` +
                `L ${endX} ${endY}`;

        labelX = (startX + endX) / 2;
        labelY = midY;
      }

      const isActive = this.activePathEdges.has(edge.id);
      const isExcluded = this.excludedNodes.has(edge.target);
      const markerType = edge.type === 'danger' ? 'med-arrow-danger'
        : edge.type === 'success' ? 'med-arrow-success'
        : isActive ? 'med-arrow-active'
        : 'med-arrow-def';

      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('d', pathD);
      pathEl.setAttribute('class', `flow-edge-path ${edge.type || 'normal'} ${isActive ? 'active' : ''} ${isExcluded ? 'dimmed' : ''}`);
      pathEl.setAttribute('marker-end', `url(#${markerType})`);
      pathEl.dataset.edgeId = edge.id;

      this.edgesGroup!.appendChild(pathEl);

      if (edge.label) {
        const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        labelGroup.setAttribute('class', `flow-edge-label-group ${isActive ? 'active' : ''} ${isExcluded ? 'dimmed' : ''}`);
        labelGroup.setAttribute('transform', `translate(${labelX}, ${labelY})`);

        const approxW = Math.max(50, edge.label.length * 7.5 + 16);
        const approxH = 22;

        const rectEl = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectEl.setAttribute('class', `flow-edge-label-bg ${edge.type || ''}`);
        rectEl.setAttribute('x', `${-approxW / 2}`);
        rectEl.setAttribute('y', `${-approxH / 2}`);
        rectEl.setAttribute('width', `${approxW}`);
        rectEl.setAttribute('height', `${approxH}`);
        rectEl.setAttribute('rx', '4');

        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.setAttribute('class', 'flow-edge-label-text');
        textEl.setAttribute('text-anchor', 'middle');
        textEl.setAttribute('dy', '4');
        textEl.textContent = edge.label;

        labelGroup.appendChild(rectEl);
        labelGroup.appendChild(textEl);

        labelGroup.addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectBranch(edge.id);
        });

        this.edgesGroup!.appendChild(labelGroup);
      }
    });
  }

  private renderNodes(): void {
    if (!this.nodesGroup || !this.data) return;
    this.nodesGroup.innerHTML = '';
    const nodes = this.data.nodes || [];

    nodes.forEach(node => {
      const isActive = this.activePathNodes.has(node.id);
      const isCurrent = this.currentNodeId === node.id;
      const isExcluded = this.excludedNodes.has(node.id);

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', `flow-node-group node-type-${node.type || 'action'} ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''} ${isExcluded ? 'dimmed' : ''}`);
      g.setAttribute('transform', `translate(${node.x || 0}, ${node.y || 0})`);
      g.dataset.nodeId = node.id;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('class', 'flow-node-box');
      rect.setAttribute('width', String(node.width || 240));
      rect.setAttribute('height', String(node.height || 85));
      rect.setAttribute('rx', '8');
      rect.setAttribute('ry', '8');
      g.appendChild(rect);

      let textStartY = 28;
      if (node.badge) {
        const badgeBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        badgeBg.setAttribute('class', `flow-node-badge-bg badge-${node.type || 'default'}`);
        badgeBg.setAttribute('x', '12');
        badgeBg.setAttribute('y', '8');
        badgeBg.setAttribute('width', `${Math.min((node.width || 240) - 24, node.badge.length * 7 + 14)}`);
        badgeBg.setAttribute('height', '18');
        badgeBg.setAttribute('rx', '4');
        g.appendChild(badgeBg);

        const badgeTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        badgeTxt.setAttribute('class', 'flow-node-badge-text');
        badgeTxt.setAttribute('x', '18');
        badgeTxt.setAttribute('y', '21');
        badgeTxt.textContent = node.badge;
        g.appendChild(badgeTxt);

        textStartY = 44;
      }

      const titleTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      titleTxt.setAttribute('class', 'flow-node-title');
      titleTxt.setAttribute('x', '12');
      titleTxt.setAttribute('y', `${textStartY}`);
      titleTxt.textContent = this.truncateText(node.title, (node.width || 240) - 24, 13);
      g.appendChild(titleTxt);

      if (node.subtitle) {
        const subTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        subTxt.setAttribute('class', 'flow-node-subtitle');
        subTxt.setAttribute('x', '12');
        subTxt.setAttribute('y', `${textStartY + 18}`);
        subTxt.textContent = this.truncateText(node.subtitle, (node.width || 240) - 24, 11);
        g.appendChild(subTxt);
      }

      g.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleNodeClick(node);
      });

      this.nodesGroup!.appendChild(g);
    });
  }

  public handleNodeClick(node: ClinicalFlowNode): void {
    const directEdge = (this.data?.edges || []).find(e => e.source === this.currentNodeId && e.target === node.id);
    if (directEdge) {
      this.selectBranch(directEdge.id);
    } else {
      this.updateInspector(node);
    }

    if (this.onNodeSelect) this.onNodeSelect(node);
  }

  public updateInspector(node: ClinicalFlowNode): void {
    if (!this.inspectorContainer || !node) return;

    let iconType = node.type === 'focal' || node.type === 'danger' ? 'fa-triangle-exclamation text-danger'
      : node.type === 'start' ? 'fa-play text-primary'
      : node.type === 'question' ? 'fa-circle-question text-warning'
      : node.type === 'success' ? 'fa-circle-check text-success'
      : 'fa-stethoscope text-primary';

    const nextEdges = (this.data?.edges || []).filter(e => e.source === node.id);
    let branchButtonsHtml = '';

    if (nextEdges.length > 0) {
      branchButtonsHtml = `
        <div class="inspector-section">
            <div class="inspector-section-title"><i class="fa-solid fa-code-branch"></i> Bước Rẽ Nhánh Tiếp Theo:</div>
            <div class="inspector-branch-buttons">
                ${nextEdges.map(e => `
                    <button class="btn-inspector-branch ${e.type || ''}" data-branch-edge-id="${e.id}">
                        <span class="branch-label">${e.label || 'Tiếp tục'} ➔</span>
                        <span class="branch-target">${this.getNodeTitle(e.target)}</span>
                    </button>
                `).join('')}
            </div>
        </div>
      `;
    }

    const evidenceHtml = node.evidence ? `
      <div class="inspector-section ebm-box">
          <div class="inspector-section-title"><i class="fa-solid fa-book-medical"></i> Khuyến cáo EBM & Bằng chứng:</div>
          <div class="ebm-content">${node.evidence}</div>
      </div>
    ` : '';

    const doseHtml = node.dose ? `
      <div class="inspector-section dose-box">
          <div class="inspector-section-title"><i class="fa-solid fa-pills"></i> Liều lượng & Dược lý khẩn cấp:</div>
          <div class="dose-content">${node.dose}</div>
      </div>
    ` : '';

    const redFlagsHtml = node.redFlags && node.redFlags.length > 0 ? `
      <div class="inspector-section redflags-box">
          <div class="inspector-section-title"><i class="fa-solid fa-flag"></i> Dấu hiệu Cờ Đỏ (Red Flags):</div>
          <ul class="redflags-list">
              ${node.redFlags.map(rf => `<li>${rf}</li>`).join('')}
          </ul>
      </div>
    ` : '';

    this.inspectorContainer.innerHTML = `
      <div class="inspector-card">
          <div class="inspector-header">
              <span class="inspector-badge badge-${node.type || 'default'}">${node.badge || 'Bước Quyết định'}</span>
              <h3 class="inspector-title"><i class="fa-solid ${iconType}"></i> ${node.title}</h3>
              ${node.subtitle ? `<div class="inspector-subtitle">${node.subtitle}</div>` : ''}
          </div>
          <div class="inspector-body">
              ${node.details ? `<div class="inspector-desc">${node.details}</div>` : ''}
              ${branchButtonsHtml}
              ${doseHtml}
              ${redFlagsHtml}
              ${evidenceHtml}
          </div>
      </div>
    `;

    this.inspectorContainer.querySelectorAll<HTMLButtonElement>('[data-branch-edge-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const edgeId = btn.getAttribute('data-branch-edge-id');
        if (edgeId) this.selectBranch(edgeId);
      });
    });
  }

  public updateBreadcrumbs(): void {
    if (!this.breadcrumbsEl) return;
    this.breadcrumbsEl.innerHTML = this.decisionHistory.map((step, idx) => {
      const isLast = idx === this.decisionHistory.length - 1;
      return `
        <span class="breadcrumb-chip ${isLast ? 'active' : ''}">
            ${step.label ? `<span class="chip-branch">${step.label}</span> ➔ ` : ''}
            <strong>${step.badge || `B${idx + 1}`}:</strong> ${step.title}
        </span>
      `;
    }).join('');
  }

  private getNodeTitle(nodeId: string): string {
    const node = (this.data?.nodes || []).find(n => n.id === nodeId);
    return node ? node.title : nodeId;
  }

  private truncateText(str: string, maxWidth: number, approxCharWidth: number = 10): string {
    if (!str) return '';
    const maxChars = Math.floor(maxWidth / approxCharWidth);
    return str.length > maxChars ? str.substring(0, maxChars - 3) + '...' : str;
  }

  public getState(): ClinicalFlowState {
    return {
      currentNodeId: this.currentNodeId,
      history: this.decisionHistory,
      activeNodes: Array.from(this.activePathNodes),
      activeEdges: Array.from(this.activePathEdges)
    };
  }
}

if (typeof window !== 'undefined') {
  (window as any).ClinicalFlowEngine = ClinicalFlowEngine;
}
