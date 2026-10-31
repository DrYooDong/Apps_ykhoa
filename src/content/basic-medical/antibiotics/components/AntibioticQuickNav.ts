/**
 * CliniPortal 2.0 — Antibiotic Quick Navigation Component (TypeScript Native)
 * Path: src/content/basic-medical/antibiotics/components/AntibioticQuickNav.ts
 * 
 * Thanh điều hướng nhanh Sticky chuẩn EBM cho các bài giảng Kháng Sinh Học Lâm Sàng (AMS)
 */

export interface AntibioticQuickNavItem {
  id: string;
  number?: number;
  title: string;
  icon?: string;
}

export interface AntibioticQuickNavProps {
  items?: AntibioticQuickNavItem[];
}

export function renderAntibioticQuickNav(props?: AntibioticQuickNavProps): string {
  const defaultItems: AntibioticQuickNavItem[] = [
    { id: 'sec-1', number: 1, title: 'Đại Cương & Vi Sinh', icon: 'fa-solid fa-microscope' },
    { id: 'sec-2', number: 2, title: 'Cơ Chế & Phân Tầng AWaRe', icon: 'fa-solid fa-traffic-light' },
    { id: 'sec-3', number: 3, title: 'Phác Đồ & Kê Đơn An Toàn', icon: 'fa-solid fa-clipboard-check' }
  ];

  const items = props?.items && props.items.length > 0 ? props.items : defaultItems;

  const linksHtml = items
    .map(
      (item, idx) => {
        const num = item.number !== undefined ? item.number : idx + 1;
        const icon = item.icon || 'fa-solid fa-shield-virus';
        return `
        <a href="#${item.id}" class="pillar-tab atb-pillar-tab" style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.85rem; border-radius: 10px; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif); font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted, #64748b); border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #ffffff); text-decoration: none; white-space: nowrap; transition: all 0.2s ease; flex-shrink: 0;">
          <i class="${icon.startsWith('fa-') ? icon : 'fa-solid ' + icon}" style="color: var(--color-primary, #0284c7); font-size: 0.85rem;"></i>
          <span>${num}. ${item.title}</span>
        </a>
      `;
      }
    )
    .join('');

  return `
    <nav class="pillars-nav atb-quicknav" aria-label="Mục lục bài giảng kháng sinh" style="position: sticky; top: 60px; z-index: 90; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 0.75rem 1rem; margin: 1.5rem 0 2rem 0; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
      <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--color-text-muted, #64748b); letter-spacing: 0.05em; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <span style="display: flex; align-items: center; gap: 0.4rem; color: var(--color-primary, #0284c7);">
          <i class="fa-solid fa-shield-virus"></i>
          <span>ĐIỀU HƯỚNG NHANH KHÁNG SINH • WHO AWARE & EBM 2026</span>
        </span>
        <span class="badge" style="background: rgba(2,132,199,0.1); color: var(--color-primary, #0284c7); font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 999px;">IDSA & Sanford Guide</span>
      </div>
      <div class="pillars-nav-inner hide-scrollbar" style="display: flex; gap: 0.6rem; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 2px;">
        ${linksHtml}
      </div>
    </nav>
  `;
}

