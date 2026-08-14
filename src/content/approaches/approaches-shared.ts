/**
 * CliniPortal — Clinical Approaches Shared Module (TypeScript)
 * Powers all 60+ symptoms, paraclinical, pediatric, and emergency approach pages.
 */

export function initApproachesShared(): void {
  // 1. Reading Progress Bar
  let progressBar = document.getElementById('approach-reading-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'approach-reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #6366f1, #06b6d4);
      width: 0%;
      z-index: 9999;
      transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
  }

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      const scrolled = (window.scrollY / docHeight) * 100;
      if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
    }
  }, { passive: true });

  // 2. Smooth Scroll for internal hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', targetId);
      }
    });
  });

  // 3. Clinical Pearl & Takeaway Copy Widget
  document.querySelectorAll('.clinical-pearl, .alert-banner, .key-takeaway').forEach((box) => {
    if (box.querySelector('.pearl-copy-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'pearl-copy-btn';
    btn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép';
    btn.style.cssText = `
      float: right;
      font-size: 0.75rem;
      border: 1px solid var(--color-divider, #e2e8f0);
      background: var(--color-surface, #fff);
      color: var(--color-text-muted, #64748b);
      border-radius: 4px;
      padding: 2px 8px;
      cursor: pointer;
      margin-bottom: 4px;
    `;
    btn.addEventListener('click', () => {
      const text = (box as HTMLElement).innerText.replace('Sao chép', '').trim();
      navigator.clipboard?.writeText(text).then(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép!';
        setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép'; }, 2000);
      });
    });
    box.prepend(btn);
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApproachesShared);
  } else {
    initApproachesShared();
  }
}
