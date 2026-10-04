/**
 * CliniPortal Theme Manager (Standalone)
 * Path: js/core/theme-manager.ts
 */
export class CliniPortalThemeManager {
  private static STORAGE_KEY = 'cliniportal_theme';

  public static getTheme(): 'light' | 'dark' {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    }
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  public static setTheme(theme: 'light' | 'dark'): void {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, theme);
      }
    }
  }

  public static toggleTheme(): 'light' | 'dark' {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }

  public static init(): void {
    if (typeof document !== 'undefined') {
      const theme = this.getTheme();
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
}

if (typeof window !== 'undefined') {
  (window as any).CliniPortalThemeManager = CliniPortalThemeManager;
  CliniPortalThemeManager.init();
}
