/**
 * ============================================================================
 * FLOATING WINDOW COMPONENT — Mantine v9 Inspired
 * Cửa sổ nổi tương tác Drag, Resize, Minimize cho Máy tính & Tra cứu Y khoa
 * ============================================================================
 */

export class FloatingWindow {
  /**
   * Khởi tạo Cửa sổ nổi Drag & Resize
   * @param {Object} options
   * @param {string} options.title - Tiêu đề cửa sổ
   * @param {string|HTMLElement} options.content - Nội dung HTML hoặc phần tử DOM
   * @param {number} [options.width=360] - Chiều rộng ban đầu (px)
   * @param {number} [options.height=300] - Chiều cao ban đầu (px)
   * @param {number} [options.x] - Vị trí X ban đầu (mặc định căn giữa)
   * @param {number} [options.y] - Vị trí Y ban đầu
   */
  constructor({ title = 'Cửa sổ Y khoa', content = '', width = 360, height = 300, x, y }) {
    this.title = title;
    this.content = content;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.isMinimized = false;

    this.createElement();
    this.attachEvents();
    document.body.appendChild(this.el);
  }

  createElement() {
    this.el = document.createElement('div');
    this.el.className = 'floating-window';
    this.el.style.width = `${this.width}px`;
    this.el.style.height = `${this.height}px`;

    // Tính vị trí mặc định nếu không truyền vào
    const initialX = this.x !== undefined ? this.x : Math.max(20, (window.innerWidth - this.width) / 2);
    const initialY = this.y !== undefined ? this.y : Math.max(20, (window.innerHeight - this.height) / 2);
    
    this.el.style.left = `${initialX}px`;
    this.el.style.top = `${initialY}px`;

    this.el.innerHTML = `
      <div class="floating-window__header" data-drag-handle>
        <h4 class="floating-window__title">
          <i class="fa-solid fa-window-restore" style="color: var(--color-primary);"></i>
          <span>${this.title}</span>
        </h4>
        <div class="floating-window__controls">
          <button class="floating-window__btn" data-btn-minimize title="Thu nhỏ/Mở rộng">
            <i class="fa-solid fa-minus"></i>
          </button>
          <button class="floating-window__btn floating-window__btn--close" data-btn-close title="Đóng">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="floating-window__body"></div>
      <div class="floating-window__resize-handle" data-resize-handle></div>
    `;

    const bodyEl = this.el.querySelector('.floating-window__body');
    if (typeof this.content === 'string') {
      bodyEl.innerHTML = this.content;
    } else if (this.content instanceof HTMLElement) {
      bodyEl.appendChild(this.content);
    }
  }

  attachEvents() {
    const headerEl = this.el.querySelector('[data-drag-handle]');
    const minBtn = this.el.querySelector('[data-btn-minimize]');
    const closeBtn = this.el.querySelector('[data-btn-close]');
    const resizeHandle = this.el.querySelector('[data-resize-handle]');

    // 1. Drag Logic
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    const onPointerDown = (e) => {
      if (e.target.closest('.floating-window__controls')) return;
      isDragging = true;
      this.el.classList.add('is-dragging');
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = this.el.offsetLeft;
      initialTop = this.el.offsetTop;

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      // Bound checks trong viewport
      newLeft = Math.max(0, Math.min(window.innerWidth - this.el.offsetWidth, newLeft));
      newTop = Math.max(0, Math.min(window.innerHeight - this.el.offsetHeight, newTop));

      this.el.style.left = `${newLeft}px`;
      this.el.style.top = `${newTop}px`;
    };

    const onPointerUp = () => {
      isDragging = false;
      this.el.classList.remove('is-dragging');
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    headerEl.addEventListener('pointerdown', onPointerDown);

    // 2. Minimize & Close
    minBtn.addEventListener('click', () => this.toggleMinimize());
    closeBtn.addEventListener('click', () => this.close());

    // 3. Resize Logic
    let isResizing = false;
    let rStartX, rStartY, startWidth, startHeight;

    resizeHandle.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isResizing = true;
      rStartX = e.clientX;
      rStartY = e.clientY;
      startWidth = this.el.offsetWidth;
      startHeight = this.el.offsetHeight;

      const onResizeMove = (re) => {
        if (!isResizing) return;
        const newW = Math.max(280, startWidth + (re.clientX - rStartX));
        const newH = Math.max(180, startHeight + (re.clientY - rStartY));
        this.el.style.width = `${newW}px`;
        this.el.style.height = `${newH}px`;
      };

      const onResizeUp = () => {
        isResizing = false;
        document.removeEventListener('pointermove', onResizeMove);
        document.removeEventListener('pointerup', onResizeUp);
      };

      document.addEventListener('pointermove', onResizeMove);
      document.addEventListener('pointerup', onResizeUp);
    });
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
    this.el.classList.toggle('is-minimized', this.isMinimized);
    const minIcon = this.el.querySelector('[data-btn-minimize] i');
    if (minIcon) {
      minIcon.className = this.isMinimized ? 'fa-solid fa-square' : 'fa-solid fa-minus';
    }
  }

  close() {
    if (this.el) {
      this.el.remove();
    }
  }
}
