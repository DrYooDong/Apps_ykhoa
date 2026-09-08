/**
 * CliniPortal — Basic Medical Sciences Universal Sticky Sub-Nav
 * Path: src/content/basic-medical/views/basic-medical-nav.ts
 * 
 * Thanh điều hướng thống nhất xuất hiện đồng bộ ở đầu tất cả các phân hệ Cơ Sở Y Khoa:
 * Tổng Quan Hub • Giải Phẫu - Sinh Lý • Cơ Chế Bệnh Sinh • Hóa Sinh • Dịch Tễ • Mô Phỏng • Công Thức • Trắc Nghiệm
 * 100% Unified with DocSpace Medical OS Design Tokens
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
    color: 'var(--dsp-sky)'
  },
  {
    key: 'giai-phau-sinh-ly',
    label: 'Giải Phẫu & Sinh Lý (GP-SL)',
    shortLabel: 'GP - SL',
    icon: 'fa-heart-pulse',
    hash: '#/basic-medical/giai-phau-sinh-ly',
    color: 'var(--dsp-sky)',
    badge: '9 Hệ'
  },
  {
    key: 'co-che-benh-sinh',
    label: 'Cơ Chế Bệnh Sinh (CCBS)',
    shortLabel: 'CCBS - SBL',
    icon: 'fa-microscope',
    hash: '#/basic-medical/co-che-benh-sinh',
    color: 'var(--dsp-emerald)',
    badge: '64+ Ca'
  },
  {
    key: 'hoa-sinh',
    label: 'Hóa Sinh Y Học (HS-CH)',
    shortLabel: 'Hóa Sinh',
    icon: 'fa-flask-vial',
    hash: '#/basic-medical/hoa-sinh',
    color: 'var(--dsp-violet)',
    badge: '7 Khối'
  },
  {
    key: 'dich-te-hoc',
    label: 'Dịch Tễ Học (DTH-YTCC)',
    shortLabel: 'Dịch Tễ',
    icon: 'fa-virus-covid',
    hash: '#/basic-medical/dich-te-hoc',
    color: 'var(--dsp-teal)',
    badge: '2×2 Solver'
  },
  {
    key: 'simulators',
    label: 'Mô Phỏng Sinh Lý Canvas',
    shortLabel: 'Mô Phỏng',
    icon: 'fa-bolt',
    hash: '#/basic-medical/simulators',
    color: 'var(--dsp-amber)',
    badge: 'Dynamic'
  },
  {
    key: 'formula-vault',
    label: 'Kho Công Thức Định Lượng',
    shortLabel: 'Công Thức',
    icon: 'fa-calculator',
    hash: '#/basic-medical/formula-vault',
    color: 'var(--dsp-sky)',
    badge: 'Calculators'
  },
  {
    key: 'quiz',
    label: 'Thử Thách & Flashcards',
    shortLabel: 'Trắc Nghiệm',
    icon: 'fa-brain',
    hash: '#/basic-medical/quiz',
    color: 'var(--dsp-pink)',
    badge: 'Exam Bank'
  }
];

/**
 * Render HTML Thanh Universal Sub-Nav
 */
export function renderBasicMedicalNav(activeKey: BasicMedicalTabKey): string {
  return `
    <nav class="basic-medical-universal-nav" aria-label="Phân hệ Cơ sở Y khoa" style="background:var(--dsp-glass-bg); border:1px solid var(--dsp-border-subtle); border-radius:var(--dsp-radius-lg); padding:6px; margin-bottom:1.5rem; box-shadow:var(--dsp-shadow-sm); position:sticky; top:64px; z-index:var(--dsp-z-sticky); backdrop-filter:var(--dsp-backdrop-blur); -webkit-backdrop-filter:var(--dsp-backdrop-blur);">
      <div style="display:flex; gap:6px; overflow-x:auto; -webkit-overflow-scrolling:touch; padding-bottom:2px;" class="hide-scrollbar">
        ${BASIC_MEDICAL_TABS.map(tab => {
          const isActive = tab.key === activeKey;
          return `
            <a href="${tab.hash}" class="bm-nav-link ${isActive ? 'active' : ''}" style="
              display:inline-flex;
              align-items:center;
              gap:7px;
              padding:7px 13px;
              border-radius:var(--dsp-radius-md);
              font-size:12.5px;
              font-weight:${isActive ? '800' : '600'};
              text-decoration:none;
              white-space:nowrap;
              color:${isActive ? '#ffffff' : 'var(--dsp-text-secondary)'};
              background:${isActive ? tab.color : 'transparent'};
              box-shadow:${isActive ? 'var(--dsp-shadow-sm)' : 'none'};
              transition:var(--dsp-transition);
              flex-shrink:0;
            ">
              <i class="fa-solid ${tab.icon}" style="color:${isActive ? '#ffffff' : tab.color}; font-size:12px;"></i>
              <span>${tab.label}</span>
              ${tab.badge ? `
                <span style="
                  font-size:9.5px;
                  font-weight:800;
                  padding:1.5px 6px;
                  border-radius:var(--dsp-radius-full);
                  background:${isActive ? 'rgba(255,255,255,0.25)' : 'var(--dsp-surface-3)'};
                  color:${isActive ? '#ffffff' : 'var(--dsp-text-muted)'};
                ">${tab.badge}</span>
              ` : ''}
            </a>
          `;
        }).join('')}
      </div>
    </nav>
  `;
}
