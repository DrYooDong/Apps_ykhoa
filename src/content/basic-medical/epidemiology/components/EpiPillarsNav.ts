/**
 * CliniPortal 2.0 — Epidemiology Pillars Navigation Component (TypeScript Native)
 * Path: src/content/basic-medical/epidemiology/components/EpiPillarsNav.ts
 * 
 * Thanh điều hướng 8 Trụ Cột Dịch Tễ Học chuẩn EBM (Sticky Horizontal Strip)
 */

export interface EpiPillarItem {
  id: string;
  number?: number;
  title: string;
  icon?: string;
}

export interface EpiPillarsNavProps {
  pillars?: EpiPillarItem[];
  items?: EpiPillarItem[];
}

export const DEFAULT_EPI_PILLARS: EpiPillarItem[] = [
  { id: 'sec-1', number: 1, title: 'Tam Giác Dịch Tễ', icon: 'fa-solid fa-triangle-exclamation' },
  { id: 'sec-2', number: 2, title: 'Tác Nhân & Bệnh Sinh', icon: 'fa-solid fa-dna' },
  { id: 'sec-3', number: 3, title: 'Véc-tơ Truyền Bệnh', icon: 'fa-solid fa-mosquito' },
  { id: 'sec-4', number: 4, title: 'Chu Kỳ Lây Truyền', icon: 'fa-solid fa-arrows-spin' },
  { id: 'sec-5', number: 5, title: 'Vật Chủ & Nguy Cơ', icon: 'fa-solid fa-users' },
  { id: 'sec-6', number: 6, title: 'Khí Hậu & Môi Trường', icon: 'fa-solid fa-cloud-sun-rain' },
  { id: 'sec-7', number: 7, title: 'Tình Hình Toàn Cầu & VN', icon: 'fa-solid fa-earth-americas' },
  { id: 'sec-8', number: 8, title: 'Tài Liệu Tham Khảo', icon: 'fa-solid fa-book-medical' }
];

export function renderEpiPillarsNav(props?: EpiPillarsNavProps | EpiPillarItem[]): string {
  let items: EpiPillarItem[] = DEFAULT_EPI_PILLARS;
  if (Array.isArray(props)) {
    if (props.length > 0) items = props;
  } else if (props && typeof props === 'object') {
    const p = props as EpiPillarsNavProps;
    if (p.pillars && p.pillars.length > 0) items = p.pillars;
    else if (p.items && p.items.length > 0) items = p.items;
  }

  return `
    <nav class="pillars-nav epi-quicknav" aria-label="Mục lục bài học dịch tễ 8 trụ cột" style="position: sticky; top: 60px; z-index: 90; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 0.75rem 1rem; margin: 1.5rem 0 2rem 0; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
      <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--color-text-muted, #64748b); letter-spacing: 0.05em; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <span style="display: flex; align-items: center; gap: 0.4rem; color: #0d9488;">
          <i class="fa-solid fa-compass"></i>
          <span>8 TRỤ CỘT DỊCH TỄ HỌC LÂM SÀNG • WHO & CDC</span>
        </span>
        <span class="badge" style="background: rgba(13,148,136,0.1); color: #0d9488; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 999px;">Gordis Epidemiology 6th</span>
      </div>
      <div class="pillars-nav-inner" style="display: flex; gap: 0.6rem; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 2px;">
        ${items.map((p, idx) => {
          const num = p.number !== undefined ? p.number : idx + 1;
          const icon = p.icon || 'fa-solid fa-bookmark';
          return `
          <a href="#${p.id}" class="pillar-tab p-${num} epi-pillar-tab" style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.85rem; border-radius: 10px; font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif); font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted, #64748b); border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #ffffff); text-decoration: none; white-space: nowrap; transition: all 0.2s ease; flex-shrink: 0;">
            <i class="${icon.startsWith('fa-') ? icon : 'fa-solid ' + icon}" style="color: #0d9488; font-size: 0.85rem;"></i>
            <span>${num}. ${p.title}</span>
          </a>
        `;
        }).join('')}
      </div>
    </nav>
  `;
}
