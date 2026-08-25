/**
 * Procedure Step-by-Step Animator Engine — CliniPortal
 * Dynamic procedural engine handling steps, interactive safety checks, and visual SVG triggers.
 */

(function () {
  'use strict';

  class ProcedureAnimator {
    constructor(config) {
      this.steps = config.steps || [];
      this.currentStepIndex = 0;
      this.containerId = config.containerId || 'procedure-app';

      this.init();
    }

    init() {
      this.renderStepper();
      this.showStep(0);
      this.bindEvents();
    }

    renderStepper() {
      const stepperBar = document.getElementById('stepperBar');
      if (!stepperBar) return;

      stepperBar.innerHTML = '';
      this.steps.forEach((step, index) => {
        const node = document.createElement('button');
        node.className = `step-node ${index === 0 ? 'active' : ''}`;
        node.setAttribute('data-step', index);
        node.setAttribute('aria-label', `Bước ${index + 1}: ${step.title}`);
        node.innerHTML = `
          <div class="step-circle">${index + 1}</div>
          <span class="step-label">${step.shortTitle || `Bước ${index + 1}`}</span>
        `;
        node.addEventListener('click', () => this.goToStep(index));
        stepperBar.appendChild(node);
      });
    }

    showStep(index) {
      if (index < 0 || index >= this.steps.length) return;

      this.currentStepIndex = index;
      const step = this.steps[index];

      // Update Stepper UI
      const nodes = document.querySelectorAll('#stepperBar .step-node');
      nodes.forEach((node, i) => {
        node.classList.remove('active');
        if (i < index) {
          node.classList.add('completed');
        } else if (i === index) {
          node.classList.add('active');
        } else {
          node.classList.remove('completed');
        }
      });

      // Update Step Header & Body
      const titleEl = document.getElementById('stepTitle');
      const counterEl = document.getElementById('stepCounter');
      const bodyEl = document.getElementById('stepBody');
      const safetyEl = document.getElementById('safetyAlert');
      const svgContainer = document.getElementById('svgContainer');

      if (titleEl) titleEl.textContent = step.title;
      if (counterEl) counterEl.textContent = `Bước ${index + 1} / ${this.steps.length}`;

      if (bodyEl) {
        bodyEl.innerHTML = `
          <p>${step.description}</p>
          ${step.bullets ? `<ul class="step-bullets">${step.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
        `;
      }

      if (safetyEl) {
        if (step.safety) {
          safetyEl.style.display = 'flex';
          safetyEl.className = `safety-alert-box ${step.safetyType === 'danger' ? 'danger' : ''}`;
          safetyEl.innerHTML = `
            <i class="fa-solid fa-triangle-exclamation safety-alert-icon"></i>
            <div class="safety-alert-text"><strong>Lưu ý an toàn:</strong> ${step.safety}</div>
          `;
        } else {
          safetyEl.style.display = 'none';
        }
      }

      // Update SVG Visual
      if (svgContainer && step.svgContent) {
        svgContainer.innerHTML = step.svgContent;
      }

      // Update Buttons
      const btnPrev = document.getElementById('btnPrevStep');
      const btnNext = document.getElementById('btnNextStep');

      if (btnPrev) btnPrev.disabled = index === 0;
      if (btnNext) {
        if (index === this.steps.length - 1) {
          btnNext.innerHTML = 'Hoàn thành <i class="fa-solid fa-circle-check"></i>';
          btnNext.className = 'btn-proc btn-proc-primary';
        } else {
          btnNext.innerHTML = 'Bước tiếp <i class="fa-solid fa-arrow-right"></i>';
          btnNext.className = 'btn-proc btn-proc-primary';
        }
      }
    }

    nextStep() {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.showStep(this.currentStepIndex + 1);
      } else {
        alert('🎉 Bạn đã hoàn thành quy trình thủ thuật này!');
      }
    }

    prevStep() {
      if (this.currentStepIndex > 0) {
        this.showStep(this.currentStepIndex - 1);
      }
    }

    goToStep(index) {
      this.showStep(index);
    }

    bindEvents() {
      const btnPrev = document.getElementById('btnPrevStep');
      const btnNext = document.getElementById('btnNextStep');

      if (btnPrev) btnPrev.addEventListener('click', () => this.prevStep());
      if (btnNext) btnNext.addEventListener('click', () => this.nextStep());
    }
  }

  window.ProcedureAnimator = ProcedureAnimator;
})();
