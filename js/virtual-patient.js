/**
 * Virtual Patient Engine — CliniPortal
 * Xử lý game rẽ nhánh (branching scenario) giả lập ca bệnh lâm sàng tương tác
 */

(function () {
  'use strict';

  let currentCase = null;
  let currentNodeId = 'start';
  let score = 0;

  function loadCase(caseData) {
    currentCase = caseData;
    currentNodeId = 'start';
    score = 0;
    renderCurrentNode();
  }

  function renderCurrentNode() {
    if (!currentCase || !currentCase.nodes[currentNodeId]) return;

    const node = currentCase.nodes[currentNodeId];
    const scenarioEl = document.getElementById('vp-scenario-text');
    const choicesEl = document.getElementById('vp-choices-list');
    const scoreEl = document.getElementById('vp-score-value');
    const feedbackEl = document.getElementById('vp-feedback-panel');

    if (scoreEl) scoreEl.textContent = score;
    if (feedbackEl) feedbackEl.style.display = 'none';

    if (scenarioEl) scenarioEl.innerHTML = node.text;

    if (choicesEl) {
      if (node.isEnd) {
        choicesEl.innerHTML = `
          <div style="text-align: center; margin-top: 1rem;">
            <h3 style="color: var(--color-primary); margin-bottom: 0.5rem;">🎉 Hoàn Thành Ca Bệnh!</h3>
            <p style="font-size: 1.1rem; font-weight: 700;">Tổng số điểm đạt được: ${score} điểm</p>
            <button class="vp-choice-btn" style="justify-content: center; margin: 1rem auto; width: 220px;" onclick="VirtualPatient.restart()">
              <i class="fa-solid fa-rotate-left"></i> Thử Lại Ca Này
            </button>
          </div>
        `;
      } else {
        choicesEl.innerHTML = node.choices.map((choice, idx) => `
          <button type="button" class="vp-choice-btn" data-next="${choice.nextId}" data-pts="${choice.pts || 0}" data-feedback="${encodeURIComponent(choice.feedback || '')}" data-correct="${choice.isCorrect ? 'true' : 'false'}">
            <span>${idx + 1}. ${choice.text}</span>
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        `).join('');

        choicesEl.querySelectorAll('.vp-choice-btn').forEach(btn => {
          btn.addEventListener('click', function () {
            const nextId = this.getAttribute('data-next');
            const pts = parseInt(this.getAttribute('data-pts'), 10) || 0;
            const feedbackText = decodeURIComponent(this.getAttribute('data-feedback'));
            const isCorrect = this.getAttribute('data-correct') === 'true';

            score += pts;
            if (scoreEl) scoreEl.textContent = score;

            if (feedbackText && feedbackEl) {
              feedbackEl.className = `vp-feedback-panel ${isCorrect ? 'vp-feedback-correct' : 'vp-feedback-wrong'}`;
              feedbackEl.innerHTML = `<b>${isCorrect ? '✓ Chính xác!' : '✗ Chưa tối ưu:'}</b> ${feedbackText}`;
              feedbackEl.style.display = 'block';

              setTimeout(() => {
                currentNodeId = nextId;
                renderCurrentNode();
              }, 2200);
            } else {
              currentNodeId = nextId;
              renderCurrentNode();
            }
          });
        });
      }
    }
  }

  function restart() {
    currentNodeId = 'start';
    score = 0;
    renderCurrentNode();
  }

  window.VirtualPatient = {
    loadCase,
    restart
  };
})();
