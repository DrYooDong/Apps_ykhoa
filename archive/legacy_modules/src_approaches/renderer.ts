/**
 * CliniPortal — Clinical Approaches Hub TypeScript Renderer & Controller
 */
import { RED_FLAGS_CARDS, SYMPTOM_MATRIX_DATA } from './data';
import { RedFlagCard } from './types';

export function initSymptomMatrixWidget(): void {
  const selectEl = document.getElementById('symptomSelect') as HTMLSelectElement | null;
  const redFlagsList = document.getElementById('redFlagsList');
  const diffDiagList = document.getElementById('diffDiagList');
  const actionBtn = document.getElementById('symptomActionBtn') as HTMLAnchorElement | null;

  if (!selectEl || !redFlagsList || !diffDiagList) return;

  function updateSymptom(key: string) {
    const data = SYMPTOM_MATRIX_DATA[key];
    if (!data) return;

    redFlagsList!.innerHTML = data.redFlags.map(flag => `<li>${flag}</li>`).join('');
    diffDiagList!.innerHTML = data.diffDiags.map(diag => `<li>${diag}</li>`).join('');
    if (actionBtn) {
      actionBtn.setAttribute('href', data.actionUrl || '#');
    }
  }

  selectEl.addEventListener('change', (e) => {
    updateSymptom((e.target as HTMLSelectElement).value);
  });

  updateSymptom('sot');
}

export function initApproachesControls(): void {
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-search') as HTMLElement | null;
  const emptyState = document.getElementById('empty-search-state') as HTMLElement | null;
  const viewGridBtn = document.getElementById('view-grid-btn') as HTMLElement | null;
  const viewListBtn = document.getElementById('view-list-btn') as HTMLElement | null;
  const container = document.getElementById('lessons-container') as HTMLElement | null;
  const tagBtns = document.querySelectorAll<HTMLElement>('.tag-filter-btn');

  let activeTag = 'all';

  function applyFilter() {
    const query = searchInput?.value.toLowerCase().trim() || '';
    if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

    const cards = document.querySelectorAll<HTMLElement>('.specialty-card');
    const sections = document.querySelectorAll<HTMLElement>('#lessons-container > section');
    let visibleCount = 0;

    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      const tags = card.getAttribute('data-tags') || '';
      const matchesSearch = !query || title.includes(query) || tags.includes(query);
      const matchesTag = activeTag === 'all' || tags.includes(activeTag);

      const isVisible = matchesSearch && matchesTag;
      card.style.display = isVisible ? 'block' : 'none';
      if (isVisible) visibleCount++;
    });

    sections.forEach(section => {
      if (section.id === 'favorites-section') return;
      const visibleInSec = section.querySelectorAll('.specialty-card:not([style*="display: none"])');
      section.style.display = visibleInSec.length > 0 ? 'block' : 'none';
    });

    if (emptyState) {
      emptyState.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        applyFilter();
        searchInput.focus();
      });
    }
  }

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.getAttribute('data-tag');
      if (!tag) return;
      tagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTag = tag;
      applyFilter();
    });
  });

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

export function initApproachesHub(): void {
  initSymptomMatrixWidget();
  initApproachesControls();
}
