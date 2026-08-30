/**
 * CliniPortal 2.0 — Biochemistry Quick Navigation Component (TypeScript Native)
 * Path: src/content/basic-medical/biochemistry/components/BiochemQuickNav.ts
 * 
 * Thanh điều hướng nhanh Sticky chuẩn EBM cho các bài giảng Hóa sinh & Sinh học phân tử
 */

export interface BiochemQuickNavItem {
  id: string;
  number?: number;
  title: string;
  icon?: string;
}

export interface BiochemQuickNavProps {
  items?: BiochemQuickNavItem[];
}

export function renderBiochemQuickNav(props?: BiochemQuickNavProps): string {
  const defaultItems: BiochemQuickNavItem[] = [
    { id: 'sec-1', number: 1, title: 'Cơ Chế Phân Tử & Con Đường', icon: 'fa-solid fa-dna' },
    { id: 'sec-2', number: 2, title: 'Phản Ứng Enzym & Động Học', icon: 'fa-solid fa-flask-vial' },
    { id: 'sec-3', number: 3, title: 'Ý Nghĩa Lâm Sàng & Xét Nghiệm', icon: 'fa-solid fa-stethoscope' }
  ];

  const items = props?.items && props.items.length > 0 ? props.items : defaultItems;

  const linksHtml = items
    .map(
      (item, idx) => {
        const num = item.number !== undefined ? item.number : idx + 1;
        const icon = item.icon || 'fa-solid fa-flask-vial';
        return `
        <a href="#${item.id}" class="pillar-tab biochem-pillar-tab" style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.85rem; border-radius: 10px; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif); font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted, #64748b); border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #ffffff); text-decoration: none; white-space: nowrap; transition: all 0.2s ease; flex-shrink: 0;">
          <i class="${icon.startsWith('fa-') ? icon : 'fa-solid ' + icon}" style="color: #059669; font-size: 0.85rem;"></i>
          <span>${num}. ${item.title}</span>
        </a>
      `;
      }
    )
    .join('');

  return `
    <nav class="pillars-nav biochem-quicknav" aria-label="Mục lục bài giảng hóa sinh" style="position: sticky; top: 60px; z-index: 90; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 0.75rem 1rem; margin: 1.5rem 0 2rem 0; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
      <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--color-text-muted, #64748b); letter-spacing: 0.05em; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <span style="display: flex; align-items: center; gap: 0.4rem; color: #059669;">
          <i class="fa-solid fa-compass"></i>
          <span>ĐIỀU HƯỚNG NHANH HÓA SINH • EBM 2026</span>
        </span>
        <span class="badge" style="background: rgba(5,150,105,0.1); color: #059669; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 999px;">Harper 32nd & Lippincott 8th</span>
      </div>
      <div class="pillars-nav-inner" style="display: flex; gap: 0.6rem; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 2px;">
        ${linksHtml}
      </div>
    </nav>
  `;
}
