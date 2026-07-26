/**
 * Reusable Modal UI Component
 * Hiển thị hộp thoại Modal cho các công cụ, giải thích lâm sàng hoặc lịch sử tính toán.
 */

export interface ModalConfig {
  title: string;
  content: string;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export class CliniModal {
  private modalEl: HTMLElement | null = null;

  constructor() {}

  /**
   * Mở modal với cấu hình cụ thể
   */
  public open(config: ModalConfig): void {
    this.close(); // Đóng modal cũ nếu có

    const modal = document.createElement('div');
    modal.className = `clini-modal-overlay modal-size-${config.size || 'md'}`;
    modal.innerHTML = `
      <div class="clini-modal-dialog">
        <div class="clini-modal-header">
          <h3 class="clini-modal-title">${config.title}</h3>
          <button class="clini-modal-close-btn" aria-label="Close">×</button>
        </div>
        <div class="clini-modal-body">
          ${config.content}
        </div>
      </div>
    `;

    const closeBtn = modal.querySelector('.clini-modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.close();
        if (config.onClose) config.onClose();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.close();
        if (config.onClose) config.onClose();
      }
    });

    document.body.appendChild(modal);
    this.modalEl = modal;
  }

  /**
   * Đóng modal hiện tại
   */
  public close(): void {
    if (this.modalEl && this.modalEl.parentNode) {
      this.modalEl.parentNode.removeChild(this.modalEl);
      this.modalEl = null;
    }
  }
}

export const modal = new CliniModal();
