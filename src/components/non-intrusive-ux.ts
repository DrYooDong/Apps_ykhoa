/**
 * CliniPortal — Non-Intrusive Clinical UX Engine
 * Inspired by Abridge AI & Clean Clinical UI principles:
 * - Focus/Zen Mode (Keyboard shortcut 'F' / 'Escape')
 * - Non-blocking Slide-over Drawer for Evidence & Clinical Context
 * - Progressive Disclosure support
 * - Ambient Toast Notifications (No disruptive window.alert)
 */

export type ToastType = 'info' | 'success' | 'warning' | 'danger';

export interface DrawerOptions {
  title: string;
  badge?: string;
  content: string;
}

export class ClinicalNonIntrusiveUX {
  private static instance: ClinicalNonIntrusiveUX;
  public isFocusMode: boolean = false;
  public activeDrawer: HTMLElement | null = null;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): ClinicalNonIntrusiveUX {
    if (!ClinicalNonIntrusiveUX.instance) {
      ClinicalNonIntrusiveUX.instance = new ClinicalNonIntrusiveUX();
    }
    return ClinicalNonIntrusiveUX.instance;
  }

  public init(): void {
    if (this.initialized || typeof document === 'undefined') return;
    this.initialized = true;

    this.initFocusMode();
    this.initSlideDrawer();
    this.initToastSystem();
    this.initKeyboardShortcuts();
  }

  /* ------------------------------------------------------------------------
     1. Focus Mode (Distraction-Free Clinical Reading)
     ------------------------------------------------------------------------ */
  private initFocusMode(): void {
    if (!document.querySelector('.focus-mode-indicator')) {
      const indicator = document.createElement('div');
      indicator.className = 'focus-mode-indicator';
      indicator.style.display = 'none';
      indicator.setAttribute('role', 'status');
      indicator.setAttribute('aria-live', 'polite');
      indicator.innerHTML = `
        <span><i class="fa-solid fa-feather"></i> Chế độ Đọc Tập Trung</span>
        <button type="button" class="focus-mode-btn-exit" title="Thoát (Esc)">
          <i class="fa-solid fa-xmark"></i> Thoát (Esc)
        </button>
      `;
      document.body.appendChild(indicator);

      const exitBtn = indicator.querySelector('.focus-mode-btn-exit');
      if (exitBtn) {
        exitBtn.addEventListener('click', () => {
          this.setFocusMode(false);
        });
      }
    }

    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const toggleBtn = target?.closest('.btn-focus-toggle, [data-action="toggle-focus"]');
      if (toggleBtn) {
        e.preventDefault();
        this.toggleFocusMode();
      }
    });
  }

  public toggleFocusMode(): void {
    this.setFocusMode(!this.isFocusMode);
  }

  public setFocusMode(enabled: boolean): void {
    this.isFocusMode = enabled;
    document.body.classList.toggle('clinical-focus-mode', enabled);

    const indicator = document.querySelector<HTMLElement>('.focus-mode-indicator');
    if (indicator) {
      indicator.style.display = enabled ? 'inline-flex' : 'none';
    }

    const buttons = document.querySelectorAll('.btn-focus-toggle, [data-action="toggle-focus"]');
    buttons.forEach((btn) => {
      btn.classList.toggle('active', enabled);
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    });

    if (enabled) {
      this.showToast('Đã bật Chế độ Đọc Tập Trung (Nhấn Esc để thoát)', 'info', 2500);
    }
  }

  /* ------------------------------------------------------------------------
     2. Slide-over Evidence & Context Drawer
     ------------------------------------------------------------------------ */
  private initSlideDrawer(): void {
    let backdrop = document.querySelector<HTMLElement>('.clinical-drawer-backdrop');
    let drawer = document.querySelector<HTMLElement>('.clinical-drawer');

    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.className = 'clinical-drawer';
      drawer.id = 'clinicalGlobalDrawer';
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.innerHTML = `
        <div class="clinical-drawer-header">
          <div class="clinical-drawer-title-wrap">
            <span class="clinical-drawer-badge" id="clinicalDrawerBadge">EBM Evidence</span>
            <h3 class="clinical-drawer-title" id="clinicalDrawerTitle">Chi tiết Bằng chứng</h3>
          </div>
          <button type="button" class="clinical-drawer-close" aria-label="Đóng panel">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="clinical-drawer-body" id="clinicalDrawerBody"></div>
        <div class="clinical-drawer-footer">
          <button type="button" class="btn-sm btn-outline clinical-drawer-close-btn" style="padding: 0.4rem 0.8rem; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-surface); cursor: pointer;">
            Đóng
          </button>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'clinical-drawer-backdrop';
      document.body.appendChild(backdrop);
    }

    const closeDrawer = () => this.closeDrawer();
    backdrop.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('.clinical-drawer-close, .clinical-drawer-close-btn').forEach(btn => {
      btn.addEventListener('click', closeDrawer);
    });

    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const trigger = target?.closest('[data-drawer-trigger], .evidence-link-trigger, [data-evidence-title]');
      if (trigger) {
        e.preventDefault();
        const title = trigger.getAttribute('data-evidence-title') || (trigger as HTMLElement).innerText.trim() || 'Bằng chứng Lâm sàng';
        const badge = trigger.getAttribute('data-evidence-badge') || 'EBM Evidence';
        
        let content = '';
        const targetId = trigger.getAttribute('data-drawer-target');
        if (targetId) {
          const el = document.querySelector(targetId);
          if (el) content = el.innerHTML;
        } else {
          content = trigger.getAttribute('data-evidence-content') || 
                    `<p>Thông tin trích dẫn chi tiết hoặc khuyến cáo lâm sàng tương ứng.</p>`;
        }

        this.openDrawer({ title, badge, content });
      }
    });
  }

  public openDrawer(options: DrawerOptions): void {
    const drawer = document.querySelector<HTMLElement>('.clinical-drawer');
    const backdrop = document.querySelector<HTMLElement>('.clinical-drawer-backdrop');
    if (!drawer || !backdrop) return;

    const titleEl = drawer.querySelector<HTMLElement>('#clinicalDrawerTitle');
    const badgeEl = drawer.querySelector<HTMLElement>('#clinicalDrawerBadge');
    const bodyEl = drawer.querySelector<HTMLElement>('#clinicalDrawerBody');

    if (titleEl) titleEl.innerText = options.title;
    if (badgeEl) badgeEl.innerText = options.badge || 'EBM Evidence';
    if (bodyEl) bodyEl.innerHTML = options.content;

    drawer.classList.add('active');
    backdrop.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    this.activeDrawer = drawer;
  }

  public closeDrawer(): void {
    const drawer = document.querySelector<HTMLElement>('.clinical-drawer');
    const backdrop = document.querySelector<HTMLElement>('.clinical-drawer-backdrop');
    if (drawer) {
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) {
      backdrop.classList.remove('active');
    }
    this.activeDrawer = null;
  }

  /* ------------------------------------------------------------------------
     3. Ambient Toast System
     ------------------------------------------------------------------------ */
  private initToastSystem(): void {
    if (!document.querySelector('.ambient-toast-container')) {
      const container = document.createElement('div');
      container.className = 'ambient-toast-container';
      document.body.appendChild(container);
    }
  }

  public showToast(message: string, type: ToastType = 'info', duration: number = 3500): void {
    const container = document.querySelector('.ambient-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `ambient-toast ${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'warning') icon = 'fa-triangle-exclamation';
    if (type === 'danger')  icon = 'fa-circle-exclamation';

    toast.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
      </div>
      <button type="button" style="background:transparent; border:none; cursor:pointer; color:var(--color-text-muted);" aria-label="Đóng">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector('button');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.dismissToast(toast);
      });
    }

    if (duration > 0) {
      setTimeout(() => {
        this.dismissToast(toast);
      }, duration);
    }
  }

  public dismissToast(toast: HTMLElement | null): void {
    if (!toast || !toast.parentNode) return;
    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }

  /* ------------------------------------------------------------------------
     4. Keyboard Shortcuts (F for Focus, Escape for Exit/Close)
     ------------------------------------------------------------------------ */
  private initKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || (target && target.isContentEditable)) {
        return;
      }

      if (e.key === 'Escape') {
        if (this.activeDrawer) {
          this.closeDrawer();
          return;
        }
        if (this.isFocusMode) {
          this.setFocusMode(false);
          return;
        }
      }

      if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        this.toggleFocusMode();
      }
    });
  }
}

export const clinicalNonIntrusiveUX = ClinicalNonIntrusiveUX.getInstance();

// Backward compatibility with window
if (typeof window !== 'undefined') {
  (window as any).ClinicalNonIntrusive = clinicalNonIntrusiveUX;
}
