/**
 * CliniPortal — Tiếp Cận Sốt & Lâm Sàng Quiz Controller (TypeScript Module)
 */

export function initFeverQuiz(): void {
  const quizBtns = document.querySelectorAll('.quiz-opt-btn');
  const explanation = document.getElementById('quizExplanation');

  quizBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      quizBtns.forEach(b => {
        (b as HTMLElement).style.pointerEvents = 'none';
        if (b.getAttribute('data-correct') === 'true') {
          (b as HTMLElement).style.background = 'rgba(16,185,129,0.2)';
          (b as HTMLElement).style.borderColor = 'var(--color-success)';
        }
      });

      if (isCorrect) {
        (btn as HTMLElement).style.background = 'rgba(16,185,129,0.3)';
      } else {
        (btn as HTMLElement).style.background = 'rgba(225,29,72,0.2)';
        (btn as HTMLElement).style.borderColor = 'var(--color-danger)';
      }

      if (explanation) explanation.style.display = 'block';
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFeverQuiz);
  } else {
    initFeverQuiz();
  }
}
