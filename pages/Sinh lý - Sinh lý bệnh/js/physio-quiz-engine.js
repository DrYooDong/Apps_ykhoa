/**
 * Physio Micro-Quiz Engine (physio-quiz-engine.js)
 * Module Sinh lý - Sinh lý bệnh | CliniPortal
 * Hỗ trợ trắc nghiệm (MCQ), Đang/Đúng-Sai (True/False) nhúng trực tiếp trong bài học
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'cliniportal_physio_quiz_progress';

    function getQuizProgress() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    function saveQuizProgress(lessonId, quizId, isCorrect, score) {
        const progress = getQuizProgress();
        if (!progress[lessonId]) {
            progress[lessonId] = {};
        }
        progress[lessonId][quizId] = {
            completed: true,
            isCorrect: isCorrect,
            score: score,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        
        // Broadcast custom event for Progress Dashboard
        window.dispatchEvent(new CustomEvent('physio-quiz-updated', {
            detail: { lessonId, quizId, isCorrect, progress }
        }));
    }

    function initQuizzes() {
        const quizContainers = document.querySelectorAll('.physio-quiz-block');
        if (!quizContainers.length) return;

        const currentLessonId = window.location.pathname.split('/').pop().replace('.html', '');
        const savedProgress = getQuizProgress()[currentLessonId] || {};

        quizContainers.forEach((container, index) => {
            const quizId = container.dataset.quizId || `quiz_${index + 1}`;
            const scriptData = container.querySelector('script[type="application/json"]');
            
            let data = null;
            if (scriptData) {
                try {
                    data = JSON.parse(scriptData.textContent);
                } catch (e) {
                    console.error('Lỗi parse quiz JSON data:', e);
                }
            }

            if (!data) return;

            renderQuizUI(container, quizId, data, savedProgress[quizId], currentLessonId);
        });
    }

    function renderQuizUI(container, quizId, data, savedState, lessonId) {
        const isDone = savedState && savedState.completed;
        const savedCorrect = savedState && savedState.isCorrect;

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
                <div class="quiz-feedback-box ${isDone ? 'show' : ''}" style="${isDone ? '' : 'display: none;'}">
                    <div class="feedback-title">${isDone ? (savedCorrect ? '🎉 Chính xác!' : '💡 Lời giải chi tiết:') : ''}</div>
                    <div class="feedback-explanation">${data.explanation || ''}</div>
                </div>
            </div>
        `;

        if (!isDone) {
            const btns = container.querySelectorAll('.quiz-option-btn');
            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    handleAnswerSelection(container, btn, data, quizId, lessonId);
                });
            });
        }
    }

    function handleAnswerSelection(container, selectedBtn, data, quizId, lessonId) {
        const allBtns = container.querySelectorAll('.quiz-option-btn');
        allBtns.forEach(b => b.disabled = true);

        let isCorrect = false;

        if (data.type === 'mcq') {
            const selectedIdx = parseInt(selectedBtn.dataset.index, 10);
            isCorrect = selectedIdx === data.correctIndex;
            if (isCorrect) {
                selectedBtn.classList.add('correct-answer');
            } else {
                selectedBtn.classList.add('wrong-answer');
                // Highlight correct one
                const correctBtn = container.querySelector(`.quiz-option-btn[data-index="${data.correctIndex}"]`);
                if (correctBtn) correctBtn.classList.add('correct-answer');
            }
        } else if (data.type === 'tf') {
            const val = selectedBtn.dataset.value === 'true';
            isCorrect = val === data.correctAnswer;
            if (isCorrect) {
                selectedBtn.classList.add('correct-answer');
            } else {
                selectedBtn.classList.add('wrong-answer');
                const correctBtn = container.querySelector(`.quiz-option-btn[data-value="${data.correctAnswer}"]`);
                if (correctBtn) correctBtn.classList.add('correct-answer');
            }
        }

        const card = container.querySelector('.physio-quiz-card');
        card.classList.add(isCorrect ? 'state-passed' : 'state-failed');

        const statusPill = container.querySelector('.quiz-status-pill');
        statusPill.textContent = isCorrect ? '✅ Đã hoàn thành' : '❌ Đã làm (Chưa đúng)';

        const feedbackBox = container.querySelector('.quiz-feedback-box');
        const feedbackTitle = container.querySelector('.feedback-title');
        feedbackTitle.textContent = isCorrect ? '🎉 Chính xác!' : '💡 Giải thích chi tiết:';
        feedbackBox.style.display = 'block';
        setTimeout(() => feedbackBox.classList.add('show'), 10);

        saveQuizProgress(lessonId, quizId, isCorrect, isCorrect ? 100 : 0);
    }

    document.addEventListener('DOMContentLoaded', initQuizzes);
    window.initPhysioQuizzes = initQuizzes;
})();
