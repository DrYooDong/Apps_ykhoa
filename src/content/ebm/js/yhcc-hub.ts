/**
 * EBM Hub Controller (yhcc-hub.ts)
 * Path: src/content/ebm/js/yhcc-hub.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export function animateValue(obj: HTMLElement, start: number, end: number, duration: number): void {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    obj.innerHTML = Math.floor(easeProgress * (end - start) + start).toString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerHTML = end.toString();
    }
  };
  window.requestAnimationFrame(step);
}

export function initHealthScore(): void {
  const scoreContainer = document.getElementById('ebm-health-score-val');
  if (scoreContainer) {
    const guidelinesRead = parseInt(localStorage.getItem('clini_guidelines_read') || '12', 10);
    const quizCompleted = parseInt(localStorage.getItem('clini_quiz_completed') || '5', 10);
    const score = Math.min(100, Math.round((guidelinesRead * 2) + (quizCompleted * 5)));
    
    animateValue(scoreContainer, 0, score, 1500);

    const gaugePath = document.getElementById('ebm-health-gauge-path');
    if (gaugePath) {
      const length = 157;
      const progress = (score / 100) * length;
      gaugePath.style.strokeDasharray = `${progress}, ${length}`;
    }
  }
}

export function initHubFAB(): void {
  if (typeof (window as any).setupFAB === 'function') {
    (window as any).setupFAB([
      { icon: '<i class="fa-solid fa-chart-line"></i>', label: 'Thống kê Y Học', href: 'medical-statistics/thongkeyhoc.html' },
      { icon: '<i class="fa-solid fa-book-medical"></i>', label: 'Kho Guidelines', href: 'guidelines/guidelines.html' },
      { icon: '<i class="fa-solid fa-flask"></i>', label: 'Thực Hành EBM', href: 'ebm-lab/ebm-lab.html' }
    ]);
  }
}

export function initFuzzySearch(): void {
  const searchInput = document.getElementById('ebm-global-search') as HTMLInputElement | null;
  const resultsContainer = document.getElementById('ebm-search-results');
  if (!searchInput || !resultsContainer) return;

  searchInput.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase().trim();
    if (!query) {
      resultsContainer.style.display = 'none';
      return;
    }

    const cards = document.querySelectorAll('.ebm-feature-card, .guideline-row, .study-card, .ebm-bento-card-compact');
    let matched = 0;
    let html = '';

    cards.forEach(card => {
      const title = card.querySelector('h2, h3, h4, .title')?.textContent || '';
      if (title.toLowerCase().includes(query) && matched < 6) {
        matched++;
        html += `<a href="#" style="display:block; padding:8px 12px; border-bottom:1px solid var(--hub-border, #e2e8f0); color:var(--hub-text, #0f172a); text-decoration:none;">${title}</a>`;
      }
    });

    if (matched > 0) {
      resultsContainer.innerHTML = html;
      resultsContainer.style.display = 'block';
    } else {
      resultsContainer.style.display = 'none';
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      resultsContainer.style.display = 'none';
    }
  });
}

export function initYhccHub(): void {
  initHealthScore();
  initFuzzySearch();
  initHubFAB();

  // Listen to guidelines update event for animated counters
  window.addEventListener('cliniportal:guidelines-updated', () => {
    const syncObj = (window as any).CliniPortalSync;
    if (!syncObj || !syncObj.getSummaryStats) return;
    const stats = syncObj.getSummaryStats();
    
    const totalEl = document.getElementById('stat-total-guidelines');
    const practiceEl = document.getElementById('stat-practice-changing');
    const mohEl = document.getElementById('stat-moh-guidelines');
    const intlEl = document.getElementById('stat-intl-guidelines');
    
    if (totalEl && stats.total) animateValue(totalEl, 0, stats.total, 1000);
    if (practiceEl && stats.practiceChangingCount) animateValue(practiceEl, 0, stats.practiceChangingCount, 1200);
    if (mohEl) animateValue(mohEl, 0, (stats.mohCount || 0) + (stats.associationCount || 0), 1400);
    if (intlEl && stats.intlCount) animateValue(intlEl, 0, stats.intlCount, 1600);
  });
}

if (typeof window !== 'undefined') {
  (window as any).initYhccHub = initYhccHub;
  (window as any).animateValue = animateValue;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initYhccHub);
  } else {
    initYhccHub();
  }
}
