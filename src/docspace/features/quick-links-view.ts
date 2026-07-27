/**
 * DocSpace — Quick Links View
 * Panel liên kết nhanh cross-module — tuỳ chỉnh và ghim các trang hay dùng nhất
 */

import { getActiveProfile, updateQuickLinks } from '../storage';
import { QuickLink, DEFAULT_QUICK_LINKS } from '../types';
import { renderSidebar } from '../docspace-view';

const SUGGESTED_LINKS: QuickLink[] = [
  // Calculators
  { id: 'abg',        label: 'ABG Studio (Khí máu 6 bước)', href: '#/calculators/renal-dg-abg',                      icon: 'fa-solid fa-lungs',                category: 'calculators',    isPinned: false },
  { id: 'egfr',       label: 'eGFR & Chức năng thận',      href: '#/calculators/renal-renal-function',              icon: 'fa-solid fa-kidney',               category: 'calculators',    isPinned: false },
  { id: 'anthan-icu', label: 'An thần ICU (RASS/CAM-ICU)',  href: '#/calculators/emergency-dg-an-than-icu',          icon: 'fa-solid fa-brain',                category: 'calculators',    isPinned: false },
  { id: 'ecg-studio', label: 'ECG Pro Studio (12 chuyển đạo)',href: '#/calculators/emergency-ecg-studio',             icon: 'fa-solid fa-heart-pulse',          category: 'calculators',    isPinned: false },
  { id: 'ql-bu-dich', label: 'Bù dịch Hồi sức Động',        href: '#/calculators/emergency-ql-bu-dich',               icon: 'fa-solid fa-droplet',              category: 'calculators',    isPinned: false },
  { id: 'ql-van-mach', label: 'Chỉnh liều Vận mạch',         href: '#/calculators/emergency-ql-van-mach',             icon: 'fa-solid fa-syringe',              category: 'calculators',    isPinned: false },
  { id: 'electrolyte',label: 'Electrolyte Pro (Điện giải)', href: '#/calculators/renal-electrolyte-studio',           icon: 'fa-solid fa-flask',                category: 'calculators',    isPinned: false },
  { id: 'vte',        label: 'Tắc mạch VTE (Wells/Padua)',  href: '#/calculators/cardiology-dg-vte',                  icon: 'fa-solid fa-shield-virus',         category: 'calculators',    isPinned: false },
  // Approaches
  { id: 'chest-pain', label: 'Tiếp cận Đau ngực cấp',       href: '#/approaches/symptoms-than-phien-ho-hap-tim-mach-tc-daunguc', icon: 'fa-solid fa-heart-crack',category: 'approaches',     isPinned: false },
  { id: 'dyspnea',    label: 'Tiếp cận Khó thở cấp',        href: '#/approaches/symptoms-than-phien-ho-hap-tim-mach-tc-khotho',  icon: 'fa-solid fa-wind',       category: 'approaches',     isPinned: false },
  { id: 'abdo-pain',  label: 'Tiếp cận Đau bụng cấp',       href: '#/approaches/symptoms-gastro-symptoms-abdominal-pain-tc-daubung', icon: 'fa-solid fa-stomach',  category: 'approaches',     isPinned: false },
  { id: 'bls-alcs',   label: 'Hồi sức BLS & ACLS',          href: '#/approaches/1.%20hs-cc-hoi-suc-co-ban-nang-cao-tc-hs-bls-alcs', icon: 'fa-solid fa-bolt', category: 'approaches',     isPinned: false },
  // Pharmacology
  { id: 'drug-lookup',label: 'Tra cứu Thuốc',              href: '#/pharmacology/tools-tra-cuu-thuoc',         icon: 'fa-solid fa-pills',                category: 'pharmacology',   isPinned: false },
  { id: 'ddi-matrix',  label: 'Ma trận Tương tác 2D',       href: '#/pharmacology/tools-ma-tran-tuong-tac',     icon: 'fa-solid fa-chart-line',           category: 'pharmacology',   isPinned: false },
  { id: 'dose-opt',   label: 'Tối ưu Liều Thuốc',          href: '#/pharmacology/tools-dose-optimizer',        icon: 'fa-solid fa-calculator',           category: 'pharmacology',   isPinned: false },
  { id: 'pk-sim',      label: 'Mô phỏng Dược động học',     href: '#/pharmacology/tools-pk-simulator',         icon: 'fa-solid fa-chart-area',           category: 'pharmacology',   isPinned: false },
  // Skills
  { id: 'ecg-basic',  label: 'Đọc ECG Cơ bản',              href: '#/skills/can-lam-sang-doc-ecg-co-ban',              icon: 'fa-solid fa-heart-pulse',          category: 'skills',         isPinned: false },
  { id: 'ecg-adv',    label: 'Đọc ECG Nâng cao',            href: '#/skills/can-lam-sang-doc-ecg-nang-cao',            icon: 'fa-solid fa-chart-line',           category: 'skills',         isPinned: false },
  { id: 'coagulation',label: 'Đọc Xét nghiệm Đông máu',     href: '#/skills/can-lam-sang-doc-dong-mau',                icon: 'fa-solid fa-vial',                 category: 'skills',         isPinned: false },
  { id: 'airway',     label: 'Kỹ năng Kiểm soát Đường thở', href: '#/skills/resuscitation-kn-kiemsoat-duongtho',     icon: 'fa-solid fa-lungs-virus',          category: 'skills',         isPinned: false },
  { id: 'anaphylaxis',label: 'Xử trí Phản vệ Cấp cứu',      href: '#/skills/resuscitation-kn-phanve',                 icon: 'fa-solid fa-shield-halved',        category: 'skills',         isPinned: false },
  // EBM
  { id: 'sepsis-ebm', label: 'Phác đồ Sốc Nhiễm Khuẩn (SSC)',href: '#/ebm/guidelines-kho-guidelines-phac-do-soc-nhiem-khuan-sepsis3', icon: 'fa-solid fa-book-bookmark', category: 'ebm',       isPinned: false },
  // Pathophysiology
  { id: 'physio-cell',label: 'Sinh lý Điện Tế bào',         href: '#/pathophysiology/content-sinhly-phan1-sl-tb-diensinhly', icon: 'fa-solid fa-dna',           category: 'pathophysiology',isPinned: false },
];

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  calculators:    { label: 'Công cụ',     color: 'var(--color-info)' },
  approaches:     { label: 'Tiếp cận',    color: 'var(--color-danger)' },
  pharmacology:   { label: 'Dược lý',     color: 'var(--color-success)' },
  skills:         { label: 'Kỹ năng',     color: 'var(--color-warning)' },
  ebm:            { label: 'EBM',         color: 'var(--color-primary)' },
  pathophysiology:{ label: 'Sinh lý',     color: 'var(--color-text-muted)' },
  custom:         { label: 'Tuỳ chỉnh',   color: 'var(--color-primary)' },
};

