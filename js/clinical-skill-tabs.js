document.addEventListener('DOMContentLoaded', () => {
  // Tab switcher logic
  document.querySelectorAll('.tab-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn, .tab').forEach((element) => {
        element.classList.remove('active');
      });

      button.classList.add('active');

      const target = document.getElementById(button.dataset.tab);
      if (target) {
        target.classList.add('active');
      }
    });
  });

  // Checklist interactive toggle & Progress tracking
  const pageId = window.location.pathname.split('/').pop().replace('.html', '');
  const checkItems = document.querySelectorAll('.check li input[type="checkbox"]');
  const progressBar = document.getElementById('skill-progress-bar');
  const progressText = document.getElementById('skill-progress-text');

  function updateProgress() {
    if (checkItems.length === 0) return;
    const checkedCount = Array.from(checkItems).filter(cb => cb.checked).length;
    const percentage = Math.round((checkedCount / checkItems.length) * 100);
    
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `Tiến độ: ${checkedCount}/${checkItems.length} bước (${percentage}%)`;
    
    // Save to localStorage
    const state = Array.from(checkItems).map(cb => cb.checked);
    localStorage.setItem(`osce_state_${pageId}`, JSON.stringify(state));
  }

  // Load saved state
  const savedState = JSON.parse(localStorage.getItem(`osce_state_${pageId}`));
  if (savedState && savedState.length === checkItems.length) {
    checkItems.forEach((cb, index) => {
      cb.checked = savedState[index];
      if (cb.checked) {
        cb.closest('li').classList.add('checked');
      }
    });
  }
  updateProgress(); // Initial progress

  document.querySelectorAll('.check li').forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox) {
      item.addEventListener('click', (e) => {
        // Prevent toggle if clicking on interactive elements like links or directly on input
        if (e.target !== checkbox && e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      });

      checkbox.addEventListener('change', () => {
        item.classList.toggle('checked', checkbox.checked);
        updateProgress();
      });
    }
  });

  // OSCE Timer Logic
  const timerDisplay = document.getElementById('osce-timer-display');
  const timerWidget = document.getElementById('osce-timer-widget');
  const btnStart = document.getElementById('osce-timer-start');
  const btnReset = document.getElementById('osce-timer-reset');

  let timerInterval;
  let timeRemaining = 7 * 60; // 7 minutes default
  let isRunning = false;

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateTimerDisplay() {
    if (!timerDisplay) return;
    timerDisplay.textContent = formatTime(timeRemaining);
    if (timeRemaining <= 60 && timeRemaining > 0) {
      timerWidget.classList.add('warning');
    } else {
      timerWidget.classList.remove('warning');
    }
  }

  if (btnStart) {
    btnStart.addEventListener('click', () => {
      if (isRunning) {
        clearInterval(timerInterval);
        btnStart.textContent = 'Bắt đầu';
        isRunning = false;
      } else {
        if (timeRemaining <= 0) timeRemaining = 7 * 60;
        isRunning = true;
        btnStart.textContent = 'Tạm dừng';
        timerInterval = setInterval(() => {
          timeRemaining--;
          updateTimerDisplay();
          if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            btnStart.textContent = 'Bắt đầu';
          }
        }, 1000);
      }
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      clearInterval(timerInterval);
      isRunning = false;
      timeRemaining = 7 * 60;
      if (btnStart) btnStart.textContent = 'Bắt đầu';
      updateTimerDisplay();
    });
  }

  updateTimerDisplay();
});
