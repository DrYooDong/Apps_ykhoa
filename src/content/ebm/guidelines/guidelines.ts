/**
 * Guidelines Main Entry Hub Controller (guidelines.ts)
 * Path: src/content/ebm/guidelines/guidelines.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export function toggleSidebar(): void {
  const leftNav = document.getElementById('left-nav');
  const appShell = document.querySelector('.app-shell');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!leftNav) return;

  const isMobile = window.innerWidth <= 1024;
  if (isMobile) {
    const isOpen = leftNav.classList.toggle('mobile-open');
    if (backdrop) backdrop.classList.toggle('active', isOpen);
  } else {
    const isCollapsed = leftNav.classList.toggle('collapsed');
    if (appShell) appShell.classList.toggle('sidebar-collapsed', isCollapsed);
    localStorage.setItem('guidelines_sidebar_collapsed', isCollapsed ? 'true' : 'false');
  }
}

export function closeMobileSidebar(): void {
  if (window.innerWidth <= 1024) {
    const leftNav = document.getElementById('left-nav');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (leftNav) leftNav.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
  }
}

export function initSidebarState(): void {
  const isMobile = window.innerWidth <= 1024;
  const leftNav = document.getElementById('left-nav');
  const appShell = document.querySelector('.app-shell');
  
  if (!isMobile && leftNav) {
    const isCollapsed = localStorage.getItem('guidelines_sidebar_collapsed') === 'true';
    if (isCollapsed) {
      leftNav.classList.add('collapsed');
      if (appShell) appShell.classList.add('sidebar-collapsed');
    }
  }

  if (leftNav) {
    leftNav.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.left-nav-link') || target.closest('button')) {
        closeMobileSidebar();
      }
    });
  }
}

export function initGuidelinesHub(): void {
  initSidebarState();

  const toggleBtn = document.getElementById('btn-toggle-sidebar');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);

  const backdrop = document.getElementById('sidebar-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeMobileSidebar);
}

if (typeof window !== 'undefined') {
  (window as any).toggleSidebar = toggleSidebar;
  (window as any).closeMobileSidebar = closeMobileSidebar;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGuidelinesHub);
  } else {
    initGuidelinesHub();
  }
}
