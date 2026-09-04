/**
 * ════════════════════════════════════════════════════════════════════════════
 *  CLINICAL FLOW & DECISION TREE RENDERER ENGINE 2.0 — CLINI-PORTAL
 *  Nâng cấp toàn diện với cảm hứng từ XYFlow Viewport & Mermaid Parser:
 *  - Phân tích cú pháp Text/Code DSL Y khoa (MedicalFlowDSL)
 *  - Canvas Pan & Zoom mượt mà (0.2x - 3x) kèm Floating Controls & Auto-Fit
 *  - Duyệt cây quyết định lâm sàng (Active Path Traversal & Subtree Pruning)
 *  - 8 Archetypes Node Y khoa tùy biến (Start, Decision, Danger, Action, Dose, etc.)
 *  - Ngăn kéo Clinical Inspector đồng bộ (Y lệnh, Liều thuốc, Cờ đỏ, EBM, CDSS Tool)
 *  - Xuất bản SVG thuần (100% Dark Mode Tokens, không shadow, không HTML trong text)
 * ════════════════════════════════════════════════════════════════════════════
 */

import {
  MedicalFlowDSL,
  type MedicalFlowDiagram,
  type MedicalFlowNode,
  type MedicalFlowEdge,
  type ParseResult
} from './flowchart/flow-dsl-parser';

export type ClinicalFlowNode = MedicalFlowNode;
export type ClinicalFlowEdge = MedicalFlowEdge;
export type ClinicalFlowDiagramData = MedicalFlowDiagram;

export interface ClinicalFlowState {
  currentNodeId: string | null;
  history: Array<{ edgeId?: string; label?: string; nodeId: string; title: string; badge?: string }>;
  activeNodes: string[];
  activeEdges: string[];
  scale: number;
}

export interface ClinicalFlowEngineOptions {
  container?: HTMLElement | string;
  inspector?: HTMLElement | string;
  width?: number;
  height?: number;
  readOnly?: boolean;
  onNodeSelect?: (node: MedicalFlowNode) => void;
  onStateChange?: (state: ClinicalFlowState) => void;
}

export class ClinicalFlowEngine {
  public container: HTMLElement | null = null;
  public inspectorContainer: HTMLElement | null = null;
  public width: number = 960;
  public height: number = 640;
  public data: MedicalFlowDiagram | null = null;
  public readOnly: boolean = false;

  // Decision & Active Path State
  public currentNodeId: string | null = null;
  public activePathNodes: Set<string> = new Set();
  public activePathEdges: Set<string> = new Set();
  public excludedNodes: Set<string> = new Set();
  public decisionHistory: Array<{ edgeId?: string; label?: string; nodeId: string; title: string; badge?: string }> = [];

  // Viewport Pan & Zoom State (tương tự xyflow xypanzoom)
  public scale: number = 1.0;
  public translateX: number = 0;
  public translateY: number = 0;
  private isPanning: boolean = false;
  private startMouseX: number = 0;
  private startMouseY: number = 0;

  // Event callbacks
  public onNodeSelect?: (node: MedicalFlowNode) => void;
  public onStateChange?: (state: ClinicalFlowState) => void;

  // DOM Elements
  private viewportEl: HTMLElement | null = null;
  private svgEl: SVGSVGElement | null = null;
  private transformGroup: SVGGElement | null = null;
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
    this.readOnly = options.readOnly || false;
    this.onNodeSelect = options.onNodeSelect;
    this.onStateChange = options.onStateChange;

