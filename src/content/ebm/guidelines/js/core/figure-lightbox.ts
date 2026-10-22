/**
 * CliniPortal — Figure Container & Lightbox Engine (TypeScript)
 * Path: js/core/figure-lightbox.ts
 * 
 * Clinical Publishing Standard for Figures, Medical Diagrams & Tables in EBM Guidelines.
 * Features:
 * - Collects and synchronizes all figures/tables in current article into an interactive gallery
 * - Smooth modal zoom, drag-to-pan, pinch-to-zoom (mobile), double-click toggle
 * - Prev/Next navigation with keyboard shortcuts (ArrowLeft, ArrowRight, Escape, +, -)
 * - Auto-extracts figure number, title, caption text, and source attribution
 */

export interface FigureItem {
  id: string;
  src: string;
  alt: string;
  number: string;
  title: string;
  caption: string;
  source: string;
}

class FigureLightboxManager {
  private static instance: FigureLightboxManager;
  private overlayEl: HTMLElement | null = null;
  private currentItems: FigureItem[] = [];
  private currentIndex: number = 0;
  private currentZoom: number = 1.0;
  private isDragging: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private translateX: number = 0;
  private translateY: number = 0;
  private initialPinchDist: number = 0;
  private initialZoom: number = 1.0;

  private constructor() {
    this.initKeyboardListener();
  }

  public static getInstance(): FigureLightboxManager {
    if (!FigureLightboxManager.instance) {
      FigureLightboxManager.instance = new FigureLightboxManager();
    }
    return FigureLightboxManager.instance;
  }

