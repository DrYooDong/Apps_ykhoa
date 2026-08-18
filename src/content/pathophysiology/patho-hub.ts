/**
 * CliniPortal — Pathophysiology Hub Controller (TypeScript Module)
 * Powers co-che-benh-sinh.html & giai-phau-sinh-ly.html
 * Integrates: Progress Tracking, Quiz Engine, Mirror Mode, and Specialty Search.
 */

const STORAGE_KEY_PROGRESS = 'cliniportal_physio_quiz_progress';
const STORAGE_KEY_READING = 'cliniportal_physio_reading_history';

export interface QuizProgressItem {
  completed: boolean;
  isCorrect: boolean;
  score?: number;
  timestamp: string;
}

export function getQuizProgress(): Record<string, Record<string, QuizProgressItem>> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_PROGRESS) || '{}');
  } catch {
    return {};
  }
}

export function saveQuizProgress(lessonId: string, quizId: string, isCorrect: boolean, score = 100): void {
  const progress = getQuizProgress();
  if (!progress[lessonId]) {
    progress[lessonId] = {};
  }
  progress[lessonId][quizId] = {
    completed: true,
    isCorrect,
    score,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));

  window.dispatchEvent(new CustomEvent('physio-quiz-updated', {
    detail: { lessonId, quizId, isCorrect, progress }
  }));
}

export function initQuizEngine(): void {
  const quizContainers = document.querySelectorAll('.physio-quiz-block');
  if (!quizContainers.length) return;

  const currentLessonId = window.location.pathname.split('/').pop()?.replace('.html', '') || 'general';
  const savedProgress = getQuizProgress()[currentLessonId] || {};

  quizContainers.forEach((container, index) => {
    const quizId = (container as HTMLElement).dataset.quizId || `quiz_${index + 1}`;
    const scriptData = container.querySelector('script[type="application/json"]');

    let data: any = null;
    if (scriptData) {
      try {
        data = JSON.parse(scriptData.textContent || '{}');
      } catch {
        data = null;
      }
    }

    if (!data) return;

    const isDone = savedProgress[quizId]?.completed;
    const isCorrect = savedProgress[quizId]?.isCorrect;

    const optionsHtml = (data.options || []).map((opt: string, optIdx: number) => `
      <label class="quiz-option" style="display:flex; align-items:center; gap:0.5rem; padding:0.5rem; margin-bottom:0.25rem; border-radius:6px; border:1px solid var(--color-divider); cursor:pointer; font-size:0.875rem;">
        <input type="radio" name="quiz_${quizId}" value="${optIdx}" ${isDone ? 'disabled' : ''}>
        <span>${opt}</span>
      </label>
    `).join('');

    container.innerHTML = `
      <div class="quiz-inner" style="background:var(--color-surface); border:1px solid var(--color-divider); border-radius:8px; padding:1rem; margin:1rem 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <span style="font-weight:700; color:var(--color-primary); font-size:0.85rem;">📝 Micro-Quiz</span>
          ${isDone ? `<span style="font-size:0.75rem; color:${isCorrect ? '#16a34a' : '#dc2626'}; font-weight:700;">${isCorrect ? '✅ Đã hoàn thành (Đúng)' : '❌ Đã làm (Chưa đúng)'}</span>` : ''}
        </div>
        <p style="margin:0 0 0.75rem; font-weight:600; font-size:0.9rem;">${data.question}</p>
        <div class="quiz-options-list" style="margin-bottom:0.75rem;">${optionsHtml}</div>
        <button class="quiz-submit-btn" style="background:var(--color-primary); color:#fff; border:none; padding:0.4rem 1rem; border-radius:4px; font-size:0.8rem; font-weight:600; cursor:pointer;" ${isDone ? 'disabled' : ''}>
          Kiểm tra đáp án
        </button>
        <div class="quiz-feedback" style="display:none; margin-top:0.75rem; padding:0.75rem; border-radius:6px; font-size:0.85rem;"></div>
      </div>
    `;

    const submitBtn = container.querySelector('.quiz-submit-btn') as HTMLButtonElement | null;
    const feedback = container.querySelector('.quiz-feedback') as HTMLElement | null;

    submitBtn?.addEventListener('click', () => {
      const selected = container.querySelector(`input[name="quiz_${quizId}"]:checked`) as HTMLInputElement | null;
      if (!selected) {
        alert('Vui lòng chọn 1 đáp án!');
        return;
      }

      const selectedIdx = parseInt(selected.value, 10);
      const isRight = selectedIdx === data.correctIndex;

      saveQuizProgress(currentLessonId, quizId, isRight, isRight ? 100 : 0);

      if (feedback) {
        feedback.style.display = 'block';
        feedback.style.background = isRight ? '#dcfce7' : '#fee2e2';
        feedback.style.color = isRight ? '#166534' : '#991b1b';
        feedback.innerHTML = `
          <strong>${isRight ? '🎉 Chính xác!' : '💡 Chưa chính xác!'}</strong>
          <p style="margin:0.25rem 0 0;">${data.explanation || ''}</p>
        `;
      }
      submitBtn.disabled = true;
      container.querySelectorAll('input').forEach(inp => inp.disabled = true);
    });
  });
}

export function initProgressTracker(): void {
  const statEl = document.getElementById('physio-stat-completed');
  if (!statEl) return;

  const progress = getQuizProgress();
  let completedCount = 0;

  Object.values(progress).forEach(lessonMap => {
    Object.values(lessonMap).forEach(q => {
      if (q.completed && q.isCorrect) completedCount++;
    });
  });

  statEl.textContent = `${completedCount} bài đạt`;
}

export function initSearchFilter(): void {
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase().trim();
    const cards = document.querySelectorAll('.topic-card, .specialty-card, .case-card, .lesson-link');

    cards.forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      if (text.includes(query)) {
        (card as HTMLElement).style.display = '';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  });
}

export function initHotkeyShortcut(): void {
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  });
}

export function initSpecialtyDropdowns(): void {
  const dropdownCards = document.querySelectorAll<HTMLElement>('.specialty-dropdown-card');
  dropdownCards.forEach(card => {
    const trigger = card.querySelector('.specialty-dropdown-trigger') || card;

    trigger.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('a')) return;
      e.stopPropagation();
      const isOpen = card.classList.contains('open');
      dropdownCards.forEach(c => {
        c.classList.remove('open');
        c.setAttribute('aria-expanded', 'false');
        c.style.zIndex = '';
      });
      if (!isOpen) {
        card.classList.add('open');
        card.setAttribute('aria-expanded', 'true');
        card.style.zIndex = '100000';
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if ((e.target as HTMLElement).closest('a')) return;
        e.preventDefault();
        const isOpen = card.classList.toggle('open');
        card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        card.style.zIndex = isOpen ? '100000' : '';
      } else if (e.key === 'Escape') {
        card.classList.remove('open');
        card.setAttribute('aria-expanded', 'false');
        card.style.zIndex = '';
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('.specialty-dropdown-card')) {
      dropdownCards.forEach(c => {
        c.classList.remove('open');
        c.setAttribute('aria-expanded', 'false');
        c.style.zIndex = '';
      });
    }
  });
}

export function initPathoHub(): void {
  initSearchFilter();
  initHotkeyShortcut();
  initProgressTracker();
  initQuizEngine();
  initSpecialtyDropdowns();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPathoHub);
  } else {
    initPathoHub();
  }
}

