/**
 * CliniPortal — Pathophysiology Hub TypeScript Renderer & Controller
 */
import { PHYSIO_FLASHCARDS_DATA, PHYSIO_FORMULAS_DATA } from './data';
import { PhysioFlashcard } from './types';

export function initPhysioFlashcardEngine(): void {
  const modal = document.getElementById('flashcard-modal');
  const openBtn = document.getElementById('flashcard-btn');
  const closeBtn = document.getElementById('close-flashcard');
  const cardEl = document.getElementById('patho-flashcard');

  const questionEl = document.getElementById('fc-question');
  const answerEl = document.getElementById('fc-answer');
  const explanationEl = document.getElementById('fc-explanation');
  const prevBtn = document.getElementById('fc-prev') as HTMLButtonElement | null;
  const nextBtn = document.getElementById('fc-next') as HTMLButtonElement | null;
  const counterEl = document.getElementById('fc-counter');

  if (!modal || !openBtn || !cardEl) return;

  const cards: PhysioFlashcard[] = [...PHYSIO_FLASHCARDS_DATA];
  let currentIndex = 0;

  function renderCard() {
    if (cards.length === 0) return;
    const card = cards[currentIndex];
    if (!card) return;

    if (cardEl) cardEl.classList.remove('flipped');
    if (questionEl) questionEl.innerHTML = card.question;
    if (answerEl) answerEl.innerHTML = card.answer;
    if (explanationEl) explanationEl.innerHTML = card.explanation;
    if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${cards.length}`;

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === cards.length - 1;
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add('active');
    currentIndex = 0;
    renderCard();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  cardEl.addEventListener('click', () => cardEl.classList.toggle('flipped'));
  if (prevBtn) prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; renderCard(); } });
  if (nextBtn) nextBtn.addEventListener('click', () => { if (currentIndex < cards.length - 1) { currentIndex++; renderCard(); } });
}

export function calculateFormula(formulaId: string, inputs: Record<string, number>): number | null {
  const formula = PHYSIO_FORMULAS_DATA.find(f => f.id === formulaId);
  if (!formula) return null;
  return formula.calculate(inputs);
}

export function initPathophysiologyHub(): void {
  // 1. Hub Tabs Switcher
  const tabBtns = document.querySelectorAll<HTMLElement>('.hub-tab-btn');
  const tabContents = document.querySelectorAll<HTMLElement>('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId || '');
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // 2. Search & Controls
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
      let visibleCount = 0;

      cards.forEach(card => {
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
        const isMatch = !query || title.includes(query) || desc.includes(query);

        card.style.display = isMatch ? 'flex' : 'none';
        if (isMatch) visibleCount++;
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

  // 3. Grid / List toggle
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

  // 4. Sticky Nav Click Scroll
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

  // 5. Specialty Dropdown Cards (Viêm Gan Siêu Vi A-E)
  const dropdownCards = document.querySelectorAll<HTMLElement>('.specialty-dropdown-card');
  dropdownCards.forEach(card => {
    const trigger = card.querySelector('.specialty-dropdown-trigger') || card;

    trigger.addEventListener('click', (e) => {
      // If user clicked directly on a link/pill, let default navigation proceed
      if ((e.target as HTMLElement).closest('a')) return;
      e.stopPropagation();
      const isOpen = card.classList.contains('open');
      dropdownCards.forEach(c => {
        c.classList.remove('open');
        c.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        card.classList.add('open');
        card.setAttribute('aria-expanded', 'true');
      }
    });

    // Support keyboard Enter / Space / Escape
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if ((e.target as HTMLElement).closest('a')) return;
        e.preventDefault();
        const isOpen = card.classList.toggle('open');
        card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      } else if (e.key === 'Escape') {
        card.classList.remove('open');
        card.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('.specialty-dropdown-card')) {
      dropdownCards.forEach(c => {
        c.classList.remove('open');
        c.setAttribute('aria-expanded', 'false');
      });
    }
  });

  initPhysioFlashcardEngine();
}
