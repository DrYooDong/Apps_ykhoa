/**
 * Reusable Header UI Component
 * Tạo và hiển thị Header của CliniPortal, bao gồm nút Dark Mode, Tìm kiếm nhanh và điều hướng.
 */

export interface HeaderConfig {
  title?: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  onToggleTheme?: (theme: 'light' | 'dark') => void;
}

export class CliniHeader {
  private element: HTMLElement | null = null;
  private config: HeaderConfig;

  constructor(config: HeaderConfig = {}) {
    this.config = {
      title: 'CliniPortal',
      showSearch: true,
      ...config,
    };
  }

  /**
   * Render Header vào một container hoặc mount tự động vào <header id="header">
   */
  public mount(targetSelector: string = '#header'): void {
    const target = document.querySelector(targetSelector);
    if (!target) {
      console.warn(`[CliniHeader] Container ${targetSelector} not found.`);
      return;
    }

    target.innerHTML = `
      <div class="clini-header-container">
        <div class="clini-header-logo">
          <a href="./index.html">🏥 ${this.config.title}</a>
        </div>
        ${this.config.showSearch ? `
          <div class="clini-header-search">
            <input type="text" id="clini-quick-search-input" placeholder="Tìm kiếm công cụ, bài viết, triệu chứng... (< 5ms)" />
          </div>
        ` : ''}
        <div class="clini-header-actions">
          <button id="clini-theme-toggle" class="btn-theme" title="Chuyển đổi giao diện Sáng/Tối">🌓</button>
        </div>
      </div>
    `;

    this.bindEvents(target as HTMLElement);
  }

  private bindEvents(target: HTMLElement): void {
    const themeBtn = target.querySelector('#clini-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (this.config.onToggleTheme) {
          this.config.onToggleTheme(currentTheme);
        }
      });
    }

    const searchInput = target.querySelector('#clini-quick-search-input') as HTMLInputElement;
    if (searchInput && this.config.onSearch) {
      searchInput.addEventListener('input', (e) => {
        const val = (e.target as HTMLInputElement).value;
        this.config.onSearch!(val);
      });
    }
  }
}
