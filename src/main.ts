/**
 * CliniPortal Main Application Bootstrap (main.ts)
 * Path: src/main.ts
 */

export class CliniPortalThemeManager {
  private static html = document.documentElement;

  public static getSavedTheme(): string {
    const saved = localStorage.getItem('cliniportal_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  public static applyTheme(theme: string): void {
    this.html.setAttribute('data-theme', theme);
    document.body?.setAttribute('data-theme', theme);
    localStorage.setItem('cliniportal_theme', theme);

    const isDark = theme === 'dark';
    const themeBtns = document.querySelectorAll<HTMLElement>('#theme-toggle-btn, #themeToggleBtn, .theme-toggle-btn');
    themeBtns.forEach(btn => {
      btn.setAttribute('title', isDark ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối');
      btn.setAttribute('aria-label', isDark ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối');
      btn.innerHTML = isDark 
        ? '<i class="fa-solid fa-sun" style="color:#f59e0b;"></i>' 
        : '<i class="fa-solid fa-moon" style="color:#8b5cf6;"></i>';
    });

    window.dispatchEvent(new CustomEvent('cliniportal-theme-change', { detail: { theme } }));
  }

  public static toggleTheme(): void {
    const current = this.html.getAttribute('data-theme') || this.getSavedTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
  }

  public static init(): void {
    const theme = this.getSavedTheme();
    this.applyTheme(theme);

    document.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('#theme-toggle-btn, #themeToggleBtn, .theme-toggle-trigger');
      if (btn) {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('appSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    mobileMenuBtn?.addEventListener('click', () => {
      sidebar?.classList.toggle('mobile-open');
      overlay?.classList.toggle('active');
    });

    overlay?.addEventListener('click', () => {
      sidebar?.classList.remove('mobile-open');
      overlay?.classList.remove('active');
    });
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CliniPortalThemeManager.init());
  } else {
    CliniPortalThemeManager.init();
  }
}

if (typeof window !== 'undefined') {
  (window as any).CliniPortalTheme = {
    toggleTheme: () => CliniPortalThemeManager.toggleTheme(),
    getTheme: () => CliniPortalThemeManager.getSavedTheme()
  };
}
