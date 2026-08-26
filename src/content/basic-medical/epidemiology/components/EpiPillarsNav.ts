/**
 * CliniPortal — Epidemiology Pillars Navigation Strip (TypeScript)
 * Path: src/content/basic-medical/epidemiology/components/EpiPillarsNav.ts
 * 
 * Thanh điều hướng 8 Trụ Cột Dịch Tễ Học chuẩn EBM (Sticky Horizontal Strip)
 * Tự động chặn xung đột với SPA Hash Router bằng smooth scroll
 */

export interface EpiPillarItem {
  id: string;
  number: number;
  title: string;
  icon: string;
}

export const DEFAULT_EPI_PILLARS: EpiPillarItem[] = [
  { id: 'sec-1', number: 1, title: 'Tam Giác Dịch Tễ', icon: 'fa-triangle-exclamation' },
  { id: 'sec-2', number: 2, title: 'Tác Nhân & Bệnh Sinh', icon: 'fa-dna' },
  { id: 'sec-3', number: 3, title: 'Véc-tơ Truyền Bệnh', icon: 'fa-mosquito' },
  { id: 'sec-4', number: 4, title: 'Chu Kỳ Lây Truyền', icon: 'fa-arrows-spin' },
  { id: 'sec-5', number: 5, title: 'Vật Chủ & Nguy Cơ', icon: 'fa-users' },
  { id: 'sec-6', number: 6, title: 'Khí Hậu & Môi Trường', icon: 'fa-cloud-sun-rain' },
  { id: 'sec-7', number: 7, title: 'Tình Hình Toàn Cầu & VN', icon: 'fa-earth-americas' },
  { id: 'sec-8', number: 8, title: 'Tài Liệu Tham Khảo', icon: 'fa-book-medical' }
];

export function renderEpiPillarsNav(pillars: EpiPillarItem[] = DEFAULT_EPI_PILLARS): string {
  return `
    <nav class="pillars-nav" aria-label="Mục lục bài học dịch tễ 8 trụ cột">
      <div class="pillars-nav-inner">
        ${pillars.map(p => `
          <a href="#${p.id}" class="pillar-tab p-${p.number}" onclick="event.preventDefault(); document.getElementById('${p.id}')?.scrollIntoView({behavior:'smooth'});">
            <i class="fa-solid ${p.icon}"></i>
            <span>${p.number}. ${p.title}</span>
          </a>
        `).join('')}
      </div>
    </nav>
  `;
}
