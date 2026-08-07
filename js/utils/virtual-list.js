/**
 * ============================================================================
 * VIRTUAL LIST ENGINE — Mantine v9 Inspired
 * Tối ưu hóa hiệu năng render danh sách dài (ICD-10, Ma trận Triệu chứng)
 * Chỉ render các phần tử nằm trong Viewport (dưới 16ms / 60fps)
 * ============================================================================
 */

export class VirtualList {
  /**
   * Khởi tạo Virtual List
   * @param {HTMLElement} containerEl - Container cuộn chứa danh sách
   * @param {Array} items - Mảng dữ liệu nguồn
   * @param {number} itemHeight - Chiều cao mỗi phần tử (px)
   * @param {Function} renderItemFn - Hàm trả về chuỗi HTML hoặc HTMLElement đại diện cho 1 item
   */
  constructor({ containerEl, items = [], itemHeight = 48, renderItemFn }) {
    if (!containerEl || typeof renderItemFn !== 'function') return;
    this.container = containerEl;
    this.items = items;
    this.itemHeight = itemHeight;
    this.renderItemFn = renderItemFn;

    this.init();
  }

  init() {
    this.container.style.position = 'relative';
    this.container.style.overflowY = 'auto';

    // Thẻ viewport giả để duy trì chiều cao cuộn tổng thể
    this.viewportEl = document.createElement('div');
    this.viewportEl.className = 'virtual-list-viewport';
    this.viewportEl.style.width = '100%';

    // Thẻ nội dung chứa các dòng thực sự được render
    this.contentEl = document.createElement('div');
    this.contentEl.className = 'virtual-list-content';
    this.contentEl.style.width = '100%';
    this.contentEl.style.position = 'absolute';
    this.contentEl.style.top = '0';
    this.contentEl.style.left = '0';

    this.viewportEl.appendChild(this.contentEl);
    this.container.innerHTML = '';
    this.container.appendChild(this.viewportEl);

    this.onScrollHandler = () => this.render();
    this.container.addEventListener('scroll', this.onScrollHandler);

    this.updateItems(this.items);
  }

  updateItems(newItems) {
    this.items = newItems;
    this.totalHeight = this.items.length * this.itemHeight;
    this.viewportEl.style.height = `${this.totalHeight}px`;
    this.render();
  }

  render() {
    const scrollTop = this.container.scrollTop;
    const containerHeight = this.container.clientHeight || 400;

    // Tính chỉ số đầu và cuối cần render (có thêm buffer padding 3 dòng)
    const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - 3);
    const endIndex = Math.min(this.items.length, Math.ceil((scrollTop + containerHeight) / this.itemHeight) + 3);

    const visibleItems = this.items.slice(startIndex, endIndex);
    const offsetY = startIndex * this.itemHeight;

    this.contentEl.style.transform = `translateY(${offsetY}px)`;
    
    // Render các thẻ HTML trong vùng nhìn thấy
    this.contentEl.innerHTML = visibleItems
      .map((item, idx) => this.renderItemFn(item, startIndex + idx))
      .join('');
  }

  destroy() {
    if (this.container && this.onScrollHandler) {
      this.container.removeEventListener('scroll', this.onScrollHandler);
    }
  }
}
