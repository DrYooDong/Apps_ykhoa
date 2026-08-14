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
  const actionText = document.getElementById('symptomActionText');

  if (!selectEl || !redFlagsList || !diffDiagList || !actionBtn || !actionText) return;

  function updateSymptom(key: string) {
    const data = SYMPTOM_MATRIX_DATA[key];
    if (!data) return;

    redFlagsList!.innerHTML = data.redFlags.map(flag => `<li>${flag}</li>`).join('');
    diffDiagList!.innerHTML = data.diffDiags.map(diag => `<li>${diag}</li>`).join('');
    actionText!.innerText = data.actionText;
    actionBtn!.setAttribute('href', data.actionUrl);

    if (data.actionUrl === '#') {
      actionBtn!.style.opacity = '0.6';
      actionBtn!.style.pointerEvents = 'none';
    } else {
      actionBtn!.style.opacity = '1';
      actionBtn!.style.pointerEvents = 'auto';
    }
  }

  selectEl.addEventListener('change', (e) => {
    updateSymptom((e.target as HTMLSelectElement).value);
  });

  updateSymptom('sot');
}

export function initDailyFlashcardWidget(): void {
  const toggleBtn = document.getElementById('flashcardToggleBtn');
  const answerEl = document.getElementById('flashcardAnswer');
  const listEl = document.getElementById('flashcardRedFlagsList');

  if (!toggleBtn || !answerEl || !listEl) return;

  const feverFlags = SYMPTOM_MATRIX_DATA['sot']?.redFlags || [];
  listEl.innerHTML = feverFlags.map(f => `<li>${f}</li>`).join('');

  let isShown = false;
  toggleBtn.addEventListener('click', () => {
    isShown = !isShown;
    answerEl.style.display = isShown ? 'block' : 'none';
    toggleBtn.innerHTML = isShown
      ? '<i class="fa-solid fa-eye-slash"></i> Ẩn Đáp Án'
      : '<i class="fa-solid fa-rotate"></i> Lật Thẻ Xem Đáp Án';
  });
}

export function initFlashcardEngine(): void {
  const modal = document.getElementById('flashcard-modal');
  const openBtn = document.getElementById('flashcard-btn');
  const closeBtn = document.getElementById('close-flashcard');
  const cardEl = document.getElementById('approach-flashcard');

  const selectEl = document.getElementById('fc-category-select') as HTMLSelectElement | null;
  const shuffleBtn = document.getElementById('fc-shuffle');
  const progressFill = document.getElementById('fc-progress-fill');
  const topicBadge = document.getElementById('fc-topic-badge');
  const questionEl = document.getElementById('fc-question');
  const answerEl = document.getElementById('fc-answer');
  const explanationEl = document.getElementById('fc-explanation');
  const prevBtn = document.getElementById('fc-prev') as HTMLButtonElement | null;
  const nextBtn = document.getElementById('fc-next') as HTMLButtonElement | null;
  const counterEl = document.getElementById('fc-counter');
  const toggleKnownBtn = document.getElementById('fc-toggle-known');
  const knownTextEl = document.getElementById('fc-known-text');

  if (!modal || !openBtn || !cardEl) return;

  let activeCards: RedFlagCard[] = [...RED_FLAGS_CARDS];
  let currentIndex = 0;
  const knownCards = new Set<string>();

  function renderCard() {
    if (!activeCards || activeCards.length === 0) return;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= activeCards.length) currentIndex = activeCards.length - 1;

    const card = activeCards[currentIndex];
    if (!card) return;

    if (cardEl) cardEl.classList.remove('flipped');
    if (topicBadge) topicBadge.textContent = card.topicName;
    if (questionEl) questionEl.innerHTML = card.question;
    if (answerEl) answerEl.innerHTML = card.answer;
    if (explanationEl) explanationEl.innerHTML = card.explanation;

    if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${activeCards.length}`;
    if (progressFill) {
      progressFill.style.width = `${Math.round(((currentIndex + 1) / activeCards.length) * 100)}%`;
    }

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === activeCards.length - 1;

    const isKnown = knownCards.has(card.id);
    if (toggleKnownBtn && knownTextEl) {
      const icon = toggleKnownBtn.querySelector('i');
      if (isKnown) {
        toggleKnownBtn.classList.add('active');
        if (icon) icon.className = 'fa-solid fa-circle-check';
        knownTextEl.textContent = 'Đã thuộc';
      } else {
        toggleKnownBtn.classList.remove('active');
        if (icon) icon.className = 'fa-regular fa-circle-check';
        knownTextEl.textContent = 'Chưa thuộc';
      }
    }
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add('active');
    currentIndex = 0;
    renderCard();
    document.addEventListener('keydown', handleKeyDown);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    if (cardEl) cardEl.classList.remove('flipped');
    document.removeEventListener('keydown', handleKeyDown);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!modal?.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowLeft' && currentIndex > 0) { currentIndex--; renderCard(); }
    else if (e.key === 'ArrowRight' && currentIndex < activeCards.length - 1) { currentIndex++; renderCard(); }
    else if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); if (cardEl) cardEl.classList.toggle('flipped'); }
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  cardEl.addEventListener('click', () => cardEl.classList.toggle('flipped'));
  if (prevBtn) prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; renderCard(); } });
  if (nextBtn) nextBtn.addEventListener('click', () => { if (currentIndex < activeCards.length - 1) { currentIndex++; renderCard(); } });

  if (selectEl) {
    selectEl.addEventListener('change', (e) => {
      const val = (e.target as HTMLSelectElement).value;
      if (val === 'all') activeCards = [...RED_FLAGS_CARDS];
      else activeCards = RED_FLAGS_CARDS.filter(c => c.category === val);
      currentIndex = 0;
      renderCard();
    });
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      for (let i = activeCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = activeCards[i]!;
        activeCards[i] = activeCards[j]!;
        activeCards[j] = temp;
      }
      currentIndex = 0;
      renderCard();
    });
  }

  if (toggleKnownBtn) {
    toggleKnownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = activeCards[currentIndex];
      if (!card) return;
      if (knownCards.has(card.id)) knownCards.delete(card.id);
      else knownCards.add(card.id);
      renderCard();
    });
  }
}

export function initApproachesHub(): void {
  initSymptomMatrixWidget();
  initDailyFlashcardWidget();
  initFlashcardEngine();
}
