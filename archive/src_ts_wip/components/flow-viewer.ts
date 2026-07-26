/**
 * Reusable FlowViewer Component
 * Tích hợp và hiển thị các lưu đồ tiếp cận lâm sàng (Flowchart/Pathology Matrix).
 */

export interface FlowNode {
  id: string;
  label: string;
  type?: 'question' | 'decision' | 'action' | 'endpoint';
  next?: string[];
}

export class CliniFlowViewer {
  private container: HTMLElement | null = null;
  private nodes: Map<string, FlowNode> = new Map();

  constructor() {}

  /**
   * Khởi tạo FlowViewer trong một container HTML
   */
  public mount(targetSelector: string = '#flow-container'): void {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    this.container = target as HTMLElement;
  }

  /**
   * Nạp danh sách nút của lưu đồ
   */
  public loadNodes(nodes: FlowNode[]): void {
    this.nodes.clear();
    nodes.forEach(node => this.nodes.set(node.id, node));
    this.render();
  }

  /**
   * Render lưu đồ ra giao diện
   */
  public render(): void {
    if (!this.container) return;
    const itemsHtml = Array.from(this.nodes.values()).map(node => `
      <div class="clini-flow-node flow-type-${node.type || 'action'}" data-id="${node.id}">
        <div class="node-label">${node.label}</div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="clini-flow-viewer-canvas">
        ${itemsHtml}
      </div>
    `;
  }
}
