/**
 * Reusable Sidebar UI Component
 * Hiển thị cây điều hướng hoặc Mục lục bài viết (Table of Contents).
 */

export interface SidebarItem {
  id: string;
  title: string;
  href?: string;
  icon?: string;
  children?: SidebarItem[];
}

export class CliniSidebar {
  private items: SidebarItem[] = [];

  constructor(items: SidebarItem[] = []) {
    this.items = items;
  }

  public setItems(items: SidebarItem[]): void {
    this.items = items;
  }

  /**
   * Mount sidebar vào thẻ container
   */
  public mount(targetSelector: string = '#sidebar'): void {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    target.innerHTML = `
      <nav class="clini-sidebar-nav">
        <ul class="clini-sidebar-list">
          ${this.items.map(item => this.renderItem(item)).join('')}
        </ul>
      </nav>
    `;
  }

  private renderItem(item: SidebarItem): string {
    const iconHtml = item.icon ? `<span class="sidebar-icon">${item.icon}</span>` : '';
    const linkHtml = item.href 
      ? `<a href="${item.href}" class="sidebar-link">${iconHtml}<span>${item.title}</span></a>`
      : `<div class="sidebar-group-title">${iconHtml}<span>${item.title}</span></div>`;

    let childrenHtml = '';
    if (item.children && item.children.length > 0) {
      childrenHtml = `
        <ul class="clini-sidebar-sublist">
          ${item.children.map(child => this.renderItem(child)).join('')}
        </ul>
      `;
    }

    return `<li class="sidebar-item" data-id="${item.id}">${linkHtml}${childrenHtml}</li>`;
  }
}
