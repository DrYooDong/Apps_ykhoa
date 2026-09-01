/**
 * CliniPortal — Basic Medical Sciences Universal Sticky Sub-Nav
 * Path: src/content/basic-medical/views/basic-medical-nav.ts
 * 
 * Thanh điều hướng thống nhất xuất hiện đồng bộ ở đầu tất cả các phân hệ Cơ Sở Y Khoa:
 * Tổng Quan Hub • Giải Phẫu - Sinh Lý • Cơ Chế Bệnh Sinh • Hóa Sinh • Dịch Tễ • Mô Phỏng • Công Thức • Trắc Nghiệm
 */

export type BasicMedicalTabKey = 
  | 'all' 
  | 'giai-phau-sinh-ly' 
  | 'co-che-benh-sinh' 
  | 'hoa-sinh' 
  | 'dich-te-hoc' 
  | 'simulators' 
  | 'formula-vault' 
  | 'quiz';

export interface BasicMedicalTabItem {
  key: BasicMedicalTabKey;
  label: string;
  shortLabel: string;
  icon: string;
  hash: string;
  color: string;
  badge?: string;
}

export const BASIC_MEDICAL_TABS: BasicMedicalTabItem[] = [
  {
    key: 'all',
    label: 'Tổng Quan Hub',
    shortLabel: 'Hub',
    icon: 'fa-layer-group',
    hash: '#/basic-medical',
    color: '#0284c7'
  },
  {
    key: 'giai-phau-sinh-ly',
    label: 'Giải Phẫu & Sinh Lý (GP-SL)',
    shortLabel: 'GP - SL',
    icon: 'fa-heart-pulse',
    hash: '#/basic-medical/giai-phau-sinh-ly',
    color: '#0284c7',
    badge: '9 Hệ'
  },
  {
    key: 'co-che-benh-sinh',
    label: 'Cơ Chế Bệnh Sinh (CCBS)',
    shortLabel: 'CCBS - SBL',
    icon: 'fa-microscope',
    hash: '#/basic-medical/co-che-benh-sinh',
    color: '#059669',
    badge: '64+ Ca'
  },
  {
    key: 'hoa-sinh',
    label: 'Hóa Sinh Y Học (HS-CH)',
    shortLabel: 'Hóa Sinh',
    icon: 'fa-flask-vial',
    hash: '#/basic-medical/hoa-sinh',
    color: '#8b5cf6',
    badge: '7 Khối'
  },
  {
    key: 'dich-te-hoc',
    label: 'Dịch Tễ Học (DTH-YTCC)',
    shortLabel: 'Dịch Tễ',
    icon: 'fa-virus-covid',
    hash: '#/basic-medical/dich-te-hoc',
    color: '#0d9488',
    badge: '2×2 Solver'
  },
  {
    key: 'simulators',
    label: 'Mô Phỏng Sinh Lý Canvas',
    shortLabel: 'Mô Phỏng',
    icon: 'fa-bolt',
    hash: '#/basic-medical/simulators',
    color: '#f59e0b',
    badge: 'Dynamic'
  },
  {
    key: 'formula-vault',
    label: 'Kho Công Thức Định Lượng',
    shortLabel: 'Công Thức',
    icon: 'fa-calculator',
    hash: '#/basic-medical/formula-vault',
    color: '#06b6d4',
    badge: 'Calculators'
  },
  {
    key: 'quiz',
    label: 'Thử Thách & Flashcards',
    shortLabel: 'Trắc Nghiệm',
    icon: 'fa-brain',
    hash: '#/basic-medical/quiz',
    color: '#ec4899',
    badge: 'Exam Bank'
  }
];

/**
 * Render HTML Thanh Universal Sub-Nav
 */
export function renderBasicMedicalNav(activeKey: BasicMedicalTabKey): string {
  return `
    <nav class="basic-medical-universal-nav" aria-label="Phân hệ Cơ sở Y khoa" style="background:var(--color-surface, #ffffff); border:1px solid var(--color-border, #e2e8f0); border-radius:14px; padding:6px; margin-bottom:1.5rem; box-shadow:0 4px 16px rgba(0,0,0,0.03); position:sticky; top:64px; z-index:30; backdrop-filter:blur(12px);">
      <div style="display:flex; gap:6px; overflow-x:auto; -webkit-overflow-scrolling:touch; padding-bottom:2px;" class="hide-scrollbar">
        ${BASIC_MEDICAL_TABS.map(tab => {
          const isActive = tab.key === activeKey;
          return `
            <a href="${tab.hash}" class="bm-nav-link ${isActive ? 'active' : ''}" style="
              display:inline-flex;
              align-items:center;
              gap:7px;
              padding:7px 13px;
              border-radius:10px;
              font-size:12.5px;
              font-weight:${isActive ? '800' : '600'};
              text-decoration:none;
              white-space:nowrap;
              color:${isActive ? '#ffffff' : 'var(--color-text, #334155)'};
              background:${isActive ? tab.color : 'transparent'};
              box-shadow:${isActive ? '0 2px 8px rgba(0,0,0,0.12)' : 'none'};
              transition:all 0.18s ease;
              flex-shrink:0;
            ">
              <i class="fa-solid ${tab.icon}" style="color:${isActive ? '#ffffff' : tab.color}; font-size:12px;"></i>
              <span>${tab.label}</span>
              ${tab.badge ? `
                <span style="
                  font-size:9.5px;
                  font-weight:800;
                  padding:1.5px 5.5px;
                  border-radius:999px;
                  background:${isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)'};
                  color:${isActive ? '#ffffff' : 'var(--color-text-muted, #64748b)'};
                ">${tab.badge}</span>
              ` : ''}
            </a>
          `;
        }).join('')}
      </div>
    </nav>
  `;
}
