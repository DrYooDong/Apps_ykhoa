/**
 * SPA Hash Router cho CliniPortal 2.0
 * Điều hướng Hash-based (#/category/slug), tương thích 100% với file:///, Electron và Capacitor Mobile.
 */

export interface RouteParams {
  category?: string;
  slug?: string;
  [key: string]: string | undefined;
}

export interface Route {
  path: string;
  title: string;
  handler: (params: RouteParams) => void | Promise<void>;
}

export class CliniRouter {
  private routes: Route[] = [];
  private fallbackHandler: ((hash: string) => void | Promise<void>) | null = null;
  private currentHash: string = '';

  constructor() {
    if (typeof window !== 'undefined') {
      // Check if URL pathname contains kho-guidelines direct path and auto-recover to SPA route
      if (window.location.pathname && window.location.pathname.includes('kho-guidelines/')) {
        const match = window.location.pathname.match(/kho-guidelines\/([^/]+?)(?:\.html)?$/i);
        if (match && match[1] && match[1] !== 'index') {
          window.location.replace(`/#/ebm/kho-guidelines/${match[1]}`);
          return;
        }
      }

      window.addEventListener('hashchange', () => this.handleHashChange());
      window.addEventListener('DOMContentLoaded', () => this.handleHashChange());

      // Global Link Interceptor for Guidelines and SPA routes
      document.addEventListener('click', (e) => {
        const target = (e.target as HTMLElement)?.closest('a');
        if (!target) return;
        const href = target.getAttribute('href');
        if (!href) return;

        // Catch static relative guideline & medical-statistics links
        if (href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#')) {
          if (href.includes('medical-statistics/')) {
            const statMatch = href.match(/medical-statistics\/([^/]+?)(?:\.html)?$/i);
            if (statMatch && statMatch[1] && statMatch[1] !== 'thongkeyhoc' && statMatch[1] !== 'index') {
              e.preventDefault();
              e.stopPropagation();
              this.navigate(`/ebm/medical-statistics/${statMatch[1]}`);
              return;
            }
          }
          if (href.includes('kho-guidelines/')) {
            const slugMatch = href.match(/kho-guidelines\/([^/]+?)(?:\.html)?$/i);
            if (slugMatch && slugMatch[1] && slugMatch[1] !== 'index') {
              e.preventDefault();
              e.stopPropagation();
              this.navigate(`/ebm/kho-guidelines/${slugMatch[1]}`);
              return;
            }
          }
        }
      }, true);
    }
  }

  /**
   * Đăng ký route dạng pattern (ví dụ: '/', '/:category', '/:category/:slug')
   */
  public register(path: string, title: string, handler: Route['handler']): void {
    this.routes.push({ path, title, handler });
  }

  /**
   * Thiết lập fallback handler khi không match route nào
   */
  public setFallback(handler: (hash: string) => void | Promise<void>): void {
    this.fallbackHandler = handler;
  }

  /**
   * Điều hướng thủ công tới một path hoặc hash (ví dụ: '/calculators/abg' hoặc '#/calculators/abg')
   */
  public navigate(targetPath: string): void {
    let cleanHash = targetPath;
    if (!cleanHash.startsWith('#')) {
      cleanHash = `#${targetPath.startsWith('/') ? targetPath : '/' + targetPath}`;
    }
    window.location.hash = cleanHash;
  }

  /**
   * Lấy hash hiện tại mà không có dấu #
   */
  public getHashPath(): string {
    const rawHash = window.location.hash || '#/';
    return rawHash.replace(/^#/, '') || '/';
  }

  /**
   * Xử lý khi URL Hash thay đổi
   */
  private async handleHashChange(): Promise<void> {
    const fullHashPath = this.getHashPath();
    const hashPath = fullHashPath.split('?')[0]; // Strip query parameters for matching
    this.currentHash = hashPath;

    // Highlight active link trong Sidebar / Header
    this.updateActiveNavLinks(hashPath);

    // Tìm match route
    for (const route of this.routes) {
      const params = this.matchRoute(route.path, hashPath);
      if (params !== null) {
        document.title = `${route.title} – CliniPortal`;
        try {
          await route.handler(params);
        } catch (err) {
          console.error(`[CliniRouter] Error executing handler for ${fullHashPath}:`, err);
        }
        return;
      }
    }

    // Nếu không khớp route đã đăng ký, chuyển cho Fallback Handler
    if (this.fallbackHandler) {
      await this.fallbackHandler(fullHashPath);
    } else {
      console.warn(`[CliniRouter] No matching route found for hash: ${hashPath}`);
    }
  }

  /**
   * Match URL pattern (vd: /:category/:slug) với hash path thực tế
   */
  private matchRoute(pattern: string, path: string): RouteParams | null {
    const patternSegments = pattern.split('/').filter(Boolean);
    const pathSegments = path.split('/').filter(Boolean);

    if (patternSegments.length !== pathSegments.length) {
      return null;
    }

    const params: RouteParams = {};
    for (let i = 0; i < patternSegments.length; i++) {
      if (patternSegments[i].startsWith(':')) {
        const paramName = patternSegments[i].slice(1);
        params[paramName] = decodeURIComponent(pathSegments[i]);
      } else if (patternSegments[i] !== pathSegments[i]) {
        return null;
      }
    }

    return params;
  }

  /**
   * Cập nhật style active cho các thẻ <a> matching với hash hiện tại
   */
  private updateActiveNavLinks(currentPath: string): void {
    if (typeof document === 'undefined') return;

    const navLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    navLinks.forEach(link => {
      const linkHash = link.getAttribute('href')?.replace(/^#/, '') || '/';
      if (linkHash === currentPath || (linkHash !== '/' && currentPath.startsWith(linkHash))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  public getCurrentPath(): string {
    return this.getHashPath();
  }

  /**
   * Khởi chạy router xử lý hash ban đầu sau khi đăng ký xong routes
   */
  public init(): void {
    this.handleHashChange();
  }
}

export const router = new CliniRouter();
