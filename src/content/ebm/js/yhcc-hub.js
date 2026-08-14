// yhcc-hub.js - Logic for EBM Hub

document.addEventListener('DOMContentLoaded', () => {
  initHealthScore();
  initFuzzySearch();
  initHubFAB();
});

// EBM Hub FAB Configuration
function initHubFAB() {
  if (typeof setupFAB === 'function') {
    setupFAB([
      { icon: '<i class="fa-solid fa-chart-line"></i>', label: 'Thống kê Y Học', href: 'medical-statistics/thongkeyhoc.html' },
      { icon: '<i class="fa-solid fa-book-medical"></i>', label: 'Kho Guidelines', href: 'guidelines/guidelines.html' },
      { icon: '<i class="fa-solid fa-flask"></i>', label: 'Thực Hành EBM', href: 'ebm-lab/ebm-lab.html' }
    ]);
  }
}

// 1. Health Score Widget & Animated Counters
function initHealthScore() {
  const scoreContainer = document.getElementById('ebm-health-score-val');
  if (scoreContainer) {
    // Demo calculation: based on local storage or mock data
    const guidelinesRead = parseInt(localStorage.getItem('clini_guidelines_read') || '12');
    const quizCompleted = parseInt(localStorage.getItem('clini_quiz_completed') || '5');
    const score = Math.min(100, Math.round((guidelinesRead * 2) + (quizCompleted * 5)));
    
    animateValue(scoreContainer, 0, score, 1500);
    
    // Update SVG Gauge
    const gaugePath = document.getElementById('ebm-health-gauge-path');
    if (gaugePath) {
      // 0 to 100 mapped to SVG dasharray
      // Length of half circle is ~157 (radius 50)
      const length = 157;
      const progress = (score / 100) * length;
      gaugePath.style.strokeDasharray = `${progress}, ${length}`;
    }
  }
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // easing out
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    obj.innerHTML = Math.floor(easeProgress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerHTML = end; // ensure exact final value
    }
  };
  window.requestAnimationFrame(step);
}

// Override renderEbmHubWidgets in yhcc.html to use animated counters
window.addEventListener('cliniportal:guidelines-updated', () => {
  if (!window.CliniPortalSync) return;
  const stats = window.CliniPortalSync.getSummaryStats();
  
  const totalEl = document.getElementById('stat-total-guidelines');
  const practiceEl = document.getElementById('stat-practice-changing');
  const mohEl = document.getElementById('stat-moh-guidelines');
  const intlEl = document.getElementById('stat-intl-guidelines');
  
  if (totalEl && stats.total) animateValue(totalEl, 0, stats.total, 1000);
  if (practiceEl && stats.practiceChangingCount) animateValue(practiceEl, 0, stats.practiceChangingCount, 1200);
  if (mohEl) animateValue(mohEl, 0, (stats.mohCount || 0) + (stats.associationCount || 0), 1400);
  if (intlEl && stats.intlCount) animateValue(intlEl, 0, stats.intlCount, 1600);
});

// Initialize numbers initially if data is already there
setTimeout(() => {
  if (window.CliniPortalSync && window.CliniPortalSync.getSummaryStats) {
    const stats = window.CliniPortalSync.getSummaryStats();
    if (stats.total > 0) {
      const totalEl = document.getElementById('stat-total-guidelines');
      if (totalEl && totalEl.innerHTML === '---') {
        window.dispatchEvent(new Event('cliniportal:guidelines-updated'));
      }
    }
  }
}, 500);

// 2. Fuzzy Search enhancement
function initFuzzySearch() {
  const searchInput = document.getElementById('ebm-global-search');
  const resultsContainer = document.getElementById('ebm-search-results');
  
  if (!searchInput || !resultsContainer) return;
  
  // Replace the inline listener with this advanced one
  let selectedIndex = -1;
  
  searchInput.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('a');
    if (items.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
      updateSearchHighlight(items, selectedIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      updateSearchHighlight(items, selectedIndex);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < items.length) {
        items[selectedIndex].click();
      }
    }
  });
  
  // Triggered when input changes
  searchInput.addEventListener('input', () => {
    selectedIndex = -1; // Reset selection on typing
    // Save search history logic can go here
  });
}

function updateSearchHighlight(items, index) {
  items.forEach((item, i) => {
    if (i === index) {
      item.style.background = 'var(--hub-surface-2, #f1f5f9)';
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.style.background = 'transparent';
    }
  });
}
