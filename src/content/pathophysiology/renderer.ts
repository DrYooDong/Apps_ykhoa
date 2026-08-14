/**
 * CliniPortal — Pathophysiology Hub TypeScript Renderer & Controller
 */
import { PHYSIO_FLASHCARDS_DATA, PHYSIO_FORMULAS_DATA } from './data';
import { PhysioFlashcard, PhysioFormula } from './types';

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
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase().trim();
      const cards = document.querySelectorAll('.specialty-card');
      cards.forEach(card => {
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
        if (title.includes(query) || desc.includes(query)) {
          (card as HTMLElement).style.display = 'flex';
        } else {
          (card as HTMLElement).style.display = 'none';
        }
      });
    });
  }

  initPhysioFlashcardEngine();
}