    if (this.container) {
      this.initViewport();
    }
  }

  /**
   * Khởi tạo khung hiển thị Viewport với Pan/Zoom Canvas và thanh công cụ
   */
  public initViewport(): void {
    if (!this.container) return;
    this.container.classList.add('clinical-flow-viewport-container');
    this.container.innerHTML = `
      <div class="flow-engine-toolbar">
        <div class="flow-history-breadcrumbs" id="flowBreadcrumbs">
          <span class="breadcrumb-chip active"><i class="fa-solid fa-play"></i> Bắt đầu</span>
        </div>
        <div class="flow-actions-group">
          <button type="button" class="flow-btn-tool" id="btnStepBack" title="Lùi lại bước trước (Undo)">
            <i class="fa-solid fa-arrow-rotate-left"></i> Lùi bước
          </button>
          <button type="button" class="flow-btn-tool" id="btnResetFlow" title="Đặt lại từ đầu">
            <i class="fa-solid fa-arrows-rotate"></i> Làm mới
          </button>
        </div>
      </div>

      <div class="flow-viewport-canvas-wrapper" id="flowCanvasWrapper">
        <svg class="clinical-flow-svg-root" viewBox="0 0 ${this.width} ${this.height}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="med-arrow-def" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-border, #94a3b8)" />
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
          <g class="flow-transform-layer">
            <g class="flow-layer-edges"></g>
            <g class="flow-layer-nodes"></g>
          </g>
        </svg>

        <!-- Floating Viewport Controls (XYFlow-inspired) -->
        <div class="flow-floating-controls">
          <button type="button" class="flow-btn-floating" id="btnZoomIn" title="Phóng to (Zoom In)">
            <i class="fa-solid fa-plus"></i>
          </button>
          <button type="button" class="flow-btn-floating" id="btnZoomReset" title="Về tỷ lệ 100%">
            <i class="fa-solid fa-expand"></i>
          </button>
          <button type="button" class="flow-btn-floating" id="btnZoomOut" title="Thu nhỏ (Zoom Out)">
            <i class="fa-solid fa-minus"></i>
          </button>
          <button type="button" class="flow-btn-floating" id="btnFitView" title="Tự động căn chỉnh toàn khung (Fit View)">
            <i class="fa-solid fa-compress"></i>
          </button>
        </div>
      </div>
    `;

    this.viewportEl = this.container.querySelector('#flowCanvasWrapper');
    this.svgEl = this.container.querySelector('.clinical-flow-svg-root');
    this.transformGroup = this.container.querySelector('.flow-transform-layer');
    this.edgesGroup = this.container.querySelector('.flow-layer-edges');
    this.nodesGroup = this.container.querySelector('.flow-layer-nodes');
    this.breadcrumbsEl = this.container.querySelector('#flowBreadcrumbs');

    // Thiết lập tương tác Pan & Zoom
    this.setupPanZoomEvents();

    // Thiết lập Toolbar buttons
    const btnStepBack = this.container.querySelector('#btnStepBack');
    const btnResetFlow = this.container.querySelector('#btnResetFlow');
    const btnZoomIn = this.container.querySelector('#btnZoomIn');
    const btnZoomOut = this.container.querySelector('#btnZoomOut');
    const btnZoomReset = this.container.querySelector('#btnZoomReset');
    const btnFitView = this.container.querySelector('#btnFitView');

    btnStepBack?.addEventListener('click', () => this.stepBack());
    btnResetFlow?.addEventListener('click', () => this.reset());
    btnZoomIn?.addEventListener('click', () => this.zoom(1.2));
    btnZoomOut?.addEventListener('click', () => this.zoom(0.8));
    btnZoomReset?.addEventListener('click', () => this.resetView());
    btnFitView?.addEventListener('click', () => this.fitView());
  }

  private animationTimer: any = null;

  /**
   * Thiết lập Pan & Zoom cho Canvas Viewport (tương tự @xyflow/system panzoom)
   * Hỗ trợ đầy đủ Chuột, Cảm ứng đa điểm (Touch & Pinch) và Phím tắt Bàn phím
   */
  private setupPanZoomEvents(): void {
    if (!this.viewportEl) return;

    // Cho phép viewport nhận sự kiện bàn phím
    this.viewportEl.setAttribute('tabindex', '0');

    // 1. Mouse Drag to Pan
    this.viewportEl.addEventListener('mousedown', (e: MouseEvent) => {
      // Bỏ qua nếu người dùng bấm vào node, label hoặc nút tương tác
      if ((e.target as HTMLElement).closest('.flow-node-group') || 
          (e.target as HTMLElement).closest('.flow-edge-label-group') ||
          (e.target as HTMLElement).closest('.flow-floating-controls')) {
        return;
      }

      this.isPanning = true;
      this.startMouseX = e.clientX - this.translateX;
      this.startMouseY = e.clientY - this.translateY;
      this.viewportEl!.classList.add('is-panning');
      this.transformGroup?.classList.remove('is-animating');
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isPanning) return;
      this.translateX = e.clientX - this.startMouseX;
      this.translateY = e.clientY - this.startMouseY;
      this.applyTransform();
    });

    window.addEventListener('mouseup', () => {
      if (this.isPanning) {
        this.isPanning = false;
        this.viewportEl?.classList.remove('is-panning');
      }
    });

    // 2. Wheel Zoom (Centering on cursor)
    this.viewportEl.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
      const newScale = Math.min(3.0, Math.max(0.25, this.scale * zoomFactor));

      const rect = this.viewportEl!.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Tính toán toạ độ dịch chuyển để giữ tiêu điểm tại vị trí con trỏ chuột
      this.translateX = mouseX - (mouseX - this.translateX) * (newScale / this.scale);
      this.translateY = mouseY - (mouseY - this.translateY) * (newScale / this.scale);
      this.scale = newScale;

      this.applyTransform();
    }, { passive: false });

    // 3. Mobile Touch Pan & Two-finger Pinch Zoom (Ergonomic Touch Engine)
    let startTouchDist = 0;
    let initialPinchScale = 1.0;
    let touchCenterX = 0;
    let touchCenterY = 0;

    this.viewportEl.addEventListener('touchstart', (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('.flow-node-group') || 
          (e.target as HTMLElement).closest('.flow-edge-label-group') ||
          (e.target as HTMLElement).closest('.flow-floating-controls')) {
        return;
      }

      this.transformGroup?.classList.remove('is-animating');

      if (e.touches.length === 1) {
        this.isPanning = true;
        this.startMouseX = e.touches[0]!.clientX - this.translateX;
        this.startMouseY = e.touches[0]!.clientY - this.translateY;
        this.viewportEl!.classList.add('is-panning');
      } else if (e.touches.length === 2) {
        this.isPanning = false;
        const t0 = e.touches[0]!;
        const t1 = e.touches[1]!;
        startTouchDist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
        initialPinchScale = this.scale;

        const rect = this.viewportEl!.getBoundingClientRect();
        touchCenterX = (t0.clientX + t1.clientX) / 2 - rect.left;
        touchCenterY = (t0.clientY + t1.clientY) / 2 - rect.top;
      }
    }, { passive: true });

    this.viewportEl.addEventListener('touchmove', (e: TouchEvent) => {
      if (e.touches.length === 1 && this.isPanning) {
        e.preventDefault();
        this.translateX = e.touches[0]!.clientX - this.startMouseX;
        this.translateY = e.touches[0]!.clientY - this.startMouseY;
        this.applyTransform();
      } else if (e.touches.length === 2 && startTouchDist > 0) {
        e.preventDefault();
        const t0 = e.touches[0]!;
        const t1 = e.touches[1]!;
        const currentDist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);

        if (currentDist > 10) {
          const factor = currentDist / startTouchDist;
          const newScale = Math.min(3.0, Math.max(0.25, initialPinchScale * factor));

          this.translateX = touchCenterX - (touchCenterX - this.translateX) * (newScale / this.scale);
          this.translateY = touchCenterY - (touchCenterY - this.translateY) * (newScale / this.scale);
          this.scale = newScale;
          this.applyTransform();
        }
      }
    }, { passive: false });

    const endTouch = () => {
      this.isPanning = false;
      startTouchDist = 0;
      this.viewportEl?.classList.remove('is-panning');
    };

    this.viewportEl.addEventListener('touchend', endTouch);
    this.viewportEl.addEventListener('touchcancel', endTouch);

    // 4. Bàn phím điều hướng & Phím tắt Nhanh (Keyboard Shortcuts)
    this.viewportEl.addEventListener('keydown', (e: KeyboardEvent) => {
      // Bỏ qua nếu đang gõ trong input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case '+':
        case '=':
          e.preventDefault();
          this.zoom(1.18);
          break;
        case '-':
        case '_':
          e.preventDefault();
          this.zoom(0.85);
          break;
        case '0':
          e.preventDefault();
          this.resetView();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.fitView();
          break;
        case 'Backspace':
          e.preventDefault();
          this.stepBack();
          break;
        case 'z':
        case 'Z':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.stepBack();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.translateX += 50;
          this.applyTransform();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.translateX -= 50;
          this.applyTransform();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.translateY += 50;
          this.applyTransform();
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.translateY -= 50;
          this.applyTransform();
          break;
      }
    });
  }

  /**
   * Cập nhật ma trận biến đổi CSS transform cho layer hiển thị
   */
  private applyTransform(): void {
    if (!this.transformGroup) return;
    this.transformGroup.setAttribute(
      'transform',
      `translate(${this.translateX.toFixed(2)}, ${this.translateY.toFixed(2)}) scale(${this.scale.toFixed(4)})`
    );
  }

  /**
   * Cập nhật biến đổi có hiệu ứng chuyển động mượt mà (Animated Smooth Transition)
   */
  private applyTransformAnimated(): void {
    if (!this.transformGroup) return;
    if (this.animationTimer) clearTimeout(this.animationTimer);

    this.transformGroup.classList.add('is-animating');
    this.applyTransform();

    this.animationTimer = setTimeout(() => {
      this.transformGroup?.classList.remove('is-animating');
    }, 300);
  }

  /**
   * Phóng to hoặc thu nhỏ theo tỉ lệ factor
   */
  public zoom(factor: number): void {
    if (!this.viewportEl) return;
    const rect = this.viewportEl.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newScale = Math.min(3.0, Math.max(0.25, this.scale * factor));
    this.translateX = centerX - (centerX - this.translateX) * (newScale / this.scale);
    this.translateY = centerY - (centerY - this.translateY) * (newScale / this.scale);
    this.scale = newScale;
    this.applyTransformAnimated();
  }

  /**
   * Đưa góc nhìn về tỷ lệ gốc 1:1 căn giữa
   */
  public resetView(): void {
    this.scale = 1.0;
    this.translateX = 0;
    this.translateY = 0;
    this.applyTransformAnimated();
  }

  /**
   * Tự động căn chỉnh toàn bộ lưu đồ vừa vặn vào khung nhìn (Fit to View)
   */
  public fitView(): void {
    if (!this.data || !this.data.nodes || this.data.nodes.length === 0 || !this.viewportEl) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    this.data.nodes.forEach(n => {
      const x = n.x || 0;
      const y = n.y || 0;
      const w = n.width || 240;
      const h = n.height || 85;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + w);
      maxY = Math.max(maxY, y + h);
    });

    const diagramW = maxX - minX;
    const diagramH = maxY - minY;

    const rect = this.viewportEl.getBoundingClientRect();
    const padding = 50;
    const availableW = Math.max(100, rect.width - padding * 2);
    const availableH = Math.max(100, rect.height - padding * 2);

    const scaleX = availableW / diagramW;
    const scaleY = availableH / diagramH;
    const fitScale = Math.min(1.5, Math.max(0.3, Math.min(scaleX, scaleY)));

    this.scale = fitScale;
    this.translateX = (rect.width - diagramW * fitScale) / 2 - minX * fitScale;
    this.translateY = (rect.height - diagramH * fitScale) / 2 - minY * fitScale;

    this.applyTransformAnimated();
  }

  /**
   * Nạp lưu đồ bằng chuỗi văn bản code DSL (Mermaid-compatible)
   */
  public loadDSL(dslCode: string): ParseResult {
    const res = MedicalFlowDSL.parse(dslCode);
    if (res.diagram) {
      this.load(res.diagram);
    }
    return res;
  }

  /**
   * Nạp đối tượng cấu trúc dữ liệu lưu đồ
   */
  public load(diagramData: MedicalFlowDiagram): void {
    if (!diagramData || !diagramData.nodes) return;
    this.data = JSON.parse(JSON.stringify(diagramData));
    this.width = this.data!.width || this.width;
    this.height = this.data!.height || this.height;

    if (this.svgEl) {
      this.svgEl.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    }

    // Nếu các node chưa có toạ độ x, y thì tính toán tự động
    const hasCoords = this.data!.nodes.every(n => typeof n.x === 'number' && typeof n.y === 'number');
    if (!hasCoords) {
      MedicalFlowDSL.calculateHierarchicalLayout(this.data!);
    }

    this.reset();
  }

  /**
   * Đặt lại trạng thái duyệt cây quyết định về vị trí ban đầu (Root Node)
   */
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
    this.fitView();

    if (this.onStateChange) this.onStateChange(this.getState());
  }

  /**
   * Chọn một nhánh quyết định lâm sàng và cập nhật trạng thái
   */
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

    // Làm mờ các nhánh rẽ ngang không được chọn (Subtree Pruning)
    const siblingEdges = (this.data.edges || []).filter(e => e.source === edge.source && e.id !== edge.id);
    siblingEdges.forEach(sibEdge => {
      this.pruneSubtree(sibEdge.target);
    });

    this.render();
    this.updateInspector(targetNode);
    this.updateBreadcrumbs();

    if (this.onStateChange) this.onStateChange(this.getState());
  }

  /**
   * Loại trừ và làm mờ các nhánh con không thuộc luồng đang đi
   */
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

  /**
   * Lùi lại một bước quyết định trước đó (Undo Decision)
   */
  public stepBack(): void {
    if (this.decisionHistory.length <= 1) return;

    this.decisionHistory.pop();

    this.activePathNodes.clear();
    this.activePathEdges.clear();
    this.excludedNodes.clear();

    this.decisionHistory.forEach(step => {
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

  /**
   * Vẽ toàn bộ đường nối và các Node lên Canvas SVG
   */
  public render(): void {
    if (!this.data) return;
    this.renderEdges();
    this.renderNodes();
  }

  /**
   * Render các đường nối trực giao và nhãn câu trả lời
   */
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

      // Nhãn câu trả lời trên đường nối kèm Mặt nạ che nền (Rule 5)
      if (edge.label) {
        const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        labelGroup.setAttribute('class', `flow-edge-label-group ${isActive ? 'active' : ''} ${isExcluded ? 'dimmed' : ''}`);
        labelGroup.setAttribute('transform', `translate(${labelX}, ${labelY})`);

        const approxW = Math.max(52, edge.label.length * 8 + 18);
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

  /**
   * Render 8 Custom Medical Node Archetypes
   */
  private renderNodes(): void {
    if (!this.nodesGroup || !this.data) return;
    this.nodesGroup.innerHTML = '';
    const nodes = this.data.nodes || [];

    nodes.forEach(node => {
      const isActive = this.activePathNodes.has(node.id);
      const isCurrent = this.currentNodeId === node.id;
      const isExcluded = this.excludedNodes.has(node.id);
      const w = node.width || 240;
      const h = node.height || 85;

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute(
        'class',
        `flow-node-group node-type-${node.type || 'action'} ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''} ${isExcluded ? 'dimmed' : ''}`
      );
      g.setAttribute('transform', `translate(${node.x || 0}, ${node.y || 0})`);
      g.dataset.nodeId = node.id;

      // Hình khối Node (Shape)
      if (node.shape === 'diamond') {
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        poly.setAttribute('class', 'flow-node-box');
        poly.setAttribute('points', `${w / 2},0 ${w},${h / 2} ${w / 2},${h} 0,${h / 2}`);
        g.appendChild(poly);
      } else if (node.shape === 'pill') {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('class', 'flow-node-box');
        rect.setAttribute('width', String(w));
        rect.setAttribute('height', String(h));
        rect.setAttribute('rx', String(h / 2));
        rect.setAttribute('ry', String(h / 2));
        g.appendChild(rect);
      } else {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('class', 'flow-node-box');
        rect.setAttribute('width', String(w));
        rect.setAttribute('height', String(h));
        rect.setAttribute('rx', '8');
        rect.setAttribute('ry', '8');
        g.appendChild(rect);
      }

      // Huy hiệu Node (Badge Top)
      let textStartY = 28;
      if (node.badge) {
        const badgeBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        badgeBg.setAttribute('class', `flow-node-badge-bg badge-${node.type || 'default'}`);
        badgeBg.setAttribute('x', '12');
        badgeBg.setAttribute('y', '8');
        badgeBg.setAttribute('width', `${Math.min(w - 24, node.badge.length * 7 + 14)}`);
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

      // Tiêu đề Node (Hỗ trợ chia tối đa 2 dòng bằng <tspan> chuẩn SVG)
      const titleLines = MedicalFlowDSL.wrapText(node.title, 24, 2);
      const titleTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      titleTxt.setAttribute('class', 'flow-node-title');
      titleTxt.setAttribute('x', '12');
      titleTxt.setAttribute('y', `${textStartY}`);

      titleLines.forEach((line, idx) => {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.setAttribute('x', '12');
        tspan.setAttribute('dy', idx === 0 ? '0' : '15');
        tspan.textContent = line;
        titleTxt.appendChild(tspan);
      });
      g.appendChild(titleTxt);

      // Phụ đề Node (Đặt bên dưới tiêu đề đa dòng)
      if (node.subtitle) {
        const subStartY = textStartY + (titleLines.length > 1 ? 20 : 16);
        const subTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        subTxt.setAttribute('class', 'flow-node-subtitle');
        subTxt.setAttribute('x', '12');
        subTxt.setAttribute('y', `${subStartY}`);
        subTxt.textContent = this.truncateText(node.subtitle, w - 24, 10);
        g.appendChild(subTxt);
      }

      // Dải Dược lý / Liều thuốc (Dose Strip Archetype)
      if (node.dose) {
        const doseG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        doseG.setAttribute('transform', `translate(12, ${h - 22})`);

        const doseRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        doseRect.setAttribute('class', 'flow-node-dose-strip');
        doseRect.setAttribute('width', `${w - 24}`);
        doseRect.setAttribute('height', '16');
        doseRect.setAttribute('rx', '3');
        doseG.appendChild(doseRect);

        const doseTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        doseTxt.setAttribute('class', 'flow-node-dose-text');
        doseTxt.setAttribute('x', '6');
        doseTxt.setAttribute('y', '11');
        doseTxt.textContent = `💊 ${this.truncateText(node.dose, w - 36, 8)}`;
        doseG.appendChild(doseTxt);

        g.appendChild(doseG);
      }

      // Điểm pulsing indicator cho Danger / Focal Red Alert
      if (node.type === 'danger' || node.type === 'focal') {
        const alertDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        alertDot.setAttribute('class', 'flow-node-alert-pulse');
        alertDot.setAttribute('cx', `${w - 14}`);
        alertDot.setAttribute('cy', '14');
        alertDot.setAttribute('r', '5');
        g.appendChild(alertDot);
      }

      g.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleNodeClick(node);
      });

      this.nodesGroup!.appendChild(g);
    });
  }

  /**
   * Xử lý nhấp chọn một Node
   */
  public handleNodeClick(node: MedicalFlowNode): void {
    const directEdge = (this.data?.edges || []).find(e => e.source === this.currentNodeId && e.target === node.id);
    if (directEdge) {
      this.selectBranch(directEdge.id);
    } else {
      this.updateInspector(node);
    }

    if (this.onNodeSelect) this.onNodeSelect(node);
  }

  /**
   * Cập nhật thông tin trong ngăn kéo Clinical Inspector
   */
  public updateInspector(node: MedicalFlowNode): void {
    if (!this.inspectorContainer || !node) return;

    let iconType = node.icon || (
      node.type === 'focal' || node.type === 'danger' ? 'fa-triangle-exclamation text-danger'
      : node.type === 'start' ? 'fa-play text-primary'
      : node.type === 'question' ? 'fa-circle-question text-warning'
      : node.type === 'success' ? 'fa-circle-check text-success'
      : node.type === 'dose' ? 'fa-pills text-purple'
      : node.type === 'tool' ? 'fa-calculator text-primary'
      : 'fa-stethoscope text-primary'
    );

    const nextEdges = (this.data?.edges || []).filter(e => e.source === node.id);
    let branchButtonsHtml = '';

    if (nextEdges.length > 0) {
      branchButtonsHtml = `
        <div class="inspector-section">
          <div class="inspector-section-title"><i class="fa-solid fa-code-branch"></i> Bước Rẽ Nhánh Tiếp Theo:</div>
          <div class="inspector-branch-buttons">
            ${nextEdges.map(e => `
              <button type="button" class="btn-inspector-branch ${e.type || ''}" data-branch-edge-id="${e.id}">
                <span class="branch-label">${e.label || 'Tiếp tục'} ➔</span>
                <span class="branch-target">${this.getNodeTitle(e.target)}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    const toolButtonHtml = node.toolUrl ? `
      <div class="inspector-section tool-box">
        <div class="inspector-section-title"><i class="fa-solid fa-bolt"></i> Công cụ Lâm sàng CliniPortal:</div>
        <a href="${node.toolUrl}" target="_blank" class="btn-inspector-tool">
          <i class="fa-solid fa-calculator"></i> Mở Bộ Tính Toán Lâm Sàng Liên Quan
        </a>
      </div>
    ` : '';

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
          ${toolButtonHtml}
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

  /**
   * Cập nhật thanh Breadcrumbs lịch sử rẽ nhánh
   */
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

  /**
   * Xuất ra chuỗi mã Pure Inline SVG đạt chuẩn Editorial
   */
  public exportSVG(): string {
    if (!this.data) return '';
    return MedicalFlowDSL.exportToSVG(this.data);
  }

  /**
   * Xuất ra chuỗi văn bản code DSL Mermaid
   */
  public exportDSL(): string {
    if (!this.data) return '';
    return MedicalFlowDSL.exportToDSL(this.data);
  }

  /**
   * Xuất ra ảnh PNG có độ phân giải cao
   */
  public async exportPNG(scale: number = 2): Promise<string> {
    const svgStr = this.exportSVG();
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = (this.width || 960) * scale;
        canvas.height = (this.height || 640) * scale;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Không khởi tạo được Canvas 2D'));
          return;
        }

        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };
      img.src = url;
    });
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

  public loadDiagram(data: MedicalFlowDiagram): void {
    this.load(data);
  }

  public autoLayout(): void {
    if (this.data) {
      MedicalFlowDSL.calculateHierarchicalLayout(this.data);
      this.render();
      this.fitView();
    }
  }

  public exportJSON(): MedicalFlowDiagram {
    return this.data
      ? JSON.parse(JSON.stringify(this.data))
      : { direction: 'TD', nodes: [], edges: [], width: this.width, height: this.height };
  }

  public zoomIn(): void {
    this.zoom(1.2);
  }

  public zoomOut(): void {
    this.zoom(0.8);
  }

  public addNode(node: Partial<MedicalFlowNode>): void {
    if (!this.data) {
      this.data = { direction: 'TD', nodes: [], edges: [], width: this.width, height: this.height };
    }
    const id = node.id || `node_${Date.now().toString(36)}`;
    const newNode: MedicalFlowNode = {
      id,
      title: node.title || 'Node mới',
      type: node.type || 'action',
      x: node.x || 300,
      y: node.y || 200,
      width: node.width || 240,
      height: node.height || 85,
      ...node
    };
    this.data.nodes.push(newNode);
    this.render();
  }

  public deleteNode(nodeId: string): void {
    if (!this.data) return;
    this.data.nodes = this.data.nodes.filter(n => n.id !== nodeId);
    this.data.edges = this.data.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
    this.render();
  }

  public deleteEdge(edgeId: string): void {
    if (!this.data) return;
    this.data.edges = this.data.edges.filter(e => e.id !== edgeId);
    this.render();
  }

  public getState(): ClinicalFlowState {
    return {
      currentNodeId: this.currentNodeId,
      history: this.decisionHistory,
      activeNodes: Array.from(this.activePathNodes),
      activeEdges: Array.from(this.activePathEdges),
      scale: this.scale
    };
  }
}

if (typeof window !== 'undefined') {
  (window as any).ClinicalFlowEngine = ClinicalFlowEngine;
  (window as any).MedicalFlowDSL = MedicalFlowDSL;
}
