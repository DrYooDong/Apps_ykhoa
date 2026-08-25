/**
 * Reusable Medical Quiz & Exam Timer (quiz-timer.js)
 * Location: js/components/quiz-timer.js
 * CliniPortal Framework — Vanilla JavaScript (Inspired by JS30 Day 29 Countdown Clock)
 */

(function () {
  'use strict';

  class QuizCountdownTimer {
    constructor(options = {}) {
      this.totalSeconds = options.seconds || 60;
      this.remainingSeconds = this.totalSeconds;
      this.intervalId = null;
      this.endTime = null;
      this.isPaused = false;
      this.container = options.container || null;
      this.onTick = options.onTick || null;
      this.onExpire = options.onExpire || null;
      this.radius = 12;
      this.circumference = 2 * Math.PI * this.radius;

      if (this.container) {
        this.render();
      }
    }

    render() {
      if (typeof this.container === 'string') {
        this.container = document.querySelector(this.container);
      }
      if (!this.container) return;

      this.container.innerHTML = `
        <div class="quiz-timer-widget" id="quizTimerWidget">
          <div class="quiz-timer-ring-container">
            <svg class="quiz-timer-svg" viewBox="0 0 32 32">
              <circle class="quiz-timer-circle-bg" cx="16" cy="16" r="${this.radius}"></circle>
              <circle class="quiz-timer-circle-progress" id="quizTimerProgressCircle" cx="16" cy="16" r="${this.radius}" 
                style="stroke-dasharray: ${this.circumference}; stroke-dashoffset: 0;"></circle>
            </svg>
          </div>
          <span class="quiz-timer-digits" id="quizTimerDigits">${this.formatTime(this.remainingSeconds)}</span>
        </div>
      `;

      this.widgetEl = this.container.querySelector('#quizTimerWidget');
      this.progressCircle = this.container.querySelector('#quizTimerProgressCircle');
      this.digitsEl = this.container.querySelector('#quizTimerDigits');
    }

    start(seconds) {
      if (seconds !== undefined) {
        this.totalSeconds = seconds;
        this.remainingSeconds = seconds;
      }
      this.isPaused = false;
      this.endTime = Date.now() + this.remainingSeconds * 1000;

      clearInterval(this.intervalId);
      this.updateDisplay();

      this.intervalId = setInterval(() => {
        if (this.isPaused) return;

        const secondsLeft = Math.round((this.endTime - Date.now()) / 1000);
        if (secondsLeft <= 0) {
          this.remainingSeconds = 0;
          this.updateDisplay();
          clearInterval(this.intervalId);
          if (typeof this.onExpire === 'function') this.onExpire();
          window.dispatchEvent(new CustomEvent('cliniportal-quiz-timer-expired'));
          return;
        }

        this.remainingSeconds = secondsLeft;
        this.updateDisplay();
        if (typeof this.onTick === 'function') this.onTick(this.remainingSeconds);
      }, 1000);
    }

    pause() {
      this.isPaused = true;
    }

    resume() {
      if (!this.isPaused) return;
      this.isPaused = false;
      this.endTime = Date.now() + this.remainingSeconds * 1000;
    }

    reset(seconds = this.totalSeconds) {
      clearInterval(this.intervalId);
      this.totalSeconds = seconds;
      this.remainingSeconds = seconds;
      this.isPaused = false;
      this.updateDisplay();
    }

    updateDisplay() {
      if (!this.digitsEl || !this.progressCircle || !this.widgetEl) return;

      this.digitsEl.textContent = this.formatTime(this.remainingSeconds);

      // SVG Ring Offset
      const progressFraction = this.remainingSeconds / this.totalSeconds;
      const offset = this.circumference * (1 - progressFraction);
      this.progressCircle.style.strokeDashoffset = offset;

      // Color State classes
      if (this.remainingSeconds <= 5) {
        this.widgetEl.classList.add('is-critical');
        this.widgetEl.classList.remove('is-warning');
      } else if (this.remainingSeconds <= 10) {
        this.widgetEl.classList.add('is-warning');
        this.widgetEl.classList.remove('is-critical');
      } else {
        this.widgetEl.classList.remove('is-warning', 'is-critical');
      }
    }

    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  }

  window.QuizCountdownTimer = QuizCountdownTimer;
})();