export function renderQuickLinksView(profileId: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const myLinks = profile.quickLinks;
  const myIds = new Set(myLinks.map(l => l.id));

  const pinnedHtml = myLinks.filter(l => l.isPinned).length > 0
    ? myLinks.filter(l => l.isPinned).map(l => renderLinkChip(l, true)).join('')
    : '<div class="dsp-empty-state dsp-empty-state--sm"><p>Chưa có link nào được ghim</p></div>';

  const savedHtml = myLinks.length > 0
    ? myLinks.map(l => renderLinkRow(l)).join('')
    : '<div class="dsp-empty-state dsp-empty-state--sm"><p>Chưa thêm link nào</p></div>';

  // Group suggested by category
  const suggestedGroups = groupBy(SUGGESTED_LINKS.filter(l => !myIds.has(l.id)), 'category');

  const suggestedHtml = Object.entries(suggestedGroups).map(([cat, links]) => {
    const cfg = CATEGORY_LABELS[cat] || { label: cat, color: 'var(--color-primary)' };
    return `
      <div class="dsp-links-group">
        <div class="dsp-links-group-label" style="color: ${cfg.color}">
          ${cfg.label}
        </div>
        <div class="dsp-links-suggest-grid">
          ${links.map(l => `
            <button class="dsp-suggest-chip" data-action="add-link" data-link='${JSON.stringify(l)}'
                    title="Thêm vào danh sách của tôi">
              <i class="${l.icon}"></i>
              <span>${l.label}</span>
              <i class="fa-solid fa-plus dsp-suggest-plus"></i>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'links')}
      <main class="dsp-main">
        <div class="dsp-page-content">

          <div class="dsp-page-header">
            <h1 class="dsp-page-title"><i class="fa-solid fa-link"></i> Liên kết Nhanh</h1>
            <p class="dsp-page-subtitle">Chọn và ghim các trang thường dùng nhất từ tất cả module CliniPortal.</p>
          </div>

          <div class="dsp-two-col dsp-two-col--reverse">

            <!-- Left: My links -->
            <div class="dsp-col-main">
              <!-- Pinned section -->
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title"><i class="fa-solid fa-thumbtack"></i> Đã ghim</h2>
                </div>
                <div class="dsp-pinned-grid" id="dspPinnedGrid">
                  ${pinnedHtml}
                </div>
              </div>

              <!-- All my links -->
              <div class="dsp-card" style="margin-top: 1rem;">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">Danh sách của tôi (${myLinks.length})</h2>
                </div>
                <div class="dsp-list" id="dspMyLinksList">
                  ${savedHtml}
                </div>

                <!-- Add custom link -->
                <div class="dsp-card-footer">
                  <form class="dsp-add-link-form" id="dspAddCustomLinkForm" novalidate>
                    <div class="dsp-form-row dsp-form-row--3">
                      <input class="dsp-input" type="text" id="dspCustomLabel" placeholder="Nhãn (VD: ABG Studio)" maxlength="50" required />
                      <input class="dsp-input" type="text" id="dspCustomHref" placeholder="Đường dẫn (VD: #/calculators/abg)" maxlength="200" required />
                      <button type="submit" class="dsp-btn dsp-btn-primary">
                        <i class="fa-solid fa-plus"></i> Thêm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Right: Suggested -->
            <div class="dsp-col-side">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> Gợi ý</h2>
                </div>
                <div class="dsp-suggested-links" id="dspSuggestedLinks">
                  ${suggestedHtml || '<div class="dsp-empty-state dsp-empty-state--sm"><p>Đã thêm tất cả gợi ý!</p></div>'}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  `;
}

// ─── Render helpers ───────────────────────────────────────────────

function renderLinkChip(link: QuickLink, showUnpin: boolean): string {
  return `
    <div class="dsp-pinned-chip" data-link-id="${link.id}">
      <a href="${link.href}" class="dsp-pinned-chip-inner">
        <i class="${link.icon}"></i>
        <span>${link.label}</span>
      </a>
      ${showUnpin ? `
        <button class="dsp-chip-unpin" data-action="unpin-link" data-id="${link.id}" title="Bỏ ghim">
          <i class="fa-solid fa-thumbtack"></i>
        </button>
      ` : ''}
    </div>
  `;
}

function renderLinkRow(link: QuickLink): string {
  const cat = CATEGORY_LABELS[link.category] || { label: link.category, color: 'var(--color-primary)' };
  return `
    <div class="dsp-list-item" data-link-id="${link.id}">
      <div class="dsp-list-item-body">
        <div class="dsp-list-item-title">
          <i class="${link.icon}" style="color: ${cat.color}; margin-right: 0.4rem;"></i>
          <a href="${link.href}">${link.label}</a>
          <span class="dsp-badge" style="background: ${cat.color}22; color: ${cat.color}">${cat.label}</span>
        </div>
        <div class="dsp-list-item-meta">${link.href}</div>
      </div>
      <div class="dsp-list-item-actions">
        <button class="dsp-icon-btn${link.isPinned ? ' dsp-icon-btn--active' : ''}"
                data-action="toggle-pin" data-id="${link.id}"
                title="${link.isPinned ? 'Bỏ ghim' : 'Ghim'}">
          <i class="fa-${link.isPinned ? 'solid' : 'regular'} fa-thumbtack"></i>
        </button>
        <button class="dsp-icon-btn dsp-icon-btn--danger" data-action="remove-link" data-id="${link.id}" title="Xóa">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;
}

