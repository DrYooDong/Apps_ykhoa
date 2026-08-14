/**
 * CliniPortal — Medical Statistics & Research Methods Engine (TypeScript Module)
 * Powers thongkeyhoc.html, quiz.html, and the 12 statistics lessons.
 */
import { StatQuizQuestion } from '../types';

const STATS_PROGRESS_KEY = 'cliniportal_stats_progress';

export function getStatsProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STATS_PROGRESS_KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveStatsLessonRead(lessonId: string): void {
  const prog = getStatsProgress();
  prog[lessonId] = true;
  localStorage.setItem(STATS_PROGRESS_KEY, JSON.stringify(prog));
  updateStatsDashboardUI();
}

export function updateStatsDashboardUI(): void {
  const prog = getStatsProgress();
  const readCount = Object.keys(prog).length;
  const countBadge = document.getElementById('stats-read-count');
  if (countBadge) countBadge.textContent = `${readCount} / 12 bài`;

  document.querySelectorAll('.lesson-card').forEach(card => {
    const cardId = (card as HTMLElement).dataset.lessonId;
    if (cardId && prog[cardId]) {
      card.classList.add('completed');
      const badge = card.querySelector('.completion-badge');
      if (badge) badge.textContent = '✅ Đã hoàn thành';
    }
  });
}

export function initStatsQuiz(): void {
  const quizForm = document.getElementById('stats-quiz-form');
  const submitBtn = document.getElementById('submit-quiz-btn');
  const resultPanel = document.getElementById('quiz-result-panel');

  if (!quizForm || !submitBtn || !resultPanel) return;

  submitBtn.addEventListener('click', () => {
    const questions = document.querySelectorAll('.quiz-question-card');
    let correctCount = 0;

    questions.forEach((qCard) => {
      const correctVal = (qCard as HTMLElement).dataset.correct;
      const selected = qCard.querySelector('input[type="radio"]:checked') as HTMLInputElement | null;
      const feedback = qCard.querySelector('.question-feedback') as HTMLElement | null;

      if (selected && selected.value === correctVal) {
        correctCount++;
        if (feedback) {
          feedback.style.display = 'block';
          feedback.style.background = '#dcfce7';
          feedback.style.color = '#166534';
          feedback.innerHTML = '<strong>✅ Chính xác!</strong>';
        }
      } else {
        if (feedback) {
          feedback.style.display = 'block';
          feedback.style.background = '#fee2e2';
          feedback.style.color = '#991b1b';
          feedback.innerHTML = '<strong>❌ Chưa đúng.</strong> Hãy xem lại giải thích chi tiết trong bài học.';
        }
      }
    });

    resultPanel.style.display = 'block';
    resultPanel.innerHTML = `
      <div style="background:var(--color-surface); border:2px solid var(--color-primary); border-radius:12px; padding:1.5rem; text-align:center;">
        <h3 style="margin:0 0 0.5rem; color:var(--color-primary);">📊 Kết Quả Trắc Nghiệm Thống Kê</h3>
        <p style="font-size:1.25rem; font-weight:800; margin:0 0 0.5rem;">Số câu đúng: ${correctCount} / ${questions.length} (${Math.round((correctCount / questions.length) * 100)}%)</p>
        <p style="font-size:0.875rem; color:var(--color-text-muted); margin:0;">${correctCount >= questions.length * 0.8 ? '🎉 Xuất sắc! Bạn đã nắm rất vững kiến thức thống kê y học.' : '💡 Bạn nên đọc lại các bài học chưa làm đúng để củng cố nền tảng.'}</p>
      </div>
    `;
    resultPanel.scrollIntoView({ behavior: 'smooth' });
  });
}

export function initStatsSearch(): void {
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const q = (e.target as HTMLInputElement).value.toLowerCase().trim();
    document.querySelectorAll('.lesson-card, .chapter-item').forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      if (text.includes(q)) {
        (card as HTMLElement).style.display = '';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  });
}

export function initMedicalStatistics(): void {
  initStatsSearch();
  initStatsQuiz();
  updateStatsDashboardUI();

  // Mark current lesson as read if we are on a lesson page
  const currentPath = window.location.pathname;
  const match = currentPath.match(/(\d+-[a-z0-9-]+)\.html/);
  if (match && match[1]) {
    saveStatsLessonRead(match[1]);
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMedicalStatistics);
  } else {
    initMedicalStatistics();
  }
}
