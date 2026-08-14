/**
 * EBM Premium UI System (Animations, Reading Progress, FAB, Toast Notifications)
 * Path: src/content/ebm/js/ebm-premium-system.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface FabItem {
  icon: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export function initScrollAnimations(): void {
  const animatedElements = document.querySelectorAll('.anim-fade-in-up, .anim-pop');
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  animatedElements.forEach(el => {
    (el as HTMLElement).style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

export function initReadingProgress(): void {
  if (document.body.scrollHeight <= window.innerHeight * 1.5) return;
  if (document.querySelector('.reading-progress-container')) return;

  const container = document.createElement('div');
  container.className = 'reading-progress-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: transparent;
    z-index: 9999;
  `;

  const bar = document.createElement('div');
  bar.className = 'reading-progress-bar';
  bar.style.cssText = `
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--color-primary, #0284c7), #06b6d4);
    transition: width 0.1s;
  `;

  container.appendChild(bar);
  document.body.appendChild(container);

  window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPos = window.scrollY;
    if (scrollTotal > 0) {
      const progress = (scrollPos / scrollTotal) * 100;
      bar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

export function setupFAB(items: FabItem[]): void {
  const existing = document.querySelector('.ebm-fab-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.className = 'ebm-fab-container';

  const menu = document.createElement('div');
  menu.className = 'ebm-fab-menu';

  items.forEach(item => {
    const el = document.createElement(item.href ? 'a' : 'div');
    el.className = 'ebm-fab-item';
    if (item.href && el instanceof HTMLAnchorElement) el.href = item.href;
    el.innerHTML = item.icon;
    el.setAttribute('data-tooltip', item.label);
    if (item.onClick) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        item.onClick?.();
        container.classList.remove('active');
      });
    }
    menu.appendChild(el);
  });

  const mainBtn = document.createElement('button');
  mainBtn.className = 'ebm-fab-main';
  mainBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
  mainBtn.addEventListener('click', () => {
    container.classList.toggle('active');
  });

  container.appendChild(menu);
  container.appendChild(mainBtn);
  document.body.appendChild(container);
}

export function showEbmToast(title: string, message: string, type: 'success' | 'info' | 'warning' | 'danger' = 'info'): void {
  let container = document.getElementById('ebm-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ebm-toast-container';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 10000;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bgMap = { success: '#dcfce7', info: '#e0f2fe', warning: '#fef3c7', danger: '#fee2e2' };
  const colorMap = { success: '#166534', info: '#0369a1', warning: '#92400e', danger: '#991b1b' };

  toast.style.cssText = `
    background: ${bgMap[type] || '#f8fafc'};
    color: ${colorMap[type] || '#0f172a'};
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 0.85rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: opacity 0.3s, transform 0.3s;
  `;
  toast.innerHTML = `<strong>${title}</strong><div style="font-size:0.8rem; margin-top:2px;">${message}</div>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

if (typeof window !== 'undefined') {
  (window as any).setupFAB = setupFAB;
  (window as any).showEbmToast = showEbmToast;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAnimations();
      initReadingProgress();
    });
  } else {
    initScrollAnimations();
    initReadingProgress();
  }
}
