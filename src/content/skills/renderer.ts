/**
 * CliniPortal — Clinical Skills Hub TypeScript Renderer & Controller
 */
import { CRANIAL_NERVES_DATA, OSCE_CASES } from './data';
import { OsceCase, OsceDifficulty } from './types';

export function initCranialNervesWidget(): void {
  const nerveBtns = document.querySelectorAll<HTMLElement>('.nerve-btn');
  const detailsCard = document.getElementById('nerveDetailsCard');
  if (!detailsCard || nerveBtns.length === 0) return;

  function showNerveDetail(key: string) {
    const data = CRANIAL_NERVES_DATA[key];
    if (!data) return;

    nerveBtns.forEach(btn => {
      if (btn.getAttribute('data-nerve') === key) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    detailsCard!.innerHTML = `
      <div class="physio-details-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <h4 style="color: var(--color-purple, #7c3aed); font-weight: 700; margin: 0; font-size: 0.95rem;">${data.title}</h4>
        <span class="element-badge" style="background-color: var(--color-purple, #7c3aed); color: #fff; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 700;">${data.type.split(' ')[0]}</span>
      </div>
      <div class="meridian-detail-row" style="font-size: 0.8rem; margin-bottom: 0.35rem;">
        <strong style="color: var(--color-text, #0f172a);">Phân loại chức năng:</strong>
        <p class="meridian-detail-desc" style="color: var(--color-text, #0f172a); font-weight: 500; margin: 0.1rem 0 0 0;">${data.type}</p>
      </div>
      <div class="meridian-detail-row" style="font-size: 0.8rem; margin-bottom: 0.35rem;">
        <strong style="color: var(--color-text, #0f172a);">Kỹ thuật thăm khám:</strong>
        <p class="meridian-detail-desc" style="color: var(--color-text-muted, #64748b); margin: 0.1rem 0 0 0;">${data.exam}</p>
      </div>
      <div class="meridian-detail-row" style="margin-bottom:0; border-top: 1px dashed var(--color-border, #e2e8f0); padding-top: 0.5rem; margin-top: 0.5rem; font-size: 0.8rem;">
        <strong style="color: var(--color-danger, #ef4444);">Dấu hiệu tổn thương lâm sàng:</strong>
        <p class="meridian-detail-desc" style="color: var(--color-danger, #ef4444); font-weight: 500; margin: 0.1rem 0 0 0;">⚠️ ${data.patho}</p>
      </div>
    `;
  }

  showNerveDetail('cn1');

  nerveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nerveKey = btn.getAttribute('data-nerve');
      if (nerveKey) showNerveDetail(nerveKey);
    });
  });
}

export function initSkillsControls(): void {
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-search') as HTMLElement | null;
  const emptyState = document.getElementById('empty-search-state') as HTMLElement | null;
  const viewGridBtn = document.getElementById('view-grid-btn') as HTMLElement | null;
  const viewListBtn = document.getElementById('view-list-btn') as HTMLElement | null;
  const container = document.getElementById('lessons-container') as HTMLElement | null;

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

      const cards = document.querySelectorAll<HTMLElement>('.specialty-card');
      const sections = document.querySelectorAll<HTMLElement>('#lessons-container > section');
      let visibleCount = 0;

      cards.forEach(card => {
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
        const isMatch = !query || title.includes(query) || desc.includes(query);

        card.style.display = isMatch ? 'flex' : 'none';
        if (isMatch) visibleCount++;
      });

      sections.forEach(section => {
        if (section.id === 'favorites-section') return;
        const visibleInSec = section.querySelectorAll('.specialty-card[style*="display: flex"], .specialty-card:not([style*="display: none"])');
        section.style.display = visibleInSec.length > 0 ? 'block' : 'none';
      });

      if (emptyState) {
        emptyState.style.display = (visibleCount === 0 && query !== '') ? 'block' : 'none';
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      });
    }
  }

  // Grid / List toggle
  if (viewGridBtn && viewListBtn && container) {
    viewGridBtn.addEventListener('click', () => {
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      container.classList.remove('view-list-mode');
    });

    viewListBtn.addEventListener('click', () => {
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      container.classList.add('view-list-mode');
    });
  }

  // Sticky Part Nav Click Scroll
  const navItems = document.querySelectorAll<HTMLElement>('.part-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });
}

export function getRandomOsceCase(difficulty: OsceDifficulty | 'all' = 'all'): OsceCase | null {
  const pool = difficulty === 'all'
    ? OSCE_CASES
    : OSCE_CASES.filter(c => c.difficulty === difficulty);

  if (pool.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex] || null;
}

export function initSkillsHub(): void {
  initCranialNervesWidget();
  initSkillsControls();
}