// ─── Controller ───────────────────────────────────────────────────

export function mountQuickLinksController(profileId: string): void {
  const profile = getActiveProfile();
  if (!profile) return;

  let links = [...profile.quickLinks];

  function saveAndRefresh(): void {
    updateQuickLinks(profileId, links);
    window.location.hash = '#/docspace/links';
  }

  // Add suggested link
  document.getElementById('dspSuggestedLinks')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-action="add-link"]') as HTMLElement;
    if (!btn) return;
    try {
      const link: QuickLink = JSON.parse(btn.getAttribute('data-link') || '{}');
      if (link.id && !links.find(l => l.id === link.id)) {
        links.push(link);
        saveAndRefresh();
      }
    } catch {}
  });

  // Toggle pin
  document.getElementById('dspMyLinksList')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-action]') as HTMLElement;
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id') || '';
    const idx = links.findIndex(l => l.id === id);
    if (idx < 0) return;

    if (action === 'toggle-pin') {
      links[idx] = { ...links[idx], isPinned: !links[idx].isPinned };
      saveAndRefresh();
    } else if (action === 'remove-link') {
      links = links.filter(l => l.id !== id);
      saveAndRefresh();
    }
  });

  // Unpin from pinned grid
  document.getElementById('dspPinnedGrid')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-action="unpin-link"]') as HTMLElement;
    if (!btn) return;
    const id = btn.getAttribute('data-id') || '';
    const idx = links.findIndex(l => l.id === id);
    if (idx >= 0) {
      links[idx] = { ...links[idx], isPinned: false };
      saveAndRefresh();
    }
  });

  // Add custom link
  document.getElementById('dspAddCustomLinkForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const label = (document.getElementById('dspCustomLabel') as HTMLInputElement).value.trim();
    const href = (document.getElementById('dspCustomHref') as HTMLInputElement).value.trim();
    if (!label || !href) return;

    const newLink: QuickLink = {
      id: `custom_${Date.now()}`,
      label,
      href,
      icon: 'fa-solid fa-link',
      category: 'custom',
      isPinned: false,
    };
    links.push(newLink);
    saveAndRefresh();
  });
}

// ─── Utils ────────────────────────────────────────────────────────

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key]);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}
