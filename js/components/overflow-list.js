/**
 * ============================================================================
 * OVERFLOW LIST COMPONENT — Mantine v9 Inspired
 * Tự động thu gọn các Tab/Nav items thừa vào Dropdown "Thêm..." bằng ResizeObserver
 * ============================================================================
 */

export class OverflowList {
  /**
   * Khởi tạo Overflow List điều hướng
   * @param {HTMLElement} containerEl - Container chứa các thẻ item (.overflow-list)
   */
  constructor(containerEl) {
    if (!containerEl) return;
    this.container = containerEl;
    this.items = Array.from(this.container.children).filter(el => !el.classList.contains('overflow-list__dropdown'));
    this.init();
  }

  init() {
    this.container.classList.add('overflow-list-active');

    // Tạo nút Dropdown "Thêm..."
    this.dropdownEl = document.createElement('div');
    this.dropdownEl.className = 'overflow-list__dropdown';
    this.dropdownEl.style.display = 'none';
    this.dropdownEl.innerHTML = `
      <button class="overflow-list__trigger" type="button" aria-haspopup="true">
        <span>Thêm</span>
        <i class="fa-solid fa-chevron-down"></i>
      </button>
      <div class="overflow-list__menu"></div>
    `;
    this.container.appendChild(this.dropdownEl);

    this.menuEl = this.dropdownEl.querySelector('.overflow-list__menu');
    this.triggerBtn = this.dropdownEl.querySelector('.overflow-list__trigger');

    this.triggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.dropdownEl.classList.toggle('is-open');
    });

    document.addEventListener('click', () => {
      this.dropdownEl.classList.remove('is-open');
    });

    // ResizeObserver lắng nghe biến đổi kích thước
    this.ro = new ResizeObserver(() => this.calculateOverflow());
    this.ro.observe(this.container);
    this.calculateOverflow();
  }

  calculateOverflow() {
    // Trả lại trạng thái ban đầu để đo đạc
    this.items.forEach(item => item.style.display = '');
    this.dropdownEl.style.display = 'none';
    this.menuEl.innerHTML = '';

    const containerWidth = this.container.clientWidth;
    let accumulatedWidth = 0;
    const overflowItems = [];
    const dropdownWidth = 90; // Ước tính nút "Thêm"

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const itemWidth = item.offsetWidth + parseFloat(getComputedStyle(item).marginRight || 0);

      if (accumulatedWidth + itemWidth + dropdownWidth > containerWidth && i > 0) {
        overflowItems.push(...this.items.slice(i));
        break;
      }
      accumulatedWidth += itemWidth;
    }

    if (overflowItems.length > 0) {
      this.dropdownEl.style.display = 'inline-block';
      overflowItems.forEach(item => {
        item.style.display = 'none';
        const clone = item.cloneNode(true);
        clone.style.display = '';
        clone.className = 'overflow-list__menu-item';
        this.menuEl.appendChild(clone);
      });
    }
  }

  destroy() {
    if (this.ro) this.ro.disconnect();
    if (this.dropdownEl) this.dropdownEl.remove();
  }
}
