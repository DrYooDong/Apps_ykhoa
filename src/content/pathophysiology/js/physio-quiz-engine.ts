/**
 * Physio Micro-Quiz Engine (physio-quiz-engine.ts)
 * Module Sinh lý - Sinh lý bệnh | CliniPortal
 * Hỗ trợ trắc nghiệm (MCQ), Đang/Đúng-Sai (True/False) nhúng trực tiếp trong bài học
 */

export interface QuizProgressItem {
  completed: boolean;
  isCorrect: boolean;
  score: number;
  timestamp: string;
}

export interface QuizQuestionData {
  type: 'mcq' | 'tf';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: boolean;
  explanation?: string;
  pearl?: string;
}

export class PhysioQuizEngine {
  public static readonly STORAGE_KEY = 'cliniportal_physio_quiz_progress';

  public static getQuizProgress(): Record<string, Record<string, QuizProgressItem>> {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  public static saveQuizProgress(lessonId: string, quizId: string, isCorrect: boolean, score: number): void {
    const progress = this.getQuizProgress();
    if (!progress[lessonId]) {
      progress[lessonId] = {};
    }
    progress[lessonId][quizId] = {
      completed: true,
      isCorrect: isCorrect,
      score: score,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));

    // Broadcast custom event for Progress Dashboard
    window.dispatchEvent(new CustomEvent('physio-quiz-updated', {
      detail: { lessonId, quizId, isCorrect, progress }
    }));
  }

  public static initQuizzes(): void {
    const quizContainers = document.querySelectorAll('.physio-quiz-block');
    if (!quizContainers.length) return;

    const currentLessonId = window.location.pathname.split('/').pop()?.replace('.html', '') || 'unknown';
    const savedProgress = this.getQuizProgress()[currentLessonId] || {};

    quizContainers.forEach((container, index) => {
      const el = container as HTMLElement;
      const quizId = el.dataset.quizId || `quiz_${index + 1}`;
      const scriptData = el.querySelector('script[type="application/json"]');

      let data: QuizQuestionData | null = null;
      if (scriptData && scriptData.textContent) {
        try {
          data = JSON.parse(scriptData.textContent);
        } catch (e) {
          console.error('Lỗi parse quiz JSON data:', e);
        }
      }

      if (!data) return;

      this.renderQuizUI(el, quizId, data, savedProgress[quizId], currentLessonId);
    });
  }

  public static renderQuizUI(container: HTMLElement, quizId: string, data: QuizQuestionData, savedState: QuizProgressItem | undefined, lessonId: string): void {
    const isDone = Boolean(savedState && savedState.completed);
    const savedCorrect = Boolean(savedState && savedState.isCorrect);

    let optionsHTML = '';
    if (data.type === 'mcq' && Array.isArray(data.options)) {
      optionsHTML = data.options.map((opt, idx) => `
        <button class="quiz-option-btn ${isDone && idx === data.correctIndex ? 'correct-answer' : ''}" 
                data-index="${idx}" ${isDone ? 'disabled' : ''}>
          <span class="option-prefix">${String.fromCharCode(65 + idx)}</span>
          <span class="option-text">${opt}</span>
        </button>
      `).join('');
    } else if (data.type === 'tf') {
      optionsHTML = `
        <button class="quiz-option-btn ${isDone && data.correctAnswer === true ? 'correct-answer' : ''}" 
                data-value="true" ${isDone ? 'disabled' : ''}>
          <span class="option-prefix">✓</span>
          <span class="option-text">Đúng (True)</span>
        </button>
        <button class="quiz-option-btn ${isDone && data.correctAnswer === false ? 'correct-answer' : ''}" 
                data-value="false" ${isDone ? 'disabled' : ''}>
          <span class="option-prefix">✗</span>
          <span class="option-text">Sai (False)</span>
        </button>
      `;
    }

    container.innerHTML = `
      <div class="physio-quiz-card ${isDone ? (savedCorrect ? 'state-passed' : 'state-failed') : ''}">
        <div class="quiz-header">
          <span class="quiz-badge">🧠 Micro-Quiz sinh lý</span>
          <span class="quiz-status-pill">${isDone ? (savedCorrect ? '✅ Đã hoàn thành' : '❌ Đã làm (Chưa đúng)') : '⏱️ Chưa làm'}</span>
        </div>
        <h4 class="quiz-question">${data.question}</h4>
        <div class="quiz-options-grid">
          ${optionsHTML}
        </div>
        <div class="quiz-feedback-box" style="display:${isDone ? 'block' : 'none'};">
          <div class="feedback-content">
            <strong>${savedCorrect ? '🎉 Chính xác!' : '💡 Giải thích chi tiết:'}</strong>
            <p>${data.explanation || 'Chưa có lời giải thích cụ thể.'}</p>
            ${data.pearl ? `<div class="quiz-pearl">💎 <strong>Pearl:</strong> ${data.pearl}</div>` : ''}
          </div>
        </div>
      </div>
    `;

    if (!isDone) {
      const btns = container.querySelectorAll('.quiz-option-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          let userCorrect = false;
          if (data.type === 'mcq') {
            const chosenIdx = parseInt(btn.getAttribute('data-index') || '-1', 10);
            userCorrect = (chosenIdx === data.correctIndex);
          } else if (data.type === 'tf') {
            const chosenVal = btn.getAttribute('data-value') === 'true';
            userCorrect = (chosenVal === data.correctAnswer);
          }

          this.saveQuizProgress(lessonId, quizId, userCorrect, userCorrect ? 100 : 0);
          this.renderQuizUI(container, quizId, data, { completed: true, isCorrect: userCorrect, score: userCorrect ? 100 : 0, timestamp: new Date().toISOString() }, lessonId);
        });
      });
    }
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => PhysioQuizEngine.initQuizzes());
}
