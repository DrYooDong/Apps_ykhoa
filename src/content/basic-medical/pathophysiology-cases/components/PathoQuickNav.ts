/**
 * CliniPortal 2.0 — Pathophysiology Quick Navigation Component (TypeScript Native)
 * Path: src/content/basic-medical/pathophysiology-cases/components/PathoQuickNav.ts
 * 
 * Thanh điều hướng nhanh Sticky chuẩn EBM cho các bài giảng Cơ chế bệnh sinh (CCBS - SBL)
 */

export interface PathoQuickNavItem {
  id: string;
  number?: number;
  title: string;
  icon?: string;
}

export interface PathoQuickNavProps {
  items?: PathoQuickNavItem[];
}

export function renderPathoQuickNav(props?: PathoQuickNavProps): string {
  const defaultItems: PathoQuickNavItem[] = [
    { id: 'sec-1', number: 1, title: 'Bệnh Nguyên & Căn Nguyên', icon: 'fa-solid fa-microscope' },
    { id: 'sec-2', number: 2, title: 'Dòng Thác Bệnh Sinh Phân Tử', icon: 'fa-solid fa-code-merge' },
    { id: 'sec-3', number: 3, title: 'Rối Loạn Tạng & Lâm Sàng', icon: 'fa-solid fa-stethoscope' },
    { id: 'sec-4', number: 4, title: 'Điểm Ngọc & Phác Đồ EBM', icon: 'fa-solid fa-gem' },
    { id: 'sec-5', number: 5, title: 'Tài Liệu Tham Khảo', icon: 'fa-solid fa-book-medical' }
  ];

  const items = props?.items && props.items.length > 0 ? props.items : defaultItems;

  const linksHtml = items
    .map(
      (item, idx) => {
        const num = item.number !== undefined ? item.number : idx + 1;
        const icon = item.icon || 'fa-solid fa-microscope';
        return `
        <a href="#${item.id}" class="pillar-tab patho-pillar-tab" style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.85rem; border-radius: 10px; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif); font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted, #64748b); border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #ffffff); text-decoration: none; white-space: nowrap; transition: all 0.2s ease; flex-shrink: 0;">
          <i class="${icon.startsWith('fa-') ? icon : 'fa-solid ' + icon}" style="color: #7c3aed; font-size: 0.85rem;"></i>
          <span>${num}. ${item.title}</span>
        </a>
      `;
      }
    )
    .join('');

  return `
    <nav class="pillars-nav patho-quicknav" aria-label="Mục lục bài giảng cơ chế bệnh sinh" style="position: sticky; top: 60px; z-index: 90; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 0.75rem 1rem; margin: 1.5rem 0 2rem 0; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
      <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--color-text-muted, #64748b); letter-spacing: 0.05em; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <span style="display: flex; align-items: center; gap: 0.4rem; color: #7c3aed;">
          <i class="fa-solid fa-compass"></i>
          <span>ĐIỀU HƯỚNG NHANH CƠ CHẾ BỆNH SINH (CCBS)</span>
        </span>
        <span class="badge" style="background: rgba(124,58,237,0.1); color: #7c3aed; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 999px;">Harrison 21st & Robbins 10th</span>
      </div>
      <div class="pillars-nav-inner" style="display: flex; gap: 0.6rem; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 2px;">
        ${linksHtml}
      </div>
    </nav>
  `;
}
