/**
 * CliniPortal 2.0 — PhysioQuickNav MDX Component
 * Path: src/content/basic-medical/physiology/components/PhysioQuickNav.ts
 */

export interface PhysioQuickNavItem {
  id: string;
  label: string;
  icon?: string;
}

export interface PhysioQuickNavProps {
  items?: PhysioQuickNavItem[];
}

export function renderPhysioQuickNav(props?: PhysioQuickNavProps): string {
  const defaultItems: PhysioQuickNavItem[] = [
    { id: 'sec-1', label: '1. Đại Cương', icon: 'fa-solid fa-book-open' },
    { id: 'sec-2', label: '2. Cấu Trúc & Phân Tử', icon: 'fa-solid fa-dna' },
    { id: 'sec-3', label: '3. Cơ Chế Hoạt Động', icon: 'fa-solid fa-gears' },
    { id: 'sec-4', label: '4. Điều Hòa Sinh Lý', icon: 'fa-solid fa-sliders' },
    { id: 'sec-5', label: '5. Ứng Dụng Lâm Sàng', icon: 'fa-solid fa-stethoscope' },
    { id: 'sec-6', label: '6. Tài Liệu Tham Khảo', icon: 'fa-solid fa-bookmark' }
  ];

  const items = props?.items && props.items.length > 0 ? props.items : defaultItems;

  const linksHtml = items
    .map(
      (item) => `
      <a href="#${item.id}" class="pillar-tab" style="
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.45rem 0.85rem;
        border-radius: 10px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--color-text-muted, #64748b);
        border: 1px solid var(--color-border, #e2e8f0);
        background: var(--color-bg, #f8fafc);
        text-decoration: none;
        white-space: nowrap;
        transition: all 0.2s ease;
        flex-shrink: 0;
      ">
        <i class="${item.icon || 'fa-solid fa-circle'}" style="color: var(--color-primary, #0284c7); font-size: 0.85rem;"></i>
        <span>${item.label}</span>
      </a>
    `
    )
    .join('');

  return `
    <nav class="pillars-nav physio-quicknav" style="
      position: sticky;
      top: 60px;
      z-index: 90;
      background: var(--color-surface, #ffffff);
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 14px;
      padding: 0.75rem 1rem;
      margin: 1.5rem 0 2rem 0;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
    ">
      <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--color-text-muted, #64748b); letter-spacing: 0.05em; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
        <i class="fa-solid fa-compass" style="color: var(--color-primary, #0284c7);"></i>
        <span>ĐIỀU HƯỚNG NHANH BÀI GIẢNG</span>
      </div>
      <div class="pillars-nav-inner" style="
        display: flex;
        gap: 0.6rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 2px;
      ">
        ${linksHtml}
      </div>
    </nav>
  `;
}