  /**
   * Quét và kích hoạt toàn bộ figure cards trong container bài viết
   */
  public hydrate(mountEl?: HTMLElement | null): void {
    const container = mountEl || document;
    const cards = container.querySelectorAll<HTMLElement>(
      '.figure-card, .fig-card, figure.ebm-figure, [data-lightbox]'
    );

    this.currentItems = [];

    cards.forEach((card, idx) => {
      // Tìm thẻ img
      const img = card.querySelector<HTMLImageElement>('img');
      if (!img) return;

      const cardId = card.id || `figure-item-${idx}`;
      if (!card.id) card.id = cardId;

      // Trích xuất số hiệu (Fig 1, Table 4...)
      const numEl = card.querySelector('.figure-card-number, .fig-badge, .fig-num');
      let figureNumber = numEl?.textContent?.trim() || '';

      // Trích xuất tiêu đề
      const titleEl = card.querySelector('.figure-card-header span:not(.figure-card-number), .fig-title, .figure-card-title');
      let title = titleEl?.textContent?.trim() || '';

      // Trích xuất caption
      const captionEl = card.querySelector('.figure-card-caption, .fig-caption, figcaption');
      let caption = captionEl ? captionEl.innerHTML : (img.alt || '');

      // Trích xuất nguồn (source)
      const sourceEl = card.querySelector('.figure-card-source, .fig-source');
      let source = sourceEl?.textContent?.trim() || '';

      // Tự động suy luận số hiệu nếu chưa có
      if (!figureNumber) {
        const titleMatch = title.match(/^(Fig(?:ure)?\s*\d+|Table\s*\d+|Hình\s*\d+|Bảng\s*\d+)/i);
        if (titleMatch) {
          figureNumber = titleMatch[1];
        } else {
          figureNumber = `Fig ${idx + 1}`;
        }
      }

      if (!title) {
        title = img.alt || `Hình minh họa ${idx + 1}`;
      }

      const item: FigureItem = {
        id: cardId,
        src: img.src || img.getAttribute('src') || '',
        alt: img.alt || title,
        number: figureNumber,
        title: title,
        caption: caption,
        source: source
      };

      const itemIndex = this.currentItems.length;
      this.currentItems.push(item);

      // Thêm zoom hint pill nếu chưa có
      const bodyEl = card.querySelector('.figure-card-body, .fig-img-wrap') || card;
      if (!bodyEl.querySelector('.fig-zoom-hint')) {
        const hint = document.createElement('div');
        hint.className = 'fig-zoom-hint';
        hint.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i> Phóng to';
        bodyEl.appendChild(hint);
      }

      // Gắn sự kiện click mở lightbox
      if (!card.dataset.lightboxBound) {
        card.dataset.lightboxBound = 'true';
        card.style.cursor = 'zoom-in';

        const clickTarget = card.querySelector('.figure-card-body, .fig-img-wrap, img') || card;
        clickTarget.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          // Cập nhật lại src thực tế (đề phòng img.src vừa được normalize hoặc lazy-load)
          item.src = img.currentSrc || img.src;
          this.open(itemIndex);
        });
      }
    });
  }

  /**
   * Mở modal lightbox tại index cụ thể
   */
  public open(index: number): void {
    if (!this.currentItems.length) return;
    this.ensureOverlayExists();
    this.currentIndex = Math.max(0, Math.min(index, this.currentItems.length - 1));
    this.resetTransform();
    this.updateContent();

    if (this.overlayEl) {
      this.overlayEl.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Đóng modal lightbox
   */
  public close(): void {
    if (this.overlayEl) {
      this.overlayEl.classList.remove('active');
      document.body.style.removeProperty('overflow');
    }
  }

  /**
   * Chuyển đến ảnh trước đó
   */
  public prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.resetTransform();
      this.updateContent();
    }
  }

  /**
   * Chuyển đến ảnh tiếp theo
   */
  public next(): void {
    if (this.currentIndex < this.currentItems.length - 1) {
      this.currentIndex++;
      this.resetTransform();
      this.updateContent();
    }
  }

  /**
   * Phóng to (Zoom In)
   */
  public zoomIn(): void {
    this.setZoom(this.currentZoom + 0.35);
  }

  /**
   * Thu nhỏ (Zoom Out)
   */
  public zoomOut(): void {
    this.setZoom(this.currentZoom - 0.35);
  }

  /**
   * Thiết lập mức zoom với chặn biên [0.6, 4.5]
   */
  private setZoom(zoom: number): void {
    this.currentZoom = Math.max(0.6, Math.min(4.5, zoom));
    if (this.currentZoom === 1.0) {
      this.translateX = 0;
      this.translateY = 0;
    }
    this.applyTransform();
  }

  /**
   * Hoàn nguyên vị trí và tỉ lệ zoom
   */
  private resetTransform(): void {
    this.currentZoom = 1.0;
    this.translateX = 0;
    this.translateY = 0;
    this.applyTransform();
  }

  private applyTransform(): void {
    const viewport = this.overlayEl?.querySelector<HTMLElement>('.figure-lightbox-viewport');
    if (viewport) {
      viewport.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.currentZoom})`;
    }
    const stage = this.overlayEl?.querySelector<HTMLElement>('.figure-lightbox-stage');
    if (stage) {
      stage.style.cursor = this.currentZoom > 1.05 ? 'grab' : 'zoom-in';
    }
  }

  /**
   * Cập nhật nội dung hiển thị cho index hiện tại
   */
  private updateContent(): void {
    if (!this.overlayEl || !this.currentItems[this.currentIndex]) return;
    const item = this.currentItems[this.currentIndex];

    // Cập nhật Badge & Tiêu đề
    const badgeEl = this.overlayEl.querySelector<HTMLElement>('.figure-lightbox-badge');
    if (badgeEl) badgeEl.textContent = item.number;

    const titleEl = this.overlayEl.querySelector<HTMLElement>('.figure-lightbox-title');
    if (titleEl) titleEl.textContent = item.title;

    const counterEl = this.overlayEl.querySelector<HTMLElement>('.figure-lightbox-counter');
    if (counterEl) counterEl.textContent = `${this.currentIndex + 1} / ${this.currentItems.length}`;

    // Cập nhật Ảnh
    const imgEl = this.overlayEl.querySelector<HTMLImageElement>('.figure-lightbox-img');
    if (imgEl) {
      imgEl.src = item.src;
      imgEl.alt = item.alt;
    }

    // Cập nhật Caption & Source
    const captionEl = this.overlayEl.querySelector<HTMLElement>('.figure-lightbox-caption-text');
    if (captionEl) {
      captionEl.innerHTML = item.caption || item.alt;
    }

    const sourceEl = this.overlayEl.querySelector<HTMLElement>('.figure-lightbox-caption-source');
    if (sourceEl) {
      sourceEl.textContent = item.source ? `Nguồn: ${item.source}` : '';
      sourceEl.style.display = item.source ? 'block' : 'none';
    }

    // Cập nhật trạng thái nút Prev/Next
    const prevBtn = this.overlayEl.querySelector<HTMLButtonElement>('.figure-lightbox-nav.prev');
    if (prevBtn) prevBtn.disabled = this.currentIndex === 0;

    const nextBtn = this.overlayEl.querySelector<HTMLButtonElement>('.figure-lightbox-nav.next');
    if (nextBtn) nextBtn.disabled = this.currentIndex === this.currentItems.length - 1;
  }

  /**
   * Khởi tạo cấu trúc DOM của Modal Overlay Lightbox
   */
  private ensureOverlayExists(): void {
    if (this.overlayEl && document.body.contains(this.overlayEl)) return;

    const overlay = document.createElement('div');
    overlay.className = 'figure-lightbox-overlay';
    overlay.id = 'figure-lightbox-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Xem ảnh minh họa chi tiết');

    overlay.innerHTML = `
      <!-- Header Bar -->
      <div class="figure-lightbox-header">
        <div class="figure-lightbox-meta">
          <span class="figure-lightbox-badge">Fig 1</span>
          <span class="figure-lightbox-title">Tiêu đề hình ảnh</span>
          <span class="figure-lightbox-counter">1 / 1</span>
        </div>
        <div class="figure-lightbox-tools">
          <button class="figure-lightbox-btn" id="fig-btn-zoom-in" title="Phóng to (+)">
            <i class="fa-solid fa-magnifying-glass-plus"></i>
          </button>
          <button class="figure-lightbox-btn" id="fig-btn-zoom-out" title="Thu nhỏ (-)">
            <i class="fa-solid fa-magnifying-glass-minus"></i>
          </button>
          <button class="figure-lightbox-btn" id="fig-btn-reset" title="Khôi phục kích thước ban đầu (1:1)">
            <i class="fa-solid fa-compress"></i>
          </button>
          <button class="figure-lightbox-btn" id="fig-btn-download" title="Mở ảnh trong tab mới">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </button>
          <button class="figure-lightbox-btn btn-close" id="fig-btn-close" title="Đóng (ESC)">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Main Stage with Viewport & Navigation -->
      <div class="figure-lightbox-stage">
        <button class="figure-lightbox-nav prev" id="fig-nav-prev" title="Ảnh trước (Mũi tên trái)">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div class="figure-lightbox-viewport">
          <img class="figure-lightbox-img" src="" alt="" draggable="false" />
        </div>

        <button class="figure-lightbox-nav next" id="fig-nav-next" title="Ảnh tiếp theo (Mũi tên phải)">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <!-- Caption & Attribution Tray -->
      <div class="figure-lightbox-caption-tray">
        <div class="figure-lightbox-caption-text"></div>
        <div class="figure-lightbox-caption-source"></div>
        <div class="figure-lightbox-hints">
          <span><kbd>ESC</kbd> Đóng</span>
          <span><kbd>←</kbd> <kbd>→</kbd> Chuyển ảnh</span>
          <span><kbd>+</kbd> <kbd>-</kbd> Phóng to/Thu nhỏ</span>
          <span><kbd>Cuộn chuột</kbd> Zoom</span>
          <span><kbd>Kéo thả</kbd> Di chuyển ảnh</span>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this.overlayEl = overlay;

    // Gắn sự kiện các nút điều khiển
    overlay.querySelector('#fig-btn-close')?.addEventListener('click', () => this.close());
    overlay.querySelector('#fig-btn-zoom-in')?.addEventListener('click', () => this.zoomIn());
    overlay.querySelector('#fig-btn-zoom-out')?.addEventListener('click', () => this.zoomOut());
    overlay.querySelector('#fig-btn-reset')?.addEventListener('click', () => this.resetTransform());
    overlay.querySelector('#fig-nav-prev')?.addEventListener('click', () => this.prev());
    overlay.querySelector('#fig-nav-next')?.addEventListener('click', () => this.next());

    // Nút mở tab mới
    overlay.querySelector('#fig-btn-download')?.addEventListener('click', () => {
      const currentItem = this.currentItems[this.currentIndex];
      if (currentItem?.src) {
        window.open(currentItem.src, '_blank');
      }
    });

    // Click ra nền backdrop để đóng (chỉ khi không zoom)
    const stage = overlay.querySelector<HTMLElement>('.figure-lightbox-stage');
    stage?.addEventListener('click', (e) => {
      if (e.target === stage && this.currentZoom === 1.0) {
        this.close();
      }
    });

    // Double-click để phóng to/thu nhỏ nhanh
    stage?.addEventListener('dblclick', (e) => {
      e.preventDefault();
      if (this.currentZoom > 1.05) {
        this.resetTransform();
      } else {
        this.setZoom(2.2);
      }
    });

    // Mouse wheel zoom
    stage?.addEventListener('wheel', (e: any) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      this.setZoom(this.currentZoom + delta);
    }, { passive: false });

    // Drag-to-pan khi phóng to
    stage?.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.button !== 0 || this.currentZoom <= 1.0) return;
      this.isDragging = true;
      this.startX = e.clientX - this.translateX;
      this.startY = e.clientY - this.translateY;
      stage.classList.add('dragging');
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isDragging) return;
      e.preventDefault();
      this.translateX = e.clientX - this.startX;
      this.translateY = e.clientY - this.startY;
      this.applyTransform();
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        stage?.classList.remove('dragging');
      }
    });

    // Touch events for Mobile (Pinch-to-zoom & Swipe/Pan)
    stage?.addEventListener('touchstart', (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Bắt đầu pinch
        this.initialPinchDist = this.getTouchDistance(e.touches[0], e.touches[1]);
        this.initialZoom = this.currentZoom;
      } else if (e.touches.length === 1 && this.currentZoom > 1.0) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX - this.translateX;
        this.startY = e.touches[0].clientY - this.translateY;
      }
    }, { passive: true });

    stage?.addEventListener('touchmove', (e: TouchEvent) => {
      if (e.touches.length === 2 && this.initialPinchDist > 0) {
        e.preventDefault();
        const dist = this.getTouchDistance(e.touches[0], e.touches[1]);
        const factor = dist / this.initialPinchDist;
        this.setZoom(this.initialZoom * factor);
      } else if (e.touches.length === 1 && this.isDragging) {
        e.preventDefault();
        this.translateX = e.touches[0].clientX - this.startX;
        this.translateY = e.touches[0].clientY - this.startY;
        this.applyTransform();
      }
    }, { passive: false });

    stage?.addEventListener('touchend', (e: TouchEvent) => {
      if (e.touches.length < 2) {
        this.initialPinchDist = 0;
      }
      if (e.touches.length === 0) {
        this.isDragging = false;
      }
    });
  }

  private getTouchDistance(t1: Touch, t2: Touch): number {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Lắng nghe phím bấm toàn cục
   */
  private initKeyboardListener(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!this.overlayEl?.classList.contains('active')) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          this.close();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.prev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.next();
          break;
        case '+':
        case '=':
          e.preventDefault();
          this.zoomIn();
          break;
        case '-':
        case '_':
          e.preventDefault();
          this.zoomOut();
          break;
        case '0':
          e.preventDefault();
          this.resetTransform();
          break;
      }
    });
  }
}

/**
 * Hàm xuất ra để hydration trong Reader View và bất kỳ trang nào
 */
export function hydrateFigureCards(mountEl?: HTMLElement | null): void {
  FigureLightboxManager.getInstance().hydrate(mountEl);
}
